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

async function migrateWithCorrectSchema() {
  try {
    console.log('🚀 Starting migration with CORRECT schema mapping...');
    console.log('📋 This will update existing events with proper data from Monday.com');
    
    const items = await getMondayData();
    console.log(`📊 Found ${items.length} total items in Monday.com board`);

    let successCount = 0;
    let errorCount = 0;
    let skippedCount = 0;

    // First, clear existing data to avoid duplicates
    console.log('🧹 Clearing existing data...');
    const { error: deleteError } = await supabase
      .from('events')
      .delete()
      .neq('id', 0); // Delete all records
    
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

        // Get status and map it properly
        const mondayStatus = getColumnValue('status');
        let status = 'pending';
        
        if (mondayStatus && mondayStatus.toLowerCase().includes('genehmigt')) {
          status = 'approved';
        } else if (mondayStatus && mondayStatus.toLowerCase().includes('entwurf')) {
          status = 'draft';
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

        // Map to the CORRECT schema that exists in the database
        const eventData = {
          title: item.name,
          description: getColumnValue('text_mkvxgxc8') || null,
          start_date: getColumnValue('date_mkvxvryw') || null,
          end_date: getColumnValue('datum') || null,
          location: getColumnValue('text_mkvx4r1s') || null,
          price: getColumnValue('numeric_mkvxvemn') || null,
          travel_reimbursement: getColumnValue('dropdown_mkvx8qt') === "Ja" ? "Yes" : "No",
          link: getColumnValue('text_mkvxfs6j') || null,
          restrictions: getColumnValue('text_mkvxwbeg') || null,
          organizer: getColumnValue('text_mkvxwz85') || null,
          categories: category, // Using the existing 'categories' column
          picture: null // No image data from Monday.com
        };

        // Insert with correct schema
        const { error } = await supabase
          .from("events")
          .insert([eventData]);

        if (error) {
          console.error(`❌ Error syncing event "${item.name}":`, error);
          errorCount++;
        } else {
          console.log(`✅ Synced event: "${item.name}" (Status: ${status}, Category: ${category})`);
          successCount++;
        }
      } catch (itemError) {
        console.error(`❌ Error processing item "${item.name}":`, itemError);
        errorCount++;
      }
    }

    console.log(`\n🎉 Migration with correct schema finished!`);
    console.log(`✅ Successfully synced: ${successCount} events`);
    console.log(`⏭️  Skipped: ${skippedCount} items (empty/templates)`);
    console.log(`❌ Errors: ${errorCount} events`);
    console.log(`📊 Total processed: ${items.length} items`);
    
    if (errorCount === 0) {
      console.log('🎊 All events migrated successfully with correct schema!');
    }
    
  } catch (error) {
    console.error('💥 Fatal error during migration:', error);
    process.exit(1);
  }
}

// Run the migration with correct schema
migrateWithCorrectSchema().catch(console.error);

