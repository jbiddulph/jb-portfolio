<template>
  <div class="design-switcher">
    <label for="design-select" class="sr-only">Choose Design Theme</label>
    <select
      id="design-select"
      v-model="selectedDesignId"
      @change="handleDesignChange"
      :disabled="loading"
      class="text-sm bg-white border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <option value="">Default Theme</option>
      <option 
        v-for="design in availableDesigns" 
        :key="design.id" 
        :value="design.id"
      >
        {{ design.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
const { 
  availableDesigns, 
  loading, 
  userDesignId, 
  saveUserDesign, 
  clearUserDesign, 
  fetchAvailableDesigns 
} = useUserDesign()

const selectedDesignId = ref<number | string>('')

// Initialize selected design from user preference
onMounted(async () => {
  await fetchAvailableDesigns()
  selectedDesignId.value = userDesignId.value || ''
})

// Watch for changes in user design preference
watch(userDesignId, (newId) => {
  selectedDesignId.value = newId || ''
})

const handleDesignChange = () => {
  if (selectedDesignId.value === '') {
    clearUserDesign()
    emit('design-changed', null)
  } else {
    saveUserDesign(selectedDesignId.value as number)
    emit('design-changed', selectedDesignId.value)
  }
}

const emit = defineEmits<{
  'design-changed': [designId: number | string]
}>()
</script>

<style scoped>
.design-switcher select {
  min-width: 120px;
}

@media (max-width: 768px) {
  .design-switcher select {
    min-width: 100px;
    font-size: 0.875rem;
  }
}
</style>
