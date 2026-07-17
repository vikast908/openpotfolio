import type { Template } from "./types";
import { esc, renderWithTheme, ALL_MOTION_PRESETS } from "./types";
import type { PortfolioConfig } from "@/lib/portfolio/types";
import type { TemplateDefaults } from "@/lib/portfolio/theme";

/**
 * Apple-inspired template suite.
 * 5 layout archetypes × 10 palettes = 50 templates.
 *
 * Guiding principles (from Apple's Designing Fluid Interfaces + Principles of Great Design):
 *  - Restraint & clarity. One idea per section, generous whitespace, precise type.
 *  - Depth from translucent materials (backdrop-filter), not heavy borders.
 *  - Motion is fade/rise with soft cubic easing, never bouncy for chrome.
 *  - Type: tight tracking on large display, size-specific hierarchy.
 *  - Everything themable through the resolved CSS variables.
 */

type Palette = {
  key: string;
  name: string;
  swatch: [string, string, string];
  colors: TemplateDefaults["colors"];
  headingFont: string;
  bodyFont: string;
  headingWeight: 400 | 500 | 600 | 700 | 800;
  radius: number;
};

const PALETTES: Palette[] = [
  {
    key: "graphite", name: "Graphite",
    swatch: ["#0f1115", "#e7e7ea", "#5b8def"],
    colors: { background: "#0f1115", surface: "#171a20", text: "#e7e7ea", muted: "#8a8f98", border: "#22262e", accent: "#5b8def", accentText: "#0b0d10" },
    headingFont: "geist", bodyFont: "inter", headingWeight: 600, radius: 14,
  },
  {
    key: "bone", name: "Bone",
    swatch: ["#f7f4ee", "#1a1a1a", "#c67a3e"],
    colors: { background: "#f7f4ee", surface: "#ffffff", text: "#1a1a1a", muted: "#6b6660", border: "#e3ddd2", accent: "#c67a3e", accentText: "#ffffff" },
    headingFont: "instrument-serif", bodyFont: "inter", headingWeight: 500, radius: 16,
  },
  {
    key: "midnight", name: "Midnight",
    swatch: ["#0a0f1e", "#e8ecf5", "#5dd7f7"],
    colors: { background: "#0a0f1e", surface: "#131a2e", text: "#e8ecf5", muted: "#7a86a2", border: "#1e2740", accent: "#5dd7f7", accentText: "#06101f" },
    headingFont: "manrope", bodyFont: "manrope", headingWeight: 700, radius: 18,
  },
  {
    key: "arctic", name: "Arctic",
    swatch: ["#f4f8fc", "#0f2233", "#3c8dbc"],
    colors: { background: "#f4f8fc", surface: "#ffffff", text: "#0f2233", muted: "#5c7891", border: "#dce6ee", accent: "#3c8dbc", accentText: "#ffffff" },
    headingFont: "onest", bodyFont: "onest", headingWeight: 700, radius: 20,
  },
  {
    key: "dune", name: "Dune",
    swatch: ["#efe6d6", "#2b1f14", "#b04a2f"],
    colors: { background: "#efe6d6", surface: "#f7f0e1", text: "#2b1f14", muted: "#7a6a55", border: "#ddd0b8", accent: "#b04a2f", accentText: "#ffffff" },
    headingFont: "fraunces", bodyFont: "karla", headingWeight: 600, radius: 12,
  },
  {
    key: "moss", name: "Moss",
    swatch: ["#0f1a15", "#e6ede8", "#7cc39a"],
    colors: { background: "#0f1a15", surface: "#16221b", text: "#e6ede8", muted: "#8ca093", border: "#1f2e26", accent: "#7cc39a", accentText: "#0b1410" },
    headingFont: "sora", bodyFont: "sora", headingWeight: 600, radius: 16,
  },
  {
    key: "rose", name: "Rose",
    swatch: ["#faf1ee", "#2a1b1e", "#c86e77"],
    colors: { background: "#faf1ee", surface: "#ffffff", text: "#2a1b1e", muted: "#8a6a70", border: "#efdedb", accent: "#c86e77", accentText: "#ffffff" },
    headingFont: "cormorant-garamond", bodyFont: "karla", headingWeight: 500, radius: 20,
  },
  {
    key: "slate", name: "Slate",
    swatch: ["#1c1f24", "#eef1f5", "#a5f3fc"],
    colors: { background: "#1c1f24", surface: "#252932", text: "#eef1f5", muted: "#8a94a3", border: "#2e3540", accent: "#a5f3fc", accentText: "#0d1116" },
    headingFont: "space-grotesk", bodyFont: "inter", headingWeight: 700, radius: 12,
  },
  {
    key: "ink", name: "Ink",
    swatch: ["#f5f3ee", "#0d0d0d", "#0d0d0d"],
    colors: { background: "#f5f3ee", surface: "#ffffff", text: "#0d0d0d", muted: "#6b6b6b", border: "#e2ded4", accent: "#0d0d0d", accentText: "#f5f3ee" },
    headingFont: "instrument-serif", bodyFont: "instrument-serif", headingWeight: 500, radius: 0,
  },
  {
    key: "sunset", name: "Sunset",
    swatch: ["#fff2e6", "#2a1810", "#ff6b4a"],
    colors: { background: "#fff2e6", surface: "#ffffff", text: "#2a1810", muted: "#8a6a5c", border: "#f3ddc7", accent: "#ff6b4a", accentText: "#ffffff" },
    headingFont: "outfit", bodyFont: "figtree", headingWeight: 700, radius: 24,
  },
  {
    key: "obsidian", name: "Obsidian",
    swatch: ["#050507", "#f2f2f5", "#7c5cff"],
    colors: { background: "#050507", surface: "#0e0e12", text: "#f2f2f5", muted: "#7d7d8a", border: "#1b1b22", accent: "#7c5cff", accentText: "#ffffff" },
    headingFont: "geist", bodyFont: "geist", headingWeight: 700, radius: 10,
  },
  {
    key: "porcelain", name: "Porcelain",
    swatch: ["#fbfbf9", "#0f0f10", "#0f0f10"],
    colors: { background: "#fbfbf9", surface: "#ffffff", text: "#0f0f10", muted: "#6d6d70", border: "#eaeae4", accent: "#0f0f10", accentText: "#fbfbf9" },
    headingFont: "fraunces", bodyFont: "inter", headingWeight: 500, radius: 8,
  },
  {
    key: "sage", name: "Sage",
    swatch: ["#eef2ec", "#1a2320", "#4a7c59"],
    colors: { background: "#eef2ec", surface: "#ffffff", text: "#1a2320", muted: "#6a7a72", border: "#d8e0d5", accent: "#4a7c59", accentText: "#ffffff" },
    headingFont: "sora", bodyFont: "karla", headingWeight: 600, radius: 18,
  },
  {
    key: "cobalt", name: "Cobalt",
    swatch: ["#0a1530", "#eef2ff", "#4c7dff"],
    colors: { background: "#0a1530", surface: "#111f45", text: "#eef2ff", muted: "#8a99c5", border: "#1a2a5a", accent: "#4c7dff", accentText: "#ffffff" },
    headingFont: "space-grotesk", bodyFont: "inter", headingWeight: 700, radius: 12,
  },
  {
    key: "amber", name: "Amber",
    swatch: ["#fff9ec", "#2a1e08", "#d97706"],
    colors: { background: "#fff9ec", surface: "#ffffff", text: "#2a1e08", muted: "#8a7455", border: "#f0e6c9", accent: "#d97706", accentText: "#ffffff" },
    headingFont: "instrument-serif", bodyFont: "figtree", headingWeight: 500, radius: 14,
  },
  {
    key: "ivory", name: "Ivory",
    swatch: ["#fffdf7", "#1a1a1a", "#8b6f47"],
    colors: { background: "#fffdf7", surface: "#ffffff", text: "#1a1a1a", muted: "#7a7060", border: "#eee7d3", accent: "#8b6f47", accentText: "#ffffff" },
    headingFont: "cormorant-garamond", bodyFont: "lora", headingWeight: 500, radius: 6,
  },
  {
    key: "carbon", name: "Carbon",
    swatch: ["#111114", "#dcdce0", "#f5b400"],
    colors: { background: "#111114", surface: "#1a1a1f", text: "#dcdce0", muted: "#84848c", border: "#24242b", accent: "#f5b400", accentText: "#111114" },
    headingFont: "archivo", bodyFont: "inter", headingWeight: 700, radius: 8,
  },
  {
    key: "linen", name: "Linen",
    swatch: ["#f2ece0", "#241f1a", "#7a5c3e"],
    colors: { background: "#f2ece0", surface: "#faf5ea", text: "#241f1a", muted: "#7a6a56", border: "#dfd6c4", accent: "#7a5c3e", accentText: "#ffffff" },
    headingFont: "newsreader", bodyFont: "karla", headingWeight: 500, radius: 10,
  },
  {
    key: "aqua", name: "Aqua",
    swatch: ["#ecfbfa", "#053241", "#0aa5a0"],
    colors: { background: "#ecfbfa", surface: "#ffffff", text: "#053241", muted: "#527078", border: "#c8ecea", accent: "#0aa5a0", accentText: "#ffffff" },
    headingFont: "onest", bodyFont: "onest", headingWeight: 700, radius: 20,
  },
  {
    key: "plum", name: "Plum",
    swatch: ["#1a0f1c", "#f2e6f5", "#c084fc"],
    colors: { background: "#1a0f1c", surface: "#25162a", text: "#f2e6f5", muted: "#9880a0", border: "#31213a", accent: "#c084fc", accentText: "#1a0f1c" },
    headingFont: "unbounded", bodyFont: "manrope", headingWeight: 700, radius: 16,
  },
  {
    key: "clay", name: "Clay",
    swatch: ["#e8ddd0", "#2a1a10", "#a0522d"],
    colors: { background: "#e8ddd0", surface: "#f2eadd", text: "#2a1a10", muted: "#7a5c48", border: "#d0c2ac", accent: "#a0522d", accentText: "#ffffff" },
    headingFont: "fraunces", bodyFont: "karla", headingWeight: 600, radius: 12,
  },
  {
    key: "cream", name: "Cream",
    swatch: ["#fcf6e8", "#221a10", "#e07a3c"],
    colors: { background: "#fcf6e8", surface: "#ffffff", text: "#221a10", muted: "#7a6b54", border: "#eee1c4", accent: "#e07a3c", accentText: "#ffffff" },
    headingFont: "dm-serif-display", bodyFont: "figtree", headingWeight: 400, radius: 16,
  },
  {
    key: "steel", name: "Steel",
    swatch: ["#eef1f5", "#101418", "#334155"],
    colors: { background: "#eef1f5", surface: "#ffffff", text: "#101418", muted: "#5a6472", border: "#d5dbe4", accent: "#334155", accentText: "#ffffff" },
    headingFont: "hanken-grotesk", bodyFont: "hanken-grotesk", headingWeight: 700, radius: 10,
  },
  {
    key: "raven", name: "Raven",
    swatch: ["#0a0a0a", "#e6e6e6", "#e6e6e6"],
    colors: { background: "#0a0a0a", surface: "#141414", text: "#e6e6e6", muted: "#787878", border: "#1e1e1e", accent: "#e6e6e6", accentText: "#0a0a0a" },
    headingFont: "instrument-serif", bodyFont: "inter", headingWeight: 400, radius: 4,
  },
  {
    key: "peach", name: "Peach",
    swatch: ["#ffe8db", "#3a1f1a", "#e85d3c"],
    colors: { background: "#ffe8db", surface: "#fff2e8", text: "#3a1f1a", muted: "#8a6555", border: "#f5d0bc", accent: "#e85d3c", accentText: "#ffffff" },
    headingFont: "outfit", bodyFont: "figtree", headingWeight: 700, radius: 22,
  },
  {
    key: "forest", name: "Forest",
    swatch: ["#0d1a12", "#e2ede4", "#94d68a"],
    colors: { background: "#0d1a12", surface: "#152420", text: "#e2ede4", muted: "#829084", border: "#1e3028", accent: "#94d68a", accentText: "#0d1a12" },
    headingFont: "sora", bodyFont: "inter", headingWeight: 600, radius: 14,
  },
  {
    key: "denim", name: "Denim",
    swatch: ["#eaeef5", "#0f1a35", "#2c4b8c"],
    colors: { background: "#eaeef5", surface: "#ffffff", text: "#0f1a35", muted: "#5a6a8a", border: "#cfd7e6", accent: "#2c4b8c", accentText: "#ffffff" },
    headingFont: "onest", bodyFont: "onest", headingWeight: 700, radius: 12,
  },
  {
    key: "coral", name: "Coral",
    swatch: ["#fff4f0", "#2a1a1a", "#ff5a6a"],
    colors: { background: "#fff4f0", surface: "#ffffff", text: "#2a1a1a", muted: "#8a6a6a", border: "#f5dcd4", accent: "#ff5a6a", accentText: "#ffffff" },
    headingFont: "bricolage-grotesque", bodyFont: "inter", headingWeight: 700, radius: 20,
  },
  {
    key: "eclipse", name: "Eclipse",
    swatch: ["#000000", "#f0f0f0", "#ffcc00"],
    colors: { background: "#000000", surface: "#0d0d0d", text: "#f0f0f0", muted: "#787878", border: "#1a1a1a", accent: "#ffcc00", accentText: "#000000" },
    headingFont: "unbounded", bodyFont: "space-grotesk", headingWeight: 800, radius: 6,
  },
  {
    key: "mint", name: "Mint",
    swatch: ["#e8f7ee", "#0a2a1a", "#10b981"],
    colors: { background: "#e8f7ee", surface: "#ffffff", text: "#0a2a1a", muted: "#557066", border: "#c8e6d4", accent: "#10b981", accentText: "#ffffff" },
    headingFont: "manrope", bodyFont: "manrope", headingWeight: 700, radius: 18,
  },
];

