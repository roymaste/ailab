"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { locales, defaultLocale, localeLabels } from "@/routing";

// ─── Design Tokens ───────────────────────────────────────────────────────────
const ACCENT = "#e11d48";
const ACCENT_HOVER = "#be123c";
const BG = "#fafaf9";
const BG_SECONDARY = "#f5f5f4";
const SURFACE = "#ffffff";
const BORDER = "#e7e5e4";
const TEXT_PRIMARY = "#1c1917";
const TEXT_SECONDARY = "#78716c";
const TEXT_MUTED = "#a8a29e";

// ─── Sample Data ──────────────────────────────────────────────────────────────
const SAMPLE_CARD = {
  id: "EC-001",
  category: "AI对话",
  problem: "AI 助手总是给出模糊笼统的回答，无法针对具体场景给出专业建议",
  solution: "通过 Experience Card 提供具体场景上下文和置信度参考，AI 能给出更有针对性的答案",
  confidence: 92,
  tags: ["提示词工程", "场景化", "置信度"],
  author: "社区贡献",
  date: "2026-04-07",
  yaml: `name: 场景化AI助手
version: 1.0
trigger:
  type: query_classification
  pattern: "如何|怎么做|建议"
context:
  domain: user_defined
  specificity: required
response:
  style: structured
  include_confidence: true`,
};

