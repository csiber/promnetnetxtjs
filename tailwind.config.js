// tailwind.config.js
// import { nextui } from "@nextui-org/react";

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
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        muted: "var(--color-muted)",
        border: "var(--color-border)",
        card: "var(--color-card)",
        accent: {
          DEFAULT: "var(--color-accent)",
          foreground: "var(--color-accent-foreground)",
        },
        success: "var(--color-success)",
        warning: "var(--color-warning)",
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
