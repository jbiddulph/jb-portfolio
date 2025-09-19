-- Add text sizes and layout options to jbiddulph_designs table
ALTER TABLE "public"."jbiddulph_designs" ADD COLUMN "site_name_size_desktop" TEXT;
ALTER TABLE "public"."jbiddulph_designs" ADD COLUMN "site_name_size_mobile" TEXT;
ALTER TABLE "public"."jbiddulph_designs" ADD COLUMN "site_description_size_desktop" TEXT;
ALTER TABLE "public"."jbiddulph_designs" ADD COLUMN "site_description_size_mobile" TEXT;
ALTER TABLE "public"."jbiddulph_designs" ADD COLUMN "layout_columns" TEXT DEFAULT '2';
