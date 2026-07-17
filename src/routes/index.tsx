import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { templates } from "@/templates/registry";
import { ArrowRight, Github, Sparkles, Download, Link as LinkIcon } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:url", content: "https://openpotfolio.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs text-muted-foreground">
          <Sparkles className="h-3 w-3" /> MIT · open source
        </span>
        <h1 className="font-display mt-8 text-6xl leading-[0.95] tracking-tight sm:text-8xl">
          Your portfolio,<br />
          <em className="not-italic text-primary">
            <span className="italic">in five</span> minutes.
          </em>
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-lg text-muted-foreground">
          Pick a template, fill one form, watch it render live. Download a static site - or hand it to Lovable,
          ChatGPT, Claude, or v0 to extend.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/templates">
              Browse templates <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/about">How it works</Link>
          </Button>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3 text-left">
          <Feature icon={<Sparkles className="h-5 w-5" />} title="Live preview">
            Side-by-side rendering updates as you type.
          </Feature>
          <Feature icon={<Download className="h-5 w-5" />} title="Static download">
            A single HTML/CSS zip. Host it anywhere. Yours forever.
          </Feature>
          <Feature icon={<LinkIcon className="h-5 w-5" />} title="AI-agent handoff">
            Copy a link + prompt into any AI coding agent to keep building.
          </Feature>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Nearly 300 templates, ready to ship</h2>
          <Link to="/templates" className="text-sm text-primary hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {templates.slice(0, 8).map((t) => (
            <Link
              key={t.meta.id}
              to="/build/$templateId"
              params={{ templateId: t.meta.id }}
              className="group rounded-xl border p-4 transition-[transform,box-shadow,border-color] duration-200 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-[var(--shadow-elegant)]"
            >
              <div className="mb-3 flex h-24 gap-1 overflow-hidden rounded-lg">
                {t.meta.swatch.map((c, i) => (
                  <div key={i} className="flex-1" style={{ background: c }} />
                ))}
              </div>
              <div className="font-medium">{t.meta.name}</div>
              <div className="text-xs text-muted-foreground">{t.meta.tagline}</div>
            </Link>
          ))}
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}

function Feature({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border p-5">
      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">{icon}</div>
      <div className="font-medium">{title}</div>
      <div className="mt-1 text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

function Nav() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-semibold tracking-tight">
          Portfolio<span className="text-primary">.</span>build
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/templates" className="text-muted-foreground hover:text-foreground">Templates</Link>
          <Link to="/topics" className="text-muted-foreground hover:text-foreground">Topics</Link>
          <Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link>
          <a
            href="https://github.com/vikast908/openpotfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-sm text-muted-foreground">
        <div>MIT licensed. Everything you generate is yours.</div>
        <Link to="/about" className="hover:text-foreground">About →</Link>
      </div>
    </footer>
  );
}
