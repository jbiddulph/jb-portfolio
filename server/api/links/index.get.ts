import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const links = await prisma.jbiddulph_links.findMany({
      orderBy: {
        created_at: 'desc'
      }
    })
    
    return {
      success: true,
      data: links
    }
  } catch (error) {
    console.error('Links API error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch links: ${error.message || 'Unknown error'}`
    })
  }
})