<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden border-b border-line">
      <div class="absolute inset-0 bg-hero-glow" aria-hidden="true" />
      <div class="absolute inset-x-0 top-0 h-[60%] bg-grid-fade opacity-50" aria-hidden="true" />

      <div
        class="page-x relative grid gap-12 py-[clamp(3rem,8vw,7rem)]"
        :class="heroSplit ? 'lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center' : 'max-w-5xl'"
      >
        <div class="animate-fade-up">
          <p class="eyebrow mb-5">{{ siteInfo?.site_slogan || 'Full Stack Engineer' }}</p>
          <h1 class="display text-ink">
            {{ pages?.home || 'Welcome to my portfolio' }}
          </h1>
          <div class="prose-theme lead mt-6 max-w-2xl" v-html="siteDescription" />
          <p class="mt-4 max-w-2xl text-muted">
            Enjoys building intuitive, responsive applications that provide seamless user experiences.
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <NuxtLink to="/portfolio" class="btn btn-primary btn-lg">
              View projects
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </NuxtLink>
            <NuxtLink to="/services" class="btn btn-outline btn-lg">Services</NuxtLink>
            <NuxtLink to="/cv" class="btn btn-ghost btn-lg">Read my CV</NuxtLink>
          </div>

          <dl class="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-6 sm:grid-cols-3">
            <div>
              <dt class="text-xs font-medium uppercase tracking-wider text-muted">Experience</dt>
              <dd class="mt-1 font-heading text-2xl font-bold text-ink">16+ yrs</dd>
            </div>
            <div>
              <dt class="text-xs font-medium uppercase tracking-wider text-muted">Projects</dt>
              <dd class="mt-1 font-heading text-2xl font-bold text-ink">
                <span v-if="portfolio.length">{{ portfolio.length }}</span>
                <span v-else class="inline-block h-7 w-10 animate-pulse rounded bg-surface-3 align-middle" />
              </dd>
            </div>
            <div class="col-span-2 sm:col-span-1">
              <dt class="text-xs font-medium uppercase tracking-wider text-muted">Get in touch</dt>
              <dd class="mt-1">
                <a href="tel:07935085736" class="font-heading text-2xl font-bold text-brand hover:underline">07935 085736</a>
              </dd>
            </div>
          </dl>
        </div>

        <div v-if="heroSplit" class="relative animate-fade-up [animation-delay:150ms]">
          <div
            class="absolute -inset-4 -z-10 rounded-theme-lg bg-brand-soft blur-2xl"
            aria-hidden="true"
          />
          <figure v-if="siteInfo?.site_image" class="card overflow-hidden">
            <SmartImage
              :src="siteInfo.site_image"
              :alt="siteName"
              priority
              sizes="xs:100vw lg:45vw xxl:800px"
              class="aspect-[4/3] w-full object-cover"
            />
          </figure>
          <div v-else-if="featured[0]" class="grid gap-4">
            <p class="eyebrow">Latest project</p>
            <PortfolioCard :item="featured[0]" priority />
          </div>
          <div v-else class="card aspect-[4/3] animate-pulse bg-surface-2" aria-hidden="true" />
        </div>
      </div>

      <figure v-if="!heroSplit && siteInfo?.site_image" class="page-x relative pb-[clamp(3rem,6vw,5rem)]">
        <SmartImage
          :src="siteInfo.site_image"
          :alt="siteName"
          priority
          sizes="xs:100vw xxl:1400px"
          class="card aspect-[21/9] w-full object-cover"
        />
      </figure>
    </section>

    <!-- Projects -->
    <section class="page-x section">
      <SectionHeading
        eyebrow="Selected work"
        :title="pages?.portfolio || 'My Projects'"
        description="Recent client work, products and experiments — built with Vue, Nuxt, React, Laravel, Python and Supabase."
      >
        <NuxtLink to="/portfolio" class="btn btn-outline">
          All projects
          <span v-if="portfolio.length" class="rounded-full bg-brand-soft px-2 py-0.5 text-xs text-brand">{{ portfolio.length }}</span>
        </NuxtLink>
      </SectionHeading>

      <div v-if="portfolioLoading && !portfolio.length" class="auto-grid [--grid-min:17rem]">
        <SkeletonCard v-for="n in 4" :key="n" />
      </div>

      <div v-else-if="portfolio.length === 0" class="card flex flex-col items-center gap-4 px-6 py-16 text-center">
        <p class="text-muted">{{ portfolioFailed ? 'Projects could not be loaded right now.' : 'No projects available yet.' }}</p>
        <button type="button" class="btn btn-primary" @click="loadPortfolio(true)">
          Retry loading projects
        </button>
      </div>

      <template v-else>
        <div class="auto-grid [--grid-min:17rem]">
          <PortfolioCard v-for="(item, index) in featured" :key="item.id" :item="item" :priority="index === 0" />
        </div>
        <div v-if="remainingCount > 0" class="mt-10 text-center">
          <NuxtLink to="/portfolio" class="btn btn-primary btn-lg">
            View {{ remainingCount }} more {{ remainingCount === 1 ? 'project' : 'projects' }}
          </NuxtLink>
        </div>
      </template>
    </section>

    <!-- Videos -->
    <section v-if="videos.length" class="border-t border-line bg-surface-2">
      <div class="page-x section">
        <SectionHeading eyebrow="Watch" title="Video showcases" description="Walkthroughs and demos of recent builds.">
          <div v-if="totalVideoPages > 1" class="flex items-center gap-2">
            <button type="button" class="btn btn-outline btn-sm" :disabled="currentVideoPage === 1" @click="currentVideoPage--">
              Previous
            </button>
            <span class="text-sm text-muted">{{ currentVideoPage }} / {{ totalVideoPages }}</span>
            <button type="button" class="btn btn-outline btn-sm" :disabled="currentVideoPage === totalVideoPages" @click="currentVideoPage++">
              Next
            </button>
          </div>
        </SectionHeading>

        <div class="auto-grid [--grid-min:20rem]">
          <VideoCard v-for="video in paginatedVideos" :key="video.id" :video="video" />
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="page-x section-tight">
      <div class="card relative overflow-hidden p-[clamp(1.5rem,4vw,3.5rem)]">
        <div class="absolute inset-0 bg-hero-glow" aria-hidden="true" />
        <div class="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div class="max-w-xl">
            <p class="eyebrow mb-3">Work with me</p>
            <h2 class="fluid-h2 font-heading text-ink">Have a project in mind?</h2>
            <p class="mt-3 text-muted">
              Full stack builds, polished frontends and search-ready experiences. Tell me about your goals and I'll get back to you quickly.
            </p>
          </div>
          <div class="flex flex-wrap gap-3">
            <NuxtLink to="/services#enquire" class="btn btn-primary btn-lg">Enquire online</NuxtLink>
            <a href="tel:07935085736" class="btn btn-outline btn-lg">Call 07935 085736</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const FEATURED_LIMIT = 8
