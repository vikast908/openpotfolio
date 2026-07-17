import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { templates } from "@/templates/registry";
import { Input } from "@/components/ui/input";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/templates")({
  validateSearch: (search: Record<string, unknown>) => ({
    tag: typeof search.tag === "string" ? search.tag : undefined,
  }),
  head: () => ({
    meta: [
      { title: `${templates.length} portfolio templates - Portfolio Builder` },
      {
        name: "description",
        content: `Browse ${templates.length} open-source portfolio templates for developers, designers, PMs, writers, photographers, and more. Fully customizable.`,
      },
      {
        property: "og:title",
        content: `${templates.length} portfolio templates - Portfolio Builder`,
      },
      {
        property: "og:description",
        content: `Browse ${templates.length} open-source portfolio templates. Fully customizable.`,
      },
      { property: "og:url", content: "https://openpotfolio.lovable.app/templates" },
    ],
    links: [{ rel: "canonical", href: "/templates" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Portfolio templates",
          url: "https://openpotfolio.lovable.app/templates",
          description: "Open-source portfolio templates.",
        }),
      },
    ],
  }),
  component: Templates,
});

function Templates() {
  const { tag: tagFromUrl } = Route.useSearch();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<string>(tagFromUrl ?? "all");

  // Keep filter in sync when arriving from /topics? or browser back/forward.
  useEffect(() => {
    setTag(tagFromUrl ?? "all");
  }, [tagFromUrl]);

  const allTags = useMemo(() => {
    const s = new Set<string>();
    templates.forEach((t) => t.meta.tags.forEach((x) => s.add(x)));
    return ["all", ...Array.from(s).sort()];
  }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return templates.filter((t) => {
      if (tag !== "all" && !t.meta.tags.includes(tag)) return false;
      if (!needle) return true;
      const hay = `${t.meta.name} ${t.meta.tagline} ${t.meta.tags.join(" ")}`.toLowerCase();
      return hay.includes(needle);
    });
  }, [q, tag]);

  const selectTag = (next: string) => {
    setTag(next);
    navigate({
      to: "/templates",
      search: next === "all" ? {} : { tag: next },
      replace: true,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="font-display text-6xl leading-[0.95] tracking-tight">Pick a template</h1>
        <p className="mt-2 text-muted-foreground">
          {templates.length} open-source templates. Every color, font, and animation is
          customizable. Prefer browsing by theme?{" "}
          <Link to="/topics" className="text-primary hover:underline">
            See all topics →
          </Link>
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Input
            placeholder="Search templates by name, style, or tag…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="sm:max-w-sm"
          />
          <div className="text-xs text-muted-foreground">
            {filtered.length} of {templates.length}
            {tag !== "all" ? (
              <>
                {" "}
                · tag <strong>{tag}</strong>
              </>
            ) : null}
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {allTags.slice(0, 40).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => selectTag(t)}
              className={`rounded-full border px-2.5 py-0.5 text-xs transition-colors ${
                tag === t
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
          {allTags.length > 40 && (
            <Link
              to="/topics"
              className="rounded-full border border-dashed px-2.5 py-0.5 text-xs text-muted-foreground hover:border-foreground/40 hover:text-foreground"
            >
              +{allTags.length - 40} more on Topics
            </Link>
          )}
        </div>
        {filtered.length === 0 ? (
          <div className="mt-16 rounded-xl border border-dashed p-12 text-center text-muted-foreground">
            No templates match those filters.{" "}
            <button
              type="button"
              onClick={() => {
                setQ("");
                selectTag("all");
              }}
              className="text-primary underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t) => (
              <Link
                key={t.meta.id}
                to="/build/$templateId"
                params={{ templateId: t.meta.id }}
                className="group overflow-hidden rounded-xl border transition-[transform,box-shadow,border-color] duration-200 ease-[var(--ease-out)] hover:-translate-y-1 hover:border-foreground/20 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="flex h-40 overflow-hidden">
                  {t.meta.swatch.map((c, i) => (
                    <div
                      key={i}
                      className="flex-1 transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-y-105"
                      style={{ background: c, transformOrigin: "bottom" }}
                    />
                  ))}
                </div>
                <div className="p-4">
                  <div className="font-medium">{t.meta.name}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{t.meta.tagline}</div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {t.meta.tags.map((tg) => (
                      <span
                        key={tg}
                        className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        {tg}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
