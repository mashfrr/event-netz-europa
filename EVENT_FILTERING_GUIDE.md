# Event Filtering System Guide

## 🎯 **Goal**
Enable the "Events finden" section to show only approved events (status = "Genehmigt") with registration deadlines that haven't passed yet.

## ✅ **Event Filtering Logic Implemented**

The SupabaseService now filters events using the following criteria:

### **1. Status Filter**
- **✅ Only approved events**: `status = 'Genehmigt'`
- **❌ Hidden events**: `status = 'Entwurf'` (Draft) or `status = 'Abgelehnt'` (Rejected)

### **2. Registration Deadline Filter**
- **✅ Only active events**: `registration_deadline >= today`
- **❌ Hidden events**: Registration deadline has passed

### **3. Combined Filter**
```sql
SELECT * FROM events 
WHERE status = 'Genehmigt' 
  AND registration_deadline >= '2025-10-11'
ORDER BY start_date ASC
```

## 📊 **Current Event Visibility Status**

Based on the test results (as of 2025-10-11):

| Event | Status | Registration Deadline | Visible to Users | Reason |
|-------|--------|----------------------|------------------|---------|
| **SALTO-YOUTH Project Development** | Genehmigt | 2025-10-15 | ✅ **YES** | Approved + deadline not passed |
| **SALTO-YOUTH Play It Forward** | Genehmigt | 2025-09-22 | ❌ NO | Registration deadline passed |
| **SALTO-YOUTH Training Course** | Entwurf | 2025-10-05 | ❌ NO | Not approved (draft) |
| **Element 1** | Entwurf | 2025-09-18 | ❌ NO | Not approved (draft) |
| **Element 2** | Entwurf | 2025-09-19 | ❌ NO | Not approved (draft) |

## 🔧 **Updated SupabaseService Methods**

### **getEvents() Method**
```typescript
static async getEvents(): Promise<Event[]> {
  const today = new Date().toISOString().split('T')[0]
  
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'Genehmigt') // Only approved events
    .gte('registration_deadline', today) // Only events where registration deadline hasn't passed
    .order('start_date', { ascending: true })
  
  // ... rest of the method
}
```

### **getEventById() Method**
```typescript
static async getEventById(id: string): Promise<Event | null> {
  const today = new Date().toISOString().split('T')[0]
  
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .eq('status', 'Genehmigt') // Only approved events
    .gte('registration_deadline', today) // Only events where registration deadline hasn't passed
    .single()
  
  // ... rest of the method
}
```

## 🧪 **Testing the Filtering**

### **Test Event Filtering**
```bash
npm run test-filtering
```

This will show:
- Which events are currently visible to users
- Why certain events are hidden
- All events in the database for comparison

### **Expected Output**
```
📊 Found 1 events visible to users

✅ EVENTS VISIBLE IN "EVENTS FINDEN":
1. "SALTO-YOUTH: Project development for beginners"
   📅 Event: 2025-11-24 → 2025-11-30
   ⏰ Registration Deadline: 2025-10-15
   📊 Status: Genehmigt (Approved)
   📍 Location: Berlin
   👤 Organizer: Youth Power Germany e.V
```

## 🎯 **Event Visibility Rules**

### **Events ARE Visible When:**
- ✅ Status = "Genehmigt" (Approved)
- ✅ Registration deadline >= today's date
- ✅ Event has all required data

### **Events ARE Hidden When:**
- ❌ Status = "Entwurf" (Draft)
- ❌ Status = "Abgelehnt" (Rejected)
- ❌ Registration deadline < today's date
- ❌ Missing registration deadline

## 🚀 **How It Works in the Application**

### **1. Events Page ("Events finden")**
- Only shows approved events with valid registration deadlines
- Users can see and register for these events
- Events are sorted by start date (earliest first)

### **2. Event Detail Pages**
- Only accessible for approved events with valid registration deadlines
- If an event becomes unavailable, the detail page won't load
- Users get a 404 or "Event not found" message

### **3. Automatic Updates**
- The auto-sync system keeps the database updated
- When Monday.com status changes from "Entwurf" to "Genehmigt", events become visible
- When registration deadlines pass, events automatically become hidden

## 📅 **Registration Deadline Examples**

| Registration Deadline | Today's Date | Visible? | Reason |
|----------------------|--------------|----------|---------|
| 2025-10-15 | 2025-10-11 | ✅ YES | Deadline in the future |
| 2025-09-22 | 2025-10-11 | ❌ NO | Deadline has passed |
| 2025-10-11 | 2025-10-11 | ✅ YES | Deadline is today (still valid) |

## 🎊 **Benefits of This System**

1. **✅ User Experience**: Users only see events they can actually register for
2. **✅ Data Integrity**: No confusion with draft or expired events
3. **✅ Automatic Management**: No manual intervention needed
4. **✅ Real-time Updates**: Changes in Monday.com immediately affect visibility
5. **✅ German Status Support**: Properly handles German status values

## 🔄 **Automatic Synchronization**

The auto-sync system (`npm run auto-sync-german`) ensures:
- Status changes in Monday.com are reflected in Supabase
- Registration deadlines are kept up to date
- New events become visible when approved
- Expired events are automatically hidden

Your "Events finden" section now only shows events that users can actually register for! 🎯

