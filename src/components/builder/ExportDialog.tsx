import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Link as LinkIcon, Sparkles, Copy, Check } from "lucide-react";
import type { PortfolioConfig } from "@/lib/portfolio/types";
import { downloadZip } from "@/lib/portfolio/export-zip";
import { buildShareUrl } from "@/lib/portfolio/encode";
import { agentTargets, buildAgentPrompt } from "@/lib/portfolio/agent-prompt";

export function ExportDialog({ config }: { config: PortfolioConfig }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const url = open ? buildShareUrl(config) : "";
  const prompt = open ? buildAgentPrompt(config) : "";

  const copy = async (label: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Export</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Export your portfolio</DialogTitle>
          <DialogDescription>
            Download a static HTML/CSS site, or hand it off to any AI coding agent.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="zip">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="zip"><Download className="h-4 w-4 mr-1.5" />Download</TabsTrigger>
            <TabsTrigger value="link"><LinkIcon className="h-4 w-4 mr-1.5" />Shareable link</TabsTrigger>
            <TabsTrigger value="ai"><Sparkles className="h-4 w-4 mr-1.5" />AI agent</TabsTrigger>
          </TabsList>

          <TabsContent value="zip" className="space-y-3 pt-4">
            <p className="text-sm text-muted-foreground">
              A zip with <code>index.html</code>, <code>portfolio.json</code>, MIT <code>LICENSE</code>, and a README.
              Drop it on any static host.
            </p>
            <Button onClick={() => downloadZip(config)} className="w-full">
              <Download className="h-4 w-4 mr-2" /> Download .zip
            </Button>
          </TabsContent>

          <TabsContent value="link" className="space-y-3 pt-4">
            <p className="text-sm text-muted-foreground">
              Config is encoded in the URL fragment - nothing hits any server. Send this to anyone to open the same builder pre-filled.
            </p>
            <div className="flex gap-2">
              <Input value={url} readOnly onFocus={(e) => e.currentTarget.select()} />
              <Button variant="secondary" onClick={() => copy("link", url)}>
                {copied === "link" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            {url.length > 6000 && (
              <p className="text-xs text-amber-600">
                This link is long. Some chat apps truncate very long URLs - the .zip is a reliable fallback.
              </p>
            )}
          </TabsContent>

          <TabsContent value="ai" className="space-y-3 pt-4">
            <p className="text-sm text-muted-foreground">
              Copy the prompt below into any AI coding agent, or open one directly:
            </p>
            <Textarea value={prompt} readOnly rows={7} className="font-mono text-xs" />
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" onClick={() => copy("prompt", prompt)}>
                {copied === "prompt" ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                Copy prompt
              </Button>
              {agentTargets.map((a) => (
                <a
                  key={a.id}
                  href={a.buildUrl(prompt)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center rounded-md border bg-background px-3 text-sm font-medium hover:bg-accent"
                >
                  Open in {a.label} ↗
                </a>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}