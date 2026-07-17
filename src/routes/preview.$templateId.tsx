import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { defaultConfig, withDefaults, type PortfolioConfig } from "@/lib/portfolio/types";
import { getTemplate } from "@/templates/registry";
import { readHashConfig } from "@/lib/portfolio/encode";

export const Route = createFileRoute("/preview/$templateId")({
  head: ({ params }) => ({
    meta: [
      { title: `Preview - ${params.templateId}` },
      {
        name: "description",
        content: `Live preview of the ${params.templateId} portfolio template. Customize colors, typography, and content in the builder.`,
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Preview,
});

function Preview() {
  const { templateId } = Route.useParams();
  const template = getTemplate(templateId);
  const [config, setConfig] = useState<PortfolioConfig>({
    ...defaultConfig,
    templateId,
  });

  useEffect(() => {
    const fromHash = readHashConfig();
    if (fromHash) {
      setConfig(
        withDefaults({
          ...fromHash,
          templateId: fromHash.templateId ?? templateId,
        }),
      );
    } else {
      setConfig((c) => withDefaults({ ...c, templateId }));
    }
  }, [templateId]);

  const html = useMemo(() => {
    if (!template) return null;
    return template.render(config).html;
  }, [template, config]);

  if (!template) {
    return (
      <div
        style={{
          fontFamily: "system-ui, sans-serif",
          padding: "3rem",
          maxWidth: 480,
          margin: "0 auto",
        }}
      >
        <h1>Template not found</h1>
        <p>
          Unknown template id: <code>{templateId}</code>
        </p>
        <p>
          <Link to="/templates">Browse templates</Link>
        </p>
      </div>
    );
  }

  return (
    <iframe
      title="Portfolio preview"
      srcDoc={html ?? ""}
      style={{ width: "100vw", height: "100vh", border: 0 }}
      sandbox="allow-same-origin"
    />
  );
}
