"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import {
  modeIds,
  themeTokens,
  type StudioMode
} from "@/lib/theme/design-tokens";
import { heroModeCopy } from "./hero-copy";

type ModeSwitcherProps = {
  selectedMode: StudioMode | null;
  previewMode: StudioMode | null;
  onPreview: (mode: StudioMode | null) => void;
  onSelect: (mode: StudioMode) => void;
};

type CoverStyle = CSSProperties & Record<`--cover-${string}`, string>;

const COVER_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function getCoverStyle(mode: StudioMode): CoverStyle {
  const tokens = themeTokens[mode];

  return {
    "--cover-bg": tokens.colors.background,
    "--cover-fg": tokens.colors.foreground,
    "--cover-surface": tokens.colors.surface,
    "--cover-border": tokens.colors.border,
    "--cover-accent": tokens.colors.accent,
    "--cover-secondary": tokens.colors.secondary,
    "--cover-muted": tokens.colors.mutedForeground,
    background: [
      `linear-gradient(135deg, hsl(${tokens.colors.accent} / 0.2), transparent 44%)`,
      `radial-gradient(circle at 82% 16%, hsl(${tokens.colors.secondary} / 0.24), transparent 28%)`,
      `hsl(${tokens.colors.background})`
    ].join(", "),
    borderColor: `hsl(${tokens.colors.border} / 0.78)`,
    color: `hsl(${tokens.colors.foreground})`,
    fontFamily: tokens.fonts.body
  };
}

export function ModeSwitcher({
  selectedMode,
  previewMode,
  onPreview,
  onSelect
}: ModeSwitcherProps) {
  return (
    <div className="relative" aria-label="Polymorphic client modes">
      <div className="mb-4 flex items-end justify-between gap-4">
        <p className="font-mono text-xs uppercase leading-none tracking-normal text-foreground/55">
          Choose a cover
        </p>
        <p className="hidden max-w-[16rem] text-right text-xs leading-5 text-foreground/50 sm:block">
          Hover to preview. Click to enter the world.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {modeIds.map((mode, index) => {
          const copy = heroModeCopy[mode];
          const tokens = themeTokens[mode];
          const isSelected = selectedMode === mode;
          const isPreviewed = previewMode === mode;

          return (
            <motion.button
              key={mode}
              layout
              type="button"
              aria-pressed={isSelected}
              className="group relative min-h-[11.5rem] overflow-hidden rounded-theme border p-4 text-left shadow-theme outline-none"
              style={getCoverStyle(mode)}
              onClick={() => onSelect(mode)}
              onFocus={() => onPreview(mode)}
              onBlur={() => onPreview(null)}
              onMouseEnter={() => onPreview(mode)}
              onMouseLeave={() => onPreview(null)}
              whileHover={{
                y: -8,
                rotateX: -2,
                rotateY: index % 2 === 0 ? -1.4 : 1.4
              }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.42, ease: COVER_EASE }}
            >
              {isSelected ? (
                <motion.span
                  layoutId="active-mode-cover-frame"
                  className="absolute inset-0 z-0 rounded-theme border-2"
                  style={{
                    borderColor: `hsl(${tokens.colors.accent})`,
                    boxShadow: `0 0 0 1px hsl(${tokens.colors.accent} / 0.28), 0 24px 80px hsl(${tokens.colors.accent} / 0.22)`
                  }}
                  transition={{ duration: 0.6, ease: COVER_EASE }}
                />
              ) : null}

              <span
                className="absolute inset-x-4 top-4 h-px opacity-70"
                style={{
                  background: `linear-gradient(90deg, hsl(${tokens.colors.accent}), transparent)`
                }}
              />
              <span
                className="absolute bottom-4 right-4 h-12 w-12 rounded-full opacity-20 blur-xl transition-opacity duration-theme group-hover:opacity-40"
                style={{ backgroundColor: `hsl(${tokens.colors.accent})` }}
              />

              <span className="relative z-10 flex h-full min-h-[9.5rem] flex-col justify-between">
                <span className="flex items-start justify-between gap-4">
                  <span className="font-mono text-[0.68rem] uppercase leading-none tracking-normal opacity-65">
                    0{index + 1} / {copy.coverKicker}
                  </span>
                  <span className="flex gap-1" aria-hidden="true">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: `hsl(${tokens.colors.accent})` }}
                    />
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor: `hsl(${tokens.colors.secondary})`
                      }}
                    />
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: `hsl(${tokens.colors.surface})` }}
                    />
                  </span>
                </span>

                <span>
                  <span
                    className="mb-3 block text-5xl font-black leading-none tracking-normal sm:text-6xl"
                    style={{ fontFamily: tokens.fonts.display }}
                  >
                    {copy.coverMark}
                  </span>
                  <span className="block text-base font-semibold leading-tight tracking-normal">
                    {copy.coverTitle}
                  </span>
                  <span className="mt-2 block font-mono text-[0.68rem] uppercase leading-4 tracking-normal opacity-60">
                    {copy.coverMeta}
                  </span>
                </span>
              </span>

              {isPreviewed && !isSelected ? (
                <motion.span
                  layoutId="preview-mode-cover-glint"
                  className="absolute inset-0 z-0 rounded-theme"
                  style={{
                    background: `linear-gradient(120deg, transparent 10%, hsl(${tokens.colors.foreground} / 0.14), transparent 36%)`
                  }}
                  initial={{ x: "-80%", opacity: 0 }}
                  animate={{ x: "80%", opacity: 1 }}
                  transition={{ duration: 0.9, ease: COVER_EASE }}
                />
              ) : null}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
