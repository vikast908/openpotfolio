import type { Template } from "./types";
import { esc, fontStack, wrapDoc } from "./types";

const template: Template = {
  meta: {
    id: "studio-bento",
    name: "Studio / Bento",
    tagline: "Multidisciplinary bento grid.",
    tags: ["studio", "bento"],
    swatch: ["#fafaf7", "#111", "#22c55e"],
  },
  render(config) {
    const accent = config.theme.accent || "#22c55e";
    const font = fontStack(config.theme.font);
    const css = `
html,body{margin:0;background:#fafaf7;color:#111;font-family:${font}}
main{max-width:1200px;margin:0 auto;padding:32px}
.grid{display:grid;grid-template-columns:repeat(6,1fr);grid-auto-rows:120px;gap:14px}
@media(max-width:900px){.grid{grid-template-columns:repeat(2,1fr)}}
.b{background:#fff;border-radius:20px;padding:20px;overflow:hidden;position:relative}
.b h3{margin:0 0 4px;font-size:14px;color:#666;text-transform:uppercase;letter-spacing:0.1em}
.hero{grid-column:span 4;grid-row:span 2;background:linear-gradient(135deg,${accent},#0ea5e9);color:#fff;display:flex;flex-direction:column;justify-content:flex-end;padding:32px}
.hero h1{font-size:42px;margin:0 0 8px;line-height:1.05;letter-spacing:-0.02em}
.hero p{margin:0;opacity:0.9;max-width:400px}
.about{grid-column:span 2;grid-row:span 2;font-size:15px;line-height:1.5}
.proj{grid-column:span 2;grid-row:span 2;display:flex;flex-direction:column}
.proj .body{margin-top:auto}
.proj .title{font-size:20px;font-weight:700;margin-top:8px}
.proj em{background:${accent}22;color:${accent};font-style:normal;padding:2px 8px;border-radius:99px;font-size:11px;margin-right:4px}
.skills{grid-column:span 3;grid-row:span 1;display:flex;flex-wrap:wrap;align-items:center;gap:6px}
.skills span{background:#f0f0ea;padding:4px 10px;border-radius:99px;font-size:12px}
.contact{grid-column:span 3;background:#111;color:#fff;display:flex;align-items:center;justify-content:center;text-align:center;font-size:14px}
.contact a{color:${accent};margin:0 8px}
@media(max-width:900px){.hero,.about,.proj,.skills,.contact{grid-column:span 2}}
`;
    const body = `
<main><div class="grid">
<div class="b hero"><h1>${esc(config.name)}</h1><p>${esc(config.headline)}</p></div>
<div class="b about"><h3>About</h3><div>${esc(config.bio)}</div></div>
${config.projects
  .slice(0, 6)
  .map(
    (p) => `<div class="b proj"><h3>Project</h3><div class="body"><div>${p.tags.map((t) => `<em>${esc(t)}</em>`).join("")}</div><div class="title">${p.url ? `<a href="${esc(p.url)}" style="color:inherit">${esc(p.title)}</a>` : esc(p.title)}</div><div style="color:#666;font-size:13px;margin-top:4px">${esc(p.description)}</div></div></div>`,
  )
  .join("")}
<div class="b skills"><h3 style="margin-right:8px">Skills</h3>${config.skills.map((s) => `<span>${esc(s)}</span>`).join("")}</div>
<div class="b contact">${config.email ? `<a href="mailto:${esc(config.email)}">${esc(config.email)}</a>` : ""}${config.socials.map((s) => `<a href="${esc(s.url)}">${esc(s.label)}</a>`).join("")}</div>
</div></main>`;
    return { html: wrapDoc(config.name, css, body), css };
  },
};
export default template;