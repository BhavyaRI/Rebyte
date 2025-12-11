// 1. IMPORT defaultTheme
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // 2. This part is now correct
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    // 3. I also fixed your themes array.
    // It should be separate strings, not one long string.
    themes: ["corporate", "cupcake", "light", "dark"],
  },
}