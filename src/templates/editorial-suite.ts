import type { Template } from "./types";
import { esc, renderWithTheme } from "./types";
import type { PortfolioConfig } from "@/lib/portfolio/types";
import { socialsLinks, emailLinkHtml, projectTagsHtml } from "./shared";
import {
  makeSuite,
  baseDefaultsFromPalette,
  type SuitePalette,
  type LayoutSpec,
} from "./suite-factory";

/**
 * Editorial suite - magazine, brutalist, Swiss, zine, poster.
 * 5 archetypes × 8 palettes = 40 templates. All themable via CSS vars.
 */

type Palette = SuitePalette;

const PALETTES: Palette[] = [
  {
    key: "newsprint", name: "Newsprint",
    swatch: ["#f4efe4", "#111111", "#c8321f"],
    colors: { background: "#f4efe4", surface: "#fbf8ef", text: "#111111", muted: "#6b6660", border: "#d9d2bf", accent: "#c8321f", accentText: "#ffffff" },
    headingFont: "playfair-display", bodyFont: "libre-baskerville", headingWeight: 800, radius: 2,
  },
  {
    key: "zurich", name: "Zurich",
    swatch: ["#ffffff", "#0a0a0a", "#e10600"],
    colors: { background: "#ffffff", surface: "#f6f6f6", text: "#0a0a0a", muted: "#6b6b6b", border: "#e5e5e5", accent: "#e10600", accentText: "#ffffff" },
    headingFont: "archivo", bodyFont: "inter", headingWeight: 800, radius: 0,
  },
  {
    key: "xerox", name: "Xerox",
    swatch: ["#f2f2f2", "#000000", "#000000"],
    colors: { background: "#f2f2f2", surface: "#ffffff", text: "#000000", muted: "#555555", border: "#000000", accent: "#000000", accentText: "#f2f2f2" },
    headingFont: "archivo-black", bodyFont: "space-mono", headingWeight: 900, radius: 0,
  },
  {
    key: "kraft", name: "Kraft",
    swatch: ["#c9a875", "#1c2a4a", "#1c2a4a"],
    colors: { background: "#e8d3a8", surface: "#f0dfb9", text: "#1c2a4a", muted: "#5a5237", border: "#b89968", accent: "#1c2a4a", accentText: "#e8d3a8" },
    headingFont: "abril-fatface", bodyFont: "karla", headingWeight: 400, radius: 4,
  },
  {
    key: "vapor", name: "Vapor",
    swatch: ["#0d0221", "#ff71ce", "#01cdfe"],
    colors: { background: "#0d0221", surface: "#160934", text: "#f2f2ff", muted: "#a288d4", border: "#2b1259", accent: "#ff71ce", accentText: "#0d0221" },
    headingFont: "unbounded", bodyFont: "space-grotesk", headingWeight: 700, radius: 10,
  },
  {
    key: "matrix", name: "Matrix",
    swatch: ["#000000", "#00ff9c", "#00ff9c"],
    colors: { background: "#000000", surface: "#0a1a12", text: "#c8ffe4", muted: "#4a8a68", border: "#0f3324", accent: "#00ff9c", accentText: "#000000" },
    headingFont: "jetbrains-mono", bodyFont: "jetbrains-mono", headingWeight: 700, radius: 0,
  },
  {
    key: "manuscript", name: "Manuscript",
    swatch: ["#f0e6d2", "#2a1414", "#7a1f2b"],
    colors: { background: "#f0e6d2", surface: "#f8f1e0", text: "#2a1414", muted: "#7a5f4a", border: "#d9caa8", accent: "#7a1f2b", accentText: "#f0e6d2" },
    headingFont: "cormorant-garamond", bodyFont: "eb-garamond", headingWeight: 600, radius: 2,
  },
  {
    key: "concrete", name: "Concrete",
    swatch: ["#c9c9c4", "#1a1a1a", "#ff5a1f"],
    colors: { background: "#d5d3ce", surface: "#e0ded9", text: "#1a1a1a", muted: "#5a5852", border: "#a8a6a1", accent: "#ff5a1f", accentText: "#ffffff" },
    headingFont: "anton", bodyFont: "work-sans", headingWeight: 400, radius: 0,
  },
  {
    key: "risograph", name: "Risograph",
    swatch: ["#fff6d6", "#1a1440", "#ff2e6c"],
    colors: { background: "#fff6d6", surface: "#fffbe8", text: "#1a1440", muted: "#6a5a80", border: "#1a1440", accent: "#ff2e6c", accentText: "#fff6d6" },
    headingFont: "unbounded", bodyFont: "space-grotesk", headingWeight: 700, radius: 0,
  },
  {
    key: "broadsheet", name: "Broadsheet",
    swatch: ["#f7f4ec", "#0a0a0a", "#7a1c1c"],
    colors: { background: "#f7f4ec", surface: "#ffffff", text: "#0a0a0a", muted: "#5a5a5a", border: "#0a0a0a", accent: "#7a1c1c", accentText: "#f7f4ec" },
    headingFont: "playfair-display", bodyFont: "source-serif-4", headingWeight: 900, radius: 0,
  },
  {
    key: "acid", name: "Acid",
    swatch: ["#0a0a0a", "#d4ff00", "#d4ff00"],
    colors: { background: "#0a0a0a", surface: "#141414", text: "#f2f2f2", muted: "#78785a", border: "#d4ff00", accent: "#d4ff00", accentText: "#0a0a0a" },
    headingFont: "archivo-black", bodyFont: "jetbrains-mono", headingWeight: 900, radius: 0,
  },
  {
    key: "papyrus", name: "Papyrus",
    swatch: ["#e8dcc0", "#2a1a08", "#a04020"],
    colors: { background: "#e8dcc0", surface: "#f2e8cc", text: "#2a1a08", muted: "#7a6040", border: "#2a1a08", accent: "#a04020", accentText: "#e8dcc0" },
    headingFont: "abril-fatface", bodyFont: "eb-garamond", headingWeight: 400, radius: 0,
  },
  {
    key: "monaco", name: "Monaco",
    swatch: ["#f0f0f0", "#0a0a0a", "#0033a0"],
    colors: { background: "#f0f0f0", surface: "#ffffff", text: "#0a0a0a", muted: "#5a5a5a", border: "#0a0a0a", accent: "#0033a0", accentText: "#ffffff" },
    headingFont: "archivo", bodyFont: "inter", headingWeight: 800, radius: 0,
  },
  {
    key: "letterpress", name: "Letterpress",
    swatch: ["#f5efe0", "#1a1006", "#3a2a1a"],
    colors: { background: "#f5efe0", surface: "#fbf6e8", text: "#1a1006", muted: "#6a5a44", border: "#c8b890", accent: "#3a2a1a", accentText: "#f5efe0" },
    headingFont: "playfair-display", bodyFont: "libre-baskerville", headingWeight: 700, radius: 0,
  },
  {
    key: "neon-noir", name: "Neon Noir",
    swatch: ["#050510", "#f0f0ff", "#ff00aa"],
    colors: { background: "#050510", surface: "#0e0e1c", text: "#f0f0ff", muted: "#7878a0", border: "#1a1a30", accent: "#ff00aa", accentText: "#050510" },
    headingFont: "syne", bodyFont: "space-grotesk", headingWeight: 800, radius: 4,
  },
  {
    key: "gazette", name: "Gazette",
    swatch: ["#ffffff", "#1a1a1a", "#c8a028"],
    colors: { background: "#ffffff", surface: "#faf9f5", text: "#1a1a1a", muted: "#666660", border: "#1a1a1a", accent: "#c8a028", accentText: "#1a1a1a" },
    headingFont: "playfair-display", bodyFont: "lora", headingWeight: 800, radius: 0,
  },
  {
    key: "carbon-print", name: "Carbon Print",
    swatch: ["#1a1a1a", "#e0e0e0", "#e0e0e0"],
    colors: { background: "#1a1a1a", surface: "#242424", text: "#e0e0e0", muted: "#787878", border: "#e0e0e0", accent: "#e0e0e0", accentText: "#1a1a1a" },
    headingFont: "archivo-black", bodyFont: "space-mono", headingWeight: 900, radius: 0,
  },
  {
    key: "helvetica-red", name: "Helvetica Red",
    swatch: ["#ffffff", "#000000", "#ff0000"],
    colors: { background: "#ffffff", surface: "#f5f5f5", text: "#000000", muted: "#666666", border: "#000000", accent: "#ff0000", accentText: "#ffffff" },
    headingFont: "archivo", bodyFont: "archivo", headingWeight: 900, radius: 0,
  },
  {
    key: "cyan-punk", name: "Cyan Punk",
    swatch: ["#000814", "#00e5ff", "#ff006e"],
    colors: { background: "#000814", surface: "#001428", text: "#e0f7ff", muted: "#5c8caa", border: "#00e5ff", accent: "#ff006e", accentText: "#ffffff" },
    headingFont: "unbounded", bodyFont: "jetbrains-mono", headingWeight: 800, radius: 2,
  },
  {
    key: "moleskine", name: "Moleskine",
    swatch: ["#efe8d4", "#1a1408", "#8a3a20"],
    colors: { background: "#efe8d4", surface: "#f7f0dc", text: "#1a1408", muted: "#6a5c44", border: "#c8b898", accent: "#8a3a20", accentText: "#efe8d4" },
    headingFont: "cormorant-garamond", bodyFont: "spectral", headingWeight: 600, radius: 4,
  },
  {
    key: "coal", name: "Coal",
    swatch: ["#0a0a0a", "#f0f0f0", "#ff5a1f"],
    colors: { background: "#0a0a0a", surface: "#141414", text: "#f0f0f0", muted: "#787878", border: "#f0f0f0", accent: "#ff5a1f", accentText: "#0a0a0a" },
    headingFont: "anton", bodyFont: "work-sans", headingWeight: 400, radius: 0,
  },
  {
    key: "manuscript-blue", name: "Manuscript Blue",
    swatch: ["#f0e8d8", "#0a1a3a", "#0a1a3a"],
    colors: { background: "#f0e8d8", surface: "#f8f2e4", text: "#0a1a3a", muted: "#5a6a8a", border: "#0a1a3a", accent: "#0a1a3a", accentText: "#f0e8d8" },
    headingFont: "cormorant-garamond", bodyFont: "eb-garamond", headingWeight: 600, radius: 2,
  },
  {
    key: "tabloid", name: "Tabloid",
    swatch: ["#ffee00", "#000000", "#000000"],
    colors: { background: "#ffee00", surface: "#fff566", text: "#000000", muted: "#4a4400", border: "#000000", accent: "#000000", accentText: "#ffee00" },
    headingFont: "archivo-black", bodyFont: "archivo", headingWeight: 900, radius: 0,
  },
  {
    key: "wabi", name: "Wabi",
    swatch: ["#f0ece0", "#2a2620", "#8a6a48"],
    colors: { background: "#f0ece0", surface: "#f7f3e8", text: "#2a2620", muted: "#7a7060", border: "#d8d0be", accent: "#8a6a48", accentText: "#ffffff" },
    headingFont: "fraunces", bodyFont: "lora", headingWeight: 500, radius: 2,
  },
  {
    key: "moss-print", name: "Moss Print",
    swatch: ["#f4f0e2", "#1a2410", "#4a6a28"],
    colors: { background: "#f4f0e2", surface: "#faf6ea", text: "#1a2410", muted: "#5a6a4a", border: "#1a2410", accent: "#4a6a28", accentText: "#f4f0e2" },
    headingFont: "abril-fatface", bodyFont: "libre-baskerville", headingWeight: 400, radius: 0,
  },
  {
    key: "graph-paper", name: "Graph Paper",
    swatch: ["#fbfbf5", "#0a0a0a", "#2c4b8c"],
    colors: { background: "#fbfbf5", surface: "#ffffff", text: "#0a0a0a", muted: "#666666", border: "#c8d0e0", accent: "#2c4b8c", accentText: "#ffffff" },
    headingFont: "space-mono", bodyFont: "space-mono", headingWeight: 700, radius: 0,
  },
  {
    key: "rust", name: "Rust",
    swatch: ["#f4e8d8", "#2a1408", "#b04a20"],
    colors: { background: "#f4e8d8", surface: "#faf0e0", text: "#2a1408", muted: "#7a5a48", border: "#2a1408", accent: "#b04a20", accentText: "#f4e8d8" },
    headingFont: "big-shoulders", bodyFont: "work-sans", headingWeight: 800, radius: 0,
  },
];

