<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
    <div class="container mx-auto px-6 lg:px-8">
      <!-- Header Section -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          My Portfolio
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          A collection of projects showcasing my journey in web development, from AI-powered applications 
          to comprehensive management tools and innovative web solutions.
        </p>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProjectCard 
          v-for="project in projects" 
          :key="project.title"
          :project="project"
        />
      </div>

      <!-- Call to Action -->
      <div class="text-center mt-16">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Interested in Working Together?
        </h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          I'm always excited to collaborate on new projects and innovative ideas.
        </p>
        <NuxtLink 
          href="/contact" 
          class="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
        >
          Get In Touch
          <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO and meta
useHead({
  title: 'Portfolio | Jbiddulph',
  meta: [
    { name: 'description', content: 'Explore my portfolio of web development projects including AI-powered applications, management tools, and innovative web solutions.' },
    { name: 'keywords', content: 'portfolio, web development, Nuxt.js, Vue.js, JavaScript, TypeScript, projects' }
  ]
});

// Project data extracted and enhanced from the original index.vue
const projects = [
  {
    title: 'Task-IT',
    url: 'https://task-it-9b20e77d6638.herokuapp.com/',
    description: 'A custom AI-built task management application similar to Jira, showcasing rapid development capabilities. Built and deployed using AI assistance in just 5 hours, demonstrating the power of AI in accelerating development workflows.',
    why: 'Built to demonstrate the efficiency of AI-assisted development and showcase rapid prototyping capabilities for production-ready applications.',
    technologies: ['AI-Powered Development', 'Task Management', 'Rapid Prototyping', 'Jira Alternative']
  },
  {
    title: 'CoastrZ',
    url: 'https://www.coastrz.com',
    description: 'Discover an extensive collection of premium drinks coasters. From elegant wooden coasters perfect for your morning coffee to stylish ceramic designs ideal for tea time. Features custom coaster service for personalized designs and branded items.',
    technologies: ['E-commerce', 'Custom Design', 'Web Platform']
  },
  {
    title: 'TaskFlow',
    url: 'https://stunning-brigadeiros-bf279a.netlify.app/',
    description: 'A comprehensive task management application similar to Jira, designed for efficient project tracking and team collaboration. Features include project boards, task assignment, status tracking, and workflow management.',
    why: 'Building a modern, intuitive alternative to traditional project management tools with a focus on developer-friendly workflows and team productivity.',
    technologies: ['Vue.js', 'Project Management', 'Collaboration Tools']
  },
  {
    title: 'Worthing Roads',
    url: 'https://worthingroads.netlify.app/',
    description: 'A 2-part interactive quiz application designed to help with revision for the Worthing District Private Hire License knowledge test. Features comprehensive questions and progress tracking.',
    technologies: ['Vue.js', 'Quiz App', 'Educational Tool']
  },
  {
    title: 'PRD Generator',
    url: 'https://prds.netlify.app/',
    description: 'An AI-powered tool that creates comprehensive Product Requirements Documents (PRDs) for web and mobile applications. Input your product idea and generate structured documentation including features, specifications, and user flows.',
    why: 'Streamlining the product planning process by automating the creation of professional PRDs, helping teams move from concept to development faster.',
    technologies: ['AI/ML', 'Documentation', 'Product Planning', 'Automation']
  },
  {
    title: 'Go School UK',
    url: 'https://www.goschool.uk',
    description: 'A Next.js application for visualizing UK schools data on an interactive map. Helps parents find the best schools for their children in their local area with comprehensive filtering and search capabilities.',
    technologies: ['Next.js', 'Maps', 'Data Visualization', 'Education']
  },
  {
    title: 'Melvyn Biddulph Art',
    url: 'https://melvbiddulph.art',
    description: 'A tribute website showcasing the artistic works of Melvyn Biddulph, an artist who gained recognition in his later years. Features a gallery of his paintings and artistic journey.',
    technologies: ['Art Gallery', 'Portfolio', 'Tribute Site']
  },
  {
    title: 'NakedSloth - Rapr',
    url: 'https://nakedsloth.co.uk',
    description: 'An innovative application built using the OpenAI API that allows users to create custom designs and save them. Features AI-powered design generation and user creativity tools.',
    why: 'Wanted to build something using the OpenAI API and create a platform for design creation and saving.',
    technologies: ['OpenAI API', 'AI Design', 'Creative Tools']
  },
  {
    title: 'Street Party Creator',
    url: 'https://street-party.uk',
    description: 'A community-focused platform designed to bring neighbors together by making it easy for them to organize street parties and local events. Facilitates easy contact and event coordination.',
    why: 'Bringing neighbours together and making community contact easy.',
    technologies: ['Community Platform', 'Event Management', 'Social Networking']
  },
  {
    title: 'Pin Spots - Lost and Found',
    url: 'https://pinspots.co.uk',
    description: 'A helpful platform for lost and found items, allowing users to report and search for missing belongings in their local area. Features location-based search and community assistance.',
    why: 'Created to be helpful for the community and as a continuous learning project.',
    technologies: ['Location Services', 'Community Help', 'Search Platform']
  },
  {
    title: 'UKPUBS.co.uk',
    url: 'https://ukpubs.co.uk',
    description: 'A comprehensive database of pubs and venues across the UK. This is version 6 of the platform, evolved through multiple iterations and technologies. Features venue discovery, events, and location-based search.',
    why: 'A large database of pubs and venues across the UK. Evolved from PHP, Laravel/Vue, Python/Nuxt, to current Nuxt/Supabase/Prisma stack.',
    technologies: ['Nuxt.js', 'Supabase', 'Prisma', 'Database', 'Location Services']
  },
  {
    title: 'StopCharge.co.uk',
    url: 'https://stopcharge.co.uk/map',
    description: 'Find the nearest car charging points from your location. Features an interactive map showing electric charging points across the UK with distance calculations between selected points.',
    why: 'Using MapBox and Supabase with Prisma and Nuxt 3 to show electric charging points across the UK with distance calculations.',
    technologies: ['Nuxt 3', 'MapBox', 'Supabase', 'Prisma', 'Geolocation']
  }
];
</script>

<style scoped>
/* Additional custom styles if needed */
</style>