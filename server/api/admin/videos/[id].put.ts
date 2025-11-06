import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, 'id'))
    const body = await readBody(event)
    
    const video = await prisma.jbiddulph_videos.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        youtube_url: body.youtube_url,
        link: body.link
      }
    })
    
    return {
      success: true,
      data: video
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update video'
    })
  }
})

