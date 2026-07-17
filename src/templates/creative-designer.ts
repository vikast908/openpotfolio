import type { Template } from "./types";
import { esc, fontStack, wrapDoc } from "./types";

const template: Template = {
  meta: {
    id: "creative-designer",
    name: "Creative / Designer",
    tagline: "Bold type, image-heavy.",
    tags: ["designer", "bold"],
    swatch: ["#fff5e6", "#0a0a0a", "#ff5c39"],
  },
  render(config) {
    const accent = config.theme.accent || "#ff5c39";
    const font = fontStack(config.theme.font);
    const css = `
html,body{margin:0;background:#fff5e6;color:#0a0a0a;font-family:${font};line-height:1.5}
main{max-width:1100px;margin:0 auto;padding:64px 32px}
.hero{font-size:clamp(48px,9vw,140px);font-weight:900;letter-spacing:-0.04em;line-height:0.9;margin:0 0 32px}
.hero span{color:${accent}}
.sub{font-size:20px;max-width:600px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px;margin:64px 0}
.card{background:#fff;padding:24px;border-radius:12px;box-shadow:0 2px 0 #0a0a0a}
.card h3{margin:0 0 8px;font-size:22px}
.card em{background:${accent};color:#fff;padding:2px 8px;border-radius:99px;font-size:11px;font-style:normal;margin-right:6px}
a{color:${accent};font-weight:600}
h2{font-size:36px;margin:48px 0 16px;font-weight:900;letter-spacing:-0.02em}
.tag{display:inline-block;padding:6px 12px;border:1.5px solid #0a0a0a;border-radius:99px;margin:4px 6px 4px 0;font-size:13px;font-weight:600}
`;
    const body = `
<main>
<h1 class="hero">${esc(config.name.split(" ")[0])}<br><span>${esc(config.name.split(" ").slice(1).join(" ") || "◆")}</span></h1>
<p class="sub"><strong>${esc(config.headline)}.</strong> ${esc(config.bio)}</p>
<h2>Selected work</h2>
<div class="grid">
${config.projects
  .map(
    (p) => `<div class="card"><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p><div>${p.tags.map((t) => `<em>${esc(t)}</em>`).join("")}</div>${p.url ? `<div style="margin-top:12px"><a href="${esc(p.url)}">View →</a></div>` : ""}</div>`,
  )
  .join("")}
</div>
<h2>Skills</h2>
<div>${config.skills.map((s) => `<span class="tag">${esc(s)}</span>`).join("")}</div>
<h2>Say hi</h2>
<p>${config.email ? `<a href="mailto:${esc(config.email)}">${esc(config.email)}</a> — ` : ""}${config.socials.map((s) => `<a href="${esc(s.url)}">${esc(s.label)}</a>`).join(" · ")}</p>
</main>`;
    return { html: wrapDoc(config.name, css, body), css };
  },
};
export default template;