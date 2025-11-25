export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { text } = body

    if (!text || typeof text !== 'string') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Text is required'
      })
    }

    // Forward request to n8n webhook (server-side to avoid CORS)
    const webhookUrl = 'https://n8n.neurohub.uk/webhook-test/jbiddulph/a0fe2042-ef3d-4911-a488-42343d8bf39b'
    
    console.log('=== Chat API Request ===')
    console.log('Webhook URL:', webhookUrl)
    console.log('Message text:', text)
    console.log('Request method: POST')
    
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ text }),
      })
      
      console.log('Response status:', response.status, response.statusText)
      console.log('Response headers:', Object.fromEntries(response.headers.entries()))
      console.log('Response URL:', response.url)
      
      if (!response.ok) {
        let errorText = ''
        try {
          errorText = await response.text()
          console.error('Error response body:', errorText)
        } catch (e) {
          console.error('Could not read error response body')
        }
        
        // Provide more helpful error messages
        if (response.status === 404) {
          throw createError({
            statusCode: 404,
            statusMessage: `Webhook not found (404). Please verify:
1. The webhook URL is correct: ${webhookUrl}
2. The webhook is active in n8n
3. The workflow containing the webhook is activated
4. The webhook path matches exactly (case-sensitive)`
          })
        }
        
        throw createError({
          statusCode: response.status,
          statusMessage: `Webhook error (${response.status}): ${errorText || response.statusText}`
        })
      }

      // Try to parse as JSON
      const contentType = response.headers.get('content-type') || ''
      console.log('Content-Type:', contentType)
      
      let data
      if (contentType.includes('application/json')) {
        data = await response.json()
        console.log('Parsed JSON response:', data)
      } else {
        // If not JSON, try to get text
        const textResponse = await response.text()
        console.log('Text response:', textResponse)
        // Try to parse as JSON anyway
        try {
          data = JSON.parse(textResponse)
          console.log('Parsed text as JSON:', data)
        } catch {
          // If not JSON, return the text as reply
          data = { reply: textResponse || 'Response received' }
          console.log('Using text as reply:', data)
        }
      }
      
      const reply = data.reply || data.message || data.text || data.response || data.output || data.data?.reply || 'No reply received'
      console.log('Final reply:', reply)
      
      return {
        success: true,
        reply: reply
      }
    } catch (fetchError: any) {
      console.error('=== Chat API Error ===')
      console.error('Error type:', fetchError.constructor.name)
      console.error('Error message:', fetchError.message)
      console.error('Error stack:', fetchError.stack)
      
      // If it's already a createError, re-throw it
      if (fetchError.statusCode) {
        throw fetchError
      }
      
      // Handle network errors
      if (fetchError.message?.includes('fetch failed') || fetchError.message?.includes('ECONNREFUSED')) {
        throw createError({
          statusCode: 503,
          statusMessage: 'Unable to connect to webhook server. Please check if the n8n server is running.'
        })
      }
      
      throw createError({
        statusCode: fetchError.statusCode || 500,
        statusMessage: fetchError.message || 'Failed to process chat message'
      })
    }
  } catch (error: any) {
    console.error('Chat API error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to process chat message'
    })
  }
})

