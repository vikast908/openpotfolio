import { z } from "zod";

const metricSchema = z.object({
  label: z.string(),
  value: z.string(),
});

const projectSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  url: z.string().optional(),
  imageUrl: z.string().optional(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().optional(),
  role: z.string().optional(),
  team: z.string().optional(),
  timeline: z.string().optional(),
  problem: z.string().optional(),
  research: z.string().optional(),
  goals: z.string().optional(),
  constraints: z.string().optional(),
  strategy: z.string().optional(),
  execution: z.string().optional(),
  results: z.string().optional(),
  metrics: z.array(metricSchema).optional(),
  challenges: z.string().optional(),
  lessons: z.string().optional(),
});

const experienceSchema = z.object({
  id: z.string().optional(),
  role: z.string(),
  company: z.string(),
  period: z.string(),
  summary: z.string().optional(),
});

const socialSchema = z.object({
  id: z.string().optional(),
  label: z.string(),
  url: z.string(),
});

const skillGroupSchema = z.object({
  id: z.string().optional(),
  label: z.string(),
  items: z.array(z.string()).default([]),
});

const achievementSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  detail: z.string().optional(),
  year: z.string().optional(),
});

const testimonialSchema = z.object({
  id: z.string().optional(),
  quote: z.string(),
  author: z.string(),
  role: z.string().optional(),
});

const writingSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  url: z.string().optional(),
  kind: z.string().optional(),
  summary: z.string().optional(),
});

const colorsSchema = z
  .object({
    background: z.string().optional(),
    surface: z.string().optional(),
    text: z.string().optional(),
    muted: z.string().optional(),
    border: z.string().optional(),
    accent: z.string().optional(),
    accentText: z.string().optional(),
  })
  .partial();

const typographySchema = z
  .object({
    headingFont: z.string().optional(),
    bodyFont: z.string().optional(),
    scale: z.number().optional(),
    headingWeight: z
      .union([
        z.literal(300),
        z.literal(400),
        z.literal(500),
        z.literal(600),
        z.literal(700),
        z.literal(800),
        z.literal(900),
      ])
      .optional(),
    tracking: z.enum(["tight", "normal", "wide"]).optional(),
    radius: z.number().optional(),
  })
  .partial();

const motionSchema = z
  .object({
    preset: z.enum(["none", "fade", "rise", "stagger-rise", "blur-in"]).optional(),
    intensity: z.number().optional(),
    hover: z.enum(["none", "lift", "underline", "tilt"]).optional(),
  })
  .partial();

/** Modern + legacy theme shapes accepted on the wire. */
const themeSchema = z
  .object({
    colors: colorsSchema.optional(),
    typography: typographySchema.optional(),
    motion: motionSchema.optional(),
    accent: z.string().optional(),
    font: z.enum(["sans", "serif", "mono"]).optional(),
  })
  .passthrough()
  .optional();

/** Loose wire schema — missing fields are filled by withDefaults / normalizeConfig. */
export const portfolioConfigSchema = z
  .object({
    v: z.number().optional(),
    name: z.string().optional(),
    headline: z.string().optional(),
    bio: z.string().optional(),
    avatarUrl: z.string().optional(),
    location: z.string().optional(),
    email: z.string().optional(),
    socials: z.array(socialSchema).optional(),
    skills: z.array(z.string()).optional(),
    projects: z.array(projectSchema).optional(),
    experience: z.array(experienceSchema).optional(),
    theme: themeSchema,
    templateId: z.string().optional(),
    resumeUrl: z.string().optional(),
    workPreference: z.string().optional(),
    cta: z.string().optional(),
    strengths: z.array(z.string()).optional(),
    story: z.string().optional(),
    philosophy: z.string().optional(),
    industries: z.array(z.string()).optional(),
    skillGroups: z.array(skillGroupSchema).optional(),
    achievements: z.array(achievementSchema).optional(),
    testimonials: z.array(testimonialSchema).optional(),
    writing: z.array(writingSchema).optional(),
  })
  .passthrough();

export type WirePortfolioConfig = z.infer<typeof portfolioConfigSchema>;

export function parseWireConfig(input: unknown): WirePortfolioConfig {
  const parsed = portfolioConfigSchema.safeParse(input ?? {});
  return (parsed.success ? parsed.data : {}) as WirePortfolioConfig;
}
