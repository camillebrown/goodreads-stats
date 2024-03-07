/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#fcf5e2",
        sage: "#49916d",
        green: "#15643d",
        salmon: "#eb7f56",
        orange: "#d67c18",
        'deep-orange': "#a05907",
        'light-gray': "#f6f6f6",
      },
      fontFamily: {
        serif: ["var(--font-serif)"],
        raleway: ["var(--font-raleway)"],
      },
      screens:{
        'xs': '480px',
        'mid': '896px',
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
