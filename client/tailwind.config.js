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
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        stroke: 'stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards',
        'stroke-slow': 'stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;',
        'fill-scale': 'fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both;',
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
