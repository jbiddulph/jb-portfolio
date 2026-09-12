<template>
  <article>
    <PageIntro eyebrow="Blog" :description="data?.description || undefined">
      <template #title>{{ data?.title || 'Blog post' }}</template>
      <NuxtLink to="/blog" class="btn btn-outline">
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 12H5m6-6l-6 6 6 6" />
        </svg>
        All posts
      </NuxtLink>
    </PageIntro>

    <div class="page-x section grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,20rem)] xl:gap-16">
      <div class="min-w-0">
        <div class="mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
          <span v-if="data?.author" class="font-medium text-ink">{{ data.author }}</span>
          <span v-if="data?.author && date" aria-hidden="true">·</span>
          <time v-if="date" :datetime="date.toISOString()">
            {{ date.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }) }}
          </time>
        </div>

        <figure v-if="data?.thumbnail" class="card mb-10 overflow-hidden">
          <img :src="data.thumbnail" :alt="data.title" class="aspect-[16/9] w-full object-cover" fetchpriority="high" />
        </figure>

        <div class="prose-theme max-w-[78ch] text-[1.0625rem]">
          <ContentRenderer v-if="data" :value="data" />
        </div>
      </div>

      <aside class="space-y-6 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
        <div v-if="data?.tags?.length" class="card p-6">
          <h2 class="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink">Tags</h2>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="tag in data.tags" :key="tag" class="chip">{{ tag }}</span>
          </div>
        </div>

        <ContentList path="/blog" v-slot="{ list }">
          <div class="card p-6">
            <h2 class="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink">More posts</h2>
            <ul class="space-y-3 text-sm">
              <li v-for="doc in otherPosts(list)" :key="doc._path">
                <NuxtLink :to="doc._path" class="block text-muted transition-colors hover:text-brand">
                  {{ doc.title }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </ContentList>
      </aside>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { postDate } from '~/utils/blog'

const route = useRoute()

const { data } = await useAsyncData(`content-${route.path}`, () =>
  queryContent().where({ _path: route.path }).findOne()
)

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

const date = computed(() => postDate(data.value as any))

useSeoMeta({
  title: computed(() => `${data.value?.title || 'Blog'} | John Michael Biddulph`),
  description: computed(() => data.value?.description || '')
})

const otherPosts = (list: any[]) =>
  [...list]
    .filter((doc) => doc._path !== route.path)
    .sort((a, b) => (postDate(b)?.getTime() || 0) - (postDate(a)?.getTime() || 0))
    .slice(0, 6)
</script>