const VIDEOS_PER_PAGE = 6

const DEFAULT_DESCRIPTION = 'A passionate Nuxt developer specialising in modern JavaScript frameworks like VueJs / Nuxt with Supabase, Prisma and Pinia and some React / Next. Always still experimenting and learning Python, Laravel.'

const { siteInfo, siteName, isOneColumnLayout } = useSiteDesign()
const { pages, load: loadPages } = useSitePages()
const { portfolio, loading: portfolioLoading, failed: portfolioFailed, load: loadPortfolio } = usePortfolioList()
const { videos, load: loadVideos } = useVideoList()

const currentVideoPage = ref(1)

const heroSplit = computed(() => !isOneColumnLayout.value)
const siteDescription = computed(() => siteInfo.value?.site_description || DEFAULT_DESCRIPTION)
const featured = computed(() => portfolio.value.slice(0, FEATURED_LIMIT))
const remainingCount = computed(() => Math.max(portfolio.value.length - FEATURED_LIMIT, 0))

const totalVideoPages = computed(() => Math.max(Math.ceil(videos.value.length / VIDEOS_PER_PAGE), 1))
const paginatedVideos = computed(() => {
  const start = (currentVideoPage.value - 1) * VIDEOS_PER_PAGE
  return videos.value.slice(start, start + VIDEOS_PER_PAGE)
})

// Rendered into the first HTML during SSR; in the browser these resolve
// immediately from the payload (or fetch in the background after a timeout).
const ready = Promise.all([loadPages(), loadPortfolio(), loadVideos()])
if (import.meta.server) await ready
else if (!portfolio.value.length) loadPortfolio()
</script>
