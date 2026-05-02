import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://suztxzbqekxqtvntjhct.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1enR4emJxZWt4cXR2bnRqaGN0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDA5NDM4OSwiZXhwIjoyMDc1NjcwMzg5fQ.UM1EgHy9gKKqJdTrF89AbLG2o9m-o659LdArkrEy5sg";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function testEventFiltering() {
  try {
    console.log('🧪 Testing event filtering for "Events finden"...');
    console.log('📋 This will show which events are visible to users\n');
    
    // Get current date in YYYY-MM-DD format for comparison
    const today = new Date().toISOString().split('T')[0]
    console.log(`📅 Today's date: ${today}\n`);
    
    // Test the same filtering logic as SupabaseService
    const { data: events, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'Genehmigt') // Only approved events
      .gte('registration_deadline', today) // Only events where registration deadline hasn't passed
      .order('start_date', { ascending: true });
    
    if (error) {
      console.error('❌ Error fetching events:', error);
      return;
    }
    
    console.log(`📊 Found ${events?.length || 0} events visible to users\n`);
    
    if (events && events.length > 0) {
      console.log('✅ EVENTS VISIBLE IN "EVENTS FINDEN":');
      events.forEach((event, index) => {
        console.log(`${index + 1}. "${event.title}"`);
        console.log(`   📅 Event: ${event.start_date || 'null'} → ${event.end_date || 'null'}`);
        console.log(`   ⏰ Registration Deadline: ${event.registration_deadline || 'null'}`);
        console.log(`   📊 Status: ${event.status} (Approved)`);
        console.log(`   📍 Location: ${event.location || 'null'}`);
        console.log(`   👤 Organizer: ${event.organizer || 'null'}`);
        console.log('   ---');
      });
    } else {
      console.log('❌ No events are currently visible to users');
    }
    
    // Also show all events for comparison
    console.log('\n🔍 ALL EVENTS IN DATABASE (for comparison):');
    const { data: allEvents, error: allError } = await supabase
      .from('events')
      .select('*')
      .order('start_date', { ascending: true });
    
    if (allError) {
      console.error('❌ Error fetching all events:', allError);
      return;
    }
    
    allEvents?.forEach((event, index) => {
      const isVisible = event.status === 'Genehmigt' && 
                       event.registration_deadline && 
                       event.registration_deadline >= today;
      
      console.log(`${index + 1}. "${event.title}"`);
      console.log(`   📊 Status: ${event.status}`);
      console.log(`   ⏰ Registration Deadline: ${event.registration_deadline || 'null'}`);
      console.log(`   👁️  Visible to users: ${isVisible ? '✅ YES' : '❌ NO'}`);
      if (!isVisible) {
        if (event.status !== 'Genehmigt') {
          console.log(`      Reason: Not approved (status: ${event.status})`);
        } else if (!event.registration_deadline) {
          console.log(`      Reason: No registration deadline`);
        } else if (event.registration_deadline < today) {
          console.log(`      Reason: Registration deadline passed (${event.registration_deadline} < ${today})`);
        }
      }
      console.log('   ---');
    });
    
    console.log('\n✅ Event filtering test completed!');
    
  } catch (error) {
    console.error('💥 Error during event filtering test:', error);
  }
}

testEventFiltering().catch(console.error);

