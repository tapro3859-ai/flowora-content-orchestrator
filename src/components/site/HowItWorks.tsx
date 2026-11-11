import { CalendarClock, FolderOpen, Send, Sparkles } from "lucide-react";
import { SectionHeading } from "./Section";

const STEPS = [
  { n: "01", title: "Prepare", text: "Choose your content and organize your video files.", icon: FolderOpen },
  { n: "02", title: "Schedule", text: "Set the publishing time and choose the connected destinations.", icon: CalendarClock },
  { n: "03", title: "Generate", text: "Prepare platform-appropriate titles, descriptions, and hashtags through the configured content-generation process.", icon: Sparkles },
  { n: "04", title: "Publish", text: "Let the configured system handle the publishing workflow and monitor its status.", icon: Send },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-border py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading eyebrow="How the system works" title="Four steps from file to feed." description="A clear process your team can follow — the configuration and integrations are handled by FLOWORA." />
        <ol className="relative mt-14 grid gap-8 md:grid-cols-4 md:gap-6">
          <span className="absolute bottom-4 left-[19px] top-4 w-px bg-gradient-to-b from-primary/60 via-border-strong to-transparent md:bottom-auto md:left-5 md:right-5 md:top-5 md:h-px md:w-auto md:bg-gradient-to-r" aria-hidden="true" />
          {STEPS.map(({ n, title, text, icon: Icon }) => (
            <li key={n} className="relative flex gap-5 md:flex-col md:gap-0">
              <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-border-strong bg-surface-raised text-primary shadow-inset">
                <Icon className="size-4" />
              </span>
              <div className="md:mt-6">
                <p className="font-mono text-xs text-muted-foreground">{n}</p>
                <h3 className="mt-1 text-xl font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
