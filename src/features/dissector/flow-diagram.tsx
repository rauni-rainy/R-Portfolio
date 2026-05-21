"use client";

import { motion } from "framer-motion";
import { flowEdges, flowNodes, type FlowNode } from "./dissector-data";

type FlowDiagramProps = {
  activeIndex: number;
  onSelectNode: (index: number) => void;
};

const NODE_WIDTH = 124;
const NODE_HEIGHT = 72;
const FLOW_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function nodeRect(node: FlowNode) {
  return {
    x: node.x - NODE_WIDTH / 2,
    y: node.y - NODE_HEIGHT / 2
  };
}

export function FlowDiagram({ activeIndex, onSelectNode }: FlowDiagramProps) {
  return (
    <div className="relative overflow-hidden rounded-theme border border-border/70 bg-surface/80 shadow-theme">
      <div className="absolute inset-0 bg-theme-grid opacity-[0.11] [background-size:2.25rem_2.25rem]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />

      <svg
        className="relative z-10 h-full min-h-[29rem] w-full"
        viewBox="0 0 910 456"
        role="img"
        aria-labelledby="anti-cheat-flow-title anti-cheat-flow-desc"
      >
        <title id="anti-cheat-flow-title">
          ContestHub anti-cheat engine data flow
        </title>
        <desc id="anti-cheat-flow-desc">
          Browser Tab to Visibility API to Event Listener to Violation Counter
          to Grace Period Timer to Auto-Submit Trigger to Server JWT Validation.
        </desc>

        <defs>
          <filter id="dissector-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="0 0 0 0 0.42 0 0 0 0 1 0 0 0 0 0.7 0 0 0 0.9 0"
            />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <marker
            id="dissector-arrow"
            viewBox="0 0 10 10"
            refX="8.5"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--color-accent))" />
          </marker>
        </defs>

        <g aria-hidden="true">
          <circle cx="92" cy="88" r="110" fill="hsl(var(--color-accent) / 0.08)" />
          <circle
            cx="818"
            cy="216"
            r="126"
            fill="hsl(var(--color-secondary) / 0.08)"
          />
          <path
            d="M60 432 L850 24"
            stroke="hsl(var(--color-foreground) / 0.05)"
            strokeWidth="1"
          />
        </g>

        {flowEdges.map((edge, index) => {
          const isActive = index < activeIndex;

          return (
            <motion.path
              key={edge.id}
              d={edge.path}
              pathLength={1}
              strokeDasharray="1"
              markerEnd={isActive ? "url(#dissector-arrow)" : undefined}
              fill="none"
              stroke={isActive ? "hsl(var(--color-accent))" : "hsl(var(--color-border))"}
              strokeLinecap="round"
              strokeWidth={isActive ? 3.2 : 1.5}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0.42,
                strokeDashoffset: isActive ? 0 : 1
              }}
              transition={{
                duration: 0.74,
                ease: FLOW_EASE,
                delay: isActive ? 0.05 : 0
              }}
            />
          );
        })}

        {flowNodes.map((node, index) => {
          const rect = nodeRect(node);
          const isActive = activeIndex === index;
          const isComplete = activeIndex > index;

          return (
            <motion.g
              key={node.id}
              role="button"
              tabIndex={0}
              aria-label={`${node.label}: ${node.detail}`}
              className="cursor-pointer outline-none"
              onClick={() => onSelectNode(index)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelectNode(index);
                }
              }}
              initial={false}
              animate={{ scale: isActive ? 1.035 : 1 }}
              transition={{ duration: 0.42, ease: FLOW_EASE }}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            >
              {isActive ? (
                <motion.rect
                  x={rect.x - 5}
                  y={rect.y - 5}
                  width={NODE_WIDTH + 10}
                  height={NODE_HEIGHT + 10}
                  rx="12"
                  fill="hsl(var(--color-accent) / 0.16)"
                  filter="url(#dissector-glow)"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.42, ease: FLOW_EASE }}
                />
              ) : null}

              <rect
                x={rect.x}
                y={rect.y}
                width={NODE_WIDTH}
                height={NODE_HEIGHT}
                rx="9"
                fill={
                  isActive
                    ? "hsl(var(--color-accent-muted) / 0.55)"
                    : isComplete
                      ? "hsl(var(--color-accent-muted) / 0.28)"
                      : "hsl(var(--color-surface-elevated) / 0.82)"
                }
                stroke={
                  isActive
                    ? "hsl(var(--color-accent))"
                    : isComplete
                      ? "hsl(var(--color-accent) / 0.7)"
                      : "hsl(var(--color-border))"
                }
                strokeWidth={isActive ? 2.4 : 1.2}
              />

              <text
                x={node.x}
                y={node.y - 8}
                textAnchor="middle"
                fill="hsl(var(--color-foreground))"
                fontFamily="var(--font-mono)"
                fontSize="13"
                fontWeight="700"
              >
                {node.shortLabel}
              </text>
              <text
                x={node.x}
                y={node.y + 14}
                textAnchor="middle"
                fill="hsl(var(--color-muted-foreground))"
                fontFamily="var(--font-mono)"
                fontSize="10"
              >
                {node.detail}
              </text>

              <circle
                cx={rect.x + 12}
                cy={rect.y + 12}
                r="3.5"
                fill={
                  isActive || isComplete
                    ? "hsl(var(--color-accent))"
                    : "hsl(var(--color-muted-foreground) / 0.55)"
                }
              />
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
