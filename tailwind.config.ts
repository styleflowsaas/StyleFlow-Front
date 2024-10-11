import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        fondo: {
          ligth: "#f2f2f2",
          dark: "#0d0d0d",
        },
        main: {
          DEFAULT: "#692321",
          ligth: "#a33632",
        },
        secundario: {
          DEFAULT: "#7b858c",
          ligth: "#bfb8bb",
        },
        texto: {
          ligth: "#0d0d0d",
          dark: "#f2f2f2",
        },
      },
    },
  },
  plugins: [],
};
export default config;
