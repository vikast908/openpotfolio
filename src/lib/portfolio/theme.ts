import type {
  PortfolioColors,
  PortfolioConfig,
  PortfolioMotion,
  PortfolioTheme,
  PortfolioTypography,
} from "./types";
import { getFont } from "./fonts";

export type ResolvedTheme = {
  colors: PortfolioColors;
  typography: Required<PortfolioTypography>;
  motion: Required<PortfolioMotion>;
};

export type TemplateDefaults = {
  colors: PortfolioColors;
  typography: Required<PortfolioTypography>;
  motion: Required<PortfolioMotion>;
};

export function resolveTheme(
  theme: PortfolioTheme,
  defaults: TemplateDefaults,
): ResolvedTheme {
  return {
    colors: { ...defaults.colors, ...(theme.colors ?? {}) },
    typography: { ...defaults.typography, ...(theme.typography ?? {}) },
    motion: { ...defaults.motion, ...(theme.motion ?? {}) },
  };
}

/** Font keys the resolved theme references (for <link> preloading). */
export function themeFontKeys(t: ResolvedTheme): string[] {
  return [t.typography.headingFont, t.typography.bodyFont];
}

const trackingMap: Record<PortfolioTypography["tracking"], string> = {
  tight: "-0.015em",
  normal: "0",
  wide: "0.06em",
};

/** CSS block that puts theme values on :root as custom properties and applies the base body font. */
export function themeCssVars(t: ResolvedTheme): string {
  const c = t.colors;
  const ty = t.typography;
  const head = getFont(ty.headingFont).stack;
  const body = getFont(ty.bodyFont).stack;
  return `:root{
  --bg:${c.background};
  --surface:${c.surface};
  --text:${c.text};
  --muted:${c.muted};
  --border:${c.border};
  --accent:${c.accent};
  --accent-text:${c.accentText};
  --radius:${ty.radius}px;
  --scale:${ty.scale};
  --track:${trackingMap[ty.tracking]};
  --heading-weight:${ty.headingWeight};
  --font-heading:${head};
  --font-body:${body};
}
html,body{background:var(--bg);color:var(--text);font-family:var(--font-body);font-size:calc(15px * var(--scale));letter-spacing:var(--track)}
h1,h2,h3,h4,h5,h6{font-family:var(--font-heading);font-weight:var(--heading-weight)}
`;
}

/** Motion CSS: enter animations for [data-anim] plus optional hover treatments. */
export function motionCss(m: PortfolioMotion): string {
  const intensity = m.intensity ?? 1;
  const dist = Math.round(10 * intensity);
  const dur = Math.round(320 * intensity);
  let kf = "";
  let anim = "";
  switch (m.preset) {
    case "none":
      break;
    case "fade":
      kf = `@keyframes anim-in{from{opacity:0}to{opacity:1}}`;
      anim = `animation:anim-in ${Math.max(180, dur)}ms ease-out both`;
      break;
    case "rise":
      kf = `@keyframes anim-in{from{opacity:0;transform:translateY(${dist}px)}to{opacity:1;transform:none}}`;
      anim = `animation:anim-in ${dur}ms cubic-bezier(0.23,1,0.32,1) both`;
      break;
    case "stagger-rise":
      kf = `@keyframes anim-in{from{opacity:0;transform:translateY(${dist}px)}to{opacity:1;transform:none}}`;
      anim = `animation:anim-in ${dur}ms cubic-bezier(0.23,1,0.32,1) both;animation-delay:calc(var(--i,0) * 60ms)`;
      break;
    case "blur-in":
      kf = `@keyframes anim-in{from{opacity:0;filter:blur(8px)}to{opacity:1;filter:blur(0)}}`;
      anim = `animation:anim-in ${Math.max(240, dur)}ms ease-out both`;
      break;
  }

  let hover = "";
  switch (m.hover) {
    case "lift":
      hover = `[data-hover]{transition:transform 220ms cubic-bezier(0.23,1,0.32,1),box-shadow 220ms}
[data-hover]:hover{transform:translateY(-3px);box-shadow:0 12px 28px -12px rgba(0,0,0,0.25)}`;
      break;
    case "underline":
      hover = `[data-hover]{position:relative}
[data-hover]::after{content:"";position:absolute;left:0;right:0;bottom:-2px;height:1.5px;background:currentColor;transform-origin:right;transform:scaleX(0);transition:transform 260ms cubic-bezier(0.23,1,0.32,1)}
[data-hover]:hover::after{transform-origin:left;transform:scaleX(1)}`;
      break;
    case "tilt":
      hover = `[data-hover]{transition:transform 240ms cubic-bezier(0.23,1,0.32,1)}
[data-hover]:hover{transform:rotate(-0.6deg) scale(1.01)}`;
      break;
    case "none":
      break;
  }

  const base = kf && anim ? `${kf}\n[data-anim]{${anim}}` : "";
  const reduced = `@media (prefers-reduced-motion:reduce){
  [data-anim]{animation:none!important}
  [data-hover]{transition:none!important}
  [data-hover]:hover{transform:none!important}
}`;
  return [base, hover, reduced].filter(Boolean).join("\n");
}

/** Convenience: everything a template needs to prepend before its own CSS. */
export function themeStyleBlock(t: ResolvedTheme): string {
  return `${themeCssVars(t)}\n${motionCss(t.motion)}`;
}

export function withResolvedTheme(
  config: PortfolioConfig,
  defaults: TemplateDefaults,
): { config: PortfolioConfig; theme: ResolvedTheme } {
  const theme = resolveTheme(config.theme, defaults);
  return { config, theme };
}