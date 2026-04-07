import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessagesForLocale, locales, defaultLocale } from "@/i18n-utils";
import "./globals.css";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "爪智能体实验室 · AI Agent Experience Hub",
  description: "让你的AI在实战中越来越专业 - 共享AI实战经验的网络效应平台",
};

const langLabels: Record<string, string> = {
  en: "EN",
  zh: "中文",
  ja: "日本語",
  ru: "Русский",
};

function LanguageSwitcher({
  currentLang,
  pathname,
}: {
  currentLang: string;
  pathname: string;
}) {
  return (
    <div className="flex gap-2 items-center">
      {locales.map((lang) => (
        <a
          key={lang}
          href={`${pathname}?lang=${lang}`}
          className={`text-sm px-2 py-1 rounded transition-colors ${
            currentLang === lang
              ? "bg-slate-900 text-white font-medium"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          {langLabels[lang]}
        </a>
      ))}
    </div>
  );
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang?: string }>;
}) {
  const { lang } = await params;
  const locale = locales.includes(lang as any) ? lang! : defaultLocale;
  const messages = await getMessagesForLocale(locale);
  const pathname = "/";

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <header className="border-b bg-white">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <a href={`/?lang=${locale}`} className="text-xl font-bold text-slate-900">
                🤖 爪智能体实验室
              </a>
              <div className="flex items-center gap-6">
                <nav className="flex gap-6">
                  <a href={`/?lang=${locale}#install`} className="text-slate-600 hover:text-slate-900">
                    {locale === "zh" ? "安装" : locale === "ja" ? "インストール" : locale === "ru" ? "Установка" : "Install"}
                  </a>
                  <a href={`/experiences?lang=${locale}`} className="text-slate-600 hover:text-slate-900">
                    {locale === "zh" ? "经验库" : locale === "ja" ? "経験ライブラリ" : locale === "ru" ? "Библиотека опыта" : "Experience Library"}
                  </a>
                </nav>
                <LanguageSwitcher currentLang={locale} pathname={pathname} />
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t bg-slate-50 py-4">
            <div className="container mx-auto px-4 text-center text-sm text-slate-500">
              爪智能体实验室 · AI Agent Experience Hub · 让AI越用越专业
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
