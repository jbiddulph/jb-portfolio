import { computed, onMounted, onUnmounted } from 'vue'
import { mix, mutedColor, onColor, parseColor, readableColor } from '~/lib/colorContrast'

export interface SiteDesign {
  [key: string]: any
}

export interface SiteInfo {
  id?: number
  site_name?: string | null
  site_slogan?: string | null
  site_description?: string | null
  site_footer?: string | null
  site_image?: string | null
  site_avatar?: string | null
  design?: SiteDesign | null
}

export const DESIGN_DEFAULTS = {
  primary_color: '#2563eb',
  secondary_color: '#1e40af',
  accent_color: '#3b82f6',
  background_color: '#ffffff',
  text_color: '#1f2937',
  font_family: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
  heading_font: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
  font_size_base: '16px',
  font_size_h1: '2.75rem',
  font_size_h2: '2rem',
  font_size_h3: '1.5rem',
  font_size_h4: '1.25rem',
  site_name_size_desktop: '1.125rem',
  site_name_size_mobile: '1rem',
  site_description_size_desktop: '0.8125rem',
  site_description_size_mobile: '0.75rem',
  header_height: '72px',
  border_radius: '16px',
  border_thickness: '1px',
  border_style: 'solid',
  shadow_small: '0 1px 2px rgba(15, 23, 42, 0.06)',
  shadow_medium: '0 8px 24px -12px rgba(15, 23, 42, 0.18)',
  shadow_large: '0 24px 48px -20px rgba(15, 23, 42, 0.28)'
}

