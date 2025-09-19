import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, 'id'))
    const body = await readBody(event)
    
    console.log('Updating design with ID:', id)
    console.log('Update data:', body)
    
    const design = await prisma.jbiddulph_designs.update({
      where: { id },
      data: body
    })
    
    console.log('Design updated successfully:', design)
    
    return {
      success: true,
      data: design
    }
  } catch (error) {
    console.error('Error updating design:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update design'
    })
  }
})
