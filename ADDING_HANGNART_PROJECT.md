# Adding hangn.art Project to Your Portfolio

There are three ways to add the hangn.art project to your portfolio:

## Option 1: Run the Automated Script (Recommended)

### Prerequisites
You need to configure your database credentials:

1. **Via Cursor Dashboard** (for Cloud Agents):
   - Go to Cursor Dashboard → Cloud Agents → Secrets
   - Add these secrets:
     - `DATABASE_URL`: Your PostgreSQL connection string
     - `SUPABASE_URL`: Your Supabase project URL
     - `SUPABASE_KEY`: Your Supabase anon key

2. **Via .env file** (for local development):
   ```bash
   cp .env.example .env
   # Edit .env and add your credentials
   ```

### Run the Script
Once credentials are configured:

```bash
# Using tsx (recommended for TypeScript)
npx tsx scripts/add-hangnart-project.ts

# Or compile and run with node
npx tsc scripts/add-hangnart-project.ts --esModuleInterop
node scripts/add-hangnart-project.js
```

## Option 2: Add Manually via Admin Interface

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to: `http://localhost:3000/admin/portfolio`

3. Click "Add New Project"

4. Fill in the form:
   - **Project Name**: hangn.art
   - **Description**: A creative art platform showcasing digital artworks and creative expressions. Features a modern gallery interface with responsive design and interactive elements.
   - **Project Date**: (Today's date or your preferred date)
   - **Project Link**: https://hangn.art (or your actual URL)
   - **Project Image**: (Upload or provide image URL)
   - **Project Tags**: Art Platform, Gallery, Creative, Web Design, Digital Art

5. Click "Create Project"

## Option 3: Direct Database Insert

If you have database access, you can run this SQL:

```sql
INSERT INTO jbiddulph_portfolio (
  project_name,
  project_description,
  project_date,
  project_link,
  project_image,
  project_tags,
  live,
  sort_order,
  created_at,
  updated_at
) VALUES (
  'hangn.art',
  'A creative art platform showcasing digital artworks and creative expressions. Features a modern gallery interface with responsive design and interactive elements.',
  NOW(),
  'https://hangn.art', -- Update with your actual URL
  '', -- Add your image URL here
  'Art Platform, Gallery, Creative, Web Design, Digital Art',
  true,
  (SELECT COALESCE(MAX(sort_order), 0) + 1 FROM jbiddulph_portfolio),
  NOW(),
  NOW()
);
```

## Customizing the Project Entry

You can edit the script at `scripts/add-hangnart-project.ts` to customize:
- Project name
- Description
- Date
- Live URL (project_link)
- Image URL (project_image)
- Tags

## Next Steps

After adding the project, you can:
1. View it at: `http://localhost:3000/portfolio`
2. Manage it at: `http://localhost:3000/admin/portfolio`
3. Edit, reorder, or toggle visibility as needed

## Project Details

The hangn.art project entry includes:
- Modern art platform showcase
- Gallery interface with responsive design
- Creative digital art focus
- Interactive elements for enhanced user experience
