import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    // Test basic Prisma connection
    await prisma.$connect()
    
    // Test a simple query
    const result = await prisma.jbiddulph_portfolio.count()
    
    return {
      success: true,
      message: 'Database connection successful',
      data: {
        timestamp: new Date().toISOString(),
        portfolioCount: result,
        environment: process.env.NODE_ENV || 'unknown'
      }
    }
  } catch (error) {
    console.error('Health check failed:', error)
    
    return {
      success: false,
      message: 'Database connection failed',
      error: error.message,
      data: {
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'unknown'
      }
    }
  }
})
