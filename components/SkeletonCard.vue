<template>
  <div class="card animate-pulse overflow-hidden" aria-hidden="true">
    <div v-if="media" class="aspect-[4/3] w-full bg-surface-3" />
    <div class="space-y-3 p-5">
      <div class="h-4 w-2/3 rounded bg-surface-3" />
      <div class="h-3 w-full rounded bg-surface-3" />
      <div class="h-3 w-5/6 rounded bg-surface-3" />
      <div class="flex gap-2 pt-1">
        <div class="h-5 w-14 rounded-full bg-surface-3" />
        <div class="h-5 w-16 rounded-full bg-surface-3" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ media?: boolean }>(), { media: true })
</script>
