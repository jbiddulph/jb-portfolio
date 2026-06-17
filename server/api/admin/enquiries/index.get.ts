import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const enquiries = await prisma.jbiddulph_enquiries.findMany({
      orderBy: {
        created_at: 'desc'
      }
    })

    return {
      success: true,
      data: enquiries
    }
  } catch (error: any) {
    console.error('Error fetching admin enquiries:', error)
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch enquiries: ${error.message}`
    })
  }
})
