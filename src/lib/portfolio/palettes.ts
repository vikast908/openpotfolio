import type { PortfolioColors } from "./types";

export type PalettePreset = {
  key: string;
  name: string;
  category: "light" | "dark" | "warm" | "cool" | "brand";
  colors: PortfolioColors;
};

/** Curated one-click palette presets. Independent of template defaults. */
export const PALETTE_PRESETS: PalettePreset[] = [
  { key: "graphite", name: "Graphite", category: "dark",
    colors: { background: "#0f1115", surface: "#171a20", text: "#e7e7ea", muted: "#8a8f98", border: "#22262e", accent: "#5b8def", accentText: "#0b0d10" } },
  { key: "midnight", name: "Midnight", category: "dark",
    colors: { background: "#0a0f1e", surface: "#131a2e", text: "#e8ecf5", muted: "#7a86a2", border: "#1e2740", accent: "#5dd7f7", accentText: "#06101f" } },
  { key: "carbon", name: "Carbon", category: "dark",
    colors: { background: "#0a0a0a", surface: "#141414", text: "#f5f5f5", muted: "#8a8a8a", border: "#222", accent: "#f5f5f5", accentText: "#0a0a0a" } },
  { key: "obsidian", name: "Obsidian", category: "dark",
    colors: { background: "#111114", surface: "#1a1a20", text: "#f0f0f2", muted: "#8888a0", border: "#28282e", accent: "#a78bfa", accentText: "#0e0e14" } },
  { key: "forest", name: "Forest", category: "dark",
    colors: { background: "#0f1a15", surface: "#16221b", text: "#e6ede8", muted: "#8ca093", border: "#1f2e26", accent: "#7cc39a", accentText: "#0b1410" } },
  { key: "matrix", name: "Matrix", category: "dark",
    colors: { background: "#000000", surface: "#0a1a12", text: "#c8ffe4", muted: "#4a8a68", border: "#0f3324", accent: "#00ff9c", accentText: "#000000" } },
  { key: "vapor", name: "Vapor", category: "dark",
    colors: { background: "#0d0221", surface: "#160934", text: "#f2f2ff", muted: "#a288d4", border: "#2b1259", accent: "#ff71ce", accentText: "#0d0221" } },

  { key: "bone", name: "Bone", category: "light",
    colors: { background: "#f7f4ee", surface: "#ffffff", text: "#1a1a1a", muted: "#6b6660", border: "#e3ddd2", accent: "#c67a3e", accentText: "#ffffff" } },
  { key: "paper", name: "Paper", category: "light",
    colors: { background: "#ffffff", surface: "#f6f6f6", text: "#0a0a0a", muted: "#6b6b6b", border: "#e5e5e5", accent: "#e10600", accentText: "#ffffff" } },
  { key: "arctic", name: "Arctic", category: "cool",
    colors: { background: "#f4f8fc", surface: "#ffffff", text: "#0f2233", muted: "#5c7891", border: "#dce6ee", accent: "#3c8dbc", accentText: "#ffffff" } },
  { key: "ink", name: "Ink", category: "light",
    colors: { background: "#f5f3ee", surface: "#ffffff", text: "#0d0d0d", muted: "#6b6b6b", border: "#e2ded4", accent: "#0d0d0d", accentText: "#f5f3ee" } },
  { key: "newsprint", name: "Newsprint", category: "warm",
    colors: { background: "#f4efe4", surface: "#fbf8ef", text: "#111111", muted: "#6b6660", border: "#d9d2bf", accent: "#c8321f", accentText: "#ffffff" } },
  { key: "kraft", name: "Kraft", category: "warm",
    colors: { background: "#e8d3a8", surface: "#f0dfb9", text: "#1c2a4a", muted: "#5a5237", border: "#b89968", accent: "#1c2a4a", accentText: "#e8d3a8" } },
  { key: "dune", name: "Dune", category: "warm",
    colors: { background: "#efe6d6", surface: "#f7f0e1", text: "#2b1f14", muted: "#7a6a55", border: "#ddd0b8", accent: "#b04a2f", accentText: "#ffffff" } },
  { key: "sunset", name: "Sunset", category: "warm",
    colors: { background: "#fff2e6", surface: "#ffffff", text: "#2a1810", muted: "#8a6a5c", border: "#f3ddc7", accent: "#ff6b4a", accentText: "#ffffff" } },
  { key: "rose", name: "Rose", category: "warm",
    colors: { background: "#faf1ee", surface: "#ffffff", text: "#2a1b1e", muted: "#8a6a70", border: "#efdedb", accent: "#c86e77", accentText: "#ffffff" } },
  { key: "manuscript", name: "Manuscript", category: "warm",
    colors: { background: "#f0e6d2", surface: "#f8f1e0", text: "#2a1414", muted: "#7a5f4a", border: "#d9caa8", accent: "#7a1f2b", accentText: "#f0e6d2" } },
  { key: "concrete", name: "Concrete", category: "cool",
    colors: { background: "#d5d3ce", surface: "#e0ded9", text: "#1a1a1a", muted: "#5a5852", border: "#a8a6a1", accent: "#ff5a1f", accentText: "#ffffff" } },
  { key: "slate", name: "Slate", category: "dark",
    colors: { background: "#1c1f24", surface: "#252932", text: "#eef1f5", muted: "#8a94a3", border: "#2e3540", accent: "#a5f3fc", accentText: "#0d1116" } },

  { key: "ocean", name: "Ocean", category: "brand",
    colors: { background: "#0c2340", surface: "#1a4a6e", text: "#f0f7fb", muted: "#a5c4d8", border: "#2d5f83", accent: "#5cbdb9", accentText: "#0c2340" } },
  { key: "emerald", name: "Emerald", category: "brand",
    colors: { background: "#064e3b", surface: "#0d7a5f", text: "#f5f0e0", muted: "#a7c9b8", border: "#0f624b", accent: "#c9a84c", accentText: "#064e3b" } },
  { key: "coral", name: "Coral", category: "brand",
    colors: { background: "#fff5f4", surface: "#ffffff", text: "#2a1214", muted: "#8a6668", border: "#ffd8d3", accent: "#ee5a70", accentText: "#ffffff" } },
  { key: "electric", name: "Electric", category: "brand",
    colors: { background: "#ffffff", surface: "#f8f8fb", text: "#0a0a0a", muted: "#6b6b78", border: "#e5e5eb", accent: "#4f46e5", accentText: "#ffffff" } },
  { key: "gold-noir", name: "Gold Noir", category: "brand",
    colors: { background: "#0d0d0d", surface: "#1a1a1a", text: "#f0e8d0", muted: "#8a805a", border: "#2a2617", accent: "#c9a84c", accentText: "#0d0d0d" } },
];
