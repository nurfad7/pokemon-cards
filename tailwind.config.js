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
      'type-normal': '#A8A77A',
      'type-fire': '#EE8130',
      'type-water': '#6390F0',
      'type-electric': '#F7D02C',
      'type-grass': '#7AC74C',
      'type-ice': '#96D9D6',
      'type-fighting': '#C22E28',
      'type-poison': '#A33EA1',
      'type-ground': '#E2BF65',
      'type-flying': '#A98FF3',
      'type-psychic': '#F95587',
      'type-bug': '#A6B91A',
      'type-rock': '#B6A136',
      'type-ghost': '#735797',
      'type-dragon': '#6F35FC',
      'type-dark': '#705746',
      'type-steel': '#B7B7CE',
      'type-fairy': '#D685AD',
    },
    },
  },
  plugins: [],
}