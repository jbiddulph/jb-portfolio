import { prisma } from '~/lib/prisma'
import { PUBLIC_PORTFOLIO_SELECT } from '~/lib/portfolioFields'

export default defineEventHandler(async () => {
  try {
    // Get total count
    const totalCount = await prisma.jbiddulph_portfolio.count()
    
    // Get all portfolio items
    const allItems = await prisma.jbiddulph_portfolio.findMany({
      orderBy: {
        project_date: 'desc'
      },
      select: PUBLIC_PORTFOLIO_SELECT
    })
    
    // Get first 3 items for preview
    const previewItems = await prisma.jbiddulph_portfolio.findMany({
      take: 3,
      orderBy: {
        project_date: 'desc'
      },
      select: PUBLIC_PORTFOLIO_SELECT
    })
    
    return {
      success: true,
      data: {
        totalCount,
        allItems,
        previewItems,
        message: `Found ${totalCount} portfolio items in database`
      }
    }
  } catch (error) {
    console.error('Debug portfolio error:', error)
    return {
      success: false,
      error: error.message,
      stack: error.stack
    }
  }
})
