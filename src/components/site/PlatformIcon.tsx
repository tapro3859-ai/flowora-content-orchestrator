import type { PlatformId } from "@/lib/publishing-sim";
import { cn } from "@/lib/utils";

const TILE: Record<PlatformId, string> = {
  instagram: "bg-instagram/15 text-instagram ring-instagram/30",
  facebook: "bg-facebook/15 text-facebook ring-facebook/30",
  tiktok: "bg-tiktok/12 text-tiktok ring-tiktok/30",
  youtube: "bg-youtube/15 text-youtube ring-youtube/30",
};

function Glyph({ id }: { id: PlatformId }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (id) {
    case "instagram":
      return (
        <g {...common}>
          <rect x="4" y="4" width="16" height="16" rx="5" />
          <circle cx="12" cy="12" r="3.6" />
          <circle cx="16.8" cy="7.2" r="0.6" fill="currentColor" />
        </g>
      );
    case "facebook":
      return (
        <path
          {...common}
          d="M14.5 20v-6.5h2.3l.4-2.8h-2.7V9c0-.8.3-1.4 1.4-1.4h1.4V5.2c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5v2.1H9.6v2.8h2.3V20"
        />
      );
    case "tiktok":
      return (
        <g {...common}>
          <path d="M13.5 4v10.8a3.3 3.3 0 1 1-3.3-3.3" />
          <path d="M13.5 4c.4 2.4 2.1 4 4.6 4.2" />
        </g>
      );
    case "youtube":
      return (
        <g>
          <rect x="3" y="6" width="18" height="12" rx="4" {...common} />
          <path d="M10.5 9.6v4.8l4-2.4z" fill="currentColor" />
        </g>
      );
  }
}

export function PlatformIcon({ id, className, tile = true }: { id: PlatformId; className?: string; tile?: boolean }) {
  const svg = (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn(tile ? "size-[18px]" : "size-5", !tile && className)}>
      <Glyph id={id} />
    </svg>
  );
  if (!tile) return svg;
  return (
    <span className={cn("inline-flex size-9 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset", TILE[id], className)}>
      {svg}
    </span>
  );
}
