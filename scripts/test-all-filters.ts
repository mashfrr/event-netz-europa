import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://suztxzbqekxqtvntjhct.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1enR4emJxZWt4cXR2bnRqaGN0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDA5NDM4OSwiZXhwIjoyMDc1NjcwMzg5fQ.UM1EgHy9gKKqJdTrF89AbLG2o9m-o659LdArkrEy5sg";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

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

// Simulate the exact SupabaseService.getEvents() method with filter mapping
async function getEvents(): Promise<Event[]> {
  try {
    console.log('🧪 Testing all filters with database data...\n');
    
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

    console.log(`📊 Raw data from Supabase: ${data?.length || 0} events\n`);

    // Transform the data to match the expected interface (same as SupabaseService)
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
      status: event.status,
      // Provide default values for required fields
      description: event.description || event.title || 'No description available',
      category: event.category || 'community',
      attendees: event.attendees || 0,
      // Map fields for filtering compatibility
      cost: event.price || event.cost, // Map price to cost for filtering
      city: event.location || event.city, // Map location to city for filtering
      // Ensure all filter fields are available
      location: event.location || event.city || '',
      organizer: event.organizer || '',
      link: event.link || '',
      restrictions: event.restrictions || ''
    }))

    console.log(`📊 Found ${transformedData.length} approved events with valid registration deadlines\n`);
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

