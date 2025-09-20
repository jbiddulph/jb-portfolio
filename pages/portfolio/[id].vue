<template>
  <div 
    class="mx-auto px-4 sm:px-6 lg:px-8 py-12"
    :style="{ maxWidth: siteInfo?.design?.container_width || '1200px' }"
  >
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div class="flex justify-center items-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2" :style="{ borderColor: siteInfo?.design?.primary_color || '#3b82f6' }"></div>
        <span class="ml-2" :style="getBodyStyle(siteInfo?.design)">Loading project details...</span>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-8">
      <h2 
        class="text-2xl font-bold mb-4"
        :style="getHeadingStyle(siteInfo?.design, 'h2')"
      >
        Project Not Found
      </h2>
      <p :style="getBodyStyle(siteInfo?.design)" class="mb-6">
        {{ error }}
      </p>
      <NuxtLink 
        to="/portfolio"
        class="inline-flex items-center px-6 py-3 text-sm font-medium rounded-md transition-colors"
        :style="{ 
          backgroundColor: siteInfo?.design?.primary_color || '#2563eb',
          color: '#ffffff'
        }"
      >
        ← Back to All Projects
      </NuxtLink>
    </div>

    <!-- Project Details -->
    <div v-else-if="project" class="space-y-8">
      <!-- Header -->
      <div class="flex justify-between items-start">
        <div>
          <h1 
            class="text-3xl font-bold mb-4"
            :style="getHeadingStyle(siteInfo?.design, 'h1')"
          >
            {{ project.project_name }}
          </h1>
          <div class="flex items-center space-x-4 mb-4">
            <span 
              class="text-lg"
              :style="getBodyStyle(siteInfo?.design)"
            >
              {{ formatDate(project.project_date) }}
            </span>
            <a 
              v-if="project.project_link"
              :href="project.project_link" 
              target="_blank"
              class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors"
              :style="{ 
                backgroundColor: siteInfo?.design?.primary_color || '#2563eb',
                color: '#ffffff'
              }"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
              View Live Project
            </a>
          </div>
        </div>
        <NuxtLink 
          to="/portfolio"
          class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors border"
          :style="{ 
            borderColor: siteInfo?.design?.primary_color || '#2563eb',
            color: siteInfo?.design?.primary_color || '#2563eb'
          }"
        >
          ← Back to Portfolio
        </NuxtLink>
      </div>

      <!-- 2 Column Layout (70/30) -->
      <div class="grid grid-cols-1 lg:grid-cols-10 gap-8">
        <!-- Main Content (70%) -->
        <div class="lg:col-span-7 space-y-8">
          <!-- Project Image -->
          <div v-if="project.project_image" class="aspect-video rounded-lg overflow-hidden shadow-lg">
            <img 
              :src="project.project_image" 
              :alt="project.project_name"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Project Description -->
          <div class="prose max-w-none">
            <h2 
              class="text-2xl font-bold mb-6"
              :style="getHeadingStyle(siteInfo?.design, 'h2')"
            >
              About This Project
            </h2>
            <div 
              class="text-lg leading-relaxed"
              :style="getBodyStyle(siteInfo?.design)"
              v-html="project.project_description"
            ></div>
          </div>
        </div>

        <!-- Sidebar (30%) -->
        <div class="lg:col-span-3 space-y-6">
          <!-- Project Info Card -->
          <div 
            class="border rounded-lg p-6"
            :style="{ 
              borderColor: siteInfo?.design?.primary_color || '#e5e7eb',
              borderRadius: siteInfo?.design?.border_radius || '8px',
              backgroundColor: siteInfo?.design?.portfolio_card_background_color || '#ffffff'
            }"
          >
            <h3 
              class="text-lg font-semibold mb-4"
              :style="getHeadingStyle(siteInfo?.design, 'h3')"
            >
              Project Details
            </h3>
            
            <div class="space-y-4">
              <div>
                <h4 
                  class="text-sm font-medium mb-2"
                  :style="getHeadingStyle(siteInfo?.design, 'h4')"
                >
                  Launch Date
                </h4>
                <p :style="getBodyStyle(siteInfo?.design)">
                  {{ formatDate(project.project_date) }}
                </p>
              </div>

              <div v-if="project.project_link">
                <h4 
                  class="text-sm font-medium mb-2"
                  :style="getHeadingStyle(siteInfo?.design, 'h4')"
                >
                  Live URL
                </h4>
                <a 
                  :href="project.project_link" 
                  target="_blank"
                  class="text-sm break-all hover:underline"
                  :style="{ 
                    color: siteInfo?.design?.primary_color || '#2563eb',
                    fontFamily: getFontFamily(siteInfo?.design, 'primary')
                  }"
                >
                  {{ project.project_link }}
                </a>
              </div>
            </div>
          </div>

          <!-- Tags Card -->
          <div 
            v-if="project.project_tags"
            class="border rounded-lg p-6"
            :style="{ 
              borderColor: siteInfo?.design?.primary_color || '#e5e7eb',
              borderRadius: siteInfo?.design?.border_radius || '8px'
            }"
          >
            <h3 
              class="text-lg font-semibold mb-4"
              :style="getHeadingStyle(siteInfo?.design, 'h3')"
            >
              Technologies Used
            </h3>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tag in getTags(project.project_tags)" 
                :key="tag"
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                :style="{ 
                  backgroundColor: siteInfo?.design?.accent_color || '#3b82f6',
                  color: '#ffffff'
                }"
              >
                {{ tag.trim() }}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Reactive data
