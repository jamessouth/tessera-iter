/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.jsx",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "entry":"url(/entry.jpg)"
      }
    },
  },
  plugins: [],
}
