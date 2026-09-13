<template>
  <NuxtImg
    v-if="optimisable"
    :src="src"
    :alt="alt"
    :sizes="sizes"
    :loading="priority ? 'eager' : 'lazy'"
    :fetchpriority="priority ? 'high' : undefined"
    :decoding="priority ? 'sync' : 'async'"
    :quality="quality"
    format="webp"
    v-bind="$attrs"
  />
  <img
    v-else
    :src="src"
    :alt="alt"
    :loading="priority ? 'eager' : 'lazy'"
    :fetchpriority="priority ? 'high' : undefined"
    :decoding="priority ? 'sync' : 'async'"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * Responsive, format-optimised image for user-uploaded artwork. Uploads live
 * in Supabase storage as multi-megabyte PNGs; routing them through the image
 * provider (Vercel Image Optimization in production, IPX locally) serves a
 * right-sized WebP instead. Hosts that are not allow-listed in `image.domains`
 * fall back to a plain <img> so nothing ever renders broken.
 */
defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  src: string
  alt?: string
  /**
   * @nuxt/image sizes syntax with explicit breakpoint keys, e.g.
   * "xs:100vw sm:50vw lg:33vw" (= 100vw from xs, 50vw from sm, 33vw from lg).
   * Omit for fixed-size images and pass width/height instead.
   */
  sizes?: string
  /** Above-the-fold image: eager + high fetch priority. */
  priority?: boolean
  quality?: number
}>(), {
  alt: '',
  sizes: undefined,
  priority: false,
  quality: 75
})

const img = useImage()

const optimisable = computed(() => {
  const src = props.src || ''
  if (!src) return false
  if (src.startsWith('data:') || src.startsWith('blob:')) return false
  if (src.startsWith('/')) return true
  try {
    const host = new URL(src).hostname
    return (img.options.domains || []).some((domain) => host === domain || host.endsWith(`.${domain}`))
  } catch {
    return false
  }
})
</script>
