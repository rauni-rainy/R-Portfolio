import type { StudioMode } from "@/lib/theme/design-tokens";

export type HeroModeCopy = {
  tagline: string;
  coverMark: string;
  coverKicker: string;
  coverTitle: string;
  coverMeta: string;
};

export const neutralHeroCopy = {
  eyebrow: "FULL-STACK ENGINEER · NIT DURGAPUR",
  tagline: "Building the web for whoever needs it most.",
  prompt: "Choose a client world to change the entire site language."
} as const;

export const heroModeCopy = {
  doctor: {
    tagline: "Precision-built digital health experiences",
    coverMark: "RX",
    coverKicker: "Clinical",
    coverTitle: "Care Portal",
    coverMeta: "trust / clarity / speed"
  },
  fashion: {
    tagline: "High-fashion interfaces with editorial gravity",
    coverMark: "FW",
    coverKicker: "Runway",
    coverTitle: "Lookbook System",
    coverMeta: "contrast / rhythm / desire"
  },
  literary: {
    tagline: "Ink-rich publishing systems for modern readers",
    coverMark: "INK",
    coverKicker: "Archive",
    coverTitle: "Issue Room",
    coverMeta: "texture / prose / memory"
  },
  electronics: {
    tagline: "Neon-sharp commerce for hardware and repair",
    coverMark: "PCB",
    coverKicker: "Circuit",
    coverTitle: "Spec Store",
    coverMeta: "signal / stock / diagnostics"
  },
  aiLab: {
    tagline: "Research-grade AI interfaces people can actually use",
    coverMark: "AI",
    coverKicker: "Lab",
    coverTitle: "Model Console",
    coverMeta: "data / agents / control"
  }
} satisfies Record<StudioMode, HeroModeCopy>;