// ─── shared fragment helpers ──────────────────────────────────────────────
const socials = (c: PortfolioConfig) =>
  c.socials.map((s) => `<a href="${esc(s.url)}" data-hover>${esc(s.label)}</a>`).join("");
const emailLink = (c: PortfolioConfig) =>
  c.email ? `<a href="mailto:${esc(c.email)}" data-hover>${esc(c.email)}</a>` : "";
const tags = (t: string[]) => t.map((x) => `<em>${esc(x)}</em>`).join("");

function baseDefaults(p: Palette): TemplateDefaults {
  return {
    colors: p.colors,
    typography: { headingFont: p.headingFont, bodyFont: p.bodyFont, scale: 1, headingWeight: p.headingWeight, tracking: "tight", radius: p.radius },
    motion: { preset: "stagger-rise", intensity: 1, hover: "lift" },
  };
}

// ─── LAYOUT A · Keynote ───────────────────────────────────────────────────
// Giant centered hero, translucent chrome, section bands. Feels like a keynote slide.
function renderKeynote(p: Palette): Template["render"] {
  return (config) => {
    const defaults = baseDefaults(p);
    const body = `
<nav class="chrome"><span>${esc(config.name)}</span><span class="dot">·</span><span class="mut">${esc(config.headline)}</span></nav>
<main>
  <section class="hero" data-anim>
    <div class="eyebrow">Portfolio</div>
    <h1>${esc(config.headline)}.</h1>
    <p class="lede">${esc(config.bio)}</p>
    <div class="cta">${emailLink(config)}<span class="mut">${socials(config)}</span></div>
  </section>
  <section class="band" data-anim>
    <h2>Selected work</h2>
    <div class="cards">
      ${config.projects.map((pr, i) => `<article class="card" data-anim data-hover style="--i:${i}">
        <div class="tags">${tags(pr.tags)}</div>
        <h3>${pr.url ? `<a href="${esc(pr.url)}" data-hover>${esc(pr.title)}</a>` : esc(pr.title)}</h3>
        <p>${esc(pr.description)}</p>
      </article>`).join("")}
    </div>
  </section>
  ${config.experience.length ? `<section class="band" data-anim><h2>Experience</h2><div class="exp">${config.experience.map((e) => `<div class="row"><b>${esc(e.role)}</b> <span class="mut">${esc(e.company)} · ${esc(e.period)}</span><div>${esc(e.summary ?? "")}</div></div>`).join("")}</div></section>` : ""}
  <section class="band" data-anim><h2>Skills</h2><div class="skills">${config.skills.map((s) => `<span>${esc(s)}</span>`).join("")}</div></section>
</main>`;
    return renderWithTheme(config, defaults, () => `
*{box-sizing:border-box}
html,body{margin:0}
.chrome{position:sticky;top:0;z-index:10;display:flex;gap:10px;align-items:center;padding:14px 28px;font-size:13px;background:color-mix(in oklab,var(--bg) 70%,transparent);backdrop-filter:saturate(180%) blur(20px);-webkit-backdrop-filter:saturate(180%) blur(20px);border-bottom:1px solid color-mix(in oklab,var(--border) 60%,transparent)}
.chrome .dot{color:var(--muted)}
.chrome .mut{color:var(--muted)}
main{max-width:1120px;margin:0 auto;padding:64px 28px 96px}
.hero{text-align:center;padding:64px 0 96px}
.eyebrow{font-size:12px;letter-spacing:0.24em;text-transform:uppercase;color:var(--accent);margin-bottom:20px}
.hero h1{font-size:clamp(48px,9vw,104px);line-height:0.98;letter-spacing:-0.03em;margin:0 auto;max-width:14ch}
.lede{font-size:clamp(17px,1.4vw,20px);max-width:52ch;margin:24px auto 32px;color:var(--muted);line-height:1.5}
.cta{display:flex;gap:18px;justify-content:center;flex-wrap:wrap;font-size:14px}
.cta a{color:var(--accent);text-decoration:none}
.cta .mut a{margin-left:14px;color:var(--muted)}
.band{margin-top:88px}
.band h2{font-size:13px;letter-spacing:0.22em;text-transform:uppercase;color:var(--muted);margin:0 0 24px;font-weight:600}
.cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px}
.card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:22px}
.card h3{margin:8px 0 6px;font-size:20px;letter-spacing:-0.01em}
.card p{margin:0;color:var(--muted);font-size:14px;line-height:1.55}
.card a{color:inherit;text-decoration:none}
.tags em{font-style:normal;font-size:11px;padding:3px 8px;border-radius:99px;background:color-mix(in oklab,var(--accent) 14%,transparent);color:var(--accent);margin-right:4px;letter-spacing:0.02em}
.exp .row{padding:14px 0;border-top:1px solid var(--border);font-size:15px}
.exp .row:last-child{border-bottom:1px solid var(--border)}
.exp .mut{color:var(--muted);font-size:13px;margin-left:6px}
.skills{display:flex;flex-wrap:wrap;gap:6px}
.skills span{padding:6px 12px;border-radius:99px;border:1px solid var(--border);font-size:13px;color:var(--muted)}
`, body);
  };
}

