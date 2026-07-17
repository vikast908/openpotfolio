import type { Template } from "./types";
import { esc, renderWithTheme } from "./types";

const template: Template = {
  meta: { id:"academic", name:"Academic / Researcher", tagline:"Publications-first, sober serif.", tags:["academic","researcher"], swatch:["#ffffff","#2c2c2c","#8b0000"] },
  defaults: {
    colors: { background:"#ffffff", surface:"#ffffff", text:"#222", muted:"#666", border:"#ddd", accent:"#8b0000", accentText:"#ffffff" },
    typography: { headingFont:"iowan", bodyFont:"iowan", scale:1, headingWeight:700, tracking:"normal", radius:0 },
    motion: { preset:"fade", intensity:1, hover:"underline" },
  },
  capabilities: {
    colorRoles: ["background","text","muted","border","accent"],
    motionPresets: ["none","fade"],
    supports: { scale:true, radius:false, tracking:false, weight:true, hover:true },
  },
  render(config) {
    const body = `
<div class="wrap">
<aside>
<div class="n">${esc(config.name)}</div>
<div>${esc(config.headline)}</div>
${config.location ? `<div>${esc(config.location)}</div>` : ""}
${config.email ? `<a href="mailto:${esc(config.email)}" data-hover>${esc(config.email)}</a>` : ""}
${config.socials.map(s => `<a href="${esc(s.url)}" data-hover>${esc(s.label)}</a>`).join("")}
</aside>
<main>
<h2>Bio</h2>
<p>${esc(config.bio)}</p>
<h2>Publications & Projects</h2>
${config.projects.map((p,i)=>`<div class="pub" data-anim style="--i:${i}"><b>${p.url?`<a href="${esc(p.url)}" data-hover>${esc(p.title)}</a>`:esc(p.title)}</b> — ${esc(p.description)}<div class="meta">${p.tags.map(esc).join(", ")}</div></div>`).join("")}
${config.experience.length ? `<h2>Positions</h2>${config.experience.map(e=>`<div class="pub"><b>${esc(e.role)}</b>, ${esc(e.company)} <span class="meta">(${esc(e.period)})</span><br>${esc(e.summary ?? "")}</div>`).join("")}` : ""}
<h2>Research interests</h2>
<div class="skills">${config.skills.map(esc).join(" · ")}</div>
</main>
</div>`;
    return renderWithTheme(config, template.defaults, () => `
html,body{margin:0;line-height:1.65}
.wrap{max-width:780px;margin:0 auto;padding:48px 24px;display:grid;grid-template-columns:180px 1fr;gap:40px}
@media(max-width:640px){.wrap{grid-template-columns:1fr;gap:20px}}
aside{text-align:right;color:var(--muted);font-size:14px}
aside .n{font-size:20px;color:var(--text);font-weight:700;margin-bottom:4px}
aside a{color:var(--accent);display:block;margin-top:6px}
main h2{font-size:14px;text-transform:uppercase;letter-spacing:0.15em;color:var(--accent);margin:32px 0 12px;border-bottom:1px solid var(--border);padding-bottom:6px}
main h2:first-child{margin-top:0}
.pub{margin:12px 0;padding-left:24px;position:relative}
.pub::before{content:"§";position:absolute;left:0;top:0;color:var(--accent)}
.pub b{color:var(--text)}
.pub .meta{color:var(--muted);font-size:14px;font-style:italic}
a{color:var(--accent)}
.skills{color:var(--muted);font-size:15px}
`, body);
  },
};
export default template;

*** Add File: src/templates/consultant.ts
import type { Template } from "./types";
import { esc, renderWithTheme, ALL_MOTION_PRESETS } from "./types";

