// ============================================================
//  推し守り — デジタルお守り Web Mock
//  Gugenka Inc. 2026
// ============================================================

const { useState, useEffect, useRef, useCallback } = React;

// ── Real Talent Data ─────────────────────────────────────────
const OMAMORI_LIST = [
  {
    id: 1,
    talent: "後藤楽々",
    kana: "ごとう らら",
    color: "#F472B6",
    colorDark: "#DB2777",
    colorLight: "#FCE7F3",
    gradCss: "linear-gradient(160deg, #FDF2F8 0%, #FCE7F3 40%, #FBCFE8 100%)",
    emoji: "🌸",
    photos: [
      "./assets/omamori/goto_rara/_93A1220.jpg",
      "./assets/omamori/goto_rara/_93A1471.jpg",
      "./assets/omamori/goto_rara/_93A1857.jpg",
    ],
    oshi_msg: "今日も一日、お疲れ様🌸\nいつも応援ありがとう！",
    luckPoints: 280,
    maxPoints: 400,
    title: "楽々ちゃんの見習いファン",
    nextTitle: "楽々ちゃんの守り人",
    nextThreshold: 400,
    totalTaps: 1280,
    fullPowerCount: 3,
    acquired: "2026-01-15",
    contents: [
      { id: 1, type: "voice", title: "今日もお疲れ様ボイス", locked: false, date: "2月14日", desc: "バレンタイン当日の特別ボイス💌" },
      { id: 2, type: "image", title: "特別ショット", locked: false, date: "2月14日", imgSrc: "./assets/omamori/goto_rara/_93A1471.jpg" },
      { id: 3, type: "voice", title: "おやすみボイス", locked: true, date: "---", desc: "" },
    ],
    titles: [
      { name: "楽々ちゃんの新米ファン", threshold: 0, unlocked: true },
      { name: "楽々ちゃんの見習いファン", threshold: 200, unlocked: true },
      { name: "楽々ちゃんの守り人", threshold: 400, unlocked: false },
      { name: "楽々ちゃんの魂の番人", threshold: 800, unlocked: false },
    ],
  },
  {
    id: 2,
    talent: "田﨑さくら",
    kana: "たさき さくら",
    color: "#FB7185",
    colorDark: "#E11D48",
    colorLight: "#FFF1F2",
    gradCss: "linear-gradient(160deg, #FFF1F2 0%, #FFE4E6 40%, #FECDD3 100%)",
    emoji: "🌺",
    photos: [
      "./assets/omamori/tasaki_sakura/_93A0115.jpg",
      "./assets/omamori/tasaki_sakura/_93A0171.jpg",
      "./assets/omamori/tasaki_sakura/_93A0817.jpg",
    ],
    oshi_msg: "桜のように美しく、強く🌺\n一緒に頑張ろうね！",
    luckPoints: 400,
    maxPoints: 400,
    title: "さくらさんの魂の番人",
    nextTitle: "最上位称号！",
    nextThreshold: 999,
    totalTaps: 3840,
    fullPowerCount: 9,
    acquired: "2025-12-01",
    contents: [
      { id: 1, type: "voice", title: "春のご挨拶ボイス", locked: false, date: "3月1日", desc: "春一番のメッセージ🌸" },
      { id: 2, type: "image", title: "桜咲くショット", locked: false, date: "3月1日", imgSrc: "./assets/omamori/tasaki_sakura/_93A0171.jpg" },
      { id: 3, type: "voice", title: "誕生日メッセージ", locked: false, date: "4月1日", desc: "お誕生日おめでとう🎂" },
    ],
    titles: [
      { name: "さくらさんの新米ファン", threshold: 0, unlocked: true },
      { name: "さくらさんの見習いファン", threshold: 200, unlocked: true },
      { name: "さくらさんの守り人", threshold: 400, unlocked: true },
      { name: "さくらさんの魂の番人", threshold: 800, unlocked: true },
    ],
  },
  {
    id: 3,
    talent: "阿部華也子",
    kana: "あべ かやこ",
    color: "#FBBF24",
    colorDark: "#D97706",
    colorLight: "#FFFBEB",
    gradCss: "linear-gradient(160deg, #FFFBEB 0%, #FEF3C7 40%, #FDE68A 100%)",
    emoji: "🌻",
    photos: [
      "./assets/omamori/abe_kayako/_93A1111.jpg",
      "./assets/omamori/abe_kayako/_93A1160.jpg",
      "./assets/omamori/abe_kayako/_93A1849.jpg",
    ],
    oshi_msg: "太陽みたいに明るく照らすよ🌻\nありがとう！",
    luckPoints: 120,
    maxPoints: 400,
    title: "かやこさんの見習いファン",
    nextTitle: "かやこさんの守り人",
    nextThreshold: 400,
    totalTaps: 120,
    fullPowerCount: 0,
    acquired: "2026-02-01",
    contents: [
      { id: 1, type: "voice", title: "元気いっぱいボイス", locked: true, date: "---", desc: "" },
      { id: 2, type: "image", title: "サンシャインショット", locked: true, date: "---", imgSrc: "./assets/omamori/abe_kayako/_93A1160.jpg" },
    ],
    titles: [
      { name: "かやこさんの新米ファン", threshold: 0, unlocked: true },
      { name: "かやこさんの見習いファン", threshold: 200, unlocked: false },
      { name: "かやこさんの守り人", threshold: 400, unlocked: false },
      { name: "かやこさんの魂の番人", threshold: 800, unlocked: false },
    ],
  },
  {
    id: 4,
    talent: "潮紗理菜",
    kana: "うしお さりな",
    color: "#38BDF8",
    colorDark: "#0284C7",
    colorLight: "#F0F9FF",
    gradCss: "linear-gradient(160deg, #F0F9FF 0%, #E0F2FE 40%, #BAE6FD 100%)",
    emoji: "🌊",
    photos: [
      "./assets/omamori/ushio_sarina/_93A0259.jpg",
      "./assets/omamori/ushio_sarina/_93A0451.jpg",
      "./assets/omamori/ushio_sarina/_93A0659.jpg",
    ],
    oshi_msg: "波のように力強く前へ🌊\n一緒に進もう！",
    luckPoints: 60,
    maxPoints: 400,
    title: "さりなさんの新米ファン",
    nextTitle: "さりなさんの見習いファン",
    nextThreshold: 200,
    totalTaps: 60,
    fullPowerCount: 0,
    acquired: "2026-02-20",
    contents: [
      { id: 1, type: "voice", title: "海風ボイス", locked: true, date: "---", desc: "" },
      { id: 2, type: "image", title: "サマーショット", locked: true, date: "---", imgSrc: "./assets/omamori/ushio_sarina/_93A0451.jpg" },
    ],
    titles: [
      { name: "さりなさんの新米ファン", threshold: 0, unlocked: true },
      { name: "さりなさんの見習いファン", threshold: 200, unlocked: false },
      { name: "さりなさんの守り人", threshold: 400, unlocked: false },
      { name: "さりなさんの魂の番人", threshold: 800, unlocked: false },
    ],
  },
  {
    id: 5,
    talent: "林佑香",
    kana: "はやし ゆか",
    color: "#A78BFA",
    colorDark: "#7C3AED",
    colorLight: "#F5F3FF",
    gradCss: "linear-gradient(160deg, #F5F3FF 0%, #EDE9FE 40%, #DDD6FE 100%)",
    emoji: "🔮",
    photos: [
      "./assets/omamori/hayashi_yuka/_93A0098.jpg",
      "./assets/omamori/hayashi_yuka/_93A0204.jpg",
      "./assets/omamori/hayashi_yuka/_93A0513.jpg",
    ],
    oshi_msg: "不思議な魅力で輝き続けるよ🔮\nいつも感謝！",
    luckPoints: 200,
    maxPoints: 400,
    title: "ゆかさんの見習いファン",
    nextTitle: "ゆかさんの守り人",
    nextThreshold: 400,
    totalTaps: 200,
    fullPowerCount: 1,
    acquired: "2026-01-20",
    contents: [
      { id: 1, type: "voice", title: "神秘のボイス", locked: false, date: "2月1日", desc: "幻想的なメッセージ✨" },
      { id: 2, type: "image", title: "ミスティックショット", locked: true, date: "---", imgSrc: "./assets/omamori/hayashi_yuka/_93A0204.jpg" },
    ],
    titles: [
      { name: "ゆかさんの新米ファン", threshold: 0, unlocked: true },
      { name: "ゆかさんの見習いファン", threshold: 200, unlocked: true },
      { name: "ゆかさんの守り人", threshold: 400, unlocked: false },
      { name: "ゆかさんの魂の番人", threshold: 800, unlocked: false },
    ],
  },
  {
    id: 6,
    talent: "森千晴",
    kana: "もり ちはる",
    color: "#34D399",
    colorDark: "#059669",
    colorLight: "#ECFDF5",
    gradCss: "linear-gradient(160deg, #ECFDF5 0%, #D1FAE5 40%, #A7F3D0 100%)",
    emoji: "🍀",
    photos: [
      "./assets/omamori/mori_chiharu/_S3_1569.jpg",
      "./assets/omamori/mori_chiharu/_S3_1769.jpg",
      "./assets/omamori/mori_chiharu/_S3_1978.jpg",
    ],
    oshi_msg: "自然体のあなたが大好き🍀\n今日もありがとう！",
    luckPoints: 340,
    maxPoints: 400,
    title: "ちはるさんの見習いファン",
    nextTitle: "ちはるさんの守り人",
    nextThreshold: 400,
    totalTaps: 340,
    fullPowerCount: 2,
    acquired: "2026-01-10",
    contents: [
      { id: 1, type: "voice", title: "森の囁きボイス", locked: false, date: "1月20日", desc: "ナチュラルなメッセージ🌿" },
      { id: 2, type: "image", title: "グリーンショット", locked: false, date: "1月20日", imgSrc: "./assets/omamori/mori_chiharu/_S3_1769.jpg" },
      { id: 3, type: "voice", title: "おやすみボイス", locked: true, date: "---", desc: "" },
    ],
    titles: [
      { name: "ちはるさんの新米ファン", threshold: 0, unlocked: true },
      { name: "ちはるさんの見習いファン", threshold: 200, unlocked: true },
      { name: "ちはるさんの守り人", threshold: 400, unlocked: false },
      { name: "ちはるさんの魂の番人", threshold: 800, unlocked: false },
    ],
  },
  {
    id: 7,
    talent: "皆藤愛子",
    kana: "かいとう あいこ",
    color: "#F97316",
    colorDark: "#C2410C",
    colorLight: "#FFF7ED",
    gradCss: "linear-gradient(160deg, #FFF7ED 0%, #FFEDD5 40%, #FED7AA 100%)",
    emoji: "🍊",
    photos: [
      "./assets/omamori/kaito_aiko/_93A3111.jpg",
      "./assets/omamori/kaito_aiko/_S3_2429.jpg",
      "./assets/omamori/kaito_aiko/_S3_5100.jpg",
    ],
    oshi_msg: "元気を届けるのが私の使命🍊\nいつもありがとう！",
    luckPoints: 80,
    maxPoints: 400,
    title: "愛子さんの新米ファン",
    nextTitle: "愛子さんの見習いファン",
    nextThreshold: 200,
    totalTaps: 80,
    fullPowerCount: 0,
    acquired: "2026-03-01",
    contents: [
      { id: 1, type: "voice", title: "元気爆発ボイス", locked: true, date: "---", desc: "" },
      { id: 2, type: "image", title: "オレンジショット", locked: true, date: "---", imgSrc: "./assets/omamori/kaito_aiko/_S3_2429.jpg" },
    ],
    titles: [
      { name: "愛子さんの新米ファン", threshold: 0, unlocked: true },
      { name: "愛子さんの見習いファン", threshold: 200, unlocked: false },
      { name: "愛子さんの守り人", threshold: 400, unlocked: false },
      { name: "愛子さんの魂の番人", threshold: 800, unlocked: false },
    ],
  },
];

