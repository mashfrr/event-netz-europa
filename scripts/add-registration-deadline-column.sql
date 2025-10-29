-- Add missing registration_deadline column to events table
-- Run this in your Supabase SQL Editor

ALTER TABLE events ADD COLUMN IF NOT EXISTS registration_deadline TEXT;

-- Update existing events with proper date mapping
-- This will be handled by the corrected migration script

