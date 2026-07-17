// Curated font registry. Templates + StylePanel filter this list.
export type FontKind = "sans" | "serif" | "mono" | "display";
export type FontEntry = {
  key: string;
  label: string;
  kind: FontKind;
  stack: string;
  google?: string; // family portion for fonts.googleapis.com CSS2 URL
  weights?: number[];
};

export const FONTS: FontEntry[] = [
  {
    key: "inter",
    label: "Inter",
    kind: "sans",
    stack: `'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif`,
    google: "Inter:wght@400;500;600;700;800",
    weights: [400, 500, 600, 700, 800],
  },
  {
    key: "space-grotesk",
    label: "Space Grotesk",
    kind: "sans",
    stack: `'Space Grotesk', 'Inter', system-ui, sans-serif`,
    google: "Space+Grotesk:wght@400;500;600;700",
    weights: [400, 500, 600, 700],
  },
  {
    key: "system-sans",
    label: "System Sans",
    kind: "sans",
    stack: `system-ui, -apple-system, 'Segoe UI', sans-serif`,
  },
  {
    key: "instrument-serif",
    label: "Instrument Serif",
    kind: "serif",
    stack: `'Instrument Serif', 'Iowan Old Style', Georgia, serif`,
    google: "Instrument+Serif:ital@0;1",
    weights: [400],
  },
  {
    key: "dm-serif-display",
    label: "DM Serif Display",
    kind: "serif",
    stack: `'DM Serif Display', 'Iowan Old Style', Georgia, serif`,
    google: "DM+Serif+Display:ital@0;1",
    weights: [400],
  },
  {
    key: "fraunces",
    label: "Fraunces",
    kind: "serif",
    stack: `'Fraunces', 'Iowan Old Style', Georgia, serif`,
    google: "Fraunces:opsz,wght@9..144,400;9..144,600;9..144,800",
    weights: [400, 600, 800],
  },
  {
    key: "iowan",
    label: "Iowan / Georgia",
    kind: "serif",
    stack: `'Iowan Old Style', 'Palatino Linotype', Georgia, serif`,
  },
  {
    key: "jetbrains-mono",
    label: "JetBrains Mono",
    kind: "mono",
    stack: `'JetBrains Mono', ui-monospace, Menlo, monospace`,
    google: "JetBrains+Mono:wght@400;500;700",
    weights: [400, 500, 700],
  },
  {
    key: "ibm-plex-mono",
    label: "IBM Plex Mono",
    kind: "mono",
    stack: `'IBM Plex Mono', ui-monospace, Menlo, monospace`,
    google: "IBM+Plex+Mono:wght@400;500;700",
    weights: [400, 500, 700],
  },
  {
    key: "system-mono",
    label: "System Mono",
    kind: "mono",
    stack: `ui-monospace, 'Menlo', 'Consolas', monospace`,
  },
];

export function getFont(key: string): FontEntry {
  return FONTS.find((f) => f.key === key) ?? FONTS[0];
}

/** Build the Google Fonts CSS2 URL for a set of font keys. */
export function googleFontsUrl(keys: string[]): string | null {
  const params = Array.from(new Set(keys))
    .map((k) => getFont(k))
    .filter((f) => f.google)
    .map((f) => `family=${f.google}`);
  if (!params.length) return null;
  return `https://fonts.googleapis.com/css2?${params.join("&")}&display=swap`;
}

/** Emit <link> tags for embedding into an exported static HTML. */
export function fontLinkTags(keys: string[]): string {
  const url = googleFontsUrl(keys);
  if (!url) return "";
  return `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${url}">`;
}