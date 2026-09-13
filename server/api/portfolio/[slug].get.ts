import { prisma } from '~/lib/prisma'
import { PUBLIC_PORTFOLIO_SELECT } from '~/lib/portfolioFields'
import { isNumericId, projectSlug, slugify } from '~/lib/portfolioSlug'
import { findProjectDetails } from '~/lib/projectDetails'

const PUBLIC_SELECT = { ...PUBLIC_PORTFOLIO_SELECT, live: true } as const

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
    let project = null

    if (isNumericId(param)) {
      project = await prisma.jbiddulph_portfolio.findUnique({
        where: { id: parseInt(param, 10) },
        select: PUBLIC_SELECT
      })
    } else {
      const wanted = slugify(param)
      const candidates = await prisma.jbiddulph_portfolio.findMany({
        where: { live: true },
        select: PUBLIC_SELECT,
        take: 200
      })
      project = candidates.find((item) => projectSlug(item) === wanted) || null
    }

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
      statusCode: 500,
      statusMessage: `Failed to fetch project: ${error?.message || 'Unknown error'}`
    })
  }
})
