<template>
  <div class="mx-auto px-4 sm:px-6 lg:px-8 py-12" :style="{ maxWidth: siteInfo?.design?.container_width || '1200px' }">
    <div class="mb-8">
      <h1 
        class="font-bold mb-4"
        :style="getHeadingStyle(siteInfo?.design, 'h1')"
      >
        Documentation
      </h1>
      <p 
        class="mb-6"
        :style="getBodyStyle(siteInfo?.design)"
      >
        Explore articles, guides, and resources.
      </p>
    </div>
    <ContentList path="/docs" v-slot="{ list }">
      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-0">
        <li
          v-for="doc in list"
          :key="doc._path"
          class="border rounded-lg p-6 hover:shadow-md transition-shadow flex flex-col h-full"
          :style="{ 
            ...getBorderStyle(siteInfo?.design),
            borderRadius: siteInfo?.design?.border_radius || '8px',
            backgroundColor: siteInfo?.design?.portfolio_card_background_color || '#ffffff'
          }"
        >
          <NuxtLink :to="doc._path" class="no-underline hover:underline flex-1 flex flex-col">
            <h2 
              class="text-xl font-semibold mb-2"
              :style="getHeadingStyle(siteInfo?.design, 'h2')"
            >
              {{ doc.title || 'Untitled' }}
            </h2>
            <p 
              class="mb-0"
              :style="getBodyStyle(siteInfo?.design)"
            >
              {{ doc.description || 'Click to read more' }}
            </p>
          </NuxtLink>
        </li>
      </ul>
    </ContentList>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

// Fetch site info for styling
const siteInfo = ref(null)

onMounted(async () => {
  try {
    const response = await $fetch('/api/site-info')
    siteInfo.value = response.data
  } catch (error) {
    console.error('Error fetching site info:', error)
  }
})

const getFontFamily = (design, fontType = 'primary') => {
  if (!design) return 'inherit'
  
  let fontFamily = fontType === 'heading' ? design.heading_font : design.font_family
  
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
    h1: design?.font_size_h1 || '2rem',
    h2: design?.font_size_h2 || '1.75rem',
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
</script>

<style scoped>

</style>