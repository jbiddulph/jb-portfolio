<template>
  <div>
    <div class="mb-8">
      <NuxtLink to="/admin/portfolio" class="text-indigo-600 hover:text-indigo-500 mb-4 inline-block">
        ← Back to Portfolio
      </NuxtLink>
      <h1 class="text-3xl font-bold text-gray-900">Edit Project</h1>
      <p class="mt-2 text-gray-600">Update your project details</p>
    </div>

    <form @submit.prevent="updateProject" class="space-y-8">
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Project Information</h2>
        <div class="space-y-6">
          <div>
            <label for="project_name" class="block text-sm font-medium text-gray-700">Project Name</label>
            <input
              v-model="form.project_name"
              type="text"
              id="project_name"
              required
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter project name"
            />
          </div>
          
          <div>
            <label for="project_description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              v-model="form.project_description"
              id="project_description"
              rows="4"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Describe your project..."
            ></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="project_date" class="block text-sm font-medium text-gray-700">Project Date</label>
              <input
                v-model="form.project_date"
                type="date"
                id="project_date"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label for="project_link" class="block text-sm font-medium text-gray-700">Project Link</label>
              <input
                v-model="form.project_link"
                type="url"
                id="project_link"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div>
            <label for="project_image" class="block text-sm font-medium text-gray-700">Project Image</label>
            <div class="mt-1 flex items-center space-x-4">
              <input
                v-model="form.project_image"
                type="url"
                id="project_image"
                class="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="https://example.com/image.jpg"
              />
              <input
                ref="projectImageInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleProjectImageUpload"
              />
              <button
                type="button"
                @click="() => projectImageInput?.click()"
                :disabled="uploading"
                class="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {{ uploading ? 'Uploading...' : 'Upload' }}
              </button>
            </div>
            <p class="mt-1 text-sm text-gray-500">Optional: Upload an image or enter URL of your project</p>
          </div>

          <div>
            <label for="project_tags" class="block text-sm font-medium text-gray-700">Project Tags</label>
            <input
              v-model="form.project_tags"
              type="text"
              id="project_tags"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Vue.js, Nuxt, Supabase, JavaScript"
            />
            <p class="mt-1 text-sm text-gray-500">Comma-separated tags to categorize your project</p>
          </div>

          <!-- Image Preview -->
          <div v-if="form.project_image" class="mt-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Image Preview</label>
            <div class="border rounded-lg p-4 bg-gray-50">
              <img 
                :src="form.project_image" 
                :alt="form.project_name"
                class="max-w-xs h-32 object-cover rounded-lg"
                @error="imageError = true"
              />
              <p v-if="imageError" class="text-red-500 text-sm mt-2">Failed to load image</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end space-x-3">
        <NuxtLink
          to="/admin/portfolio"
          class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </NuxtLink>
        <button
          type="submit"
          :disabled="loading"
          class="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {{ loading ? 'Updating...' : 'Update Project' }}
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

const route = useRoute()
const router = useRouter()
const loading = ref(false)

// File upload functionality
const { uploading, uploadError, uploadPortfolioImage } = useFileUpload()
const projectImageInput = ref(null)
const imageError = ref(false)

const form = reactive({
  project_name: '',
  project_description: '',
  project_date: '',
  project_link: '',
  project_image: '',
  project_tags: ''
})

onMounted(async () => {
  await fetchProject()
})

const fetchProject = async () => {
  try {
    const response = await $fetch(`/api/admin/portfolio/${route.params.id}`)
    if (response.data) {
      Object.assign(form, {
        ...response.data,
        project_date: response.data.project_date ? new Date(response.data.project_date).toISOString().split('T')[0] : ''
      })
    }
  } catch (error) {
    console.error('Error fetching project:', error)
  }
}

const handleProjectImageUpload = async (event) => {
  const file = event.target.files?.[0]
  if (!file) return
  
  try {
    const result = await uploadPortfolioImage(file)
    form.project_image = result.url
    imageError.value = false
  } catch (error) {
    console.error('Error uploading project image:', error)
    imageError.value = true
  }
}

const updateProject = async () => {
  loading.value = true
  
  try {
    const response = await $fetch(`/api/admin/portfolio/${route.params.id}`, {
      method: 'PUT',
      body: {
        ...form,
        project_date: new Date(form.project_date)
      }
    })
    
    if (response.success) {
      await router.push('/admin/portfolio')
    }
  } catch (error) {
    console.error('Error updating project:', error)
  } finally {
    loading.value = false
  }
}
</script>
