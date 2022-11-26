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
    colors: {
      primary: 'rgba(127, 2, 204, 1)',
      secondary: 'rgba(21, 46, 144, 1)',
    },
  },
  plugins: [],
};
