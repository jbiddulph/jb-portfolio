<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Site Information</h1>
      <p class="mt-2 text-gray-600">Manage your website's basic information and branding</p>
    </div>

    <form @submit.prevent="updateSiteInfo" class="space-y-8">
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
        <div class="space-y-6">
          <div>
            <label for="site_name" class="block text-sm font-medium text-gray-700">Site Name</label>
            <input
              v-model="form.site_name"
              type="text"
              id="site_name"
              required
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label for="site_slogan" class="block text-sm font-medium text-gray-700">Site Slogan</label>
            <input
              v-model="form.site_slogan"
              type="text"
              id="site_slogan"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., Full Stack Developer & Designer"
            />
          </div>

          <div>
            <label for="site_description" class="block text-sm font-medium text-gray-700">Site Description</label>
            <textarea
              v-model="form.site_description"
              id="site_description"
              rows="3"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Brief description of your website"
            ></textarea>
          </div>

          <div>
            <label for="site_footer" class="block text-sm font-medium text-gray-700">Footer Text</label>
            <input
              v-model="form.site_footer"
              type="text"
              id="site_footer"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., © 2025 John Biddulph. All rights reserved."
            />
          </div>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Images</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="site_image" class="block text-sm font-medium text-gray-700">Site Image</label>
            <div class="mt-1 flex items-center space-x-4">
              <input
                v-model="form.site_image"
                type="url"
                id="site_image"
                class="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="https://example.com/site-image.jpg"
              />
              <input
                ref="siteImageInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleSiteImageUpload"
              />
              <button
                type="button"
                @click="() => siteImageInput?.click()"
                :disabled="uploading"
                class="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {{ uploading ? 'Uploading...' : 'Upload' }}
              </button>
            </div>
            <p class="mt-1 text-sm text-gray-500">Main image for your site (e.g., hero image)</p>
          </div>
          
          <div>
            <label for="site_avatar" class="block text-sm font-medium text-gray-700">Site Avatar</label>
            <div class="mt-1 flex items-center space-x-4">
              <input
                v-model="form.site_avatar"
                type="url"
                id="site_avatar"
                class="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="https://example.com/avatar.jpg"
              />
              <input
                ref="avatarInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleAvatarUpload"
              />
              <button
                type="button"
                @click="() => avatarInput?.click()"
                :disabled="uploading"
                class="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {{ uploading ? 'Uploading...' : 'Upload' }}
              </button>
            </div>
            <p class="mt-1 text-sm text-gray-500">Your profile/avatar image</p>
          </div>
        </div>

        <!-- Image Previews -->
        <div v-if="form.site_image || form.site_avatar" class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-if="form.site_image">
            <label class="block text-sm font-medium text-gray-700 mb-2">Site Image Preview</label>
            <div class="border rounded-lg p-4 bg-gray-50">
              <img 
                :src="form.site_image" 
                alt="Site image"
                class="max-w-full h-32 object-cover rounded-lg"
                @error="siteImageError = true"
              />
              <p v-if="siteImageError" class="text-red-500 text-sm mt-2">Failed to load image</p>
            </div>
          </div>
          
          <div v-if="form.site_avatar">
            <label class="block text-sm font-medium text-gray-700 mb-2">Avatar Preview</label>
            <div class="border rounded-lg p-4 bg-gray-50">
              <img 
                :src="form.site_avatar" 
                alt="Site avatar"
                class="w-24 h-24 object-cover rounded-full"
                @error="avatarError = true"
              />
              <p v-if="avatarError" class="text-red-500 text-sm mt-2">Failed to load image</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Design Theme</h2>
        <div>
          <label for="design_id" class="block text-sm font-medium text-gray-700">Active Design</label>
          <select
            v-model="form.design_id"
            id="design_id"
            required
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select a design theme</option>
            <option v-for="design in designs" :key="design.id" :value="design.id">
              {{ design.name }}
            </option>
          </select>
          <p class="mt-1 text-sm text-gray-500">Choose the active design theme for your website</p>
        </div>
      </div>

      <div class="flex justify-end space-x-3">
        <button
          type="submit"
          :disabled="loading"
          class="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {{ loading ? 'Updating...' : 'Update Site Info' }}
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
const siteImageError = ref(false)
const avatarError = ref(false)

// File upload functionality
const { uploading, uploadError, uploadSiteImage, uploadAvatar } = useFileUpload()
const siteImageInput = ref(null)
const avatarInput = ref(null)
const designs = ref([])

const form = reactive({
  site_name: '',
  site_slogan: '',
  site_description: '',
  site_footer: '',
  site_image: '',
  site_avatar: '',
  design_id: null
})

onMounted(async () => {
  await Promise.all([
    fetchSiteInfo(),
    fetchDesigns()
  ])
})

const fetchSiteInfo = async () => {
  try {
    const response = await $fetch('/api/admin/site-info')
    if (response.data) {
      Object.assign(form, response.data)
    }
  } catch (error) {
    console.error('Error fetching site info:', error)
  }
}

const fetchDesigns = async () => {
  try {
    const response = await $fetch('/api/admin/designs')
    designs.value = response.data || []
  } catch (error) {
    console.error('Error fetching designs:', error)
  }
}

const handleSiteImageUpload = async (event) => {
  const file = event.target.files?.[0]
  if (!file) return
  
  try {
    const result = await uploadSiteImage(file)
    form.site_image = result.url
    siteImageError.value = false
  } catch (error) {
    console.error('Error uploading site image:', error)
    siteImageError.value = true
  }
}

const handleAvatarUpload = async (event) => {
  const file = event.target.files?.[0]
  if (!file) return
  
  try {
    const result = await uploadAvatar(file)
    form.site_avatar = result.url
    avatarError.value = false
  } catch (error) {
    console.error('Error uploading avatar:', error)
    avatarError.value = true
  }
}

const updateSiteInfo = async () => {
  loading.value = true
  
  try {
    // Ensure design_id is a number
    const formData = {
      ...form,
      design_id: form.design_id ? parseInt(form.design_id) : null
    }
    
    console.log('Updating site info with data:', formData)
    
    const response = await $fetch('/api/admin/site-info', {
      method: 'PUT',
      body: formData
    })
    
    if (response.success) {
      console.log('Site info updated successfully')
      // Show success message
      alert('Site information updated successfully!')
    }
  } catch (error) {
    console.error('Error updating site info:', error)
    alert('Error updating site information: ' + (error.message || 'Unknown error'))
  } finally {
    loading.value = false
  }
}
</script>
