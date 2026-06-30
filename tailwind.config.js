/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        meesho: {
          purple: '#9C27B0',
          hoverPurple: '#7B1FA2',
          pink: '#F43F5E',
          textDark: '#353535',
          bgLight: '#f9f9f9',
          borderLight: '#e7e7e7',
          textMuted: '#858585',
        }
      }
    },
  },
  plugins: [],
}
