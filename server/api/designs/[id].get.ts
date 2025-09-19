import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, 'id'))
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Design ID is required'
      })
    }
    
    const design = await prisma.jbiddulph_designs.findUnique({
      where: { id }
    })
    
    if (!design) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Design not found'
      })
    }
    
    return {
      success: true,
      data: design
    }
  } catch (error) {
    console.error('Error fetching design:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch design'
    })
  }
})
