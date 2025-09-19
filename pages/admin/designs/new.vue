<template>
  <div>
    <div class="mb-8">
      <NuxtLink to="/admin/designs" class="text-indigo-600 hover:text-indigo-500 mb-4 inline-block">
        ← Back to Designs
      </NuxtLink>
      <h1 class="text-3xl font-bold text-gray-900">Create New Design</h1>
      <p class="mt-2 text-gray-600">Create a new design theme for your website</p>
    </div>

    <form @submit.prevent="createDesign" class="space-y-8">
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Design Name</label>
            <input
              v-model="form.name"
              type="text"
              id="name"
              required
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <input
              v-model="form.description"
              type="text"
              id="description"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Color Scheme</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label for="primary_color" class="block text-sm font-medium text-gray-700">Primary Color</label>
            <input
              v-model="form.primary_color"
              type="color"
              id="primary_color"
              class="mt-1 block w-full h-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label for="secondary_color" class="block text-sm font-medium text-gray-700">Secondary Color</label>
            <input
              v-model="form.secondary_color"
              type="color"
              id="secondary_color"
              class="mt-1 block w-full h-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label for="accent_color" class="block text-sm font-medium text-gray-700">Accent Color</label>
            <input
              v-model="form.accent_color"
              type="color"
              id="accent_color"
              class="mt-1 block w-full h-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label for="background_color" class="block text-sm font-medium text-gray-700">Background Color</label>
            <input
              v-model="form.background_color"
              type="color"
              id="background_color"
              class="mt-1 block w-full h-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label for="text_color" class="block text-sm font-medium text-gray-700">Text Color</label>
            <input
              v-model="form.text_color"
              type="color"
              id="text_color"
              class="mt-1 block w-full h-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Typography</h2>
        
        <!-- Google Fonts Selection -->
        <div class="mb-6">
          <label for="google_fonts" class="block text-sm font-medium text-gray-700 mb-2">Google Fonts</label>
          <div class="space-y-3">
            <div class="flex items-center space-x-2">
              <input
                v-model="selectedFonts"
                type="checkbox"
                id="enable_google_fonts"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label for="enable_google_fonts" class="text-sm text-gray-700">
                Enable Google Fonts
              </label>
            </div>
            
            <div v-if="selectedFonts" class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Primary Font</label>
                <select
                  v-model="googleFonts.primary"
                  class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  @change="updateFontFamily"
                >
                  <option value="">Select a font</option>
                  <option v-for="font in availableFonts" :key="font.family" :value="font.family">
                    {{ font.family }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Heading Font</label>
                <select
                  v-model="googleFonts.heading"
                  class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  @change="updateFontFamily"
                >
                  <option value="">Same as Primary</option>
                  <option v-for="font in availableFonts" :key="font.family" :value="font.family">
                    {{ font.family }}
                  </option>
                </select>
              </div>
            </div>
            
            <!-- Font Preview -->
            <div v-if="selectedFonts && googleFonts.primary" class="mt-4 p-4 border rounded-lg bg-gray-50">
              <h4 class="text-sm font-medium text-gray-700 mb-2">Font Preview</h4>
              <div 
                class="text-lg"
                :style="{ fontFamily: getGoogleFontCSS(googleFonts.primary) }"
              >
                The quick brown fox jumps over the lazy dog
              </div>
              <div 
                class="text-sm text-gray-600 mt-2"
                :style="{ fontFamily: getGoogleFontCSS(googleFonts.heading || googleFonts.primary) }"
              >
                Heading Font Preview
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label for="font_family" class="block text-sm font-medium text-gray-700">Fallback Font Family</label>
            <select
              v-model="form.font_family"
              id="font_family"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Inter, sans-serif">Inter</option>
              <option value="Roboto, sans-serif">Roboto</option>
              <option value="Open Sans, sans-serif">Open Sans</option>
              <option value="Lato, sans-serif">Lato</option>
              <option value="Montserrat, sans-serif">Montserrat</option>
              <option value="Poppins, sans-serif">Poppins</option>
              <option value="Source Sans Pro, sans-serif">Source Sans Pro</option>
              <option value="system-ui, sans-serif">System UI</option>
              <option value="serif">Serif</option>
              <option value="monospace">Monospace</option>
            </select>
          </div>
          <div>
            <label for="heading_font" class="block text-sm font-medium text-gray-700">Fallback Heading Font</label>
            <select
              v-model="form.heading_font"
              id="heading_font"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Inter, sans-serif">Inter</option>
              <option value="Roboto, sans-serif">Roboto</option>
              <option value="Open Sans, sans-serif">Open Sans</option>
              <option value="Lato, sans-serif">Lato</option>
              <option value="Montserrat, sans-serif">Montserrat</option>
              <option value="Poppins, sans-serif">Poppins</option>
              <option value="Source Sans Pro, sans-serif">Source Sans Pro</option>
              <option value="system-ui, sans-serif">System UI</option>
              <option value="serif">Serif</option>
              <option value="monospace">Monospace</option>
            </select>
          </div>
          <div>
            <label for="body_font" class="block text-sm font-medium text-gray-700">Fallback Body Font</label>
            <select
              v-model="form.body_font"
              id="body_font"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Inter, sans-serif">Inter</option>
              <option value="Roboto, sans-serif">Roboto</option>
              <option value="Open Sans, sans-serif">Open Sans</option>
              <option value="Lato, sans-serif">Lato</option>
              <option value="Montserrat, sans-serif">Montserrat</option>
              <option value="Poppins, sans-serif">Poppins</option>
              <option value="Source Sans Pro, sans-serif">Source Sans Pro</option>
              <option value="system-ui, sans-serif">System UI</option>
              <option value="serif">Serif</option>
              <option value="monospace">Monospace</option>
            </select>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label for="font_size_base" class="block text-sm font-medium text-gray-700">Base Font Size</label>
            <input
              v-model="form.font_size_base"
              type="text"
              id="font_size_base"
              placeholder="16px"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label for="font_size_h1" class="block text-sm font-medium text-gray-700">H1 Size</label>
            <input
              v-model="form.font_size_h1"
              type="text"
              id="font_size_h1"
              placeholder="2.5rem"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label for="font_size_h2" class="block text-sm font-medium text-gray-700">H2 Size</label>
            <input
              v-model="form.font_size_h2"
              type="text"
              id="font_size_h2"
              placeholder="2rem"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Layout & Spacing</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label for="container_width" class="block text-sm font-medium text-gray-700">Container Width</label>
            <input
              v-model="form.container_width"
              type="text"
              id="container_width"
              placeholder="1200px"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label for="border_radius" class="block text-sm font-medium text-gray-700">Border Radius</label>
            <input
              v-model="form.border_radius"
              type="text"
              id="border_radius"
              placeholder="8px"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label for="margin_medium" class="block text-sm font-medium text-gray-700">Medium Margin</label>
            <input
              v-model="form.margin_medium"
              type="text"
              id="margin_medium"
              placeholder="1rem"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Custom CSS</h2>
        <div>
          <label for="custom_css" class="block text-sm font-medium text-gray-700">Additional CSS</label>
          <textarea
            v-model="form.custom_css"
            id="custom_css"
            rows="6"
            placeholder="/* Add any custom CSS here */"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
          ></textarea>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Settings</h2>
        <div class="flex items-center">
          <input
            v-model="form.is_active"
            type="checkbox"
            id="is_active"
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label for="is_active" class="ml-2 block text-sm text-gray-900">
            Set as active design
          </label>
        </div>
      </div>

      <div class="flex justify-end space-x-3">
        <NuxtLink
          to="/admin/designs"
          class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </NuxtLink>
        <button
          type="submit"
          :disabled="loading"
          class="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {{ loading ? 'Creating...' : 'Create Design' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

const router = useRouter()
const loading = ref(false)
const availableFonts = ref([])
const selectedFonts = ref(false)
const googleFonts = reactive({
  primary: '',
  heading: ''
})

const form = reactive({
  name: '',
  description: '',
  primary_color: '#2563eb',
  secondary_color: '#1e40af',
  accent_color: '#3b82f6',
  background_color: '#ffffff',
  text_color: '#1f2937',
  font_family: 'Inter, sans-serif',
  heading_font: 'Inter, sans-serif',
  body_font: 'Inter, sans-serif',
  font_size_base: '16px',
  font_size_h1: '2.5rem',
  font_size_h2: '2rem',
  font_size_h3: '1.5rem',
  font_size_h4: '1.25rem',
  font_size_h5: '1.125rem',
  font_size_h6: '1rem',
  container_width: '1200px',
  sidebar_width: '250px',
  header_height: '80px',
  footer_height: '120px',
  margin_small: '0.5rem',
  margin_medium: '1rem',
  margin_large: '2rem',
  padding_small: '0.5rem',
  padding_medium: '1rem',
  padding_large: '2rem',
  border_radius: '8px',
  shadow_small: '0 1px 3px rgba(0, 0, 0, 0.1)',
  shadow_medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
  shadow_large: '0 10px 25px rgba(0, 0, 0, 0.1)',
  custom_css: '',
  google_fonts: '',
  is_active: false
})

onMounted(async () => {
  await fetchGoogleFonts()
})

const fetchGoogleFonts = async () => {
  try {
    const response = await $fetch('/api/admin/google-fonts')
    if (response.success) {
      availableFonts.value = response.data
    }
  } catch (error) {
    console.error('Error fetching Google Fonts:', error)
  }
}

const updateFontFamily = () => {
  if (selectedFonts.value && googleFonts.primary) {
    const fonts = {
      primary: googleFonts.primary,
      heading: googleFonts.heading || googleFonts.primary
    }
    form.google_fonts = JSON.stringify(fonts)
    
    // Update fallback fonts to use Google Fonts
    form.font_family = `${googleFonts.primary}, sans-serif`
    form.heading_font = `${googleFonts.heading || googleFonts.primary}, sans-serif`
    form.body_font = `${googleFonts.primary}, sans-serif`
  } else {
    form.google_fonts = ''
  }
}

const getGoogleFontCSS = (fontFamily) => {
  if (!fontFamily) return 'inherit'
  return `"${fontFamily}", sans-serif`
}

const createDesign = async () => {
  loading.value = true
  
  try {
    const response = await $fetch('/api/admin/designs', {
      method: 'POST',
      body: form
    })
    
    if (response.success) {
      await router.push('/admin/designs')
    }
  } catch (error) {
    console.error('Error creating design:', error)
  } finally {
    loading.value = false
  }
}
</script>
