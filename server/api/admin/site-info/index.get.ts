import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const siteInfo = await prisma.jbiddulph_info.findFirst({
      include: {
        design: true
      },
      orderBy: {
        created_at: 'desc'
      }
    })
    
    console.log('Fetched site info:', siteInfo)
    
    return {
      success: true,
      data: siteInfo
    }
  } catch (error) {
    console.error('Site info fetch error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch site info: ${error.message}`
    })
  }
})
