/**
 * Local FAQ / intent-matching assistant. Curated answers only — no external AI,
 * no live data, no account access. Answers in English, French or Darija.
 */
import { CONTACT, whatsappLink } from "./site";

export type AssistantLang = "en" | "fr" | "ar";
export type IntentId =
  | "pricing"
  | "human"
  | "demo"
  | "contact"
  | "other_platform"
  | "publishing_how"
  | "publishing_what"
  | "generate"
  | "platforms"
  | "maintenance"
  | "ai_agent"
  | "whatsapp"
  | "maps"
  | "website"
  | "custom"
  | "about"
  | "thanks"
  | "greeting"
  | "fallback";

export interface AssistantLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface AssistantReply {
  intent: IntentId;
  lang: AssistantLang;
  text: string;
  links: AssistantLink[];
}

export const SUGGESTED_QUESTIONS = [
  "What is the FLOWORA publishing system?",
  "How does automatic publishing work?",
  "Can it generate titles and hashtags?",
  "Which platforms can be connected?",
  "Do you provide maintenance?",
  "What is an AI customer agent?",
  "Can you organize business data from Google Maps?",
  "How can I get a demo?",
  "How can I contact FLOWORA?",
];

export const WELCOME: Record<AssistantLang, string> = {
  en: "Hi, I'm the FLOWORA demo assistant. Ask me about the publishing system, AI agents, WhatsApp automation, prospecting, or maintenance. I answer from approved company information.",
  fr: "Bonjour, je suis l'assistant de démonstration FLOWORA. Posez-moi vos questions sur le système de publication, les agents IA, WhatsApp, la prospection ou la maintenance.",
  ar: "مرحبا، أنا المساعد التجريبي ديال FLOWORA. سولني على نظام النشر، الوكلاء الذكيين، أتمتة واتساب، البحث على الزبناء ولا الصيانة.",
};

