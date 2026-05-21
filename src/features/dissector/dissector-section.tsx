"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useThemeStore } from "@/stores/theme-store";
import { CodeViewer } from "./code-viewer";
import {
  dissectorModeNouns,
  flowNodes,
  reasoningPrompts
} from "./dissector-data";
import { FlowDiagram } from "./flow-diagram";

const LAST_NODE_INDEX = flowNodes.length - 1;
const SECTION_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function DissectorSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const selectedMode = useThemeStore((state) => state.mode);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(sectionRef, { amount: 0.28, once: true });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false);

  const activeNode = flowNodes[activeIndex];
  const modeNoun = selectedMode
    ? dissectorModeNouns[selectedMode]
    : "runtime trace";

  useEffect(() => {
    if (!isInView || hasAutoPlayed) {
      return;
    }

    setHasAutoPlayed(true);

    if (prefersReducedMotion) {
      return;
    }

    // WHY: the first read should feel like the diagram waking up as the
    // article enters view, while the button still gives manual control.
    const timeout = window.setTimeout(() => setIsPlaying(true), 420);

    return () => window.clearTimeout(timeout);
  }, [hasAutoPlayed, isInView, prefersReducedMotion]);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    if (prefersReducedMotion) {
      setActiveIndex(LAST_NODE_INDEX);
      setIsPlaying(false);
      return;
    }

    if (activeIndex >= LAST_NODE_INDEX) {
      setIsPlaying(false);
      return;
    }

    const timeout = window.setTimeout(() => {
      setActiveIndex((current) => Math.min(current + 1, LAST_NODE_INDEX));
    }, 1020);

    return () => window.clearTimeout(timeout);
  }, [activeIndex, isPlaying, prefersReducedMotion]);

  const handlePlay = useCallback(() => {
    if (activeIndex >= LAST_NODE_INDEX) {
      setActiveIndex(0);
    }

    setIsPlaying(true);
  }, [activeIndex]);

  const handleReset = useCallback(() => {
    setIsPlaying(false);
    setActiveIndex(0);
  }, []);

  const handleSelectNode = useCallback((index: number) => {
    setIsPlaying(false);
    setActiveIndex(index);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="dissector"
      className="relative overflow-hidden bg-transparent px-page py-section text-foreground"
    >
      <div className="relative mx-auto max-w-container">
        <div className="mb-10 grid gap-6 border-b border-border/20 pb-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-wider text-accent">
              The Dissector / {modeNoun}
            </p>
            <motion.h2
              className="max-w-4xl font-display text-4xl font-semibold leading-[0.95] tracking-tight text-foreground sm:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.62, ease: SECTION_EASE }}
            >
              ContestHub anti-cheat engine, opened up like a system trace.
            </motion.h2>
          </div>

          <div className="rounded-lg border border-border/20 bg-surface/10 backdrop-blur-sm p-4 font-mono text-xs leading-5 text-muted-foreground">
            <div className="mb-3 flex items-center justify-between gap-3 text-foreground">
              <span className="uppercase tracking-wider">Active node</span>
              <span className="text-accent">
                {activeIndex + 1}/{flowNodes.length}
              </span>
            </div>
            <p className="text-foreground">{activeNode.label}</p>
            <p className="mt-1 text-foreground/55">{activeNode.detail}</p>
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm font-light leading-relaxed text-muted-foreground">
            Watch the client-side signals move into a server-validated
            submission path. Each diagram state highlights the exact code
            responsible for that decision.
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-full border border-accent/40 bg-transparent px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-widest text-foreground transition-all duration-300 ease-in-out hover:bg-accent/10 hover:border-accent hover:text-accent"
              onClick={handlePlay}
              disabled={isPlaying}
            >
              {isPlaying
                ? "Playing"
                : activeIndex >= LAST_NODE_INDEX
                  ? "Replay flow"
                  : "Play flow"}
            </button>
            <button
              type="button"
              className="rounded-full border border-border/30 bg-transparent px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-widest text-foreground transition-all duration-300 ease-in-out hover:border-foreground/30 hover:text-foreground"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)]">
          <FlowDiagram activeIndex={activeIndex} onSelectNode={handleSelectNode} />
          <CodeViewer activeIndex={activeIndex} />
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {reasoningPrompts.map((prompt, index) => (
            <article
              key={prompt.title}
              className="border-t border-border/20 pt-5 bg-transparent"
            >
              <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-accent">
                0{index + 1}
              </p>
              <h3 className="font-display text-lg font-semibold leading-tight text-foreground">
                {prompt.title}
              </h3>
              <p className="mt-3 text-xs font-light leading-relaxed text-muted-foreground">
                {prompt.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
