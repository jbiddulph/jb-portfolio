import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    console.log('Fetching admin links...')
    const links = await prisma.jbiddulph_links.findMany({
      orderBy: {
        created_at: 'desc'
      }
    })
    
    console.log(`Successfully fetched ${links.length} links`)
    return {
      success: true,
      data: links
    }
  } catch (error) {
    console.error('Error fetching admin links:', error)
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch links: ${error.message}`
    })
  }
})
