// ============================================================
//  推し守り — デジタルお守り Web Mock
//  Gugenka Inc. 2026
// ============================================================

const { useState, useEffect, useRef, useCallback } = React;

// ── Dummy Data ───────────────────────────────────────────────
const OMAMORI_LIST = [
  {
    id: 1,
    talent: "桜咲 ひな",
    kana: "さくらさき ひな",
    color: "#F472B6",
    colorDark: "#DB2777",
    colorLight: "#FCE7F3",
    gradCss: "linear-gradient(160deg, #FDF2F8 0%, #FCE7F3 40%, #FBCFE8 100%)",
    borderCss: "linear-gradient(135deg, #F9A8D4, #F472B6, #EC4899)",
    emoji: "🌸",
    oshi_msg: "今日も一日、お疲れ様🌸\nあなたのことを応援してるよ！",
    luckPoints: 280,
    maxPoints: 400,
    title: "ひなちゃんの見習いファン",
    nextTitle: "ひなちゃんの守り人",
    nextThreshold: 400,
    totalTaps: 1280,
    fullPowerCount: 3,
    acquired: "2026-01-15",
    contents: [
      { id: 1, type: "voice", title: "今日もお疲れ様ボイス", locked: false, date: "2月14日", desc: "バレンタイン当日の特別ボイス💌" },
      { id: 2, type: "image", title: "バレンタインコメント画像", locked: false, date: "2月14日", desc: "チョコ手作りしてみました🍫" },
      { id: 3, type: "voice", title: "おやすみボイス", locked: true, date: "---", desc: "" },
    ],
    titles: [
      { name: "ひなちゃんの新米ファン", threshold: 0, unlocked: true },
      { name: "ひなちゃんの見習いファン", threshold: 200, unlocked: true },
      { name: "ひなちゃんの守り人", threshold: 400, unlocked: false },
      { name: "ひなちゃんの魂の番人", threshold: 800, unlocked: false },
    ],
  },
  {
    id: 2,
    talent: "夜凪 りお",
    kana: "よなぎ りお",
    color: "#818CF8",
    colorDark: "#4F46E5",
    colorLight: "#EEF2FF",
    gradCss: "linear-gradient(160deg, #F5F3FF 0%, #EDE9FE 40%, #DDD6FE 100%)",
    borderCss: "linear-gradient(135deg, #A5B4FC, #818CF8, #6366F1)",
    emoji: "🌙",
    oshi_msg: "夜更かしはほどほどに🌙\nいつもありがとう、大好きだよ",
    luckPoints: 400,
    maxPoints: 400,
    title: "りおさんの魂の番人",
    nextTitle: "最上位称号！",
    nextThreshold: 999,
    totalTaps: 3840,
    fullPowerCount: 9,
    acquired: "2025-12-01",
    contents: [
      { id: 1, type: "voice", title: "深夜のありがとうボイス", locked: false, date: "1月31日", desc: "ありがとう…本当に嬉しかった🌙" },
      { id: 2, type: "image", title: "月見コメント画像", locked: false, date: "1月31日", desc: "今夜のお月様、綺麗だったね🌕" },
      { id: 3, type: "voice", title: "誕生日メッセージ", locked: false, date: "3月1日", desc: "お誕生日おめでとう🎂 大切な人へ" },
    ],
    titles: [
      { name: "りおさんの新米ファン", threshold: 0, unlocked: true },
      { name: "りおさんの見習いファン", threshold: 200, unlocked: true },
      { name: "りおさんの守り人", threshold: 400, unlocked: true },
      { name: "りおさんの魂の番人", threshold: 800, unlocked: true },
    ],
  },
  {
    id: 3,
    talent: "翠葉 めい",
    kana: "みどりば めい",
    color: "#34D399",
    colorDark: "#059669",
    colorLight: "#ECFDF5",
    gradCss: "linear-gradient(160deg, #ECFDF5 0%, #D1FAE5 40%, #A7F3D0 100%)",
    borderCss: "linear-gradient(135deg, #6EE7B7, #34D399, #10B981)",
    emoji: "🍀",
    oshi_msg: "今日も頑張ってくれてありがとう🍀\n一緒に前へ進もうね！",
    luckPoints: 60,
    maxPoints: 400,
    title: "めいちゃんの新米ファン",
    nextTitle: "めいちゃんの見習いファン",
    nextThreshold: 200,
    totalTaps: 60,
    fullPowerCount: 0,
    acquired: "2026-02-20",
    contents: [
      { id: 1, type: "voice", title: "春のご挨拶ボイス", locked: true, date: "---", desc: "" },
      { id: 2, type: "image", title: "新緑コメント画像", locked: true, date: "---", desc: "" },
    ],
    titles: [
      { name: "めいちゃんの新米ファン", threshold: 0, unlocked: true },
      { name: "めいちゃんの見習いファン", threshold: 200, unlocked: false },
      { name: "めいちゃんの守り人", threshold: 400, unlocked: false },
      { name: "めいちゃんの魂の番人", threshold: 800, unlocked: false },
    ],
  },
];

