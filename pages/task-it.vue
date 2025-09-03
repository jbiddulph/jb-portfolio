<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
    <!-- Hero Section -->
    <div class="container mx-auto px-6 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Left Column - Content -->
        <div class="text-center lg:text-left">
          <div class="mb-6">
            <NuxtLink 
              href="/" 
              class="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200 mb-8"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Back to Portfolio
            </NuxtLink>
          </div>
          
          <h1 class="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Task<span class="text-blue-600 dark:text-blue-400">IT</span>
          </h1>
          
          <p class="text-2xl text-gray-600 dark:text-gray-300 mb-8 font-light">
            Task Management Made Simple
          </p>
          
          <p class="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
            Organize your projects, track progress, and collaborate with your team effortlessly. 
            Built with AI assistance in just 5 hours, showcasing rapid development capabilities.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 mb-8">
            <a 
              href="https://task-it-9b20e77d6638.herokuapp.com/" 
              target="_blank"
              class="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Try Task-IT Now
              <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
            
            <a 
              href="#features" 
              class="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Learn More
            </a>
          </div>
          
          <!-- Key Stats -->
          <div class="grid grid-cols-3 gap-6 text-center">
            <div>
              <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">5</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Hours to Build</div>
            </div>
            <div>
              <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">AI</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Powered</div>
            </div>
            <div>
              <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">100%</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Free</div>
            </div>
          </div>
        </div>
        
        <!-- Right Column - Visual -->
        <div class="relative">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <div class="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white mb-6">
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                    <path fill-rule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold">TaskIT</h3>
                  <p class="text-blue-100">Task Management Made Simple</p>
                </div>
              </div>
              <p class="text-blue-100 text-sm">
                Organize your projects, track progress, and collaborate with your team effortlessly.
              </p>
            </div>
            
            <!-- Mock Task Cards -->
            <div class="space-y-3">
              <div class="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div class="w-4 h-4 border-2 border-gray-300 rounded mr-3"></div>
                <span class="text-gray-700 dark:text-gray-300">Add push notifications</span>
                <span class="ml-auto text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Medium</span>
              </div>
              
              <div class="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div class="w-4 h-4 border-2 border-gray-300 rounded mr-3"></div>
                <span class="text-gray-700 dark:text-gray-300">Create your first project</span>
                <span class="ml-auto text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Feature</span>
              </div>
              
              <div class="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div class="w-4 h-4 bg-green-500 rounded mr-3 flex items-center justify-center">
                  <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <span class="text-gray-500 line-through">Setup dashboard</span>
                <span class="ml-auto text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Done</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Features Section -->
    <div id="features" class="bg-white dark:bg-gray-800 py-20">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Everything you need to manage your projects and tasks efficiently
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Kanban Boards</h3>
            <p class="text-gray-600 dark:text-gray-300">Organize tasks with drag-and-drop Kanban boards. Move tasks through To Do, In Progress, and Done columns.</p>
          </div>
          
          <!-- Feature 2 -->
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Team Collaboration</h3>
            <p class="text-gray-600 dark:text-gray-300">Assign tasks to team members, add comments, and track progress with real-time updates.</p>
          </div>
          
          <!-- Feature 3 -->
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Analytics & Reports</h3>
            <p class="text-gray-600 dark:text-gray-300">Get insights into your team's productivity with detailed analytics and progress reports.</p>
          </div>
          
          <!-- Feature 4 -->
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Due Date Tracking</h3>
            <p class="text-gray-600 dark:text-gray-300">Never miss a deadline with smart due date tracking and overdue notifications.</p>
          </div>
          
          <!-- Feature 5 -->
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Priority & Tags</h3>
            <p class="text-gray-600 dark:text-gray-300">Organize tasks with priority levels and custom tags for better categorization.</p>
          </div>
          
          <!-- Feature 6 -->
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Smart Search</h3>
            <p class="text-gray-600 dark:text-gray-300">Find tasks quickly with powerful search and filtering capabilities.</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- CTA Section -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-4xl font-bold text-white mb-4">
          Ready to Get Started?
        </h2>
        <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of teams already using Task-IT to manage their projects more efficiently.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="https://task-it-9b20e77d6638.herokuapp.com/" 
            target="_blank"
            class="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Start Using Task-IT
            <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
          
          <a 
            href="/portfolio" 
            class="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold rounded-lg transition-colors duration-200"
          >
            View Portfolio
          </a>
        </div>
        
        <div class="mt-12 text-blue-100">
          <p class="text-sm">
            Built with AI assistance • 5-hour development time • 100% Free to use
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO and meta
useHead({
  title: 'Task-IT | AI-Powered Task Management',
  meta: [
    { name: 'description', content: 'Task-IT is a powerful task management application built with AI assistance in just 5 hours. Organize projects, track progress, and collaborate with your team effortlessly.' },
    { name: 'keywords', content: 'task management, project management, AI-powered, productivity, collaboration, kanban, task tracking' }
  ]
});
</script>

<style scoped>
/* Smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
}
</style>
