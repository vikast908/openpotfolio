import type { Template } from "./types";
import { esc, renderWithTheme, ALL_MOTION_PRESETS, isKind } from "./types";

const template: Template = {
  meta: {
    id: "terminal",
    name: "Terminal",
    tagline: "CLI-styled, prompt-first.",
    tags: ["developer", "retro"],
    swatch: ["#0d1117", "#39ff14", "#c9d1d9"],
  },
  defaults: {
    colors: {
      background: "#0d1117", surface: "#161b22", text: "#c9d1d9",
      muted: "#6b7280", border: "#30363d", accent: "#39ff14", accentText: "#0d1117",
    },
    typography: { headingFont: "jetbrains-mono", bodyFont: "jetbrains-mono", scale: 1, headingWeight: 500, tracking: "normal", radius: 0 },
    motion: { preset: "fade", intensity: 1, hover: "underline" },
  },
  capabilities: {
    colorRoles: ["background","surface","text","muted","accent"],
    fontFilter: isKind("mono"),
    motionPresets: ["none","fade"],
    supports: { scale: true, radius: false, tracking: false, weight: true, hover: true },
  },
  render(config) {
    const body = `
<main>
<div class="p">whoami</div>
<h1>${esc(config.name)}</h1>
<div>${esc(config.headline)}${config.location ? ` <span class="c">// ${esc(config.location)}</span>` : ""}</div>
<section data-anim>
<div class="p">cat about.txt</div>
<div>${esc(config.bio)}</div>
</section>
<section data-anim>
<div class="p">ls projects/</div>
${config.projects
  .map(
    (p, i) => `<div class="proj" data-anim style="--i:${i}"><b>${esc(p.title)}</b> ${p.url ? `<a href="${esc(p.url)}" data-hover>→</a>` : ""}<br><span class="c">${esc(p.description)}</span></div>`,
  )
  .join("")}
</section>
<section data-anim>
<div class="p">cat skills.json</div>
<div>[${config.skills.map((s) => `"${esc(s)}"`).join(", ")}]</div>
</section>
<section data-anim>
<div class="p">contact</div>
<div>${config.email ? `<a href="mailto:${esc(config.email)}" data-hover>${esc(config.email)}</a>` : ""} ${config.socials.map((s) => `<a href="${esc(s.url)}" data-hover>${esc(s.label)}</a>`).join(" · ")}</div>
</section>
</main>`;
    return renderWithTheme(config, template.defaults, () => `
html,body{margin:0;font-size:14px;line-height:1.7}
main{max-width:780px;margin:0 auto;padding:40px 20px}
.p{color:var(--accent)}
.p::before{content:"$ ";color:var(--muted)}
.c{color:var(--muted)}
h1{font-size:16px;margin:0}
section{margin:28px 0}
a{color:var(--accent)}
.proj{margin:8px 0;padding:10px 12px;background:var(--surface);border-left:2px solid var(--accent)}
.proj b{color:var(--text)}
em{font-style:normal;color:var(--accent);margin-right:6px;font-size:12px}
`, body);
  },
};
export default template;