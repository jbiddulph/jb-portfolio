// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust the path according to your project structure
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss/nesting'), // Add this line to include the nesting plugin
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}