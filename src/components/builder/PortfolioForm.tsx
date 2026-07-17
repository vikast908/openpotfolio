import type {
  PortfolioConfig,
  PortfolioProject,
  PortfolioSocial,
  PortfolioAchievement,
  PortfolioTestimonial,
  PortfolioWriting,
  PortfolioExperience,
} from "@/lib/portfolio/types";
import type { Template } from "@/templates/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, ChevronDown, ChevronRight, X } from "lucide-react";
import { useState } from "react";

type Props = {
  config: PortfolioConfig;
  template: Template;
  onChange: (next: PortfolioConfig) => void;
};

function newId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function PortfolioForm({ config, template, onChange }: Props) {
  const content = template.capabilities.content;
  const set = <K extends keyof PortfolioConfig>(key: K, value: PortfolioConfig[K]) =>
    onChange({ ...config, [key]: value });

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Basics
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Name">
            <Input value={config.name} onChange={(e) => set("name", e.target.value)} />
          </Field>
          <Field label="Headline">
            <Input value={config.headline} onChange={(e) => set("headline", e.target.value)} />
          </Field>
          <Field label="Location">
            <Input
              value={config.location ?? ""}
              onChange={(e) => set("location", e.target.value)}
            />
          </Field>
          <Field label="Email">
            <Input
              type="email"
              value={config.email ?? ""}
              onChange={(e) => set("email", e.target.value)}
            />
          </Field>
        </div>
        <Field label="Bio">
          <Textarea rows={4} value={config.bio} onChange={(e) => set("bio", e.target.value)} />
        </Field>
        <Field label="Avatar URL (optional)">
          <Input
            value={config.avatarUrl ?? ""}
            onChange={(e) => set("avatarUrl", e.target.value)}
          />
        </Field>
        {content.cta && (
          <>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Résumé URL">
                <Input
                  value={config.resumeUrl ?? ""}
                  onChange={(e) => set("resumeUrl", e.target.value)}
                  placeholder="https://.../resume.pdf"
                />
              </Field>
              <Field label="Call-to-action">
                <Input
                  value={config.cta ?? ""}
                  onChange={(e) => set("cta", e.target.value)}
                  placeholder="Book a 20-min intro call"
                />
              </Field>
            </div>
            <Field label="Work preference">
              <Input
                value={config.workPreference ?? ""}
                onChange={(e) => set("workPreference", e.target.value)}
                placeholder="Open to senior PM roles · remote or London"
              />
            </Field>
            <Field label="Key strengths (2-4)">
              <ChipList
                items={config.strengths ?? []}
                onChange={(items) => set("strengths", items)}
                placeholder="Add a strength"
              />
            </Field>
          </>
        )}
      </section>

      {content.story && (
        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            About
          </h3>
          <Field label="Career story">
            <Textarea
              rows={4}
              value={config.story ?? ""}
              onChange={(e) => set("story", e.target.value)}
              placeholder="How you got here - turning points, why product."
            />
          </Field>
          <Field label="Product philosophy">
            <Textarea
              rows={3}
              value={config.philosophy ?? ""}
              onChange={(e) => set("philosophy", e.target.value)}
              placeholder="How you approach problems, teams, decisions."
            />
          </Field>
          <Field label="Industries">
            <ChipList
              items={config.industries ?? []}
              onChange={(items) => set("industries", items)}
              placeholder="Add an industry"
            />
          </Field>
        </section>
      )}

      <section className="space-y-3">
        <Header
          title="Projects"
          onAdd={() =>
            set("projects", [
              ...config.projects,
              {
                id: newId(),
                title: "New project",
                description: "",
                url: "",
                tags: [],
                featured: false,
              },
            ])
          }
        />
        <div className="space-y-3">
          {config.projects.map((p, i) => (
            <ProjectRow
              key={p.id ?? `proj-${i}`}
              project={p}
              showCaseStudy={content.caseStudies}
              onChange={(next) => {
                const arr = [...config.projects];
                arr[i] = next;
                set("projects", arr);
              }}
              onRemove={() => set("projects", config.projects.filter((_, idx) => idx !== i))}
            />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Skills {content.skillGroups ? "(flat list)" : ""}
        </h3>
        <ChipList items={config.skills} onChange={(items) => set("skills", items)} placeholder="Add a skill" />
      </section>

      {content.skillGroups && (
        <section className="space-y-3">
          <Header
            title="Skill groups"
            onAdd={() =>
              set("skillGroups", [
                ...(config.skillGroups ?? []),
                { id: newId(), label: "New group", items: [] },
              ])
            }
          />
          {(config.skillGroups ?? []).map((g, i) => (
            <div key={g.id ?? `sg-${i}`} className="rounded-md border p-3 space-y-2">
              <Input
                placeholder="Group label (e.g. Discovery)"
                value={g.label}
                onChange={(e) => {
                  const arr = [...(config.skillGroups ?? [])];
                  arr[i] = { ...g, label: e.target.value };
                  set("skillGroups", arr);
                }}
              />
              <ChipList
                items={g.items}
                onChange={(items) => {
                  const arr = [...(config.skillGroups ?? [])];
                  arr[i] = { ...g, items };
                  set("skillGroups", arr);
                }}
                placeholder="Add skill"
              />
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="Delete skill group"
                  onClick={() =>
                    set(
                      "skillGroups",
                      (config.skillGroups ?? []).filter((_, idx) => idx !== i),
                    )
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </section>
      )}

      {content.achievements && (
        <section className="space-y-3">
          <Header
            title="Achievements & impact"
            onAdd={() =>
              set("achievements", [
                ...(config.achievements ?? []),
                { id: newId(), title: "", detail: "", year: "" },
              ])
            }
          />
          {(config.achievements ?? []).map((a, i) => (
            <AchievementRow
              key={a.id ?? `ach-${i}`}
              value={a}
              onChange={(next) => {
                const arr = [...(config.achievements ?? [])];
                arr[i] = next;
                set("achievements", arr);
              }}
              onRemove={() =>
                set(
                  "achievements",
                  (config.achievements ?? []).filter((_, idx) => idx !== i),
                )
              }
            />
          ))}
        </section>
      )}

      {content.testimonials && (
        <section className="space-y-3">
          <Header
            title="Testimonials"
            onAdd={() =>
              set("testimonials", [
                ...(config.testimonials ?? []),
                { id: newId(), quote: "", author: "", role: "" },
              ])
            }
          />
          {(config.testimonials ?? []).map((t, i) => (
            <TestimonialRow
              key={t.id ?? `tst-${i}`}
              value={t}
              onChange={(next) => {
                const arr = [...(config.testimonials ?? [])];
                arr[i] = next;
                set("testimonials", arr);
              }}
              onRemove={() =>
                set(
                  "testimonials",
                  (config.testimonials ?? []).filter((_, idx) => idx !== i),
                )
              }
            />
          ))}
        </section>
      )}

      {content.writing && (
        <section className="space-y-3">
          <Header
            title="Writing & thought leadership"
            onAdd={() =>
              set("writing", [
                ...(config.writing ?? []),
                { id: newId(), title: "", url: "", kind: "Essay", summary: "" },
              ])
            }
          />
          {(config.writing ?? []).map((w, i) => (
            <WritingRow
              key={w.id ?? `wrt-${i}`}
              value={w}
              onChange={(next) => {
                const arr = [...(config.writing ?? [])];
                arr[i] = next;
                set("writing", arr);
              }}
              onRemove={() =>
                set("writing", (config.writing ?? []).filter((_, idx) => idx !== i))
              }
            />
          ))}
        </section>
      )}

      <section className="space-y-3">
        <Header
          title="Socials"
          onAdd={() => set("socials", [...config.socials, { id: newId(), label: "", url: "" }])}
        />
        {config.socials.map((s, i) => (
          <SocialRow
            key={s.id ?? `soc-${i}`}
            social={s}
            onChange={(next) => {
              const arr = [...config.socials];
              arr[i] = next;
              set("socials", arr);
            }}
            onRemove={() => set("socials", config.socials.filter((_, idx) => idx !== i))}
          />
        ))}
      </section>

      <section className="space-y-3">
        <Header
          title="Experience"
          onAdd={() =>
            set("experience", [
              ...config.experience,
              {
                id: newId(),
                role: "Role",
                company: "Company",
                period: "2024 - Now",
                summary: "",
              },
            ])
          }
        />
        {config.experience.map((e, i) => (
          <ExperienceRow
            key={e.id ?? `exp-${i}`}
            value={e}
            onChange={(next) => {
              const arr = [...config.experience];
              arr[i] = next;
              set("experience", arr);
            }}
            onRemove={() =>
              set("experience", config.experience.filter((_, idx) => idx !== i))
            }
          />
        ))}
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
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      <Button variant="outline" size="sm" onClick={onAdd}>
        <Plus className="h-4 w-4 mr-1" /> Add
      </Button>
    </div>
  );
}

/** Tag/chip editor: add via input+Enter or button; remove via chip. */
function ChipList({
  items,
  onChange,
  placeholder,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState("");

  const commit = () => {
    const value = draft.trim();
    if (!value) return;
    if (items.includes(value)) {
      setDraft("");
      return;
    }
    onChange([...items, value]);
    setDraft("");
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-1 rounded-full border bg-muted/40 px-2 py-0.5 text-xs"
          >
            {item}
            <button
              type="button"
              aria-label={`Remove ${item}`}
              className="rounded-full p-0.5 hover:bg-muted"
              onClick={() => onChange(items.filter((x) => x !== item))}
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={draft}
          placeholder={placeholder ?? "Add item"}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              commit();
            }
          }}
        />
        <Button type="button" variant="secondary" size="sm" onClick={commit}>
          Add
        </Button>
      </div>
    </div>
  );
}

function ProjectRow({
  project,
  showCaseStudy,
  onChange,
  onRemove,
}: {
  project: PortfolioProject;
  showCaseStudy: boolean;
  onChange: (p: PortfolioProject) => void;
  onRemove: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-md border p-3 space-y-2">
      <div className="grid gap-2 sm:grid-cols-2">
        <Input
          placeholder="Title"
          value={project.title}
          onChange={(e) => onChange({ ...project, title: e.target.value })}
        />
        <Input
          placeholder="URL"
          value={project.url ?? ""}
          onChange={(e) => onChange({ ...project, url: e.target.value })}
        />
      </div>
      <Textarea
        placeholder="Description"
        rows={2}
        value={project.description}
        onChange={(e) => onChange({ ...project, description: e.target.value })}
      />
      <div className="grid gap-2 sm:grid-cols-2">
        <Field label="Tags">
          <ChipList
            items={project.tags}
            onChange={(tags) => onChange({ ...project, tags })}
            placeholder="Add tag"
          />
        </Field>
        <Field label="Image URL">
          <Input
            placeholder="optional"
            value={project.imageUrl ?? ""}
            onChange={(e) => onChange({ ...project, imageUrl: e.target.value })}
          />
        </Field>
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
          {showCaseStudy && (
            <Button variant="ghost" size="sm" onClick={() => setExpanded((v) => !v)}>
              {expanded ? (
                <ChevronDown className="h-4 w-4 mr-1" />
              ) : (
                <ChevronRight className="h-4 w-4 mr-1" />
              )}
              Case study
            </Button>
          )}
          <Button variant="ghost" size="sm" aria-label="Delete project" onClick={onRemove}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {showCaseStudy && expanded && (
        <div className="space-y-2 rounded-md bg-muted/40 p-3">
          <div className="grid gap-2 sm:grid-cols-3">
            <Input
              placeholder="Your role"
              value={project.role ?? ""}
              onChange={(e) => onChange({ ...project, role: e.target.value })}
            />
            <Input
              placeholder="Team"
              value={project.team ?? ""}
              onChange={(e) => onChange({ ...project, team: e.target.value })}
            />
            <Input
              placeholder="Timeline"
              value={project.timeline ?? ""}
              onChange={(e) => onChange({ ...project, timeline: e.target.value })}
            />
          </div>
          <Textarea
            rows={2}
            placeholder="Problem / context"
            value={project.problem ?? ""}
            onChange={(e) => onChange({ ...project, problem: e.target.value })}
          />
          <Textarea
            rows={2}
            placeholder="Research & evidence"
            value={project.research ?? ""}
            onChange={(e) => onChange({ ...project, research: e.target.value })}
          />
          <Textarea
            rows={2}
            placeholder="Goals & metrics"
            value={project.goals ?? ""}
            onChange={(e) => onChange({ ...project, goals: e.target.value })}
          />
          <Textarea
            rows={2}
            placeholder="Constraints"
            value={project.constraints ?? ""}
            onChange={(e) => onChange({ ...project, constraints: e.target.value })}
          />
          <Textarea
            rows={2}
            placeholder="Strategy & decisions"
            value={project.strategy ?? ""}
            onChange={(e) => onChange({ ...project, strategy: e.target.value })}
          />
          <Textarea
            rows={2}
            placeholder="Execution / what shipped"
            value={project.execution ?? ""}
            onChange={(e) => onChange({ ...project, execution: e.target.value })}
          />
          <Textarea
            rows={2}
            placeholder="Results (quantified)"
            value={project.results ?? ""}
            onChange={(e) => onChange({ ...project, results: e.target.value })}
          />
          <MetricsEditor
            metrics={project.metrics ?? []}
            onChange={(metrics) => onChange({ ...project, metrics })}
          />
          <Textarea
            rows={2}
            placeholder="Challenges & tradeoffs"
            value={project.challenges ?? ""}
            onChange={(e) => onChange({ ...project, challenges: e.target.value })}
          />
          <Textarea
            rows={2}
            placeholder="Lessons / what I'd do differently"
            value={project.lessons ?? ""}
            onChange={(e) => onChange({ ...project, lessons: e.target.value })}
          />
        </div>
      )}
    </div>
  );
}

function MetricsEditor({
  metrics,
  onChange,
}: {
  metrics: { label: string; value: string }[];
  onChange: (m: { label: string; value: string }[]) => void;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-xs">Metric chips</Label>
      {metrics.map((m, i) => (
        <div key={`${m.label}-${i}`} className="flex gap-2">
          <Input
            placeholder="Label"
            value={m.label}
            onChange={(e) => {
              const arr = [...metrics];
              arr[i] = { ...m, label: e.target.value };
              onChange(arr);
            }}
          />
          <Input
            placeholder="Value"
            value={m.value}
            onChange={(e) => {
              const arr = [...metrics];
              arr[i] = { ...m, value: e.target.value };
              onChange(arr);
            }}
          />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Remove metric"
            onClick={() => onChange(metrics.filter((_, idx) => idx !== i))}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange([...metrics, { label: "", value: "" }])}
      >
        <Plus className="h-3 w-3 mr-1" /> Add metric
      </Button>
    </div>
  );
}

function ExperienceRow({
  value,
  onChange,
  onRemove,
}: {
  value: PortfolioExperience;
  onChange: (v: PortfolioExperience) => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-md border p-3 space-y-2">
      <div className="grid gap-2 sm:grid-cols-3">
        <Input
          placeholder="Role"
          value={value.role}
          onChange={(e) => onChange({ ...value, role: e.target.value })}
        />
        <Input
          placeholder="Company"
          value={value.company}
          onChange={(e) => onChange({ ...value, company: e.target.value })}
        />
        <Input
          placeholder="Period"
          value={value.period}
          onChange={(e) => onChange({ ...value, period: e.target.value })}
        />
      </div>
      <Textarea
        placeholder="Summary"
        rows={2}
        value={value.summary ?? ""}
        onChange={(e) => onChange({ ...value, summary: e.target.value })}
      />
      <div className="flex justify-end">
        <Button variant="ghost" size="sm" aria-label="Delete experience" onClick={onRemove}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function AchievementRow({
  value,
  onChange,
  onRemove,
}: {
  value: PortfolioAchievement;
  onChange: (v: PortfolioAchievement) => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-md border p-3 space-y-2">
      <div className="grid gap-2 sm:grid-cols-3">
        <Input
          placeholder="Title (Grew activation 38%)"
          value={value.title}
          onChange={(e) => onChange({ ...value, title: e.target.value })}
        />
        <Input
          placeholder="Year"
          value={value.year ?? ""}
          onChange={(e) => onChange({ ...value, year: e.target.value })}
        />
        <Button variant="ghost" size="sm" aria-label="Delete achievement" onClick={onRemove}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <Textarea
        rows={2}
        placeholder="Detail"
        value={value.detail ?? ""}
        onChange={(e) => onChange({ ...value, detail: e.target.value })}
      />
    </div>
  );
}

function TestimonialRow({
  value,
  onChange,
  onRemove,
}: {
  value: PortfolioTestimonial;
  onChange: (v: PortfolioTestimonial) => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-md border p-3 space-y-2">
      <Textarea
        rows={2}
        placeholder="Quote"
        value={value.quote}
        onChange={(e) => onChange({ ...value, quote: e.target.value })}
      />
      <div className="grid gap-2 sm:grid-cols-3">
        <Input
          placeholder="Author"
          value={value.author}
          onChange={(e) => onChange({ ...value, author: e.target.value })}
        />
        <Input
          placeholder="Role"
          value={value.role ?? ""}
          onChange={(e) => onChange({ ...value, role: e.target.value })}
        />
        <Button variant="ghost" size="sm" aria-label="Delete testimonial" onClick={onRemove}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function WritingRow({
  value,
  onChange,
  onRemove,
}: {
  value: PortfolioWriting;
  onChange: (v: PortfolioWriting) => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-md border p-3 space-y-2">
      <div className="grid gap-2 sm:grid-cols-3">
        <Input
          placeholder="Title"
          value={value.title}
          onChange={(e) => onChange({ ...value, title: e.target.value })}
        />
        <Input
          placeholder="Kind (Essay, Talk, Framework)"
          value={value.kind ?? ""}
          onChange={(e) => onChange({ ...value, kind: e.target.value })}
        />
        <Input
          placeholder="URL"
          value={value.url ?? ""}
          onChange={(e) => onChange({ ...value, url: e.target.value })}
        />
      </div>
      <Textarea
        rows={2}
        placeholder="Summary (optional)"
        value={value.summary ?? ""}
        onChange={(e) => onChange({ ...value, summary: e.target.value })}
      />
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
      <Input
        placeholder="Label (GitHub)"
        value={social.label}
        onChange={(e) => onChange({ ...social, label: e.target.value })}
      />
      <Input
        placeholder="https://..."
        value={social.url}
        onChange={(e) => onChange({ ...social, url: e.target.value })}
      />
      <Button variant="ghost" size="icon" aria-label="Delete social link" onClick={onRemove}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

