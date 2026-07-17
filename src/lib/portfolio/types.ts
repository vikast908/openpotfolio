export type PortfolioProject = {
  title: string;
  description: string;
  url?: string;
  imageUrl?: string;
  tags: string[];
  featured?: boolean;
  // Case study fields (all optional; templates render only when present)
  role?: string;           // Your role on the project
  team?: string;           // Team composition
  timeline?: string;       // e.g. "Q1 2024 - Q3 2024"
  problem?: string;        // Problem / context
  research?: string;       // Research & evidence
  goals?: string;          // Goals & metrics targeted
  constraints?: string;    // Constraints
  strategy?: string;       // Strategy & decisions
  execution?: string;      // Execution / what shipped
  results?: string;        // Outcomes (quantified)
  metrics?: { label: string; value: string }[]; // e.g. [{label:"Activation",value:"+38%"}]
  challenges?: string;     // Challenges & tradeoffs
  lessons?: string;        // Lessons / what I'd do differently
};

export type PortfolioExperience = {
  role: string;
  company: string;
  period: string;
  summary?: string;
};

export type PortfolioSocial = { label: string; url: string };

export type PortfolioSkillGroup = { label: string; items: string[] };
export type PortfolioAchievement = { title: string; detail?: string; year?: string };
export type PortfolioTestimonial = { quote: string; author: string; role?: string };
export type PortfolioWriting = { title: string; url?: string; kind?: string; summary?: string };

export type PortfolioColorRole =
  | "background"
  | "surface"
  | "text"
  | "muted"
  | "border"
  | "accent"
  | "accentText";

export type PortfolioColors = Record<PortfolioColorRole, string>;

export type MotionPreset = "none" | "fade" | "rise" | "stagger-rise" | "blur-in";
export type HoverPreset = "none" | "lift" | "underline" | "tilt";
export type TrackingPreset = "tight" | "normal" | "wide";

export type PortfolioTypography = {
  headingFont: string;
  bodyFont: string;
  scale: number; // 0.85 – 1.25
  headingWeight: 300 | 400 | 500 | 600 | 700 | 800 | 900;
  tracking: TrackingPreset;
  radius: number; // px
};

export type PortfolioMotion = {
  preset: MotionPreset;
  intensity: number; // 0 – 1.5
  hover: HoverPreset;
};

export type PortfolioTheme = {
  colors: Partial<PortfolioColors>;
  typography: Partial<PortfolioTypography>;
  motion: Partial<PortfolioMotion>;
};

export type PortfolioConfig = {
  name: string;
  headline: string;
  bio: string;
  avatarUrl?: string;
  location?: string;
  email?: string;
  socials: PortfolioSocial[];
  skills: string[];
  projects: PortfolioProject[];
  experience: PortfolioExperience[];
  theme: PortfolioTheme;
  templateId: string;
  // Optional PM/rich-portfolio fields - all templates render only what's present.
  resumeUrl?: string;
  workPreference?: string;      // e.g. "Open to full-time PM roles, EU/remote"
  cta?: string;                 // e.g. "Book a 20-min intro call"
  strengths?: string[];         // 2-4 key strengths / domains
  story?: string;               // Career story (About Me)
  philosophy?: string;          // Product philosophy
  industries?: string[];        // Industries / domains
  skillGroups?: PortfolioSkillGroup[]; // Grouped capabilities
  achievements?: PortfolioAchievement[];
  testimonials?: PortfolioTestimonial[];
  writing?: PortfolioWriting[]; // Articles, talks, frameworks
};