const template: Template = {
  meta: { id:"consultant", name:"Consultant / Professional", tagline:"Clean, corporate, trustworthy.", tags:["consultant","professional"], swatch:["#ffffff","#0f172a","#0ea5e9"] },
  defaults: {
    colors: { background:"#ffffff", surface:"#f8fafc", text:"#0f172a", muted:"#64748b", border:"#e2e8f0", accent:"#0ea5e9", accentText:"#ffffff" },
    typography: { headingFont:"inter", bodyFont:"inter", scale:1, headingWeight:700, tracking:"tight", radius:8 },
    motion: { preset:"rise", intensity:1, hover:"lift" },
  },
  capabilities: {
    colorRoles: ["background","surface","text","muted","border","accent","accentText"],
    motionPresets: ALL_MOTION_PRESETS,
    supports: { scale:true, radius:true, tracking:true, weight:true, hover:true },
  },
  render(config) {
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
${config.projects.map((p,i)=>`<div class="svc" data-anim data-hover style="--i:${i}"><b>${esc(p.tags[0] ?? "Case")}</b><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p>${p.url?`<a href="${esc(p.url)}">Read case study →</a>`:""}</div>`).join("")}
</div>
${config.experience.length ? `<h2>Experience</h2>${config.experience.map(e=>`<div class="exp"><strong>${esc(e.role)}</strong> — ${esc(e.company)}<div class="row"><span>${esc(e.summary ?? "")}</span><span>${esc(e.period)}</span></div></div>`).join("")}` : ""}
<h2>Capabilities</h2>
<div class="skills">${config.skills.map(s=>`<span>${esc(s)}</span>`).join("")}</div>
<h2>Contact</h2>
<p>${config.email?`<a href="mailto:${esc(config.email)}">${esc(config.email)}</a> · `:""}${config.socials.map(s=>`<a href="${esc(s.url)}">${esc(s.label)}</a>`).join(" · ")}</p>
</main>`;
    return renderWithTheme(config, template.defaults, () => `
html,body{margin:0;line-height:1.6}
.hero{background:linear-gradient(135deg,var(--text),color-mix(in oklab,var(--text) 80%,var(--accent)));color:#fff;padding:80px 32px}
.hero .inner{max-width:1000px;margin:0 auto}
.hero h1{font-size:44px;margin:0 0 8px;letter-spacing:-0.02em;color:#fff}
.hero .role{color:var(--accent);font-weight:600;letter-spacing:0.05em;text-transform:uppercase;font-size:13px;margin-bottom:16px}
.hero p{max-width:640px;color:color-mix(in oklab,#fff 80%,transparent);font-size:18px}
.cta{display:inline-block;margin-top:24px;background:var(--accent);color:var(--accent-text);padding:12px 24px;border-radius:var(--radius);text-decoration:none;font-weight:600}
main{max-width:1000px;margin:0 auto;padding:64px 32px}
h2{font-size:28px;margin:48px 0 24px;letter-spacing:-0.01em}
.services{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px}
.svc{padding:24px;border:1px solid var(--border);border-radius:var(--radius);background:var(--surface)}
.svc b{color:var(--accent);font-size:12px;letter-spacing:0.1em;text-transform:uppercase}
.svc h3{margin:8px 0}
.exp{border-left:3px solid var(--accent);padding:12px 20px;margin:16px 0;background:var(--surface)}
.exp .row{display:flex;justify-content:space-between;font-size:13px;color:var(--muted)}
a{color:var(--accent)}
.skills span{display:inline-block;background:var(--surface);padding:6px 14px;border-radius:var(--radius);margin:4px 6px 4px 0;font-size:14px;border:1px solid var(--border)}
`, body);
  },
};
export default template;

*** Add File: src/templates/product-manager.ts
import type { Template } from "./types";
import { esc, renderWithTheme, ALL_MOTION_PRESETS } from "./types";

const template: Template = {
  meta: { id:"product-manager", name:"Product Manager", tagline:"Case-study led, outcome-first.", tags:["pm","case-study"], swatch:["#f7f7f5","#111","#7c3aed"] },
  defaults: {
    colors: { background:"#f7f7f5", surface:"#ffffff", text:"#111", muted:"#555", border:"#e5e5e2", accent:"#7c3aed", accentText:"#ffffff" },
    typography: { headingFont:"inter", bodyFont:"inter", scale:1, headingWeight:700, tracking:"tight", radius:12 },
    motion: { preset:"rise", intensity:1, hover:"lift" },
  },
  capabilities: {
    colorRoles: ["background","surface","text","muted","border","accent","accentText"],
    motionPresets: ALL_MOTION_PRESETS,
    supports: { scale:true, radius:true, tracking:true, weight:true, hover:true },
  },
  render(config) {
    const body = `
<main>
<span class="tag">${esc(config.headline)}</span>
<h1>${esc(config.name)}</h1>
<p class="bio">${esc(config.bio)}</p>
<section><h2>Selected case studies</h2>
${config.projects.map((p,i)=>`<div class="case" data-anim data-hover style="--i:${i}"><h3>${esc(p.title)}</h3><div>${p.tags.map(t=>`<em>${esc(t)}</em>`).join("")}</div><p>${esc(p.description)}</p>${p.url?`<a href="${esc(p.url)}">Read the case study →</a>`:""}</div>`).join("")}
</section>
<section><h2>Toolkit</h2><div class="skills">${config.skills.map(s=>`<span>${esc(s)}</span>`).join("")}</div></section>
<section><h2>Reach out</h2><p>${config.email?`<a href="mailto:${esc(config.email)}">${esc(config.email)}</a> · `:""}${config.socials.map(s=>`<a href="${esc(s.url)}">${esc(s.label)}</a>`).join(" · ")}</p></section>
</main>`;
    return renderWithTheme(config, template.defaults, () => `
html,body{margin:0;line-height:1.6}
main{max-width:820px;margin:0 auto;padding:64px 24px}
.tag{display:inline-block;font-size:12px;background:color-mix(in oklab,var(--accent) 15%,transparent);color:var(--accent);padding:4px 10px;border-radius:99px;font-weight:600}
h1{font-size:40px;margin:12px 0 8px;letter-spacing:-0.02em}
.headline{color:var(--muted);font-size:18px}
.bio{margin:24px 0 48px;color:var(--text);font-size:17px}
section h2{font-size:12px;text-transform:uppercase;letter-spacing:0.2em;color:var(--muted);margin:56px 0 20px;font-weight:700}
.case{background:var(--surface);border-radius:var(--radius);padding:28px;margin-bottom:16px;box-shadow:0 1px 2px rgba(0,0,0,0.04);border:1px solid var(--border)}
.case h3{margin:0 0 4px;font-size:22px}
.case em{font-style:normal;font-size:11px;color:var(--muted);background:color-mix(in oklab,var(--text) 6%,transparent);padding:2px 8px;border-radius:4px;margin-right:4px}
a{color:var(--accent);font-weight:600}
.skills span{display:inline-block;margin:4px 8px 4px 0;padding:4px 12px;background:var(--surface);border:1px solid var(--border);border-radius:calc(var(--radius) * 0.5);font-size:13px}
`, body);
  },
};
export default template;

*** Add File: src/templates/freelancer.ts
import type { Template } from "./types";
import { esc, renderWithTheme, ALL_MOTION_PRESETS } from "./types";

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

*** Add File: src/templates/photographer.ts
import type { Template } from "./types";
import { esc, renderWithTheme, ALL_MOTION_PRESETS } from "./types";

const template: Template = {
  meta: { id:"photographer", name:"Photographer", tagline:"Masonry gallery, quiet chrome.", tags:["photographer","gallery"], swatch:["#111","#f5f5f0","#c9a86a"] },
  defaults: {
    colors: { background:"#111", surface:"#1a1a1a", text:"#f5f5f0", muted:"#aaa", border:"#222", accent:"#c9a86a", accentText:"#111" },
    typography: { headingFont:"inter", bodyFont:"inter", scale:1, headingWeight:300, tracking:"wide", radius:0 },
    motion: { preset:"blur-in", intensity:1, hover:"none" },
  },
  capabilities: {
    colorRoles: ["background","surface","text","muted","border","accent"],
    motionPresets: ALL_MOTION_PRESETS,
    supports: { scale:true, radius:false, tracking:true, weight:true, hover:true },
  },
  render(config) {
    const ars = ["3/4","4/5","1/1","5/7","3/2"];
    const body = `
<header>
  <h1>${esc(config.name)}</h1>
  <div class="sub">${esc(config.headline)}${config.location?` — ${esc(config.location)}`:""}</div>
</header>
<div class="masonry">
${config.projects.map((p,i)=>p.imageUrl?`<div class="tile" data-anim style="--i:${i}"><img src="${esc(p.imageUrl)}" alt="${esc(p.title)}"/><div class="cap"><b>${esc(p.title)}</b> — ${esc(p.description)}</div></div>`:`<div class="tile" data-anim style="--i:${i}"><div class="ph" style="--ar:${ars[i%ars.length]}">${esc(p.title)}</div><div class="cap"><b>${esc(p.title)}</b> — ${esc(p.description)}</div></div>`).join("")}
</div>
<div class="about">${esc(config.bio)}</div>
<footer>${config.email?`<a href="mailto:${esc(config.email)}" data-hover>${esc(config.email)}</a>`:""}${config.socials.map(s=>`<a href="${esc(s.url)}" data-hover>${esc(s.label)}</a>`).join("")}</footer>`;
    return renderWithTheme(config, template.defaults, () => `
html,body{margin:0}
header{padding:48px 32px;text-align:center;border-bottom:1px solid var(--border)}
header h1{margin:0;font-weight:300;font-size:28px;letter-spacing:0.3em;text-transform:uppercase}
header .sub{color:var(--muted);margin-top:8px;letter-spacing:0.15em;text-transform:uppercase;font-size:11px}
.masonry{columns:3;column-gap:8px;padding:8px}
@media(max-width:900px){.masonry{columns:2}}
@media(max-width:520px){.masonry{columns:1}}
.tile{break-inside:avoid;margin-bottom:8px;background:var(--surface);position:relative;overflow:hidden}
.tile .ph{aspect-ratio:var(--ar,4/5);background:linear-gradient(135deg,color-mix(in oklab,var(--text) 15%,var(--surface)),var(--background));display:flex;align-items:flex-end;padding:16px;color:var(--muted)}
.tile img{width:100%;display:block}
.tile .cap{padding:12px 16px;font-size:13px;color:var(--muted)}
.tile .cap b{color:var(--text);font-weight:400}
.about{max-width:640px;margin:64px auto;padding:0 32px;text-align:center;color:var(--muted);line-height:1.8}
.about a{color:var(--accent)}
footer{padding:32px;text-align:center;color:var(--muted);font-size:12px;letter-spacing:0.2em;text-transform:uppercase}
footer a{color:var(--muted);margin:0 12px}
`, body);
  },
};
export default template;

*** Add File: src/templates/studio-bento.ts
import type { Template } from "./types";
import { esc, renderWithTheme, ALL_MOTION_PRESETS } from "./types";

const template: Template = {
  meta: { id:"studio-bento", name:"Studio / Bento", tagline:"Multidisciplinary bento grid.", tags:["studio","bento"], swatch:["#fafaf7","#111","#22c55e"] },
  defaults: {
    colors: { background:"#fafaf7", surface:"#ffffff", text:"#111", muted:"#666", border:"#e5e5e2", accent:"#22c55e", accentText:"#ffffff" },
    typography: { headingFont:"inter", bodyFont:"inter", scale:1, headingWeight:700, tracking:"tight", radius:20 },
    motion: { preset:"stagger-rise", intensity:1, hover:"lift" },
  },
  capabilities: {
    colorRoles: ["background","surface","text","muted","border","accent","accentText"],
    motionPresets: ALL_MOTION_PRESETS,
    supports: { scale:true, radius:true, tracking:true, weight:true, hover:true },
  },
  render(config) {
    const body = `
<main><div class="grid">
<div class="b hero" data-anim style="--i:0"><h1>${esc(config.name)}</h1><p>${esc(config.headline)}</p></div>
<div class="b about" data-anim style="--i:1"><h3>About</h3><div>${esc(config.bio)}</div></div>
${config.projects.slice(0,6).map((p,i)=>`<div class="b proj" data-anim data-hover style="--i:${i+2}"><h3>Project</h3><div class="body"><div>${p.tags.map(t=>`<em>${esc(t)}</em>`).join("")}</div><div class="title">${p.url?`<a href="${esc(p.url)}" style="color:inherit">${esc(p.title)}</a>`:esc(p.title)}</div><div style="color:var(--muted);font-size:13px;margin-top:4px">${esc(p.description)}</div></div></div>`).join("")}
<div class="b skills" data-anim><h3 style="margin-right:8px">Skills</h3>${config.skills.map(s=>`<span>${esc(s)}</span>`).join("")}</div>
<div class="b contact" data-anim>${config.email?`<a href="mailto:${esc(config.email)}">${esc(config.email)}</a>`:""}${config.socials.map(s=>`<a href="${esc(s.url)}">${esc(s.label)}</a>`).join("")}</div>
</div></main>`;
    return renderWithTheme(config, template.defaults, () => `
html,body{margin:0}
main{max-width:1200px;margin:0 auto;padding:32px}
.grid{display:grid;grid-template-columns:repeat(6,1fr);grid-auto-rows:120px;gap:14px}
@media(max-width:900px){.grid{grid-template-columns:repeat(2,1fr)}}
.b{background:var(--surface);border-radius:var(--radius);padding:20px;overflow:hidden;position:relative;border:1px solid var(--border)}
.b h3{margin:0 0 4px;font-size:14px;color:var(--muted);text-transform:uppercase;letter-spacing:0.1em}
.hero{grid-column:span 4;grid-row:span 2;background:linear-gradient(135deg,var(--accent),color-mix(in oklab,var(--accent) 40%,var(--text)));color:var(--accent-text);display:flex;flex-direction:column;justify-content:flex-end;padding:32px;border:none}
.hero h1{font-size:42px;margin:0 0 8px;line-height:1.05;letter-spacing:-0.02em;color:var(--accent-text)}
.hero p{margin:0;opacity:0.9;max-width:400px}
.about{grid-column:span 2;grid-row:span 2;font-size:15px;line-height:1.5}
.proj{grid-column:span 2;grid-row:span 2;display:flex;flex-direction:column}
.proj .body{margin-top:auto}
.proj .title{font-size:20px;font-weight:700;margin-top:8px}
.proj em{background:color-mix(in oklab,var(--accent) 15%,transparent);color:var(--accent);font-style:normal;padding:2px 8px;border-radius:99px;font-size:11px;margin-right:4px}
.skills{grid-column:span 3;grid-row:span 1;display:flex;flex-wrap:wrap;align-items:center;gap:6px}
.skills span{background:color-mix(in oklab,var(--text) 6%,transparent);padding:4px 10px;border-radius:99px;font-size:12px}
.contact{grid-column:span 3;background:var(--text);color:var(--background);display:flex;align-items:center;justify-content:center;text-align:center;font-size:14px}
.contact a{color:var(--accent);margin:0 8px}
@media(max-width:900px){.hero,.about,.proj,.skills,.contact{grid-column:span 2}}
`, body);
  },
};
export default template;