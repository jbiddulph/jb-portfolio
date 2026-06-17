<template>
  <div>
    <div class="mb-8 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Services Enquiries</h1>
        <p class="mt-2 text-gray-600">View enquiries submitted from the public services page</p>
      </div>
      <NuxtLink
        to="/services"
        target="_blank"
        class="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
      >
        View public page →
      </NuxtLink>
    </div>

    <AdminPageState v-if="pageLoading" message="Loading enquiries..." />
    <AdminPageState v-else-if="pageError" :error="pageError" />

    <div v-else class="bg-white shadow overflow-hidden sm:rounded-md">
      <div v-if="enquiries.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No enquiries yet</h3>
        <p class="mt-1 text-sm text-gray-500">Submissions from the services form will appear here.</p>
      </div>

      <ul v-else class="divide-y divide-gray-200">
        <li v-for="enquiry in enquiries" :key="enquiry.id" class="px-6 py-5">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-center gap-3">
                <h3 class="text-lg font-medium text-gray-900">{{ enquiry.name }}</h3>
                <span
                  v-if="enquiry.service"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                >
                  {{ formatService(enquiry.service) }}
                </span>
              </div>
              <div class="mt-1 flex flex-wrap gap-4 text-sm text-gray-500">
                <a :href="`mailto:${enquiry.email}`" class="text-indigo-600 hover:text-indigo-500">
                  {{ enquiry.email }}
                </a>
                <span v-if="enquiry.phone">{{ enquiry.phone }}</span>
                <span>{{ formatDate(enquiry.created_at) }}</span>
              </div>
              <p class="mt-3 text-sm text-gray-700 whitespace-pre-wrap break-words">{{ enquiry.message }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

const { fetchAdminData } = useAdminFetch()
const enquiries = ref([])
const pageLoading = ref(true)
const pageError = ref(null)

const serviceLabels = {
  'full-stack': 'Full Stack Applications',
  frontend: 'Frontend Development',
  'ui-ux-seo': 'UI / UX & SEO',
  multiple: 'Multiple services / Not sure'
}

onMounted(async () => {
  pageLoading.value = true
  pageError.value = null

  try {
    const response = await fetchAdminData('/api/admin/enquiries')
    enquiries.value = response.data || []
  } catch (error) {
    console.error('Error fetching enquiries:', error)
    pageError.value = 'Failed to load enquiries. Please refresh and try again.'
  } finally {
    pageLoading.value = false
  }
})

const formatService = (service) => serviceLabels[service] || service

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
