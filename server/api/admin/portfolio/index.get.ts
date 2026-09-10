import { prisma } from '~/lib/prisma'
import { PUBLIC_PORTFOLIO_SELECT } from '~/lib/portfolioFields'

export default defineEventHandler(async () => {
  try {
    console.log('Admin portfolio API called')
    const portfolio = await prisma.jbiddulph_portfolio.findMany({
      orderBy: [
        { sort_order: 'asc' },
        { project_date: 'desc' }
      ],
      select: {
        ...PUBLIC_PORTFOLIO_SELECT,
        live: true,
        sort_order: true,
        created_at: true,
        updated_at: true
      }
    })
    
    console.log('Admin API - Found portfolio items:', portfolio.length)
    
    return {
      success: true,
      data: portfolio
    }
  } catch (error) {
    console.error('Admin portfolio API error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch portfolio'
    })
  }
})
