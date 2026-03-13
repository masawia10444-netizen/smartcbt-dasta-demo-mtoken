/** @type {import('tailwindcss').Config} */

const headlessui = require("@headlessui/tailwindcss");
const defaultTheme = require("tailwindcss/defaultTheme");
const debugScreens = require("tailwindcss-debug-screens");
const tailwindForms = require("@tailwindcss/forms");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "320px",
      ...defaultTheme.screens,
      "2xl": "1440px",
      "3xl": "1536px",
      print: { raw: "print" },
    },
    extend: {
      fontFamily: {
        prompt: ["var(--font-prompt)"],
        roboto: ["var(--font-roboto)"],
      },
      fontSize: {
        "2xs": "0.625rem",
        md: "1.5rem",
      },
      colors: {
        "smart-cbt-green": "#73D13D",
        "smart-cbt-green-2": "#39B78A",
        "smart-cbt-green-3": "#8AC7A3",
        "smart-cbt-light-green": "#F6FFED",
        "smart-cbt-very-light-green": "#ECFFF4",
        "smart-cbt-medium-green": "#95DE64",
        "smart-cbt-border-green": "#BCE3CB",
        "smart-cbt-dark-green": "#005E38",
        "smart-cbt-very-dark-grey": "#595959",
        "smart-cbt-dark-grey": "#8C8C8C",
        "smart-cbt-medium-grey": "#BFBFBF",
        "smart-cbt-light-grey": "#F5F5F5",
        "smart-cbt-very-light-grey": "#F0F0F0",
        "smart-cbt-red": "#F5222D",
        "smart-cbt-light-red": "#FFAFC0",
        "smart-cbt-red-2": "#FF7875",
        "smart-cbt-red-3": "#C03551",
        "smart-cbt-yellow": "#FFC53D",
        "smart-cbt-yellow-2": "#FFF1B8",
        "smart-cbt-yellow-3": "#FFFAE3",
        "smart-cbt-orange": "#FA8C16",
        "smart-cbt-orange-2": "#FFD08B",
        "smart-cbt-brown": "#B18208",
        "smart-cbt-blue": "#096DD9",
        "smart-cbt-light-blue": "#85C5FF",
        "smart-cbt-blue-2": "#1890FF",
        "smart-cbt-blue-3": "#E2F5FF",
        "smart-cbt-cyan": "#006D75",
      },
    },
  },
  plugins: [debugScreens, headlessui, tailwindForms({ strategy: "class" }), require("@tailwindcss/line-clamp")],
};
