<!-- layouts/default.vue -->
<template>
  <div>
    <div v-if="hasLoaded">
      <Loaded />
    </div>
    <header class="text-white bg-slate-900">
      <div class="container mx-auto flex justify-between items-center p-4 flex-col md:flex-row">
        <div class="flex flex-row justify-between w-full">
          <div class="flex items-center">
            <!-- <img src="/public/logo.png" alt="Logo" class="w-10 h-10 mr-4" /> -->
            <div class="flex flex-col">
              <h1 class="text-xl font-bold">John Michael Biddulph</h1>
              <h2 class="text-sm text-slate-500">‹Creative<strong>JavaScript</strong>Developer /›</h2>
              <h3 class="text-xs text-slate-600">Vue, Nuxt, NextJS, Python, Laravel</h3>
              <nav>
                <ul :class="{'block': isMenuOpen, 'hidden': !isMenuOpen}" class="md:flex md:items-center md:space-x-4 mt-4 md:mt-0 w-full">
                  <!-- <li v-for="link in links" :key="link.text" class="flex-none mb-6 md:mb-0">
                    <NuxtLink :href="link.href" :class="['block py-2 px-4 rounded', { 'bg-gray-700': isActive(link.href) }]" @click="closeMenuOnLinkClick">
                      {{ link.text }}
                    </NuxtLink>
                  </li> -->
                  <li v-if="user">
                    <button type="button" @click="logout" class="bg-red-800 rounded text-white px-6 py-2" aria-label="Logout">
                      Logout
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <button @click="toggleMenu" class="block md:hidden" aria-label="Toggle menu">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        <nav>
          <ul :class="{'block': isMenuOpen, 'hidden': !isMenuOpen}" class="md:flex md:items-center md:space-x-4 mt-4 md:mt-0 w-full">
            <li class="flex-none mb-6 md:mb-0 text-white text-center">
              <NuxtLink :href="'/docs'" :class="['flex flex-col py-2 px-4 rounded items-center']" @click="closeMenuOnLinkClick">
                <p>Docs</p>
              </NuxtLink>
            </li>
            <li class="flex-none mb-6 md:mb-0 text-white text-center">
              <NuxtLink :href="'/portfolio'" :class="['flex flex-col py-2 px-4 rounded items-center']" @click="closeMenuOnLinkClick">
                <p>Portfolio</p>
              </NuxtLink>
            </li>
            <li class="flex-none mb-6 md:mb-0 text-white text-center">
              <NuxtLink :href="'http://www.github.com'" target="_blank" :class="['flex flex-col py-2 px-4 rounded items-center']" @click="closeMenuOnLinkClick">
                <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 20 20"><path fill="currentColor" d="M13.18 11.309c-.718 0-1.3.807-1.3 1.799c0 .994.582 1.801 1.3 1.801s1.3-.807 1.3-1.801c-.001-.992-.582-1.799-1.3-1.799m4.526-4.683c.149-.365.155-2.439-.635-4.426c0 0-1.811.199-4.551 2.08c-.575-.16-1.548-.238-2.519-.238c-.973 0-1.945.078-2.52.238C4.74 2.399 2.929 2.2 2.929 2.2c-.789 1.987-.781 4.061-.634 4.426C1.367 7.634.8 8.845.8 10.497c0 7.186 5.963 7.301 7.467 7.301l1.734.002l1.732-.002c1.506 0 7.467-.115 7.467-7.301c0-1.652-.566-2.863-1.494-3.871m-7.678 10.289h-.056c-3.771 0-6.709-.449-6.709-4.115c0-.879.31-1.693 1.047-2.369C5.537 9.304 7.615 9.9 9.972 9.9h.056c2.357 0 4.436-.596 5.664.531c.735.676 1.045 1.49 1.045 2.369c0 3.666-2.937 4.115-6.709 4.115m-3.207-5.606c-.718 0-1.3.807-1.3 1.799c0 .994.582 1.801 1.3 1.801c.719 0 1.301-.807 1.301-1.801c0-.992-.582-1.799-1.301-1.799"/></svg>
                <p>GitHub</p>
              </NuxtLink>
            </li>
            <li class="flex-none mb-6 md:mb-0 text-white text-center">
              <NuxtLink :href="'https://www.linkedin.com/in/john-biddulph-36b99116/'" target="_blank" :class="['flex flex-col py-2 px-4 rounded items-center']" @click="closeMenuOnLinkClick">
                <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 20 20"><path fill="currentColor" d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4M7.65 13.979H5.706V7.723H7.65zm-.984-7.024c-.614 0-1.011-.435-1.011-.973c0-.549.409-.971 1.036-.971s1.011.422 1.023.971c0 .538-.396.973-1.048.973m8.084 7.024h-1.944v-3.467c0-.807-.282-1.355-.985-1.355c-.537 0-.856.371-.997.728c-.052.127-.065.307-.065.486v3.607H8.814v-4.26c0-.781-.025-1.434-.051-1.996h1.689l.089.869h.039c.256-.408.883-1.01 1.932-1.01c1.279 0 2.238.857 2.238 2.699z"/></svg>
                <p>LinkedIn</p>
              </NuxtLink>
            </li>
            <li class="flex-none mb-6 md:mb-0 text-white text-center">
              <NuxtLink :href="'https://www.facebook.com/johnbiddulph'" target="_blank" :class="['flex flex-col py-2 px-4 rounded items-center']" @click="closeMenuOnLinkClick">
                <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 20 20"><path fill="currentColor" d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4m2.274 6.634h-1.443c-.171 0-.361.225-.361.524V8.6h1.805l-.273 1.486H10.47v4.461H8.767v-4.461H7.222V8.6h1.545v-.874c0-1.254.87-2.273 2.064-2.273h1.443z"/></svg>
                <p>Facebook</p>
              </NuxtLink>
            </li>
            <li class="flex-none mb-6 md:mb-0 text-white text-center">
              <NuxtLink :href="'https://www.instagram.com/jbiddulph/?hl=en'" target="_blank" :class="['flex flex-col py-2 px-4 rounded items-center']" @click="closeMenuOnLinkClick">
                <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 20 20"><path fill="currentColor" d="M13 10a3 3 0 1 1-6 0c0-.171.018-.338.049-.5H6v3.997c0 .278.225.503.503.503h6.995a.503.503 0 0 0 .502-.503V9.5h-1.049c.031.162.049.329.049.5m-3 2a2 2 0 1 0-.001-4.001A2 2 0 0 0 10 12m2.4-4.1h1.199a.301.301 0 0 0 .301-.3V6.401a.301.301 0 0 0-.301-.301H12.4a.301.301 0 0 0-.301.301V7.6c.001.165.136.3.301.3M10 .4A9.6 9.6 0 0 0 .4 10a9.6 9.6 0 0 0 9.6 9.6a9.6 9.6 0 0 0 9.6-9.6A9.6 9.6 0 0 0 10 .4m5 13.489C15 14.5 14.5 15 13.889 15H6.111C5.5 15 5 14.5 5 13.889V6.111C5 5.5 5.5 5 6.111 5h7.778C14.5 5 15 5.5 15 6.111z"/></svg>
                <p>Instagram</p>
              </NuxtLink>
            </li>
            <li class="flex-none mb-6 md:mb-0 text-white text-center">
              <NuxtLink :href="'/JohnBiddulphResume.pdf'" target="_blank" :class="['flex flex-col py-2 px-4 rounded items-center']" @click="closeMenuOnLinkClick">
                <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 512 512"><path fill="currentColor" d="M488.877 52.447H302.306V5.92h-34.779L0 52.563v406.99l265.957 46.527h36.349v-46.353h174.59c9.887-.465 20.879.291 29.37-5.757c6.804-10.41 5.06-23.438 5.641-35.186V75.012c1.221-13.26-9.77-23.903-23.03-22.565m-294.862 282.59c-9.712 5.06-24.252-.233-35.767.581c-7.735-38.5-16.75-76.768-23.67-115.443c-6.805 37.57-15.645 74.79-23.438 112.128c-11.166-.581-22.39-1.28-33.615-2.035c-9.655-51.18-20.995-102.01-30.01-153.305c9.945-.465 19.948-.872 29.893-1.221c5.99 37.047 12.795 73.919 18.03 111.024c8.2-38.036 16.574-76.071 24.717-114.106c11.05-.64 22.1-1.105 33.15-1.687c7.735 39.257 15.644 78.455 24.019 117.537c6.572-40.361 13.841-80.607 20.879-120.91c11.631-.407 23.263-1.047 34.836-1.745c-13.143 56.355-24.659 113.176-39.024 169.182m290.212 97.069H302.306v-36.527h151.21v-23.263h-151.21v-29.079h151.21v-23.263h-151.21v-29.08h151.21v-23.262h-151.21v-29.08h151.21V215.29h-151.21v-29.08h151.21v-23.263h-151.21v-29.079h151.21v-23.263h-151.21v-30.71h181.921Z"/></svg>
                <p>CV</p>
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <main class="flex mx-auto bg-slate-900 border-t border-slate-700 border-slate-500">
      <nuxt-page />
    </main>
    <footer class="bg-slate-800 border-t border-slate-700 text-slate-500 text-center p-4">
      <p class="text-xs">&copy; copyright jbiddulph 2025 </p>
    </footer>
  </div>
