/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {}
  },
  // eslint-disable-next-line
  plugins: [require("daisyui")],
}
