import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "rgb(255 255 255)",
          dark: "rgb(15 23 42)",
        },
        foreground: {
          DEFAULT: "rgb(15 23 42)",
          dark: "rgb(248 250 252)",
        },
        card: {
          DEFAULT: "rgb(255 255 255)",
          dark: "rgb(30 41 59)",
        },
        "card-foreground": {
          DEFAULT: "rgb(15 23 42)",
          dark: "rgb(248 250 252)",
        },
        primary: {
          DEFAULT: "rgb(59 130 246)",
          dark: "rgb(96 165 250)",
        },
        secondary: {
          DEFAULT: "rgb(241 245 249)",
          dark: "rgb(51 65 85)",
        },
        muted: {
          DEFAULT: "rgb(241 245 249)",
          dark: "rgb(51 65 85)",
        },
        accent: {
          DEFAULT: "rgb(241 245 249)",
          dark: "rgb(51 65 85)",
        },
        border: {
          DEFAULT: "rgb(226 232 240)",
          dark: "rgb(51 65 85)",
        },
      },
    },
  },
  plugins: [],
};

export default config;