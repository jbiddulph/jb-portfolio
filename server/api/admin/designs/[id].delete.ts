import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, 'id'))
    
    await prisma.jbiddulph_designs.delete({
      where: { id }
    })
    
    return {
      success: true,
      message: 'Design deleted successfully'
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete design'
    })
  }
})
