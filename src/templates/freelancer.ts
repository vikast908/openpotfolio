import type { Template } from "./types";
import { esc, fontStack, wrapDoc } from "./types";

const template: Template = {
  meta: {
    id: "freelancer",
    name: "Freelancer",
    tagline: "Services + pricing, ready to hire.",
    tags: ["freelancer", "services"],
    swatch: ["#0f172a", "#facc15", "#f8fafc"],
  },
  render(config) {
    const accent = config.theme.accent || "#facc15";
    const font = fontStack(config.theme.font);
    const css = `
html,body{margin:0;background:#0f172a;color:#f8fafc;font-family:${font};line-height:1.6}
main{max-width:960px;margin:0 auto;padding:64px 24px}
.hero{display:flex;align-items:center;gap:24px;margin-bottom:48px}
.dot{width:64px;height:64px;border-radius:50%;background:${accent};color:#0f172a;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:24px}
h1{margin:0;font-size:32px}
.hero .sub{color:#94a3b8}
.pill{display:inline-block;background:${accent};color:#0f172a;padding:4px 10px;border-radius:99px;font-size:12px;font-weight:700;margin-bottom:8px}
.bio{font-size:18px;color:#cbd5e1;max-width:640px;margin-bottom:48px}
h2{font-size:22px;margin:48px 0 20px}
.svcs{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}
.svc{border:1px solid #1e293b;border-radius:12px;padding:20px;background:#111827}
.svc h3{margin:0 0 6px;color:${accent}}
.svc .price{margin-top:12px;font-size:14px;color:#94a3b8}
.svc em{background:#1e293b;color:#cbd5e1;font-style:normal;padding:2px 8px;border-radius:4px;font-size:11px;margin-right:4px}
.cta{display:inline-block;background:${accent};color:#0f172a;padding:14px 24px;border-radius:8px;font-weight:800;text-decoration:none;margin-top:24px}
a{color:${accent}}
.skills span{background:#1e293b;padding:6px 12px;border-radius:6px;margin:4px 6px 4px 0;display:inline-block;font-size:13px}
`;
    const initials = config.name.split(" ").map((n) => n[0]).slice(0, 2).join("");
    const body = `
<main>
<div class="hero"><div class="dot">${esc(initials)}</div><div><span class="pill">Available for work</span><h1>${esc(config.name)}</h1><div class="sub">${esc(config.headline)}</div></div></div>
<p class="bio">${esc(config.bio)}</p>
<h2>Services</h2>
<div class="svcs">
${config.projects
  .map(
    (p) => `<div class="svc"><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p><div>${p.tags.map((t) => `<em>${esc(t)}</em>`).join("")}</div>${p.url ? `<div class="price"><a href="${esc(p.url)}">Details →</a></div>` : ""}</div>`,
  )
  .join("")}
</div>
<h2>Stack</h2>
<div class="skills">${config.skills.map((s) => `<span>${esc(s)}</span>`).join("")}</div>
${config.email ? `<div><a class="cta" href="mailto:${esc(config.email)}">Start a project →</a></div>` : ""}
<p style="margin-top:24px;color:#94a3b8">${config.socials.map((s) => `<a href="${esc(s.url)}">${esc(s.label)}</a>`).join(" · ")}</p>
</main>`;
    return { html: wrapDoc(config.name, css, body), css };
  },
};
export default template;