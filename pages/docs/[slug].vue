<template>
  <div>
    <PageIntro eyebrow="Documentation" :description="data?.description || undefined">
      <template #title>{{ data?.title || 'Documentation' }}</template>
      <NuxtLink to="/docs" class="btn btn-outline">
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 12H5m6-6l-6 6 6 6" />
        </svg>
        All docs
      </NuxtLink>
    </PageIntro>

    <div class="page-x section grid gap-10 lg:grid-cols-[minmax(0,80ch)_minmax(16rem,20rem)] lg:justify-start xl:gap-16">
      <article class="min-w-0">
        <div v-if="data?.tags?.length || data?.date" class="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted">
          <time v-if="data?.date" :datetime="data.date">{{ formatDate(data.date) }}</time>
          <span v-if="data?.date && data?.tags?.length" aria-hidden="true">·</span>
          <span v-for="tag in data?.tags || []" :key="tag" class="chip">{{ tag }}</span>
        </div>
        <div class="prose-theme max-w-[78ch] text-[1.0625rem]">
          <ContentRenderer v-if="data" :value="data" />
        </div>
      </article>

      <aside class="space-y-6 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
        <nav v-if="toc.length" class="card p-6" aria-label="On this page">
          <h2 class="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink">On this page</h2>
          <ul class="space-y-1.5 text-sm">
            <li v-for="link in toc" :key="link.id" :class="link.depth > 2 ? 'pl-3' : ''">
              <a :href="`#${link.id}`" class="block text-muted transition-colors hover:text-brand">{{ link.text }}</a>
            </li>
          </ul>
        </nav>

        <ContentList path="/docs" v-slot="{ list }">
          <div class="card p-6">
            <h2 class="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink">More docs</h2>
            <ul class="space-y-2 text-sm">
              <li v-for="doc in list.filter((d) => d._path !== route.path).slice(0, 6)" :key="doc._path">
                <NuxtLink :to="doc._path" class="block text-muted transition-colors hover:text-brand">{{ doc.title }}</NuxtLink>
              </li>
            </ul>
          </div>
        </ContentList>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const route = useRoute()

const { data } = await useAsyncData(`content-${route.path}`, () =>
  queryContent().where({ _path: route.path }).findOne()
)

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Document not found', fatal: true })
}

useSeoMeta({
  title: computed(() => `${data.value?.title || 'Docs'} | John Michael Biddulph`),
  description: computed(() => data.value?.description || '')
})

const toc = computed(() =>
  (data.value?.body?.toc?.links || []).flatMap((link: any) => [
    { id: link.id, text: link.text, depth: link.depth },
    ...(link.children || []).map((child: any) => ({ id: child.id, text: child.text, depth: child.depth }))
  ])
)

const formatDate = (value: string) => {
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<style scoped>
.prose-theme :deep(h1:first-child) {
  display: none;
}

.prose-theme :deep(h2),
.prose-theme :deep(h3) {
  scroll-margin-top: calc(var(--header-h) + 1.5rem);
}
</style>
