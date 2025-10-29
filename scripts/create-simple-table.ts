import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://suztxzbqekxqtvntjhct.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1enR4emJxZWt4cXR2bnRqaGN0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDA5NDM4OSwiZXhwIjoyMDc1NjcwMzg5fQ.UM1EgHy9gKKqJdTrF89AbLG2o9m-o659LdArkrEy5sg";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function createSimpleTable() {
  try {
    console.log('🏗️  Attempting to create events table...');
    
    // Try to create a simple table structure
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS events (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        location TEXT,
        organizer TEXT,
        category TEXT DEFAULT 'community',
        attendees INTEGER DEFAULT 0,
        max_attendees INTEGER,
        image TEXT,
        images JSONB,
        friends_attending JSONB,
        is_registered BOOLEAN DEFAULT FALSE,
        registration_deadline TEXT,
        cost TEXT,
        restrictions TEXT,
        link TEXT,
        application_type TEXT DEFAULT 'anmeldung',
        city TEXT,
        start_time TEXT,
        end_time TEXT,
        travel_reimbursement TEXT,
        status TEXT DEFAULT 'approved',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;
    
    // Try to execute the SQL
    const { data, error } = await supabase.rpc('exec', { sql: createTableSQL });
    
    if (error) {
      console.log('❌ Could not create table automatically:', error.message);
      console.log('📋 Manual setup required:');
      console.log('1. Go to: https://supabase.com/dashboard/project/suztxzbqekxqtvntjhct/sql');
      console.log('2. Copy the contents of supabase-schema.sql');
      console.log('3. Paste and run it in the SQL editor');
      return false;
    } else {
      console.log('✅ Table created successfully!');
      return true;
    }
    
  } catch (error) {
    console.log('❌ Error creating table:', error);
    console.log('📋 Manual setup required:');
    console.log('1. Go to: https://supabase.com/dashboard/project/suztxzbqekxqtvntjhct/sql');
    console.log('2. Copy the contents of supabase-schema.sql');
    console.log('3. Paste and run it in the SQL editor');
    return false;
  }
}

createSimpleTable().catch(console.error);

