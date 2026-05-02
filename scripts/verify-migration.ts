import fetch from "node-fetch";
import { createClient } from "@supabase/supabase-js";

const MONDAY_API_URL = "https://api.monday.com/v2";
const MONDAY_API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjU2Mzg3MzA0NiwiYWFpIjoxMSwidWlkIjo4NTE1OTAwMywiaWFkIjoiMjAyNS0wOS0xOFQxNzoxMDoyNi4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6Mjg1NDc4NDIsInJnbiI6ImV1YzEifQ.jk7wndce-RArM4dWu0cD7bVDiat4AShytJW_H56aGg0";
const BOARD_ID = 5001590112;

const SUPABASE_URL = "https://suztxzbqekxqtvntjhct.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1enR4emJxZWt4cXR2bnRqaGN0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDA5NDM4OSwiZXhwIjoyMDc1NjcwMzg5fQ.UM1EgHy9gKKqJdTrF89AbLG2o9m-o659LdArkrEy5sg";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function getMondayData() {
  const query = `
    query {
      boards(ids: ${BOARD_ID}) {
        items_page(limit: 100) {
          items {
            id
            name
            column_values {
              id
              text
            }
          }
        }
      }
    }`;

  const response = await fetch(MONDAY_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: MONDAY_API_KEY,
    },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();
  return data.data.boards[0].items_page.items;
}

async function getSupabaseData() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }
  return data || [];
}

async function verifyMigration() {
  try {
    console.log('🔍 Verifying data migration between Monday.com and Supabase...\n');

    // Get data from both sources
    const mondayItems = await getMondayData();
    const supabaseEvents = await getSupabaseData();

    console.log('📊 DATA COMPARISON:');
    console.log(`Monday.com: ${mondayItems.length} items`);
    console.log(`Supabase: ${supabaseEvents.length} events\n`);

    // Filter out empty/template items from Monday.com
    const validMondayItems = mondayItems.filter(item => 
      item.name && 
      item.name.trim() !== '' && 
      !item.name.includes('Element hinzufügen')
    );

    console.log('📋 MONDAY.COM ITEMS:');
    validMondayItems.forEach((item, index) => {
      const statusColumn = item.column_values.find(col => col.id === 'status');
      const status = statusColumn ? statusColumn.text : 'No status';
      console.log(`${index + 1}. "${item.name}" (Status: ${status})`);
    });

    console.log('\n📋 SUPABASE EVENTS:');
    supabaseEvents.forEach((event, index) => {
      console.log(`${index + 1}. "${event.title}" (Status: ${event.status})`);
    });

    // Check for missing items
    const mondayTitles = validMondayItems.map(item => item.name);
    const supabaseTitles = supabaseEvents.map(event => event.title);
    
    const missingInSupabase = mondayTitles.filter(title => !supabaseTitles.includes(title));
    const extraInSupabase = supabaseTitles.filter(title => !mondayTitles.includes(title));

    console.log('\n🔍 MIGRATION STATUS:');
    if (missingInSupabase.length === 0 && extraInSupabase.length === 0) {
      console.log('✅ Perfect match! All Monday.com items are in Supabase');
    } else {
      if (missingInSupabase.length > 0) {
        console.log(`❌ Missing in Supabase (${missingInSupabase.length} items):`);
        missingInSupabase.forEach(title => console.log(`   - "${title}"`));
      }
      if (extraInSupabase.length > 0) {
        console.log(`➕ Extra in Supabase (${extraInSupabase.length} items):`);
        extraInSupabase.forEach(title => console.log(`   - "${title}"`));
      }
    }

    console.log('\n📈 SUMMARY:');
    console.log(`- Monday.com valid items: ${validMondayItems.length}`);
    console.log(`- Supabase events: ${supabaseEvents.length}`);
    console.log(`- Migration completeness: ${((supabaseEvents.length / validMondayItems.length) * 100).toFixed(1)}%`);

  } catch (error) {
    console.error('💥 Error during verification:', error);
  }
}

verifyMigration().catch(console.error);

