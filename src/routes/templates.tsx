import { createFileRoute, Link } from "@tanstack/react-router";
import { templates } from "@/templates/registry";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Templates — Portfolio Builder" },
      { name: "description", content: "10 open-source portfolio templates. Pick one and start building." },
      { property: "og:title", content: "Templates — Portfolio Builder" },
      { property: "og:description", content: "10 open-source portfolio templates. Pick one and start building." },
    ],
  }),
  component: Templates,
});

function Templates() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="font-semibold">Portfolio<span className="text-primary">.</span>build</Link>
          <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">About</Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-4xl font-bold tracking-tight">Pick a template</h1>
        <p className="mt-2 text-muted-foreground">Click any card to open it in the builder with example data. Change anything, then export.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((t) => (
            <Link
              key={t.meta.id}
              to="/build/$templateId"
              params={{ templateId: t.meta.id }}
              className="group overflow-hidden rounded-xl border transition hover:border-primary hover:shadow-md"
            >
              <div className="flex h-40">
                {t.meta.swatch.map((c, i) => (
                  <div key={i} className="flex-1 transition-all group-hover:flex-[1.1]" style={{ background: c }} />
                ))}
              </div>
              <div className="p-4">
                <div className="font-medium">{t.meta.name}</div>
                <div className="mt-1 text-sm text-muted-foreground">{t.meta.tagline}</div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {t.meta.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}