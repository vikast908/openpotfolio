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

export type PortfolioTheme = {
  accent: string;
  font: "sans" | "serif" | "mono";
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
  theme: { accent: "#4f46e5", font: "sans" },
  templateId: "minimal-dev",
};

export function withDefaults(partial: Partial<PortfolioConfig>): PortfolioConfig {
  return {
    ...defaultConfig,
    ...partial,
    theme: { ...defaultConfig.theme, ...(partial.theme ?? {}) },
    socials: partial.socials ?? defaultConfig.socials,
    skills: partial.skills ?? defaultConfig.skills,
    projects: partial.projects ?? defaultConfig.projects,
    experience: partial.experience ?? defaultConfig.experience,
  };
}