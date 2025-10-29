-- Add the description column back to the events table
ALTER TABLE events ADD COLUMN description TEXT;

-- Update the description column to match the title (since you wanted title = description)
UPDATE events SET description = title;

