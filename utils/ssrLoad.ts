/**
 * Helpers for data that is fetched during SSR (so it is in the first HTML
 * payload) but must never hold the response hostage if the database is slow.
 * On a timeout the state is simply left unloaded and the client fetches it
 * after hydration, which is what the site did before.
 */
export const SSR_FETCH_TIMEOUT_MS = 2500

export const withTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> => {
  let timer: ReturnType<typeof setTimeout> | undefined
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`Request timeout after ${ms}ms`)), ms)
  })
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer)) as Promise<T>
}

/** Server: bounded by the SSR budget. Client: the caller's own (longer) budget. */
export const guarded = <T>(promise: Promise<T>, clientTimeoutMs?: number) => {
  if (import.meta.server) return withTimeout(promise, SSR_FETCH_TIMEOUT_MS)
  return clientTimeoutMs ? withTimeout(promise, clientTimeoutMs) : promise
}

type InflightMap = Map<string, Promise<void>>

/**
 * Deduplicates concurrent loads per Nuxt app instance: per request on the
 * server (never shared between visitors) and app-wide in the browser.
 */
export const useInflight = () => {
  const nuxtApp = useNuxtApp() as unknown as { _inflight?: InflightMap }
  const map = (nuxtApp._inflight ||= new Map())

  return (key: string, task: () => Promise<void>) => {
    const existing = map.get(key)
    if (existing) return existing
    const promise = task().finally(() => map.delete(key))
    map.set(key, promise)
    return promise
  }
}
