import { useEffect, useRef, useState } from "react";
import { getTemplate } from "@/templates/registry";
import type { PortfolioConfig } from "@/lib/portfolio/types";

/**
 * Preview that mutates the iframe document in place instead of swapping
 * `srcDoc` - no white flash, no reload, no scroll reset while typing.
 *
 * Only the templateId change forces a full re-mount (structure & <head>
 * differ across templates so we accept the reload there).
 */
export function LivePreview({
  config,
  device = "desktop",
}: {
  config: PortfolioConfig;
  device?: "desktop" | "mobile";
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const currentTemplateId = useRef(config.templateId);
  const [debounced, setDebounced] = useState(config);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(config), 40);
    return () => clearTimeout(t);
  }, [config]);

  useEffect(() => {
    const frame = iframeRef.current;
    if (!frame) return;

    const template = getTemplate(debounced.templateId);
    if (!template) {
      frame.srcdoc = `<!doctype html><html><body style="font-family:system-ui;padding:2rem;color:#444">
        <h1>Template not found</h1>
        <p>Unknown template id: <code>${debounced.templateId}</code></p>
      </body></html>`;
      return;
    }

    const { html } = template.render(debounced);

    const templateChanged = currentTemplateId.current !== debounced.templateId;
    currentTemplateId.current = debounced.templateId;

    const doc = frame.contentDocument;
    const needsFullWrite =
      !doc ||
      templateChanged ||
      !doc.body ||
      !doc.body.hasChildNodes() ||
      !doc.querySelector("style");
    // First mount OR template switch: write via srcdoc so browser guarantees load.
    if (needsFullWrite) {
      frame.srcdoc = html;
      return;
    }

    // Same template, content changed → mutate in place.
    const parser = new DOMParser();
    const next = parser.parseFromString(html, "text/html");
    const nextStyle = next.querySelector("style")?.textContent ?? "";
    // Strip data-anim on in-place mutations so entrance animations
    // don't replay on every keystroke while editing.
    next.body.querySelectorAll("[data-anim]").forEach((el) => el.removeAttribute("data-anim"));
    const nextBody = next.body.innerHTML;

    let styleTag = doc.querySelector("style");
    if (!styleTag) {
      styleTag = doc.createElement("style");
      doc.head.appendChild(styleTag);
    }
    if (styleTag.textContent !== nextStyle) styleTag.textContent = nextStyle;
    if (doc.body.innerHTML !== nextBody) doc.body.innerHTML = nextBody;
  }, [debounced]);

  return (
    <div className="flex h-full w-full items-start justify-center overflow-auto bg-muted/40 p-6">
      <iframe
        ref={iframeRef}
        title="Portfolio preview"
        className="h-full w-full rounded-xl border bg-white transition-[max-width] duration-300 ease-[var(--ease-out)]"
        style={{
          maxWidth: device === "mobile" ? 390 : "100%",
          minHeight: 640,
          boxShadow: "var(--shadow-elegant)",
        }}
        sandbox="allow-same-origin"
      />
    </div>
  );
}
