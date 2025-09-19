import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const pages = await prisma.jbiddulph_pages.findFirst()
    
    return {
      success: true,
      data: pages
    }
  } catch (error) {
    console.error('Pages API error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch pages: ${error.message || 'Unknown error'}`
    })
  }
})