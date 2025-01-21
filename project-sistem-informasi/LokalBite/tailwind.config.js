/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          orange: "#EA6D27",
          "soft-orange": "#FF9256",
        },
      },

      fontSize: {
        "text-xs": [
          "12px",
          {
            lineHeight: "18px",
          },
        ],
        "text-s": [
          "14px",
          {
            lineHeight: "20px",
          },
        ],
        "text-m": [
          "16px",
          {
            lineHeight: "24px",
          },
        ],
        "text-l": [
          "18px",
          {
            lineHeight: "28px",
          },
        ],
        "heading-s": [
          "24px",
          {
            lineHeight: "32px",
          },
        ],
        "heading-m": [
          "32px",
          {
            lineHeight: "40px",
          },
        ],
        "heading-l": [
          "40px",
          {
            lineHeight: "48px",
          },
        ],
        "heading-xl": [
          "48px",
          {
            lineHeight: "56px",
          },
        ],
      },
    },
  },
  plugins: [daisyui],
};
