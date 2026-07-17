import { useMemo } from "react";
import type {
  PortfolioConfig,
  PortfolioColorRole,
  MotionPreset,
  HoverPreset,
  TrackingPreset,
} from "@/lib/portfolio/types";
import type { Template } from "@/templates/types";
import { FONTS, type FontEntry } from "@/lib/portfolio/fonts";
import { resolveTheme } from "@/lib/portfolio/theme";
import { PALETTE_PRESETS, type PalettePreset } from "@/lib/portfolio/palettes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RotateCcw, AlertTriangle, CheckCircle2 } from "lucide-react";

type Props = {
  config: PortfolioConfig;
  template: Template;
  onChange: (c: PortfolioConfig) => void;
};

const roleLabels: Record<PortfolioColorRole, string> = {
  background: "Background",
  surface: "Cards / Surface",
  text: "Text",
  muted: "Muted / Meta",
  border: "Border",
  accent: "Accent",
  accentText: "Text on accent",
};

const trackingOptions: TrackingPreset[] = ["tight", "normal", "wide"];
const hoverOptions: HoverPreset[] = ["none", "lift", "underline", "tilt"];
const motionLabels: Record<MotionPreset, string> = {
  none: "None",
  fade: "Fade",
  rise: "Rise",
  "stagger-rise": "Stagger",
  "blur-in": "Blur",
};

