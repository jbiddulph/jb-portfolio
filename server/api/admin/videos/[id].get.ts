import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, 'id'))
    
    const video = await prisma.jbiddulph_videos.findUnique({
      where: { id }
    })
    
    if (!video) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Video not found'
      })
    }
    
    return {
      success: true,
      data: video
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch video'
    })
  }
})

