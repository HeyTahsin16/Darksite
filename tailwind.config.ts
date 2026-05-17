import type { Config } from "tailwindcss";

const config: Config = {
  // Tell Tailwind which files to scan for class names
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      // ── Color palette matching the game's purple/black theme ─────────────
      colors: {
        background: "#000000",
        foreground: "#e8d5ff",
        // Aceternity uses these token names internally
        neutral: {
          50:  "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0a0a0a",
        },
        purple: {
          50:  "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7b2fff",
          800: "#6b21a8",
          900: "#581c87",
          950: "#3b0764",
        },
      },

      // ── Animation keyframes used by Aceternity beams ──────────────────────
      animation: {
        "move-up": "move-up 5s linear infinite",
        "collide": "collide 0.5s ease-in forwards",
      },
      keyframes: {
        "move-up": {
          "0%":   { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%)" },
        },
        "collide": {
          "0%":   { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(1.5)" },
        },
      },

      // ── Background utilities ───────────────────────────────────────────────
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":  "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
