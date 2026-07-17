import type { PortfolioConfig } from "@/lib/portfolio/types";
import { esc } from "./types";

export function socialsHtml(config: PortfolioConfig, sep = " · "): string {
  return config.socials
    .map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a>`)
    .join(sep);
}

export function skillsHtml(config: PortfolioConfig, tag = "span"): string {
  return config.skills.map((s) => `<${tag}>${esc(s)}</${tag}>`).join("");
}

export function projectTagsHtml(tags: string[]): string {
  return tags.map((t) => `<em>${esc(t)}</em>`).join("");
}