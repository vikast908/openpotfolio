import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { defaultConfig, withDefaults, type PortfolioConfig } from "@/lib/portfolio/types";
import { getTemplateOrFallback } from "@/templates/registry";
import { readHashConfig } from "@/lib/portfolio/encode";

export const Route = createFileRoute("/preview/$templateId")({
  head: ({ params }) => ({
    meta: [
      { title: `Preview — ${params.templateId}` },
      { name: "description", content: `Live preview of the ${params.templateId} portfolio template. Customize colors, typography, and content in the builder.` },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Preview,
});

function Preview() {
  const { templateId } = Route.useParams();
  const [config, setConfig] = useState<PortfolioConfig>({ ...defaultConfig, templateId });

  useEffect(() => {
    const fromHash = readHashConfig();
    if (fromHash) setConfig(withDefaults({ ...fromHash, templateId: fromHash.templateId ?? templateId }));
  }, [templateId]);

  const html = useMemo(() => getTemplateOrFallback(templateId).render(config).html, [templateId, config]);

  return (
    <iframe
      title="Portfolio preview"
      srcDoc={html}
      style={{ width: "100vw", height: "100vh", border: 0 }}
      sandbox="allow-same-origin"
    />
  );
}