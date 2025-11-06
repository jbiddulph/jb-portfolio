import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, 'id'))
    console.log('Delete API called for video ID:', id)
    
    // Check if the video exists first
    const existingVideo = await prisma.jbiddulph_videos.findUnique({
      where: { id }
    })
    
    if (!existingVideo) {
      console.log('Video not found for ID:', id)
      throw createError({
        statusCode: 404,
        statusMessage: 'Video not found'
      })
    }
    
    console.log('Deleting video:', existingVideo.title)
    
    await prisma.jbiddulph_videos.delete({
      where: { id }
    })
    
    console.log('Video deleted successfully')
    
    return {
      success: true,
      message: 'Video deleted successfully'
    }
  } catch (error) {
    console.error('Delete video error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to delete video'
    })
  }
})