// ─── LAYOUT B · Rail ──────────────────────────────────────────────────────
// Sticky left rail (identity + nav-ish links). Right side is a long editorial column.
function renderRail(p: Palette): Template["render"] {
  return (config) => {
    const defaults = baseDefaults(p);
    const body = `
<div class="shell">
  <aside class="rail">
    <div class="ident">
      <div class="mark">${esc(config.name.split(" ").map(w=>w[0]).join("").slice(0,2))}</div>
      <div class="who"><b>${esc(config.name)}</b><br><span class="mut">${esc(config.headline)}</span></div>
    </div>
    ${config.location ? `<div class="mut small">${esc(config.location)}</div>` : ""}
    <nav class="links">${emailLink(config)}${socials(config)}</nav>
  </aside>
  <main class="col">
    <section data-anim><p class="lede">${esc(config.bio)}</p></section>
    <section data-anim>
      <h2>Work</h2>
      ${config.projects.map((pr, i) => `<article class="proj" data-anim data-hover style="--i:${i}">
        <div class="year">${esc(pr.tags[0] ?? "")}</div>
        <div><h3>${pr.url ? `<a href="${esc(pr.url)}" data-hover>${esc(pr.title)}</a>` : esc(pr.title)}</h3><p>${esc(pr.description)}</p></div>
      </article>`).join("")}
    </section>
    ${config.experience.length ? `<section data-anim><h2>Experience</h2>${config.experience.map((e) => `<div class="row"><div><b>${esc(e.role)}</b> · ${esc(e.company)}<br><span class="mut">${esc(e.summary ?? "")}</span></div><div class="mut">${esc(e.period)}</div></div>`).join("")}</section>` : ""}
    <section data-anim><h2>Skills</h2><div class="skills">${config.skills.map(s=>`<span>${esc(s)}</span>`).join("")}</div></section>
  </main>
</div>`;
    return renderWithTheme(config, defaults, () => `
*{box-sizing:border-box}
html,body{margin:0}
.shell{max-width:1120px;margin:0 auto;padding:56px 28px;display:grid;grid-template-columns:260px 1fr;gap:64px}
@media(max-width:820px){.shell{grid-template-columns:1fr;gap:32px}.rail{position:static!important}}
.rail{position:sticky;top:56px;align-self:start;font-size:14px}
.ident{display:flex;gap:12px;align-items:center;margin-bottom:20px}
.mark{width:44px;height:44px;border-radius:var(--radius);background:var(--accent);color:var(--accent-text);display:grid;place-items:center;font-weight:700;letter-spacing:-0.02em}
.who b{font-size:15px}
.who .mut{color:var(--muted);font-size:13px}
.small{font-size:13px;margin-bottom:14px}
.mut{color:var(--muted)}
.links{display:flex;flex-direction:column;gap:6px;font-size:14px}
.links a{color:var(--accent);text-decoration:none}
.col{max-width:640px}
.col h2{font-size:12px;text-transform:uppercase;letter-spacing:0.24em;color:var(--muted);margin:48px 0 20px;font-weight:600}
.lede{font-size:22px;line-height:1.4;letter-spacing:-0.01em;margin:0 0 12px}
.proj{display:grid;grid-template-columns:90px 1fr;gap:20px;padding:18px 0;border-top:1px solid var(--border)}
.proj:last-child{border-bottom:1px solid var(--border)}
.proj .year{font-size:12px;color:var(--muted);letter-spacing:0.08em;text-transform:uppercase;padding-top:6px}
.proj h3{margin:0 0 4px;font-size:19px;letter-spacing:-0.01em}
.proj h3 a{color:inherit;text-decoration:none}
.proj p{margin:0;color:var(--muted);font-size:14px;line-height:1.6}
.row{display:flex;justify-content:space-between;gap:16px;padding:14px 0;border-top:1px solid var(--border);font-size:14px}
.row:last-child{border-bottom:1px solid var(--border)}
.skills{display:flex;flex-wrap:wrap;gap:6px}
.skills span{padding:5px 11px;border-radius:99px;border:1px solid var(--border);font-size:12.5px;color:var(--muted)}
`, body);
  };
}

