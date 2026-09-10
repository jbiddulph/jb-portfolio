import { serverSupabaseUser } from '#supabase/server'
import type { H3Event } from 'h3'

export const requireAdminUser = async (event: H3Event) => {
  let user = null

  try {
    user = await serverSupabaseUser(event)
  } catch {
    user = null
  }

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  return user
}
