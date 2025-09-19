<template>
  <div class="mx-auto px-4 sm:px-6 lg:px-8 py-12" :style="{ maxWidth: siteInfo?.design?.container_width || '1200px' }">
    <!-- Dynamic Layout: 1 column or 2 column -->
    <div v-if="isOneColumnLayout" class="space-y-12">
      <!-- 1 Column Layout: About Section Full Width -->
      <div>
        <div class="mb-8">
          <h2 
            class="font-bold mb-4"
            :style="getHeadingStyle(siteInfo?.design, 'h2')"
          >
            {{ pages?.home || 'Welcome to my portfolio' }}
          </h2>
          <div 
            class="prose max-w-none hidden md:block"
            :style="getSiteDescriptionStyle(siteInfo?.design, 'desktop')"
            v-html="siteInfo?.site_description || 'A passionate Nuxt developer specialising in modern JavaScript frameworks like VueJs / Nuxt with Supabase, Prisma and Pinia and some React / Next. Always still experimenting and learning Python, Laravel.'"
          ></div>
          <div 
            class="prose max-w-none md:hidden"
            :style="getSiteDescriptionStyle(siteInfo?.design, 'mobile')"
            v-html="siteInfo?.site_description || 'A passionate Nuxt developer specialising in modern JavaScript frameworks like VueJs / Nuxt with Supabase, Prisma and Pinia and some React / Next. Always still experimenting and learning Python, Laravel.'"
          ></div>
          <p class="mt-6" :style="getBodyStyle(siteInfo?.design)">
            Enjoys building intuitive, responsive applications that provide seamless user experiences.
          </p>
        </div>

        <!-- Hero Image -->
        <div v-if="siteInfo?.site_image" class="mb-8">
          <img 
            :src="siteInfo.site_image" 
            :alt="siteInfo.site_name"
            class="w-full h-64 object-cover rounded-lg shadow-lg"
            :style="{ borderRadius: siteInfo?.design?.border_radius || '8px' }"
          />
        </div>
      </div>

      <!-- 1 Column Layout: Portfolio Section Below (4 columns) -->
      <div>
        <h3 
          class="font-bold mb-6"
          :style="getHeadingStyle(siteInfo?.design, 'h3')"
        >
          {{ pages?.portfolio || 'My Projects' }}
        </h3>
        
        <!-- Portfolio Loading State -->
        <div v-if="portfolioLoading" class="text-center py-8">
          <div class="flex justify-center items-center">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2" :style="{ borderColor: siteInfo?.design?.primary_color || '#3b82f6' }"></div>
            <span class="ml-2" :style="getBodyStyle(siteInfo?.design)">Loading projects...</span>
          </div>
        </div>

        <!-- No Projects State -->
        <div v-else-if="portfolio.length === 0" class="text-center py-8">
          <div class="space-y-3">
            <p :style="getBodyStyle(siteInfo?.design)">
              No projects available yet.
            </p>
            <button 
              @click="fetchPortfolio()"
              class="px-4 py-2 text-sm font-medium text-white rounded-md hover:opacity-90 transition-opacity"
              :style="{ backgroundColor: siteInfo?.design?.primary_color || '#3b82f6' }"
            >
              Retry Loading Projects
            </button>
          </div>
        </div>

        <!-- Portfolio Items - 4 Column Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <NuxtLink 
            v-for="item in limitedPortfolio" 
            :key="item.id"
            :to="`/portfolio/${item.id}`"
            class="block border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            :style="{ 
              borderColor: siteInfo?.design?.primary_color || '#e5e7eb',
              borderRadius: siteInfo?.design?.border_radius || '8px',
              backgroundColor: siteInfo?.design?.portfolio_card_background_color || '#ffffff'
            }"
          >
            <div class="space-y-3">
              <div v-if="item.project_image" class="aspect-square">
                <img 
                  :src="item.project_image" 
                  :alt="item.project_name"
                  class="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div>
                <h4 
                  class="font-semibold mb-2 text-sm"
                  :style="getHeadingStyle(siteInfo?.design, 'h4')"
                >
                  {{ item.project_name }}
                </h4>
                <p 
                  class="text-xs mb-3 line-clamp-3"
                  :style="getBodyStyle(siteInfo?.design)"
                  v-html="truncateDescription(item.project_description)"
                ></p>
                
                <!-- Tags -->
                <div v-if="item.project_tags" class="mb-3">
                  <div class="flex flex-wrap gap-1">
                    <span 
                      v-for="tag in getTags(item.project_tags)" 
                      :key="tag"
                      class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                      :style="{ 
                        backgroundColor: siteInfo?.design?.accent_color || '#3b82f6',
                        color: '#ffffff'
                      }"
                    >
                      {{ tag.trim() }}
                    </span>
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <span 
                    class="text-xs"
                    :style="getBodyStyle(siteInfo?.design)"
                  >
                    {{ formatDate(item.project_date) }}
                  </span>
                  <a 
                    v-if="item.project_link"
                    :href="item.project_link" 
                    target="_blank"
                    class="text-xs font-medium hover:underline"
                    :style="{ 
                      color: siteInfo?.design?.primary_color || '#2563eb',
                      fontFamily: siteInfo?.design?.body_font || 'Inter, sans-serif'
                    }"
                  >
                    Link →
                  </a>
                  <span 
                    v-else
                    class="text-xs font-medium opacity-50"
                    :style="{ 
                      color: siteInfo?.design?.primary_color || '#2563eb',
                      fontFamily: siteInfo?.design?.body_font || 'Inter, sans-serif'
                    }"
                  >
                    No Link
                  </span>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- View More Projects Link -->
        <div v-if="portfolio.length > 4" class="text-center mt-8">
          <NuxtLink 
            to="/portfolio"
            class="inline-flex items-center px-6 py-3 text-sm font-medium rounded-md transition-colors"
            :style="{ 
              backgroundColor: siteInfo?.design?.primary_color || '#2563eb',
              color: '#ffffff'
            }"
          >
            View More Projects ({{ portfolio.length - 4 }} more)
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- 2 Column Layout: Original Layout -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <!-- About Section -->
      <div class="lg:col-span-2">
        <div class="mb-8">
          <h2 
            class="font-bold mb-4"
            :style="getHeadingStyle(siteInfo?.design, 'h2')"
          >
            {{ pages?.home || 'Welcome to my portfolio' }}
          </h2>
          <div 
            class="prose max-w-none hidden md:block"
            :style="getSiteDescriptionStyle(siteInfo?.design, 'desktop')"
            v-html="siteInfo?.site_description || 'A passionate Nuxt developer specialising in modern JavaScript frameworks like VueJs / Nuxt with Supabase, Prisma and Pinia and some React / Next. Always still experimenting and learning Python, Laravel.'"
          ></div>
          <div 
            class="prose max-w-none md:hidden"
            :style="getSiteDescriptionStyle(siteInfo?.design, 'mobile')"
            v-html="siteInfo?.site_description || 'A passionate Nuxt developer specialising in modern JavaScript frameworks like VueJs / Nuxt with Supabase, Prisma and Pinia and some React / Next. Always still experimenting and learning Python, Laravel.'"
          ></div>
          <p class="mt-6" :style="getBodyStyle(siteInfo?.design)">
            Enjoys building intuitive, responsive applications that provide seamless user experiences.
          </p>
        </div>

        <!-- Hero Image -->
        <div v-if="siteInfo?.site_image" class="mb-8">
          <img 
            :src="siteInfo.site_image" 
            :alt="siteInfo.site_name"
            class="w-full h-64 object-cover rounded-lg shadow-lg"
            :style="{ borderRadius: siteInfo?.design?.border_radius || '8px' }"
          />
        </div>
      </div>

      <!-- Portfolio Section -->
      <div>
        <h3 
          class="font-bold mb-6"
          :style="getHeadingStyle(siteInfo?.design, 'h3')"
        >
          {{ pages?.portfolio || 'My Projects' }}
        </h3>
        
        <!-- Portfolio Loading State -->
        <div v-if="portfolioLoading" class="text-center py-8">
          <div class="flex justify-center items-center">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2" :style="{ borderColor: siteInfo?.design?.primary_color || '#3b82f6' }"></div>
            <span class="ml-2" :style="getBodyStyle(siteInfo?.design)">Loading projects...</span>
          </div>
        </div>

        <!-- No Projects State -->
        <div v-else-if="portfolio.length === 0" class="text-center py-8">
          <div class="space-y-3">
            <p :style="getBodyStyle(siteInfo?.design)">
              No projects available yet.
            </p>
            <button 
              @click="fetchPortfolio()"
              class="px-4 py-2 text-sm font-medium text-white rounded-md hover:opacity-90 transition-opacity"
              :style="{ backgroundColor: siteInfo?.design?.primary_color || '#3b82f6' }"
            >
              Retry Loading Projects
            </button>
          </div>
        </div>

        <!-- Portfolio Items -->
        <div v-else class="space-y-6">
          <NuxtLink 
            v-for="item in limitedPortfolio" 
            :key="item.id"
            :to="`/portfolio/${item.id}`"
            class="block border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
            :style="{ 
              borderColor: siteInfo?.design?.primary_color || '#e5e7eb',
              borderRadius: siteInfo?.design?.border_radius || '8px',
              backgroundColor: siteInfo?.design?.portfolio_card_background_color || '#ffffff'
            }"
          >
            <div class="flex items-start space-x-4">
              <div v-if="item.project_image" class="flex-shrink-0">
                <img 
                  :src="item.project_image" 
                  :alt="item.project_name"
                  class="h-16 w-16 rounded-lg object-cover"
                />
              </div>
              <div class="flex-1 min-w-0">
                <h4 
                  class="font-semibold mb-2"
                  :style="getHeadingStyle(siteInfo?.design, 'h4')"
                >
                  {{ item.project_name }}
                </h4>
                <p 
                  class="text-sm mb-3"
                  :style="getBodyStyle(siteInfo?.design)"
                  v-html="truncateDescription(item.project_description)"
                ></p>
                
                <!-- Tags -->
                <div v-if="item.project_tags" class="mb-3">
                  <div class="flex flex-wrap gap-1">
                    <span 
                      v-for="tag in getTags(item.project_tags)" 
                      :key="tag"
                      class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                      :style="{ 
                        backgroundColor: siteInfo?.design?.accent_color || '#3b82f6',
                        color: '#ffffff'
                      }"
                    >
                      {{ tag.trim() }}
                    </span>
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <span 
                    class="text-xs"
                    :style="getBodyStyle(siteInfo?.design)"
                  >
                    {{ formatDate(item.project_date) }}
                  </span>
                  <a 
                    v-if="item.project_link"
                    :href="item.project_link" 
                    target="_blank"
                    class="text-xs font-medium hover:underline"
                    :style="{ 
                      color: siteInfo?.design?.primary_color || '#2563eb',
                      fontFamily: getFontFamily(siteInfo?.design, 'primary')
                    }"
                  >
                    Link →
                  </a>
                  <span 
                    v-else
                    class="text-xs font-medium opacity-50"
                    :style="{ 
                      color: siteInfo?.design?.primary_color || '#2563eb',
                      fontFamily: getFontFamily(siteInfo?.design, 'primary')
                    }"
                  >
                    No Link
                  </span>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- View More Projects Link -->
        <div v-if="portfolio.length > 4" class="text-center mt-8">
          <NuxtLink 
            to="/portfolio"
            class="inline-flex items-center px-6 py-3 text-sm font-medium rounded-md transition-colors"
            :style="{ 
              backgroundColor: siteInfo?.design?.primary_color || '#2563eb',
              color: '#ffffff'
            }"
          >
            View More Projects ({{ portfolio.length - 4 }} more)
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

