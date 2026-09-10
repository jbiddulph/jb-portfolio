import { prisma } from '~/lib/prisma'
import { PUBLIC_PORTFOLIO_SELECT } from '~/lib/portfolioFields'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, 'id'))
    console.log('Fetching portfolio project with ID:', id)
    
    if (!id || isNaN(id)) {
      console.error('Invalid ID provided:', getRouterParam(event, 'id'))
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid project ID'
      })
    }
    
    const project = await prisma.jbiddulph_portfolio.findUnique({
      where: { id },
      select: {
        ...PUBLIC_PORTFOLIO_SELECT,
        live: true
      }
    })
    
    console.log('Project found:', project ? 'Yes' : 'No')
    
    if (!project || !project.live) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Project not found'
      })
    }

    const { live, ...publicProject } = project
    
    return {
      success: true,
      data: publicProject
    }
  } catch (error) {
    console.error('Error in portfolio/[id] API:', error)
    
    // If it's already a createError, re-throw it
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch project: ${error.message || 'Unknown error'}`
    })
  }
})
