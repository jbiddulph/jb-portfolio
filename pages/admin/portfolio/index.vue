<template>
  <div>
    <div class="mb-8 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Portfolio Management</h1>
        <p class="mt-2 text-gray-600">Manage your portfolio projects</p>
      </div>
      <NuxtLink 
        to="/admin/portfolio/new"
        class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Add New Project
      </NuxtLink>
    </div>

    <!-- Portfolio Items Table -->
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <div v-if="portfolio.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No portfolio items</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by adding your first project.</p>
        <div class="mt-6">
          <NuxtLink 
            to="/admin/portfolio/new"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Add Project
          </NuxtLink>
        </div>
      </div>

      <ul v-else class="divide-y divide-gray-200">
        <li v-for="item in portfolio" :key="item.id" class="px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div v-if="item.project_image" class="flex-shrink-0">
                <img 
                  :src="item.project_image" 
                  :alt="item.project_name"
                  class="h-12 w-12 rounded-lg object-cover"
                />
              </div>
              <div v-else class="flex-shrink-0">
                <div class="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                  </svg>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-medium text-gray-900 break-words">
                  {{ item.project_name }}
                </h3>
                <p class="text-sm text-gray-500 break-words">
                  {{ item.project_description }}
                </p>
                <div class="flex flex-wrap items-center gap-4 mt-1">
                  <span class="text-xs text-gray-400">
                    {{ formatDate(item.project_date) }}
                  </span>
                  <a 
                    v-if="item.project_link"
                    :href="item.project_link" 
                    target="_blank"
                    class="text-xs text-indigo-600 hover:text-indigo-500 break-all"
                  >
                    View Project →
                  </a>
                </div>
                <div v-if="item.project_tags" class="mt-2">
                  <div class="flex flex-wrap gap-1">
                    <span 
                      v-for="tag in getTags(item.project_tags)" 
                      :key="tag"
                      class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      {{ tag.trim() }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <NuxtLink 
                :to="`/admin/portfolio/${item.id}/edit`"
                class="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
              >
                Edit
              </NuxtLink>
              <button 
                @click="deleteProject(item.id)"
                class="text-red-600 hover:text-red-500 text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

const portfolio = ref([])

onMounted(async () => {
  await fetchPortfolio()
})

const fetchPortfolio = async () => {
  try {
    const response = await $fetch('/api/admin/portfolio')
    portfolio.value = response.data || []
  } catch (error) {
    console.error('Error fetching portfolio:', error)
  }
}

const deleteProject = async (projectId) => {
  if (confirm('Are you sure you want to delete this project?')) {
    try {
      await $fetch(`/api/admin/portfolio/${projectId}`, {
        method: 'DELETE'
      })
      await fetchPortfolio()
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getTags = (tagsString) => {
  if (!tagsString) return []
  return tagsString.split(',').filter(tag => tag.trim())
}
</script>
