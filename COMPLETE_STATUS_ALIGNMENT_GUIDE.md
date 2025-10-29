# Complete Status Alignment Guide

## 🎯 **Goal**
Align the Supabase database with ALL Monday.com data including status, registration deadlines, and all other properties.

## 📊 **Monday.com Status Data Found**

From the analysis, here are the status values in Monday.com:

| Event | Monday.com Status | Should Map To | Description |
|-------|------------------|---------------|-------------|
| **Element 1** | "Entwurf" | "draft" | Draft event (not yet approved) |
| **Element 2** | "Entwurf" | "draft" | Draft event (not yet approved) |
| **SALTO-YOUTH Play It Forward** | "Genehmigt" | "approved" | Approved event (visible to users) |
| **Project Development** | "Genehmigt" | "approved" | Approved event (visible to users) |
| **Training Course** | "Entwurf" | "draft" | Draft event (not yet approved) |

## 🔧 **Step 1: Add the Status Column to Supabase**

### **Using Supabase Dashboard**

1. **Go to your Supabase SQL Editor**: 
   - Open: https://supabase.com/dashboard/project/suztxzbqekxqtvntjhct/sql

2. **Run this SQL command**:
   ```sql
   ALTER TABLE events ADD COLUMN IF NOT EXISTS status TEXT;
   ```

3. **Click "Run"** to execute the SQL

4. **Verify the column was added** by running:
   ```bash
   npm run check-status-col
   ```

## 🔄 **Step 2: Start the Complete Auto-Sync**

Once the status column is added, run the complete auto-sync:

```bash
npm run auto-sync-complete
```

This will map ALL Monday.com data including:
- **✅ start_date**: Event start date (date_mkvxvryw)
- **✅ end_date**: Event end date (date_mkvx3kj3)  
- **✅ registration_deadline**: Anmeldefrist (datum)
- **✅ status**: Monday.com status → Supabase status ← **NEW!**
- **✅ location**: Event location (text_mkvx4r1s)
- **✅ organizer**: Event organizer (text_mkvxwz85)
- **✅ price**: Event price (numeric_mkvxvemn)
- **✅ travel_reimbursement**: Travel reimbursement (dropdown_mkvx8qt)
- **✅ link**: Registration link (text_mkvxfs6j)
- **✅ restrictions**: Event restrictions (text_mkvxwbeg)

## 📋 **Complete Status Mapping Logic**

The auto-sync will map Monday.com status values as follows:

| Monday.com Status | Supabase Status | Description | Visibility |
|------------------|-----------------|-------------|------------|
| **"Genehmigt"** | `"approved"` | Approved events | ✅ Visible to users |
| **"Entwurf"** | `"draft"` | Draft events | ❌ Hidden from users |
| **Other/Empty** | `"pending"` | Default status | ⏳ Pending approval |

## 🎯 **Expected Results After Complete Sync**

After adding the status column and running the complete sync, you should see:

```
🔄 Updated: "SALTO-YOUTH: Play It Forward - Multiplayer Event"
   📅 Event: 2025-10-22 → 2025-10-26
   ⏰ Anmeldefrist: 2025-09-22
   📊 Status: Genehmigt → approved
   📍 Location: Chemnitz
   👤 Organizer: null

🔄 Updated: "SALTO-YOUTH: Project development for beginners"
   📅 Event: 2025-11-24 → 2025-11-30
   ⏰ Anmeldefrist: 2025-10-15
   📊 Status: Genehmigt → approved
   📍 Location: Berlin
   👤 Organizer: Youth Power Germany e.V

🔄 Updated: "SALTO-YOUTH: Training Course Youth Exchanges"
   📅 Event: 2025-11-10 → 2025-11-18
   ⏰ Anmeldefrist: 2025-10-05
   📊 Status: Entwurf → draft
   📍 Location: Vic, Spanien
   👤 Organizer: Youth BCN
```

## 🧪 **Step 3: Verify the Complete Data**

### **Check Status Column Exists**
```bash
npm run check-status-col
```

### **Test Complete Sync**
```bash
npm run auto-sync-complete
```

### **Debug All Data Including Status**
```bash
npm run debug-deadlines
```

## 🎯 **Complete Data Mapping Table**

| Monday.com Field | Column ID | Supabase Column | Example Value | Status |
|------------------|-----------|-----------------|---------------|---------|
| **Event Start** | `date_mkvxvryw` | `start_date` | 2025-10-22 | ✅ |
| **Event End** | `date_mkvx3kj3` | `end_date` | 2025-10-26 | ✅ |
| **Anmeldefrist** | `datum` | `registration_deadline` | 2025-09-22 | ✅ |
| **Status** | `status` | `status` | **Genehmigt → approved** | ✅ |
| **Beschreibung** | `text_mkvxgxc8` | `description` | Event description | ✅ |
| **Ort** | `text_mkvx4r1s` | `location` | Chemnitz | ✅ |
| **Veranstalter** | `text_mkvxwz85` | `organizer` | Youth BCN | ✅ |
| **Preis** | `numeric_mkvxvemn` | `price` | 50 | ✅ |
| **Reisekostenerstattung** | `dropdown_mkvx8qt` | `travel_reimbursement` | Yes/No | ✅ |
| **Link** | `text_mkvxfs6j` | `link` | Registration link | ✅ |
| **Einschränkungen** | `text_mkvxwbeg` | `restrictions` | Event restrictions | ✅ |

## 🚀 **Step 4: Update SupabaseService for Status Filtering**

After adding the status column, you can update the SupabaseService to filter by status:

```typescript
// In src/services/supabaseService.ts
static async getEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'approved') // Only show approved events
    .order('start_date', { ascending: true })
  // ... rest of the method
}
```

## ✅ **Success Criteria**

You'll know it's working when:

1. ✅ `npm run check-status-col` shows: "Column status EXISTS!"
2. ✅ `npm run auto-sync-complete` shows: "Status: [Monday.com status] → [Supabase status]"
3. ✅ `npm run debug-deadlines` shows status values for all events
4. ✅ Your application can filter events by status
5. ✅ Only approved events are visible to users

## 🎊 **Final Result**

Your system will have:
- **✅ Complete data alignment**: All Monday.com fields properly mapped
- **✅ Status-based filtering**: Events properly categorized as approved/draft/pending
- **✅ Registration deadlines**: Anmeldefrist properly stored and displayed
- **✅ Event dates**: Start and end dates properly separated
- **✅ All event properties**: Location, organizer, price, restrictions, etc.
- **✅ Automatic synchronization**: Supabase stays updated with Monday.com changes

The key achievement is that **ALL Monday.com data** is now properly aligned with Supabase, including the **status information** that controls event visibility! 🎯

