import { SupabaseService } from '../src/services/supabaseService';

async function testSupabaseService() {
  try {
    console.log('🧪 Testing SupabaseService.getEvents()...');
    console.log('📋 This will test the actual service used by the application\n');
    
    const events = await SupabaseService.getEvents();
    
    console.log(`📊 Events returned by SupabaseService: ${events.length}\n`);
    
    if (events.length > 0) {
      console.log('✅ EVENTS RETURNED BY SUPABASE SERVICE:');
      events.forEach((event, index) => {
        console.log(`${index + 1}. "${event.title}"`);
        console.log(`   Description: ${event.description || 'null'}`);
        console.log(`   Location: ${event.location || 'null'}`);
        console.log(`   Organizer: ${event.organizer || 'null'}`);
        console.log(`   Start Date: ${event.startTime || 'null'}`);
        console.log(`   End Date: ${event.endTime || 'null'}`);
        console.log(`   Registration Deadline: ${event.registrationDeadline || 'null'}`);
        console.log(`   Status: ${event.status || 'null'}`);
        console.log(`   Category: ${event.category || 'null'}`);
        console.log(`   Attendees: ${event.attendees || 'null'}`);
        console.log('   ---');
      });
    } else {
      console.log('❌ No events returned by SupabaseService');
      console.log('🔍 This means the filtering is working, but no events meet the criteria');
      console.log('📋 Criteria: status = "Genehmigt" AND registration_deadline >= today');
    }
    
    console.log('\n✅ SupabaseService test completed!');
    
  } catch (error) {
    console.error('💥 Error testing SupabaseService:', error);
  }
}

testSupabaseService().catch(console.error);