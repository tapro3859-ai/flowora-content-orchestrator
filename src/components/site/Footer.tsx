import { Link } from "@tanstack/react-router";
import { CONTACT, NAV_ITEMS } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Moroccan software and automation studio. Content publishing systems, AI agents and custom
            workflows — configured for your business and maintained over time.
          </p>
        </div>
        <nav aria-label="Footer">
          <h2 className="eyebrow text-muted-foreground">Navigate</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-muted-foreground transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="eyebrow text-muted-foreground">Contact</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                WhatsApp · {CONTACT.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={CONTACT.phoneHref} className="text-muted-foreground hover:text-foreground">
                Phone · {CONTACT.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={CONTACT.emailHref} className="break-all text-muted-foreground hover:text-foreground">
                {CONTACT.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 FLOWORA. All rights reserved.</p>
          <p>Demos on this site are simulations with sample data. Platform names belong to their owners.</p>
        </div>
      </div>
    </footer>
  );
}
