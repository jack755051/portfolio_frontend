#!/usr/bin/env bash
# 從 private vault 同步 Vue / C# 筆記到 content/notes/sync/
#
# 需求：已登入 gh（gh auth login），且帳號讀得到 jack755051/obsidian_notes
#
# 用法：
#   ./scripts/sync-obsidian-notes.sh
#   REPO=owner/name BRANCH=master ./scripts/sync-obsidian-notes.sh

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REPO="${REPO:-jack755051/obsidian_notes}"
BRANCH="${BRANCH:-master}"
OUT_DIR="${OUT_DIR:-$ROOT/content/notes/sync}"
HELPER="$ROOT/scripts/lib/obsidian-note-transform.mjs"

if ! command -v gh >/dev/null 2>&1; then
  echo "error: gh CLI is required" >&2
  exit 1
fi

if ! command -v node >/dev/null 2>&1; then
  echo "error: node is required" >&2
  exit 1
fi

if [[ ! -f "$HELPER" ]]; then
  echo "error: missing helper $HELPER" >&2
  exit 1
fi

echo "==> listing notes from $REPO@$BRANCH (Vue/, C#/)"
PATHS=()
while IFS= read -r line; do
  [[ -n "$line" ]] && PATHS+=("$line")
done < <(
  gh api "repos/${REPO}/git/trees/${BRANCH}?recursive=1" \
    --jq '.tree[] | select(.type=="blob") | .path' \
    | rg '^(Vue|C#)/' \
    | rg '\.md$' \
    | rg -v '(^|/)\.' \
    | sort
)

if [[ ${#PATHS[@]} -eq 0 ]]; then
  echo "error: no markdown files found under Vue/ or C#/" >&2
  exit 1
fi

echo "==> found ${#PATHS[@]} files"
rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"

synced=0
for path in "${PATHS[@]}"; do
  # URL-encode path segments for Contents API
  encoded="$(
    node -e '
      const p = process.argv[1]
      console.log(p.split("/").map(encodeURIComponent).join("/"))
    ' "$path"
  )"

  echo "  - $path"
  raw="$(gh api "repos/${REPO}/contents/${encoded}?ref=${BRANCH}" \
    -H "Accept: application/vnd.github.raw" \
    -H "X-GitHub-Api-Version: 2022-11-28")"

  date="$(
    gh api "repos/${REPO}/commits?path=$(node -e 'console.log(encodeURIComponent(process.argv[1]))' "$path")&per_page=1&sha=${BRANCH}" \
      --jq '.[0].commit.author.date // empty' 2>/dev/null || true
  )"
  date="${date:-$(date -u +%Y-%m-%dT%H:%M:%SZ)}"

  node "$HELPER" --path "$path" --date "$date" --out-dir "$OUT_DIR" <<<"$raw"
  synced=$((synced + 1))
done

echo "==> synced ${synced} notes → ${OUT_DIR#"$ROOT"/}"
echo "done."
