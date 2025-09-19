export default defineNuxtRouteMiddleware(async (to) => {
  const supabase = useSupabaseClient()
  
  try {
    // Use secure getUser() method instead of relying on session data
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      console.error('Auth error:', error)
      return navigateTo('/login')
    }
    
    // You can add additional admin role checks here if needed
    // For example, check if user has admin privileges
    
  } catch (error) {
    console.error('Auth check error:', error)
    return navigateTo('/login')
  }
})
