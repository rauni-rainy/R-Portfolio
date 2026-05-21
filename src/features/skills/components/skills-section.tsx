import dynamic from "next/dynamic";

const SkillsConstellation = dynamic(
  () => import("./skills-constellation").then((m) => m.SkillsConstellation),
  {
    ssr: false,
    loading: () => (
      <div className="relative w-full min-h-[600px] flex items-center justify-center">
        <span className="text-muted-foreground/40 font-mono text-xs tracking-widest uppercase">
          Loading constellation...
        </span>
      </div>
    )
  }
);

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-section px-page bg-transparent text-foreground">
      <div className="max-w-container mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-display font-semibold text-foreground tracking-tight">
            Ecosystem & Architecture
          </h2>
          <p className="mt-4 text-lg text-muted-foreground/80 max-w-2xl font-light font-body leading-relaxed">
            A dynamic constellation of the technologies I use. 
            Frontend frameworks, backend microservices, DevOps pipelines, and AI orchestrations. 
            Hover and click to explore connections.
          </p>
        </div>
        
        <div className="w-full relative bg-transparent">
          <SkillsConstellation />
        </div>
      </div>
    </section>
  );
}
