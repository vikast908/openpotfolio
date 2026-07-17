import JSZip from "jszip";
import type { PortfolioConfig } from "./types";
import { getTemplateOrFallback } from "@/templates/registry";

const MIT = (year: number, owner: string) => `MIT License

Copyright (c) ${year} ${owner}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
`;

export async function downloadZip(config: PortfolioConfig): Promise<void> {
  const template = getTemplateOrFallback(config.templateId);
  const { html } = template.render(config);

  const zip = new JSZip();
  zip.file("index.html", html);
  zip.file(
    "README.md",
    `# ${config.name} - Portfolio\n\nGenerated with the open-source Portfolio Builder.\nTemplate: **${template.meta.name}** (\`${template.meta.id}\`)\n\nTo publish: upload \`index.html\` to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages).\n\nMIT Licensed - see LICENSE.\n`,
  );
  zip.file("LICENSE", MIT(new Date().getFullYear(), config.name));
  zip.file("portfolio.json", JSON.stringify(config, null, 2));

  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${config.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-portfolio.zip`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}