-- Add helloj.vercel.app project to portfolio
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
    'HelloJ',
    TIMESTAMP '2026-05-27 00:00:00',
    'https://helloj.vercel.app/',
    'AI virtual try-on app for uploading or capturing photos, choosing reference outfits, browsing Vinted items, and generating styled outfit previews.',
    'AI, Virtual Try-On, Fashion, Image Generation',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1
    FROM "jbiddulph_portfolio"
    WHERE "project_link" = 'https://helloj.vercel.app/'
);
