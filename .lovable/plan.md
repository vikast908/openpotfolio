# Project status (implemented)

Deep theme customization, multi-template suites, and capability-aware builder
are **shipped**. This file is kept so Lovable agents have a current map; older
milestone text is replaced by the architecture below.

## Current architecture

```
PortfolioConfig
  → withDefaults / Zod (schema.ts)     // share links + drafts
  → Template.render(config)
       resolveTheme(theme, defaults)
       themeCssVars + motionCss
       template body HTML
  → LivePreview iframe (in-place DOM updates)
  → Export: zip | #c= share URL | AI prompt
```

### Theme

Full palette (`background`, `surface`, `text`, `muted`, `border`, `accent`,
`accentText`), typography, motion presets including working **blur-in**.

Legacy wire shape `{ accent, font }` still maps in `withDefaults`.

### Content capabilities

```ts
capabilities.content: {
  caseStudies, skillGroups, achievements, testimonials,
  writing, story, cta
}
```

- `CORE_CONTENT` — basics + projects + skills + experience + socials
- `RICH_CONTENT` — PM / consultant / pm-apple / pm-editorial

Form sections mount only when the active template opts in.

### Suites

- `apple-suite.ts` — 5 layouts × 30 palettes via `makeSuite`
- `editorial-suite.ts` — 5 layouts × 27 palettes via `makeSuite`
- Shared helpers: `suite-factory.ts`, `shared.ts`, `rich-sections.ts`

### Marketing routes

| Route | Role |
| --- | --- |
| `/` | Landing |
| `/templates` | Browse + `?tag=` filter |
| `/topics` | Tag index |
| `/about` | Docs-style about page |

Nav: shared `SiteHeader` / `SiteFooter`.

## Out of scope (still)

- Per-section spacing controls
- Uploaded custom fonts
- Free-form CSS override box
- Server-side accounts / persistence

## If extending

1. New single template → `src/templates/*.ts` + registry + `content` caps.
2. New suite layout → add to `LAYOUTS` in apple/editorial suite.
3. New rich field → type + schema + form (gated by capability) + rich-sections HTML.