// ── Omamori SVG ──────────────────────────────────────────────
function OmamoriSVG({ color, colorDark, emoji, size = 200, fullPower = false }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: fullPower ? `drop-shadow(0 0 16px ${color})` : `drop-shadow(0 4px 12px ${color}60)`, transition: "filter 0.5s" }}>
      {/* 紐 */}
      <line x1="100" y1="0" x2="100" y2="28" stroke={colorDark} strokeWidth="3" strokeLinecap="round"/>
      <ellipse cx="100" cy="12" rx="10" ry="8" fill="none" stroke={colorDark} strokeWidth="2.5"/>
      {/* 本体 */}
      <rect x="30" y="28" width="140" height="200" rx="20" fill={`url(#grad_${color.replace('#','')})`} />
      <rect x="30" y="28" width="140" height="200" rx="20" fill="none" stroke={colorDark} strokeWidth="2.5" />
      {/* 内枠 */}
      <rect x="42" y="40" width="116" height="176" rx="14" fill="white" fillOpacity="0.45" />
      <rect x="42" y="40" width="116" height="176" rx="14" fill="none" stroke={colorDark} strokeWidth="1.5" strokeOpacity="0.4" />
      {/* 花飾り上 */}
      {[60, 100, 140].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy="56" r="5" fill={color} fillOpacity="0.7"/>
          <circle cx={x} cy="56" r="2.5" fill="white" fillOpacity="0.8"/>
        </g>
      ))}
      {/* 絵文字エリア */}
      <text x="100" y="148" textAnchor="middle" fontSize="56" style={{ userSelect: "none" }}>{emoji}</text>
      {/* 下リボン */}
      <path d="M 72 224 Q 100 216 128 224 Q 100 240 72 224 Z" fill={colorDark} fillOpacity="0.6"/>
      <circle cx="100" cy="222" r="5" fill={colorDark} fillOpacity="0.8"/>
      <defs>
        <linearGradient id={`grad_${color.replace('#','')}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25"/>
          <stop offset="100%" stopColor={colorDark} stopOpacity="0.5"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── Luck Meter ───────────────────────────────────────────────
function LuckMeter({ points, max, color, colorDark }) {
  const pct = Math.min(points / max, 1);
  const isFull = pct >= 1;
  const segments = [
    { label: "25%", threshold: 0.25 },
    { label: "50%", threshold: 0.5 },
    { label: "75%", threshold: 0.75 },
    { label: "MAX", threshold: 1 },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div style={{ fontSize: 10, fontFamily: "'Zen Maru Gothic'", color: colorDark, fontWeight: 700, letterSpacing: 1 }}>
        LUCK METER
      </div>
      <div style={{ width: 28, height: 200, background: "#f0f0f0", borderRadius: 14, overflow: "hidden",
        boxShadow: `0 0 0 2px ${color}40, inset 0 2px 4px rgba(0,0,0,0.1)`, position: "relative" }}>
        {/* fill */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: `${pct * 100}%`,
          background: isFull
            ? `linear-gradient(to top, ${colorDark}, ${color}, #FDE68A, white)`
            : `linear-gradient(to top, ${colorDark}, ${color})`,
          borderRadius: 14,
          transition: "height 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
          boxShadow: isFull ? `0 0 12px ${color}` : "none",
        }} />
        {/* segment lines */}
        {[0.25, 0.5, 0.75].map(t => (
          <div key={t} style={{
            position: "absolute", left: 0, right: 0,
            bottom: `${t * 100}%`, height: 1,
            background: "rgba(255,255,255,0.6)", zIndex: 1,
          }} />
        ))}
      </div>
      <div style={{ fontSize: 10, fontFamily: "'Noto Sans JP'", color: colorDark, fontWeight: 700 }}>
        {isFull ? "✨MAX✨" : `${points}/${max}`}
      </div>
    </div>
  );
}

// ── Particle ─────────────────────────────────────────────────
let particleId = 0;
function useParticles() {
  const [particles, setParticles] = useState([]);
  const spawn = useCallback((x, y, color) => {
    const items = ["✨", "💫", "🌸", "⭐", "💕", "🎀"];
    const count = 3 + Math.floor(Math.random() * 3);
    const newP = Array.from({ length: count }, (_, i) => ({
      id: ++particleId,
      x: x + (Math.random() - 0.5) * 60,
      y: y + (Math.random() - 0.5) * 40,
      char: items[Math.floor(Math.random() * items.length)],
    }));
    setParticles(p => [...p, ...newP]);
    setTimeout(() => setParticles(p => p.filter(x => !newP.find(n => n.id === x.id))), 1000);
  }, []);
  return [particles, spawn];
}

