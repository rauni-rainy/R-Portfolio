import React from "react";

type RationaleCardProps = {
  rationale: string;
};

export function RationaleCard({ rationale }: RationaleCardProps) {
  return (
    <div className="max-w-[900px] mx-auto mt-8 p-6 bg-surface-elevated/40 backdrop-blur-sm border-l-4 border-l-accent rounded-r-lg">
      <p className="font-body text-[15px] font-light leading-[1.7] text-foreground/80">
        {rationale}
      </p>
    </div>
  );
}
