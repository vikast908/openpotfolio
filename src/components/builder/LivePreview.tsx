import { useEffect, useMemo, useRef, useState } from "react";
import { getTemplateOrFallback } from "@/templates/registry";
import type { PortfolioConfig } from "@/lib/portfolio/types";

export function LivePreview({ config, device = "desktop" }: { config: PortfolioConfig; device?: "desktop" | "mobile" }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [debounced, setDebounced] = useState(config);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(config), 60);
    return () => clearTimeout(t);
  }, [config]);

  const html = useMemo(() => {
    return getTemplateOrFallback(debounced.templateId).render(debounced).html;
  }, [debounced]);

  return (
    <div className="flex h-full w-full items-start justify-center overflow-auto bg-muted/40 p-4">
      <iframe
        ref={iframeRef}
        title="Portfolio preview"
        srcDoc={html}
        className="h-full w-full rounded-md border bg-white shadow-sm"
        style={{
          maxWidth: device === "mobile" ? 390 : "100%",
          minHeight: 600,
        }}
        sandbox="allow-same-origin"
      />
    </div>
  );
}