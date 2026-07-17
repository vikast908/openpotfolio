import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { defaultConfig, withDefaults, type PortfolioConfig } from "@/lib/portfolio/types";
import { getTemplate, templates } from "@/templates/registry";
import { PortfolioForm } from "@/components/builder/PortfolioForm";
import { StylePanel } from "@/components/builder/StylePanel";
import { LivePreview } from "@/components/builder/LivePreview";
import { ExportDialog } from "@/components/builder/ExportDialog";
import { readHashConfig } from "@/lib/portfolio/encode";
import { Button } from "@/components/ui/button";
import { Monitor, Smartphone, RotateCcw } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/build/$templateId")({
  head: ({ params }) => ({
    meta: [
      { title: `Build - ${params.templateId} · Portfolio Builder` },
      { name: "description", content: "Fill in your details and watch your portfolio render live." },
      { name: "robots", content: "noindex" },
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
      <h1 className="sr-only">Build your {template.meta.name} portfolio</h1>
      <header className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-semibold tracking-tight">
            Portfolio<span className="text-primary">.</span>build
          </Link>
          <span className="text-sm text-muted-foreground">/</span>
          <Select
            value={templateId}
            onValueChange={(next) => {
              setConfig((c) => ({ ...c, templateId: next }));
              navigate({ to: "/build/$templateId", params: { templateId: next } });
            }}
          >
            <SelectTrigger className="h-8 w-[220px] text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {templates.map((t) => (
                <SelectItem key={t.meta.id} value={t.meta.id}>
                  <div className="flex items-center gap-2">
                    <div className="flex h-4 w-6 overflow-hidden rounded-sm border">
                      {t.meta.swatch.map((c, i) => (
                        <div key={i} className="flex-1" style={{ background: c }} />
                      ))}
                    </div>
                    <span>{t.meta.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <DeviceToggle device={device} onChange={setDevice} />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <RotateCcw className="h-4 w-4 mr-1.5" /> Reset
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reset to example data?</AlertDialogTitle>
                <AlertDialogDescription>
                  This clears everything you've typed for the <strong>{template.meta.name}</strong> template and restores the default sample content. Your other templates aren't affected.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep my work</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    localStorage.removeItem(`portfolio-builder:draft:${templateId}`);
                    setConfig({ ...defaultConfig, templateId });
                  }}
                >
                  Reset
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <ExportDialog config={config} />
        </div>
      </header>

      <main className="grid flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[minmax(0,420px)_1fr]">
        <div className="overflow-y-auto border-r p-6">
          <PortfolioForm config={config} onChange={setConfig} />
          <div className="mt-8">
            <StylePanel config={config} template={template} onChange={setConfig} />
          </div>
        </div>
        <div className="hidden lg:block overflow-hidden">
          <LivePreview config={config} device={device} />
        </div>
      </main>

      <div className="lg:hidden border-t p-4 text-center text-sm text-muted-foreground">
        Open on a larger screen to see the live preview side-by-side, or export to preview.
      </div>
    </div>
  );
}

/** Sliding-indicator device toggle. `clip-path` reveal keeps everything on GPU. */
function DeviceToggle({
  device,
  onChange,
}: {
  device: "desktop" | "mobile";
  onChange: (d: "desktop" | "mobile") => void;
}) {
  return (
    <div className="relative hidden sm:flex rounded-md border bg-background p-0.5">
      <div
        aria-hidden
        className="absolute inset-y-0.5 w-8 rounded-[5px] bg-muted transition-transform duration-200 ease-[var(--ease-out)]"
        style={{ transform: `translateX(${device === "mobile" ? "2rem" : "0"})` }}
      />
      <button
        onClick={() => onChange("desktop")}
        className="relative z-10 flex h-7 w-8 items-center justify-center text-muted-foreground data-[active=true]:text-foreground transition-colors"
        data-active={device === "desktop"}
        aria-label="Desktop preview"
      >
        <Monitor className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={() => onChange("mobile")}
        className="relative z-10 flex h-7 w-8 items-center justify-center text-muted-foreground data-[active=true]:text-foreground transition-colors"
        data-active={device === "mobile"}
        aria-label="Mobile preview"
      >
        <Smartphone className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}