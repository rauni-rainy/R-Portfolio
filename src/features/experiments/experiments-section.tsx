"use client";

import React from "react";
import { CascadeExperiment } from "./cascade-experiment";

export function ExperimentsSection() {
  return (
    <section id="experiments" className="relative py-32 px-page min-h-screen flex flex-col items-center bg-transparent z-10">
      
      {/* Header */}
      <div className="text-center mb-24 relative z-10 max-w-3xl mx-auto">
        <h2 className="font-display font-semibold tracking-tight text-5xl md:text-7xl text-foreground mb-6" data-physics-collide="true">
          The Laboratory.
        </h2>
        <p className="font-body font-light text-foreground/60 text-lg md:text-xl leading-relaxed">
          A collection of isolated technical experiments. 
          Move your cursor around to interact with the custom physics engine running across the site, 
          or tweak the live CSS variables below to see the cascade in action.
        </p>
      </div>

      {/* Live Code Preview */}
      <CascadeExperiment />

    </section>
  );
}