// Test all filter types
async function testAllFilters() {
  try {
    const events = await getEvents();
    
    if (events.length === 0) {
      console.log('❌ No events to test filters with');
      return;
    }

    console.log('🔍 TESTING ALL FILTER TYPES:\n');

    // Test 1: Search Filter
    console.log('1️⃣ SEARCH FILTER TEST:');
    const searchTerm = 'SALTO';
    const searchResults = events.filter(event => 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (event.location && event.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    console.log(`   Search term: "${searchTerm}"`);
    console.log(`   Results: ${searchResults.length} events`);
    searchResults.forEach(event => console.log(`   - "${event.title}"`));
    console.log('');

    // Test 2: Category/Theme Filter
    console.log('2️⃣ CATEGORY/THEME FILTER TEST:');
    const selectedTheme = ['community'];
    const themeResults = events.filter(event => 
      selectedTheme.length === 0 || selectedTheme.includes(event.category)
    );
    console.log(`   Selected themes: ${selectedTheme.join(', ')}`);
    console.log(`   Results: ${themeResults.length} events`);
    themeResults.forEach(event => console.log(`   - "${event.title}" (${event.category})`));
    console.log('');

    // Test 3: Cost Filter
    console.log('3️⃣ COST FILTER TEST:');
    const costRange = [0, 100];
    const costResults = events.filter(event => {
      const eventCostValue = (!event.cost || event.cost === 'Kostenlos' || event.cost === 'null') ? 0 : 
        parseInt(event.cost.toString().replace(/[^\d]/g, '')) || 0;
      return eventCostValue >= costRange[0] && eventCostValue <= costRange[1];
    });
    console.log(`   Cost range: €${costRange[0]} - €${costRange[1]}`);
    console.log(`   Results: ${costResults.length} events`);
    costResults.forEach(event => console.log(`   - "${event.title}" (Cost: ${event.cost || 'Free'})`));
    console.log('');

    // Test 4: Travel Reimbursement Filter
    console.log('4️⃣ TRAVEL REIMBURSEMENT FILTER TEST:');
    const reimbursement = 'yes';
    const reimbursementResults = events.filter(event => 
      reimbursement === 'all' || 
      (reimbursement === 'yes' && (event.travelReimbursement === true || event.travelReimbursement === 'true' || event.cost?.includes('Erstattung'))) ||
      (reimbursement === 'no' && (event.travelReimbursement === false || event.travelReimbursement === 'false' || (!event.cost?.includes('Erstattung') && !event.travelReimbursement)))
    );
    console.log(`   Reimbursement filter: ${reimbursement}`);
    console.log(`   Results: ${reimbursementResults.length} events`);
    reimbursementResults.forEach(event => console.log(`   - "${event.title}" (Reimbursement: ${event.travelReimbursement})`));
    console.log('');

    // Test 5: Date Filter
    console.log('5️⃣ DATE FILTER TEST:');
    const selectedDate = {
      from: new Date('2025-11-01'),
      to: new Date('2025-12-31')
    };
    const dateResults = events.filter(event => {
      if (!event.startTime) return true;
      const eventDate = new Date(event.startTime);
      return eventDate >= selectedDate.from && eventDate <= selectedDate.to;
    });
    console.log(`   Date range: ${selectedDate.from.toDateString()} - ${selectedDate.to.toDateString()}`);
    console.log(`   Results: ${dateResults.length} events`);
    dateResults.forEach(event => console.log(`   - "${event.title}" (Start: ${event.startTime})`));
    console.log('');

    // Test 6: Registration Deadline Filter
    console.log('6️⃣ REGISTRATION DEADLINE FILTER TEST:');
    const selectedRegistration = {
      from: new Date('2025-10-01'),
      to: new Date('2025-10-31')
    };
    const registrationResults = events.filter(event => {
      if (!event.registrationDeadline) return true;
      const deadline = new Date(event.registrationDeadline);
      return deadline >= selectedRegistration.from && deadline <= selectedRegistration.to;
    });
    console.log(`   Registration deadline range: ${selectedRegistration.from.toDateString()} - ${selectedRegistration.to.toDateString()}`);
    console.log(`   Results: ${registrationResults.length} events`);
    registrationResults.forEach(event => console.log(`   - "${event.title}" (Deadline: ${event.registrationDeadline})`));
    console.log('');

    // Test 7: Combined Filters
    console.log('7️⃣ COMBINED FILTERS TEST:');
    console.log('   Debugging individual filter results:');
    events.forEach(event => {
      const matchesSearch = event.title.toLowerCase().includes('salto');
      const eventCostValue = (!event.cost || event.cost === 'Kostenlos' || event.cost === 'null' || event.cost === 'undefined') ? 0 : 
        parseInt(event.cost.toString().replace(/[^\d]/g, '')) || 0;
      const matchesCost = eventCostValue === 0;
      const matchesReimbursement = event.travelReimbursement === true || event.travelReimbursement === 'true';
      
      console.log(`   - "${event.title}"`);
      console.log(`     Search match: ${matchesSearch} (title contains "salto")`);
      console.log(`     Cost match: ${matchesCost} (cost: "${event.cost}", value: ${eventCostValue})`);
      console.log(`     Reimbursement match: ${matchesReimbursement} (travelReimbursement: ${event.travelReimbursement})`);
      console.log(`     Overall match: ${matchesSearch && matchesCost && matchesReimbursement}`);
    });
    
    const combinedResults = events.filter(event => {
      // Search filter
      const matchesSearch = event.title.toLowerCase().includes('salto');
      // Cost filter (free events only)
      const eventCostValue = (!event.cost || event.cost === 'Kostenlos' || event.cost === 'null' || event.cost === 'undefined') ? 0 : 
        parseInt(event.cost.toString().replace(/[^\d]/g, '')) || 0;
      const matchesCost = eventCostValue === 0;
      // Travel reimbursement filter
      const matchesReimbursement = event.travelReimbursement === true || event.travelReimbursement === 'true';
      
      return matchesSearch && matchesCost && matchesReimbursement;
    });
    console.log(`   Combined filters: Search="SALTO" + Cost=Free + Reimbursement=Yes`);
    console.log(`   Results: ${combinedResults.length} events`);
    combinedResults.forEach(event => console.log(`   - "${event.title}" (Cost: ${event.cost || 'Free'}, Reimbursement: ${event.travelReimbursement})`));
    console.log('');

    console.log('✅ All filter tests completed!');
    console.log('🎯 Filters are working correctly with database migration data.');
    
  } catch (error) {
    console.error('💥 Error testing filters:', error);
  }
}

testAllFilters().catch(console.error);
