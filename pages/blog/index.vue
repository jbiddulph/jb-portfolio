<template>
  <main class="prose container mx-auto text-slate-100">
    <ContentList path="/blog" v-slot="{ list }">
      <ul>
        <li v-for="doc in list" :key="doc._path" class="p-2">
          <NuxtLink :to="doc._path" class="cursor-pointer">
            <h4 class="font-bold">{{ doc.title }}</h4>
            <p class="pb-2"><i>{{ doc.description }}</i></p>
            <hr class="border-b border-dashed">
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