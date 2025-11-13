import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://suztxzbqekxqtvntjhct.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1enR4emJxZWt4cXR2bnRqaGN0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDA5NDM4OSwiZXhwIjoyMDc1NjcwMzg5fQ.UM1EgHy9gKKqJdTrF89AbLG2o9m-o659LdArkrEy5sg";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function debugGermanStatus() {
  try {
    console.log('🔍 Debugging Supabase database with German status values...\n');
    
    // Get all events with all fields
    const { data: events, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('❌ Error fetching events:', error);
      return;
    }
    
    console.log(`📊 Total events in database: ${events?.length || 0}\n`);
    
    if (events && events.length > 0) {
      console.log('📋 EVENTS WITH GERMAN STATUS VALUES:');
      events.forEach((event, index) => {
        console.log(`${index + 1}. "${event.title}"`);
        console.log(`   📅 Event: ${event.start_date || 'null'} → ${event.end_date || 'null'}`);
        console.log(`   ⏰ Anmeldefrist: ${event.registration_deadline || 'null'}`);
        console.log(`   📊 Status: ${event.status || 'null'} (German)`);
        console.log(`   📍 Location: ${event.location || 'null'}`);
        console.log(`   👤 Organizer: ${event.organizer || 'null'}`);
        console.log(`   💰 Price: ${event.price || 'null'}`);
        console.log(`   🚗 Travel Reimbursement: ${event.travel_reimbursement || 'null'}`);
        console.log(`   🔗 Link: ${event.link || 'null'}`);
        console.log(`   📝 Restrictions: ${event.restrictions || 'null'}`);
        console.log('   ---');
      });
    } else {
      console.log('❌ No events found in database');
    }
    
    // Check German status distribution
    console.log('\n🔍 GERMAN STATUS ANALYSIS:');
    const statusCounts = events?.reduce((acc, event) => {
      const status = event.status || 'null';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};
    
    console.log('📊 Status distribution:');
    Object.entries(statusCounts).forEach(([status, count]) => {
      console.log(`   - ${status}: ${count} events`);
    });
    
    // Show approved events (Genehmigt)
    const approvedEvents = events?.filter(event => event.status === 'Genehmigt') || [];
    console.log(`\n✅ Approved events (Genehmigt): ${approvedEvents.length}`);
    if (approvedEvents.length > 0) {
      approvedEvents.forEach(event => {
        console.log(`   - "${event.title}"`);
      });
    }
    
    // Show draft events (Entwurf)
    const draftEvents = events?.filter(event => event.status === 'Entwurf') || [];
    console.log(`\n📝 Draft events (Entwurf): ${draftEvents.length}`);
    if (draftEvents.length > 0) {
      draftEvents.forEach(event => {
        console.log(`   - "${event.title}"`);
      });
    }
    
    console.log('\n✅ German status debug completed!');
    
  } catch (error) {
    console.error('💥 Error during German status debug:', error);
  }
}

debugGermanStatus().catch(console.error);

