import type { Template } from "./types";
import minimalDev from "./minimal-dev";
import terminal from "./terminal";
import creative from "./creative-designer";
import photographer from "./photographer";
import writer from "./writer";
import consultant from "./consultant";
import pm from "./product-manager";
import pmEditorial from "./pm-editorial";
import pmApple from "./pm-apple";
import academic from "./academic";
import freelancer from "./freelancer";
import studio from "./studio-bento";
import { appleTemplates } from "./apple-suite";
import { editorialTemplates } from "./editorial-suite";

export const templates: Template[] = [
  minimalDev,
  terminal,
  creative,
  photographer,
  writer,
  consultant,
  pm,
  pmEditorial,
  pmApple,
  academic,
  freelancer,
  studio,
  ...appleTemplates,
  ...editorialTemplates,
];

export function getTemplate(id: string): Template | undefined {
  return templates.find((t) => t.meta.id === id);
}

export function getTemplateOrFallback(id: string): Template {
  return getTemplate(id) ?? templates[0];
}