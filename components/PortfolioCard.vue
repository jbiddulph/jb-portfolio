<template>
  <article
    class="card card-hover group relative flex h-full overflow-hidden focus-within:ring-2 focus-within:ring-brand/40"
    :class="variant === 'row' ? 'flex-row items-stretch' : 'flex-col'"
  >
    <!-- Media -->
    <div
      v-if="item.project_image"
      class="relative shrink-0 overflow-hidden bg-surface-3"
      :class="variant === 'row' ? 'w-28 sm:w-36' : 'aspect-[4/3] w-full'"
    >
      <SmartImage
        :src="item.project_image"
        :alt="item.project_name"
        :priority="priority"
        :sizes="variant === 'row' ? 'xs:144px' : 'xs:100vw sm:50vw lg:33vw xxl:25vw'"
        class="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
      />
      <span
        v-if="variant === 'grid'"
        class="glass absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-ink shadow-theme-sm backdrop-blur"
        aria-hidden="true"
      >
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </div>
    <div
      v-else-if="variant === 'grid'"
      class="flex aspect-[4/3] w-full items-center justify-center bg-hero-glow bg-surface-2 font-heading text-4xl font-bold text-brand"
      aria-hidden="true"
    >
      {{ item.project_name?.charAt(0) }}
    </div>

    <!-- Body -->
    <div class="flex min-w-0 flex-1 flex-col gap-3" :class="variant === 'row' ? 'p-4' : 'p-5'">
      <div class="flex items-start justify-between gap-3">
        <component :is="headingTag" class="font-heading font-semibold leading-snug text-ink" :class="variant === 'row' ? 'text-base' : 'text-lg'">
          <!-- Stretched link: covers the whole card so any click opens the details page. -->
          <NuxtLink
            :to="detailHref"
            class="outline-none after:absolute after:inset-0 after:z-0 after:content-['']"
            :aria-label="`View details for ${item.project_name}`"
          >
            {{ item.project_name }}
          </NuxtLink>
        </component>
        <time
          v-if="dateLabel"
          :datetime="item.project_date"
          class="shrink-0 rounded-full bg-surface-3 px-2 py-0.5 text-[0.6875rem] font-medium text-muted"
        >
          {{ dateLabel }}
        </time>
      </div>

      <p v-if="plainDescription" class="text-sm leading-relaxed text-muted">
        {{ visibleDescription }}
        <button
          v-if="isTruncatable"
          type="button"
          class="relative z-10 ml-1 font-medium text-brand hover:underline"
          @click.prevent.stop="expanded = !expanded"
        >
          {{ expanded ? 'Less' : 'More' }}
        </button>
      </p>

      <div v-if="tags.length" class="flex flex-wrap gap-1.5">
        <span v-for="tag in visibleTags" :key="tag" class="chip">{{ tag }}</span>
        <span v-if="tags.length > visibleTags.length" class="chip">+{{ tags.length - visibleTags.length }}</span>
      </div>

      <div class="mt-auto flex items-center justify-between gap-3 border-t border-line pt-3 text-sm font-medium">
        <!-- Small secondary link straight to the live product. Sits above the stretched link. -->
        <a
          v-if="item.project_link"
          :href="item.project_link"
          target="_blank"
          rel="noopener noreferrer"
          class="relative z-10 inline-flex items-center gap-1 text-xs font-medium text-muted transition-colors hover:text-brand hover:underline"
          :aria-label="`Open live site for ${item.project_name} in a new tab`"
          @click.stop
        >
          <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M7 7h10v10" />
          </svg>
          Live site
        </a>
        <span v-else class="text-xs text-muted">Case study</span>

        <span class="inline-flex items-center gap-1.5 text-brand">
          View details
          <svg
            class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  formatProjectDate,
  getProjectHref,
  splitTags,
  stripHtml,
  type PortfolioItem
} from '~/composables/useSiteContent'

const props = withDefaults(defineProps<{
  item: PortfolioItem
  variant?: 'grid' | 'row'
  previewLength?: number
  maxTags?: number
  /** Above-the-fold card (e.g. the hero's featured project): load its image eagerly. */
  priority?: boolean
  /** Heading level so the card fits the page outline (h2 directly under a page h1, h3 under a section h2). */
  headingTag?: 'h2' | 'h3' | 'h4'
}>(), {
  variant: 'grid',
  previewLength: 110,
  maxTags: 4,
  priority: false,
  headingTag: 'h3'
})

const expanded = ref(false)

const detailHref = computed(() => getProjectHref(props.item))
const dateLabel = computed(() => formatProjectDate(props.item.project_date))
const tags = computed(() => splitTags(props.item.project_tags))
const visibleTags = computed(() => (expanded.value ? tags.value : tags.value.slice(0, props.maxTags)))
const plainDescription = computed(() => stripHtml(props.item.project_description))
const isTruncatable = computed(() => plainDescription.value.length > props.previewLength)
const visibleDescription = computed(() =>
  !isTruncatable.value || expanded.value
    ? plainDescription.value
    : `${plainDescription.value.slice(0, props.previewLength).trimEnd()}…`
)
</script>
