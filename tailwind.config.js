/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-image': "url('/src/images/oshm0t8a.png')",
      },
      width: {
        'custom-width': '90vw', // Custom width example
      },
    },
  },
  plugins: [],
}

