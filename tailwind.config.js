/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/@ionic/vue/**/*.{vue,js,ts,jsx,tsx}" // if you want to style Ionic components
  ],
  theme: {
    extend: {
      fontFamily: {
        'maisonneue': ['MaisonNeueExtended', 'sans-serif'],
      },
      fontWeight: {
        'thin': 100,
        'extrathin': 200,
        'light': 300,
        'medium': 500,
        'demi': 600,
        'bold': 700,
        'extrabold': 800,
        'black': 900,
      }
    },
  },
  plugins: [
    require('daisyui')
  ],
}