// Reactive data
const siteInfo = ref(null)
const portfolio = ref([])
const pages = ref(null)
const loading = ref(true)
const portfolioLoading = ref(true)
const portfolioLoadTimeout = ref(false)

// User design management
const { userDesignId, getEffectiveDesignId } = useUserDesign()

// Computed properties
const isOneColumnLayout = computed(() => {
  return siteInfo.value?.design?.layout_columns === '1'
})

const limitedPortfolio = computed(() => {
  return portfolio.value.slice(0, 4)
})

// Fetch all data on mount
onMounted(async () => {
  await Promise.all([
    fetchSiteInfo(),
    fetchPortfolio(),
    fetchPages()
  ])
  loading.value = false
  
  // Listen for theme changes
  window.addEventListener('theme-changed', handleThemeChange)
})

onUnmounted(() => {
  window.removeEventListener('theme-changed', handleThemeChange)
})

const handleThemeChange = async (event) => {
  console.log('Home page: Theme change event received:', event.detail)
  
  // Always use user's preferred design (including default)
  await fetchUserDesign()
}

const fetchSiteInfo = async () => {
  try {
    const response = await $fetch('/api/site-info')
    siteInfo.value = response.data
    
    // If user has a preferred design, fetch and apply it
    if (userDesignId.value) {
      await fetchUserDesign()
    }
  } catch (error) {
    console.error('Error fetching site info:', error)
  }
}

