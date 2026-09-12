<template>
  <div>
    <PageIntro
      eyebrow="Blog"
      title="Notes from the workbench"
      description="Short posts on what I'm building, learning and experimenting with."
    />

    <section class="page-x section">
      <ContentList path="/blog" v-slot="{ list }">
        <div class="auto-grid [--grid-min:18rem]">
          <article
            v-for="(doc, index) in sortPosts(list)"
            :key="doc._path"
            class="card card-hover group flex h-full flex-col overflow-hidden animate-fade-up"
            :style="{ animationDelay: `${Math.min(index, 8) * 60}ms` }"
          >
            <NuxtLink :to="doc._path" class="flex h-full flex-col no-underline">
              <div class="relative aspect-[16/10] w-full overflow-hidden bg-surface-3">
                <img
                  v-if="doc.thumbnail"
                  :src="doc.thumbnail"
                  :alt="doc.title"
                  loading="lazy"
                  class="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                />
                <div v-else class="flex h-full w-full items-center justify-center bg-hero-glow font-heading text-3xl font-bold text-brand" aria-hidden="true">
                  {{ (doc.title || 'B').charAt(0) }}
                </div>
              </div>
              <div class="flex flex-1 flex-col gap-3 p-5">
                <time v-if="postDate(doc)" :datetime="postDate(doc)?.toISOString()" class="text-xs font-medium uppercase tracking-wider text-muted">
                  {{ postDate(doc)?.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }) }}
                </time>
                <h2 class="font-heading text-lg font-semibold leading-snug text-ink group-hover:text-brand">{{ doc.title }}</h2>
                <p v-if="doc.description" class="line-clamp-3 text-sm leading-relaxed text-muted">{{ doc.description }}</p>
                <div v-if="doc.tags?.length" class="mt-auto flex flex-wrap gap-1.5 pt-2">
                  <span v-for="tag in doc.tags.slice(0, 4)" :key="tag" class="chip">{{ tag }}</span>
                </div>
              </div>
            </NuxtLink>
          </article>
        </div>
      </ContentList>
    </section>
  </div>
</template>

<script setup lang="ts">
import { postDate } from '~/utils/blog'

useSeoMeta({
  title: 'Blog | John Michael Biddulph',
  description: 'Short posts on what John Biddulph is building, learning and experimenting with.'
})

const sortPosts = (list: any[]) =>
  [...list].sort((a, b) => (postDate(b)?.getTime() || 0) - (postDate(a)?.getTime() || 0))
</script>
