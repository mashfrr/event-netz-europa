# Migration Guide: Monday.com to Supabase

This guide will help you migrate your Event Netz Europa application from Monday.com to Supabase for better performance and reliability.

## 🚀 Benefits of Migration

- **Faster Performance**: Direct database queries instead of API calls
- **Better Reliability**: No more API rate limits or timeouts
- **Full Control**: Complete control over your data structure
- **Cost Effective**: Supabase free tier is generous
- **Real-time Updates**: Built-in real-time subscriptions
- **Better Search**: Full-text search capabilities

## 📋 Prerequisites

1. **Supabase Account**: Sign up at [supabase.com](https://supabase.com)
2. **Node.js**: Ensure you have Node.js installed
3. **Your Monday.com Data**: Make sure you have access to your current data

## 🛠️ Setup Steps

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Choose a region close to your users
3. Wait for the project to be created (takes a few minutes)

### 2. Set Up Database Schema

1. In your Supabase dashboard, go to the SQL Editor
2. Copy and paste the contents of `supabase-schema.sql`
3. Run the SQL to create the events table and policies

### 3. Get Your Supabase Credentials

1. In your Supabase dashboard, go to Settings > API
2. Copy your Project URL and anon/public key
3. Create a `.env` file in your project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_MONDAY_API_TOKEN=your-monday-api-token
```

### 4. Install Dependencies

The Supabase client is already installed. If you need to reinstall:

```bash
npm install @supabase/supabase-js
```

### 5. Migrate Your Data

Run the migration script to move your data from Monday.com to Supabase:

```bash
# Make sure your .env file is set up first
npm run migrate
```

Or run the migration script directly:

```bash
npx ts-node scripts/migrate-to-supabase.ts
```

### 6. Test the Application

1. Start your development server: `npm run dev`
2. Visit `/events` to see your migrated data
3. Visit `/admin` to manage your events (you'll need to set up authentication)

## 🔧 Configuration

### Environment Variables

Create a `.env` file with these variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Monday.com Configuration (for migration only)
VITE_MONDAY_API_TOKEN=your-monday-api-token
```

### Database Policies

The schema includes Row Level Security (RLS) policies:

- **Public Read**: Anyone can read approved events
- **Authenticated Write**: Authenticated users can manage events

## 📊 Admin Interface

Access the admin interface at `/admin` to:

- ✅ View all events
- ✅ Add new events
- ✅ Edit existing events
- ✅ Delete events
- ✅ Search and filter events
- ✅ Manage event status (approved/pending/draft)

## 🔒 Security

### Row Level Security (RLS)

The database uses RLS to ensure:

1. **Public Access**: Only approved events are visible to the public
2. **Admin Access**: Only authenticated users can modify data
3. **Data Protection**: Sensitive data is protected

### Authentication (Optional)

To enable admin authentication:

1. Go to Supabase Dashboard > Authentication
2. Enable email authentication
3. Update the admin interface to include login/logout
4. Modify RLS policies to require authentication

## 🚀 Performance Improvements

After migration, you should see:

- **Faster Load Times**: 3-5x faster than Monday.com API
- **Better Reliability**: No more API timeouts
- **Real-time Updates**: Instant updates when data changes
- **Better Search**: Full-text search across titles and descriptions

## 🔄 Data Management

### Adding Events

1. Use the admin interface at `/admin`
2. Or use the Supabase dashboard directly
3. Or create a custom form for event submission

### Updating Events

1. Edit through the admin interface
2. Bulk updates through Supabase dashboard
3. API calls for automated updates

### Backup

Supabase automatically backs up your data, but you can also:

1. Export data through the Supabase dashboard
2. Set up automated backups
3. Use the Supabase CLI for local backups

## 🆘 Troubleshooting

### Common Issues

1. **Connection Errors**: Check your Supabase URL and API key
2. **Permission Errors**: Verify RLS policies are set correctly
3. **Migration Failures**: Check Monday.com API token and data structure

### Getting Help

1. Check the Supabase documentation
2. Review the migration logs
3. Test with sample data first

## 📈 Next Steps

After successful migration:

1. **Remove Monday.com Dependencies**: Delete `mondayService.ts`
2. **Add Authentication**: Set up user authentication for admin access
3. **Optimize Queries**: Add more indexes based on usage patterns
4. **Add Real-time Features**: Enable real-time updates for live data
5. **Set Up Monitoring**: Monitor database performance and usage

## 🎉 Success!

Once migration is complete, you'll have:

- ✅ Faster, more reliable data access
- ✅ Full control over your data
- ✅ Better user experience
- ✅ Scalable infrastructure
- ✅ Cost-effective solution

Your Event Netz Europa application is now powered by Supabase! 🚀
