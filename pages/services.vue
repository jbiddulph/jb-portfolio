<template>
  <div class="mx-auto px-4 sm:px-6 lg:px-8 py-12" :style="{ maxWidth: siteInfo?.design?.container_width || '1200px' }">
    <header class="mb-12 text-center max-w-3xl mx-auto">
      <p
        class="text-sm font-semibold uppercase tracking-[0.2em] mb-3"
        :style="{ color: siteInfo?.design?.primary_color || '#2563eb', fontFamily: getFontFamily(siteInfo?.design, 'primary') }"
      >
        What I Offer
      </p>
      <h1 class="font-bold mb-4" :style="getHeadingStyle(siteInfo?.design, 'h1')">
        Services
      </h1>
      <p class="text-lg leading-relaxed" :style="getBodyStyle(siteInfo?.design)">
        From full stack applications to polished frontends and search-ready experiences — I help businesses design, build, and ship reliable digital products.
      </p>
    </header>

    <div class="grid gap-8 md:grid-cols-3 mb-16">
      <section
        v-for="service in services"
        :key="service.id"
        class="flex flex-col border rounded-2xl p-6 shadow-sm transition-shadow hover:shadow-md"
        :style="{
          ...getBorderStyle(siteInfo?.design),
          borderRadius: siteInfo?.design?.border_radius || '16px',
          backgroundColor: siteInfo?.design?.portfolio_card_background_color || '#ffffff'
        }"
      >
        <div
          class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl"
          :style="{ backgroundColor: `${siteInfo?.design?.primary_color || '#2563eb'}15` }"
        >
          <span class="text-2xl" aria-hidden="true">{{ service.icon }}</span>
        </div>
        <h2 class="font-bold mb-3" :style="getHeadingStyle(siteInfo?.design, 'h3')">
          {{ service.title }}
        </h2>
        <p class="mb-4 leading-relaxed flex-1" :style="getBodyStyle(siteInfo?.design)">
          {{ service.description }}
        </p>
        <ul class="space-y-2">
          <li
            v-for="item in service.highlights"
            :key="item"
            class="flex items-start gap-2 text-sm"
            :style="getBodyStyle(siteInfo?.design)"
          >
            <span
              class="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
              :style="{ backgroundColor: siteInfo?.design?.accent_color || siteInfo?.design?.primary_color || '#2563eb' }"
            />
            {{ item }}
          </li>
        </ul>
      </section>
    </div>

    <section
      id="enquire"
      class="border rounded-2xl overflow-hidden shadow-sm"
      :style="{
        ...getBorderStyle(siteInfo?.design),
        borderRadius: siteInfo?.design?.border_radius || '16px',
        backgroundColor: siteInfo?.design?.portfolio_card_background_color || '#ffffff'
      }"
    >
      <div
        class="px-6 py-8 sm:px-10 border-b"
        :style="{ borderColor: siteInfo?.design?.primary_color || '#e5e7eb' }"
      >
        <h2 class="font-bold mb-2" :style="getHeadingStyle(siteInfo?.design, 'h2')">
          Enquire Online
        </h2>
        <p :style="getMutedStyle(siteInfo?.design)">
          Tell me about your project and I will get back to you as soon as possible.
        </p>
      </div>

      <form class="px-6 py-8 sm:px-10 space-y-6" @submit.prevent="submitEnquiry">
        <div class="hidden" aria-hidden="true">
          <label for="website">Website</label>
          <input id="website" v-model="form.website" type="text" tabindex="-1" autocomplete="off" />
        </div>

        <div class="grid gap-6 sm:grid-cols-2">
          <div>
            <label for="name" class="block text-sm font-semibold mb-2" :style="getBodyStyle(siteInfo?.design)">
              Name <span class="text-red-500">*</span>
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2"
              :style="inputStyle"
              placeholder="Your name"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-semibold mb-2" :style="getBodyStyle(siteInfo?.design)">
              Email <span class="text-red-500">*</span>
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2"
              :style="inputStyle"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div class="grid gap-6 sm:grid-cols-2">
          <div>
            <label for="phone" class="block text-sm font-semibold mb-2" :style="getBodyStyle(siteInfo?.design)">
              Phone
            </label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              class="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2"
              :style="inputStyle"
              placeholder="Optional"
            />
          </div>

          <div>
            <label for="service" class="block text-sm font-semibold mb-2" :style="getBodyStyle(siteInfo?.design)">
              Service of interest
            </label>
            <select
              id="service"
              v-model="form.service"
              class="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2"
              :style="inputStyle"
            >
              <option value="">Select a service</option>
              <option value="full-stack">Full Stack Applications</option>
              <option value="frontend">Frontend Development</option>
              <option value="ui-ux-seo">UI / UX &amp; SEO</option>
              <option value="multiple">Multiple services / Not sure</option>
            </select>
          </div>
        </div>

        <div>
          <label for="message" class="block text-sm font-semibold mb-2" :style="getBodyStyle(siteInfo?.design)">
            Message <span class="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            v-model="form.message"
            required
            rows="5"
            class="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 resize-y"
            :style="inputStyle"
            placeholder="Tell me about your project, timeline, and goals..."
          />
        </div>

        <div v-if="formMessage" class="rounded-lg px-4 py-3 text-sm" :class="formError ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'">
          {{ formMessage }}
        </div>

        <button
          type="submit"
          :disabled="submitting"
          class="inline-flex items-center rounded-lg px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          :style="{
            backgroundColor: siteInfo?.design?.primary_color || '#2563eb',
            color: '#ffffff',
            fontFamily: getFontFamily(siteInfo?.design, 'primary')
          }"
        >
          {{ submitting ? 'Sending...' : 'Send Enquiry' }}
        </button>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Services | John Biddulph',
  meta: [
    {
      name: 'description',
      content: 'Full stack development with Laravel and Python, frontend services with Next.js and Nuxt, plus UI/UX and SEO. Enquire online.'
    }
  ]
})

