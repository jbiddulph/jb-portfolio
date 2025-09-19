import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, 'id'))
    console.log('Delete API called for portfolio item ID:', id)
    
    // Check if the item exists first
    const existingItem = await prisma.jbiddulph_portfolio.findUnique({
      where: { id }
    })
    
    if (!existingItem) {
      console.log('Portfolio item not found for ID:', id)
      throw createError({
        statusCode: 404,
        statusMessage: 'Portfolio item not found'
      })
    }
    
    console.log('Deleting portfolio item:', existingItem.project_name)
    
    await prisma.jbiddulph_portfolio.delete({
      where: { id }
    })
    
    console.log('Portfolio item deleted successfully')
    
    return {
      success: true,
      message: 'Portfolio item deleted successfully'
    }
  } catch (error) {
    console.error('Delete portfolio error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to delete portfolio item'
    })
  }
})
