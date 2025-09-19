import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const portfolio = await prisma.jbiddulph_portfolio.create({
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
      statusMessage: 'Failed to create portfolio item'
    })
  }
})
