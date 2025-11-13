-- Add missing columns to the existing events table
-- Run this in your Supabase SQL Editor

-- Add missing columns one by one
ALTER TABLE events ADD COLUMN IF NOT EXISTS attendees INTEGER DEFAULT 0;
ALTER TABLE events ADD COLUMN IF NOT EXISTS max_attendees INTEGER;
ALTER TABLE events ADD COLUMN IF NOT EXISTS image TEXT;
ALTER TABLE events ADD COLUMN IF NOT EXISTS images JSONB;
ALTER TABLE events ADD COLUMN IF NOT EXISTS friends_attending JSONB;
ALTER TABLE events ADD COLUMN IF NOT EXISTS is_registered BOOLEAN DEFAULT FALSE;
ALTER TABLE events ADD COLUMN IF NOT EXISTS registration_deadline TEXT;
ALTER TABLE events ADD COLUMN IF NOT EXISTS cost TEXT;
ALTER TABLE events ADD COLUMN IF NOT EXISTS restrictions TEXT;
ALTER TABLE events ADD COLUMN IF NOT EXISTS link TEXT;
ALTER TABLE events ADD COLUMN IF NOT EXISTS application_type TEXT DEFAULT 'anmeldung';
ALTER TABLE events ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE events ADD COLUMN IF NOT EXISTS start_time TEXT;
ALTER TABLE events ADD COLUMN IF NOT EXISTS end_time TEXT;
ALTER TABLE events ADD COLUMN IF NOT EXISTS travel_reimbursement TEXT;
ALTER TABLE events ADD COLUMN IF NOT EXISTS monday_id TEXT;

-- Add constraints if they don't exist
DO $$ 
BEGIN
    -- Add category constraint
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'events_category_check') THEN
        ALTER TABLE events ADD CONSTRAINT events_category_check 
        CHECK (category IN ('social', 'environment', 'education', 'community'));
    END IF;
    
    -- Add application_type constraint
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'events_application_type_check') THEN
        ALTER TABLE events ADD CONSTRAINT events_application_type_check 
        CHECK (application_type IN ('anmeldung', 'bewerbung'));
    END IF;
    
    -- Add status constraint
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'events_status_check') THEN
        ALTER TABLE events ADD CONSTRAINT events_status_check 
        CHECK (status IN ('approved', 'pending', 'draft'));
    END IF;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);
CREATE INDEX IF NOT EXISTS idx_events_start_time ON events(start_time);
CREATE INDEX IF NOT EXISTS idx_events_location ON events(location);

-- Enable Row Level Security (RLS) if not already enabled
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create policies if they don't exist
DO $$ 
BEGIN
    -- Drop existing policies if they exist
    DROP POLICY IF EXISTS "Allow public read access to approved events" ON events;
    DROP POLICY IF EXISTS "Allow authenticated users to manage events" ON events;
    
    -- Create new policies
    CREATE POLICY "Allow public read access to approved events" ON events
      FOR SELECT USING (status = 'approved');
    
    CREATE POLICY "Allow authenticated users to manage events" ON events
      FOR ALL USING (auth.role() = 'authenticated');
END $$;

