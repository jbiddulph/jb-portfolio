import { prisma } from '~/lib/prisma'

const SERVICE_LABELS: Record<string, string> = {
  'full-stack': 'Full Stack Applications',
  frontend: 'Frontend Development',
  'ui-ux-seo': 'UI / UX & SEO',
  multiple: 'Multiple services / Not sure'
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    if (body?.website) {
      return { success: true, message: 'Thank you for your enquiry.' }
    }

    const name = body?.name?.trim()
    const email = body?.email?.trim()
    const phone = body?.phone?.trim() || null
    const service = body?.service?.trim() || null
    const message = body?.message?.trim()

    if (!name || !email || !message) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Name, email, and message are required'
      })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Please provide a valid email address'
      })
    }

    const enquiry = await prisma.jbiddulph_enquiries.create({
      data: {
        name,
        email,
        phone,
        service,
        message
      }
    })

    const config = useRuntimeConfig()
    const webhookUrl = config.servicesEnquiryWebhookUrl

    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: enquiry.id,
            name,
            email,
            phone,
            service: service ? SERVICE_LABELS[service] || service : null,
            message,
            submitted_at: enquiry.created_at
          })
        })
      } catch (webhookError) {
        console.error('Services enquiry webhook error:', webhookError)
      }
    }

    return {
      success: true,
      message: 'Thank you for your enquiry. I will get back to you shortly.'
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }

    console.error('Services enquiry error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to submit enquiry. Please try again later.'
    })
  }
})
