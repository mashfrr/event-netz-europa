import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://suztxzbqekxqtvntjhct.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1enR4emJxZWt4cXR2bnRqaGN0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDA5NDM4OSwiZXhwIjoyMDc1NjcwMzg5fQ.UM1EgHy9gKKqJdTrF89AbLG2o9m-o659LdArkrEy5sg";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkTableStructure() {
  try {
    console.log('🔍 Checking existing table structure...');
    
    // Try to select from the table to see what columns exist
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .limit(1);
    
    if (error) {
      console.log('❌ Error accessing table:', error.message);
      return;
    }
    
    console.log('✅ Table exists and is accessible');
    
    // Try to insert a test record to see what columns are missing
    const testRecord = {
      title: "Test Event",
      description: "Test description",
      location: "Test location",
      organizer: "Test organizer",
      category: "community",
      attendees: 0,
      max_attendees: 10,
      image: null,
      images: null,
      friends_attending: null,
      is_registered: false,
      registration_deadline: null,
      cost: null,
      restrictions: null,
      link: null,
      application_type: "anmeldung",
      city: null,
      start_time: null,
      end_time: null,
      travel_reimbursement: null,
      status: "approved",
      monday_id: "test123"
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('events')
      .insert([testRecord])
      .select();
    
    if (insertError) {
      console.log('❌ Insert failed:', insertError.message);
      console.log('📋 Missing columns detected. Need to add missing columns to the table.');
    } else {
      console.log('✅ All columns exist and test insert successful');
      
      // Clean up test data
      await supabase
        .from('events')
        .delete()
        .eq('title', 'Test Event');
      console.log('🧹 Test data cleaned up');
    }
    
  } catch (error) {
    console.error('💥 Error checking table structure:', error);
  }
}

checkTableStructure().catch(console.error);

