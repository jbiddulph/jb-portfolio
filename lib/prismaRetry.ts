/**
 * Small Prisma helpers for serverless: keep the pool tiny and retry transient
 * connection blips that otherwise surface as intermittent /api/portfolio 500s.
 */

const TRANSIENT_PRISMA_RE = /P1001|P1002|P1017|P2024|Can't reach database|Connection reset|ECONNRESET|ETIMEDOUT|timed out|Server has closed the connection|too many connections/i

export const isTransientPrismaError = (error: unknown) => {
  const message = error instanceof Error ? error.message : String(error || '')
  const code = typeof error === 'object' && error && 'code' in error ? String((error as any).code) : ''
  return TRANSIENT_PRISMA_RE.test(message) || TRANSIENT_PRISMA_RE.test(code)
}

export const withPrismaRetry = async <T>(
  run: () => Promise<T>,
  { attempts = 3, delayMs = 150 }: { attempts?: number, delayMs?: number } = {}
): Promise<T> => {
  let lastError: unknown
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await run()
    } catch (error) {
      lastError = error
      if (attempt === attempts || !isTransientPrismaError(error)) {
        throw error
      }
      await new Promise((resolve) => setTimeout(resolve, delayMs * attempt))
    }
  }
  throw lastError
}

/** Serverless-friendly: one connection per function instance unless already set. */
export const withServerlessConnectionLimit = (url?: string | null) => {
  if (!url?.trim()) return url || undefined
  try {
    const parsed = new URL(url)
    if (!parsed.searchParams.has('connection_limit')) {
      parsed.searchParams.set('connection_limit', '1')
    }
    if (!parsed.searchParams.has('pool_timeout')) {
      parsed.searchParams.set('pool_timeout', '10')
    }
    return parsed.toString()
  } catch {
    return url
  }
}
