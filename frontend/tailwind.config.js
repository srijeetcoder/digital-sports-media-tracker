/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(210,70%,55%)",
        accent:  "hsl(34,80%,55%)"
      }
    }
  },
  plugins: [],
};
