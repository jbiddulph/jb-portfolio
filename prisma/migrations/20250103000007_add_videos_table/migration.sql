-- CreateTable
CREATE TABLE "jbiddulph_videos" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "youtube_url" TEXT NOT NULL,
    "link" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "jbiddulph_videos_pkey" PRIMARY KEY ("id")
);

-- Add trigger to update updated_at on row update
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_jbiddulph_videos_updated_at BEFORE UPDATE ON jbiddulph_videos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

