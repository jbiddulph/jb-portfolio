import { PrismaClient } from '@prisma/client'
import { withServerlessConnectionLimit } from '~/lib/prismaRetry'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const DATABASE_URL_FALLBACK_KEYS = [
  'NUXT_DATABASE_URL',
  'PRISMA_DATABASE_URL',
  'POSTGRES_PRISMA_URL',
  'POSTGRES_URL_NON_POOLING',
  'POSTGRES_URL',
  'DATABASE_URL_UNPOOLED',
  'DIRECT_URL'
] as const

const ensureDatabaseUrl = () => {
  if (!process.env.DATABASE_URL?.trim()) {
    const fallbackKey = DATABASE_URL_FALLBACK_KEYS.find((key) => process.env[key]?.trim())
    if (fallbackKey) {
      process.env.DATABASE_URL = process.env[fallbackKey]
      console.warn(`[prisma] Using ${fallbackKey} as DATABASE_URL fallback`)
    }
  }

  // Cap each serverless isolate at one connection so concurrent slug page
  // renders do not exhaust Supabase's session-mode pool (pool_size ≈ 15).
  if (process.env.DATABASE_URL) {
    process.env.DATABASE_URL = withServerlessConnectionLimit(process.env.DATABASE_URL)
  }
}

ensureDatabaseUrl()

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

// Reuse the client across warm isolates in production as well as in dev.
globalForPrisma.prisma = prisma
