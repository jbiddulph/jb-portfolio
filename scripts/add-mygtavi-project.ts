import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function addMyGtaviProject() {
  try {
    console.log('Adding myGTAVI project to portfolio...')

    const existing = await prisma.jbiddulph_portfolio.findFirst({
      where: {
        OR: [
          { project_link: { contains: 'mygtavi.com' } },
          { project_name: { equals: 'myGTAVI', mode: 'insensitive' } }
        ]
      }
    })

    if (existing) {
      console.log('✅ myGTAVI already exists in portfolio:', {
        id: existing.id,
        name: existing.project_name,
        link: existing.project_link,
        sort_order: existing.sort_order
      })
      return existing
    }

    const project = await prisma.jbiddulph_portfolio.create({
      data: {
        project_name: 'myGTAVI',
        project_description:
          'Unofficial GTA VI Leonida companion: interactive fan map with collectible pins, personal progress tracking, crew profiles, community board, and a countdown to launch night. Fan-made — not affiliated with Rockstar Games.',
        project_date: new Date('2026-10-11'),
        project_link: 'https://www.mygtavi.com/',
        project_image: 'https://qemafehpoknkbejlbksa.supabase.co/storage/v1/object/public/jbiddulph/portfolio/1791723612250_mygtavi.jpg',
        project_tags: 'Next.js, Supabase, Maps, Community, Collectibles',
        live: true,
        sort_order: 0
      }
    })

    console.log('✅ myGTAVI project added successfully!')
    console.log('Project details:', {
      id: project.id,
      name: project.project_name,
      link: project.project_link,
      date: project.project_date,
      sort_order: project.sort_order
    })

    return project
  } catch (error) {
    console.error('❌ Error adding myGTAVI project:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

addMyGtaviProject()
  .then(() => {
    console.log('Script completed successfully')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Script failed:', error)
    process.exit(1)
  })
