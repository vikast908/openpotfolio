# Routes

TanStack Start uses **file-based routing**. Every `.tsx` file in this directory
defines a route. Do **not** create `src/pages/`, `src/routes/_app/index.tsx`, or
`app/layout.tsx` - those are Next.js / Remix conventions. The only root layout
is `src/routes/__root.tsx`.

## App routes (this project)

| File | URL | Notes |
| --- | --- | --- |
| `index.tsx` | `/` | Landing |
| `templates.tsx` | `/templates` | Search + tag filter (`search.tag`) |
| `topics.tsx` | `/topics` | Tag directory → `/templates?tag=` |
| `about.tsx` | `/about` | Product / contribute / license |
| `build.$templateId.tsx` | `/build/:templateId` | Builder (noindex) |
| `preview.$templateId.tsx` | `/preview/:templateId` | Full preview (noindex) |
| `sitemap[.]xml.ts` | `/sitemap.xml` | Server-generated sitemap |

Marketing pages share `SiteHeader` / `SiteFooter` from `src/components/SiteHeader.tsx`
so **Templates**, **Topics**, and **About** stay in the nav everywhere.

## File-naming conventions

| File | URL |
| --- | --- |
| `index.tsx` | `/` |
| `about.tsx` | `/about` |
| `users/index.tsx` | `/users` |
| `users/$id.tsx` | `/users/:id` (dynamic - bare `$`, no curly braces) |
| `posts/{-$category}.tsx` | `/posts/:category?` (optional segment) |
| `files/$.tsx` | `/files/*` (splat - read via `_splat` param, never `*`) |
| `_layout.tsx` | layout route (renders children via `<Outlet />`) |
| `__root.tsx` | app shell - wraps every page; preserve `<Outlet />` |

`routeTree.gen.ts` is auto-generated. Don't edit it by hand.
