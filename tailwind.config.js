/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#99e999', 
          500: '#50C878'
        },
      },
      scale: {
        '102': '1.02',
      },
    },
  },
  plugins: [],
}

