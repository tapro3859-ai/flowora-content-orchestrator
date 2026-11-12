import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Prospecting } from "@/components/site/Prospecting";
import { CtaBand, PageHeader } from "@/components/site/Section";
import { Services } from "@/components/site/Services";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions — FLOWORA Automation Systems" },
      { name: "description", content: "Content publishing automation, AI customer agents, WhatsApp automation, business prospecting and custom workflows from FLOWORA." },
      { property: "og:title", content: "Solutions — FLOWORA Automation Systems" },
      { property: "og:description", content: "Content publishing automation, AI customer agents, WhatsApp automation, business prospecting and custom workflows from FLOWORA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SolutionsPage,
});

function SolutionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title="Automation systems built around how you work."
        description="FLOWORA's main product automates content publishing. The same approach powers customer agents, WhatsApp flows, prospect organization and custom workflows."
      />
      <section className="container-page pt-16 sm:pt-20">
        <div className="panel relative overflow-hidden rounded-3xl p-6 sm:p-10">
          <div className="bg-atmosphere pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Primary system</p>
              <h2 className="text-display mt-4 flex items-center gap-3 text-3xl sm:text-4xl">
                <Send className="size-7 shrink-0 text-primary" /> Content Publishing Automation
              </h2>
              <p className="mt-4 text-muted-foreground">
                Prepare a video once. The FLOWORA System prepares titles, descriptions and hashtags and runs the configured
                publishing workflow for Instagram, Facebook, TikTok and YouTube — subject to supported integrations and account permissions.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button asChild size="lg">
                <Link to="/demo">
                  See Live Demo <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/how-it-works">How It Works</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Services />
      <Prospecting />
      <CtaBand />
    </>
  );
}
