<template>
  <a
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    class="card card-hover group flex h-full overflow-hidden"
    :class="variant === 'row' ? 'flex-row items-stretch' : 'flex-col'"
  >
    <!-- Media -->
    <div
      v-if="item.project_image"
      class="relative shrink-0 overflow-hidden bg-surface-3"
      :class="variant === 'row' ? 'w-28 sm:w-36' : 'aspect-[4/3] w-full'"
    >
      <img
        :src="item.project_image"
        :alt="item.project_name"
        loading="lazy"
        decoding="async"
        class="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
      />
      <span
        v-if="variant === 'grid' && external"
        class="glass absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-ink shadow-theme-sm backdrop-blur"
        aria-hidden="true"
      >
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M7 7h10v10" />
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
        <h3 class="font-heading font-semibold leading-snug text-ink" :class="variant === 'row' ? 'text-base' : 'text-lg'">
          {{ item.project_name }}
        </h3>
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
          class="ml-1 font-medium text-brand hover:underline"
          @click.prevent.stop="expanded = !expanded"
        >
          {{ expanded ? 'Less' : 'More' }}
        </button>
      </p>

      <div v-if="tags.length" class="flex flex-wrap gap-1.5">
        <span v-for="tag in visibleTags" :key="tag" class="chip">{{ tag }}</span>
        <span v-if="tags.length > visibleTags.length" class="chip">+{{ tags.length - visibleTags.length }}</span>
      </div>

      <div class="mt-auto flex items-center justify-between gap-2 border-t border-line pt-3 text-sm font-medium text-brand">
        <span>{{ external ? 'Open live site' : 'View details' }}</span>
        <svg
          class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"
        >
          <path v-if="external" stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M7 7h10v10" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  formatProjectDate,
  getProjectHref,
  isExternalProject,
  splitTags,
  stripHtml,
  type PortfolioItem
} from '~/composables/useSiteContent'

const props = withDefaults(defineProps<{
  item: PortfolioItem
  variant?: 'grid' | 'row'
  previewLength?: number
  maxTags?: number
}>(), {
  variant: 'grid',
  previewLength: 110,
  maxTags: 4
})

const expanded = ref(false)

const href = computed(() => getProjectHref(props.item))
const external = computed(() => isExternalProject(props.item))
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