const parseGoogleFonts = (design?: SiteDesign | null): { primary?: string; heading?: string } => {
  if (!design?.google_fonts) return {}
  try {
    const parsed = JSON.parse(design.google_fonts)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch (error) {
    console.error('Error parsing Google Fonts:', error)
    return {}
  }
}

export const resolveFontFamily = (design: SiteDesign | null | undefined, fontType: 'primary' | 'heading' = 'primary') => {
  const fallback = fontType === 'heading'
    ? (design?.heading_font || design?.font_family || DESIGN_DEFAULTS.heading_font)
    : (design?.font_family || DESIGN_DEFAULTS.font_family)

  const googleFonts = parseGoogleFonts(design)
  if (fontType === 'heading' && googleFonts.heading) {
    return `"${googleFonts.heading}", ${fallback}`
  }
  if (googleFonts.primary) {
    return `"${googleFonts.primary}", ${fallback}`
  }
  return fallback
}

const pick = (design: SiteDesign | null | undefined, key: keyof typeof DESIGN_DEFAULTS) => {
  const value = design?.[key]
  return value && String(value).trim() ? String(value) : DESIGN_DEFAULTS[key]
}

export const buildDesignCssVars = (design: SiteDesign | null | undefined): Record<string, string> => {
  const cardBackground = design?.portfolio_card_background_color && String(design.portfolio_card_background_color).trim()
    ? String(design.portfolio_card_background_color)
    : 'var(--color-bg)'

  const primary = pick(design, 'primary_color')
  const accent = pick(design, 'accent_color')
  const background = pick(design, 'background_color')
  const text = pick(design, 'text_color')
  // Text sits on the page, on cards (which may have their own colour) and on
  // tinted pills (~8% text over the page). Derived text colours are adjusted
  // only when the chosen palette would fail WCAG AA on one of those surfaces.
  const cardSurface = parseColor(cardBackground) ? cardBackground : background
  const surfaces = [background, cardSurface, mix(text, background, 0.08)]
  const chipSurfaces = [...surfaces, mix(accent, background, 0.14), mix(accent, cardSurface, 0.14)]
  const primaryInk = readableColor(primary, surfaces, 4.5)

  return {
    '--color-primary': primary,
    '--color-primary-ink': primaryInk,
    '--color-on-primary': onColor(primaryInk),
    '--color-secondary': pick(design, 'secondary_color'),
    '--color-accent': accent,
    '--color-accent-text': readableColor(accent, chipSurfaces, 4.5),
    '--color-bg': background,
    '--color-text': text,
    '--color-muted': mutedColor(text, background, surfaces),
    '--color-card': cardBackground,
    '--font-body': resolveFontFamily(design, 'primary'),
    '--font-heading': resolveFontFamily(design, 'heading'),
    '--fs-base': pick(design, 'font_size_base'),
    '--fs-h1': pick(design, 'font_size_h1'),
    '--fs-h2': pick(design, 'font_size_h2'),
    '--fs-h3': pick(design, 'font_size_h3'),
    '--fs-h4': pick(design, 'font_size_h4'),
    '--fs-site-name': pick(design, 'site_name_size_desktop'),
    '--fs-site-name-mobile': pick(design, 'site_name_size_mobile'),
    '--fs-site-tagline': pick(design, 'site_description_size_desktop'),
    '--fs-site-tagline-mobile': pick(design, 'site_description_size_mobile'),
    '--header-h': pick(design, 'header_height'),
    '--radius': pick(design, 'border_radius'),
    '--border-w': pick(design, 'border_thickness'),
    '--border-style': pick(design, 'border_style'),
    '--shadow-sm': pick(design, 'shadow_small'),
    '--shadow-md': pick(design, 'shadow_medium'),
    '--shadow-lg': pick(design, 'shadow_large')
  }
}

/**
 * Shared, read-only access to the site info + active design.
 * Safe to call from any component; the layout is responsible for loading it
 * via `useSiteDesignProvider()`.
 */
export const useSiteDesign = () => {
  const siteInfo = useState<SiteInfo | null>('site-design:info', () => null)
  const loaded = useState<boolean>('site-design:loaded', () => false)

  const design = computed(() => siteInfo.value?.design ?? null)
  const siteName = computed(() => siteInfo.value?.site_name || 'John Biddulph')
  const isOneColumnLayout = computed(() => design.value?.layout_columns === '1')

  const getFontFamily = (fontType: 'primary' | 'heading' = 'primary') => resolveFontFamily(design.value, fontType)

  return {
    siteInfo,
    design,
    loaded,
    siteName,
    isOneColumnLayout,
    getFontFamily
  }
}

/**
 * Loads the site info (and the visitor's preferred design), exposes the
 * resulting design tokens as CSS custom properties on <html>, and keeps
 * Google Fonts / custom CSS in sync. Call once, from the layout.
 */
export const useSiteDesignProvider = () => {
  const { siteInfo, design, loaded } = useSiteDesign()
  const { userDesignId } = useUserDesign()

  const cssVars = computed(() => buildDesignCssVars(design.value))
  const htmlStyle = computed(() =>
    Object.entries(cssVars.value).map(([key, value]) => `${key}: ${value}`).join('; ')
  )

  const googleFontHref = computed(() => {
    const fonts = parseGoogleFonts(design.value)
    const families = [fonts.primary, fonts.heading]
      .filter((font, index, all): font is string => !!font && all.indexOf(font) === index)
    if (!families.length) return null
    const query = families
      .map((font) => `family=${encodeURIComponent(font).replace(/%20/g, '+')}:wght@300;400;500;600;700`)
      .join('&')
    return `https://fonts.googleapis.com/css2?${query}&display=swap`
  })

  useHead({
    htmlAttrs: {
      style: htmlStyle
    },
    link: computed(() => googleFontHref.value
      ? [
          { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
          { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
          { key: 'site-google-fonts', rel: 'stylesheet', href: googleFontHref.value }
        ]
      : []),
    style: computed(() => design.value?.custom_css
      ? [{ key: 'custom-design-css', innerHTML: design.value.custom_css }]
      : [])
  })

  const dedupe = useInflight()

  const fetchDesignOverride = async (): Promise<SiteDesign | null> => {
    if (!userDesignId.value) return null
    try {
      const response: any = await $fetch(`/api/designs/${userDesignId.value}`)
      return response?.success && response.data ? response.data : null
    } catch (error) {
      console.error('Error fetching user design:', error)
      return null
    }
  }

  /**
   * Runs during SSR (so the first HTML already carries the right colours,
   * fonts and branding) and again on the client only if that did not finish
   * within the SSR budget.
   */
  const load = async (force = false) => {
    if (loaded.value && !force) return

    return dedupe('site-info', async () => {
      try {
        const [response, designOverride] = await guarded(Promise.all([
          $fetch('/api/site-info') as Promise<any>,
          fetchDesignOverride()
        ]))
        const base: SiteInfo | null = response?.data ?? null
        siteInfo.value = base && designOverride ? { ...base, design: designOverride } : base
        loaded.value = true
      } catch (error) {
        if (import.meta.server) {
          console.warn('Site info not ready during SSR, deferring to client:', (error as Error)?.message)
        } else {
          console.error('Error fetching site info:', error)
          loaded.value = true
        }
      }
    })
  }

  const handleThemeChange = () => {
    load(true)
  }

  onMounted(() => {
    load()
    window.addEventListener('theme-changed', handleThemeChange)
  })

  onUnmounted(() => {
    window.removeEventListener('theme-changed', handleThemeChange)
  })

  return {
    siteInfo,
    design,
    loaded,
    cssVars,
    load
  }
}
