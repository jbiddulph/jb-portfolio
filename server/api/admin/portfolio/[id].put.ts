import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, 'id'))
    const body = await readBody(event)
    
    const portfolio = await prisma.jbiddulph_portfolio.update({
      where: { id },
      data: {
        project_name: body.project_name,
        project_date: body.project_date,
        project_link: body.project_link,
        project_image: body.project_image,
        project_description: body.project_description,
        project_tags: body.project_tags
      }
    })
    
    return {
      success: true,
      data: portfolio
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update portfolio item'
    })
  }
})
