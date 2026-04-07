"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Experience {
  id: string;
  problem: string;
  solution: string;
  tags: string[];
  yaml: string;
  createdAt: string;
}

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterTag, setFilterTag] = useState("");
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const url = filterTag ? `/api/experiences?tag=${encodeURIComponent(filterTag)}` : "/api/experiences";
      const res = await fetch(url);
      const data = await res.json();
      setExperiences(data.experiences || []);
      
      // Collect all unique tags
      const tags = new Set<string>();
      data.experiences?.forEach((exp: Experience) => {
        exp.tags?.forEach((tag: string) => tags.add(tag));
      });
      setAllTags(Array.from(tags));
    } catch (err) {
      console.error("Failed to fetch:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    fetchExperiences();
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">浏览经验库</h1>
        <p className="text-slate-600">发现和学习AI Agent的实战经验</p>
      </div>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="按标签筛选..."
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          className="max-w-xs"
        />
        <Button onClick={handleFilter}>筛选</Button>
        {filterTag && (
          <Button variant="ghost" onClick={() => { setFilterTag(""); fetchExperiences(); }}>
            清除
          </Button>
        )}
      </div>

      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-sm text-slate-500">热门标签：</span>
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={filterTag === tag ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => {
                setFilterTag(tag);
                fetchExperiences();
              }}
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-slate-400">加载中...</div>
      ) : experiences.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-slate-400 text-lg mb-2">还没有经验</p>
            <p className="text-slate-400">成为第一个分享者！</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {experiences.map((exp) => (
            <Card 
              key={exp.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedExp(exp)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-base line-clamp-2">{exp.problem}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 line-clamp-3 mb-3">{exp.solution}</p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {exp.tags?.slice(0, 3).map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-slate-400">{formatDate(exp.createdAt)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedExp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-3xl w-full max-h-[80vh] overflow-auto">
            <CardHeader className="sticky top-0 bg-white border-b flex flex-row items-center justify-between">
              <CardTitle>Experience Card</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setSelectedExp(null)}>
                ✕
              </Button>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">问题</h3>
                  <p className="text-slate-700">{selectedExp.problem}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">标签</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedExp.tags?.map((tag: string) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">创建时间</h3>
                  <p className="text-slate-600">{formatDate(selectedExp.createdAt)}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">完整YAML</h3>
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    {selectedExp.yaml || "无YAML内容"}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
