import tailwindScrollbar from "tailwind-scrollbar";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css}"],
  theme: {
    extend: {
      screens: {
        lg: "1100px",
      },
      spacing: {
        4.5: "1.125rem", // 18px,
        5.5: "1.375rem", // 22px,
      },
      colors: {
        // u stands for Untitled design system
        "u-neutral-50": "#F9F9F9",
        "u-neutral-100": "#F2F4F7",
        "u-neutral-200": "#EAECF0",
        "u-neutral-400": "#98A2B3",
        "u-neutral-500": "#667085",
        "u-neutral-600": "#475467",
        "u-neutral-700": "#344054",
        "u-neutral-800": "#1D2939",
        "u-neutral-900": "#101828",
        "u-purple-50": "#F9F5FF",
        "u-purple-200": "#E9D7FE",
        "u-purple-400": "#7F56D9",
        "u-purple-700": "#6941C6",
        // text primary color
        "u-text-p-900": "#181D27",
        // text tertiary color
        "u-text-t-600": "#535862",
        // text placeholder color
        "u-text-ph": "#717680",
        // border primary color
        "u-border-p": "#D5D7DA",
        // border secondary color
        "u-border-s": "#E9EAEB",
        // background primary color
        "u-bg-p": "#FFFFFF",
        // foreground quinary color
        "u-fg-q-400": "#A4A7AE",
        // success color
        "u-success": "#12A460",
        // danger color
        "u-danger": "#DF2547",

        "u-purple": "",
      },
      boxShadow: {
        "shadow-sm": "0 1px 2px 0 #00000014",
        "shadow-xs": "0 1px 2px 0 #0A0D120D",
        "shadow-skm-in": "inset 0 -2px 0 0 #0A0D120D",
        "shadow-skm-border-in": "inset 0 0 0 1px #0A0D122E",
      },
    },
  },
  plugins: [tailwindScrollbar({ nocompatible: true })],
};
