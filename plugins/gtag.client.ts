const GA_MEASUREMENT_ID = 'G-HCYEX6RHPN'

declare global {
  interface Window {
    dataLayer: unknown[][]
    gtag: (...args: unknown[]) => void
  }
}

export default defineNuxtPlugin(() => {
  window.dataLayer = window.dataLayer || []
  window.gtag = (...args: unknown[]) => {
    window.dataLayer.push(args)
  }

  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID)

  useHead({
    script: [
      {
        key: 'google-gtag',
        async: true,
        src: `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`,
      },
    ],
  })
})
