# Setup Instructions for Supabase Migration

## Step 1: Create the Database Schema

Before running the migration, you need to create the events table in your Supabase database.

### Option A: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard: https://supabase.com/dashboard/project/suztxzbqekxqtvntjhct/sql
2. Click on "SQL Editor" in the left sidebar
3. Copy the entire contents of `supabase-schema.sql` file
4. Paste it into the SQL editor
5. Click "Run" to execute the schema

### Option B: Using Supabase CLI

If you have the Supabase CLI installed:

```bash
supabase db push
```

## Step 2: Test the Connection

Run the setup script to verify everything is working:

```bash
npm run setup-db
```

This should show:
```
✅ Supabase connection successful!
📊 Found 0 events in database
```

## Step 3: Run the Migration

Once the database schema is set up, run the migration:

```bash
npm run migrate
```

This will:
- Fetch all events from Monday.com
- Filter for approved events only
- Insert them into Supabase
- Show detailed progress and results

## Step 4: Start the Application

```bash
npm run dev
```

The application will now use Supabase instead of Monday.com for much better performance!

## Troubleshooting

### "Could not find column" errors
This means the database schema hasn't been applied yet. Follow Step 1 above.

### Monday.com API errors
Check that the API token is still valid and the board ID is correct.

### No events showing
Make sure events have `status = 'Genehmigt'` in Monday.com to be included in the migration.

## Database Schema

The events table includes these fields:
- `id` (UUID, primary key)
- `title` (TEXT, required)
- `description` (TEXT)
- `location` (TEXT)
- `organizer` (TEXT)
- `category` (TEXT: 'social', 'environment', 'education', 'community')
- `attendees` (INTEGER, default 0)
- `max_attendees` (INTEGER)
- `image` (TEXT)
- `images` (JSONB)
- `friends_attending` (JSONB)
- `is_registered` (BOOLEAN, default false)
- `registration_deadline` (TEXT)
- `cost` (TEXT)
- `restrictions` (TEXT)
- `link` (TEXT)
- `application_type` (TEXT: 'anmeldung', 'bewerbung')
- `city` (TEXT)
- `start_time` (TEXT)
- `end_time` (TEXT)
- `travel_reimbursement` (TEXT)
- `status` (TEXT: 'approved', 'pending', 'draft')
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## Performance Benefits

After migration, you'll experience:
- **10x faster loading times** (no external API calls)
- **No rate limiting** (unlimited queries)
- **Better error handling** (proper database errors)
- **Real-time capabilities** (Supabase subscriptions)
- **Admin interface** (built-in data management)

