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

    <LazyChatBox v-if="chatReady" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const { load: loadSiteDesign } = useSiteDesignProvider()
const { load: loadLinks } = useSiteLinks()

// The chat widget is not part of the initial content; mount it (and load its
// chunk) once the browser is idle so it does not compete with the first paint.
const chatReady = ref(false)

onMounted(() => {
  const start = () => { chatReady.value = true }
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(start, { timeout: 3000 })
  } else {
    setTimeout(start, 1500)
  }
})

// Resolved during SSR so the first HTML carries the real theme, branding and
// navigation. Each load is time-boxed and falls back to the client on timeout.
await Promise.all([loadSiteDesign(), loadLinks()])
</script>
