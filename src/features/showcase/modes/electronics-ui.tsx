"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayed, setDisplayed] = useState("");
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const typeCharacter = (index: number) => {
      if (index <= text.length) {
        setDisplayed(text.slice(0, index));
        timeout = setTimeout(() => typeCharacter(index + 1), 30);
      }
    };
    const initialDelay = setTimeout(() => typeCharacter(0), delay * 1000);
    return () => { clearTimeout(timeout); clearTimeout(initialDelay); };
  }, [text, delay]);

  return <span>{displayed}</span>;
};

export function ElectronicsUI() {
  return (
    <div className="w-full h-full min-h-[450px] bg-[#0d0d0d] text-[#e8e8e8] font-['Space_Mono',monospace] flex flex-col overflow-hidden">
      {/* Ticker */}
      <div className="h-6 border-b border-[#2a2a2a] bg-[#0d0d0d] flex items-center overflow-hidden">
        <motion.div 
          className="flex whitespace-nowrap text-[#00ff88] text-[10px]"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        >
          {Array(10).fill("NEW ARRIVALS ··· ARDUINO MEGA ··· ESP32 ··· RASPBERRY PI 5 ··· ").join("")}
        </motion.div>
      </div>

      {/* Nav */}
      <div className="h-14 border-b border-[#2a2a2a] flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <svg width="24" height="24" viewBox="0 0 24 24" stroke="#00ff88" strokeWidth="1.5" fill="none">
            <path d="M4 12h4m4-8v16m4-8h4" />
            <rect x="7" y="10" width="4" height="4" />
            <rect x="13" y="10" width="4" height="4" />
          </svg>
          <span className="font-bold tracking-widest text-[#00ff88]">ELECTRA</span>
        </div>
        
        {/* Search */}
        <div className="w-64 h-8 bg-[#1a1a1a] border border-[#2a2a2a] flex items-center px-3 text-xs text-[#00ff88]">
          <span className="opacity-50 mr-2">{'>'}</span>
          <motion.span 
            animate={{ opacity: [1, 1, 0, 0] }} 
            transition={{ duration: 0.8, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
            className="w-2 h-3 bg-[#00ff88] inline-block"
          />
        </div>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-48 border-r border-[#2a2a2a] p-4 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] text-[#e8e8e8]/50 tracking-wider">CATEGORY</span>
            {["Microcontrollers", "Sensors", "Displays", "Power"].map(c => (
              <div key={c} className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 border border-[#2a2a2a] bg-[#1a1a1a]"></div>
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 p-6 grid grid-cols-2 gap-4 bg-[#0a0a0a]">
          {[
            { name: "MCU-32 CORE BOARD", price: "$12.50", delay: 0.2 },
            { name: "OLED 128x64 I2C", price: "$4.20", delay: 0.4 },
            { name: "LOGIC ANALYZER 8CH", price: "$24.99", delay: 0.6 },
            { name: "LIPO BATT 3.7V", price: "$8.00", delay: 0.8 }
          ].map((item, i) => (
            <div key={i} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded flex flex-col overflow-hidden relative group">
              <div className="h-24 bg-[#111] border-b border-[#2a2a2a] flex items-center justify-center p-4 relative">
                {/* CSS Art Chip */}
                <div className="w-12 h-12 bg-[#0d0d0d] border border-[#2a2a2a] relative">
                  {/* Pins */}
                  <div className="absolute top-[-4px] inset-x-1 flex justify-between"><div className="w-1 h-2 bg-[#2a2a2a]"></div><div className="w-1 h-2 bg-[#2a2a2a]"></div><div className="w-1 h-2 bg-[#2a2a2a]"></div></div>
                  <div className="absolute bottom-[-4px] inset-x-1 flex justify-between"><div className="w-1 h-2 bg-[#2a2a2a]"></div><div className="w-1 h-2 bg-[#2a2a2a]"></div><div className="w-1 h-2 bg-[#2a2a2a]"></div></div>
                  <div className="absolute left-[-4px] inset-y-1 flex flex-col justify-between"><div className="h-1 w-2 bg-[#2a2a2a]"></div><div className="h-1 w-2 bg-[#2a2a2a]"></div><div className="h-1 w-2 bg-[#2a2a2a]"></div></div>
                  <div className="absolute right-[-4px] inset-y-1 flex flex-col justify-between"><div className="h-1 w-2 bg-[#2a2a2a]"></div><div className="h-1 w-2 bg-[#2a2a2a]"></div><div className="h-1 w-2 bg-[#2a2a2a]"></div></div>
                  <div className="absolute inset-2 border border-[#2a2a2a]/50 rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-[#00ff88]/20 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="p-3 flex flex-col gap-2">
                <div className="text-xs h-4">
                  <TypewriterText text={item.name} delay={item.delay} />
                </div>
                <div className="flex justify-between items-end mt-2">
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: item.delay + 0.8 }}
                    className="text-[#00ff88] text-sm"
                  >
                    {item.price}
                  </motion.div>
                  <motion.button 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: item.delay + 1.2 }}
                    className="px-2 py-1 border border-[#2a2a2a] text-[10px] hover:border-[#00ff88] hover:text-[#00ff88] transition-colors"
                  >
                    ADD +
                  </motion.button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
