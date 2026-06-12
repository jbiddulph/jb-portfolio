<template>
  <div class="mx-auto px-4 sm:px-6 lg:px-8 py-12" :style="{ maxWidth: siteInfo?.design?.container_width || '1200px' }">
    <article
      class="overflow-hidden border rounded-2xl shadow-sm"
      :style="{
        ...getBorderStyle(siteInfo?.design),
        borderRadius: siteInfo?.design?.border_radius || '16px',
        backgroundColor: siteInfo?.design?.portfolio_card_background_color || '#ffffff'
      }"
    >
      <header
        class="px-6 py-10 sm:px-10 sm:py-12 border-b"
        :style="{ borderColor: siteInfo?.design?.primary_color || '#e5e7eb' }"
      >
        <p
          class="text-sm font-semibold uppercase tracking-[0.2em] mb-3"
          :style="{ color: siteInfo?.design?.primary_color || '#2563eb', fontFamily: getFontFamily(siteInfo?.design, 'primary') }"
        >
          Curriculum Vitae 2026
        </p>
        <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 class="font-bold mb-3" :style="getHeadingStyle(siteInfo?.design, 'h1')">
              John Michael Biddulph
            </h1>
            <p class="text-xl font-semibold" :style="getBodyStyle(siteInfo?.design)">
              Senior Full Stack Developer
            </p>
          </div>
          <dl class="grid gap-3 text-sm sm:grid-cols-2 lg:text-right">
            <div>
              <dt class="font-semibold" :style="getMutedStyle(siteInfo?.design)">Location</dt>
              <dd :style="getBodyStyle(siteInfo?.design)">Worthing, West Sussex, UK</dd>
            </div>
            <div>
              <dt class="font-semibold" :style="getMutedStyle(siteInfo?.design)">Portfolio</dt>
              <dd>
                <a
                  href="https://www.jbiddulph.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-medium hover:underline"
                  :style="{ color: siteInfo?.design?.primary_color || '#2563eb', fontFamily: getFontFamily(siteInfo?.design, 'primary') }"
                >
                  www.jbiddulph.com
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <div class="mt-8">
          <a
            :href="cvPdfPath"
            download="john-biddulph-cv-2026.pdf"
            class="inline-flex items-center rounded-md px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
            :style="{
              backgroundColor: siteInfo?.design?.primary_color || '#2563eb',
              color: '#ffffff',
              fontFamily: getFontFamily(siteInfo?.design, 'primary')
            }"
          >
            Download PDF CV
          </a>
        </div>
      </header>

      <div class="px-6 py-8 sm:px-10 sm:py-10">
        <section class="mb-10">
          <h2 class="font-bold mb-4" :style="getHeadingStyle(siteInfo?.design, 'h2')">
            Professional Profile
          </h2>
          <div class="space-y-4 leading-relaxed" :style="getBodyStyle(siteInfo?.design)">
            <p v-for="paragraph in profile" :key="paragraph">
              {{ paragraph }}
            </p>
          </div>
        </section>

        <section class="mb-10">
          <h2 class="font-bold mb-4" :style="getHeadingStyle(siteInfo?.design, 'h2')">
            Technical Skills
          </h2>
          <div class="grid gap-4 md:grid-cols-2">
            <div
              v-for="group in skillGroups"
              :key="group.title"
              class="rounded-xl border p-5"
              :style="{
                ...getBorderStyle(siteInfo?.design),
                borderRadius: siteInfo?.design?.border_radius || '12px'
              }"
            >
              <h3 class="font-semibold mb-2" :style="getHeadingStyle(siteInfo?.design, 'h3')">
                {{ group.title }}
              </h3>
              <p class="leading-relaxed" :style="getBodyStyle(siteInfo?.design)">
                {{ group.skills }}
              </p>
            </div>
          </div>
        </section>

        <section class="mb-10">
          <h2 class="font-bold mb-6" :style="getHeadingStyle(siteInfo?.design, 'h2')">
            Professional Experience
          </h2>
          <div class="space-y-8">
            <section
              v-for="role in experience"
              :key="`${role.company}-${role.dates}`"
              class="border-l-4 pl-5"
              :style="{ borderColor: siteInfo?.design?.primary_color || '#2563eb' }"
            >
              <div class="mb-3">
                <h3 class="font-semibold" :style="getHeadingStyle(siteInfo?.design, 'h3')">
                  {{ role.company }} | {{ role.title }}
                </h3>
                <p class="text-sm font-medium" :style="getMutedStyle(siteInfo?.design)">
                  {{ role.dates }}
                </p>
              </div>
              <ul class="list-disc space-y-2 pl-5 leading-relaxed" :style="getBodyStyle(siteInfo?.design)">
                <li v-for="item in role.items" :key="item">
                  {{ item }}
                </li>
              </ul>
            </section>
          </div>
        </section>

        <section class="mb-10">
          <h2 class="font-bold mb-4" :style="getHeadingStyle(siteInfo?.design, 'h2')">
            Additional Contract Experience
          </h2>
          <p class="mb-4 leading-relaxed" :style="getBodyStyle(siteInfo?.design)">
            Delivered solutions across healthcare, SaaS, eCommerce, and public sector projects using:
          </p>
          <div class="flex flex-wrap gap-2 mb-5">
            <span
              v-for="item in additionalExperience.skills"
              :key="item"
              class="inline-flex rounded-full px-3 py-1 text-sm font-medium"
              :style="{ backgroundColor: siteInfo?.design?.accent_color || '#3b82f6', color: '#ffffff' }"
            >
              {{ item }}
            </span>
          </div>
          <p class="leading-relaxed" :style="getBodyStyle(siteInfo?.design)">
            {{ additionalExperience.summary }}
          </p>
        </section>

        <section class="mb-10">
          <h2 class="font-bold mb-4" :style="getHeadingStyle(siteInfo?.design, 'h2')">
            Key Achievements
          </h2>
          <ul class="grid gap-3 md:grid-cols-2" :style="getBodyStyle(siteInfo?.design)">
            <li
              v-for="achievement in achievements"
              :key="achievement"
              class="rounded-xl border p-4 leading-relaxed"
              :style="{
                ...getBorderStyle(siteInfo?.design),
                borderRadius: siteInfo?.design?.border_radius || '12px'
              }"
            >
              {{ achievement }}
            </li>
          </ul>
        </section>

        <div class="grid gap-8 lg:grid-cols-2">
          <section>
            <h2 class="font-bold mb-4" :style="getHeadingStyle(siteInfo?.design, 'h2')">
              Education
            </h2>
            <p :style="getBodyStyle(siteInfo?.design)">Kings Manor High School, West Sussex</p>
          </section>

          <section>
            <h2 class="font-bold mb-4" :style="getHeadingStyle(siteInfo?.design, 'h2')">
              Additional Information
            </h2>
            <ul class="list-disc space-y-2 pl-5 leading-relaxed" :style="getBodyStyle(siteInfo?.design)">
              <li>
                Portfolio:
                <a
                  href="https://www.jbiddulph.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-medium hover:underline"
                  :style="{ color: siteInfo?.design?.primary_color || '#2563eb' }"
                >
                  www.jbiddulph.com
                </a>
              </li>
              <li>UK-based, open to remote or hybrid opportunities.</li>
              <li>Available for Senior Full Stack Developer, Senior Frontend Developer, and Technical Lead positions.</li>
            </ul>
          </section>
        </div>
      </div>
    </article>

    <div class="text-center mt-10">
      <NuxtLink
        to="/"
        class="inline-flex items-center px-6 py-3 text-sm font-medium rounded-md border transition-colors"
        :style="{
          borderColor: siteInfo?.design?.primary_color || '#2563eb',
          color: siteInfo?.design?.primary_color || '#2563eb'
        }"
      >
        Back to Home
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

