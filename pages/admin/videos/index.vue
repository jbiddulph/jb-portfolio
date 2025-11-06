<template>
  <div>
    <div class="mb-8 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Video Management</h1>
        <p class="mt-2 text-gray-600">Manage your video showcases</p>
      </div>
      <NuxtLink 
        to="/admin/videos/new"
        class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Add New Video
      </NuxtLink>
    </div>

    <!-- Videos Table -->
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <div v-if="videos.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No videos</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by adding your first video showcase.</p>
        <div class="mt-6">
          <NuxtLink 
            to="/admin/videos/new"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Add Video
          </NuxtLink>
        </div>
      </div>

      <ul v-else class="divide-y divide-gray-200">
        <li v-for="video in videos" :key="video.id" class="px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4 flex-1">
              <!-- YouTube Thumbnail -->
              <div v-if="getYouTubeVideoId(video.youtube_url)" class="flex-shrink-0">
                <img 
                  :src="`https://img.youtube.com/vi/${getYouTubeVideoId(video.youtube_url)}/mqdefault.jpg`" 
                  :alt="video.title"
                  class="h-20 w-32 rounded-lg object-cover"
                />
              </div>
              <div v-else class="flex-shrink-0">
                <div class="h-20 w-32 bg-gray-200 rounded-lg flex items-center justify-center">
                  <svg class="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-medium text-gray-900 break-words">
                  {{ video.title }}
                </h3>
                <p v-if="video.description" class="text-sm text-gray-500 break-words mt-1">
                  {{ video.description }}
                </p>
                <div class="flex flex-wrap items-center gap-4 mt-2">
                  <a 
                    :href="video.youtube_url" 
                    target="_blank"
                    class="text-xs text-red-600 hover:text-red-500 break-all"
                  >
                    YouTube →
                  </a>
                  <a 
                    v-if="video.link"
                    :href="video.link" 
                    target="_blank"
                    class="text-xs text-indigo-600 hover:text-indigo-500 break-all"
                  >
                    View Project →
                  </a>
                  <span class="text-xs text-gray-400">
                    {{ formatDate(video.created_at) }}
                  </span>
                </div>
              </div>
            </div>
            <div class="flex items-center space-x-2 ml-4">
              <NuxtLink 
                :to="`/admin/videos/${video.id}/edit`"
                class="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
              >
                Edit
              </NuxtLink>
              <button 
                @click.prevent="deleteVideo(video.id)"
                type="button"
                :disabled="deleting"
                class="text-red-600 hover:text-red-500 text-sm font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ deleting ? 'Deleting...' : 'Delete' }}
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

const videos = ref([])
const deleting = ref(false)

onMounted(async () => {
  await fetchVideos()
})

const fetchVideos = async () => {
  try {
    const response = await $fetch('/api/admin/videos')
    videos.value = response.data || []
  } catch (error) {
    console.error('Error fetching videos:', error)
  }
}

const deleteVideo = async (videoId) => {
  console.log('Attempting to delete video:', videoId)
  
  if (confirm('Are you sure you want to delete this video?')) {
    deleting.value = true
    try {
      console.log('Calling delete API for video:', videoId)
      const response = await $fetch(`/api/admin/videos/${videoId}`, {
        method: 'DELETE'
      })
      console.log('Delete response:', response)
      
      // Show success message
      alert('Video deleted successfully!')
      
      // Refresh the videos list
      await fetchVideos()
    } catch (error) {
      console.error('Error deleting video:', error)
      alert('Error deleting video: ' + (error.message || 'Unknown error'))
    } finally {
      deleting.value = false
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

// Extract YouTube video ID from URL
const getYouTubeVideoId = (url) => {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : null
}
</script>

