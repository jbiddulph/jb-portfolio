export const useUserDesign = () => {
  const userDesignId = ref<number | null>(null)
  const availableDesigns = ref([])
  const loading = ref(false)
  const defaultDesignId = 3

  // Load user's saved design preference from cookie
  const loadUserDesign = () => {
    if (process.client) {
      const saved = useCookie('user-design-id', { 
        default: () => defaultDesignId,
        maxAge: 60 * 60 * 24 * 365 // 1 year
      })
      userDesignId.value = parseInt(saved.value.toString())
    }
  }

  // Save user's design preference to cookie
  const saveUserDesign = (designId: number) => {
    if (process.client) {
      const cookie = useCookie('user-design-id', {
        default: () => defaultDesignId,
        maxAge: 60 * 60 * 24 * 365 // 1 year
      })
      cookie.value = designId.toString()
      userDesignId.value = designId
      // Emit event to trigger theme cleanup and reload
      window.dispatchEvent(new CustomEvent('theme-changed', { detail: { designId } }))
    }
  }

  // Clear user's design preference (reset to default)
  const clearUserDesign = () => {
    if (process.client) {
      const cookie = useCookie('user-design-id', {
        default: () => defaultDesignId,
        maxAge: 60 * 60 * 24 * 365 // 1 year
      })
      cookie.value = defaultDesignId.toString()
      userDesignId.value = defaultDesignId
      // Emit event to trigger theme cleanup and reload
      window.dispatchEvent(new CustomEvent('theme-changed', { detail: { designId: defaultDesignId } }))
    }
  }

  // Fetch available designs
  const fetchAvailableDesigns = async () => {
    loading.value = true
    try {
      const response = await $fetch('/api/designs')
      if (response.success) {
        availableDesigns.value = response.data
      }
    } catch (error) {
      console.error('Error fetching designs:', error)
    } finally {
      loading.value = false
    }
  }

  // Get the effective design ID (user preference or default)
  const getEffectiveDesignId = (adminDesignId: number | null) => {
    return userDesignId.value || defaultDesignId
  }

  // Initialize on client side
  if (process.client) {
    loadUserDesign()
  }

  return {
    userDesignId: readonly(userDesignId),
    availableDesigns: readonly(availableDesigns),
    loading: readonly(loading),
    loadUserDesign,
    saveUserDesign,
    clearUserDesign,
    fetchAvailableDesigns,
    getEffectiveDesignId
  }
}
