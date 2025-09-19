import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const portfolio = await prisma.jbiddulph_portfolio.findMany({
      orderBy: {
        project_date: 'desc'
      }
    })
    
    return {
      success: true,
      data: portfolio
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch portfolio'
    })
  }
})