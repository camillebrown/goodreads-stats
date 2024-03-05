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
        mint: "#b8d9a6",
        salmon: "#eb7f56",
      },
      fontFamily: {
        serif: ["var(--font-merriweather)"],
        raleway: ["var(--font-raleway)"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
