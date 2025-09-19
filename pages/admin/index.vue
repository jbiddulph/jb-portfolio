<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
      <p class="mt-2 text-gray-600">Manage your website content and designs</p>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-blue-100">
            <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Designs</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.designs }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-100">
            <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Portfolio Items</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.portfolio }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-yellow-100">
            <svg class="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Links</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.links }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-purple-100">
            <svg class="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Active Design</p>
            <p class="text-lg font-semibold text-gray-900">{{ activeDesign?.name || 'None' }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white rounded-lg shadow p-6 mb-8">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <NuxtLink 
          to="/admin/designs/new" 
          class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div class="p-2 bg-blue-100 rounded-lg mr-3">
            <svg class="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-medium text-gray-900">Create New Design</h3>
            <p class="text-sm text-gray-500">Add a new design theme</p>
          </div>
        </NuxtLink>

        <NuxtLink 
          to="/admin/portfolio/new" 
          class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div class="p-2 bg-green-100 rounded-lg mr-3">
            <svg class="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-medium text-gray-900">Add Portfolio Item</h3>
            <p class="text-sm text-gray-500">Create a new project entry</p>
          </div>
        </NuxtLink>

        <NuxtLink 
          to="/admin/site-info" 
          class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div class="p-2 bg-purple-100 rounded-lg mr-3">
            <svg class="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-medium text-gray-900">Update Site Info</h3>
            <p class="text-sm text-gray-500">Edit site details</p>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
      <div class="space-y-3">
        <div v-if="recentActivity.length === 0" class="text-gray-500 text-center py-8">
          No recent activity
        </div>
        <div v-for="activity in recentActivity" :key="activity.id" class="flex items-center p-3 bg-gray-50 rounded-lg">
          <div class="flex-shrink-0">
            <div class="h-2 w-2 bg-blue-500 rounded-full"></div>
          </div>
          <div class="ml-3">
            <p class="text-sm text-gray-900">{{ activity.description }}</p>
            <p class="text-xs text-gray-500">{{ formatDate(activity.created_at) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

const stats = ref({
  designs: 0,
  portfolio: 0,
  links: 0
})

const activeDesign = ref(null)
const recentActivity = ref([])

onMounted(async () => {
  try {
    // Fetch stats
    const [designsRes, portfolioRes, linksRes, siteInfoRes] = await Promise.all([
      $fetch('/api/admin/designs'),
      $fetch('/api/admin/portfolio'),
      $fetch('/api/admin/links'),
      $fetch('/api/admin/site-info')
    ])

    stats.value = {
      designs: designsRes.data?.length || 0,
      portfolio: portfolioRes.data?.length || 0,
      links: linksRes.data?.length || 0
    }

    activeDesign.value = siteInfoRes.data?.design

    // Generate recent activity (you can enhance this with actual activity tracking)
    recentActivity.value = [
      { id: 1, description: 'Site info updated', created_at: new Date().toISOString() },
      { id: 2, description: 'New design theme created', created_at: new Date(Date.now() - 86400000).toISOString() }
    ]
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
  }
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
