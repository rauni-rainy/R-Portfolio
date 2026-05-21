import { HeroSection } from "@/features/hero";
import { ShowcaseSection } from "@/features/showcase";
import { DissectorSection } from "@/features/dissector";
import { ProjectsSection } from "@/features/projects";
import { SkillsSection } from "@/features/skills";
import { SystemDesignSection } from "@/features/system-design";
import { ExperimentsSection } from "@/features/experiments";
import { ManifestoSection } from "@/features/manifesto";
import { ContactSection } from "@/features/contact";

export default function HomePage() {
  return (
    <main id="polymorphic-studio">
      <HeroSection />
      <ShowcaseSection />
      <SkillsSection />
      <ProjectsSection />
      <DissectorSection />
      <SystemDesignSection />
      <ExperimentsSection />
      <ManifestoSection />
      <ContactSection />
    </main>
  );
}
