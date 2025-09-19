<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Admin Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <NuxtLink to="/admin" class="text-xl font-bold text-gray-900">
              JBiddulph Admin
            </NuxtLink>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-700">{{ user?.email }}</span>
            <button 
              @click="signOut"
              class="text-sm text-gray-500 hover:text-gray-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex">
        <!-- Sidebar -->
        <nav class="w-64 bg-white rounded-lg shadow-sm p-6 mr-8">
          <ul class="space-y-2">
            <li>
              <NuxtLink 
                to="/admin" 
                class="flex items-center px-3 py-2 text-sm font-medium rounded-md"
                :class="$route.path === '/admin' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'"
              >
                <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"></path>
                </svg>
                Dashboard
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="/admin/designs" 
                class="flex items-center px-3 py-2 text-sm font-medium rounded-md"
                :class="$route.path === '/admin/designs' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'"
              >
                <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
                </svg>
                Designs
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="/admin/portfolio" 
                class="flex items-center px-3 py-2 text-sm font-medium rounded-md"
                :class="$route.path === '/admin/portfolio' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'"
              >
                <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                Portfolio
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="/admin/site-info" 
                class="flex items-center px-3 py-2 text-sm font-medium rounded-md"
                :class="$route.path === '/admin/site-info' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'"
              >
                <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Site Info
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="/admin/links" 
                class="flex items-center px-3 py-2 text-sm font-medium rounded-md"
                :class="$route.path === '/admin/links' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'"
              >
                <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                </svg>
                Links
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="/admin/pages" 
                class="flex items-center px-3 py-2 text-sm font-medium rounded-md"
                :class="$route.path === '/admin/pages' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'"
              >
                <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Pages
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Main Content -->
        <main class="flex-1">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const client = useSupabaseClient()
const user = ref(null)

// Get authenticated user data securely
const fetchUser = async () => {
  try {
    const { data: { user: authenticatedUser }, error } = await client.auth.getUser()
    if (!error && authenticatedUser) {
      user.value = authenticatedUser
    }
  } catch (error) {
    console.error('Error fetching user:', error)
    user.value = null
  }
}

// Fetch user on mount
onMounted(() => {
  fetchUser()
})

const signOut = async () => {
  await client.auth.signOut()
  await navigateTo('/login')
}
</script>
