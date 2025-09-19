import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const link = await prisma.jbiddulph_links.create({
      data: {
        link_name: body.link_name,
        link_url: body.link_url
      }
    })
    
    return {
      success: true,
      data: link
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create link'
    })
  }
})
