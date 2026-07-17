import type { PortfolioConfig } from "@/lib/portfolio/types";
import { esc } from "./types";

export function socialsHtml(
  config: PortfolioConfig,
  sep = " · ",
  attrs = 'target="_blank" rel="noopener"',
): string {
  return config.socials
    .map((s) => `<a href="${esc(s.url)}" ${attrs}>${esc(s.label)}</a>`)
    .join(sep);
}

/** Social links with data-hover (suite layouts). */
export function socialsLinks(config: PortfolioConfig, join = ""): string {
  return config.socials
    .map((s) => `<a href="${esc(s.url)}" data-hover>${esc(s.label)}</a>`)
    .join(join);
}

export function emailLinkHtml(
  config: PortfolioConfig,
  attrs = 'data-hover',
): string {
  return config.email
    ? `<a href="mailto:${esc(config.email)}" ${attrs}>${esc(config.email)}</a>`
    : "";
}

export function skillsHtml(config: PortfolioConfig, tag = "span"): string {
  return config.skills.map((s) => `<${tag}>${esc(s)}</${tag}>`).join("");
}

export function projectTagsHtml(tags: string[]): string {
  return tags.map((t) => `<em>${esc(t)}</em>`).join("");
}
