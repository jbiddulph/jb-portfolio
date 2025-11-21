import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function verifyLinks() {
  try {
    const links = await prisma.jbiddulph_links.findMany({
      orderBy: { created_at: 'desc' }
    })
    
    console.log('\nCurrent links in database:')
    console.log('============================')
    links.forEach(link => {
      console.log(`- ${link.link_name}: ${link.link_url}`)
    })
    console.log('============================\n')
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

verifyLinks()

