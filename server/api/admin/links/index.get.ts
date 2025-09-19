import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const links = await prisma.jbiddulph_links.findMany({
      orderBy: {
        created_at: 'desc'
      }
    })
    
    return {
      success: true,
      data: links
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch links'
    })
  }
})
