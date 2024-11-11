/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enables dark mode based on a class on the <html> or <body> element
  theme: {
    extend: {
      backgroundImage: {
        'custom-image': "url('/src/images/oshm0t8a.png')",
      },
      width: {
        'custom-width': '90vw', 
      },
      colors: {
        // Your custom colors or any other custom theme extensions
      },
    },
  },
  plugins: [],
}
