export const modeIds = [
  "doctor",
  "fashion",
  "literary",
  "electronics",
  "aiLab"
] as const;

export type StudioMode = (typeof modeIds)[number];

type ColorTokens = {
  background: string;
  foreground: string;
  surface: string;
  surfaceElevated: string;
  muted: string;
  mutedForeground: string;
  border: string;
  accent: string;
  accentForeground: string;
  accentMuted: string;
  secondary: string;
  secondaryForeground: string;
  ring: string;
  grid: string;
  success: string;
  warning: string;
  danger: string;
};

type FontTokens = {
  display: string;
  body: string;
  mono: string;
};

type SpacingTokens = {
  pageX: string;
  sectionY: string;
  container: string;
  rhythm: string;
  gutter: string;
  radius: string;
  radiusSmall: string;
  hairline: string;
};

type MotionTokens = {
  ease: string;
  easeOut: string;
  duration: string;
  slowDuration: string;
  stagger: string;
  revealY: string;
  parallaxStrength: string;
};

export type ThemeTokens = {
  label: string;
  client: string;
  atmosphere: string;
  colors: ColorTokens;
  fonts: FontTokens;
  spacing: SpacingTokens;
  motion: MotionTokens;
};

export const defaultMode = "aiLab" satisfies StudioMode;

export const neutralThemeTokens = {
  label: "Polymorphic Studio",
  client: "Default portfolio entry state",
  atmosphere: "Dark, restrained, and ready to shift.",
  colors: {
    background: "210 17% 4%", // #08090a
    foreground: "30 20% 94%", // #f5f0eb (warm off-white)
    surface: "210 17% 8%",
    surfaceElevated: "210 17% 12%",
    muted: "210 12% 16%",
    mutedForeground: "30 10% 65%",
    border: "210 10% 20%",
    accent: "36 43% 64%", // #c8a97e (warm gold)
    accentForeground: "210 17% 4%",
    accentMuted: "36 43% 15%",
    secondary: "36 43% 64%",
    secondaryForeground: "210 17% 4%",
    ring: "36 43% 64%",
    grid: "210 15% 15%",
    success: "142 70% 58%",
    warning: "38 92% 48%",
    danger: "352 74% 48%"
  },
  fonts: {
    display: '"Cormorant Garamond", Georgia, serif',
    body: '"DM Sans", "Inter", sans-serif',
    mono: '"DM Mono", monospace'
  },
  spacing: {
    pageX: "clamp(1.5rem, 5vw, 6rem)",
    sectionY: "clamp(6rem, 12vw, 12rem)",
    container: "80rem",
    rhythm: "1.5rem",
    gutter: "clamp(1.25rem, 3vw, 3rem)",
    radius: "9999px", // Pill-shaped buttons
    radiusSmall: "4px",
    hairline: "1px"
  },
  motion: {
    ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    easeOut: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    duration: "800ms",
    slowDuration: "1200ms",
    stagger: "0.06s",
    revealY: "24px",
    parallaxStrength: "0.08"
  }
} satisfies ThemeTokens;

