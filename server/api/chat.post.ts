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
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw createError({
        statusCode: response.status,
        statusMessage: `Webhook error: ${errorText}`
      })
    }

    const data = await response.json()
    
    return {
      success: true,
      reply: data.reply || data.message || data.text || 'No reply received'
    }
  } catch (error: any) {
    console.error('Chat API error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to process chat message'
    })
  }
})