// ─── LAYOUT C · Mono column ───────────────────────────────────────────────
// One narrow reading column. Editorial rhythm. Content-first.
function renderMono(p: Palette): Template["render"] {
  return (config) => {
    const defaults = baseDefaults(p);
    const body = `
<main>
  <header data-anim>
    <div class="eyebrow">${esc(config.location ?? "Portfolio")}</div>
    <h1>${esc(config.name)}</h1>
    <div class="sub">${esc(config.headline)}</div>
  </header>
  <section data-anim><p class="bio">${esc(config.bio)}</p></section>
  <section data-anim>
    <h2>Work</h2>
    ${config.projects.map((pr, i) => `<article data-anim style="--i:${i}"><h3>${pr.url ? `<a href="${esc(pr.url)}" data-hover>${esc(pr.title)}</a>` : esc(pr.title)}</h3><div class="meta">${pr.tags.map(esc).join(" · ")}</div><p>${esc(pr.description)}</p></article>`).join("")}
  </section>
  ${config.experience.length ? `<section data-anim><h2>Experience</h2>${config.experience.map((e)=>`<div class="row"><b>${esc(e.role)}</b>, ${esc(e.company)} <span class="mut">- ${esc(e.period)}</span><br><span class="mut">${esc(e.summary ?? "")}</span></div>`).join("")}</section>` : ""}
  <section data-anim><h2>Skills</h2><p class="skills">${config.skills.map(esc).join(" · ")}</p></section>
  <footer data-anim>${emailLink(config)} <span class="mut">${socials(config)}</span></footer>
</main>`;
    return renderWithTheme(config, defaults, () => `
html,body{margin:0;line-height:1.65}
main{max-width:600px;margin:0 auto;padding:96px 24px 80px}
.eyebrow{font-size:12px;letter-spacing:0.28em;text-transform:uppercase;color:var(--muted);margin-bottom:14px}
h1{font-size:44px;letter-spacing:-0.02em;line-height:1.05;margin:0 0 6px}
.sub{color:var(--muted);font-size:17px;margin-bottom:16px}
.bio{font-size:19px;line-height:1.55;margin:24px 0 8px}
h2{font-size:12px;letter-spacing:0.24em;text-transform:uppercase;color:var(--muted);margin:56px 0 16px;font-weight:600;border-top:1px solid var(--border);padding-top:20px}
article{margin:20px 0}
article h3{margin:0 0 4px;font-size:20px;letter-spacing:-0.01em}
article h3 a{color:inherit;text-decoration:none}
article .meta{color:var(--muted);font-size:13px;letter-spacing:0.02em;margin-bottom:6px}
article p{margin:0;color:var(--muted);line-height:1.6}
.row{margin:12px 0;font-size:15px}
.row .mut{color:var(--muted)}
.skills{color:var(--muted)}
a{color:var(--accent);text-decoration:none}
footer{margin-top:56px;padding-top:20px;border-top:1px solid var(--border);display:flex;flex-wrap:wrap;gap:14px;font-size:14px}
footer .mut a{color:var(--muted);margin-left:10px}
`, body);
  };
}

