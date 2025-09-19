import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const siteInfo = await prisma.jbiddulph_info.findFirst({
      include: {
        design: true
      }
    })
    
    return {
      success: true,
      data: siteInfo
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch site info'
    })
  }
})