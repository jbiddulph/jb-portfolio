import { getLivePublicPortfolio } from '~/lib/portfolioCache'
import { withPrismaRetry } from '~/lib/prismaRetry'
import { prisma } from '~/lib/prisma'
import { PUBLIC_PORTFOLIO_SELECT } from '~/lib/portfolioFields'
import { isNumericId, projectSlug, slugify } from '~/lib/portfolioSlug'
import { findProjectDetails } from '~/lib/projectDetails'

const PUBLIC_SELECT = { ...PUBLIC_PORTFOLIO_SELECT, live: true } as const

/**
 * Public project detail, addressed by slug (e.g. /api/portfolio/dog-healthy).
 * Numeric ids are still accepted so old /portfolio/12 links keep resolving.
 *
 * Live rows are served from a short in-memory cache shared with the list
 * endpoint so slug pages do not open a fresh findMany on every request
 * (that pattern was exhausting Supabase's session pool).
 */
export default defineEventHandler(async (event) => {
  const param = (getRouterParam(event, 'slug') || '').trim()

  if (!param) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid project slug' })
  }

  try {
    const project = await resolveProject(param)

    if (!project || !project.live) {
      throw createError({ statusCode: 404, statusMessage: 'Project not found' })
    }

    const { live, ...publicProject } = project

    return {
      success: true,
      data: {
        ...publicProject,
        slug: projectSlug(publicProject),
        details: findProjectDetails(publicProject)
      }
    }
  } catch (error: any) {
    if (error?.statusCode) {
      throw error
    }

    console.error('Error in portfolio/[slug] API:', error)
    throw createError({
      statusCode: 503,
      statusMessage: 'Failed to fetch project details. Please try again.'
    })
  }
})

async function resolveProject (param: string) {
  if (isNumericId(param)) {
    const id = parseInt(param, 10)
    const cached = await getLivePublicPortfolio().catch(() => null)
    const fromCache = cached?.find((item) => item.id === id)
    if (fromCache) return fromCache

    return withPrismaRetry(() =>
      prisma.jbiddulph_portfolio.findUnique({
        where: { id },
        select: PUBLIC_SELECT
      })
    )
  }

  const wanted = slugify(param)
  const candidates = await getLivePublicPortfolio()
  return candidates.find((item) => projectSlug(item) === wanted) || null
}
