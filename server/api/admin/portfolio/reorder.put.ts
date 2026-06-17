import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const order = body?.order

    if (!Array.isArray(order) || order.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Order must be a non-empty array of project IDs'
      })
    }

    const ids = order.map((id) => parseInt(String(id), 10)).filter((id) => !isNaN(id))

    if (ids.length !== order.length) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Order must contain valid numeric project IDs'
      })
    }

    await prisma.$transaction(
      ids.map((id, index) =>
        prisma.jbiddulph_portfolio.update({
          where: { id },
          data: { sort_order: index + 1 }
        })
      )
    )

    return {
      success: true,
      message: 'Portfolio order updated'
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update portfolio order'
    })
  }
})
