import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { templates } from "@/templates/registry";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/topics")({
  head: () => ({
    meta: [
      { title: "Topics - Portfolio Builder" },
      {
        name: "description",
        content:
          "Browse portfolio templates by topic: developer, designer, product manager, writer, photographer, editorial, Apple-inspired, and more.",
      },
      { property: "og:title", content: "Topics - Portfolio Builder" },
      {
        property: "og:description",
        content: "Find your portfolio by topic and style.",
      },
      { property: "og:url", content: "https://openpotfolio.lovable.app/topics" },
    ],
    links: [{ rel: "canonical", href: "/topics" }],
  }),
  component: Topics,
});

function Topics() {
  const topics = useMemo(() => {
    const counts = new Map<string, number>();
    templates.forEach((t) =>
      t.meta.tags.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1)),
    );
    return Array.from(counts.entries()).sort(
      (a, b) => b[1] - a[1] || a[0].localeCompare(b[0]),
    );
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="font-display text-6xl leading-[0.95] tracking-tight">Topics</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {topics.length} topics across {templates.length} templates. Pick a topic to open the
          filtered template gallery, or{" "}
          <Link to="/templates" className="text-primary hover:underline">
            browse everything
          </Link>
          .
        </p>
        <div className="mt-10 flex flex-wrap gap-2">
          {topics.map(([tag, count]) => (
            <Link
              key={tag}
              to="/templates"
              search={{ tag }}
              className="group inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-sm transition-colors hover:border-foreground/40 hover:bg-accent"
            >
              <span className="font-medium">{tag}</span>
              <span className="text-xs text-muted-foreground">{count}</span>
            </Link>
          ))}
        </div>
        <p className="mt-12 text-sm text-muted-foreground">
          New here? Read{" "}
          <Link to="/about" className="text-primary hover:underline">
            how the builder works
          </Link>
          .
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