// ─── LAYOUT D · Bento tiles ───────────────────────────────────────────────
// Rounded translucent tiles, mixed sizes. Playful but restrained.
function renderBento(p: Palette): Template["render"] {
  return (config) => {
    const defaults = baseDefaults(p);
    const body = `
<main>
  <div class="grid">
    <div class="tile hero" data-anim style="--i:0"><div class="eyebrow">Hi, I'm</div><h1>${esc(config.name)}</h1><p>${esc(config.headline)}</p></div>
    <div class="tile bio" data-anim style="--i:1"><h4>About</h4><p>${esc(config.bio)}</p></div>
    ${config.projects.slice(0,6).map((pr, i) => `<div class="tile proj" data-anim data-hover style="--i:${i+2}">
      <div class="tags">${tags(pr.tags)}</div>
      <h3>${pr.url ? `<a href="${esc(pr.url)}" data-hover>${esc(pr.title)}</a>` : esc(pr.title)}</h3>
      <p>${esc(pr.description)}</p>
    </div>`).join("")}
    <div class="tile skills" data-anim><h4>Skills</h4><div class="chips">${config.skills.map(s=>`<span>${esc(s)}</span>`).join("")}</div></div>
    <div class="tile contact" data-anim><h4>Contact</h4>${emailLink(config)}<div class="soc">${socials(config)}</div></div>
  </div>
</main>`;
    return renderWithTheme(config, defaults, () => `
html,body{margin:0}
main{max-width:1160px;margin:0 auto;padding:36px 24px}
.grid{display:grid;grid-template-columns:repeat(6,1fr);gap:14px}
@media(max-width:900px){.grid{grid-template-columns:repeat(2,1fr)}}
.tile{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:22px;position:relative}
.tile h4{margin:0 0 8px;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:var(--muted);font-weight:600}
.tile p{margin:0;color:var(--muted);line-height:1.55}
.hero{grid-column:span 4;grid-row:span 2;background:linear-gradient(135deg,var(--accent),color-mix(in oklab,var(--accent) 55%,var(--text)));color:var(--accent-text);padding:32px;display:flex;flex-direction:column;justify-content:flex-end;border:none}
.hero .eyebrow{font-size:12px;letter-spacing:0.24em;text-transform:uppercase;opacity:0.8;margin-bottom:10px}
.hero h1{margin:0 0 6px;font-size:clamp(34px,4.5vw,56px);line-height:1;letter-spacing:-0.025em;color:var(--accent-text)}
.hero p{color:color-mix(in oklab,var(--accent-text) 80%,transparent);max-width:36ch}
.bio{grid-column:span 2;grid-row:span 2;font-size:14.5px}
.proj{grid-column:span 2;display:flex;flex-direction:column;gap:8px;min-height:170px}
.proj h3{margin:auto 0 0;font-size:19px;letter-spacing:-0.01em}
.proj h3 a{color:inherit;text-decoration:none}
.proj p{font-size:13.5px}
.tags em{font-style:normal;font-size:11px;padding:3px 8px;border-radius:99px;background:color-mix(in oklab,var(--accent) 14%,transparent);color:var(--accent);margin-right:4px}
.skills{grid-column:span 3}
.chips{display:flex;flex-wrap:wrap;gap:6px}
.chips span{padding:5px 11px;border-radius:99px;border:1px solid var(--border);font-size:12.5px;color:var(--muted)}
.contact{grid-column:span 3;font-size:14px}
.contact a{color:var(--accent);text-decoration:none;display:inline-block;margin-right:12px}
.soc{margin-top:6px}
.soc a{color:var(--muted);margin-right:10px}
@media(max-width:900px){.hero,.bio,.proj,.skills,.contact{grid-column:span 2}}
`, body);
  };
}

