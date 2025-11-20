<template>
  <main class="prose container mx-auto text-slate-100">
    <ul v-if="docs" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-0">
      <li
        v-for="doc in docs"
        :key="doc._path"
        class="bg-slate-800 rounded-xl shadow-md p-6 border border-slate-700 hover:shadow-lg transition-shadow flex flex-col h-full"
      >
        <NuxtLink :to="doc._path" class="no-underline hover:underline flex-1 flex flex-col">
          <h2 class="text-xl font-semibold mb-2">{{ getDocTitle(doc) }}</h2>
          <p class="text-slate-300 mb-0">{{ getDocDescription(doc) }}</p>
        </NuxtLink>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
const { data: docs } = await useAsyncData('docs-list', () => 
  queryContent('/docs')
    .where({ _partial: false })
    .find()
)

const getDocTitle = (doc: any) => {
  // Use frontmatter title if available
  if (doc.title) return doc.title
  
  // Try to extract from first heading in content
  if (doc.body?.children) {
    const firstHeading = doc.body.children.find((child: any) => 
      child.tag && child.tag.startsWith('h')
    )
    if (firstHeading?.children?.[0]?.value) {
      return firstHeading.children[0].value
    }
  }
  
  // Fallback to filename
  const filename = doc._path?.split('/').pop() || 'Untitled'
  return filename.replace(/\.md$/, '').replace(/[-_]/g, ' ')
}

const getDocDescription = (doc: any) => {
  // Use frontmatter description if available
  if (doc.description) return doc.description
  
  // Try to extract first paragraph from content
  if (doc.body?.children) {
    const firstParagraph = doc.body.children.find((child: any) => 
      child.tag === 'p' && child.children?.[0]?.value
    )
    if (firstParagraph?.children?.[0]?.value) {
      const text = firstParagraph.children[0].value
      return text.length > 100 ? text.substring(0, 100) + '...' : text
    }
  }
  
  // Fallback message
  return 'Click to read more'
}
</script>

<style scoped>

</style>