
# Portfolio Builder — v1 Plan

An open-source (MIT) web app where anyone can pick a portfolio template, fill in their details in a single form, watch it render live side-by-side, and then either **download a static HTML/CSS zip** or **copy a shareable link + prompt** they can paste into any AI coding agent (Lovable, ChatGPT, Claude, Cursor) to rebuild/extend it.

No accounts, no backend, no database. Everything lives client-side in the URL + localStorage.

## User flow

```text
┌─────────────────────────────────────────────────────────────┐
│  1. Landing (/)                                             │
│     Hero + "Browse templates" + example screenshots         │
├─────────────────────────────────────────────────────────────┤
│  2. Template gallery (/templates)                           │
│     Grid of 10+ thumbnails, filter by tag                   │
├─────────────────────────────────────────────────────────────┤
│  3. Builder (/build/$templateId)                            │
│     ┌──────────────┬──────────────────────────────┐         │
│     │  Form (L)    │  Live preview (R, iframe)    │         │
│     │  name, bio,  │  updates on every keystroke  │         │
│     │  projects[], │                              │         │
│     │  skills[],   │  [Change template] [Export]  │         │
│     │  socials,    │                              │         │
│     │  theme       │                              │         │
│     └──────────────┴──────────────────────────────┘         │
├─────────────────────────────────────────────────────────────┤
│  4. Export dialog                                           │
│     • Download .zip (index.html, styles.css, LICENSE, README)│
│     • Copy shareable link (config encoded in URL hash)      │
│     • Copy AI-agent prompt ("Build me this portfolio: ...")│
│     • Open link in Lovable / ChatGPT / Claude / Cursor      │
└─────────────────────────────────────────────────────────────┘
```

## Pages / routes

- `/` — landing
- `/templates` — gallery
- `/build/$templateId` — form + live preview + export
- `/about` — what this project is, MIT, GitHub link, how to contribute a template
- `/preview/$templateId` — fullscreen preview (for gallery hover / share link target for humans opening a shared URL without the builder chrome)

## Data model (single `PortfolioConfig`)

One TypeScript type shared by every template and by the AI-agent prompt schema:

```ts
type PortfolioConfig = {
  name: string;
  headline: string;         // "Frontend engineer" etc.
  bio: string;              // 1–3 paragraphs
  avatarUrl?: string;
  location?: string;
  email?: string;
  socials: { label: string; url: string }[];
  skills: string[];
  projects: {
    title: string;
    description: string;
    url?: string;
    imageUrl?: string;
    tags: string[];
  }[];
  experience?: { role: string; company: string; period: string; summary?: string }[];
  theme: { accent: string; font: "sans" | "serif" | "mono" };
  templateId: string;
};
```

## Templates (10 for v1)

React components in-repo under `src/templates/<id>/index.tsx`, each exporting:

```ts
export default function Template(props: { config: PortfolioConfig }): JSX.Element
export const meta = { id, name, tags, thumbnail };
export function toStaticHtml(config: PortfolioConfig): { html: string; css: string };
```

The same component renders the live preview AND, via `toStaticHtml`, the exported static files (no React runtime in the export). Templates registered in `src/templates/registry.ts`.

Starter set spanning niches:
1. Minimal / Developer (mono, dark)
2. Terminal (CLI-styled)
3. Creative / Designer (bold type, image-heavy)
4. Photographer (masonry)
5. Writer / Journalist (serif, long-form)
6. Consultant / Professional (clean, corporate)
7. Product Manager (case-study layout)
8. Academic / Researcher (publication list)
9. Freelancer (services + pricing)
10. Studio / Multidisciplinary (bento grid)

Contribution model: the built-in 10 are React. A `docs/CONTRIBUTING-TEMPLATES.md` documents the interface and shows how to add a template as either (a) a React component or (b) a plain HTML/CSS folder wrapped by a small React adapter.

## Live preview

- Right pane is a sandboxed `<iframe srcDoc={...}>` rendering the current template with the current config (or a same-window portal if perf is fine).
- Debounced ~50 ms so typing feels instant.
- Device-size toggle (desktop / mobile) in the preview header.

## Export

Client-side only:
- **Zip download**: use `jszip` to bundle `index.html`, `styles.css`, `assets/…`, `LICENSE` (MIT), `README.md` (credits + rebuild instructions). Blob → `<a download>`.
- **Shareable link**: `location.origin + '/build/<templateId>#c=<base64url(json)>'` — config in the hash so it never hits any server. `/build/*` reads the hash on mount to prefill the form.
- **AI-agent prompt**: templated string like:
  > "Build me a personal portfolio website. Use the config JSON at <link>. Match the '<templateId>' template layout. Keep it a single static HTML/CSS page. MIT licensed."
  Copy button + one-click deep links to Lovable, ChatGPT, Claude, Cursor with the prompt pre-filled where each supports it.
- Big config → fallback: "Link too long — download the JSON instead" button.

## Persistence

- Every keystroke autosaves to `localStorage` under `portfolio-builder:draft:<templateId>`.
- "Reset" button clears it.
- No accounts, no Lovable Cloud in v1.

## Open source

- MIT `LICENSE` at repo root.
- `README.md` explains the project, screenshots, how to run, how to add a template.
- Exported zips include their own MIT `LICENSE` naming the end user as copyright holder.
- Footer + `/about` link to the GitHub repo (URL to be filled in when repo exists).

## Tech / files

- Stack: TanStack Start (already scaffolded), Tailwind v4, shadcn.
- New deps: `jszip` (zip export). Everything else stays in-project.
- New files (indicative):
  - `src/lib/portfolio/types.ts` — `PortfolioConfig`
  - `src/lib/portfolio/encode.ts` — base64url encode/decode of config for URL hash
  - `src/lib/portfolio/export-zip.ts` — build + trigger zip download
  - `src/lib/portfolio/agent-prompt.ts` — build the AI-agent prompt string + deep links
  - `src/templates/registry.ts` + `src/templates/<id>/index.tsx` × 10
  - `src/components/builder/PortfolioForm.tsx`
  - `src/components/builder/LivePreview.tsx`
  - `src/components/builder/ExportDialog.tsx`
  - `src/routes/index.tsx` (rewrite placeholder → landing)
  - `src/routes/templates.tsx`
  - `src/routes/build.$templateId.tsx`
  - `src/routes/preview.$templateId.tsx`
  - `src/routes/about.tsx`
  - Head metadata per route.

## Out of scope for v1 (called out so we don't scope-creep)

- Accounts, saved portfolios, versioning.
- Hosting the generated site (users download or hand off to an AI agent).
- Custom domain / one-click deploy.
- WYSIWYG drag-and-drop editor.
- Template marketplace UI (contributions go through GitHub PR).
- i18n.

## Milestones

1. **Scaffolding** — routes, `PortfolioConfig` type, registry, form shell, live-preview iframe, one placeholder template. Landing + templates gallery reading from registry.
2. **Template pack** — build out all 10 templates + their `toStaticHtml`. Thumbnails auto-render from `/preview/$templateId`.
3. **Export** — zip download, shareable link (hash config), AI-agent prompt + deep links, autosave.
4. **Polish** — SEO metadata per route, `/about` + MIT + contribution docs, empty states, mobile responsive builder (form on top, preview below).

Ready to build on approval.
