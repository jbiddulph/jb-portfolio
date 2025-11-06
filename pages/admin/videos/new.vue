<template>
  <div>
    <div class="mb-8">
      <NuxtLink to="/admin/videos" class="text-indigo-600 hover:text-indigo-500 mb-4 inline-block">
        ← Back to Videos
      </NuxtLink>
      <h1 class="text-3xl font-bold text-gray-900">Add New Video</h1>
      <p class="mt-2 text-gray-600">Add a new video showcase to your homepage</p>
    </div>

    <form @submit.prevent="createVideo" class="space-y-8">
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Video Information</h2>
        <div class="space-y-6">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">Video Title</label>
            <input
              v-model="form.title"
              type="text"
              id="title"
              required
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter video title"
            />
          </div>
          
          <div>
            <label for="youtube_url" class="block text-sm font-medium text-gray-700">YouTube URL</label>
            <input
              v-model="form.youtube_url"
              type="url"
              id="youtube_url"
              required
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="https://www.youtube.com/watch?v=..."
            />
            <p class="mt-1 text-sm text-gray-500">Enter the full YouTube URL (watch, embed, or youtu.be format)</p>
          </div>

          <div>
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              v-model="form.description"
              id="description"
              rows="4"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Describe your video..."
            ></textarea>
          </div>

          <div>
            <label for="link" class="block text-sm font-medium text-gray-700">Project Link (Optional)</label>
            <input
              v-model="form.link"
              type="url"
              id="link"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="https://example.com"
            />
            <p class="mt-1 text-sm text-gray-500">Optional: Link to the related project or website</p>
          </div>

          <!-- YouTube Preview -->
          <div v-if="form.youtube_url && getYouTubeVideoId(form.youtube_url)" class="mt-6">
            <label class="block text-sm font-medium text-gray-700 mb-3">Video Preview</label>
            <div class="border rounded-lg p-4 bg-gray-50">
              <div class="aspect-video">
                <iframe
                  :src="getYouTubeEmbedUrl(form.youtube_url)"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  class="w-full h-full rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end space-x-3">
        <NuxtLink
          to="/admin/videos"
          class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </NuxtLink>
        <button
          type="submit"
          :disabled="loading"
          class="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {{ loading ? 'Creating...' : 'Create Video' }}
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

const router = useRouter()
const loading = ref(false)

const form = reactive({
  title: '',
  description: '',
  youtube_url: '',
  link: ''
})

// Extract YouTube video ID from URL
const getYouTubeVideoId = (url) => {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : null
}

// Get YouTube embed URL
const getYouTubeEmbedUrl = (url) => {
  const videoId = getYouTubeVideoId(url)
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null
}

const createVideo = async () => {
  loading.value = true
  
  try {
    const response = await $fetch('/api/admin/videos', {
      method: 'POST',
      body: form
    })
    
    if (response.success) {
      await router.push('/admin/videos')
    }
  } catch (error) {
    console.error('Error creating video:', error)
    alert('Error creating video: ' + (error.message || 'Unknown error'))
  } finally {
    loading.value = false
  }
}
</script>

