import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, 'id'))
    const body = await readBody(event)
    
    const link = await prisma.jbiddulph_links.update({
      where: { id },
      data: {
        link_name: body.link_name,
        link_url: body.link_url
      }
    })
    
    return {
      success: true,
      data: link
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update link'
    })
  }
})
