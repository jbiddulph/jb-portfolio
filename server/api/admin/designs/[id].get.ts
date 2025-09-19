import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, 'id'))
    console.log('Fetching design with ID:', id)
    
    const design = await prisma.jbiddulph_designs.findUnique({
      where: { id }
    })
    
    console.log('Design found:', design)
    
    if (!design) {
      console.log('Design not found for ID:', id)
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
