import type {
  PortfolioConfig,
  PortfolioProject,
  PortfolioSocial,
  PortfolioSkillGroup,
  PortfolioAchievement,
  PortfolioTestimonial,
  PortfolioWriting,
} from "@/lib/portfolio/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

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
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Résumé URL">
            <Input value={config.resumeUrl ?? ""} onChange={(e) => set("resumeUrl", e.target.value)} placeholder="https://…/resume.pdf" />
          </Field>
          <Field label="Call-to-action">
            <Input value={config.cta ?? ""} onChange={(e) => set("cta", e.target.value)} placeholder="Book a 20-min intro call" />
          </Field>
        </div>
        <Field label="Work preference">
          <Input value={config.workPreference ?? ""} onChange={(e) => set("workPreference", e.target.value)} placeholder="Open to senior PM roles · remote or London" />
        </Field>
        <Field label="Key strengths (comma-separated, 2–4)">
          <Input
            value={(config.strengths ?? []).join(", ")}
            onChange={(e) =>
              set(
                "strengths",
                e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
              )
            }
            placeholder="0→1 discovery, Growth, Platform strategy"
          />
        </Field>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">About</h3>
        <Field label="Career story">
          <Textarea rows={4} value={config.story ?? ""} onChange={(e) => set("story", e.target.value)} placeholder="How you got here — turning points, why product." />
        </Field>
        <Field label="Product philosophy">
          <Textarea rows={3} value={config.philosophy ?? ""} onChange={(e) => set("philosophy", e.target.value)} placeholder="How you approach problems, teams, decisions." />
        </Field>
        <Field label="Industries (comma-separated)">
          <Input
            value={(config.industries ?? []).join(", ")}
            onChange={(e) =>
              set(
                "industries",
                e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
              )
            }
            placeholder="Fintech, Developer tools, Marketplaces"
          />
        </Field>
      </section>

      <section className="space-y-3">
        <Header
          title="Projects"
          onAdd={() =>
            set("projects", [
              ...config.projects,
              { title: "New project", description: "", url: "", tags: [], featured: false },
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
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Skills (flat list)</h3>
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
          title="Skill groups"
          onAdd={() =>
            set("skillGroups", [...(config.skillGroups ?? []), { label: "New group", items: [] }])
          }
        />
        {(config.skillGroups ?? []).map((g, i) => (
          <div key={i} className="rounded-md border p-3 space-y-2">
            <Input
              placeholder="Group label (e.g. Discovery)"
              value={g.label}
              onChange={(e) => {
                const arr = [...(config.skillGroups ?? [])];
                arr[i] = { ...g, label: e.target.value };
                set("skillGroups", arr);
              }}
            />
            <Input
              placeholder="Items, comma-separated"
              value={g.items.join(", ")}
              onChange={(e) => {
                const arr = [...(config.skillGroups ?? [])];
                arr[i] = { ...g, items: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) };
                set("skillGroups", arr);
              }}
            />
            <div className="flex justify-end">
              <Button variant="ghost" size="sm" aria-label="Delete skill group" onClick={() => set("skillGroups", (config.skillGroups ?? []).filter((_, idx) => idx !== i))}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <Header
          title="Achievements & impact"
          onAdd={() => set("achievements", [...(config.achievements ?? []), { title: "", detail: "", year: "" }])}
        />
        {(config.achievements ?? []).map((a, i) => (
          <AchievementRow
            key={i}
            value={a}
            onChange={(next) => {
              const arr = [...(config.achievements ?? [])];
              arr[i] = next;
              set("achievements", arr);
            }}
            onRemove={() => set("achievements", (config.achievements ?? []).filter((_, idx) => idx !== i))}
          />
        ))}
      </section>

      <section className="space-y-3">
        <Header
          title="Testimonials"
          onAdd={() => set("testimonials", [...(config.testimonials ?? []), { quote: "", author: "", role: "" }])}
        />
        {(config.testimonials ?? []).map((t, i) => (
          <TestimonialRow
            key={i}
            value={t}
            onChange={(next) => {
              const arr = [...(config.testimonials ?? [])];
              arr[i] = next;
              set("testimonials", arr);
            }}
            onRemove={() => set("testimonials", (config.testimonials ?? []).filter((_, idx) => idx !== i))}
          />
        ))}
      </section>

      <section className="space-y-3">
        <Header
          title="Writing & thought leadership"
          onAdd={() => set("writing", [...(config.writing ?? []), { title: "", url: "", kind: "Essay", summary: "" }])}
        />
        {(config.writing ?? []).map((w, i) => (
          <WritingRow
            key={i}
            value={w}
            onChange={(next) => {
              const arr = [...(config.writing ?? [])];
              arr[i] = next;
              set("writing", arr);
            }}
            onRemove={() => set("writing", (config.writing ?? []).filter((_, idx) => idx !== i))}
          />
        ))}
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
              <Button variant="ghost" size="sm" aria-label="Delete experience" onClick={() => set("experience", config.experience.filter((_, idx) => idx !== i))}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </section>

      {/* Style panel is mounted separately by the builder route. */}
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
  const [expanded, setExpanded] = useState(false);
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
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          <input
            type="checkbox"
            checked={!!project.featured}
            onChange={(e) => onChange({ ...project, featured: e.target.checked })}
          />
          Featured on homepage
        </label>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => setExpanded((v) => !v)}>
            {expanded ? <ChevronDown className="h-4 w-4 mr-1" /> : <ChevronRight className="h-4 w-4 mr-1" />}
            Case study
          </Button>
          <Button variant="ghost" size="sm" aria-label="Delete project" onClick={onRemove}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {expanded && (
        <div className="space-y-2 rounded-md bg-muted/40 p-3">
          <div className="grid gap-2 sm:grid-cols-3">
            <Input placeholder="Your role" value={project.role ?? ""} onChange={(e) => onChange({ ...project, role: e.target.value })} />
            <Input placeholder="Team" value={project.team ?? ""} onChange={(e) => onChange({ ...project, team: e.target.value })} />
            <Input placeholder="Timeline" value={project.timeline ?? ""} onChange={(e) => onChange({ ...project, timeline: e.target.value })} />
          </div>
          <Textarea rows={2} placeholder="Problem / context" value={project.problem ?? ""} onChange={(e) => onChange({ ...project, problem: e.target.value })} />
          <Textarea rows={2} placeholder="Research & evidence" value={project.research ?? ""} onChange={(e) => onChange({ ...project, research: e.target.value })} />
          <Textarea rows={2} placeholder="Goals & metrics" value={project.goals ?? ""} onChange={(e) => onChange({ ...project, goals: e.target.value })} />
          <Textarea rows={2} placeholder="Constraints" value={project.constraints ?? ""} onChange={(e) => onChange({ ...project, constraints: e.target.value })} />
          <Textarea rows={2} placeholder="Strategy & decisions" value={project.strategy ?? ""} onChange={(e) => onChange({ ...project, strategy: e.target.value })} />
          <Textarea rows={2} placeholder="Execution / what shipped" value={project.execution ?? ""} onChange={(e) => onChange({ ...project, execution: e.target.value })} />
          <Textarea rows={2} placeholder="Results (quantified)" value={project.results ?? ""} onChange={(e) => onChange({ ...project, results: e.target.value })} />
          <Input
            placeholder="Metric chips — Label:Value, comma-separated (e.g. Activation:+38%, Retention:+12%)"
            value={(project.metrics ?? []).map((m) => `${m.label}:${m.value}`).join(", ")}
            onChange={(e) =>
              onChange({
                ...project,
                metrics: e.target.value
                  .split(",")
                  .map((chunk) => chunk.split(":").map((s) => s.trim()))
                  .filter((parts) => parts.length === 2 && parts[0] && parts[1])
                  .map(([label, value]) => ({ label, value })),
              })
            }
          />
          <Textarea rows={2} placeholder="Challenges & tradeoffs" value={project.challenges ?? ""} onChange={(e) => onChange({ ...project, challenges: e.target.value })} />
          <Textarea rows={2} placeholder="Lessons / what I'd do differently" value={project.lessons ?? ""} onChange={(e) => onChange({ ...project, lessons: e.target.value })} />
        </div>
      )}
    </div>
  );
}

function AchievementRow({ value, onChange, onRemove }: { value: PortfolioAchievement; onChange: (v: PortfolioAchievement) => void; onRemove: () => void }) {
  return (
    <div className="rounded-md border p-3 space-y-2">
      <div className="grid gap-2 sm:grid-cols-3">
        <Input placeholder="Title (Grew activation 38%)" value={value.title} onChange={(e) => onChange({ ...value, title: e.target.value })} />
        <Input placeholder="Year" value={value.year ?? ""} onChange={(e) => onChange({ ...value, year: e.target.value })} />
        <Button variant="ghost" size="sm" aria-label="Delete achievement" onClick={onRemove}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <Textarea rows={2} placeholder="Detail" value={value.detail ?? ""} onChange={(e) => onChange({ ...value, detail: e.target.value })} />
    </div>
  );
}

function TestimonialRow({ value, onChange, onRemove }: { value: PortfolioTestimonial; onChange: (v: PortfolioTestimonial) => void; onRemove: () => void }) {
  return (
    <div className="rounded-md border p-3 space-y-2">
      <Textarea rows={2} placeholder="Quote" value={value.quote} onChange={(e) => onChange({ ...value, quote: e.target.value })} />
      <div className="grid gap-2 sm:grid-cols-3">
        <Input placeholder="Author" value={value.author} onChange={(e) => onChange({ ...value, author: e.target.value })} />
        <Input placeholder="Role" value={value.role ?? ""} onChange={(e) => onChange({ ...value, role: e.target.value })} />
        <Button variant="ghost" size="sm" aria-label="Delete testimonial" onClick={onRemove}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function WritingRow({ value, onChange, onRemove }: { value: PortfolioWriting; onChange: (v: PortfolioWriting) => void; onRemove: () => void }) {
  return (
    <div className="rounded-md border p-3 space-y-2">
      <div className="grid gap-2 sm:grid-cols-3">
        <Input placeholder="Title" value={value.title} onChange={(e) => onChange({ ...value, title: e.target.value })} />
        <Input placeholder="Kind (Essay, Talk, Framework)" value={value.kind ?? ""} onChange={(e) => onChange({ ...value, kind: e.target.value })} />
        <Input placeholder="URL" value={value.url ?? ""} onChange={(e) => onChange({ ...value, url: e.target.value })} />
      </div>
      <Textarea rows={2} placeholder="Summary (optional)" value={value.summary ?? ""} onChange={(e) => onChange({ ...value, summary: e.target.value })} />
      <div className="flex justify-end">
        <Button variant="ghost" size="sm" aria-label="Delete writing entry" onClick={onRemove}>
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
      <Button variant="ghost" size="icon" aria-label="Delete social link" onClick={onRemove}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}