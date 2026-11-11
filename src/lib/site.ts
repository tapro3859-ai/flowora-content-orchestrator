export const CONTACT = {
  phoneDisplay: "+212 681-569749",
  phoneHref: "tel:+212681569749",
  email: "softatlas38@gmail.com",
  emailHref: "mailto:softatlas38@gmail.com",
  whatsapp: "https://wa.me/212681569749",
} as const;

export function whatsappLink(message?: string) {
  return message ? `${CONTACT.whatsapp}?text=${encodeURIComponent(message)}` : CONTACT.whatsapp;
}

export const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/solutions", label: "Solutions" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/demo", label: "Demo" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export const ASSISTANT_OPEN_EVENT = "flowora:open-assistant";

export function openAssistant(question?: string) {
  window.dispatchEvent(new CustomEvent(ASSISTANT_OPEN_EVENT, { detail: { question } }));
}
