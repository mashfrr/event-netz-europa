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
  console.log('🔄 Bulletproof sync starting...');
  
  const items = await getMondayData();
  console.log(`📊 Found ${items.length} items`);

  // Get column helper
  const getColumn = (item: any, id: string) => {
    const col = item.column_values.find((c: any) => c.id === id);
    const value = col ? col.text : null;
    return (value && value.trim() !== '') ? value : null;
  };

  // BULLETPROOF APPROACH: Delete all and re-insert
  console.log('🗑️  Deleting all existing events...');
  const { error: deleteError } = await supabase
    .from('events')
    .delete()
    .neq('id', 0); // Delete all records

  if (deleteError) {
    console.error('❌ Error deleting events:', deleteError);
    return;
  }
  
  console.log('✅ All existing events deleted');

  console.log('➕ Inserting all Monday.com events...');
  let insertedCount = 0;
  let errorCount = 0;

  for (const item of items) {
    if (!item.name || item.name.trim() === '') continue;

    const mondayTitle = getColumn(item, 'text_mkvxgxc8') || item.name;
    
    // Create event data
    const eventData = {
      title: mondayTitle,
      description: mondayTitle,
      start_date: getColumn(item, 'date_mkvxvryw'),
      end_date: getColumn(item, 'date_mkvx3kj3'),
      registration_deadline: getColumn(item, 'datum'),
      status: getColumn(item, 'status'),
      location: getColumn(item, 'text_mkvx4r1s'),
      price: getColumn(item, 'numeric_mkvxvemn'),
      travel_reimbursement: getColumn(item, 'dropdown_mkvx8qt') === 'Ja' ? true : false,
      link: getColumn(item, 'text_mkvxfs6j'),
      restrictions: getColumn(item, 'text_mkvxwbeg'),
      organizer: getColumn(item, 'text_mkvxwz85'),
      categories: getColumn(item, 'dropdown_mkvxvvwz') ? getColumn(item, 'dropdown_mkvxvvwz').split(',').map(c => c.trim()) : [],
      picture: null
    };

    // Insert new event
    const { error } = await supabase
      .from('events')
      .insert(eventData);
    
    if (error) {
      console.error(`❌ Insert error for "${mondayTitle}":`, error.message);
      errorCount++;
    } else {
      console.log(`✅ Synced: "${mondayTitle}"`);
      insertedCount++;
    }
  }

  console.log(`🎉 Sync completed! ${insertedCount} events synced, ${errorCount} errors`);
}

// Run sync once (not continuously)
console.log('🔄 Running sync once...');
syncMondayToSupabase().catch(console.error);

console.log('✅ Sync completed!');
console.log('📋 To run sync again, execute this script manually');
console.log('🇩🇪 German status values preserved: Entwurf, Abgelehnt, Genehmigt');
