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
        "primary-gray": "#505052",
        "secondary-gray": "#636363",
        "bright-red": "#F8442D",
        "baby-blue": "#9EBEFF",
        "secondary-baby-blue": "#4d78ce",
        gold: "#FEAC26",

        cream: "#fcf5e2",
        sage: "#49916d",
        "light-sage": "#84c9a7",
        green: "#15643d",
        salmon: "#eb7f56",
        "test-salmon": "#e65539",
        orange: "#d67c18",
        "error-red": "#e22d20",
        "deep-orange": "#a05907",
        "light-gray": "#f6f6f6",
        "success-green": "#16a34a",
      },
      fontFamily: {
        raleway: ["var(--font-raleway)"],
        manrope: ["var(--font-manrope)"],
        montserrat: ["var(--font-montserrat)"],
      },
      screens: {
        xs: "480px",
        mid: "896px",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        stroke: "stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards",
        "stroke-slow":
          "stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards",
        "fill-scale":
          "fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
