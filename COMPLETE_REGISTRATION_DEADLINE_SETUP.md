# Complete Registration Deadline Setup Guide

## 🎯 **Goal**
Add the `registration_deadline` column to your Supabase database and align it with the "Anmeldefrist" data from Monday.com.

## 📊 **Current Status**
From the terminal output, we can see the Anmeldefrist data is being extracted correctly:
- Element 1: Anmeldefrist: 2025-09-18
- Element 2: Anmeldefrist: 2025-09-19  
- SALTO-YOUTH Play It Forward: Anmeldefrist: 2025-09-22
- Project Development: Anmeldefrist: 2025-10-15
- Training Course: Anmeldefrist: 2025-10-05

## 🔧 **Step 1: Add the Registration Deadline Column**

### **Option A: Using Supabase Dashboard (Recommended)**

1. **Go to your Supabase SQL Editor**:
   - Open: https://supabase.com/dashboard/project/suztxzbqekxqtvntjhct/sql

2. **Run this SQL command**:
   ```sql
   ALTER TABLE events ADD COLUMN IF NOT EXISTS registration_deadline TEXT;
   ```

3. **Click "Run"** to execute the SQL

4. **Verify the column was added** by running:
   ```bash
   npm run check-column
   ```

### **Option B: Using SQL Query**
You can also run this query to verify the column was added:
```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'events' 
AND column_name = 'registration_deadline';
```

## 🔄 **Step 2: Start the Complete Auto-Sync**

Once the column is added, run the complete auto-sync:

```bash
npm run auto-sync-deadline
```

This will:
- ✅ Map **start_date**: Event start date (date_mkvxvryw)
- ✅ Map **end_date**: Event end date (date_mkvx3kj3)  
- ✅ Map **registration_deadline**: **Anmeldefrist** (datum) ← **NEW!**

## 📋 **Expected Results**

After adding the column and running the sync, you should see:

```
🔄 Updated: "SALTO-YOUTH: Play It Forward - Multiplayer Event"
   📅 Start: 2025-10-22
   📅 End: 2025-10-26
   ⏰ Anmeldefrist: 2025-09-22

🔄 Updated: "SALTO-YOUTH: Project development for beginners"
   📅 Start: 2025-11-24
   📅 End: 2025-11-30
   ⏰ Anmeldefrist: 2025-10-15

🔄 Updated: "SALTO-YOUTH: Training Course Youth Exchanges"
   📅 Start: 2025-11-10
   📅 End: 2025-11-18
   ⏰ Anmeldefrist: 2025-10-05
```

## 🧪 **Step 3: Verify the Data**

### **Check Database Contents**
```bash
npm run debug-db
```

### **Test the Query**
```bash
npm run test-query
```

### **Check Column Exists**
```bash
npm run check-column
```

## 🎯 **Complete Data Mapping**

| Monday.com Field | Column ID | Supabase Column | Example Value |
|------------------|-----------|-----------------|---------------|
| **Event Start** | `date_mkvxvryw` | `start_date` | 2025-10-22 |
| **Event End** | `date_mkvx3kj3` | `end_date` | 2025-10-26 |
| **Anmeldefrist** | `datum` | `registration_deadline` | 2025-09-22 |
| **Beschreibung** | `text_mkvxgxc8` | `description` | Event description |
| **Ort** | `text_mkvx4r1s` | `location` | Chemnitz |
| **Veranstalter** | `text_mkvxwz85` | `organizer` | Youth BCN |
| **Preis** | `numeric_mkvxvemn` | `price` | Event price |
| **Reisekostenerstattung** | `dropdown_mkvx8qt` | `travel_reimbursement` | Yes/No |
| **Link** | `text_mkvxfs6j` | `link` | Registration link |
| **Einschränkungen** | `text_mkvxwbeg` | `restrictions` | Event restrictions |

## 🚀 **Step 4: Test Your Application**

```bash
npm run dev
```

Your application should now display:
- ✅ **Correct event dates** (start and end dates)
- ✅ **Registration deadlines** (Anmeldefrist)
- ✅ **All other event information**

## 🔄 **Step 5: Set Up Continuous Sync**

The auto-sync will run every 5 minutes and keep your Supabase database synchronized with Monday.com changes.

### **Available Commands**

- `npm run auto-sync-deadline` - Complete auto-sync with registration deadline
- `npm run check-column` - Check if registration_deadline column exists
- `npm run debug-db` - View all data in database
- `npm run test-query` - Test data retrieval
- `npm run dev` - Start your application

## ✅ **Success Criteria**

You'll know it's working when:

1. ✅ `npm run check-column` shows: "Column registration_deadline EXISTS!"
2. ✅ `npm run auto-sync-deadline` shows: "Anmeldefrist: [date]" for each event
3. ✅ `npm run debug-db` shows registration_deadline values
4. ✅ Your application displays registration deadlines

## 🎊 **Final Result**

Your system will have:
- **✅ Correct date mapping**: Event start/end dates separate from registration deadlines
- **✅ Registration deadlines**: Anmeldefrist properly mapped to registration_deadline
- **✅ Automatic synchronization**: Supabase stays updated with Monday.com changes
- **✅ Complete data integrity**: All Monday.com fields properly mapped

The key achievement is that **"Anmeldefrist"** from Monday.com is now properly mapped to **`registration_deadline`** in Supabase! 🎯

