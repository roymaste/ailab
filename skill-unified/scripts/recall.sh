#!/bin/bash
# recall.sh — 召回记忆（通用 + 经验）
# 用法: ./recall.sh <query> [scope]
# scope: all | experiences | general (默认 all)
# query: 搜索关键词

set -e

QUERY="$1"
SCOPE="${2:-all}"
MEMORY_DIR="${MEMORY_DIR:-$HOME/.openclaw/workspace/memory}"
EXP_DIR="$MEMORY_DIR/experiences"
GENERAL_DIR="$MEMORY_DIR"

echo "=== 记忆召回 ==="
echo "查询: $QUERY"
echo "范围: $SCOPE"
echo ""

# 1. 优先搜索经验（experiences/）
if [[ "$SCOPE" == "all" ]] || [[ "$SCOPE" == "experiences" ]]; then
  echo "--- 经验匹配 ---"
  if [[ -d "$EXP_DIR" ]] && [[ -n "$(ls -A "$EXP_DIR"/*.md 2>/dev/null)" ]]; then
    # 先搜索 INDEX.md 快速匹配
    INDEX_FILE="$EXP_DIR/INDEX.md"
    if [[ -f "$INDEX_FILE" ]] && grep -iq "$QUERY" "$INDEX_FILE"; then
      echo "[INDEX命中]"
      grep -B2 -A5 "$QUERY" "$INDEX_FILE" 2>/dev/null || true
    fi
    
    # 全文搜索经验卡
    MATCHES=$(grep -rl "$QUERY" "$EXP_DIR"/*.md 2>/dev/null || true)
    if [[ -n "$MATCHES" ]]; then
      echo "[经验卡命中 $(echo "$MATCHES" | wc -w) 个]"
      for f in $MATCHES; do
        echo ""
        echo "--- $(basename "$f") ---"
        cat "$f"
      done
    else
      echo "[无匹配经验]"
    fi
  else
    echo "[无经验数据]"
  fi
  echo ""
fi

# 2. 搜索通用记忆（general/）
if [[ "$SCOPE" == "all" ]] || [[ "$SCOPE" == "general" ]]; then
  echo "--- 上下文匹配 ---"
  
  # 搜索 MEMORY.md
  MEMORY_FILE="$GENERAL_DIR/MEMORY.md"
  if [[ -f "$MEMORY_FILE" ]] && grep -iq "$QUERY" "$MEMORY_FILE"; then
    echo "[MEMORY.md命中]"
    grep -B1 -A3 "$QUERY" "$MEMORY_FILE" 2>/dev/null || true
  fi
  
  # 搜索 hot/sidecar.md
  HOT_FILE="$GENERAL_DIR/hot/sidecar.md"
  if [[ -f "$HOT_FILE" ]] && grep -iq "$QUERY" "$HOT_FILE"; then
    echo "[hot/sidecar命中]"
    grep -B1 -A3 "$QUERY" "$HOT_FILE" 2>/dev/null || true
  fi
  
  # 搜索 daily/
  if [[ -d "$GENERAL_DIR/daily" ]] && [[ -n "$(ls -A "$GENERAL_DIR/daily"/*.md 2>/dev/null)" ]]; then
    DAILY_MATCHES=$(grep -rl "$QUERY" "$GENERAL_DIR/daily"/*.md 2>/dev/null || true)
    if [[ -n "$DAILY_MATCHES" ]]; then
      echo "[daily命中 $(echo "$DAILY_MATCHES" | wc -w) 个]"
      for f in $DAILY_MATCHES; do
        echo ""
        echo "--- $(basename "$f") ---"
        grep -B1 -A3 "$QUERY" "$f" 2>/dev/null || true
      done
    fi
  fi
  
  echo "[无通用记忆匹配]"
fi

echo ""
echo "=== 召回完成 ==="
