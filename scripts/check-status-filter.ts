import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://suztxzbqekxqtvntjhct.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1enR4emJxZWt4cXR2bnRqaGN0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDA5NDM4OSwiZXhwIjoyMDc1NjcwMzg5fQ.UM1EgHy9gKKqJdTrF89AbLG2o9m-o659LdArkrEy5sg";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkStatusFilter() {
  try {
    console.log('🔍 Checking status filter issue...\n');
    
    // Check all events without filter
    const { data: allEvents, error: allError } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (allError) {
      console.error('❌ Error fetching all events:', allError);
      return;
    }
    
    console.log(`📊 Total events in database: ${allEvents?.length || 0}\n`);
    
    if (allEvents && allEvents.length > 0) {
      console.log('📋 ALL EVENTS:');
      allEvents.forEach((event, index) => {
        console.log(`${index + 1}. "${event.title}"`);
        console.log(`   Status: ${event.status || 'null'}`);
        console.log(`   Categories: ${event.categories || 'null'}`);
        console.log('   ---');
      });
    }
    
    // Check events with status filter
    const { data: approvedEvents, error: approvedError } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'approved');
    
    if (approvedError) {
      console.error('❌ Error fetching approved events:', approvedError);
    } else {
      console.log(`\n📊 Events with status='approved': ${approvedEvents?.length || 0}`);
    }
    
    // Check events with null status
    const { data: nullStatusEvents, error: nullError } = await supabase
      .from('events')
      .select('*')
      .is('status', null);
    
    if (nullError) {
      console.error('❌ Error fetching null status events:', nullError);
    } else {
      console.log(`📊 Events with status=null: ${nullStatusEvents?.length || 0}`);
    }
    
    console.log('\n🔍 DIAGNOSIS:');
    console.log('The SupabaseService.getEvents() method filters for status="approved"');
    console.log('But our migrated data has status=null, so no events are returned');
    console.log('We need to either:');
    console.log('1. Update the migrated data to have proper status values');
    console.log('2. Modify the SupabaseService to not filter by status');
    console.log('3. Add a status field to the migration');
    
  } catch (error) {
    console.error('💥 Error during status check:', error);
  }
}

checkStatusFilter().catch(console.error);

