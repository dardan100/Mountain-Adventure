/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "more-gray": {
          100: "rgb(229 231 235)",
          200: " rgb(55 65 81)",
          300: "rgb(31 41 55)",
        },
      },
    },
  },
  plugins: [],
};
