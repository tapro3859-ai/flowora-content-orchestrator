import { useState } from "react";
import { Download, Info, Loader2, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CATEGORIES,
  FIELD_LABELS,
  MAX_RESULT_OPTIONS,
  PROSPECT_FIELDS,
  sampleProvider,
  toCsv,
  type Prospect,
  type ProspectField,
  type ProspectLang,
  type ProspectQuery,
} from "@/lib/prospecting";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./Section";

const selectClass =
  "h-10 w-full rounded-lg border border-input bg-surface px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const LANGS: { id: ProspectLang; label: string }[] = [
  { id: "en", label: "English" },
  { id: "fr", label: "Français" },
  { id: "ar", label: "العربية" },
];

export function Prospecting() {
  const [categoryId, setCategoryId] = useState(CATEGORIES[0].id);
  const [location, setLocation] = useState("Casablanca");
  const [lang, setLang] = useState<ProspectLang>("en");
  const [fields, setFields] = useState<ProspectField[]>(["name", "category", "city", "phone", "website", "rating", "source"]);
  const [maxResults, setMaxResults] = useState<number>(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ rows: Prospect[]; query: ProspectQuery } | null>(null);

  const toggleField = (f: ProspectField, on: boolean) =>
    setFields((cur) => (on ? PROSPECT_FIELDS.filter((x) => x === f || cur.includes(x)) : cur.filter((x) => x !== f)));

  const generate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim()) return setError("Enter a location.");
    if (fields.length === 0) return setError("Choose at least one field.");
    setError(null);
    setLoading(true);
    const query: ProspectQuery = { categoryId, location: location.trim(), lang, fields, maxResults };
    await new Promise((r) => setTimeout(r, 600));
    const rows = await sampleProvider.search(query);
    setResult({ rows, query });
    setLoading(false);
  };

  const download = () => {
    if (!result) return;
    const csv = toCsv(result.rows, result.query.fields, result.query.lang);
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `flowora-sample-prospects-${result.query.categoryId}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="prospecting" className="border-t border-border py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Business prospecting with Google Maps"
          title="Find Relevant Businesses. Organize Your Prospects."
          description="Define who you want to reach and which public business details you need. This demo returns fictional sample records — a real, authorized data source is connected only during a client project."
        />

        <div className="panel mt-12 overflow-hidden rounded-3xl lg:grid lg:grid-cols-[22rem_minmax(0,1fr)]">
          <form onSubmit={generate} className="grid content-start gap-5 border-b border-border p-5 sm:p-6 lg:border-b-0 lg:border-r">
            <div className="grid gap-2">
              <Label htmlFor="p-cat">Business category</Label>
              <select id="p-cat" className={selectClass} value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label.en}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="p-loc">Location</Label>
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="p-loc" value={location} maxLength={60} onChange={(e) => setLocation(e.target.value)} className="h-10 bg-surface pl-9" placeholder="City or area" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label htmlFor="p-lang">Preferred language</Label>
                <select id="p-lang" className={selectClass} value={lang} onChange={(e) => setLang(e.target.value as ProspectLang)}>
                  {LANGS.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="p-max">Max results</Label>
                <select id="p-max" className={selectClass} value={maxResults} onChange={(e) => setMaxResults(Number(e.target.value))}>
                  {MAX_RESULT_OPTIONS.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <fieldset className="grid gap-2.5">
              <legend className="mb-2.5 text-sm font-medium">Information to request</legend>
              {PROSPECT_FIELDS.map((f) => (
                <label key={f} className="flex cursor-pointer items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground">
                  <Checkbox checked={fields.includes(f)} onCheckedChange={(v) => toggleField(f, v === true)} />
                  {FIELD_LABELS.en[f]}
                  {f === "phone" ? <span className="text-xs text-muted-foreground/70">(publicly listed)</span> : null}
                  {f === "rating" ? <span className="text-xs text-muted-foreground/70">(when available)</span> : null}
                </label>
              ))}
            </fieldset>
            {error ? (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            ) : null}
            <Button type="submit" size="lg" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : <Search />} Generate Sample Results
            </Button>
          </form>

          <div className="min-w-0 p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-warning/30 bg-warning/10 px-2.5 py-1 text-xs font-medium text-warning">Sample Data</span>
                {result ? <span className="text-xs text-muted-foreground">{result.rows.length} fictional records</span> : null}
              </div>
              <Button variant="outline" size="sm" onClick={download} disabled={!result}>
                <Download /> Download CSV
              </Button>
            </div>

            <div className="mt-4 max-h-[26rem] overflow-auto rounded-2xl border border-border bg-surface" dir={result?.query.lang === "ar" ? "rtl" : "ltr"}>
              {result ? (
                <table className="w-full min-w-[40rem] text-left text-sm">
                  <thead className="sticky top-0 bg-surface-raised text-xs text-muted-foreground">
                    <tr>
                      {result.query.fields.map((f) => (
                        <th key={f} scope="col" className="whitespace-nowrap px-4 py-3 text-start font-medium">
                          {FIELD_LABELS[result.query.lang][f]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {result.rows.map((r) => (
                      <tr key={r.id} className="animate-fade-up hover:bg-accent/40">
                        {result.query.fields.map((f) => (
                          <td key={f} className={cn("whitespace-nowrap px-4 py-2.5", f === "name" ? "font-medium" : "text-muted-foreground", (f === "phone" || f === "rating") && "font-mono text-xs")}>
                            {r[f]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="grid min-h-60 place-items-center p-8 text-center">
                  <div>
                    <Search className="mx-auto size-5 text-muted-foreground" />
                    <p className="mt-3 text-sm text-muted-foreground">Set your criteria and generate sample results.</p>
                  </div>
                </div>
              )}
            </div>
            <p className="mt-4 flex gap-2 text-xs leading-relaxed text-muted-foreground">
              <Info className="mt-0.5 size-3.5 shrink-0" />
              All records are fictional and not retrieved from Google Maps. In client projects, FLOWORA works only with authorized data
              providers, respects their terms and rate limits, and collects public business information only — no sensitive personal data.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
