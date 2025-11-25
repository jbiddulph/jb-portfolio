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
    
    // Try POST first (standard for webhooks), then GET if POST fails
    let response
    let data
    
    try {
      // Try POST request first
      response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })
      
      console.log('POST request status:', response.status, response.statusText)
      
      if (!response.ok && response.status === 404) {
        // If POST returns 404, try GET with query parameters
        console.log('POST returned 404, trying GET with query params...')
        const urlWithParams = new URL(webhookUrl)
        urlWithParams.searchParams.append('text', text)
        
        response = await fetch(urlWithParams.toString(), {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        })
        
        console.log('GET request status:', response.status, response.statusText)
      }
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('Webhook error response:', errorText)
        throw createError({
          statusCode: response.status,
          statusMessage: `Webhook error (${response.status}): ${errorText || response.statusText}`
        })
      }

      // Try to parse as JSON
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        data = await response.json()
      } else {
        // If not JSON, try to get text
        const textResponse = await response.text()
        console.log('Non-JSON response:', textResponse)
        // Try to parse as JSON anyway
        try {
          data = JSON.parse(textResponse)
        } catch {
          // If not JSON, return the text as reply
          data = { reply: textResponse || 'Response received' }
        }
      }
      
      console.log('Webhook response data:', data)
      
      return {
        success: true,
        reply: data.reply || data.message || data.text || data.response || 'No reply received'
      }
    } catch (fetchError: any) {
      console.error('Fetch error:', fetchError)
      throw createError({
        statusCode: fetchError.statusCode || 500,
        statusMessage: fetchError.message || 'Failed to connect to webhook'
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

