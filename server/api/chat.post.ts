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
      console.log('Request body:', JSON.stringify({ text }))
      
      try {
        // Add timeout to prevent hanging requests
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout
        
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ text }),
          signal: controller.signal,
        })
        
        clearTimeout(timeoutId)
      
      console.log('Response status:', response.status, response.statusText)
      console.log('Response headers:', Object.fromEntries(response.headers.entries()))
      console.log('Response URL:', response.url)
      
      if (!response.ok) {
        let errorText = ''
        let errorData = null
        try {
          errorText = await response.text()
          console.error('Error response body:', errorText)
          // Try to parse as JSON
          try {
            errorData = JSON.parse(errorText)
            console.error('Parsed error data:', errorData)
          } catch {
            // Not JSON, use as text
          }
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
        
        // Handle n8n-specific errors
        if (response.status === 500 && errorData?.message) {
          if (errorData.message.includes('Unused Respond to Webhook node')) {
            throw createError({
              statusCode: 500,
              statusMessage: `n8n Workflow Error: Unused "Respond to Webhook" node found. 
              
To fix this in n8n:
1. Remove any unused "Respond to Webhook" nodes from your workflow
2. OR connect the "Respond to Webhook" node properly in the workflow
3. Make sure only ONE "Respond to Webhook" node is connected and active
4. The node should be at the end of your workflow execution path`
            })
          }
          
          // Other n8n errors
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

      // Try to parse as JSON
      const contentType = response.headers.get('content-type') || ''
      console.log('Content-Type:', contentType)
      
      let data
      if (contentType.includes('application/json')) {
        data = await response.json()
        console.log('Parsed JSON response:', JSON.stringify(data, null, 2))
      } else {
        // If not JSON, try to get text
        const textResponse = await response.text()
        console.log('Text response:', textResponse)
        // Try to parse as JSON anyway
        try {
          data = JSON.parse(textResponse)
          console.log('Parsed text as JSON:', JSON.stringify(data, null, 2))
        } catch {
          // If not JSON, return the text as reply
          data = { reply: textResponse || 'Response received' }
          console.log('Using text as reply:', data)
        }
      }
      
      // n8n workflow responses can be in various formats
      // Try multiple possible response structures
      let reply = 
        data.reply || 
        data.message || 
        data.text || 
        data.response || 
        data.output || 
        data.data?.reply ||
        data.data?.message ||
        data.data?.text ||
        data.data?.output ||
        // n8n might return the workflow output directly
        (data.body && (data.body.reply || data.body.message || data.body.text || data.body.output)) ||
        // Check if it's an array (n8n sometimes returns arrays)
        (Array.isArray(data) && data[0] && (data[0].reply || data[0].message || data[0].text || data[0].output || data[0].json?.reply || data[0].json?.message)) ||
        // Check for n8n's standard output format
        (data.json && (data.json.reply || data.json.message || data.json.text || data.json.output)) ||
        // If data is a string, use it directly
        (typeof data === 'string' ? data : null) ||
        'No reply received'
      
      // If we got "Workflow was started", the workflow might be async
      // In that case, we should check if there's actual output data
      if (reply === 'Workflow was started' || reply?.includes('Workflow was started')) {
        console.log('Got workflow start confirmation, checking for actual output...')
        // Try to find the actual output in the response
        reply = 
          data.output ||
          data.result ||
          data.data ||
          (data.body && typeof data.body === 'string' ? data.body : null) ||
          (typeof data === 'object' && JSON.stringify(data).replace(/Workflow was started/g, '').trim() ? JSON.stringify(data) : null) ||
          'Workflow started successfully. Waiting for response...'
      }
      
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
      if (fetchError.name === 'AbortError') {
        throw createError({
          statusCode: 504,
          statusMessage: 'Request timeout. The webhook took too long to respond.'
        })
      }
      
      if (fetchError.message?.includes('fetch failed') || fetchError.message?.includes('ECONNREFUSED') || fetchError.message?.includes('ENOTFOUND')) {
        throw createError({
          statusCode: 503,
          statusMessage: 'Unable to connect to webhook server. Please check if the n8n server is running and accessible.'
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

