export default defineNuxtRouteMiddleware(async (to) => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  
  // Wait a bit for user state to initialize on client side
  if (process.client) {
    // If user is not immediately available, check session
    if (!user.value) {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session?.user) {
          return navigateTo('/login')
        }
      } catch (error) {
        console.error('Auth check error:', error)
        return navigateTo('/login')
      }
    }
  } else {
    // Server side check
    if (!user.value) {
      return navigateTo('/login')
    }
  }
  
  // You can add additional admin role checks here if needed
  // For example, check if user has admin privileges
})
