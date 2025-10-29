# Add Status Column - Complete Guide

## 🎯 **Goal**
Add the `status` column to your Supabase database and map it with the status data from Monday.com.

## 📊 **Status Information Found in Monday.com**

From the analysis, I found the following status values in Monday.com:

| Event | Monday.com Status | Should Map To |
|-------|------------------|---------------|
| **Element 1** | "Entwurf" | "draft" |
| **Element 2** | "Entwurf" | "draft" |
| **SALTO-YOUTH Play It Forward** | "Genehmigt" | "approved" |
| **Project Development** | "Genehmigt" | "approved" |
| **Training Course** | "Entwurf" | "draft" |

## 🔧 **Step 1: Add the Status Column**

### **Using Supabase Dashboard (Recommended)**

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

## 🔄 **Step 2: Start the Complete Auto-Sync with Status**

Once the column is added, run the complete auto-sync:

```bash
npm run auto-sync-status
```

This will map:
- **✅ start_date**: Event start date (date_mkvxvryw)
- **✅ end_date**: Event end date (date_mkvx3kj3)  
- **✅ registration_deadline**: Anmeldefrist (datum)
- **✅ status**: Monday.com status → Supabase status ← **NEW!**

## 📋 **Status Mapping Logic**

The auto-sync will map Monday.com status values as follows:

| Monday.com Status | Supabase Status | Description |
|------------------|-----------------|-------------|
| **"Genehmigt"** | `"approved"` | Approved events (visible to users) |
| **"Entwurf"** | `"draft"` | Draft events (not yet approved) |
| **Other/Empty** | `"pending"` | Default status |

## 🎯 **Expected Results After Adding Status Column**

After adding the column and running the sync, you should see:

```
🔄 Updated: "SALTO-YOUTH: Play It Forward - Multiplayer Event"
   📅 Start: 2025-10-22
   📅 End: 2025-10-26
   ⏰ Anmeldefrist: 2025-09-22
   📊 Status: Genehmigt → approved

🔄 Updated: "SALTO-YOUTH: Project development for beginners"
   📅 Start: 2025-11-24
   📅 End: 2025-11-30
   ⏰ Anmeldefrist: 2025-10-15
   📊 Status: Genehmigt → approved

🔄 Updated: "SALTO-YOUTH: Training Course Youth Exchanges"
   📅 Start: 2025-11-10
   📅 End: 2025-11-18
   ⏰ Anmeldefrist: 2025-10-05
   📊 Status: Entwurf → draft
```

## 🧪 **Step 3: Verify the Complete Data**

### **Check Status Column Exists**
```bash
npm run check-status-col
```

### **Test Complete Sync**
```bash
npm run auto-sync-status
```

### **Debug All Data Including Status**
```bash
npm run debug-deadlines
```

## 🎯 **Complete Data Mapping**

| Monday.com Field | Column ID | Supabase Column | Example Value |
|------------------|-----------|-----------------|---------------|
| **Event Start** | `date_mkvxvryw` | `start_date` | 2025-10-22 |
| **Event End** | `date_mkvx3kj3` | `end_date` | 2025-10-26 |
| **Anmeldefrist** | `datum` | `registration_deadline` | 2025-09-22 |
| **Status** | `status` | `status` | **Genehmigt → approved** |
| **Beschreibung** | `text_mkvxgxc8` | `description` | Event description |
| **Ort** | `text_mkvx4r1s` | `location` | Chemnitz |
| **Veranstalter** | `text_mkvxwz85` | `organizer` | Youth BCN |
| **Preis** | `numeric_mkvxvemn` | `price` | Event price |
| **Reisekostenerstattung** | `dropdown_mkvx8qt` | `travel_reimbursement` | Yes/No |
| **Link** | `text_mkvxfs6j` | `link` | Registration link |
| **Einschränkungen** | `text_mkvxwbeg` | `restrictions` | Event restrictions |

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
2. ✅ `npm run auto-sync-status` shows: "Status: [Monday.com status] → [Supabase status]"
3. ✅ `npm run debug-deadlines` shows status values for all events
4. ✅ Your application can filter events by status

## 🎊 **Final Result**

Your system will have:
- **✅ Complete data mapping**: All Monday.com fields properly mapped
- **✅ Status information**: Events properly categorized as approved/draft/pending
- **✅ Registration deadlines**: Anmeldefrist properly stored
- **✅ Event dates**: Start and end dates properly separated
- **✅ Automatic synchronization**: Supabase stays updated with Monday.com changes

The key achievement is that **status information** from Monday.com is now properly mapped to the **`status`** column in Supabase! 🎯

