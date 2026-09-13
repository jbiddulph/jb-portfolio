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
      <PageIntro :eyebrow="eyebrow" :description="summary">
        <template #title>{{ project.project_name }}</template>

        <a
          v-if="project.project_link"
          :href="project.project_link"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-primary"
        >
          View live site
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M7 7h10v10" />
          </svg>
        </a>
        <NuxtLink to="/portfolio" class="btn btn-outline">All projects</NuxtLink>
      </PageIntro>

      <div class="page-x section grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)] xl:gap-14">
        <div class="min-w-0 space-y-12">
          <figure v-if="project.project_image" class="card overflow-hidden">
            <a
              v-if="project.project_link"
              :href="project.project_link"
              target="_blank"
              rel="noopener noreferrer"
              class="group block"
              :aria-label="`Open ${project.project_name} live site`"
            >
              <img
                :src="project.project_image"
                :alt="project.project_name"
                class="w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.02]"
                fetchpriority="high"
              />
            </a>
            <img
              v-else
              :src="project.project_image"
              :alt="project.project_name"
              class="w-full object-cover"
              fetchpriority="high"
            />
          </figure>

          <div v-if="tags.length" class="flex flex-wrap gap-2">
            <span v-for="tag in tags" :key="tag" class="chip">{{ tag }}</span>
          </div>

          <section v-if="project.project_description">
            <h2 class="fluid-h3 mb-5 font-heading text-ink">Overview</h2>
            <div class="prose-theme max-w-[75ch] text-[1.0625rem]" v-html="project.project_description" />
          </section>

          <section v-if="details?.does">
            <h2 class="fluid-h3 mb-5 font-heading text-ink">How it works</h2>
            <p class="max-w-[75ch] text-[1.0625rem] leading-relaxed text-ink">{{ details.does }}</p>
          </section>

          <section v-if="details?.users?.length">
            <h2 class="fluid-h3 mb-5 font-heading text-ink">What you can do</h2>
            <ul class="grid max-w-[75ch] gap-3 sm:grid-cols-2">
              <li
                v-for="(item, index) in details.users"
                :key="index"
                class="card flex items-start gap-3 p-4 text-sm leading-relaxed text-ink"
              >
                <span class="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand" aria-hidden="true">
                  <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </section>

          <section v-if="project.project_link" class="card relative overflow-hidden p-6 sm:p-8">
            <div class="absolute inset-0 bg-hero-glow" aria-hidden="true" />
            <div class="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 class="font-heading text-xl font-semibold text-ink">Try {{ project.project_name }}</h2>
                <p class="mt-1 text-sm text-muted">Open the live application at {{ prettyUrl(project.project_link) }}.</p>
              </div>
              <a
                :href="project.project_link"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-primary shrink-0"
              >
                View live site
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M7 7h10v10" />
                </svg>
              </a>
            </div>
          </section>
        </div>

        <aside class="space-y-6 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
          <div class="card p-6">
            <h3 class="mb-4 font-heading text-base font-semibold text-ink">Project details</h3>
            <dl class="space-y-4 text-sm">
              <div>
                <dt class="text-xs font-medium uppercase tracking-wider text-muted">Launched</dt>
                <dd class="mt-1 text-ink">{{ launchedLabel }}</dd>
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
                    {{ prettyUrl(project.project_link) }}
                  </a>
                </dd>
              </div>
              <div v-if="details?.stack?.length">
                <dt class="text-xs font-medium uppercase tracking-wider text-muted">Built with</dt>
                <dd class="mt-2 flex flex-wrap gap-1.5">
                  <span v-for="tech in details.stack" :key="tech" class="chip">{{ tech }}</span>
                </dd>
              </div>
              <div v-if="tags.length">
                <dt class="text-xs font-medium uppercase tracking-wider text-muted">Tags</dt>
                <dd class="mt-2 flex flex-wrap gap-1.5">
                  <span v-for="tag in tags" :key="tag" class="chip">{{ tag }}</span>
                </dd>
              </div>
            </dl>
          </div>

          <!-- Admin-only operational details -->
          <div v-if="isAdmin" class="card border-brand/30 p-6">
            <div class="mb-4 flex items-start justify-between gap-3">
              <div>
                <p class="eyebrow flex items-center gap-1.5">
                  <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <path stroke-linecap="round" d="M8 11V7a4 4 0 118 0v4" />
                  </svg>
                  Admin only
                </p>
                <h3 class="mt-1 font-heading text-base font-semibold text-ink">Operational details</h3>
              </div>
              <NuxtLink :to="`/admin/portfolio/${project.id}/edit`" class="btn btn-outline btn-sm shrink-0">Edit</NuxtLink>
            </div>

            <p v-if="adminLoading" class="text-sm text-muted">Loading admin details…</p>
            <p v-else-if="adminError" class="text-sm text-red-600">{{ adminError }}</p>
            <template v-else-if="adminInfo">
              <dl class="space-y-4 text-sm">
                <div class="flex flex-wrap gap-1.5">
                  <span class="chip" :class="adminInfo.live ? 'text-brand' : 'text-muted'">
                    {{ adminInfo.live ? 'Live' : 'Hidden' }}
                  </span>
                  <span v-if="adminInfo.sort_order != null" class="chip">Order {{ adminInfo.sort_order }}</span>
                </div>

                <div v-for="field in visibleAdminFields" :key="field.key">
                  <dt class="text-xs font-medium uppercase tracking-wider text-muted">{{ field.label }}</dt>
                  <dd class="mt-1 break-words text-ink">
                    <a
                      v-if="field.isLink"
                      :href="field.value"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="break-all font-medium text-brand hover:underline"
                    >
                      {{ prettyUrl(field.value) }}
                    </a>
                    <span v-else class="whitespace-pre-line">{{ field.value }}</span>
                  </dd>
                </div>

                <div v-if="adminInfo.passwords">
                  <dt class="flex items-center justify-between gap-2 text-xs font-medium uppercase tracking-wider text-muted">
                    Passwords
                    <button type="button" class="font-medium normal-case tracking-normal text-brand hover:underline" @click="showPasswords = !showPasswords">
                      {{ showPasswords ? 'Hide' : 'Reveal' }}
                    </button>
                  </dt>
                  <dd class="mt-1 whitespace-pre-line break-words font-mono text-xs text-ink">
                    {{ showPasswords ? adminInfo.passwords : '••••••••••••' }}
                  </dd>
                </div>

                <p v-if="!visibleAdminFields.length && !adminInfo.passwords" class="text-sm text-muted">
                  No operational details recorded yet.
                </p>
              </dl>
            </template>
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
import {
  formatProjectDate,
  getProjectSlug,
  prettyUrl,
  splitTags,
  stripHtml,
  type PortfolioAdminInfo,
  type PortfolioDetail
} from '~/composables/useSiteContent'
import { isNumericId } from '~/lib/portfolioSlug'

