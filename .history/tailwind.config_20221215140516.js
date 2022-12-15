/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      10: '0.6px',
      2: '2px',
      3: '3px',
      4: '4px',
      6: '6px',
      8: '8px',
    },
    extend: {
      colors: {
        mainBlue: '#1E28C3',
        mainRed: '#FF1575',
        mainPurple: '#C000A2',
        mainOrange: '#FF7350',
        mainLightOrange: '#FFBA46',
        mainYellow: '#F9F871',
      },
    },
  },
  plugins: [],
};
