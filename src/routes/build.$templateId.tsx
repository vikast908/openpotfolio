import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { defaultConfig, withDefaults, type PortfolioConfig } from "@/lib/portfolio/types";
import { getTemplate, templates } from "@/templates/registry";
import { PortfolioForm } from "@/components/builder/PortfolioForm";
import { LivePreview } from "@/components/builder/LivePreview";
import { ExportDialog } from "@/components/builder/ExportDialog";
import { readHashConfig } from "@/lib/portfolio/encode";
import { Button } from "@/components/ui/button";
import { Monitor, Smartphone, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/build/$templateId")({
  head: ({ params }) => ({
    meta: [
      { title: `Build — ${params.templateId} · Portfolio Builder` },
      { name: "description", content: "Fill in your details and watch your portfolio render live." },
    ],
  }),
  component: Builder,
});

function Builder() {
  const { templateId } = Route.useParams();
  const navigate = useNavigate();
  const template = getTemplate(templateId);

  const [config, setConfig] = useState<PortfolioConfig>(() => ({ ...defaultConfig, templateId }));
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from URL hash or localStorage after mount
  useEffect(() => {
    const fromHash = readHashConfig();
    if (fromHash) {
      setConfig(withDefaults({ ...fromHash, templateId: fromHash.templateId ?? templateId }));
    } else {
      try {
        const raw = localStorage.getItem(`portfolio-builder:draft:${templateId}`);
        if (raw) setConfig(withDefaults({ ...JSON.parse(raw), templateId }));
      } catch {}
    }
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateId]);

  // Autosave
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(`portfolio-builder:draft:${templateId}`, JSON.stringify(config));
    } catch {}
  }, [config, templateId, hydrated]);

  if (!template) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold">Template not found</h1>
        <p className="mt-2 text-muted-foreground">Try one of these:</p>
        <div className="mt-4">
          <Link to="/templates" className="text-primary hover:underline">Browse templates →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-semibold">Portfolio<span className="text-primary">.</span>build</Link>
          <span className="text-sm text-muted-foreground">/</span>
          <select
            className="h-8 rounded-md border bg-background px-2 text-sm"
            value={templateId}
            onChange={(e) => {
              const next = e.target.value;
              setConfig((c) => ({ ...c, templateId: next }));
              navigate({ to: "/build/$templateId", params: { templateId: next } });
            }}
          >
            {templates.map((t) => (
              <option key={t.meta.id} value={t.meta.id}>{t.meta.name}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex rounded-md border">
            <button
              onClick={() => setDevice("desktop")}
              className={`p-1.5 ${device === "desktop" ? "bg-muted" : ""}`}
              aria-label="Desktop preview"
            >
              <Monitor className="h-4 w-4" />
            </button>
            <button
              onClick={() => setDevice("mobile")}
              className={`p-1.5 ${device === "mobile" ? "bg-muted" : ""}`}
              aria-label="Mobile preview"
            >
              <Smartphone className="h-4 w-4" />
            </button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (confirm("Reset all fields to the example data?")) {
                localStorage.removeItem(`portfolio-builder:draft:${templateId}`);
                setConfig({ ...defaultConfig, templateId });
              }
            }}
          >
            <RotateCcw className="h-4 w-4 mr-1.5" /> Reset
          </Button>
          <ExportDialog config={config} />
        </div>
      </header>

      <div className="grid flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[minmax(0,420px)_1fr]">
        <div className="overflow-y-auto border-r p-6">
          <PortfolioForm config={config} onChange={setConfig} />
        </div>
        <div className="hidden lg:block overflow-hidden">
          <LivePreview config={config} device={device} />
        </div>
      </div>

      <div className="lg:hidden border-t p-4 text-center text-sm text-muted-foreground">
        Open on a larger screen to see the live preview side-by-side, or export to preview.
      </div>
    </div>
  );
}