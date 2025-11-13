import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://suztxzbqekxqtvntjhct.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1enR4emJxZWt4cXR2bnRqaGN0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDA5NDM4OSwiZXhwIjoyMDc1NjcwMzg5fQ.UM1EgHy9gKKqJdTrF89AbLG2o9m-o659LdArkrEy5sg";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkStatusColumn() {
  try {
    console.log('🔍 Checking if status column exists...\n');
    
    // Try to select the status column
    const { data, error } = await supabase
      .from('events')
      .select('status')
      .limit(1);
    
    if (error) {
      if (error.message.includes('status')) {
        console.log('❌ Column "status" does NOT exist');
        console.log('\n📋 TO ADD THE STATUS COLUMN:');
        console.log('1. Go to: https://supabase.com/dashboard/project/suztxzbqekxqtvntjhct/sql');
        console.log('2. Run this SQL command:');
        console.log('   ALTER TABLE events ADD COLUMN IF NOT EXISTS status TEXT;');
        console.log('3. Click "Run" to execute');
        console.log('4. Then run: npm run auto-sync-status');
        console.log('\n🎯 This will map Monday.com status to Supabase status column');
        console.log('📊 Status mapping:');
        console.log('   - "Genehmigt" → "approved"');
        console.log('   - "Entwurf" → "draft"');
        console.log('   - Other → "pending"');
      } else {
        console.error('❌ Error checking column:', error);
      }
    } else {
      console.log('✅ Column "status" EXISTS!');
      console.log('🎉 You can now run: npm run auto-sync-status');
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
    console.error('💥 Error during status column check:', error);
  }
}

checkStatusColumn().catch(console.error);

