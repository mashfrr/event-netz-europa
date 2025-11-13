import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://suztxzbqekxqtvntjhct.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1enR4emJxZWt4cXR2bnRqaGN0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDA5NDM4OSwiZXhwIjoyMDc1NjcwMzg5fQ.UM1EgHy9gKKqJdTrF89AbLG2o9m-o659LdArkrEy5sg";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function setupDatabase() {
  try {
    console.log('🔍 Testing Supabase connection...');
    
    // Test connection by trying to select from events table
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .limit(1);
    
    if (error) {
      console.log('❌ Events table does not exist or has issues:', error.message);
      console.log('📋 Please run the SQL schema from supabase-schema.sql in your Supabase dashboard');
      console.log('🔗 Go to: https://supabase.com/dashboard/project/suztxzbqekxqtvntjhct/sql');
      return false;
    }
    
    console.log('✅ Supabase connection successful!');
    console.log(`📊 Found ${data?.length || 0} events in database`);
    return true;
    
  } catch (error) {
    console.error('💥 Error testing Supabase connection:', error);
    return false;
  }
}

setupDatabase().catch(console.error);

