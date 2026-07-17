import type { PortfolioConfig } from "@/lib/portfolio/types";

export type TemplateMeta = {
  id: string;
  name: string;
  tagline: string;
  tags: string[];
  swatch: string[]; // 2-3 colors for gallery thumbnail
};

export type StaticOutput = { html: string; css: string };

export type Template = {
  meta: TemplateMeta;
  render: (config: PortfolioConfig) => StaticOutput;
};

export function esc(s: string | undefined | null): string {
  if (!s) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function fontStack(font: "sans" | "serif" | "mono"): string {
  switch (font) {
    case "serif":
      return `'Iowan Old Style', 'Palatino Linotype', Georgia, serif`;
    case "mono":
      return `'JetBrains Mono', 'Menlo', ui-monospace, monospace`;
    default:
      return `'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif`;
  }
}

export function wrapDoc(title: string, css: string, body: string): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${esc(title)}</title>
<style>${css}</style>
</head>
<body>
${body}
</body>
</html>`;
}