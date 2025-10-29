import fetch from "node-fetch";

const MONDAY_API_URL = "https://api.monday.com/v2";
const MONDAY_API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjU2Mzg3MzA0NiwiYWFpIjoxMSwidWlkIjo4NTE1OTAwMywiaWFkIjoiMjAyNS0wOS0xOFQxNzoxMDoyNi4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6Mjg1NDc4NDIsInJnbiI6ImV1YzEifQ.jk7wndce-RArM4dWu0cD7bVDiat4AShytJW_H56aGg0";
const BOARD_ID = 5001590112;

async function checkMondayStatus() {
  try {
    console.log('🔍 Checking Monday.com status information...\n');
    
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
                type
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
    const items = data.data.boards[0].items_page.items;
    
    console.log(`📊 Found ${items.length} items in Monday.com\n`);
    
    // Show all column information for each item
    items.forEach((item, index) => {
      if (!item.name || item.name.trim() === '' || item.name.includes('Element hinzufügen')) {
        return;
      }
      
      console.log(`${index + 1}. "${item.name}"`);
      console.log('   📋 All columns:');
      
      item.column_values.forEach(col => {
        console.log(`      - ID: ${col.id}, Type: ${col.type}, Value: "${col.text}"`);
      });
      console.log('   ---');
    });
    
    // Look for status-related columns
    console.log('\n🔍 Looking for status-related columns...');
    const statusColumns = items[0]?.column_values?.filter(col => 
      col.text && (
        col.text.toLowerCase().includes('status') ||
        col.text.toLowerCase().includes('genehmigt') ||
        col.text.toLowerCase().includes('entwurf') ||
        col.text.toLowerCase().includes('pending') ||
        col.text.toLowerCase().includes('approved') ||
        col.text.toLowerCase().includes('draft')
      )
    ) || [];
    
    if (statusColumns.length > 0) {
      console.log('📋 Found potential status columns:');
      statusColumns.forEach(col => {
        console.log(`   - ID: ${col.id}, Value: "${col.text}"`);
      });
    } else {
      console.log('❌ No obvious status columns found');
      console.log('📋 All available column IDs and values:');
      items[0]?.column_values?.forEach(col => {
        console.log(`   - ID: ${col.id}, Type: ${col.type}, Value: "${col.text}"`);
      });
    }
    
  } catch (error) {
    console.error('💥 Error checking Monday.com status:', error);
  }
}

checkMondayStatus().catch(console.error);

