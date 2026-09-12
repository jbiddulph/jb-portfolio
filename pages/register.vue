<template>
  <div class="page-x relative flex min-h-[calc(100dvh-var(--header-h))] items-center justify-center overflow-hidden py-[clamp(3rem,8vw,6rem)]">
    <div class="absolute inset-0 bg-hero-glow" aria-hidden="true" />
    <div class="card relative w-full max-w-md p-[clamp(1.5rem,4vw,2.5rem)] animate-fade-up">
      <p class="eyebrow mb-4">Admin</p>
      <h1 class="fluid-h2 font-heading text-ink">Create an account</h1>
      <p class="mt-2 text-sm text-muted">Use the form below to start creating content.</p>

      <form class="mt-8 space-y-5" @submit.prevent="register">
        <div>
          <label for="email" class="field-label">Email address</label>
          <input id="email" v-model="form.email" name="email" type="email" autocomplete="email" required class="field-input" placeholder="you@example.com" />
        </div>
        <div>
          <label for="password" class="field-label">Password</label>
          <input id="password" v-model="form.password" name="password" type="password" autocomplete="new-password" required class="field-input" placeholder="••••••••" />
        </div>

        <p v-if="errorMsg" class="rounded-theme-sm bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {{ errorMsg }}
        </p>
        <p v-if="successMsg" class="rounded-theme-sm bg-green-50 px-4 py-3 text-sm text-green-700" role="status">
          {{ successMsg }}
        </p>

        <button type="submit" class="btn btn-primary btn-lg w-full" :disabled="submitting" aria-label="Register">
          {{ submitting ? 'Creating account…' : 'Register' }}
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-muted">
        Already got an account?
        <NuxtLink to="/login" class="font-medium text-brand hover:underline">Login</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({ title: 'Register | John Michael Biddulph' })

const client = useSupabaseClient()
const form = reactive({
  email: '',
  password: ''
})
const errorMsg = ref('')
const successMsg = ref('')
const submitting = ref(false)

const register = async () => {
  errorMsg.value = ''
  successMsg.value = ''
  submitting.value = true
  try {
    const { error } = await client.auth.signUp(form)
    if (error) throw error
    successMsg.value = 'Check your email to confirm your account'
  } catch (error) {
    errorMsg.value = error.message
  } finally {
    submitting.value = false
  }
}
</script>