const siteInfo = ref(null)
const project = ref(null)
const loading = ref(true)
const error = ref(null)

const route = useRoute()

// User design management
const { userDesignId } = useUserDesign()

// Fetch data on mount
onMounted(async () => {
  await Promise.all([
    fetchSiteInfo(),
    fetchProject()
  ])
  
  // Listen for theme changes
  window.addEventListener('theme-changed', handleThemeChange)
})

onUnmounted(() => {
  window.removeEventListener('theme-changed', handleThemeChange)
})

const handleThemeChange = async (event) => {
  // Only handle theme changes on client side
  if (!process.client) return
  
  console.log('Portfolio details: Theme change event received:', event.detail)
  
  // Always use user's preferred design (including default)
  await fetchUserDesign()
}

const fetchSiteInfo = async () => {
  try {
    const response = await $fetch('/api/site-info')
    siteInfo.value = response.data
    
    // If user has a preferred design, fetch and apply it
    // Only on client side to avoid SSR issues
    if (process.client && userDesignId.value) {
      await fetchUserDesign()
    }
  } catch (error) {
    console.error('Error fetching site info:', error)
  }
}

const fetchUserDesign = async () => {
  if (!process.client || !userDesignId.value) return
  
  try {
    const response = await $fetch(`/api/designs/${userDesignId.value}`)
    if (response.success && siteInfo.value) {
      // Override the design with user's preferred design
      siteInfo.value.design = response.data
    }
  } catch (error) {
    console.error('Error fetching user design:', error)
  }
}

const fetchProject = async () => {
  try {
    console.log('Fetching project with ID:', route.params.id)
    const response = await $fetch(`/api/portfolio/${route.params.id}`)
    console.log('Project response:', response)
    
    if (response.success && response.data) {
      project.value = response.data
    } else {
      error.value = 'Project not found'
    }
  } catch (error) {
    console.error('Error fetching project:', error)
    console.error('Error details:', error.message, error.statusCode)
    error.value = `Failed to load project details: ${error.message || 'Unknown error'}`
  } finally {
    loading.value = false
  }
}

// Helper functions
const getTags = (tagsString) => {
  if (!tagsString) return []
  return tagsString.split(',').filter(tag => tag.trim())
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getFontFamily = (design, fontType = 'primary') => {
  if (!design) return 'inherit'
  
  let fontFamily = fontType === 'heading' ? design.heading_font : design.font_family
  
  // Use Google Fonts if available
  if (design.google_fonts) {
    try {
      const googleFonts = JSON.parse(design.google_fonts)
      if (fontType === 'heading' && googleFonts.heading) {
        fontFamily = `"${googleFonts.heading}", ${design.heading_font}`
      } else if (googleFonts.primary) {
        fontFamily = `"${googleFonts.primary}", ${design.font_family}`
      }
    } catch (e) {
      console.error('Error parsing Google Fonts:', e)
    }
  }
  
  return fontFamily
}

const getHeadingStyle = (design, level = 'h1') => {
  const fontSizeMap = {
    h1: design?.font_size_h1 || '2.5rem',
    h2: design?.font_size_h2 || '2rem',
    h3: design?.font_size_h3 || '1.5rem',
    h4: design?.font_size_h4 || '1.25rem'
  }
  return {
    color: design?.text_color || '#1f2937',
    fontFamily: getFontFamily(design, 'heading'),
    fontSize: fontSizeMap[level]
  }
}

const getBodyStyle = (design) => {
  return {
    color: design?.text_color || '#1f2937',
    fontFamily: getFontFamily(design, 'primary'),
    fontSize: design?.font_size_base || '16px'
  }
}
</script>
