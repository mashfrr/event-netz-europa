import { supabase, Event } from '@/lib/supabase'

export class SupabaseService {
  /**
   * Get all events from Supabase
   */
  static async getEvents(): Promise<Event[]> {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'approved')
        .order('start_time', { ascending: true })

      if (error) {
        console.error('Error fetching events:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Failed to fetch events from Supabase:', error)
      return []
    }
  }

  /**
   * Get a single event by ID
   */
  static async getEventById(id: string): Promise<Event | null> {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching event:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Failed to fetch event from Supabase:', error)
      return null
    }
  }

  /**
   * Create a new event
   */
  static async createEvent(event: Omit<Event, 'id' | 'created_at' | 'updated_at'>): Promise<Event | null> {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert([event])
        .select()
        .single()

      if (error) {
        console.error('Error creating event:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Failed to create event:', error)
      return null
    }
  }

  /**
   * Update an existing event
   */
  static async updateEvent(id: string, updates: Partial<Event>): Promise<Event | null> {
    try {
      const { data, error } = await supabase
        .from('events')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating event:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Failed to update event:', error)
      return null
    }
  }

  /**
   * Delete an event
   */
  static async deleteEvent(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting event:', error)
        throw error
      }

      return true
    } catch (error) {
      console.error('Failed to delete event:', error)
      return false
    }
  }

  /**
   * Search events by title, description, or location
   */
  static async searchEvents(query: string): Promise<Event[]> {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'approved')
        .or(`title.ilike.%${query}%,description.ilike.%${query}%,location.ilike.%${query}%`)
        .order('start_time', { ascending: true })

      if (error) {
        console.error('Error searching events:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Failed to search events:', error)
      return []
    }
  }

  /**
   * Get events by category
   */
  static async getEventsByCategory(category: string): Promise<Event[]> {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'approved')
        .eq('category', category)
        .order('start_time', { ascending: true })

      if (error) {
        console.error('Error fetching events by category:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Failed to fetch events by category:', error)
      return []
    }
  }
}
