import type { Config } from "tailwindcss";
// @ts-expect-error daisyui does not provide type declarations
import daisyui from "daisyui";

const config: Config & {
  daisyui: {
    themes: string[];
    darkTheme: string;
  };
} = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark"], // Enables both Light and Dark modes
    darkTheme: "dark",
  },
};

export default config;