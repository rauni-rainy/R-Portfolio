"use client";

import { useEffect, useMemo, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import { antiCheatCodeLines, flowNodes } from "./dissector-data";

type CodeViewerProps = {
  activeIndex: number;
};

const CODE_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

if (!hljs.getLanguage("typescript")) {
  hljs.registerLanguage("typescript", typescript);
}

function highlightCodeLine(line: string) {
  if (!line) {
    return "&nbsp;";
  }

  return hljs.highlight(line, {
    language: "typescript",
    ignoreIllegals: true
  }).value;
}

export function CodeViewer({ activeIndex }: CodeViewerProps) {
  const activeNode = flowNodes[activeIndex];
  const prefersReducedMotion = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const lineRefs = useRef<Record<number, HTMLLIElement | null>>({});

  const highlightedLines = useMemo(
    () =>
      antiCheatCodeLines.map((line, index) => ({
        number: index + 1,
        html: highlightCodeLine(line)
      })),
    []
  );

  useEffect(() => {
    const container = scrollRef.current;
    const target = lineRefs.current[activeNode.lineStart];

    if (!container || !target) {
      return;
    }

    const top =
      target.offsetTop - container.clientHeight / 2 + target.clientHeight * 2;

    // WHY: scroll the code panel itself, not the whole page, so the reader's
    // mental model stays fixed while the relevant implementation line moves.
    container.scrollTo({
      top: Math.max(0, top),
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });
  }, [activeNode.lineStart, prefersReducedMotion]);

  return (
    <div className="relative overflow-hidden rounded-theme border border-border/70 bg-[#05070d] text-slate-100 shadow-theme">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.035] px-4 py-3 font-mono text-xs uppercase leading-none tracking-normal text-slate-400">
        <span>contesthub/anti-cheat-engine.ts</span>
        <span className="text-accent">{activeNode.label}</span>
      </div>

      <div
        ref={scrollRef}
        data-lenis-prevent
        className="dissector-code relative max-h-[42rem] min-h-[31rem] overflow-auto overscroll-contain bg-[linear-gradient(180deg,rgba(255,255,255,0.025)_0,transparent_2rem)] py-4 font-mono text-[0.78rem] leading-6 sm:text-[0.82rem]"
      >
        <div className="pointer-events-none sticky top-0 z-20 h-10 bg-gradient-to-b from-[#05070d] to-transparent" />
        <ol className="relative -mt-10 min-w-[44rem] pb-8">
          {highlightedLines.map((line) => {
            const isHighlighted =
              line.number >= activeNode.lineStart &&
              line.number <= activeNode.lineEnd;

            return (
              <li
                key={line.number}
                ref={(node) => {
                  lineRefs.current[line.number] = node;
                }}
                className="group relative grid grid-cols-[3.75rem_minmax(0,1fr)] px-3"
                aria-current={isHighlighted ? "step" : undefined}
              >
                <span className="relative z-10 select-none pr-4 text-right text-slate-500">
                  {String(line.number).padStart(2, "0")}
                </span>
                <span className="relative z-10 whitespace-pre pr-6">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: line.html
                    }}
                  />
                </span>

                <AnimatePresence>
                  {isHighlighted ? (
                    <motion.span
                      className="pointer-events-none absolute inset-y-0 left-2 right-2 rounded-sm bg-accent/16"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      exit={{ scaleX: 0, opacity: 0 }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.48,
                        ease: CODE_EASE
                      }}
                      style={{ transformOrigin: "left center" }}
                    />
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
