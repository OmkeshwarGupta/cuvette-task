/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-dark': '#292929B2', // Custom color name
        'custom-2': '#0B66EFB2', // Custom color
      },
    },
  },
  plugins: [],
}