// ─── shared fragment helpers ──────────────────────────────────────────────
const socials = (c: PortfolioConfig) => socialsLinks(c);
const emailLink = (c: PortfolioConfig) => emailLinkHtml(c);
const tags = (t: string[]) => projectTagsHtml(t);
const MOTION = { preset: "rise", intensity: 1, hover: "underline" } as const;
function baseDefaults(p: Palette) {
  return baseDefaultsFromPalette(p, MOTION);
}

// ─── LAYOUT A · Magazine ──────────────────────────────────────────────────
function renderMagazine(p: Palette): Template["render"] {
  return (config) => {
    const defaults = baseDefaults(p);
    const [first, ...rest] = config.projects;
    const body = `
<header class="mast" data-anim>
  <div class="issue">Issue №01 · ${esc(config.location ?? "")}</div>
  <div class="title">${esc(config.name)}</div>
  <div class="dek">${esc(config.headline)}</div>
</header>
<main>
  <section class="feature" data-anim>
    <div class="lead">
      <div class="kicker">Feature</div>
      <h1>${esc(config.bio)}</h1>
      <div class="byline">By ${esc(config.name)}${config.location ? ` · ${esc(config.location)}` : ""}</div>
    </div>
    ${first ? `<article class="cover" data-anim data-hover>
      <div class="tags">${tags(first.tags)}</div>
      <h2>${first.url ? `<a href="${esc(first.url)}" data-hover>${esc(first.title)}</a>` : esc(first.title)}</h2>
      <p>${esc(first.description)}</p>
    </article>` : ""}
  </section>
  <section class="rule" data-anim><span>Selected work</span></section>
  <section class="grid">
    ${rest.map((pr, i) => `<article class="story" data-anim data-hover style="--i:${i}">
      <div class="tags">${tags(pr.tags)}</div>
      <h3>${pr.url ? `<a href="${esc(pr.url)}" data-hover>${esc(pr.title)}</a>` : esc(pr.title)}</h3>
      <p>${esc(pr.description)}</p>
    </article>`).join("")}
  </section>
  ${config.experience.length ? `<section class="rule" data-anim><span>Curriculum</span></section>
  <section class="cv">${config.experience.map((e) => `<div class="cv-row"><div><b>${esc(e.role)}</b>, ${esc(e.company)}</div><div class="mut">${esc(e.period)}</div><div class="mut">${esc(e.summary ?? "")}</div></div>`).join("")}</section>` : ""}
  <footer class="foot" data-anim>
    <div>${emailLink(config)}</div>
    <div class="soc">${socials(config)}</div>
  </footer>
</main>`;
    return renderWithTheme(config, defaults, () => `
*{box-sizing:border-box}html,body{margin:0}
.mast{border-bottom:3px solid var(--text);padding:22px 32px 14px;display:grid;grid-template-columns:1fr auto 1fr;align-items:end;gap:16px;text-align:center}
.mast .issue{font-size:11px;letter-spacing:0.24em;text-transform:uppercase;color:var(--muted);text-align:left}
.mast .title{font-family:var(--font-heading);font-size:clamp(28px,5vw,44px);letter-spacing:-0.02em;font-weight:var(--heading-weight)}
.mast .dek{font-size:12px;color:var(--muted);text-align:right;font-style:italic}
main{max-width:1120px;margin:0 auto;padding:36px 32px 64px}
.feature{display:grid;grid-template-columns:1.15fr 1fr;gap:48px;padding-bottom:36px;border-bottom:1px solid var(--border)}
@media(max-width:820px){.feature{grid-template-columns:1fr}.mast{grid-template-columns:1fr;text-align:left}.mast .dek{text-align:left}}
.kicker{font-size:11px;letter-spacing:0.24em;text-transform:uppercase;color:var(--accent);margin-bottom:14px;font-weight:700}
.lead h1{font-family:var(--font-heading);font-size:clamp(30px,4.4vw,52px);line-height:1.05;letter-spacing:-0.02em;margin:0 0 18px;font-weight:var(--heading-weight)}
.byline{font-size:13px;font-style:italic;color:var(--muted)}
.cover{background:var(--surface);border:1px solid var(--border);padding:22px;border-radius:var(--radius)}
.cover h2{font-family:var(--font-heading);font-size:26px;margin:8px 0 8px;letter-spacing:-0.01em}
.cover h2 a,.story h3 a{color:inherit;text-decoration:none}
.cover p{margin:0;color:var(--muted);line-height:1.6}
.rule{margin:44px 0 20px;position:relative;text-align:center}
.rule::before,.rule::after{content:"";position:absolute;top:50%;width:calc(50% - 90px);height:1px;background:var(--border)}
.rule::before{left:0}.rule::after{right:0}
.rule span{font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:var(--muted)}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
@media(max-width:820px){.grid{grid-template-columns:1fr}}
.story{padding:18px;border:1px solid var(--border);background:var(--surface);border-radius:var(--radius)}
.story h3{font-family:var(--font-heading);font-size:19px;margin:8px 0 6px;letter-spacing:-0.01em}
.story p{margin:0;color:var(--muted);font-size:14px;line-height:1.55}
.tags em{font-style:normal;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:var(--accent);margin-right:8px;font-weight:700}
.cv{display:grid;gap:6px}
.cv-row{display:grid;grid-template-columns:1fr auto;gap:6px 20px;padding:14px 0;border-top:1px solid var(--border);font-size:14px}
.cv-row .mut{color:var(--muted);font-size:13px}
.cv-row .mut:last-child{grid-column:1 / -1}
.foot{margin-top:48px;padding-top:20px;border-top:3px double var(--text);display:flex;justify-content:space-between;gap:16px;font-size:13px;flex-wrap:wrap}
.foot a{color:var(--accent);text-decoration:none}
.foot .soc a{color:var(--muted);margin-left:12px}
`, body);
  };
}

