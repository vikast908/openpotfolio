import type { Template } from "./types";
import { esc, fontStack, wrapDoc } from "./types";
import { socialsHtml, skillsHtml } from "./shared";

const template: Template = {
  meta: {
    id: "minimal-dev",
    name: "Minimal / Developer",
    tagline: "Mono, dark, no fuss.",
    tags: ["developer", "minimal", "dark"],
    swatch: ["#0a0a0a", "#e5e5e5", "#4f46e5"],
  },
  render(config) {
    const font = fontStack(config.theme.font === "sans" ? "mono" : config.theme.font);
    const accent = config.theme.accent;
    const css = `
*{box-sizing:border-box}
html,body{margin:0;padding:0;background:#0a0a0a;color:#e5e5e5;font-family:${font};font-size:15px;line-height:1.6}
a{color:${accent};text-decoration:none;border-bottom:1px solid transparent}
a:hover{border-color:${accent}}
main{max-width:640px;margin:0 auto;padding:80px 24px}
h1{font-size:22px;margin:0 0 4px;letter-spacing:-0.01em}
h2{font-size:14px;text-transform:uppercase;letter-spacing:0.12em;color:#777;margin:48px 0 16px;font-weight:500}
.mut{color:#777}
.row{display:flex;justify-content:space-between;gap:16px;padding:12px 0;border-top:1px solid #1a1a1a}
.row:last-child{border-bottom:1px solid #1a1a1a}
.skills span{display:inline-block;padding:2px 8px;margin:2px 4px 2px 0;border:1px solid #222;border-radius:2px;font-size:12px;color:#aaa}
.socials{margin-top:16px;font-size:13px}
.socials a{margin-right:12px;color:#aaa}
em{font-style:normal;color:${accent};margin-right:8px;font-size:12px}
`;
    const body = `
<main>
  <header>
    <h1>${esc(config.name)}</h1>
    <div class="mut">${esc(config.headline)}${config.location ? ` — ${esc(config.location)}` : ""}</div>
    <div class="socials">${socialsHtml(config)}</div>
  </header>
  <section><h2>About</h2><p>${esc(config.bio)}</p></section>
  <section><h2>Projects</h2>
    ${config.projects
      .map(
        (p) => `<div class="row"><div><strong>${esc(p.title)}</strong><br><span class="mut">${esc(p.description)}</span></div>${p.url ? `<div><a href="${esc(p.url)}">↗</a></div>` : ""}</div>`,
      )
      .join("")}
  </section>
  <section><h2>Skills</h2><div class="skills">${skillsHtml(config)}</div></section>
  ${
    config.experience.length
      ? `<section><h2>Experience</h2>${config.experience
          .map(
            (e) => `<div class="row"><div><strong>${esc(e.role)}</strong> · ${esc(e.company)}<br><span class="mut">${esc(e.summary ?? "")}</span></div><div class="mut">${esc(e.period)}</div></div>`,
          )
          .join("")}</section>`
      : ""
  }
  ${config.email ? `<section><h2>Contact</h2><a href="mailto:${esc(config.email)}">${esc(config.email)}</a></section>` : ""}
</main>`;
    return { html: wrapDoc(config.name, css, body), css };
  },
};
export default template;