const ADMIN_FIELD_LABELS = [
  { key: 'domains', label: 'Domains' },
  { key: 'subdomains', label: 'Subdomains' },
  { key: 'hosting', label: 'Hosting' },
  { key: 'database_info', label: 'Database' },
  { key: 'ssl', label: 'SSL' },
  { key: 'github_repo', label: 'GitHub repo' },
  { key: 'apis_used', label: 'APIs used' },
  { key: 'documentation', label: 'Documentation' },
  { key: 'other_info', label: 'Other information' }
] as const

const route = useRoute()
const { portfolio, load: loadPortfolio } = usePortfolioList()
const { isAdmin, load: loadAuthUser } = useAuthUser()
const { fetchAdminData } = useAdminFetch()

const project = ref<PortfolioDetail | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const adminInfo = ref<PortfolioAdminInfo | null>(null)
const adminLoading = ref(false)
const adminError = ref<string | null>(null)
const showPasswords = ref(false)

const details = computed(() => project.value?.details || null)
const tags = computed(() => splitTags(project.value?.project_tags))

const summary = computed(() => {
  if (details.value?.summary) return details.value.summary
  const plain = stripHtml(project.value?.project_description)
  return plain.match(/^.*?[.!?](?=\s|$)/)?.[0] || plain
})

const launchedLabel = computed(() =>
  details.value?.period || formatProjectDate(project.value?.project_date, { year: 'numeric', month: 'long' })
)

const eyebrow = computed(() => {
  const date = formatProjectDate(project.value?.project_date, { year: 'numeric', month: 'long' })
  return date ? `Project · ${date}` : 'Project'
})

const visibleAdminFields = computed(() => {
  if (!adminInfo.value) return []
  return ADMIN_FIELD_LABELS
    .map((field) => {
      const value = (adminInfo.value?.[field.key] || '').trim()
      return { ...field, value, isLink: /^https?:\/\//i.test(value) }
    })
    .filter((field) => field.value)
})

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
  description: computed(() => summary.value.slice(0, 160)),
  ogTitle: computed(() => project.value?.project_name || 'Project'),
  ogDescription: computed(() => summary.value.slice(0, 200)),
  ogImage: computed(() => project.value?.project_image || undefined)
})

const fetchProject = async () => {
  const param = String(route.params.slug || '')
  loading.value = true
  error.value = null
  adminInfo.value = null
  showPasswords.value = false

  try {
    const response: any = await $fetch(`/api/portfolio/${encodeURIComponent(param)}`)
    if (response?.success && response.data) {
      project.value = response.data
      // Canonicalise old numeric links (/portfolio/12) to the slug URL.
      const slug = getProjectSlug(response.data)
      if (isNumericId(param) && slug !== param) {
        await navigateTo(`/portfolio/${slug}`, { replace: true })
      }
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

const fetchAdminInfo = async () => {
  if (!isAdmin.value || !project.value) return
  adminLoading.value = true
  adminError.value = null
  try {
    const response: any = await fetchAdminData(`/api/admin/portfolio/${project.value.id}`)
    adminInfo.value = response?.data || null
  } catch (err: any) {
    console.error('Error fetching admin project details:', err)
    adminError.value = err?.statusCode === 401
      ? 'Your session has expired. Please log in again.'
      : 'Could not load admin details.'
  } finally {
    adminLoading.value = false
  }
}

onMounted(async () => {
  loadPortfolio()
  loadAuthUser()
  await fetchProject()
})

watch([isAdmin, () => project.value?.id], ([admin, id]) => {
  if (admin && id) {
    fetchAdminInfo()
  } else {
    adminInfo.value = null
  }
})

watch(() => route.params.slug, (next, prev) => {
  if (next === prev || !route.name || !String(route.name).startsWith('portfolio-slug')) return
  // Already showing this project (e.g. after the numeric-id redirect above).
  if (project.value && getProjectSlug(project.value) === next) return
  fetchProject()
  if (process.client) window.scrollTo({ top: 0 })
})
</script>
