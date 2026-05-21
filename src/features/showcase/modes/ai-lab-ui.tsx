"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function AiLabUI() {
  const [output, setOutput] = useState("");
  const fullOutput = "Analyzing latent space topological structure...\nConvergence achieved at epoch 4092.\nLoss threshold met.\n\nGenerating synthesis...";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullOutput.length) {
        setOutput(fullOutput.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full min-h-[450px] bg-[#070b14] text-[#e2e8f0] flex flex-col relative overflow-hidden">
      {/* CSS Starfield Background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-[#818cf8] rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1
            }}
            animate={{ opacity: [null, 0.8, 0.2] }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Top Bar Stats */}
      <div className="h-16 border-b border-[#818cf8]/15 flex items-center justify-between px-6 z-10 bg-[#070b14]/80 backdrop-blur">
        <div className="flex items-center gap-3">
          <svg width="24" height="24" viewBox="0 0 24 24" stroke="#818cf8" strokeWidth="1.5" fill="none">
            <circle cx="12" cy="12" r="3" />
            <path d="M3 12h6m6 0h6M12 3v6m0 6v6" />
            <circle cx="5" cy="5" r="1.5" />
            <circle cx="19" cy="5" r="1.5" />
            <circle cx="5" cy="19" r="1.5" />
            <circle cx="19" cy="19" r="1.5" />
          </svg>
          <span className="font-['DM_Mono'] tracking-[0.2em] text-sm">AXIOM</span>
        </div>
        
        <div className="flex gap-8">
          {[
            { label: "PARAMETERS", val: "70B" },
            { label: "CONTEXT", val: "128K" },
            { label: "LATENCY", val: "43ms" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-end border-r border-[#818cf8]/15 pr-8 last:border-0 last:pr-0">
              <span className="font-['DM_Mono'] text-[10px] text-[#e2e8f0]/40">{stat.label}</span>
              <span className="font-['DM_Mono'] text-lg text-[#818cf8]">{stat.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 p-6 gap-6 z-10">
        
        {/* Left Column: Code Block */}
        <div className="w-1/2 bg-[#0f172a] border border-[#818cf8]/15 rounded-lg p-4 font-['DM_Mono'] text-xs flex flex-col">
          <div className="text-[#e2e8f0]/40 mb-4 border-b border-[#818cf8]/15 pb-2">inference_engine.py</div>
          <div className="flex-1 whitespace-pre">
            <span className="text-[#818cf8]">import</span> torch<br/>
            <span className="text-[#818cf8]">from</span> model <span className="text-[#818cf8]">import</span> Transformer<br/><br/>
            <span className="text-[#e2e8f0]/40"># Initialize inference state</span><br/>
            ctx = torch.zeros(1, 128000)<br/>
            mask = build_causal_mask()<br/><br/>
            <span className="text-[#818cf8]">def</span> generate(prompt):<br/>
            {'  '}tokens = tokenize(prompt)<br/>
            {'  '}<span className="text-[#818cf8]">return</span> stream_forward(tokens)<br/>
          </div>
        </div>

        {/* Right Column: Viz & Output */}
        <div className="w-1/2 flex flex-col gap-6">
          
          {/* Token Flow Viz */}
          <div className="h-32 bg-[#0f172a] border border-[#818cf8]/15 rounded-lg flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(129,140,248,0.05),transparent_70%)]"></div>
            
            <svg width="100%" height="60" viewBox="0 0 400 60" className="absolute">
              {/* Input path */}
              <path d="M0 30 L150 30" stroke="#818cf8" strokeOpacity="0.3" strokeWidth="1" />
              <motion.path d="M0 30 L150 30" stroke="#818cf8" strokeWidth="2" strokeDasharray="10 20" 
                animate={{ strokeDashoffset: [-30, 0] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
              
              {/* Output path */}
              <path d="M250 30 L400 30" stroke="#818cf8" strokeOpacity="0.3" strokeWidth="1" />
              <motion.path d="M250 30 L400 30" stroke="#818cf8" strokeWidth="2" strokeDasharray="10 20" 
                animate={{ strokeDashoffset: [-30, 0] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
            </svg>

            {/* Transformer Block */}
            <motion.div 
              className="w-24 h-16 bg-[#070b14] border border-[#818cf8] z-10 flex items-center justify-center shadow-[0_0_15px_rgba(129,140,248,0.2)]"
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(129,140,248,0.4)" }}
            >
              <span className="font-['Cormorant_Garamond'] text-xl text-[#818cf8] italic">Block N</span>
            </motion.div>
          </div>

          {/* Streaming Output */}
          <div className="flex-1 bg-[#0f172a] border border-[#818cf8]/15 rounded-lg p-4 font-['DM_Mono'] text-[11px] leading-relaxed text-[#e2e8f0]/80 whitespace-pre-wrap">
            <span className="text-[#818cf8] font-bold">sys {'>'} </span>
            {output}
            <motion.span 
              animate={{ opacity: [1, 1, 0, 0] }} 
              transition={{ duration: 0.8, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
              className="inline-block w-2 h-3 bg-[#818cf8] ml-1 align-middle"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