/** Ordered by priority: earlier wins on equal score. */
const INTENTS: { id: IntentId; keywords: string[]; generic?: string[] }[] = [
  {
    id: "pricing",
    keywords: ["price", "pricing", "prices", "cost", "how much", "quote", "budget", "fee", "prix", "tarif", "tarifs", "cout", "combien", "devis", "chhal", "ch7al", "bchhal", "taman", "شحال", "بشحال", "الثمن", "ثمن", "سعر", "الاثمنة", "تمن"],
  },
  {
    id: "human",
    keywords: ["human", "real person", "talk to someone", "speak to someone", "a person", "humain", "une personne", "conseiller", "شي واحد", "بنادم", "شخص"],
  },
  {
    id: "demo",
    keywords: ["demo", "book", "booking", "trial", "try it", "essai", "rendez-vous", "rdv", "demonstration", "ديمو", "تجريبي", "عرض تجريبي", "تجربة"],
  },
  {
    id: "contact",
    keywords: ["contact", "phone", "email", "e-mail", "mail", "reach", "call", "whatsapp number", "telephone", "joindre", "contacter", "numero", "nmra", "تواصل", "نتواصل", "رقم", "الهاتف", "التيليفون", "الايميل", "اتصل"],
  },
  {
    id: "other_platform",
    keywords: ["linkedin", "pinterest", "twitter", "snapchat", "threads", "x.com", "لينكدان", "سناب", "تويتر"],
  },
  {
    id: "publishing_how",
    keywords: ["automatic publishing", "auto publishing", "publish automatically", "how does it work", "how it works", "automatically", "automatic", "comment ca marche", "comment ca fonctionne", "fonctionne", "automatique", "automatiquement", "kifach", "kifash", "كيفاش", "كيف كيخدم", "كيخدم", "أوتوماتيك", "اوتوماتيك", "تلقائي"],
    generic: ["how does", "how do", "work", "comment"],
  },
  {
    id: "publishing_what",
    keywords: ["publishing system", "publishing", "publish", "content automation", "content system", "publication", "publier", "systeme de publication", "النشر", "نشر", "نظام النشر", "البارطاج"],
  },
  {
    id: "generate",
    keywords: ["generate", "generation", "titles", "title", "hashtags", "hashtag", "description", "descriptions", "caption", "captions", "generer", "titre", "titres", "legende", "هاشتاغ", "الهاشتاغ", "عنوان", "العناوين", "وصف", "الوصف"],
  },
  {
    id: "platforms",
    keywords: ["platforms", "platform", "instagram", "facebook", "tiktok", "youtube", "social networks", "social media", "plateformes", "plateforme", "reseaux", "منصات", "المنصات", "انستغرام", "انستا", "فيسبوك", "تيك توك", "تيكتوك", "يوتيوب"],
    generic: ["connected", "connect", "supported", "support"],
  },
  {
    id: "maintenance",
    keywords: ["maintenance", "monitoring", "monitor", "uptime", "suivi", "surveillance", "صيانة", "الصيانة", "مراقبة", "متابعة"],
  },
  {
    id: "ai_agent",
    keywords: ["customer agent", "ai agent", "agent", "chatbot", "chat bot", "customer support", "customer service", "service client", "agent ia", "وكيل", "شات بوت", "خدمة العملاء", "خدمة الزبناء"],
  },
  { id: "whatsapp", keywords: ["whatsapp automation", "whatsapp", "whats app", "واتساب", "الواتساب"] },
  {
    id: "maps",
    keywords: ["google maps", "maps", "prospect", "prospects", "prospecting", "leads", "lead", "business data", "prospection", "donnees", "scraping", "خرائط", "جوجل ماب", "ماب", "زبناء محتملين", "الزبناء", "داتا"],
  },
  {
    id: "website",
    keywords: ["website", "web site", "site web", "site internet", "software", "application", "mobile app", "development", "developpement", "logiciel", "موقع", "سيت", "تطبيق", "برنامج"],
  },
  {
    id: "custom",
    keywords: ["custom automation", "custom", "workflow", "automate", "automation", "sur mesure", "processus", "process", "أتمتة", "اتمتة", "مخصص", "على حسب"],
  },
  {
    id: "about",
    keywords: ["who are you", "about flowora", "about you", "company", "studio", "morocco", "moroccan", "qui etes", "maroc", "شكون", "المغرب", "مغربي"],
  },
  { id: "thanks", keywords: ["thanks", "thank you", "merci", "shukran", "choukran", "baraka", "شكرا", "بارك الله"] },
  { id: "greeting", keywords: ["hello", "hi", "hey", "bonjour", "bonsoir", "salut", "salam", "slm", "السلام", "سلام", "مرحبا", "labas"] },
];

const DARIJA_LATIN = ["salam", "slm", "wach", "wash", "kifach", "kifash", "bghit", "bghina", "chhal", "ch7al", "dyal", "dial", "mzyan", "3afak", "wakha", "kayn", "kayna", "chno", "chnou", "achno", "3ndkom", "3endkom", "labas", "nta", "ntuma", "daba", "bzaf"];
const FRENCH = ["bonjour", "bonsoir", "salut", "comment", "combien", "prix", "tarif", "vous", "votre", "vos", "est-ce", "quel", "quelle", "quels", "quelles", "pouvez", "puis", "je", "j'ai", "merci", "avec", "pour", "une", "des", "les", "est", "c'est", "qu'est", "faire", "faites", "et", "sur", "ou", "systeme", "entreprise", "nous", "mon", "ma", "mes"];
const ENGLISH = ["the", "what", "how", "can", "you", "is", "do", "does", "which", "are", "with", "my", "your", "hello", "hi", "get", "and", "for", "a", "an", "to", "of", "i"];

export function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’`]/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(text: string) {
  return text.split(/[^a-z0-9'\-]+/).filter(Boolean);
}

export function detectLanguage(input: string): AssistantLang {
  if (/[\u0600-\u06FF]/.test(input)) return "ar";
  const norm = normalize(input);
  const t = tokens(norm);
  if (t.some((w) => DARIJA_LATIN.includes(w))) return "ar";
  const fr = t.filter((w) => FRENCH.includes(w)).length + (/[éèêàçùôî]/i.test(input) ? 2 : 0);
  const en = t.filter((w) => ENGLISH.includes(w)).length;
  return fr > en ? "fr" : "en";
}

const isLatin = (kw: string) => /^[a-z0-9 '.\-]+$/.test(kw);

function matches(text: string, kw: string) {
  if (!isLatin(kw)) return text.includes(kw);
  const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^a-z0-9])${escaped}($|[^a-z0-9])`).test(text);
}

