import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@vercel/kv";

interface Experience {
  id: string;
  problem: string;
  solution: string;
  tags: string[];
  yaml: string;
  createdAt: string;
}

const kv = process.env.VERCEL_KV_REST_API_URL && process.env.VERCEL_KV_REST_API_TOKEN
  ? createClient({
      url: process.env.VERCEL_KV_REST_API_URL,
      token: process.env.VERCEL_KV_REST_API_TOKEN,
    })
  : null;

// For local development, use a simple in-memory store
const localStore: Map<string, Experience> = new Map();
let localIndex: string[] = [];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("tag");

  if (kv) {
    try {
      const keys = await kv.keys("experience:*");
      const experiences: Experience[] = [];
      
      for (const key of keys) {
        const exp = await kv.get(key) as Experience | null;
        if (exp) {
          if (!tag || (exp.tags && exp.tags.includes(tag))) {
            experiences.push(exp);
          }
        }
      }
      
      return NextResponse.json({ experiences: experiences.reverse() });
    } catch (error) {
      console.error("KV GET error:", error);
    }
  }

  // Local fallback
  let experiences = Array.from(localStore.values());
  if (tag) {
    experiences = experiences.filter((exp) => 
      exp.tags && exp.tags.includes(tag)
    );
  }
  return NextResponse.json({ experiences: experiences.reverse() });
}

export async function POST(request: NextRequest) {
  try {
    const { problem, solution, tags, yaml } = await request.json();

    if (!problem || !solution) {
      return NextResponse.json(
        { error: "problem and solution are required" },
        { status: 400 }
      );
    }

    const id = `EC-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const experience: Experience = {
      id,
      problem,
      solution,
      tags: tags || [],
      yaml: yaml || "",
      createdAt: new Date().toISOString(),
    };

    if (kv) {
      await kv.set(`experience:${id}`, experience);
      await kv.lpush("experience:index", id);
    } else {
      localStore.set(id, experience);
      localIndex.push(id);
    }

    return NextResponse.json({ experience });
  } catch (error) {
    console.error("Save error:", error);
    return NextResponse.json(
      { error: "Failed to save experience" },
      { status: 500 }
    );
  }
}
