const DEFAULT_WEBHOOK_URL =
  'https://n8njb-6378e565ae08.herokuapp.com/webhook/e104e40e-6134-4825-a6f0-8a646d882662/chat'

// Keep under typical Netlify Function limits (10s free / 26s Pro) so we can
// still retry a Heroku cold-start once before the platform kills the request.
const REQUEST_TIMEOUT_MS = 20_000
const MAX_ATTEMPTS = 3
const RETRY_BASE_DELAY_MS = 1_500

function isRetryableNetworkError(error: any): boolean {
  // Do not treat AbortError (our request timeout) as retryable — that usually
  // means n8n accepted the call but the workflow is slow, and another full
  // attempt would exceed the serverless time budget.
  if (error?.name === 'AbortError') return false

  const message = String(error?.message || '')
  const causeCode = String(error?.cause?.code || error?.code || '')
  const causeMessage = String(error?.cause?.message || '')
  const haystack = `${message} ${causeCode} ${causeMessage}`.toLowerCase()

  return (
    haystack.includes('fetch failed') ||
    haystack.includes('econnrefused') ||
    haystack.includes('enotfound') ||
    haystack.includes('econnreset') ||
    haystack.includes('etimedout') ||
    haystack.includes('socket') ||
    haystack.includes('network') ||
    haystack.includes('connect timeout') ||
    haystack.includes('und_err_connect_timeout')
  )
}

function isRetryableHttpStatus(status: number): boolean {
  // Heroku dyno cold-starts / transient router errors often surface as these.
  return status === 502 || status === 503 || status === 504 || status === 520 || status === 521 || status === 522
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function extractReply(data: any): string {
  let reply =
    data?.reply ||
    data?.message ||
    data?.text ||
    data?.response ||
    data?.output ||
    data?.data?.reply ||
    data?.data?.message ||
    data?.data?.text ||
    data?.data?.output ||
    (data?.body && (data.body.reply || data.body.message || data.body.text || data.body.output)) ||
    (Array.isArray(data) &&
      data[0] &&
      (data[0].reply ||
        data[0].message ||
        data[0].text ||
        data[0].output ||
        data[0].json?.reply ||
        data[0].json?.message)) ||
    (data?.json && (data.json.reply || data.json.message || data.json.text || data.json.output)) ||
    (typeof data === 'string' ? data : null) ||
    'No reply received'

  if (reply === 'Workflow was started' || reply?.includes?.('Workflow was started')) {
    reply =
      data?.output ||
      data?.result ||
      data?.data ||
      (data?.body && typeof data.body === 'string' ? data.body : null) ||
      'Workflow started successfully. Waiting for response...'
  }

  return typeof reply === 'string' ? reply : JSON.stringify(reply)
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { text, sessionId: clientSessionId } = body

    if (!text || typeof text !== 'string') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Text is required'
      })
    }

    const config = useRuntimeConfig(event)
    const webhookUrl =
      (typeof config.chatWebhookUrl === 'string' && config.chatWebhookUrl.trim()) ||
      DEFAULT_WEBHOOK_URL

    // n8n Chat Trigger expects action + sessionId + chatInput (not { text }).
    const sessionId =
      (typeof clientSessionId === 'string' && clientSessionId.trim()) ||
      `web-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
    const webhookBody = {
      action: 'sendMessage',
      sessionId,
      chatInput: text
    }

    console.log('=== Chat API Request ===')
    console.log('Webhook URL:', webhookUrl)
    console.log('Message text:', text)
    console.log('Request body:', JSON.stringify(webhookBody))

    let lastError: any = null

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify(webhookBody),
          signal: controller.signal
        })

        clearTimeout(timeoutId)

        console.log(`Response status (attempt ${attempt}):`, response.status, response.statusText)

        if (!response.ok) {
          let errorText = ''
          let errorData: any = null
          try {
            errorText = await response.text()
            try {
              errorData = JSON.parse(errorText)
            } catch {
              // not JSON
            }
          } catch {
            // ignore body read failures
          }

          if (isRetryableHttpStatus(response.status) && attempt < MAX_ATTEMPTS) {
            console.warn(
              `Retryable webhook HTTP ${response.status} on attempt ${attempt}; retrying…`
            )
            await sleep(RETRY_BASE_DELAY_MS * attempt)
            continue
          }

          if (response.status === 404) {
            throw createError({
              statusCode: 404,
              statusMessage: `Webhook not found (404). Please verify the webhook is active in n8n: ${webhookUrl}`
            })
          }

          if (response.status === 500 && errorData?.message) {
            if (String(errorData.message).includes('Unused Respond to Webhook node')) {
              throw createError({
                statusCode: 500,
                statusMessage:
                  'n8n Workflow Error: Unused "Respond to Webhook" node found. Remove or correctly connect that node.'
              })
            }

            throw createError({
              statusCode: 500,
              statusMessage: `n8n Workflow Error: ${errorData.message}`
            })
          }

          throw createError({
            statusCode: response.status,
            statusMessage: `Webhook error (${response.status}): ${errorText || response.statusText}`
          })
        }

        const contentType = response.headers.get('content-type') || ''
        let data: any
        if (contentType.includes('application/json')) {
          data = await response.json()
        } else {
          const textResponse = await response.text()
          try {
            data = JSON.parse(textResponse)
          } catch {
            data = { reply: textResponse || 'Response received' }
          }
        }

        const reply = extractReply(data)
        console.log('Final reply:', reply)

        return {
          success: true,
          reply
        }
      } catch (fetchError: any) {
        clearTimeout(timeoutId)
        lastError = fetchError

        // Already a shaped API error from createError above.
        if (fetchError?.statusCode) {
          throw fetchError
        }

        const timedOut = fetchError?.name === 'AbortError'
        const retryable = isRetryableNetworkError(fetchError)

        console.error(`=== Chat API attempt ${attempt} failed ===`)
        console.error('Error:', fetchError?.message || fetchError)
        if (fetchError?.cause) {
          console.error('Cause:', fetchError.cause)
        }

        if (retryable && attempt < MAX_ATTEMPTS) {
          // Give a sleeping Heroku dyno time to wake before retrying.
          await sleep(RETRY_BASE_DELAY_MS * attempt)
          continue
        }

        if (timedOut) {
          throw createError({
            statusCode: 504,
            statusMessage:
              'Request timeout. The n8n webhook took too long to respond (Heroku dyno may be waking up — try again).'
          })
        }

        if (retryable) {
          throw createError({
            statusCode: 503,
            statusMessage:
              'Unable to reach the n8n chat webhook on Heroku. The dyno may be asleep or restarting — wait a few seconds and try again. Confirm the n8n app is running and the workflow is active.'
          })
        }

        throw createError({
          statusCode: fetchError?.statusCode || 500,
          statusMessage: fetchError?.statusMessage || fetchError?.message || 'Failed to process chat message'
        })
      }
    }

    throw createError({
      statusCode: 503,
      statusMessage:
        lastError?.message ||
        'Unable to reach the n8n chat webhook after retries. Check that the Heroku n8n app is running.'
    })
  } catch (error: any) {
    console.error('Chat API error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || error.message || 'Failed to process chat message'
    })
  }
})
