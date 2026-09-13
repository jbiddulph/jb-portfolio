<template>
  <div>
    <PageIntro eyebrow="Curriculum Vitae 2026" description="Senior Full Stack Developer · Worthing, West Sussex, UK">
      <template #title>John Biddulph</template>
      <a :href="cvPdfPath" download="john-biddulph-cv-2026.pdf" class="btn btn-primary">
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
        </svg>
        Download PDF CV
      </a>
      <a href="tel:07935085736" class="btn btn-outline">07935 085736</a>
    </PageIntro>

    <div class="page-x section grid gap-10 lg:grid-cols-[minmax(17rem,20rem)_minmax(0,1fr)] xl:grid-cols-[minmax(18rem,22rem)_minmax(0,1fr)] xl:gap-16">
      <!-- Sidebar -->
      <aside class="order-2 space-y-6 lg:order-1 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
        <section class="card p-6">
          <h2 class="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.18em] text-ink">Contact</h2>
          <dl class="space-y-3 text-sm">
            <div>
              <dt class="text-xs uppercase tracking-wider text-muted">Location</dt>
              <dd class="text-ink">Worthing, West Sussex, UK</dd>
            </div>
            <div>
              <dt class="text-xs uppercase tracking-wider text-muted">Phone</dt>
              <dd><a href="tel:07935085736" class="font-medium text-brand hover:underline">07935 085736</a></dd>
            </div>
            <div>
              <dt class="text-xs uppercase tracking-wider text-muted">Portfolio</dt>
              <dd>
                <a href="https://www.jbiddulph.com" target="_blank" rel="noopener noreferrer" class="font-medium text-brand hover:underline">
                  www.jbiddulph.com
                </a>
              </dd>
            </div>
            <div>
              <dt class="text-xs uppercase tracking-wider text-muted">Availability</dt>
              <dd class="text-ink">Remote or hybrid · Senior Full Stack, Senior Frontend &amp; Technical Lead roles</dd>
            </div>
          </dl>
        </section>

        <section class="card p-6">
          <h2 class="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.18em] text-ink">Technical skills</h2>
          <div class="space-y-4">
            <div v-for="group in skillGroups" :key="group.title">
              <h3 class="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted">{{ group.title }}</h3>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="skill in group.skills" :key="skill" class="chip">{{ skill }}</span>
              </div>
            </div>
          </div>
        </section>

        <section class="card p-6">
          <h2 class="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.18em] text-ink">Education</h2>
          <p class="text-sm text-ink">Kings Manor High School, West Sussex</p>
        </section>
      </aside>

      <!-- Main -->
      <div class="order-1 min-w-0 space-y-14 lg:order-2">
        <section>
          <p class="eyebrow mb-4">Profile</p>
          <h2 class="fluid-h2 font-heading text-ink">Senior Full Stack Developer</h2>
          <div class="mt-5 max-w-[75ch] space-y-4 text-[1.0625rem] leading-relaxed text-muted">
            <p v-for="paragraph in profile" :key="paragraph">{{ paragraph }}</p>
          </div>
        </section>

        <section>
          <p class="eyebrow mb-4">Experience</p>
          <h2 class="fluid-h2 font-heading text-ink">Professional experience</h2>
          <ol class="mt-8 space-y-8 border-l border-line pl-6 sm:pl-8">
            <li v-for="role in experience" :key="`${role.company}-${role.dates}`" class="relative">
              <span class="absolute -left-[calc(1.5rem+5px)] top-2 h-2.5 w-2.5 rounded-full bg-brand ring-4 ring-surface sm:-left-[calc(2rem+5px)]" aria-hidden="true" />
              <div class="card p-6 sm:p-7">
                <div class="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div>
                    <h3 class="font-heading text-lg font-semibold text-ink">{{ role.company }}</h3>
                    <p class="text-sm font-medium text-brand">{{ role.title }}</p>
                  </div>
                  <p class="shrink-0 text-sm text-muted">{{ role.dates }}</p>
                </div>
                <ul class="mt-4 space-y-2 text-sm leading-relaxed text-ink">
                  <li v-for="item in role.items" :key="item" class="flex gap-3">
                    <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {{ item }}
                  </li>
                </ul>
              </div>
            </li>
          </ol>
        </section>

        <section class="card relative overflow-hidden p-7 sm:p-8">
          <div class="absolute inset-0 bg-hero-glow" aria-hidden="true" />
          <div class="relative">
            <p class="eyebrow mb-4">Contract work</p>
            <h2 class="fluid-h3 font-heading text-ink">Additional contract experience</h2>
            <p class="mt-3 max-w-[70ch] leading-relaxed text-muted">
              Delivered solutions across healthcare, SaaS, eCommerce, and public sector projects using:
            </p>
            <div class="mt-4 flex flex-wrap gap-2">
              <span v-for="item in additionalExperience.skills" :key="item" class="chip">{{ item }}</span>
            </div>
            <p class="mt-5 max-w-[70ch] leading-relaxed text-ink">{{ additionalExperience.summary }}</p>
          </div>
        </section>

        <section>
          <p class="eyebrow mb-4">Highlights</p>
          <h2 class="fluid-h2 font-heading text-ink">Key achievements</h2>
          <ul class="auto-grid mt-8 [--grid-min:16rem]">
            <li v-for="(achievement, index) in achievements" :key="achievement" class="card flex gap-4 p-5">
              <span class="font-heading text-2xl font-bold text-brand-soft [-webkit-text-stroke:1px_var(--color-primary)]" aria-hidden="true">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
              <p class="text-sm leading-relaxed text-ink">{{ achievement }}</p>
            </li>
          </ul>
        </section>

        <div class="flex flex-wrap gap-3 border-t border-line pt-8">
          <a :href="cvPdfPath" download="john-biddulph-cv-2026.pdf" class="btn btn-primary">Download PDF CV</a>
          <NuxtLink to="/portfolio" class="btn btn-outline">See my projects</NuxtLink>
          <NuxtLink to="/services#enquire" class="btn btn-ghost">Get in touch</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'CV 2026 | John Michael Biddulph',
  ogTitle: 'CV 2026 | John Michael Biddulph',
  description: 'View the 2026 CV for John Michael Biddulph, Senior Full Stack Developer based in Worthing, West Sussex.',
  ogDescription: 'View the 2026 CV for John Michael Biddulph, Senior Full Stack Developer based in Worthing, West Sussex.'
})

