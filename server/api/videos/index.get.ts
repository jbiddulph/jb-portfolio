import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    console.log('Public videos API called')
    
    const videos = await prisma.jbiddulph_videos.findMany({
      orderBy: {
        created_at: 'desc'
      },
      select: {
        id: true,
        title: true,
        description: true,
        youtube_url: true,
        link: true,
        created_at: true
      }
    })
    
    console.log('Found videos:', videos.length)
    
    return {
      success: true,
      data: videos
    }
  } catch (error) {
    console.error('Videos API error:', error)
    
    // Return empty array instead of throwing error to prevent page crashes
    return {
      success: false,
      data: [],
      error: 'Failed to fetch videos'
    }
  }
})

