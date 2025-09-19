import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const designs = await prisma.jbiddulph_designs.findMany({
      orderBy: {
        created_at: 'desc'
      }
    })
    
    return {
      success: true,
      data: designs
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch designs'
    })
  }
})
