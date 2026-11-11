import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Bell, Bot, ClipboardList, FileSpreadsheet, MapPinned, MessageCircle, Sparkles, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openAssistant } from "@/lib/site";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./Section";

function ServiceCard({ icon, title, text, visual, note, actions }: { icon: ReactNode; title: string; text: string; visual: ReactNode; note?: string; actions: ReactNode }) {
  return (
    <article className="panel flex flex-col rounded-3xl p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl border border-border bg-surface-raised text-primary">{icon}</span>
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{text}</p>
      <div className="inset-panel mt-5 rounded-2xl p-4">{visual}</div>
      {note ? <p className="mt-3 text-xs text-muted-foreground">{note}</p> : null}
      <div className="mt-auto flex flex-wrap gap-2 pt-6">{actions}</div>
    </article>
  );
}

function Bubble({ from, children }: { from: "customer" | "agent"; children: ReactNode }) {
  return (
    <div className={cn("flex", from === "agent" ? "justify-start" : "justify-end")}>
      <p className={cn("max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed", from === "agent" ? "rounded-bl-md bg-surface-raised" : "rounded-br-md bg-primary/20")}>{children}</p>
    </div>
  );
}

function FlowNode({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-1.5 text-center">
      <span className="grid size-10 place-items-center rounded-xl border border-border-strong bg-card text-primary">{icon}</span>
      <span className="text-[11px] leading-tight text-muted-foreground">{label}</span>
    </div>
  );
}

export function Services() {
  return (
    <section id="solutions" className="border-t border-border py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Additional solutions"
          title="More systems, built the same way."
          description="Alongside content publishing, FLOWORA builds focused automation for customer conversations, prospecting, and daily operations."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <ServiceCard
            icon={<Bot className="size-5" />}
            title="AI Customer Agent"
            text="An intelligent assistant that answers customer questions using approved business information, helps qualify leads, and hands complex requests to a human when necessary."
            visual={
              <div className="space-y-2" aria-label="Example conversation">
                <Bubble from="customer">Do you deliver to Rabat?</Bubble>
                <Bubble from="agent">Yes — orders to Rabat usually arrive in 2–3 business days. Which product are you interested in?</Bubble>
                <Bubble from="customer">I'd like a bulk order for my shop.</Bubble>
                <Bubble from="agent">For bulk orders I'll pass your details to the sales team so they can follow up.</Bubble>
                <p className="pt-1 text-center text-[11px] text-muted-foreground">Example conversation</p>
              </div>
            }
            actions={
              <>
                <Button size="sm" onClick={() => openAssistant()}>
                  Try the assistant
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link to="/contact" search={{ service: "ai-agent" }}>
                    Explore Service <ArrowRight />
                  </Link>
                </Button>
              </>
            }
          />
          <ServiceCard
            icon={<MessageCircle className="size-5" />}
            title="WhatsApp Automation"
            text="Organize customer inquiries, collect order details, provide configured answers, and notify your team when human attention is needed."
            note="Availability depends on the required integrations and account permissions."
            visual={
              <div className="grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
                <div className="space-y-2">
                  <Bubble from="customer">2 linen shirts, size M, delivery to Casablanca</Bubble>
                  <Bubble from="agent">Got it. Can you confirm your name and address?</Bubble>
                </div>
                <ArrowRight className="mx-auto size-4 rotate-90 text-primary sm:rotate-0" aria-hidden="true" />
                <div className="rounded-xl border border-border bg-card p-3 text-xs">
                  <p className="flex items-center gap-1.5 font-medium">
                    <ClipboardList className="size-3.5 text-primary" /> Order draft
                  </p>
                  <dl className="mt-2 space-y-1 text-muted-foreground">
                    <div className="flex justify-between gap-2"><dt>Items</dt><dd className="text-foreground">2 × Shirt (M)</dd></div>
                    <div className="flex justify-between gap-2"><dt>City</dt><dd className="text-foreground">Casablanca</dd></div>
                    <div className="flex justify-between gap-2"><dt>Next</dt><dd className="text-warning">Team review</dd></div>
                  </dl>
                </div>
              </div>
            }
            actions={
              <Button asChild size="sm" variant="outline">
                <Link to="/contact" search={{ service: "whatsapp" }}>
                  Explore Service <ArrowRight />
                </Link>
              </Button>
            }
          />
          <ServiceCard
            icon={<MapPinned className="size-5" />}
            title="Business Prospecting With Google Maps"
            text="Find relevant businesses and organize public business information into a clean, structured prospect list — through authorized data sources."
            visual={
              <div className="overflow-hidden rounded-xl border border-border text-xs">
                {[
                  ["Cedar Bistro 01 (Sample)", "Casablanca", "4.6"],
                  ["Atlas Kitchen 02 (Sample)", "Casablanca", "4.3"],
                  ["Oasis Grill 03 (Sample)", "Casablanca", "—"],
                ].map(([n, c, r]) => (
                  <div key={n} className="flex items-center justify-between gap-3 border-b border-border px-3 py-2 last:border-b-0">
                    <span className="min-w-0 truncate">{n}</span>
                    <span className="hidden text-muted-foreground sm:inline">{c}</span>
                    <span className="font-mono text-muted-foreground">{r}</span>
                  </div>
                ))}
                <p className="bg-card px-3 py-1.5 text-center text-[11px] text-warning">Sample Data</p>
              </div>
            }
            actions={
              <>
                <Button asChild size="sm">
                  <Link to="/solutions" hash="prospecting">
                    Open the demo
                  </Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link to="/contact" search={{ service: "prospecting" }}>
                    Explore Service <ArrowRight />
                  </Link>
                </Button>
              </>
            }
          />
          <ServiceCard
            icon={<Workflow className="size-5" />}
            title="Custom Business Automation"
            text="If your team repeats the same task every day, FLOWORA can help design a system around your existing tools and business process."
            visual={
              <div className="relative grid grid-cols-4 gap-2 py-1">
                <svg className="absolute inset-x-[12%] top-6 h-px w-[76%] overflow-visible" aria-hidden="true">
                  <line x1="0" y1="0" x2="100%" y2="0" className="animate-flow-dash stroke-primary/70" strokeWidth="1.5" strokeDasharray="4 6" />
                </svg>
                <FlowNode icon={<ClipboardList className="size-4" />} label="Form" />
                <FlowNode icon={<Sparkles className="size-4" />} label="AI processing" />
                <FlowNode icon={<FileSpreadsheet className="size-4" />} label="Spreadsheet" />
                <FlowNode icon={<Bell className="size-4" />} label="Notification" />
              </div>
            }
            note="Websites and software are also developed when a project requires them."
            actions={
              <Button asChild size="sm" variant="outline">
                <Link to="/contact" search={{ service: "custom" }}>
                  Explore Service <ArrowRight />
                </Link>
              </Button>
            }
          />
        </div>
      </div>
    </section>
  );
}
