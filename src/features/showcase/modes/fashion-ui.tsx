"use client";

import React from "react";
import { motion } from "framer-motion";

export function FashionUI() {
  return (
    <div className="w-full h-[450px] bg-[#0a0a0a] text-[#f5f0eb] flex flex-col overflow-hidden relative">
      {/* Invisible Nav */}
      <div className="absolute top-0 inset-x-0 h-16 flex items-center justify-center z-20 pointer-events-none">
        <div className="flex flex-col items-center gap-1 text-[#c9a96e]">
          <svg width="24" height="12" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="0.5">
            <path d="M2 10L6 2L12 10L18 2L22 10" />
            <line x1="0" y1="11.5" x2="24" y2="11.5" />
          </svg>
          <span className="font-['DM_Sans'] font-light tracking-[0.6em] text-[10px] ml-[0.6em]">MAISON</span>
        </div>
      </div>

      <div className="flex flex-1 h-full pt-16 pb-20">
        {/* Left Half - Text */}
        <motion.div 
          className="w-1/2 h-full flex items-center justify-center bg-[#0a0a0a] relative z-10"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 
            className="font-['Cormorant_Garamond'] text-6xl leading-[0.9] tracking-[0.4em] ml-[0.4em] opacity-90 text-center"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            COLLECTION / SS 2025
          </h1>
        </motion.div>

        {/* Right Half - Photo */}
        <motion.div 
          className="w-1/2 h-full bg-[#111] p-6 flex flex-col justify-end"
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-full h-full relative overflow-hidden">
            {/* CSS Simulated Photo */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#8a5a44] to-[#1a1210] opacity-80 mix-blend-luminosity"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,160,110,0.4),transparent_60%)]"></div>
            
            {/* Stamp */}
            <div className="absolute bottom-4 left-4 border border-[#c9a96e]/30 px-3 py-1">
              <span className="font-['DM_Sans'] text-[9px] tracking-[0.3em] text-[#c9a96e] ml-[0.3em]">NEW ARRIVAL</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Infinite Marquee Footer */}
      <div className="absolute bottom-0 inset-x-0 h-20 bg-[#0a0a0a] border-t border-[#f5f0eb]/10 flex items-center overflow-hidden z-20">
        <motion.div 
          className="flex gap-16 whitespace-nowrap px-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        >
          {/* Repeated items for infinite scroll effect */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center gap-6">
              <div className="w-12 h-16 bg-[#1a1a1a] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              </div>
              <span className="font-['Cormorant_Garamond'] italic text-sm text-[#f5f0eb]/70 tracking-wide">
                {i % 2 === 0 ? "NOIR BLAZER" : "SILK DRAPE"} — ₹{i % 2 === 0 ? "24,000" : "18,500"}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
