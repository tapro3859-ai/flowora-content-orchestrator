import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="text-display text-heading-gradient mt-4 text-[2rem] sm:text-5xl">{title}</h2>
      {description ? <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p> : null}
    </div>
  );
}

export function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: ReactNode; description: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="bg-atmosphere pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="container-page relative py-16 sm:py-24">
        <p className="eyebrow animate-fade-up">{eyebrow}</p>
        <h1 className="text-display text-heading-gradient mt-4 max-w-3xl animate-fade-up text-[2.5rem] sm:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl animate-fade-up text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="container-page py-20 sm:py-28">
      <div className="panel relative overflow-hidden rounded-3xl px-6 py-12 sm:px-12 sm:py-16">
        <div className="bg-atmosphere pointer-events-none absolute inset-0 opacity-80" aria-hidden="true" />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">Start a conversation</p>
            <h2 className="text-display mt-4 text-3xl sm:text-4xl">Let's design the system your team actually needs.</h2>
            <p className="mt-4 text-muted-foreground">
              Share how you publish and operate today. FLOWORA reviews what can be automated and what each
              integration requires.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href={whatsappLink("Hello FLOWORA, I'd like to discuss automating my business.")} target="_blank" rel="noopener noreferrer">
                <MessageCircle /> Discuss on WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">
                Contact options <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
