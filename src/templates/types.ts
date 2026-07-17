import type { PortfolioConfig } from "@/lib/portfolio/types";
import type { MotionPreset, PortfolioColorRole } from "@/lib/portfolio/types";
import type { TemplateDefaults, ResolvedTheme } from "@/lib/portfolio/theme";
import { resolveTheme, themeStyleBlock, themeFontKeys } from "@/lib/portfolio/theme";
import { fontLinkTags, FONTS, type FontEntry } from "@/lib/portfolio/fonts";

/** Which content sections the form exposes and the template is expected to render. */
export type ContentCapabilities = {
  caseStudies: boolean;
  skillGroups: boolean;
  achievements: boolean;
  testimonials: boolean;
  writing: boolean;
  /** Career story, philosophy, industries */
  story: boolean;
  /** resume, cta, workPreference, strengths */
  cta: boolean;
};

export type TemplateCapabilities = {
  colorRoles: PortfolioColorRole[];
  fontFilter?: (f: FontEntry) => boolean;
  motionPresets: MotionPreset[];
  supports: {
    scale: boolean;
    radius: boolean;
    tracking: boolean;
    weight: boolean;
    hover: boolean;
  };
  content: ContentCapabilities;
};

export type TemplateMeta = {
  id: string;
  name: string;
  tagline: string;
  tags: string[];
  swatch: string[]; // 2-3 colors for gallery thumbnail
};

export type StaticOutput = { html: string; css: string };

export type Template = {
  meta: TemplateMeta;
  capabilities: TemplateCapabilities;
  defaults: TemplateDefaults;
  render: (config: PortfolioConfig) => StaticOutput;
};

export const ALL_COLOR_ROLES: PortfolioColorRole[] = [
  "background",
  "surface",
  "text",
  "muted",
  "border",
  "accent",
  "accentText",
];

export const ALL_MOTION_PRESETS: MotionPreset[] = [
  "none",
  "fade",
  "rise",
  "stagger-rise",
  "blur-in",
];

/** Core templates: basics + projects + skills + experience + socials only. */
export const CORE_CONTENT: ContentCapabilities = {
  caseStudies: false,
  skillGroups: false,
  achievements: false,
  testimonials: false,
  writing: false,
  story: false,
  cta: false,
};

/** PM / consultant-style templates that render rich portfolio sections. */
export const RICH_CONTENT: ContentCapabilities = {
  caseStudies: true,
  skillGroups: true,
  achievements: true,
  testimonials: true,
  writing: true,
  story: true,
  cta: true,
};

export const FULL_STYLE_SUPPORTS: TemplateCapabilities["supports"] = {
  scale: true,
  radius: true,
  tracking: true,
  weight: true,
  hover: true,
};

export function isKind(kind: FontEntry["kind"]) {
  return (f: FontEntry) => f.kind === kind || f.kind === "display";
}
export const anyFont = (_f: FontEntry) => true;

export function esc(s: string | undefined | null): string {
  if (!s) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Resolve template defaults with user's overrides + build the full <html>. */
export function renderWithTheme(
  config: PortfolioConfig,
  defaults: TemplateDefaults,
  buildCss: (t: ResolvedTheme) => string,
  body: string,
): StaticOutput {
  const theme = resolveTheme(config.theme, defaults);
  const themeBlock = themeStyleBlock(theme);
  const templateCss = buildCss(theme);
  const combined = `${themeBlock}\n${templateCss}`;
  const fonts = fontLinkTags(themeFontKeys(theme));
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${esc(config.name)}</title>
${fonts}
<style>${combined}</style>
</head>
<body>
${body}
</body>
</html>`;
  return { html, css: combined };
}

// Kept for any callers that still want a bare wrap; delegates without theme.
export function wrapDoc(title: string, css: string, body: string): string {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${esc(title)}</title><style>${css}</style></head><body>${body}</body></html>`;
}

// Re-export FONTS for template author convenience.
export { FONTS };
