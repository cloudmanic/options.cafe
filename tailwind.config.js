/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["content/**/*.md", "layouts/**/*.html", "content/**/*.html", "assets/css/v2.css"],

  theme: {
    extend: {
      colors: {
        red: {
          550: "#d64561",
          850: "#953043",
        },

        blue: {
          550: "#2a9eca",
        },
      },

      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
