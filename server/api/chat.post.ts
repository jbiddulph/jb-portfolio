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
    // Using GET method as configured in n8n
    const baseUrl = 'https://n8n.neurohub.uk/webhook-test/jbiddulph/a0fe2042-ef3d-4911-a488-42343d8bf39b'
    const urlWithParams = new URL(baseUrl)
    urlWithParams.searchParams.append('text', text)
    
    console.log('Calling webhook with GET:', urlWithParams.toString())
    
    try {
      const response = await fetch(urlWithParams.toString(), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })
      
      console.log('Webhook response status:', response.status, response.statusText)
      console.log('Webhook response headers:', Object.fromEntries(response.headers.entries()))
      
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
      let data
      
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
        reply: data.reply || data.message || data.text || data.response || data.output || 'No reply received'
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

