import type { Template } from "./types";
import { esc, renderWithTheme, ALL_MOTION_PRESETS, CORE_CONTENT } from "./types";

const template: Template = {
  meta: { id:"freelancer", name:"Freelancer", tagline:"Services + pricing, ready to hire.", tags:["freelancer","services"], swatch:["#0f172a","#facc15","#f8fafc"] },
  defaults: {
    colors: { background:"#0f172a", surface:"#111827", text:"#f8fafc", muted:"#94a3b8", border:"#1e293b", accent:"#facc15", accentText:"#0f172a" },
    typography: { headingFont:"space-grotesk", bodyFont:"inter", scale:1, headingWeight:800, tracking:"tight", radius:12 },
    motion: { preset:"stagger-rise", intensity:1, hover:"lift" },
  },
  capabilities: {
    colorRoles: ["background","surface","text","muted","border","accent","accentText"],
    motionPresets: ALL_MOTION_PRESETS,
    supports: { scale:true, radius:true, tracking:true, weight:true, hover:true },
    content: CORE_CONTENT,
  },
  render(config) {
    const initials = config.name.split(" ").map(n=>n[0]).slice(0,2).join("");
    const body = `
<main>
<div class="hero"><div class="dot">${esc(initials)}</div><div><span class="pill">Available for work</span><h1>${esc(config.name)}</h1><div class="sub">${esc(config.headline)}</div></div></div>
<p class="bio">${esc(config.bio)}</p>
<h2>Services</h2>
<div class="svcs">
${config.projects.map((p,i)=>`<div class="svc" data-anim data-hover style="--i:${i}"><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p><div>${p.tags.map(t=>`<em>${esc(t)}</em>`).join("")}</div>${p.url?`<div class="price"><a href="${esc(p.url)}">Details →</a></div>`:""}</div>`).join("")}
</div>
<h2>Stack</h2>
<div class="skills">${config.skills.map(s=>`<span>${esc(s)}</span>`).join("")}</div>
${config.email?`<div><a class="cta" href="mailto:${esc(config.email)}">Start a project →</a></div>`:""}
<p style="margin-top:24px;color:var(--muted)">${config.socials.map(s=>`<a href="${esc(s.url)}">${esc(s.label)}</a>`).join(" · ")}</p>
</main>`;
    return renderWithTheme(config, template.defaults, () => `
html,body{margin:0;line-height:1.6}
main{max-width:960px;margin:0 auto;padding:64px 24px}
.hero{display:flex;align-items:center;gap:24px;margin-bottom:48px}
.dot{width:64px;height:64px;border-radius:50%;background:var(--accent);color:var(--accent-text);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:24px;font-family:var(--font-heading)}
h1{margin:0;font-size:32px}
.hero .sub{color:var(--muted)}
.pill{display:inline-block;background:var(--accent);color:var(--accent-text);padding:4px 10px;border-radius:99px;font-size:12px;font-weight:700;margin-bottom:8px}
.bio{font-size:18px;color:color-mix(in oklab,var(--text) 85%,transparent);max-width:640px;margin-bottom:48px}
h2{font-size:22px;margin:48px 0 20px}
.svcs{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}
.svc{border:1px solid var(--border);border-radius:var(--radius);padding:20px;background:var(--surface)}
.svc h3{margin:0 0 6px;color:var(--accent)}
.svc .price{margin-top:12px;font-size:14px;color:var(--muted)}
.svc em{background:var(--border);color:var(--text);font-style:normal;padding:2px 8px;border-radius:4px;font-size:11px;margin-right:4px}
.cta{display:inline-block;background:var(--accent);color:var(--accent-text);padding:14px 24px;border-radius:var(--radius);font-weight:800;text-decoration:none;margin-top:24px}
a{color:var(--accent)}
.skills span{background:var(--surface);padding:6px 12px;border-radius:calc(var(--radius) * 0.5);margin:4px 6px 4px 0;display:inline-block;font-size:13px;border:1px solid var(--border)}
`, body);
  },
};
export default template;

