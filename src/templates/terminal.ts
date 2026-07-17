import type { Template } from "./types";
import { esc, wrapDoc } from "./types";

const template: Template = {
  meta: {
    id: "terminal",
    name: "Terminal",
    tagline: "CLI-styled, prompt-first.",
    tags: ["developer", "retro"],
    swatch: ["#0d1117", "#39ff14", "#c9d1d9"],
  },
  render(config) {
    const accent = config.theme.accent || "#39ff14";
    const css = `
html,body{margin:0;background:#0d1117;color:#c9d1d9;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:14px;line-height:1.7}
main{max-width:780px;margin:0 auto;padding:40px 20px}
.p{color:${accent}}
.p::before{content:"$ ";color:#6b7280}
.c{color:#6b7280}
h1{font-size:16px;margin:0}
section{margin:28px 0;padding-left:0}
a{color:${accent}}
.tag{color:#6b7280;margin-right:8px}
.proj{margin:8px 0;padding:10px 12px;background:#161b22;border-left:2px solid ${accent}}
.proj b{color:#fff}
em{font-style:normal;color:${accent};margin-right:6px;font-size:12px}
`;
    const body = `
<main>
<div class="p">whoami</div>
<h1>${esc(config.name)}</h1>
<div>${esc(config.headline)}${config.location ? ` <span class="c">// ${esc(config.location)}</span>` : ""}</div>

<div class="p">cat about.txt</div>
<div>${esc(config.bio)}</div>

<div class="p">ls projects/</div>
${config.projects
  .map(
    (p) => `<div class="proj"><b>${esc(p.title)}</b> ${p.url ? `<a href="${esc(p.url)}">→</a>` : ""}<br><span class="c">${esc(p.description)}</span></div>`,
  )
  .join("")}

<div class="p">cat skills.json</div>
<div>[${config.skills.map((s) => `"${esc(s)}"`).join(", ")}]</div>

<div class="p">contact</div>
<div>${config.email ? `<a href="mailto:${esc(config.email)}">${esc(config.email)}</a>` : ""} ${config.socials.map((s) => `<a href="${esc(s.url)}">${esc(s.label)}</a>`).join(" · ")}</div>
</main>`;
    return { html: wrapDoc(config.name, css, body), css };
  },
};
export default template;