import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    console.log('Admin videos API called')
    const videos = await prisma.jbiddulph_videos.findMany({
      orderBy: {
        created_at: 'desc'
      }
    })
    
    console.log('Admin API - Found videos:', videos.length)
    
    return {
      success: true,
      data: videos
    }
  } catch (error) {
    console.error('Admin videos API error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch videos'
    })
  }
})

