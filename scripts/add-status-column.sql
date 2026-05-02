-- Add status column to events table
-- Run this in your Supabase SQL Editor

ALTER TABLE events ADD COLUMN IF NOT EXISTS status TEXT;

-- Update existing events with status information
-- This will be handled by the updated migration script

