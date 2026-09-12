<template>
  <header
    class="sticky top-0 z-40 border-b backdrop-blur-xl transition-shadow duration-300"
    :class="scrolled ? 'shadow-theme-sm border-line' : 'border-transparent'"
    :style="{ backgroundColor: 'var(--header-bg)' }"
  >
    <div class="page-x flex min-h-header items-center justify-between gap-4 py-2">
      <!-- Brand -->
      <NuxtLink to="/" class="group flex min-w-0 items-center gap-3" @click="closeMenu">
        <img
          v-if="siteInfo?.site_avatar"
          :src="siteInfo.site_avatar"
          :alt="siteName"
          class="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-brand-soft transition group-hover:ring-brand"
        />
        <span
          v-else
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-on-brand"
          aria-hidden="true"
        >
          {{ initials }}
        </span>
        <span class="min-w-0">
          <span class="block truncate font-heading font-bold leading-tight text-ink text-[length:var(--fs-site-name-mobile)] md:text-[length:var(--fs-site-name)]">
            {{ siteName }}
          </span>
          <span
            v-if="siteInfo?.site_slogan"
            class="hidden truncate leading-tight text-muted sm:block text-[length:var(--fs-site-tagline-mobile)] md:text-[length:var(--fs-site-tagline)]"
          >
            {{ siteInfo.site_slogan }}
          </span>
        </span>
      </NuxtLink>

      <!-- Desktop navigation -->
      <nav class="hidden items-center gap-1 lg:flex" aria-label="Primary">
        <NuxtLink v-for="link in primaryLinks" :key="link.to" :to="link.to" class="nav-link">
          {{ link.label }}
        </NuxtLink>
        <a
          v-for="link in externalLinks"
          :key="link.href"
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          class="nav-link hidden xl:inline-flex"
        >
          {{ link.label }}
          <svg class="h-3 w-3 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M7 7h10v10" />
          </svg>
        </a>
      </nav>

      <!-- Desktop actions -->
      <div class="hidden items-center gap-2 lg:flex">
        <a :href="`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`" class="btn btn-outline btn-sm hidden xl:inline-flex">
          <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {{ PHONE_NUMBER }}
        </a>
        <template v-if="user">
          <NuxtLink to="/admin" class="btn btn-primary btn-sm">Dashboard</NuxtLink>
          <button type="button" class="btn btn-ghost btn-sm" @click="signOut">Logout</button>
        </template>
        <NuxtLink v-else to="/services#enquire" class="btn btn-primary btn-sm">
          Start a project
        </NuxtLink>
      </div>

      <!-- Mobile toggle -->
      <button
        type="button"
        class="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition hover:bg-brand-soft lg:hidden"
        :aria-expanded="menuOpen"
        aria-controls="mobile-navigation"
        aria-label="Toggle menu"
        @click="menuOpen = !menuOpen"
      >
        <svg v-if="!menuOpen" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 7h16M4 12h16M4 17h16" />
        </svg>
        <svg v-else class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile navigation -->
    <Transition
      enter-active-class="transition duration-300 ease-out-expo"
      enter-from-class="-translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-2 opacity-0"
    >
      <div
        v-if="menuOpen"
        id="mobile-navigation"
        class="page-x max-h-[calc(100dvh-var(--header-h))] overflow-y-auto border-t border-line pb-6 pt-4 lg:hidden"
      >
        <nav class="grid gap-1" aria-label="Mobile">
          <NuxtLink
            v-for="link in primaryLinks"
            :key="link.to"
            :to="link.to"
            class="nav-link justify-between rounded-theme-sm px-4 py-3 text-base"
            @click="closeMenu"
          >
            {{ link.label }}
            <svg class="h-4 w-4 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </nav>

        <div v-if="externalLinks.length" class="mt-5">
          <p class="eyebrow mb-2 text-[0.6875rem]">Elsewhere</p>
          <div class="flex flex-wrap gap-2">
            <a
              v-for="link in externalLinks"
              :key="link.href"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-outline btn-sm"
            >
              {{ link.label }}
            </a>
          </div>
        </div>

        <div class="mt-5 flex flex-wrap gap-2">
          <a :href="`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`" class="btn btn-outline btn-sm">
            Call {{ PHONE_NUMBER }}
          </a>
          <template v-if="user">
            <NuxtLink to="/admin" class="btn btn-primary btn-sm" @click="closeMenu">Dashboard</NuxtLink>
            <button type="button" class="btn btn-ghost btn-sm" @click="signOut">Logout</button>
          </template>
          <NuxtLink v-else to="/services#enquire" class="btn btn-primary btn-sm" @click="closeMenu">
            Start a project
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const PHONE_NUMBER = '07935 085736'

const { siteInfo, siteName } = useSiteDesign()
const { navLinks } = useSiteLinks()
const route = useRoute()

const menuOpen = ref(false)
const scrolled = ref(false)
const user = ref<any>(null)

const primaryLinks = [
  { label: 'Projects', to: '/portfolio' },
  { label: 'Services', to: '/services' },
  { label: 'CV', to: '/cv' }
]

const externalLinks = computed(() => [
  { label: 'Old Skool Vibe Dev', href: 'https://www.oldskoolvibe.dev/' },
  ...navLinks.value.map((link) => ({ label: link.link_name, href: link.link_url }))
])

const initials = computed(() =>
  siteName.value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'JB'
)

const closeMenu = () => {
  menuOpen.value = false
}

watch(() => route.fullPath, closeMenu)

watch(menuOpen, (open) => {
  if (!process.client) return
  document.documentElement.classList.toggle('overflow-hidden', open && window.innerWidth < 1024)
})

const getSupabaseClient = () => {
  if (!process.client) return null
  try {
    return useSupabaseClient()
  } catch (error) {
    console.warn('Failed to initialize Supabase client:', error)
    return null
  }
}

const fetchUser = async () => {
  const client = getSupabaseClient()
  if (!client) return
  try {
    const { data: { session } } = await client.auth.getSession()
    if (!session) {
      user.value = null
      return
    }
    const { data: { user: authenticatedUser }, error } = await client.auth.getUser()
    user.value = !error && authenticatedUser ? authenticatedUser : null
  } catch (error) {
    console.error('Error fetching user:', error)
    user.value = null
  }
}

const signOut = async () => {
  const client = getSupabaseClient()
  if (!client) return
  await client.auth.signOut()
  user.value = null
  closeMenu()
  await navigateTo('/login')
}

const onScroll = () => {
  scrolled.value = window.scrollY > 8
}

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') closeMenu()
}

onMounted(() => {
  fetchUser()
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  if (process.client) document.documentElement.classList.remove('overflow-hidden')
})
</script>
