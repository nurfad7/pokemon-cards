/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    colors: {
      'dark-grey': '#252A3E',
      'medium-grey': '#3D4466',
      'light-grey': '#97A0CC',
      'dark-navy': '#05091B',
      'medium-navy': '#0C1231',
      'health-green-1': '#6CF0A1',
      'health-green-2': '#2AE3B7',
    },
    },
  },
  plugins: [],
}