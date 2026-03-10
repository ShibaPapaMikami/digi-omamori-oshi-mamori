#!/bin/bash
# ============================================
# .ply → .spz 圧縮スクリプト
# 実行: bash ~/Documents/WebApp/DigiMamori/UI_Test/compress_splats.sh
# ============================================
set -e

SPLATS_DIR="$HOME/Documents/WebApp/DigiMamori/UI_Test/assets/splats"
PY="$HOME/Documents/ml-sharp/.venv/bin/python"

echo ""
echo "⛩  推し守り — .ply → .spz 圧縮"
echo "=========================================="
echo "変換前サイズ:"
du -sh "$SPLATS_DIR"/*.ply 2>/dev/null | sort
echo ""

# python -m pip でインストール
echo "📦 3dgsconverter をインストール中..."
"$PY" -m pip install "git+https://github.com/francescofugazzi/3dgsconverter.git" -q

CONVERTER="$HOME/Documents/ml-sharp/.venv/bin/3dgsconverter"

cd "$SPLATS_DIR"

for PLY in *.ply; do
  NAME="${PLY%.ply}"
  echo "🔄 変換中: $NAME ..."
  "$CONVERTER" -i "$PLY" -o "${NAME}.spz" -f spz --force
  BEFORE=$(du -sh "$PLY"        | cut -f1)
  AFTER=$(du -sh  "${NAME}.spz" | cut -f1)
  echo "   ✅ $BEFORE → $AFTER"
done

echo ""
echo "🗑  元の .ply を削除..."
rm -f *.ply

echo ""
echo "変換後サイズ:"
du -sh "$SPLATS_DIR"/*.spz 2>/dev/null | sort
echo "📦 合計: $(du -sh "$SPLATS_DIR" | cut -f1)"
echo ""
echo "=========================================="
echo "✨ 完了！次のステップ:"
echo "  cd ~/Documents/WebApp/DigiMamori/UI_Test"
echo "  git add -A && git commit -m 'feat: 3DGS splats spz' && git push"
echo "  vercel --prod"
echo "=========================================="
