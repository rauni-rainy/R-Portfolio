"use client";

import { create } from "zustand";
import { modeIds, type StudioMode } from "@/lib/theme/design-tokens";

type ThemeState = {
  mode: StudioMode | null;
  previousMode: StudioMode | null;
  hydrated: boolean;
  setMode: (mode: StudioMode | null) => void;
  cycleMode: () => void;
  setHydrated: (hydrated: boolean) => void;
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: null,
  previousMode: null,
  hydrated: false,
  setMode: (mode) =>
    set((state) =>
      state.mode === mode ? state : { mode, previousMode: state.mode }
    ),
  cycleMode: () => {
    const currentMode = get().mode;
    const currentIndex = currentMode ? modeIds.indexOf(currentMode) : -1;
    const nextMode = modeIds[(currentIndex + 1) % modeIds.length];

    get().setMode(nextMode);
  },
  setHydrated: (hydrated) => set({ hydrated })
}));
