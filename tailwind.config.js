/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#c0a975",
        secondary: "#0070ff",
        tertiary: "#ffefca",
      }
    },
  },
  plugins: [],
}