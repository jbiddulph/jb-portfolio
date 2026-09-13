import { prisma } from '~/lib/prisma'

export default defineEventHandler(async () => {
  try {
    console.log('Testing database connection...')

    // Do not $disconnect afterwards — on serverless that drops the shared
    // Prisma client and forces new pool checkouts under load.
    await prisma.$connect()
    console.log('Database connected successfully')

    const count = await prisma.jbiddulph_portfolio.count()
    console.log('Portfolio table accessible, count:', count)

    const project = await prisma.jbiddulph_portfolio.findFirst({
      select: { id: true }
    })
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
  } catch (error: any) {
    console.error('Database test error:', error)
    return {
      success: false,
      message: 'Database connection failed',
      error: error?.message || String(error)
    }
  }
})
