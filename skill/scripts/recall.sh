#!/usr/bin/env bash
# AILab Experience Recall — 辅助存储脚本
# 用法: recall.sh [save|search|list] [参数...]

EXPERIENCES_DIR="${HOME}/.openclaw/workspace/memory/experiences"
INDEX_FILE="${EXPERIENCES_DIR}/INDEX.md"

mkdir -p "$EXPERIENCES_DIR"

case "$1" in
  save)
    # 用法: recall.sh save <title> <problem> <solution> <tags...>
    TITLE="$2"
    PROBLEM="$3"
    SOLUTION="$4"
    shift 4
    TAGS="$*"
    DATE=$(date +%Y-%m-%d)
    SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd 'a-z0-9-')
    FILENAME="${DATE}-${SLUG}.md"

    cat > "${EXPERIENCES_DIR}/${FILENAME}" <<EOF
# Experience: ${TITLE}

- **问题**：${PROBLEM}
- **解决**：${SOLUTION}
- **标签**：[${TAGS}]
- **置信度**：80%
- **日期**：${DATE}
- **来源对话**：由 AI 自动提取
EOF

    echo "✅ 经验已保存: ${FILENAME}"
    ;;

  search)
    # 用法: recall.sh search <keyword>
    KEYWORD="$2"
    if [ -z "$KEYWORD" ]; then
      echo "用法: recall.sh search <keyword>"
      exit 1
    fi
    grep -rl "$KEYWORD" "$EXPERIENCES_DIR" --include="*.md" | head -5
    ;;

  list)
    # 用法: recall.sh list [tag]
    TAG="$2"
    if [ -z "$TAG" ]; then
      ls -t "$EXPERIENCES_DIR"/*.md 2>/dev/null | head -20
    else
      grep -l "$TAG" "$EXPERIENCES_DIR"/*.md 2>/dev/null | head -20
    fi
    ;;

  index)
    # 更新索引
    echo "# Experience Index" > "$INDEX_FILE"
    echo "" >> "$INDEX_FILE"
    echo "## By Tag" >> "$INDEX_FILE"
    echo "" >> "$INDEX_FILE"
    for tag in openclaw feishu clash linux network; do
      files=$(grep -l "$tag" "$EXPERIENCES_DIR"/*.md 2>/dev/null)
      if [ -n "$files" ]; then
        echo "### ${tag}" >> "$INDEX_FILE"
        for f in $files; do
          echo "- $(basename "$f")" >> "$INDEX_FILE"
        done
        echo "" >> "$INDEX_FILE"
      fi
    done
    echo "✅ 索引已更新"
    ;;

  *)
    echo "AILab Experience Recall — 辅助脚本"
    echo ""
    echo "用法:"
    echo "  recall.sh save <title> <problem> <solution> <tags...>"
    echo "  recall.sh search <keyword>"
    echo "  recall.sh list [tag]"
    echo "  recall.sh index"
    ;;
esac
