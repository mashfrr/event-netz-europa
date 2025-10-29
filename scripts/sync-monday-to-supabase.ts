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
  
  // console.log('Monday.com API Response:', JSON.stringify(data, null, 2));
  
  if (!response.ok) {
    throw new Error(`Monday API error: ${response.status} ${response.statusText}`);
  }
  
  if (data.errors) {
    throw new Error(`Monday API error: ${data.errors[0].message}`);
  }
  
  if (!data.data || !data.data.boards || data.data.boards.length === 0) {
    throw new Error('No boards found in Monday.com response');
  }
  
  return data.data.boards[0].items_page.items;
}

async function syncData() {
  try {
    console.log('🔄 Starting data sync from Monday.com to Supabase...');
    
    const items = await getMondayData();
    console.log(`📊 Found ${items.length} items in Monday.com board`);

    let successCount = 0;
    let errorCount = 0;

    for (const item of items) {
      try {
        // Map column IDs to field names (based on the original MondayService)
        const getColumnValue = (columnId: string) => {
          const column = item.column_values.find(col => col.id === columnId);
          return column ? column.text : '';
        };

        // Check if event is approved
        const status = getColumnValue('status');
        if (!status || !status.toLowerCase().includes('genehmigt')) {
          console.log(`⏭️  Skipping event "${item.name}" - not approved (status: ${status})`);
          continue;
        }

        // Map Monday.com data to Supabase structure using column IDs
        const eventData = {
          title: item.name,
          description: getColumnValue('text_mkvxgxc8') || null, // Description column
          location: getColumnValue('text_mkvx4r1s') || null, // Location column (text_mkvx4r1s)
          link: getColumnValue('text_mkvxfs6j') || null, // Link column
          cost: getColumnValue('numeric_mkvxvemn') || null, // Cost column
          travel_reimbursement: getColumnValue('dropdown_mkvx8qt') === "Ja",
          organizer: getColumnValue('text_mkvxwz85') || null, // Organizer column
          restrictions: getColumnValue('text_mkvxwbeg') || null, // Restrictions column
          start_time: getColumnValue('date_mkvxvryw') || null, // Start date
          end_time: getColumnValue('datum') || null, // End date
          registration_deadline: getColumnValue('date_mkvx3kj3') || null, // Registration deadline
          category: getColumnValue('dropdown_mkvxvvwz')?.toLowerCase().includes('bildung') ? 'education' : 'community',
          status: 'approved',
          attendees: 0
        };

        // Use upsert to avoid duplicates
        const { error } = await supabase
          .from("events")
          .upsert(eventData, { onConflict: 'title' });

        if (error) {
          if (error.message.includes('Could not find the') && error.message.includes('column')) {
            console.error(`❌ Database schema issue: ${error.message}`);
            console.log('📋 Please run the database schema first:');
            console.log('🔗 Go to: https://supabase.com/dashboard/project/suztxzbqekxqtvntjhct/sql');
            console.log('📄 Copy and paste the contents of supabase-schema.sql');
            console.log('📖 See SETUP_INSTRUCTIONS.md for detailed steps');
            process.exit(1);
          } else {
            console.error(`❌ Error syncing event "${item.name}":`, error);
            errorCount++;
          }
        } else {
          console.log(`✅ Synced event: "${item.name}"`);
          successCount++;
        }
      } catch (itemError) {
        console.error(`❌ Error processing item "${item.name}":`, itemError);
        errorCount++;
      }
    }

    console.log(`\n🎉 Sync completed!`);
    console.log(`✅ Successfully synced: ${successCount} events`);
    console.log(`❌ Errors: ${errorCount} events`);
    
    if (errorCount === 0) {
      console.log('🎊 All events synced successfully!');
    }
    
  } catch (error) {
    console.error('💥 Fatal error during sync:', error);
    process.exit(1);
  }
}

// Run the sync
syncData().catch(console.error);
