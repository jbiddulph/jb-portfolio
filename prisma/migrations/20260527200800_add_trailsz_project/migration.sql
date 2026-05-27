-- Add Trailsz iOS app to portfolio
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
    'Trailsz',
    TIMESTAMP '2026-05-27 00:00:00',
    'https://apps.apple.com/gb/app/trailsz/id6763732208',
    'iOS navigation app for discovering, creating, and sharing interactive trails for walking, cycling, and driving with map notes, mystery stops, and community reports.',
    'iOS, Navigation, Maps, Trails',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1
    FROM "jbiddulph_portfolio"
    WHERE "project_link" = 'https://apps.apple.com/gb/app/trailsz/id6763732208'
);