// ── Omamori Card with Real Photo ─────────────────────────────
function OmamoriFrame({ omamori, size = 200, fullPower = false }) {
  const { color, colorDark, photos, emoji } = omamori;
  const s = size;
  return (
    <div style={{
      width: s, height: s * 1.3, position: "relative",
      filter: fullPower ? `drop-shadow(0 0 20px ${color})` : `drop-shadow(0 4px 16px ${color}50)`,
      transition: "filter 0.5s",
    }}>
      <svg width={s} height={s * 1.3} viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", top: 0, left: 0 }}>
        {/* 紐 */}
        <line x1="100" y1="0" x2="100" y2="28" stroke={colorDark} strokeWidth="3" strokeLinecap="round"/>
        <ellipse cx="100" cy="12" rx="10" ry="8" fill="none" stroke={colorDark} strokeWidth="2.5"/>
        {/* 本体ベース */}
        <rect x="28" y="28" width="144" height="204" rx="22" fill="white" fillOpacity="0.9"/>
        {/* グラデーション重ね */}
        <rect x="28" y="28" width="144" height="204" rx="22" fill={`url(#og${omamori.id})`} fillOpacity="0.35"/>
        {/* ボーダー */}
        <rect x="28" y="28" width="144" height="204" rx="22" fill="none" stroke={colorDark} strokeWidth="2.5"/>
        {/* 内枠（写真クリップ用ガイド） */}
        <clipPath id={`clip${omamori.id}`}>
          <ellipse cx="100" cy="130" rx="52" ry="65"/>
        </clipPath>
        {/* 内枠リング */}
        <ellipse cx="100" cy="130" rx="56" ry="69" fill="none" stroke={colorDark} strokeWidth="2" strokeOpacity="0.4"/>
        <ellipse cx="100" cy="130" rx="52" ry="65" fill="none" stroke={color} strokeWidth="1.5" strokeOpacity="0.6"/>
        {/* 花飾り 上 */}
        {[55, 80, 100, 120, 145].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy={i % 2 === 0 ? 50 : 44} r="4.5" fill={color} fillOpacity="0.5"/>
            <circle cx={x} cy={i % 2 === 0 ? 50 : 44} r="2" fill="white" fillOpacity="0.9"/>
          </g>
        ))}
        {/* 花飾り 下 */}
        {[55, 80, 100, 120, 145].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy={i % 2 === 0 ? 210 : 216} r="4.5" fill={color} fillOpacity="0.5"/>
            <circle cx={x} cy={i % 2 === 0 ? 210 : 216} r="2" fill="white" fillOpacity="0.9"/>
          </g>
        ))}
        {/* リボン */}
        <path d="M 72 228 Q 100 220 128 228 Q 100 244 72 228 Z" fill={colorDark} fillOpacity="0.55"/>
        <circle cx="100" cy="226" r="5.5" fill={colorDark} fillOpacity="0.75"/>
        {/* フルパワー輝きリング */}
        {fullPower && (
          <ellipse cx="100" cy="130" rx="60" ry="74" fill="none" stroke="#FDE68A" strokeWidth="2"
            strokeOpacity="0.7" strokeDasharray="6 4"/>
        )}
        <defs>
          <linearGradient id={`og${omamori.id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color}/>
            <stop offset="100%" stopColor={colorDark}/>
          </linearGradient>
        </defs>
      </svg>
      {/* 写真を楕円でクリップして重ねる */}
      <div style={{
        position: "absolute",
        left: s * (48 / 200),
        top: s * 1.3 * (65 / 260),
        width: s * (104 / 200),
        height: s * 1.3 * (130 / 260),
        borderRadius: "50%",
        overflow: "hidden",
        border: `${s * 0.015}px solid ${color}80`,
      }}>
        {photos && photos[0] ? (
          <img src={photos[0]} alt={omamori.talent}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
            onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
          />
        ) : null}
        <div style={{ display: "none", width: "100%", height: "100%",
          alignItems: "center", justifyContent: "center",
          background: `linear-gradient(135deg, ${color}30, ${colorDark}30)`,
          fontSize: s * 0.2 }}>
          {emoji}
        </div>
      </div>
    </div>
  );
}

// ── Luck Meter ───────────────────────────────────────────────
function LuckMeter({ points, max, color, colorDark }) {
  const pct = Math.min(points / max, 1);
  const isFull = pct >= 1;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div style={{ fontSize: 10, fontFamily: "'Zen Maru Gothic'", color: colorDark, fontWeight: 700, letterSpacing: 1 }}>
        LUCK METER
      </div>
      <div style={{ width: 28, height: 200, background: "#f0f0f0", borderRadius: 14, overflow: "hidden",
        boxShadow: `0 0 0 2px ${color}40, inset 0 2px 4px rgba(0,0,0,0.1)`, position: "relative" }}>
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: `${pct * 100}%`,
          background: isFull
            ? `linear-gradient(to top, ${colorDark}, ${color}, #FDE68A, white)`
            : `linear-gradient(to top, ${colorDark}, ${color})`,
          borderRadius: 14,
          transition: "height 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
          boxShadow: isFull ? `0 0 12px ${color}` : "none",
        }}/>
        {[0.25, 0.5, 0.75].map(t => (
          <div key={t} style={{ position: "absolute", left: 0, right: 0, bottom: `${t * 100}%`,
            height: 1, background: "rgba(255,255,255,0.6)", zIndex: 1 }}/>
        ))}
      </div>
      <div style={{ fontSize: 10, fontFamily: "'Noto Sans JP'", color: colorDark, fontWeight: 700 }}>
        {isFull ? "✨MAX✨" : `${points}/${max}`}
      </div>
    </div>
  );
}

