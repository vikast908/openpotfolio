import type { PortfolioMotion } from "@/lib/portfolio/types";
import type { TemplateDefaults } from "@/lib/portfolio/theme";
import type {
  ContentCapabilities,
  Template,
  TemplateCapabilities,
} from "./types";
import {
  ALL_COLOR_ROLES,
  ALL_MOTION_PRESETS,
  CORE_CONTENT,
  FULL_STYLE_SUPPORTS,
} from "./types";

export type SuitePalette = {
  key: string;
  name: string;
  swatch: [string, string, string] | string[];
  colors: TemplateDefaults["colors"];
  headingFont: string;
  bodyFont: string;
  headingWeight: 300 | 400 | 500 | 600 | 700 | 800 | 900;
  radius: number;
};

export type LayoutSpec = {
  key: string;
  label: string;
  tagline: string;
  tags: string[];
  render: (p: SuitePalette) => Template["render"];
};

export function baseDefaultsFromPalette(
  p: SuitePalette,
  motion: Required<PortfolioMotion>,
): TemplateDefaults {
  return {
    colors: p.colors,
    typography: {
      headingFont: p.headingFont,
      bodyFont: p.bodyFont,
      scale: 1,
      headingWeight: p.headingWeight,
      tracking: "tight",
      radius: p.radius,
    },
    motion,
  };
}

export type MakeSuiteOptions = {
  idPrefix: string;
  layouts: LayoutSpec[];
  palettes: SuitePalette[];
  motionDefaults: Required<PortfolioMotion>;
  content?: ContentCapabilities;
  capabilities?: Partial<
    Pick<TemplateCapabilities, "colorRoles" | "motionPresets" | "supports">
  >;
};

/** Cartesian product of layouts × palettes → Template[]. */
export function makeSuite(opts: MakeSuiteOptions): Template[] {
  const content = opts.content ?? CORE_CONTENT;
  const colorRoles = opts.capabilities?.colorRoles ?? ALL_COLOR_ROLES;
  const motionPresets = opts.capabilities?.motionPresets ?? ALL_MOTION_PRESETS;
  const supports = opts.capabilities?.supports ?? FULL_STYLE_SUPPORTS;

  return opts.layouts.flatMap((layout) =>
    opts.palettes.map<Template>((p) => ({
      meta: {
        id: `${opts.idPrefix}-${layout.key}-${p.key}`,
        name: `${layout.label} · ${p.name}`,
        tagline: layout.tagline,
        tags: [...layout.tags, p.key],
        swatch: [...p.swatch],
      },
      defaults: baseDefaultsFromPalette(p, opts.motionDefaults),
      capabilities: {
        colorRoles,
        motionPresets,
        supports,
        content,
      },
      render: layout.render(p),
    })),
  );
}
