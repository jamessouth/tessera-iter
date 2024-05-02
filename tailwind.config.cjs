/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.jsx",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "entry_mob_wide":"url(/entryMobWide.jpg)",
        "entry_mob_tall":"url(/entryMobTall.jpg)"
      }
    },
  },
  plugins: [],
}
