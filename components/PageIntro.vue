<template>
  <section class="relative overflow-hidden border-b border-line bg-hero-glow">
    <div class="page-x flex flex-col gap-6 py-[clamp(2.5rem,6vw,5rem)] lg:flex-row lg:items-end lg:justify-between">
      <div class="max-w-3xl animate-fade-up">
        <p v-if="eyebrow" class="eyebrow mb-4">{{ eyebrow }}</p>
        <h1 class="fluid-h1 font-heading text-ink">
          <slot name="title">{{ title }}</slot>
        </h1>
        <p v-if="description || $slots.description" class="lead mt-4 max-w-2xl">
          <slot name="description">{{ description }}</slot>
        </p>
      </div>
      <div v-if="$slots.default" class="flex shrink-0 flex-wrap items-center gap-3 animate-fade-up [animation-delay:120ms]">
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  eyebrow?: string
  description?: string
}>()
</script>
