import React from "react";
import { motion } from "framer-motion";
import type { StudioMode } from "@/lib/theme/design-tokens";

type BrowserChromeProps = {
  domain: string;
  children: React.ReactNode;
  activeMode: StudioMode;
};

export function BrowserChrome({ domain, children, activeMode }: BrowserChromeProps) {
  return (
    <div className="w-full max-w-[900px] mx-auto rounded-xl overflow-hidden shadow-2xl border border-foreground/10 bg-background transition-colors duration-700">
      {/* Top Bar */}
      <div className="h-10 bg-[#1a1a1a] flex items-center px-4 relative border-b border-white/5">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="px-3 py-1 rounded bg-black/40 text-[11px] font-mono text-white/50 tracking-wider">
            {domain}
          </div>
        </div>
      </div>
      
      {/* Viewport content */}
      <div className="relative w-full overflow-hidden bg-background" style={{ minHeight: "400px" }}>
        {children}
      </div>
    </div>
  );
}
