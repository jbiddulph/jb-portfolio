// Hosts that user-uploaded images (portfolio screenshots, avatar) are served
// from. Both the configured Supabase project and the known storage host are
// allow-listed so <SmartImage> can route them through the image optimiser.
const supabaseHost = (() => {
  try {
    return process.env.SUPABASE_URL ? new URL(process.env.SUPABASE_URL).hostname : null
  } catch {
    return null
  }
})()
const imageDomains = [...new Set([supabaseHost, 'qemafehpoknkbejlbksa.supabase.co'].filter(Boolean))] as string[]

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/supabase", "@pinia/nuxt", "@nuxt/content", "@nuxt/image",],

  runtimeConfig: {
    servicesEnquiryWebhookUrl: process.env.SERVICES_ENQUIRY_WEBHOOK_URL || '',
    portfolioSecretsKey: process.env.PORTFOLIO_SECRETS_KEY || '',
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },

  supabase: {
    redirect: false,
  },

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },

  image: {
    domains: imageDomains,
    quality: 75,
    format: ['webp'],
  },

  nitro: {
    vercel: {
      config: {
        images: {
          // Uploads use unique, timestamped filenames, so optimised variants can
          // be cached for a long time (the module default is 5 minutes).
          minimumCacheTTL: 60 * 60 * 24 * 30,
        },
      },
    },
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