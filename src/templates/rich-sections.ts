import type { PortfolioConfig, PortfolioProject } from "@/lib/portfolio/types";
import { esc } from "./types";

/** Reusable HTML fragments for the PM/rich-portfolio sections.
 *  Every helper returns "" when its underlying data is empty, so callers
 *  can drop the fragments straight into a template without conditionals. */

export const orderedProjects = (c: PortfolioConfig): PortfolioProject[] => {
  const featured = c.projects.filter((p) => p.featured);
  const rest = c.projects.filter((p) => !p.featured);
  return featured.length ? [...featured, ...rest] : c.projects;
};

export function caseStudyHtml(p: PortfolioProject, i: number, opts?: { className?: string }): string {
  const cls = opts?.className ?? "case";
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
  const metrics = (p.metrics ?? [])
    .map((m) => `<div class="metric"><b>${esc(m.value)}</b><span>${esc(m.label)}</span></div>`)
    .join("");
  return `<article class="${cls}" data-anim data-hover style="--i:${i}">
    <header>
      ${p.featured ? `<span class="pin">Featured</span>` : ""}
      <h3>${esc(p.title)}</h3>
      <div class="tags">${p.tags.map((t) => `<em>${esc(t)}</em>`).join("")}</div>
    </header>
    ${meta ? `<div class="meta">${meta}</div>` : ""}
    <p class="lede">${esc(p.description)}</p>
    ${metrics ? `<div class="metrics">${metrics}</div>` : ""}
    ${sections ? `<div class="cs">${sections}</div>` : ""}
    ${p.url ? `<a class="more" href="${esc(p.url)}">Read the full case study →</a>` : ""}
  </article>`;
}

export function aboutHtml(c: PortfolioConfig): string {
  const industries = (c.industries ?? []).map((s) => `<span>${esc(s)}</span>`).join("");
  if (!c.story && !c.philosophy && !industries) return "";
  return `<section><h2>About</h2>
    ${c.story ? `<p class="prose">${esc(c.story)}</p>` : ""}
    ${c.philosophy ? `<blockquote class="philo">${esc(c.philosophy)}</blockquote>` : ""}
    ${industries ? `<div class="chips industries">${industries}</div>` : ""}
  </section>`;
}

export function strengthsHtml(c: PortfolioConfig): string {
  const items = (c.strengths ?? []).map((s) => `<li>${esc(s)}</li>`).join("");
  return items ? `<ul class="strengths">${items}</ul>` : "";
}

export function ctaRowHtml(c: PortfolioConfig): string {
  const parts = [
    c.email ? `<a class="cta" href="mailto:${esc(c.email)}">${esc(c.cta || "Get in touch")} →</a>` : "",
    c.resumeUrl ? `<a class="ghost" href="${esc(c.resumeUrl)}">Download résumé</a>` : "",
  ].filter(Boolean).join("");
  return parts ? `<div class="cta-row">${parts}</div>` : "";
}

export function skillsBlockHtml(c: PortfolioConfig): string {
  const groups = c.skillGroups ?? [];
  if (groups.length) {
    return groups
      .map((g) => `<div class="group"><h4>${esc(g.label)}</h4><div class="skills">${g.items.map((s) => `<span>${esc(s)}</span>`).join("")}</div></div>`)
      .join("");
  }
  return `<div class="skills">${c.skills.map((s) => `<span>${esc(s)}</span>`).join("")}</div>`;
}

export function achievementsHtml(c: PortfolioConfig): string {
  const items = (c.achievements ?? [])
    .map((a) => `<li><b>${esc(a.title)}</b>${a.year ? ` <em>${esc(a.year)}</em>` : ""}${a.detail ? `<p>${esc(a.detail)}</p>` : ""}</li>`)
    .join("");
  return items ? `<section><h2>Achievements & impact</h2><ul class="ach">${items}</ul></section>` : "";
}

export function testimonialsHtml(c: PortfolioConfig): string {
  const items = (c.testimonials ?? [])
    .map((t) => `<figure class="quote"><blockquote>&ldquo;${esc(t.quote)}&rdquo;</blockquote><figcaption>— ${esc(t.author)}${t.role ? `, ${esc(t.role)}` : ""}</figcaption></figure>`)
    .join("");
  return items ? `<section><h2>What people say</h2><div class="quotes">${items}</div></section>` : "";
}

export function writingHtml(c: PortfolioConfig): string {
  const items = (c.writing ?? [])
    .map((w) => `<li>${w.kind ? `<em>${esc(w.kind)}</em>` : ""}${w.url ? `<a href="${esc(w.url)}">${esc(w.title)}</a>` : `<span>${esc(w.title)}</span>`}${w.summary ? `<p>${esc(w.summary)}</p>` : ""}</li>`)
    .join("");
  return items ? `<section><h2>Writing & talks</h2><ul class="writing">${items}</ul></section>` : "";
}

export function contactLineHtml(c: PortfolioConfig): string {
  return [
    c.email ? `<a href="mailto:${esc(c.email)}">${esc(c.email)}</a>` : "",
    c.resumeUrl ? `<a href="${esc(c.resumeUrl)}">Résumé ↗</a>` : "",
    ...c.socials.map((s) => `<a href="${esc(s.url)}">${esc(s.label)}</a>`),
  ].filter(Boolean).join(" · ");
}

/** Shared CSS block for all rich sections. Templates concatenate this into
 *  their existing CSS. Uses only theme CSS variables. */
export const richSectionsCss = `
.strengths{list-style:none;padding:0;margin:8px 0 20px;display:flex;flex-wrap:wrap;gap:8px}
.strengths li{background:color-mix(in oklab,var(--accent) 12%,transparent);color:var(--accent);padding:4px 10px;border-radius:99px;font-size:13px;font-weight:600}
.cta-row{display:flex;gap:12px;flex-wrap:wrap;margin-top:8px}
.cta{display:inline-block;background:var(--accent);color:var(--accent-text);padding:10px 18px;border-radius:calc(var(--radius) * 0.7);text-decoration:none;font-weight:600}
.ghost{display:inline-block;padding:10px 18px;border-radius:calc(var(--radius) * 0.7);border:1px solid var(--border);color:var(--text);text-decoration:none;font-weight:600}
.pref{margin-top:16px;font-size:14px;color:var(--muted)}
.pin{font-size:10px;letter-spacing:0.15em;text-transform:uppercase;background:var(--accent);color:var(--accent-text);padding:3px 8px;border-radius:99px}
.case > header{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px 12px;margin-bottom:8px}
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
.more{display:inline-block;margin-top:8px;color:var(--accent);font-weight:600}
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
`;