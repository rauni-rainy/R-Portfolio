"use client";

import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { css } from "@codemirror/lang-css";

export function CascadeExperiment() {
  const [code, setCode] = useState(`/* Edit me to see the cascade in action */
.cascade-demo-target {
  --btn-bg: #818cf8;
  --btn-text: #ffffff;
  --btn-radius: 8px;
  --card-bg: #0f172a;
  --card-border: #1e293b;
}`);

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl mx-auto items-stretch">
      {/* Dynamic Style Injection */}
      <style>{code}</style>

      {/* Editor Side */}
      <div className="w-full md:w-1/2 rounded-xl overflow-hidden border border-foreground/10 bg-[#282c34] shadow-2xl z-10 relative">
        <div className="bg-[#21252b] px-4 py-3 text-xs font-mono text-white/50 border-b border-black/20 flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            <span className="ml-2">style.css</span>
          </div>
          <span className="opacity-50">Live Preview</span>
        </div>
        <div className="p-2">
          <CodeMirror
            value={code}
            height="300px"
            theme="dark"
            extensions={[css()]}
            onChange={(value) => setCode(value)}
            className="text-sm font-mono overflow-hidden rounded-lg"
          />
        </div>
      </div>

      {/* Preview Side */}
      <div className="w-full md:w-1/2 bg-surface-elevated/40 backdrop-blur rounded-xl border border-border p-8 flex items-center justify-center cascade-demo-target relative overflow-hidden transition-all duration-300">
        <div 
          className="w-full max-w-xs p-6 shadow-xl transition-all duration-300"
          style={{ 
            backgroundColor: "var(--card-bg, #ffffff)", 
            borderColor: "var(--card-border, #e2e8f0)",
            borderWidth: "1px",
            borderStyle: "solid",
            borderRadius: "var(--btn-radius, 8px)"
          }}
        >
          <div className="w-12 h-12 rounded-full bg-foreground/5 mb-4 flex items-center justify-center">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-foreground/50">
               <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
             </svg>
          </div>
          <h3 className="text-lg font-bold mb-2 text-foreground" data-physics-collide="true">Premium Tier</h3>
          <p className="text-sm text-foreground/60 mb-6">Experience the full power of the platform.</p>
          <button 
            className="w-full py-3 font-medium transition-all duration-300 hover:opacity-90 tracking-wide text-sm"
            style={{ 
              backgroundColor: "var(--btn-bg, #000000)", 
              color: "var(--btn-text, #ffffff)",
              borderRadius: "calc(var(--btn-radius, 8px) - 2px)"
            }}
          >
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
}
