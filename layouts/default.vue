<!-- layouts/default.vue -->
<template>
  <div 
    class="min-h-screen"
    :style="dynamicStyles"
  >
    <!-- Header -->
    <header 
      class="shadow-sm border-b"
      :style="{ 
        backgroundColor: siteInfo?.design?.background_color || '#ffffff',
        height: siteInfo?.design?.header_height || '80px',
        ...getBorderStyle(siteInfo?.design)
      }"
    >
      <div 
        class="mx-auto px-4 sm:px-6 lg:px-8"
        :style="{ maxWidth: siteInfo?.design?.container_width || '1200px' }"
      >
        <div class="flex justify-between items-center h-full">
          <div class="flex items-center space-x-4">
            <img 
              v-if="siteInfo?.site_avatar" 
              :src="siteInfo.site_avatar" 
              :alt="siteInfo.site_name"
              class="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <NuxtLink to="/">
                <h1 
                  class="font-bold hidden md:block mt-2 hover:opacity-80 transition-opacity cursor-pointer"
                  :style="getSiteNameStyle(siteInfo?.design, 'desktop')"
                >
                  {{ siteInfo?.site_name || 'John Biddulph Portfolio' }}
                </h1>
              </NuxtLink>
              <NuxtLink to="/">
                <h1 
                  class="font-bold md:hidden mt-2 hover:opacity-80 transition-opacity cursor-pointer"
                  :style="getSiteNameStyle(siteInfo?.design, 'mobile')"
                >
                  {{ siteInfo?.site_name || 'John Biddulph Portfolio' }}
                </h1>
              </NuxtLink>
              <p 
                v-if="siteInfo?.site_slogan"
                class="hidden md:block opacity-75 leading-tight"
                :style="getSiteDescriptionStyle(siteInfo?.design, 'desktop')"
              >
                {{ siteInfo.site_slogan }}
              </p>
              <p 
                v-if="siteInfo?.site_slogan"
                class="md:hidden opacity-75 leading-tight"
                :style="getSiteDescriptionStyle(siteInfo?.design, 'mobile')"
              >
                {{ siteInfo.site_slogan }}
              </p>
            </div>
          </div>
          
          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-6">
            <!-- Social Links -->
            <div v-if="links.length > 0" class="flex items-center space-x-4">
              <a 
                v-for="link in links" 
                :key="link.id"
                :href="link.link_url" 
                target="_blank"
                class="text-sm font-medium hover:underline transition-colors"
                :style="{ 
                  color: siteInfo?.design?.primary_color || '#2563eb',
                  fontFamily: getFontFamily(siteInfo?.design, 'primary')
                }"
              >
                {{ link.link_name }}
              </a>
            </div>
            
            <!-- Auth Links -->
            <div v-if="user" class="flex items-center space-x-4">
              <NuxtLink 
                to="/admin" 
                class="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors"
                :style="{ 
                  backgroundColor: siteInfo?.design?.primary_color || '#2563eb',
                  color: '#ffffff'
                }"
              >
                <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Dashboard
              </NuxtLink>
              <button 
                @click="signOut"
                class="px-3 py-2 text-sm font-medium rounded-md border transition-colors"
                :style="{ 
                  borderColor: siteInfo?.design?.primary_color || '#2563eb',
                  color: siteInfo?.design?.primary_color || '#2563eb'
                }"
              >
                Logout
              </button>
            </div>
          </div>

          <!-- Mobile Menu Button -->
          <div class="md:hidden relative">
            <button 
              @click.prevent="toggleMobileMenu"
              data-mobile-menu-button
              class="p-2 rounded-md transition-colors"
              :style="{ 
                color: siteInfo?.design?.text_color || '#1f2937'
              }"
              aria-label="Toggle menu"
              type="button"
            >
              <svg 
                v-if="!mobileMenuOpen" 
                class="h-6 w-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
              <svg 
                v-else 
                class="h-6 w-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Mobile Menu -->
    <div 
      v-if="mobileMenuOpen" 
      data-mobile-menu
      class="md:hidden border-b"
      :style="{ 
        backgroundColor: siteInfo?.design?.background_color || '#ffffff',
        borderColor: siteInfo?.design?.primary_color || '#e5e7eb'
      }"
    >
      <div 
        class="mx-auto px-4 sm:px-6 lg:px-8 py-4"
        :style="{ maxWidth: siteInfo?.design?.container_width || '1200px' }"
      >
        <div class="space-y-4">
          <!-- Social Links -->
          <div v-if="links.length > 0">
            <h3 
              class="text-sm font-medium mb-2"
              :style="getHeadingStyle(siteInfo?.design, 'h3')"
            >
              Links
            </h3>
            <div class="flex flex-wrap gap-4">
              <a 
                v-for="link in links" 
                :key="link.id"
                :href="link.link_url" 
                target="_blank"
                class="text-sm font-medium hover:underline transition-colors"
                :style="{ 
                  color: siteInfo?.design?.primary_color || '#2563eb',
                  fontFamily: getFontFamily(siteInfo?.design, 'primary')
                }"
              >
                {{ link.link_name }}
              </a>
            </div>
          </div>
          
          <!-- Auth Links -->
          <div v-if="user" class="pt-4 border-t" :style="{ borderColor: siteInfo?.design?.primary_color || '#e5e7eb' }">
            <h3 
              class="text-sm font-medium mb-2"
              :style="getHeadingStyle(siteInfo?.design, 'h3')"
            >
              Admin
            </h3>
            <div class="space-y-2">
              <NuxtLink 
                to="/admin" 
                class="block w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors"
                :style="{ 
                  backgroundColor: siteInfo?.design?.primary_color || '#2563eb',
                  color: '#ffffff'
                }"
              >
                <svg class="inline mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Dashboard
              </NuxtLink>
              <button 
                @click="signOut"
                class="block w-full text-left px-3 py-2 text-sm font-medium rounded-md border transition-colors"
                :style="{ 
                  borderColor: siteInfo?.design?.primary_color || '#2563eb',
                  color: siteInfo?.design?.primary_color || '#2563eb'
                }"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="flex-1">
      <nuxt-page />
    </main>

    <!-- Footer -->
    <footer 
      class="border-t mt-12"
      :style="{ 
        backgroundColor: siteInfo?.design?.background_color || '#ffffff',
        height: siteInfo?.design?.footer_height || '120px',
        ...getBorderStyle(siteInfo?.design)
      }"
    >
      <div 
        class="mx-auto px-4 sm:px-6 lg:px-8 py-8"
        :style="{ maxWidth: siteInfo?.design?.container_width || '1200px' }"
      >
        <div class="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p 
            class="text-sm text-center sm:text-left"
            :style="getBodyStyle(siteInfo?.design)"
          >
            {{ siteInfo?.site_footer || '© 2025 John Biddulph. All rights reserved.' }}
          </p>
          
          <!-- Design Switcher -->
          <div class="flex items-center space-x-2">
            <span 
              class="text-xs"
              :style="getBodyStyle(siteInfo?.design)"
            >
              Theme:
            </span>
            <DesignSwitcher @design-changed="handleDesignChange" />
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const getSupabaseClient = () => {
  if (process.client) {
    try {
      return useSupabaseClient()
    } catch (error) {
      console.warn('Failed to initialize Supabase client:', error)
      return null
    }
  }
  return null
}
const user = ref(null)

