import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://suztxzbqekxqtvntjhct.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1enR4emJxZWt4cXR2bnRqaGN0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDA5NDM4OSwiZXhwIjoyMDc1NjcwMzg5fQ.UM1EgHy9gKKqJdTrF89AbLG2o9m-o659LdArkrEy5sg";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function testInsert() {
  try {
    console.log('🧪 Testing simple insert...');
    
    const testEvent = {
      title: "Test Event",
      description: "This is a test event",
      status: "approved",
      category: "community"
    };
    
    const { data, error } = await supabase
      .from('events')
      .insert([testEvent])
      .select();
    
    if (error) {
      console.error('❌ Insert failed:', error);
    } else {
      console.log('✅ Insert successful:', data);
      
      // Clean up test data
      await supabase
        .from('events')
        .delete()
        .eq('title', 'Test Event');
      console.log('🧹 Test data cleaned up');
    }
    
  } catch (error) {
    console.error('💥 Error during test:', error);
  }
}

testInsert().catch(console.error);