export function detectIntent(input: string): IntentId {
  const text = normalize(input);
  if (!text) return "fallback";
  let best: IntentId = "fallback";
  let bestScore = 0;
  for (const intent of INTENTS) {
    let score = 0;
    for (const kw of intent.keywords) if (matches(text, kw)) score += kw.length;
    for (const kw of intent.generic ?? []) if (matches(text, kw)) score += kw.length / 2;
    // Pricing and human-handoff questions always win; greetings/thanks only win alone.
    if (score > 0 && (intent.id === "pricing" || intent.id === "human")) return intent.id;
    if (intent.id === "greeting" || intent.id === "thanks") score *= 0.25;
    if (score > bestScore) {
      best = intent.id;
      bestScore = score;
    }
  }
  return best;
}

const ANSWERS: Record<Exclude<IntentId, never>, Record<AssistantLang, string>> = {
  publishing_what: {
    en: "The FLOWORA publishing system is an automated workflow for content. You prepare a video and set the schedule; the system prepares titles, descriptions and hashtags, then handles the configured publishing process to your connected platforms. Exact capabilities depend on your integrations and account permissions.",
    fr: "Le système de publication FLOWORA est un workflow automatisé pour vos contenus. Vous préparez la vidéo et le planning ; le système prépare titres, descriptions et hashtags, puis gère le processus de publication configuré vers vos plateformes connectées. Les capacités exactes dépendent des intégrations et des autorisations de vos comptes.",
    ar: "نظام النشر ديال FLOWORA هو سيستيم أوتوماتيكي للمحتوى. كتوجد الفيديو وكتحدد الوقت، والسيستيم كيوجد العنوان، الوصف والهاشتاغات، ومن بعد كيتكلف بعملية النشر المضبوطة للمنصات المربوطة. الإمكانيات بالضبط كتعتمد على الربط والصلاحيات ديال الحسابات ديالك.",
  },
  publishing_how: {
    en: "In four steps: 1) add your video files, 2) set the publishing time and destinations, 3) the system prepares platform-appropriate titles, descriptions and hashtags, 4) it runs the configured publishing workflow and tracks its status. You can try a simulated run in the demo on this site.",
    fr: "En quatre étapes : 1) ajoutez vos vidéos, 2) choisissez l'heure et les destinations, 3) le système prépare titres, descriptions et hashtags adaptés à chaque plateforme, 4) il exécute le workflow de publication configuré et suit son statut. Vous pouvez tester une simulation dans la démo du site.",
    ar: "ف4 مراحل: 1) كتزيد الفيديوهات، 2) كتختار الوقت والمنصات، 3) السيستيم كيوجد العنوان، الوصف والهاشتاغات المناسبين لكل منصة، 4) كيدير عملية النشر المضبوطة وكيتبع الحالة ديالها. تقدر تجرب محاكاة ف الديمو ديال الموقع.",
  },
  generate: {
    en: "Yes. Titles, descriptions and hashtags can be generated as part of the configured workflow, adapted to each platform and language, with an optional review step. The demo on this site shows sample output only.",
    fr: "Oui. Les titres, descriptions et hashtags peuvent être générés dans le workflow configuré, adaptés à chaque plateforme et langue, avec une étape de validation si besoin. La démo du site affiche uniquement des exemples.",
    ar: "إيه. العناوين، الوصف والهاشتاغات يقدرو يتوجدو ف السيستيم المضبوط، على حساب كل منصة ولغة، ومع إمكانية المراجعة قبل النشر. الديمو ف الموقع كيبين غير أمثلة.",
  },
  platforms: {
    en: "The system is designed for Instagram, Facebook, TikTok and YouTube. What can actually be connected depends on supported integrations, your account types and permissions, and each platform's API access. FLOWORA confirms this during setup.",
    fr: "Le système est conçu pour Instagram, Facebook, TikTok et YouTube. Ce qui peut réellement être connecté dépend des intégrations prises en charge, du type et des autorisations de vos comptes, et de l'accès API de chaque plateforme. FLOWORA le confirme lors de la configuration.",
    ar: "السيستيم مصمم ل Instagram، Facebook، TikTok و YouTube. شنو يقدر يتربط فعلا كيعتمد على الربط المتوفر، نوع الحسابات والصلاحيات ديالها، والولوج للـ API ديال كل منصة. FLOWORA كتأكد هادشي ف الإعداد.",
  },
  other_platform: {
    en: "That platform isn't part of the standard setup shown here. It may be possible depending on available integrations and API access — FLOWORA would need to review it before confirming.",
    fr: "Cette plateforme ne fait pas partie de la configuration standard présentée ici. Cela peut être possible selon les intégrations et l'accès API disponibles — FLOWORA doit l'étudier avant de confirmer.",
    ar: "هاد المنصة ماشي من الإعداد العادي اللي هنا. يقدر يكون ممكن على حساب الربط والـ API المتوفرين — خاص FLOWORA تشوفها قبل ما تأكد.",
  },
  maintenance: {
    en: "Yes. FLOWORA provides ongoing monitoring and maintenance during the agreed service period: watching the system, maintaining integrations, troubleshooting and improvements. Coverage and response times depend on your service package.",
    fr: "Oui. FLOWORA assure le suivi et la maintenance pendant la période de service convenue : surveillance, maintenance des intégrations, dépannage et améliorations. La couverture et les délais dépendent de votre formule.",
    ar: "إيه. FLOWORA كتوفر المراقبة والصيانة طول المدة المتفق عليها: تتبع السيستيم، صيانة الربط، حل المشاكل والتحسينات. التغطية ووقت الاستجابة كيعتمدو على الباقة اللي اخترتي.",
  },
  ai_agent: {
    en: "An AI customer agent answers customer questions using your approved business information, helps qualify leads, and hands complex requests to your team. It's configured around your content and channels.",
    fr: "Un agent client IA répond aux questions de vos clients à partir de vos informations validées, aide à qualifier les prospects et transmet les demandes complexes à votre équipe.",
    ar: "الوكيل الذكي للزبناء كيجاوب على الأسئلة بالمعلومات اللي وافقتي عليها، كيعاون ف تصنيف الزبناء المحتملين، وكيحول الطلبات الصعيبة للفريق ديالك.",
  },
  whatsapp: {
    en: "WhatsApp automation can organize inquiries, collect order details, send configured answers, and notify your team when a person is needed. Availability depends on the required integrations and WhatsApp Business account permissions.",
    fr: "L'automatisation WhatsApp organise les demandes, collecte les détails de commande, envoie des réponses configurées et prévient votre équipe si nécessaire. La disponibilité dépend des intégrations et des autorisations du compte WhatsApp Business.",
    ar: "أتمتة واتساب كتنظم الطلبات، كتجمع تفاصيل الكوموند، كتصيفط أجوبة مضبوطة وكتنبه الفريق ملي يكون خاص شي واحد. التوفر كيعتمد على الربط والصلاحيات ديال حساب WhatsApp Business.",
  },
  maps: {
    en: "Yes — FLOWORA can help organize publicly available business information into a structured prospect list through an authorized data source, respecting provider terms and data-protection rules. The prospecting tool on the Solutions page uses sample data, and I can't search live data from this chat.",
    fr: "Oui — FLOWORA peut organiser des informations professionnelles publiques en liste de prospects via une source de données autorisée, dans le respect des conditions et de la protection des données. L'outil de la page Solutions utilise des données d'exemple, et je ne peux pas rechercher de données en direct.",
    ar: "إيه — FLOWORA تقدر تنظم المعلومات العمومية ديال الشركات ف لائحة زبناء محتملين عبر مصدر مرخص، مع احترام الشروط وحماية المعطيات. الأداة ف صفحة Solutions كتخدم بمعطيات تجريبية، وأنا ما نقدرش نقلب ف معطيات حية من هنا.",
  },
  website: {
    en: "Yes, FLOWORA also builds websites and software when a project needs it, usually alongside an automation system.",
    fr: "Oui, FLOWORA développe aussi des sites web et des logiciels lorsque le projet le nécessite, souvent avec un système d'automatisation.",
    ar: "إيه، FLOWORA كتصاوب حتى المواقع والبرامج ملي يحتاجها المشروع، غالبا مع سيستيم ديال الأتمتة.",
  },
  custom: {
    en: "If your team repeats the same task every day, FLOWORA can design an automated workflow around your existing tools — forms, spreadsheets, notifications and AI processing. Share your process and the team will review what's feasible.",
    fr: "Si votre équipe répète les mêmes tâches chaque jour, FLOWORA peut concevoir un workflow automatisé autour de vos outils : formulaires, tableurs, notifications et traitement IA. Décrivez votre processus pour une étude.",
    ar: "إلا كان الفريق ديالك كيعاود نفس الخدمة كل نهار، FLOWORA تقدر تصمم سيستيم أوتوماتيكي على حساب الأدوات اللي عندك: فورمولير، جداول، إشعارات ومعالجة بالذكاء الاصطناعي. شرح لينا الطريقة ديالك ونشوفو شنو ممكن.",
  },
  about: {
    en: "FLOWORA is a Moroccan software and automation studio. We build content publishing workflows, AI customer agents, WhatsApp automation, lead organization systems and custom integrations — configured around each business and maintained over time.",
    fr: "FLOWORA est un studio marocain de logiciels et d'automatisation. Nous concevons des workflows de publication, des agents client IA, l'automatisation WhatsApp, l'organisation de prospects et des intégrations sur mesure.",
    ar: "FLOWORA ستوديو مغربي ديال البرمجيات والأتمتة. كنصاوبو أنظمة النشر، وكلاء ذكيين للزبناء، أتمتة واتساب، تنظيم الزبناء المحتملين وربط مخصص — على حساب كل شركة ومع الصيانة.",
  },
  pricing: {
    en: "Pricing depends on your requirements — platforms, volume, integrations and maintenance package — so I can't quote a price here. FLOWORA can prepare a proposal after a short conversation.",
    fr: "Le prix dépend de vos besoins — plateformes, volume, intégrations et formule de maintenance — je ne peux donc pas donner de tarif ici. FLOWORA peut préparer une proposition après un court échange.",
    ar: "الثمن كيعتمد على الحاجيات ديالك — المنصات، الكمية، الربط وباقة الصيانة — داكشي علاش ما نقدرش نعطيك ثمن هنا. FLOWORA تقدر توجد ليك عرض من بعد مكالمة قصيرة.",
  },
  demo: {
    en: "You can try the simulated publishing demo on this site right now. For a personal demo tailored to your business, message FLOWORA on WhatsApp.",
    fr: "Vous pouvez tester dès maintenant la démo de publication simulée sur ce site. Pour une démo personnalisée, écrivez à FLOWORA sur WhatsApp.",
    ar: "تقدر تجرب دابا الديمو ديال النشر (محاكاة) ف هاد الموقع. وإلا بغيتي ديمو خاص بالشركة ديالك، صيفط لـ FLOWORA ف واتساب.",
  },
  contact: {
    en: `You can reach FLOWORA by WhatsApp or phone at ${CONTACT.phoneDisplay}, or by email at ${CONTACT.email}.`,
    fr: `Vous pouvez joindre FLOWORA par WhatsApp ou téléphone au ${CONTACT.phoneDisplay}, ou par e-mail à ${CONTACT.email}.`,
    ar: `تقدر تتواصل مع FLOWORA ف واتساب ولا التيليفون: ${CONTACT.phoneDisplay}، ولا بالإيميل: ${CONTACT.email}.`,
  },
  human: {
    en: "I'm a demo assistant, so I can't transfer you to a person or contact the team for you. You can reach FLOWORA directly on WhatsApp or by email.",
    fr: "Je suis un assistant de démonstration : je ne peux pas vous transférer à une personne ni contacter l'équipe pour vous. Vous pouvez joindre FLOWORA directement sur WhatsApp ou par e-mail.",
    ar: "أنا مساعد تجريبي، ما نقدرش نحولك لشي شخص ولا نتواصل مع الفريق بلاصتك. تقدر تتواصل مع FLOWORA مباشرة ف واتساب ولا بالإيميل.",
  },
  greeting: {
    en: "Hello! I can answer questions about FLOWORA's publishing system, AI agents, WhatsApp automation, prospecting and maintenance. What would you like to know?",
    fr: "Bonjour ! Je peux répondre à vos questions sur le système de publication FLOWORA, les agents IA, WhatsApp, la prospection et la maintenance. Que souhaitez-vous savoir ?",
    ar: "السلام! نقدر نجاوبك على نظام النشر، الوكلاء الذكيين، واتساب، البحث على الزبناء والصيانة. شنو بغيتي تعرف؟",
  },
  thanks: {
    en: "You're welcome. Anything else you'd like to know about FLOWORA?",
    fr: "Avec plaisir. Souhaitez-vous savoir autre chose sur FLOWORA ?",
    ar: "مرحبا. واش بغيتي تعرف شي حاجة أخرى على FLOWORA؟",
  },
  fallback: {
    en: "I don't have confirmed information on that. FLOWORA can answer it directly — reach the team on WhatsApp or by email.",
    fr: "Je n'ai pas d'information confirmée à ce sujet. FLOWORA peut vous répondre directement sur WhatsApp ou par e-mail.",
    ar: "ما عنديش معلومة مؤكدة على هادشي. FLOWORA تقدر تجاوبك مباشرة ف واتساب ولا بالإيميل.",
  },
};

