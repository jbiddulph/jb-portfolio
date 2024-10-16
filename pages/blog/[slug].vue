<template>
  <article class="prose container mx-auto text-slate-900 bg-slate-50">
    <!-- <ContentDoc /> -->
    <header>
      <NuxtLink to="/blog">
        <p>{{ data.title }}</p>
        <p>{{ data.description }}</p>
      </NuxtLink>
      <Meta name="description" :description="description" />
      <Meta name="title" :description="title" />
    </header>
    <img :src="data.thumbnail" class="w-full h-auto object-cover" alt="">
    <ContentRenderer :value="data" class="p-4" />
  </article>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'content'
})
const route = useRoute()

const { data } = await useAsyncData(`content-${route.path}`, () => 
  queryContent().where({ _path: route.path }).findOne()
)
</script>

<style scoped>
.container {
  background: none;
}
</style>