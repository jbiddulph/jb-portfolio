<template>
  <div>
    <PageIntro
      eyebrow="What I offer"
      title="Services"
      description="From full stack applications to polished frontends and search-ready experiences — I help businesses design, build, and ship reliable digital products."
    >
      <a href="#enquire" class="btn btn-primary">Enquire online</a>
      <a href="tel:07935085736" class="btn btn-outline">Call 07935 085736</a>
    </PageIntro>

    <section class="page-x section">
      <div class="auto-grid-fit [--grid-min:20rem]">
        <article
          v-for="(service, index) in services"
          :id="service.id"
          :key="service.id"
          class="card card-hover flex h-full flex-col p-7 animate-fade-up"
          :style="{ animationDelay: `${index * 80}ms` }"
        >
          <div class="mb-5 flex items-center justify-between">
            <span class="inline-flex h-12 w-12 items-center justify-center rounded-theme-sm bg-brand-soft text-2xl" aria-hidden="true">
              {{ service.icon }}
            </span>
            <span class="font-heading text-sm font-semibold text-muted">0{{ index + 1 }}</span>
          </div>
          <h2 class="fluid-h3 font-heading text-ink">{{ service.title }}</h2>
          <p class="mt-3 leading-relaxed text-muted">{{ service.description }}</p>
          <ul class="mt-6 space-y-2.5 border-t border-line pt-6">
            <li v-for="item in service.highlights" :key="item" class="flex items-start gap-3 text-sm text-ink">
              <svg class="mt-0.5 h-4 w-4 shrink-0 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {{ item }}
            </li>
          </ul>
          <a :href="`#enquire`" class="btn btn-ghost btn-sm mt-6 self-start" @click="form.service = service.id">
            Enquire about this
            <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </article>
      </div>
    </section>

    <section id="enquire" class="scroll-mt-header border-t border-line bg-surface-2">
      <div class="page-x section grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] xl:gap-16">
        <div class="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
          <p class="eyebrow mb-4">Enquire online</p>
          <h2 class="fluid-h2 font-heading text-ink">Tell me about your project</h2>
          <p class="mt-4 text-muted">
            Share a few details about what you're building, your timeline and your goals. I'll get back to you as soon as possible.
          </p>
          <dl class="mt-8 space-y-4 text-sm">
            <div class="flex items-start gap-3">
              <span class="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand" aria-hidden="true">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </span>
              <div>
                <dt class="font-semibold text-ink">Phone</dt>
                <dd><a href="tel:07935085736" class="text-muted hover:text-brand">07935 085736</a></dd>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand" aria-hidden="true">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                  <circle cx="12" cy="11" r="3" />
                </svg>
              </span>
              <div>
                <dt class="font-semibold text-ink">Based in</dt>
                <dd class="text-muted">Worthing, West Sussex, UK — remote &amp; hybrid friendly</dd>
              </div>
            </div>
          </dl>
        </div>

        <form class="card p-[clamp(1.5rem,3vw,2.5rem)]" @submit.prevent="submitEnquiry">
          <div class="hidden" aria-hidden="true">
            <label for="website">Website</label>
            <input id="website" v-model="form.website" type="text" tabindex="-1" autocomplete="off" />
          </div>

          <div class="grid gap-5 sm:grid-cols-2">
            <div>
              <label for="name" class="field-label">Name <span class="text-red-500">*</span></label>
              <input id="name" v-model="form.name" type="text" required autocomplete="name" class="field-input" placeholder="Your name" />
            </div>
            <div>
              <label for="email" class="field-label">Email <span class="text-red-500">*</span></label>
              <input id="email" v-model="form.email" type="email" required autocomplete="email" class="field-input" placeholder="you@example.com" />
            </div>
            <div>
              <label for="phone" class="field-label">Phone</label>
              <input id="phone" v-model="form.phone" type="tel" autocomplete="tel" class="field-input" placeholder="Optional" />
            </div>
            <div>
              <label for="service" class="field-label">Service of interest</label>
              <select id="service" v-model="form.service" class="field-input">
                <option value="">Select a service</option>
                <option value="full-stack">Full Stack Applications</option>
                <option value="frontend">Frontend Development</option>
                <option value="ui-ux-seo">UI / UX &amp; SEO</option>
                <option value="multiple">Multiple services / Not sure</option>
              </select>
            </div>
            <div class="sm:col-span-2">
              <label for="message" class="field-label">Message <span class="text-red-500">*</span></label>
              <textarea
                id="message"
                v-model="form.message"
                required
                rows="6"
                class="field-input resize-y"
                placeholder="Tell me about your project, timeline, and goals..."
              />
            </div>
          </div>

          <div
            v-if="formMessage"
            class="mt-5 rounded-theme-sm px-4 py-3 text-sm"
            :class="formError ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'"
            role="status"
          >
            {{ formMessage }}
          </div>

          <div class="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p class="text-xs text-muted">Your details are only used to respond to your enquiry.</p>
            <button type="submit" :disabled="submitting" class="btn btn-primary btn-lg">
              {{ submitting ? 'Sending…' : 'Send enquiry' }}
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

useHead({
  title: 'Services | John Biddulph',
  meta: [
    {
      name: 'description',
      content: 'Full stack development with Laravel and Python, frontend services with Next.js and Nuxt, plus UI/UX and SEO. Enquire online.'
    }
  ]
})

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
</script>
