import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={cn("size-7", className)}>
      <rect x="0.5" y="0.5" width="31" height="31" rx="9" className="fill-surface-raised stroke-border-strong" />
      <path
        d="M9 16c4 0 5-7 10-7M9 16h10M9 16c4 0 5 7 10 7"
        className="stroke-primary"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="8.5" cy="16" r="2.4" className="fill-foreground" />
      <circle cx="22" cy="9" r="1.7" className="fill-primary" />
      <circle cx="22" cy="16" r="1.7" className="fill-primary" />
      <circle cx="22" cy="23" r="1.7" className="fill-primary" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="text-[15px] font-semibold tracking-[0.18em] text-foreground">FLOWORA</span>
    </span>
  );
}
