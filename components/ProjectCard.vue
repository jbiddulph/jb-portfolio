<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
    <div class="p-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
        <NuxtLink 
          :href="project.url" 
          :title="project.title" 
          target="_blank"
          class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
        >
          {{ project.title }}
        </NuxtLink>
        <span v-if="project.date" class="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">({{ project.date }})</span>
      </h3>
      
      <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
        {{ project.description }}
      </p>
      
      <div v-if="project.why" class="mb-4">
        <span class="font-semibold text-gray-900 dark:text-white">Why:</span>
        <span class="text-gray-600 dark:text-gray-300 ml-1">{{ project.why }}</span>
      </div>
      
      <div class="flex items-center justify-between">
        <div v-if="project.technologies" class="flex flex-wrap gap-2">
          <span 
            v-for="tech in project.technologies" 
            :key="tech"
            class="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
          >
            {{ tech }}
          </span>
        </div>
        
        <NuxtLink 
          :href="project.url" 
          target="_blank"
          class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors duration-200"
        >
          Visit Project
          <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Project {
  title: string;
  url: string;
  description: string;
  why?: string;
  technologies?: string[];
  date?: string;
}

defineProps<{
  project: Project;
}>();
</script>