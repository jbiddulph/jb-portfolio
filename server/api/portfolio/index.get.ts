import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    console.log('Public portfolio API called')
    
    const portfolio = await prisma.jbiddulph_portfolio.findMany({
      orderBy: {
        project_date: 'desc'
      },
      select: {
        id: true,
        project_name: true,
        project_description: true,
        project_date: true,
        project_link: true,
        project_image: true,
        project_tags: true
      },
      take: 20 // Limit to 20 items for better performance
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