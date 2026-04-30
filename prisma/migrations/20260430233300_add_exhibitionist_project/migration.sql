-- Add exhibitionist.me project to portfolio
INSERT INTO "jbiddulph_portfolio" (
    "project_name",
    "project_date",
    "project_link",
    "project_description",
    "project_tags",
    "created_at",
    "updated_at"
)
SELECT
    'Exhibitionist.me',
    TIMESTAMP '2026-04-30 00:00:00',
    'https://www.exhibitionist.me',
    'Social cam and chat starter app with support for live public/private broadcasts and broadcaster previews.',
    'Nuxt, Live Streaming, Chat, Real-time',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1
    FROM "jbiddulph_portfolio"
    WHERE "project_link" = 'https://www.exhibitionist.me'
);
