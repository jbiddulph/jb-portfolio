<template>
  <main class="prose container mx-auto text-slate-600 mt-4">
    <ContentList path="/blog" v-slot="{ list }">
      <ul class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <li v-for="doc in list" :key="doc._path" class="p-2 blog-card bg-white rounded-2xl overflow-hidden mb-4">
          <NuxtLink :to="doc._path" class="cursor-pointer">
            <div class="h-[200px] relative">
              <img :src="doc.thumbnail" class="h-full w-full object-cover absolute rounded-t-xl" alt="">
            </div>
            <hr class="border-b border-dashed my-2">
            <div class="blog-card--meta">
              <h4 class="text-2xl font-semibold">{{ doc.title }}</h4>
              <p class="pb-2"><i>{{ doc.description }}</i></p>
              <span>{{ doc.date }}</span>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </ContentList>
  </main>
</template>

<script setup lang="ts">
</script>

<style scoped>

</style>
