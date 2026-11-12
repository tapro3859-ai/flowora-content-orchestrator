import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/site/Section";
import { CONTACT, whatsappLink } from "@/lib/site";

const SERVICES = [
  { id: "publishing", label: "Content publishing system" },
  { id: "ai-agent", label: "AI customer agent" },
  { id: "whatsapp", label: "WhatsApp automation" },
  { id: "prospecting", label: "Business prospecting" },
  { id: "custom", label: "Custom business automation" },
  { id: "website", label: "Website or software" },
];

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): { service?: string } =>
    typeof search["service"] === "string" && SERVICES.some((s) => s.id === search["service"]) ? { service: search["service"] } : {},
  head: () => ({
    meta: [
      { title: "Contact FLOWORA — Talk About Your Automation" },
      { name: "description", content: "Reach FLOWORA on WhatsApp, by phone or email to discuss content publishing automation, AI agents or custom workflows for your business." },
      { property: "og:title", content: "Contact FLOWORA — Talk About Your Automation" },
      { property: "og:description", content: "Reach FLOWORA on WhatsApp, by phone or email to discuss content publishing automation, AI agents or custom workflows for your business." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { service } = Route.useSearch();
  const [form, setForm] = useState({ name: "", company: "", service: service ?? "publishing", message: "" });
  const label = SERVICES.find((s) => s.id === form.service)?.label ?? "";
  const composed = [
    "Hello FLOWORA,",
    form.name.trim() && `My name is ${form.name.trim()}${form.company.trim() ? ` from ${form.company.trim()}` : ""}.`,
    `I'm interested in: ${label}.`,
    form.message.trim(),
  ]
    .filter(Boolean)
    .join("\n");
  const mailto = `${CONTACT.emailHref}?subject=${encodeURIComponent(`FLOWORA inquiry — ${label}`)}&body=${encodeURIComponent(composed)}`;

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to FLOWORA."
        description="Tell us how your team works today. We'll review what can be automated, which integrations are needed, and how maintenance would work."
      />
      <section className="container-page grid gap-8 py-16 sm:py-24 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid content-start gap-3">
          <ContactCard icon={<MessageCircle className="size-5" />} title="WhatsApp" value={CONTACT.phoneDisplay} href={CONTACT.whatsapp} external />
          <ContactCard icon={<Phone className="size-5" />} title="Phone" value={CONTACT.phoneDisplay} href={CONTACT.phoneHref} />
          <ContactCard icon={<Mail className="size-5" />} title="Email" value={CONTACT.email} href={CONTACT.emailHref} />
          <p className="mt-2 text-sm text-muted-foreground">Pricing depends on your requirements. FLOWORA prepares a proposal after understanding your workflow.</p>
        </div>

        <form
          className="panel grid gap-5 rounded-3xl p-5 sm:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            window.open(whatsappLink(composed), "_blank", "noopener,noreferrer");
          }}
        >
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Prepare your message</h2>
            <p className="mt-1 text-sm text-muted-foreground">Your message opens in WhatsApp or your email app. Nothing is stored on this website.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="c-name">Name</Label>
              <Input id="c-name" maxLength={80} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-10 bg-surface" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="c-company">Company</Label>
              <Input id="c-company" maxLength={80} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="h-10 bg-surface" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="c-service">Service</Label>
            <select
              id="c-service"
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              className="h-10 w-full rounded-lg border border-input bg-surface px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {SERVICES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="c-msg">What would you like to automate?</Label>
            <Textarea id="c-msg" rows={5} maxLength={1000} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="bg-surface" placeholder="e.g. We publish 20 videos a week across Instagram and TikTok…" />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="submit" size="lg">
              <Send /> Send via WhatsApp
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={mailto}>
                <Mail /> Send by email
              </a>
            </Button>
          </div>
        </form>
      </section>
    </>
  );
}

function ContactCard({ icon, title, value, href, external }: { icon: React.ReactNode; title: string; value: string; href: string; external?: boolean }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="panel flex items-center gap-4 rounded-2xl p-4 transition-colors hover:border-primary/40"
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-surface-raised text-primary">{icon}</span>
      <span className="min-w-0">
        <span className="block text-xs text-muted-foreground">{title}</span>
        <span className="block break-all font-medium">{value}</span>
      </span>
    </a>
  );
}
