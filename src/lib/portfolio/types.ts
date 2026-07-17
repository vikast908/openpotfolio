import { parseWireConfig } from "./schema";

export type PortfolioProject = {
  id?: string;
  title: string;
  description: string;
  url?: string;
  imageUrl?: string;
  tags: string[];
  featured?: boolean;
  // Case study fields (all optional; templates render only when present)
  role?: string;
  team?: string;
  timeline?: string;
  problem?: string;
  research?: string;
  goals?: string;
  constraints?: string;
  strategy?: string;
  execution?: string;
  results?: string;
  metrics?: { label: string; value: string }[];
  challenges?: string;
  lessons?: string;
};

export type PortfolioExperience = {
  id?: string;
  role: string;
  company: string;
  period: string;
  summary?: string;
};

export type PortfolioSocial = { id?: string; label: string; url: string };

export type PortfolioSkillGroup = { id?: string; label: string; items: string[] };
export type PortfolioAchievement = {
  id?: string;
  title: string;
  detail?: string;
  year?: string;
};
export type PortfolioTestimonial = {
  id?: string;
  quote: string;
  author: string;
  role?: string;
};
export type PortfolioWriting = {
  id?: string;
  title: string;
  url?: string;
  kind?: string;
  summary?: string;
};

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
  scale: number; // 0.85 - 1.25
  headingWeight: 300 | 400 | 500 | 600 | 700 | 800 | 900;
  tracking: TrackingPreset;
  radius: number; // px
};

export type PortfolioMotion = {
  preset: MotionPreset;
  intensity: number; // 0 - 1.5
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
  // Optional PM/rich-portfolio fields - templates declare content capabilities.
  resumeUrl?: string;
  workPreference?: string;
  cta?: string;
  strengths?: string[];
  story?: string;
  philosophy?: string;
  industries?: string[];
  skillGroups?: PortfolioSkillGroup[];
  achievements?: PortfolioAchievement[];
  testimonials?: PortfolioTestimonial[];
  writing?: PortfolioWriting[];
};

