
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary":"#5f6FFF"
      },
      gridTemplateColumns:{
        "auto":"repeat(auto-fill,minmax(200px,1fr))"
      }
    },
    boxShadow: {
      'custom-light': '0 2px 4px rgba(0, 0, 0, 0.1)',
      'custom-dark': '0 4px 8px rgba(0, 0, 0, 0.25)',
    },
  },
  plugins: [],
}