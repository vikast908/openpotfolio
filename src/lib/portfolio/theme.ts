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

/** Rough luminance from a hex color (0..1). */
function hexLuminance(hex: string): number {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return 1;
  const r = ((n >> 16) & 255) / 255;
  const g = ((n >> 8) & 255) / 255;
  const b = (n & 255) / 255;
  const f = (v: number) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

/** CSS block that puts theme values on :root as custom properties and applies the base body font. */
export function themeCssVars(t: ResolvedTheme): string {
  const c = t.colors;
  const ty = t.typography;
  const head = getFont(ty.headingFont).stack;
  const body = getFont(ty.bodyFont).stack;
  const scheme = hexLuminance(c.background) < 0.4 ? "dark" : "light";
  return `:root{
  color-scheme:${scheme};
  --bg:${c.background};
  --surface:${c.surface};
  --text:${c.text};
  --muted:${c.muted};
  --border:${c.border};
  --accent:${c.accent};
  --accent-text:${c.accentText};
  --radius:${ty.radius}px;
  --radius-sm:max(2px, calc(${ty.radius}px * 0.35));
  --scale:${ty.scale};
  --track:${trackingMap[ty.tracking]};
  --heading-weight:${ty.headingWeight};
  --font-heading:${head};
  --font-body:${body};
  --ease-out:cubic-bezier(0.23,1,0.32,1);
}
html,body{background:var(--bg);color:var(--text);font-family:var(--font-body);font-size:calc(15px * var(--scale));letter-spacing:var(--track)}
h1,h2,h3,h4,h5,h6{font-family:var(--font-heading);font-weight:var(--heading-weight)}
a,button{transition:transform 140ms var(--ease-out),color 160ms var(--ease-out),border-color 160ms var(--ease-out),background-color 160ms var(--ease-out),opacity 160ms var(--ease-out)}
a:active,button:active{transform:scale(0.97)}
a:focus-visible,button:focus-visible{outline:2px solid var(--accent);outline-offset:2px;border-radius:var(--radius-sm)}
`;
}

/** Motion CSS: enter animations for [data-anim] plus optional hover treatments. */
export function motionCss(m: PortfolioMotion): string {
  const intensity = Math.max(0, Math.min(1.5, m.intensity ?? 1));
  const dist = Math.round(8 * intensity);
  // Clamp UI motion under 300ms (Emil): base 220ms + up to 80ms with intensity.
  const dur = Math.round(220 + 60 * intensity);
  let kf = "";
  let anim = "";
  switch (m.preset) {
    case "none":
      break;
    case "fade":
      kf = `@keyframes anim-in{from{opacity:0}to{opacity:1}}`;
      anim = `animation:anim-in ${Math.min(260, dur)}ms cubic-bezier(0.23,1,0.32,1) both`;
      break;
    case "rise":
      kf = `@keyframes anim-in{from{opacity:0;transform:translateY(${dist}px)}to{opacity:1;transform:none}}`;
      anim = `animation:anim-in ${dur}ms cubic-bezier(0.23,1,0.32,1) both`;
      break;
    case "stagger-rise":
      kf = `@keyframes anim-in{from{opacity:0;transform:translateY(${dist}px)}to{opacity:1;transform:none}}`;
      // Cap cascade at 6 * 40ms = 240ms so long lists don't drag on.
      anim = `animation:anim-in ${dur}ms cubic-bezier(0.23,1,0.32,1) both;animation-delay:calc(min(var(--i,0), 6) * ${Math.round(40 * intensity)}ms)`;
      break;
    case "blur-in":
      // Only blur text nodes — cheaper on Safari and preserves image/border fidelity.
      kf = `@keyframes anim-in-blur{from{opacity:0;filter:blur(4px)}to{opacity:1;filter:blur(0)}}
@keyframes anim-in{from{opacity:0}to{opacity:1}}`;
      anim = `animation:anim-in ${dur}ms cubic-bezier(0.23,1,0.32,1) both`;
      break;
  }

  let hover = "";
  switch (m.hover) {
    case "lift":
      hover = `@media (hover:hover) and (pointer:fine){
  [data-hover]{position:relative;transition:transform 200ms cubic-bezier(0.23,1,0.32,1)}
  [data-hover]::before{content:"";position:absolute;inset:0;border-radius:inherit;box-shadow:0 12px 28px -12px rgba(0,0,0,0.25);opacity:0;transition:opacity 200ms cubic-bezier(0.23,1,0.32,1);pointer-events:none}
  [data-hover]:hover{transform:translateY(-2px)}
  [data-hover]:hover::before{opacity:1}
}`;
      break;
    case "underline":
      hover = `@media (hover:hover) and (pointer:fine){
[data-hover]{position:relative}
[data-hover]::after{content:"";position:absolute;left:0;right:0;bottom:-2px;height:1.5px;background:currentColor;transform-origin:right;transform:scaleX(0);transition:transform 260ms cubic-bezier(0.23,1,0.32,1)}
[data-hover]:hover::after{transform-origin:left;transform:scaleX(1)}
}`;
      break;
    case "tilt":
      hover = `@media (hover:hover) and (pointer:fine){
  [data-hover]{transition:transform 220ms cubic-bezier(0.23,1,0.32,1);will-change:transform}
  [data-hover]:hover{transform:rotate(-0.6deg) scale(1.01)}
}`;
      break;
    case "none":
      break;
  }

  const base = kf && anim ? `${kf}\n[data-anim]{${anim}}` : "";
  // Reduced motion: keep opacity/color changes for comprehension; drop movement + blur.
  const reduced = `@media (prefers-reduced-motion:reduce){
  [data-anim]{animation:anim-in 200ms ease-out both!important}
  @keyframes anim-in{from{opacity:0}to{opacity:1}}
  [data-hover]:hover{transform:none!important}
  [data-hover]::after,[data-hover]::before{transition:opacity 160ms ease-out!important}
  a:active,button:active{transform:none!important}
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