export function StylePanel({ config, template, onChange }: Props) {
  const resolved = useMemo(
    () => resolveTheme(config.theme, template.defaults),
    [config.theme, template.defaults],
  );

  const setTheme = (updater: (t: PortfolioConfig["theme"]) => PortfolioConfig["theme"]) =>
    onChange({ ...config, theme: updater(config.theme) });

  const setColor = (role: PortfolioColorRole, value: string) =>
    setTheme((t) => ({ ...t, colors: { ...t.colors, [role]: value } }));

  const applyPalette = (p: PalettePreset) =>
    setTheme((t) => ({ ...t, colors: { ...p.colors } }));

  const setTypo = <K extends keyof typeof resolved.typography>(
    key: K,
    value: (typeof resolved.typography)[K],
  ) => setTheme((t) => ({ ...t, typography: { ...t.typography, [key]: value } }));

  const setMotion = <K extends keyof typeof resolved.motion>(
    key: K,
    value: (typeof resolved.motion)[K],
  ) => setTheme((t) => ({ ...t, motion: { ...t.motion, [key]: value } }));

  const resetAll = () => setTheme(() => ({ colors: {}, typography: {}, motion: {} }));

  const availableFonts: FontEntry[] = template.capabilities.fontFilter
    ? FONTS.filter(template.capabilities.fontFilter)
    : FONTS;

  const c = template.capabilities;

  const contrast = getContrastReport(resolved.colors.text, resolved.colors.background);
  const accentContrast = getContrastReport(
    resolved.colors.accentText,
    resolved.colors.accent,
  );

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Style
        </h3>
        <Button variant="ghost" size="sm" onClick={resetAll} className="text-xs">
          <RotateCcw className="h-3 w-3 mr-1" />
          Reset style
        </Button>
      </div>

      <Tabs defaultValue="colors" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="type">Type</TabsTrigger>
          <TabsTrigger value="motion">Motion</TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-3 pt-3">
          <div className="space-y-1.5">
            <Label className="text-[11px] text-muted-foreground">One-click palette</Label>
            <div className="grid grid-cols-4 gap-1.5">
              {PALETTE_PRESETS.map((p) => (
                <button
                  key={p.key}
                  onClick={() => applyPalette(p)}
                  title={`${p.name} · ${p.category}`}
                  className="group relative flex h-9 overflow-hidden rounded border transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.04] hover:border-primary/60 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-1"
                  aria-label={`Apply ${p.name} palette`}
                >
                  <span className="flex-1" style={{ background: p.colors.background }} />
                  <span className="flex-1" style={{ background: p.colors.surface }} />
                  <span className="flex-1" style={{ background: p.colors.text }} />
                  <span className="flex-1" style={{ background: p.colors.accent }} />
                </button>
              ))}
            </div>
          </div>
          <div className="h-px bg-border/60 my-2" />
          {c.colorRoles.map((role) => (
            <div key={role} className="flex items-center gap-2">
              <input
                type="color"
                value={resolved.colors[role]}
                onChange={(e) => setColor(role, e.target.value)}
                className="h-9 w-10 shrink-0 cursor-pointer rounded border bg-transparent"
                aria-label={roleLabels[role]}
              />
              <div className="min-w-0 flex-1">
                <Label className="text-[11px] text-muted-foreground">
                  {roleLabels[role]}
                </Label>
                <Input
                  value={resolved.colors[role]}
                  onChange={(e) => setColor(role, e.target.value)}
                  className="h-7 font-mono text-xs"
                />
              </div>
            </div>
          ))}
          <div className="mt-3 space-y-1.5 rounded border border-border/60 bg-muted/30 p-2.5">
            <div className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Accessibility
            </div>
            <ContrastRow label="Text on background" report={contrast} />
            <ContrastRow label="Text on accent" report={accentContrast} />
          </div>
        </TabsContent>

        <TabsContent value="type" className="space-y-4 pt-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Heading font</Label>
            <FontSelect
              fonts={availableFonts}
              value={resolved.typography.headingFont}
              onChange={(v) => setTypo("headingFont", v)}
              variant="heading"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Body font</Label>
            <FontSelect
              fonts={availableFonts}
              value={resolved.typography.bodyFont}
              onChange={(v) => setTypo("bodyFont", v)}
              variant="body"
            />
          </div>

          {c.supports.scale && (
            <SliderRow
              label="Text size"
              value={resolved.typography.scale}
              min={0.85}
              max={1.25}
              step={0.01}
              format={(v) => `${Math.round(v * 100)}%`}
              onChange={(v) => setTypo("scale", v)}
            />
          )}

          {c.supports.weight && (
            <div className="space-y-1.5">
              <Label className="text-xs">Heading weight</Label>
              <div className="flex flex-wrap gap-1">
                {([300, 400, 500, 600, 700, 800, 900] as const).map((w) => (
                  <button
                    key={w}
                    onClick={() => setTypo("headingWeight", w)}
                    className={`h-7 rounded border px-2 text-xs transition-[transform,background-color,border-color,color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
                      resolved.typography.headingWeight === w
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:bg-muted"
                    }`}
                    style={{ fontWeight: w }}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
          )}

          {c.supports.tracking && (
            <div className="space-y-1.5">
              <Label className="text-xs">Letter spacing</Label>
              <div className="flex gap-1">
                {trackingOptions.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTypo("tracking", t)}
                    className={`flex-1 h-7 rounded border px-2 text-xs capitalize transition-[transform,background-color,border-color,color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
                      resolved.typography.tracking === t
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {c.supports.radius && (
            <SliderRow
              label="Corner radius"
              value={resolved.typography.radius}
              min={0}
              max={24}
              step={1}
              format={(v) => `${Math.round(v)}px`}
              onChange={(v) => setTypo("radius", v)}
            />
          )}
        </TabsContent>

        <TabsContent value="motion" className="space-y-4 pt-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Entrance animation</Label>
            <div className="grid grid-cols-3 gap-1">
              {c.motionPresets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setMotion("preset", preset)}
                  className={`h-8 rounded border px-2 text-xs transition-[transform,background-color,border-color,color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
                    resolved.motion.preset === preset
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  {motionLabels[preset]}
                </button>
              ))}
            </div>
          </div>

          <SliderRow
            label="Motion intensity"
            value={resolved.motion.intensity}
            min={0}
            max={1.5}
            step={0.05}
            format={(v) => `${Math.round(v * 100)}%`}
            onChange={(v) => setMotion("intensity", v)}
          />

          {c.supports.hover && (
            <div className="space-y-1.5">
              <Label className="text-xs">Hover effect</Label>
              <div className="grid grid-cols-4 gap-1">
                {hoverOptions.map((h) => (
                  <button
                    key={h}
                    onClick={() => setMotion("hover", h)}
                    className={`h-7 rounded border px-2 text-xs capitalize transition-[transform,background-color,border-color,color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
                      resolved.motion.hover === h
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className="text-[11px] text-muted-foreground">
            Motion respects <code>prefers-reduced-motion</code>. Animations run on the
            exported site too.
          </p>
        </TabsContent>
      </Tabs>
    </section>
  );
}

function FontSelect({
  fonts,
  value,
  onChange,
  variant,
}: {
  fonts: FontEntry[];
  value: string;
  onChange: (v: string) => void;
  variant: "heading" | "body";
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-9 text-sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {fonts.map((f) => (
          <SelectItem key={f.key} value={f.key}>
            <span
              style={{
                fontFamily: f.stack,
                fontWeight: variant === "heading" ? 700 : 400,
              }}
            >
              {f.label}
            </span>
            <span className="ml-2 text-[10px] uppercase text-muted-foreground">
              {f.kind}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between">
        <Label className="text-xs">{label}</Label>
        <span className="font-mono text-[11px] text-muted-foreground">
          {format(value)}
        </span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(v[0])}
      />
    </div>
  );
}

// ─── Contrast (WCAG) ─────────────────────────────────────────────────

type ContrastReport = { ratio: number; level: "AAA" | "AA" | "AA-large" | "fail" };

function hexToRgb(hex: string): [number, number, number] | null {
  const h = hex.trim().replace("#", "");
  const full =
    h.length === 3
      ? h.split("").map((c) => c + c).join("")
      : h.length === 6
        ? h
        : null;
  if (!full) return null;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return null;
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function relLum([r, g, b]: [number, number, number]): number {
  const f = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function getContrastReport(fg: string, bg: string): ContrastReport {
  const a = hexToRgb(fg);
  const b = hexToRgb(bg);
  if (!a || !b) return { ratio: 1, level: "fail" };
  const l1 = relLum(a);
  const l2 = relLum(b);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  const level: ContrastReport["level"] =
    ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA-large" : "fail";
  return { ratio, level };
}

function ContrastRow({ label, report }: { label: string; report: ContrastReport }) {
  const ok = report.level === "AAA" || report.level === "AA";
  const warn = report.level === "AA-large";
  const Icon = ok ? CheckCircle2 : AlertTriangle;
  const color = ok
    ? "text-emerald-600 dark:text-emerald-400"
    : warn
      ? "text-amber-600 dark:text-amber-400"
      : "text-destructive";
  return (
    <div className="flex items-center justify-between text-[11px]">
      <span className="text-muted-foreground">{label}</span>
      <span className={`inline-flex items-center gap-1 font-mono ${color}`}>
        <Icon className="h-3 w-3" />
        {report.ratio.toFixed(2)}:1 · {report.level}
      </span>
    </div>
  );
}