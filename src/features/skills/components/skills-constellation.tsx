"use client";

import { useEffect, useRef } from "react";

// --- Data ---
const SKILLS_DATA: Omit<SkillNode, "currentX" | "currentY" | "phase">[] = [
  // Core CS Concepts
  { id: "dsa", label: "Data Structures", cluster: "core", x: 0.45, y: 0.5, context: "Fundamentals of organizing and storing data", connections: ["algo", "dbms", "c", "cpp"] },
  { id: "algo", label: "Algorithms", cluster: "core", x: 0.55, y: 0.5, context: "Step-by-step procedures for calculations and processing", connections: ["dsa", "se"] },
  { id: "dbms", label: "DBMS", cluster: "core", x: 0.5, y: 0.42, context: "Database Management Systems", connections: ["dsa", "pg", "mysql", "mongo"] },
  { id: "se", label: "Software Engineering", cluster: "core", x: 0.5, y: 0.58, context: "Principles of designing and building software systems", connections: ["algo", "git", "docker"] },

  // Languages
  { id: "python", label: "Python", cluster: "languages", x: 0.3, y: 0.25, context: "Versatile high-level programming language", connections: ["fastapi", "dsa"] },
  { id: "c", label: "C", cluster: "languages", x: 0.35, y: 0.35, context: "Low-level system programming language", connections: ["cpp", "dsa"] },
  { id: "cpp", label: "C++", cluster: "languages", x: 0.45, y: 0.3, context: "Object-oriented systems programming", connections: ["c", "dsa"] },
  { id: "js", label: "JavaScript", cluster: "languages", x: 0.3, y: 0.45, context: "Core language of the web", connections: ["ts", "html", "react", "node"] },
  { id: "ts", label: "TypeScript", cluster: "languages", x: 0.2, y: 0.4, context: "Type-safe JavaScript", connections: ["js", "react", "nextjs"] },
  { id: "html", label: "HTML5", cluster: "languages", x: 0.15, y: 0.5, context: "Semantic markup for the web", connections: ["css", "js"] },
  { id: "css", label: "CSS3", cluster: "languages", x: 0.1, y: 0.42, context: "Styling the web", connections: ["html", "tailwind"] },

  // Frontend
  { id: "react", label: "React JS", cluster: "frontend", x: 0.25, y: 0.55, context: "UI library for building component-based interfaces", connections: ["js", "ts", "nextjs", "tailwind", "zustand", "framer", "quill"] },
  { id: "nextjs", label: "Next.js", cluster: "frontend", x: 0.35, y: 0.6, context: "React framework for SSR and static generation", connections: ["react", "node"] },
  { id: "tailwind", label: "Tailwind CSS", cluster: "frontend", x: 0.15, y: 0.6, context: "Utility-first CSS framework", connections: ["css", "react"] },
  { id: "framer", label: "Framer Motion", cluster: "frontend", x: 0.2, y: 0.7, context: "Animation library for React", connections: ["react", "lenis"] },
  { id: "lenis", label: "Lenis", cluster: "frontend", x: 0.1, y: 0.75, context: "Smooth scrolling library", connections: ["framer"] },
  { id: "zustand", label: "Zustand", cluster: "frontend", x: 0.3, y: 0.7, context: "Small, fast state-management", connections: ["react"] },
  { id: "quill", label: "React Quill", cluster: "frontend", x: 0.25, y: 0.8, context: "Rich text editor for React", connections: ["react"] },
  { id: "recharts", label: "Recharts", cluster: "frontend", x: 0.35, y: 0.75, context: "Composable charting library", connections: ["react"] },

  // Backend
  { id: "node", label: "Node.js", cluster: "backend", x: 0.65, y: 0.35, context: "JavaScript runtime for server-side apps", connections: ["js", "express", "socket", "pg", "mongo"] },
  { id: "express", label: "Express", cluster: "backend", x: 0.75, y: 0.3, context: "Web application framework for Node.js", connections: ["node", "jwt", "helmet", "rate"] },
  { id: "fastapi", label: "Python FastAPI", cluster: "backend", x: 0.7, y: 0.2, context: "High-performance Python web framework", connections: ["pg", "genai"] },
  { id: "socket", label: "Socket.io", cluster: "backend", x: 0.8, y: 0.4, context: "Real-time bidirectional communication", connections: ["node", "react"] },
  { id: "genai", label: "Google Gen AI", cluster: "backend", x: 0.6, y: 0.2, context: "Large language models integration", connections: ["fastapi", "node"] },
  { id: "oauth", label: "OAuth", cluster: "backend", x: 0.85, y: 0.25, context: "Standard for access delegation", connections: ["express", "node", "jwt"] },

  // Databases
  { id: "pg", label: "PostgreSQL", cluster: "databases", x: 0.6, y: 0.5, context: "Advanced open-source relational database", connections: ["dbms", "node", "fastapi"] },
  { id: "mysql", label: "MySQL", cluster: "databases", x: 0.7, y: 0.55, context: "Popular relational database", connections: ["dbms", "node"] },
  { id: "mongo", label: "MongoDB", cluster: "databases", x: 0.8, y: 0.5, context: "NoSQL document database", connections: ["dbms", "node"] },
  { id: "firebase", label: "Firebase", cluster: "databases", x: 0.85, y: 0.6, context: "BaaS for rapid development", connections: ["mongo", "react", "gcloud"] },

  // Security
  { id: "jwt", label: "JWT", cluster: "security", x: 0.75, y: 0.7, context: "Secure transmission of JSON objects", connections: ["express", "bcrypt", "oauth"] },
  { id: "bcrypt", label: "bcrypt", cluster: "security", x: 0.85, y: 0.75, context: "Password hashing function", connections: ["jwt"] },
  { id: "csrf", label: "CSRF/XSS", cluster: "security", x: 0.8, y: 0.85, context: "Web security mitigations", connections: ["helmet"] },
  { id: "helmet", label: "Helmet", cluster: "security", x: 0.7, y: 0.8, context: "Secures Express apps headers", connections: ["express", "csrf"] },
  { id: "rate", label: "Rate Limiting", cluster: "security", x: 0.9, y: 0.8, context: "Controls incoming request rates", connections: ["express"] },

  // DevOps & Tools
  { id: "docker", label: "Docker", cluster: "devops", x: 0.45, y: 0.7, context: "Containerization platform", connections: ["compose", "se", "pg", "gcloud"] },
  { id: "compose", label: "Docker Compose", cluster: "devops", x: 0.5, y: 0.8, context: "Multi-container Docker applications", connections: ["docker"] },
  { id: "gcloud", label: "Google Cloud", cluster: "devops", x: 0.6, y: 0.75, context: "Cloud computing services", connections: ["docker", "firebase"] },
  { id: "git", label: "Git", cluster: "devops", x: 0.35, y: 0.8, context: "Version control system", connections: ["github", "se"] },
  { id: "github", label: "GitHub", cluster: "devops", x: 0.4, y: 0.9, context: "Hosting service for Git repositories", connections: ["git"] },
];

