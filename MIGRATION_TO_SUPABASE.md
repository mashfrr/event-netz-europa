# Migration from Monday.com to Supabase

This document explains how the project has been migrated from Monday.com to Supabase for better performance and reliability.

## What Changed

### 1. Database Backend
- **Before**: Events were fetched from Monday.com API (slow, rate-limited)
- **After**: Events are stored and fetched from Supabase (fast, reliable)

### 2. Data Structure
The project now uses a proper database schema with the following structure:

```sql
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  organizer TEXT,
  category TEXT CHECK (category IN ('social', 'environment', 'education', 'community')) DEFAULT 'community',
  attendees INTEGER DEFAULT 0,
  max_attendees INTEGER,
  image TEXT,
  images JSONB,
  friends_attending JSONB,
  is_registered BOOLEAN DEFAULT FALSE,
  registration_deadline TEXT,
  cost TEXT,
  restrictions TEXT,
  link TEXT,
  application_type TEXT CHECK (application_type IN ('anmeldung', 'bewerbung')) DEFAULT 'anmeldung',
  city TEXT,
  start_time TEXT,
  end_time TEXT,
  travel_reimbursement TEXT,
  status TEXT CHECK (status IN ('approved', 'pending', 'draft')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. Service Layer
- **SupabaseService**: Handles all database operations with proper field mapping
- **Data Transformation**: Automatically maps between database fields and interface fields
- **Error Handling**: Improved error handling and logging

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy the environment variables from `env.example`:
```bash
cp env.example .env
```

The environment variables are already configured with the correct Supabase credentials.

### 3. Run the Migration
To sync data from Monday.com to Supabase:

```bash
npm run migrate
```

This will:
- Fetch all events from Monday.com
- Transform the data to match the Supabase schema
- Insert/update events in Supabase
- Provide detailed logging of the process

### 4. Start the Application
```bash
npm run dev
```

## Benefits of the Migration

### Performance Improvements
- **Faster Loading**: Direct database queries instead of API calls
- **Better Caching**: Supabase handles caching automatically
- **Reduced Latency**: No external API dependencies

### Reliability Improvements
- **No Rate Limits**: No Monday.com API rate limiting
- **Better Error Handling**: Proper database error handling
- **Data Consistency**: ACID transactions ensure data integrity

### Development Benefits
- **Real-time Updates**: Supabase supports real-time subscriptions
- **Better Querying**: Full SQL query capabilities
- **Admin Interface**: Built-in admin interface for data management
- **Scalability**: Can handle much larger datasets

## Data Migration Details

The migration script (`scripts/sync-monday-to-supabase.ts`) performs the following mapping:

| Monday.com Field | Supabase Field | Notes |
|------------------|----------------|-------|
| `name` | `title` | Event title |
| `Description` | `description` | Event description |
| `Location` | `location` | Event location |
| `Link` | `link` | Registration link |
| `Price` | `cost` | Event cost |
| `TravelReimbursement` | `travel_reimbursement` | Boolean field |
| `Organizer` | `organizer` | Event organizer |
| `Restrictions` | `restrictions` | Event restrictions |

## Admin Interface

The admin interface (`/admin`) now works with Supabase and provides:
- View all events
- Add new events
- Edit existing events
- Delete events
- Search and filter events

## API Endpoints

The SupabaseService provides the following methods:
- `getEvents()`: Get all approved events
- `getEventById(id)`: Get a specific event
- `createEvent(event)`: Create a new event
- `updateEvent(id, updates)`: Update an event
- `deleteEvent(id)`: Delete an event
- `searchEvents(query)`: Search events
- `getEventsByCategory(category)`: Get events by category

## Troubleshooting

### Common Issues

1. **Connection Issues**: Ensure the Supabase URL and key are correct
2. **Permission Issues**: Check that the anon key has proper permissions
3. **Data Not Loading**: Verify that events have `status = 'approved'`

### Debug Mode
Enable debug logging by checking the browser console for detailed error messages.

## Future Enhancements

- Real-time event updates
- User authentication and event registration
- Advanced filtering and search
- Event analytics and reporting
- Image upload and management

