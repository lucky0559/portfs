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
      content: {
        // profile: 'url("/src/app/assets/icons/profile.svg")',
        // experience: 'url("/src/app/assets/icons/experience.png.png")',
        // skills: 'url("/src/app/assets/icons/skills.png")',
        // projects: 'url("/src/app/assets/icons/projects.png")'
      }
    },
    colors: {
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
