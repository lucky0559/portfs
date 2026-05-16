const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      fontFamily: {
        Alphaget: "Alphaget",
        Louis: "Louis",
        LouisBold: "LouisBold"
      },
      skew: {
        15: "15deg",
        45: "45deg"
      },
      translate: {
        "50-px": "50px"
      },
      spacing: {
        "15%": "15%"
      },
      letterSpacing: {
        tighter: "-0.02em",
        tight: "-0.01em",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em"
      },
      boxShadow: {
        glow: "0 0 20px rgba(206, 206, 90, 0.15)",
        "glow-pink": "0 0 20px rgba(167, 130, 149, 0.15)",
        "glow-lg": "0 0 30px rgba(206, 206, 90, 0.2)"
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      inherit: "inherit",
      white: "#ffffff",
      black: "#000000",
      red: {
        300: "#fca5a5",
        400: "#f87171",
        500: "#ef4444",
      },
      primaryBackground: "#331D2C",
      secondaryBackground: "#3F2E3E",
      pastelPink: "#A78295",
      light: "#EFE1D1",
      greenApple: "#CECE5A",
      menuPrimary: "#48594a",
      menuLightPrimary: "#9abf9e"
    },
    screens: {
      xs: "390px",
      // => @media (min-width: 390px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1100px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px"
      // => @media (min-width: 1536px) { ... }
    }
  },
  darkMode: "class",
  plugins: [nextui()]
};
