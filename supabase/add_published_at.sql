-- Add published_at column to video_links table
-- This column stores the YouTube/Vimeo upload date for proper sorting

ALTER TABLE video_links
ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_video_links_published_at
ON video_links(published_at DESC NULLS LAST);

-- Update existing records to use created_at as default
UPDATE video_links
SET published_at = created_at
WHERE published_at IS NULL;
