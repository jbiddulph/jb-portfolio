import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function updateLinks() {
  try {
    console.log('Updating links...')
    
    // Find and delete Twitter link
    const twitterLink = await prisma.jbiddulph_links.findFirst({
      where: {
        OR: [
          { link_name: { contains: 'Twitter', mode: 'insensitive' } },
          { link_url: { contains: 'twitter.com', mode: 'insensitive' } }
        ]
      }
    })
    
    if (twitterLink) {
      await prisma.jbiddulph_links.delete({
        where: { id: twitterLink.id }
      })
      console.log('✓ Deleted Twitter link')
    } else {
      console.log('ℹ No Twitter link found to delete')
    }
    
    // Check if CV links already exist
    const existingCVPdf = await prisma.jbiddulph_links.findFirst({
      where: {
        link_name: { contains: 'CV (PDF)', mode: 'insensitive' }
      }
    })
    
    const existingCVDoc = await prisma.jbiddulph_links.findFirst({
      where: {
        link_name: { contains: 'CV (DOC)', mode: 'insensitive' }
      }
    })
    
    // Add CV (PDF) link if it doesn't exist
    if (!existingCVPdf) {
      await prisma.jbiddulph_links.create({
        data: {
          link_name: 'CV (PDF)',
          link_url: '/JohnBiddulph1125-CV.pdf'
        }
      })
      console.log('✓ Added CV (PDF) link')
    } else {
      console.log('ℹ CV (PDF) link already exists')
    }
    
    // Add CV (DOC) link if it doesn't exist
    if (!existingCVDoc) {
      await prisma.jbiddulph_links.create({
        data: {
          link_name: 'CV (DOC)',
          link_url: '/JohnBiddulph1125-CV.docx'
        }
      })
      console.log('✓ Added CV (DOC) link')
    } else {
      console.log('ℹ CV (DOC) link already exists')
    }
    
    console.log('\n✅ Links update completed!')
    
  } catch (error) {
    console.error('Error updating links:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

updateLinks()

