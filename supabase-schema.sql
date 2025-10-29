-- Create events table
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date TEXT,
  time TEXT,
  location TEXT,
  organizer TEXT,
  category TEXT CHECK (category IN ('social', 'environment', 'education', 'community')) DEFAULT 'community',
  attendees INTEGER DEFAULT 0,
  max_attendees INTEGER,
  image TEXT,
  images JSONB,
  friends_attending JSONB,
  is_registered BOOLEAN DEFAULT FALSE,
  registration_deadline TEXT,
  cost TEXT,
  restrictions TEXT,
  link TEXT,
  application_type TEXT CHECK (application_type IN ('anmeldung', 'bewerbung')) DEFAULT 'anmeldung',
  city TEXT,
  start_time TEXT,
  end_time TEXT,
  travel_reimbursement TEXT,
  status TEXT CHECK (status IN ('approved', 'pending', 'draft')) DEFAULT 'pending',
  monday_id TEXT, -- Reference to Monday.com item ID
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_category ON events(category);
CREATE INDEX idx_events_start_time ON events(start_time);
CREATE INDEX idx_events_location ON events(location);
CREATE INDEX idx_events_title ON events USING gin(to_tsvector('english', title));
CREATE INDEX idx_events_description ON events USING gin(to_tsvector('english', description));

-- Enable Row Level Security (RLS)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to approved events" ON events
  FOR SELECT USING (status = 'approved');

-- Create policies for authenticated users (for admin interface)
CREATE POLICY "Allow authenticated users to manage events" ON events
  FOR ALL USING (auth.role() = 'authenticated');

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data (optional)
INSERT INTO events (title, description, location, organizer, category, status, start_time, end_time) VALUES
('Sample Event 1', 'This is a sample event description', 'Berlin, Germany', 'Sample Organizer', 'education', 'approved', '2024-02-15', '2024-02-16'),
('Sample Event 2', 'Another sample event', 'Munich, Germany', 'Another Organizer', 'social', 'approved', '2024-02-20', '2024-02-21');
