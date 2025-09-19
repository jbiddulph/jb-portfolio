import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    console.log('Public portfolio API called')
    const portfolio = await prisma.jbiddulph_portfolio.findMany({
      orderBy: {
        project_date: 'desc'
      }
    })
    
    console.log('Found portfolio items:', portfolio.length)
    console.log('Portfolio data:', portfolio)
    
    return {
      success: true,
      data: portfolio
    }
  } catch (error) {
    console.error('Portfolio API error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch portfolio'
    })
  }
})