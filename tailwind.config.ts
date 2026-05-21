import type { Config } from "tailwindcss";

const config = {
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
    "./src/features/**/*.{ts,tsx,mdx}",
    "./src/content/**/*.{ts,tsx,mdx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "var(--space-page-x)",
      screens: {
        "2xl": "1440px"
      }
    },
    extend: {
      colors: {
        background: "hsl(var(--color-background) / <alpha-value>)",
        foreground: "hsl(var(--color-foreground) / <alpha-value>)",
        surface: {
          DEFAULT: "hsl(var(--color-surface) / <alpha-value>)",
          elevated: "hsl(var(--color-surface-elevated) / <alpha-value>)"
        },
        muted: {
          DEFAULT: "hsl(var(--color-muted) / <alpha-value>)",
          foreground: "hsl(var(--color-muted-foreground) / <alpha-value>)"
        },
        border: "hsl(var(--color-border) / <alpha-value>)",
        accent: {
          DEFAULT: "hsl(var(--color-accent) / <alpha-value>)",
          foreground: "hsl(var(--color-accent-foreground) / <alpha-value>)",
          muted: "hsl(var(--color-accent-muted) / <alpha-value>)"
        },
        secondary: {
          DEFAULT: "hsl(var(--color-secondary) / <alpha-value>)",
          foreground: "hsl(var(--color-secondary-foreground) / <alpha-value>)"
        },
        ring: "hsl(var(--color-ring) / <alpha-value>)",
        grid: "hsl(var(--color-grid) / <alpha-value>)",
        success: "hsl(var(--color-success) / <alpha-value>)",
        warning: "hsl(var(--color-warning) / <alpha-value>)",
        danger: "hsl(var(--color-danger) / <alpha-value>)"
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"]
      },
      spacing: {
        page: "var(--space-page-x)",
        section: "var(--space-section-y)",
        container: "var(--space-container)",
        rhythm: "var(--space-rhythm)",
        gutter: "var(--space-gutter)"
      },
      borderRadius: {
        theme: "var(--radius-theme)",
        sm: "var(--radius-small)"
      },
      borderWidth: {
        hairline: "var(--border-hairline)"
      },
      transitionDuration: {
        theme: "var(--duration-theme)",
        "theme-slow": "var(--duration-theme-slow)"
      },
      transitionTimingFunction: {
        theme: "var(--ease-theme)",
        "theme-out": "var(--ease-out-theme)"
      },
      translate: {
        reveal: "var(--reveal-y)"
      },
      backgroundImage: {
        "theme-grid":
          "linear-gradient(hsl(var(--color-grid) / 0.24) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--color-grid) / 0.24) 1px, transparent 1px)"
      },
      boxShadow: {
        theme:
          "0 24px 90px hsl(var(--color-foreground) / 0.13), 0 2px 12px hsl(var(--color-foreground) / 0.08)"
      }
    }
  },
  plugins: []
} satisfies Config;

export default config;
