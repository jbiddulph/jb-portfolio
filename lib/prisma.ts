import { PrismaClient } from '@prisma/client'

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
  if (process.env.DATABASE_URL?.trim()) {
    return
  }

  const fallbackKey = DATABASE_URL_FALLBACK_KEYS.find((key) => process.env[key]?.trim())
  if (!fallbackKey) {
    return
  }

  process.env.DATABASE_URL = process.env[fallbackKey]
  console.warn(`[prisma] Using ${fallbackKey} as DATABASE_URL fallback`)
}

ensureDatabaseUrl()

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