type SkillNode = {
  id: string;
  label: string;
  cluster: string;
  x: number;
  y: number;
  phase: number;
  context: string;
  connections: string[];
  currentX: number;
  currentY: number;
  textWidth?: number;
};

function getThemeColors() {
  const root = document.documentElement;
  const style = getComputedStyle(root);
  
  const parseHsl = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return "hsl(0, 0%, 0%)"; // Fallback black
    // If it's space separated like "228 30% 6%", replace with commas "228, 30%, 6%"
    if (trimmed.includes(" ") && !trimmed.includes(",")) {
      return `hsl(${trimmed.split(/\s+/).join(", ")})`;
    }
    return `hsl(${trimmed})`;
  };

  return {
    background: parseHsl(style.getPropertyValue("--color-background")),
    foreground: parseHsl(style.getPropertyValue("--color-foreground")),
    accent: parseHsl(style.getPropertyValue("--color-accent")),
    muted: parseHsl(style.getPropertyValue("--color-muted-foreground")),
    border: parseHsl(style.getPropertyValue("--color-border")),
  };
}

export function SkillsConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false }); // PERFORMANCE: alpha: false optimizes rendering if background is completely painted
    if (!ctx) return;

    // Initialize nodes with random phases for independent floating
    const nodes: SkillNode[] = SKILLS_DATA.map((node) => ({
      ...node,
      phase: Math.random() * Math.PI * 2,
      currentX: 0,
      currentY: 0,
    }));

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let colors = getThemeColors();

    let mouseX = -1000;
    let mouseY = -1000;
    let hoveredNodeId: string | null = null;
    let clickedNodeId: string | null = null;

    // PERFORMANCE: Use ResizeObserver instead of window resize event for better performance and element-specific sizing
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const rect = entry.contentRect;
        const dpr = window.devicePixelRatio || 1;
        width = rect.width;
        height = rect.height;
        
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        
        ctx.scale(dpr, dpr);
        // Force font re-evaluation to measure text widths correctly after resize
        nodes.forEach(n => n.textWidth = undefined);
      }
    });
    resizeObserver.observe(canvas.parentElement!);

    // PERFORMANCE: Use MutationObserver to detect theme changes without polling
    const themeObserver = new MutationObserver(() => {
      colors = getThemeColors();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleClick = () => {
      if (hoveredNodeId) {
        clickedNodeId = hoveredNodeId === clickedNodeId ? null : hoveredNodeId;
      } else {
        clickedNodeId = null;
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove, { passive: true }); // PERFORMANCE: passive: true to not block scrolling
    canvas.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    canvas.addEventListener("click", handleClick);

    const draw = (time: number) => {
      animationFrameId = requestAnimationFrame(draw);
      if (!ctx || width === 0) return;

      // PERFORMANCE: Clear canvas using fillRect with background color
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, width, height);

      const floatAmp = 10;
      const timeSlow = time * 0.001;

      // Update node positions
      // PERFORMANCE: Batch state updates inside the render loop optimally
      let newHoveredNodeId = null;
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.currentX = node.x * width + Math.sin(timeSlow + node.phase) * floatAmp;
        node.currentY = node.y * height + Math.cos(timeSlow + node.phase) * floatAmp;

        // Check hover
        const dx = mouseX - node.currentX;
        const dy = mouseY - node.currentY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 30) {
          newHoveredNodeId = node.id;
        }
      }

      // PERFORMANCE: Only update cursor style if hover state changes
      if (newHoveredNodeId !== hoveredNodeId) {
        hoveredNodeId = newHoveredNodeId;
        canvas.style.cursor = hoveredNodeId ? "pointer" : "default";
      }

      // Draw Connections
      // PERFORMANCE: Batch connection drawing by style to minimize state changes in canvas
      ctx.lineWidth = 1;
      
      const drawLines = (highlighted: boolean) => {
        ctx.beginPath();
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          const isNodeActive = clickedNodeId === node.id || hoveredNodeId === node.id;
          
          for (const connId of node.connections) {
            const target = nodes.find(n => n.id === connId);
            if (!target) continue;

            const isTargetActive = clickedNodeId === target.id || hoveredNodeId === target.id;
            const isConnectionActive = isNodeActive || isTargetActive;
            const isActiveMode = clickedNodeId !== null || hoveredNodeId !== null;

            let shouldDraw = false;
            if (highlighted) {
              shouldDraw = isActiveMode && isConnectionActive;
            } else {
              shouldDraw = !isActiveMode || !isConnectionActive;
            }

            if (shouldDraw) {
              ctx.moveTo(node.currentX, node.currentY);
              ctx.lineTo(target.currentX, target.currentY);
            }
          }
        }
        ctx.stroke();
      };

      // Draw dimmed lines
      ctx.strokeStyle = colors.border;
      ctx.globalAlpha = (clickedNodeId || hoveredNodeId) ? 0.2 : 0.5;
      drawLines(false);
      
      // Draw highlighted lines
      if (clickedNodeId || hoveredNodeId) {
        ctx.strokeStyle = colors.accent;
        ctx.globalAlpha = 0.8;
        drawLines(true);
      }

      ctx.globalAlpha = 1.0;

      // Draw Nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const isHovered = hoveredNodeId === node.id;
        const isClicked = clickedNodeId === node.id;
        const isConnected = clickedNodeId ? 
            (node.connections.includes(clickedNodeId) || nodes.find(n => n.id === clickedNodeId)?.connections.includes(node.id)) : false;
            
        const isActive = isHovered || isClicked || isConnected;
        const isDimmed = (clickedNodeId || hoveredNodeId) && !isActive;

        ctx.globalAlpha = isDimmed ? 0.3 : 1.0;

        // Node dot
        ctx.beginPath();
        ctx.arc(node.currentX, node.currentY, isHovered ? 6 : 4, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? colors.accent : colors.foreground;
        ctx.fill();

        // Node label
        ctx.font = `${isHovered ? '600' : '400'} 14px var(--font-body, system-ui)`;
        if (!node.textWidth || isHovered) {
           node.textWidth = ctx.measureText(node.label).width;
        }

        ctx.fillStyle = isActive ? colors.foreground : colors.muted;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.label, node.currentX, node.currentY + 20);

        // Draw context if hovered
        if (isHovered) {
          ctx.font = "400 12px var(--font-body, system-ui)";
          const contextWidth = ctx.measureText(node.context).width;
          
          // Tooltip background
          ctx.fillStyle = colors.background;
          ctx.beginPath();
          ctx.roundRect(
            node.currentX - contextWidth / 2 - 8,
            node.currentY + 32,
            contextWidth + 16,
            24,
            4
          );
          ctx.fill();
          ctx.strokeStyle = colors.border;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Tooltip text
          ctx.fillStyle = colors.foreground;
          ctx.fillText(node.context, node.currentX, node.currentY + 44);
        }
      }

      ctx.globalAlpha = 1.0;
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[600px] overflow-hidden rounded-theme border border-border/50 bg-background">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />
    </div>
  );
}