const fetchUserDesign = async () => {
  if (!userDesignId.value) return
  
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

const fetchPortfolio = async (retryCount = 0) => {
  portfolioLoading.value = true
  const maxRetries = 3
  const timeoutMs = 10000 // 10 seconds
  
  try {
    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
    })
    
    // Race between fetch and timeout
    const response = await Promise.race([
      $fetch('/api/portfolio'),
      timeoutPromise
    ])
    
    if (response.success && response.data) {
      portfolio.value = response.data
      console.log('Portfolio loaded successfully:', response.data.length, 'items')
    } else {
      portfolio.value = []
      console.warn('Portfolio API returned no data')
    }
  } catch (error) {
    console.error('Error fetching portfolio (attempt', retryCount + 1, '):', error)
    
    // Retry logic
    if (retryCount < maxRetries) {
      console.log('Retrying portfolio fetch in 2 seconds...')
      setTimeout(() => {
        fetchPortfolio(retryCount + 1)
      }, 2000)
      return // Don't set loading to false yet
    } else {
      console.error('Max retries reached for portfolio fetch')
      portfolio.value = []
    }
  } finally {
    portfolioLoading.value = false
  }
}

const fetchPages = async () => {
  try {
    const response = await $fetch('/api/pages')
    pages.value = response.data
  } catch (error) {
    console.error('Error fetching pages:', error)
  }
}

