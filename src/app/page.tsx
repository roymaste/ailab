"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ─── Design Tokens ───────────────────────────────────────────────────────────
const ACCENT = "#e11d48";
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
  category: "AI Assistant",
  problem: "AI assistant always gives vague, generic responses instead of professional advice for specific scenarios",
  solution: "Hive Memory provides specific scenario context and confidence scores, enabling AI to give more targeted answers",
  confidence: 92,
  tags: ["Prompt Engineering", "Scenario-based", "Confidence"],
  yaml: `name: Scenario-Based AI Assistant
version: 1.0
trigger:
  type: query_classification
  pattern: "how|what to do|advice"
context:
  domain: user_defined
  specificity: required
response:
  style: structured
  include_confidence: true`,
};

const FEATURES = [
  { label: "Your AI Gets Smarter Automatically", desc: "No manual learning needed. When your AI encounters problems, it automatically learns from the collective experience network—so you get more capable AI without any extra effort." },
  { label: "Preserves Your AI's Personality", desc: "Hive Memory only adds skills and knowledge. It never rewrites your AI's core personality or style. Your AI stays uniquely yours—just more capable over time." },
  { label: "Your AI Solves Harder Problems", desc: "When your AI faces a tough problem, it can tap into millions of solved experiences from the network. The hardest problems become solvable." },
  { label: "Private & Secure", desc: "Your AI's experience is stored locally. Hive Memory never accesses personal data, financial information, or private content. Zero privacy risk, zero property risk." },
];

const VALUE_PROPS = [
  { title: "Stop Repeating Mistakes", body: "Your AI remembers problems you've solved before. The same issue never trips you up twice." },
  { title: "Learn from Millions", body: "When others solve problems your AI hasn't faced yet, that knowledge becomes available to you—automatically." },
  { title: "Your AI, Smarter Every Day", body: "No configuration needed. Just use your AI normally, and it gets smarter over time." },
];

const UPDATES = [
  { date: "2026-04-07", text: "Hive Memory platform launched", tag: "New Feature" },
  { date: "2026-04-05", text: "Added confidence visualization", tag: "Update" },
  { date: "2026-04-01", text: "YAML import/export support", tag: "Update" },
  { date: "2026-03-28", text: "First experience cards online", tag: "Content" },
];

const ROADMAP = [
  { q: "Q2 2026", items: ["Auto experience discovery", "Confidence visualization", "Mobile adaptation"] },
  { q: "Q3 2026", items: ["Multi-language support", "API open", "Community incentive mechanism"] },
  { q: "Q4 2026", items: ["Enterprise version", "Private experience network", "Professional domain expansion"] },
];

