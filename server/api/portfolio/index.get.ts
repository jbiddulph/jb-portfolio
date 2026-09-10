import { prisma } from '~/lib/prisma'
import { PUBLIC_PORTFOLIO_SELECT } from '~/lib/portfolioFields'

export default defineEventHandler(async (event) => {
  try {
    console.log('Public portfolio API called')
    
    const portfolio = await prisma.jbiddulph_portfolio.findMany({
      where: { live: true },
      orderBy: [
        { sort_order: 'asc' },
        { project_date: 'desc' }
      ],
      select: PUBLIC_PORTFOLIO_SELECT,
      take: 50 // Increased limit to show all portfolio items
    })
    
    console.log('Found portfolio items:', portfolio.length)
    
    return {
      success: true,
      data: portfolio
    }
  } catch (error) {
    console.error('Portfolio API error:', error)
    
    // Return empty array instead of throwing error to prevent page crashes
    return {
      success: false,
      data: [],
      error: 'Failed to fetch portfolio'
    }
  }
})
