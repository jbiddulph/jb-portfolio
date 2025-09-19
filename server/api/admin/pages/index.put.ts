import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Check if pages already exist
    const existing = await prisma.jbiddulph_pages.findFirst()
    
    let pages
    if (existing) {
      // Update existing
      pages = await prisma.jbiddulph_pages.update({
        where: { id: existing.id },
        data: {
          home: body.home,
          cv: body.cv,
          portfolio: body.portfolio,
          documentation: body.documentation,
          blog: body.blog
        }
      })
    } else {
      // Create new
      pages = await prisma.jbiddulph_pages.create({
        data: {
          home: body.home,
          cv: body.cv,
          portfolio: body.portfolio,
          documentation: body.documentation,
          blog: body.blog
        }
      })
    }
    
    return {
      success: true,
      data: pages
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update pages'
    })
  }
})
