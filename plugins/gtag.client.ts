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

  // Analytics is ~160 KB of third-party JS that nothing on the page waits for.
  // Events queue in dataLayer meanwhile, so nothing is lost by loading it once
  // hydration has finished and the browser is idle.
  const loadScript = () => {
    if (document.querySelector('script[data-gtag]')) return
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    script.dataset.gtag = ''
    document.head.appendChild(script)
  }

  onNuxtReady(() => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadScript, { timeout: 4000 })
    } else {
      setTimeout(loadScript, 2000)
    }
  })
})
