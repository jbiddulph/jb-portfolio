import docs from '../data/projectDocs.json'
import { slugify, urlKey } from './portfolioSlug'

/**
 * Long-form public write-ups for each portfolio project.
 * Sourced from data/projectDocs.json (same content as the downloadable PDF).
 *
 * Public product documentation only — never admin-only portfolio fields
 * (domains, hosting, database_info, passwords, private repos, etc.).
 */
export interface ProjectDetails {
  name: string
  period: string
  url: string
  stack: string[]
  summary: string
  purpose?: string
  /** End-to-end behaviour (also used as the legacy "does" narrative). */
  howItWorks?: string
  architecture?: string[]
  features?: string[]
  dataAuth?: string
  integrations?: string[]
  deployment?: string
  related?: { label: string, url: string }[]
  /** Legacy short narrative used by older page sections. */
  does: string
  /** Legacy "what a user can do" list. */
  users: string[]
  aliases?: string[]
}

type DocJson = {
  name: string
  period: string
  url: string
  stack: string[]
  summary: string
  purpose?: string
  howItWorks?: string
  architecture?: string[]
  features?: string[]
  dataAuth?: string
  integrations?: string[]
  deployment?: string
  related?: { label: string, url: string }[]
  does?: string
  users?: string[]
  aliases?: string[]
}

export const PROJECT_DETAILS: ProjectDetails[] = (docs as DocJson[]).map((doc) => ({
  name: doc.name,
  period: doc.period,
  url: doc.url,
  stack: doc.stack || [],
  summary: doc.summary,
  purpose: doc.purpose,
  howItWorks: doc.howItWorks || doc.does,
  architecture: doc.architecture || [],
  features: doc.features || doc.users || [],
  dataAuth: doc.dataAuth,
  integrations: doc.integrations || [],
  deployment: doc.deployment,
  related: doc.related || [],
  does: doc.howItWorks || doc.does || doc.summary,
  users: doc.features || doc.users || [],
  aliases: doc.aliases || []
}))

const byUrl = new Map<string, ProjectDetails>()
const byHost = new Map<string, ProjectDetails[]>()
const bySlug = new Map<string, ProjectDetails>()

for (const entry of PROJECT_DETAILS) {
  const key = urlKey(entry.url)
  byUrl.set(key, entry)
  const host = key.split('/')[0]
  byHost.set(host, [...(byHost.get(host) || []), entry])
  bySlug.set(slugify(entry.name), entry)
  for (const alias of entry.aliases || []) {
    bySlug.set(alias, entry)
  }
}

/**
 * Finds the write-up for a portfolio row. URL match wins because it is the
 * most stable identifier shared between the database and the documentation.
 */
export const findProjectDetails = (item: { project_name: string, project_link?: string | null }): ProjectDetails | null => {
  const key = urlKey(item.project_link)
  if (key) {
    const exact = byUrl.get(key)
    if (exact) return exact
    const hostMatches = byHost.get(key.split('/')[0]) || []
    if (hostMatches.length === 1) return hostMatches[0]
  }

  return bySlug.get(slugify(item.project_name)) || null
}
