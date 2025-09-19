<template>
  <div>
    <div class="mb-8 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Design Management</h1>
        <p class="mt-2 text-gray-600">Manage your website design themes</p>
      </div>
      <NuxtLink 
        to="/admin/designs/new"
        class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Create New Design
      </NuxtLink>
    </div>

    <!-- Designs Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="design in designs" 
        :key="design.id"
        class="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
      >
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-lg font-semibold text-gray-900">{{ design.name }}</h3>
          <div class="flex items-center space-x-2">
            <span 
              v-if="design.is_active"
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
            >
              Active
            </span>
            <div class="relative">
              <button 
                @click="toggleDropdown(design.id)"
                class="p-1 rounded-full hover:bg-gray-100"
              >
                <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                </svg>
              </button>
              <div 
                v-if="activeDropdown === design.id"
                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border"
              >
                <div class="py-1">
                  <button 
                    @click="editDesign(design)"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  <button 
                    @click="copyDesign(design)"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Copy Design
                  </button>
                  <button 
                    @click="setActiveDesign(design)"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Set as Active
                  </button>
                  <button 
                    @click="deleteDesign(design.id)"
                    class="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p class="text-gray-600 text-sm mb-4">{{ design.description }}</p>

        <!-- Design Preview -->
        <div class="border rounded-lg p-4 mb-4" :style="getDesignPreviewStyle(design)">
          <div class="text-sm font-medium">Design Preview</div>
          <div class="mt-2 text-xs opacity-75">
            Primary: {{ design.primary_color || '#000000' }}<br>
            Font: {{ design.font_family || 'Default' }}
          </div>
        </div>

        <div class="flex justify-between items-center text-sm text-gray-500">
          <span>Created {{ formatDate(design.created_at) }}</span>
          <span v-if="design.updated_at !== design.created_at">
            Updated {{ formatDate(design.updated_at) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="designs.length === 0" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No designs</h3>
      <p class="mt-1 text-sm text-gray-500">Get started by creating a new design theme.</p>
      <div class="mt-6">
        <NuxtLink 
          to="/admin/designs/new"
          class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Create Design
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

const designs = ref([])
const activeDropdown = ref(null)

onMounted(async () => {
  await fetchDesigns()
  
  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.relative')) {
      activeDropdown.value = null
    }
  })
})

const fetchDesigns = async () => {
  try {
    const response = await $fetch('/api/admin/designs')
    designs.value = response.data || []
  } catch (error) {
    console.error('Error fetching designs:', error)
  }
}

const toggleDropdown = (designId) => {
  activeDropdown.value = activeDropdown.value === designId ? null : designId
}

const editDesign = (design) => {
  navigateTo(`/admin/designs/${design.id}/edit`)
}

const copyDesign = async (design) => {
  try {
    // Create a copy of the design with a new name
    const designCopy = {
      ...design,
      name: `${design.name} (Copy)`,
      description: design.description ? `${design.description} (Copy)` : '',
      is_active: false // New copy is not active by default
    }
    
    // Remove the id so it creates a new record
    delete designCopy.id
    delete designCopy.created_at
    delete designCopy.updated_at
    
    const response = await $fetch('/api/admin/designs', {
      method: 'POST',
      body: designCopy
    })
    
    if (response.success) {
      await fetchDesigns()
      activeDropdown.value = null
      alert('Design copied successfully!')
    }
  } catch (error) {
    console.error('Error copying design:', error)
    alert('Error copying design: ' + (error.message || 'Unknown error'))
  }
}

const setActiveDesign = async (design) => {
  try {
    // First, set all designs to inactive
    await Promise.all(
      designs.value.map(d => 
        $fetch(`/api/admin/designs/${d.id}`, {
          method: 'PUT',
          body: { is_active: false }
        })
      )
    )
    
    // Then set the selected design as active
    await $fetch(`/api/admin/designs/${design.id}`, {
      method: 'PUT',
      body: { is_active: true }
    })
    
    // Update site info to use this design
    await $fetch('/api/admin/site-info', {
      method: 'PUT',
      body: { design_id: design.id }
    })
    
    await fetchDesigns()
    activeDropdown.value = null
  } catch (error) {
    console.error('Error setting active design:', error)
  }
}

const deleteDesign = async (designId) => {
  if (confirm('Are you sure you want to delete this design?')) {
    try {
      await $fetch(`/api/admin/designs/${designId}`, {
        method: 'DELETE'
      })
      await fetchDesigns()
      activeDropdown.value = null
    } catch (error) {
      console.error('Error deleting design:', error)
    }
  }
}

const getDesignPreviewStyle = (design) => {
  return {
    backgroundColor: design.background_color || '#ffffff',
    color: design.text_color || '#000000',
    fontFamily: design.font_family || 'inherit',
    borderColor: design.primary_color || '#000000'
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>
