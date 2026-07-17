import type { Template } from "./types";
import { esc, wrapDoc } from "./types";

const template: Template = {
  meta: {
    id: "writer",
    name: "Writer / Journalist",
    tagline: "Serif, long-form, editorial.",
    tags: ["writer", "editorial"],
    swatch: ["#faf7f2", "#1a1a1a", "#8b1e1e"],
  },
  render(config) {
    const accent = config.theme.accent || "#8b1e1e";
    const css = `
html,body{margin:0;background:#faf7f2;color:#1a1a1a;font-family:'Iowan Old Style','Palatino Linotype',Georgia,serif;line-height:1.7;font-size:18px}
main{max-width:680px;margin:0 auto;padding:80px 24px}
.name{font-size:14px;text-transform:uppercase;letter-spacing:0.3em;color:${accent};margin-bottom:8px}
h1{font-size:44px;line-height:1.15;margin:0 0 24px;font-weight:500;letter-spacing:-0.01em}
.lede{font-size:20px;color:#555;font-style:italic;border-left:3px solid ${accent};padding-left:20px;margin:24px 0}
h2{font-size:12px;text-transform:uppercase;letter-spacing:0.25em;color:#888;margin:56px 0 20px;font-weight:600;border-bottom:1px solid #ddd;padding-bottom:8px}
article{margin:24px 0;padding-bottom:24px;border-bottom:1px dotted #ccc}
article h3{margin:0 0 6px;font-size:22px;font-weight:600}
article .meta{color:#888;font-size:14px;font-style:italic}
a{color:${accent}}
.sk{display:inline;color:#555}
.sk::after{content:" · "}
.sk:last-child::after{content:""}
`;
    const body = `
<main>
<div class="name">${esc(config.name)}</div>
<h1>${esc(config.headline)}</h1>
<div class="lede">${esc(config.bio)}</div>

<h2>Recent work</h2>
${config.projects
  .map(
    (p) => `<article><h3>${p.url ? `<a href="${esc(p.url)}">${esc(p.title)}</a>` : esc(p.title)}</h3><div class="meta">${p.tags.map(esc).join(" · ")}</div><p>${esc(p.description)}</p></article>`,
  )
  .join("")}

<h2>Beats & topics</h2>
<p>${config.skills.map((s) => `<span class="sk">${esc(s)}</span>`).join("")}</p>

<h2>Contact</h2>
<p>${config.email ? `<a href="mailto:${esc(config.email)}">${esc(config.email)}</a> · ` : ""}${config.socials.map((s) => `<a href="${esc(s.url)}">${esc(s.label)}</a>`).join(" · ")}</p>
</main>`;
    return { html: wrapDoc(config.name, css, body), css };
  },
};
export default template;