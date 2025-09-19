import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, 'id'))
    
    await prisma.jbiddulph_portfolio.delete({
      where: { id }
    })
    
    return {
      success: true,
      message: 'Portfolio item deleted successfully'
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete portfolio item'
    })
  }
})
