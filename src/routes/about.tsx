import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";
import { templates } from "@/templates/registry";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About - Portfolio Builder" },
      {
        name: "description",
        content:
          "How the open-source Portfolio Builder works, how to contribute a template, and why it's MIT.",
      },
      { property: "og:title", content: "About - Portfolio Builder" },
      {
        property: "og:description",
        content: "Open source, MIT, no accounts, no lock-in.",
      },
      { property: "og:url", content: "https://openpotfolio.lovable.app/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader maxWidthClass="max-w-3xl" />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-bold tracking-tight">About</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Portfolio Builder is an open-source, MIT-licensed tool for making a personal portfolio
          in five minutes. No accounts, no database, no lock-in — the site you generate is yours
          to host wherever you want.
        </p>

        <h2 className="mt-10 text-xl font-semibold">How it works</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-6 text-muted-foreground">
          <li>
            Pick from <strong>{templates.length} templates</strong> spanning developer, designer,
            writer, photographer, product manager, academic, freelancer, consultant, and studio
            niches — including full Apple-inspired and editorial suites. Browse the{" "}
            <Link to="/templates" className="text-primary hover:underline">
              gallery
            </Link>{" "}
            or jump in via{" "}
            <Link to="/topics" className="text-primary hover:underline">
              topics
            </Link>
            .
          </li>
          <li>
            Fill one form. The builder is <strong>capability-aware</strong>: each template
            declares which content it can render (case studies, testimonials, skill groups, …), so
            you only edit fields that will show up in the preview and export.
          </li>
          <li>
            Tune every color, font, radius, and motion preset in the style panel — with a live
            WCAG contrast check as you go. Motion includes fade, rise, stagger, and blur-in.
          </li>
          <li>
            Export as a static HTML/CSS zip, a shareable link (config lives in the URL fragment),
            or a copy-paste prompt for Lovable, ChatGPT, Claude, or v0.
          </li>
        </ol>

        <h2 className="mt-10 text-xl font-semibold">Deep customization</h2>
        <p className="mt-3 text-muted-foreground">
          Every template renders through a CSS-variable theme system, so you drive it —
          foreground and background, accent and muted colors, 68+ curated Google Fonts, type
          scale, letter-spacing, radius, and motion (preset, intensity, hover). One-click palettes
          get you started; the contrast reporter keeps you accessible.
        </p>

        <h2 className="mt-10 text-xl font-semibold">Drafts &amp; share links</h2>
        <p className="mt-3 text-muted-foreground">
          While you edit, drafts autosave to your browser per template. Shareable links encode the
          full config (validated on load) so nothing hits a server. Switching templates never
          overwrites another template&apos;s draft mid-hydrate.
        </p>

        <h2 className="mt-10 text-xl font-semibold">The AI-agent handoff</h2>
        <p className="mt-3 text-muted-foreground">
          Paste the export prompt into Lovable, ChatGPT, Claude, or v0 and any of them can rebuild
          and extend your portfolio from the config and live preview link.
        </p>

        <h2 className="mt-10 text-xl font-semibold">Open source &amp; contributing templates</h2>
        <p className="mt-3 text-muted-foreground">
          Everything — the builder and every template — is MIT licensed. Templates live in{" "}
          <code className="rounded bg-muted px-1 text-sm">src/templates/</code> as pure functions
          from <code className="rounded bg-muted px-1 text-sm">PortfolioConfig</code> to{" "}
          <code className="rounded bg-muted px-1 text-sm">{`{ html, css }`}</code>. Each template
          must declare style + content capabilities. Apple / Editorial suites use{" "}
          <code className="rounded bg-muted px-1 text-sm">makeSuite</code>; PM-style templates
          reuse <code className="rounded bg-muted px-1 text-sm">rich-sections.ts</code>. See the
          repo README for the full map.
        </p>

        <h2 className="mt-10 text-xl font-semibold">License</h2>
        <p className="mt-3 text-muted-foreground">
          MIT. Your exported zip includes its own MIT LICENSE naming you as the copyright holder.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/templates"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Browse templates →
          </Link>
          <Link
            to="/topics"
            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            Browse topics
          </Link>
          <a
            href="https://github.com/vikast908/openpotfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            GitHub
          </a>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
