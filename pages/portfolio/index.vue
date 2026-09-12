<template>
  <div>
    <PageIntro
      eyebrow="Portfolio"
      :title="pages?.portfolio || 'My Portfolio'"
      description="A collection of recent client work, products and side projects."
    >
      <a
        href="/john-biddulph-recent-projects-2026.pdf"
        download="john-biddulph-recent-projects-2026.pdf"
        class="btn btn-primary"
      >
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
        </svg>
        Recent projects (PDF)
      </a>
    </PageIntro>

    <section class="page-x section">
      <!-- Toolbar -->
      <div v-if="portfolio.length" class="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div class="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by technology">
          <button
            type="button"
            class="btn btn-sm"
            :class="activeTag === null ? 'btn-primary' : 'btn-outline'"
            @click="activeTag = null"
          >
            All
            <span class="opacity-70">{{ portfolio.length }}</span>
          </button>
          <button
            v-for="tag in topTags"
            :key="tag.name"
            type="button"
            class="btn btn-sm"
            :class="activeTag === tag.name ? 'btn-primary' : 'btn-outline'"
            @click="activeTag = activeTag === tag.name ? null : tag.name"
          >
            {{ tag.name }}
            <span class="opacity-70">{{ tag.count }}</span>
          </button>
        </div>
        <label class="relative block w-full lg:max-w-xs">
          <span class="sr-only">Search projects</span>
          <svg class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path stroke-linecap="round" d="M20 20l-3.5-3.5" />
          </svg>
          <input
            v-model="query"
            type="search"
            placeholder="Search projects…"
            class="field-input !rounded-full !py-2.5 !pl-11"
          />
        </label>
      </div>

      <!-- Loading -->
      <div v-if="loading && !portfolio.length" class="auto-grid [--grid-min:18rem]">
        <SkeletonCard v-for="n in 8" :key="n" />
      </div>

      <!-- Empty -->
      <div v-else-if="portfolio.length === 0" class="card mx-auto flex max-w-lg flex-col items-center gap-4 px-6 py-16 text-center">
        <span class="flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft text-brand" aria-hidden="true">
          <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20 7H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
          </svg>
        </span>
        <h2 class="font-heading text-lg font-semibold text-ink">
          {{ failed ? 'Projects could not be loaded' : 'No projects available' }}
        </h2>
        <p class="text-sm text-muted">
          {{ failed ? 'Please try again in a moment.' : 'Check back later for new projects and updates.' }}
        </p>
        <button v-if="failed" type="button" class="btn btn-primary btn-sm" @click="load(true)">Retry</button>
      </div>

      <!-- Grid -->
      <template v-else>
        <p class="mb-4 text-sm text-muted" aria-live="polite">
          Showing {{ filtered.length }} of {{ portfolio.length }} projects
          <template v-if="activeTag"> tagged <strong class="text-ink">{{ activeTag }}</strong></template>
          <template v-if="query"> matching “<strong class="text-ink">{{ query }}</strong>”</template>
        </p>

        <div v-if="filtered.length" class="auto-grid [--grid-min:18rem]">
          <PortfolioCard v-for="item in filtered" :key="item.id" :item="item" />
        </div>

        <div v-else class="card flex flex-col items-center gap-3 px-6 py-14 text-center">
          <p class="text-muted">No projects match that filter.</p>
          <button type="button" class="btn btn-outline btn-sm" @click="resetFilters">Clear filters</button>
        </div>
      </template>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { splitTags, stripHtml } from '~/composables/useSiteContent'

useSeoMeta({
  title: 'Projects | John Michael Biddulph',
  description: 'A collection of recent projects and client work by John Biddulph, Full Stack Engineer.'
})

const { pages, load: loadPages } = useSitePages()
const { portfolio, loading, failed, load } = usePortfolioList()

const activeTag = ref<string | null>(null)
const query = ref('')

const topTags = computed(() => {
  const counts = new Map<string, number>()
  for (const item of portfolio.value) {
    for (const tag of splitTags(item.project_tags)) {
      counts.set(tag, (counts.get(tag) || 0) + 1)
    }
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, 8)
})

const filtered = computed(() => {
  const needle = query.value.trim().toLowerCase()
  return portfolio.value.filter((item) => {
    if (activeTag.value && !splitTags(item.project_tags).includes(activeTag.value)) return false
    if (!needle) return true
    const haystack = [item.project_name, stripHtml(item.project_description), item.project_tags]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    return haystack.includes(needle)
  })
})

const resetFilters = () => {
  activeTag.value = null
  query.value = ''
}

onMounted(() => {
  loadPages()
  load()
})
</script>
