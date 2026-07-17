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
    const featured = config.projects.filter((p) => p.featured);
    const rest = config.projects.filter((p) => !p.featured);
    const ordered = featured.length ? [...featured, ...rest] : config.projects;

    const caseBlock = (p: typeof config.projects[number], i: number) => {
      const meta = [
        p.role && `<span><b>Role</b> ${esc(p.role)}</span>`,
        p.team && `<span><b>Team</b> ${esc(p.team)}</span>`,
        p.timeline && `<span><b>Timeline</b> ${esc(p.timeline)}</span>`,
      ].filter(Boolean).join("");
      const sections = [
        p.problem && `<div class="cs-row"><h4>Problem</h4><p>${esc(p.problem)}</p></div>`,
        p.research && `<div class="cs-row"><h4>Research</h4><p>${esc(p.research)}</p></div>`,
        p.goals && `<div class="cs-row"><h4>Goals & metrics</h4><p>${esc(p.goals)}</p></div>`,
        p.constraints && `<div class="cs-row"><h4>Constraints</h4><p>${esc(p.constraints)}</p></div>`,
        p.strategy && `<div class="cs-row"><h4>Strategy & decisions</h4><p>${esc(p.strategy)}</p></div>`,
        p.execution && `<div class="cs-row"><h4>Execution</h4><p>${esc(p.execution)}</p></div>`,
        p.results && `<div class="cs-row results"><h4>Results</h4><p>${esc(p.results)}</p></div>`,
        p.challenges && `<div class="cs-row"><h4>Challenges</h4><p>${esc(p.challenges)}</p></div>`,
        p.lessons && `<div class="cs-row"><h4>What I'd do differently</h4><p>${esc(p.lessons)}</p></div>`,
      ].filter(Boolean).join("");
      const hasCase = !!sections;
      const metrics = (p.metrics ?? []).map((m) => `<div class="metric"><b>${esc(m.value)}</b><span>${esc(m.label)}</span></div>`).join("");
      return `<article class="case" data-anim data-hover style="--i:${i}">
        <header>
          ${p.featured ? `<span class="pin">Featured</span>` : ""}
          <h3>${esc(p.title)}</h3>
          <div class="tags">${p.tags.map((t) => `<em>${esc(t)}</em>`).join("")}</div>
        </header>
        ${meta ? `<div class="meta">${meta}</div>` : ""}
        <p class="lede">${esc(p.description)}</p>
        ${metrics ? `<div class="metrics">${metrics}</div>` : ""}
        ${hasCase ? `<div class="cs">${sections}</div>` : ""}
        ${p.url ? `<a class="more" href="${esc(p.url)}">Read the full case study →</a>` : ""}
      </article>`;
    };

    const groups = config.skillGroups ?? [];
    const skillsBlock = groups.length
      ? groups
          .map((g) => `<div class="group"><h4>${esc(g.label)}</h4><div class="skills">${g.items.map((s) => `<span>${esc(s)}</span>`).join("")}</div></div>`)
          .join("")
      : `<div class="skills">${config.skills.map((s) => `<span>${esc(s)}</span>`).join("")}</div>`;

    const strengths = (config.strengths ?? []).map((s) => `<li>${esc(s)}</li>`).join("");
    const industries = (config.industries ?? []).map((s) => `<span>${esc(s)}</span>`).join("");
    const achievements = (config.achievements ?? [])
      .map((a) => `<li><b>${esc(a.title)}</b>${a.year ? ` <em>${esc(a.year)}</em>` : ""}${a.detail ? `<p>${esc(a.detail)}</p>` : ""}</li>`)
      .join("");
    const testimonials = (config.testimonials ?? [])
      .map((t) => `<figure class="quote"><blockquote>"${esc(t.quote)}"</blockquote><figcaption>- ${esc(t.author)}${t.role ? `, ${esc(t.role)}` : ""}</figcaption></figure>`)
      .join("");
    const writing = (config.writing ?? [])
      .map((w) => `<li>${w.kind ? `<em>${esc(w.kind)}</em>` : ""}${w.url ? `<a href="${esc(w.url)}">${esc(w.title)}</a>` : `<span>${esc(w.title)}</span>`}${w.summary ? `<p>${esc(w.summary)}</p>` : ""}</li>`)
      .join("");

    const contactLinks = [
      config.email ? `<a href="mailto:${esc(config.email)}">${esc(config.email)}</a>` : "",
      config.resumeUrl ? `<a href="${esc(config.resumeUrl)}">Résumé ↗</a>` : "",
      ...config.socials.map((s) => `<a href="${esc(s.url)}">${esc(s.label)}</a>`),
    ].filter(Boolean).join(" · ");

    const body = `
<main>
  <header class="hero">
    <span class="tag">${esc(config.headline)}</span>
    <h1>${esc(config.name)}</h1>
    <p class="bio">${esc(config.bio)}</p>
    ${strengths ? `<ul class="strengths">${strengths}</ul>` : ""}
    <div class="cta-row">
      ${config.email ? `<a class="cta" href="mailto:${esc(config.email)}">${esc(config.cta || "Get in touch")} →</a>` : ""}
      ${config.resumeUrl ? `<a class="ghost" href="${esc(config.resumeUrl)}">Download résumé</a>` : ""}
    </div>
    ${config.workPreference ? `<p class="pref">${esc(config.workPreference)}</p>` : ""}
  </header>

  ${config.story || config.philosophy || industries ? `
  <section>
    <h2>About</h2>
    ${config.story ? `<p class="prose">${esc(config.story)}</p>` : ""}
    ${config.philosophy ? `<blockquote class="philo">${esc(config.philosophy)}</blockquote>` : ""}
    ${industries ? `<div class="chips industries">${industries}</div>` : ""}
  </section>` : ""}

  <section>
    <h2>${featured.length ? "Featured case studies" : "Selected case studies"}</h2>
    ${ordered.map(caseBlock).join("")}
  </section>

  ${achievements ? `<section><h2>Achievements & impact</h2><ul class="ach">${achievements}</ul></section>` : ""}

  <section><h2>Capabilities</h2>${skillsBlock}</section>

  ${testimonials ? `<section><h2>What people say</h2><div class="quotes">${testimonials}</div></section>` : ""}

  ${writing ? `<section><h2>Writing & talks</h2><ul class="writing">${writing}</ul></section>` : ""}

  ${config.experience.length ? `<section><h2>Experience</h2>${config.experience.map((e) => `<div class="exp"><strong>${esc(e.role)}</strong> - ${esc(e.company)}<div class="row"><span>${esc(e.summary ?? "")}</span><span>${esc(e.period)}</span></div></div>`).join("")}</section>` : ""}

  <section id="contact">
    <h2>Reach out</h2>
    ${config.cta ? `<p class="prose">${esc(config.cta)}</p>` : ""}
    <p>${contactLinks}</p>
  </section>
</main>`;
    return renderWithTheme(config, template.defaults, () => `
html,body{margin:0;line-height:1.6}
main{max-width:820px;margin:0 auto;padding:64px 24px}
.hero{margin-bottom:48px}
.tag{display:inline-block;font-size:12px;background:color-mix(in oklab,var(--accent) 15%,transparent);color:var(--accent);padding:4px 10px;border-radius:99px;font-weight:600}
h1{font-size:40px;margin:12px 0 8px;letter-spacing:-0.02em}
.bio{margin:16px 0 20px;color:var(--text);font-size:17px;max-width:60ch}
.strengths{list-style:none;padding:0;margin:8px 0 20px;display:flex;flex-wrap:wrap;gap:8px}
.strengths li{background:color-mix(in oklab,var(--accent) 10%,transparent);color:var(--accent);padding:4px 10px;border-radius:99px;font-size:13px;font-weight:600}
.cta-row{display:flex;gap:12px;flex-wrap:wrap;margin-top:8px}
.cta{display:inline-block;background:var(--accent);color:var(--accent-text);padding:10px 18px;border-radius:calc(var(--radius) * 0.7);text-decoration:none;font-weight:600}
.ghost{display:inline-block;padding:10px 18px;border-radius:calc(var(--radius) * 0.7);border:1px solid var(--border);color:var(--text);text-decoration:none;font-weight:600}
.pref{margin-top:16px;font-size:14px;color:var(--muted)}
section h2{font-size:12px;text-transform:uppercase;letter-spacing:0.2em;color:var(--muted);margin:56px 0 20px;font-weight:700}
.case{background:var(--surface);border-radius:var(--radius);padding:28px;margin-bottom:20px;box-shadow:0 1px 2px rgba(0,0,0,0.04);border:1px solid var(--border)}
.case > header{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px 12px;margin-bottom:8px}
.case h3{margin:0;font-size:22px}
.pin{font-size:10px;letter-spacing:0.15em;text-transform:uppercase;background:var(--accent);color:var(--accent-text);padding:3px 8px;border-radius:99px}
.case em{font-style:normal;font-size:11px;color:var(--muted);background:color-mix(in oklab,var(--text) 6%,transparent);padding:2px 8px;border-radius:4px;margin-right:4px}
.case .meta{display:flex;flex-wrap:wrap;gap:16px;font-size:13px;color:var(--muted);margin:0 0 12px;padding:8px 12px;background:color-mix(in oklab,var(--text) 3%,transparent);border-radius:calc(var(--radius) * 0.5)}
.case .meta b{color:var(--text);font-weight:600;margin-right:4px}
.case .lede{margin:0 0 16px;font-size:15px}
.metrics{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:8px;margin:0 0 16px}
.metric{background:color-mix(in oklab,var(--accent) 8%,transparent);border-radius:calc(var(--radius) * 0.5);padding:12px 14px;border:1px solid color-mix(in oklab,var(--accent) 20%,transparent)}
.metric b{display:block;font-size:22px;color:var(--accent);letter-spacing:-0.02em}
.metric span{font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:var(--muted)}
.cs{border-top:1px solid var(--border);padding-top:16px;margin-top:4px}
.cs-row{margin:0 0 14px}
.cs-row h4{margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:var(--muted);font-weight:700}
.cs-row p{margin:0;font-size:14px}
.cs-row.results h4{color:var(--accent)}
.cs-row.results p{font-weight:500}
.more{display:inline-block;margin-top:8px}
a{color:var(--accent);font-weight:600}
.skills span{display:inline-block;margin:4px 8px 4px 0;padding:4px 12px;background:var(--surface);border:1px solid var(--border);border-radius:calc(var(--radius) * 0.5);font-size:13px}
.group{margin-bottom:16px}
.group h4{margin:0 0 6px;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:var(--text);font-weight:700}
.chips.industries span{display:inline-block;margin:4px 6px 4px 0;padding:3px 10px;border:1px solid var(--border);border-radius:99px;font-size:12px;color:var(--muted)}
.prose{max-width:65ch;font-size:16px}
.philo{margin:16px 0;padding:16px 20px;border-left:3px solid var(--accent);background:var(--surface);border-radius:calc(var(--radius) * 0.4);font-style:italic;color:var(--text)}
.ach{list-style:none;padding:0;margin:0}
.ach li{padding:12px 0;border-bottom:1px solid var(--border)}
.ach li:last-child{border-bottom:0}
.ach b{font-size:15px}
.ach em{font-style:normal;color:var(--muted);font-size:12px;margin-left:6px}
.ach p{margin:4px 0 0;font-size:14px;color:var(--muted)}
.quotes{display:grid;grid-template-columns:1fr;gap:16px}
.quote{margin:0;padding:20px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius)}
.quote blockquote{margin:0 0 8px;font-size:16px;line-height:1.5}
.quote figcaption{font-size:13px;color:var(--muted)}
.writing{list-style:none;padding:0;margin:0}
.writing li{padding:10px 0;border-bottom:1px solid var(--border)}
.writing li:last-child{border-bottom:0}
.writing em{font-style:normal;color:var(--muted);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;margin-right:8px}
.writing p{margin:4px 0 0;font-size:13px;color:var(--muted)}
.exp{padding:12px 0;border-bottom:1px solid var(--border)}
.exp:last-of-type{border-bottom:0}
.exp .row{display:flex;justify-content:space-between;gap:16px;font-size:13px;color:var(--muted);margin-top:4px}
`, body);
  },
};
export default template;

