"use client";

import React from "react";

export function BackgroundPainting() {
  return (
    <>
      <svg
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          overflow: "hidden",
          pointerEvents: "none"
        }}
        aria-hidden="true"
      >
        <defs>
          <filter id="painterly-displacement">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.005"
              numOctaves="4"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="140"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <filter id="fine-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="3"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.08 0"
            />
          </filter>
        </defs>
      </svg>

      <div className="bg-painting-canvas">
        <div className="bg-painting-neutral" />
        <div className="bg-painting-doctor" />
        <div className="bg-painting-fashion" />
        <div className="bg-painting-literary" />
        <div className="bg-painting-electronics" />
        <div className="bg-painting-aiLab" />
      </div>

      <div className="bg-painting-grain-overlay fine-grain" />
      <div className="bg-painting-grain-overlay oscilloscope" />
    </>
  );
}