// Reactive data
const siteInfo = ref<any>(null)
const links = ref<any[]>([])
const loading = ref(true)
const mobileMenuOpen = ref(false)

// SSR-safe process.client check
const isClient = computed(() => process.client)

// User design management - safe for SSR
let userDesignId = ref<number | null>(null)
let getEffectiveDesignId = (adminDesignId: number | null) => adminDesignId || 3

try {
  if (process.client) {
    const userDesign = useUserDesign()
    userDesignId.value = userDesign.userDesignId.value
    getEffectiveDesignId = userDesign.getEffectiveDesignId
  }
} catch (error) {
  console.warn('Failed to initialize user design composable:', error)
}

// Securely fetch user data (only if session exists)
const fetchUser = async () => {
  const client = getSupabaseClient()
  if (!client) {
    console.log('Supabase client not available (SSR)')
    user.value = null
    return
  }
  
  try {
    // First check if there's an active session
    const { data: { session } } = await client.auth.getSession()
    if (!session) {
      // No session, user is not logged in (this is normal for public pages)
      user.value = null
      return
    }
    
    // If session exists, get the authenticated user
    const { data: { user: authenticatedUser }, error } = await client.auth.getUser()
    if (!error && authenticatedUser) {
      user.value = authenticatedUser
    } else {
      user.value = null
    }
  } catch (error) {
    console.error('Error fetching user:', error)
    user.value = null
  }
}

// Fetch all data on mount
onMounted(async () => {
  const promises = [fetchSiteInfo(), fetchLinks()]
  
  // Only fetch user data on client side
  if (process.client) {
    promises.push(fetchUser())
  }
  
  await Promise.all(promises)
  loading.value = false
  
  // Load Google Fonts and custom CSS
  loadGoogleFontsAndCSS()
  
  // Close mobile menu when clicking outside
  const handleClickOutside = (event) => {
    const mobileMenu = document.querySelector('[data-mobile-menu]')
    const mobileMenuButton = document.querySelector('[data-mobile-menu-button]')
    
    if (mobileMenuOpen.value && 
        mobileMenu && 
        !mobileMenu.contains(event.target) && 
        !mobileMenuButton?.contains(event.target)) {
      mobileMenuOpen.value = false
    }
  }
  
  document.addEventListener('click', handleClickOutside)
  
  // Listen for theme changes from design switcher
  window.addEventListener('theme-changed', handleThemeChange)
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    window.removeEventListener('theme-changed', handleThemeChange)
  })
})

