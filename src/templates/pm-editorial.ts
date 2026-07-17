import type { Template } from "./types";
import { esc, renderWithTheme, ALL_MOTION_PRESETS } from "./types";
import {
  orderedProjects, caseStudyHtml, aboutHtml, strengthsHtml, ctaRowHtml,
  skillsBlockHtml, achievementsHtml, testimonialsHtml, writingHtml,
  contactLineHtml, richSectionsCss,
} from "./rich-sections";

const template: Template = {
  meta: {
    id: "pm-editorial",
    name: "PM · Editorial",
    tagline: "Magazine-style PM portfolio with full case studies.",
    tags: ["pm", "case-study", "editorial", "magazine"],
    swatch: ["#f6f1e7", "#111", "#c8321f"],
  },
  defaults: {
    colors: { background: "#f6f1e7", surface: "#fbf7ee", text: "#111", muted: "#6b6560", border: "#d9d1bd", accent: "#c8321f", accentText: "#ffffff" },
    typography: { headingFont: "playfair-display", bodyFont: "libre-baskerville", scale: 1, headingWeight: 800, tracking: "tight", radius: 4 },
    motion: { preset: "rise", intensity: 1, hover: "underline" },
  },
  capabilities: {
    colorRoles: ["background", "surface", "text", "muted", "border", "accent", "accentText"],
    motionPresets: ALL_MOTION_PRESETS,
    supports: { scale: true, radius: true, tracking: true, weight: true, hover: true },
  },
  render(config) {
    const body = `
<article class="paper">
  <header class="mast">
    <div class="kicker">${esc(config.headline)}</div>
    <h1>${esc(config.name)}</h1>
    <p class="deck">${esc(config.bio)}</p>
    ${strengthsHtml(config)}
    ${ctaRowHtml(config)}
    ${config.workPreference ? `<p class="pref">${esc(config.workPreference)}</p>` : ""}
    <div class="rule"></div>
  </header>
  ${aboutHtml(config)}
  <section><h2>Case studies</h2>${orderedProjects(config).map((p, i) => caseStudyHtml(p, i)).join("")}</section>
  ${achievementsHtml(config)}
  <section><h2>Capabilities</h2>${skillsBlockHtml(config)}</section>
  ${testimonialsHtml(config)}
  ${writingHtml(config)}
  ${config.experience.length ? `<section><h2>Experience</h2>${config.experience.map((e) => `<div class="exp"><strong>${esc(e.role)}</strong> - ${esc(e.company)}<div class="row"><span>${esc(e.summary ?? "")}</span><span>${esc(e.period)}</span></div></div>`).join("")}</section>` : ""}
  <footer class="colophon"><h2>Colophon</h2><p>${contactLineHtml(config)}</p></footer>
</article>`;
    return renderWithTheme(config, template.defaults, () => `
html,body{margin:0;line-height:1.65}
.paper{max-width:900px;margin:0 auto;padding:72px 32px;column-gap:32px}
.mast{text-align:center;margin-bottom:48px}
.kicker{font-size:12px;letter-spacing:0.3em;text-transform:uppercase;color:var(--accent);font-weight:700}
h1{font-size:72px;line-height:1;margin:12px 0 20px;letter-spacing:-0.02em}
.deck{font-size:22px;max-width:56ch;margin:0 auto;color:var(--text)}
.mast .cta-row{justify-content:center;margin-top:20px}
.mast .strengths{justify-content:center}
.rule{height:1px;background:var(--text);opacity:0.15;margin:40px auto 0;max-width:120px}
section h2{font-size:12px;text-transform:uppercase;letter-spacing:0.3em;color:var(--accent);margin:56px 0 24px;font-weight:700;text-align:center}
.case{border-top:2px solid var(--text);padding:24px 0 12px;margin:0;background:transparent;border-radius:0}
.case h3{font-size:32px;margin:0;letter-spacing:-0.01em}
.case .lede{font-size:17px;line-height:1.6}
.case .tags em{font-style:italic;font-weight:400;color:var(--muted);background:transparent;padding:0;margin-right:8px}
.exp{padding:12px 0;border-bottom:1px solid var(--border)}
.exp .row{display:flex;justify-content:space-between;font-size:13px;color:var(--muted);margin-top:4px}
.colophon{text-align:center;margin-top:64px;padding-top:32px;border-top:1px solid var(--border)}
a{color:var(--accent)}
.skills{text-align:center}
.skills span{display:inline-block;margin:4px 8px;padding:4px 12px;border:1px solid var(--border);border-radius:0;font-size:13px}
${richSectionsCss}
`, body);
  },
};
export default template;
