import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, 'id'))
    
    await prisma.jbiddulph_links.delete({
      where: { id }
    })
    
    return {
      success: true,
      message: 'Link deleted successfully'
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete link'
    })
  }
})
