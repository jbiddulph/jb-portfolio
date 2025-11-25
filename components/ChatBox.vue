<template>
  <div class="fixed bottom-4 right-4 z-50">
    <!-- Chat Toggle Button -->
    <button
      v-if="!isOpen"
      @click="toggleChat"
      class="bg-black hover:bg-gray-800 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
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
      class="bg-white rounded-lg shadow-2xl w-80 h-96 flex flex-col border border-gray-300"
    >
      <!-- Chat Header -->
      <div class="flex items-center justify-between p-4 border-b rounded-t-lg bg-black border-black">
        <h3 class="text-white font-semibold text-lg">
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
        class="flex-1 overflow-y-auto p-4 space-y-3 bg-white"
      >
        <div
          v-if="messages.length === 0"
          class="text-center text-sm py-8 text-gray-500"
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
                ? 'bg-black text-white'
                : 'bg-gray-100 text-black border border-gray-300'
            "
          >
            <p class="text-sm whitespace-pre-wrap">
              {{ message.text }}
            </p>
            <p
              class="text-xs mt-1 opacity-70"
              :class="message.sender === 'user' ? 'text-white' : 'text-gray-600'"
            >
              {{ formatTime(message.timestamp) }}
            </p>
          </div>
        </div>
        <div v-if="isLoading" class="flex justify-start">
          <div class="bg-gray-100 border border-gray-300 rounded-lg px-3 py-2">
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
      <div class="p-4 border-t border-gray-300 bg-white rounded-b-lg">
        <form @submit.prevent="sendMessage" class="flex space-x-2">
          <input
            v-model="inputMessage"
            type="text"
            placeholder="Type your message..."
            class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-sm text-black bg-white"
            :disabled="isLoading"
          />
          <button
            type="submit"
            :disabled="!inputMessage.trim() || isLoading"
            class="px-4 py-2 rounded-md text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-black hover:bg-gray-800 disabled:bg-gray-400"
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
const messages = ref<Array<{ text: string; sender: 'user' | 'bot'; timestamp: Date }>>([
  {
    text: "Hi! I'm here to help. Feel free to ask me anything about my CV, experience, or projects!",
    sender: 'bot',
    timestamp: new Date(),
  }
])
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
    // Use server-side API route to avoid CORS issues
    const response = await $fetch('/api/chat', {
      method: 'POST',
      body: { text },
    })

    if (response.success) {
      return response.reply
    } else {
      throw new Error(response.message || 'Failed to get reply')
    }
  } catch (error: any) {
    console.error('Chat API error:', error)
    
    // Handle different error types
    if (error.statusCode === 404) {
      throw new Error('Webhook not found (404). Please check that the webhook is active in n8n.')
    } else if (error.statusCode === 500) {
      throw new Error('Server error. Please try again later.')
    } else if (error.message) {
      throw new Error(error.message)
    }
    
    throw new Error('Failed to send message. Please try again.')
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

