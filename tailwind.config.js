/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        text: '#e1fdf1',
        background: '#0a0f1f',
        primary: '#40c9a2',
        secondary: '#1e3269',
        accent: '#4b3df1',
      },
    },
  },
  plugins: [],
}