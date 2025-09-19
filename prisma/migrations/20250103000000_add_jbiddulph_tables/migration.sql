-- CreateTable
CREATE TABLE "jbiddulph_designs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "primary_color" TEXT,
    "secondary_color" TEXT,
    "accent_color" TEXT,
    "background_color" TEXT,
    "text_color" TEXT,
    "font_family" TEXT,
    "heading_font" TEXT,
    "body_font" TEXT,
    "font_size_base" TEXT,
    "font_size_h1" TEXT,
    "font_size_h2" TEXT,
    "font_size_h3" TEXT,
    "font_size_h4" TEXT,
    "font_size_h5" TEXT,
    "font_size_h6" TEXT,
    "container_width" TEXT,
    "sidebar_width" TEXT,
    "header_height" TEXT,
    "footer_height" TEXT,
    "margin_small" TEXT,
    "margin_medium" TEXT,
    "margin_large" TEXT,
    "padding_small" TEXT,
    "padding_medium" TEXT,
    "padding_large" TEXT,
    "border_radius" TEXT,
    "shadow_small" TEXT,
    "shadow_medium" TEXT,
    "shadow_large" TEXT,
    "custom_css" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jbiddulph_designs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jbiddulph_info" (
    "id" SERIAL NOT NULL,
    "site_name" TEXT NOT NULL,
    "site_slogan" TEXT,
    "site_description" TEXT,
    "site_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "site_footer" TEXT,
    "site_image" TEXT,
    "site_avatar" TEXT,
    "design_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jbiddulph_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jbiddulph_links" (
    "id" SERIAL NOT NULL,
    "link_name" TEXT NOT NULL,
    "link_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jbiddulph_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jbiddulph_pages" (
    "id" SERIAL NOT NULL,
    "home" TEXT,
    "cv" TEXT,
    "portfolio" TEXT,
    "documentation" TEXT,
    "blog" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jbiddulph_pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jbiddulph_portfolio" (
    "id" SERIAL NOT NULL,
    "project_name" TEXT NOT NULL,
    "project_date" TIMESTAMP(3) NOT NULL,
    "project_link" TEXT,
    "project_image" TEXT,
    "project_description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jbiddulph_portfolio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "jbiddulph_designs_name_key" ON "jbiddulph_designs"("name");

-- AddForeignKey
ALTER TABLE "jbiddulph_info" ADD CONSTRAINT "jbiddulph_info_design_id_fkey" FOREIGN KEY ("design_id") REFERENCES "jbiddulph_designs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
