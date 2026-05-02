import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://suztxzbqekxqtvntjhct.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1enR4emJxZWt4cXR2bnRqaGN0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDA5NDM4OSwiZXhwIjoyMDc1NjcwMzg5fQ.UM1EgHy9gKKqJdTrF89AbLG2o9m-o659LdArkrEy5sg";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkColumnExists() {
  try {
    console.log('🔍 Checking if registration_deadline column exists...\n');
    
    // Try to select the registration_deadline column
    const { data, error } = await supabase
      .from('events')
      .select('registration_deadline')
      .limit(1);
    
    if (error) {
      if (error.message.includes('registration_deadline')) {
        console.log('❌ Column "registration_deadline" does NOT exist');
        console.log('\n📋 TO ADD THE COLUMN:');
        console.log('1. Go to: https://supabase.com/dashboard/project/suztxzbqekxqtvntjhct/sql');
        console.log('2. Run this SQL command:');
        console.log('   ALTER TABLE events ADD COLUMN IF NOT EXISTS registration_deadline TEXT;');
        console.log('3. Click "Run" to execute');
        console.log('4. Then run: npm run auto-sync');
        console.log('\n🎯 This will map "Anmeldefrist" from Monday.com to registration_deadline in Supabase');
      } else {
        console.error('❌ Error checking column:', error);
      }
    } else {
      console.log('✅ Column "registration_deadline" EXISTS!');
      console.log('🎉 You can now run: npm run auto-sync');
    }
    
    // Also check current table structure
    console.log('\n📋 Current table structure:');
    const { data: testData, error: testError } = await supabase
      .from('events')
      .select('*')
      .limit(1);
    
    if (testError) {
      console.log('❌ Could not check table structure:', testError.message);
    } else if (testData && testData.length > 0) {
      console.log('Available columns:', Object.keys(testData[0]));
    }
    
  } catch (error) {
    console.error('💥 Error during column check:', error);
  }
}

checkColumnExists().catch(console.error);

