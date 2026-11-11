export type ContentLanguage = "en" | "fr" | "ar";

export const CONTENT_LANGUAGES: { id: ContentLanguage; label: string; dir: "ltr" | "rtl" }[] = [
  { id: "en", label: "English", dir: "ltr" },
  { id: "fr", label: "Français", dir: "ltr" },
  { id: "ar", label: "العربية", dir: "rtl" },
];

export interface ContentSample {
  title: string;
  description: string;
  hashtags: string[];
}

export const CONTENT_SAMPLES: Record<ContentLanguage, ContentSample[]> = {
  en: [
    {
      title: "Summer Campaign 2026 — Light, Linen & Long Evenings",
      description:
        "Our summer collection is here. Breathable fabrics, warm tones, and pieces designed for long days by the sea. Discover the full lookbook today.",
      hashtags: ["#SummerCampaign", "#NewCollection", "#SummerStyle", "#Lookbook", "#MadeInMorocco"],
    },
    {
      title: "Meet the Summer Edit",
      description:
        "Fresh colours, light textures, and everyday essentials made for the warmest months. Tap through to see the new arrivals.",
      hashtags: ["#SummerEdit", "#NewArrivals", "#StyleInspo", "#SeasonalCollection", "#ShopNow"],
    },
    {
      title: "Golden Hour, All Season",
      description:
        "A short film from our summer shoot along the Atlantic coast. Effortless outfits for sunny days and warm nights.",
      hashtags: ["#GoldenHour", "#SummerVibes", "#BehindTheScenes", "#FashionFilm", "#Summer2026"],
    },
  ],
  fr: [
    {
      title: "Campagne d'été 2026 — Lin, lumière et longues soirées",
      description:
        "Notre collection d'été est arrivée. Des matières légères, des tons chauds et des pièces pensées pour les longues journées au bord de la mer.",
      hashtags: ["#CampagneEte", "#NouvelleCollection", "#StyleEte", "#Lookbook", "#FabriqueAuMaroc"],
    },
    {
      title: "Découvrez la sélection d'été",
      description:
        "Couleurs fraîches, textures légères et essentiels du quotidien pour les mois les plus chauds. Découvrez les nouveautés.",
      hashtags: ["#SelectionEte", "#Nouveautes", "#InspirationMode", "#CollectionSaison", "#Shopping"],
    },
    {
      title: "L'heure dorée, toute la saison",
      description:
        "Un court film de notre shooting d'été sur la côte atlantique. Des tenues simples pour les journées ensoleillées et les soirées douces.",
      hashtags: ["#HeureDoree", "#EteVibes", "#Coulisses", "#FilmMode", "#Ete2026"],
    },
  ],
  ar: [
    {
      title: "حملة صيف 2026 — كتان، ضوء وأمسيات طويلة",
      description:
        "مجموعتنا الصيفية وصلت. أقمشة خفيفة، ألوان دافئة وقطع مصممة للأيام الطويلة على البحر. اكتشفوا الكتالوج الكامل اليوم.",
      hashtags: ["#حملة_الصيف", "#مجموعة_جديدة", "#موضة_الصيف", "#صنع_في_المغرب"],
    },
    {
      title: "اكتشفوا تشكيلة الصيف",
      description: "ألوان منعشة، خامات خفيفة وأساسيات يومية لأحر شهور السنة. تصفحوا الوصول الجديد.",
      hashtags: ["#تشكيلة_الصيف", "#وصل_حديثا", "#إلهام_الموضة", "#تسوق_الآن"],
    },
    {
      title: "الساعة الذهبية طوال الموسم",
      description:
        "فيلم قصير من جلسة تصويرنا الصيفية على ساحل الأطلسي. إطلالات بسيطة للأيام المشمسة والليالي الدافئة.",
      hashtags: ["#الساعة_الذهبية", "#أجواء_الصيف", "#كواليس_التصوير", "#صيف_2026"],
    },
  ],
};
