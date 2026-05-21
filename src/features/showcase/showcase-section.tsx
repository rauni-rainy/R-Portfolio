"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore } from "@/stores/theme-store";
import type { StudioMode } from "@/lib/theme/design-tokens";

import { showcaseData } from "./showcase-data";
import { BrowserChrome } from "./components/browser-chrome";
import { RationaleCard } from "./components/rationale-card";

import { DoctorUI } from "./modes/doctor-ui";
import { FashionUI } from "./modes/fashion-ui";
import { LiteraryUI } from "./modes/literary-ui";
import { ElectronicsUI } from "./modes/electronics-ui";
import { AiLabUI } from "./modes/ai-lab-ui";

const icons = {
  doctor: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  fashion: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2l10 10-10 10L2 12 12 2z" />
    </svg>
  ),
  literary: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  electronics: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" />
    </svg>
  ),
  aiLab: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  )
};

export function ShowcaseSection() {
  const mode = useThemeStore((state) => state.mode) || "doctor";
  const setMode = useThemeStore((state) => state.setMode);

  // Default to doctor if neutral is selected (neutral doesn't have a mock UI)
  const activeMode = (mode as string) === "neutral" ? "doctor" : mode;
  const currentData = showcaseData[activeMode];

  const renderActiveUI = () => {
    switch (activeMode) {
      case "doctor": return <DoctorUI />;
      case "fashion": return <FashionUI />;
      case "literary": return <LiteraryUI />;
      case "electronics": return <ElectronicsUI />;
      case "aiLab": return <AiLabUI />;
      default: return <DoctorUI />;
    }
  };

  const modesList: StudioMode[] = ["doctor", "fashion", "literary", "electronics", "aiLab"];

  return (
    <section id="showcase" className="relative py-32 px-page min-h-screen flex flex-col items-center">
      
      {/* Header */}
      <div className="text-center mb-16 relative z-10 max-w-2xl mx-auto">
        <h2 className="font-['Cormorant_Garamond'] italic text-5xl md:text-6xl text-[#f5f0eb] mb-4">
          I speak every client&apos;s visual language.
        </h2>
        <p className="font-['DM_Sans'] font-light text-[#f5f0eb]/50 text-lg">
          Select a domain. Watch the interface become native to it.
        </p>
      </div>

      {/* Pill Switcher */}
      <div className="flex flex-wrap justify-center gap-3 mb-16 relative z-10">
        {modesList.map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-300 text-sm tracking-wide ${
              activeMode === m 
                ? "bg-foreground text-background border-foreground shadow-[0_0_20px_rgba(255,255,255,0.1)]" 
                : "bg-transparent text-foreground/70 border-foreground/20 hover:border-foreground/50 hover:text-foreground"
            }`}
          >
            {icons[m]}
            <span className="capitalize">{m === "aiLab" ? "AI Lab" : m}</span>
          </button>
        ))}
      </div>

      {/* Browser Chrome + UI + Rationale */}
      <div className="w-full relative z-10">
        <BrowserChrome domain={currentData.domain} activeMode={activeMode}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMode}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full"
            >
              {renderActiveUI()}
            </motion.div>
          </AnimatePresence>
        </BrowserChrome>

        {/* Rationale Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMode + "-rationale"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <RationaleCard rationale={currentData.rationale} />
          </motion.div>
        </AnimatePresence>
      </div>

    </section>
  );
}
