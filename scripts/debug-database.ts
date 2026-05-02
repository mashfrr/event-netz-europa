import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://suztxzbqekxqtvntjhct.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1enR4emJxZWt4cXR2bnRqaGN0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDA5NDM4OSwiZXhwIjoyMDc1NjcwMzg5fQ.UM1EgHy9gKKqJdTrF89AbLG2o9m-o659LdArkrEy5sg";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function debugDatabase() {
  try {
    console.log('🔍 Debugging Supabase database...\n');
    
    // Get all events
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
      console.log('📋 EVENTS IN DATABASE:');
      events.forEach((event, index) => {
        console.log(`${index + 1}. ID: ${event.id}`);
        console.log(`   Title: "${event.title}"`);
        console.log(`   Description: ${event.description || 'null'}`);
        console.log(`   Location: ${event.location || 'null'}`);
        console.log(`   Organizer: ${event.organizer || 'null'}`);
        console.log(`   Status: ${event.status || 'null'}`);
        console.log(`   Category: ${event.category || 'null'}`);
        console.log(`   Created: ${event.created_at}`);
        console.log('   ---');
      });
    } else {
      console.log('❌ No events found in database');
    }
    
    // Check table structure
    console.log('\n🔍 Checking table structure...');
    const { data: testData, error: testError } = await supabase
      .from('events')
      .select('*')
      .limit(1);
    
    if (testError) {
      console.log('❌ Table access error:', testError.message);
    } else {
      console.log('✅ Table is accessible');
      if (testData && testData.length > 0) {
        console.log('📋 Available columns:', Object.keys(testData[0]));
      }
    }
    
  } catch (error) {
    console.error('💥 Error during debug:', error);
  }
}

debugDatabase().catch(console.error);

