import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Monitoring } from "@/components/site/Monitoring";
import { PublishingDemo } from "@/components/site/PublishingDemo";
import { CtaBand } from "@/components/site/Section";
import { Services } from "@/components/site/Services";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FLOWORA — Create Once. Publish Everywhere." },
      { name: "description", content: "Automated content publishing for Instagram, Facebook, TikTok and YouTube. Prepare, schedule and let the FLOWORA System handle the configured publishing workflow." },
      { property: "og:title", content: "FLOWORA — Create Once. Publish Everywhere." },
      { property: "og:description", content: "Automated content publishing for Instagram, Facebook, TikTok and YouTube. Prepare, schedule and let the FLOWORA System handle the configured publishing workflow." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <PublishingDemo />
      <HowItWorks />
      <Monitoring />
      <Services />
      <CtaBand />
    </>
  );
}
