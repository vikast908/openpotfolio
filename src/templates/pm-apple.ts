import type { Template } from "./types";
import { esc, renderWithTheme, ALL_MOTION_PRESETS, RICH_CONTENT } from "./types";
import {
  orderedProjects, caseStudyHtml, aboutHtml, strengthsHtml, ctaRowHtml,
  skillsBlockHtml, achievementsHtml, testimonialsHtml, writingHtml,
  contactLineHtml, richSectionsCss,
} from "./rich-sections";

const template: Template = {
  meta: {
    id: "pm-apple",
    name: "PM · Apple",
    tagline: "Restrained, spacious PM portfolio in the Apple idiom.",
    tags: ["pm", "case-study", "apple", "minimal"],
    swatch: ["#0f1115", "#e7e7ea", "#5b8def"],
  },
  defaults: {
    colors: { background: "#0f1115", surface: "#171a20", text: "#e7e7ea", muted: "#8a8f98", border: "#22262e", accent: "#5b8def", accentText: "#0b0d10" },
    typography: { headingFont: "geist", bodyFont: "inter", scale: 1, headingWeight: 600, tracking: "tight", radius: 16 },
    motion: { preset: "stagger-rise", intensity: 1, hover: "lift" },
  },
  capabilities: {
    colorRoles: ["background", "surface", "text", "muted", "border", "accent", "accentText"],
    motionPresets: ALL_MOTION_PRESETS,
    supports: { scale: true, radius: true, tracking: true, weight: true, hover: true },
    content: RICH_CONTENT,
  },
  render(config) {
    const body = `
<main>
  <section class="hero" data-anim>
    <span class="eyebrow">${esc(config.headline)}</span>
    <h1>${esc(config.name)}</h1>
    <p class="lede">${esc(config.bio)}</p>
    ${strengthsHtml(config)}
    ${ctaRowHtml(config)}
    ${config.workPreference ? `<p class="pref">${esc(config.workPreference)}</p>` : ""}
  </section>
  ${aboutHtml(config)}
  <section><h2>Case studies</h2><div class="cases">${orderedProjects(config).map((p, i) => caseStudyHtml(p, i)).join("")}</div></section>
  ${achievementsHtml(config)}
  <section><h2>Capabilities</h2>${skillsBlockHtml(config)}</section>
  ${testimonialsHtml(config)}
  ${writingHtml(config)}
  ${config.experience.length ? `<section><h2>Experience</h2>${config.experience.map((e) => `<div class="exp"><strong>${esc(e.role)}</strong> - ${esc(e.company)}<div class="row"><span>${esc(e.summary ?? "")}</span><span>${esc(e.period)}</span></div></div>`).join("")}</section>` : ""}
  <section><h2>Contact</h2><p>${contactLineHtml(config)}</p></section>
</main>`;
    return renderWithTheme(config, template.defaults, () => `
html,body{margin:0;line-height:1.6}
main{max-width:1040px;margin:0 auto;padding:96px 32px 120px}
.hero{padding:32px 0 64px}
.eyebrow{font-size:13px;color:var(--accent);letter-spacing:0.02em;font-weight:600}
h1{font-size:64px;line-height:1.05;letter-spacing:-0.03em;margin:16px 0 20px;font-weight:600}
.lede{font-size:22px;max-width:60ch;color:var(--muted);margin:0 0 24px}
section h2{font-size:32px;letter-spacing:-0.02em;margin:80px 0 28px;font-weight:600}
.cases{display:grid;gap:20px}
.case{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:32px}
.case h3{font-size:26px;letter-spacing:-0.01em;margin:0}
.case .tags em{font-style:normal;font-size:11px;color:var(--muted);background:color-mix(in oklab,var(--text) 8%,transparent);padding:2px 8px;border-radius:99px;margin-right:4px}
.exp{padding:16px 0;border-bottom:1px solid var(--border)}
.exp .row{display:flex;justify-content:space-between;font-size:13px;color:var(--muted);margin-top:4px}
a{color:var(--accent);text-decoration:none}
.skills span{display:inline-block;background:var(--surface);padding:6px 14px;border-radius:99px;margin:4px 6px 4px 0;font-size:13px;border:1px solid var(--border)}
${richSectionsCss}
`, body);
  },
};
export default template;
