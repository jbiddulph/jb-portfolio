import { prisma } from '~/lib/prisma'
import { pickAdminPortfolioFields } from '~/lib/portfolioFields'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const adminFields = pickAdminPortfolioFields(body)
    
    const maxSortOrder = await prisma.jbiddulph_portfolio.aggregate({
      _max: { sort_order: true }
    })

    const portfolio = await prisma.jbiddulph_portfolio.create({
      data: {
        project_name: body.project_name,
        project_date: body.project_date,
        project_link: body.project_link,
        project_image: body.project_image,
        project_description: body.project_description,
        project_tags: body.project_tags,
        live: body.live ?? true,
        sort_order: (maxSortOrder._max.sort_order ?? 0) + 1,
        ...adminFields,
        passwords: encryptSecret(adminFields.passwords)
      }
    })
    
    return {
      success: true,
      data: {
        ...portfolio,
        passwords: decryptSecret(portfolio.passwords)
      }
    }
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to create portfolio item'
    })
  }
})
