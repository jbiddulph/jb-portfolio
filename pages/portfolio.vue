<template>
  <div class="container mx-auto p-6">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-white mb-4">My Portfolio</h1>
      <p class="text-gray-300">A collection of projects I've built using various technologies including Vue.js, Nuxt.js, Next.js, Python, and more.</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="project in projects" 
        :key="project.title"
        class="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-slate-600 transition-colors duration-200"
      >
        <div class="mb-4">
          <h2 class="text-xl font-bold text-white mb-2">
            <NuxtLink 
              :href="project.url" 
              :title="project.title" 
              target="_blank"
              class="hover:text-blue-400 transition-colors duration-200"
            >
              {{ project.title }}
            </NuxtLink>
          </h2>
          <div class="flex flex-wrap gap-2 mb-3">
            <span 
              v-for="tech in project.technologies" 
              :key="tech"
              class="px-2 py-1 bg-slate-700 text-xs rounded-full text-gray-300"
            >
              {{ tech }}
            </span>
          </div>
        </div>
        
        <p class="text-gray-300 text-sm mb-4 line-clamp-4">
          {{ project.description }}
        </p>
        
        <div v-if="project.why" class="border-t border-slate-700 pt-4">
          <p class="text-xs text-gray-400">
            <span class="font-bold">Why:</span> {{ project.why }}
          </p>
        </div>
        
        <div class="mt-4 pt-4 border-t border-slate-700">
          <NuxtLink 
            :href="project.url" 
            target="_blank"
            class="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm transition-colors duration-200"
          >
            Visit Project
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO Meta
useSeoMeta({
  title: 'Portfolio | John Michael Biddulph',
  ogTitle: 'Portfolio | John Michael Biddulph',
  description: 'Portfolio of web applications and projects built by John Biddulph using Vue.js, Nuxt.js, Next.js, Python and modern web technologies.',
  ogDescription: 'Portfolio of web applications and projects built by John Biddulph using Vue.js, Nuxt.js, Next.js, Python and modern web technologies.',
})

// Project data extracted from the homepage
const projects = ref([
  {
    title: "CoastrZ",
    url: "https://www.coastrz.com",
    description: "Discover an extensive collection of premium drinks coasters available at coasters.com. From elegant wooden coasters perfect for your morning coffee to stylish ceramic designs ideal for tea time, our range caters to every taste and décor. Whether you're looking for practical everyday coasters to protect your furniture or seeking personalized designs to add a unique touch to your home, coasters.com offers high-quality options that combine functionality with aesthetic appeal.",
    technologies: ["E-commerce", "Web Design", "Product Catalog"],
    why: null
  },
  {
    title: "TaskFlow",
    url: "https://stunning-brigadeiros-bf279a.netlify.app/",
    description: "A comprehensive task management application similar to Jira, designed for efficient project tracking and team collaboration. Features include project boards, task assignment, status tracking, and workflow management to streamline development processes.",
    technologies: ["Vue.js", "Project Management", "Collaboration"],
    why: "Building a modern, intuitive alternative to traditional project management tools with a focus on developer-friendly workflows and team productivity."
  },
  {
    title: "Worthing Roads",
    url: "https://worthingroads.netlify.app/",
    description: "I built a 2-part quiz to revise for my Worthing District Private Hire License knowledge test.",
    technologies: ["Vue.js", "Quiz App", "Education"],
    why: null
  },
  {
    title: "PRD Generator",
    url: "https://prds.netlify.app/",
    description: "An AI-powered tool that creates comprehensive Product Requirements Documents (PRDs) for web and mobile applications. Simply input your product idea and it generates structured documentation including key features, technical specifications, user flows, and design preferences - providing a clear development roadmap for teams.",
    technologies: ["AI", "Documentation", "Product Planning"],
    why: "Streamlining the product planning process by automating the creation of professional PRDs, helping teams move from concept to development faster with well-structured documentation."
  },
  {
    title: "Go School UK",
    url: "https://www.goschool.uk",
    description: "Latest NextJS current project: Visualising uk schools data on a map. Helping you find the best school for your children in the area you live in.",
    technologies: ["Next.js", "Maps", "Data Visualization", "Education"],
    why: null
  },
  {
    title: "Melvyn Biddulph Art",
    url: "https://melvbiddulph.art",
    description: "Family first, my dad was an artist, a good one but not that well known until his later years.",
    technologies: ["Art Gallery", "Portfolio", "Family Heritage"],
    why: null
  },
  {
    title: "NakedSloth - Rapr",
    url: "https://nakedsloth.co.uk",
    description: "An OpenAI API powered application that allows people to create custom designs and save them.",
    technologies: ["OpenAI API", "Design Tool", "Vue.js"],
    why: "I wanted to build something using the OpenAI API and this is what I came up with, allowing people to create a design too and save it."
  },
  {
    title: "Street Party Creator",
    url: "https://street-party.uk",
    description: "A platform designed to bring neighbours together and make contact easy for organizing community events.",
    technologies: ["Community", "Social Platform", "Vue.js"],
    why: "Just a new idea, it's about bringing neighbours together and so they can make contact easy."
  },
  {
    title: "Pin Spots - Lost and Found",
    url: "https://pinspots.co.uk",
    description: "A helpful platform for lost and found items, designed to connect people who have lost items with those who have found them.",
    technologies: ["Location Services", "Community", "Vue.js"],
    why: "Just another new idea, it's intended to be helpful and because I am always learning and enjoy coding."
  },
  {
    title: "UKPUBS.co.uk",
    url: "https://ukpubs.co.uk",
    description: "A large database of pubs and venues across the UK. This is about version 6 now, it was originally MyPubSpace, PubMic, PubHub, SplendidSussex, BN-Here. It's evolved from PHP, Laravel/Vue, Python/Nuxt, Nuxt/Supabase/Prisma.",
    technologies: ["Database", "Supabase", "Prisma", "Nuxt.js", "Venues"],
    why: null
  },
  {
    title: "StopCharge.co.uk",
    url: "https://stopcharge.co.uk/map",
    description: "Where's the nearest car charging point from my location. Shows all (or most) electric charging points across the UK and by selecting 2 points displays the distance in KM or Miles between them.",
    technologies: ["MapBox", "Supabase", "Prisma", "Nuxt 3", "Electric Vehicles"],
    why: "Another idea and use of MapBox and Supabase with Prisma using Nuxt 3 to show all (or most) electric charging points across the UK and by selecting 2 points to display the distance in KM or Miles between them."
  }
])
</script>

<style scoped>
.container {
  color: #5F9ea0;
}

.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>