</template>

<script setup>
// const appStore = useAppStore();

const isMenuOpen = ref(false);
const route = useRoute();
import { useRoute } from 'vue-router';
const client = useSupabaseClient();
const links = ref([]);
const router = useRouter()
const user = useSupabaseUser();
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function closeMenuOnLinkClick() {
  if (window.innerWidth < 768) {
    isMenuOpen.value = false;
  }
}

const logout = async () => {
  try {
    const { error } = await client.auth.signOut()
    if (error) throw error;
    router.push("/login");
  } catch (error) {
    console.log(error);
  }
}

function isActive(path) {
  return route.path === path;
}

watchEffect(() => {
  if (user.value) {
    links.value = [
      // { text: 'Home', href: '/' },
      { text: 'Map', href: '/map' },
      { text: 'Items', href: '/' },
      { text: 'Add Item', href: '/items/create' },
    ];
  } else {
    links.value = [
      // { text: 'Home', href: '/' },
      { text: 'Home', href: '/' },
      { text: 'Login', href: '/login' },
      { text: 'Register', href: '/register' },
    ];
  }
});
</script>

<style>
.bg-gradient {
  background: linear-gradient(180deg, #ff00ff, #2e00d4);
  background-size: 200% 200%;
}
.bg-gradient-foot {
  background: linear-gradient(180deg, #ff00ff, #2e00d4);
  background-size: 200% 200%;
}
/* Add your theme styles here */
body {
  font-family: monospace, sans-serif;
}

header {
  background-color: #333;
  color: #fff;
  padding: 1rem;
  text-align: center;
}

footer {
  background-color: #333;
  color: #fff;
  padding: 1rem;
  text-align: center;
}

main {
  min-height: calc(100vh - 156px); /* Adjust this value according to your header and footer height */
}
</style>
