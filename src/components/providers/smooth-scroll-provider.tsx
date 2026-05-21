"use client";

import type { ReactNode } from "react";
import { ReactLenis } from "lenis/react";

type SmoothScrollProviderProps = {
  children: ReactNode;
};

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.11,
        smoothWheel: true,
        wheelMultiplier: 0.9
      }}
    >
      {children}
    </ReactLenis>
  );
}
