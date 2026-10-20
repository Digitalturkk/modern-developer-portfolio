import type { Config } from "tailwindcss";

const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: token("bg"),
        surface: token("surface"),
        border: token("border"),
        fg: token("fg"),
        muted: token("muted"),
        accent: token("accent"),
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "none" },
        },
        blink: { "50%": { opacity: "0" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        "page-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "none" },
        },
        eq: { "0%, 100%": { transform: "scaleY(0.3)" }, "50%": { transform: "scaleY(1)" } },
      },
      animation: {
        "fade-up": "fade-up 500ms cubic-bezier(0.22, 1, 0.36, 1) backwards",
        blink: "blink 1.1s steps(1) infinite",
        marquee: "marquee 70s linear infinite",
        "page-in": "page-in 180ms ease-out backwards",
        eq: "eq 1.1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
