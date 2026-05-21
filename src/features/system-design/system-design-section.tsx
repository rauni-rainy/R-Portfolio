"use client";

import React from "react";

export function SystemDesignSection() {
  return (
    <section id="system-design" className="relative py-32 px-page bg-transparent text-foreground z-10 flex flex-col items-center">
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display font-semibold tracking-tight text-4xl md:text-6xl text-foreground mb-4">
            System Design Concept
          </h2>
          <p className="font-body font-light text-foreground/60 text-lg md:text-xl max-w-2xl mx-auto">
            A look into the architecture of SevaSamagra AI.
          </p>
          <div className="mt-8 inline-block p-4 border border-accent/30 bg-accent-muted/5 rounded-xl text-sm font-mono text-accent text-left max-w-md mx-auto relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>
            <strong>Disclaimer:</strong> Very rookie and still in the learning phase for this... but yes, I tried.
          </div>
        </div>

        <div className="border border-border/20 rounded-3xl overflow-hidden bg-surface/5 backdrop-blur-sm p-4 md:p-8 shadow-2xl">
          <a href="/assets/projects/seva-infrastructure.png" target="_blank" rel="noreferrer" className="block relative w-full rounded-2xl overflow-hidden bg-white mb-10 group ring-1 ring-border/20 cursor-zoom-in">
            <img 
              src="/assets/projects/seva-infrastructure.png" 
              alt="SevaSamagra AI System Architecture" 
              className="w-full h-auto object-contain transition-transform duration-700 ease-out group-hover:scale-[1.01]" 
            />
          </a>
          
          <div className="grid lg:grid-cols-[1fr_2fr] gap-10 px-2 lg:px-6">
            <div>
              <h3 className="font-display text-2xl font-semibold mb-4 text-foreground">The Data Flow</h3>
              <p className="font-light text-foreground/70 leading-relaxed text-sm md:text-base">
                SevaSamagra AI was designed to ingest highly unstructured, chaotic data—such as distressed phone calls from the field—and instantly transform it into structured, actionable spatial intelligence for relief coordinators.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6 text-sm font-light text-foreground/80">
              <div className="space-y-2 border-l border-border/20 pl-4">
                <strong className="text-foreground font-medium block text-base font-display">1. AI Intelligence Engine</strong>
                <p>Twilio Voice streams audio to Whisper for transcription. Gemini 2.0 Flash then acts as a real-time NER engine to extract street-level locations, classify bio-markers, and determine incident urgency.</p>
              </div>
              <div className="space-y-2 border-l border-border/20 pl-4">
                <strong className="text-foreground font-medium block text-base font-display">2. Spatial Processing</strong>
                <p>A FastAPI core utilizes PostGIS to perform complex spatial queries, matching the extracted locations against predefined relief zones and querying the Volunteer Matching Engine for nearby capacity.</p>
              </div>
              <div className="space-y-2 border-l border-border/20 pl-4">
                <strong className="text-foreground font-medium block text-base font-display">3. Presentation Layer</strong>
                <p>Socket.IO pushes the processed intelligence to a Next.js dashboard, instantly updating Google Maps polygons and rendering live intelligence logs without requiring a refresh.</p>
              </div>
              <div className="space-y-2 border-l border-border/20 pl-4">
                <strong className="text-foreground font-medium block text-base font-display">4. Infrastructure</strong>
                <p>The entire pipeline is Cloud Native. Dockerized services deployed on Google Cloud Run ensure auto-scaling under load, with Cloud SQL managing the PostGIS instances.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
