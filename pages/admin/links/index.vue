<template>
  <div>
    <div class="mb-8 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Links Management</h1>
        <p class="mt-2 text-gray-600">Manage your external links</p>
      </div>
      <button 
        @click="showAddForm = true"
        class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Add New Link
      </button>
    </div>

    <!-- Add/Edit Form Modal -->
    <div v-if="showAddForm || editingLink" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ editingLink ? 'Edit Link' : 'Add New Link' }}
          </h3>
          <form @submit.prevent="saveLink" class="space-y-4">
            <div>
              <label for="link_name" class="block text-sm font-medium text-gray-700">Link Name</label>
              <input
                v-model="linkForm.link_name"
                type="text"
                id="link_name"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., GitHub"
              />
            </div>
            <div>
              <label for="link_url" class="block text-sm font-medium text-gray-700">Link URL</label>
              <input
                v-model="linkForm.link_url"
                type="url"
                id="link_url"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="https://example.com"
              />
            </div>
            <div class="flex justify-end space-x-3">
              <button
                type="button"
                @click="cancelEdit"
                class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
              >
                {{ loading ? 'Saving...' : 'Save' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Links Table -->
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <div v-if="links.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No links</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by adding your first link.</p>
        <div class="mt-6">
          <button 
            @click="showAddForm = true"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Add Link
          </button>
        </div>
      </div>

      <ul v-else class="divide-y divide-gray-200">
        <li v-for="link in links" :key="link.id" class="px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <div class="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <svg class="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                  </svg>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-medium text-gray-900 truncate">
                  {{ link.link_name }}
                </h3>
                <a 
                  :href="link.link_url" 
                  target="_blank"
                  class="text-sm text-indigo-600 hover:text-indigo-500 truncate block"
                >
                  {{ link.link_url }}
                </a>
                <p class="text-xs text-gray-400 mt-1">
                  Added {{ formatDate(link.created_at) }}
                </p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <button 
                @click="editLink(link)"
                class="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
              >
                Edit
              </button>
              <button 
                @click="deleteLink(link.id)"
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

const links = ref([])
const showAddForm = ref(false)
const editingLink = ref(null)
const loading = ref(false)

const linkForm = reactive({
  link_name: '',
  link_url: ''
})

onMounted(async () => {
  await fetchLinks()
})

const fetchLinks = async () => {
  try {
    const response = await $fetch('/api/admin/links')
    links.value = response.data || []
  } catch (error) {
    console.error('Error fetching links:', error)
  }
}

const editLink = (link) => {
  editingLink.value = link
  linkForm.link_name = link.link_name
  linkForm.link_url = link.link_url
  showAddForm.value = false
}

const cancelEdit = () => {
  showAddForm.value = false
  editingLink.value = null
  linkForm.link_name = ''
  linkForm.link_url = ''
}

const saveLink = async () => {
  loading.value = true
  
  try {
    if (editingLink.value) {
      // Update existing link
      await $fetch(`/api/admin/links/${editingLink.value.id}`, {
        method: 'PUT',
        body: linkForm
      })
    } else {
      // Create new link
      await $fetch('/api/admin/links', {
        method: 'POST',
        body: linkForm
      })
    }
    
    await fetchLinks()
    cancelEdit()
  } catch (error) {
    console.error('Error saving link:', error)
  } finally {
    loading.value = false
  }
}

const deleteLink = async (linkId) => {
  if (confirm('Are you sure you want to delete this link?')) {
    try {
      await $fetch(`/api/admin/links/${linkId}`, {
        method: 'DELETE'
      })
      await fetchLinks()
    } catch (error) {
      console.error('Error deleting link:', error)
    }
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>
