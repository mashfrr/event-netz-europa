import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://suztxzbqekxqtvntjhct.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1enR4emJxZWt4cXR2bnRqaGN0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDA5NDM4OSwiZXhwIjoyMDc1NjcwMzg5fQ.UM1EgHy9gKKqJdTrF89AbLG2o9m-o659LdArkrEy5sg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Event {
  id: string
  title: string
  description?: string
  date?: string
  time?: string
  location?: string
  organizer?: string
  category?: 'social' | 'environment' | 'education' | 'community'
  attendees?: number
  max_attendees?: number
  image?: string
  images?: string[]
  friends_attending?: string[]
  is_registered?: boolean
  registration_deadline?: string
  cost?: string
  restrictions?: string
  link?: string
  application_type?: 'anmeldung' | 'bewerbung'
  city?: string
  start_time?: string
  end_time?: string
  travel_reimbursement?: string
  status?: string
  // Database fields
  start_date?: string
  end_date?: string
  price?: string
  picture?: string
  categories?: string[]
  monday_id?: string
  created_at?: string
  updated_at?: string
}

export interface Database {
  public: {
    Tables: {
      events: {
        Row: Event
        Insert: Omit<Event, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Event, 'id' | 'created_at' | 'updated_at'>>
      }
    }
  }
}
