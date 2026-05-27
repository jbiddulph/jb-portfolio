<template>
  <div
    class="bg-white shadow rounded-lg p-8 text-center"
    :class="error ? 'border border-red-200' : ''"
  >
    <div v-if="error" class="mx-auto max-w-xl">
      <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
        <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path>
        </svg>
      </div>
      <h2 class="mt-4 text-lg font-medium text-red-900">Unable to load data</h2>
      <p class="mt-2 text-sm text-red-700">{{ error }}</p>
    </div>

    <div v-else class="flex items-center justify-center text-gray-600">
      <div class="h-6 w-6 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
      <span class="ml-3">{{ message }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  message?: string
  error?: string | null
}>(), {
  message: 'Loading admin data...',
  error: null
})
</script>
