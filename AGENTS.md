<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history - force pushing, or rebasing/amending/squashing commits
> that are already pushed - as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Agent notes (Portfolio Builder)

## Product

Client-only portfolio builder: pick a template → edit config → live HTML/CSS preview → export zip / share link / AI prompt.

- Live: https://openpotfolio.lovable.app
- GitHub: https://github.com/vikast908/openpotfolio

## Key paths

| Path | Purpose |
| --- | --- |
| `src/lib/portfolio/` | Config types, Zod schema, theme, color, drafts, encode, export |
| `src/templates/` | Template registry, suites, rich-sections, suite-factory |
| `src/components/builder/` | Form, StylePanel, LivePreview, ExportDialog |
| `src/components/SiteHeader.tsx` | Shared marketing nav (Templates / Topics / About) |
| `src/routes/` | File-based routes (see `src/routes/README.md`) |

## Invariants

1. **Theme via CSS variables** - templates use `var(--bg)`, `var(--accent)`, ... from `themeCssVars`; do not hard-code palettes in template CSS without vars.
2. **Content capabilities** - every template must set `capabilities.content` (`CORE_CONTENT` or `RICH_CONTENT`). The form is driven by this; do not show PM-only fields on core templates.
3. **Fail closed on unknown template ids** - use `getTemplate`, not silent fallback, in preview/export/builder user paths.
4. **Draft hydrate before autosave** - never write `localStorage` until hydrate for that `templateId` completes (`src/lib/portfolio/draft.ts` + build route).
5. **Validate wire configs** - share hash and drafts go through `withDefaults` / Zod (`schema.ts`).
6. **Escape HTML** - all user strings through `esc()` in template renderers.

## Commands

```bash
bun install
bun run dev
bunx tsc --noEmit
bun run lint
```
