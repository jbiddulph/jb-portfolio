<template>
  <main class="prose container mx-auto text-slate-100">
    <ContentList path="/blog" v-slot="{ list }">
      <ul>
        <li v-for="doc in list" :key="doc._path">
          <NuxtLink :to="doc._path">
            <h2>{{ doc.title }}</h2>
            <p>{{ doc.description }}</p>
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