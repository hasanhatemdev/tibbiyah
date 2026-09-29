import type { ScreenId } from "./screens";

export const LANGS = ["en", "ar"] as const;
export type Lang = (typeof LANGS)[number];
export type Dir = "ltr" | "rtl";

export const DEFAULT_LANG: Lang = "en";
export const LANG_COOKIE = "tib-home-lang";

export const isLang = (value: unknown): value is Lang =>
  LANGS.includes(value as Lang);

export const dirFor = (lang: Lang): Dir => (lang === "ar" ? "rtl" : "ltr");

export type Copy = {
  event: string;
  title: string;
  intro: string;
  centre: string;
  platform: string;
  journeyDesc: string;
  touch: string;
  explore: string;
  back: string;
  later: string;
  switchLanguage: string;
  /** Points "forward" in reading order. */
  arrow: string;
  /** Points "back" in reading order. */
  backArrow: string;
  stages: readonly string[];
  screens: Record<ScreenId, { title: string; line: string }>;
};

export const copy: Record<Lang, Copy> = {
  en: {
    event: "Global Health Exhibition 2026",
    title: "Explore the Tibbiyah stand",
    intro:
      "Six screens: the patient journey and five business platforms. Choose one to begin.",
    centre: "01 · Centre screen",
    platform: "Platform",
    journeyDesc:
      "From prevention to home care, Tibbiyah supports the people who deliver care — with the technology, supply, service and specialist care each stage depends on.",
    touch: "Touch a stage to explore",
    explore: "Explore",
    back: "Back to home",
    later: "Page design coming in a later step",
    switchLanguage: "Switch to Arabic",
    arrow: "→",
    backArrow: "←",
    stages: [
      "Prevention",
      "Diagnosis",
      "Intervention",
      "Surgery",
      "Critical Care",
      "Recovery",
      "Home Care",
    ],
    screens: {
      "patient-journey": {
        title: "The Patient Journey",
        line: "Every step of the patient journey",
      },
      manufacturing: {
        title: "Manufacturing",
        line: "Building medical technology in the Kingdom.",
      },
      "medical-systems": {
        title: "Medical Systems & Consumables",
        line: "The supply healthcare runs on.",
      },
      service: { title: "Service", line: "Keeping healthcare running." },
      "digital-health": {
        title: "Digital Health",
        line: "Connected care. Joined-up data.",
      },
      "direct-to-patient": {
        title: "Direct to Patient",
        line: "Specialist care, closer to home.",
      },
    },
  },
  ar: {
    event: "المعرض العالمي للصحة 2026",
    title: "استكشف جناح طبية",
    intro: "ست شاشات: رحلة المريض وخمس منصات أعمال. اختر إحداها للبدء.",
    centre: "01 · الشاشة المركزية",
    platform: "منصة",
    journeyDesc:
      "من الوقاية إلى الرعاية المنزلية، تدعم طبية مقدّمي الرعاية بالتقنيات والإمدادات والخدمات والرعاية التخصصية التي تعتمد عليها كل مرحلة.",
    touch: "المس مرحلة للاستكشاف",
    explore: "استكشف",
    back: "العودة إلى الرئيسية",
    later: "تصميم الصفحة في مرحلة لاحقة",
    switchLanguage: "التبديل إلى الإنجليزية",
    arrow: "←",
    backArrow: "→",
    stages: [
      "الوقاية",
      "التشخيص",
      "التدخل العلاجي",
      "الجراحة",
      "العناية المركزة",
      "التعافي",
      "الرعاية المنزلية",
    ],
    screens: {
      "patient-journey": {
        title: "رحلة المريض",
        line: "في كل خطوة من رحلة المريض",
      },
      manufacturing: {
        title: "التصنيع",
        line: "تصنيع التقنيات الطبية في المملكة.",
      },
      "medical-systems": {
        title: "الأنظمة والمستلزمات الطبية",
        line: "الإمدادات التي تقوم عليها الرعاية الصحية.",
      },
      service: { title: "الخدمات", line: "استمرارية الرعاية الصحية." },
      "digital-health": {
        title: "الصحة الرقمية",
        line: "رعاية متصلة. بيانات متكاملة.",
      },
      "direct-to-patient": {
        title: "مباشرة إلى المريض",
        line: "رعاية تخصصية أقرب إلى المنزل.",
      },
    },
  },
};

/** Persist the visitor's language so the server renders it on the next load. */
export function persistLang(lang: Lang) {
  document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=31536000; samesite=lax`;
}