// ── Particles ─────────────────────────────────────────────────
let particleId = 0;
function useParticles() {
  const [particles, setParticles] = useState([]);
  const spawn = useCallback((x, y) => {
    const items = ["✨", "💫", "🌸", "⭐", "💕", "🎀"];
    const newP = Array.from({ length: 4 }, () => ({
      id: ++particleId,
      x: x + (Math.random() - 0.5) * 70,
      y: y + (Math.random() - 0.5) * 50,
      char: items[Math.floor(Math.random() * items.length)],
    }));
    setParticles(p => [...p, ...newP]);
    setTimeout(() => setParticles(p => p.filter(x => !newP.find(n => n.id === x.id))), 1000);
  }, []);
  return [particles, spawn];
}

// ── Home Screen ──────────────────────────────────────────────
function HomeScreen({ omamoriList, onSelect }) {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #FFF8F5 0%, #FDE8F5 50%, #F3E8FF 100%)",
      paddingBottom: 40, animation: "fade-in 0.4s ease" }}>
      {/* header */}
      <div style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(244,114,182,0.15)", padding: "48px 24px 16px", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 22, fontFamily: "'Zen Maru Gothic'", fontWeight: 700,
              background: "linear-gradient(90deg, #DB2777, #9333EA)", WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent" }}>⛩ 推し守り</div>
            <div style={{ fontSize: 11, color: "#9CA3AF", fontFamily: "'Noto Sans JP'", marginTop: 1 }}>デジタルお守りコレクション</div>
          </div>
          <div style={{ background: "linear-gradient(135deg, #FCE7F3, #EDE9FE)", borderRadius: "50%",
            width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>👤</div>
        </div>
      </div>

      <div style={{ padding: "20px 16px 0" }}>
        {/* stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 24 }}>
          {[
            { label: "所持お守り", value: omamoriList.length, unit: "個" },
            { label: "総タップ数", value: omamoriList.reduce((a,o) => a + o.totalTaps, 0).toLocaleString(), unit: "回" },
            { label: "フルパワー", value: omamoriList.reduce((a,o) => a + o.fullPowerCount, 0), unit: "回" },
          ].map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.85)", borderRadius: 14, padding: "12px 8px",
              textAlign: "center", boxShadow: "0 2px 12px rgba(219,39,119,0.08)", border: "1px solid rgba(244,114,182,0.12)" }}>
              <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Zen Maru Gothic'", color: "#DB2777" }}>
                {s.value}<span style={{ fontSize: 11 }}>{s.unit}</span>
              </div>
              <div style={{ fontSize: 10, color: "#9CA3AF", fontFamily: "'Noto Sans JP'" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 13, fontFamily: "'Noto Sans JP'", fontWeight: 700, color: "#6B7280", marginBottom: 12 }}>
          🎀 所持中のお守り
        </div>

        {/* cards — 2 column grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {omamoriList.map((o, i) => {
            const pct = o.luckPoints / o.maxPoints;
            const isFull = pct >= 1;
            return (
              <div key={o.id} onClick={() => onSelect(o)}
                style={{ background: "rgba(255,255,255,0.92)", borderRadius: 20, overflow: "hidden",
                  boxShadow: `0 4px 20px ${o.color}20`, border: `1px solid ${o.color}30`,
                  cursor: "pointer", transition: "transform 0.2s",
                  animation: `slide-up 0.4s ease ${i * 0.06}s both` }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
                onMouseLeave={e => e.currentTarget.style.transform = ""}>
                {isFull && (
                  <div style={{ background: `linear-gradient(90deg, ${o.color}, ${o.colorDark})`,
                    padding: "4px", textAlign: "center", fontSize: 9,
                    fontFamily: "'Zen Maru Gothic'", color: "white", fontWeight: 700 }}>
                    ✨ FULL POWER
                  </div>
                )}
                {/* photo thumbnail */}
                <div style={{ width: "100%", aspectRatio: "1", overflow: "hidden",
                  background: o.gradCss, position: "relative" }}>
                  {o.photos && o.photos[0] ? (
                    <img src={o.photos[0]} alt={o.talent}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}/>
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: 48 }}>{o.emoji}</div>
                  )}
                  {/* luck overlay */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4,
                    background: "#E5E7EB" }}>
                    <div style={{ height: "100%", width: `${pct * 100}%`,
                      background: isFull ? `linear-gradient(90deg, ${o.colorDark}, ${o.color}, #FDE68A)` : `linear-gradient(90deg, ${o.colorDark}, ${o.color})`,
                      transition: "width 0.5s ease" }}/>
                  </div>
                </div>
                <div style={{ padding: "10px 12px 12px" }}>
                  <div style={{ fontSize: 13, fontFamily: "'Zen Maru Gothic'", fontWeight: 700, color: "#1F2937" }}>
                    {o.talent}
                  </div>
                  <div style={{ fontSize: 9, color: o.colorDark, fontFamily: "'Noto Sans JP'", marginTop: 2,
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {o.title}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                    <span style={{ fontSize: 10, color: "#9CA3AF", fontFamily: "'Noto Sans JP'" }}>
                      {isFull ? "✨MAX" : `${o.luckPoints}/${o.maxPoints}`}
                    </span>
                    <span style={{ fontSize: 10, color: o.colorDark }}>{o.emoji}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* store */}
        <div style={{ marginTop: 24, background: "linear-gradient(135deg, #DB2777, #9333EA)",
          borderRadius: 18, padding: "20px 24px", textAlign: "center", cursor: "pointer",
          boxShadow: "0 6px 24px rgba(219,39,119,0.3)" }}>
          <div style={{ fontSize: 14, fontFamily: "'Zen Maru Gothic'", fontWeight: 700, color: "white", marginBottom: 4 }}>
            🛍 新しいお守りを手に入れる
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", fontFamily: "'Noto Sans JP'" }}>
            Xマーケットで購入 → アプリに自動追加
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Detail Screen ─────────────────────────────────────────────
function DetailScreen({ omamori: initial, onBack, onContentOpen }) {
  const [omamori, setOmamori] = useState(initial);
  const [particles, spawnParticle] = useParticles();
  const [ripples, setRipples] = useState([]);
  const [showFullPower, setShowFullPower] = useState(false);
  const [showOtakiage, setShowOtakiage] = useState(false);
  const [isBurning, setIsBurning] = useState(false);
  const [burnDone, setBurnDone] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(0);
  const cooldown = useRef(false);
  const isFull = omamori.luckPoints >= omamori.maxPoints;

  const handleTap = useCallback((e) => {
    if (cooldown.current) return;
    cooldown.current = true;
    setTimeout(() => { cooldown.current = false; }, 80);

    const rid = Date.now();
    setRipples(r => [...r, { id: rid, x: e.clientX, y: e.clientY }]);
    setTimeout(() => setRipples(r => r.filter(rr => rr.id !== rid)), 600);
    spawnParticle(e.clientX, e.clientY);

    const wasNotFull = omamori.luckPoints < omamori.maxPoints;
    setOmamori(o => {
      const next = Math.min(o.luckPoints + 4, o.maxPoints);
      if (wasNotFull && next >= o.maxPoints) setTimeout(() => setShowFullPower(true), 300);
      return { ...o, luckPoints: next, totalTaps: o.totalTaps + 1 };
    });
  }, [omamori.color, omamori.luckPoints, omamori.maxPoints, spawnParticle]);

  // photo cycle
  const totalPhotos = (omamori.photos || []).length;
  useEffect(() => {
    if (totalPhotos <= 1) return;
    const t = setInterval(() => setPhotoIdx(i => (i + 1) % totalPhotos), 3000);
    return () => clearInterval(t);
  }, [totalPhotos]);

  return (
    <div style={{ minHeight: "100vh", background: omamori.gradCss, animation: "fade-in 0.4s ease", position: "relative" }}>
      {particles.map(p => (
        <div key={p.id} className="particle" style={{ left: p.x, top: p.y, position: "fixed" }}>{p.char}</div>
      ))}
      {ripples.map(r => (
        <div key={r.id} className="tap-ripple-el" style={{
          position: "fixed", left: r.x - 10, top: r.y - 10, width: 20, height: 20,
          border: `2px solid ${omamori.color}`, borderRadius: "50%",
        }}/>
      ))}

      {/* header */}
      <div style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${omamori.color}30`, padding: "48px 20px 16px",
        display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 22,
          cursor: "pointer", color: omamori.colorDark }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontFamily: "'Zen Maru Gothic'", fontWeight: 700, color: "#1F2937" }}>{omamori.talent}</div>
          <div style={{ fontSize: 11, color: omamori.colorDark, fontFamily: "'Noto Sans JP'" }}>{omamori.title}</div>
        </div>
        <button onClick={() => onContentOpen(omamori)}
          style={{ background: `${omamori.color}20`, border: `1px solid ${omamori.color}50`,
            borderRadius: 20, padding: "6px 14px", fontSize: 11, fontFamily: "'Noto Sans JP'",
            color: omamori.colorDark, cursor: "pointer", fontWeight: 700 }}>
          🎁 限定
        </button>
      </div>

      <div style={{ padding: "24px 20px 120px", display: "flex", gap: 20, alignItems: "flex-start", justifyContent: "center" }}>
        {/* omamori frame with photo */}
        <div onClick={handleTap} style={{ cursor: "pointer", userSelect: "none",
          WebkitTapHighlightColor: "transparent", position: "relative" }}
          className={isFull ? "full-power-animate" : ""}>
          <OmamoriFrame omamori={{ ...omamori, photos: omamori.photos && [omamori.photos[photoIdx % omamori.photos.length]] }}
            size={200} fullPower={isFull}/>
          {isFull && (
            <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
              background: `linear-gradient(90deg, ${omamori.colorDark}, ${omamori.color})`,
              color: "white", fontSize: 10, fontFamily: "'Zen Maru Gothic'", fontWeight: 700,
              padding: "3px 12px", borderRadius: 20, whiteSpace: "nowrap",
              boxShadow: `0 2px 8px ${omamori.color}60` }}>
              ✨ FULL POWER ✨
            </div>
          )}
          {/* photo indicator */}
          {totalPhotos > 1 && (
            <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 8 }}>
              {omamori.photos.map((_, i) => (
                <div key={i} style={{ width: 5, height: 5, borderRadius: "50%",
                  background: i === photoIdx ? omamori.colorDark : `${omamori.color}40`,
                  transition: "background 0.3s" }}/>
              ))}
            </div>
          )}
          <div style={{ textAlign: "center", marginTop: 6, fontSize: 13, color: omamori.color,
            fontFamily: "'Zen Maru Gothic'", fontWeight: 700, letterSpacing: 2, opacity: 0.8 }}>
            TAP!
          </div>
        </div>
        {/* meter */}
        <div style={{ paddingTop: 20 }}>
          <LuckMeter points={omamori.luckPoints} max={omamori.maxPoints} color={omamori.color} colorDark={omamori.colorDark}/>
        </div>
      </div>

      {/* bottom */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0,
        background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)",
        borderTop: `1px solid ${omamori.color}30`, padding: "12px 20px 32px" }}>
        <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 12 }}>
          {[
            { label: "タップ数", value: omamori.totalTaps.toLocaleString() + "回" },
            { label: "フルパワー", value: omamori.fullPowerCount + "回" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Zen Maru Gothic'", color: omamori.colorDark }}>{s.value}</div>
              <div style={{ fontSize: 10, color: "#9CA3AF", fontFamily: "'Noto Sans JP'" }}>{s.label}</div>
            </div>
          ))}
        </div>
        <button onClick={() => setShowOtakiage(true)}
          style={{ width: "100%", background: "linear-gradient(90deg, #EF4444, #DC2626)",
            color: "white", border: "none", borderRadius: 14, padding: "13px",
            fontSize: 14, fontFamily: "'Zen Maru Gothic'", fontWeight: 700, cursor: "pointer" }}>
          🔥 お焚き上げ
        </button>
      </div>

      {showFullPower && (
        <FullPowerModal omamori={omamori} onClose={() => setShowFullPower(false)}
          onContents={() => { setShowFullPower(false); onContentOpen(omamori); }}/>
      )}
      {showOtakiage && !burnDone && (
        <OtakiageModal omamori={omamori} isBurning={isBurning}
          onConfirm={() => { setIsBurning(true); setTimeout(() => setBurnDone(true), 2500); }}
          onCancel={() => setShowOtakiage(false)}/>
      )}
      {burnDone && <BurnDoneModal omamori={omamori} onBack={onBack}/>}
    </div>
  );
}

// ── Full Power Modal ──────────────────────────────────────────
function FullPowerModal({ omamori, onClose, onContents }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24, backdropFilter: "blur(4px)" }}>
      <div style={{ background: "white", borderRadius: 24, overflow: "hidden", width: "100%", maxWidth: 340,
        animation: "bounce-in 0.5s ease", boxShadow: `0 20px 60px ${omamori.color}60` }}>
        {/* photo banner */}
        <div style={{ height: 140, position: "relative", overflow: "hidden" }}>
          {omamori.photos && omamori.photos[0] ? (
            <img src={omamori.photos[0]} alt={omamori.talent}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}/>
          ) : (
            <div style={{ width: "100%", height: "100%", background: omamori.gradCss,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56 }}>{omamori.emoji}</div>
          )}
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${omamori.colorDark}CC, transparent)` }}/>
          <div style={{ position: "absolute", bottom: 12, left: 0, right: 0, textAlign: "center" }}>
            <div style={{ fontSize: 22, fontFamily: "'Zen Maru Gothic'", fontWeight: 700, color: "white" }}>⚡ FULL POWER！</div>
          </div>
        </div>
        <div style={{ padding: "16px 20px 20px" }}>
          <div style={{ background: omamori.colorLight, borderRadius: 14, padding: "14px 16px", marginBottom: 14,
            textAlign: "center", borderLeft: `3px solid ${omamori.color}` }}>
            <div style={{ fontSize: 13, fontFamily: "'Noto Sans JP'", color: "#374151", lineHeight: 1.7,
              whiteSpace: "pre-wrap" }}>{omamori.oshi_msg}</div>
            <div style={{ fontSize: 10, color: "#9CA3AF", fontFamily: "'Noto Sans JP'", marginTop: 6 }}>— {omamori.talent} より</div>
          </div>
          <button onClick={onContents}
            style={{ width: "100%", background: `linear-gradient(90deg, ${omamori.colorDark}, ${omamori.color})`,
              color: "white", border: "none", borderRadius: 12, padding: "13px",
              fontSize: 13, fontFamily: "'Zen Maru Gothic'", fontWeight: 700, cursor: "pointer", marginBottom: 8 }}>
            🎁 限定コンテンツを見る
          </button>
          <button onClick={onClose}
            style={{ width: "100%", background: "none", border: "none", color: "#9CA3AF",
              fontSize: 12, fontFamily: "'Noto Sans JP'", cursor: "pointer", padding: "8px" }}>閉じる</button>
        </div>
      </div>
    </div>
  );
}

