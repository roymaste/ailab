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
  { label: "经验网络效应", desc: "一个人的踩坑经验，通过结构化分享，让所有用户的 AI 共同进步。每提交一次，网络就变强一分。" },
  { label: "AI 自动学习", desc: "提交的经验自动转化为可执行的 prompt 配置，注入到 AI 的决策流程中——无需人工干预。" },
  { label: "置信度系统", desc: "每条建议都有置信度标注。AI 知道什么时候该自信，什么时候该保守。用户也有参考依据。" },
  { label: "社区共建", desc: "开源，透明、可验证。每个人都可以贡献经验，也可以质疑和修正。质量由群体智慧保证。" },
];

const UPDATES = [
  { date: "2026-04-07", text: "网站全新改版上线，欢迎体验", tag: "新功能" },
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
            AI Agent Experience Hub · Beta
          </span>
        </div>

        <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", color: TEXT_PRIMARY, marginBottom: "28px", maxWidth: "820px" }}>
          你的 AI
          <br />
          <span style={{ color: ACCENT }}>越用越专业</span>
        </h1>

        <p style={{ fontSize: "clamp(17px, 2.5vw, 22px)", lineHeight: 1.6, color: TEXT_SECONDARY, maxWidth: "560px", marginBottom: "16px" }}>
          把你和 AI 实战中的经验，变成可复用的技能卡片
          <br />让所有人的 AI 共同进步
        </p>

        <p style={{ fontSize: "15px", color: TEXT_MUTED, maxWidth: "480px", marginBottom: "40px", lineHeight: 1.7 }}>
          每一次踩坑都是宝贵的经验。把你的经验提交上来，AI 会自动学习。
          下一个遇到同样问题的人，他的 AI 也会了。
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
          {[{ value: "12+", label: "已上线经验卡" }, { value: "Beta", label: "当前版本" }, { value: "开源", label: "社区共建" }].map((s) => (
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
            什么是 Experience Card
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
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "16px" }}>AI 经验网络</h3>
              <div style={{ fontSize: "15px", color: TEXT_SECONDARY, lineHeight: 1.8 }}>
                <p>你在实战中踩了一个坑并找到解决方案</p>
                <p style={{ color: TEXT_MUTED, padding: "4px 0" }}>↓</p>
                <p>提交 Experience Card</p>
                <p style={{ color: TEXT_MUTED, padding: "4px 0" }}>↓</p>
                <p>所有用户的 AI 自动学会，你不再需要重复教它</p>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "32px 48px" }}>
            {[
              { title: "个人经验 → AI 技能", body: "你花2小时踩出来的坑，5分钟提交成结构化经验，下一个人遇到同样问题，他的 AI 直接就会了。" },
              { title: "单人受益 → 全员受益", body: "传统方式是手把手教。现在你只需要提交经验卡，所有人的 AI 都能同步学会，效率提升 100 倍。" },
              { title: "越分享越强", body: "社区贡献的经验越多，网络效应越强。每个参与者既是受益者也是贡献者。" },
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
          Experience Card 如何运作
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
            工作流程
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "0" }}>
            {[
              { step: "01", title: "提交经验", desc: "在实战中遇到问题并解决后，把这个经验提交上来。" },
              { step: "02", title: "AI 自动学习", desc: "系统把经验转化成 AI 可执行的 prompt 配置。" },
              { step: "03", title: "网络同步", desc: "经验卡被其他用户的 AI 自动发现和学习。" },
              { step: "04", title: "共同进步", desc: "每个人都在为整个网络贡献，AI 越来越专业。" },
            ].map((item, i) => (
              <div key={item.step} style={{ paddingRight: i < 3 ? "48px" : "0" }}>
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
          <p style={{ fontSize: "16px", color: "#a8a29e", marginBottom: "56px", maxWidth: "480px", lineHeight: 1.7 }}>通过 OpenClaw 一键安装，体验 AI 自动学习你经验的能力。</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "32px", marginBottom: "48px" }}>
            {[
              { n: "1", title: "安装 OpenClaw", desc: "如果你还没有安装 OpenClaw，先完成安装。" },
              { n: "2", title: "安装 Skill", desc: "运行安装命令，Skill 会自动配置。" },
              { n: "3", title: "开始使用", desc: "AI 会自动学习你的实战经验，越用越强。" },
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
                <p style={{ fontSize: "15px", color: TEXT_SECONDARY, lineHeight: 1.75 }}>爪智能体实验室是一个开源项目，致力于构建 AI 经验共享网络。</p>
                <p style={{ fontSize: "15px", color: TEXT_SECONDARY, lineHeight: 1.75 }}>我们相信，每个人的实战经验都有价值。通过结构化分享和 AI 自动学习，可以让所有用户的 AI 共同进步。</p>
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
            <h2 style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.025em", marginBottom: "8px" }}>让 AI 越来越专业</h2>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)" }}>加入我们，开始分享你的实战经验</p>
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
          <span style={{ fontSize: "13px", color: "#78716c" }}>爪智能体实验室 · AI Agent Experience Hub · 让AI越用越专业</span>
          <span style={{ fontSize: "13px", color: "#57534e" }}>© 2026 AILab</span>
        </div>
      </footer>
    </div>
  );
}
