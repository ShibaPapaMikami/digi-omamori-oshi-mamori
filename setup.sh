#!/bin/bash
# ============================================================
#  推し守り — GitHub & Vercel セットアップスクリプト
#  対象アカウント: shibapapamikami@gmail.com
# ============================================================

set -e
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo ""
echo -e "${BLUE}⛩  推し守り デプロイセットアップ${NC}"
echo "=================================================="

# ── 1. Homebrew チェック ─────────────────────────────────────
echo ""
echo -e "${YELLOW}[1/6] Homebrew チェック...${NC}"
if ! command -v brew &> /dev/null; then
  echo "Homebrewをインストールします..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
  echo -e "${GREEN}✓ Homebrew インストール済み${NC}"
fi

# ── 2. Node.js チェック ──────────────────────────────────────
echo ""
echo -e "${YELLOW}[2/6] Node.js チェック...${NC}"
if ! command -v node &> /dev/null; then
  echo "Node.jsをインストールします..."
  brew install node
else
  echo -e "${GREEN}✓ Node.js $(node -v) インストール済み${NC}"
fi

# ── 3. GitHub CLI ────────────────────────────────────────────
echo ""
echo -e "${YELLOW}[3/6] GitHub CLI セットアップ...${NC}"
if ! command -v gh &> /dev/null; then
  echo "GitHub CLIをインストールします..."
  brew install gh
else
  echo -e "${GREEN}✓ GitHub CLI $(gh --version | head -1) インストール済み${NC}"
fi

# ログイン状態チェック
if ! gh auth status &> /dev/null; then
  echo ""
  echo -e "${YELLOW}GitHubにログインします (shibapapamikami@gmail.com)${NC}"
  echo "ブラウザが開きます。GitHubアカウントでログインしてください。"
  gh auth login --hostname github.com --web
else
  echo -e "${GREEN}✓ GitHub ログイン済み${NC}"
fi

# ── 4. Gitリポジトリ初期化 ───────────────────────────────────
echo ""
echo -e "${YELLOW}[4/6] Git リポジトリ初期化...${NC}"

cd "$(dirname "$0")"

if [ ! -d ".git" ]; then
  git init
  git config user.email "shibapapamikami@gmail.com"
  git config user.name "ShibaPapaMikami"
  echo -e "${GREEN}✓ Gitリポジトリを初期化しました${NC}"
else
  echo -e "${GREEN}✓ Gitリポジトリ既存${NC}"
fi

# .gitignore
cat > .gitignore << 'EOF'
.DS_Store
node_modules/
.vercel/
*.log
EOF

# GitHubリポジトリ作成 & プッシュ
REPO_NAME="digi-omamori-oshi-mamori"

if ! gh repo view "ShibaPapaMikami/$REPO_NAME" &> /dev/null 2>&1; then
  echo "GitHubリポジトリを作成します..."
  gh repo create "$REPO_NAME" \
    --public \
    --description "デジタルお守り「推し守り」Webモック by Gugenka" \
    --source=. \
    --push
  echo -e "${GREEN}✓ GitHubリポジトリ作成 & プッシュ完了${NC}"
  echo -e "  URL: https://github.com/ShibaPapaMikami/$REPO_NAME"
else
  echo "既存のリポジトリにプッシュします..."
  git add -A
  git commit -m "feat: 推し守りWebモック初回コミット" --allow-empty
  git branch -M main
  git remote set-url origin "https://github.com/ShibaPapaMikami/$REPO_NAME.git" 2>/dev/null || \
    git remote add origin "https://github.com/ShibaPapaMikami/$REPO_NAME.git"
  git push -u origin main
  echo -e "${GREEN}✓ プッシュ完了${NC}"
fi

# ── 5. Vercel CLI ────────────────────────────────────────────
echo ""
echo -e "${YELLOW}[5/6] Vercel CLI セットアップ...${NC}"

if ! command -v vercel &> /dev/null; then
  echo "Vercel CLIをインストールします..."
  npm install -g vercel
else
  echo -e "${GREEN}✓ Vercel CLI $(vercel --version) インストール済み${NC}"
fi

# ── 6. Vercel デプロイ ────────────────────────────────────────
echo ""
echo -e "${YELLOW}[6/6] Vercel デプロイ...${NC}"
echo ""
echo -e "${YELLOW}ブラウザが開きます。shibapapamikami@gmail.com でVercelにログインしてください。${NC}"
echo ""

vercel --yes \
  --name "oshi-mamori" \
  --prod

echo ""
echo -e "${GREEN}=================================================="
echo -e "✅  セットアップ完了！"
echo -e "=================================================="
echo ""
echo -e "  GitHub : https://github.com/ShibaPapaMikami/$REPO_NAME"
echo -e "  Vercel  : 上記のURLを確認してください"
echo ""
echo -e "次回デプロイ:"
echo -e "  git add -A && git commit -m 'update' && git push"
echo -e "  (GitHubプッシュで自動デプロイされます)${NC}"
echo ""
