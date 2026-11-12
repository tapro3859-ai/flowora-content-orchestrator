import { createFileRoute } from "@tanstack/react-router";
import { Compass, Settings2, ShieldCheck } from "lucide-react";
import { CtaBand, PageHeader, SectionHeading } from "@/components/site/Section";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About FLOWORA — Moroccan Automation Studio" },
      { name: "description", content: "FLOWORA is a Moroccan software and automation studio building content publishing systems, AI agents, lead organization and custom integrations." },
      { property: "og:title", content: "About FLOWORA — Moroccan Automation Studio" },
      { property: "og:description", content: "FLOWORA is a Moroccan software and automation studio building content publishing systems, AI agents, lead organization and custom integrations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const PRINCIPLES = [
  { icon: Compass, title: "Built around your business", text: "Every system starts from how your team already works — not from a template." },
  { icon: Settings2, title: "Configured for your workflow", text: "Integrations, content rules and destinations are set up for your accounts and permissions." },
  { icon: ShieldCheck, title: "Monitored and maintained", text: "Systems are looked after during the agreed service period, so automation stays useful." },
];

const BUILD = [
  "Automated content publishing workflows",
  "Intelligent AI customer support agents",
  "WhatsApp business automation",
  "Business prospecting and data organization",
  "Custom workflow automation and integrations",
  "Websites and software when a project requires them",
];

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A Moroccan studio for practical automation."
        description="FLOWORA designs and builds software systems that remove repetitive work — starting with how businesses publish content."
      />
      <section className="container-page grid gap-12 py-20 sm:py-28 lg:grid-cols-2">
        <SectionHeading
          eyebrow="What we build"
          title="Focused systems, honestly scoped."
          description="We say clearly what an integration can do, what depends on platform permissions, and what needs configuration. That clarity is part of the product."
        />
        <ul className="grid gap-2.5 self-center">
          {BUILD.map((b, i) => (
            <li key={b} className="inset-panel flex items-center gap-4 rounded-2xl px-4 py-3.5">
              <span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-sm sm:text-base">{b}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="border-t border-border py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading eyebrow="How we work" title="Three commitments." />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {PRINCIPLES.map(({ icon: Icon, title, text }) => (
              <article key={title} className="panel rounded-3xl p-6">
                <Icon className="size-5 text-primary" />
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
