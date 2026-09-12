<template>
  <div class="flex min-h-dvh flex-col bg-surface font-body text-ink">
    <a
      href="#main-content"
      class="btn btn-primary btn-sm sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]"
    >
      Skip to content
    </a>

    <SiteHeader />

    <main id="main-content" class="flex-1">
      <slot />
    </main>

    <SiteFooter />

    <ChatBox />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

useSiteDesignProvider()

const { load: loadLinks } = useSiteLinks()

onMounted(() => {
  loadLinks()
})
</script>
