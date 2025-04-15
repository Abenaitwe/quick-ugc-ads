
-- This will be automatically executed when the edge function is deployed
-- Create a storage bucket for processed videos if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('processed-videos', 'processed-videos', true)
ON CONFLICT (id) DO NOTHING;

-- Set up a policy to allow public read access to processed videos
CREATE POLICY "Public Access" ON storage.objects
    FOR SELECT
    USING (bucket_id = 'processed-videos');
