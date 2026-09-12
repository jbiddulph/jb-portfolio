<template>
  <div class="page-x relative flex min-h-[calc(100dvh-var(--header-h))] items-center justify-center overflow-hidden py-[clamp(3rem,8vw,6rem)]">
    <div class="absolute inset-0 bg-hero-glow" aria-hidden="true" />
    <div class="card relative w-full max-w-md p-[clamp(1.5rem,4vw,2.5rem)] animate-fade-up">
      <p class="eyebrow mb-4">Admin</p>
      <h1 class="fluid-h2 font-heading text-ink">Welcome back</h1>
      <p class="mt-2 text-sm text-muted">Sign in to manage projects, designs and content.</p>

      <form class="mt-8 space-y-5" @submit.prevent="signIn">
        <div>
          <label for="email" class="field-label">Email address</label>
          <input id="email" v-model="form.email" name="email" type="email" autocomplete="email" required class="field-input" placeholder="you@example.com" />
        </div>
        <div>
          <label for="password" class="field-label">Password</label>
          <input id="password" v-model="form.password" name="password" type="password" autocomplete="current-password" required class="field-input" placeholder="••••••••" />
        </div>

        <p v-if="errorMsg" class="rounded-theme-sm bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {{ errorMsg }}
        </p>

        <button type="submit" class="btn btn-primary btn-lg w-full" :disabled="submitting" aria-label="Login">
          {{ submitting ? 'Signing in…' : 'Login' }}
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-muted">
        Need an account?
        <NuxtLink to="/register" class="font-medium text-brand hover:underline">Sign up</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({ title: 'Login | John Michael Biddulph' })

const router = useRouter()
const client = useSupabaseClient()
const form = reactive({
  email: '',
  password: ''
})
const errorMsg = ref('')
const submitting = ref(false)

const signIn = async () => {
  errorMsg.value = ''
  submitting.value = true
  try {
    const { error } = await client.auth.signInWithPassword(form)
    if (error) throw error
    router.push('/admin')
  } catch (error) {
    errorMsg.value = error.message
  } finally {
    submitting.value = false
  }
}
</script>
