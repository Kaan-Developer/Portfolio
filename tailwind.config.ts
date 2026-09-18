import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: "selector",

  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "rgb(var(--c-background) / <alpha-value>)",
          deep: "rgb(var(--c-background-deep) / <alpha-value>)",
          hero: "rgb(var(--c-background-hero) / <alpha-value>)",
          mobile: "rgb(var(--c-background-mobile) / <alpha-value>)",
        },

        surface: {
          DEFAULT: "rgb(var(--c-surface) / <alpha-value>)",
          elevated: "rgb(var(--c-surface-elevated) / <alpha-value>)",
          hover: "rgb(var(--c-surface-hover) / <alpha-value>)",
          active: "rgb(var(--c-surface-active) / <alpha-value>)",
        },

        border: {
          DEFAULT: "rgb(var(--c-border) / 0.07)",
          subtle: "rgb(var(--c-border) / 0.045)",
          strong: "rgb(var(--c-border) / 0.10)",
          hover: "rgb(var(--c-border) / 0.14)",
        },

        text: {
          primary: "rgb(var(--c-text-primary) / <alpha-value>)",
          secondary: "rgb(var(--c-text-secondary) / <alpha-value>)",
          muted: "rgb(var(--c-text-muted) / <alpha-value>)",
          disabled: "rgb(var(--c-text-disabled) / <alpha-value>)",
        },

        // BLUE NEVER CHANGES BETWEEN THEMES
        accent: {
          DEFAULT: "rgb(var(--c-accent) / <alpha-value>)",
          hover: "rgb(var(--c-accent-hover) / <alpha-value>)",
          light: "rgb(var(--c-accent-light) / <alpha-value>)",
          active: "rgb(var(--c-accent-active) / <alpha-value>)",
        },

        status: {
          available: "#61D995",
          warning: "#F4C95D",
          error: "#F87171",
        },

        white: "#FFFFFF",
      },

      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],

        mono: [
          "JetBrains Mono",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },

      fontSize: {
        "hero-desktop": [
          "4.25rem",
          {
            lineHeight: "0.98",
            letterSpacing: "-0.055em",
            fontWeight: "700",
          },
        ],

        "hero-tablet": [
          "3.5rem",
          {
            lineHeight: "1",
            letterSpacing: "-0.05em",
            fontWeight: "700",
          },
        ],

        "hero-label": [
          "0.625rem",
          {
            lineHeight: "1",
            letterSpacing: "0.22em",
            fontWeight: "500",
          },
        ],

        "section-title": [
          "3rem",
          {
            lineHeight: "1.05",
            letterSpacing: "-0.04em",
            fontWeight: "700",
          },
        ],

        "section-title-mobile": [
          "2.1rem",
          {
            lineHeight: "1.08",
            letterSpacing: "-0.035em",
            fontWeight: "700",
          },
        ],

        eyebrow: [
          "0.68rem",
          {
            lineHeight: "1",
            letterSpacing: "0.22em",
            fontWeight: "500",
          },
        ],

        technical: [
          "0.65rem",
          {
            lineHeight: "1.2",
            letterSpacing: "0.16em",
          },
        ],

        "ui-sm": ["0.75rem", { lineHeight: "1rem" }],
        "ui-md": ["0.8125rem", { lineHeight: "1.125rem" }],
        "ui-lg": ["0.875rem", { lineHeight: "1.25rem" }],
      },

      borderRadius: {
        xs: "3px",
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
        lg: "10px",
        xl: "12px",
        "2xl": "14px",
        panel: "16px",
        "panel-lg": "20px",
        button: "6px",
        pill: "9999px",
      },

      boxShadow: {
        panel:
          "0 0 0 1px rgba(255,255,255,0.015), 0 12px 40px rgba(0,0,0,0.20)",

        "panel-lg":
          "0 0 0 1px rgba(255,255,255,0.02), 0 24px 70px rgba(0,0,0,0.28)",

        card: "0 8px 30px rgba(0,0,0,0.18)",
        "card-hover": "0 14px 40px rgba(0,0,0,0.24)",
        button: "0 4px 16px rgba(0,0,0,0.18)",
        accent: "0 0 24px rgba(36,107,254,0.18)",
        inner: "inset 0 1px 0 rgba(255,255,255,0.025)",
      },

      spacing: {
        "hero-x": "100px",
        "hero-mobile-x": "24px",
        "section-y": "140px",
        "section-mobile-y": "96px",
      },

      maxWidth: {
        content: "1180px",
        text: "680px",
        "hero-copy": "42rem",
        "hero-body": "32rem",
      },

      transitionDuration: {
        100: "100ms",
        150: "150ms",
        200: "200ms",
        250: "250ms",
        500: "500ms",
      },

      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },

      zIndex: {
        content: "0",
        nav: "20",
        chatbot: "30",
        overlay: "40",
        sidebar: "40",
        modal: "50",
      },

      keyframes: {
        fadeUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(18px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },

        scaleIn: {
          "0%": {
            opacity: "0",
            transform: "scale(0.96)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
      },

      animation: {
        "fade-up":
          "fadeUp 700ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fadeIn 500ms ease-out both",
        "scale-in":
          "scaleIn 500ms cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },

  plugins: [],
};

export default config;
