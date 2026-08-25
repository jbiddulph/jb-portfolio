-- Add Lucidity project to portfolio
INSERT INTO "jbiddulph_portfolio" (
    "project_name",
    "project_date",
    "project_link",
    "project_image",
    "project_description",
    "project_tags",
    "created_at",
    "updated_at"
)
SELECT
    'Lucidity',
    TIMESTAMP '2026-08-25 00:00:00',
    'https://lucidity-lac.vercel.app',
    '/img/lucidity-screenshot.png',
    'A headless CMS with structured content, drafts, and API keys for your Nuxt, Next.js, React, Vue, or Svelte site — powered by Nuxt, Supabase, and Prisma.',
    'Nuxt, CMS, Headless, Supabase, Prisma, API',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1
    FROM "jbiddulph_portfolio"
    WHERE "project_link" = 'https://lucidity-lac.vercel.app'
);
