"use client";

import React from "react";

export function BlockchainSection() {
  return (
    <section id="blockchain" className="relative py-32 px-page bg-transparent text-foreground z-10 flex flex-col items-center">
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display font-semibold tracking-tight text-4xl md:text-6xl text-foreground mb-4">
            Blockchain Engineering
          </h2>
          <p className="font-body font-light text-foreground/60 text-lg md:text-xl max-w-2xl mx-auto">
            A production-quality, full-stack NFT launchpad with features that actual funded projects use.
          </p>
        </div>

        <div className="border border-border/20 rounded-3xl overflow-hidden bg-surface/5 backdrop-blur-sm p-4 md:p-8 shadow-2xl mb-24">
          <div className="block relative w-full rounded-2xl overflow-hidden bg-surface/20 mb-10 group ring-1 ring-border/20">
            <img
              src="/assets/projects/blockchain-luminous.png"
              alt="Blockchain Luminous NFT Launchpad"
              className="w-full h-auto object-contain transition-transform duration-700 ease-out group-hover:scale-[1.01]"
            />
          </div>

          <div className="grid lg:grid-cols-[1fr_2fr] gap-10 px-2 lg:px-6">
            <div>
              <h3 className="font-display text-2xl font-semibold mb-4 text-foreground">The Architecture</h3>
              <p className="font-light text-foreground/70 leading-relaxed text-sm md:text-base mb-6">
                Building a full-stack NFT launchpad right now — gas-optimized ERC-721A contract, Chainlink VRF for a genuinely random reveal so token IDs can't be sniped, Merkle-tree whitelist tiers, an on-chain provenance hash so nobody can quietly swap rarities after mint.
              </p>
              <a
                href="https://github.com/rauni-rainy/NFT-LaunchPad_FullStack"
                target="_blank"
                rel="noreferrer"
                className="inline-block rounded-full border border-border/40 bg-transparent px-6 py-3 font-mono text-[11px] font-medium uppercase tracking-widest text-foreground transition-all duration-300 ease-in-out hover:border-accent hover:text-accent"
              >
                GitHub Repository
              </a>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 text-sm font-light text-foreground/80">
              <div className="space-y-2 border-l border-border/20 pl-4">
                <strong className="text-foreground font-medium block text-base font-display">Smart Contracts</strong>
                <p>Gas-optimised ERC-721A contract with 3-tier Merkle whitelist (OG / Allowlist / Public). Dutch auction with configurable start/end price and duration. EIP-2981 royalty standard + Operator Filter Registry.</p>
              </div>
              <div className="space-y-2 border-l border-border/20 pl-4">
                <strong className="text-foreground font-medium block text-base font-display">Security & Integrity</strong>
                <p>Chainlink VRF v2 randomised reveal offset (prevents token sniping). On-chain SHA-256 provenance hash commitment. On-chain generative SVG placeholder art before reveal (unique per token, no IPFS dependency).</p>
              </div>
              <div className="space-y-2 border-l border-border/20 pl-4">
                <strong className="text-foreground font-medium block text-base font-display">Infrastructure</strong>
                <p>The Graph subgraph indexing all on-chain events. Admin dashboard with live analytics from The Graph. Full Foundry test suite (unit + fuzz + invariant).</p>
              </div>
              <div className="space-y-2 border-l border-border/20 pl-4">
                <strong className="text-foreground font-medium block text-base font-display">Frontend</strong>
                <p>Next.js 14 App Router frontend: dark, institutional, single-column editorial layout. On-chain referral reward system (5% of mint price tracked per referrer address).</p>
              </div>
            </div>
          </div>
        </div>

        {/* Framer Motion & Design Section */}
        <div id="framer-design" className="text-center mb-16 pt-16 border-t border-border/10">
          <h2 className="font-display font-semibold tracking-tight text-4xl md:text-5xl text-foreground mb-4">
            Frontend Motion Design
          </h2>
          <p className="font-body font-light text-foreground/60 text-lg md:text-xl max-w-3xl mx-auto">
            The part I didn't expect to spend real time on was the frontend motion design. The hero visual is a generative lotus mandala — built entirely in SVG + Framer Motion, no images.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="border border-border/20 rounded-3xl overflow-hidden bg-surface/5 backdrop-blur-sm p-4 shadow-2xl relative group ring-1 ring-border/20">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto rounded-2xl object-cover"
            >
              <source src="/assets/projects/mandala-framer.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="space-y-6">
            <h3 className="font-display text-2xl font-semibold text-foreground">Generative Lotus Mandala</h3>
            <div className="space-y-4 font-light text-foreground/70 leading-relaxed">
              <p>
                Six concentric rings of petals, each rotating independently, fading from gold at the center out to blue at the edges.
              </p>
              <p className="p-4 border-l-2 border-accent bg-accent-muted/5 italic text-foreground/80 rounded-r-lg shadow-inner">
                "It broke in a genuinely interesting way the first time. Instead of six separate rings, I got one solid blob — because every 'ring' of petals was secretly drawn from the dead center outward, so the biggest ring just buried every smaller one underneath it."
              </p>
              <p>
                Once each ring became its own band — its own radius, its own offset, its own rotation speed — it actually started looking like a mandala instead of a polygon.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-4">
              {["Framer Motion", "React", "SVG Animation", "Creative Coding"].map((tag) => (
                <span key={tag} className="rounded-full border border-border/30 bg-surface/10 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
