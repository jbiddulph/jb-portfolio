import { computed } from 'vue'

export interface SiteLink {
  id: number
  link_name: string
  link_url: string
}

export interface SitePages {
  home?: string | null
  cv?: string | null
  portfolio?: string | null
  documentation?: string | null
  blog?: string | null
}

export interface PortfolioItem {
  id: number
  project_name: string
  project_date: string
  project_link?: string | null
  project_image?: string | null
  project_description?: string | null
  project_tags?: string | null
}

export interface VideoItem {
  id: number
  title: string
  description?: string | null
  youtube_url: string
  link?: string | null
}

const HIDDEN_NAV_LINK_NAMES = ['CV (PDF)', 'CV (DOC)']

const inflight = new Map<string, Promise<void>>()

const dedupe = (key: string, task: () => Promise<void>) => {
  const existing = inflight.get(key)
  if (existing) return existing
  const promise = task().finally(() => inflight.delete(key))
  inflight.set(key, promise)
  return promise
}

/**
 * Social / external links managed in the admin.
 */
export const useSiteLinks = () => {
  const links = useState<SiteLink[]>('site-links', () => [])
  const loaded = useState<boolean>('site-links:loaded', () => false)

  const load = async (force = false) => {
    if (!process.client || (loaded.value && !force)) return
    return dedupe('links', async () => {
      try {
        const response: any = await $fetch('/api/links')
        links.value = response?.data || []
      } catch (error) {
        console.error('Error fetching links:', error)
      } finally {
        loaded.value = true
      }
    })
  }

  const navLinks = computed(() => links.value.filter((link) => !HIDDEN_NAV_LINK_NAMES.includes(link.link_name)))

  return { links, navLinks, loaded, load }
}

/**
 * Editable page headings (home, portfolio, ...).
 */
export const useSitePages = () => {
  const pages = useState<SitePages | null>('site-pages', () => null)
  const loaded = useState<boolean>('site-pages:loaded', () => false)

  const load = async (force = false) => {
    if (!process.client || (loaded.value && !force)) return
    return dedupe('pages', async () => {
      try {
        const response: any = await $fetch('/api/pages')
        pages.value = response?.data || null
      } catch (error) {
        console.error('Error fetching pages:', error)
      } finally {
        loaded.value = true
      }
    })
  }

  return { pages, loaded, load }
}

/**
 * Public portfolio list, with the same timeout + retry protection the home
 * page used to implement inline.
 */
export const usePortfolioList = () => {
  const portfolio = useState<PortfolioItem[]>('portfolio-list', () => [])
  const loading = useState<boolean>('portfolio-list:loading', () => false)
  const loaded = useState<boolean>('portfolio-list:loaded', () => false)
  const failed = useState<boolean>('portfolio-list:failed', () => false)

  const fetchWithTimeout = (timeoutMs: number) => {
    const timeout = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
    })
    return Promise.race([$fetch('/api/portfolio') as Promise<any>, timeout])
  }

  const load = async (force = false) => {
    if (!process.client || (loaded.value && !force)) return
    return dedupe('portfolio', async () => {
      loading.value = true
      failed.value = false
      const maxAttempts = 3

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          const response = await fetchWithTimeout(10000)
          if (response?.success && Array.isArray(response.data)) {
            portfolio.value = response.data
          } else {
            portfolio.value = []
          }
          failed.value = false
          break
        } catch (error) {
          console.error(`Error fetching portfolio (attempt ${attempt}):`, error)
          if (attempt === maxAttempts) {
            portfolio.value = []
            failed.value = true
          } else {
            await new Promise((resolve) => setTimeout(resolve, 2000))
          }
        }
      }

      loading.value = false
      loaded.value = true
    })
  }

  return { portfolio, loading, loaded, failed, load }
}

export const useVideoList = () => {
  const videos = useState<VideoItem[]>('video-list', () => [])
  const loaded = useState<boolean>('video-list:loaded', () => false)

  const load = async (force = false) => {
    if (!process.client || (loaded.value && !force)) return
    return dedupe('videos', async () => {
      try {
        const response: any = await $fetch('/api/videos')
        videos.value = response?.success && Array.isArray(response.data) ? response.data : []
      } catch (error) {
        console.error('Error fetching videos:', error)
        videos.value = []
      } finally {
        loaded.value = true
      }
    })
  }

  return { videos, loaded, load }
}

/* Shared helpers ------------------------------------------------------- */

export const splitTags = (tags?: string | null) =>
  (tags || '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)

export const stripHtml = (value?: string | null) =>
  (value || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()

export const formatProjectDate = (value?: string | Date | null, options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' }) => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-GB', options)
}

export const getProjectHref = (item: Pick<PortfolioItem, 'id' | 'project_link'>) =>
  item.project_link || `/portfolio/${item.id}`

export const isExternalProject = (item: Pick<PortfolioItem, 'project_link'>) => !!item.project_link

export const getYouTubeEmbedUrl = (url?: string | null) => {
  if (!url) return null
  const match = url.match(/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/)
  const id = match && match[2]?.length === 11 ? match[2] : null
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : null
}
