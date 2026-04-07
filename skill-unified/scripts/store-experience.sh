#!/bin/bash
# store-experience.sh — 存入结构化经验卡
# 用法: ./store-experience.sh <title> <problem> <root_cause> <solution> <summary> <tags> [confidence]
# tags: 逗号分隔的标签列表
# confidence: 0-100, 默认 50

set -e

MEMORY_DIR="${MEMORY_DIR:-$HOME/.openclaw/workspace/memory}"
EXP_DIR="$MEMORY_DIR/experiences"
TODAY=$(date +%Y-%m-%d)

# 确保目录存在
mkdir -p "$EXP_DIR"

# 解析参数
TITLE="$1"
PROBLEM="$2"
ROOT_CAUSE="$3"
SOLUTION="$4"
SUMMARY="$5"
TAGS="$6"
CONFIDENCE="${7:-50}"

# 清理标签格式
TAGS_CLEAN=$(echo "$TAGS" | sed 's/, /,/g' | sed 's/,/, /g')

# 生成序号（同一天第几个经验卡）
EXP_COUNT=$(find "$EXP_DIR" -name "$TODAY-*.md" 2>/dev/null | wc -l)
SEQ=$(printf "%03d" $((EXP_COUNT + 1)))
EXP_ID="exp_${TODAY}_${SEQ}"
EXP_FILE="$EXP_DIR/$TODAY-$SEQ.md"

# 生成经验卡
cat > "$EXP_FILE" << EOF
---
id: $EXP_ID
title: $TITLE
tags: [$TAGS_CLEAN]
confidence: $CONFIDENCE
validations: 1
created_at: $TODAY
---

## Problem
$PROBLEM

## Root Cause
$ROOT_CAUSE

## Solution
$SOLUTION

## Summary
$SUMMARY
EOF

echo "[stored] $EXP_FILE"
echo "id: $EXP_ID"

# 更新索引
"$EXP_DIR/../scripts/index-experiences.sh" 2>/dev/null || true
