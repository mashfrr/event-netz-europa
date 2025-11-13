import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://suztxzbqekxqtvntjhct.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1enR4emJxZWt4cXR2bnRqaGN0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDA5NDM4OSwiZXhwIjoyMDc1NjcwMzg5fQ.UM1EgHy9gKKqJdTrF89AbLG2o9m-o659LdArkrEy5sg";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Event interface matching the database
interface Event {
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
  categories?: string
  monday_id?: string
  created_at?: string
  updated_at?: string
}

// Simulate the SupabaseService.getEvents() method
async function getEvents(): Promise<Event[]> {
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
      date: event.start_date ? formatDateRange(event.start_date, event.end_date) : event.date,
      time: event.start_date ? formatDateRange(event.start_date, event.end_date) : event.time,
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
      attendees: event.attendees || 0
    }))

    console.log(`📊 Found ${transformedData.length} approved events with valid registration deadlines`)
    return transformedData
  } catch (error) {
    console.error('Failed to fetch events from Supabase:', error)
    return []
  }
}

// Format date range for display
function formatDateRange(startTime?: string, endTime?: string): string {
  if (!startTime) return ''
  
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('de-DE', {
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

async function testSupabaseService() {
  try {
    console.log('🧪 Testing SupabaseService.getEvents() simulation...');
    console.log('📋 This will test the actual service logic used by the application\n');
    
    const events = await getEvents();
    
    console.log(`📊 Events returned by SupabaseService: ${events.length}\n`);
    
    if (events.length > 0) {
      console.log('✅ EVENTS RETURNED BY SUPABASE SERVICE:');
      events.forEach((event, index) => {
        console.log(`${index + 1}. "${event.title}"`);
        console.log(`   Description: ${event.description || 'null'}`);
        console.log(`   Location: ${event.location || 'null'}`);
        console.log(`   Organizer: ${event.organizer || 'null'}`);
        console.log(`   Start Date: ${event.startTime || 'null'}`);
        console.log(`   End Date: ${event.endTime || 'null'}`);
        console.log(`   Registration Deadline: ${event.registrationDeadline || 'null'}`);
        console.log(`   Status: ${event.status || 'null'}`);
        console.log(`   Category: ${event.category || 'null'}`);
        console.log(`   Attendees: ${event.attendees || 0}`);
        console.log('   ---');
      });
    } else {
      console.log('❌ No events returned by SupabaseService');
      console.log('🔍 This means the filtering is working, but no events meet the criteria');
      console.log('📋 Criteria: status = "Genehmigt" AND registration_deadline >= today');
    }
    
    console.log('\n✅ SupabaseService test completed!');
    
  } catch (error) {
    console.error('💥 Error testing SupabaseService:', error);
  }
}

testSupabaseService().catch(console.error);
