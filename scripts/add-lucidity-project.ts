import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function addLucidityProject() {
  try {
    console.log('Adding Lucidity app project to portfolio...')
    
    // Get the maximum sort order to place this project at the end
    const maxSortOrder = await prisma.jbiddulph_portfolio.aggregate({
      _max: { sort_order: true }
    })
    
    // Create the Lucidity project
    const project = await prisma.jbiddulph_portfolio.create({
      data: {
        project_name: 'Lucidity App',
        project_description: 'A comprehensive web application showcasing modern development practices with Nuxt, Supabase, and Prisma. Features include portfolio management, content management system, admin dashboard, and responsive design with customizable themes.',
        project_date: new Date('2024-06-18'), // Using the file dates from your workspace
        project_link: '', // Add your live URL here if you have one
        project_image: '', // Add your project image URL here
        project_tags: 'Nuxt.js, Vue.js, Supabase, Prisma, TypeScript, Tailwind CSS, PostgreSQL',
        live: true,
        sort_order: (maxSortOrder._max.sort_order ?? 0) + 1
      }
    })
    
    console.log('✅ Lucidity project added successfully!')
    console.log('Project details:', {
      id: project.id,
      name: project.project_name,
      date: project.project_date,
      sort_order: project.sort_order
    })
    
  } catch (error) {
    console.error('❌ Error adding Lucidity project:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the script
addLucidityProject()
  .then(() => {
    console.log('Script completed successfully')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Script failed:', error)
    process.exit(1)
  })
