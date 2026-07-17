import type { Template } from "./types";
import { esc, renderWithTheme, ALL_MOTION_PRESETS, RICH_CONTENT, FULL_STYLE_SUPPORTS } from "./types";
import {
  orderedProjects,
  caseStudyHtml,
  aboutHtml,
  strengthsHtml,
  ctaRowHtml,
  skillsBlockHtml,
  achievementsHtml,
  testimonialsHtml,
  writingHtml,
  contactLineHtml,
  richSectionsCss,
} from "./rich-sections";

const template: Template = {
  meta: {
    id: "product-manager",
    name: "Product Manager",
    tagline: "Case-study led, outcome-first.",
    tags: ["pm", "case-study"],
    swatch: ["#f7f7f5", "#111", "#7c3aed"],
  },
  defaults: {
    colors: {
      background: "#f7f7f5",
      surface: "#ffffff",
      text: "#111",
      muted: "#555",
      border: "#e5e5e2",
      accent: "#7c3aed",
      accentText: "#ffffff",
    },
    typography: {
      headingFont: "inter",
      bodyFont: "inter",
      scale: 1,
      headingWeight: 700,
      tracking: "tight",
      radius: 12,
    },
    motion: { preset: "rise", intensity: 1, hover: "lift" },
  },
  capabilities: {
    colorRoles: ["background", "surface", "text", "muted", "border", "accent", "accentText"],
    motionPresets: ALL_MOTION_PRESETS,
    supports: FULL_STYLE_SUPPORTS,
    content: RICH_CONTENT,
  },
  render(config) {
    const featured = config.projects.filter((p) => p.featured);
    const body = `
<main>
  <header class="hero">
    <span class="tag">${esc(config.headline)}</span>
    <h1>${esc(config.name)}</h1>
    <p class="bio">${esc(config.bio)}</p>
    ${strengthsHtml(config)}
    ${ctaRowHtml(config)}
    ${config.workPreference ? `<p class="pref">${esc(config.workPreference)}</p>` : ""}
  </header>

  ${aboutHtml(config)}

  <section>
    <h2>${featured.length ? "Featured case studies" : "Selected case studies"}</h2>
    ${orderedProjects(config)
      .map((p, i) => caseStudyHtml(p, i))
      .join("")}
  </section>

  ${achievementsHtml(config)}

  <section><h2>Capabilities</h2>${skillsBlockHtml(config)}</section>

  ${testimonialsHtml(config)}

  ${writingHtml(config)}

  ${
    config.experience.length
      ? `<section><h2>Experience</h2>${config.experience
          .map(
            (e) =>
              `<div class="exp"><strong>${esc(e.role)}</strong> - ${esc(e.company)}<div class="row"><span>${esc(e.summary ?? "")}</span><span>${esc(e.period)}</span></div></div>`,
          )
          .join("")}</section>`
      : ""
  }

  <section id="contact">
    <h2>Reach out</h2>
    ${config.cta ? `<p class="prose">${esc(config.cta)}</p>` : ""}
    <p>${contactLineHtml(config)}</p>
  </section>
</main>`;
    return renderWithTheme(
      config,
      template.defaults,
      () => `
html,body{margin:0;line-height:1.6}
main{max-width:820px;margin:0 auto;padding:64px 24px}
.hero{margin-bottom:48px}
.tag{display:inline-block;font-size:12px;background:color-mix(in oklab,var(--accent) 15%,transparent);color:var(--accent);padding:4px 10px;border-radius:99px;font-weight:600}
h1{font-size:40px;margin:12px 0 8px;letter-spacing:-0.02em}
.bio{margin:16px 0 20px;color:var(--text);font-size:17px;max-width:60ch}
section h2{font-size:12px;text-transform:uppercase;letter-spacing:0.2em;color:var(--muted);margin:56px 0 20px;font-weight:700}
.case{background:var(--surface);border-radius:var(--radius);padding:28px;margin-bottom:20px;box-shadow:0 1px 2px rgba(0,0,0,0.04);border:1px solid var(--border)}
.case h3{margin:0;font-size:22px}
.case em{font-style:normal;font-size:11px;color:var(--muted);background:color-mix(in oklab,var(--text) 6%,transparent);padding:2px 8px;border-radius:4px;margin-right:4px}
a{color:var(--accent);font-weight:600}
.skills span{display:inline-block;margin:4px 8px 4px 0;padding:4px 12px;background:var(--surface);border:1px solid var(--border);border-radius:calc(var(--radius) * 0.5);font-size:13px}
.exp{padding:12px 0;border-bottom:1px solid var(--border)}
.exp:last-of-type{border-bottom:0}
.exp .row{display:flex;justify-content:space-between;gap:16px;font-size:13px;color:var(--muted);margin-top:4px}
${richSectionsCss}
`,
      body,
    );
  },
};
export default template;
