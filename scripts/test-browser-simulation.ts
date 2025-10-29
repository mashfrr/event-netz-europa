import { createClient } from '@supabase/supabase-js';

// Simulate browser environment with hardcoded values
const SUPABASE_URL = "https://suztxzbqekxqtvntjhct.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1enR4emJxZWt4cXR2bnRqaGN0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDA5NDM4OSwiZXhwIjoyMDc1NjcwMzg5fQ.UM1EgHy9gKKqJdTrF89AbLG2o9m-o659LdArkrEy5sg";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Event interface matching the application
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

// Simulate the exact SupabaseService.getEvents() method
async function getEvents(): Promise<Event[]> {
  try {
    console.log('🌐 Simulating browser environment SupabaseService.getEvents()...');
    
    // Get current date in YYYY-MM-DD format for comparison
    const today = new Date().toISOString().split('T')[0]
    console.log(`📅 Today's date: ${today}`);
    
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'Genehmigt') // Only approved events
      .gte('registration_deadline', today) // Only events where registration deadline hasn't passed
      .order('start_date', { ascending: true })

    if (error) {
      console.error('❌ Error fetching events:', error)
      throw error
    }

    console.log(`📊 Raw data from Supabase: ${data?.length || 0} events`);
    if (data && data.length > 0) {
      console.log('📋 Raw events:');
      data.forEach((event, index) => {
        console.log(`  ${index + 1}. "${event.title}"`);
        console.log(`     Status: ${event.status}`);
        console.log(`     Registration Deadline: ${event.registration_deadline}`);
        console.log(`     Start Date: ${event.start_date}`);
        console.log(`     End Date: ${event.end_date}`);
      });
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
      attendees: event.attendees || 0,
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

async function testBrowserSimulation() {
  try {
    console.log('🧪 Testing browser simulation of SupabaseService.getEvents()...');
    console.log('📋 This simulates exactly what the browser would do\n');
    
    const events = await getEvents();
    
    console.log(`\n📊 Final result: ${events.length} events returned`);
    
    if (events.length > 0) {
      console.log('\n✅ EVENTS THAT SHOULD BE DISPLAYED:');
      events.forEach((event, index) => {
        console.log(`${index + 1}. "${event.title}"`);
        console.log(`   Description: ${event.description}`);
        console.log(`   Location: ${event.location || 'null'}`);
        console.log(`   Organizer: ${event.organizer || 'null'}`);
        console.log(`   Cost: ${event.cost || 'null'}`);
        console.log(`   Start Date: ${event.startTime || 'null'}`);
        console.log(`   End Date: ${event.endTime || 'null'}`);
        console.log(`   Registration Deadline: ${event.registrationDeadline || 'null'}`);
        console.log(`   Status: ${event.status || 'null'}`);
        console.log(`   Category: ${event.category || 'null'}`);
        console.log(`   Attendees: ${event.attendees || 0}`);
        console.log('   ---');
      });
    } else {
      console.log('\n❌ No events returned - this explains why nothing shows on the page!');
    }
    
    console.log('\n✅ Browser simulation test completed!');
    
  } catch (error) {
    console.error('💥 Error in browser simulation:', error);
  }
}

testBrowserSimulation().catch(console.error);
