import { computed } from 'vue'

/**
 * Shared, client-side view of the signed-in Supabase user. Only the site owner
 * has an account, so a non-null user means "admin is logged in".
 */
export const useAuthUser = () => {
  const user = useState<any>('auth-user', () => null)
  const checked = useState<boolean>('auth-user:checked', () => false)
  const isAdmin = computed(() => !!user.value)

  const getClient = () => {
    if (!process.client) return null
    try {
      return useSupabaseClient()
    } catch (error) {
      console.warn('Failed to initialize Supabase client:', error)
      return null
    }
  }

  const refresh = async () => {
    const client = getClient()
    if (!client) return null
    try {
      const { data: { session } } = await client.auth.getSession()
      if (!session) {
        user.value = null
      } else {
        const { data: { user: authenticatedUser }, error } = await client.auth.getUser()
        user.value = !error && authenticatedUser ? authenticatedUser : null
      }
    } catch (error) {
      console.error('Error fetching user:', error)
      user.value = null
    } finally {
      checked.value = true
    }
    return user.value
  }

  const load = async () => {
    if (checked.value) return user.value
    return refresh()
  }

  const signOut = async () => {
    const client = getClient()
    if (client) await client.auth.signOut()
    user.value = null
  }

  return { user, isAdmin, checked, load, refresh, signOut }
}
