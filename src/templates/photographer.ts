import type { Template } from "./types";
import { esc, fontStack, wrapDoc } from "./types";

const template: Template = {
  meta: {
    id: "photographer",
    name: "Photographer",
    tagline: "Masonry gallery, quiet chrome.",
    tags: ["photographer", "gallery"],
    swatch: ["#111", "#f5f5f0", "#c9a86a"],
  },
  render(config) {
    const font = fontStack(config.theme.font);
    const accent = config.theme.accent || "#c9a86a";
    const css = `
html,body{margin:0;background:#111;color:#f5f5f0;font-family:${font}}
header{padding:48px 32px;text-align:center;border-bottom:1px solid #222}
header h1{margin:0;font-weight:300;font-size:28px;letter-spacing:0.3em;text-transform:uppercase}
header .sub{color:#888;margin-top:8px;letter-spacing:0.15em;text-transform:uppercase;font-size:11px}
.masonry{columns:3;column-gap:8px;padding:8px}
@media(max-width:900px){.masonry{columns:2}}
@media(max-width:520px){.masonry{columns:1}}
.tile{break-inside:avoid;margin-bottom:8px;background:#1a1a1a;position:relative;overflow:hidden}
.tile .ph{aspect-ratio:var(--ar,4/5);background:linear-gradient(135deg,#2a2a2a,#0f0f0f);display:flex;align-items:flex-end;padding:16px;color:#ddd}
.tile img{width:100%;display:block}
.tile .cap{padding:12px 16px;font-size:13px;color:#aaa}
.tile .cap b{color:#f5f5f0;font-weight:400}
.about{max-width:640px;margin:64px auto;padding:0 32px;text-align:center;color:#ccc;line-height:1.8}
.about a{color:${accent}}
footer{padding:32px;text-align:center;color:#666;font-size:12px;letter-spacing:0.2em;text-transform:uppercase}
footer a{color:#aaa;margin:0 12px}
`;
    const ars = ["3/4", "4/5", "1/1", "5/7", "3/2"];
    const body = `
<header>
  <h1>${esc(config.name)}</h1>
  <div class="sub">${esc(config.headline)}${config.location ? ` — ${esc(config.location)}` : ""}</div>
</header>
<div class="masonry">
${config.projects
  .map((p, i) =>
    p.imageUrl
      ? `<div class="tile"><img src="${esc(p.imageUrl)}" alt="${esc(p.title)}"/><div class="cap"><b>${esc(p.title)}</b> — ${esc(p.description)}</div></div>`
      : `<div class="tile"><div class="ph" style="--ar:${ars[i % ars.length]}">${esc(p.title)}</div><div class="cap"><b>${esc(p.title)}</b> — ${esc(p.description)}</div></div>`,
  )
  .join("")}
</div>
<div class="about">${esc(config.bio)}</div>
<footer>${config.email ? `<a href="mailto:${esc(config.email)}">${esc(config.email)}</a>` : ""}${config.socials.map((s) => `<a href="${esc(s.url)}">${esc(s.label)}</a>`).join("")}</footer>`;
    return { html: wrapDoc(config.name, css, body), css };
  },
};
export default template;