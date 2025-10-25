/** @type {import('tailwindcss').Config} */
export default {
  // Ensure this content path matches your project structure
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  // 1. Add daisyui to the plugins array
  plugins: [
    require('daisyui'),
  ],
  // 2. Add this daisyui config object
  daisyui: {
    // Specify the themes you want to use.
    // Setting it to just "corporate" will make it the default and only theme.
    themes: ["corporate, cupcake , light , dark"],
  },
}