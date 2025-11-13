import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://suztxzbqekxqtvntjhct.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1enR4emJxZWt4cXR2bnRqaGN0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDA5NDM4OSwiZXhwIjoyMDc1NjcwMzg5fQ.UM1EgHy9gKKqJdTrF89AbLG2o9m-o659LdArkrEy5sg";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function testDirectQuery() {
  try {
    console.log('🧪 Testing direct Supabase query (like SupabaseService)...\n');
    
    // Get current date in YYYY-MM-DD format for comparison
    const today = new Date().toISOString().split('T')[0]
    console.log(`📅 Today's date: ${today}\n`);
    
    // This is the same query that SupabaseService.getEvents() now uses
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'Genehmigt') // Only approved events
      .gte('registration_deadline', today) // Only events where registration deadline hasn't passed
      .order('start_date', { ascending: true });
    
    if (error) {
      console.error('❌ Error fetching events:', error);
      return;
    }
    
    console.log(`📊 Events returned: ${data?.length || 0}\n`);
    
    if (data && data.length > 0) {
      console.log('📋 EVENTS FROM FILTERED QUERY (visible to users):');
      data.forEach((event, index) => {
        console.log(`${index + 1}. "${event.title}"`);
        console.log(`   Description: ${event.description || 'null'}`);
        console.log(`   Location: ${event.location || 'null'}`);
        console.log(`   Organizer: ${event.organizer || 'null'}`);
        console.log(`   Start Date: ${event.start_date || 'null'}`);
        console.log(`   End Date: ${event.end_date || 'null'}`);
        console.log(`   Registration Deadline: ${event.registration_deadline || 'null'}`);
        console.log(`   Status: ${event.status || 'null'}`);
        console.log('   ---');
      });
    } else {
      console.log('❌ No events returned from filtered query');
    }
    
    console.log('\n✅ Filtered query test completed');
    console.log('🎯 This shows which events are visible in "Events finden"!');
    
  } catch (error) {
    console.error('💥 Error testing direct query:', error);
  }
}

testDirectQuery().catch(console.error);
