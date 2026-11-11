import { describe, expect, it } from "vitest";
import { SUGGESTED_QUESTIONS, detectIntent, detectLanguage, getAssistantReply } from "@/lib/assistant";
import { buildTimeline, validateSelection } from "@/lib/publishing-sim";
import { generateSampleProspects, toCsv } from "@/lib/prospecting";

describe("assistant", () => {
  it("never quotes a price and invites contact", () => {
    for (const q of ["How much does it cost?", "Quel est le prix ?", "شحال الثمن؟"]) {
      const r = getAssistantReply(q);
      expect(r.intent).toBe("pricing");
      expect(r.text).not.toMatch(/\d+\s*(mad|dh|dhs|\$|€|eur|usd|درهم)/i);
      expect(r.links.some((l) => l.href.startsWith("https://wa.me/212681569749"))).toBe(true);
    }
  });

  it("offers a direct WhatsApp link when asked for a demo", () => {
    const r = getAssistantReply("How can I get a demo?");
    expect(r.intent).toBe("demo");
    expect(r.links[0].href.startsWith("https://wa.me/212681569749")).toBe(true);
  });

  it("answers in the visitor's language", () => {
    expect(detectLanguage("Bonjour, comment fonctionne la publication ?")).toBe("fr");
    expect(detectLanguage("wach kayn maintenance?")).toBe("ar");
    expect(detectLanguage("كيفاش كيخدم النشر؟")).toBe("ar");
    expect(detectLanguage("Which platforms can be connected?")).toBe("en");
  });

  it("maps every suggested question to a real answer", () => {
    for (const q of SUGGESTED_QUESTIONS) expect(detectIntent(q)).not.toBe("fallback");
    expect(detectIntent("How does automatic publishing work?")).toBe("publishing_how");
    expect(detectIntent("How can I contact FLOWORA?")).toBe("contact");
  });

  it("does not claim it contacted a human", () => {
    const r = getAssistantReply("Can I talk to a real person?");
    expect(r.intent).toBe("human");
    expect(r.text).toMatch(/can't transfer/);
  });
});

describe("publishing simulation", () => {
  it("requires at least one destination", () => {
    expect(validateSelection([])).not.toBeNull();
    expect(validateSelection(["tiktok"])).toBeNull();
  });

  it("only targets selected platforms and ends at 100%", () => {
    const events = buildTimeline(["instagram", "youtube"]);
    const targets = new Set(events.flatMap((e) => (e.platform ? [e.platform[0]] : [])));
    expect([...targets].sort()).toEqual(["instagram", "youtube"]);
    expect(events.at(-1)?.progress).toBe(100);
    expect(events.at(-1)?.done).toBe(true);
  });
});

describe("prospecting sample data", () => {
  it("respects max results and labels every record as sample data", () => {
    const rows = generateSampleProspects({ categoryId: "hotels", location: "Marrakech", lang: "en", fields: ["name"], maxResults: 25 });
    expect(rows).toHaveLength(25);
    expect(rows.every((r) => r.source === "Sample Data" && r.name.includes("(Sample)"))).toBe(true);
  });

  it("exports only the chosen fields to CSV", () => {
    const rows = generateSampleProspects({ categoryId: "gyms", location: "Rabat", lang: "en", fields: ["name", "city"], maxResults: 10 });
    const lines = toCsv(rows, ["name", "city"], "en").split("\n");
    expect(lines[1]).toBe("Business name,City");
    expect(lines).toHaveLength(12);
  });
});
