/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // `sans` is intentionally left as Tailwind's default: certificate templates rely on it.
      fontFamily: {
        ui: ['"Plus Jakarta Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          DEFAULT: "#1d1736",
          soft: "#4b4466",
          muted: "#7a7395",
          faint: "#a49fba",
        },
        violet: {
          brand: "#6d28d9",
        },
      },
      boxShadow: {
        glass: "0 1px 0 0 rgba(255,255,255,0.75) inset, 0 12px 40px -18px rgba(54, 23, 110, 0.28)",
        "glass-lg": "0 1px 0 0 rgba(255,255,255,0.8) inset, 0 30px 80px -30px rgba(54, 23, 110, 0.4)",
        glow: "0 10px 30px -10px rgba(124, 58, 237, 0.65)",
        "glow-sm": "0 6px 18px -8px rgba(124, 58, 237, 0.6)",
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) rotate(0deg)" },
          "50%": { transform: "translate3d(0, -24px, 0) rotate(6deg)" },
        },
        "float-alt": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) rotate(0deg)" },
          "50%": { transform: "translate3d(18px, 20px, 0) rotate(-8deg)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        aurora: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "33%": { transform: "translate3d(6%, -4%, 0) scale(1.08)" },
          "66%": { transform: "translate3d(-5%, 5%, 0) scale(0.96)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "float-slow": "float-slow 14s ease-in-out infinite",
        "float-alt": "float-alt 18s ease-in-out infinite",
        "spin-slow": "spin-slow 40s linear infinite",
        aurora: "aurora 26s ease-in-out infinite",
        shimmer: "shimmer 1.6s infinite",
        "fade-up": "fade-up 0.35s ease-out both",
      },
    },
  },
  plugins: [],
};
