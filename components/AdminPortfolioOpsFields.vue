<template>
  <div class="bg-white shadow rounded-lg p-6">
    <div class="flex flex-wrap items-start justify-between gap-3 mb-6">
      <div>
        <h2 class="text-lg font-medium text-gray-900">Other information</h2>
        <p class="mt-1 text-sm text-gray-500">
          These details are only available in Admin and are never shown on the public site.
        </p>
      </div>
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
        Admin only
      </span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="field in textFields" :key="field.key">
        <label :for="field.key" class="block text-sm font-medium text-gray-700">{{ field.label }}</label>
        <input
          :id="field.key"
          v-model="form[field.key]"
          type="text"
          :placeholder="field.placeholder"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
    </div>

    <div class="mt-6 space-y-6">
      <div>
        <div class="flex items-center justify-between">
          <label for="passwords" class="block text-sm font-medium text-gray-700">Passwords</label>
          <button
            type="button"
            class="text-xs font-medium text-indigo-600 hover:text-indigo-500"
            @click="showPasswords = !showPasswords"
          >
            {{ showPasswords ? 'Hide' : 'Show' }}
          </button>
        </div>
        <textarea
          id="passwords"
          v-model="form.passwords"
          rows="4"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          :style="showPasswords ? undefined : { WebkitTextSecurity: 'disc' }"
          placeholder="Logins, usernames, and passwords for your own records"
        ></textarea>
        <p class="mt-1 text-sm text-gray-500">
          Stored in the database for your records. Visible only in Admin.
        </p>
      </div>

      <div v-for="field in textareaFields" :key="field.key">
        <label :for="field.key" class="block text-sm font-medium text-gray-700">{{ field.label }}</label>
        <textarea
          :id="field.key"
          v-model="form[field.key]"
          :rows="field.rows"
          :placeholder="field.placeholder"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  form: {
    type: Object,
    required: true
  }
})

const showPasswords = ref(false)

const textFields = [
  { key: 'domains', label: 'Domains', placeholder: 'example.com, example.net' },
  { key: 'subdomains', label: 'Subdomains', placeholder: 'www, app, api' },
  { key: 'hosting', label: 'Hosting', placeholder: 'Vercel, Netlify, DigitalOcean...' },
  { key: 'database_info', label: 'Database', placeholder: 'Supabase Postgres, PlanetScale...' },
  { key: 'ssl', label: 'SSL', placeholder: "Let's Encrypt, Cloudflare..." },
  { key: 'github_repo', label: 'GitHub repo', placeholder: 'https://github.com/user/repo' }
]

const textareaFields = [
  { key: 'apis_used', label: 'APIs used', placeholder: 'Stripe, OpenAI, Google Maps...', rows: 3 },
  { key: 'documentation', label: 'Documentation', placeholder: 'Links to docs, runbooks, or notes', rows: 3 },
  { key: 'other_info', label: 'Other information', placeholder: 'Registrar, DNS, extra notes, etc.', rows: 3 }
]
</script>
