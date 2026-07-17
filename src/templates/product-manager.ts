import type { Template } from "./types";
import { esc, renderWithTheme, ALL_MOTION_PRESETS } from "./types";

const template: Template = {
  meta: { id:"product-manager", name:"Product Manager", tagline:"Case-study led, outcome-first.", tags:["pm","case-study"], swatch:["#f7f7f5","#111","#7c3aed"] },
  defaults: {
    colors: { background:"#f7f7f5", surface:"#ffffff", text:"#111", muted:"#555", border:"#e5e5e2", accent:"#7c3aed", accentText:"#ffffff" },
    typography: { headingFont:"inter", bodyFont:"inter", scale:1, headingWeight:700, tracking:"tight", radius:12 },
    motion: { preset:"rise", intensity:1, hover:"lift" },
  },
  capabilities: {
    colorRoles: ["background","surface","text","muted","border","accent","accentText"],
    motionPresets: ALL_MOTION_PRESETS,
    supports: { scale:true, radius:true, tracking:true, weight:true, hover:true },
  },
  render(config) {
    const body = `
<main>
<span class="tag">${esc(config.headline)}</span>
<h1>${esc(config.name)}</h1>
<p class="bio">${esc(config.bio)}</p>
<section><h2>Selected case studies</h2>
${config.projects.map((p,i)=>`<div class="case" data-anim data-hover style="--i:${i}"><h3>${esc(p.title)}</h3><div>${p.tags.map(t=>`<em>${esc(t)}</em>`).join("")}</div><p>${esc(p.description)}</p>${p.url?`<a href="${esc(p.url)}">Read the case study →</a>`:""}</div>`).join("")}
</section>
<section><h2>Toolkit</h2><div class="skills">${config.skills.map(s=>`<span>${esc(s)}</span>`).join("")}</div></section>
<section><h2>Reach out</h2><p>${config.email?`<a href="mailto:${esc(config.email)}">${esc(config.email)}</a> · `:""}${config.socials.map(s=>`<a href="${esc(s.url)}">${esc(s.label)}</a>`).join(" · ")}</p></section>
</main>`;
    return renderWithTheme(config, template.defaults, () => `
html,body{margin:0;line-height:1.6}
main{max-width:820px;margin:0 auto;padding:64px 24px}
.tag{display:inline-block;font-size:12px;background:color-mix(in oklab,var(--accent) 15%,transparent);color:var(--accent);padding:4px 10px;border-radius:99px;font-weight:600}
h1{font-size:40px;margin:12px 0 8px;letter-spacing:-0.02em}
.headline{color:var(--muted);font-size:18px}
.bio{margin:24px 0 48px;color:var(--text);font-size:17px}
section h2{font-size:12px;text-transform:uppercase;letter-spacing:0.2em;color:var(--muted);margin:56px 0 20px;font-weight:700}
.case{background:var(--surface);border-radius:var(--radius);padding:28px;margin-bottom:16px;box-shadow:0 1px 2px rgba(0,0,0,0.04);border:1px solid var(--border)}
.case h3{margin:0 0 4px;font-size:22px}
.case em{font-style:normal;font-size:11px;color:var(--muted);background:color-mix(in oklab,var(--text) 6%,transparent);padding:2px 8px;border-radius:4px;margin-right:4px}
a{color:var(--accent);font-weight:600}
.skills span{display:inline-block;margin:4px 8px 4px 0;padding:4px 12px;background:var(--surface);border:1px solid var(--border);border-radius:calc(var(--radius) * 0.5);font-size:13px}
`, body);
  },
};
export default template;

