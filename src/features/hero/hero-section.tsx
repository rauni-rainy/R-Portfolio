"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { themeTokens, type StudioMode } from "@/lib/theme/design-tokens";
import { useThemeStore } from "@/stores/theme-store";
import { heroModeCopy, neutralHeroCopy } from "./hero-copy";

const HERO_EASE = [0.25, 0.1, 0.25, 1];

export function HeroSection() {
  const selectedMode = useThemeStore((state) => state.mode);
  const lenis = useLenis();

  const activeCopy = selectedMode ? heroModeCopy[selectedMode] : neutralHeroCopy;

  const handleProjectsJump = useCallback(() => {
    const projects = document.getElementById("projects");
    if (!projects) return;

    if (selectedMode) {
      projects.dataset.selectedContext = selectedMode;
    }

    if (lenis) {
      lenis.scrollTo(projects, { offset: -24 });
      return;
    }

    projects.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, [lenis, selectedMode]);

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center bg-transparent px-page py-24 text-foreground">
      {/* 1. Floating left-vertical nav */}
      <nav className="fixed left-8 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-6 text-[13px] font-medium tracking-[0.15em] md:flex">
        <a
          href="#projects"
          className="text-foreground/50 transition-colors duration-300 hover:text-foreground"
        >
          work
        </a>
        <a
          href="#dissector"
          className="text-foreground/50 transition-colors duration-300 hover:text-foreground"
        >
          dissect
        </a>
        <a
          href="#skills"
          className="text-foreground/50 transition-colors duration-300 hover:text-foreground"
        >
          skills
        </a>
        <a
          href="#contact"
          className="text-foreground/50 transition-colors duration-300 hover:text-foreground"
        >
          contact
        </a>
      </nav>

      {/* 2. Center-aligned hero content */}
      <div className="flex max-w-4xl flex-col items-center text-center">
        {/* Small label above heading */}
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 0.8, ease: HERO_EASE }}
          className="text-[11px] font-normal tracking-[0.3em] uppercase mb-5"
          style={{ fontFamily: "var(--font-body)" }}
        >
          FULL-STACK ENGINEER · NIT DURGAPUR
        </motion.span>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: HERO_EASE }}
          className="text-7xl font-semibold tracking-[-0.02em] leading-[0.95] sm:text-8xl md:text-[96px] lg:text-[120px]"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600
          }}
        >
          Raunak Prasad
        </motion.h1>

        {/* Subheading (theme-reactive tagline) */}
        <motion.p
          key={selectedMode ?? "neutral"}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 0.8, ease: HERO_EASE }}
          className="mt-6 text-lg font-light leading-relaxed max-w-xl md:text-xl"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300
          }}
        >
          {activeCopy.tagline}
        </motion.p>

        {/* CTA pill button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: HERO_EASE, delay: 0.15 }}
          className="mt-8"
        >
          <button
            onClick={handleProjectsJump}
            className="rounded-full border border-foreground/30 px-8 py-3.5 text-[13px] font-normal tracking-wide transition-all duration-300 hover:bg-foreground hover:text-background hover:border-foreground bg-transparent text-foreground"
          >
            Explore my work →
          </button>
        </motion.div>
      </div>

      {/* 3. Impressive bottom text */}
      <div className="absolute bottom-28 md:bottom-10 left-1/2 z-10 -translate-x-1/2 flex justify-center items-center">
        <span className="text-[10px] md:text-[12px] font-mono tracking-[0.5em] uppercase text-foreground/40 font-semibold text-center whitespace-nowrap">
          ENGINEER • DESIGNER • POLYMATH
        </span>
      </div>

      {/* 4. Bottom-right corner: GitHub + LinkedIn icons */}
      <div className="absolute bottom-12 md:bottom-8 right-1/2 translate-x-1/2 md:right-8 md:translate-x-0 flex items-center gap-4 opacity-40 hover:opacity-80 transition-opacity duration-300">
        <a
          href="https://github.com/rauni-rainy"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="text-foreground"
        >
          <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
          </svg>
        </a>
        <a
          href="https://linkedin.com/in/raunak-prasad-og/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="text-foreground"
        >
          <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
      </div>
    </section>
  );
}