// ── Screen: Home ─────────────────────────────────────────────
function HomeScreen({ omamoriList, onSelect }) {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #FFF8F5 0%, #FDE8F5 50%, #F3E8FF 100%)",
      padding: "0 0 100px 0", animation: "fade-in 0.4s ease" }}>
      {/* header */}
      <div style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(244,114,182,0.15)", padding: "20px 24px 16px",
        position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 22, fontFamily: "'Zen Maru Gothic'", fontWeight: 700,
              background: "linear-gradient(90deg, #DB2777, #9333EA)", WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent", letterSpacing: 1 }}>⛩ 推し守り</div>
            <div style={{ fontSize: 11, color: "#9CA3AF", fontFamily: "'Noto Sans JP'", marginTop: 1 }}>
              デジタルお守りコレクション
            </div>
          </div>
          <div style={{ background: "linear-gradient(135deg, #FCE7F3, #EDE9FE)", borderRadius: "50%",
            width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, cursor: "pointer", boxShadow: "0 2px 8px rgba(219,39,119,0.2)" }}>
            👤
          </div>
        </div>
      </div>

      <div style={{ padding: "24px 16px 0" }}>
        {/* stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 24 }}>
          {[
            { label: "所持お守り", value: omamoriList.length, unit: "個" },
            { label: "総タップ数", value: omamoriList.reduce((a,o) => a + o.totalTaps, 0).toLocaleString(), unit: "回" },
            { label: "フルパワー", value: omamoriList.reduce((a,o) => a + o.fullPowerCount, 0), unit: "回" },
          ].map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.8)", borderRadius: 14,
              padding: "12px 8px", textAlign: "center",
              boxShadow: "0 2px 12px rgba(219,39,119,0.08)", border: "1px solid rgba(244,114,182,0.12)" }}>
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

        {/* cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {omamoriList.map((o, i) => {
            const pct = o.luckPoints / o.maxPoints;
            const isFull = pct >= 1;
            return (
              <div key={o.id} onClick={() => onSelect(o)}
                style={{ background: "rgba(255,255,255,0.9)", borderRadius: 20,
                  boxShadow: `0 4px 20px ${o.color}20, 0 1px 4px rgba(0,0,0,0.06)`,
                  border: `1px solid ${o.color}30`, cursor: "pointer",
                  overflow: "hidden", transition: "transform 0.2s, box-shadow 0.2s",
                  animation: `slide-up 0.4s ease ${i * 0.08}s both` }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 28px ${o.color}40`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = `0 4px 20px ${o.color}20, 0 1px 4px rgba(0,0,0,0.06)`; }}>
                {isFull && (
                  <div style={{ background: `linear-gradient(90deg, ${o.color}, ${o.colorDark})`,
                    padding: "5px 12px", textAlign: "center", fontSize: 11,
                    fontFamily: "'Zen Maru Gothic'", color: "white", fontWeight: 700 }}>
                    ✨ FULL POWER — 限定コンテンツ解放中！
                  </div>
                )}
                <div style={{ display: "flex", alignItems: "center", padding: "16px" }}>
                  <div style={{ width: 72, height: 92, flexShrink: 0 }}>
                    <OmamoriSVG color={o.color} colorDark={o.colorDark} emoji={o.emoji} size={72} fullPower={isFull} />
                  </div>
                  <div style={{ flex: 1, paddingLeft: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                      <span style={{ fontSize: 16, fontFamily: "'Zen Maru Gothic'", fontWeight: 700, color: "#1F2937" }}>{o.talent}</span>
                      <span style={{ fontSize: 10, background: `${o.color}20`, color: o.colorDark,
                        borderRadius: 20, padding: "2px 8px", fontFamily: "'Noto Sans JP'" }}>{o.emoji}</span>
                    </div>
                    <div style={{ fontSize: 11, color: "#9CA3AF", fontFamily: "'Noto Sans JP'", marginBottom: 8 }}>{o.title}</div>
                    {/* mini meter */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ flex: 1, height: 8, background: "#F3F4F6", borderRadius: 4, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct * 100}%`,
                          background: isFull ? `linear-gradient(90deg, ${o.colorDark}, ${o.color}, #FDE68A)` : `linear-gradient(90deg, ${o.colorDark}, ${o.color})`,
                          borderRadius: 4, transition: "width 0.5s ease",
                          boxShadow: isFull ? `0 0 6px ${o.color}` : "none" }} />
                      </div>
                      <span style={{ fontSize: 11, fontFamily: "'Noto Sans JP'", color: o.colorDark, fontWeight: 700, minWidth: 44 }}>
                        {isFull ? "MAX✨" : `${o.luckPoints}/${o.maxPoints}`}
                      </span>
                    </div>
                  </div>
                  <div style={{ color: "#D1D5DB", fontSize: 18, paddingLeft: 8 }}>›</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* store link */}
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

