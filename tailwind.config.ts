import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "var(--brand-red)",
          "red-hover": "var(--brand-red-hover)",
        },
        bg: {
          primary: "var(--bg-primary)",
          surface: "var(--bg-surface)",
          elevated: "var(--bg-elevated)",
          hero: "var(--bg-hero)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
        border: "var(--border)",
      },
      fontFamily: {
        heading: ["var(--font-bebas-neue)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        "hero-h1": [
          "clamp(42px, 8vw, 80px)",
          { lineHeight: "1.05", letterSpacing: "0.04em" },
        ],
        "section-h2": [
          "clamp(28px, 5vw, 48px)",
          { lineHeight: "1.1", letterSpacing: "0.04em" },
        ],
      },
      boxShadow: {
        "brand-glow": "0 0 30px var(--brand-red-glow)",
        "card-hover": "0 8px 30px rgba(0, 0, 0, 0.4)",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(to top, var(--bg-primary) 0%, transparent 60%)",
        "hero-gradient-left":
          "linear-gradient(to right, var(--bg-primary) 0%, transparent 40%)",
      },
    },
  },
  plugins: [],
};

export default config;
