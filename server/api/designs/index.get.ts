import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    // Fetch all designs that users can choose from
    const designs = await prisma.jbiddulph_designs.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        is_active: true
      },
      orderBy: {
        name: 'asc'
      }
    })
    
    return {
      success: true,
      data: designs
    }
  } catch (error) {
    console.error('Error fetching designs:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch designs'
    })
  }
})
