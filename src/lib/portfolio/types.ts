export type PortfolioProject = {
  title: string;
  description: string;
  url?: string;
  imageUrl?: string;
  tags: string[];
};

export type PortfolioExperience = {
  role: string;
  company: string;
  period: string;
  summary?: string;
};

export type PortfolioSocial = { label: string; url: string };

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
      period: "2021 — Now",
      summary: "Led the compiler team building numerical DSLs.",
    },
  ],
  theme: { colors: {}, typography: {}, motion: {} },
  templateId: "minimal-dev",
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