// Utility functions
const getTags = (tagsString) => {
  if (!tagsString) return []
  return tagsString.split(',').filter(tag => tag.trim())
}

const truncateDescription = (description) => {
  if (!description) return ''
  // Remove HTML tags and truncate to 60 characters
  const textOnly = description.replace(/<[^>]*>/g, '')
  return textOnly.length > 60 ? textOnly.substring(0, 60) + '...' : textOnly
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
    h1: design?.font_size_h1 || '1.5rem',
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

const getSiteDescriptionStyle = (design, device = 'desktop') => {
  const fontSize = device === 'desktop' 
    ? (design?.site_description_size_desktop || '1rem')
    : (design?.site_description_size_mobile || '0.875rem')
  
  return {
    color: design?.text_color || '#1f2937',
    fontFamily: getFontFamily(design, 'primary'),
    fontSize: fontSize
  }
}
</script>

<style scoped>
/* Dynamic styling will be applied via computed styles */
.prose {
  line-height: 1.6;
}

.prose p {
  margin-bottom: 1rem;
}

.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

.prose ul, .prose ol {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.prose li {
  margin-bottom: 0.25rem;
}

.prose a {
  text-decoration: underline;
}

.prose blockquote {
  border-left: 4px solid #e5e7eb;
  padding-left: 1rem;
  margin: 1rem 0;
  font-style: italic;
}

.prose code {
  background-color: #f3f4f6;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-family: monospace;
}

.prose pre {
  background-color: #f3f4f6;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1rem 0;
}
</style>