// Supported locales - used throughout the app
export const locales = ["en", "zh", "ja", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeLabels: Record<string, string> = {
  en: "EN",
  zh: "中文",
  ja: "日本語",
  ru: "Русский",
};
