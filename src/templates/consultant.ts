import type { Template } from "./types";
import { esc, fontStack, wrapDoc } from "./types";

const template: Template = {
  meta: {
    id: "consultant",
    name: "Consultant / Professional",
    tagline: "Clean, corporate, trustworthy.",
    tags: ["consultant", "professional"],
    swatch: ["#ffffff", "#0f172a", "#0ea5e9"],
  },
  render(config) {
    const accent = config.theme.accent || "#0ea5e9";
    const font = fontStack(config.theme.font);
    const css = `
html,body{margin:0;background:#fff;color:#0f172a;font-family:${font};line-height:1.6}
.hero{background:linear-gradient(135deg,#0f172a,#1e293b);color:#fff;padding:80px 32px}
.hero .inner{max-width:1000px;margin:0 auto}
.hero h1{font-size:44px;margin:0 0 8px;letter-spacing:-0.02em}
.hero .role{color:${accent};font-weight:600;letter-spacing:0.05em;text-transform:uppercase;font-size:13px;margin-bottom:16px}
.hero p{max-width:640px;color:#cbd5e1;font-size:18px}
.cta{display:inline-block;margin-top:24px;background:${accent};color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600}
main{max-width:1000px;margin:0 auto;padding:64px 32px}
h2{font-size:28px;margin:48px 0 24px;letter-spacing:-0.01em}
.services{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px}
.svc{padding:24px;border:1px solid #e2e8f0;border-radius:8px}
.svc b{color:${accent};font-size:12px;letter-spacing:0.1em;text-transform:uppercase}
.svc h3{margin:8px 0}
.exp{border-left:3px solid ${accent};padding:12px 20px;margin:16px 0;background:#f8fafc}
.exp .row{display:flex;justify-content:space-between;font-size:13px;color:#64748b}
a{color:${accent}}
.skills span{display:inline-block;background:#f1f5f9;padding:6px 14px;border-radius:6px;margin:4px 6px 4px 0;font-size:14px}
`;
    const body = `
<div class="hero"><div class="inner">
<div class="role">${esc(config.headline)}</div>
<h1>${esc(config.name)}</h1>
<p>${esc(config.bio)}</p>
${config.email ? `<a class="cta" href="mailto:${esc(config.email)}">Book a call →</a>` : ""}
</div></div>
<main>
<h2>Engagements</h2>
<div class="services">
${config.projects
  .map(
    (p) => `<div class="svc"><b>${esc(p.tags[0] ?? "Case")}</b><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p>${p.url ? `<a href="${esc(p.url)}">Read case study →</a>` : ""}</div>`,
  )
  .join("")}
</div>
${
  config.experience.length
    ? `<h2>Experience</h2>${config.experience
        .map(
          (e) => `<div class="exp"><strong>${esc(e.role)}</strong> — ${esc(e.company)}<div class="row"><span>${esc(e.summary ?? "")}</span><span>${esc(e.period)}</span></div></div>`,
        )
        .join("")}`
    : ""
}
<h2>Capabilities</h2>
<div class="skills">${config.skills.map((s) => `<span>${esc(s)}</span>`).join("")}</div>
<h2>Contact</h2>
<p>${config.email ? `<a href="mailto:${esc(config.email)}">${esc(config.email)}</a> · ` : ""}${config.socials.map((s) => `<a href="${esc(s.url)}">${esc(s.label)}</a>`).join(" · ")}</p>
</main>`;
    return { html: wrapDoc(config.name, css, body), css };
  },
};
export default template;