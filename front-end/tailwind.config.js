
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        bgChange: {
          '0%': { backgroundColor: 'transparent' },
          '50%': { backgroundColor: '#5f6FFF' ,}, // Tailwind color 'red-400'
          '100%': { backgroundColor: 'transparent' },
        },
      },
      animation: {
        bgChange: 'bgChange 2s ease-in-out',
      },
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