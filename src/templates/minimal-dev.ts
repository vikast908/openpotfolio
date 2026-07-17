import type { Template } from "./types";
import { esc, renderWithTheme, ALL_MOTION_PRESETS, CORE_CONTENT } from "./types";
import { socialsHtml, skillsHtml } from "./shared";

const template: Template = {
  meta: {
    id: "minimal-dev",
    name: "Minimal / Developer",
    tagline: "Mono, dark, no fuss.",
    tags: ["developer", "minimal", "dark"],
    swatch: ["#0a0a0a", "#e5e5e5", "#4f46e5"],
  },
  defaults: {
    colors: {
      background: "#0a0a0a", surface: "#111", text: "#e5e5e5",
      muted: "#777", border: "#1a1a1a", accent: "#4f46e5", accentText: "#ffffff",
    },
    typography: {
      headingFont: "jetbrains-mono", bodyFont: "jetbrains-mono",
      scale: 1, headingWeight: 600, tracking: "normal", radius: 2,
    },
    motion: { preset: "fade", intensity: 1, hover: "none" },
  },
  capabilities: {
    colorRoles: ["background","surface","text","muted","border","accent","accentText"],
    motionPresets: ALL_MOTION_PRESETS,
    supports: { scale: true, radius: true, tracking: true, weight: true, hover: true },
    content: CORE_CONTENT,
  },
  render(config) {
    const body = `
<main>
  <header>
    <h1>${esc(config.name)}</h1>
    <div class="mut">${esc(config.headline)}${config.location ? ` - ${esc(config.location)}` : ""}</div>
    <div class="socials">${socialsHtml(config)}</div>
  </header>
  <section data-anim><h2>About</h2><p>${esc(config.bio)}</p></section>
  <section data-anim><h2>Projects</h2>
    ${config.projects
      .map(
        (p, i) => `<div class="row" data-anim style="--i:${i}"><div><strong>${esc(p.title)}</strong><br><span class="mut">${esc(p.description)}</span></div>${p.url ? `<div><a href="${esc(p.url)}" data-hover>↗</a></div>` : ""}</div>`,
      )
      .join("")}
  </section>
  <section data-anim><h2>Skills</h2><div class="skills">${skillsHtml(config)}</div></section>
  ${
    config.experience.length
      ? `<section data-anim><h2>Experience</h2>${config.experience
          .map(
            (e) => `<div class="row"><div><strong>${esc(e.role)}</strong> · ${esc(e.company)}<br><span class="mut">${esc(e.summary ?? "")}</span></div><div class="mut">${esc(e.period)}</div></div>`,
          )
          .join("")}</section>`
      : ""
  }
  ${config.email ? `<section data-anim><h2>Contact</h2><a href="mailto:${esc(config.email)}" data-hover>${esc(config.email)}</a></section>` : ""}
</main>`;
    return renderWithTheme(config, template.defaults, () => `
*{box-sizing:border-box}
html,body{margin:0;padding:0;line-height:1.6}
a{color:var(--accent);text-decoration:none;border-bottom:1px solid transparent}
a:hover{border-color:var(--accent)}
main{max-width:640px;margin:0 auto;padding:80px 24px}
h1{font-size:22px;margin:0 0 4px;letter-spacing:-0.01em}
h2{font-size:14px;text-transform:uppercase;letter-spacing:0.12em;color:var(--muted);margin:48px 0 16px;font-weight:500}
.mut{color:var(--muted)}
.row{display:flex;justify-content:space-between;gap:16px;padding:12px 0;border-top:1px solid var(--border)}
.row:last-child{border-bottom:1px solid var(--border)}
.skills span{display:inline-block;padding:2px 8px;margin:2px 4px 2px 0;border:1px solid var(--border);border-radius:calc(var(--radius) * 0.5);font-size:12px;color:var(--muted)}
.socials{margin-top:16px;font-size:13px}
.socials a{margin-right:12px;color:var(--muted)}
em{font-style:normal;color:var(--accent);margin-right:8px;font-size:12px}
`, body);
  },
};
export default template;