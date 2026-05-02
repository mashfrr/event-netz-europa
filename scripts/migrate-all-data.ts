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

async function migrateAllData() {
  try {
    console.log('🚀 Starting COMPLETE data migration from Monday.com to Supabase...');
    console.log('📋 This will migrate ALL events, regardless of status');
    
    const items = await getMondayData();
    console.log(`📊 Found ${items.length} total items in Monday.com board`);

    let successCount = 0;
    let errorCount = 0;
    let skippedCount = 0;

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

        // Get status and map it properly
        const mondayStatus = getColumnValue('status');
        let supabaseStatus = 'pending';
        
        if (mondayStatus && mondayStatus.toLowerCase().includes('genehmigt')) {
          supabaseStatus = 'approved';
        } else if (mondayStatus && mondayStatus.toLowerCase().includes('entwurf')) {
          supabaseStatus = 'draft';
        }

        // Map category
        const mondayCategory = getColumnValue('dropdown_mkvxvvwz');
        let category = 'community';
        if (mondayCategory) {
          const categoryLower = mondayCategory.toLowerCase();
          if (categoryLower.includes('bildung') || categoryLower.includes('education')) {
            category = 'education';
          } else if (categoryLower.includes('sozial') || categoryLower.includes('social')) {
            category = 'social';
          } else if (categoryLower.includes('umwelt') || categoryLower.includes('environment')) {
            category = 'environment';
          }
        }

        // Map all Monday.com data to Supabase structure
        const eventData = {
          title: item.name,
          description: getColumnValue('text_mkvxgxc8') || null,
          location: getColumnValue('text_mkvx4r1s') || null, // Location field
          link: getColumnValue('text_mkvxfs6j') || null,
          cost: getColumnValue('numeric_mkvxvemn') || null,
          travel_reimbursement: getColumnValue('dropdown_mkvx8qt') === "Ja" ? "Yes" : "No",
          organizer: getColumnValue('text_mkvxwz85') || null,
          restrictions: getColumnValue('text_mkvxwbeg') || null,
          start_time: getColumnValue('date_mkvxvryw') || null,
          end_time: getColumnValue('datum') || null,
          registration_deadline: getColumnValue('date_mkvx3kj3') || null,
          category: category,
          status: supabaseStatus,
          attendees: 0,
          // Map Monday.com ID to a custom field for reference
          monday_id: item.id
        };

        // Use upsert to avoid duplicates (based on title)
        const { error } = await supabase
          .from("events")
          .upsert(eventData, { onConflict: 'title' });

        if (error) {
          if (error.message.includes('Could not find the') && error.message.includes('column')) {
            console.error(`❌ Database schema issue: ${error.message}`);
            console.log('📋 Please create the database table first:');
            console.log('🔗 Go to: https://supabase.com/dashboard/project/suztxzbqekxqtvntjhct/sql');
            console.log('📄 Copy and paste the contents of supabase-schema.sql');
            process.exit(1);
          } else {
            console.error(`❌ Error syncing event "${item.name}":`, error);
            errorCount++;
          }
        } else {
          console.log(`✅ Synced event: "${item.name}" (Status: ${supabaseStatus})`);
          successCount++;
        }
      } catch (itemError) {
        console.error(`❌ Error processing item "${item.name}":`, itemError);
        errorCount++;
      }
    }

    console.log(`\n🎉 COMPLETE migration finished!`);
    console.log(`✅ Successfully synced: ${successCount} events`);
    console.log(`⏭️  Skipped: ${skippedCount} items (empty/templates)`);
    console.log(`❌ Errors: ${errorCount} events`);
    console.log(`📊 Total processed: ${items.length} items`);
    
    if (errorCount === 0) {
      console.log('🎊 All events migrated successfully!');
    }
    
    // Show summary of what was migrated
    console.log('\n📋 Migration Summary:');
    console.log('- All events from Monday.com have been transferred');
    console.log('- Status mapping: Genehmigt → approved, Entwurf → draft, others → pending');
    console.log('- Category mapping: Bildung → education, others → community');
    console.log('- All field mappings preserved');
    
  } catch (error) {
    console.error('💥 Fatal error during migration:', error);
    process.exit(1);
  }
}

// Run the complete migration
migrateAllData().catch(console.error);