// ── Screen: Detail ────────────────────────────────────────────
function DetailScreen({ omamori: initial, onBack, onContentOpen }) {
  const [omamori, setOmamori] = useState(initial);
  const [particles, spawnParticle] = useParticles();
  const [ripples, setRipples] = useState([]);
  const [showFullPower, setShowFullPower] = useState(false);
  const [showOtakiage, setShowOtakiage] = useState(false);
  const [isBurning, setIsBurning] = useState(false);
  const [burnDone, setBurnDone] = useState(false);
  const tapAreaRef = useRef(null);
  const cooldown = useRef(false);
  const isFull = omamori.luckPoints >= omamori.maxPoints;

  const handleTap = useCallback((e) => {
    if (cooldown.current) return;
    cooldown.current = true;
    setTimeout(() => { cooldown.current = false; }, 80);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // ripple
    const rid = Date.now();
    setRipples(r => [...r, { id: rid, x, y }]);
    setTimeout(() => setRipples(r => r.filter(rr => rr.id !== rid)), 600);

    // particle
    spawnParticle(e.clientX, e.clientY, omamori.color);

    const wasNotFull = omamori.luckPoints < omamori.maxPoints;
    setOmamori(o => {
      const next = Math.min(o.luckPoints + 4, o.maxPoints);
      const nowFull = next >= o.maxPoints;
      if (wasNotFull && nowFull) setTimeout(() => setShowFullPower(true), 300);
      return { ...o, luckPoints: next, totalTaps: o.totalTaps + 1 };
    });
  }, [omamori.color, omamori.maxPoints, spawnParticle]);

  const handleOtakiage = () => {
    setIsBurning(true);
    setTimeout(() => setBurnDone(true), 2500);
  };

  return (
    <div style={{ minHeight: "100vh", background: omamori.gradCss, animation: "fade-in 0.4s ease", position: "relative" }}>
      {/* particles */}
      {particles.map(p => (
        <div key={p.id} className="particle" style={{ left: p.x, top: p.y, position: "fixed" }}>{p.char}</div>
      ))}

      {/* header */}
      <div style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${omamori.color}30`, padding: "16px 20px",
        display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 22,
          cursor: "pointer", color: omamori.colorDark, padding: "0 4px" }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontFamily: "'Zen Maru Gothic'", fontWeight: 700, color: "#1F2937" }}>
            {omamori.talent}
          </div>
          <div style={{ fontSize: 11, color: omamori.colorDark, fontFamily: "'Noto Sans JP'" }}>
            {omamori.title}
          </div>
        </div>
        <button onClick={() => onContentOpen(omamori)}
          style={{ background: `${omamori.color}20`, border: `1px solid ${omamori.color}50`,
            borderRadius: 20, padding: "6px 14px", fontSize: 11, fontFamily: "'Noto Sans JP'",
            color: omamori.colorDark, cursor: "pointer", fontWeight: 700 }}>
          🎁 限定
        </button>
      </div>

      <div style={{ padding: "24px 20px 100px", display: "flex", gap: 20, alignItems: "flex-start" }}>
        {/* tap area */}
        <div ref={tapAreaRef} style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div onClick={handleTap} style={{ position: "relative", cursor: "pointer",
            userSelect: "none", WebkitTapHighlightColor: "transparent" }}
            className={isFull ? "full-power-animate" : ""}>
            <OmamoriSVG color={omamori.color} colorDark={omamori.colorDark} emoji={omamori.emoji} size={200} fullPower={isFull} />
            {/* ripples */}
            {ripples.map(r => (
              <div key={r.id} className="tap-ripple-el" style={{
                left: r.x, top: r.y, width: 20, height: 20,
                marginLeft: -10, marginTop: -10,
                border: `2px solid ${omamori.color}`,
              }} />
            ))}
            {isFull && (
              <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)",
                background: `linear-gradient(90deg, ${omamori.colorDark}, ${omamori.color})`,
                color: "white", fontSize: 10, fontFamily: "'Zen Maru Gothic'", fontWeight: 700,
                padding: "3px 10px", borderRadius: 20, whiteSpace: "nowrap",
                boxShadow: `0 2px 8px ${omamori.color}60` }}>
                ✨ FULL POWER ✨
              </div>
            )}
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 13, color: omamori.color,
              fontFamily: "'Zen Maru Gothic'", fontWeight: 700, letterSpacing: 2, opacity: 0.8 }}>
              TAP!
            </div>
          </div>
        </div>

        {/* meter */}
        <div style={{ paddingTop: 16 }}>
          <LuckMeter points={omamori.luckPoints} max={omamori.maxPoints} color={omamori.color} colorDark={omamori.colorDark} />
        </div>
      </div>

      {/* stats bar */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0,
        background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)",
        borderTop: `1px solid ${omamori.color}30`, padding: "12px 20px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 12 }}>
          {[
            { label: "タップ数", value: omamori.totalTaps.toLocaleString(), unit: "回" },
            { label: "フルパワー", value: omamori.fullPowerCount, unit: "回" },
            { label: "称号", value: omamori.title.slice(0, 6) + "…", unit: "" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Zen Maru Gothic'", color: omamori.colorDark }}>
                {s.value}{s.unit && <span style={{ fontSize: 10 }}>{s.unit}</span>}
              </div>
              <div style={{ fontSize: 10, color: "#9CA3AF", fontFamily: "'Noto Sans JP'" }}>{s.label}</div>
            </div>
          ))}
        </div>
        <button onClick={() => setShowOtakiage(true)}
          style={{ width: "100%", background: "linear-gradient(90deg, #EF4444, #DC2626)",
            color: "white", border: "none", borderRadius: 14, padding: "13px",
            fontSize: 14, fontFamily: "'Zen Maru Gothic'", fontWeight: 700,
            cursor: "pointer", boxShadow: "0 4px 16px rgba(239,68,68,0.4)" }}>
          🔥 お焚き上げ
        </button>
      </div>

      {/* full power modal */}
      {showFullPower && (
        <FullPowerModal omamori={omamori} onClose={() => setShowFullPower(false)}
          onContents={() => { setShowFullPower(false); onContentOpen(omamori); }} />
      )}

      {/* otakiage modal */}
      {showOtakiage && !burnDone && (
        <OtakiageModal omamori={omamori} isBurning={isBurning}
          onConfirm={handleOtakiage} onCancel={() => setShowOtakiage(false)} />
      )}
      {burnDone && (
        <BurnDoneModal omamori={omamori} onBack={onBack} />
      )}
    </div>
  );
}

// ── Full Power Modal ──────────────────────────────────────────
function FullPowerModal({ omamori, onClose, onContents }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
      backdropFilter: "blur(4px)" }}>
      <div style={{ background: "white", borderRadius: 24, overflow: "hidden", width: "100%", maxWidth: 340,
        animation: "bounce-in 0.5s ease", boxShadow: `0 20px 60px ${omamori.color}60` }}>
        <div style={{ background: `linear-gradient(135deg, ${omamori.color}, ${omamori.colorDark})`,
          padding: "28px 24px 20px", textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>⚡️</div>
          <div style={{ fontSize: 22, fontFamily: "'Zen Maru Gothic'", fontWeight: 700, color: "white" }}>
            FULL POWER！
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", fontFamily: "'Noto Sans JP'", marginTop: 4 }}>
            運気がMAXに達しました
          </div>
        </div>
        <div style={{ padding: "20px 24px" }}>
          <div style={{ background: omamori.colorLight, borderRadius: 14, padding: "16px",
            marginBottom: 16, textAlign: "center" }}>
            <div style={{ fontSize: 18, marginBottom: 6 }}>{omamori.emoji}</div>
            <div style={{ fontSize: 13, fontFamily: "'Noto Sans JP'", color: "#374151", lineHeight: 1.6,
              whiteSpace: "pre-wrap" }}>{omamori.oshi_msg}</div>
            <div style={{ fontSize: 10, color: "#9CA3AF", fontFamily: "'Noto Sans JP'", marginTop: 8 }}>
              — {omamori.talent} より
            </div>
          </div>
          <button onClick={onContents}
            style={{ width: "100%", background: `linear-gradient(90deg, ${omamori.colorDark}, ${omamori.color})`,
              color: "white", border: "none", borderRadius: 12, padding: "13px",
              fontSize: 13, fontFamily: "'Zen Maru Gothic'", fontWeight: 700, cursor: "pointer",
              marginBottom: 8, boxShadow: `0 4px 16px ${omamori.color}50` }}>
            🎁 限定コンテンツを見る
          </button>
          <button onClick={onClose}
            style={{ width: "100%", background: "none", border: "none", color: "#9CA3AF",
              fontSize: 12, fontFamily: "'Noto Sans JP'", cursor: "pointer", padding: "8px" }}>
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Otakiage Modal ────────────────────────────────────────────
function OtakiageModal({ omamori, isBurning, onConfirm, onCancel }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "#1A0A00", borderRadius: 24, overflow: "hidden", width: "100%", maxWidth: 340,
        animation: "bounce-in 0.4s ease", border: "1px solid rgba(239,68,68,0.3)" }}>
        {!isBurning ? (
          <div style={{ padding: "28px 24px" }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 40 }}>🔥</div>
              <div style={{ fontSize: 18, fontFamily: "'Zen Maru Gothic'", fontWeight: 700, color: "#FCA5A5", marginTop: 8 }}>
                お焚き上げしますか？
              </div>
              <div style={{ fontSize: 12, color: "#6B7280", fontFamily: "'Noto Sans JP'", marginTop: 6, lineHeight: 1.6 }}>
                {omamori.talent}のお守りをお焚き上げします。<br/>
                称号・限定コンテンツは保持されます。
              </div>
            </div>
            <button onClick={onConfirm}
              style={{ width: "100%", background: "linear-gradient(90deg, #EF4444, #DC2626)",
                color: "white", border: "none", borderRadius: 12, padding: "13px",
                fontSize: 13, fontFamily: "'Zen Maru Gothic'", fontWeight: 700,
                cursor: "pointer", marginBottom: 8, boxShadow: "0 4px 16px rgba(239,68,68,0.4)" }}>
              🔥 お焚き上げする
            </button>
            <button onClick={onCancel}
              style={{ width: "100%", background: "none", border: "1px solid rgba(107,114,128,0.3)",
                borderRadius: 12, padding: "12px", fontSize: 12, fontFamily: "'Noto Sans JP'",
                color: "#9CA3AF", cursor: "pointer" }}>
              キャンセル
            </button>
          </div>
        ) : (
          <BurningAnimation omamori={omamori} />
        )}
      </div>
    </div>
  );
}

function BurningAnimation({ omamori }) {
  return (
    <div style={{ padding: "40px 24px", textAlign: "center" }}>
      <div style={{ position: "relative", display: "inline-block", marginBottom: 20 }}>
        <OmamoriSVG color={omamori.color} colorDark={omamori.colorDark} emoji={omamori.emoji} size={80} />
        {/* flames */}
        {[0, -15, 15, -8, 8].map((offset, i) => (
          <div key={i} className="flame-el" style={{
            position: "absolute", bottom: 0, left: `calc(50% + ${offset}px)`,
            width: 12, height: 30 + Math.abs(offset) * 0.5,
            background: `linear-gradient(to top, #EF4444, #F97316, #FDE68A)`,
            borderRadius: "50% 50% 0 0",
            animationDelay: `${i * 0.07}s`,
            opacity: 0.9
          }} />
        ))}
      </div>
      {/* smoke */}
      <div className="smoke-el" style={{ width: 20, height: 20, background: "rgba(156,163,175,0.4)",
        borderRadius: "50%", margin: "0 auto 16px" }} />
      <div style={{ fontSize: 14, fontFamily: "'Zen Maru Gothic'", color: "#FCA5A5", fontWeight: 700 }}>
        お焚き上げ中…
      </div>
      <div style={{ fontSize: 11, color: "#6B7280", fontFamily: "'Noto Sans JP'", marginTop: 6 }}>
        感謝の気持ちと共に天へ帰ります
      </div>
    </div>
  );
}

