#!/bin/bash
# store-general.sh — 存入通用记忆
# 用法: ./store-general.sh <type> <content>
# type: preference | fact | decision | lesson | daily
# content: 要存入的内容

set -e

TYPE="$1"
CONTENT="$2"
MEMORY_DIR="${MEMORY_DIR:-$HOME/.openclaw/workspace/memory}"
GENERAL_DIR="$MEMORY_DIR"
TODAY=$(date +%Y-%m-%d)

# 确保目录存在
mkdir -p "$GENERAL_DIR/daily"
mkdir -p "$GENERAL_DIR/hot"

case "$TYPE" in
  preference|fact)
    # 追加到 MEMORY.md
    MEMORY_FILE="$GENERAL_DIR/MEMORY.md"
    echo "" >> "$MEMORY_FILE"
    echo "## [$TODAY] $TYPE" >> "$MEMORY_FILE"
    echo "$CONTENT" >> "$MEMORY_FILE"
    echo "[stored to MEMORY.md]"
    ;;

  decision|lesson)
    # 追加到 hot/sidecar.md（热层）
    HOT_FILE="$GENERAL_DIR/hot/sidecar.md"
    mkdir -p "$GENERAL_DIR/hot"
    echo "" >> "$HOT_FILE"
    echo "## [$TODAY] $TYPE" >> "$HOT_FILE"
    echo "$CONTENT" >> "$HOT_FILE"
    echo "[stored to hot/sidecar.md]"
    ;;

  daily)
    # 追加到 daily/YYYY-MM-DD.md
    DAILY_FILE="$GENERAL_DIR/daily/$TODAY.md"
    echo "" >> "$DAILY_FILE"
    echo "$CONTENT" >> "$DAILY_FILE"
    echo "[stored to daily/$TODAY.md]"
    ;;

  *)
    echo "Unknown type: $TYPE"
    echo "Usage: $0 <preference|fact|decision|lesson|daily> <content>"
    exit 1
    ;;
esac
