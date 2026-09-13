<template>
  <footer class="mt-auto border-t border-line bg-surface-2">
    <div class="page-x section-tight grid gap-10 md:grid-cols-2 xl:grid-cols-[1.6fr_1fr_1fr_1fr]">
      <div class="max-w-md">
        <NuxtLink to="/" class="inline-flex items-center gap-3">
          <SmartImage
            v-if="siteInfo?.site_avatar"
            :src="siteInfo.site_avatar"
            :alt="siteName"
            width="40"
            height="40"
            class="h-10 w-10 rounded-full object-cover"
          />
          <span class="font-heading text-lg font-bold text-ink">{{ siteName }}</span>
        </NuxtLink>
        <p v-if="siteInfo?.site_slogan" class="mt-3 text-sm leading-relaxed text-muted">
          {{ siteInfo.site_slogan }}
        </p>
        <div class="mt-5 flex flex-wrap gap-2">
          <NuxtLink to="/services#enquire" class="btn btn-primary btn-sm">Start a project</NuxtLink>
          <a href="/cv/john-biddulph-cv-2026.pdf" download class="btn btn-outline btn-sm">Download CV</a>
        </div>
      </div>

      <FooterColumn title="Explore">
        <li v-for="link in exploreLinks" :key="link.to">
          <NuxtLink :to="link.to" class="footer-link">{{ link.label }}</NuxtLink>
        </li>
      </FooterColumn>

      <FooterColumn title="Elsewhere">
        <li v-for="link in externalLinks" :key="link.href">
          <a :href="link.href" target="_blank" rel="noopener noreferrer" class="footer-link">
            {{ link.label }}
            <span aria-hidden="true" class="opacity-50">↗</span>
          </a>
        </li>
      </FooterColumn>

      <FooterColumn title="Contact">
        <li>
          <a href="tel:07935085736" class="footer-link">07935 085736</a>
        </li>
        <li>
          <NuxtLink to="/services#enquire" class="footer-link">Enquire online</NuxtLink>
        </li>
        <li>
          <a href="/john-biddulph-recent-projects-2026.pdf" download class="footer-link">Recent projects (PDF)</a>
        </li>
      </FooterColumn>
    </div>

    <div class="page-x flex flex-col items-center justify-between gap-4 border-t border-line py-5 text-sm text-muted sm:flex-row">
      <p class="text-center sm:text-left">
        {{ siteInfo?.site_footer || `© ${new Date().getFullYear()} John Biddulph. All rights reserved.` }}
      </p>
      <div class="flex items-center gap-2">
        <span class="text-xs uppercase tracking-wider">Theme</span>
        <DesignSwitcher />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed, defineComponent, h } from 'vue'

const { siteInfo, siteName } = useSiteDesign()
const { navLinks } = useSiteLinks()

const exploreLinks = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/portfolio' },
  { label: 'Services', to: '/services' },
  { label: 'CV', to: '/cv' },
  { label: 'Docs', to: '/docs' },
  { label: 'Blog', to: '/blog' }
]

const externalLinks = computed(() => [
  { label: 'Old Skool Vibe Dev', href: 'https://www.oldskoolvibe.dev/' },
  ...navLinks.value.map((link) => ({ label: link.link_name, href: link.link_url }))
])

const FooterColumn = defineComponent({
  props: { title: { type: String, required: true } },
  setup(props, { slots }) {
    return () => h('div', [
      h('h3', { class: 'mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink' }, props.title),
      h('ul', { class: 'space-y-2.5' }, slots.default?.())
    ])
  }
})
</script>

<style scoped>
.footer-link {
  @apply inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-brand;
}
</style>
