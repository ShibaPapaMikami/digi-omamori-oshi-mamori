#!/bin/bash
# ============================================================
#  推し守り — GitHub & Vercel セットアップスクリプト
#  対象アカウント: shibapapamikami@gmail.com
# ============================================================

set -e
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

REPO_NAME="digi-omamori-oshi-mamori"

echo ""
echo -e "${BLUE}⛩  推し守り デプロイセットアップ${NC}"
echo "=================================================="

# ── 1. Homebrew ──────────────────────────────────────────────
echo -e "\n${YELLOW}[1/6] Homebrew チェック...${NC}"
command -v brew &>/dev/null && echo -e "${GREEN}✓ Homebrew OK${NC}" || \
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# ── 2. Node.js ───────────────────────────────────────────────
echo -e "\n${YELLOW}[2/6] Node.js チェック...${NC}"
command -v node &>/dev/null && echo -e "${GREEN}✓ Node.js $(node -v) OK${NC}" || brew install node

# ── 3. GitHub CLI ────────────────────────────────────────────
echo -e "\n${YELLOW}[3/6] GitHub CLI セットアップ...${NC}"
command -v gh &>/dev/null || brew install gh
gh auth status &>/dev/null || gh auth login --hostname github.com --web
echo -e "${GREEN}✓ GitHub CLI OK${NC}"

# ── 4. Git & GitHub リポジトリ ───────────────────────────────
echo -e "\n${YELLOW}[4/6] Git リポジトリ & GitHub セットアップ...${NC}"
cd "$(dirname "$0")"

# .gitignore
cat > .gitignore << 'EOF'
.DS_Store
node_modules/
.vercel/
*.log
EOF

# git init（未初期化の場合）
[ ! -d ".git" ] && git init && git config user.email "shibapapamikami@gmail.com" && git config user.name "ShibaPapaMikami"

# 初回コミット（変更があれば）
git add -A
git diff --cached --quiet || git commit -m "feat: 推し守りWebモック初回コミット"
git branch -M main

# リモート設定
if git remote get-url origin &>/dev/null; then
  echo -e "${GREEN}✓ リモート設定済み${NC}"
else
  if gh repo view "ShibaPapaMikami/$REPO_NAME" &>/dev/null 2>&1; then
    # 既存リポジトリにリモート追加
    git remote add origin "https://github.com/ShibaPapaMikami/$REPO_NAME.git"
  else
    # 新規作成（--pushなし、--remoteのみ）
    gh repo create "$REPO_NAME" \
      --public \
      --description "デジタルお守り「推し守り」Webモック by Gugenka" \
      --source=. \
      --remote=origin
  fi
fi

git push -u origin main
echo -e "${GREEN}✓ GitHub プッシュ完了: https://github.com/ShibaPapaMikami/$REPO_NAME${NC}"

# ── 5. Vercel CLI ────────────────────────────────────────────
echo -e "\n${YELLOW}[5/6] Vercel CLI セットアップ...${NC}"
command -v vercel &>/dev/null || npm install -g vercel
echo -e "${GREEN}✓ Vercel CLI $(vercel --version) OK${NC}"

# ── 6. Vercel デプロイ ────────────────────────────────────────
echo -e "\n${YELLOW}[6/6] Vercel デプロイ...${NC}"
echo -e "${YELLOW}ブラウザが開きます。shibapapamikami@gmail.com でログインしてください。${NC}\n"

vercel --yes --name "oshi-mamori" --prod

echo ""
echo -e "${GREEN}=================================================="
echo -e "✅  完了！"
echo -e "=================================================="
echo -e "  GitHub : https://github.com/ShibaPapaMikami/$REPO_NAME"
echo -e "\n次回デプロイ（自動）:"
echo -e "  git add -A && git commit -m 'update' && git push${NC}"
echo ""
