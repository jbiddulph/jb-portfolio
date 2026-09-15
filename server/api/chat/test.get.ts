export default defineEventHandler(async (event) => {
  const webhookUrl = 'https://n8njb-6378e565ae08.herokuapp.com/webhook-test/e104e40e-6134-4825-a6f0-8a646d882662/chat'
  const testMessage = 'Hello, this is a test message'
  
  try {
    console.log('=== Testing Webhook Connection ===')
    console.log('URL:', webhookUrl)
    console.log('Method: POST')
    console.log('Test message:', testMessage)
    
    // Test POST request
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        action: 'sendMessage',
        sessionId: 'webhook-test',
        chatInput: testMessage
      }),
    })
    
    const responseInfo = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
      headers: Object.fromEntries(response.headers.entries()),
      ok: response.ok,
    }
    
    console.log('Response info:', responseInfo)
    
    let responseBody
    const contentType = response.headers.get('content-type') || ''
    
    if (contentType.includes('application/json')) {
      responseBody = await response.json()
    } else {
      responseBody = await response.text()
    }
    
    console.log('Response body:', responseBody)
    
    return {
      success: response.ok,
      webhookUrl,
      request: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: {
          action: 'sendMessage',
          sessionId: 'webhook-test',
          chatInput: testMessage
        },
      },
      response: responseInfo,
      responseBody,
      message: response.ok 
        ? 'Webhook connection successful!' 
        : `Webhook returned error: ${response.status} ${response.statusText}`,
    }
  } catch (error: any) {
    console.error('Test error:', error)
    
    return {
      success: false,
      webhookUrl,
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name,
      },
      message: 'Failed to connect to webhook',
    }
  }
})

