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

async function syncMondayToSupabase() {
  try {
    console.log('🔄 Starting automatic sync from Monday.com to Supabase...');
    
    const items = await getMondayData();
    console.log(`📊 Found ${items.length} items in Monday.com`);

    let updatedCount = 0;
    let createdCount = 0;
    let errorCount = 0;

    for (const item of items) {
      try {
        // Map column IDs to field names
        const getColumnValue = (columnId: string) => {
          const column = item.column_values.find(col => col.id === columnId);
          return column ? column.text : '';
        };

        // Skip empty or template items
        if (!item.name || item.name.trim() === '' || item.name.includes('Element hinzufügen')) {
          continue;
        }

        // Check if event already exists in Supabase
        const { data: existingEvent } = await supabase
          .from('events')
          .select('id')
          .eq('title', item.name)
          .single();

        const eventData = {
          title: item.name,
          description: getColumnValue('text_mkvxgxc8') || null,
          start_date: getColumnValue('date_mkvxvryw') || null,
          end_date: getColumnValue('date_mkvx3kj3') || null,
          registration_deadline: getColumnValue('datum') || null,
          location: getColumnValue('text_mkvx4r1s') || null,
          price: getColumnValue('numeric_mkvxvemn') || null,
          travel_reimbursement: getColumnValue('dropdown_mkvx8qt') === "Ja" ? "Yes" : "No",
          link: getColumnValue('text_mkvxfs6j') || null,
          restrictions: getColumnValue('text_mkvxwbeg') || null,
          organizer: getColumnValue('text_mkvxwz85') || null,
          picture: null
        };

        if (existingEvent) {
          // Update existing event
          const { error } = await supabase
            .from('events')
            .update(eventData)
            .eq('id', existingEvent.id);

          if (error) {
            console.error(`❌ Error updating event "${item.name}":`, error);
            errorCount++;
          } else {
            console.log(`🔄 Updated: "${item.name}"`);
            updatedCount++;
          }
        } else {
          // Create new event
          const { error } = await supabase
            .from('events')
            .insert([eventData]);

          if (error) {
            console.error(`❌ Error creating event "${item.name}":`, error);
            errorCount++;
          } else {
            console.log(`➕ Created: "${item.name}"`);
            createdCount++;
          }
        }
      } catch (itemError) {
        console.error(`❌ Error processing item "${item.name}":`, itemError);
        errorCount++;
      }
    }

    console.log(`\n🎉 Sync completed!`);
    console.log(`➕ Created: ${createdCount} events`);
    console.log(`🔄 Updated: ${updatedCount} events`);
    console.log(`❌ Errors: ${errorCount} events`);
    
  } catch (error) {
    console.error('💥 Fatal error during sync:', error);
  }
}

// Run sync immediately
syncMondayToSupabase().catch(console.error);

// Set up automatic sync every 5 minutes
console.log('⏰ Setting up automatic sync every 5 minutes...');
setInterval(syncMondayToSupabase, 5 * 60 * 1000); // 5 minutes

console.log('🔄 Auto-sync system started!');
console.log('📋 This will keep Supabase synchronized with Monday.com changes');
console.log('⏹️  Press Ctrl+C to stop');

