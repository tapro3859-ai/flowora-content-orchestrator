/**
 * Front-end publishing simulation. Deterministic, local-only: no network calls,
 * no real uploads or publishing. Used by the interactive demo.
 */
export type PlatformId = "instagram" | "facebook" | "tiktok" | "youtube";

export const PLATFORMS: { id: PlatformId; name: string; format: string }[] = [
  { id: "instagram", name: "Instagram", format: "Reel · 9:16" },
  { id: "facebook", name: "Facebook", format: "Video post" },
  { id: "tiktok", name: "TikTok", format: "Short video · 9:16" },
  { id: "youtube", name: "YouTube", format: "Shorts" },
];

export type PlatformStatus = "idle" | "queued" | "preparing" | "publishing" | "published" | "skipped";
export type NodeStatus = "idle" | "active" | "done";
export type PrepStatus = "idle" | "preparing" | "ready";
export type PrepField = "title" | "description" | "hashtags";

export interface SimEvent {
  at: number;
  progress: number;
  log: string;
  tone?: "info" | "success";
  source?: NodeStatus;
  processing?: NodeStatus;
  prep?: [PrepField, PrepStatus][];
  platform?: [PlatformId, PlatformStatus];
  done?: boolean;
}

export function validateSelection(selected: PlatformId[]): string | null {
  return selected.length === 0 ? "Select at least one destination to run the workflow." : null;
}

export function platformName(id: PlatformId) {
  return PLATFORMS.find((p) => p.id === id)?.name ?? id;
}

/** Builds the ordered event timeline. `speed` < 1 shortens every delay. */
export function buildTimeline(selected: PlatformId[], speed = 1): SimEvent[] {
  const s = (ms: number) => Math.round(ms * speed);
  const n = selected.length;
  const events: SimEvent[] = [
    { at: 0, progress: 6, log: "Workflow started — simulated run", source: "active" },
    { at: s(650), progress: 14, log: "Reading summer-campaign.mp4 from Google Drive (sample file)" },
    {
      at: s(1350),
      progress: 22,
      log: "FLOWORA System is preparing the content package",
      source: "done",
      processing: "active",
      prep: [["title", "preparing"]],
    },
    {
      at: s(2050),
      progress: 32,
      log: "Title prepared",
      prep: [
        ["title", "ready"],
        ["description", "preparing"],
      ],
    },
    {
      at: s(2800),
      progress: 42,
      log: "Description prepared",
      prep: [
        ["description", "ready"],
        ["hashtags", "preparing"],
      ],
    },
    {
      at: s(3500),
      progress: 50,
      log: `Hashtags prepared — package ready for ${n} destination${n === 1 ? "" : "s"}`,
      prep: [["hashtags", "ready"]],
      processing: "done",
    },
  ];

  const base = 3950;
  const step = 46 / Math.max(1, n * 3);
  let p = 50;
  const platformEvents: SimEvent[] = [];
  selected.forEach((id, i) => {
    const name = platformName(id);
    platformEvents.push({ at: s(base + i * 380), progress: 0, log: `Preparing ${name} format`, platform: [id, "preparing"] });
    platformEvents.push({ at: s(base + 1150 + i * 480), progress: 0, log: `Publishing to ${name} (simulated)`, platform: [id, "publishing"] });
    platformEvents.push({
      at: s(base + 2400 + i * 560),
      progress: 0,
      log: `${name}: Published in Demo`,
      tone: "success",
      platform: [id, "published"],
    });
  });
  platformEvents.sort((a, b) => a.at - b.at);
  for (const e of platformEvents) {
    p += step;
    e.progress = Math.min(96, Math.round(p));
  }
  events.push(...platformEvents);

  const last = events[events.length - 1].at;
  events.push({
    at: last + s(650),
    progress: 100,
    log: "Simulation complete — nothing was uploaded or published",
    tone: "success",
    done: true,
  });
  return events;
}
