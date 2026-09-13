import { prisma } from '~/lib/prisma'
import { withPrismaRetry } from '~/lib/prismaRetry'
import { PUBLIC_PORTFOLIO_SELECT } from '~/lib/portfolioFields'
import { projectSlug } from '~/lib/portfolioSlug'

export default defineEventHandler(async (event) => {
  try {
    const portfolio = await withPrismaRetry(() =>
      prisma.jbiddulph_portfolio.findMany({
        where: { live: true },
        orderBy: [
          { sort_order: 'asc' },
          { project_date: 'desc' }
        ],
        select: PUBLIC_PORTFOLIO_SELECT,
        take: 50
      })
    )

    return {
      success: true,
      data: portfolio.map((item) => ({ ...item, slug: projectSlug(item) }))
    }
  } catch (error: any) {
    console.error('Portfolio API error:', error)
    // Soft JSON body keeps the page from hard-crashing, but 503 lets clients
    // distinguish a backend failure from a genuinely empty portfolio.
    setResponseStatus(event, 503)
    return {
      success: false,
      data: [],
      error: 'Failed to fetch portfolio',
      message: error?.message || 'Unknown database error'
    }
  }
})