export const themeTokens = {
  doctor: {
    label: "Doctor",
    client: "Clinics, specialists, diagnostics, wellness practices",
    atmosphere: "Clinical clarity, quiet confidence, medical-grade trust.",
    colors: {
      background: "204 15% 95%", // Cool clinical mist
      foreground: "217 39% 13%",
      surface: "0 0% 100%",
      surfaceElevated: "204 25% 92%",
      muted: "204 15% 88%",
      mutedForeground: "211 15% 42%",
      border: "202 20% 80%",
      accent: "203 33% 75%", // #a8c5d8 (cold blue)
      accentForeground: "217 39% 13%",
      accentMuted: "203 33% 92%",
      secondary: "217 39% 25%",
      secondaryForeground: "0 0% 100%",
      ring: "203 33% 75%",
      grid: "202 15% 85%",
      success: "160 64% 34%",
      warning: "38 92% 48%",
      danger: "352 74% 48%"
    },
    fonts: {
      display: '"DM Sans", "Inter", sans-serif', // geometric precision sans-serif
      body: '"DM Sans", "Inter", sans-serif',
      mono: '"DM Mono", monospace'
    },
    spacing: {
      pageX: "clamp(1.5rem, 5vw, 6rem)",
      sectionY: "clamp(6rem, 12vw, 12rem)",
      container: "80rem",
      rhythm: "1.5rem",
      gutter: "clamp(1.25rem, 3vw, 3rem)",
      radius: "9999px",
      radiusSmall: "4px",
      hairline: "1px"
    },
    motion: {
      ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      easeOut: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      duration: "800ms",
      slowDuration: "1200ms",
      stagger: "0.06s",
      revealY: "24px",
      parallaxStrength: "0.08"
    }
  },
  fashion: {
    label: "Fashion Designer",
    client: "Couture labels, stylists, lookbook-led brands",
    atmosphere: "Editorial contrast, runway pacing, expensive negative space.",
    colors: {
      background: "240 4% 9%", // Deep charcoal
      foreground: "30 20% 94%", // #f5f0eb (warm off-white)
      surface: "240 4% 13%",
      surfaceElevated: "240 4% 18%",
      muted: "240 4% 22%",
      mutedForeground: "240 2% 60%",
      border: "240 3% 25%",
      accent: "0 34% 73%", // #d4a0a0 (muted rose)
      accentForeground: "240 4% 9%",
      accentMuted: "0 34% 20%",
      secondary: "0 34% 73%",
      secondaryForeground: "240 4% 9%",
      ring: "0 34% 73%",
      grid: "240 3% 18%",
      success: "145 43% 32%",
      warning: "33 82% 46%",
      danger: "0 34% 73%"
    },
    fonts: {
      display: '"Cormorant Garamond", Georgia, serif', // high-contrast serif
      body: '"DM Sans", "Inter", sans-serif',
      mono: '"DM Mono", monospace'
    },
    spacing: {
      pageX: "clamp(1.5rem, 5vw, 6rem)",
      sectionY: "clamp(6rem, 12vw, 12rem)",
      container: "80rem",
      rhythm: "1.5rem",
      gutter: "clamp(1.25rem, 3vw, 3rem)",
      radius: "9999px",
      radiusSmall: "2px",
      hairline: "1px"
    },
    motion: {
      ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      easeOut: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      duration: "800ms",
      slowDuration: "1200ms",
      stagger: "0.06s",
      revealY: "24px",
      parallaxStrength: "0.08"
    }
  },
  literary: {
    label: "Literary Magazine",
    client: "Journals, zines, publishers, student magazines",
    atmosphere: "Aged paper, ink pressure, archival tactility.",
    colors: {
      background: "38 35% 85%", // Warm aged parchment
      foreground: "30 28% 12%", // Ink black
      surface: "38 30% 78%",
      surfaceElevated: "38 40% 90%",
      muted: "38 20% 72%",
      mutedForeground: "30 19% 38%",
      border: "32 20% 60%",
      accent: "36 43% 64%", // #c8a97e (ink gold)
      accentForeground: "30 28% 12%",
      accentMuted: "36 43% 90%",
      secondary: "30 28% 12%",
      secondaryForeground: "38 35% 85%",
      ring: "36 43% 64%",
      grid: "34 18% 70%",
      success: "128 35% 30%",
      warning: "33 76% 41%",
      danger: "358 62% 42%"
    },
    fonts: {
      display: '"Cormorant Garamond", Georgia, serif', // Cormorant Garamond italic (handled via italic styles)
      body: '"Cormorant Garamond", Georgia, serif',
      mono: '"DM Mono", monospace'
    },
    spacing: {
      pageX: "clamp(1.5rem, 5vw, 6rem)",
      sectionY: "clamp(6rem, 12vw, 12rem)",
      container: "80rem",
      rhythm: "1.5rem",
      gutter: "clamp(1.25rem, 3vw, 3rem)",
      radius: "9999px",
      radiusSmall: "2px",
      hairline: "1px"
    },
    motion: {
      ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      easeOut: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      duration: "800ms",
      slowDuration: "1200ms",
      stagger: "0.06s",
      revealY: "24px",
      parallaxStrength: "0.08"
    }
  },
  electronics: {
    label: "Electronics Shop",
    client: "Gadget stores, repair labs, hardware resellers",
    atmosphere: "Dark circuitry, neon diagnostics, product-spec sharpness.",
    colors: {
      background: "220 20% 4%", // Very dark
      foreground: "30 20% 94%", // #f5f0eb
      surface: "220 20% 8%",
      surfaceElevated: "220 20% 12%",
      muted: "220 15% 16%",
      mutedForeground: "220 10% 60%",
      border: "220 12% 22%",
      accent: "142 70% 58%", // #4ade80 (terminal green)
      accentForeground: "220 20% 4%",
      accentMuted: "142 70% 15%",
      secondary: "142 70% 58%",
      secondaryForeground: "220 20% 4%",
      ring: "142 70% 58%",
      grid: "220 15% 14%",
      success: "142 70% 58%",
      warning: "46 100% 55%",
      danger: "342 95% 58%"
    },
    fonts: {
      display: '"DM Mono", monospace', // Mono display font
      body: '"DM Sans", "Inter", sans-serif',
      mono: '"DM Mono", monospace'
    },
    spacing: {
      pageX: "clamp(1.5rem, 5vw, 6rem)",
      sectionY: "clamp(6rem, 12vw, 12rem)",
      container: "80rem",
      rhythm: "1.5rem",
      gutter: "clamp(1.25rem, 3vw, 3rem)",
      radius: "9999px",
      radiusSmall: "2px",
      hairline: "1px"
    },
    motion: {
      ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      easeOut: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      duration: "800ms",
      slowDuration: "1200ms",
      stagger: "0.06s",
      revealY: "24px",
      parallaxStrength: "0.08"
    }
  },
  aiLab: {
    label: "AI Lab",
    client: "AI products, research groups, automation labs",
    atmosphere: "Terminal focus, data streams, measured synthetic glow.",
    colors: {
      background: "230 35% 5%", // Deep navy-black
      foreground: "30 20% 94%", // #f5f0eb
      surface: "230 30% 9%",
      surfaceElevated: "230 25% 13%",
      muted: "230 18% 18%",
      mutedForeground: "230 12% 62%",
      border: "230 15% 22%",
      accent: "235 90% 74%", // #818cf8 (indigo glow)
      accentForeground: "230 35% 5%",
      accentMuted: "235 90% 20%",
      secondary: "235 90% 74%",
      secondaryForeground: "230 35% 5%",
      ring: "235 90% 74%",
      grid: "230 20% 14%",
      success: "142 70% 58%",
      warning: "52 100% 57%",
      danger: "0 91% 63%"
    },
    fonts: {
      display: '"Cormorant Garamond", Georgia, serif', // hybrid
      body: '"DM Mono", monospace',
      mono: '"DM Mono", monospace'
    },
    spacing: {
      pageX: "clamp(1.5rem, 5vw, 6rem)",
      sectionY: "clamp(6rem, 12vw, 12rem)",
      container: "80rem",
      rhythm: "1.5rem",
      gutter: "clamp(1.25rem, 3vw, 3rem)",
      radius: "9999px",
      radiusSmall: "2px",
      hairline: "1px"
    },
    motion: {
      ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      easeOut: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      duration: "800ms",
      slowDuration: "1200ms",
      stagger: "0.06s",
      revealY: "24px",
      parallaxStrength: "0.08"
    }
  }
} satisfies Record<StudioMode, ThemeTokens>;

