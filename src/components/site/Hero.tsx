import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { HeroPreview } from "./HeroPreview";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-atmosphere pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="container-page relative grid items-center gap-12 pb-20 pt-12 sm:pt-20 lg:grid-cols-[1fr_1.02fr] lg:gap-14 lg:pb-28 lg:pt-24">
        <div className="max-w-xl">
          <p className="eyebrow animate-fade-up">Intelligent Content Automation</p>
          <h1 className="text-display text-heading-gradient mt-5 animate-fade-up text-[2.75rem] sm:text-6xl lg:text-[4.25rem]">
            Create Once. Publish Everywhere.
          </h1>
          <p className="mt-6 animate-fade-up text-base leading-relaxed text-muted-foreground sm:text-lg">
            FLOWORA turns repetitive content publishing into an automated system. Prepare your video, schedule your
            content, and let the system handle the configured publishing process across your connected social
            platforms.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="#demo">
                Explore the Live Demo <ArrowRight />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">Discuss Your Business</Link>
            </Button>
          </div>
          <p className="mt-8 flex items-start gap-2.5 text-sm text-muted-foreground">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
            Built around your business. Configured for your workflow. Monitored and maintained.
          </p>
        </div>
        <HeroPreview />
      </div>
    </section>
  );
}