// ─── LAYOUT B · Brutalist ─────────────────────────────────────────────────
function renderBrutalist(p: Palette): Template["render"] {
  return (config) => {
    const defaults = baseDefaults(p);
    const body = `
<div class="wrap">
  <header class="hero" data-anim>
    <div class="crumbs">/ ${esc(config.name).toUpperCase()} / PORTFOLIO / ${new Date().getFullYear()}</div>
    <h1>${esc(config.headline).toUpperCase()}</h1>
    <div class="meta"><span>${esc(config.location ?? "")}</span><span class="dot">■</span><span>${emailLink(config)}</span></div>
  </header>
  <section class="block bio" data-anim><span class="lbl">01 · About</span><p>${esc(config.bio)}</p></section>
  <section class="block" data-anim><span class="lbl">02 · Work</span>
    <ul class="work">
      ${config.projects.map((pr, i) => `<li data-anim data-hover style="--i:${i}">
        <div class="idx">${String(i+1).padStart(2,"0")}</div>
        <div class="body"><h3>${pr.url ? `<a href="${esc(pr.url)}" data-hover>${esc(pr.title).toUpperCase()}</a>` : esc(pr.title).toUpperCase()}</h3><p>${esc(pr.description)}</p><div class="t">${pr.tags.map(esc).join(" / ")}</div></div>
      </li>`).join("")}
    </ul>
  </section>
  ${config.experience.length ? `<section class="block" data-anim><span class="lbl">03 · Experience</span>
    <table class="cv"><tbody>${config.experience.map((e)=>`<tr><td>${esc(e.period)}</td><td><b>${esc(e.role)}</b></td><td>${esc(e.company)}</td><td class="mut">${esc(e.summary ?? "")}</td></tr>`).join("")}</tbody></table>
  </section>` : ""}
  <section class="block" data-anim><span class="lbl">04 · Skills</span><div class="chips">${config.skills.map(s=>`<span>${esc(s).toUpperCase()}</span>`).join("")}</div></section>
  <section class="block" data-anim><span class="lbl">05 · Contact</span><div class="soc">${socials(config)}</div></section>
</div>`;
    return renderWithTheme(config, defaults, () => `
*{box-sizing:border-box}html,body{margin:0}
.wrap{max-width:1180px;margin:0 auto;padding:24px}
.hero{border:3px solid var(--text);padding:28px;position:relative;background:var(--surface)}
.crumbs{font-family:var(--font-body);font-size:11px;letter-spacing:0.14em;color:var(--muted);margin-bottom:14px}
.hero h1{font-family:var(--font-heading);font-size:clamp(38px,7.5vw,88px);line-height:0.92;letter-spacing:-0.02em;margin:0;font-weight:var(--heading-weight)}
.hero .meta{margin-top:18px;display:flex;gap:12px;flex-wrap:wrap;font-size:13px;letter-spacing:0.08em}
.hero .meta .dot{color:var(--accent)}
.hero .meta a{color:var(--accent);text-decoration:underline}
.block{border:3px solid var(--text);border-top:none;padding:24px;position:relative;background:var(--bg)}
.block .lbl{position:absolute;top:-14px;left:20px;background:var(--accent);color:var(--accent-text);padding:3px 10px;font-size:11px;letter-spacing:0.24em;font-weight:700}
.bio p{margin:12px 0 0;font-size:17px;line-height:1.55}
.work{list-style:none;margin:8px 0 0;padding:0}
.work li{display:grid;grid-template-columns:60px 1fr;gap:16px;padding:16px 0;border-top:2px solid var(--text)}
.work li:first-child{border-top:none}
.work .idx{font-family:var(--font-heading);font-size:36px;line-height:1;color:var(--accent)}
.work h3{font-family:var(--font-heading);margin:0 0 4px;font-size:22px;letter-spacing:-0.01em}
.work h3 a{color:inherit;text-decoration:none;border-bottom:2px solid var(--text)}
.work p{margin:0 0 4px;color:var(--text)}
.work .t{font-size:11px;letter-spacing:0.14em;color:var(--muted)}
.cv{width:100%;border-collapse:collapse;margin-top:8px;font-size:13px}
.cv td{padding:10px 8px;border-top:1px solid var(--border);vertical-align:top}
.cv .mut{color:var(--muted)}
.chips{display:flex;flex-wrap:wrap;gap:0;margin-top:8px}
.chips span{border:2px solid var(--text);padding:4px 12px;font-size:11px;letter-spacing:0.14em;margin:-2px 0 0 -2px;background:var(--surface)}
.soc{margin-top:8px;display:flex;flex-wrap:wrap;gap:16px;font-size:14px}
.soc a{color:var(--accent);text-decoration:underline;text-underline-offset:4px}
`, body);
  };
}

