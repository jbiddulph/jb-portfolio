# Adding Lucidity App to Your Portfolio

There are three ways to add the Lucidity app project to your portfolio:

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
npx tsx scripts/add-lucidity-project.ts

# Or compile and run with node
npx tsc scripts/add-lucidity-project.ts --esModuleInterop
node scripts/add-lucidity-project.js
```

## Option 2: Add Manually via Admin Interface

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to: `http://localhost:3000/admin/portfolio`

3. Click "Add New Project"

4. Fill in the form:
   - **Project Name**: Lucidity App
   - **Description**: A comprehensive web application showcasing modern development practices with Nuxt, Supabase, and Prisma. Features include portfolio management, content management system, admin dashboard, and responsive design with customizable themes.
   - **Project Date**: 2024-06-18 (or your preferred date)
   - **Project Link**: (Add your live URL if available)
   - **Project Image**: (Upload or provide image URL)
   - **Project Tags**: Nuxt.js, Vue.js, Supabase, Prisma, TypeScript, Tailwind CSS, PostgreSQL

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
  'Lucidity App',
  'A comprehensive web application showcasing modern development practices with Nuxt, Supabase, and Prisma. Features include portfolio management, content management system, admin dashboard, and responsive design with customizable themes.',
  '2024-06-18',
  '', -- Add your URL here
  '', -- Add your image URL here
  'Nuxt.js, Vue.js, Supabase, Prisma, TypeScript, Tailwind CSS, PostgreSQL',
  true,
  (SELECT COALESCE(MAX(sort_order), 0) + 1 FROM jbiddulph_portfolio),
  NOW(),
  NOW()
);
```

## Customizing the Project Entry

You can edit the script at `scripts/add-lucidity-project.ts` to customize:
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
