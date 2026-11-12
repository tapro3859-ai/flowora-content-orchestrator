import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { ArrowUp, ExternalLink, Maximize2, Minus, RotateCcw, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SUGGESTED_QUESTIONS, WELCOME, getAssistantReply, type AssistantLink } from "@/lib/assistant";
import { ASSISTANT_OPEN_EVENT } from "@/lib/site";
import { cn } from "@/lib/utils";
import { LogoMark } from "./Logo";

interface Msg {
  id: number;
  role: "user" | "assistant";
  text: string;
  links?: AssistantLink[];
  rtl?: boolean;
}

let nextId = 1;
const welcomeMsg = (): Msg => ({ id: nextId++, role: "assistant", text: WELCOME.en });
const hasArabic = (s: string) => /[\u0600-\u06FF]/.test(s);

export function Assistant() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(() => [welcomeMsg()]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timer = useRef<number | null>(null);
  const router = useRouter();

  const send = useCallback((raw: string) => {
    const text = raw.trim().slice(0, 500);
    if (!text) return;
    setMessages((m) => [...m, { id: nextId++, role: "user", text, rtl: hasArabic(text) }]);
    setInput("");
    setTyping(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      const r = getAssistantReply(text);
      setMessages((m) => [...m, { id: nextId++, role: "assistant", text: r.text, links: r.links, rtl: r.lang === "ar" }]);
      setTyping(false);
    }, 650 + Math.min(text.length * 10, 700));
  }, []);

  useEffect(() => {
    const onOpen = (e: Event) => {
      setOpen(true);
      setMinimized(false);
      const q = (e as CustomEvent<{ question?: string }>).detail?.question;
      if (q) send(q);
    };
    window.addEventListener(ASSISTANT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(ASSISTANT_OPEN_EVENT, onOpen);
  }, [send]);

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open && !minimized) inputRef.current?.focus();
  }, [open, minimized]);

  const reset = () => {
    if (timer.current) window.clearTimeout(timer.current);
    setTyping(false);
    setMessages([welcomeMsg()]);
  };
  const clear = () => {
    if (timer.current) window.clearTimeout(timer.current);
    setTyping(false);
    setMessages([]);
  };

  const hasUserMsg = messages.some((m) => m.role === "user");

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group fixed bottom-4 right-4 z-50 flex items-center gap-2.5 rounded-full border border-border-strong bg-popover/95 py-2 pl-2 pr-4 text-sm font-medium shadow-elevated backdrop-blur-xl transition-all hover:border-primary/50 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:bottom-6 sm:right-6"
        aria-label="Ask FLOWORA — open the demo assistant"
      >
        <span className="relative">
          <LogoMark className="size-8" />
          <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full border-2 border-popover bg-success" />
        </span>
        Ask FLOWORA
      </button>
    );
  }

  if (minimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-1 rounded-full border border-border-strong bg-popover/95 py-1.5 pl-2 pr-1.5 shadow-elevated backdrop-blur-xl sm:bottom-6 sm:right-6">
        <button type="button" onClick={() => setMinimized(false)} className="flex items-center gap-2 rounded-full pr-2 text-sm font-medium" aria-label="Restore FLOWORA assistant">
          <LogoMark className="size-7" />
          FLOWORA Assistant
          {typing ? <span className="text-xs text-muted-foreground">typing…</span> : null}
        </button>
        <IconBtn label="Restore" onClick={() => setMinimized(false)}>
          <Maximize2 />
        </IconBtn>
        <IconBtn label="Close assistant" onClick={() => setOpen(false)}>
          <X />
        </IconBtn>
      </div>
    );
  }

  return (
    <div
      role="dialog"
      aria-label="FLOWORA demo assistant"
      onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
      className="fixed inset-x-2 bottom-2 z-50 flex h-[min(38rem,calc(100dvh-1rem))] animate-fade-up flex-col overflow-hidden rounded-3xl border border-border-strong bg-popover shadow-elevated sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[25rem]"
    >
      <header className="flex items-center gap-2.5 border-b border-border py-3 pl-4 pr-2.5">
        <LogoMark className="size-9" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold tracking-[0.14em]">FLOWORA</p>
          <p className="flex items-center gap-1.5 truncate text-xs text-muted-foreground">
            <span className="size-1.5 shrink-0 rounded-full bg-success" /> Demo Assistant · Online
          </p>
        </div>
        <IconBtn label="Reset conversation" onClick={reset}>
          <RotateCcw />
        </IconBtn>
        <IconBtn label="Clear conversation" onClick={clear}>
          <Trash2 />
        </IconBtn>
        <IconBtn label="Minimize assistant" onClick={() => setMinimized(true)}>
          <Minus />
        </IconBtn>
        <IconBtn label="Close assistant" onClick={() => setOpen(false)}>
          <X />
        </IconBtn>
      </header>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
        {messages.length === 0 ? <p className="py-6 text-center text-sm text-muted-foreground">Conversation cleared. Ask a question below.</p> : null}
        {messages.map((m) => (
          <div key={m.id} className={cn("flex animate-fade-up", m.role === "user" ? "justify-end" : "justify-start")}>
            <div
              dir={m.rtl ? "rtl" : "ltr"}
              className={cn(
                "max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                m.role === "user" ? "rounded-br-md bg-primary text-primary-foreground" : "rounded-bl-md border border-border bg-surface-raised",
              )}
            >
              <p className="whitespace-pre-line">{m.text}</p>
              {m.links?.length ? (
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {m.links.map((l) =>
                    l.external ? (
                      <a
                        key={l.href}
                        href={l.href}
                        target={l.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 text-xs text-primary hover:bg-primary/20"
                      >
                        {l.label} <ExternalLink className="size-3" />
                      </a>
                    ) : (
                      <button
                        key={l.href}
                        type="button"
                        onClick={() => {
                          router.history.push(l.href);
                          setMinimized(true);
                        }}
                        className="inline-flex items-center gap-1 rounded-full border border-border-strong px-2.5 py-1 text-xs hover:bg-accent"
                      >
                        {l.label}
                      </button>
                    ),
                  )}
                </div>
              ) : null}
            </div>
          </div>
        ))}
        {typing ? (
          <div className="flex justify-start" aria-label="Assistant is typing">
            <div className="flex gap-1 rounded-2xl rounded-bl-md border border-border bg-surface-raised px-3.5 py-3">
              {[0, 1, 2].map((i) => (
                <span key={i} className="size-1.5 animate-typing rounded-full bg-muted-foreground" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        ) : null}
        {!hasUserMsg && !typing ? (
          <div className="pt-1">
            <p className="mb-2 text-xs text-muted-foreground">Suggested questions</p>
            <ul className="flex flex-col items-start gap-1.5">
              {SUGGESTED_QUESTIONS.map((q) => (
                <li key={q}>
                  <button type="button" onClick={() => send(q)} className="rounded-full border border-border-strong px-3 py-1.5 text-left text-xs text-foreground/90 transition-colors hover:border-primary/50 hover:bg-primary/10">
                    {q}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      {hasUserMsg ? (
        <div className="flex gap-1.5 overflow-x-auto border-t border-border px-3 py-2 [scrollbar-width:none]">
          {SUGGESTED_QUESTIONS.map((q) => (
            <button key={q} type="button" disabled={typing} onClick={() => send(q)} className="shrink-0 rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground disabled:opacity-50">
              {q}
            </button>
          ))}
        </div>
      ) : null}

      <form
        className="flex items-end gap-2 border-t border-border p-3"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <label htmlFor="assistant-input" className="sr-only">
          Your message
        </label>
        <textarea
          id="assistant-input"
          ref={inputRef}
          rows={1}
          value={input}
          maxLength={500}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send(input);
            }
          }}
          placeholder="Ask in English, Français or الدارجة…"
          className="max-h-28 min-h-10 flex-1 resize-none rounded-2xl border border-input bg-surface px-3.5 py-2.5 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-sm"
        />
        <Button type="submit" size="icon" className="size-10 shrink-0" disabled={!input.trim() || typing} aria-label="Send message">
          <ArrowUp />
        </Button>
      </form>
      <p className="px-4 pb-3 text-center text-[11px] text-muted-foreground">Curated answers only — no live data, account access or human handoff.</p>
    </div>
  );
}

function IconBtn({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="grid size-8 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-4"
    >
      {children}
    </button>
  );
}
