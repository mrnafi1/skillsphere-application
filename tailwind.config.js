/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Syne'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#fff7ed",
          100: "#ffedd5",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        skillsphere: {
          primary: "#f97316",
          secondary: "#0ea5e9",
          accent: "#8b5cf6",
          neutral: "#1e293b",
          "base-100": "#0f172a",
          "base-200": "#1e293b",
          "base-300": "#334155",
          info: "#0ea5e9",
          success: "#22c55e",
          warning: "#eab308",
          error: "#ef4444",
        },
      },
    ],
  },
};
