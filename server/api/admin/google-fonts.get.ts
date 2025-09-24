export default defineEventHandler(async (event) => {
  try {
    // Use a public API key or environment variable
    const apiKey = process.env.GOOGLE_FONTS_API_KEY || 'AIzaSyB2X5Yz8Q7K9L0M1N2O3P4Q5R6S7T8U9V0'
    
    if (apiKey && apiKey !== 'AIzaSyB2X5Yz8Q7K9L0M1N2O3P4Q5R6S7T8U9V0') {
      const response = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}`)
      
      if (response.ok) {
        const data = await response.json()
        
        return {
          success: true,
          data: data.items.slice(0, 100).map(font => ({
            family: font.family,
            variants: font.variants,
            category: font.category
          }))
        }
      }
    }
    
    // Return expanded curated list of popular fonts
    return {
      success: true,
      data: [
        // Sans-serif fonts
        { family: 'Inter', variants: ['300', '400', '500', '600', '700'], category: 'sans-serif' },
        { family: 'Roboto', variants: ['300', '400', '500', '700'], category: 'sans-serif' },
        { family: 'Open Sans', variants: ['300', '400', '500', '600', '700'], category: 'sans-serif' },
        { family: 'Lato', variants: ['300', '400', '700'], category: 'sans-serif' },
        { family: 'Montserrat', variants: ['300', '400', '500', '600', '700'], category: 'sans-serif' },
        { family: 'Poppins', variants: ['300', '400', '500', '600', '700'], category: 'sans-serif' },
        { family: 'Source Sans Pro', variants: ['300', '400', '600', '700'], category: 'sans-serif' },
        { family: 'Nunito', variants: ['300', '400', '600', '700'], category: 'sans-serif' },
        { family: 'PT Sans', variants: ['400', '700'], category: 'sans-serif' },
        { family: 'Fira Sans', variants: ['300', '400', '500', '700'], category: 'sans-serif' },
        { family: 'Ubuntu', variants: ['300', '400', '500', '700'], category: 'sans-serif' },
        { family: 'Karla', variants: ['300', '400', '500', '700'], category: 'sans-serif' },
        { family: 'Work Sans', variants: ['300', '400', '500', '600', '700'], category: 'sans-serif' },
        { family: 'DM Sans', variants: ['300', '400', '500', '700'], category: 'sans-serif' },
        { family: 'Raleway', variants: ['300', '400', '500', '600', '700'], category: 'sans-serif' },
        { family: 'Oswald', variants: ['300', '400', '500', '600', '700'], category: 'sans-serif' },
        { family: 'Lora', variants: ['400', '700'], category: 'serif' },
        { family: 'Nunito Sans', variants: ['300', '400', '600', '700'], category: 'sans-serif' },
        { family: 'Source Code Pro', variants: ['300', '400', '500', '700'], category: 'monospace' },
        { family: 'Inconsolata', variants: ['400', '700'], category: 'monospace' },
        
        // Serif fonts
        { family: 'Playfair Display', variants: ['400', '700'], category: 'serif' },
        { family: 'Merriweather', variants: ['300', '400', '700'], category: 'serif' },
        { family: 'PT Serif', variants: ['400', '700'], category: 'serif' },
        { family: 'Crimson Text', variants: ['400', '600', '700'], category: 'serif' },
        { family: 'Libre Baskerville', variants: ['400', '700'], category: 'serif' },
        { family: 'DM Serif Display', variants: ['400'], category: 'serif' },
        { family: 'Lora', variants: ['400', '700'], category: 'serif' },
        { family: 'Crimson Pro', variants: ['300', '400', '600', '700'], category: 'serif' },
        { family: 'Libre Caslon Text', variants: ['400', '700'], category: 'serif' },
        { family: 'Zilla Slab', variants: ['300', '400', '500', '700'], category: 'serif' },
        
        // Display fonts
        { family: 'Abril Fatface', variants: ['400'], category: 'display' },
        { family: 'Bebas Neue', variants: ['400'], category: 'display' },
        { family: 'Fredoka One', variants: ['400'], category: 'display' },
        { family: 'Righteous', variants: ['400'], category: 'display' },
        { family: 'Bungee', variants: ['400'], category: 'display' },
        { family: 'Bungee Shade', variants: ['400'], category: 'display' },
        { family: 'Creepster', variants: ['400'], category: 'display' },
        { family: 'Fascinate', variants: ['400'], category: 'display' },
        { family: 'Fascinate Inline', variants: ['400'], category: 'display' },
        { family: 'Monoton', variants: ['400'], category: 'display' },
        
        // Handwriting fonts
        { family: 'Dancing Script', variants: ['400', '700'], category: 'handwriting' },
        { family: 'Pacifico', variants: ['400'], category: 'handwriting' },
        { family: 'Indie Flower', variants: ['400'], category: 'handwriting' },
        { family: 'Amatic SC', variants: ['400', '700'], category: 'handwriting' },
        { family: 'Caveat', variants: ['400', '700'], category: 'handwriting' },
        { family: 'Kalam', variants: ['300', '400', '700'], category: 'handwriting' },
        { family: 'Shadows Into Light', variants: ['400'], category: 'handwriting' },
        { family: 'Satisfy', variants: ['400'], category: 'handwriting' },
        { family: 'Gloria Hallelujah', variants: ['400'], category: 'handwriting' },
        { family: 'Permanent Marker', variants: ['400'], category: 'handwriting' }
      ]
    }
  } catch (error) {
    console.error('Error fetching Google Fonts:', error)
    // Return basic fallback
    return {
      success: true,
      data: [
        { family: 'Inter', variants: ['300', '400', '500', '600', '700'], category: 'sans-serif' },
        { family: 'Roboto', variants: ['300', '400', '500', '700'], category: 'sans-serif' },
        { family: 'Open Sans', variants: ['300', '400', '500', '600', '700'], category: 'sans-serif' },
        { family: 'Montserrat', variants: ['300', '400', '500', '600', '700'], category: 'sans-serif' },
        { family: 'Poppins', variants: ['300', '400', '500', '600', '700'], category: 'sans-serif' },
        { family: 'Playfair Display', variants: ['400', '700'], category: 'serif' },
        { family: 'Merriweather', variants: ['300', '400', '700'], category: 'serif' },
        { family: 'Dancing Script', variants: ['400', '700'], category: 'handwriting' }
      ]
    }
  }
})
