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
  line-height: 1.75;
  color: inherit;
}

/* Paragraphs - spacing at bottom */
.prose p {
  margin-top: 0;
  margin-bottom: 1.5rem;
}

/* Headers - spacing above and below */
.prose h1 {
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
}

.prose h1:first-child {
  margin-top: 0;
}

.prose h2 {
  margin-top: 3rem;
  margin-bottom: 1.25rem;
  font-weight: 600;
  line-height: 1.3;
}

.prose h2:first-child {
  margin-top: 0;
}

.prose h3 {
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
  line-height: 1.4;
}

.prose h4 {
  margin-top: 2rem;
  margin-bottom: 0.875rem;
  font-weight: 600;
  line-height: 1.4;
}

.prose h5, .prose h6 {
  margin-top: 1.75rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
  line-height: 1.4;
}

/* Lists - spacing between items and at bottom */
.prose ul, .prose ol {
  margin-top: 0;
  margin-bottom: 1.75rem;
  padding-left: 1.75rem;
}

.prose li {
  margin-top: 0.5rem;
  margin-bottom: 0.75rem;
  line-height: 1.7;
}

.prose li:first-child {
  margin-top: 0;
}

.prose li:last-child {
  margin-bottom: 0;
}

/* Nested lists */
.prose ul ul, .prose ol ol, .prose ul ol, .prose ol ul {
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
}

/* Spacing after paragraphs before lists */
.prose p + ul, .prose p + ol {
  margin-top: -0.5rem;
}

/* Spacing after lists */
.prose ul + p, .prose ol + p {
  margin-top: 1.5rem;
}

/* Spacing after headers */
.prose h1 + p, .prose h2 + p, .prose h3 + p, .prose h4 + p, .prose h5 + p, .prose h6 + p {
  margin-top: 0;
}

/* Links */
.prose a {
  text-decoration: underline;
  color: inherit;
  text-underline-offset: 2px;
}

.prose a:hover {
  opacity: 0.8;
}

/* Blockquotes */
.prose blockquote {
  border-left: 4px solid #e5e7eb;
  padding-left: 1.25rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1.75rem;
  font-style: italic;
}

/* Code */
.prose code {
  background-color: #f3f4f6;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9em;
  line-height: 1.5;
}

.prose p code {
  margin: 0 0.125rem;
}

/* Code blocks */
.prose pre {
  background-color: #f3f4f6;
  padding: 1.25rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin-top: 1.5rem;
  margin-bottom: 1.75rem;
  line-height: 1.6;
}

.prose pre code {
  background-color: transparent;
  padding: 0;
  margin: 0;
  font-size: 0.875em;
}

/* Horizontal rules */
.prose hr {
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
  border: none;
  border-top: 1px solid #e5e7eb;
}

/* Images */
.prose img {
  margin-top: 1.5rem;
  margin-bottom: 1.75rem;
  max-width: 100%;
  height: auto;
}

/* Tables */
.prose table {
  margin-top: 1.5rem;
  margin-bottom: 1.75rem;
  width: 100%;
  border-collapse: collapse;
}

.prose th, .prose td {
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
}

.prose th {
  font-weight: 600;
  background-color: #f9fafb;
}
</style>