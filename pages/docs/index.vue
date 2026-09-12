<template>
  <div>
    <PageIntro
      eyebrow="Documentation"
      title="Docs & guides"
      description="Articles, guides and resources on AI, Python and modern web development."
    />

    <section class="page-x section">
      <ContentList path="/docs" v-slot="{ list }">
        <ul class="auto-grid list-none p-0 [--grid-min:18rem]">
          <li v-for="(doc, index) in list" :key="doc._path" class="animate-fade-up" :style="{ animationDelay: `${Math.min(index, 8) * 60}ms` }">
            <NuxtLink :to="doc._path" class="card card-hover group flex h-full flex-col p-6 no-underline">
              <div class="mb-4 flex items-center justify-between gap-3">
                <span class="inline-flex h-10 w-10 items-center justify-center rounded-theme-sm bg-brand-soft text-brand" aria-hidden="true">
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </span>
                <time v-if="doc.date" :datetime="doc.date" class="text-xs text-muted">{{ formatDate(doc.date) }}</time>
              </div>
              <h2 class="font-heading text-lg font-semibold text-ink group-hover:text-brand">
                {{ doc.title || 'Untitled' }}
              </h2>
              <p class="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                {{ doc.description || 'Click to read more' }}
              </p>
              <div v-if="doc.tags?.length" class="mt-4 flex flex-wrap gap-1.5">
                <span v-for="tag in doc.tags.slice(0, 4)" :key="tag" class="chip">{{ tag }}</span>
              </div>
              <span class="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-brand">
                Read article
                <svg class="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </NuxtLink>
          </li>
        </ul>
      </ContentList>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Docs | John Michael Biddulph',
  description: 'Articles, guides and resources on AI, Python and modern web development.'
})

const formatDate = (value: string) => {
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })
}
</script>
