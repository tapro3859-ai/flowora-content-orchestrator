import { createFileRoute } from "@tanstack/react-router";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Monitoring } from "@/components/site/Monitoring";
import { CtaBand, PageHeader } from "@/components/site/Section";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — FLOWORA Publishing System" },
      { name: "description", content: "Prepare, schedule, generate and publish: how the FLOWORA content publishing system works, plus ongoing monitoring and maintenance." },
      { property: "og:title", content: "How It Works — FLOWORA Publishing System" },
      { property: "og:description", content: "Prepare, schedule, generate and publish: how the FLOWORA content publishing system works, plus ongoing monitoring and maintenance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HowPage,
});

function HowPage() {
  return (
    <>
      <PageHeader
        eyebrow="How It Works"
        title="A simple process. A carefully configured system."
        description="Your team handles the content. FLOWORA configures the automated workflow around your accounts and tools, then keeps it maintained."
      />
      <HowItWorks />
      <Monitoring />
      <CtaBand />
    </>
  );
}
