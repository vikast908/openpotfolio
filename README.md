# Portfolio.build

An open-source portfolio builder. Pick from **297** templates, fill in your details, tweak colors / fonts / motion, and export a ready-to-ship site — as a zip, a shareable link, or a prompt you paste into any AI coding agent.

**Live:** https://openpotfolio.lovable.app  
**Repo:** https://github.com/vikast908/openpotfolio

## Features

- **297 templates** across Minimal, Terminal, Editorial (5×27), Apple-inspired (5×30), Bento, and role-specific suites (PM, Designer, Photographer, Writer, Consultant, Academic, Freelancer, Studio).
- **Deep customization** — full color palette, typography (68+ Google fonts, scale, weight, tracking, radius), and motion (preset, intensity, hover) with a working blur-in entrance.
- **Live side-by-side preview** with in-place iframe updates (no flicker); entrance animations play once per template mount.
- **Capability-aware form** — templates declare `content` capabilities so the builder only shows fields that template can render (e.g. case studies for PM templates, not for Minimal Dev).
- **Rich content model** (where supported) — case studies, skill groups, achievements, testimonials, writing, résumé / CTA.
- **Accessibility** — WCAG contrast reporter for text/background and text-on-accent pairs.
- **Three export modes** — static-site zip, shareable URL (config in the hash), or AI-agent prompt (Lovable / ChatGPT / Claude / v0).
- **No accounts, no server storage** — drafts in `localStorage` per template; share links are fully client-side.

## Pages

| Path | Description |
| --- | --- |
| `/` | Landing |
| `/templates` | Browse / search / filter by tag (`?tag=pm`) |
| `/topics` | All tags with counts → filtered template list |
| `/about` | How it works, contributing, license |
| `/build/$templateId` | Builder (form + style + live preview + export) |
| `/preview/$templateId` | Full-viewport preview (supports `#c=` share config) |
| `/sitemap.xml` | Sitemap |

## Tech stack

- TanStack Start (React 19, Vite 8)
- Tailwind CSS v4
- shadcn/ui
- Zod (share-link / draft config validation)
- jszip for exports
- Deployed on Cloudflare Workers via Lovable

## Getting started

```bash
bun install
bun run dev
```

Then open http://localhost:8080.

```bash
bunx tsc --noEmit   # typecheck
bun run lint        # eslint + prettier
bun run build       # production build
```

## Architecture (short)

```
PortfolioConfig  →  Template.render(config)  →  { html, css }
                         ↑
              resolveTheme(config.theme, template.defaults)
              theme CSS variables + motionCss
```

| Module | Role |
| --- | --- |
| `src/lib/portfolio/types.ts` | `PortfolioConfig`, `withDefaults` |
| `src/lib/portfolio/schema.ts` | Zod wire schema for encode / drafts |
| `src/lib/portfolio/theme.ts` | CSS vars + motion |
| `src/lib/portfolio/color.ts` | Shared WCAG contrast math |
| `src/lib/portfolio/draft.ts` | Per-template localStorage drafts |
| `src/templates/types.ts` | `Template`, style + **content** capabilities |
| `src/templates/suite-factory.ts` | Cartesian layout × palette suites |
| `src/templates/rich-sections.ts` | Shared PM / consultant HTML fragments |
| `src/templates/registry.ts` | `getTemplate` (fail closed) |

### Adding a template

1. Add `src/templates/my-template.ts` exporting a `Template` with `meta`, `defaults`, `capabilities` (include `content: CORE_CONTENT` or `RICH_CONTENT`), and `render`.
2. Register it in `src/templates/registry.ts`.
3. Prefer CSS variables (`var(--bg)`, `var(--accent)`, …) and `renderWithTheme` from `src/templates/types.ts`.

Suite templates (Apple / Editorial) go through `makeSuite` — add a layout or palette there instead of a one-off file.

## License

MIT. Everything you generate with the builder is yours. Exported zips include an MIT `LICENSE` naming you as copyright holder.
