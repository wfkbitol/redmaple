export const locales = ["zh", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "zh";

export type TranslationStrings = {
  htmlLang: string;
  siteTitle: string;
  siteDescription: string;
  localeLabels: Record<Locale, string>;
  switchLocaleLabel: string;
  themeButton: { dark: string; light: string };
  navItems: Array<{ href: string; label: string }>;
  home: {
    tagline: string;
    description: string;
    buttons: { blog: string; gallery: string };
  };
  sectionCards: Array<{ title: string; description: string; href: string; accent: string }>;
  blogPage: { title: string; description: string };
  notesPage: { title: string; description: string };
  musingsPage: { title: string; description: string };
  galleryPage: { title: string; description: string };
  galleryScene: { label: string; title: string; description: string };
  article: {
    backHome: string;
    sectionLabels: Record<"blog" | "notes" | "musings", string>;
  };
  contentList: { searchPlaceholder: string; allLabel: string };
};

import zh from "../content/locales/zh.json";
import en from "../content/locales/en.json";

const translations: Record<Locale, TranslationStrings> = {
  zh: zh as unknown as TranslationStrings,
  en: en as unknown as TranslationStrings,
};

export function normalizeLocale(locale?: string): Locale {
  return locale === "en" ? "en" : "zh";
}

export function getTranslation(locale?: string): TranslationStrings {
  const normalized = normalizeLocale(locale);
  return translations[normalized];
}
