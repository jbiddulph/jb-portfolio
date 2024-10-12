<template>
  <main class="prose container mx-auto text-slate-900 bg-slate-50">
    <!-- <ContentDoc /> -->
    <header>
      <p>{{ data.title }}</p>
      <p>{{ data.description }}</p>
      <Meta name="description" :description="description" />
      <Meta name="title" :description="title" />
    </header>
    <ContentRenderer :value="data" class="p-4" />
  </main>
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