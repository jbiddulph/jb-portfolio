import { prisma } from '~/lib/prisma'
import { withPrismaRetry } from '~/lib/prismaRetry'
import { PUBLIC_PORTFOLIO_SELECT } from '~/lib/portfolioFields'
import { isNumericId, projectSlug, slugify } from '~/lib/portfolioSlug'
import { findProjectDetails } from '~/lib/projectDetails'

const PUBLIC_SELECT = { ...PUBLIC_PORTFOLIO_SELECT, live: true } as const
const SLUG_LOOKUP_SELECT = { id: true, project_name: true, live: true } as const

/**
 * Public project detail, addressed by slug (e.g. /api/portfolio/dog-healthy).
 * Numeric ids are still accepted so old /portfolio/12 links keep resolving.
 */
export default defineEventHandler(async (event) => {
  const param = (getRouterParam(event, 'slug') || '').trim()

  if (!param) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid project slug' })
  }

  try {
    const project = await withPrismaRetry(() => resolveProject(param))

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
    return prisma.jbiddulph_portfolio.findUnique({
      where: { id: parseInt(param, 10) },
      select: PUBLIC_SELECT
    })
  }

  const wanted = slugify(param)

  // Light first pass (id + name only) so slug matching does not pull full rows
  // for every live project on each detail request.
  const candidates = await prisma.jbiddulph_portfolio.findMany({
    where: { live: true },
    select: SLUG_LOOKUP_SELECT,
    take: 200
  })
  const match = candidates.find((item) => projectSlug(item) === wanted)
  if (!match) return null

  return prisma.jbiddulph_portfolio.findUnique({
    where: { id: match.id },
    select: PUBLIC_SELECT
  })
}
