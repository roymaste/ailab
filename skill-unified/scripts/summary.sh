#!/bin/bash
# summary.sh — 对话结束后自动生成 Summary 并分类存储
# 用法: ./summary.sh <conversation_summary>
# 
# AI 在对话结束时调用此脚本，自动判断类型并存入对应位置：
#   - 经验教训 → experiences/YYYY-MM-DD-NNN.md
#   - 用户偏好/事实变更 → MEMORY.md
#   - 日常记录 → daily/YYYY-MM-DD.md

set -e

MEMORY_DIR="${MEMORY_DIR:-$HOME/.openclaw/workspace/memory}"
GENERAL_DIR="$MEMORY_DIR"
EXP_DIR="$MEMORY_DIR/experiences"
TODAY=$(date +%Y-%m-%d)

# 解析输入
SUMMARY="$1"

# 判断类型
classify() {
  local text="$1"
  if echo "$text" | grep -qiE "踩坑|翻车|问题|错误|失败|教训"; then
    echo "experience"
  elif echo "$text" | grep -qiE "偏好|喜欢|风格|习惯|设定|配置"; then
    echo "preference"
  elif echo "$text" | grep -qiE "决定|结论|方案|路线|计划"; then
    echo "decision"
  else
    echo "daily"
  fi
}

TYPE=$(classify "$SUMMARY")

case "$TYPE" in
  experience)
    # 经验教训 → 存入 experiences/
    echo "[Summary] 判断为经验教训，调用 store-experience.sh"
    EXP_COUNT=$(find "$EXP_DIR" -name "$TODAY-*.md" 2>/dev/null | wc -l)
    SEQ=$(printf "%03d" $((EXP_COUNT + 1)))
    TITLE="对话总结-$(date +%H%M%S)"
    "$EXP_DIR/../scripts/store-experience.sh" \
      "$TITLE" \
      "$SUMMARY" \
      "（从对话中提取）" \
      "$SUMMARY" \
      "$SUMMARY" \
      "summary,daily" \
      60
    ;;

  preference)
    # 偏好变更 → MEMORY.md
    echo "[Summary] 判断为偏好/事实，存入 MEMORY.md"
    echo "" >> "$GENERAL_DIR/MEMORY.md"
    echo "## [$TODAY] 偏好/事实更新" >> "$GENERAL_DIR/MEMORY.md"
    echo "$SUMMARY" >> "$GENERAL_DIR/MEMORY.md"
    echo "[stored to MEMORY.md]"
    ;;

  decision)
    # 重要决策 → hot/sidecar.md
    echo "[Summary] 判断为重要决策，存入 hot/sidecar.md"
    mkdir -p "$GENERAL_DIR/hot"
    echo "" >> "$GENERAL_DIR/hot/sidecar.md"
    echo "## [$TODAY] 重要决策" >> "$GENERAL_DIR/hot/sidecar.md"
    echo "$SUMMARY" >> "$GENERAL_DIR/hot/sidecar.md"
    echo "[stored to hot/sidecar.md]"
    ;;

  daily|*)
    # 日常记录 → daily/
    echo "[Summary] 判断为日常记录，存入 daily/$TODAY.md"
    mkdir -p "$GENERAL_DIR/daily"
    echo "" >> "$GENERAL_DIR/daily/$TODAY.md"
    echo "## $(date +%H:%M:%S)" >> "$GENERAL_DIR/daily/$TODAY.md"
    echo "$SUMMARY" >> "$GENERAL_DIR/daily/$TODAY.md"
    echo "[stored to daily/$TODAY.md]"
    ;;
esac
