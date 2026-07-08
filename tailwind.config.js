/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],

  theme: {
    extend: {

      colors: {
        primary: "#111111",
        secondary: "#F8F8F8",

        accent: "#C9A227",

        blush: "#F9DCE5",

        sky: "#DCEEFF",

        card: "#1B1B1B",

        border: "#2A2A2A",
      },

      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Poppins", "sans-serif"],
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },

      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.15)",
      },

    },
  },

  plugins: [],
};