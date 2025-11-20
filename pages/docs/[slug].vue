<template>
  <div class="mx-auto px-4 sm:px-6 lg:px-8 py-12" :style="{ maxWidth: siteInfo?.design?.container_width || '1200px' }">
    <div class="mb-8">
      <h1 
        v-if="data?.title"
        class="font-bold mb-4"
        :style="getHeadingStyle(siteInfo?.design, 'h1')"
      >
        {{ data.title }}
      </h1>
      <p 
        v-if="data?.description"
        class="mb-6"
        :style="getBodyStyle(siteInfo?.design)"
      >
        {{ data.description }}
      </p>
    </div>
    <div class="prose max-w-none">
      <ContentRenderer :value="data" />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
const route = useRoute()

const { data } = await useAsyncData(`content-${route.path}`, () => 
  queryContent().where({ _path: route.path }).findOne()
)

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
</script>

<style scoped>
.prose {
  line-height: 1.7;
}

.prose p {
  margin-bottom: 1.25rem;
}

.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.prose h2 {
  margin-top: 2.5rem;
}

.prose ul, .prose ol {
  margin-bottom: 1.25rem;
  padding-left: 1.75rem;
}

.prose li {
  margin-bottom: 0.5rem;
}

.prose a {
  text-decoration: underline;
  color: inherit;
}

.prose blockquote {
  border-left: 4px solid #e5e7eb;
  padding-left: 1rem;
  margin: 1.5rem 0;
  font-style: italic;
}

.prose code {
  background-color: #f3f4f6;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-family: monospace;
  font-size: 0.9em;
}

.prose pre {
  background-color: #f3f4f6;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.prose pre code {
  background-color: transparent;
  padding: 0;
}
</style>