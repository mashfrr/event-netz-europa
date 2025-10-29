-- Update the categories column to accept German category names
-- This will allow direct copying from Monday.com

-- First, drop the existing enum constraint
ALTER TABLE events DROP CONSTRAINT IF EXISTS events_categories_check;

-- Update the categories column to be a text array instead of enum array
ALTER TABLE events ALTER COLUMN categories TYPE text[] USING categories::text[];

-- Now we can store any text values, including German names like:
-- ["Bildung"]
-- ["Erasmus"] 
-- ["Bildung", "Erasmus"]
-- ["Umwelt/Nachhaltigkeit"]
-- ["Technologie/Innovation", "Wirtschaft/Unternehmertum"]

-- The column will now accept direct copies from Monday.com without transformation

