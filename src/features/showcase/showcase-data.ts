import { ReactNode } from "react";
import type { StudioMode } from "@/lib/theme/design-tokens";

export type ShowcaseModeData = {
  id: StudioMode;
  domain: string;
  rationale: string;
};

export const showcaseData: Record<StudioMode, ShowcaseModeData> = {
  doctor: {
    id: "doctor",
    domain: "medflow.health",
    rationale: "Healthcare UI demands trust before beauty. I chose Inter for its clinical precision, navy-blue for authority and calm, and a strict 8px grid to signal that nothing here is approximate. The appointment system prioritizes scanability — a doctor's time is measured in minutes.",
  },
  fashion: {
    id: "fashion",
    domain: "maison.studio",
    rationale: "Luxury is communicated through restraint. Black absorbs everything — attention goes where you direct it, and nowhere else. Cormorant Garamond's high contrast strokes carry centuries of editorial heritage. The gold is used once. That's why it works.",
  },
  literary: {
    id: "literary",
    domain: "themargin.in",
    rationale: "Print typographic conventions exist because centuries of readers proved they work. Justified text, visible column grids, and Playfair's high-contrast serifs aren't aesthetic choices — they're legibility decisions with 400 years of evidence behind them.",
  },
  electronics: {
    id: "electronics",
    domain: "electra.store",
    rationale: "Tech buyers are detail-oriented. Monospace signals precision — every character the same width, no typographic ambiguity. The neon green is a direct reference to terminal culture, building immediate trust with the audience who lives in CLIs and reads datasheets for fun.",
  },
  aiLab: {
    id: "aiLab",
    domain: "axiom.ai",
    rationale: "Research interfaces communicate capability, not warmth. Deep navy signals depth and seriousness. The indigo accent — close to violet — occupies the edge of visible light, suggesting intelligence at a boundary. Every element is either data or infrastructure for data. There is no decoration.",
  }
};
