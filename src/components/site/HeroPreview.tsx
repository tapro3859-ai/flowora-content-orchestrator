import { useEffect, useState } from "react";
import { Check, Clock, Film, Sparkles } from "lucide-react";
import { PLATFORMS } from "@/lib/publishing-sim";
import { cn } from "@/lib/utils";
import { PlatformIcon } from "./PlatformIcon";

const STEPS = ["Received", "Scheduled", "Generated", "Distributing"];
const LAST = 5;

export function HeroPreview() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStage(4);
      return;
    }
    const id = window.setInterval(() => setStage((s) => (s >= LAST ? 0 : s + 1)), 1500);
    return () => window.clearInterval(id);
  }, []);

  const generated = stage >= 3;
  const status = (i: number) => (stage < 3 ? "Queued" : stage === 3 ? (i % 2 ? "Queued" : "Publishing") : "Published");

  return (
    <div className="panel relative w-full rounded-3xl p-4 sm:p-5" aria-label="Animated product preview of the FLOWORA publishing system">
      <div className="pointer-events-none absolute -inset-px -z-10 rounded-3xl bg-primary/10 blur-2xl" aria-hidden="true" />

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-success" />
          FLOWORA System
          <span className="hidden rounded-full border border-border px-2 py-0.5 sm:inline">Product preview · simulated</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
          <Clock className="size-3" /> Fri · 18:30
        </div>
      </div>

      {/* Source file */}
      <div key={stage === 0 ? "enter" : "static"} className={cn("inset-panel mt-4 flex items-center gap-3 rounded-2xl p-3", stage === 0 && "animate-slide-in")}>
        <div className="thumb-scene relative grid h-12 w-9 shrink-0 place-items-center overflow-hidden rounded-lg ring-1 ring-border-strong">
          <Film className="size-3.5 text-foreground/80" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">summer-campaign.mp4</p>
          <p className="font-mono text-[11px] text-muted-foreground">48.6 MB · 00:42 · 9:16</p>
        </div>
        <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-medium transition-colors", stage >= 1 ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground")}>
          {stage >= 1 ? "Scheduled" : "Incoming"}
        </span>
      </div>

      {/* Timeline */}
      <ol className="mt-4 grid grid-cols-4 gap-2" aria-label="Processing timeline">
        {STEPS.map((label, i) => {
          const done = stage > i + 1 || stage >= 4;
          const active = stage === i + 1 || (i === 0 && stage === 0);
          return (
            <li key={label} className="min-w-0">
              <div className="h-1 overflow-hidden rounded-full bg-muted">
                <div className={cn("h-full rounded-full bg-primary transition-all duration-700", done ? "w-full" : active ? "w-1/2" : "w-0")} />
              </div>
              <p className={cn("mt-2 truncate text-[11px] sm:text-xs", done || active ? "text-foreground" : "text-muted-foreground")}>{label}</p>
            </li>
          );
        })}
      </ol>

      {/* Generated content */}
      <div className="inset-panel mt-4 rounded-2xl p-3.5">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-primary">
          <Sparkles className="size-3.5" /> Prepared content
        </div>
        {generated ? (
          <div className="animate-fade-up">
            <p className="mt-2 text-sm font-medium leading-snug">Summer Campaign 2026 — Light, Linen &amp; Long Evenings</p>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
              Our summer collection is here. Breathable fabrics, warm tones, and pieces designed for long days by the sea.
            </p>
            <p className="mt-2 truncate font-mono text-[11px] text-primary/90">#SummerCampaign #NewCollection #Lookbook</p>
          </div>
        ) : (
          <div className="mt-3 space-y-2" aria-hidden="true">
            <div className={cn("h-3 w-4/5 rounded", stage === 2 ? "shimmer-line animate-shimmer" : "bg-muted")} />
            <div className={cn("h-2.5 w-full rounded", stage === 2 ? "shimmer-line animate-shimmer" : "bg-muted")} />
            <div className={cn("h-2.5 w-2/3 rounded", stage === 2 ? "shimmer-line animate-shimmer" : "bg-muted")} />
          </div>
        )}
      </div>

      {/* Flow lines */}
      <svg viewBox="0 0 400 44" preserveAspectRatio="none" className="h-9 w-full" aria-hidden="true">
        {[50, 150, 250, 350].map((x) => (
          <g key={x}>
            <path d={`M200 0 C200 26 ${x} 18 ${x} 44`} className="stroke-border-strong" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
            <path
              d={`M200 0 C200 26 ${x} 18 ${x} 44`}
              className={cn("stroke-primary transition-opacity duration-500", stage >= 3 ? "animate-flow-dash opacity-100" : "opacity-0")}
              strokeWidth="1.5"
              strokeDasharray="4 8"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        ))}
      </svg>

      {/* Destinations */}
      <ul className="grid grid-cols-4 gap-2">
        {PLATFORMS.map((p, i) => {
          const s = status(i);
          return (
            <li key={p.id} className={cn("inset-panel flex min-w-0 flex-col items-center gap-1.5 rounded-2xl px-1.5 py-2.5 transition-colors", s === "Published" && "border-success/30")}>
              <PlatformIcon id={p.id} className="size-8 rounded-lg" />
              <span className="hidden max-w-full truncate text-xs font-medium sm:block">{p.name}</span>
              <span className={cn("flex items-center gap-1 text-[11px]", s === "Published" ? "text-success" : s === "Publishing" ? "text-primary" : "text-muted-foreground")}>
                {s === "Published" ? <Check className="size-3" /> : <span className={cn("size-1.5 rounded-full bg-current", s === "Publishing" && "animate-pulse")} />}
                <span className="truncate">{s}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
