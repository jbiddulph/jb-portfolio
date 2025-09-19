import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, 'id'))
    
    const portfolio = await prisma.jbiddulph_portfolio.findUnique({
      where: { id }
    })
    
    if (!portfolio) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Portfolio item not found'
      })
    }
    
    return {
      success: true,
      data: portfolio
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch portfolio item'
    })
  }
})
