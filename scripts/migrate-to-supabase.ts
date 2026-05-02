import { MondayService } from '../src/services/mondayService'
import { SupabaseService } from '../src/services/supabaseService'

/**
 * Migration script to move data from Monday.com to Supabase
 * Run this once to migrate all your existing data
 */
async function migrateData() {
  console.log('🚀 Starting migration from Monday.com to Supabase...')
  
  try {
    // 1. Fetch all events from Monday.com
    console.log('📥 Fetching events from Monday.com...')
    const mondayEvents = await MondayService.getEvents()
    console.log(`Found ${mondayEvents.length} events in Monday.com`)

    if (mondayEvents.length === 0) {
      console.log('❌ No events found in Monday.com. Migration aborted.')
      return
    }

    // 2. Transform Monday events to Supabase format
    console.log('🔄 Transforming events...')
    const supabaseEvents = mondayEvents.map(event => ({
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
    }))

    // 3. Insert events into Supabase
    console.log('📤 Inserting events into Supabase...')
    let successCount = 0
    let errorCount = 0

    for (const event of supabaseEvents) {
      try {
        const result = await SupabaseService.createEvent(event)
        if (result) {
          successCount++
          console.log(`✅ Migrated: ${event.title}`)
        } else {
          errorCount++
          console.log(`❌ Failed to migrate: ${event.title}`)
        }
      } catch (error) {
        errorCount++
        console.log(`❌ Error migrating ${event.title}:`, error)
      }
    }

    console.log('\n🎉 Migration completed!')
    console.log(`✅ Successfully migrated: ${successCount} events`)
    console.log(`❌ Failed to migrate: ${errorCount} events`)
    
    if (errorCount > 0) {
      console.log('\n⚠️  Some events failed to migrate. Check the logs above for details.')
    }

  } catch (error) {
    console.error('💥 Migration failed:', error)
  }
}

// Run migration if this script is executed directly
if (require.main === module) {
  migrateData()
}

export { migrateData }
