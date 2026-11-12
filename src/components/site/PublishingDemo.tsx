import { useCallback, useEffect, useRef, useState } from "react";
import { format, parseISO } from "date-fns";
import {
  AlertCircle,
  CalendarClock,
  Check,
  CheckCircle2,
  Cpu,
  FlaskConical,
  FolderOpen,
  Loader2,
  Play,
  RefreshCw,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CONTENT_LANGUAGES, CONTENT_SAMPLES, type ContentLanguage } from "@/lib/demo-content";
import {
  PLATFORMS,
  buildTimeline,
  validateSelection,
  type NodeStatus,
  type PlatformId,
  type PlatformStatus,
  type PrepField,
  type PrepStatus,
  type SimEvent,
} from "@/lib/publishing-sim";
import { cn } from "@/lib/utils";
import { PlatformIcon } from "./PlatformIcon";
import { SectionHeading } from "./Section";

type Phase = "idle" | "running" | "done";
interface LogLine {
  at: number;
  msg: string;
  tone?: "info" | "success" | undefined;
}
interface Sim {
  phase: Phase;
  source: NodeStatus;
  processing: NodeStatus;
  prep: Record<PrepField, PrepStatus>;
  platforms: Record<PlatformId, PlatformStatus>;
  progress: number;
  log: LogLine[];
}

const idlePlatforms = (): Record<PlatformId, PlatformStatus> => ({ instagram: "idle", facebook: "idle", tiktok: "idle", youtube: "idle" });
const initialSim = (): Sim => ({
  phase: "idle",
  source: "idle",
  processing: "idle",
  prep: { title: "idle", description: "idle", hashtags: "idle" },
  platforms: idlePlatforms(),
  progress: 0,
  log: [],
});

function applyEvent(s: Sim, e: SimEvent): Sim {
  const next: Sim = { ...s, progress: e.progress, log: [...s.log, { at: e.at, msg: e.log, tone: e.tone }] };
  if (e.source) next.source = e.source;
  if (e.processing) next.processing = e.processing;
  if (e.prep) {
    next.prep = { ...s.prep };
    for (const [f, st] of e.prep) next.prep[f] = st;
  }
  if (e.platform) next.platforms = { ...s.platforms, [e.platform[0]]: e.platform[1] };
  if (e.done) next.phase = "done";
  return next;
}

const STATUS_LABEL: Record<PlatformStatus, string> = {
  idle: "Selected",
  queued: "Queued",
  preparing: "Preparing",
  publishing: "Publishing",
  published: "Published in Demo",
  skipped: "Not selected",
};

const fmtT = (ms: number) => `T+${(ms / 1000).toFixed(1).padStart(4, "0")}s`;

