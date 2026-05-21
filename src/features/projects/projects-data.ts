export type ProjectId = "akshar" | "contesthub" | "literary-circle" | "sevasamagra";

export type Project = {
  id: ProjectId;
  title: string;
  eyebrow: string;
  description: string;
  tags: string[];
  githubHref: string;
  liveHref: string;
  status: string;
  metric: string;
  hasDissector?: boolean;
};

export const projects = [
  {
    id: "sevasamagra",
    title: "SevaSamagra AI",
    eyebrow: "AI Spatial Intelligence OS",
    description:
      "An intelligent NGO OS transforming unstructured field calls into actionable spatial data via a Zero-UI voice pipeline (Twilio + Google GenAI) and real-time PostGIS mapping.",
    tags: ["Next.js", "FastAPI", "Google GenAI", "PostGIS"],
    githubHref: "https://github.com/rauni-rainy/SevaSamagra-AI",
    liveHref: "https://seva-frontend-204620046295.asia-south1.run.app/",
    status: "Impact ops",
    metric: "Zero-UI Voice Pipeline"
  },
  {
    id: "contesthub",
    title: "ContestHub",
    eyebrow: "Real-Time Competitive Platform",
    description:
      "A fully-featured competitive programming platform powered by WebSockets, featuring real-time leaderboards and strict fullscreen anti-cheat enforcement.",
    tags: ["Next.js", "Node.js", "Socket.io", "Docker"],
    githubHref: "https://github.com/rauni-rainy/Iship-Task",
    liveHref: "https://iship-frontend-140680379311.us-central1.run.app/",
    status: "Security engine",
    metric: "Secure Anti-Cheat & WebSockets",
    hasDissector: true
  },
  {
    id: "literary-circle",
    title: "Literary Circle Platform",
    eyebrow: "High-Performance Event Platform",
    description:
      "A student-body event system with adaptive media, secured via Firebase and Cloudflare, delivering blazingly fast UX powered by Vite.",
    tags: ["React", "Vite", "Tailwind", "Firebase"],
    githubHref: "https://github.com/rauni-rainy/LC-NITD",
    liveHref: "https://www.lcnitd.co.in/",
    status: "Event infrastructure",
    metric: "Cloudflare Secured"
  },
  {
    id: "akshar",
    title: "Akshar",
    eyebrow: "Social publishing platform",
    description:
      "A dedicated platform for writers featuring a proprietary Structured Review Engine, multi-format publishing, and threaded discussions.",
    tags: ["Next.js", "Tailwind v4", "PostgreSQL", "React Quill"],
    githubHref: "https://github.com/rauni-rainy/Akshar",
    liveHref: "https://akshar-hfs-projects-049a2beb.vercel.app",
    status: "Publishing Ecosystem",
    metric: "Structured Peer-Reviews"
  }
] satisfies Project[];
