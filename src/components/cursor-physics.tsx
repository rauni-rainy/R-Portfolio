"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// built without a physics lib

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  life: number;
  maxLife: number;
  color: string;
};

export function CursorPhysics() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname(); // Re-calculate colliders on route change

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let colliders: DOMRect[] = [];
    let animationFrameId: number;

    const colors = ["#818cf8", "#4ade80", "#c9a96e", "#2d7dd2", "#d4a0a0"];

    // Update canvas size to match window
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      updateColliders();
    };

    // Gather bounding rects of text elements we want to collide with
    const updateColliders = () => {
      // Throttle this in a real high-perf scenario, but for a portfolio it's fine on resize/mount
      const elements = document.querySelectorAll(
        "h1, h2, h3, [data-physics-collide='true'], .physics-target"
      );
      colliders = Array.from(elements).map((el) => el.getBoundingClientRect());
    };

    // Spawn particles on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const isOverLink = (e.target as HTMLElement).closest("a, button");
      // Spawn 1-2 particles per move event
      for (let i = 0; i < (Math.random() > 0.5 ? 2 : 1); i++) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4 - 2, // slight upward initial boost
          radius: Math.random() * 2.5 + 1.5,
          life: 1,
          maxLife: Math.random() * 40 + 60, // frames
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Apply Gravity
        p.vy += 0.25;

        // Apply Air Friction
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Update Position
        p.x += p.vx;
        p.y += p.vy;

        // Collision Check against DOM elements
        let collided = false;
        for (const rect of colliders) {
          // Simple AABB collision (treating particle as a small square for speed)
          if (
            p.x + p.radius > rect.left &&
            p.x - p.radius < rect.right &&
            p.y + p.radius > rect.top &&
            p.y - p.radius < rect.bottom
          ) {
            // Hit Top edge moving down
            if (p.vy > 0 && p.y - p.vy <= rect.top) {
              p.y = rect.top - p.radius;
              p.vy *= -0.5; // bounce and dampen
              p.vx *= 0.8;  // friction on surface
              collided = true;
            } 
            // Hit bottom edge moving up
            else if (p.vy < 0 && p.y - p.vy >= rect.bottom) {
              p.y = rect.bottom + p.radius;
              p.vy *= -0.5;
              collided = true;
            }
          }
        }

        // Floor collision (window bottom)
        if (p.y + p.radius > canvas.height) {
          p.y = canvas.height - p.radius;
          p.vy *= -0.4;
          p.vx *= 0.8;
        }

        // Draw Particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fill();

        // Age Particle
        p.life -= 1 / p.maxLife;

        // Remove dead particles
        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    
    // Initial setup
    resize();
    // Wait a brief moment for fonts/layout to settle before grabbing initial bounds
    setTimeout(updateColliders, 500);
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [pathname]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
