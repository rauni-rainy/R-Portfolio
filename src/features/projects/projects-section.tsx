"use client";

import { useCallback, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue
} from "framer-motion";
import { useLenis } from "lenis/react";
import type { StudioMode } from "@/lib/theme/design-tokens";
import { themeTokens } from "@/lib/theme/design-tokens";
import { useThemeStore } from "@/stores/theme-store";
import { ProjectPreviewArt } from "./project-preview-art";
import { projects, type Project } from "./projects-data";

type ProjectPanelProps = {
  index: number;
  project: Project;
  selectedMode: StudioMode | null;
  scrollYProgress: MotionValue<number>;
  onDissect: () => void;
};

const PROJECT_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const modeLensCopy = {
  neutral: {
    label: "Default build lens",
    note: "Range, systems thinking, and sharp product taste."
  },
  doctor: {
    label: "Clinical lens",
    note: "Clear hierarchy, trust signals, and low-friction task flows."
  },
  fashion: {
    label: "Editorial lens",
    note: "Scale contrast, selective drama, and brand-first pacing."
  },
  literary: {
    label: "Publishing lens",
    note: "Texture, readable rhythm, and strong issue-like sequencing."
  },
  electronics: {
    label: "Schematic lens",
    note: "Dense specs, crisp signal paths, and product diagnostics."
  },
  aiLab: {
    label: "AI lab lens",
    note: "Runtime clarity, data feedback, and controlled automation."
  }
} satisfies Record<StudioMode | "neutral", { label: string; note: string }>;

function ProjectPanel({
  index,
  project,
  selectedMode,
  scrollYProgress,
  onDissect
}: ProjectPanelProps) {
  const [isHovered, setIsHovered] = useState(false);
  const total = projects.length;
  const center = index / Math.max(1, total - 1);
  const inputRange: [number, number, number] =
    index === 0
      ? [0, 0.15, 0.35]
      : index === total - 1
        ? [0.7, 0.92, 1]
        : [Math.max(0, center - 0.2), center, Math.min(1, center + 0.2)];
  
  const y = useTransform(scrollYProgress, inputRange, [34, 0, -24]);
  // For the first element, when progress is 0, it should be 1 (fully visible).
  const opacity = useTransform(
    scrollYProgress, 
    inputRange, 
    index === 0 ? [1, 1, 0.4] : [0.45, 1, 0.45]
  );
  const selectedKey = selectedMode ?? "neutral";
  const lens = modeLensCopy[selectedKey];
  const modeLabel = selectedMode ? themeTokens[selectedMode].label : "Studio";

  return (
    <article
      className="relative flex h-screen min-w-[100vw] items-center overflow-hidden px-page py-12 text-foreground bg-transparent"
      data-project={project.id}
      data-studio-mode={selectedKey}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto grid w-full max-w-container gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(24rem,0.85fr)] lg:items-center bg-transparent"
      >
        <div>
          <div className="mb-6 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase leading-none tracking-wider text-muted-foreground">
            <span className="border border-border/30 bg-surface/10 px-3 py-1.5 rounded-full">
              0{index + 1} / {projects.length}
            </span>
            <span className="border border-border/30 bg-surface/10 px-3 py-1.5 rounded-full">
              {project.eyebrow}
            </span>
            <span className="border border-accent/40 bg-accent-muted/10 px-3 py-1.5 rounded-full text-accent">
              {modeLabel}
            </span>
          </div>

          <motion.h2
            layout
            className="max-w-4xl font-display text-5xl font-semibold leading-[0.95] tracking-tight text-foreground sm:text-7xl lg:text-8xl"
            transition={{ duration: 0.58, ease: PROJECT_EASE }}
          >
            {project.title}
          </motion.h2>

          <p className="mt-6 max-w-3xl text-lg font-light leading-relaxed text-foreground/80 sm:text-2xl">
            {project.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border/30 bg-surface/10 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={project.githubHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border/40 bg-transparent px-6 py-3 font-mono text-[11px] font-medium uppercase tracking-widest text-foreground transition-all duration-300 ease-in-out hover:border-accent hover:text-accent"
            >
              GitHub
            </a>
            <a
              href={project.liveHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-accent/40 bg-transparent px-6 py-3 font-mono text-[11px] font-medium uppercase tracking-widest text-foreground transition-all duration-300 ease-in-out hover:bg-accent/10 hover:border-accent hover:text-accent"
            >
              Live link
            </a>
            {project.hasDissector ? (
              <button
                type="button"
                className="rounded-full border border-accent/40 bg-transparent px-6 py-3 font-mono text-[11px] font-medium uppercase tracking-widest text-foreground transition-all duration-300 ease-in-out hover:bg-accent/10 hover:border-accent hover:text-accent"
                onClick={onDissect}
              >
                Dissect this <span aria-hidden="true">{"\u2192"}</span>
              </button>
            ) : null}
          </div>
        </div>

        <motion.div
          className="relative min-h-[26rem] overflow-hidden border border-border/20 bg-surface/10 backdrop-blur-sm shadow-none rounded-lg"
          animate={{
            y: isHovered ? -8 : 0
          }}
          transition={{ duration: 0.5, ease: PROJECT_EASE }}
        >
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-border/20 bg-background/10 px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
            <span>{project.status}</span>
            <span className="text-accent">{project.metric}</span>
          </div>

          <div className="absolute inset-0 pt-10">
            <ProjectPreviewArt projectId={project.id} isHovered={isHovered} />
          </div>

          <motion.div
            className="absolute bottom-0 left-0 right-0 border-t border-border/20 bg-background/20 p-4 backdrop-blur-sm"
            initial={false}
            animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.42, ease: PROJECT_EASE }}
          >
            <p className="font-mono text-[11px] uppercase tracking-wider text-accent">
              {lens.label}
            </p>
            <p className="mt-2 text-xs font-light leading-relaxed text-muted-foreground">
              {lens.note}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </article>
  );
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const lenis = useLenis();
  const selectedMode = useThemeStore((state) => state.mode);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${(projects.length - 1) * 100}vw`]
  );
  const progressScale = useTransform(scrollYProgress, [0, 1], [0.08, 1]);

  const handleDissect = useCallback(() => {
    const dissector = document.getElementById("dissector");

    if (!dissector) {
      return;
    }

    if (lenis) {
      lenis.scrollTo(dissector, { offset: -16 });
      return;
    }

    dissector.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start"
    });
  }, [lenis, prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-transparent text-foreground"
      style={{ height: `${projects.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 border-b border-border/20 bg-background/5 px-page py-4 backdrop-blur-sm">
          <div className="mx-auto flex max-w-container items-center justify-between gap-5">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-accent">
                Projects / horizontal reveal
              </p>
              <p className="mt-2 hidden text-xs font-light text-muted-foreground sm:block">
                Four builds, four proof points, one adaptable studio system.
              </p>
            </div>
            <div className="w-32 overflow-hidden rounded-full bg-border/20 sm:w-52">
              <motion.div
                className="h-1 origin-left rounded-full bg-accent"
                style={{ scaleX: progressScale }}
              />
            </div>
          </div>
        </div>

        <motion.div className="flex h-full will-change-transform" style={{ x }}>
          {projects.map((project, index) => (
            <ProjectPanel
              key={project.id}
              index={index}
              project={project}
              selectedMode={selectedMode}
              scrollYProgress={scrollYProgress}
              onDissect={handleDissect}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
