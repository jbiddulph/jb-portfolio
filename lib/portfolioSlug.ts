/**
 * Portfolio items are addressed publicly by a slug derived from their name,
 * e.g. "Tripz (iOS)" -> "tripz-ios". Slugs are computed rather than stored so
 * no schema change is needed and renaming a project in the admin keeps working.
 */
export const slugify = (value: string) =>
  value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const projectSlug = (item: { id: number, project_name: string }) =>
  slugify(item.project_name) || String(item.id)

export const isNumericId = (value: string) => /^\d+$/.test(value)

/**
 * Normalises a URL so the same site can be matched regardless of protocol,
 * "www." prefix or trailing slash.
 */
export const urlKey = (value?: string | null) => {
  if (!value) return ''
  try {
    const url = new URL(value.trim())
    const host = url.hostname.replace(/^www\./, '')
    const path = url.pathname.replace(/\/+$/, '')
    return `${host}${path}`.toLowerCase()
  } catch {
    return value.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/+$/, '')
  }
}
