import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    // Test portfolio data
    const portfolioCount = await prisma.jbiddulph_portfolio.count()
    const portfolio = await prisma.jbiddulph_portfolio.findMany({
      take: 5,
      orderBy: {
        project_date: 'desc'
      }
    })
    
    // Test site info
    const siteInfo = await prisma.jbiddulph_info.findFirst({
      include: {
        design: true
      }
    })
    
    return {
      success: true,
      data: {
        portfolioCount,
        portfolio,
        siteInfo: siteInfo ? 'Site info exists' : 'No site info found',
        hasDesign: siteInfo?.design ? 'Design exists' : 'No design found'
      }
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
      stack: error.stack
    }
  }
})
