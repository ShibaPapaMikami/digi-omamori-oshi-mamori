#!/bin/bash
# ============================================================
#  画像一括リサイズスクリプト
#  macOS内蔵 sips コマンドを使用（追加インストール不要）
#  最長辺を800pxに縮小 → Webに最適なサイズ
# ============================================================

ASSETS_DIR="$(dirname "$0")/assets/omamori"
MAX_SIZE=800
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo ""
echo "🖼  画像リサイズ開始（最長辺 ${MAX_SIZE}px）"
echo "================================================"

total=0
count=0

find "$ASSETS_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read -r file; do
  # リサイズ前のサイズ
  before=$(du -k "$file" | cut -f1)

  # sips でリサイズ（最長辺が MAX_SIZE を超える場合のみ縮小）
  sips --resampleHeightWidthMax $MAX_SIZE "$file" --out "$file" > /dev/null 2>&1

  # リサイズ後のサイズ
  after=$(du -k "$file" | cut -f1)

  echo -e "  ${GREEN}✓${NC} $(basename "$file")  ${before}KB → ${after}KB"
done

echo ""
echo -e "${GREEN}================================================"
echo -e "✅  完了！"
echo -e "================================================${NC}"
echo ""
echo "次のステップ:"
echo "  git add -A && git commit -m 'perf: 画像リサイズ最適化' && git push"
echo ""
