import type { Template } from "./types";
import { esc, renderWithTheme } from "./types";

const template: Template = {
  meta: { id:"academic", name:"Academic / Researcher", tagline:"Publications-first, sober serif.", tags:["academic","researcher"], swatch:["#ffffff","#2c2c2c","#8b0000"] },
  defaults: {
    colors: { background:"#ffffff", surface:"#ffffff", text:"#222", muted:"#666", border:"#ddd", accent:"#8b0000", accentText:"#ffffff" },
    typography: { headingFont:"iowan", bodyFont:"iowan", scale:1, headingWeight:700, tracking:"normal", radius:0 },
    motion: { preset:"fade", intensity:1, hover:"underline" },
  },
  capabilities: {
    colorRoles: ["background","text","muted","border","accent"],
    motionPresets: ["none","fade"],
    supports: { scale:true, radius:false, tracking:false, weight:true, hover:true },
  },
  render(config) {
    const body = `
<div class="wrap">
<aside>
<div class="n">${esc(config.name)}</div>
<div>${esc(config.headline)}</div>
${config.location ? `<div>${esc(config.location)}</div>` : ""}
${config.email ? `<a href="mailto:${esc(config.email)}" data-hover>${esc(config.email)}</a>` : ""}
${config.socials.map(s => `<a href="${esc(s.url)}" data-hover>${esc(s.label)}</a>`).join("")}
</aside>
<main>
<h2>Bio</h2>
<p>${esc(config.bio)}</p>
<h2>Publications & Projects</h2>
${config.projects.map((p,i)=>`<div class="pub" data-anim style="--i:${i}"><b>${p.url?`<a href="${esc(p.url)}" data-hover>${esc(p.title)}</a>`:esc(p.title)}</b> - ${esc(p.description)}<div class="meta">${p.tags.map(esc).join(", ")}</div></div>`).join("")}
${config.experience.length ? `<h2>Positions</h2>${config.experience.map(e=>`<div class="pub"><b>${esc(e.role)}</b>, ${esc(e.company)} <span class="meta">(${esc(e.period)})</span><br>${esc(e.summary ?? "")}</div>`).join("")}` : ""}
<h2>Research interests</h2>
<div class="skills">${config.skills.map(esc).join(" · ")}</div>
</main>
</div>`;
    return renderWithTheme(config, template.defaults, () => `
html,body{margin:0;line-height:1.65}
.wrap{max-width:780px;margin:0 auto;padding:48px 24px;display:grid;grid-template-columns:180px 1fr;gap:40px}
@media(max-width:640px){.wrap{grid-template-columns:1fr;gap:20px}}
aside{text-align:right;color:var(--muted);font-size:14px}
aside .n{font-size:20px;color:var(--text);font-weight:700;margin-bottom:4px}
aside a{color:var(--accent);display:block;margin-top:6px}
main h2{font-size:14px;text-transform:uppercase;letter-spacing:0.15em;color:var(--accent);margin:32px 0 12px;border-bottom:1px solid var(--border);padding-bottom:6px}
main h2:first-child{margin-top:0}
.pub{margin:12px 0;padding-left:24px;position:relative}
.pub::before{content:"§";position:absolute;left:0;top:0;color:var(--accent)}
.pub b{color:var(--text)}
.pub .meta{color:var(--muted);font-size:14px;font-style:italic}
a{color:var(--accent)}
.skills{color:var(--muted);font-size:15px}
`, body);
  },
};
export default template;
