# Portfolio.build

An open-source portfolio builder. Pick from 300+ templates, fill in your details, tweak colors / fonts / motion, and export a ready-to-ship site — as a zip, a shareable link, or a prompt you paste into any AI coding agent.

Live: https://openpotfolio.lovable.app

## Features

- **300+ templates** across Minimal, Terminal, Editorial, Apple-inspired, Bento, and role-specific suites (PM, Designer, Photographer, Writer, Consultant, Academic, Freelancer, Studio).
- **Deep customization** — full color palette, typography (68+ Google fonts, scale, weight, tracking, radius), and motion (preset, intensity, hover).
- **Live side-by-side preview** with no flicker; one-shot animation replays on edit.
- **Rich content model** — case studies (Context / Problem / Strategy / Results / Lessons), skill groups, achievements, testimonials, résumé link.
- **Accessibility** — built-in WCAG contrast reporter for foreground/background and text/accent pairs.
- **Three export modes** — download a static-site zip, copy a shareable link that restores your config, or copy a prompt to hand off to any AI coding agent.
- **No accounts, no tracking, one-shot** — your config lives in the URL.

## Tech stack

- TanStack Start (React 19, Vite 7)
- Tailwind CSS v4
- shadcn/ui
- jszip for exports
- Deployed on Cloudflare Workers via Lovable

## Getting started

```bash
bun install
bun run dev
```

Then open http://localhost:8080.

## Contributing templates

Templates live under `src/templates/`. Each template is a plain object that renders HTML from a shared `PortfolioConfig` and consumes CSS variables (`var(--color-bg)`, `var(--font-display)`, etc.) so the theme system works automatically.

- **React-style factories** power the Apple, Editorial, and PM suites — see `src/templates/apple-suite.ts` and `editorial-suite.ts`.
- **Plain HTML templates** are also welcome — see `src/templates/minimal-dev.ts` for the minimal shape.

PRs adding new templates, palettes, or fonts are very welcome.

## License

MIT. Everything you generate with the builder is yours.