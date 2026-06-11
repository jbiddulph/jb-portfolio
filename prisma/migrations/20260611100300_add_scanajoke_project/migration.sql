-- Add Scanajoke project to portfolio
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
    'Scanajoke',
    TIMESTAMP '2026-06-11 00:00:00',
    'https://scanajoke-9g4j.vercel.app',
    'Browser-based AI pun generator that scans receipts, signs, pages, notes, or screenshots, extracts text locally, and uses OpenAI to turn the result into a quick joke or pun.',
    'AI, OCR, OpenAI, Browser App',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1
    FROM "jbiddulph_portfolio"
    WHERE "project_link" = 'https://scanajoke-9g4j.vercel.app'
);
