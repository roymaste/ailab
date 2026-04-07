import { NextRequest, NextResponse } from "next/server";

const MINIMAX_API_KEY = process.env.MINIMAX_API_KEY;
const PROXY_URL = process.env.PROXY_URL || "http://127.0.0.1:7897";

const YAML_EXAMPLE = `
version: "1.0"
type: experience_card
metadata:
  problem: 问题描述（一句话概括）
  domain: 领域/场景标签
  difficulty: easy/medium/hard
  tags: [标签1, 标签2, 标签3]

trigger:
  description: 触发条件描述
  patterns:
    - 匹配模式1
    - 匹配模式2

action:
  steps:
    - 步骤1描述
    - 步骤2描述
    - 步骤3描述
  tips:
    - 技巧1
    - 技巧2

pitfalls:
  - 常见错误1
  - 常见错误2

examples:
  - 输入: "示例输入"
    输出: "示例输出"
`;

const TRANSFORM_PROMPT = `你是一个AI Agent经验转化专家。请把用户的原始经验转化成结构化的Experience Card格式。

原始经验可能包含：
- 遇到的问题或场景
- 尝试过的方法
- 失败的原因
- 最终找到的解决方案
- 关键技巧和注意事项

请输出YAML格式的Experience Card，结构如下：
` + YAML_EXAMPLE;

export async function POST(request: NextRequest) {
  try {
    const { problem, experience } = await request.json();

    if (!problem || !experience) {
      return NextResponse.json(
        { error: "problem and experience are required" },
        { status: 400 }
      );
    }

    if (!MINIMAX_API_KEY) {
      return NextResponse.json(
        { error: "MINIMAX_API_KEY not configured" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.minimax.chat/v1/text/chatcompletion_pro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${MINIMAX_API_KEY}`,
      },
      body: JSON.stringify({
        model: "MiniMax-Text-01",
        messages: [
          { role: "system", content: TRANSFORM_PROMPT },
          { role: "user", content: `问题：${problem}\n\n原始经验：\n${experience}` }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
      // @ts-ignore
      proxy: PROXY_URL,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("MiniMax API error:", response.status, errorText);
      return NextResponse.json(
        { error: "AI transformation failed" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const yamlContent = data.choices?.[0]?.message?.content || "";

    return NextResponse.json({ yaml: yamlContent });
  } catch (error) {
    console.error("Transform error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
