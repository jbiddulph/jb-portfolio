// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/supabase", "@pinia/nuxt", "@nuxt/content", "@nuxt/image",],

  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },

  supabase: {
    redirect: false,
  },

  imports: {
    dirs: ['stores']
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes',
      htmlAttrs: {
        lang: 'en', // specify the language of your page
      },
    }
  },

  content: {
    highlight: {
      theme: 'github-dark', // or any other theme you prefer
      preload: ['js', 'css', 'html'], // preloading languages for better performance
    }
  },
  
  compatibilityDate: "2024-07-11",
})