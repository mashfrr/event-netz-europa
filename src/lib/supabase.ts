import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  organizer: string
  category: 'social' | 'environment' | 'education' | 'community'
  attendees: number
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
