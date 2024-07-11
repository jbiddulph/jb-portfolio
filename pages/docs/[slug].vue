<template>
  <main class="prose container mx-auto text-slate-900 bg-slate-50">
    <ContentDoc class="bg-slate-50" />
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'content'
})
</script>

<style scoped>
.container {
  background: none;
}
</style>