const siteInfo = ref<any>(null)
const { userDesignId } = useUserDesign()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
  website: ''
})

const submitting = ref(false)
const formMessage = ref('')
const formError = ref(false)

const services = [
  {
    id: 'full-stack',
    icon: '⚙️',
    title: 'Full Stack Applications',
    description: 'End-to-end web applications built for scale, security, and maintainability — from API design through to deployment.',
    highlights: [
      'Laravel & PHP backends',
      'Python application development',
      'Supabase & PostgreSQL databases',
      'REST APIs & third-party integrations',
      'Cloud deployment & DevOps support'
    ]
  },
  {
    id: 'frontend',
    icon: '💻',
    title: 'Frontend Development',
    description: 'Fast, responsive, and accessible user interfaces using modern JavaScript frameworks and component-driven architecture.',
    highlights: [
      'Next.js (React) applications',
      'Nuxt (Vue) applications',
      'TypeScript & modern ES6+',
      'Tailwind CSS & responsive design',
      'Performance optimisation & SSR/SSG'
    ]
  },
  {
    id: 'ui-ux-seo',
    icon: '✨',
    title: 'UI / UX & SEO',
    description: 'User-centred design and search visibility so your product looks great, works intuitively, and reaches the right audience.',
    highlights: [
      'Wireframes & user journey design',
      'UI design & prototyping',
      'Accessibility best practices',
      'On-page SEO & technical SEO',
      'Core Web Vitals & performance tuning'
    ]
  }
]

const inputStyle = computed(() => ({
  borderColor: siteInfo.value?.design?.primary_color || '#d1d5db',
  backgroundColor: siteInfo.value?.design?.background_color || '#ffffff',
  color: siteInfo.value?.design?.text_color || '#1f2937',
  fontFamily: getFontFamily(siteInfo.value?.design, 'primary'),
  '--tw-ring-color': siteInfo.value?.design?.primary_color || '#2563eb'
}))

onMounted(async () => {
  await fetchSiteInfo()
  window.addEventListener('theme-changed', handleThemeChange)
})

onUnmounted(() => {
  window.removeEventListener('theme-changed', handleThemeChange)
})

const handleThemeChange = async () => {
  if (!process.client) return
  await fetchUserDesign()
}

const fetchSiteInfo = async () => {
  try {
    const response: any = await $fetch('/api/site-info')
    siteInfo.value = response.data

    if (process.client && userDesignId.value) {
      await fetchUserDesign()
    }
  } catch (error) {
    console.error('Error fetching site info:', error)
  }
}

const fetchUserDesign = async () => {
  if (!process.client || !userDesignId.value) return

  try {
    const response: any = await $fetch(`/api/designs/${userDesignId.value}`)
    if (response.success && siteInfo.value) {
      siteInfo.value.design = response.data
    }
  } catch (error) {
    console.error('Error fetching user design:', error)
  }
}

const submitEnquiry = async () => {
  submitting.value = true
  formMessage.value = ''
  formError.value = false

  try {
    const response: any = await $fetch('/api/services/enquire', {
      method: 'POST',
      body: { ...form }
    })

    formMessage.value = response.message || 'Thank you for your enquiry.'
    form.name = ''
    form.email = ''
    form.phone = ''
    form.service = ''
    form.message = ''
    form.website = ''
  } catch (error: any) {
    formError.value = true
    formMessage.value = error?.data?.statusMessage || error?.message || 'Failed to send enquiry. Please try again.'
  } finally {
    submitting.value = false
  }
}

const getFontFamily = (design: any, fontType = 'primary') => {
  if (!design) return 'inherit'

  let fontFamily = fontType === 'heading' ? design.heading_font : design.font_family

  if (design.google_fonts) {
    try {
      const googleFonts = JSON.parse(design.google_fonts)
      if (fontType === 'heading' && googleFonts.heading) {
        fontFamily = `"${googleFonts.heading}", ${design.heading_font}`
      } else if (googleFonts.primary) {
        fontFamily = `"${googleFonts.primary}", ${design.font_family}`
      }
    } catch (error) {
      console.error('Error parsing Google Fonts:', error)
    }
  }

  return fontFamily
}

const getHeadingStyle = (design: any, level = 'h1') => {
  const fontSizeMap: Record<string, string> = {
    h1: design?.font_size_h1 || '2.25rem',
    h2: design?.font_size_h2 || '1.75rem',
    h3: design?.font_size_h3 || '1.25rem'
  }

  return {
    color: design?.text_color || '#1f2937',
    fontFamily: getFontFamily(design, 'heading'),
    fontSize: fontSizeMap[level]
  }
}

const getBodyStyle = (design: any) => {
  return {
    color: design?.text_color || '#1f2937',
    fontFamily: getFontFamily(design, 'primary'),
    fontSize: design?.font_size_base || '16px'
  }
}

const getMutedStyle = (design: any) => {
  return {
    color: design?.secondary_color || design?.text_color || '#4b5563',
    fontFamily: getFontFamily(design, 'primary'),
    fontSize: design?.font_size_base || '16px'
  }
}

const getBorderStyle = (design: any) => {
  return {
    borderWidth: design?.border_thickness || '1px',
    borderStyle: design?.border_style || 'solid',
    borderColor: design?.primary_color || '#e5e7eb'
  }
}
</script>
