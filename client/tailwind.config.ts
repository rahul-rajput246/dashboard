import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#10231b",
        moss: "#1d6b4f",
        mint: "#dff6ea",
        sand: "#f7f4ed",
        ember: "#b3562a",
      },
      boxShadow: {
        panel: "0 22px 60px rgba(16, 35, 27, 0.12)",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top left, rgba(95, 184, 138, 0.22), transparent 28%), radial-gradient(circle at bottom right, rgba(179, 86, 42, 0.18), transparent 22%)",
      },
      fontFamily: {
        display: ["Georgia", "Cambria", "Times New Roman", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