export function PublishingDemo({ showHeading = true }: { showHeading?: boolean }) {
  const [sim, setSim] = useState<Sim>(initialSim);
  const [selected, setSelected] = useState<Record<PlatformId, boolean>>({ instagram: true, facebook: true, tiktok: true, youtube: true });
  const [lang, setLang] = useState<ContentLanguage>("en");
  const [variant, setVariant] = useState(0);
  const [regenerating, setRegenerating] = useState(false);
  const [schedule, setSchedule] = useState({ date: "2026-11-20", time: "18:30" });
  const [draft, setDraft] = useState(schedule);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timers = useRef<number[]>([]);
  const logRef = useRef<HTMLOListElement>(null);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };
  useEffect(() => clearTimers, []);
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [sim.log.length]);

  const selectedIds = PLATFORMS.filter((p) => selected[p.id]).map((p) => p.id);
  const content = CONTENT_SAMPLES[lang][variant % CONTENT_SAMPLES[lang].length]!;
  const dir = CONTENT_LANGUAGES.find((l) => l.id === lang)?.dir ?? "ltr";
  const running = sim.phase === "running";

  const run = useCallback(() => {
    const err = validateSelection(selectedIds);
    setError(err);
    if (err) return;
    clearTimers();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const events = buildTimeline(selectedIds, reduced ? 0.45 : 1);
    const start = initialSim();
    start.phase = "running";
    for (const p of PLATFORMS) start.platforms[p.id] = selectedIds.includes(p.id) ? "queued" : "skipped";
    setSim(start);
    for (const e of events) {
      timers.current.push(window.setTimeout(() => setSim((s) => applyEvent(s, e)), e.at + 50));
    }
  }, [selectedIds]);

  const toggle = (id: PlatformId, on: boolean) => {
    if (running) return;
    setSelected((s) => ({ ...s, [id]: on }));
    setError(null);
    if (sim.phase === "done") setSim(initialSim());
  };

  const regenerate = () => {
    if (running) return;
    setRegenerating(true);
    window.setTimeout(() => {
      setVariant((v) => v + 1);
      setRegenerating(false);
    }, 650);
  };

  const scheduleLabel = (() => {
    try {
      return `${format(parseISO(schedule.date), "EEE, d MMM yyyy")} · ${schedule.time}`;
    } catch {
      return `${schedule.date} · ${schedule.time}`;
    }
  })();

  const currentStep = sim.log.at(-1)?.msg ?? (selectedIds.length ? `Ready · ${selectedIds.length} destination${selectedIds.length === 1 ? "" : "s"} selected` : "No destination selected");
  const publishedCount = Object.values(sim.platforms).filter((s) => s === "published").length;
  const distributing = sim.processing === "done" && Object.values(sim.platforms).some((s) => s === "preparing" || s === "publishing");

  const field = (f: PrepField, children: React.ReactNode, shimmer: React.ReactNode) => {
    const st = sim.prep[f];
    if (regenerating) return shimmer;
    if (sim.phase === "idle" || st === "ready") return <div className={cn(st === "ready" && sim.phase !== "idle" && "animate-fade-up")}>{children}</div>;
    if (st === "preparing") return shimmer;
    return <div className="opacity-30">{shimmer}</div>;
  };

  return (
    <section id="demo" className="relative py-20 sm:py-28">
      <div className="container-page">
        {showHeading ? (
          <SectionHeading
            eyebrow="Primary system · Interactive demo"
            title="See Your Content Move From Upload to Publishing."
            description="Explore a simulated publishing workflow and experience how FLOWORA organizes the process."
          />
        ) : null}

        <div className={cn("panel overflow-hidden rounded-3xl", showHeading && "mt-12")}>
          {/* Top bar */}
          <div className="flex flex-col gap-4 border-b border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="min-w-0">
              <p className="truncate text-xs text-muted-foreground">
                FLOWORA System <span className="text-border-strong">/</span> Workspace <span className="text-border-strong">/</span>{" "}
                <span className="text-foreground">Summer campaign</span>
              </p>
              <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-warning/30 bg-warning/10 px-2.5 py-1 text-xs font-medium text-warning">
                <FlaskConical className="size-3.5" /> Interactive Demo — simulated publishing
              </p>
            </div>
            <Button size="lg" onClick={run} disabled={running} className="w-full sm:w-auto" aria-describedby="demo-status">
              {running ? (
                <>
                  <Loader2 className="animate-spin" /> Running workflow…
                </>
              ) : sim.phase === "done" ? (
                <>
                  <RotateCcw /> Run Again
                </>
              ) : (
                <>
                  <Play /> Execute Workflow
                </>
              )}
            </Button>
          </div>

          {/* Progress */}
          <div className="border-b border-border px-4 py-3 sm:px-6">
            <div className="flex items-center justify-between gap-4 text-xs">
              <p id="demo-status" aria-live="polite" className="min-w-0 truncate text-muted-foreground">
                {currentStep}
              </p>
              <span className="font-mono text-foreground">{sim.progress}%</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={sim.progress} aria-label="Workflow progress">
              <div className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow transition-[width] duration-500 ease-out" style={{ width: `${sim.progress}%` }} />
            </div>
            {error ? (
              <p role="alert" className="mt-3 flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="size-4" /> {error}
              </p>
            ) : null}
          </div>

          {/* Workspace */}
          <div className="grid gap-0 p-4 sm:p-6 lg:grid-cols-[minmax(0,0.9fr)_2.5rem_minmax(0,1.2fr)_2.5rem_minmax(0,1fr)] lg:items-stretch">
            {/* A. Source */}
            <div className={cn("inset-panel rounded-2xl p-4 transition-all duration-500", sim.source === "active" && "border-primary/60 shadow-glow")}>
              <CardLabel icon={<FolderOpen className="size-3.5" />} label="Source video" status={sim.source} />
              <div className="thumb-scene relative mt-3 aspect-video overflow-hidden rounded-xl ring-1 ring-border-strong">
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/70 to-transparent" />
                <div className="absolute left-1/2 top-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-background/50 ring-1 ring-foreground/20 backdrop-blur">
                  <Play className="ml-0.5 size-4 fill-foreground text-foreground" />
                </div>
                <span className="absolute bottom-2 right-2 rounded-md bg-background/70 px-1.5 py-0.5 font-mono text-[11px]">00:42</span>
                {sim.source === "active" ? <div className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden bg-primary/20"><div className="h-full w-1/3 animate-[travel-x_1s_linear_infinite] bg-primary" style={{ position: "relative" }} /></div> : null}
              </div>
              <p className="mt-3 truncate text-sm font-medium">summer-campaign.mp4</p>
              <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
                <dt className="text-muted-foreground">Size</dt>
                <dd className="text-right font-mono">48.6 MB</dd>
                <dt className="text-muted-foreground">Duration</dt>
                <dd className="text-right font-mono">00:42</dd>
                <dt className="text-muted-foreground">Source</dt>
                <dd className="flex items-center justify-end gap-1.5">
                  <DriveGlyph /> Google Drive
                </dd>
              </dl>
              <p className="mt-2 text-[11px] text-muted-foreground">Illustrative sample values</p>
              <div className="mt-4 rounded-xl border border-border bg-card p-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CalendarClock className="size-3.5 text-primary" /> Scheduled for
                </div>
                <p className="mt-1 text-sm font-medium">{scheduleLabel}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 w-full"
                  disabled={running}
                  onClick={() => {
                    setDraft(schedule);
                    setScheduleOpen(true);
                  }}
                >
                  Edit Schedule
                </Button>
              </div>
            </div>

            <Connector active={sim.source === "active"} done={sim.source === "done"} />

            {/* B. Content preparation */}
            <div className={cn("inset-panel rounded-2xl p-4 transition-all duration-500", sim.processing === "active" && "border-primary/60 shadow-glow")}>
              <div className="flex items-start justify-between gap-3">
                <CardLabel icon={<Cpu className="size-3.5" />} label="AI content preparation" status={sim.processing} />
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">Sample output — not produced by a live AI service.</p>

              <div className="mt-3 flex flex-wrap gap-1.5" role="radiogroup" aria-label="Content language">
                {CONTENT_LANGUAGES.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    role="radio"
                    aria-checked={lang === l.id}
                    disabled={running}
                    onClick={() => setLang(l.id)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs transition-colors disabled:opacity-50",
                      lang === l.id ? "border-primary/50 bg-primary/15 text-foreground" : "border-border text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {l.label}
                  </button>
                ))}
              </div>

              <div dir={dir} className="mt-4 space-y-4">
                <FieldBlock label="Title" ready={sim.phase !== "idle" && sim.prep.title === "ready"}>
                  {field("title", <p className="text-[15px] font-medium leading-snug">{content.title}</p>, <Shimmer lines={["w-11/12", "w-2/3"]} />)}
                </FieldBlock>
                <FieldBlock label="Description" ready={sim.phase !== "idle" && sim.prep.description === "ready"}>
                  {field(
                    "description",
                    <p className="text-sm leading-relaxed text-muted-foreground">{content.description}</p>,
                    <Shimmer lines={["w-full", "w-full", "w-3/5"]} />,
                  )}
                </FieldBlock>
                <FieldBlock label="Hashtags" ready={sim.phase !== "idle" && sim.prep.hashtags === "ready"}>
                  {field(
                    "hashtags",
                    <ul className="flex flex-wrap gap-1.5">
                      {content.hashtags.map((h) => (
                        <li key={h} className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-xs text-primary">
                          {h}
                        </li>
                      ))}
                    </ul>,
                    <Shimmer lines={["w-4/5"]} />,
                  )}
                </FieldBlock>
              </div>

              <Button variant="outline" size="sm" className="mt-5 w-full" onClick={regenerate} disabled={running || regenerating}>
                <RefreshCw className={cn(regenerating && "animate-spin")} /> Regenerate Content
              </Button>
            </div>

            <Connector active={distributing} done={sim.phase === "done"} />

            {/* C. Destinations */}
            <div>
              <div className="flex items-center justify-between px-1">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Destinations</p>
                <p className="text-xs text-muted-foreground">{selectedIds.length}/4 selected</p>
              </div>
              <ul className="relative mt-3 space-y-2.5 pl-5">
                <span className="absolute bottom-7 left-0 top-7 w-px bg-border-strong" aria-hidden="true" />
                {PLATFORMS.map((p) => {
                  const st: PlatformStatus = sim.phase === "idle" ? (selected[p.id] ? "idle" : "skipped") : sim.platforms[p.id];
                  const moving = st === "preparing" || st === "publishing";
                  const off = st === "skipped";
                  return (
                    <li key={p.id} className="relative">
                      <span className={cn("absolute -left-5 top-1/2 h-px w-5 overflow-visible", st === "published" ? "bg-success/70" : moving ? "bg-primary/50" : "bg-border-strong")} aria-hidden="true">
                        {moving ? <span className="absolute top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 animate-travel-x rounded-full bg-primary shadow-glow" /> : null}
                      </span>
                      <div
                        className={cn(
                          "inset-panel flex items-center gap-3 rounded-2xl p-3 transition-all duration-300",
                          off && "opacity-50",
                          moving && "border-primary/50",
                          st === "published" && "border-success/40",
                        )}
                      >
                        <PlatformIcon id={p.id} />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{p.name}</p>
                          <p
                            className={cn(
                              "flex items-center gap-1.5 truncate text-xs",
                              st === "published" ? "text-success" : moving ? "text-primary" : "text-muted-foreground",
                            )}
                          >
                            {st === "published" ? <Check className="size-3" /> : moving ? <Loader2 className="size-3 animate-spin" /> : null}
                            {STATUS_LABEL[st]}
                            {!moving && st !== "published" && !off ? <span className="text-muted-foreground/70">· {p.format}</span> : null}
                          </p>
                        </div>
                        <Switch checked={selected[p.id]} onCheckedChange={(v) => toggle(p.id, v)} disabled={running} aria-label={`Include ${p.name}`} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Activity + completion */}
          <div className="grid border-t border-border lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
            <div className="p-4 sm:p-6">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Activity log</p>
              <ol ref={logRef} aria-live="polite" className="mt-3 h-44 space-y-1.5 overflow-y-auto rounded-xl border border-border bg-surface p-3 font-mono text-xs">
                {sim.log.length === 0 ? (
                  <li className="text-muted-foreground">Run the workflow to see simulated activity.</li>
                ) : (
                  sim.log.map((l, i) => (
                    <li key={i} className="flex animate-fade-up gap-3">
                      <span className="shrink-0 text-muted-foreground">{fmtT(l.at)}</span>
                      <span className={cn(l.tone === "success" ? "text-success" : "text-foreground/90")}>{l.msg}</span>
                    </li>
                  ))
                )}
              </ol>
            </div>
            <div className="border-t border-border p-4 sm:p-6 lg:border-l lg:border-t-0">
              {sim.phase === "done" ? (
                <div className="flex h-full animate-fade-up flex-col">
                  <div className="flex items-center gap-2 text-success">
                    <CheckCircle2 className="size-5" />
                    <p className="font-medium">Simulation complete</p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    The content package was prepared for {publishedCount} destination{publishedCount === 1 ? "" : "s"} in this demo. Nothing
                    was uploaded or posted. In a configured FLOWORA System, publishing runs through your own connected accounts.
                  </p>
                  <div className="mt-auto pt-5">
                    <Button onClick={run}>
                      <RotateCcw /> Run Again
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex h-full flex-col">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Summary</p>
                  <dl className="mt-3 space-y-2.5 text-sm">
                    <Row k="File" v="summer-campaign.mp4" />
                    <Row k="Schedule" v={scheduleLabel} />
                    <Row k="Language" v={CONTENT_LANGUAGES.find((l) => l.id === lang)?.label ?? ""} />
                    <Row k="Destinations" v={selectedIds.length ? PLATFORMS.filter((p) => selected[p.id]).map((p) => p.name).join(", ") : "None"} />
                  </dl>
                  <p className="mt-auto pt-5 text-xs text-muted-foreground">
                    <Sparkles className="mr-1 inline size-3 text-primary" />
                    Front-end simulation with sample data. No accounts are connected.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={scheduleOpen} onOpenChange={setScheduleOpen}>
        <DialogContent className="max-w-[calc(100vw-2rem)] rounded-2xl border-border bg-popover sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit schedule</DialogTitle>
            <DialogDescription>Choose when this sample video should be published in the demo.</DialogDescription>
          </DialogHeader>
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!draft.date || !draft.time) return;
              setSchedule(draft);
              setScheduleOpen(false);
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="sched-date">Date</Label>
                <Input id="sched-date" type="date" required value={draft.date} onChange={(e) => setDraft((d) => ({ ...d, date: e.target.value }))} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sched-time">Time</Label>
                <Input id="sched-time" type="time" required value={draft.time} onChange={(e) => setDraft((d) => ({ ...d, time: e.target.value }))} />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Time zone: Africa/Casablanca</p>
            <DialogFooter className="gap-2">
              <Button type="button" variant="ghost" onClick={() => setScheduleOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save schedule</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function CardLabel({ icon, label, status }: { icon: React.ReactNode; label: string; status: NodeStatus }) {
  return (
    <div className="flex w-full items-center justify-between gap-2">
      <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        <span className="text-primary">{icon}</span>
        {label}
      </span>
      <span
        className={cn(
          "flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px]",
          status === "active" ? "bg-primary/15 text-primary" : status === "done" ? "bg-success/15 text-success" : "bg-muted text-muted-foreground",
        )}
      >
        <span className={cn("size-1.5 rounded-full bg-current", status === "active" && "animate-pulse")} />
        {status === "active" ? "Active" : status === "done" ? "Done" : "Idle"}
      </span>
    </div>
  );
}

function FieldBlock({ label, ready, children }: { label: string; ready: boolean; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground" dir="ltr">
        {label}
        {ready ? <Check className="size-3 text-success" /> : null}
      </p>
      {children}
    </div>
  );
}

function Shimmer({ lines }: { lines: string[] }) {
  return (
    <div className="space-y-2" aria-hidden="true">
      {lines.map((w, i) => (
        <div key={i} className={cn("shimmer-line h-3 animate-shimmer rounded", w)} />
      ))}
    </div>
  );
}

function Connector({ active, done }: { active: boolean; done: boolean }) {
  return (
    <div className="relative flex items-center justify-center py-2 lg:py-0" aria-hidden="true">
      <div className={cn("relative h-8 w-px lg:h-px lg:w-full", done ? "bg-success/60" : active ? "bg-primary/50" : "bg-border-strong")}>
        {active ? (
          <>
            <span className="absolute left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 animate-travel-y rounded-full bg-primary shadow-glow lg:hidden" />
            <span className="absolute top-1/2 hidden size-1.5 -translate-x-1/2 -translate-y-1/2 animate-travel-x rounded-full bg-primary shadow-glow lg:block" />
          </>
        ) : null}
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="shrink-0 text-muted-foreground">{k}</dt>
      <dd className="min-w-0 text-right">{v}</dd>
    </div>
  );
}

function DriveGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" aria-hidden="true">
      <path d="M8.2 3h7.6l6 10.4h-7.6z" className="fill-warning" />
      <path d="M2.2 13.4 8.2 3l3.8 6.6-6 10.4z" className="fill-success" />
      <path d="M6 20l3.8-6.6h12L18 20z" className="fill-primary" />
    </svg>
  );
}
