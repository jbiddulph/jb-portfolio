import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, 'id'))
    
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
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch design'
    })
  }
})
