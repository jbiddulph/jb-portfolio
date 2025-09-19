import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    // Create a default design
    const defaultDesign = await prisma.jbiddulph_designs.create({
      data: {
        name: 'Modern Blue Theme',
        description: 'A modern design with blue accents and clean typography',
        primary_color: '#2563eb',
        secondary_color: '#1e40af',
        accent_color: '#3b82f6',
        background_color: '#ffffff',
        text_color: '#1f2937',
        font_family: 'Inter, sans-serif',
        heading_font: 'Inter, sans-serif',
        body_font: 'Inter, sans-serif',
        font_size_base: '16px',
        font_size_h1: '2.5rem',
        font_size_h2: '2rem',
        font_size_h3: '1.5rem',
        font_size_h4: '1.25rem',
        font_size_h5: '1.125rem',
        font_size_h6: '1rem',
        container_width: '1200px',
        sidebar_width: '250px',
        header_height: '80px',
        footer_height: '120px',
        margin_small: '0.5rem',
        margin_medium: '1rem',
        margin_large: '2rem',
        padding_small: '0.5rem',
        padding_medium: '1rem',
        padding_large: '2rem',
        border_radius: '8px',
        shadow_small: '0 1px 3px rgba(0, 0, 0, 0.1)',
        shadow_medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
        shadow_large: '0 10px 25px rgba(0, 0, 0, 0.1)',
        custom_css: '',
        is_active: true
      }
    })

    // Create site info linked to this design
    const siteInfo = await prisma.jbiddulph_info.create({
      data: {
        site_name: 'John Biddulph Portfolio',
        site_slogan: 'Full Stack Developer & Designer',
        site_description: 'A modern portfolio showcasing my development and design work',
        site_footer: '© 2025 John Biddulph. All rights reserved.',
        design_id: defaultDesign.id
      }
    })

    // Create some sample portfolio items
    const portfolioItems = await prisma.jbiddulph_portfolio.createMany({
      data: [
        {
          project_name: 'E-commerce Platform',
          project_date: new Date('2024-01-15'),
          project_link: 'https://example.com/project1',
          project_description: 'A full-stack e-commerce solution built with Vue.js and Node.js'
        },
        {
          project_name: 'Mobile Banking App',
          project_date: new Date('2024-03-20'),
          project_link: 'https://example.com/project2',
          project_description: 'Secure mobile banking application with biometric authentication'
        },
        {
          project_name: 'Data Visualization Dashboard',
          project_date: new Date('2024-06-10'),
          project_link: 'https://example.com/project3',
          project_description: 'Interactive dashboard for real-time data analysis and reporting'
        }
      ]
    })

    // Create some sample links
    const links = await prisma.jbiddulph_links.createMany({
      data: [
        {
          link_name: 'GitHub',
          link_url: 'https://github.com/johnbiddulph'
        },
        {
          link_name: 'LinkedIn',
          link_url: 'https://linkedin.com/in/johnbiddulph'
        },
        {
          link_name: 'Twitter',
          link_url: 'https://twitter.com/johnbiddulph'
        }
      ]
    })

    // Create pages configuration
    const pages = await prisma.jbiddulph_pages.create({
      data: {
        home: 'Welcome to my portfolio',
        cv: 'Download my CV',
        portfolio: 'View my projects',
        documentation: 'Technical documentation',
        blog: 'Read my latest posts'
      }
    })

    return {
      success: true,
      message: 'Sample data created successfully',
      data: {
        design: defaultDesign,
        siteInfo,
        portfolioItems,
        links,
        pages
      }
    }
  } catch (error) {
    console.error('Seed error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to seed sample data'
    })
  }
})
