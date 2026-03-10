#!/bin/bash
# ============================================
# ml-sharp Mac セットアップスクリプト
# 実行: bash ~/Documents/WebApp/DigiMamori/UI_Test/setup_sharp_mac.sh
# ============================================
set -e

SHARP_DIR="$HOME/Documents/ml-sharp"
UI_DIR="$HOME/Documents/WebApp/DigiMamori/UI_Test"
SPLATS_DIR="$UI_DIR/assets/splats"

echo ""
echo "⛩  推し守り — ml-sharp Mac セットアップ"
echo "=========================================="

# ── 1. uv インストール ──────────────────────
if ! command -v uv &> /dev/null; then
  echo "📦 uv をインストール中..."
  curl -LsSf https://astral.sh/uv/install.sh | sh
  export PATH="$HOME/.local/bin:$PATH"
  source "$HOME/.local/bin/env" 2>/dev/null || true
else
  echo "✅ uv: $(uv --version)"
fi

# ── 2. ml-sharp クローン ────────────────────
if [ ! -d "$SHARP_DIR" ]; then
  echo "📥 ml-sharp をダウンロード中..."
  git clone https://github.com/apple/ml-sharp "$SHARP_DIR"
else
  echo "✅ ml-sharp: $SHARP_DIR (既存)"
fi

# ── 3. Python環境 & インストール ────────────
cd "$SHARP_DIR"
if [ ! -d ".venv" ]; then
  echo "🐍 Python 3.13 環境を作成中..."
  uv venv --python 3.13
fi

echo "📦 依存ライブラリをインストール中..."
source .venv/bin/activate
uv pip install -r requirements.txt

# 動作確認
echo ""
echo "🔍 動作確認..."
sharp --help > /dev/null && echo "✅ sharp コマンド: OK"

# ── 4. splatsフォルダ作成 ──────────────────
mkdir -p "$SPLATS_DIR"
echo "✅ 出力先: $SPLATS_DIR"

# ── 5. 全タレント処理 ──────────────────────
echo ""
echo "🎴 3DGS 生成開始（Mac MPS使用）..."
echo ""

TALENTS=(
  "goto_rara"
  "tasaki_sakura"
  "abe_kayako"
  "ushio_sarina"
  "hayashi_yuka"
  "mori_chiharu"
  "kaito_aiko"
)

for TALENT in "${TALENTS[@]}"; do
  INPUT_DIR="$UI_DIR/assets/omamori/$TALENT"
  OUTPUT_DIR="$INPUT_DIR/output_mac"

  if [ ! -d "$INPUT_DIR" ]; then
    echo "⚠️  スキップ: $TALENT (フォルダなし)"
    continue
  fi

  echo "──────────────────────────────────"
  echo "🌸 処理中: $TALENT"

  mkdir -p "$OUTPUT_DIR"
  sharp predict -i "$INPUT_DIR" -o "$OUTPUT_DIR"

  # 最初の .ply を splats/ にコピー（ファイル名を揃える）
  PLY_FILE=$(ls "$OUTPUT_DIR"/*.ply 2>/dev/null | head -1)
  if [ -n "$PLY_FILE" ]; then
    cp "$PLY_FILE" "$SPLATS_DIR/${TALENT}.ply"
    SIZE=$(du -sh "$SPLATS_DIR/${TALENT}.ply" | cut -f1)
    echo "✅ $TALENT.ply ($SIZE)"
  else
    echo "❌ .ply 生成失敗: $TALENT"
  fi
done

# ── 6. 完了レポート ────────────────────────
echo ""
echo "=========================================="
echo "✨ 全タレント 3DGS 生成完了！"
echo ""
echo "📂 生成された .ply ファイル:"
ls -lh "$SPLATS_DIR"/*.ply 2>/dev/null || echo "  (なし)"
echo ""
echo "次のステップ（ターミナルで実行）:"
echo "  cd $UI_DIR"
echo "  git add -A && git commit -m 'feat: add 3DGS splat files' && git push"
echo "  vercel --prod"
echo "=========================================="