// ─── LAYOUT C · Swiss ─────────────────────────────────────────────────────
function renderSwiss(p: Palette): Template["render"] {
  return (config) => {
    const defaults = baseDefaults(p);
    const body = `
<div class="grid">
  <div class="c-lbl" data-anim>Portfolio</div>
  <h1 class="c-name" data-anim>${esc(config.name)}</h1>
  <div class="c-head" data-anim>${esc(config.headline)}</div>
  <div class="c-bio" data-anim><p>${esc(config.bio)}</p></div>
  <div class="c-meta" data-anim>
    ${config.location ? `<div><span>Loc.</span>${esc(config.location)}</div>` : ""}
    ${config.email ? `<div><span>@</span>${emailLink(config)}</div>` : ""}
    <div><span>Web</span>${socials(config)}</div>
  </div>
  <div class="c-work">
    <div class="sec-lbl" data-anim>Work</div>
    ${config.projects.map((pr, i) => `<article data-anim data-hover style="--i:${i}">
      <div class="n">${String(i+1).padStart(2,"0")}</div>
      <h3>${pr.url ? `<a href="${esc(pr.url)}" data-hover>${esc(pr.title)}</a>` : esc(pr.title)}</h3>
      <p>${esc(pr.description)}</p>
      <div class="t">${pr.tags.map(esc).join(", ")}</div>
    </article>`).join("")}
  </div>
  ${config.experience.length ? `<div class="c-exp">
    <div class="sec-lbl" data-anim>Experience</div>
    ${config.experience.map((e)=>`<div class="row" data-anim><div class="per">${esc(e.period)}</div><div><b>${esc(e.role)}</b> - ${esc(e.company)}<br><span class="mut">${esc(e.summary ?? "")}</span></div></div>`).join("")}
  </div>` : ""}
  <div class="c-skills">
    <div class="sec-lbl" data-anim>Skills</div>
    <p data-anim>${config.skills.map(esc).join(" · ")}</p>
  </div>
</div>`;
    return renderWithTheme(config, defaults, () => `
*{box-sizing:border-box}html,body{margin:0}
.grid{max-width:1200px;margin:0 auto;padding:56px 40px;display:grid;grid-template-columns:repeat(12,1fr);gap:24px 20px}
@media(max-width:820px){.grid{grid-template-columns:repeat(4,1fr);padding:32px 20px}}
.c-lbl{grid-column:1 / span 2;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:var(--accent);padding-top:14px}
.c-name{grid-column:3 / -1;font-family:var(--font-heading);font-size:clamp(48px,8vw,112px);line-height:0.92;letter-spacing:-0.03em;margin:0;font-weight:var(--heading-weight)}
.c-head{grid-column:3 / -1;font-size:22px;color:var(--muted);letter-spacing:-0.005em}
.c-bio{grid-column:3 / span 6;font-size:17px;line-height:1.55;margin-top:20px}
@media(max-width:820px){.c-name,.c-head,.c-bio,.c-meta,.c-work,.c-exp,.c-skills{grid-column:1 / -1}}
.c-bio p{margin:0}
.c-meta{grid-column:10 / -1;font-size:13px;margin-top:24px;display:flex;flex-direction:column;gap:6px}
.c-meta span{color:var(--muted);display:inline-block;width:44px}
.c-meta a{color:var(--accent);text-decoration:none;margin-right:10px}
.c-work,.c-exp,.c-skills{grid-column:1 / -1;margin-top:56px;border-top:2px solid var(--text);padding-top:24px}
.sec-lbl{font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:var(--muted);margin-bottom:20px}
.c-work article{display:grid;grid-template-columns:60px 3fr 4fr 2fr;gap:20px;padding:18px 0;border-top:1px solid var(--border);align-items:baseline}
@media(max-width:820px){.c-work article{grid-template-columns:1fr;gap:6px}}
.c-work article:last-child{border-bottom:1px solid var(--border)}
.c-work .n{font-family:var(--font-heading);font-size:14px;color:var(--muted)}
.c-work h3{font-family:var(--font-heading);margin:0;font-size:20px;letter-spacing:-0.01em}
.c-work h3 a{color:inherit;text-decoration:none}
.c-work p{margin:0;color:var(--muted);font-size:14px;line-height:1.55}
.c-work .t{font-size:12px;color:var(--accent);letter-spacing:0.06em}
.c-exp .row{display:grid;grid-template-columns:180px 1fr;gap:20px;padding:14px 0;border-top:1px solid var(--border)}
.c-exp .row:last-child{border-bottom:1px solid var(--border)}
.c-exp .per{color:var(--muted);font-size:13px;letter-spacing:0.06em}
.c-exp .mut{color:var(--muted);font-size:13px}
.c-skills p{margin:0;color:var(--muted)}
`, body);
  };
}

