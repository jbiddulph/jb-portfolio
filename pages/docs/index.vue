<template>
  <main class="prose container mx-auto text-slate-100">
    <ContentList path="/docs" v-slot="{ list }">
      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-0">
        <li
          v-for="doc in list"
          :key="doc._path"
          class="bg-slate-800 rounded-xl shadow-md p-6 border border-slate-700 hover:shadow-lg transition-shadow flex flex-col h-full"
        >
          <NuxtLink :to="doc._path" class="no-underline hover:underline flex-1 flex flex-col">
            <h2 class="text-xl font-semibold mb-2">{{ doc.title }}</h2>
            <p class="text-slate-300 mb-0">{{ doc.description }}</p>
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