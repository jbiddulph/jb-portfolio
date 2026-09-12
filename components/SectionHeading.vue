<template>
  <div class="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
    <div class="max-w-3xl">
      <p v-if="eyebrow" class="eyebrow mb-3">{{ eyebrow }}</p>
      <component :is="tag" class="fluid-h2 font-heading text-ink">
        {{ title }}
      </component>
      <p v-if="description" class="mt-3 text-base leading-relaxed text-muted">
        {{ description }}
      </p>
    </div>
    <div v-if="$slots.default" class="flex shrink-0 flex-wrap items-center gap-2">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  eyebrow?: string
  description?: string
  tag?: 'h1' | 'h2' | 'h3'
}>(), {
  tag: 'h2'
})
</script>
