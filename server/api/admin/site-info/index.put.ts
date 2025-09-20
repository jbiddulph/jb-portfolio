import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    console.log('Site info update request body:', body)
    
    // Check if site info already exists
    const existing = await prisma.jbiddulph_info.findFirst()
    
    console.log('Existing site info:', existing)
    
    let siteInfo
    if (existing) {
      // Update existing
      siteInfo = await prisma.jbiddulph_info.update({
        where: { id: existing.id },
        data: {
          site_name: body.site_name,
          site_slogan: body.site_slogan,
          site_description: body.site_description,
          site_footer: body.site_footer,
          site_image: body.site_image,
          site_avatar: body.site_avatar,
          design_id: body.design_id || null
        }
      })
      console.log('Updated site info:', siteInfo)
    } else {
      // Create new
      siteInfo = await prisma.jbiddulph_info.create({
        data: {
          site_name: body.site_name,
          site_slogan: body.site_slogan,
          site_description: body.site_description,
          site_footer: body.site_footer,
          site_image: body.site_image,
          site_avatar: body.site_avatar,
          design_id: body.design_id || null
        }
      })
      console.log('Created new site info:', siteInfo)
    }

    // Note: Design selection is now purely user-driven via frontend theme switcher
    // No need to sync is_active status in admin
    
    return {
      success: true,
      data: siteInfo
    }
  } catch (error) {
    console.error('Site info update error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to update site info: ${error.message}`
    })
  }
})
