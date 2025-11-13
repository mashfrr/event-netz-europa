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

async function migrateFixedDates() {
  try {
    console.log('🚀 Starting FIXED migration with correct date mapping...');
    console.log('📋 This will fix the date mapping (end_date = event end, not registration deadline)');
    
    const items = await getMondayData();
    console.log(`📊 Found ${items.length} total items in Monday.com board`);

    let successCount = 0;
    let errorCount = 0;
    let skippedCount = 0;

    // Clear existing data first
    console.log('🧹 Clearing existing data...');
    const { error: deleteError } = await supabase
      .from('events')
      .delete()
      .neq('id', 0);
    
    if (deleteError) {
      console.log('⚠️  Could not clear existing data:', deleteError.message);
    } else {
      console.log('✅ Existing data cleared');
    }

    for (const item of items) {
      try {
        // Map column IDs to field names
        const getColumnValue = (columnId: string) => {
          const column = item.column_values.find(col => col.id === columnId);
          return column ? column.text : '';
        };

        // Skip empty or template items
        if (!item.name || item.name.trim() === '' || item.name.includes('Element hinzufügen')) {
          console.log(`⏭️  Skipping empty/template item: "${item.name}"`);
          skippedCount++;
          continue;
        }

        // CORRECT DATE MAPPING:
        // - start_date: date_mkvxvryw (event start date)
        // - end_date: date_mkvx3kj3 (event end date) 
        // - Note: registration deadline (datum) will be added later when column exists
        
        const eventData = {
          title: item.name,
          description: getColumnValue('text_mkvxgxc8') || null,
          start_date: getColumnValue('date_mkvxvryw') || null, // Event start date
          end_date: getColumnValue('date_mkvx3kj3') || null, // Event end date (NOT registration deadline)
          location: getColumnValue('text_mkvx4r1s') || null,
          price: getColumnValue('numeric_mkvxvemn') || null,
          travel_reimbursement: getColumnValue('dropdown_mkvx8qt') === "Ja" ? "Yes" : "No",
          link: getColumnValue('text_mkvxfs6j') || null,
          restrictions: getColumnValue('text_mkvxwbeg') || null,
          organizer: getColumnValue('text_mkvxwz85') || null,
          picture: null
        };

        // Insert with corrected date mapping
        const { error } = await supabase
          .from("events")
          .insert([eventData]);

        if (error) {
          console.error(`❌ Error syncing event "${item.name}":`, error);
          errorCount++;
        } else {
          console.log(`✅ Synced event: "${item.name}"`);
          console.log(`   📅 Start: ${eventData.start_date || 'null'}`);
          console.log(`   📅 End: ${eventData.end_date || 'null'} (Event end date)`);
          console.log(`   ⏰ Registration Deadline: ${getColumnValue('datum') || 'null'} (will be added later)`);
          successCount++;
        }
      } catch (itemError) {
        console.error(`❌ Error processing item "${item.name}":`, itemError);
        errorCount++;
      }
    }

    console.log(`\n🎉 FIXED migration finished!`);
    console.log(`✅ Successfully synced: ${successCount} events`);
    console.log(`⏭️  Skipped: ${skippedCount} items (empty/templates)`);
    console.log(`❌ Errors: ${errorCount} events`);
    console.log(`📊 Total processed: ${items.length} items`);
    
    if (errorCount === 0) {
      console.log('🎊 All events migrated with correct date mapping!');
    }
    
    console.log('\n📋 DATE MAPPING FIXED:');
    console.log('✅ start_date: Event start date (date_mkvxvryw)');
    console.log('✅ end_date: Event end date (date_mkvx3kj3) - NOT registration deadline');
    console.log('⏳ registration_deadline: Will be added when column is created');
    
    console.log('\n📋 NEXT STEPS:');
    console.log('1. Add registration_deadline column to database');
    console.log('2. Run auto-sync to keep data updated: npm run auto-sync');
    
  } catch (error) {
    console.error('💥 Fatal error during migration:', error);
    process.exit(1);
  }
}

// Run the fixed migration
migrateFixedDates().catch(console.error);