// ── Otakiage Modals ───────────────────────────────────────────
function OtakiageModal({ omamori, isBurning, onConfirm, onCancel }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "#1A0A00", borderRadius: 24, overflow: "hidden", width: "100%", maxWidth: 320,
        animation: "bounce-in 0.4s ease", border: "1px solid rgba(239,68,68,0.3)" }}>
        {!isBurning ? (
          <div style={{ padding: "28px 24px" }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 40 }}>🔥</div>
              <div style={{ fontSize: 18, fontFamily: "'Zen Maru Gothic'", fontWeight: 700, color: "#FCA5A5", marginTop: 8 }}>お焚き上げしますか？</div>
              <div style={{ fontSize: 12, color: "#6B7280", fontFamily: "'Noto Sans JP'", marginTop: 6, lineHeight: 1.6 }}>
                {omamori.talent}のお守りをお焚き上げします。<br/>称号・限定コンテンツは保持されます。
              </div>
            </div>
            <button onClick={onConfirm}
              style={{ width: "100%", background: "linear-gradient(90deg, #EF4444, #DC2626)", color: "white",
                border: "none", borderRadius: 12, padding: "13px", fontSize: 13,
                fontFamily: "'Zen Maru Gothic'", fontWeight: 700, cursor: "pointer", marginBottom: 8 }}>
              🔥 お焚き上げする
            </button>
            <button onClick={onCancel}
              style={{ width: "100%", background: "none", border: "1px solid rgba(107,114,128,0.3)",
                borderRadius: 12, padding: "12px", fontSize: 12, fontFamily: "'Noto Sans JP'",
                color: "#9CA3AF", cursor: "pointer" }}>キャンセル</button>
          </div>
        ) : (
          <div style={{ padding: "40px 24px", textAlign: "center" }}>
            <div style={{ position: "relative", display: "inline-block", marginBottom: 16 }}>
              {omamori.photos && omamori.photos[0] ? (
                <img src={omamori.photos[0]} style={{ width: 80, height: 80, borderRadius: "50%",
                  objectFit: "cover", border: `3px solid ${omamori.color}` }}/>
              ) : <div style={{ fontSize: 48 }}>{omamori.emoji}</div>}
              {[0,-12,12,-6,6].map((offset, i) => (
                <div key={i} className="flame-el" style={{
                  position: "absolute", bottom: 0, left: `calc(50% + ${offset}px)`,
                  width: 10, height: 28, background: "linear-gradient(to top, #EF4444, #F97316, #FDE68A)",
                  borderRadius: "50% 50% 0 0", animationDelay: `${i * 0.07}s` }}/>
              ))}
            </div>
            <div style={{ fontSize: 14, fontFamily: "'Zen Maru Gothic'", color: "#FCA5A5", fontWeight: 700 }}>お焚き上げ中…</div>
            <div style={{ fontSize: 11, color: "#6B7280", fontFamily: "'Noto Sans JP'", marginTop: 6 }}>感謝の気持ちと共に天へ帰ります</div>
          </div>
        )}
      </div>
    </div>
  );
}