// ─── LAYOUT D · Zine ──────────────────────────────────────────────────────
function renderZine(p: Palette): Template["render"] {
  return (config) => {
    const defaults = baseDefaults(p);
    const body = `
<main>
  <header class="hero" data-anim>
    <div class="tape tape-1"></div><div class="tape tape-2"></div>
    <div class="stamp">EST. ${new Date().getFullYear()}</div>
    <h1><span>${esc(config.name.split(" ")[0])}</span><span class="two">${esc(config.name.split(" ").slice(1).join(" "))}</span></h1>
    <div class="dek">${esc(config.headline)}</div>
    <div class="scribble">${esc(config.bio)}</div>
    <div class="row">${emailLink(config)} <span class="mut">·</span> ${socials(config)}</div>
  </header>
  <section class="sec" data-anim><h2><span>Work</span></h2>
    <div class="stack">
      ${config.projects.map((pr, i) => `<article data-anim data-hover style="--i:${i};--rot:${(i%2===0?-1:1)*0.6}deg">
        <div class="pin"></div>
        <div class="tags">${tags(pr.tags)}</div>
        <h3>${pr.url ? `<a href="${esc(pr.url)}" data-hover>${esc(pr.title)}</a>` : esc(pr.title)}</h3>
        <p>${esc(pr.description)}</p>
      </article>`).join("")}
    </div>
  </section>
  ${config.experience.length ? `<section class="sec" data-anim><h2><span>Where I've been</span></h2>${config.experience.map((e)=>`<div class="line"><b>${esc(e.role)}</b> at ${esc(e.company)} <span class="mut">- ${esc(e.period)}</span><div class="mut">${esc(e.summary ?? "")}</div></div>`).join("")}</section>` : ""}
  <section class="sec" data-anim><h2><span>I do</span></h2><div class="skills">${config.skills.map(s=>`<span>${esc(s)}</span>`).join("")}</div></section>
</main>`;
    return renderWithTheme(config, defaults, () => `
html,body{margin:0}
main{max-width:820px;margin:0 auto;padding:56px 28px;position:relative}
.hero{position:relative;background:var(--surface);border:1px solid var(--border);padding:48px 32px;text-align:center;transform:rotate(-0.3deg);box-shadow:6px 6px 0 var(--text)}
.tape{position:absolute;width:100px;height:22px;background:color-mix(in oklab,var(--accent) 40%,transparent);opacity:0.85}
.tape-1{top:-10px;left:20px;transform:rotate(-6deg)}
.tape-2{top:-10px;right:20px;transform:rotate(5deg)}
.stamp{display:inline-block;border:2px solid var(--accent);color:var(--accent);padding:4px 12px;font-size:11px;letter-spacing:0.24em;transform:rotate(-4deg);margin-bottom:14px;font-weight:700}
.hero h1{font-family:var(--font-heading);font-size:clamp(42px,9vw,88px);line-height:0.94;letter-spacing:-0.02em;margin:0;font-weight:var(--heading-weight)}
.hero h1 .two{display:block;color:var(--accent);font-style:italic}
.dek{font-size:16px;color:var(--muted);margin:14px 0 18px;font-style:italic}
.scribble{font-size:16px;line-height:1.6;max-width:52ch;margin:0 auto 20px}
.row{font-size:14px}
.row a{color:var(--accent);text-decoration:underline;text-underline-offset:3px}
.row .mut{color:var(--muted);margin:0 6px}
.sec{margin-top:64px}
.sec h2{font-family:var(--font-heading);margin:0 0 20px}
.sec h2 span{background:var(--accent);color:var(--accent-text);padding:4px 14px;font-size:24px;display:inline-block;transform:rotate(-1deg)}
.stack{display:flex;flex-direction:column;gap:20px}
.stack article{background:var(--surface);border:1px solid var(--border);padding:20px 22px;transform:rotate(var(--rot));box-shadow:4px 4px 0 color-mix(in oklab,var(--text) 90%,transparent);border-radius:var(--radius);position:relative}
.pin{position:absolute;top:-8px;left:50%;width:14px;height:14px;border-radius:99px;background:var(--accent);transform:translateX(-50%);box-shadow:0 2px 0 color-mix(in oklab,var(--text) 40%,transparent)}
.stack h3{font-family:var(--font-heading);margin:6px 0 6px;font-size:22px}
.stack h3 a{color:inherit;text-decoration:none;border-bottom:2px dashed var(--accent)}
.stack p{margin:0;color:var(--muted);line-height:1.55}
.tags em{font-style:italic;font-size:12px;color:var(--accent);margin-right:8px}
.line{padding:12px 0;border-top:1px dashed var(--border);font-size:15px}
.line .mut{color:var(--muted);font-size:13px}
.skills{display:flex;flex-wrap:wrap;gap:8px}
.skills span{padding:5px 12px;border:1px solid var(--text);border-radius:99px;font-size:13px;background:var(--surface);transform:rotate(calc(var(--i,0) * 0.5deg))}
@media (prefers-reduced-motion:reduce){.hero,.stack article,.skills span,.stamp{transform:none!important}}
`, body);
  };
}

// ─── LAYOUT E · Poster ────────────────────────────────────────────────────
function renderPoster(p: Palette): Template["render"] {
  return (config) => {
    const defaults = baseDefaults(p);
    const body = `
<section class="poster" data-anim>
  <div class="edge top"><span>${esc(config.location ?? "")}</span><span>${new Date().getFullYear()}</span></div>
  <div class="giant"><span class="a">${esc(config.name)}</span></div>
  <div class="edge bot"><span>${esc(config.headline)}</span><span>${emailLink(config)}</span></div>
  <div class="marquee"><span>${config.skills.concat(config.skills).map(esc).join(" ✦ ")}</span></div>
</section>
<main>
  <section data-anim class="bio"><p>${esc(config.bio)}</p></section>
  <section data-anim><h2>Work</h2>
    ${config.projects.map((pr, i)=>`<article data-anim data-hover style="--i:${i}">
      <div class="i">${String(i+1).padStart(2,"0")}</div>
      <div><h3>${pr.url?`<a href="${esc(pr.url)}" data-hover>${esc(pr.title)}</a>`:esc(pr.title)}</h3><p>${esc(pr.description)}</p><div class="t">${pr.tags.map(esc).join(" / ")}</div></div>
    </article>`).join("")}
  </section>
  ${config.experience.length?`<section data-anim><h2>Track record</h2>${config.experience.map((e)=>`<div class="ex"><div><b>${esc(e.role)}</b> · ${esc(e.company)}<br><span class="mut">${esc(e.summary ?? "")}</span></div><div class="per">${esc(e.period)}</div></div>`).join("")}</section>`:""}
  <footer data-anim><div class="soc">${socials(config)}</div></footer>
</main>`;
    return renderWithTheme(config, defaults, () => `
html,body{margin:0}
.poster{background:var(--text);color:var(--bg);padding:24px 32px 0;position:relative;overflow:hidden;min-height:80vh;display:flex;flex-direction:column}
.edge{display:flex;justify-content:space-between;font-size:12px;letter-spacing:0.22em;text-transform:uppercase;opacity:0.7}
.giant{flex:1;display:flex;align-items:center;justify-content:center;padding:20px 0}
.giant .a{font-family:var(--font-heading);font-size:clamp(80px,20vw,260px);line-height:0.82;letter-spacing:-0.05em;text-align:center;color:var(--accent);font-weight:var(--heading-weight);text-transform:uppercase}
.bot{border-top:1px solid color-mix(in oklab,var(--bg) 30%,transparent);padding-top:14px;margin-top:12px}
.bot a{color:var(--accent);text-decoration:none}
.marquee{border-top:1px solid color-mix(in oklab,var(--bg) 30%,transparent);padding:12px 0;overflow:hidden;white-space:nowrap;font-family:var(--font-heading);letter-spacing:0.1em;font-size:14px;text-transform:uppercase}
.marquee span{display:inline-block;animation:slide 40s linear infinite;color:color-mix(in oklab,var(--bg) 60%,transparent)}
@keyframes slide{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@media (prefers-reduced-motion:reduce){.marquee span{animation:none}}
main{max-width:960px;margin:0 auto;padding:56px 28px 64px}
.bio p{font-size:22px;line-height:1.45;margin:0 0 32px}
h2{font-family:var(--font-heading);font-size:12px;letter-spacing:0.28em;text-transform:uppercase;color:var(--muted);margin:48px 0 20px}
article{display:grid;grid-template-columns:60px 1fr;gap:20px;padding:20px 0;border-top:1px solid var(--border)}
article:last-child{border-bottom:1px solid var(--border)}
.i{font-family:var(--font-heading);font-size:32px;line-height:1;color:var(--accent)}
article h3{font-family:var(--font-heading);margin:0 0 6px;font-size:24px;letter-spacing:-0.01em}
article h3 a{color:inherit;text-decoration:none}
article p{margin:0 0 6px;color:var(--muted);line-height:1.55}
article .t{font-size:12px;letter-spacing:0.1em;color:var(--muted)}
.ex{display:flex;justify-content:space-between;gap:20px;padding:14px 0;border-top:1px solid var(--border)}
.ex:last-child{border-bottom:1px solid var(--border)}
.ex .mut{color:var(--muted);font-size:13px}
.ex .per{color:var(--muted);font-size:13px}
footer{margin-top:48px;padding-top:20px;border-top:1px solid var(--border)}
.soc a{color:var(--accent);text-decoration:none;margin-right:14px;font-size:14px}
`, body);
  };
}

// ─── factory ──────────────────────────────────────────────────────────────
const LAYOUTS: LayoutSpec[] = [
  { key: "magazine",  label: "Magazine",  tagline: "Editorial masthead, feature story, story grid.", tags: ["editorial","magazine","serif"], render: renderMagazine },
  { key: "brutalist", label: "Brutalist", tagline: "Heavy borders, numbered blocks, raw hierarchy.",  tags: ["brutalist","bold","raw"],       render: renderBrutalist },
  { key: "swiss",     label: "Swiss",     tagline: "12-column grid, precise labels, red accent.",     tags: ["swiss","grid","precise"],       render: renderSwiss },
  { key: "zine",      label: "Zine",      tagline: "Cut & paste, tape, pins, playful rotations.",     tags: ["zine","playful","paper"],       render: renderZine },
  { key: "poster",    label: "Poster",    tagline: "Full-bleed name-as-artwork, marquee ticker.",     tags: ["poster","display","cinematic"], render: renderPoster },
];

export const editorialTemplates: Template[] = makeSuite({
  idPrefix: "ed",
  layouts: LAYOUTS,
  palettes: PALETTES,
  motionDefaults: { preset: "rise", intensity: 1, hover: "underline" },
});
