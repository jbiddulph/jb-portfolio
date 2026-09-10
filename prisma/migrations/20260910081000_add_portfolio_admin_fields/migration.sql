-- Admin-only operational details for portfolio projects.
-- Public site APIs must not select these columns.
ALTER TABLE "jbiddulph_portfolio"
  ADD COLUMN IF NOT EXISTS "domains" TEXT,
  ADD COLUMN IF NOT EXISTS "subdomains" TEXT,
  ADD COLUMN IF NOT EXISTS "hosting" TEXT,
  ADD COLUMN IF NOT EXISTS "database_info" TEXT,
  ADD COLUMN IF NOT EXISTS "ssl" TEXT,
  ADD COLUMN IF NOT EXISTS "github_repo" TEXT,
  ADD COLUMN IF NOT EXISTS "passwords" TEXT,
  ADD COLUMN IF NOT EXISTS "apis_used" TEXT,
  ADD COLUMN IF NOT EXISTS "documentation" TEXT,
  ADD COLUMN IF NOT EXISTS "other_info" TEXT;

COMMENT ON COLUMN "jbiddulph_portfolio"."domains" IS 'Admin-only: domains associated with this project';
COMMENT ON COLUMN "jbiddulph_portfolio"."subdomains" IS 'Admin-only: subdomains associated with this project';
COMMENT ON COLUMN "jbiddulph_portfolio"."hosting" IS 'Admin-only: hosting provider / details';
COMMENT ON COLUMN "jbiddulph_portfolio"."database_info" IS 'Admin-only: database provider / details';
COMMENT ON COLUMN "jbiddulph_portfolio"."ssl" IS 'Admin-only: SSL certificate / provider details';
COMMENT ON COLUMN "jbiddulph_portfolio"."github_repo" IS 'Admin-only: GitHub repository URL or path';
COMMENT ON COLUMN "jbiddulph_portfolio"."passwords" IS 'Admin-only: credentials for the project owner';
COMMENT ON COLUMN "jbiddulph_portfolio"."apis_used" IS 'Admin-only: third-party APIs used by this project';
COMMENT ON COLUMN "jbiddulph_portfolio"."documentation" IS 'Admin-only: documentation links and notes';
COMMENT ON COLUMN "jbiddulph_portfolio"."other_info" IS 'Admin-only: other operational notes';

-- Keep these columns off the Supabase Data API roles even if table-level SELECT is granted later.
REVOKE ALL (
  "domains",
  "subdomains",
  "hosting",
  "database_info",
  "ssl",
  "github_repo",
  "passwords",
  "apis_used",
  "documentation",
  "other_info"
) ON TABLE "jbiddulph_portfolio" FROM anon, authenticated;
