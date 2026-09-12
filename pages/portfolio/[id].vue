<template>
  <div>
    <!-- Loading -->
    <div v-if="loading" class="page-x section">
      <div class="mb-8 h-4 w-32 animate-pulse rounded bg-surface-3" />
      <div class="mb-10 h-12 w-2/3 max-w-xl animate-pulse rounded bg-surface-3" />
      <div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)]">
        <div class="card aspect-video animate-pulse bg-surface-2" />
        <SkeletonCard :media="false" />
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="page-x section">
      <div class="card mx-auto flex max-w-lg flex-col items-center gap-4 px-6 py-16 text-center">
        <h1 class="fluid-h2 font-heading text-ink">Project not found</h1>
        <p class="text-muted">{{ error }}</p>
        <NuxtLink to="/portfolio" class="btn btn-primary">Back to all projects</NuxtLink>
      </div>
    </div>

    <!-- Project -->
    <article v-else-if="project">
      <PageIntro :eyebrow="`Project · ${formatProjectDate(project.project_date, { year: 'numeric', month: 'long' })}`">
        <template #title>{{ project.project_name }}</template>
        <template v-if="tags.length" #description>
          <span class="flex flex-wrap gap-2">
            <span v-for="tag in tags" :key="tag" class="chip">{{ tag }}</span>
          </span>
        </template>

        <a
          v-if="project.project_link"
          :href="project.project_link"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-primary"
        >
          View live project
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M7 7h10v10" />
          </svg>
        </a>
        <NuxtLink to="/portfolio" class="btn btn-outline">All projects</NuxtLink>
      </PageIntro>

      <div class="page-x section grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)] xl:gap-14">
        <div class="min-w-0 space-y-10">
          <figure v-if="project.project_image" class="card overflow-hidden">
            <img
              :src="project.project_image"
              :alt="project.project_name"
              class="w-full object-cover"
              fetchpriority="high"
            />
          </figure>

          <section>
            <h2 class="fluid-h3 mb-5 font-heading text-ink">About this project</h2>
            <div class="prose-theme max-w-[75ch] text-[1.0625rem]" v-html="project.project_description" />
          </section>
        </div>

        <aside class="space-y-6 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
          <div class="card p-6">
            <h3 class="mb-4 font-heading text-base font-semibold text-ink">Project details</h3>
            <dl class="space-y-4 text-sm">
              <div>
                <dt class="text-xs font-medium uppercase tracking-wider text-muted">Launched</dt>
                <dd class="mt-1 text-ink">{{ formatProjectDate(project.project_date, { year: 'numeric', month: 'long', day: 'numeric' }) }}</dd>
              </div>
              <div v-if="project.project_link">
                <dt class="text-xs font-medium uppercase tracking-wider text-muted">Live URL</dt>
                <dd class="mt-1">
                  <a
                    :href="project.project_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="break-all font-medium text-brand hover:underline"
                  >
                    {{ prettyUrl }}
                  </a>
                </dd>
              </div>
              <div v-if="tags.length">
                <dt class="text-xs font-medium uppercase tracking-wider text-muted">Technologies</dt>
                <dd class="mt-2 flex flex-wrap gap-1.5">
                  <span v-for="tag in tags" :key="tag" class="chip">{{ tag }}</span>
                </dd>
              </div>
            </dl>
          </div>

          <div class="card relative overflow-hidden p-6">
            <div class="absolute inset-0 bg-hero-glow" aria-hidden="true" />
            <div class="relative">
              <h3 class="font-heading text-base font-semibold text-ink">Like what you see?</h3>
              <p class="mt-2 text-sm text-muted">I'm available for full stack, frontend and UI/UX work.</p>
              <NuxtLink to="/services#enquire" class="btn btn-primary btn-sm mt-4">Start a project</NuxtLink>
            </div>
          </div>
        </aside>
      </div>

      <!-- More projects -->
      <section v-if="related.length" class="border-t border-line bg-surface-2">
        <div class="page-x section-tight">
          <SectionHeading eyebrow="Keep exploring" title="More projects">
            <NuxtLink to="/portfolio" class="btn btn-outline btn-sm">View all</NuxtLink>
          </SectionHeading>
          <div class="auto-grid [--grid-min:17rem]">
            <PortfolioCard v-for="item in related" :key="item.id" :item="item" />
          </div>
        </div>
      </section>
    </article>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { formatProjectDate, splitTags, type PortfolioItem } from '~/composables/useSiteContent'

const route = useRoute()
const { portfolio, load: loadPortfolio } = usePortfolioList()

const project = ref<PortfolioItem | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const tags = computed(() => splitTags(project.value?.project_tags))
const prettyUrl = computed(() => (project.value?.project_link || '').replace(/^https?:\/\//, '').replace(/\/$/, ''))

const related = computed(() => {
  if (!project.value) return []
  const currentTags = new Set(tags.value)
  return portfolio.value
    .filter((item) => item.id !== project.value?.id)
    .map((item) => ({
      item,
      score: splitTags(item.project_tags).filter((tag) => currentTags.has(tag)).length
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(({ item }) => item)
})

useSeoMeta({
  title: computed(() => project.value ? `${project.value.project_name} | John Michael Biddulph` : 'Project | John Michael Biddulph'),
  description: computed(() => project.value?.project_description?.replace(/<[^>]*>/g, '').slice(0, 160) || '')
})

const fetchProject = async () => {
  loading.value = true
  error.value = null
  try {
    const response: any = await $fetch(`/api/portfolio/${route.params.id}`)
    if (response?.success && response.data) {
      project.value = response.data
    } else {
      error.value = 'This project could not be found.'
    }
  } catch (err: any) {
    console.error('Error fetching project:', err)
    error.value = err?.statusCode === 404
      ? 'This project could not be found.'
      : `Failed to load project details: ${err?.message || 'Unknown error'}`
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProject()
  loadPortfolio()
})

watch(() => route.params.id, () => {
  if (route.name && String(route.name).startsWith('portfolio-id')) {
    fetchProject()
    if (process.client) window.scrollTo({ top: 0 })
  }
})
</script>
