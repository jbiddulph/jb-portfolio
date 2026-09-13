import { computed, type Ref } from 'vue'
import type { PortfolioAdminField } from '~/lib/portfolioFields'
import { projectSlug } from '~/lib/portfolioSlug'
import type { ProjectDetails } from '~/lib/projectDetails'

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
  slug?: string
  project_name: string
  project_date: string
  project_link?: string | null
  project_image?: string | null
  project_description?: string | null
  project_tags?: string | null
}

export interface PortfolioDetail extends PortfolioItem {
  slug: string
  details: ProjectDetails | null
}

export interface PortfolioAdminInfo extends Record<PortfolioAdminField, string> {
  id: number
  live?: boolean
  sort_order?: number | null
  created_at?: string | null
  updated_at?: string | null
}

export interface VideoItem {
  id: number
  title: string
  description?: string | null
  youtube_url: string
  link?: string | null
}

const HIDDEN_NAV_LINK_NAMES = ['CV (PDF)', 'CV (DOC)']

/**
 * Builds a loader that runs during SSR (time-boxed, see utils/ssrLoad) and,
 * if that did not complete, again on the client after hydration. Pages await
 * `load()` at the top of their setup so the data is in the first HTML.
 */
const useSharedLoader = (key: string, run: () => Promise<void>, loaded: Ref<boolean>) => {
  const dedupe = useInflight()

  return async (force = false) => {
    if (loaded.value && !force) return
    return dedupe(key, async () => {
      try {
        await run()
        loaded.value = true
      } catch (error) {
        if (import.meta.server) {
          console.warn(`${key} not ready during SSR, deferring to client:`, (error as Error)?.message)
        } else {
          console.error(`Error fetching ${key}:`, error)
          loaded.value = true
        }
      }
    })
  }
}

/**
 * Social / external links managed in the admin.
 */
export const useSiteLinks = () => {
  const links = useState<SiteLink[]>('site-links', () => [])
  const loaded = useState<boolean>('site-links:loaded', () => false)

  const load = useSharedLoader('links', async () => {
    const response: any = await guarded($fetch('/api/links'))
    links.value = response?.data || []
  }, loaded)

  const navLinks = computed(() => links.value.filter((link) => !HIDDEN_NAV_LINK_NAMES.includes(link.link_name)))

  return { links, navLinks, loaded, load }
}

/**
 * Editable page headings (home, portfolio, ...).
 */
export const useSitePages = () => {
  const pages = useState<SitePages | null>('site-pages', () => null)
  const loaded = useState<boolean>('site-pages:loaded', () => false)

  const load = useSharedLoader('pages', async () => {
    const response: any = await guarded($fetch('/api/pages'))
    pages.value = response?.data || null
  }, loaded)

  return { pages, loaded, load }
}

/**
 * Public portfolio list. Fetched once during SSR; in the browser it keeps the
 * timeout + retry protection the home page used to implement inline.
 */
export const usePortfolioList = () => {
  const portfolio = useState<PortfolioItem[]>('portfolio-list', () => [])
  const loading = useState<boolean>('portfolio-list:loading', () => false)
  const loaded = useState<boolean>('portfolio-list:loaded', () => false)
  const failed = useState<boolean>('portfolio-list:failed', () => false)

  const fetchOnce = async () => {
    const response: any = await guarded($fetch('/api/portfolio'), 10000)
    portfolio.value = response?.success && Array.isArray(response.data) ? response.data : []
  }

  const load = useSharedLoader('portfolio', async () => {
    loading.value = true
    failed.value = false
    const maxAttempts = import.meta.server ? 1 : 3

    try {
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          await fetchOnce()
          return
        } catch (error) {
          if (attempt === maxAttempts) {
            if (import.meta.client) {
              portfolio.value = []
              failed.value = true
            }
            throw error
          }
          console.error(`Error fetching portfolio (attempt ${attempt}):`, error)
          await new Promise((resolve) => setTimeout(resolve, 2000))
        }
      }
    } finally {
      loading.value = false
    }
  }, loaded)

  return { portfolio, loading, loaded, failed, load }
}

export const useVideoList = () => {
  const videos = useState<VideoItem[]>('video-list', () => [])
  const loaded = useState<boolean>('video-list:loaded', () => false)

  const load = useSharedLoader('videos', async () => {
    const response: any = await guarded($fetch('/api/videos'))
    videos.value = response?.success && Array.isArray(response.data) ? response.data : []
  }, loaded)

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

export const getProjectSlug = (item: Pick<PortfolioItem, 'id' | 'slug' | 'project_name'>) =>
  item.slug || projectSlug(item)

/** Internal detail page for a project. The live site is linked separately. */
export const getProjectHref = (item: Pick<PortfolioItem, 'id' | 'slug' | 'project_name'>) =>
  `/portfolio/${getProjectSlug(item)}`

export const prettyUrl = (value?: string | null) =>
  (value || '').replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '')

export const getYouTubeEmbedUrl = (url?: string | null) => {
  if (!url) return null
  const match = url.match(/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/)
  const id = match && match[2]?.length === 11 ? match[2] : null
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : null
}