const cvPdfPath = '/cv/john-biddulph-cv-2026.pdf'

const profile = [
  'Senior Full Stack Developer with 16+ years of commercial experience delivering scalable web applications, SaaS platforms, eCommerce solutions, and data-driven systems. Extensive expertise across JavaScript, TypeScript, Vue.js, Nuxt.js, React, Next.js, Laravel, PHP, Python, Node.js, REST APIs, cloud platforms, and modern DevOps practices.',
  'Proven track record building and maintaining production systems for healthcare, eCommerce, travel, geospatial, and technology organisations. Experienced in leading frontend architecture, developing backend APIs, optimising application performance, and delivering user-focused solutions in agile environments.',
  'Key strengths include full-stack development, API integration, database design, cloud deployment, application modernisation, performance optimisation, and technical problem solving.'
]

const skillGroups = [
  {
    title: 'Frontend',
    skills: ['JavaScript (ES6+)', 'TypeScript', 'Vue.js', 'Nuxt.js', 'React', 'Next.js', 'Angular', 'HTML5', 'CSS3', 'Tailwind CSS']
  },
  {
    title: 'Backend',
    skills: ['PHP', 'Laravel', 'Python', 'Node.js', 'Express', 'REST APIs', 'GraphQL']
  },
  {
    title: 'Databases',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Supabase']
  },
  {
    title: 'Cloud & DevOps',
    skills: ['AWS', 'Docker', 'CI/CD', 'Vercel', 'Netlify', 'Heroku', 'GitHub Actions']
  },
  {
    title: 'Platforms & Tools',
    skills: ['Shopify', 'WordPress', 'Drupal', 'Mapbox', 'Git', 'Agile', 'Jira']
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
</script>
