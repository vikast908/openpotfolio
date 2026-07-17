import type { Template } from "./types";
import { esc, renderWithTheme, ALL_MOTION_PRESETS, CORE_CONTENT } from "./types";

const template: Template = {
  meta: { id:"studio-bento", name:"Studio / Bento", tagline:"Multidisciplinary bento grid.", tags:["studio","bento"], swatch:["#fafaf7","#111","#22c55e"] },
  defaults: {
    colors: { background:"#fafaf7", surface:"#ffffff", text:"#111", muted:"#666", border:"#e5e5e2", accent:"#22c55e", accentText:"#ffffff" },
    typography: { headingFont:"inter", bodyFont:"inter", scale:1, headingWeight:700, tracking:"tight", radius:20 },
    motion: { preset:"stagger-rise", intensity:1, hover:"lift" },
  },
  capabilities: {
    colorRoles: ["background","surface","text","muted","border","accent","accentText"],
    motionPresets: ALL_MOTION_PRESETS,
    supports: { scale:true, radius:true, tracking:true, weight:true, hover:true },
    content: CORE_CONTENT,
  },
  render(config) {
    const body = `
<main><div class="grid">
<div class="b hero" data-anim style="--i:0"><h1>${esc(config.name)}</h1><p>${esc(config.headline)}</p></div>
<div class="b about" data-anim style="--i:1"><h3>About</h3><div>${esc(config.bio)}</div></div>
${config.projects.slice(0,6).map((p,i)=>`<div class="b proj" data-anim data-hover style="--i:${i+2}"><h3>Project</h3><div class="body"><div>${p.tags.map(t=>`<em>${esc(t)}</em>`).join("")}</div><div class="title">${p.url?`<a href="${esc(p.url)}" style="color:inherit">${esc(p.title)}</a>`:esc(p.title)}</div><div style="color:var(--muted);font-size:13px;margin-top:4px">${esc(p.description)}</div></div></div>`).join("")}
<div class="b skills" data-anim><h3 style="margin-right:8px">Skills</h3>${config.skills.map(s=>`<span>${esc(s)}</span>`).join("")}</div>
<div class="b contact" data-anim>${config.email?`<a href="mailto:${esc(config.email)}">${esc(config.email)}</a>`:""}${config.socials.map(s=>`<a href="${esc(s.url)}">${esc(s.label)}</a>`).join("")}</div>
</div></main>`;
    return renderWithTheme(config, template.defaults, () => `
html,body{margin:0}
main{max-width:1200px;margin:0 auto;padding:32px}
.grid{display:grid;grid-template-columns:repeat(6,1fr);grid-auto-rows:120px;gap:14px}
@media(max-width:900px){.grid{grid-template-columns:repeat(2,1fr)}}
.b{background:var(--surface);border-radius:var(--radius);padding:20px;overflow:hidden;position:relative;border:1px solid var(--border)}
.b h3{margin:0 0 4px;font-size:14px;color:var(--muted);text-transform:uppercase;letter-spacing:0.1em}
.hero{grid-column:span 4;grid-row:span 2;background:linear-gradient(135deg,var(--accent),color-mix(in oklab,var(--accent) 40%,var(--text)));color:var(--accent-text);display:flex;flex-direction:column;justify-content:flex-end;padding:32px;border:none}
.hero h1{font-size:42px;margin:0 0 8px;line-height:1.05;letter-spacing:-0.02em;color:var(--accent-text)}
.hero p{margin:0;opacity:0.9;max-width:400px}
.about{grid-column:span 2;grid-row:span 2;font-size:15px;line-height:1.5}
.proj{grid-column:span 2;grid-row:span 2;display:flex;flex-direction:column}
.proj .body{margin-top:auto}
.proj .title{font-size:20px;font-weight:700;margin-top:8px}
.proj em{background:color-mix(in oklab,var(--accent) 15%,transparent);color:var(--accent);font-style:normal;padding:2px 8px;border-radius:99px;font-size:11px;margin-right:4px}
.skills{grid-column:span 3;grid-row:span 1;display:flex;flex-wrap:wrap;align-items:center;gap:6px}
.skills span{background:color-mix(in oklab,var(--text) 6%,transparent);padding:4px 10px;border-radius:99px;font-size:12px}
.contact{grid-column:span 3;background:var(--text);color:var(--background);display:flex;align-items:center;justify-content:center;text-align:center;font-size:14px}
.contact a{color:var(--accent);margin:0 8px}
@media(max-width:900px){.hero,.about,.proj,.skills,.contact{grid-column:span 2}}
`, body);
  },
};
export default template;
