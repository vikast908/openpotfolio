import type { Template } from "./types";
import { esc, fontStack, wrapDoc } from "./types";

const template: Template = {
  meta: {
    id: "product-manager",
    name: "Product Manager",
    tagline: "Case-study led, outcome-first.",
    tags: ["pm", "case-study"],
    swatch: ["#f7f7f5", "#111", "#7c3aed"],
  },
  render(config) {
    const accent = config.theme.accent || "#7c3aed";
    const font = fontStack(config.theme.font);
    const css = `
html,body{margin:0;background:#f7f7f5;color:#111;font-family:${font};line-height:1.6}
main{max-width:820px;margin:0 auto;padding:64px 24px}
.tag{display:inline-block;font-size:12px;background:${accent}22;color:${accent};padding:4px 10px;border-radius:99px;font-weight:600}
h1{font-size:40px;margin:12px 0 8px;letter-spacing:-0.02em}
.headline{color:#555;font-size:18px}
.bio{margin:24px 0 48px;color:#333;font-size:17px}
section h2{font-size:12px;text-transform:uppercase;letter-spacing:0.2em;color:#888;margin:56px 0 20px;font-weight:700}
.case{background:#fff;border-radius:12px;padding:28px;margin-bottom:16px;box-shadow:0 1px 2px rgba(0,0,0,0.04)}
.case h3{margin:0 0 4px;font-size:22px}
.case .impact{display:flex;gap:20px;margin:16px 0;flex-wrap:wrap}
.case .impact div{flex:1;min-width:100px}
.case .impact b{display:block;color:${accent};font-size:22px;font-weight:800}
.case .impact span{font-size:12px;color:#666;text-transform:uppercase;letter-spacing:0.05em}
.case em{font-style:normal;font-size:11px;color:#666;background:#f1f1ef;padding:2px 8px;border-radius:4px;margin-right:4px}
a{color:${accent};font-weight:600}
.skills span{display:inline-block;margin:4px 8px 4px 0;padding:4px 12px;background:#fff;border:1px solid #e5e5e2;border-radius:6px;font-size:13px}
`;
    const body = `
<main>
<span class="tag">${esc(config.headline)}</span>
<h1>${esc(config.name)}</h1>
<p class="bio">${esc(config.bio)}</p>
<section><h2>Selected case studies</h2>
${config.projects
  .map(
    (p) => `<div class="case"><h3>${esc(p.title)}</h3><div>${p.tags.map((t) => `<em>${esc(t)}</em>`).join("")}</div><p>${esc(p.description)}</p>${p.url ? `<a href="${esc(p.url)}">Read the case study →</a>` : ""}</div>`,
  )
  .join("")}
</section>
<section><h2>Toolkit</h2><div class="skills">${config.skills.map((s) => `<span>${esc(s)}</span>`).join("")}</div></section>
<section><h2>Reach out</h2><p>${config.email ? `<a href="mailto:${esc(config.email)}">${esc(config.email)}</a> · ` : ""}${config.socials.map((s) => `<a href="${esc(s.url)}">${esc(s.label)}</a>`).join(" · ")}</p></section>
</main>`;
    return { html: wrapDoc(config.name, css, body), css };
  },
};
export default template;