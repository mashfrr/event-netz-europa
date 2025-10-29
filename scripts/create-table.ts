import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://suztxzbqekxqtvntjhct.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1enR4emJxZWt4cXR2bnRqaGN0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDA5NDM4OSwiZXhwIjoyMDc1NjcwMzg5fQ.UM1EgHy9gKKqJdTrF89AbLG2o9m-o659LdArkrEy5sg";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function createTable() {
  try {
    console.log('🏗️  Creating events table...');
    
    // Read the SQL schema
    const fs = await import('fs');
    const path = await import('path');
    const schemaPath = path.join(process.cwd(), 'supabase-schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Execute the schema
    const { data, error } = await supabase.rpc('exec_sql', { sql: schema });
    
    if (error) {
      console.error('❌ Failed to create table:', error);
      console.log('📋 Please manually run the SQL schema in your Supabase dashboard:');
      console.log('🔗 Go to: https://supabase.com/dashboard/project/suztxzbqekxqtvntjhct/sql');
      console.log('📄 Copy and paste the contents of supabase-schema.sql');
    } else {
      console.log('✅ Table created successfully!');
    }
    
  } catch (error) {
    console.error('💥 Error creating table:', error);
    console.log('📋 Please manually run the SQL schema in your Supabase dashboard:');
    console.log('🔗 Go to: https://supabase.com/dashboard/project/suztxzbqekxqtvntjhct/sql');
    console.log('📄 Copy and paste the contents of supabase-schema.sql');
  }
}

createTable().catch(console.error);

