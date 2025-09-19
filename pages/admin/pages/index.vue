<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Pages Management</h1>
      <p class="mt-2 text-gray-600">Manage your website pages content</p>
    </div>

    <form @submit.prevent="updatePages" class="space-y-8">
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Page Content</h2>
        <div class="space-y-6">
          <div>
            <label for="home" class="block text-sm font-medium text-gray-700">Home Page</label>
            <textarea
              v-model="form.home"
              id="home"
              rows="3"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Content for your home page"
            ></textarea>
          </div>
          
          <div>
            <label for="cv" class="block text-sm font-medium text-gray-700">CV Page</label>
            <textarea
              v-model="form.cv"
              id="cv"
              rows="3"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Content for your CV page"
            ></textarea>
          </div>

          <div>
            <label for="portfolio" class="block text-sm font-medium text-gray-700">Portfolio Page</label>
            <textarea
              v-model="form.portfolio"
              id="portfolio"
              rows="3"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Content for your portfolio page"
            ></textarea>
          </div>

          <div>
            <label for="documentation" class="block text-sm font-medium text-gray-700">Documentation Page</label>
            <textarea
              v-model="form.documentation"
              id="documentation"
              rows="3"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Content for your documentation page"
            ></textarea>
          </div>

          <div>
            <label for="blog" class="block text-sm font-medium text-gray-700">Blog Page</label>
            <textarea
              v-model="form.blog"
              id="blog"
              rows="3"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Content for your blog page"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="flex justify-end space-x-3">
        <button
          type="submit"
          :disabled="loading"
          class="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {{ loading ? 'Updating...' : 'Update Pages' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

const loading = ref(false)

const form = reactive({
  home: '',
  cv: '',
  portfolio: '',
  documentation: '',
  blog: ''
})

onMounted(async () => {
  await fetchPages()
})

const fetchPages = async () => {
  try {
    const response = await $fetch('/api/admin/pages')
    if (response.data) {
      Object.assign(form, response.data)
    }
  } catch (error) {
    console.error('Error fetching pages:', error)
  }
}

const updatePages = async () => {
  loading.value = true
  
  try {
    const response = await $fetch('/api/admin/pages', {
      method: 'PUT',
      body: form
    })
    
    if (response.success) {
      console.log('Pages updated successfully')
    }
  } catch (error) {
    console.error('Error updating pages:', error)
  } finally {
    loading.value = false
  }
}
</script>
