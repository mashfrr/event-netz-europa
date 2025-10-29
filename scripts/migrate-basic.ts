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

async function migrateBasicData() {
  try {
    console.log('🚀 Starting BASIC data migration from Monday.com to Supabase...');
    console.log('📋 This will migrate ALL events using only basic columns');
    
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

        // Use only basic columns that definitely exist
        const eventData = {
          title: item.name,
          description: getColumnValue('text_mkvxgxc8') || null,
          location: getColumnValue('text_mkvx4r1s') || null,
          organizer: getColumnValue('text_mkvxwz85') || null,
          category: category,
          status: supabaseStatus
        };

        // Use upsert to avoid duplicates (based on title)
        const { error } = await supabase
          .from("events")
          .upsert(eventData, { onConflict: 'title' });

        if (error) {
          console.error(`❌ Error syncing event "${item.name}":`, error);
          errorCount++;
        } else {
          console.log(`✅ Synced event: "${item.name}" (Status: ${supabaseStatus})`);
          successCount++;
        }
      } catch (itemError) {
        console.error(`❌ Error processing item "${item.name}":`, itemError);
        errorCount++;
      }
    }

    console.log(`\n🎉 BASIC migration finished!`);
    console.log(`✅ Successfully synced: ${successCount} events`);
    console.log(`⏭️  Skipped: ${skippedCount} items (empty/templates)`);
    console.log(`❌ Errors: ${errorCount} events`);
    console.log(`📊 Total processed: ${items.length} items`);
    
    if (errorCount === 0) {
      console.log('🎊 All events migrated successfully!');
    }
    
    console.log('\n📋 Next Steps:');
    console.log('1. Run the SQL script to add missing columns: scripts/add-missing-columns.sql');
    console.log('2. Run the full migration: npm run migrate-all');
    
  } catch (error) {
    console.error('💥 Fatal error during migration:', error);
    process.exit(1);
  }
}

// Run the basic migration
migrateBasicData().catch(console.error);