// ─── LAYOUT E · Focus ─────────────────────────────────────────────────────
// Hero fills the viewport, tiny nav under, sparse content below. Cinematic.
function renderFocus(p: Palette): Template["render"] {
  return (config) => {
    const defaults = baseDefaults(p);
    const body = `
<section class="stage" data-anim>
  <div class="inner">
    <div class="eyebrow">${esc(config.location ?? "")}</div>
    <h1>${esc(config.name)}</h1>
    <p>${esc(config.headline)}</p>
    <div class="row">${emailLink(config)}<span class="sep">·</span>${socials(config)}</div>
  </div>
  <div class="scroll">Scroll ↓</div>
</section>
<main>
  <section data-anim><p class="lede">${esc(config.bio)}</p></section>
  <section data-anim>
    <h2>Work</h2>
    <ol class="work">
      ${config.projects.map((pr, i) => `<li data-anim data-hover style="--i:${i}"><div class="n">${String(i+1).padStart(2,"0")}</div><div><h3>${pr.url ? `<a href="${esc(pr.url)}" data-hover>${esc(pr.title)}</a>` : esc(pr.title)}</h3><p>${esc(pr.description)}</p><div class="t">${pr.tags.map(esc).join(" · ")}</div></div></li>`).join("")}
    </ol>
  </section>
  <section data-anim><h2>Skills</h2><p class="skills">${config.skills.map(esc).join(" · ")}</p></section>
</main>`;
    return renderWithTheme(config, defaults, () => `
html,body{margin:0}
.stage{min-height:88vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:64px 24px;position:relative;background:radial-gradient(1000px 500px at 50% 30%,color-mix(in oklab,var(--accent) 22%,transparent),transparent 70%)}
.inner{max-width:900px}
.eyebrow{font-size:12px;letter-spacing:0.3em;text-transform:uppercase;color:var(--muted);margin-bottom:24px}
.stage h1{font-size:clamp(56px,11vw,140px);line-height:0.95;letter-spacing:-0.035em;margin:0}
.stage p{color:var(--muted);font-size:clamp(17px,1.6vw,22px);margin:20px auto 24px;max-width:52ch}
.stage .row{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;font-size:14px}
.stage .row a{color:var(--accent);text-decoration:none;margin:0 6px}
.stage .sep{color:var(--muted)}
.scroll{position:absolute;bottom:24px;font-size:12px;letter-spacing:0.24em;text-transform:uppercase;color:var(--muted);animation:bob 2.4s ease-in-out infinite}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(4px)}}
main{max-width:720px;margin:0 auto;padding:80px 24px}
.lede{font-size:22px;line-height:1.5;margin:0}
h2{font-size:12px;letter-spacing:0.24em;text-transform:uppercase;color:var(--muted);margin:64px 0 20px;font-weight:600}
.work{list-style:none;padding:0;margin:0}
.work li{display:grid;grid-template-columns:56px 1fr;gap:16px;padding:20px 0;border-top:1px solid var(--border)}
.work li:last-child{border-bottom:1px solid var(--border)}
.work .n{color:var(--muted);font-size:13px;letter-spacing:0.08em;padding-top:6px}
.work h3{margin:0 0 4px;font-size:22px;letter-spacing:-0.01em}
.work h3 a{color:inherit;text-decoration:none}
.work p{margin:0 0 4px;color:var(--muted);line-height:1.55}
.work .t{color:var(--muted);font-size:12px;letter-spacing:0.08em}
.skills{color:var(--muted)}
@media (prefers-reduced-motion:reduce){.scroll{animation:none}}
`, body);
  };
}

