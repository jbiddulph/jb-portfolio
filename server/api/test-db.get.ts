import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    console.log('Testing database connection...')
    
    // Test basic connection
    await prisma.$connect()
    console.log('Database connected successfully')
    
    // Test portfolio table access
    const count = await prisma.jbiddulph_portfolio.count()
    console.log('Portfolio table accessible, count:', count)
    
    // Test fetching a specific project
    const project = await prisma.jbiddulph_portfolio.findFirst()
    console.log('Sample project found:', project ? project.id : 'None')
    
    return {
      success: true,
      message: 'Database connection successful',
      data: {
        connected: true,
        portfolioCount: count,
        sampleProjectId: project?.id || null
      }
    }
  } catch (error) {
    console.error('Database test error:', error)
    return {
      success: false,
      message: 'Database connection failed',
      error: error.message
    }
  } finally {
    await prisma.$disconnect()
  }
})
