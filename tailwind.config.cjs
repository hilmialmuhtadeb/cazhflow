/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '16rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}