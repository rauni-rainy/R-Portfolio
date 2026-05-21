"use client";

import { motion } from "framer-motion";
import type { ProjectId } from "./projects-data";

type ProjectPreviewArtProps = {
  projectId: ProjectId;
  isHovered: boolean;
};

const ART_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function AksharArt({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-surface">
      <motion.img
        src="/assets/projects/akshar.png.png"
        alt="Akshar Platform Screenshot - The Internet is Broken"
        className="h-full w-full object-cover object-top"
        animate={{ scale: isHovered ? 1.05 : 1, opacity: isHovered ? 1 : 0.9 }}
        transition={{ duration: 0.6, ease: ART_EASE }}
      />
    </div>
  );
}

function ContestHubArt({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-surface">
      <motion.img
        src="/assets/projects/contesthub.png"
        alt="ContestHub Screenshot - Real-Time Platform"
        className="h-full w-full object-cover object-top"
        animate={{ scale: isHovered ? 1.05 : 1, opacity: isHovered ? 1 : 0.9 }}
        transition={{ duration: 0.6, ease: ART_EASE }}
      />
    </div>
  );
}

function LiteraryArt({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-surface">
      <motion.img
        src="/assets/projects/literarycircle.png"
        alt="Literary Circle Platform Screenshot"
        className="h-full w-full object-cover object-top"
        animate={{ scale: isHovered ? 1.05 : 1, opacity: isHovered ? 1 : 0.9 }}
        transition={{ duration: 0.6, ease: ART_EASE }}
      />
    </div>
  );
}

function SevaSamagraArt({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-surface">
      <motion.img
        src="/assets/projects/sevasamagraai.png"
        alt="SevaSamagra AI Dashboard Screenshot"
        className="h-full w-full object-cover object-top"
        animate={{ scale: isHovered ? 1.05 : 1, opacity: isHovered ? 1 : 0.9 }}
        transition={{ duration: 0.6, ease: ART_EASE }}
      />
    </div>
  );
}

export function ProjectPreviewArt({ projectId, isHovered }: ProjectPreviewArtProps) {
  if (projectId === "akshar") {
    return <AksharArt isHovered={isHovered} />;
  }

  if (projectId === "contesthub") {
    return <ContestHubArt isHovered={isHovered} />;
  }

  if (projectId === "literary-circle") {
    return <LiteraryArt isHovered={isHovered} />;
  }

  return <SevaSamagraArt isHovered={isHovered} />;
}
