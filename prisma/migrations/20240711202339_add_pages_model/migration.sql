-- CreateTable
CREATE TABLE "Delias" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "size" TEXT,
    "category" TEXT,
    "file" TEXT,
    "artistNotes" TEXT,
    "price" INTEGER,
    "isfeatured" INTEGER NOT NULL DEFAULT 0,
    "islive" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Delias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Galleries" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "size" TEXT,
    "category" TEXT,
    "file" TEXT,
    "artistNotes" TEXT,
    "price" INTEGER,
    "isfeatured" INTEGER NOT NULL DEFAULT 0,
    "islive" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Galleries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Items" (
    "id" SERIAL NOT NULL,
    "item_name" TEXT NOT NULL,
    "item_description" TEXT NOT NULL,
    "item_pic" TEXT,
    "item_status" TEXT NOT NULL,
    "item_type" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "reported_on" TEXT NOT NULL,
    "reported_at" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JB_Pages" (
    "id" SERIAL NOT NULL,
    "page_name" TEXT NOT NULL,
    "page_description" TEXT NOT NULL,
    "page_pic" TEXT,
    "page_status" TEXT NOT NULL,
    "created_on" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "JB_Pages_pkey" PRIMARY KEY ("id")
);
