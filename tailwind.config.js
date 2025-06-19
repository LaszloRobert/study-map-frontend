/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#181A20',
        surface: '#23262F',
        primary: '#3B82F6',
        secondary: '#F59E42',
        accent: '#EF476F',
        text: '#F3F4F6',
        muted: '#A1A1AA',
        error: '#EF4444',
        success: '#22C55E',
      },
    },
  },
  plugins: [],
}