import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Portfolio Builder" },
      {
        name: "description",
        content: "How the open-source Portfolio Builder works, how to contribute a template, and why it's MIT.",
      },
      { property: "og:title", content: "About — Portfolio Builder" },
      { property: "og:description", content: "Open source, MIT, no accounts, no lock-in." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link to="/" className="font-semibold">Portfolio<span className="text-primary">.</span>build</Link>
          <Link to="/templates" className="text-sm text-muted-foreground hover:text-foreground">Templates</Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-16 prose prose-slate dark:prose-invert">
        <h1 className="text-4xl font-bold tracking-tight">About</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Portfolio Builder is an open-source, MIT-licensed tool for making a personal portfolio in five minutes.
          No accounts, no database, no lock-in — the site you generate is yours to host wherever you want.
        </p>

        <h2 className="mt-10 text-xl font-semibold">How it works</h2>
        <ol className="mt-3 space-y-2 text-muted-foreground list-decimal pl-6">
          <li>Pick one of 10 templates spanning developer, designer, writer, photographer, PM, academic, freelancer, consultant, and studio niches.</li>
          <li>Fill in one form. Every field updates the live preview instantly.</li>
          <li>Export — as a static HTML/CSS zip, as a shareable link, or as a copy-paste prompt for any AI coding agent.</li>
        </ol>

        <h2 className="mt-10 text-xl font-semibold">The AI-agent handoff</h2>
        <p className="mt-3 text-muted-foreground">
          The generated shareable link encodes your entire portfolio config in the URL fragment — nothing hits a server.
          Paste the accompanying prompt into Lovable, ChatGPT, Claude, or v0 and any of them can rebuild and extend your
          portfolio from the config.
        </p>

        <h2 className="mt-10 text-xl font-semibold">Open source & contributing templates</h2>
        <p className="mt-3 text-muted-foreground">
          Everything — the builder and every template — is MIT licensed. Templates live in <code>src/templates/</code> as
          small pure functions from <code>PortfolioConfig</code> to <code>{'{ html, css }'}</code>. Adding a new one is a
          single file and a registry entry. Plain HTML/CSS contributions are welcome — a thin adapter can wrap any static
          template.
        </p>

        <h2 className="mt-10 text-xl font-semibold">License</h2>
        <p className="mt-3 text-muted-foreground">
          MIT. Your exported zip includes its own MIT LICENSE naming you as the copyright holder.
        </p>

        <div className="mt-10 flex gap-3">
          <Link to="/templates" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Browse templates →
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            GitHub
          </a>
        </div>
      </main>
    </div>
  );
}