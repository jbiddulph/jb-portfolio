/**
 * Blog posts are stored as `content/blog/DD-MM-YY.md`. Derive a date from the
 * frontmatter when present, otherwise from the filename.
 */
export const postDate = (doc: { date?: string; _path?: string } | null | undefined): Date | null => {
  if (!doc) return null

  if (doc.date) {
    const parsed = new Date(doc.date)
    if (!Number.isNaN(parsed.getTime())) return parsed
  }

  const slug = doc._path?.split('/').pop() || ''
  const match = slug.match(/^(\d{2})-(\d{2})-(\d{2,4})$/)
  if (!match) return null

  const [, day, month, year] = match
  const fullYear = year.length === 2 ? 2000 + Number(year) : Number(year)
  const parsed = new Date(Date.UTC(fullYear, Number(month) - 1, Number(day)))
  return Number.isNaN(parsed.getTime()) ? null : parsed
}
