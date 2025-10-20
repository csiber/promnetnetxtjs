// tailwind.config.js
// import { nextui } from "@nextui-org/react";

const withOpacity = (variable, fallbackOpacityVariable) => {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgb(var(${variable}) / ${opacityValue})`;
    }

    if (fallbackOpacityVariable !== undefined) {
      return `rgb(var(${variable}) / var(${fallbackOpacityVariable}))`;
    }

    return `rgb(var(${variable}) / 1)`;
  };
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        background: withOpacity("--color-background"),
        foreground: withOpacity("--color-foreground"),
        muted: withOpacity("--color-muted"),
        border: withOpacity("--color-border", "--color-border-opacity"),
        card: withOpacity("--color-card", "--color-card-opacity"),
        accent: {
          DEFAULT: withOpacity("--color-accent"),
          foreground: withOpacity("--color-accent-foreground"),
        },
        success: withOpacity("--color-success"),
        warning: withOpacity("--color-warning"),
      },
      borderRadius: {
        xl: "1.5rem",
      },
      boxShadow: {
        soft: "0 20px 60px -30px rgba(124, 58, 237, 0.4)",
        accent: "0 25px 80px -40px rgba(236, 72, 153, 0.55)",
      },
      fontFamily: {
        sans: ["var(--font-rubik)", "system-ui", "sans-serif"],
        RubikBold: ["var(--font-rubik)", "system-ui", "sans-serif"],
        RubikExtraBold: ["var(--font-rubik)", "system-ui", "sans-serif"],
        RubikLight: ["var(--font-rubik)", "system-ui", "sans-serif"],
        RubikMedium: ["var(--font-rubik)", "system-ui", "sans-serif"],
        RubikRegular: ["var(--font-rubik)", "system-ui", "sans-serif"],
      },
      gridTemplateColumns: {
        responsive: "repeat(auto-fit, minmax(160px, 1fr))",
      },
    },
  },

  plugins: [require("@tailwindcss/container-queries")],
  // plugins: [require("@tailwindcss/container-queries"), nextui()],
};