// ─── Language Switcher ───────────────────────────────────────────────────────
function LanguageSwitcher({ locale }: { locale: string }) {
  const searchParams = useSearchParams();
  const pathname = "/";
  const [open, setOpen] = useState(false);

  const buildLangUrl = (lang: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", lang);
    return `${pathname}?${params.toString()}`;
  };

  useEffect(() => {
    if (!open) return;
    const handler = () => setOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [open]);

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          background: "transparent",
          border: `1px solid ${BORDER}`,
          borderRadius: "6px",
          padding: "4px 8px",
          fontSize: "12px",
          color: TEXT_SECONDARY,
          cursor: "pointer",
          transition: "border-color 0.15s, color 0.15s",
        }}
        onMouseOver={(e) => {
          (e.target as HTMLElement).style.borderColor = TEXT_SECONDARY;
          (e.target as HTMLElement).style.color = TEXT_PRIMARY;
        }}
        onMouseOut={(e) => {
          (e.target as HTMLElement).style.borderColor = BORDER;
          (e.target as HTMLElement).style.color = TEXT_SECONDARY;
        }}
      >
        <span>🌐</span>
        <span>{localeLabels[locale]}</span>
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            background: SURFACE,
            border: `1px solid ${BORDER}`,
            borderRadius: "8px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            overflow: "hidden",
            zIndex: 100,
            minWidth: "120px",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {locales.map((l) => (
            <a
              key={l}
              href={buildLangUrl(l)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "100%",
                padding: "8px 14px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "13px",
                color: l === locale ? ACCENT : TEXT_PRIMARY,
                fontWeight: l === locale ? 600 : 400,
                textAlign: "left",
                textDecoration: "none",
                transition: "background 0.1s",
              }}
              onMouseOver={(e) =>
                ((e.target as HTMLElement).style.background = BG_SECONDARY)
              }
              onMouseOut={(e) =>
                ((e.target as HTMLElement).style.background = "transparent")
              }
            >
              <span style={{ fontSize: "11px", opacity: 0.6 }}>{localeLabels[l]}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Section Label ────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  const t = useTranslations();
  return (
    <p
      style={{
        color: ACCENT,
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}
      className="mb-3"
    >
      {children}
    </p>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const locale = locales.includes(searchParams.get("lang") as any) 
    ? searchParams.get("lang")! 
    : defaultLocale;
  const t = useTranslations();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      style={{
        background: BG,
        color: TEXT_PRIMARY,
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
      }}
    >
      {/* ── Nav ── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(250,250,249,0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 32px",
            height: "56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            style={{
              fontWeight: 700,
              fontSize: "15px",
              color: TEXT_PRIMARY,
              textDecoration: "none",
            }}
          >
            AILab
          </Link>
          <nav
            style={{
              display: "flex",
              gap: "24px",
              alignItems: "center",
            }}
          >
            <Link
              href="/experiences"
              style={{
                fontSize: "14px",
                color: TEXT_SECONDARY,
                textDecoration: "none",
              }}
            >
              {t("nav.experiences")}
            </Link>
            <a
              href="#install"
              style={{
                fontSize: "14px",
                color: TEXT_SECONDARY,
                textDecoration: "none",
              }}
            >
              {t("nav.install")}
            </a>
            <a
              href="#about"
              style={{
                fontSize: "14px",
                color: TEXT_SECONDARY,
                textDecoration: "none",
              }}
            >
              {t("nav.about")}
            </a>
            <LanguageSwitcher locale={locale} />
            <a href="#install">
              <Button
                size="sm"
                style={{
                  background: ACCENT,
                  color: "#fff",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "13px",
                }}
              >
                {t("nav.installNow")}
              </Button>
            </a>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "96px 32px 80px",
        }}
      >
        {/* Eyebrow */}
        <div style={{ marginBottom: "24px" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
              color: TEXT_SECONDARY,
              background: BG_SECONDARY,
              border: `1px solid ${BORDER}`,
              borderRadius: "100px",
              padding: "4px 14px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: ACCENT,
                display: "inline-block",
              }}
            />
            {t("hero.eyebrow")}
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: TEXT_PRIMARY,
            marginBottom: "28px",
            maxWidth: "820px",
          }}
        >
          {t("hero.headline1")}
          <br />
          <span style={{ color: ACCENT }}>{t("hero.headline2")}</span>
        </h1>

        {/* Sub */}
        <p
          style={{
            fontSize: "clamp(17px, 2.5vw, 22px)",
            lineHeight: 1.6,
            color: TEXT_SECONDARY,
            maxWidth: "560px",
            marginBottom: "16px",
          }}
        >
          {t("hero.sub1")}
          <br />
          {t("hero.sub2")}
        </p>

        {/* Value statement */}
        <p
          style={{
            fontSize: "15px",
            color: TEXT_MUTED,
            maxWidth: "480px",
            marginBottom: "40px",
            lineHeight: 1.7,
          }}
        >
          {t("hero.value")}
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <a href="#install">
            <Button
              size="lg"
              style={{
                background: ACCENT,
                color: "#fff",
                border: "none",
                height: "48px",
                padding: "0 28px",
                fontWeight: 600,
                fontSize: "15px",
              }}
            >
              {t("hero.cta1")}
            </Button>
          </a>
          <Link href="/experiences">
            <Button
              size="lg"
              variant="outline"
              style={{
                height: "48px",
                padding: "0 28px",
                fontWeight: 500,
                fontSize: "15px",
                borderColor: BORDER,
                color: TEXT_PRIMARY,
              }}
            >
              {t("hero.cta2")}
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: "48px",
            marginTop: "72px",
            paddingTop: "48px",
            borderTop: `1px solid ${BORDER}`,
          }}
        >
          {[
            { value: "12+", label: t("hero.stats1") },
            { value: "Beta", label: t("hero.stats2") },
            { value: "开源", label: t("hero.stats3") },
          ].map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: TEXT_PRIMARY,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: TEXT_MUTED,
                  marginTop: "4px",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── What is Experience Card ── */}
      <section
        style={{
          background: SURFACE,
          borderTop: `1px solid ${BORDER}`,
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "96px 32px",
          }}
        >
          <SectionLabel>{t("whatIs.sectionLabel")}</SectionLabel>
          <h2
            style={{
              fontSize: "clamp(26px, 4vw, 40px)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              marginBottom: "48px",
              maxWidth: "600px",
            }}
          >
            {t("whatIs.title")}
          </h2>

          {/* Analogy */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "0",
              border: `1px solid ${BORDER}`,
              borderRadius: "12px",
              overflow: "hidden",
              marginBottom: "56px",
            }}
          >
            <div
              style={{
                padding: "40px 36px",
                borderRight: `1px solid ${BORDER}`,
              }}
            >
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: TEXT_MUTED,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                {t("whatIs.analogy")}
              </p>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  marginBottom: "16px",
                }}
              >
                {t("whatIs.analogyTitle")}
              </h3>
              <div
                style={{
                  fontSize: "15px",
                  color: TEXT_SECONDARY,
                  lineHeight: 1.8,
                }}
              >
                <p>{t("whatIs.analogy1")}</p>
                <p style={{ color: TEXT_MUTED, padding: "4px 0" }}>↓</p>
                <p>{t("whatIs.analogy2")}</p>
                <p style={{ color: TEXT_MUTED, padding: "4px 0" }}>↓</p>
                <p>{t("whatIs.analogy3")}</p>
              </div>
            </div>

            <div
              style={{
                padding: "40px 36px",
                background: BG,
              }}
            >
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: ACCENT,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                {t("whatIs.systemLabel")}
              </p>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  marginBottom: "16px",
                }}
              >
                {t("whatIs.systemTitle")}
              </h3>
              <div
                style={{
                  fontSize: "15px",
                  color: TEXT_SECONDARY,
                  lineHeight: 1.8,
                }}
              >
                <p>{t("whatIs.system1")}</p>
                <p style={{ color: TEXT_MUTED, padding: "4px 0" }}>↓</p>
                <p>{t("whatIs.system2")}</p>
                <p style={{ color: TEXT_MUTED, padding: "4px 0" }}>↓</p>
                <p>{t("whatIs.system3")}</p>
              </div>
            </div>
          </div>

          {/* Value props */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "32px 48px",
            }}
          >
            {[
              {
                title: t("whatIs.vp1Title"),
                body: t("whatIs.vp1Body"),
              },
              {
                title: t("whatIs.vp2Title"),
                body: t("whatIs.vp2Body"),
              },
              {
                title: t("whatIs.vp3Title"),
                body: t("whatIs.vp3Body"),
              },
            ].map((item) => (
              <div key={item.title}>
                <h4
                  style={{
                    fontWeight: 700,
                    fontSize: "15px",
                    marginBottom: "10px",
                  }}
                >
                  {item.title}
                </h4>
                <p
                  style={{
                    fontSize: "14px",
                    color: TEXT_SECONDARY,
                    lineHeight: 1.7,
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Features ── */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "96px 32px",
        }}
      >
        <SectionLabel>{t("features.sectionLabel")}</SectionLabel>
        <h2
          style={{
            fontSize: "clamp(26px, 4vw, 40px)",
            fontWeight: 800,
            letterSpacing: "-0.025em",
            marginBottom: "56px",
            maxWidth: "500px",
          }}
        >
          {t("features.title")}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "64px",
            alignItems: "start",
          }}
        >
          {/* Left: Sample card */}
          <div>
            <p
              style={{
                fontSize: "12px",
                color: TEXT_MUTED,
                marginBottom: "12px",
                letterSpacing: "0.05em",
              }}
            >
              {t("features.sampleCard")}
            </p>
            <div
              style={{
                border: `1px solid ${BORDER}`,
                borderRadius: "10px",
                overflow: "hidden",
                background: SURFACE,
                boxShadow:
                  "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
              }}
            >
              <div
                style={{
                  padding: "20px 24px",
                  borderBottom: `1px solid ${BORDER}`,
                  background: BG_SECONDARY,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <Badge
                      style={{
                        fontSize: "10px",
                        fontWeight: 600,
                        background: BG,
                        color: TEXT_SECONDARY,
                        border: `1px solid ${BORDER}`,
                        marginBottom: "8px",
                      }}
                    >
                      {SAMPLE_CARD.category}
                    </Badge>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: 1.5,
                        color: TEXT_PRIMARY,
                      }}
                    >
                      {SAMPLE_CARD.problem}
                    </p>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      marginLeft: "16px",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        fontSize: "26px",
                        fontWeight: 800,
                        color: "#16a34a",
                        lineHeight: 1,
                      }}
                    >
                      {SAMPLE_CARD.confidence}
                    </div>
                    <div
                      style={{
                        fontSize: "10px",
                        color: TEXT_MUTED,
                        marginTop: "2px",
                      }}
                    >
                      置信度
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: "20px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: TEXT_MUTED,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: "6px",
                    }}
                  >
                    {t("features.solution")}
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      color: TEXT_SECONDARY,
                      lineHeight: 1.6,
                    }}
                  >
                    {SAMPLE_CARD.solution}
                  </p>
                </div>

                <div>
                  <p
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: TEXT_MUTED,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                    }}
                  >
                    {t("features.tags")}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "6px",
                      flexWrap: "wrap",
                    }}
                  >
                    {SAMPLE_CARD.tags.map((tag) => (
                      <Badge
                        key={tag}
                        style={{
                          fontSize: "11px",
                          background: BG,
                          color: TEXT_SECONDARY,
                          border: `1px solid ${BORDER}`,
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    background: "#1c1917",
                    borderRadius: "8px",
                    padding: "16px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "10px",
                      color: "#78716c",
                      marginBottom: "10px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {t("features.configYaml")}
                  </p>
                  <pre
                    style={{
                      fontSize: "11.5px",
                      color: "#d6d3d1",
                      fontFamily:
                        "var(--font-geist-mono), monospace",
                      lineHeight: 1.7,
                      margin: 0,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {SAMPLE_CARD.yaml}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Feature list */}
          <div>
            {t.raw("features.list").map((f: any, i: number) => (
              <div
                key={f.label}
                style={{
                  paddingTop: i > 0 ? "32px" : "0",
                  borderTop: i > 0 ? `1px solid ${BORDER}` : "none",
                }}
              >
                <h4
                  style={{
                    fontWeight: 700,
                    fontSize: "16px",
                    marginBottom: "8px",
                  }}
                >
                  {f.label}
                </h4>
                <p
                  style={{
                    fontSize: "14px",
                    color: TEXT_SECONDARY,
                    lineHeight: 1.7,
                  }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section
        style={{
          background: BG_SECONDARY,
          borderTop: `1px solid ${BORDER}`,
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "96px 32px",
          }}
        >
          <SectionLabel>{t("howItWorks.sectionLabel")}</SectionLabel>
          <h2
            style={{
              fontSize: "clamp(26px, 4vw, 40px)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              marginBottom: "56px",
              maxWidth: "500px",
            }}
          >
            {t("howItWorks.title")}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "0",
            }}
          >
            {t.raw("howItWorks.steps").map((item: any, i: number) => (
              <div
                key={item.step}
                style={{ paddingRight: i < 2 ? "48px" : "0" }}
              >
                <div
                  style={{
                    fontSize: "48px",
                    fontWeight: 800,
                    color: BORDER,
                    lineHeight: 1,
                    marginBottom: "16px",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {item.step}
                </div>
                <h4
                  style={{
                    fontWeight: 700,
                    fontSize: "17px",
                    marginBottom: "10px",
                  }}
                >
                  {item.title}
                </h4>
                <p
                  style={{
                    fontSize: "14px",
                    color: TEXT_SECONDARY,
                    lineHeight: 1.7,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest Updates ── */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "96px 32px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: "40px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <SectionLabel>{t("updates.sectionLabel")}</SectionLabel>
            <h2
              style={{
                fontSize: "clamp(22px, 3vw, 32px)",
                fontWeight: 800,
                letterSpacing: "-0.025em",
              }}
            >
              {t("updates.title")}
            </h2>
          </div>
          <Badge
            style={{
              background: BG_SECONDARY,
              color: TEXT_SECONDARY,
              border: `1px solid ${BORDER}`,
              fontSize: "11px",
              fontWeight: 600,
            }}
          >
            {t("updates.badge")}
          </Badge>
        </div>

        <div>
          {t.raw("updates.items").map((u: any, i: number) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
                padding: "20px 0",
                borderBottom:
                  i < t.raw("updates.items").length - 1
                    ? `1px solid ${BORDER}`
                    : "none",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  color: TEXT_MUTED,
                  fontVariantNumeric: "tabular-nums",
                  width: "100px",
                  flexShrink: 0,
                }}
              >
                {u.date}
              </span>
              <span
                style={{
                  fontSize: "15px",
                  color: TEXT_PRIMARY,
                  flex: 1,
                }}
              >
                {u.text}
              </span>
              <Badge
                style={{
                  fontSize: "11px",
                  background: "transparent",
                  color: TEXT_SECONDARY,
                  border: `1px solid ${BORDER}`,
                  flexShrink: 0,
                }}
              >
                {u.tag}
              </Badge>
            </div>
          ))}
        </div>
      </section>

      {/* ── Install ── */}
      <section id="install" style={{ background: TEXT_PRIMARY }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "96px 32px",
          }}
        >
          <SectionLabel>{t("install.sectionLabel")}</SectionLabel>
          <h2
            style={{
              fontSize: "clamp(26px, 4vw, 40px)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              color: "#fafaf9",
              marginBottom: "16px",
              maxWidth: "500px",
            }}
          >
            {t("install.title")}
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#a8a29e",
              marginBottom: "56px",
              maxWidth: "480px",
              lineHeight: 1.7,
            }}
          >
            {t("install.desc")}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "32px",
              marginBottom: "48px",
            }}
          >
            {t.raw("install.steps").map((s: any) => (
              <div key={s.n} style={{ display: "flex", gap: "16px" }}>
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: ACCENT,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: 700,
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                >
                  {s.n}
                </div>
                <div>
                  <h4
                    style={{
                      fontWeight: 700,
                      fontSize: "15px",
                      color: "#f5f5f4",
                      marginBottom: "6px",
                    }}
                  >
                    {s.title}
                  </h4>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#78716c",
                      lineHeight: 1.6,
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Command block */}
          <div
            style={{
              background: "#0c0a09",
              border: "1px solid #292524",
              borderRadius: "10px",
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              maxWidth: "560px",
            }}
          >
            <code
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "14px",
                color: "#86efac",
                letterSpacing: "0.01em",
              }}
            >
              {t("install.command")}
            </code>
            <button
              onClick={() =>
                navigator.clipboard.writeText(
                  t("install.command")
                )
              }
              title={t("install.copy")}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#78716c",
                fontSize: "16px",
                padding: "4px",
                transition: "color 0.15s",
              }}
              onMouseOver={(e) =>
                ((e.target as HTMLElement).style.color = "#fafaf9")
              }
              onMouseOut={(e) =>
                ((e.target as HTMLElement).style.color = "#78716c")
              }
            >
              {t("install.copy")}
            </button>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section
        id="about"
        style={{ borderTop: `1px solid ${BORDER}` }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "96px 32px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "80px",
            }}
          >
            {/* About */}
            <div>
              <SectionLabel>{t("about.sectionLabel")}</SectionLabel>
              <h2
                style={{
                  fontSize: "clamp(22px, 3vw, 32px)",
                  fontWeight: 800,
                  letterSpacing: "-0.025em",
                  marginBottom: "24px",
                }}
              >
                {t("about.title")}
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <p
                  style={{
                    fontSize: "15px",
                    color: TEXT_SECONDARY,
                    lineHeight: 1.75,
                  }}
                >
                  {t("about.p1")}
                </p>
                <p
                  style={{
                    fontSize: "15px",
                    color: TEXT_SECONDARY,
                    lineHeight: 1.75,
                  }}
                >
                  {t("about.p2")}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginTop: "4px",
                  }}
                >
                  <Badge
                    style={{
                      background: BG_SECONDARY,
                      color: TEXT_SECONDARY,
                      border: `1px solid ${BORDER}`,
                      fontSize: "11px",
                      fontWeight: 600,
                    }}
                  >
                    Beta
                  </Badge>
                  <span
                    style={{
                      fontSize: "13px",
                      color: TEXT_MUTED,
                    }}
                  >
                    项目处于早期阶段，欢迎社区贡献经验、参与讨论。
                  </span>
                </div>
              </div>
            </div>

            {/* Roadmap */}
            <div>
              <SectionLabel>{t("about.roadmapTitle")}</SectionLabel>
              <h2
                style={{
                  fontSize: "clamp(22px, 3vw, 32px)",
                  fontWeight: 800,
                  letterSpacing: "-0.025em",
                  marginBottom: "32px",
                }}
              >
                {t("about.futureTitle")}
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                }}
              >
                {t.raw("about.roadmap").map((r: any) => (
                  <div key={r.q} style={{ display: "flex", gap: "20px" }}>
                    <Badge
                      style={{
                        background: "transparent",
                        color: TEXT_SECONDARY,
                        border: `1px solid ${BORDER}`,
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "2px 8px",
                        height: "auto",
                        flexShrink: 0,
                        marginTop: "1px",
                      }}
                    >
                      {r.q}
                    </Badge>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      {r.items.map((item: string) => (
                        <span
                          key={item}
                          style={{ fontSize: "14px", color: TEXT_SECONDARY }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section style={{ background: ACCENT }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "80px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "32px",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "clamp(22px, 3vw, 30px)",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.025em",
                marginBottom: "8px",
              }}
            >
              {t("footerCta.title")}
            </h2>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)" }}>
              {t("footerCta.desc")}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <a href="#install">
              <Button
                size="lg"
                style={{
                  background: "#fff",
                  color: ACCENT,
                  border: "none",
                  height: "48px",
                  padding: "0 28px",
                  fontWeight: 700,
                  fontSize: "15px",
                }}
              >
                {t("footerCta.cta1")}
              </Button>
            </a>
            <Link href="/experiences">
              <Button
                size="lg"
                variant="outline"
                style={{
                  height: "48px",
                  padding: "0 28px",
                  fontWeight: 600,
                  fontSize: "15px",
                  borderColor: "rgba(255,255,255,0.4)",
                  color: "#fff",
                  background: "transparent",
                }}
              >
                {t("footerCta.cta2")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer bar ── */}
      <footer
        style={{
          background: TEXT_PRIMARY,
          padding: "20px 32px",
          borderTop: "1px solid #292524",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "13px", color: "#78716c" }}>
            {t("footer.tagline")}
          </span>
          <span style={{ fontSize: "13px", color: "#57534e" }}>
            {t("footer.status")}
          </span>
        </div>
      </footer>
    </div>
  );
}