useSeoMeta({
  title: 'CV 2026 | John Michael Biddulph',
  ogTitle: 'CV 2026 | John Michael Biddulph',
  description: 'View the 2026 CV for John Michael Biddulph, Senior Full Stack Developer based in Worthing, West Sussex.',
  ogDescription: 'View the 2026 CV for John Michael Biddulph, Senior Full Stack Developer based in Worthing, West Sussex.'
})

const siteInfo = ref<any>(null)
const { userDesignId } = useUserDesign()
const cvPdfPath = '/cv/john-biddulph-cv-2026.pdf'

const profile = [
  'Senior Full Stack Developer with 16+ years of commercial experience delivering scalable web applications, SaaS platforms, eCommerce solutions, and data-driven systems. Extensive expertise across JavaScript, TypeScript, Vue.js, Nuxt.js, React, Next.js, Laravel, PHP, Python, Node.js, REST APIs, cloud platforms, and modern DevOps practices.',
  'Proven track record building and maintaining production systems for healthcare, eCommerce, travel, geospatial, and technology organisations. Experienced in leading frontend architecture, developing backend APIs, optimising application performance, and delivering user-focused solutions in agile environments.',
  'Key strengths include full-stack development, API integration, database design, cloud deployment, application modernisation, performance optimisation, and technical problem solving.'
]

