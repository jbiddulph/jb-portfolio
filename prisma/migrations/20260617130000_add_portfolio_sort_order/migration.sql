ALTER TABLE "jbiddulph_portfolio" ADD COLUMN IF NOT EXISTS "sort_order" INTEGER NOT NULL DEFAULT 0;

WITH ranked AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY project_date DESC, id DESC) AS rn
  FROM jbiddulph_portfolio
)
UPDATE jbiddulph_portfolio p
SET sort_order = ranked.rn
FROM ranked
WHERE p.id = ranked.id;