function BurnDoneModal({ omamori, onBack }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 300,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "white", borderRadius: 24, padding: "32px 24px", width: "100%", maxWidth: 300,
        textAlign: "center", animation: "bounce-in 0.5s ease" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🕊</div>
        <div style={{ fontSize: 18, fontFamily: "'Zen Maru Gothic'", fontWeight: 700, color: "#1F2937", marginBottom: 8 }}>お焚き上げ完了</div>
        <div style={{ fontSize: 12, color: "#6B7280", fontFamily: "'Noto Sans JP'", lineHeight: 1.7, marginBottom: 20 }}>
          {omamori.talent}への感謝と共に、<br/>大切な思い出は守られています🌸
        </div>
        <button onClick={onBack}
          style={{ width: "100%", background: "linear-gradient(90deg, #DB2777, #9333EA)", color: "white",
            border: "none", borderRadius: 12, padding: "13px", fontSize: 13,
            fontFamily: "'Zen Maru Gothic'", fontWeight: 700, cursor: "pointer" }}>ホームに戻る</button>
      </div>
    </div>
  );
}

// ── Contents Screen ───────────────────────────────────────────
function ContentsScreen({ omamori, onBack }) {
  const [playingId, setPlayingId] = useState(null);
  return (
    <div style={{ minHeight: "100vh", background: omamori.gradCss, paddingBottom: 40, animation: "fade-in 0.4s ease" }}>
      <div style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${omamori.color}30`, padding: "48px 20px 16px",
        display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: omamori.colorDark }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontFamily: "'Zen Maru Gothic'", fontWeight: 700, color: "#1F2937" }}>🎁 限定コンテンツ</div>
          <div style={{ fontSize: 11, color: omamori.colorDark, fontFamily: "'Noto Sans JP'" }}>
            {omamori.talent} — {omamori.contents.filter(c=>!c.locked).length}/{omamori.contents.length}件解放済み
          </div>
        </div>
      </div>
      <div style={{ padding: "20px 16px" }}>
        {omamori.contents.map((c, i) => (
          <div key={c.id} onClick={() => !c.locked && setPlayingId(playingId === c.id ? null : c.id)}
            style={{ background: c.locked ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.92)", borderRadius: 18,
              marginBottom: 14, overflow: "hidden", boxShadow: c.locked ? "none" : `0 4px 20px ${omamori.color}20`,
              border: `1px solid ${c.locked ? "rgba(0,0,0,0.06)" : omamori.color + "30"}`,
              cursor: c.locked ? "default" : "pointer", opacity: c.locked ? 0.6 : 1,
              animation: `slide-up 0.4s ease ${i * 0.08}s both` }}>
            <div style={{ display: "flex", alignItems: "center", padding: "14px 16px" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, overflow: "hidden", flexShrink: 0,
                background: `${omamori.color}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {c.locked ? (
                  <span style={{ fontSize: 20 }}>🔒</span>
                ) : c.type === "image" && c.imgSrc ? (
                  <img src={c.imgSrc} style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
                ) : (
                  <span style={{ fontSize: 20 }}>{c.type === "voice" ? "🎵" : "🖼"}</span>
                )}
              </div>
              <div style={{ flex: 1, paddingLeft: 12 }}>
                <div style={{ fontSize: 14, fontFamily: "'Zen Maru Gothic'", fontWeight: 700, color: c.locked ? "#9CA3AF" : "#1F2937" }}>{c.title}</div>
                {!c.locked && c.desc && <div style={{ fontSize: 11, color: "#6B7280", fontFamily: "'Noto Sans JP'", marginTop: 2 }}>{c.desc}</div>}
                <div style={{ fontSize: 10, color: c.locked ? "#D1D5DB" : omamori.color, fontFamily: "'Noto Sans JP'", marginTop: 3 }}>
                  {c.locked ? "運気MAXで解放" : `解放日：${c.date}`}
                </div>
              </div>
              {!c.locked && (
                <div style={{ width: 32, height: 32, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${omamori.colorDark}, ${omamori.color})`,
                  display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 12 }}>
                  {playingId === c.id ? "⏸" : "▶"}
                </div>
              )}
            </div>
            {playingId === c.id && (
              <div style={{ padding: "0 16px 14px", animation: "fade-in 0.3s ease" }}>
                {c.type === "image" && c.imgSrc ? (
                  <img src={c.imgSrc} style={{ width: "100%", borderRadius: 12, objectFit: "cover", maxHeight: 200 }}/>
                ) : (
                  <div style={{ background: omamori.colorLight, borderRadius: 12, padding: "14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <div style={{ flex: 1, height: 4, background: `${omamori.color}40`, borderRadius: 2 }}>
                        <div style={{ width: "45%", height: "100%", background: omamori.color, borderRadius: 2 }}/>
                      </div>
                      <span style={{ fontSize: 11, color: omamori.colorDark, fontFamily: "'Noto Sans JP'" }}>0:15 / 0:32</span>
                    </div>
                    <div style={{ fontSize: 12, color: "#374151", fontFamily: "'Noto Sans JP'" }}>
                      🎵 <span style={{ color: omamori.colorDark, fontWeight: 700 }}>{omamori.talent}</span>からのボイスメッセージ
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Titles Screen ─────────────────────────────────────────────
function TitlesScreen({ omamori, onBack }) {
  return (
    <div style={{ minHeight: "100vh", background: omamori.gradCss, paddingBottom: 40, animation: "fade-in 0.4s ease" }}>
      <div style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${omamori.color}30`, padding: "48px 20px 16px",
        display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: omamori.colorDark }}>←</button>
        <div>
          <div style={{ fontSize: 16, fontFamily: "'Zen Maru Gothic'", fontWeight: 700, color: "#1F2937" }}>👑 ファン称号</div>
          <div style={{ fontSize: 11, color: omamori.colorDark, fontFamily: "'Noto Sans JP'" }}>{omamori.talent}</div>
        </div>
      </div>
      <div style={{ padding: "20px 16px" }}>
        {/* hero */}
        <div style={{ background: `linear-gradient(135deg, ${omamori.color}, ${omamori.colorDark})`,
          borderRadius: 20, overflow: "hidden", marginBottom: 20, boxShadow: `0 8px 24px ${omamori.color}50` }}>
          {omamori.photos && omamori.photos[0] && (
            <img src={omamori.photos[0]} style={{ width: "100%", height: 100, objectFit: "cover", objectPosition: "center top", opacity: 0.4 }}/>
          )}
          <div style={{ padding: "16px 20px 20px", marginTop: omamori.photos && omamori.photos[0] ? -20 : 0 }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontFamily: "'Noto Sans JP'" }}>現在の称号</div>
            <div style={{ fontSize: 17, fontFamily: "'Zen Maru Gothic'", fontWeight: 700, color: "white", marginTop: 2 }}>
              👑 {omamori.title}
            </div>
          </div>
        </div>
        {/* stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          {[
            { label: "総タップ数", value: omamori.totalTaps.toLocaleString() + "回", icon: "👆" },
            { label: "フルパワー達成", value: omamori.fullPowerCount + "回", icon: "⚡" },
            { label: "取得日", value: omamori.acquired, icon: "📅" },
            { label: "運気ポイント", value: omamori.luckPoints + "pt", icon: "✨" },
          ].map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.85)", borderRadius: 14, padding: "14px",
              boxShadow: `0 2px 12px ${omamori.color}10`, border: `1px solid ${omamori.color}20` }}>
              <div style={{ fontSize: 18, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Zen Maru Gothic'", color: omamori.colorDark }}>{s.value}</div>
              <div style={{ fontSize: 10, color: "#9CA3AF", fontFamily: "'Noto Sans JP'" }}>{s.label}</div>
            </div>
          ))}
        </div>
        {/* titles */}
        <div style={{ fontSize: 12, fontFamily: "'Noto Sans JP'", fontWeight: 700, color: "#6B7280", marginBottom: 10 }}>📜 称号一覧</div>
        {omamori.titles.map((t, i) => (
          <div key={i} style={{ background: t.unlocked ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)",
            borderRadius: 14, padding: "12px 14px", marginBottom: 10, display: "flex", alignItems: "center", gap: 12,
            border: `1px solid ${t.unlocked ? omamori.color + "40" : "rgba(0,0,0,0.06)"}`, opacity: t.unlocked ? 1 : 0.5 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, fontSize: 16, flexShrink: 0,
              background: t.unlocked ? `${omamori.color}30` : "#F3F4F6",
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              {t.unlocked ? "👑" : "🔒"}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontFamily: "'Zen Maru Gothic'", fontWeight: 700,
                color: t.unlocked ? "#1F2937" : "#9CA3AF" }}>{t.name}</div>
              <div style={{ fontSize: 10, color: "#9CA3AF", fontFamily: "'Noto Sans JP'", marginTop: 2 }}>
                {t.threshold === 0 ? "初回取得で解放" : `${t.threshold}pt達成で解放`}
              </div>
            </div>
            {t.unlocked && omamori.title === t.name && (
              <div style={{ background: `${omamori.color}20`, color: omamori.colorDark,
                fontSize: 10, fontFamily: "'Noto Sans JP'", fontWeight: 700, padding: "3px 8px", borderRadius: 20 }}>現在</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Bottom Nav ────────────────────────────────────────────────
function BottomNav({ active, onChange, color }) {
  const tabs = [
    { id: "home", label: "ホーム", icon: "⛩" },
    { id: "contents", label: "限定", icon: "🎁" },
    { id: "titles", label: "称号", icon: "👑" },
  ];
  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)",
      borderTop: "1px solid rgba(244,114,182,0.12)", display: "flex", padding: "8px 0 28px" }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)}
          style={{ flex: 1, background: "none", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "6px 0" }}>
          <div style={{ fontSize: 20, filter: active === t.id ? "none" : "grayscale(100%) opacity(50%)" }}>{t.icon}</div>
          <div style={{ fontSize: 10, fontFamily: "'Noto Sans JP'",
            color: active === t.id ? (color || "#DB2777") : "#9CA3AF",
            fontWeight: active === t.id ? 700 : 400 }}>{t.label}</div>
          {active === t.id && (
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: color || "#DB2777" }}/>
          )}
        </button>
      ))}
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────
function App() {
  const [screen, setScreen] = useState("home");
  const [subScreen, setSubScreen] = useState("home");
  const [selected, setSelected] = useState(null);

  const handleSelect = (o) => { setSelected(o); setSubScreen("home"); setScreen("detail"); };
  const handleBack = () => { setScreen("home"); setSelected(null); };
  const handleContentOpen = (o) => { setSelected(o); setSubScreen("contents"); setScreen("detail"); };

  return (
    <div style={{ minHeight: "100vh", background: "#1a0a0f",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div style={{ position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)",
        background: "rgba(255,255,255,0.07)", borderRadius: 20, padding: "5px 14px",
        fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "'Noto Sans JP'", zIndex: 1000, whiteSpace: "nowrap" }}>
        📱 推し守り Webモック v0.1
      </div>

      {/* phone frame */}
      <div style={{ width: 390, height: 844, background: "white", borderRadius: 44, position: "relative",
        boxShadow: "0 0 0 10px #111, 0 0 0 12px #2a2a2a, 0 40px 80px rgba(0,0,0,0.8)", overflow: "hidden" }}>
        {/* notch */}
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: 126, height: 37, background: "#111", borderRadius: "0 0 18px 18px", zIndex: 1000 }}/>
        <div style={{ height: "100%", overflowY: "auto", overflowX: "hidden" }}>
          {screen === "home" ? (
            <HomeScreen omamoriList={OMAMORI_LIST} onSelect={handleSelect}/>
          ) : screen === "detail" && selected ? (
            <div>
              {subScreen === "home" && <DetailScreen omamori={selected} onBack={handleBack} onContentOpen={handleContentOpen}/>}
              {subScreen === "contents" && <ContentsScreen omamori={selected} onBack={() => setSubScreen("home")}/>}
              {subScreen === "titles" && <TitlesScreen omamori={selected} onBack={() => setSubScreen("home")}/>}
              {subScreen !== "home" && <BottomNav active={subScreen} onChange={setSubScreen} color={selected.colorDark}/>}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
