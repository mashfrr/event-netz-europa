import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://suztxzbqekxqtvntjhct.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1enR4emJxZWt4cXR2bnRqaGN0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDA5NDM4OSwiZXhwIjoyMDc1NjcwMzg5fQ.UM1EgHy9gKKqJdTrF89AbLG2o9m-o659LdArkrEy5sg";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function addColumnAndMigrate() {
  try {
    console.log('🔧 Adding registration_deadline column to events table...');
    
    // Try to add the column using SQL
    const { error: alterError } = await supabase.rpc('exec_sql', { 
      sql: 'ALTER TABLE events ADD COLUMN IF NOT EXISTS registration_deadline TEXT;' 
    });
    
    if (alterError) {
      console.log('⚠️  Could not add column automatically:', alterError.message);
      console.log('📋 Please manually add the column:');
      console.log('1. Go to: https://supabase.com/dashboard/project/suztxzbqekxqtvntjhct/sql');
      console.log('2. Run: ALTER TABLE events ADD COLUMN IF NOT EXISTS registration_deadline TEXT;');
      console.log('3. Then run: npm run migrate-dates');
      return;
    } else {
      console.log('✅ Column added successfully!');
    }
    
    console.log('🎯 Column added! Now you can run: npm run migrate-dates');
    
  } catch (error) {
    console.log('⚠️  Could not add column automatically:', error);
    console.log('📋 Please manually add the column:');
    console.log('1. Go to: https://supabase.com/dashboard/project/suztxzbqekxqtvntjhct/sql');
    console.log('2. Run: ALTER TABLE events ADD COLUMN IF NOT EXISTS registration_deadline TEXT;');
    console.log('3. Then run: npm run migrate-dates');
  }
}

addColumnAndMigrate().catch(console.error);

