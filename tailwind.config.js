/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        purpleLightC: "#5858FA",
        purpleC: "#150AA1",
        primaryBgLight: "white",
        secondaryBgLight: "#F1F1F1",
        primaryBgDark: "#181818",
        secondaryBgDark: "#282828",
        grayC: "#494949",
        darkborder: "#404040",
      },
    },
  },

  plugins: [require("daisyui")],
  darkMode: ["class", '[data-theme="dark"]'],
  daisyui: {
    themes: [
      "light",
      {
        dark: {
          "base-100": "#181818",
          neutral: "#181818",
        },
      },
    ],
  },
};