export const additionalClientTypes = [
  "Architect / Interior Studio",
  "Restaurant / Cloud Kitchen",
  "Independent Music Artist / Label",
  "Legal Consultant / Boutique Law Firm",
  "Fitness / Wellness Coach",
  "EdTech / Coaching Institute",
  "SaaS / B2B Startup",
  "NGO / Social Impact Campaign",
  "Real Estate / Property Consultant"
] as const;

export function themeToCssVariables(tokens: ThemeTokens) {
  return {
    "--color-background": tokens.colors.background,
    "--color-foreground": tokens.colors.foreground,
    "--color-surface": tokens.colors.surface,
    "--color-surface-elevated": tokens.colors.surfaceElevated,
    "--color-muted": tokens.colors.muted,
    "--color-muted-foreground": tokens.colors.mutedForeground,
    "--color-border": tokens.colors.border,
    "--color-accent": tokens.colors.accent,
    "--color-accent-foreground": tokens.colors.accentForeground,
    "--color-accent-muted": tokens.colors.accentMuted,
    "--color-secondary": tokens.colors.secondary,
    "--color-secondary-foreground": tokens.colors.secondaryForeground,
    "--color-ring": tokens.colors.ring,
    "--color-grid": tokens.colors.grid,
    "--color-success": tokens.colors.success,
    "--color-warning": tokens.colors.warning,
    "--color-danger": tokens.colors.danger,
    "--font-display": tokens.fonts.display,
    "--font-body": tokens.fonts.body,
    "--font-mono": tokens.fonts.mono,
    "--space-page-x": tokens.spacing.pageX,
    "--space-section-y": tokens.spacing.sectionY,
    "--space-container": tokens.spacing.container,
    "--space-rhythm": tokens.spacing.rhythm,
    "--space-gutter": tokens.spacing.gutter,
    "--radius-theme": tokens.spacing.radius,
    "--radius-small": tokens.spacing.radiusSmall,
    "--border-hairline": tokens.spacing.hairline,
    "--ease-theme": tokens.motion.ease,
    "--ease-out-theme": tokens.motion.easeOut,
    "--duration-theme": tokens.motion.duration,
    "--duration-theme-slow": tokens.motion.slowDuration,
    "--stagger-theme": tokens.motion.stagger,
    "--reveal-y": tokens.motion.revealY,
    "--parallax-strength": tokens.motion.parallaxStrength
  } as const;
}
