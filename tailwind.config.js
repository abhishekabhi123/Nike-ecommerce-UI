/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Dark colors
        dark: {
          900: "#111111",
          700: "#707070",
          400: "#A6A6A6",
        },
        // Light colors
        light: {
          100: "#FFFFFF",
          300: "#F5F5F5",
          400: "#E5E5E5",
          600: "#ACACAC",
        },
        // Supporting colors
        green: "#017744",
        red: "#D71317",
        orange: "#F18A00",
      },
      fontFamily: {
        sans: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
      },
      fontSize: {
        // Based on your typography
        "7xl": ["72px", { lineHeight: "78px", fontWeight: "800" }],
        "6xl": ["64px", { lineHeight: "70px", fontWeight: "700" }],
        xl: ["20px", { lineHeight: "24px", fontWeight: "500" }],
        base: ["18px", { lineHeight: "24px", fontWeight: "400" }],
        sm: ["16px", { lineHeight: "20px", fontWeight: "400" }],
        xs: ["14px", { lineHeight: "18px", fontWeight: "400" }],
      },
      spacing: {
        18: "72px",
        22: "88px",
      },
    },
  },
  plugins: [],
};