const skillGroups = [
  {
    title: 'Frontend',
    skills: 'JavaScript (ES6+), TypeScript, Vue.js, Nuxt.js, React, Next.js, Angular, HTML5, CSS3, Tailwind CSS'
  },
  {
    title: 'Backend',
    skills: 'PHP, Laravel, Python, Node.js, Express, REST APIs, GraphQL'
  },
  {
    title: 'Databases',
    skills: 'MySQL, PostgreSQL, MongoDB, Supabase'
  },
  {
    title: 'Cloud & DevOps',
    skills: 'AWS, Docker, CI/CD, Vercel, Netlify, Heroku, GitHub Actions'
  },
  {
    title: 'Platforms & Tools',
    skills: 'Shopify, WordPress, Drupal, Mapbox, Git, Agile, Jira'
  }
]

const experience = [
  {
    company: 'UrbanTide',
    title: 'Frontend Developer',
    dates: 'Nov 2023 - Mar 2025',
    items: [
      'Developed and maintained multiple enterprise-scale Nuxt.js applications.',
      'Built interactive geospatial data visualisations using Mapbox and amCharts.',
      'Delivered high-performance user interfaces for large urban datasets.',
      'Collaborated with backend teams to integrate APIs and optimise data delivery.',
      'Improved application performance, usability, and maintainability.'
    ]
  },
  {
    company: 'Simba Sleep',
    title: 'Full Stack Developer (Contract)',
    dates: '2022 - 2023',
    items: [
      'Managed and enhanced Shopify stores across multiple international markets.',
      'Implemented custom product filtering, promotions, and bundling functionality.',
      'Delivered frontend and backend improvements to increase customer engagement.',
      'Worked closely with stakeholders to optimise the online purchasing experience.'
    ]
  },
  {
    company: 'beTravelwise',
    title: 'Full Stack Developer (Contract)',
    dates: '2021 - 2022',
    items: [
      'Built a Vue.js-based e-learning platform serving international users.',
      'Designed and developed Laravel APIs and MongoDB data architecture.',
      'Migrated complex Excel-driven business processes into scalable web applications.',
      'Improved data management, reporting, and platform maintainability.'
    ]
  },
  {
    company: 'Bluecrest Health Screening',
    title: 'Frontend Developer',
    dates: 'Aug 2019 - Mar 2020',
    items: [
      'Developed customer-facing booking and appointment management systems.',
      'Created wireframes and improved user journeys and checkout experiences.',
      'Integrated frontend applications with backend healthcare APIs.',
      'Collaborated with cross-functional teams to deliver new functionality.'
    ]
  }
]

const additionalExperience = {
  skills: [
    'Vue.js, Nuxt.js, React, Next.js',
    'Laravel, PHP, Python, Node.js',
    'REST API development and integrations',
    'Shopify and eCommerce platforms',
    'AWS cloud infrastructure',
    'Database design and optimisation',
    'Agile software delivery methodologies'
  ],
  summary: 'Projects included NHS-integrated healthcare systems, marketplace applications, data visualisation platforms, and customer self-service portals.'
}

const achievements = [
  '16+ years of commercial software development experience.',
  'Delivered enterprise applications used by thousands of customers.',
  'Extensive experience building modern SPA and SSR applications.',
  'Strong background in Vue.js, React, Laravel, JavaScript, PHP, and Python.',
  'Proven ability to rapidly onboard and deliver value within contract and permanent environments.',
  'Experienced across the complete software development lifecycle from design through deployment.'
]

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
    h3: design?.font_size_h3 || '1.25rem',
    h4: design?.font_size_h4 || '1rem'
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
