import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        fog: {
          50: "#f6f6f6",
          100: "#ececec",
          200: "#e6e6e6",
          300: "#d9d9d9"
        }
      },
      boxShadow: {
        soft: "0 24px 80px rgba(15, 23, 42, 0.08)"
      },
      backgroundImage: {
        "fog-radial": "radial-gradient(circle at top, rgba(255,255,255,0.92), rgba(236,236,236,0.68) 48%, rgba(230,230,230,0.9) 100%)"
      }
    }
  },
  plugins: []
};

export default config;
