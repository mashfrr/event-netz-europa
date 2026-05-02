import { supabase, Event } from '@/lib/supabase'

export class SupabaseService {
  /**
   * Get approved events from Supabase with valid registration deadlines
   */
  static async getEvents(): Promise<Event[]> {
    try {
      // Get current date in YYYY-MM-DD format for comparison
      const today = new Date().toISOString().split('T')[0]
      
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'Genehmigt') // Only approved events
        .gte('registration_deadline', today) // Only events where registration deadline hasn't passed
        .order('start_date', { ascending: true })

      if (error) {
        console.error('Error fetching events:', error)
        throw error
      }

      // Transform the data to match the expected interface
      const transformedData = (data || []).map(event => ({
        ...event,
        // Map database fields to interface fields
        date: event.start_date ? this.formatDateRange(event.start_date, event.end_date) : event.date,
        time: event.start_date ? this.formatDateRange(event.start_date, event.end_date) : event.time,
        registrationDeadline: event.registration_deadline,
        maxAttendees: event.max_attendees,
        isRegistered: event.is_registered,
        applicationType: event.application_type,
        startTime: event.start_date,
        endTime: event.end_date,
        travelReimbursement: event.travel_reimbursement,
        friendsAttending: event.friends_attending,
        status: event.status, // Use actual German status from database
        // Provide default values for required fields
        description: event.description || event.title || 'No description available',
        category: event.category || 'community',
        attendees: event.attendees || 0,
        // Map categories array from database
        categories: event.categories || [],
        // Map fields for filtering compatibility
        cost: (event.price === 0 || event.price === '0') ? 'Kostenlos' : 
              (event.price || event.cost || (event.description && event.description.toLowerCase().includes('kostenlos') ? 'Kostenlos' : 'Preis auf Anfrage')), // Map price to cost for filtering
        city: event.location || event.city, // Map location to city for filtering
        // Ensure all filter fields are available
        location: event.location || event.city || '',
        organizer: event.organizer || '',
        link: event.link || '',
        restrictions: event.restrictions || ''
      }))

      console.log(`📊 Found ${transformedData.length} approved events with valid registration deadlines`)
      return transformedData
    } catch (error) {
      console.error('Failed to fetch events from Supabase:', error)
      return []
    }
  }

  /**
   * Format date range for display
   */
  private static formatDateRange(startTime?: string, endTime?: string): string {
    if (!startTime) return ''
    
    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr)
      return date.toLocaleDateString('de-DE', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
      })
    }
    
    if (endTime && startTime !== endTime) {
      return `${formatDate(startTime)} - ${formatDate(endTime)}`
    }
    
    return formatDate(startTime)
  }

  /**
   * Get a single event by ID (only if approved and registration deadline hasn't passed)
   */
  static async getEventById(id: string): Promise<Event | null> {
    try {
      // Get current date in YYYY-MM-DD format for comparison
      const today = new Date().toISOString().split('T')[0]
      
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .eq('status', 'Genehmigt') // Only approved events
        .gte('registration_deadline', today) // Only events where registration deadline hasn't passed
        .single()

      if (error) {
        console.error('Error fetching event:', error)
        return null
      }

      if (!data) return null

      // Transform the data to match the expected interface
      return {
        ...data,
        date: data.start_date ? this.formatDateRange(data.start_date, data.end_date) : data.date,
        time: data.start_date ? this.formatDateRange(data.start_date, data.end_date) : data.time,
        registrationDeadline: data.registration_deadline,
        maxAttendees: data.max_attendees,
        isRegistered: data.is_registered,
        applicationType: data.application_type,
        startTime: data.start_date,
        endTime: data.end_date,
        travelReimbursement: data.travel_reimbursement,
        friendsAttending: data.friends_attending,
        status: data.status, // Use actual German status from database
        // Provide default values for required fields
        description: data.description || data.title || 'No description available',
        category: data.category || 'community',
        attendees: data.attendees || 0,
        // Map categories array from database
        categories: data.categories || [],
        // Map fields for filtering compatibility
        cost: (data.price === 0 || data.price === '0') ? 'Kostenlos' : 
              (data.price || data.cost || (data.description && data.description.toLowerCase().includes('kostenlos') ? 'Kostenlos' : 'Preis auf Anfrage')), // Map price to cost for filtering
        city: data.location || data.city, // Map location to city for filtering
        // Ensure all filter fields are available
        location: data.location || data.city || '',
        organizer: data.organizer || '',
        link: data.link || '',
        restrictions: data.restrictions || ''
      }
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
      // Transform interface fields to database fields
      const dbEvent = {
        title: event.title,
        description: event.description,
        date: event.date,
        time: event.time,
        location: event.location,
        organizer: event.organizer,
        category: event.category,
        attendees: event.attendees,
        max_attendees: event.maxAttendees,
        image: event.image,
        images: event.images,
        friends_attending: event.friendsAttending,
        is_registered: event.isRegistered,
        registration_deadline: event.registrationDeadline,
        cost: event.cost,
        restrictions: event.restrictions,
        link: event.link,
        application_type: event.applicationType,
        city: event.city,
        start_time: event.startTime,
        end_time: event.endTime,
        travel_reimbursement: event.travelReimbursement,
        status: event.status || 'approved'
      }

      const { data, error } = await supabase
        .from('events')
        .insert([dbEvent])
        .select()
        .single()

      if (error) {
        console.error('Error creating event:', error)
        throw error
      }

      // Transform back to interface format
      return {
        ...data,
        date: data.start_time ? this.formatDateRange(data.start_time, data.end_time) : data.date,
        time: data.start_time ? this.formatDateRange(data.start_time, data.end_time) : data.time,
        registrationDeadline: data.registration_deadline,
        maxAttendees: data.max_attendees,
        isRegistered: data.is_registered,
        applicationType: data.application_type,
        startTime: data.start_time,
        endTime: data.end_time,
        travelReimbursement: data.travel_reimbursement,
        friendsAttending: data.friends_attending
      }
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
      // Transform interface fields to database fields
      const dbUpdates: any = { ...updates }
      
      // Map interface field names to database field names
      if (updates.maxAttendees !== undefined) {
        dbUpdates.max_attendees = updates.maxAttendees
        delete dbUpdates.maxAttendees
      }
      if (updates.isRegistered !== undefined) {
        dbUpdates.is_registered = updates.isRegistered
        delete dbUpdates.isRegistered
      }
      if (updates.registrationDeadline !== undefined) {
        dbUpdates.registration_deadline = updates.registrationDeadline
        delete dbUpdates.registrationDeadline
      }
      if (updates.applicationType !== undefined) {
        dbUpdates.application_type = updates.applicationType
        delete dbUpdates.applicationType
      }
      if (updates.startTime !== undefined) {
        dbUpdates.start_time = updates.startTime
        delete dbUpdates.startTime
      }
      if (updates.endTime !== undefined) {
        dbUpdates.end_time = updates.endTime
        delete dbUpdates.endTime
      }
      if (updates.travelReimbursement !== undefined) {
        dbUpdates.travel_reimbursement = updates.travelReimbursement
        delete dbUpdates.travelReimbursement
      }
      if (updates.friendsAttending !== undefined) {
        dbUpdates.friends_attending = updates.friendsAttending
        delete dbUpdates.friendsAttending
      }

      const { data, error } = await supabase
        .from('events')
        .update({ ...dbUpdates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating event:', error)
        throw error
      }

      // Transform back to interface format
      return {
        ...data,
        date: data.start_time ? this.formatDateRange(data.start_time, data.end_time) : data.date,
        time: data.start_time ? this.formatDateRange(data.start_time, data.end_time) : data.time,
        registrationDeadline: data.registration_deadline,
        maxAttendees: data.max_attendees,
        isRegistered: data.is_registered,
        applicationType: data.application_type,
        startTime: data.start_time,
        endTime: data.end_time,
        travelReimbursement: data.travel_reimbursement,
        friendsAttending: data.friends_attending
      }
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

      // Transform the data to match the expected interface
      const transformedData = (data || []).map(event => ({
        ...event,
        date: event.start_time ? this.formatDateRange(event.start_time, event.end_time) : event.date,
        time: event.start_time ? this.formatDateRange(event.start_time, event.end_time) : event.time,
        registrationDeadline: event.registration_deadline,
        maxAttendees: event.max_attendees,
        isRegistered: event.is_registered,
        applicationType: event.application_type,
        startTime: event.start_time,
        endTime: event.end_time,
        travelReimbursement: event.travel_reimbursement,
        friendsAttending: event.friends_attending
      }))

      return transformedData
    } catch (error) {
      console.error('Failed to fetch events by category:', error)
      return []
    }
  }

  /**
   * Sync data from Monday.com to Supabase
   * This method can be called to migrate data from Monday.com
   */
  static async syncFromMonday(mondayData: any[]): Promise<boolean> {
    try {
      console.log('Starting sync from Monday.com to Supabase...')
      
      for (const item of mondayData) {
        const columns = Object.fromEntries(
          item.column_values.map((cv: any) => [cv.title, cv.text])
        )

        // Map Monday.com data to Supabase structure
        const eventData = {
          title: item.name,
          description: columns.Description || null,
          location: columns.Location || null,
          link: columns.Link || null,
          cost: columns.Price || null,
          travel_reimbursement: columns.TravelReimbursement === "Yes",
          organizer: columns.Organizer || null,
          restrictions: columns.Restrictions || null,
          status: 'approved'
        }

        // Use upsert to avoid duplicates
        const { error } = await supabase
          .from('events')
          .upsert(eventData, { onConflict: 'title' })

        if (error) {
          console.error('Error upserting event:', error)
        }
      }

      console.log('✅ Data synced successfully from Monday.com to Supabase!')
      return true
    } catch (error) {
      console.error('Failed to sync data from Monday.com:', error)
      return false
    }
  }
}
