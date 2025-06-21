/** @type {import('tailwindcss').Config} */

// tailwind.config.js
module.exports = {
  darkMode: 'class', // ✅ This line is REQUIRED
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
