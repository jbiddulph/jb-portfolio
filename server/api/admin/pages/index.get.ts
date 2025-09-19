import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const pages = await prisma.jbiddulph_pages.findFirst({
      orderBy: {
        created_at: 'desc'
      }
    })
    
    return {
      success: true,
      data: pages
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch pages'
    })
  }
})
