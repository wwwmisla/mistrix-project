/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cascadia', 'sans-serif']
      },
      colors: {
        greenOne: '#008000',
        bgOne: 'rgba(5, 5, 5, 0.8)'
      },
    },
  },
  plugins: [],
}

