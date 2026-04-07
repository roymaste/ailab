#!/bin/bash
# init.sh — 初始化统一记忆目录结构
# 首次加载时运行

set -e

MEMORY_DIR="${MEMORY_DIR:-$HOME/.openclaw/workspace/memory}"

echo "=== 初始化统一记忆目录 ==="
echo "目录: $MEMORY_DIR"
echo ""

# 创建目录结构
mkdir -p "$MEMORY_DIR/daily"
mkdir -p "$MEMORY_DIR/hot"
mkdir -p "$MEMORY_DIR/experiences"

# 创建必要文件（如果不存在）
[[ -f "$MEMORY_DIR/MEMORY.md" ]] || \
  cat > "$MEMORY_DIR/MEMORY.md" << 'EOF'
# MEMORY.md - 重要教训/经验记录

> 精简版，只记录真正重要的教训

## 核心教训（每次对话检查）

EOF

[[ -f "$MEMORY_DIR/hot/sidecar.md" ]] || \
  cat > "$MEMORY_DIR/hot/sidecar.md" << 'EOF'
# 热层常用记忆
# 高频访问的记忆片段，自动从此文件加载

EOF

[[ -f "$MEMORY_DIR/experiences/INDEX.md" ]] || \
  cat > "$MEMORY_DIR/experiences/INDEX.md" << 'EOF'
# 经验索引

更新时间: （首次初始化）

## 按标签聚合

（经验卡存入后自动更新）

EOF

echo "[完成] 目录结构:"
echo "  $MEMORY_DIR/"
echo "  $MEMORY_DIR/daily/"
echo "  $MEMORY_DIR/hot/"
echo "  $MEMORY_DIR/experiences/"
echo ""
echo "[完成] 初始化完成"
