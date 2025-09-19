export default defineEventHandler(async (event) => {
  try {
    const response = await fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyB2X5Yz8Q7K9L0M1N2O3P4Q5R6S7T8U9V0')
    
    if (!response.ok) {
      // If API key fails, return a curated list of popular fonts
      return {
        success: true,
        data: [
          { family: 'Inter', variants: ['300', '400', '500', '600', '700'] },
          { family: 'Roboto', variants: ['300', '400', '500', '700'] },
          { family: 'Open Sans', variants: ['300', '400', '500', '600', '700'] },
          { family: 'Lato', variants: ['300', '400', '700'] },
          { family: 'Montserrat', variants: ['300', '400', '500', '600', '700'] },
          { family: 'Poppins', variants: ['300', '400', '500', '600', '700'] },
          { family: 'Source Sans Pro', variants: ['300', '400', '600', '700'] },
          { family: 'Nunito', variants: ['300', '400', '600', '700'] },
          { family: 'Playfair Display', variants: ['400', '700'] },
          { family: 'Merriweather', variants: ['300', '400', '700'] },
          { family: 'PT Sans', variants: ['400', '700'] },
          { family: 'PT Serif', variants: ['400', '700'] },
          { family: 'Fira Sans', variants: ['300', '400', '500', '700'] },
          { family: 'Ubuntu', variants: ['300', '400', '500', '700'] },
          { family: 'Crimson Text', variants: ['400', '600', '700'] },
          { family: 'Libre Baskerville', variants: ['400', '700'] },
          { family: 'Karla', variants: ['300', '400', '500', '700'] },
          { family: 'Work Sans', variants: ['300', '400', '500', '600', '700'] },
          { family: 'DM Sans', variants: ['300', '400', '500', '700'] },
          { family: 'DM Serif Display', variants: ['400'] }
        ]
      }
    }
    
    const data = await response.json()
    
    return {
      success: true,
      data: data.items.map(font => ({
        family: font.family,
        variants: font.variants,
        category: font.category
      }))
    }
  } catch (error) {
    // Return curated list as fallback
    return {
      success: true,
      data: [
        { family: 'Inter', variants: ['300', '400', '500', '600', '700'] },
        { family: 'Roboto', variants: ['300', '400', '500', '700'] },
        { family: 'Open Sans', variants: ['300', '400', '500', '600', '700'] },
        { family: 'Lato', variants: ['300', '400', '700'] },
        { family: 'Montserrat', variants: ['300', '400', '500', '600', '700'] },
        { family: 'Poppins', variants: ['300', '400', '500', '600', '700'] },
        { family: 'Source Sans Pro', variants: ['300', '400', '600', '700'] },
        { family: 'Nunito', variants: ['300', '400', '600', '700'] },
        { family: 'Playfair Display', variants: ['400', '700'] },
        { family: 'Merriweather', variants: ['300', '400', '700'] }
      ]
    }
  }
})
