import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'node:crypto'

const PREFIX = 'enc:v1:'
const KEY_SALT = 'jbiddulph-portfolio-passwords'

const getKey = () => {
  let fromConfig = ''
  try {
    fromConfig = String(useRuntimeConfig().portfolioSecretsKey || '')
  } catch {
    fromConfig = ''
  }

  const secret = fromConfig
    || process.env.PORTFOLIO_SECRETS_KEY
    || process.env.NUXT_PORTFOLIO_SECRETS_KEY
    || process.env.SUPABASE_SERVICE_ROLE_KEY
    || process.env.SUPABASE_KEY

  if (!secret) {
    return null
  }

  return scryptSync(secret, KEY_SALT, 32)
}

export const encryptSecret = (plaintext: string | null) => {
  if (plaintext === null) {
    return null
  }

  const key = getKey()
  if (!key) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Portfolio secret key is not configured'
    })
  }

  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', key, iv)
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()

  return `${PREFIX}${iv.toString('base64')}:${tag.toString('base64')}:${encrypted.toString('base64')}`
}

export const decryptSecret = (value: string | null) => {
  if (value === null) {
    return null
  }

  if (!value.startsWith(PREFIX)) {
    return value
  }

  const key = getKey()
  if (!key) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Portfolio secret key is not configured'
    })
  }

  const payload = value.slice(PREFIX.length)
  const [ivB64, tagB64, dataB64] = payload.split(':')
  if (!ivB64 || !tagB64 || !dataB64) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Stored password payload is invalid'
    })
  }

  const decipher = createDecipheriv('aes-256-gcm', key, Buffer.from(ivB64, 'base64'))
  decipher.setAuthTag(Buffer.from(tagB64, 'base64'))
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(dataB64, 'base64')),
    decipher.final()
  ])

  return decrypted.toString('utf8')
}