// ─── Section Label ────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ color: ACCENT, fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }} className="mb-3">
      {children}
    </p>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function EnglishLandingPage() {
  return (
    <div style={{ background: BG, color: TEXT_PRIMARY, fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}>

      {/* ── Nav ── */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(250,250,249,0.85)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 32px", height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontWeight: 700, fontSize: "15px", color: TEXT_PRIMARY, textDecoration: "none" }}>
            AILab
          </Link>
          <nav style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <Link href="/experiences" style={{ fontSize: "14px", color: TEXT_SECONDARY, textDecoration: "none" }}>Experience Library</Link>
            <a href="#install" style={{ fontSize: "14px", color: TEXT_SECONDARY, textDecoration: "none" }}>Install</a>
            <a href="#about" style={{ fontSize: "14px", color: TEXT_SECONDARY, textDecoration: "none" }}>About</a>
            <Link href="/zh" style={{ fontSize: "13px", color: TEXT_SECONDARY, textDecoration: "none", padding: "4px 8px", border: `1px solid ${BORDER}`, borderRadius: "6px" }}>中文</Link>
            <a href="#install">
              <Button size="sm" style={{ background: ACCENT, color: "#fff", border: "none", fontWeight: 600, fontSize: "13px" }}>
                Install Now
              </Button>
            </a>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "96px 32px 80px" }}>
        <div style={{ marginBottom: "24px" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "13px", color: TEXT_SECONDARY, background: BG_SECONDARY, border: `1px solid ${BORDER}`, borderRadius: "100px", padding: "4px 14px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: ACCENT, display: "inline-block" }} />
            AI Agent Hive Memory · Beta
          </span>
        </div>

        <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", color: TEXT_PRIMARY, marginBottom: "28px", maxWidth: "820px" }}>
          Your AI.
          <br />
          <span style={{ color: ACCENT }}>Gets Smarter Every Day</span>
        </h1>

        <p style={{ fontSize: "clamp(17px, 2.5vw, 22px)", lineHeight: 1.6, color: TEXT_SECONDARY, maxWidth: "560px", marginBottom: "16px" }}>
          Stop repeating the same AI mistakes.
          <br />Learn from millions of solved problems—automatically.
        </p>

        <p style={{ fontSize: "15px", color: TEXT_MUTED, maxWidth: "480px", marginBottom: "40px", lineHeight: 1.7 }}>
          When your AI solves a problem, it automatically learns. When it faces a new problem, it taps into the collective experience network. You get smarter AI without lifting a finger.
        </p>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <a href="#install">
            <Button size="lg" style={{ background: ACCENT, color: "#fff", border: "none", height: "48px", padding: "0 28px", fontWeight: 600, fontSize: "15px" }}>
              Install Hive Memory
            </Button>
          </a>
          <Link href="/experiences">
            <Button size="lg" variant="outline" style={{ height: "48px", padding: "0 28px", fontWeight: 500, fontSize: "15px", borderColor: BORDER, color: TEXT_PRIMARY }}>
              Browse Experience Library
            </Button>
          </Link>
        </div>

        <div style={{ display: "flex", gap: "48px", marginTop: "72px", paddingTop: "48px", borderTop: `1px solid ${BORDER}` }}>
          {[{ value: "12+", label: "Experience Cards" }, { value: "Beta", label: "Current Version" }, { value: "100%", label: "Private & Local" }].map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: "28px", fontWeight: 800, letterSpacing: "-0.03em", color: TEXT_PRIMARY }}>{s.value}</div>
              <div style={{ fontSize: "13px", color: TEXT_MUTED, marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── What is Hive Memory ── */}
      <section style={{ background: SURFACE, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "96px 32px" }}>
          <SectionLabel>Concept</SectionLabel>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: "48px", maxWidth: "600px" }}>
            What is AI Agent Hive Memory
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0", border: `1px solid ${BORDER}`, borderRadius: "12px", overflow: "hidden", marginBottom: "56px" }}>
            <div style={{ padding: "40px 36px", borderRight: `1px solid ${BORDER}` }}>
              <p style={{ fontSize: "11px", fontWeight: 700, color: TEXT_MUTED, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>Without Hive Memory</p>
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "16px" }}>Same Problems, Repeated Mistakes</h3>
              <div style={{ fontSize: "15px", color: TEXT_SECONDARY, lineHeight: 1.8 }}>
                <p>Your AI faces a problem someone already solved</p>
                <p style={{ color: TEXT_MUTED, padding: "4px 0" }}>↓</p>
                <p>No memory of past solutions</p>
                <p style={{ color: TEXT_MUTED, padding: "4px 0" }}>↓</p>
                <p>Starts from scratch every time</p>
              </div>
            </div>
            <div style={{ padding: "40px 36px", background: BG }}>
              <p style={{ fontSize: "11px", fontWeight: 700, color: ACCENT, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>With Hive Memory</p>
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "16px" }}>Smarter with Every Problem Solved</h3>
              <div style={{ fontSize: "15px", color: TEXT_SECONDARY, lineHeight: 1.8 }}>
                <p>Your AI faces a problem someone already solved</p>
                <p style={{ color: TEXT_MUTED, padding: "4px 0" }}>↓</p>
                <p>Collective experience network activates</p>
                <p style={{ color: TEXT_MUTED, padding: "4px 0" }}>↓</p>
                <p>Your AI knows the solution—immediately</p>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "32px 48px" }}>
            {[
              { title: "Zero Effort Learning", body: "No need to manually train or configure. Your AI learns automatically through normal use." },
              { title: "Privacy Guaranteed", body: "Your AI's experience stays local. Hive Memory never accesses personal data or private content." },
              { title: "Smarter Every Day", body: "The more problems solved by the network, the smarter your AI becomes—without any action from you." },
            ].map((item) => (
              <div key={item.title}>
                <h4 style={{ fontWeight: 700, fontSize: "15px", marginBottom: "10px" }}>{item.title}</h4>
                <p style={{ fontSize: "14px", color: TEXT_SECONDARY, lineHeight: 1.7 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Features ── */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "96px 32px" }}>
        <SectionLabel>Core Mechanism</SectionLabel>
        <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: "56px", maxWidth: "500px" }}>
          How Hive Memory Works
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "64px", alignItems: "start" }}>
          {/* Sample card */}
          <div>
            <p style={{ fontSize: "12px", color: TEXT_MUTED, marginBottom: "12px", letterSpacing: "0.05em" }}>Sample Hive Memory Card</p>
            <div style={{ border: `1px solid ${BORDER}`, borderRadius: "10px", overflow: "hidden", background: SURFACE, boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)" }}>
              <div style={{ padding: "20px 24px", borderBottom: `1px solid ${BORDER}`, background: BG_SECONDARY }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <Badge style={{ fontSize: "10px", fontWeight: 600, background: BG, color: TEXT_SECONDARY, border: `1px solid ${BORDER}`, marginBottom: "8px" }}>{SAMPLE_CARD.category}</Badge>
                    <p style={{ fontSize: "14px", fontWeight: 600, lineHeight: 1.5, color: TEXT_PRIMARY }}>{SAMPLE_CARD.problem}</p>
                  </div>
                  <div style={{ textAlign: "center", marginLeft: "16px", flexShrink: 0 }}>
                    <div style={{ fontSize: "26px", fontWeight: 800, color: "#16a34a", lineHeight: 1 }}>{SAMPLE_CARD.confidence}</div>
                    <div style={{ fontSize: "10px", color: TEXT_MUTED, marginTop: "2px" }}>Confidence</div>
                  </div>
                </div>
              </div>
              <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <p style={{ fontSize: "10px", fontWeight: 700, color: TEXT_MUTED, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px" }}>Solution</p>
                  <p style={{ fontSize: "13px", color: TEXT_SECONDARY, lineHeight: 1.6 }}>{SAMPLE_CARD.solution}</p>
                </div>
                <div>
                  <p style={{ fontSize: "10px", fontWeight: 700, color: TEXT_MUTED, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>Tags</p>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {SAMPLE_CARD.tags.map((tag) => (
                      <Badge key={tag} style={{ fontSize: "11px", background: BG, color: TEXT_SECONDARY, border: `1px solid ${BORDER}` }}>{tag}</Badge>
                    ))}
                  </div>
                </div>
                <div style={{ background: "#1c1917", borderRadius: "8px", padding: "16px" }}>
                  <p style={{ fontSize: "10px", color: "#78716c", marginBottom: "10px", letterSpacing: "0.05em" }}>CONFIG.YAML</p>
                  <pre style={{ fontSize: "11.5px", color: "#d6d3d1", fontFamily: "var(--font-geist-mono), monospace", lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap" }}>{SAMPLE_CARD.yaml}</pre>
                </div>
              </div>
            </div>
          </div>

          {/* Feature list */}
          <div>
            {FEATURES.map((f, i) => (
              <div key={f.label} style={{ paddingTop: i > 0 ? "32px" : "0", borderTop: i > 0 ? `1px solid ${BORDER}` : "none" }}>
                <h4 style={{ fontWeight: 700, fontSize: "16px", marginBottom: "8px" }}>{f.label}</h4>
                <p style={{ fontSize: "14px", color: TEXT_SECONDARY, lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Value You Get ── */}
      <section style={{ background: BG_SECONDARY, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "96px 32px" }}>
          <SectionLabel>What You Get</SectionLabel>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: "56px", maxWidth: "500px" }}>
            Why Hive Memory Changes Everything
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "0" }}>
            {VALUE_PROPS.map((item, i) => (
              <div key={item.title} style={{ paddingRight: i < 2 ? "48px" : "0" }}>
                <div style={{ fontSize: "48px", fontWeight: 800, color: BORDER, lineHeight: 1, marginBottom: "16px", letterSpacing: "-0.04em" }}>0{i+1}</div>
                <h4 style={{ fontWeight: 700, fontSize: "17px", marginBottom: "10px" }}>{item.title}</h4>
                <p style={{ fontSize: "14px", color: TEXT_SECONDARY, lineHeight: 1.7 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest Updates ── */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "96px 32px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "40px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <SectionLabel>Continuous Iteration</SectionLabel>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, letterSpacing: "-0.025em" }}>Latest Updates</h2>
          </div>
          <Badge style={{ background: BG_SECONDARY, color: TEXT_SECONDARY, border: `1px solid ${BORDER}`, fontSize: "11px", fontWeight: 600 }}>Beta · Building</Badge>
        </div>
        <div>
          {UPDATES.map((u, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "24px", padding: "20px 0", borderBottom: i < UPDATES.length - 1 ? `1px solid ${BORDER}` : "none" }}>
              <span style={{ fontSize: "13px", color: TEXT_MUTED, fontVariantNumeric: "tabular-nums", width: "100px", flexShrink: 0 }}>{u.date}</span>
              <span style={{ fontSize: "15px", color: TEXT_PRIMARY, flex: 1 }}>{u.text}</span>
              <Badge style={{ fontSize: "11px", background: "transparent", color: TEXT_SECONDARY, border: `1px solid ${BORDER}`, flexShrink: 0 }}>{u.tag}</Badge>
            </div>
          ))}
        </div>
      </section>

      {/* ── Install ── */}
      <section id="install" style={{ background: TEXT_PRIMARY }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "96px 32px" }}>
          <SectionLabel>Quick Start</SectionLabel>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#fafaf9", marginBottom: "16px", maxWidth: "500px" }}>Install Hive Memory in One Click</h2>
          <p style={{ fontSize: "16px", color: "#a8a29e", marginBottom: "56px", maxWidth: "480px", lineHeight: 1.7 }}>Your AI starts learning from the collective experience network immediately after installation—no configuration needed.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "32px", marginBottom: "48px" }}>
            {[
              { n: "1", title: "Open Terminal", desc: "Make sure OpenClaw is installed and running." },
              { n: "2", title: "Run Install Command", desc: "Copy the command below and paste it into the terminal." },
              { n: "3", title: "Start Using", desc: "Use your AI normally. It learns automatically from the network." },
            ].map((s) => (
              <div key={s.n} style={{ display: "flex", gap: "16px" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: ACCENT, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, flexShrink: 0, marginTop: "2px" }}>{s.n}</div>
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: "15px", color: "#f5f5f4", marginBottom: "6px" }}>{s.title}</h4>
                  <p style={{ fontSize: "13px", color: "#78716c", lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: "#0c0a09", border: "1px solid #292524", borderRadius: "10px", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", maxWidth: "560px" }}>
            <code style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "14px", color: "#86efac", letterSpacing: "0.01em" }}>openclaw skills add ailab-hive</code>
            <button onClick={() => navigator.clipboard.writeText("openclaw skills add ailab-hive")} title="Copy" style={{ background: "transparent", border: "none", cursor: "pointer", color: "#78716c", fontSize: "16px", padding: "4px", transition: "color 0.15s" }}>📋</button>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" style={{ borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "96px 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "80px" }}>
            <div>
              <SectionLabel>Project Background</SectionLabel>
              <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: "24px" }}>About the Project</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <p style={{ fontSize: "15px", color: TEXT_SECONDARY, lineHeight: 1.75 }}>AILab is an experimental project exploring how AI Agents can accumulate practical experience through collective intelligence—so every agent gets smarter without individual effort.</p>
                <p style={{ fontSize: "15px", color: TEXT_SECONDARY, lineHeight: 1.75 }}>We believe: experience should not be recreated. When one AI solves a problem, that knowledge should benefit all AIs—automatically.</p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "4px" }}>
                  <Badge style={{ background: BG_SECONDARY, color: TEXT_SECONDARY, border: `1px solid ${BORDER}`, fontSize: "11px", fontWeight: 600 }}>Beta</Badge>
                  <span style={{ fontSize: "13px", color: TEXT_MUTED }}>Project is in early stage. Community contributions and discussions welcome.</span>
                </div>
              </div>
            </div>
            <div>
              <SectionLabel>Roadmap</SectionLabel>
              <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: "32px" }}>Future Plans</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {ROADMAP.map((r) => (
                  <div key={r.q} style={{ display: "flex", gap: "20px" }}>
                    <Badge style={{ background: "transparent", color: TEXT_SECONDARY, border: `1px solid ${BORDER}`, fontSize: "11px", fontWeight: 700, padding: "2px 8px", height: "auto", flexShrink: 0, marginTop: "1px" }}>{r.q}</Badge>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {r.items.map((item) => (
                        <span key={item} style={{ fontSize: "14px", color: TEXT_SECONDARY }}>{item}</span>
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
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "32px" }}>
          <div>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.025em", marginBottom: "8px" }}>Make Your AI Smarter Today</h2>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)" }}>Install Hive Memory and let your AI learn from the collective experience network</p>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a href="#install">
              <Button size="lg" style={{ background: "#fff", color: ACCENT, border: "none", height: "48px", padding: "0 28px", fontWeight: 700, fontSize: "15px" }}>Install Now</Button>
            </a>
            <Link href="/experiences">
              <Button size="lg" variant="outline" style={{ height: "48px", padding: "0 28px", fontWeight: 600, fontSize: "15px", borderColor: "rgba(255,255,255,0.4)", color: "#fff", background: "transparent" }}>Browse Library</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer bar ── */}
      <footer style={{ background: TEXT_PRIMARY, padding: "20px 32px", borderTop: "1px solid #292524" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
          <span style={{ fontSize: "13px", color: "#78716c" }}>AILab · AI Agent Hive Memory · Smarter AI, Zero Effort</span>
          <span style={{ fontSize: "13px", color: "#57534e" }}>Private · Secure · Open Source</span>
        </div>
      </footer>
    </div>
  );
}
