#!/bin/bash
# index-experiences.sh — 更新经验索引
# 自动扫描 experiences/ 下所有 .md 文件，按标签聚合

set -e

MEMORY_DIR="${MEMORY_DIR:-$HOME/.openclaw/workspace/memory}"
EXP_DIR="$MEMORY_DIR/experiences"
INDEX_FILE="$EXP_DIR/INDEX.md"

# 确保目录存在
mkdir -p "$EXP_DIR"

echo "=== 更新经验索引 ===" > "$INDEX_FILE"
echo "" >> "$INDEX_FILE"
echo "# 经验索引" >> "$INDEX_FILE"
echo "" >> "$INDEX_FILE"
echo "更新时间: $(date '+%Y-%m-%d %H:%M:%S')" >> "$INDEX_FILE"
echo "" >> "$INDEX_FILE"

# 按标签分组
echo "## 按标签聚合" >> "$INDEX_FILE"
echo "" >> "$INDEX_FILE"

# 提取所有标签
TAGS=$(grep -h "^tags:" "$EXP_DIR"/*.md 2>/dev/null | \
       sed 's/tags: \[//g' | sed 's/\]//g' | \
       tr ',' '\n' | sed 's/^ *//g' | sed 's/ *$//g' | \
       sort -u | grep -v '^$')

for tag in $TAGS; do
  echo "### $tag" >> "$INDEX_FILE"
  echo "" >> "$INDEX_FILE"
  
  # 找到含有此标签的经验卡
  for f in "$EXP_DIR"/[0-9]*.md; do
    [[ -f "$f" ]] || continue
    if grep -q "tags:.*$tag" "$f"; then
      TITLE=$(grep "^title:" "$f" | sed 's/title: //')
      ID=$(grep "^id:" "$f" | sed 's/id: //')
      CONF=$(grep "^confidence:" "$f" | sed 's/confidence: //')
      echo "- **$TITLE** (id: $ID, 置信度: $CONF%)" >> "$INDEX_FILE"
    fi
  done
  echo "" >> "$INDEX_FILE"
done

# 按置信度排序
echo "## 按置信度排序（高→低）" >> "$INDEX_FILE"
echo "" >> "$INDEX_FILE"
grep -h "^---" "$EXP_DIR"/*.md 2>/dev/null | grep -A4 "^id:" | \
  grep -E "^(id|title|confidence|tags):" | \
  sed 'N;N;N;s/\n/ | /g' | sort -t'|' -k3 -rn | \
  while IFS='|' read -r id title conf tags; do
    echo "- $title (id: $id, 置信度: $conf%)" >> "$INDEX_FILE"
  done

echo "" >> "$INDEX_FILE"
echo "---" >> "$INDEX_FILE"
echo "索引更新完成: $(date '+%Y-%m-%d %H:%M:%S')" >> "$INDEX_FILE"

echo "[索引已更新] $INDEX_FILE"
