import { getLivePublicPortfolio } from '~/lib/portfolioCache'
import { projectSlug } from '~/lib/portfolioSlug'

export default defineEventHandler(async (event) => {
  try {
    // Shared short-lived cache with the slug endpoint so list + detail traffic
    // do not each burn a Supabase session-pool connection.
    const portfolio = await getLivePublicPortfolio()

    return {
      success: true,
      data: portfolio.slice(0, 50).map((item) => {
        const { live: _live, ...publicItem } = item
        return { ...publicItem, slug: projectSlug(publicItem) }
      })
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
