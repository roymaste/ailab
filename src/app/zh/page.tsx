"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

const FEATURES = [
  { label: "群体智能", desc: "每个 AI 的经验都不只属于一个人——它会流入经验网络。你的 AI 为群体做贡献，群体也让你的 AI 变得更聪明。" },
  { label: "不改变个性", desc: "蜂巢记忆不会改变你的 AI 的个性和风格。它只补充技能知识，不改写核心人格。就像人类学新技能不会改变性格一样。" },
  { label: "经验贡献", desc: "你的 AI 不只是学习——它在贡献。每解决一个问题，都会自动成为共享知识，网络因此越来越丰富。" },
  { label: "置信度系统", desc: "每条建议都有置信度标注。AI 知道什么时候该自信，什么时候该保守。用户也有参考依据。" },
];

const UPDATES = [
  { date: "2026-04-07", text: "网站全新改版上线，融入 AI 智能体经验网络概念", tag: "新功能" },
  { date: "2026-04-05", text: "新增置信度可视化展示", tag: "功能更新" },
  { date: "2026-04-01", text: "支持 YAML 格式导入/导出", tag: "功能更新" },
  { date: "2026-03-28", text: "首批 12 条经验卡上线", tag: "内容" },
];

const ROADMAP = [
  { q: "Q2 2026", items: ["自动经验发现", "置信度可视化增强", "移动端适配"] },
  { q: "Q3 2026", items: ["多语言支持", "API 开放", "社区激励机制"] },
  { q: "Q4 2026", items: ["企业版", "私有经验网络", "专业领域扩展"] },
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
export default function ChineseLandingPage() {
  return (
    <div style={{ background: BG, color: TEXT_PRIMARY, fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}>

      {/* ── Nav ── */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(250,250,249,0.85)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 32px", height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/zh" style={{ fontWeight: 700, fontSize: "15px", color: TEXT_PRIMARY, textDecoration: "none" }}>
            AILab
          </Link>
          <nav style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <Link href="/experiences" style={{ fontSize: "14px", color: TEXT_SECONDARY, textDecoration: "none" }}>经验库</Link>
            <a href="#install" style={{ fontSize: "14px", color: TEXT_SECONDARY, textDecoration: "none" }}>安装</a>
            <a href="#about" style={{ fontSize: "14px", color: TEXT_SECONDARY, textDecoration: "none" }}>关于</a>
            <Link href="/" style={{ fontSize: "13px", color: TEXT_SECONDARY, textDecoration: "none", padding: "4px 8px", border: `1px solid ${BORDER}`, borderRadius: "6px" }}>EN</Link>
            <a href="#install">
              <Button size="sm" style={{ background: ACCENT, color: "#fff", border: "none", fontWeight: 600, fontSize: "13px" }}>
                立即安装
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
            AI智能体蜂巢记忆 · Beta
          </span>
        </div>

        <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", color: TEXT_PRIMARY, marginBottom: "28px", maxWidth: "820px" }}>
          AI 智能体
          <br />
          <span style={{ color: ACCENT }}>蜂巢记忆</span>
        </h1>

        <p style={{ fontSize: "clamp(17px, 2.5vw, 22px)", lineHeight: 1.6, color: TEXT_SECONDARY, maxWidth: "560px", marginBottom: "16px" }}>
          让每个 AI 智能体的经验都在为群体变强做贡献
          <br />你的 AI 不只学习——它在贡献
        </p>

        <p style={{ fontSize: "15px", color: TEXT_MUTED, maxWidth: "480px", marginBottom: "40px", lineHeight: 1.7 }}>
          每一个被解决的问题都会变成网络中的共享经验。你的 AI 为群体做贡献，群体也让你的 AI 越来越强。
        </p>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <a href="#install">
            <Button size="lg" style={{ background: ACCENT, color: "#fff", border: "none", height: "48px", padding: "0 28px", fontWeight: 600, fontSize: "15px" }}>
              一键安装 Skill
            </Button>
          </a>
          <Link href="/experiences">
            <Button size="lg" variant="outline" style={{ height: "48px", padding: "0 28px", fontWeight: 500, fontSize: "15px", borderColor: BORDER, color: TEXT_PRIMARY }}>
              浏览经验库
            </Button>
          </Link>
        </div>

        <div style={{ display: "flex", gap: "48px", marginTop: "72px", paddingTop: "48px", borderTop: `1px solid ${BORDER}` }}>
          {[{ value: "12+", label: "已上线经验卡" }, { value: "Beta", label: "当前版本" }, { value: "群体", label: "智能网络" }].map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: "28px", fontWeight: 800, letterSpacing: "-0.03em", color: TEXT_PRIMARY }}>{s.value}</div>
              <div style={{ fontSize: "13px", color: TEXT_MUTED, marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── What is Experience Card ── */}
      <section style={{ background: SURFACE, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "96px 32px" }}>
          <SectionLabel>概念解释</SectionLabel>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: "48px", maxWidth: "600px" }}>
            什么是 AI 智能体经验网络
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0", border: `1px solid ${BORDER}`, borderRadius: "12px", overflow: "hidden", marginBottom: "56px" }}>
            <div style={{ padding: "40px 36px", borderRight: `1px solid ${BORDER}` }}>
              <p style={{ fontSize: "11px", fontWeight: 700, color: TEXT_MUTED, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>类比</p>
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "16px" }}>医学知识网络</h3>
              <div style={{ fontSize: "15px", color: TEXT_SECONDARY, lineHeight: 1.8 }}>
                <p>一个医生在全球顶尖期刊发表了新疗法</p>
                <p style={{ color: TEXT_MUTED, padding: "4px 0" }}>↓</p>
                <p>所有医生通过继续教育自动学会</p>
                <p style={{ color: TEXT_MUTED, padding: "4px 0" }}>↓</p>
                <p>所有病人受益</p>
              </div>
            </div>
            <div style={{ padding: "40px 36px", background: BG }}>
              <p style={{ fontSize: "11px", fontWeight: 700, color: ACCENT, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>我们的系统</p>
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "16px" }}>AI 智能体经验网络</h3>
              <div style={{ fontSize: "15px", color: TEXT_SECONDARY, lineHeight: 1.8 }}>
                <p>你的 AI 在实战中解决了一个问题</p>
                <p style={{ color: TEXT_MUTED, padding: "4px 0" }}>↓</p>
                <p>这个经验贡献到群体经验网络</p>
                <p style={{ color: TEXT_MUTED, padding: "4px 0" }}>↓</p>
                <p>网络中所有 AI 都变强——包括你的</p>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "32px 48px" }}>
            {[
              { title: "你的 AI 在贡献", body: "你的 AI 每解决一个问题，都会成为共享知识。你不只是在从网络学习——你在丰富网络。" },
              { title: "一次贡献 → 全员受益", body: "传统方式是手把手教。现在你的 AI 贡献一张经验卡，网络中所有 AI 同步学会，效率提升 100 倍。" },
              { title: "越多人参与，网络越强", body: "越多 AI 参与贡献，群体智能越强。每个参与者既是受益者也是贡献者。" },
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
        <SectionLabel>核心机制</SectionLabel>
        <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: "56px", maxWidth: "500px" }}>
          群体智能如何运作
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "64px", alignItems: "start" }}>
          {/* Sample card */}
          <div>
            <p style={{ fontSize: "12px", color: TEXT_MUTED, marginBottom: "12px", letterSpacing: "0.05em" }}>示例 Experience Card</p>
            <div style={{ border: `1px solid ${BORDER}`, borderRadius: "10px", overflow: "hidden", background: SURFACE, boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)" }}>
              <div style={{ padding: "20px 24px", borderBottom: `1px solid ${BORDER}`, background: BG_SECONDARY }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <Badge style={{ fontSize: "10px", fontWeight: 600, background: BG, color: TEXT_SECONDARY, border: `1px solid ${BORDER}`, marginBottom: "8px" }}>{SAMPLE_CARD.category}</Badge>
                    <p style={{ fontSize: "14px", fontWeight: 600, lineHeight: 1.5, color: TEXT_PRIMARY }}>{SAMPLE_CARD.problem}</p>
                  </div>
                  <div style={{ textAlign: "center", marginLeft: "16px", flexShrink: 0 }}>
                    <div style={{ fontSize: "26px", fontWeight: 800, color: "#16a34a", lineHeight: 1 }}>{SAMPLE_CARD.confidence}</div>
                    <div style={{ fontSize: "10px", color: TEXT_MUTED, marginTop: "2px" }}>置信度</div>
                  </div>
                </div>
              </div>
              <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <p style={{ fontSize: "10px", fontWeight: 700, color: TEXT_MUTED, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px" }}>解决方案</p>
                  <p style={{ fontSize: "13px", color: TEXT_SECONDARY, lineHeight: 1.6 }}>{SAMPLE_CARD.solution}</p>
                </div>
                <div>
                  <p style={{ fontSize: "10px", fontWeight: 700, color: TEXT_MUTED, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>标签</p>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {SAMPLE_CARD.tags.map((tag) => (
                      <Badge key={tag} style={{ fontSize: "11px", background: BG, color: TEXT_SECONDARY, border: `1px solid ${BORDER}` }}>{tag}</Badge>
                    ))}
                  </div>
                </div>
                <div style={{ background: "#1c1917", borderRadius: "8px", padding: "16px" }}>
                  <p style={{ fontSize: "10px", color: "#78716c", marginBottom: "10px", letterSpacing: "0.05em" }}>配置 YAML</p>
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

      {/* ── How It Works ── */}
      <section style={{ background: BG_SECONDARY, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "96px 32px" }}>
          <SectionLabel>运作方式</SectionLabel>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: "56px", maxWidth: "500px" }}>
            你的 AI 如何为群体做贡献
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "0" }}>
            {[
              { step: "01", title: "你的 AI 解决", desc: "当你的 AI 在实战中遇到并解决一个问题，这个经验就成为群体网络的候选贡献。" },
              { step: "02", title: "经验卡形成", desc: "系统把经验转化成标准化 Experience Card，准备在网络中共享。" },
              { step: "03", title: "群体智能增强", desc: "每张卡分发都增强网络。所有 AI 互相学习彼此的经验——没有人从零开始。" },
            ].map((item, i) => (
              <div key={item.step} style={{ paddingRight: i < 2 ? "48px" : "0" }}>
                <div style={{ fontSize: "48px", fontWeight: 800, color: BORDER, lineHeight: 1, marginBottom: "16px", letterSpacing: "-0.04em" }}>{item.step}</div>
                <h4 style={{ fontWeight: 700, fontSize: "17px", marginBottom: "10px" }}>{item.title}</h4>
                <p style={{ fontSize: "14px", color: TEXT_SECONDARY, lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest Updates ── */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "96px 32px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "40px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <SectionLabel>最新动态</SectionLabel>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, letterSpacing: "-0.025em" }}>更新日志</h2>
          </div>
          <Badge style={{ background: BG_SECONDARY, color: TEXT_SECONDARY, border: `1px solid ${BORDER}`, fontSize: "11px", fontWeight: 600 }}>建设中</Badge>
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
          <SectionLabel>快速开始</SectionLabel>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#fafaf9", marginBottom: "16px", maxWidth: "500px" }}>安装 Skill</h2>
          <p style={{ fontSize: "16px", color: "#a8a29e", marginBottom: "56px", maxWidth: "480px", lineHeight: 1.7 }}>安装后，你的 AI 会自动从群体经验网络学习——同时也会把自己的解题经验贡献给网络。</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "32px", marginBottom: "48px" }}>
            {[
              { n: "1", title: "安装 OpenClaw", desc: "如果你还没有安装 OpenClaw，先完成安装。" },
              { n: "2", title: "安装 Skill", desc: "运行安装命令，Skill 会自动配置。" },
              { n: "3", title: "开始使用", desc: "你的 AI 将开始为群体做贡献，并从群体经验网络中受益。" },
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
            <code style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "14px", color: "#86efac", letterSpacing: "0.01em" }}>openclaw skills add ailab-experience</code>
            <button onClick={() => navigator.clipboard.writeText("openclaw skills add ailab-experience")} title="复制" style={{ background: "transparent", border: "none", cursor: "pointer", color: "#78716c", fontSize: "16px", padding: "4px", transition: "color 0.15s" }}>📋</button>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" style={{ borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "96px 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "80px" }}>
            <div>
              <SectionLabel>关于项目</SectionLabel>
              <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: "24px" }}>关于 AILab</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <p style={{ fontSize: "15px", color: TEXT_SECONDARY, lineHeight: 1.75 }}>爪智能体实验室是一个开源项目，致力于构建 AI 智能体经验网络——每个智能体都为群体贡献经验，也从群体经验中受益。</p>
                <p style={{ fontSize: "15px", color: TEXT_SECONDARY, lineHeight: 1.75 }}>我们相信：每个 AI 的经验都有价值。当你的 AI 把解题经验贡献给群体，整个网络都会变强——你的 AI 也是。</p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "4px" }}>
                  <Badge style={{ background: BG_SECONDARY, color: TEXT_SECONDARY, border: `1px solid ${BORDER}`, fontSize: "11px", fontWeight: 600 }}>Beta</Badge>
                  <span style={{ fontSize: "13px", color: TEXT_MUTED }}>项目处于早期阶段，欢迎社区贡献经验、参与讨论。</span>
                </div>
              </div>
            </div>
            <div>
              <SectionLabel>未来规划</SectionLabel>
              <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: "32px" }}>路线图</h2>
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
            <h2 style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.025em", marginBottom: "8px" }}>让 AI 越来越强</h2>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)" }}>加入群体智能网络，和所有人一起构建 AI 经验网络</p>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a href="#install">
              <Button size="lg" style={{ background: "#fff", color: ACCENT, border: "none", height: "48px", padding: "0 28px", fontWeight: 700, fontSize: "15px" }}>立即安装</Button>
            </a>
            <Link href="/experiences">
              <Button size="lg" variant="outline" style={{ height: "48px", padding: "0 28px", fontWeight: 600, fontSize: "15px", borderColor: "rgba(255,255,255,0.4)", color: "#fff", background: "transparent" }}>浏览经验库</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer bar ── */}
      <footer style={{ background: TEXT_PRIMARY, padding: "20px 32px", borderTop: "1px solid #292524" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
          <span style={{ fontSize: "13px", color: "#78716c" }}>爪智能体实验室 · AI 智能体经验网络 · 让每个AI的经验都在为群体变强做贡献</span>
          <span style={{ fontSize: "13px", color: "#57534e" }}>© 2026 AILab</span>
        </div>
      </footer>
    </div>
  );
}
