import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function addHangnArtProject() {
  try {
    console.log('Adding hangn.art project to portfolio...')
    
    // Get the maximum sort order to place this project at the end
    const maxSortOrder = await prisma.jbiddulph_portfolio.aggregate({
      _max: { sort_order: true }
    })
    
    // Create the hangn.art project
    const project = await prisma.jbiddulph_portfolio.create({
      data: {
        project_name: 'hangn.art',
        project_description: 'A creative art platform showcasing digital artworks and creative expressions. Features a modern gallery interface with responsive design and interactive elements.',
        project_date: new Date(), // Current date
        project_link: 'https://hangn.art', // Update with actual URL if different
        project_image: '', // Add your project image URL here
        project_tags: 'Art Platform, Gallery, Creative, Web Design, Digital Art',
        live: true,
        sort_order: (maxSortOrder._max.sort_order ?? 0) + 1
      }
    })
    
    console.log('✅ hangn.art project added successfully!')
    console.log('Project details:', {
      id: project.id,
      name: project.project_name,
      date: project.project_date,
      sort_order: project.sort_order
    })
    
  } catch (error) {
    console.error('❌ Error adding hangn.art project:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the script
addHangnArtProject()
  .then(() => {
    console.log('Script completed successfully')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Script failed:', error)
    process.exit(1)
  })