const fetchSiteInfo = async () => {
  try {
    const response = await $fetch('/api/site-info')
    siteInfo.value = response.data
    
    // Always fetch and apply user's preferred design (including default)
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
      loadGoogleFontsAndCSS()
    }
  } catch (error) {
    console.error('Error fetching user design:', error)
  }
}

const handleDesignChange = async (designId: number | string) => {
  // Only handle design changes on client side
  if (!process.client) return
  
  // Clean up old styles first
  cleanupOldStyles()
  
  if (designId && typeof designId === 'number') {
    await fetchUserDesign()
  } else {
    // Reset to default design (ID 3)
    await fetchUserDesign()
  }
}

const cleanupOldStyles = () => {
  if (process.client) {
    // Remove old Google Font links
    const oldFontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]')
    oldFontLinks.forEach(link => link.remove())
    
    // Remove old custom CSS
    const oldCustomCSS = document.querySelector('#custom-design-css')
    if (oldCustomCSS) {
      oldCustomCSS.remove()
    }
  }
}

const handleThemeChange = async (event) => {
  // Only handle theme changes on client side
  if (!process.client) return
  
  console.log('Theme change event received:', event.detail)
  // Clean up old styles first
  cleanupOldStyles()
  
  // Small delay to ensure cleanup is complete
  await new Promise(resolve => setTimeout(resolve, 100))
  
  // Reload the theme (always use user's preferred design)
  await fetchUserDesign()
}

const fetchLinks = async () => {
  try {
    const response = await $fetch('/api/links')
    links.value = response.data || []
  } catch (error) {
    console.error('Error fetching links:', error)
  }
}

// Computed styles based on design system
const dynamicStyles = computed(() => {
  if (!siteInfo.value?.design) return {}
  
  const design = siteInfo.value.design
  let fontFamily = design.font_family
  
  // Use Google Fonts if available
  if (design.google_fonts) {
    try {
      const googleFonts = JSON.parse(design.google_fonts)
      if (googleFonts.primary) {
        fontFamily = `"${googleFonts.primary}", ${design.font_family}`
      }
    } catch (e) {
      console.error('Error parsing Google Fonts:', e)
    }
  }
  
  return {
    backgroundColor: design.background_color,
    color: design.text_color,
    fontFamily: fontFamily,
    '--primary-color': design.primary_color,
    '--secondary-color': design.secondary_color,
    '--accent-color': design.accent_color,
    '--text-color': design.text_color,
    '--background-color': design.background_color
  }
})

// Utility functions
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

const getSiteNameStyle = (design, device = 'desktop') => {
  const fontSize = device === 'desktop' 
    ? (design?.site_name_size_desktop || '1.5rem')
    : (design?.site_name_size_mobile || '1.25rem')
  
  return {
    color: design?.text_color || '#1f2937',
    fontFamily: getFontFamily(design, 'heading'),
    fontSize: fontSize
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

const getBorderStyle = (design) => {
  const thickness = design?.border_thickness || '1px'
  const style = design?.border_style || 'solid'
  const color = design?.primary_color || '#e5e7eb'
  
  return {
    borderWidth: thickness,
    borderStyle: style,
    borderColor: color
  }
}

const signOut = async () => {
  const client = getSupabaseClient()
  if (!client) {
    console.error('Supabase client not available for sign out')
    return
  }
  
  await client.auth.signOut()
  await navigateTo('/login')
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// Watch for mobile menu state changes
watch(mobileMenuOpen, (newValue, oldValue) => {
  // Mobile menu state change handled by Vue reactivity
})

const loadGoogleFontsAndCSS = () => {
  if (process.client && siteInfo.value?.design?.google_fonts) {
    try {
      const googleFonts = JSON.parse(siteInfo.value.design.google_fonts)
      const fonts = []
      
      if (googleFonts.primary) {
        fonts.push(googleFonts.primary)
      }
      if (googleFonts.heading && googleFonts.heading !== googleFonts.primary) {
        fonts.push(googleFonts.heading)
      }
      
      if (fonts.length > 0) {
        const fontLink = document.createElement('link')
        fontLink.href = `https://fonts.googleapis.com/css2?${fonts.map(font => `family=${font.replace(/\s+/g, '+')}:wght@300;400;500;600;700`).join('&')}&display=swap`
        fontLink.rel = 'stylesheet'
        document.head.appendChild(fontLink)
      }
    } catch (e) {
      console.error('Error loading Google Fonts:', e)
    }
  }
  
  // Add custom CSS if provided
  if (process.client && siteInfo.value?.design?.custom_css) {
    const style = document.createElement('style')
    style.id = 'custom-design-css'
    style.textContent = siteInfo.value.design.custom_css
    document.head.appendChild(style)
  }
}
</script>

<style scoped>
/* Dynamic styling will be applied via computed styles */
</style>