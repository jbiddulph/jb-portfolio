<template>
  <div class="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
    <!-- Toggle -->
    <button
      v-if="!isOpen"
      type="button"
      class="btn btn-primary group h-14 w-14 !rounded-full !p-0 shadow-theme-lg hover:scale-105"
      aria-label="Open chat"
      @click="toggleChat"
    >
      <svg class="h-6 w-6 transition-transform group-hover:-rotate-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    </button>

    <!-- Window -->
    <Transition
      enter-active-class="transition duration-300 ease-out-expo"
      enter-from-class="translate-y-4 scale-95 opacity-0"
      enter-to-class="translate-y-0 scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 scale-100 opacity-100"
      leave-to-class="translate-y-4 scale-95 opacity-0"
    >
      <section
        v-if="isOpen"
        class="card flex h-[min(32rem,calc(100dvh-3rem))] w-[min(24rem,calc(100vw-2rem))] origin-bottom-right flex-col overflow-hidden shadow-theme-lg"
        role="dialog"
        aria-label="Chat"
      >
        <header class="flex items-center justify-between gap-3 bg-brand px-4 py-3 text-on-brand">
          <div class="flex items-center gap-3">
            <span class="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/15 font-heading text-sm font-bold">
              JB
              <span class="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-[var(--color-primary)]" aria-hidden="true" />
            </span>
            <div class="leading-tight">
              <p class="text-sm font-semibold">Ask me anything</p>
            </div>
          </div>
          <button type="button" class="rounded-full p-1.5 transition hover:bg-white/15" aria-label="Close chat" @click="toggleChat">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div ref="messagesContainer" class="scrollbar-thin flex-1 space-y-3 overflow-y-auto bg-surface-2 p-4">
          <div
            v-for="(message, index) in messages"
            :key="index"
            class="flex"
            :class="message.sender === 'user' ? 'justify-end' : 'justify-start'"
          >
            <div
              class="max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm shadow-theme-sm"
              :class="message.sender === 'user'
                ? 'rounded-br-md bg-brand text-on-brand'
                : 'rounded-bl-md border border-line bg-card text-ink'"
            >
              <p class="whitespace-pre-wrap leading-relaxed">{{ message.text }}</p>
              <p class="mt-1 text-[0.6875rem] opacity-60">{{ formatTime(message.timestamp) }}</p>
            </div>
          </div>
          <div v-if="isLoading" class="flex justify-start">
            <div class="flex items-center gap-1 rounded-2xl rounded-bl-md border border-line bg-card px-3.5 py-3">
              <span v-for="n in 3" :key="n" class="h-1.5 w-1.5 animate-bounce rounded-full bg-muted" :style="{ animationDelay: `${(n - 1) * 0.15}s` }" />
            </div>
          </div>
        </div>

        <form class="flex items-center gap-2 border-t border-line bg-card p-3" @submit.prevent="sendMessage">
          <label for="chat-input" class="sr-only">Message</label>
          <input
            id="chat-input"
            v-model="inputMessage"
            type="text"
            placeholder="Type your message…"
            class="field-input !rounded-full !py-2.5"
            :disabled="isLoading"
            autocomplete="off"
          />
          <button
            type="submit"
            :disabled="!inputMessage.trim() || isLoading"
            class="btn btn-primary h-10 w-10 shrink-0 !rounded-full !p-0"
            aria-label="Send message"
          >
            <svg v-if="!isLoading" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 19V5m0 0l-6 6m6-6l6 6" />
            </svg>
            <span v-else class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </button>
        </form>
      </section>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'

const isOpen = ref(false)
const inputMessage = ref('')
const messages = ref<Array<{ text: string; sender: 'user' | 'bot'; timestamp: Date }>>([
  {
    text: "Hi! I'm here to help. Feel free to ask me anything about my CV, experience, or projects!",
    sender: 'bot',
    timestamp: new Date()
  }
])
const isLoading = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)

const toggleChat = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    nextTick(scrollToBottom)
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

  messages.value.push({ text: userMessage, sender: 'user', timestamp: new Date() })
  nextTick(scrollToBottom)

  isLoading.value = true
  try {
    const reply = await sendToWebhook(userMessage)
    messages.value.push({
      text: reply || 'Sorry, I could not process your message.',
      sender: 'bot',
      timestamp: new Date()
    })
  } catch (error: any) {
    console.error('Error sending message:', error)

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

    messages.value.push({ text: errorMessage, sender: 'bot', timestamp: new Date() })
  } finally {
    isLoading.value = false
    nextTick(scrollToBottom)
  }
}

const chatSessionId = `web-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`

const sendToWebhook = async (text: string): Promise<string> => {
  try {
    const response: any = await $fetch('/api/chat', {
      method: 'POST',
      body: { text, sessionId: chatSessionId }
    })

    if (response.success) {
      return response.reply
    }
    throw new Error(response.message || 'Failed to get reply')
  } catch (error: any) {
    console.error('Chat API error:', error)

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

const formatTime = (date: Date) =>
  new Date(date).toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit' })

watch(() => messages.value.length, () => nextTick(scrollToBottom))
</script>
