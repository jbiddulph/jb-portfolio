const RETRYABLE_STATUS_CODES = new Set([408, 425, 429, 500, 502, 503, 504])

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const getFetchStatusCode = (error: unknown) => {
  const fetchError = error as { status?: number, statusCode?: number, response?: { status?: number } }
  return fetchError.statusCode || fetchError.status || fetchError.response?.status
}

export const useAdminFetch = () => {
  const fetchAdminData = async <T>(
    url: string,
    options: Parameters<typeof $fetch<T>>[1] = {},
    maxAttempts = 3
  ): Promise<T> => {
    let lastError: unknown

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      try {
        return await $fetch<T>(url, {
          ...options,
          headers: {
            ...(options as { headers?: Record<string, string> })?.headers,
            'cache-control': 'no-cache'
          }
        })
      } catch (error) {
        lastError = error
        const statusCode = getFetchStatusCode(error)
        const shouldRetry = !statusCode || RETRYABLE_STATUS_CODES.has(statusCode)

        if (!shouldRetry || attempt === maxAttempts) {
          break
        }

        await wait(400 * attempt)
      }
    }

    throw lastError
  }

  return {
    fetchAdminData
  }
}
