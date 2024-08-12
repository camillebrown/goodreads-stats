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
        "primary-gray": "#1f2937",
        "secondary-gray": "#636363",
        "rich-salmon": "#F8442D",
        salmon: "#f66350",
        "baby-blue": "#9EBEFF",
        "secondary-baby-blue": "#4d78ce",
        lavendar: "#a21ef2",
        gold: "#FEAC26",
        "deep-gold": "#ff9a27",
        "error-red": "#e22d20",
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
      keyframes: {
        "scale-up": {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        stroke: "stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards",
        "stroke-slow":
          "stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards",
        "fill-scale":
          "fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both",
        "scale-up": "scale-up 0.3s ease-out forwards",
      },
      backgroundImage: {
        "login-bg": "url('./bg2.svg')",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
