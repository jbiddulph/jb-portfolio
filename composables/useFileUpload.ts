export const useFileUpload = () => {
  const uploading = ref(false)
  const uploadError = ref('')

  const uploadFile = async (file: File, folder: 'portfolio' | 'site' | 'avatar') => {
    uploading.value = true
    uploadError.value = ''

    try {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
      if (!validTypes.includes(file.type)) {
        throw new Error('Invalid file type. Please upload an image file.')
      }

      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (file.size > maxSize) {
        throw new Error('File size too large. Please upload a file smaller than 5MB.')
      }

      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)

      const response = await $fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      })

      if (response.success) {
        return response.data
      } else {
        throw new Error('Upload failed')
      }
    } catch (error: any) {
      uploadError.value = error.message || 'Upload failed'
      throw error
    } finally {
      uploading.value = false
    }
  }

  const uploadPortfolioImage = (file: File) => uploadFile(file, 'portfolio')
  const uploadSiteImage = (file: File) => uploadFile(file, 'site')
  const uploadAvatar = (file: File) => uploadFile(file, 'avatar')

  return {
    uploading: readonly(uploading),
    uploadError: readonly(uploadError),
    uploadFile,
    uploadPortfolioImage,
    uploadSiteImage,
    uploadAvatar
  }
}
