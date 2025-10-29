# Add Registration Deadline Column - Step by Step Guide

## 🎯 **Goal**
Add the `registration_deadline` column to your Supabase database to properly map the "Anmeldefrist" (registration deadline) from Monday.com.

## 📋 **Step 1: Add the Column to Supabase**

### **Option A: Using Supabase Dashboard (Recommended)**

1. **Go to your Supabase SQL Editor**:
   - Open: https://supabase.com/dashboard/project/suztxzbqekxqtvntjhct/sql

2. **Run this SQL command**:
   ```sql
   ALTER TABLE events ADD COLUMN IF NOT EXISTS registration_deadline TEXT;
   ```

3. **Click "Run"** to execute the SQL

4. **Verify the column was added**:
   ```sql
   SELECT column_name, data_type 
   FROM information_schema.columns 
   WHERE table_name = 'events' 
   ORDER BY ordinal_position;
   ```

### **Option B: Using Supabase CLI (if you have it installed)**
```bash
supabase db reset
# Then run the migration
```

## 📋 **Step 2: Update the Auto-Sync Script**

After adding the column, the auto-sync script will automatically include the registration deadline mapping.

## 📋 **Step 3: Test the Updated Sync**

Once the column is added, run:
```bash
npm run auto-sync
```

This will now properly map:
- **start_date**: Event start date (date_mkvxvryw)
- **end_date**: Event end date (date_mkvx3kj3) 
- **registration_deadline**: Anmeldefrist (datum)

## 🔍 **Current Monday.com Column Mapping**

Based on your Monday.com board structure:

| Monday.com Column | Column ID | Maps to Supabase | Description |
|------------------|-----------|------------------|-------------|
| **Datum** | `date_mkvxvryw` | `start_date` | Event start date |
| **Datum** | `date_mkvx3kj3` | `end_date` | Event end date |
| **Datum** | `datum` | `registration_deadline` | **Anmeldefrist** (registration deadline) |
| **Beschreibung** | `text_mkvxgxc8` | `description` | Event description |
| **Ort** | `text_mkvx4r1s` | `location` | Event location |
| **Veranstalter** | `text_mkvxwz85` | `organizer` | Event organizer |
| **Preis** | `numeric_mkvxvemn` | `price` | Event price |
| **Reisekostenerstattung** | `dropdown_mkvx8qt` | `travel_reimbursement` | Travel reimbursement |
| **Link** | `text_mkvxfs6j` | `link` | Registration link |
| **Einschränkungen** | `text_mkvxwbeg` | `restrictions` | Event restrictions |

## 🚀 **After Adding the Column**

### **1. Run the Working Auto-Sync**
```bash
npm run auto-sync-working
```

### **2. Verify the Data**
```bash
npm run test-query
```

### **3. Check Your Application**
```bash
npm run dev
```

## ✅ **Expected Results**

After adding the column and running the sync, you should see:

- **✅ All events** properly synced
- **✅ Correct date mapping**: start_date, end_date, registration_deadline
- **✅ Anmeldefrist** properly mapped to registration_deadline
- **✅ Automatic updates** when Monday.com changes

## 🔧 **Troubleshooting**

### **If the column addition fails:**
1. Check if you have the correct permissions in Supabase
2. Try running the SQL command directly in the SQL editor
3. Verify the table name is exactly `events`

### **If the sync still fails:**
1. Check the column was actually added: `npm run debug-db`
2. Verify the column name is exactly `registration_deadline`
3. Check for any typos in the SQL command

## 📞 **Need Help?**

If you encounter any issues:
1. Check the Supabase dashboard for error messages
2. Run `npm run debug-db` to see the current table structure
3. Verify the column was added successfully

The key is that **"Anmeldefrist"** from Monday.com should map to **`registration_deadline`** in Supabase, which will be the registration deadline for each event.