// ─── factory ──────────────────────────────────────────────────────────────
type LayoutSpec = { key: string; label: string; tagline: string; tags: string[]; render: (p: Palette) => Template["render"] };

const LAYOUTS: LayoutSpec[] = [
  { key: "keynote", label: "Keynote", tagline: "Cinematic hero, translucent chrome, calm bands.", tags: ["hero","apple","clean"], render: renderKeynote },
  { key: "rail",    label: "Rail",    tagline: "Sticky identity rail, long reading column.",    tags: ["editorial","rail"],   render: renderRail },
  { key: "mono",    label: "Mono",    tagline: "One narrow column, editorial rhythm.",         tags: ["minimal","reading"], render: renderMono },
  { key: "bento",   label: "Bento",   tagline: "Rounded tiles, mixed sizes, restrained pop.",   tags: ["bento","tiles"],     render: renderBento },
  { key: "focus",   label: "Focus",   tagline: "Full-viewport hero, then sparse chapters.",     tags: ["cinematic","hero"],   render: renderFocus },
];

export const appleTemplates: Template[] = LAYOUTS.flatMap((layout) =>
  PALETTES.map<Template>((p) => ({
    meta: {
      id: `apple-${layout.key}-${p.key}`,
      name: `${layout.label} · ${p.name}`,
      tagline: layout.tagline,
      tags: [...layout.tags, p.key],
      swatch: p.swatch,
    },
    defaults: baseDefaults(p),
    capabilities: {
      colorRoles: ["background","surface","text","muted","border","accent","accentText"],
      motionPresets: ALL_MOTION_PRESETS,
      supports: { scale: true, radius: true, tracking: true, weight: true, hover: true },
    },
    render: layout.render(p),
  })),
);