export const defaultConfig: PortfolioConfig = {
  name: "Ada Lovelace",
  headline: "Software engineer & writer",
  bio: "I build tools that help people think. Previously at Analytical Engines. I write about programming, math, and craft.",
  avatarUrl: "",
  location: "London, UK",
  email: "ada@example.com",
  socials: [
    { id: "social-github", label: "GitHub", url: "https://github.com/ada" },
    { id: "social-twitter", label: "Twitter", url: "https://twitter.com/ada" },
  ],
  skills: ["TypeScript", "React", "Systems design", "Technical writing"],
  projects: [
    {
      id: "proj-notes",
      title: "Note Engine",
      description: "A local-first notes app with backlinks and full-text search.",
      url: "https://example.com/notes",
      imageUrl: "",
      tags: ["Product", "TypeScript"],
    },
    {
      id: "proj-blog",
      title: "Analytical Blog",
      description: "Essays on programming languages and mathematical machines.",
      url: "https://example.com/blog",
      imageUrl: "",
      tags: ["Writing"],
    },
  ],
  experience: [
    {
      id: "exp-ae",
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
    {
      id: "sg-discovery",
      label: "Discovery & research",
      items: ["User interviews", "JTBD", "Opportunity trees"],
    },
    { id: "sg-strategy", label: "Strategy", items: ["Roadmapping", "OKRs", "Positioning"] },
    {
      id: "sg-analytics",
      label: "Analytics",
      items: ["SQL", "Amplitude", "Experiment design"],
    },
    {
      id: "sg-leadership",
      label: "Leadership",
      items: ["Cross-functional facilitation", "Coaching", "Written comms"],
    },
  ],
  achievements: [
    {
      id: "ach-activation",
      title: "Grew activation 38%",
      detail: "Rebuilt onboarding around a single aha moment",
      year: "2024",
    },
    {
      id: "ach-platform",
      title: "Shipped v2 platform",
      detail: "Cut integration time from 2 weeks to 2 days",
      year: "2023",
    },
  ],
  testimonials: [
    {
      id: "tst-jamie",
      quote: "The clearest product thinker I've worked with. Turns fog into a plan.",
      author: "Jamie Chen",
      role: "VP Engineering, Analytical Engines",
    },
  ],
  writing: [
    {
      id: "wrt-ladder",
      title: "The evidence ladder for PMs",
      url: "https://example.com/evidence-ladder",
      kind: "Essay",
    },
    {
      id: "wrt-discovery",
      title: "Discovery without theatre",
      url: "https://example.com/discovery",
      kind: "Talk",
    },
  ],
};

function newId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function withIds<T extends { id?: string }>(items: T[]): (T & { id: string })[] {
  return items.map((item) => ({ ...item, id: item.id || newId() }));
}

/** Normalize partial / wire payloads into a full PortfolioConfig (validates + assigns list ids). */
export function withDefaults(input: unknown): PortfolioConfig {
  const partial = parseWireConfig(input) as Record<string, unknown>;

  const rawTheme = (partial.theme ?? {}) as Record<string, unknown>;
  const legacyAccent = typeof rawTheme.accent === "string" ? rawTheme.accent : undefined;
  const legacyFont =
    typeof rawTheme.font === "string" ? (rawTheme.font as "sans" | "serif" | "mono") : undefined;
  const modernColors =
    rawTheme.colors && typeof rawTheme.colors === "object"
      ? (rawTheme.colors as Partial<PortfolioColors>)
      : {};
  const modernTypography =
    rawTheme.typography && typeof rawTheme.typography === "object"
      ? (rawTheme.typography as Partial<PortfolioTypography>)
      : {};
  const modernMotion =
    rawTheme.motion && typeof rawTheme.motion === "object"
      ? (rawTheme.motion as Partial<PortfolioMotion>)
      : {};

  const theme: PortfolioTheme = {
    colors: {
      ...(legacyAccent ? { accent: legacyAccent } : {}),
      ...modernColors,
    },
    typography: {
      ...(legacyFont === "serif"
        ? { headingFont: "instrument-serif", bodyFont: "iowan" }
        : {}),
      ...(legacyFont === "mono"
        ? { headingFont: "jetbrains-mono", bodyFont: "jetbrains-mono" }
        : {}),
      ...(legacyFont === "sans" ? { headingFont: "inter", bodyFont: "inter" } : {}),
      ...modernTypography,
    },
    motion: modernMotion,
  };

  return {
    ...defaultConfig,
    ...(partial as Partial<PortfolioConfig>),
    theme,
    socials: withIds(
      Array.isArray(partial.socials)
        ? (partial.socials as PortfolioSocial[])
        : defaultConfig.socials,
    ),
    skills: Array.isArray(partial.skills) ? (partial.skills as string[]) : defaultConfig.skills,
    projects: withIds(
      Array.isArray(partial.projects)
        ? (partial.projects as PortfolioProject[])
        : defaultConfig.projects,
    ),
    experience: withIds(
      Array.isArray(partial.experience)
        ? (partial.experience as PortfolioExperience[])
        : defaultConfig.experience,
    ),
    skillGroups: withIds(
      Array.isArray(partial.skillGroups)
        ? (partial.skillGroups as PortfolioSkillGroup[])
        : (defaultConfig.skillGroups ?? []),
    ),
    achievements: withIds(
      Array.isArray(partial.achievements)
        ? (partial.achievements as PortfolioAchievement[])
        : (defaultConfig.achievements ?? []),
    ),
    testimonials: withIds(
      Array.isArray(partial.testimonials)
        ? (partial.testimonials as PortfolioTestimonial[])
        : (defaultConfig.testimonials ?? []),
    ),
    writing: withIds(
      Array.isArray(partial.writing)
        ? (partial.writing as PortfolioWriting[])
        : (defaultConfig.writing ?? []),
    ),
  };
}
