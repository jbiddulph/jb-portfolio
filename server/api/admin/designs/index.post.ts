import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const design = await prisma.jbiddulph_designs.create({
      data: {
        name: body.name,
        description: body.description,
        primary_color: body.primary_color,
        secondary_color: body.secondary_color,
        accent_color: body.accent_color,
        background_color: body.background_color,
        text_color: body.text_color,
        font_family: body.font_family,
        heading_font: body.heading_font,
        body_font: body.body_font,
        font_size_base: body.font_size_base,
        font_size_h1: body.font_size_h1,
        font_size_h2: body.font_size_h2,
        font_size_h3: body.font_size_h3,
        font_size_h4: body.font_size_h4,
        font_size_h5: body.font_size_h5,
        font_size_h6: body.font_size_h6,
        container_width: body.container_width,
        sidebar_width: body.sidebar_width,
        header_height: body.header_height,
        footer_height: body.footer_height,
        margin_small: body.margin_small,
        margin_medium: body.margin_medium,
        margin_large: body.margin_large,
        padding_small: body.padding_small,
        padding_medium: body.padding_medium,
        padding_large: body.padding_large,
        border_radius: body.border_radius,
        shadow_small: body.shadow_small,
        shadow_medium: body.shadow_medium,
        shadow_large: body.shadow_large,
        site_name_size_desktop: body.site_name_size_desktop,
        site_name_size_mobile: body.site_name_size_mobile,
        site_description_size_desktop: body.site_description_size_desktop,
        site_description_size_mobile: body.site_description_size_mobile,
        layout_columns: body.layout_columns,
        google_fonts: body.google_fonts,
        portfolio_card_background_color: body.portfolio_card_background_color,
        custom_css: body.custom_css,
        is_active: false
      }
    })
    
    return {
      success: true,
      data: design
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create design'
    })
  }
})
