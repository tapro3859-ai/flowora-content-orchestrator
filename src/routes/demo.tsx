import { createFileRoute } from "@tanstack/react-router";
import { PublishingDemo } from "@/components/site/PublishingDemo";
import { CtaBand, PageHeader } from "@/components/site/Section";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Live Demo — FLOWORA Publishing Workflow" },
      { name: "description", content: "Run an interactive, simulated publishing workflow: schedule a sample video, prepare content and watch it move to Instagram, Facebook, TikTok and YouTube." },
      { property: "og:title", content: "Live Demo — FLOWORA Publishing Workflow" },
      { property: "og:description", content: "Run an interactive, simulated publishing workflow: schedule a sample video, prepare content and watch it move to Instagram, Facebook, TikTok and YouTube." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DemoPage,
});

function DemoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Interactive Demo — simulated publishing"
        title="See Your Content Move From Upload to Publishing."
        description="Explore a simulated publishing workflow and experience how FLOWORA organizes the process. Everything runs in your browser with sample data — nothing is uploaded or posted."
      />
      <div className="-mt-8 sm:-mt-12">
        <PublishingDemo showHeading={false} />
      </div>
      <CtaBand />
    </>
  );
}