const LINK_LABELS = {
  whatsapp: { en: "Open WhatsApp", fr: "Ouvrir WhatsApp", ar: "فتح واتساب" },
  email: { en: "Send an email", fr: "Envoyer un e-mail", ar: "صيفط إيميل" },
  call: { en: "Call", fr: "Appeler", ar: "عيط" },
  demo: { en: "Try the demo", fr: "Voir la démo", ar: "جرب الديمو" },
  prospecting: { en: "Prospecting demo", fr: "Démo prospection", ar: "ديمو الزبناء" },
  contactPage: { en: "Contact page", fr: "Page contact", ar: "صفحة التواصل" },
} as const;

const DEMO_MESSAGE: Record<AssistantLang, string> = {
  en: "Hello FLOWORA, I'd like to book a demo.",
  fr: "Bonjour FLOWORA, je souhaite réserver une démo.",
  ar: "السلام FLOWORA، بغيت نحجز ديمو.",
};

function linksFor(intent: IntentId, lang: AssistantLang): AssistantLink[] {
  const wa = (msg?: string): AssistantLink => ({ label: LINK_LABELS.whatsapp[lang], href: whatsappLink(msg), external: true });
  const email: AssistantLink = { label: LINK_LABELS.email[lang], href: CONTACT.emailHref, external: true };
  switch (intent) {
    case "demo":
      return [wa(DEMO_MESSAGE[lang]), { label: LINK_LABELS.demo[lang], href: "/demo" }];
    case "contact":
      return [wa(), { label: LINK_LABELS.call[lang], href: CONTACT.phoneHref, external: true }, email];
    case "pricing":
    case "human":
    case "fallback":
    case "other_platform":
    case "custom":
      return [wa(), email];
    case "publishing_how":
    case "publishing_what":
    case "generate":
      return [{ label: LINK_LABELS.demo[lang], href: "/demo" }];
    case "maps":
      return [{ label: LINK_LABELS.prospecting[lang], href: "/solutions#prospecting" }];
    case "whatsapp":
    case "ai_agent":
    case "maintenance":
    case "website":
      return [{ label: LINK_LABELS.contactPage[lang], href: "/contact" }];
    default:
      return [];
  }
}

export function getAssistantReply(input: string): AssistantReply {
  const lang = detectLanguage(input);
  const intent = detectIntent(input);
  return { intent, lang, text: ANSWERS[intent][lang], links: linksFor(intent, lang) };
}
