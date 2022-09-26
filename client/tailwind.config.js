/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "4xl": "1792px",
        "6xl": "2048px",
      },
    },
  },
};
