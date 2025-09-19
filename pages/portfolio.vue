<template>
  <div class="mx-auto px-4 sm:px-6 lg:px-8 py-12" :style="{ maxWidth: siteInfo?.design?.container_width || '1200px' }">
    <!-- Page Header -->
    <div class="text-center mb-12">
      <h1 
        class="text-4xl font-bold mb-4"
        :style="getHeadingStyle(siteInfo?.design, 'h1')"
      >
        {{ pages?.portfolio || 'My Portfolio' }}
      </h1>
      <p 
        class="text-lg max-w-2xl mx-auto"
        :style="getBodyStyle(siteInfo?.design)"
      >
        A collection of my recent projects and work
      </p>
    </div>

    <!-- Portfolio Loading State -->
    <div v-if="portfolioLoading" class="text-center py-12">
      <div class="flex justify-center items-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2" :style="{ borderColor: siteInfo?.design?.primary_color || '#3b82f6' }"></div>
        <span class="ml-4" :style="getBodyStyle(siteInfo?.design)">Loading portfolio...</span>
      </div>
    </div>

    <!-- No Projects State -->
    <div v-else-if="portfolio.length === 0" class="text-center py-12">
      <div class="max-w-md mx-auto">
        <svg class="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No projects available</h3>
        <p :style="getBodyStyle(siteInfo?.design)" class="text-gray-500">
          Check back later for new projects and updates.
        </p>
      </div>
    </div>

    <!-- Portfolio Grid - 4 Columns -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div 
        v-for="item in portfolio" 
        :key="item.id"
        class="group border rounded-lg p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        :style="{ 
          borderColor: siteInfo?.design?.primary_color || '#e5e7eb',
          borderRadius: siteInfo?.design?.border_radius || '8px'
        }"
      >
        <!-- Project Image -->
        <div v-if="item.project_image" class="mb-4">
          <div class="aspect-square overflow-hidden rounded-lg">
            <img 
              :src="item.project_image" 
              :alt="item.project_name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        <!-- Project Info -->
        <div class="space-y-3">
          <h3 
            class="font-bold text-lg"
            :style="getHeadingStyle(siteInfo?.design, 'h3')"
          >
            {{ item.project_name }}
          </h3>
          
          <p 
            class="text-sm leading-relaxed"
            :style="getBodyStyle(siteInfo?.design)"
            v-html="truncateDescription(item.project_description)"
          ></p>
          
          <!-- Tags -->
          <div v-if="item.project_tags" class="flex flex-wrap gap-2">
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

          <!-- Project Meta -->
          <div class="flex items-center justify-between pt-3 border-t" :style="{ borderColor: siteInfo?.design?.primary_color || '#e5e7eb' }">
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
              class="inline-flex items-center text-sm font-medium hover:underline"
              :style="{ 
                color: siteInfo?.design?.primary_color || '#2563eb',
                fontFamily: siteInfo?.design?.body_font || 'Inter, sans-serif'
              }"
            >
              View Project
              <svg class="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Back to Home Link -->
    <div class="text-center mt-12">
      <NuxtLink 
        to="/"
        class="inline-flex items-center px-6 py-3 text-sm font-medium rounded-md border transition-colors"
        :style="{ 
          borderColor: siteInfo?.design?.primary_color || '#2563eb',
          color: siteInfo?.design?.primary_color || '#2563eb'
        }"
      >
        <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Back to Home
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useSupabaseClient, useSupabaseUser } from '#imports'

const client = useSupabaseClient()
const user = useSupabaseUser()

// Reactive data
const siteInfo = ref(null)
const portfolio = ref([])
const pages = ref(null)
const portfolioLoading = ref(true)

// Fetch all data on mount
onMounted(async () => {
  await Promise.all([
    fetchSiteInfo(),
    fetchPortfolio(),
    fetchPages()
  ])
  portfolioLoading.value = false
})

const fetchSiteInfo = async () => {
  try {
    const response = await $fetch('/api/site-info')
    siteInfo.value = response.data
  } catch (error) {
    console.error('Error fetching site info:', error)
  }
}

const fetchPortfolio = async () => {
  try {
    console.log('Fetching portfolio from /api/portfolio')
    const response = await $fetch('/api/portfolio')
    console.log('Portfolio API response:', response)
    portfolio.value = response.data || []
    console.log('Portfolio data set:', portfolio.value)
  } catch (error) {
    console.error('Error fetching portfolio:', error)
    portfolio.value = []
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
  return {
    color: design?.text_color || '#1f2937',
    fontFamily: getFontFamily(design, 'heading'),
    fontSize: design?.[`font_size_${level}`] || '1.5rem'
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