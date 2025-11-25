<template>
  <div class="fixed bottom-4 right-4 z-50">
    <!-- Chat Toggle Button -->
    <button
      v-if="!isOpen"
      @click="toggleChat"
      class="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
      :style="{
        backgroundColor: siteInfo?.design?.primary_color || '#4f46e5',
      }"
      aria-label="Open chat"
    >
      <svg
        v-if="!isOpen"
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    </button>

    <!-- Chat Window -->
    <div
      v-if="isOpen"
      class="bg-white rounded-lg shadow-2xl w-80 h-96 flex flex-col border"
      :style="{
        borderColor: siteInfo?.design?.primary_color || '#e5e7eb',
        borderRadius: siteInfo?.design?.border_radius || '8px',
      }"
    >
      <!-- Chat Header -->
      <div
        class="flex items-center justify-between p-4 border-b rounded-t-lg"
        :style="{
          backgroundColor: siteInfo?.design?.primary_color || '#4f46e5',
          borderColor: siteInfo?.design?.primary_color || '#4f46e5',
        }"
      >
        <h3
          class="text-white font-semibold text-lg"
          :style="{
            fontFamily: getFontFamily(siteInfo?.design, 'heading'),
          }"
        >
          Chat
        </h3>
        <button
          @click="toggleChat"
          class="text-white hover:text-gray-200 transition-colors"
          aria-label="Close chat"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Messages Area -->
      <div
        ref="messagesContainer"
        class="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50"
        :style="{
          backgroundColor: siteInfo?.design?.background_color || '#f9fafb',
        }"
      >
        <div
          v-if="messages.length === 0"
          class="text-center text-sm py-8"
          :style="{
            color: siteInfo?.design?.text_color || '#6b7280',
            fontFamily: getFontFamily(siteInfo?.design, 'primary'),
          }"
        >
          Start a conversation...
        </div>
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="flex"
          :class="message.sender === 'user' ? 'justify-end' : 'justify-start'"
        >
          <div
            class="max-w-[80%] rounded-lg px-3 py-2"
            :class="
              message.sender === 'user'
                ? 'text-white'
                : 'bg-white border'
            "
            :style="
              message.sender === 'user'
                ? {
                    backgroundColor: siteInfo?.design?.primary_color || '#4f46e5',
                    borderRadius: siteInfo?.design?.border_radius || '8px',
                    color: '#ffffff',
                  }
                : {
                    backgroundColor: '#ffffff',
                    borderColor: siteInfo?.design?.primary_color || '#e5e7eb',
                    borderRadius: siteInfo?.design?.border_radius || '8px',
                    color: siteInfo?.design?.text_color || '#1f2937',
                    fontFamily: getFontFamily(siteInfo?.design, 'primary'),
                  }
            "
          >
            <p 
              class="text-sm whitespace-pre-wrap"
              :style="{
                color: message.sender === 'user' ? '#ffffff' : (siteInfo?.design?.text_color || '#1f2937'),
              }"
            >
              {{ message.text }}
            </p>
            <p
              class="text-xs mt-1 opacity-70"
              :style="{
                color: message.sender === 'user' ? '#ffffff' : (siteInfo?.design?.text_color || '#6b7280'),
              }"
            >
              {{ formatTime(message.timestamp) }}
            </p>
          </div>
        </div>
        <div v-if="isLoading" class="flex justify-start">
          <div
            class="bg-white border rounded-lg px-3 py-2"
            :style="{
              borderColor: siteInfo?.design?.primary_color || '#e5e7eb',
              borderRadius: siteInfo?.design?.border_radius || '8px',
            }"
          >
            <div class="flex space-x-1">
              <div
                class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style="animation-delay: 0s"
              ></div>
              <div
                class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style="animation-delay: 0.2s"
              ></div>
              <div
                class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style="animation-delay: 0.4s"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="p-4 border-t bg-white rounded-b-lg">
        <form @submit.prevent="sendMessage" class="flex space-x-2">
          <input
            v-model="inputMessage"
            type="text"
            placeholder="Type your message..."
            class="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            :style="{
              borderColor: siteInfo?.design?.primary_color || '#e5e7eb',
              borderRadius: siteInfo?.design?.border_radius || '6px',
              fontFamily: getFontFamily(siteInfo?.design, 'primary'),
              color: siteInfo?.design?.text_color || '#1f2937',
              backgroundColor: '#ffffff',
            }"
            :disabled="isLoading"
          />
          <button
            type="submit"
            :disabled="!inputMessage.trim() || isLoading"
            class="px-4 py-2 rounded-md text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            :style="{
              backgroundColor:
                !inputMessage.trim() || isLoading
                  ? '#9ca3af'
                  : siteInfo?.design?.primary_color || '#4f46e5',
              borderRadius: siteInfo?.design?.border_radius || '6px',
            }"
          >
            <svg
              v-if="!isLoading"
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
            <div
              v-else
              class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
            ></div>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch, onMounted } from 'vue'

