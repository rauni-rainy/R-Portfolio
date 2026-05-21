"use client";

import type { ReactNode } from "react";
import { useEffect, useLayoutEffect } from "react";
import {
  defaultMode,
  neutralThemeTokens,
  themeToCssVariables,
  themeTokens
} from "@/lib/theme/design-tokens";
import { useThemeStore } from "@/stores/theme-store";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const mode = useThemeStore((state) => state.mode);
  const setHydrated = useThemeStore((state) => state.setHydrated);

  useIsomorphicLayoutEffect(() => {
    const tokens = mode
      ? themeTokens[mode] ?? themeTokens[defaultMode]
      : neutralThemeTokens;
    const root = document.documentElement;
    const cssVariables = themeToCssVariables(tokens);

    root.dataset.theme = mode ?? "neutral";
    root.dataset.themeLabel = tokens.label;
    root.classList.add("theme-transitioning");
    root.style.setProperty("--theme-switch-duration", "600ms");

    Object.entries(cssVariables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    setHydrated(true);

    const duration = 600;
    const timeout = window.setTimeout(() => {
      root.classList.remove("theme-transitioning");
    }, duration + 80);

    return () => {
      window.clearTimeout(timeout);
      root.classList.remove("theme-transitioning");
    };
  }, [mode, setHydrated]);

  return children;
}
