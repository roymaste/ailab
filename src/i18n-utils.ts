// Re-export locale config from routing
export { locales, defaultLocale, localeLabels } from "./routing";
export type { Locale } from "./routing";

// Load messages for a given locale
import { locales, defaultLocale, type Locale } from "./routing";

export async function getMessagesForLocale(locale: string) {
  const validLocale = locales.includes(locale as Locale) ? locale : defaultLocale;
  return (await import(`./messages/${validLocale}.json`)).default;
}