const isOpen = ref(false)
const inputMessage = ref('')
const messages = ref<Array<{ text: string; sender: 'user' | 'bot'; timestamp: Date }>>([])
const isLoading = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)

// Fetch site info for styling
const siteInfo = ref<any>(null)

onMounted(async () => {
  try {
    const response = await $fetch('/api/site-info')
    siteInfo.value = response.data
  } catch (error) {
    console.error('Error fetching site info:', error)
  }
})

const toggleChat = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    nextTick(() => {
      scrollToBottom()
    })
  }
}

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const sendMessage = async () => {
  if (!inputMessage.value.trim() || isLoading.value) return

  const userMessage = inputMessage.value.trim()
  inputMessage.value = ''

  // Add user message
  messages.value.push({
    text: userMessage,
    sender: 'user',
    timestamp: new Date(),
  })

  nextTick(() => {
    scrollToBottom()
  })

  // Send to webhook
  isLoading.value = true
  try {
    const reply = await sendToWebhook(userMessage)
    
    // Add bot reply
    messages.value.push({
      text: reply || 'Sorry, I could not process your message.',
      sender: 'bot',
      timestamp: new Date(),
    })
  } catch (error: any) {
    console.error('Error sending message:', error)
    
    // Show more specific error message to user
    let errorMessage = 'Sorry, there was an error processing your message. Please try again.'
    
    if (error.message?.includes('404')) {
      errorMessage = 'The webhook endpoint was not found (404). Please check that the webhook is active in n8n.'
    } else if (error.message?.includes('CORS')) {
      errorMessage = 'CORS error: The webhook server is not allowing requests from this domain.'
    } else if (error.message?.includes('Network error')) {
      errorMessage = 'Network error: Unable to connect to the webhook server.'
    } else if (error.message) {
      errorMessage = `Error: ${error.message}`
    }
    
    messages.value.push({
      text: errorMessage,
      sender: 'bot',
      timestamp: new Date(),
    })
  } finally {
    isLoading.value = false
    nextTick(() => {
      scrollToBottom()
    })
  }
}

const sendToWebhook = async (text: string): Promise<string> => {
  try {
    const webhookUrl = 'https://n8n.neurohub.uk/webhook-test/jbiddulph/a0fe2042-ef3d-4911-a488-42343d8bf39b'
    
    console.log('Sending message to webhook:', webhookUrl)
    console.log('Message text:', text)
    
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })

    console.log('Webhook response status:', res.status)
    console.log('Webhook response headers:', res.headers)

    if (!res.ok) {
      const errorText = await res.text()
      console.error('Webhook error response:', errorText)
      throw new Error(`HTTP error! status: ${res.status} - ${errorText}`)
    }

    const data = await res.json()
    console.log('Webhook response data:', data)
    return data.reply || data.message || data.text || 'No reply received'
  } catch (error: any) {
    console.error('Webhook fetch error:', error)
    
    // If it's a network error (CORS, etc.)
    if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
      throw new Error('Network error: Unable to reach the webhook. This might be a CORS issue or the webhook URL is incorrect.')
    }
    
    // If it's a 404, provide helpful message
    if (error.message?.includes('404')) {
      throw new Error('Webhook not found (404). Please check that the webhook URL is correct and the webhook is active in n8n.')
    }
    
    throw error
  }
}

const formatTime = (date: Date) => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
}

const getFontFamily = (design: any, fontType = 'primary') => {
  if (!design) return 'inherit'

  let fontFamily = fontType === 'heading' ? design.heading_font : design.font_family

  if (design.google_fonts) {
    try {
      const googleFonts = JSON.parse(design.google_fonts)
      if (fontType === 'heading' && googleFonts.heading) {
        fontFamily = `"${googleFonts.heading}", ${design.heading_font}`
      } else if (googleFonts.primary) {
        fontFamily = `"${googleFonts.primary}", ${design.font_family}`
      }
    } catch (e) {
      console.error('Error parsing Google Fonts:', e)
    }
  }

  return fontFamily
}

// Watch for new messages and auto-scroll
watch(
  () => messages.value.length,
  () => {
    nextTick(() => {
      scrollToBottom()
    })
  }
)
</script>

<style scoped>
/* Custom scrollbar for messages area */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>

