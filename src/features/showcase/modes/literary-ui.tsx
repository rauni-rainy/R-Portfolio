"use client";

import React from "react";
import { motion } from "framer-motion";

export function LiteraryUI() {
  const wipeTransition = { duration: 0.6, ease: "easeOut" };

  return (
    <div className="w-full h-full min-h-[450px] bg-[#f2ebe0] text-[#1c1008] p-8 relative overflow-hidden">
      {/* Background Grid & Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[repeating-linear-gradient(transparent,transparent_23px,#1c1008_23px,#1c1008_24px)] bg-[length:100%_24px] bg-top mt-[6px]"></div>
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.02] mix-blend-multiply">
        <filter id="literary-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#literary-noise)" />
      </svg>

      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b border-[#1c1008] pb-4 relative z-10">
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v18z" />
            <path d="M14 2v6h6" />
            <path d="M12 18v-6" />
            <path d="M9 15l3 3 3-3" />
          </svg>
          <span className="font-['Playfair_Display'] font-semibold tracking-widest text-xs uppercase ml-1">The Margin</span>
        </div>
        <span className="font-['Lora'] italic text-xs opacity-60">Vol. IV — Autumn Issue</span>
      </div>

      {/* Grid Layout Mimicking Print */}
      <div className="grid grid-cols-[2fr_1px_1fr] gap-8 relative z-10 h-[300px]">
        {/* Left Column */}
        <div className="flex flex-col gap-4">
          <motion.h1
            className="font-['Playfair_Display'] italic text-[52px] leading-[0.9] tracking-tight text-[#5a280c]"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ ...wipeTransition, delay: 0.1 }}
          >
            THE WEIGHT OF <br />SILENT THINGS
          </motion.h1>

          <motion.p
            className="font-['Lora'] text-[13px] text-[#1c1008]/70 italic font-medium"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ ...wipeTransition, delay: 0.4 }}
          >
            Essay by Raunak — 12 min read
          </motion.p>

          <div className="font-['Lora'] text-[15px] text-justify leading-[24px] text-[#1c1008] font-medium flex flex-col gap-4">
            <motion.p
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ ...wipeTransition, delay: 0.7 }}
            >
              There is a specific quality to the quiet that settles over a house long abandoned. It is not an emptiness, but rather a density—a suspension of moments that refused to evaporate. The dust motes dance in the fractured light, tracing paths that memory has long since forgotten.
            </motion.p>
            <motion.p
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ ...wipeTransition, delay: 1.0 }}
            >
              We measure history in grand sweeping arcs, but it is lived in these microscopic pauses.
            </motion.p>
          </div>
        </div>

        {/* Divider */}
        <div className="bg-[#1c1008]/20 w-full h-full"></div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {[
            { tag: "FICTION", title: "A Catalogue of Minor Regrets" },
            { tag: "CRITICISM", title: "The Post-Modern Paradox" },
            { tag: "POETRY", title: "Elegies for the Anthropocene" }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex flex-col gap-1 border-t border-[#1c1008]/20 pt-2"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ ...wipeTransition, delay: 1.3 + (i * 0.2) }}
            >
              <span className="font-['Playfair_Display'] text-[10px] tracking-widest text-[#8b4513] font-bold">{item.tag}</span>
              <h3 className="font-['Playfair_Display'] text-[18px] leading-snug">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