export const defaultConfig: PortfolioConfig = {
  name: "Ada Lovelace",
  headline: "Software engineer & writer",
  bio: "I build tools that help people think. Previously at Analytical Engines. I write about programming, math, and craft.",
  avatarUrl: "",
  location: "London, UK",
  email: "ada@example.com",
  socials: [
    { label: "GitHub", url: "https://github.com/ada" },
    { label: "Twitter", url: "https://twitter.com/ada" },
  ],
  skills: ["TypeScript", "React", "Systems design", "Technical writing"],
  projects: [
    {
      title: "Note Engine",
      description: "A local-first notes app with backlinks and full-text search.",
      url: "https://example.com/notes",
      imageUrl: "",
      tags: ["Product", "TypeScript"],
    },
    {
      title: "Analytical Blog",
      description: "Essays on programming languages and mathematical machines.",
      url: "https://example.com/blog",
      imageUrl: "",
      tags: ["Writing"],
    },
  ],
  experience: [
    {
      role: "Senior Engineer",
      company: "Analytical Engines",
      period: "2021 - Now",
      summary: "Led the compiler team building numerical DSLs.",
    },
  ],
  theme: { colors: {}, typography: {}, motion: {} },
  templateId: "minimal-dev",
  resumeUrl: "",
  workPreference: "Open to senior PM roles · remote or London",
  cta: "Book a 20-min intro call",
  strengths: ["0→1 product discovery", "Growth & activation", "Platform strategy"],
  story:
    "I started as an engineer, moved into product to be closer to the problem. Ten years across fintech, dev tools, and marketplaces - always shipping alongside the team, always writing the story down.",
  philosophy:
    "Small bets, sharp evidence, honest retros. The best PMs make the team faster at learning, not just faster at shipping.",
  industries: ["Fintech", "Developer tools", "Marketplaces"],
  skillGroups: [
    { label: "Discovery & research", items: ["User interviews", "JTBD", "Opportunity trees"] },
    { label: "Strategy", items: ["Roadmapping", "OKRs", "Positioning"] },
    { label: "Analytics", items: ["SQL", "Amplitude", "Experiment design"] },
    { label: "Leadership", items: ["Cross-functional facilitation", "Coaching", "Written comms"] },
  ],
  achievements: [
    { title: "Grew activation 38%", detail: "Rebuilt onboarding around a single aha moment", year: "2024" },
    { title: "Shipped v2 platform", detail: "Cut integration time from 2 weeks to 2 days", year: "2023" },
  ],
  testimonials: [
    { quote: "The clearest product thinker I've worked with. Turns fog into a plan.", author: "Jamie Chen", role: "VP Engineering, Analytical Engines" },
  ],
  writing: [
    { title: "The evidence ladder for PMs", url: "https://example.com/evidence-ladder", kind: "Essay" },
    { title: "Discovery without theatre", url: "https://example.com/discovery", kind: "Talk" },
  ],
};

export function withDefaults(partial: Partial<PortfolioConfig> & Record<string, unknown>): PortfolioConfig {
  const rawTheme = (partial.theme ?? {}) as Record<string, unknown>;
  // Legacy shape: { accent: '#hex', font: 'sans'|'serif'|'mono' }
  const legacyAccent = typeof rawTheme.accent === "string" ? (rawTheme.accent as string) : undefined;
  const legacyFont =
    typeof rawTheme.font === "string" ? (rawTheme.font as "sans" | "serif" | "mono") : undefined;
  const modernColors = (rawTheme.colors as Partial<PortfolioColors>) ?? {};
  const modernTypography = (rawTheme.typography as Partial<PortfolioTypography>) ?? {};
  const modernMotion = (rawTheme.motion as Partial<PortfolioMotion>) ?? {};

  const theme: PortfolioTheme = {
    colors: {
      ...(legacyAccent ? { accent: legacyAccent } : {}),
      ...modernColors,
    },
    typography: {
      ...(legacyFont === "serif" ? { headingFont: "instrument-serif", bodyFont: "iowan" } : {}),
      ...(legacyFont === "mono" ? { headingFont: "jetbrains-mono", bodyFont: "jetbrains-mono" } : {}),
      ...(legacyFont === "sans" ? { headingFont: "inter", bodyFont: "inter" } : {}),
      ...modernTypography,
    },
    motion: modernMotion,
  };

  return {
    ...defaultConfig,
    ...(partial as Partial<PortfolioConfig>),
    theme,
    socials: partial.socials ?? defaultConfig.socials,
    skills: partial.skills ?? defaultConfig.skills,
    projects: partial.projects ?? defaultConfig.projects,
    experience: partial.experience ?? defaultConfig.experience,
  };
}