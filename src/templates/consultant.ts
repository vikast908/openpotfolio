import type { Template } from "./types";
import { esc, renderWithTheme, ALL_MOTION_PRESETS } from "./types";
import {
  orderedProjects, caseStudyHtml, aboutHtml, strengthsHtml, ctaRowHtml,
  skillsBlockHtml, achievementsHtml, testimonialsHtml, writingHtml,
  contactLineHtml, richSectionsCss,
} from "./rich-sections";

const template: Template = {
  meta: { id:"consultant", name:"Consultant / Professional", tagline:"Clean, corporate, trustworthy.", tags:["consultant","professional"], swatch:["#ffffff","#0f172a","#0ea5e9"] },
  defaults: {
    colors: { background:"#ffffff", surface:"#f8fafc", text:"#0f172a", muted:"#64748b", border:"#e2e8f0", accent:"#0ea5e9", accentText:"#ffffff" },
    typography: { headingFont:"inter", bodyFont:"inter", scale:1, headingWeight:700, tracking:"tight", radius:8 },
    motion: { preset:"rise", intensity:1, hover:"lift" },
  },
  capabilities: {
    colorRoles: ["background","surface","text","muted","border","accent","accentText"],
    motionPresets: ALL_MOTION_PRESETS,
    supports: { scale:true, radius:true, tracking:true, weight:true, hover:true },
  },
  render(config) {
    const body = `
<div class="hero"><div class="inner">
  <div class="role">${esc(config.headline)}</div>
  <h1>${esc(config.name)}</h1>
  <p>${esc(config.bio)}</p>
  ${strengthsHtml(config)}
  ${ctaRowHtml(config)}
  ${config.workPreference ? `<p class="pref">${esc(config.workPreference)}</p>` : ""}
</div></div>
<main>
  ${aboutHtml(config)}
  <h2>Engagements</h2>
  <div class="services">${orderedProjects(config).map((p, i) => caseStudyHtml(p, i, { className: "case svc" })).join("")}</div>
  ${achievementsHtml(config)}
  <h2>Capabilities</h2>${skillsBlockHtml(config)}
  ${testimonialsHtml(config)}
  ${writingHtml(config)}
  ${config.experience.length ? `<h2>Experience</h2>${config.experience.map((e) => `<div class="exp"><strong>${esc(e.role)}</strong> - ${esc(e.company)}<div class="row"><span>${esc(e.summary ?? "")}</span><span>${esc(e.period)}</span></div></div>`).join("")}` : ""}
  <h2>Contact</h2>
  <p>${contactLineHtml(config)}</p>
</main>`;
    return renderWithTheme(config, template.defaults, () => `
html,body{margin:0;line-height:1.6}
.hero{background:linear-gradient(135deg,var(--text),color-mix(in oklab,var(--text) 80%,var(--accent)));color:#fff;padding:80px 32px}
.hero .inner{max-width:1000px;margin:0 auto}
.hero h1{font-size:44px;margin:0 0 8px;letter-spacing:-0.02em;color:#fff}
.hero .role{color:var(--accent);font-weight:600;letter-spacing:0.05em;text-transform:uppercase;font-size:13px;margin-bottom:16px}
.hero p{max-width:640px;color:color-mix(in oklab,#fff 80%,transparent);font-size:18px}
.hero .cta{background:var(--accent);color:var(--accent-text)}
.hero .ghost{color:#fff;border-color:color-mix(in oklab,#fff 30%,transparent)}
.hero .pref{color:color-mix(in oklab,#fff 70%,transparent)}
main{max-width:1000px;margin:0 auto;padding:64px 32px}
h2{font-size:28px;margin:48px 0 24px;letter-spacing:-0.01em}
.services{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px}
.svc{padding:24px;border:1px solid var(--border);border-radius:var(--radius);background:var(--surface);margin:0}
.svc h3{margin:0;font-size:20px}
.svc .tags em{font-style:normal;font-size:11px;color:var(--muted);background:color-mix(in oklab,var(--text) 6%,transparent);padding:2px 8px;border-radius:4px;margin-right:4px}
.exp{border-left:3px solid var(--accent);padding:12px 20px;margin:16px 0;background:var(--surface)}
.exp .row{display:flex;justify-content:space-between;font-size:13px;color:var(--muted)}
a{color:var(--accent)}
.skills span{display:inline-block;background:var(--surface);padding:6px 14px;border-radius:var(--radius);margin:4px 6px 4px 0;font-size:14px;border:1px solid var(--border)}
${richSectionsCss}
`, body);
  },
};
export default template;
