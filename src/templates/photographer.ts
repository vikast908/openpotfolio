import type { Template } from "./types";
import { esc, renderWithTheme, ALL_MOTION_PRESETS } from "./types";

const template: Template = {
  meta: { id:"photographer", name:"Photographer", tagline:"Masonry gallery, quiet chrome.", tags:["photographer","gallery"], swatch:["#111","#f5f5f0","#c9a86a"] },
  defaults: {
    colors: { background:"#111", surface:"#1a1a1a", text:"#f5f5f0", muted:"#aaa", border:"#222", accent:"#c9a86a", accentText:"#111" },
    typography: { headingFont:"inter", bodyFont:"inter", scale:1, headingWeight:300, tracking:"wide", radius:0 },
    motion: { preset:"blur-in", intensity:1, hover:"none" },
  },
  capabilities: {
    colorRoles: ["background","surface","text","muted","border","accent"],
    motionPresets: ALL_MOTION_PRESETS,
    supports: { scale:true, radius:false, tracking:true, weight:true, hover:true },
  },
  render(config) {
    const ars = ["3/4","4/5","1/1","5/7","3/2"];
    const body = `
<header>
  <h1>${esc(config.name)}</h1>
  <div class="sub">${esc(config.headline)}${config.location?` - ${esc(config.location)}`:""}</div>
</header>
<div class="masonry">
${config.projects.map((p,i)=>p.imageUrl?`<div class="tile" data-anim style="--i:${i}"><img src="${esc(p.imageUrl)}" alt="${esc(p.title)}"/><div class="cap"><b>${esc(p.title)}</b> - ${esc(p.description)}</div></div>`:`<div class="tile" data-anim style="--i:${i}"><div class="ph" style="--ar:${ars[i%ars.length]}">${esc(p.title)}</div><div class="cap"><b>${esc(p.title)}</b> - ${esc(p.description)}</div></div>`).join("")}
</div>
<div class="about">${esc(config.bio)}</div>
<footer>${config.email?`<a href="mailto:${esc(config.email)}" data-hover>${esc(config.email)}</a>`:""}${config.socials.map(s=>`<a href="${esc(s.url)}" data-hover>${esc(s.label)}</a>`).join("")}</footer>`;
    return renderWithTheme(config, template.defaults, () => `
html,body{margin:0}
header{padding:48px 32px;text-align:center;border-bottom:1px solid var(--border)}
header h1{margin:0;font-weight:300;font-size:28px;letter-spacing:0.3em;text-transform:uppercase}
header .sub{color:var(--muted);margin-top:8px;letter-spacing:0.15em;text-transform:uppercase;font-size:11px}
.masonry{columns:3;column-gap:8px;padding:8px}
@media(max-width:900px){.masonry{columns:2}}
@media(max-width:520px){.masonry{columns:1}}
.tile{break-inside:avoid;margin-bottom:8px;background:var(--surface);position:relative;overflow:hidden}
.tile .ph{aspect-ratio:var(--ar,4/5);background:linear-gradient(135deg,color-mix(in oklab,var(--text) 15%,var(--surface)),var(--background));display:flex;align-items:flex-end;padding:16px;color:var(--muted)}
.tile img{width:100%;display:block}
.tile .cap{padding:12px 16px;font-size:13px;color:var(--muted)}
.tile .cap b{color:var(--text);font-weight:400}
.about{max-width:640px;margin:64px auto;padding:0 32px;text-align:center;color:var(--muted);line-height:1.8}
.about a{color:var(--accent)}
footer{padding:32px;text-align:center;color:var(--muted);font-size:12px;letter-spacing:0.2em;text-transform:uppercase}
footer a{color:var(--muted);margin:0 12px}
`, body);
  },
};
export default template;

