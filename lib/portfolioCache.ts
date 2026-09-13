import { prisma } from '~/lib/prisma'
import { withPrismaRetry } from '~/lib/prismaRetry'
import { PUBLIC_PORTFOLIO_SELECT } from '~/lib/portfolioFields'

export type PublicPortfolioRow = {
  id: number
  project_name: string
  project_date: Date
  project_link: string | null
  project_image: string | null
  project_description: string | null
  project_tags: string | null
  live: true
}

const PUBLIC_LIVE_SELECT = { ...PUBLIC_PORTFOLIO_SELECT, live: true } as const

type CacheEntry = {
  expiresAt: number
  rows: PublicPortfolioRow[]
}

// Module-scoped: shared across requests in the same serverless isolate.
let cache: CacheEntry | null = null
let inflight: Promise<PublicPortfolioRow[]> | null = null

const CACHE_TTL_MS = 60_000

const fetchLivePortfolio = () =>
  withPrismaRetry(() =>
    prisma.jbiddulph_portfolio.findMany({
      where: { live: true },
      orderBy: [
        { sort_order: 'asc' },
        { project_date: 'desc' }
      ],
      select: PUBLIC_LIVE_SELECT,
      take: 200
    })
  ) as Promise<PublicPortfolioRow[]>

/**
 * Live public portfolio rows with a short in-memory TTL.
 * Slug detail pages share this list so each request does not open a fresh
 * findMany against Supabase's tiny session pool.
 */
export const getLivePublicPortfolio = async (options?: { force?: boolean }) => {
  const now = Date.now()
  if (!options?.force && cache && cache.expiresAt > now) {
    return cache.rows
  }

  if (!options?.force && inflight) {
    return inflight
  }

  inflight = fetchLivePortfolio()
    .then((rows) => {
      cache = { rows, expiresAt: Date.now() + CACHE_TTL_MS }
      return rows
    })
    .finally(() => {
      inflight = null
    })

  return inflight
}

export const invalidateLivePublicPortfolioCache = () => {
  cache = null
}
