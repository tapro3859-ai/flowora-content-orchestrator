import { Activity, Info, Plug, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./Section";

const FEATURES = [
  { icon: Activity, title: "System monitoring", text: "Workflow runs and status are reviewed so issues are spotted early." },
  { icon: Plug, title: "Integration and workflow maintenance", text: "Connections and steps are kept aligned as platforms and accounts change." },
  { icon: Wrench, title: "Troubleshooting and improvements", text: "Problems are investigated and the system is refined as your needs evolve." },
];

const SERVICES = [
  { name: "Publishing workflow", state: "Operational", tone: "success" },
  { name: "Content preparation", state: "Operational", tone: "success" },
  { name: "Platform connections", state: "Review scheduled", tone: "warning" },
  { name: "Source folder sync", state: "Operational", tone: "success" },
] as const;

const BARS = [62, 70, 66, 80, 74, 88, 84, 90, 78, 92, 86, 94, 89, 96];

export function Monitoring() {
  return (
    <section id="maintenance" className="border-t border-border py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Continuous monitoring & maintenance"
            title="Automation That Doesn't Get Left Alone."
            description="FLOWORA provides ongoing system monitoring and maintenance throughout the agreed service period, helping identify issues, maintain integrations, and keep your automation operating as intended."
          />
          <ul className="mt-10 space-y-5">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-surface-raised text-primary">
                  <Icon className="size-4" />
                </span>
                <div>
                  <h3 className="font-medium">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 flex gap-2 text-sm text-muted-foreground">
            <Info className="mt-0.5 size-4 shrink-0" />
            Maintenance terms, response times, and coverage depend on the agreed service package. Third-party platform availability is outside FLOWORA's control.
          </p>
        </div>

        <div className="panel rounded-3xl p-4 sm:p-6" aria-label="Illustrative monitoring interface">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium">System overview</p>
            <span className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground">Illustrative — not live data</span>
          </div>
          <div className="inset-panel mt-5 rounded-2xl p-4">
            <div className="flex items-baseline justify-between">
              <p className="text-xs text-muted-foreground">Workflow runs · last 14 days</p>
              <p className="font-mono text-xs text-muted-foreground">sample</p>
            </div>
            <div className="mt-4 flex h-24 items-end gap-1.5" aria-hidden="true">
              {BARS.map((h, i) => (
                <div key={i} className={cn("flex-1 rounded-t-sm", i === BARS.length - 1 ? "bg-primary" : "bg-primary/30")} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <ul className="mt-4 divide-y divide-border rounded-2xl border border-border">
            {SERVICES.map((s) => (
              <li key={s.name} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                <span className="min-w-0 truncate">{s.name}</span>
                <span className={cn("flex shrink-0 items-center gap-2 text-xs", s.tone === "success" ? "text-success" : "text-warning")}>
                  <span className="size-1.5 rounded-full bg-current" />
                  {s.state}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-2xl border border-border bg-surface p-4 font-mono text-xs leading-relaxed">
            <p className="text-muted-foreground">Maintenance notes · example</p>
            <p className="mt-2">→ Connection permissions reviewed with client</p>
            <p>→ Caption length rule updated for short-form video</p>
          </div>
        </div>
      </div>
    </section>
  );
}
