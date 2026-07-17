import type { PortfolioConfig, PortfolioProject, PortfolioSocial } from "@/lib/portfolio/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";

type Props = {
  config: PortfolioConfig;
  onChange: (next: PortfolioConfig) => void;
};

export function PortfolioForm({ config, onChange }: Props) {
  const set = <K extends keyof PortfolioConfig>(key: K, value: PortfolioConfig[K]) =>
    onChange({ ...config, [key]: value });

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Basics</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Name">
            <Input value={config.name} onChange={(e) => set("name", e.target.value)} />
          </Field>
          <Field label="Headline">
            <Input value={config.headline} onChange={(e) => set("headline", e.target.value)} />
          </Field>
          <Field label="Location">
            <Input value={config.location ?? ""} onChange={(e) => set("location", e.target.value)} />
          </Field>
          <Field label="Email">
            <Input type="email" value={config.email ?? ""} onChange={(e) => set("email", e.target.value)} />
          </Field>
        </div>
        <Field label="Bio">
          <Textarea rows={4} value={config.bio} onChange={(e) => set("bio", e.target.value)} />
        </Field>
        <Field label="Avatar URL (optional)">
          <Input value={config.avatarUrl ?? ""} onChange={(e) => set("avatarUrl", e.target.value)} />
        </Field>
      </section>

      <section className="space-y-3">
        <Header
          title="Projects"
          onAdd={() =>
            set("projects", [
              ...config.projects,
              { title: "New project", description: "", url: "", tags: [] },
            ])
          }
        />
        <div className="space-y-3">
          {config.projects.map((p, i) => (
            <ProjectRow
              key={i}
              project={p}
              onChange={(next) => {
                const arr = [...config.projects];
                arr[i] = next;
                set("projects", arr);
              }}
              onRemove={() =>
                set(
                  "projects",
                  config.projects.filter((_, idx) => idx !== i),
                )
              }
            />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Skills</h3>
        <Input
          placeholder="Comma-separated: TypeScript, React, ..."
          value={config.skills.join(", ")}
          onChange={(e) =>
            set(
              "skills",
              e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            )
          }
        />
      </section>

      <section className="space-y-3">
        <Header
          title="Socials"
          onAdd={() => set("socials", [...config.socials, { label: "", url: "" }])}
        />
        {config.socials.map((s, i) => (
          <SocialRow
            key={i}
            social={s}
            onChange={(next) => {
              const arr = [...config.socials];
              arr[i] = next;
              set("socials", arr);
            }}
            onRemove={() =>
              set(
                "socials",
                config.socials.filter((_, idx) => idx !== i),
              )
            }
          />
        ))}
      </section>

      <section className="space-y-3">
        <Header
          title="Experience"
          onAdd={() =>
            set("experience", [
              ...config.experience,
              { role: "Role", company: "Company", period: "2024 — Now", summary: "" },
            ])
          }
        />
        {config.experience.map((e, i) => (
          <div key={i} className="rounded-md border p-3 space-y-2">
            <div className="grid gap-2 sm:grid-cols-3">
              <Input placeholder="Role" value={e.role} onChange={(ev) => {
                const arr = [...config.experience]; arr[i] = { ...e, role: ev.target.value }; set("experience", arr);
              }} />
              <Input placeholder="Company" value={e.company} onChange={(ev) => {
                const arr = [...config.experience]; arr[i] = { ...e, company: ev.target.value }; set("experience", arr);
              }} />
              <Input placeholder="Period" value={e.period} onChange={(ev) => {
                const arr = [...config.experience]; arr[i] = { ...e, period: ev.target.value }; set("experience", arr);
              }} />
            </div>
            <Textarea placeholder="Summary" rows={2} value={e.summary ?? ""} onChange={(ev) => {
              const arr = [...config.experience]; arr[i] = { ...e, summary: ev.target.value }; set("experience", arr);
            }} />
            <div className="flex justify-end">
              <Button variant="ghost" size="sm" onClick={() => set("experience", config.experience.filter((_, idx) => idx !== i))}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Theme</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Accent color">
            <div className="flex gap-2">
              <input
                type="color"
                className="h-10 w-14 rounded border"
                value={config.theme.accent}
                onChange={(e) => set("theme", { ...config.theme, accent: e.target.value })}
              />
              <Input value={config.theme.accent} onChange={(e) => set("theme", { ...config.theme, accent: e.target.value })} />
            </div>
          </Field>
          <Field label="Font">
            <select
              className="h-10 rounded-md border bg-background px-3 text-sm"
              value={config.theme.font}
              onChange={(e) => set("theme", { ...config.theme, font: e.target.value as "sans" | "serif" | "mono" })}
            >
              <option value="sans">Sans</option>
              <option value="serif">Serif</option>
              <option value="mono">Mono</option>
            </select>
          </Field>
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">{label}</Label>
      {children}
    </div>
  );
}

function Header({ title, onAdd }: { title: string; onAdd: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{title}</h3>
      <Button variant="outline" size="sm" onClick={onAdd}>
        <Plus className="h-4 w-4 mr-1" /> Add
      </Button>
    </div>
  );
}

function ProjectRow({
  project,
  onChange,
  onRemove,
}: {
  project: PortfolioProject;
  onChange: (p: PortfolioProject) => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-md border p-3 space-y-2">
      <div className="grid gap-2 sm:grid-cols-2">
        <Input placeholder="Title" value={project.title} onChange={(e) => onChange({ ...project, title: e.target.value })} />
        <Input placeholder="URL" value={project.url ?? ""} onChange={(e) => onChange({ ...project, url: e.target.value })} />
      </div>
      <Textarea placeholder="Description" rows={2} value={project.description} onChange={(e) => onChange({ ...project, description: e.target.value })} />
      <div className="grid gap-2 sm:grid-cols-2">
        <Input
          placeholder="Tags (comma separated)"
          value={project.tags.join(", ")}
          onChange={(e) => onChange({ ...project, tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
        />
        <Input placeholder="Image URL (optional)" value={project.imageUrl ?? ""} onChange={(e) => onChange({ ...project, imageUrl: e.target.value })} />
      </div>
      <div className="flex justify-end">
        <Button variant="ghost" size="sm" onClick={onRemove}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function SocialRow({
  social,
  onChange,
  onRemove,
}: {
  social: PortfolioSocial;
  onChange: (s: PortfolioSocial) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex gap-2">
      <Input placeholder="Label (GitHub)" value={social.label} onChange={(e) => onChange({ ...social, label: e.target.value })} />
      <Input placeholder="https://..." value={social.url} onChange={(e) => onChange({ ...social, url: e.target.value })} />
      <Button variant="ghost" size="icon" onClick={onRemove}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}