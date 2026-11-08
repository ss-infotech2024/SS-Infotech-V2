/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "border-crawl": {
          "0%": { strokeDashoffset: "0" },
          "100%": { strokeDashoffset: "-100" },
        },
      },
      animation: {
        float: "float 5.5s ease-in-out infinite",
        "border-crawl": "border-crawl 3.4s linear infinite",
      },
      colors: {
        'brand-blue': '#1e3a8a', // Primary blue for brand elements
        'brand-blue-dark': '#1e1b4b', // Darker blue for gradients and hovers
        'brand-accent': '#f59e0b', // Amber accent color for highlights
        'text-foreground': '#1f2937', // Primary dark text
        'text-muted': '#6b7280', // Muted secondary text
        'text-success': '#10b981', // Success green for checkmarks
        'text-blue-100': '#dbeafe', // Light blue for text in dark sections
      },
    },
  },
  plugins: [],
};