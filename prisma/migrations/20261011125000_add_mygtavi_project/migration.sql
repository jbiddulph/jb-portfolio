-- Add myGTAVI project to portfolio
INSERT INTO "jbiddulph_portfolio" (
    "project_name",
    "project_date",
    "project_link",
    "project_image",
    "project_description",
    "project_tags",
    "live",
    "sort_order",
    "created_at",
    "updated_at"
)
SELECT
    'myGTAVI',
    TIMESTAMP '2026-10-11 00:00:00',
    'https://www.mygtavi.com/',
    '/img/mygtavi-screenshot.png',
    'Unofficial GTA VI Leonida companion: interactive fan map with collectible pins, personal progress tracking, crew profiles, community board, and a countdown to launch night. Fan-made — not affiliated with Rockstar Games.',
    'Next.js, Supabase, Maps, Community, Collectibles',
    true,
    0,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1
    FROM "jbiddulph_portfolio"
    WHERE "project_link" IN (
        'https://www.mygtavi.com/',
        'https://www.mygtavi.com',
        'https://mygtavi.com/',
        'https://mygtavi.com'
    )
    OR "project_name" ILIKE 'myGTAVI'
);