function BurnDoneModal({ omamori, onBack }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 300,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "white", borderRadius: 24, padding: "32px 24px", width: "100%", maxWidth: 320,
        textAlign: "center", animation: "bounce-in 0.5s ease" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🕊</div>
        <div style={{ fontSize: 18, fontFamily: "'Zen Maru Gothic'", fontWeight: 700, color: "#1F2937", marginBottom: 8 }}>
          お焚き上げ完了
        </div>
        <div style={{ fontSize: 12, color: "#6B7280", fontFamily: "'Noto Sans JP'", lineHeight: 1.7, marginBottom: 20 }}>
          {omamori.talent}への感謝と共に、<br/>大切な思い出は守られています。<br/>お疲れ様でした🌸
        </div>
        <button onClick={onBack}
          style={{ width: "100%", background: "linear-gradient(90deg, #DB2777, #9333EA)",
            color: "white", border: "none", borderRadius: 12, padding: "13px",
            fontSize: 13, fontFamily: "'Zen Maru Gothic'", fontWeight: 700, cursor: "pointer" }}>
          ホームに戻る
        </button>
      </div>
    </div>
  );
}

// ── Screen: Contents ──────────────────────────────────────────
function ContentsScreen({ omamori, onBack }) {
  const [playingId, setPlayingId] = useState(null);
  const unlockedCount = omamori.contents.filter(c => !c.locked).length;

  return (
    <div style={{ minHeight: "100vh", background: omamori.gradCss, animation: "fade-in 0.4s ease", paddingBottom: 40 }}>
      <div style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${omamori.color}30`, padding: "16px 20px",
        display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 22,
          cursor: "pointer", color: omamori.colorDark, padding: "0 4px" }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontFamily: "'Zen Maru Gothic'", fontWeight: 700, color: "#1F2937" }}>
            🎁 限定コンテンツ
          </div>
          <div style={{ fontSize: 11, color: omamori.colorDark, fontFamily: "'Noto Sans JP'" }}>
            {omamori.talent} — {unlockedCount}/{omamori.contents.length}件解放済み
          </div>
        </div>
      </div>

      <div style={{ padding: "20px 16px" }}>
        {omamori.contents.map((c, i) => (
          <div key={c.id} onClick={() => !c.locked && setPlayingId(playingId === c.id ? null : c.id)}
            style={{ background: c.locked ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.9)",
              borderRadius: 18, marginBottom: 14, overflow: "hidden",
              boxShadow: c.locked ? "none" : `0 4px 20px ${omamori.color}20`,
              border: `1px solid ${c.locked ? "rgba(0,0,0,0.06)" : omamori.color + "30"}`,
              cursor: c.locked ? "default" : "pointer",
              opacity: c.locked ? 0.6 : 1,
              animation: `slide-up 0.4s ease ${i * 0.08}s both` }}>
            <div style={{ display: "flex", alignItems: "center", padding: "16px" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12,
                background: c.locked ? "#F3F4F6" : `linear-gradient(135deg, ${omamori.color}30, ${omamori.colorDark}30)`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                {c.locked ? "🔒" : c.type === "voice" ? "🎵" : "🖼"}
              </div>
              <div style={{ flex: 1, paddingLeft: 12 }}>
                <div style={{ fontSize: 14, fontFamily: "'Zen Maru Gothic'", fontWeight: 700,
                  color: c.locked ? "#9CA3AF" : "#1F2937" }}>{c.title}</div>
                {!c.locked && c.desc && (
                  <div style={{ fontSize: 11, color: "#6B7280", fontFamily: "'Noto Sans JP'", marginTop: 2 }}>{c.desc}</div>
                )}
                <div style={{ fontSize: 10, color: c.locked ? "#D1D5DB" : omamori.color,
                  fontFamily: "'Noto Sans JP'", marginTop: 3 }}>
                  {c.locked ? "運気MAXで解放" : `解放日：${c.date}`}
                </div>
              </div>
              {!c.locked && (
                <div style={{ width: 32, height: 32, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${omamori.colorDark}, ${omamori.color})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "white", fontSize: 12, flexShrink: 0 }}>
                  {playingId === c.id ? "⏸" : "▶"}
                </div>
              )}
            </div>
            {playingId === c.id && (
              <div style={{ padding: "0 16px 16px", animation: "fade-in 0.3s ease" }}>
                <div style={{ background: omamori.colorLight, borderRadius: 12, padding: "14px 16px" }}>
                  {c.type === "voice" ? (
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                        <div style={{ flex: 1, height: 4, background: `${omamori.color}40`, borderRadius: 2 }}>
                          <div style={{ width: "45%", height: "100%", background: omamori.color, borderRadius: 2 }} />
                        </div>
                        <span style={{ fontSize: 11, color: omamori.colorDark, fontFamily: "'Noto Sans JP'" }}>0:15 / 0:32</span>
                      </div>
                      <div style={{ fontSize: 12, color: "#374151", fontFamily: "'Noto Sans JP'", lineHeight: 1.7 }}>
                        🎵 再生中… <span style={{ color: omamori.colorDark, fontWeight: 700 }}>{omamori.talent}</span>からのボイスメッセージ
                      </div>
                    </div>
                  ) : (
                    <div style={{ textAlign: "center" }}>
                      <div style={{ width: "100%", height: 140, background: `linear-gradient(135deg, ${omamori.color}30, ${omamori.colorDark}30)`,
                        borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 36, marginBottom: 8 }}>
                        {omamori.emoji}
                      </div>
                      <div style={{ fontSize: 12, color: "#374151", fontFamily: "'Noto Sans JP'" }}>{c.desc}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Screen: Titles ────────────────────────────────────────────
function TitlesScreen({ omamori, onBack }) {
  const totalPct = Math.min(omamori.luckPoints / (omamori.nextThreshold === 999 ? omamori.maxPoints : omamori.nextThreshold), 1);

  return (
    <div style={{ minHeight: "100vh", background: omamori.gradCss, animation: "fade-in 0.4s ease", paddingBottom: 40 }}>
      <div style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${omamori.color}30`, padding: "16px 20px",
        display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 22,
          cursor: "pointer", color: omamori.colorDark, padding: "0 4px" }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontFamily: "'Zen Maru Gothic'", fontWeight: 700, color: "#1F2937" }}>
            👑 ファン称号
          </div>
          <div style={{ fontSize: 11, color: omamori.colorDark, fontFamily: "'Noto Sans JP'" }}>
            {omamori.talent} — 実績
          </div>
        </div>
      </div>

      <div style={{ padding: "20px 16px" }}>
        {/* current */}
        <div style={{ background: `linear-gradient(135deg, ${omamori.color}, ${omamori.colorDark})`,
          borderRadius: 20, padding: "20px", marginBottom: 20, textAlign: "center",
          boxShadow: `0 8px 24px ${omamori.color}50` }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontFamily: "'Noto Sans JP'", marginBottom: 4 }}>現在の称号</div>
          <div style={{ fontSize: 18, fontFamily: "'Zen Maru Gothic'", fontWeight: 700, color: "white" }}>
            👑 {omamori.title}
          </div>
          {omamori.nextTitle !== "---" && (
            <div style={{ marginTop: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", fontFamily: "'Noto Sans JP'" }}>次の称号まで</span>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.9)", fontFamily: "'Noto Sans JP'" }}>
                  {omamori.luckPoints} / {omamori.nextThreshold}
                </span>
              </div>
              <div style={{ height: 6, background: "rgba(255,255,255,0.2)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${totalPct * 100}%`,
                  background: "rgba(255,255,255,0.9)", borderRadius: 3, transition: "width 0.5s ease" }} />
              </div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", fontFamily: "'Noto Sans JP'", marginTop: 6 }}>
                次：{omamori.nextTitle}
              </div>
            </div>
          )}
        </div>

        {/* stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          {[
            { label: "総タップ数", value: omamori.totalTaps.toLocaleString(), unit: "回", icon: "👆" },
            { label: "フルパワー達成", value: omamori.fullPowerCount, unit: "回", icon: "⚡" },
            { label: "取得日", value: omamori.acquired, unit: "", icon: "📅" },
            { label: "運気ポイント", value: omamori.luckPoints, unit: "pt", icon: "✨" },
          ].map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.85)", borderRadius: 14,
              padding: "14px", boxShadow: `0 2px 12px ${omamori.color}10`,
              border: `1px solid ${omamori.color}20` }}>
              <div style={{ fontSize: 18, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Zen Maru Gothic'", color: omamori.colorDark }}>
                {s.value}<span style={{ fontSize: 11 }}>{s.unit}</span>
              </div>
              <div style={{ fontSize: 10, color: "#9CA3AF", fontFamily: "'Noto Sans JP'" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* title list */}
        <div style={{ fontSize: 12, fontFamily: "'Noto Sans JP'", fontWeight: 700, color: "#6B7280", marginBottom: 12 }}>
          📜 称号一覧
        </div>
        {omamori.titles.map((t, i) => (
          <div key={i} style={{ background: t.unlocked ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)",
            borderRadius: 14, padding: "14px 16px", marginBottom: 10,
            display: "flex", alignItems: "center", gap: 12,
            border: `1px solid ${t.unlocked ? omamori.color + "40" : "rgba(0,0,0,0.06)"}`,
            opacity: t.unlocked ? 1 : 0.5 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10,
              background: t.unlocked ? `linear-gradient(135deg, ${omamori.color}40, ${omamori.colorDark}40)` : "#F3F4F6",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
              {t.unlocked ? "👑" : "🔒"}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontFamily: "'Zen Maru Gothic'", fontWeight: 700,
                color: t.unlocked ? "#1F2937" : "#9CA3AF" }}>{t.name}</div>
              <div style={{ fontSize: 10, color: "#9CA3AF", fontFamily: "'Noto Sans JP'", marginTop: 2 }}>
                {t.threshold === 0 ? "初回取得で解放" : `${t.threshold}pt 達成で解放`}
              </div>
            </div>
            {t.unlocked && omamori.title === t.name && (
              <div style={{ background: `${omamori.color}20`, color: omamori.colorDark,
                fontSize: 10, fontFamily: "'Noto Sans JP'", fontWeight: 700,
                padding: "3px 8px", borderRadius: 20 }}>現在</div>
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
      borderTop: "1px solid rgba(244,114,182,0.12)",
      display: "flex", padding: "8px 0 20px" }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)}
          style={{ flex: 1, background: "none", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
            padding: "6px 0", transition: "opacity 0.2s" }}>
          <div style={{ fontSize: 20, filter: active === t.id ? "none" : "grayscale(100%) opacity(50%)" }}>
            {t.icon}
          </div>
          <div style={{ fontSize: 10, fontFamily: "'Noto Sans JP'",
            color: active === t.id ? (color || "#DB2777") : "#9CA3AF",
            fontWeight: active === t.id ? 700 : 400 }}>{t.label}</div>
          {active === t.id && (
            <div style={{ width: 4, height: 4, borderRadius: "50%",
              background: color || "#DB2777", marginTop: 1 }} />
          )}
        </button>
      ))}
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────
function App() {
  const [screen, setScreen] = useState("home"); // home | detail
  const [subScreen, setSubScreen] = useState("home"); // home | contents | titles
  const [selectedOmamori, setSelectedOmamori] = useState(null);

  const handleSelect = (o) => {
    setSelectedOmamori(o);
    setSubScreen("home");
    setScreen("detail");
  };

  const handleBack = () => {
    setScreen("home");
    setSelectedOmamori(null);
  };

  const handleContentOpen = (o) => {
    setSelectedOmamori(o);
    setSubScreen("contents");
    setScreen("detail");
  };

  // phone frame
  return (
    <div style={{ minHeight: "100vh", background: "#1a0a0f",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      {/* desktop hint */}
      <div style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)",
        background: "rgba(255,255,255,0.08)", borderRadius: 20, padding: "6px 16px",
        fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "'Noto Sans JP'", zIndex: 1000 }}>
        📱 デジタルお守り「推し守り」 Webモック v0.1
      </div>

      {/* phone frame */}
      <div style={{ width: 390, minHeight: 700, maxHeight: 844,
        background: "white", borderRadius: 44,
        boxShadow: "0 0 0 10px #1a1a1a, 0 0 0 12px #333, 0 40px 80px rgba(0,0,0,0.8)",
        overflow: "hidden", position: "relative" }}>

        {/* notch */}
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: 130, height: 28, background: "#1a1a1a", borderRadius: "0 0 20px 20px", zIndex: 1000 }} />

        {/* scrollable content */}
        <div style={{ height: 844, overflowY: "auto", overflowX: "hidden", paddingTop: 0 }}>
          {screen === "home" ? (
            <HomeScreen omamoriList={OMAMORI_LIST} onSelect={handleSelect} />
          ) : screen === "detail" && selectedOmamori ? (
            <div>
              {subScreen === "home" && (
                <DetailScreen omamori={selectedOmamori} onBack={handleBack}
                  onContentOpen={handleContentOpen} />
              )}
              {subScreen === "contents" && (
                <ContentsScreen omamori={selectedOmamori} onBack={() => setSubScreen("home")} />
              )}
              {subScreen === "titles" && (
                <TitlesScreen omamori={selectedOmamori} onBack={() => setSubScreen("home")} />
              )}
              {subScreen !== "home" && (
                <BottomNav active={subScreen} onChange={setSubScreen} color={selectedOmamori.colorDark} />
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
