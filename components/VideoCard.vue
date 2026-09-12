<template>
  <article class="card card-hover flex h-full flex-col overflow-hidden">
    <div class="relative aspect-video w-full bg-surface-3">
      <iframe
        v-if="embedUrl"
        :src="embedUrl"
        :title="video.title"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        class="absolute inset-0 h-full w-full"
      />
      <div v-else class="absolute inset-0 flex items-center justify-center text-sm text-muted">
        Video unavailable
      </div>
    </div>
    <div class="flex flex-1 flex-col gap-2 p-5">
      <h3 class="font-heading text-base font-semibold text-ink">{{ video.title }}</h3>
      <p v-if="video.description" class="line-clamp-3 text-sm leading-relaxed text-muted">
        {{ video.description }}
      </p>
      <a
        v-if="video.link"
        :href="video.link"
        target="_blank"
        rel="noopener noreferrer"
        class="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-brand hover:underline"
      >
        View project
        <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M7 7h10v10" />
        </svg>
      </a>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getYouTubeEmbedUrl, type VideoItem } from '~/composables/useSiteContent'

const props = defineProps<{ video: VideoItem }>()

const embedUrl = computed(() => getYouTubeEmbedUrl(props.video.youtube_url))
</script>
