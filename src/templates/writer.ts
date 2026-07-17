import type { Template } from "./types";
import { esc, renderWithTheme, ALL_MOTION_PRESETS } from "./types";

const template: Template = {
  meta: { id:"writer", name:"Writer / Journalist", tagline:"Serif, long-form, editorial.", tags:["writer","editorial"], swatch:["#faf7f2","#1a1a1a","#8b1e1e"] },
  defaults: {
    colors: { background:"#faf7f2", surface:"#faf7f2", text:"#1a1a1a", muted:"#888", border:"#ddd", accent:"#8b1e1e", accentText:"#ffffff" },
    typography: { headingFont:"instrument-serif", bodyFont:"iowan", scale:1.05, headingWeight:500, tracking:"normal", radius:0 },
    motion: { preset:"fade", intensity:1, hover:"underline" },
  },
  capabilities: {
    colorRoles: ["background","text","muted","border","accent"],
    motionPresets: ["none","fade","rise"],
    supports: { scale:true, radius:false, tracking:true, weight:true, hover:true },
  },
  render(config) {
    const body = `
<main>
<div class="name">${esc(config.name)}</div>
<h1>${esc(config.headline)}</h1>
<div class="lede">${esc(config.bio)}</div>
<h2>Recent work</h2>
${config.projects.map((p,i)=>`<article data-anim style="--i:${i}"><h3>${p.url?`<a href="${esc(p.url)}" data-hover>${esc(p.title)}</a>`:esc(p.title)}</h3><div class="meta">${p.tags.map(esc).join(" · ")}</div><p>${esc(p.description)}</p></article>`).join("")}
<h2>Beats & topics</h2>
<p>${config.skills.map(s=>`<span class="sk">${esc(s)}</span>`).join("")}</p>
<h2>Contact</h2>
<p>${config.email?`<a href="mailto:${esc(config.email)}" data-hover>${esc(config.email)}</a> · `:""}${config.socials.map(s=>`<a href="${esc(s.url)}" data-hover>${esc(s.label)}</a>`).join(" · ")}</p>
</main>`;
    return renderWithTheme(config, template.defaults, () => `
html,body{margin:0;line-height:1.7}
main{max-width:680px;margin:0 auto;padding:80px 24px}
.name{font-size:14px;text-transform:uppercase;letter-spacing:0.3em;color:var(--accent);margin-bottom:8px}
h1{font-size:44px;line-height:1.15;margin:0 0 24px;font-weight:500;letter-spacing:-0.01em}
.lede{font-size:20px;color:var(--muted);font-style:italic;border-left:3px solid var(--accent);padding-left:20px;margin:24px 0}
h2{font-size:12px;text-transform:uppercase;letter-spacing:0.25em;color:var(--muted);margin:56px 0 20px;font-weight:600;border-bottom:1px solid var(--border);padding-bottom:8px}
article{margin:24px 0;padding-bottom:24px;border-bottom:1px dotted var(--border)}
article h3{margin:0 0 6px;font-size:22px;font-weight:600}
article .meta{color:var(--muted);font-size:14px;font-style:italic}
a{color:var(--accent)}
.sk{display:inline;color:var(--muted)}
.sk::after{content:" · "}
.sk:last-child::after{content:""}
`, body);
  },
};
export default template;
// suppress unused
void ALL_MOTION_PRESETS;