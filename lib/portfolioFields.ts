export const PORTFOLIO_ADMIN_FIELDS = [
  'domains',
  'subdomains',
  'hosting',
  'database_info',
  'ssl',
  'github_repo',
  'passwords',
  'apis_used',
  'documentation',
  'other_info'
] as const

export type PortfolioAdminField = typeof PORTFOLIO_ADMIN_FIELDS[number]

export const PUBLIC_PORTFOLIO_SELECT = {
  id: true,
  project_name: true,
  project_date: true,
  project_link: true,
  project_image: true,
  project_description: true,
  project_tags: true
} as const

export const emptyAdminPortfolioFields = (): Record<PortfolioAdminField, string> => ({
  domains: '',
  subdomains: '',
  hosting: '',
  database_info: '',
  ssl: '',
  github_repo: '',
  passwords: '',
  apis_used: '',
  documentation: '',
  other_info: ''
})

export const pickAdminPortfolioFields = (body: Record<string, unknown>) => {
  const data: Record<PortfolioAdminField, string | null> = emptyAdminPortfolioFields()

  for (const field of PORTFOLIO_ADMIN_FIELDS) {
    const value = body[field]
    if (typeof value !== 'string') {
      data[field] = null
      continue
    }

    const trimmed = value.trim()
    data[field] = trimmed === '' ? null : trimmed
  }

  return data
}

export const normalizeAdminPortfolioFields = (record: Record<string, unknown> | null | undefined) => {
  const fields = emptyAdminPortfolioFields()
  if (!record) {
    return fields
  }

  for (const field of PORTFOLIO_ADMIN_FIELDS) {
    const value = record[field]
    fields[field] = typeof value === 'string' ? value : ''
  }

  return fields
}
