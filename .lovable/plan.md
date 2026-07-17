# Deep customization for every template

## The problem

Right now `theme` only exposes `accent` + a coarse `font: sans|serif|mono`. Every template hard-codes its background, text, border, and secondary colors inside its CSS string. So the color picker in the Theme panel visibly changes very little — most of the palette is baked in. There's no font size / weight control, no per-heading font choice, and no motion knob.

## Design goals

1. Give the user real dials — but not so many that the UI turns into Photoshop.
2. Every dial must have a *sensible per-template default* so the template still looks like itself out of the box, and a **Reset to template default** button.
3. The template author declares which knobs make sense (a Terminal template shouldn't expose "serif heading font"; a Writer template shouldn't expose "monospace body").
4. Zero data loss: existing saved drafts (old shape) hydrate cleanly.

## New `theme` shape

```ts
type PortfolioTheme = {
  // Colors — a real palette, not one accent
  colors: {
    background: string;   // page background
    surface:    string;   // cards / panels
    text:       string;   // primary text
    muted:      string;   // secondary text / meta
    border:     string;   // dividers / hairlines
    accent:     string;   // links / highlights
    accentText: string;   // text on accent
  };
  // Typography
  typography: {
    headingFont: FontKey;    // e.g. "inter" | "instrument-serif" | "jetbrains-mono" | ...
    bodyFont:    FontKey;
    scale:       number;     // 0.85 – 1.25, multiplies base font-size
    headingWeight: 400 | 500 | 600 | 700 | 800 | 900;
    tracking:    "tight" | "normal" | "wide";  // letter-spacing preset
    radius:      number;     // 0 – 24 px, corner radius token
  };
  // Motion
  motion: {
    preset: "none" | "fade" | "rise" | "stagger-rise" | "blur-in";
    intensity: number;  // 0 – 1.5, scales distance & duration
    hover: "none" | "lift" | "underline" | "tilt";
  };
};
```

Fonts come from a curated `FONTS` registry (~10 options, loaded via `<link>` in `__root.tsx` — Inter, Instrument Serif, JetBrains Mono, Space Grotesk, DM Serif Display, Fraunces, Geist Mono, Iowan/Georgia stack, etc.). Each font entry knows its CSS stack and whether it's serif/sans/mono, so templates can filter.

## Per-template capability declaration

Extend `TemplateMeta` with:

```ts
capabilities: {
  colorRoles: Array<"background"|"surface"|"text"|"muted"|"border"|"accent"|"accentText">;
  fontRoles:  Array<"headingFont"|"bodyFont">;
  fontFilter?: (f: FontEntry) => boolean;      // Terminal → mono only
  motionPresets: Array<PortfolioTheme["motion"]["preset"]>;
  supports: { scale: boolean; radius: boolean; tracking: boolean; weight: boolean; hover: boolean };
};
defaultTheme: PortfolioTheme;                  // the "designed" look for this template
```

So the Theme panel is generated *from* the active template: Terminal shows only bg/text/accent, mono fonts, no radius, motion presets `none|fade`. Studio-Bento exposes everything.

## How templates consume theme

Templates stop hard-coding colors. `wrapDoc` receives the resolved theme and injects CSS variables + font stacks + a scoped motion stylesheet:

```css
:root{
  --bg:...; --surface:...; --text:...; --muted:...; --border:...;
  --accent:...; --accent-text:...;
  --radius:...px; --scale:...;
  --font-heading:...; --font-body:...;
  --track:...;
  --motion-duration:...ms;
}
```

Each template's CSS references these vars instead of literal `#fff`. Refactor is mechanical: 10 templates × ~15 min each. The motion preset appends a `<style>` block with the appropriate `@keyframes` + `animation` rules keyed on `[data-anim]` attributes the template already emits on section wrappers.

Motion presets (implementation sketch):
- `none` — no animation.
- `fade` — 220ms opacity 0→1 on load.
- `rise` — translateY(8px→0) + opacity, 320ms ease-out.
- `stagger-rise` — same, with `animation-delay: calc(var(--i) * 60ms)` per card.
- `blur-in` — 280ms blur(8px→0) + opacity.

Intensity multiplies distance & duration. `prefers-reduced-motion: reduce` collapses everything to a simple opacity fade regardless of preset. Hover presets are pure CSS (`:hover` transforms).

## New Theme panel (right side of the form)

Replace the current 2-field Theme section with a collapsible, tabbed **Style** panel:

- **Colors** — one swatch + hex input per role the template exposes. "Palette presets" row on top (5 curated palettes tuned per template).
- **Type** — heading font & body font dropdowns (with live font-name preview in that font), scale slider, weight buttons, tracking pills.
- **Motion** — segmented control for preset, intensity slider, hover behavior pills.
- **Layout** — radius slider (if `supports.radius`).
- Sticky "Reset style to template default" button.

Preview updates live (existing 40ms debounce).

## Migration & backward compat

`withDefaults` maps the old `theme: { accent, font }` shape onto the new one:
- `accent` → `colors.accent`; other colors fall back to the template's `defaultTheme`.
- `font: "sans"|"serif"|"mono"` → picks a default `headingFont`/`bodyFont` from that family.

Old shareable URLs and old localStorage drafts keep working.

## File plan

New:
- `src/lib/portfolio/fonts.ts` — FONTS registry + `fontLinkTags()`.
- `src/lib/portfolio/theme.ts` — `resolveTheme`, `themeCssVars`, `motionCss`.
- `src/components/builder/StylePanel.tsx` — new collapsible panel (Colors / Type / Motion / Layout).
- `src/components/builder/ColorRoleField.tsx`, `FontPicker.tsx`, `MotionPicker.tsx` — small pieces.

Edited:
- `src/lib/portfolio/types.ts` — new `PortfolioTheme` + migration in `withDefaults`.
- `src/templates/types.ts` — `capabilities`, `defaultTheme`; `wrapDoc` accepts resolved theme and emits CSS vars + motion styles + font links.
- All 10 templates — replace literal colors with `var(--…)`, add `data-anim` on section wrappers, declare `capabilities` + `defaultTheme`.
- `src/components/builder/PortfolioForm.tsx` — remove the old Theme section, mount `<StylePanel>` instead.
- `src/routes/__root.tsx` — preconnect + load the curated font set.

## Out of scope (intentionally)

- Per-section spacing controls (would explode UI complexity).
- Uploading custom fonts.
- Free-form CSS override box (footgun; user asked to "drive" animations, not to write CSS).
- Dark-mode toggle separate from palette (palette is the dark-mode toggle).

## Milestones

1. Types + fonts registry + theme resolver + migration.
2. Refactor `wrapDoc` + one pilot template (Minimal-Dev) to prove the CSS-var pattern; verify export zip still runs standalone.
3. Migrate remaining 9 templates.
4. Ship `StylePanel` UI; retire old Theme fields.
5. Update AI-agent prompt so the exported prompt describes the resolved theme literally (no more "accent: #hex" only).

Estimated ~500 LOC net, mostly mechanical template edits.
