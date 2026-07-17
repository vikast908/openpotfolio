import type { PortfolioConfig } from "./types";
import { buildShareUrl } from "./encode";

export function buildAgentPrompt(config: PortfolioConfig): string {
  const url = buildShareUrl(config);
  return [
    `Build me a personal portfolio website as a single static HTML/CSS page.`,
    `Use this configuration (open the link to see the live preview and copy the JSON): ${url}`,
    `Match the "${config.templateId}" template's layout and typography.`,
    `Owner: ${config.name} — ${config.headline}.`,
    `MIT licensed. No framework required in the output — plain semantic HTML with a single stylesheet.`,
  ].join("\n\n");
}

export type AgentTarget = {
  id: string;
  label: string;
  buildUrl: (prompt: string) => string;
};

export const agentTargets: AgentTarget[] = [
  {
    id: "lovable",
    label: "Lovable",
    buildUrl: (p) => `https://lovable.dev/?prompt=${encodeURIComponent(p)}`,
  },
  {
    id: "chatgpt",
    label: "ChatGPT",
    buildUrl: (p) => `https://chat.openai.com/?q=${encodeURIComponent(p)}`,
  },
  {
    id: "claude",
    label: "Claude",
    buildUrl: (p) => `https://claude.ai/new?q=${encodeURIComponent(p)}`,
  },
  {
    id: "v0",
    label: "v0",
    buildUrl: (p) => `https://v0.dev/?q=${encodeURIComponent(p)}`,
  },
];