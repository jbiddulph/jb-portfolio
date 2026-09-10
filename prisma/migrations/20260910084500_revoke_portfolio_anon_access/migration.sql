-- Defense in depth: Data API roles must not read or write this table.
-- Public portfolio data is served by the Nuxt/Prisma API, not PostgREST.
REVOKE ALL ON TABLE "jbiddulph_portfolio" FROM anon, authenticated;
