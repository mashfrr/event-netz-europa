import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://suztxzbqekxqtvntjhct.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1enR4emJxZWt4cXR2bnRqaGN0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDA5NDM4OSwiZXhwIjoyMDc1NjcwMzg5fQ.UM1EgHy9gKKqJdTrF89AbLG2o9m-o659LdArkrEy5sg";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function debugWithDeadlines() {
  try {
    console.log('🔍 Debugging Supabase database with registration deadlines...\n');
    
    // Get all events with all fields
    const { data: events, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('❌ Error fetching events:', error);
      return;
    }
    
    console.log(`📊 Total events in database: ${events?.length || 0}\n`);
    
    if (events && events.length > 0) {
      console.log('📋 EVENTS WITH REGISTRATION DEADLINES:');
      events.forEach((event, index) => {
        console.log(`${index + 1}. "${event.title}"`);
        console.log(`   📅 Event Start: ${event.start_date || 'null'}`);
        console.log(`   📅 Event End: ${event.end_date || 'null'}`);
        console.log(`   ⏰ Registration Deadline: ${event.registration_deadline || 'null'}`);
        console.log(`   📍 Location: ${event.location || 'null'}`);
        console.log(`   👤 Organizer: ${event.organizer || 'null'}`);
        console.log(`   💰 Price: ${event.price || 'null'}`);
        console.log(`   🚗 Travel Reimbursement: ${event.travel_reimbursement || 'null'}`);
        console.log(`   🔗 Link: ${event.link || 'null'}`);
        console.log(`   📝 Restrictions: ${event.restrictions || 'null'}`);
        console.log('   ---');
      });
    } else {
      console.log('❌ No events found in database');
    }
    
    // Check if registration_deadline column has data
    console.log('\n🔍 REGISTRATION DEADLINE ANALYSIS:');
    const eventsWithDeadlines = events?.filter(event => event.registration_deadline) || [];
    console.log(`📊 Events with registration deadlines: ${eventsWithDeadlines.length}/${events?.length || 0}`);
    
    if (eventsWithDeadlines.length > 0) {
      console.log('\n📋 REGISTRATION DEADLINES:');
      eventsWithDeadlines.forEach(event => {
        console.log(`- "${event.title}": ${event.registration_deadline}`);
      });
    }
    
    console.log('\n✅ Database structure check completed!');
    
  } catch (error) {
    console.error('💥 Error during debug:', error);
  }
}

debugWithDeadlines().catch(console.error);

