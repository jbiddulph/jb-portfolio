import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, 'id'))
    const body = await readBody(event)
    
    const design = await prisma.jbiddulph_designs.update({
      where: { id },
      data: body
    })
    
    return {
      success: true,
      data: design
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update design'
    })
  }
})
