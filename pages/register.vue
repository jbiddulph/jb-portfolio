<template>
  <div class="mx-auto h-1/2 my-10 mx-4 md:my20 flex items-center w-full justify-center py-12  sm:px-6 lg:px-8">
    <div class="max-w-md space-y-8 bg-white rounded-lg border p-4">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Register to JBiddulph
      </h2>
      <h5>Use the form below to start creating content!</h5>
      <form class="mt-8 space-y-6" @submit.prevent="register">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input id="email" name="email" type="email" v-model="form.email" :class="{'mt-1': form.email !== ''}" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address">
            <span v-if="errorMsg.value">{{errorMsg}}</span>
          </div> 
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" name="password" type="password" v-model="form.password" :class="{'mt-1': form.password !== ''}" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password">
          </div>
        </div>
        <div><h2>{{ successMsg }}</h2></div>
        <p>Already got an account, <NuxtLink :href="'/login'">login</NuxtLink></p>
        <div>
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" aria-label="Register">
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const client = useSupabaseClient();
const form = reactive({
  email: "",
  password: ""
})
const errorMsg = ref("")
const successMsg = ref("")
const register = async () => {
  // Implement your registration logic here
  try {
    const { data, error } = await client.auth.signUp(form)
    console.log("form: ", form);
    if (error) throw error
    successMsg.value = "Check your email to confirm your account"
  } catch (error) {
    errorMsg.value = error.message
  }
}

</script>
