/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // ✅ Tell Tailwind where to look
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
