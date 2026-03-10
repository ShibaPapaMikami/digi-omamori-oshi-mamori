const { useState, useEffect, useRef, useCallback } = React;

const TALENTS = [
  {
    id: 1,
    name: "後藤楽々",
    splatId: "goto_rara",
    color: "#F472B6", dark: "#DB2777", light: "#FCE7F3",
    grad: "linear-gradient(160deg,#FDF2F8,#FCE7F3,#FBCFE8)",
    emoji: "🌸",
    msg: "今日も一日、お疲れ様🌸\nいつも応援ありがとう！",
    luck: 280, max: 400,
    title: "楽々ちゃんの見習いファン",
    nextTitle: "楽々ちゃんの守り人",
    nextPt: 400,
    taps: 1280, fp: 3,
    since: "2026-01-15",
    photos: [
      "/assets/omamori/goto_rara/_93A1220.jpg",
      "/assets/omamori/goto_rara/_93A1471.jpg",
      "/assets/omamori/goto_rara/_93A1857.jpg"
    ],
    contents: [
      { id:1, type:"voice", title:"今日もお疲れ様ボイス", locked:false, date:"2月14日", desc:"バレンタイン特別ボイス💌", img:"" },
      { id:2, type:"image", title:"特別ショット", locked:false, date:"2月14日", desc:"", img:"/assets/omamori/goto_rara/_93A1471.jpg" },
      { id:3, type:"voice", title:"おやすみボイス", locked:true, date:"---", desc:"", img:"" }
    ],
    titles: [
      { name:"楽々ちゃんの新米ファン", pt:0, ok:true },
      { name:"楽々ちゃんの見習いファン", pt:200, ok:true },
      { name:"楽々ちゃんの守り人", pt:400, ok:false },
      { name:"楽々ちゃんの魂の番人", pt:800, ok:false }
    ]
  },
  {
    id: 2,
    name: "田﨑さくら",
    splatId: "tasaki_sakura",
    color: "#FB7185", dark: "#E11D48", light: "#FFF1F2",
    grad: "linear-gradient(160deg,#FFF1F2,#FFE4E6,#FECDD3)",
    emoji: "🌺",
    msg: "桜のように美しく、強く🌺\n一緒に頑張ろうね！",
    luck: 400, max: 400,
    title: "さくらさんの魂の番人",
    nextTitle: "最上位称号！",
    nextPt: 999,
    taps: 3840, fp: 9,
    since: "2025-12-01",
    photos: [
      "/assets/omamori/tasaki_sakura/_93A0115.jpg",
      "/assets/omamori/tasaki_sakura/_93A0171.jpg",
      "/assets/omamori/tasaki_sakura/_93A0817.jpg"
    ],
    contents: [
      { id:1, type:"voice", title:"春のご挨拶ボイス", locked:false, date:"3月1日", desc:"春一番のメッセージ🌸", img:"" },
      { id:2, type:"image", title:"桜咲くショット", locked:false, date:"3月1日", desc:"", img:"/assets/omamori/tasaki_sakura/_93A0171.jpg" },
      { id:3, type:"voice", title:"誕生日メッセージ", locked:false, date:"4月1日", desc:"お誕生日おめでとう🎂", img:"" }
    ],
    titles: [
      { name:"さくらさんの新米ファン", pt:0, ok:true },
      { name:"さくらさんの見習いファン", pt:200, ok:true },
      { name:"さくらさんの守り人", pt:400, ok:true },
      { name:"さくらさんの魂の番人", pt:800, ok:true }
    ]
  },
  {
    id: 3,
    name: "阿部華也子",
    splatId: "abe_kayako",
    color: "#FBBF24", dark: "#D97706", light: "#FFFBEB",
    grad: "linear-gradient(160deg,#FFFBEB,#FEF3C7,#FDE68A)",
    emoji: "🌻",
    msg: "太陽みたいに明るく照らすよ🌻\nありがとう！",
    luck: 120, max: 400,
    title: "かやこさんの見習いファン",
    nextTitle: "かやこさんの守り人",
    nextPt: 400,
    taps: 120, fp: 0,
    since: "2026-02-01",
    photos: [
      "/assets/omamori/abe_kayako/_93A1111.jpg",
      "/assets/omamori/abe_kayako/_93A1160.jpg",
      "/assets/omamori/abe_kayako/_93A1849.jpg"
    ],
    contents: [
      { id:1, type:"voice", title:"元気いっぱいボイス", locked:true, date:"---", desc:"", img:"" },
      { id:2, type:"image", title:"サンシャインショット", locked:true, date:"---", desc:"", img:"/assets/omamori/abe_kayako/_93A1160.jpg" }
    ],
    titles: [
      { name:"かやこさんの新米ファン", pt:0, ok:true },
      { name:"かやこさんの見習いファン", pt:200, ok:false },
      { name:"かやこさんの守り人", pt:400, ok:false },
      { name:"かやこさんの魂の番人", pt:800, ok:false }
    ]
  },
  {
    id: 4,
    name: "潮紗理菜",
    splatId: "ushio_sarina",
    color: "#38BDF8", dark: "#0284C7", light: "#F0F9FF",
    grad: "linear-gradient(160deg,#F0F9FF,#E0F2FE,#BAE6FD)",
    emoji: "🌊",
    msg: "波のように力強く前へ🌊\n一緒に進もう！",
    luck: 60, max: 400,
    title: "さりなさんの新米ファン",
    nextTitle: "さりなさんの見習いファン",
    nextPt: 200,
    taps: 60, fp: 0,
    since: "2026-02-20",
    photos: [
      "/assets/omamori/ushio_sarina/_93A0259.jpg",
      "/assets/omamori/ushio_sarina/_93A0451.jpg",
      "/assets/omamori/ushio_sarina/_93A0659.jpg"
    ],
    contents: [
      { id:1, type:"voice", title:"海風ボイス", locked:true, date:"---", desc:"", img:"" },
      { id:2, type:"image", title:"サマーショット", locked:true, date:"---", desc:"", img:"/assets/omamori/ushio_sarina/_93A0451.jpg" }
    ],
    titles: [
      { name:"さりなさんの新米ファン", pt:0, ok:true },
      { name:"さりなさんの見習いファン", pt:200, ok:false },
      { name:"さりなさんの守り人", pt:400, ok:false },
      { name:"さりなさんの魂の番人", pt:800, ok:false }
    ]
  },
  {
    id: 5,
    name: "林佑香",
    splatId: "hayashi_yuka",
    color: "#A78BFA", dark: "#7C3AED", light: "#F5F3FF",
    grad: "linear-gradient(160deg,#F5F3FF,#EDE9FE,#DDD6FE)",
    emoji: "🔮",
    msg: "不思議な魅力で輝き続けるよ🔮\nいつも感謝！",
    luck: 200, max: 400,
    title: "ゆかさんの見習いファン",
    nextTitle: "ゆかさんの守り人",
    nextPt: 400,
    taps: 200, fp: 1,
    since: "2026-01-20",
    photos: [
      "/assets/omamori/hayashi_yuka/_93A0098.jpg",
      "/assets/omamori/hayashi_yuka/_93A0204.jpg",
      "/assets/omamori/hayashi_yuka/_93A0513.jpg"
    ],
    contents: [
      { id:1, type:"voice", title:"神秘のボイス", locked:false, date:"2月1日", desc:"幻想的なメッセージ✨", img:"" },
      { id:2, type:"image", title:"ミスティックショット", locked:true, date:"---", desc:"", img:"/assets/omamori/hayashi_yuka/_93A0204.jpg" }
    ],
    titles: [
      { name:"ゆかさんの新米ファン", pt:0, ok:true },
      { name:"ゆかさんの見習いファン", pt:200, ok:true },
      { name:"ゆかさんの守り人", pt:400, ok:false },
      { name:"ゆかさんの魂の番人", pt:800, ok:false }
    ]
  },
  {
    id: 6,
    name: "森千晴",
    splatId: "mori_chiharu",
    color: "#34D399", dark: "#059669", light: "#ECFDF5",
    grad: "linear-gradient(160deg,#ECFDF5,#D1FAE5,#A7F3D0)",
    emoji: "🍀",
    msg: "自然体のあなたが大好き🍀\n今日もありがとう！",
    luck: 340, max: 400,
    title: "ちはるさんの見習いファン",
    nextTitle: "ちはるさんの守り人",
    nextPt: 400,
    taps: 340, fp: 2,
    since: "2026-01-10",
    photos: [
      "/assets/omamori/mori_chiharu/_S3_1569.jpg",
      "/assets/omamori/mori_chiharu/_S3_1769.jpg",
      "/assets/omamori/mori_chiharu/_S3_1978.jpg"
    ],
    contents: [
      { id:1, type:"voice", title:"森の囁きボイス", locked:false, date:"1月20日", desc:"ナチュラルなメッセージ🌿", img:"" },
      { id:2, type:"image", title:"グリーンショット", locked:false, date:"1月20日", desc:"", img:"/assets/omamori/mori_chiharu/_S3_1769.jpg" },
      { id:3, type:"voice", title:"おやすみボイス", locked:true, date:"---", desc:"", img:"" }
    ],
    titles: [
      { name:"ちはるさんの新米ファン", pt:0, ok:true },
      { name:"ちはるさんの見習いファン", pt:200, ok:true },
      { name:"ちはるさんの守り人", pt:400, ok:false },
      { name:"ちはるさんの魂の番人", pt:800, ok:false }
    ]
  },
  {
    id: 7,
    name: "皆藤愛子",
    splatId: "kaito_aiko",
    color: "#F97316", dark: "#C2410C", light: "#FFF7ED",
    grad: "linear-gradient(160deg,#FFF7ED,#FFEDD5,#FED7AA)",
    emoji: "🍊",
    msg: "元気を届けるのが私の使命🍊\nいつもありがとう！",
    luck: 80, max: 400,
    title: "愛子さんの新米ファン",
    nextTitle: "愛子さんの見習いファン",
    nextPt: 200,
    taps: 80, fp: 0,
    since: "2026-03-01",
    photos: [
      "/assets/omamori/kaito_aiko/_93A3111.jpg",
      "/assets/omamori/kaito_aiko/_S3_2429.jpg",
      "/assets/omamori/kaito_aiko/_S3_5100.jpg"
    ],
    contents: [
      { id:1, type:"voice", title:"元気爆発ボイス", locked:true, date:"---", desc:"", img:"" },
      { id:2, type:"image", title:"オレンジショット", locked:true, date:"---", desc:"", img:"/assets/omamori/kaito_aiko/_S3_2429.jpg" }
    ],
    titles: [
      { name:"愛子さんの新米ファン", pt:0, ok:true },
      { name:"愛子さんの見習いファン", pt:200, ok:false },
      { name:"愛子さんの守り人", pt:400, ok:false },
      { name:"愛子さんの魂の番人", pt:800, ok:false }
    ]
  }
];

// ── helpers ──────────────────────────────────────────────────
let pid = 0;
function useParticles() {
  const [list, setList] = useState([]);
  const spawn = useCallback((x, y) => {
    const chars = ["✨","💫","🌸","⭐","💕","🎀"];
    const items = Array.from({length:4}, () => ({
      id: ++pid,
      x: x + (Math.random()-0.5)*70,
      y: y + (Math.random()-0.5)*50,
      c: chars[Math.floor(Math.random()*chars.length)]
    }));
    setList(p => [...p, ...items]);
    setTimeout(() => setList(p => p.filter(x => !items.find(n => n.id===x.id))), 1000);
  }, []);
  return [list, spawn];
}

// ── LuckMeter ─────────────────────────────────────────────────
function LuckMeter({ luck, max, color, dark }) {
  const pct = Math.min(luck/max, 1);
  const full = pct >= 1;
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
      <div style={{fontSize:10,fontFamily:"'Zen Maru Gothic'",color:dark,fontWeight:700,letterSpacing:1}}>LUCK METER</div>
      <div style={{width:28,height:200,background:"#f0f0f0",borderRadius:14,overflow:"hidden",
        boxShadow:`0 0 0 2px ${color}40,inset 0 2px 4px rgba(0,0,0,.1)`,position:"relative"}}>
        <div style={{position:"absolute",bottom:0,left:0,right:0,
          height:`${pct*100}%`,
          background: full ? `linear-gradient(to top,${dark},${color},#FDE68A,white)` : `linear-gradient(to top,${dark},${color})`,
          borderRadius:14,
          transition:"height .5s cubic-bezier(.34,1.56,.64,1)",
          boxShadow: full ? `0 0 12px ${color}` : "none"
        }}/>
        {[.25,.5,.75].map(t=>(
          <div key={t} style={{position:"absolute",left:0,right:0,bottom:`${t*100}%`,height:1,background:"rgba(255,255,255,.6)",zIndex:1}}/>
        ))}
      </div>
      <div style={{fontSize:10,fontFamily:"'Noto Sans JP'",color:dark,fontWeight:700}}>
        {full ? "✨MAX✨" : `${luck}/${max}`}
      </div>
    </div>
  );
}

// ── OmamoriCard ───────────────────────────────────────────────
function OmamoriCard({ t, photoSrc, size=200, full=false }) {
  const s = size;
  return (
    <div style={{position:"relative",width:s,height:s*1.3,
      filter: full ? `drop-shadow(0 0 20px ${t.color})` : `drop-shadow(0 4px 16px ${t.color}50)`,
      transition:"filter .5s"}}>
      <svg width={s} height={s*1.3} viewBox="0 0 200 260" fill="none"
        style={{position:"absolute",top:0,left:0,pointerEvents:"none"}}>
        <line x1="100" y1="0" x2="100" y2="28" stroke={t.dark} strokeWidth="3" strokeLinecap="round"/>
        <ellipse cx="100" cy="12" rx="10" ry="8" fill="none" stroke={t.dark} strokeWidth="2.5"/>
        <rect x="28" y="28" width="144" height="204" rx="22" fill="white" fillOpacity="0.92"/>
        <rect x="28" y="28" width="144" height="204" rx="22" fill={t.color} fillOpacity="0.18"/>
        <rect x="28" y="28" width="144" height="204" rx="22" fill="none" stroke={t.dark} strokeWidth="2.5"/>
        <ellipse cx="100" cy="130" rx="58" ry="72" fill="none" stroke={t.dark} strokeWidth="2" strokeOpacity=".3"/>
        <ellipse cx="100" cy="130" rx="52" ry="65" fill="none" stroke={t.color} strokeWidth="1.5" strokeOpacity=".6"/>
        {[55,78,100,122,145].map((x,i)=>(
          <g key={i}>
            <circle cx={x} cy={i%2===0?50:44} r="4.5" fill={t.color} fillOpacity=".5"/>
            <circle cx={x} cy={i%2===0?50:44} r="2" fill="white" fillOpacity=".9"/>
          </g>
        ))}
        {[55,78,100,122,145].map((x,i)=>(
          <g key={i}>
            <circle cx={x} cy={i%2===0?210:216} r="4.5" fill={t.color} fillOpacity=".5"/>
            <circle cx={x} cy={i%2===0?210:216} r="2" fill="white" fillOpacity=".9"/>
          </g>
        ))}
        <path d="M72 228 Q100 220 128 228 Q100 244 72 228Z" fill={t.dark} fillOpacity=".55"/>
        <circle cx="100" cy="226" r="5.5" fill={t.dark} fillOpacity=".75"/>
        {full && <ellipse cx="100" cy="130" rx="62" ry="76" fill="none" stroke="#FDE68A" strokeWidth="2" strokeOpacity=".7" strokeDasharray="6 4"/>}
      </svg>
      <div style={{
        position:"absolute",
        left: s*(48/200), top: s*1.3*(65/260),
        width: s*(104/200), height: s*1.3*(130/260),
        borderRadius:"50%", overflow:"hidden", zIndex:2
      }}>
        {photoSrc
          ? <img src={photoSrc} alt={t.name}
              style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",display:"block"}}/>
          : <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",
              background:`linear-gradient(135deg,${t.color}30,${t.dark}30)`,fontSize:s*0.22}}>{t.emoji}</div>
        }
      </div>
    </div>
  );
}

// ── HomeScreen ────────────────────────────────────────────────
function HomeScreen({ list, onSelect }) {
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#FFF8F5,#FDE8F5,#F3E8FF)",paddingBottom:40}}>
      <div style={{background:"rgba(255,255,255,.85)",backdropFilter:"blur(12px)",
        borderBottom:"1px solid rgba(244,114,182,.15)",padding:"48px 24px 16px",
        position:"sticky",top:0,zIndex:50}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{fontSize:22,fontFamily:"'Zen Maru Gothic'",fontWeight:700,
              background:"linear-gradient(90deg,#DB2777,#9333EA)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
              ⛩ 推し守り
            </div>
            <div style={{fontSize:11,color:"#9CA3AF",fontFamily:"'Noto Sans JP'",marginTop:1}}>デジタルお守りコレクション</div>
          </div>
          <div style={{background:"linear-gradient(135deg,#FCE7F3,#EDE9FE)",borderRadius:"50%",
            width:40,height:40,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>👤</div>
        </div>
      </div>
      <div style={{padding:"20px 16px 0"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:24}}>
          {[
            {label:"所持お守り", val:list.length+"個"},
            {label:"総タップ数", val:list.reduce((a,o)=>a+o.taps,0).toLocaleString()+"回"},
            {label:"フルパワー", val:list.reduce((a,o)=>a+o.fp,0)+"回"}
          ].map((s,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,.85)",borderRadius:14,padding:"12px 8px",
              textAlign:"center",boxShadow:"0 2px 12px rgba(219,39,119,.08)",border:"1px solid rgba(244,114,182,.12)"}}>
              <div style={{fontSize:18,fontWeight:700,fontFamily:"'Zen Maru Gothic'",color:"#DB2777"}}>{s.val}</div>
              <div style={{fontSize:10,color:"#9CA3AF",fontFamily:"'Noto Sans JP'"}}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{fontSize:13,fontFamily:"'Noto Sans JP'",fontWeight:700,color:"#6B7280",marginBottom:12}}>🎀 所持中のお守り</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          {list.map((o,i)=>{
            const pct = o.luck/o.max;
            const full = pct>=1;
            return (
              <div key={o.id} onClick={()=>onSelect(o)}
                style={{background:"rgba(255,255,255,.92)",borderRadius:20,overflow:"hidden",
                  boxShadow:`0 4px 20px ${o.color}20`,border:`1px solid ${o.color}30`,
                  cursor:"pointer",transition:"transform .2s",
                  animation:`slide-up .4s ease ${i*.06}s both`}}
                onMouseEnter={e=>e.currentTarget.style.transform="translateY(-3px)"}
                onMouseLeave={e=>e.currentTarget.style.transform=""}>
                {full && (
                  <div style={{background:`linear-gradient(90deg,${o.color},${o.dark})`,
                    padding:"4px",textAlign:"center",fontSize:9,fontFamily:"'Zen Maru Gothic'",color:"white",fontWeight:700}}>
                    ✨ FULL POWER
                  </div>
                )}
                <div style={{width:"100%",aspectRatio:"1",overflow:"hidden",background:o.grad,position:"relative"}}>
                  <img src={o.photos[0]} alt={o.name}
                    style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",display:"block"}}
                    onError={e=>{ e.target.style.display="none"; }}/>
                  <div style={{position:"absolute",bottom:0,left:0,right:0,height:4,background:"#E5E7EB"}}>
                    <div style={{height:"100%",width:`${pct*100}%`,
                      background: full ? `linear-gradient(90deg,${o.dark},${o.color},#FDE68A)` : `linear-gradient(90deg,${o.dark},${o.color})`,
                      transition:"width .5s ease"}}/>
                  </div>
                </div>
                <div style={{padding:"10px 12px 12px"}}>
                  <div style={{fontSize:13,fontFamily:"'Zen Maru Gothic'",fontWeight:700,color:"#1F2937"}}>{o.name}</div>
                  <div style={{fontSize:9,color:o.dark,fontFamily:"'Noto Sans JP'",marginTop:2,
                    whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{o.title}</div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:6}}>
                    <span style={{fontSize:10,color:"#9CA3AF",fontFamily:"'Noto Sans JP'"}}>{full?"✨MAX":`${o.luck}/${o.max}`}</span>
                    <span style={{fontSize:10,color:o.dark}}>{o.emoji}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{marginTop:24,background:"linear-gradient(135deg,#DB2777,#9333EA)",
          borderRadius:18,padding:"20px 24px",textAlign:"center",cursor:"pointer",
          boxShadow:"0 6px 24px rgba(219,39,119,.3)"}}>
          <div style={{fontSize:14,fontFamily:"'Zen Maru Gothic'",fontWeight:700,color:"white",marginBottom:4}}>🛍 新しいお守りを手に入れる</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,.8)",fontFamily:"'Noto Sans JP'"}}>Xマーケットで購入 → アプリに自動追加</div>
        </div>
      </div>
    </div>
  );
}

// ── DetailScreen ──────────────────────────────────────────────
function DetailScreen({ talent: init, onBack, onContent }) {
  const [t, setT] = useState(init);
  const [particles, spawn] = useParticles();
  const [ripples, setRipples] = useState([]);
  const [showFP, setShowFP] = useState(false);
  const [showOT, setShowOT] = useState(false);
  const [burning, setBurning] = useState(false);
  const [burnt, setBurnt] = useState(false);
  const [idx, setIdx] = useState(0);
  const cd = useRef(false);
  const full = t.luck >= t.max;
  const total = t.photos.length;

  useEffect(()=>{
    if(total<=1) return;
    const timer = setInterval(()=>setIdx(i=>(i+1)%total), 3000);
    return ()=>clearInterval(timer);
  }, [total]);

  const tap = useCallback((e)=>{
    if(cd.current) return;
    cd.current = true;
    setTimeout(()=>{ cd.current=false; }, 80);
    const rid = Date.now();
    setRipples(r=>[...r,{id:rid,x:e.clientX,y:e.clientY}]);
    setTimeout(()=>setRipples(r=>r.filter(x=>x.id!==rid)), 600);
    spawn(e.clientX, e.clientY);
    const wasNotFull = t.luck < t.max;
    setT(o=>{
      const next = Math.min(o.luck+4, o.max);
      if(wasNotFull && next>=o.max) setTimeout(()=>setShowFP(true), 300);
      return {...o, luck:next, taps:o.taps+1};
    });
  }, [t.luck, t.max, spawn]);

  // 3D viewer URL
  const open3D = () => {
    const photo = t.photos[idx] || t.photos[0] || '';
    const url = `/splat_viewer.html?t=${t.splatId}&n=${encodeURIComponent(t.name)}&p=${encodeURIComponent(photo)}`;
    window.open(url, '_blank');
  };

  return (
    <div style={{minHeight:"100vh",background:t.grad,position:"relative"}}>
      {particles.map(p=>(
        <div key={p.id} className="particle" style={{left:p.x,top:p.y,position:"fixed"}}>{p.c}</div>
      ))}
      {ripples.map(r=>(
        <div key={r.id} className="tap-ripple-el" style={{
          position:"fixed",left:r.x-10,top:r.y-10,width:20,height:20,
          border:`2px solid ${t.color}`,borderRadius:"50%"}}/>
      ))}

      {/* header */}
      <div style={{background:"rgba(255,255,255,.75)",backdropFilter:"blur(12px)",
        borderBottom:`1px solid ${t.color}30`,padding:"48px 20px 16px",
        display:"flex",alignItems:"center",gap:8}}>
        <button onClick={onBack} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:t.dark}}>←</button>
        <div style={{flex:1}}>
          <div style={{fontSize:16,fontFamily:"'Zen Maru Gothic'",fontWeight:700,color:"#1F2937"}}>{t.name}</div>
          <div style={{fontSize:11,color:t.dark,fontFamily:"'Noto Sans JP'"}}>{t.title}</div>
        </div>
        {/* 3Dボタン */}
        <button onClick={open3D}
          style={{background:`linear-gradient(135deg,${t.dark},${t.color})`,border:"none",
            borderRadius:20,padding:"6px 12px",fontSize:11,fontFamily:"'Zen Maru Gothic'",
            color:"white",cursor:"pointer",fontWeight:700,boxShadow:`0 2px 8px ${t.color}60`,
            display:"flex",alignItems:"center",gap:4}}>
          🔮 3D
        </button>
        <button onClick={()=>onContent(t)}
          style={{background:`${t.color}20`,border:`1px solid ${t.color}50`,borderRadius:20,
            padding:"6px 12px",fontSize:11,fontFamily:"'Noto Sans JP'",color:t.dark,cursor:"pointer",fontWeight:700}}>
          🎁 限定
        </button>
      </div>

      <div style={{padding:"24px 20px 120px",display:"flex",gap:20,alignItems:"flex-start",justifyContent:"center"}}>
        <div onClick={tap} style={{cursor:"pointer",userSelect:"none",WebkitTapHighlightColor:"transparent",position:"relative"}}
          className={full?"full-power-animate":""}>
          <OmamoriCard t={t} photoSrc={t.photos[idx]} size={200} full={full}/>
          {full && (
            <div style={{position:"absolute",top:-14,left:"50%",transform:"translateX(-50%)",
              background:`linear-gradient(90deg,${t.dark},${t.color})`,color:"white",
              fontSize:10,fontFamily:"'Zen Maru Gothic'",fontWeight:700,
              padding:"3px 12px",borderRadius:20,whiteSpace:"nowrap",boxShadow:`0 2px 8px ${t.color}60`}}>
              ✨ FULL POWER ✨
            </div>
          )}
          {total>1 && (
            <div style={{display:"flex",justifyContent:"center",gap:4,marginTop:8}}>
              {t.photos.map((_,i)=>(
                <div key={i} style={{width:5,height:5,borderRadius:"50%",
                  background:i===idx?t.dark:`${t.color}40`,transition:"background .3s"}}/>
              ))}
            </div>
          )}
          <div style={{textAlign:"center",marginTop:6,fontSize:13,color:t.color,
            fontFamily:"'Zen Maru Gothic'",fontWeight:700,letterSpacing:2,opacity:.8}}>TAP!</div>
        </div>
        <div style={{paddingTop:20}}>
          <LuckMeter luck={t.luck} max={t.max} color={t.color} dark={t.dark}/>
        </div>
      </div>

      <div style={{position:"fixed",bottom:0,left:0,right:0,
        background:"rgba(255,255,255,.92)",backdropFilter:"blur(12px)",
        borderTop:`1px solid ${t.color}30`,padding:"12px 20px 32px"}}>
        <div style={{display:"flex",justifyContent:"space-around",marginBottom:12}}>
          {[{label:"タップ数",val:t.taps.toLocaleString()+"回"},{label:"フルパワー",val:t.fp+"回"}].map((s,i)=>(
            <div key={i} style={{textAlign:"center"}}>
              <div style={{fontSize:16,fontWeight:700,fontFamily:"'Zen Maru Gothic'",color:t.dark}}>{s.val}</div>
              <div style={{fontSize:10,color:"#9CA3AF",fontFamily:"'Noto Sans JP'"}}>{s.label}</div>
            </div>
          ))}
        </div>
        <button onClick={()=>setShowOT(true)}
          style={{width:"100%",background:"linear-gradient(90deg,#EF4444,#DC2626)",
            color:"white",border:"none",borderRadius:14,padding:"13px",
            fontSize:14,fontFamily:"'Zen Maru Gothic'",fontWeight:700,cursor:"pointer"}}>
          🔥 お焚き上げ
        </button>
      </div>

      {showFP && <FPModal t={t} onClose={()=>setShowFP(false)} onContents={()=>{setShowFP(false);onContent(t);}}/>}
      {showOT && !burnt && (
        <OTModal t={t} burning={burning}
          onConfirm={()=>{ setBurning(true); setTimeout(()=>setBurnt(true),2500); }}
          onCancel={()=>setShowOT(false)}/>
      )}
      {burnt && <BurntModal t={t} onBack={onBack}/>}
    </div>
  );
}

// ── FPModal ───────────────────────────────────────────────────
function FPModal({ t, onClose, onContents }) {
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",zIndex:200,
      display:"flex",alignItems:"center",justifyContent:"center",padding:24,backdropFilter:"blur(4px)"}}>
      <div style={{background:"white",borderRadius:24,overflow:"hidden",width:"100%",maxWidth:340,
        animation:"bounce-in .5s ease",boxShadow:`0 20px 60px ${t.color}60`}}>
        <div style={{height:140,position:"relative",overflow:"hidden"}}>
          <img src={t.photos[0]} alt={t.name}
            style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",display:"block"}}
            onError={e=>{ e.target.style.display="none"; }}/>
          <div style={{position:"absolute",inset:0,background:`linear-gradient(to top,${t.dark}CC,transparent)`}}/>
          <div style={{position:"absolute",bottom:12,left:0,right:0,textAlign:"center"}}>
            <div style={{fontSize:22,fontFamily:"'Zen Maru Gothic'",fontWeight:700,color:"white"}}>⚡ FULL POWER！</div>
          </div>
        </div>
        <div style={{padding:"16px 20px 20px"}}>
          <div style={{background:t.light,borderRadius:14,padding:"14px 16px",marginBottom:14,
            textAlign:"center",borderLeft:`3px solid ${t.color}`}}>
            <div style={{fontSize:13,fontFamily:"'Noto Sans JP'",color:"#374151",lineHeight:1.7,whiteSpace:"pre-wrap"}}>{t.msg}</div>
            <div style={{fontSize:10,color:"#9CA3AF",fontFamily:"'Noto Sans JP'",marginTop:6}}>— {t.name} より</div>
          </div>
          <button onClick={onContents}
            style={{width:"100%",background:`linear-gradient(90deg,${t.dark},${t.color})`,
              color:"white",border:"none",borderRadius:12,padding:"13px",
              fontSize:13,fontFamily:"'Zen Maru Gothic'",fontWeight:700,cursor:"pointer",marginBottom:8}}>
            🎁 限定コンテンツを見る
          </button>
          <button onClick={onClose}
            style={{width:"100%",background:"none",border:"none",color:"#9CA3AF",
              fontSize:12,fontFamily:"'Noto Sans JP'",cursor:"pointer",padding:"8px"}}>閉じる</button>
        </div>
      </div>
    </div>
  );
}

// ── OTModal ───────────────────────────────────────────────────
function OTModal({ t, burning, onConfirm, onCancel }) {
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.7)",zIndex:200,
      display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{background:"#1A0A00",borderRadius:24,overflow:"hidden",width:"100%",maxWidth:320,
        animation:"bounce-in .4s ease",border:"1px solid rgba(239,68,68,.3)"}}>
        {!burning ? (
          <div style={{padding:"28px 24px"}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:40}}>🔥</div>
              <div style={{fontSize:18,fontFamily:"'Zen Maru Gothic'",fontWeight:700,color:"#FCA5A5",marginTop:8}}>お焚き上げしますか？</div>
              <div style={{fontSize:12,color:"#6B7280",fontFamily:"'Noto Sans JP'",marginTop:6,lineHeight:1.6}}>
                {t.name}のお守りをお焚き上げします。<br/>称号・限定コンテンツは保持されます。
              </div>
            </div>
            <button onClick={onConfirm}
              style={{width:"100%",background:"linear-gradient(90deg,#EF4444,#DC2626)",color:"white",
                border:"none",borderRadius:12,padding:"13px",fontSize:13,
                fontFamily:"'Zen Maru Gothic'",fontWeight:700,cursor:"pointer",marginBottom:8}}>
              🔥 お焚き上げする
            </button>
            <button onClick={onCancel}
              style={{width:"100%",background:"none",border:"1px solid rgba(107,114,128,.3)",
                borderRadius:12,padding:"12px",fontSize:12,fontFamily:"'Noto Sans JP'",color:"#9CA3AF",cursor:"pointer"}}>
              キャンセル
            </button>
          </div>
        ) : (
          <div style={{padding:"40px 24px",textAlign:"center"}}>
            <div style={{position:"relative",display:"inline-block",marginBottom:16}}>
              <img src={t.photos[0]} alt={t.name}
                style={{width:80,height:80,borderRadius:"50%",objectFit:"cover",border:`3px solid ${t.color}`,display:"block"}}
                onError={e=>{ e.target.style.display="none"; }}/>
              {[0,-12,12,-6,6].map((off,i)=>(
                <div key={i} className="flame-el" style={{
                  position:"absolute",bottom:0,left:`calc(50% + ${off}px)`,
                  width:10,height:28,background:"linear-gradient(to top,#EF4444,#F97316,#FDE68A)",
                  borderRadius:"50% 50% 0 0",animationDelay:`${i*.07}s`}}/>
              ))}
            </div>
            <div style={{fontSize:14,fontFamily:"'Zen Maru Gothic'",color:"#FCA5A5",fontWeight:700}}>お焚き上げ中…</div>
            <div style={{fontSize:11,color:"#6B7280",fontFamily:"'Noto Sans JP'",marginTop:6}}>感謝の気持ちと共に天へ帰ります</div>
          </div>
        )}
      </div>
    </div>
  );
}

function BurntModal({ t, onBack }) {
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.8)",zIndex:300,
      display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{background:"white",borderRadius:24,padding:"32px 24px",width:"100%",maxWidth:300,
        textAlign:"center",animation:"bounce-in .5s ease"}}>
        <div style={{fontSize:48,marginBottom:12}}>🕊</div>
        <div style={{fontSize:18,fontFamily:"'Zen Maru Gothic'",fontWeight:700,color:"#1F2937",marginBottom:8}}>お焚き上げ完了</div>
        <div style={{fontSize:12,color:"#6B7280",fontFamily:"'Noto Sans JP'",lineHeight:1.7,marginBottom:20}}>
          {t.name}への感謝と共に、<br/>大切な思い出は守られています🌸
        </div>
        <button onClick={onBack}
          style={{width:"100%",background:"linear-gradient(90deg,#DB2777,#9333EA)",color:"white",
            border:"none",borderRadius:12,padding:"13px",fontSize:13,
            fontFamily:"'Zen Maru Gothic'",fontWeight:700,cursor:"pointer"}}>
          ホームに戻る
        </button>
      </div>
    </div>
  );
}

// ── ContentsScreen ────────────────────────────────────────────
function ContentsScreen({ t, onBack }) {
  const [playing, setPlaying] = useState(null);
  return (
    <div style={{minHeight:"100vh",background:t.grad,paddingBottom:40}}>
      <div style={{background:"rgba(255,255,255,.75)",backdropFilter:"blur(12px)",
        borderBottom:`1px solid ${t.color}30`,padding:"48px 20px 16px",
        display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:t.dark}}>←</button>
        <div style={{flex:1}}>
          <div style={{fontSize:16,fontFamily:"'Zen Maru Gothic'",fontWeight:700,color:"#1F2937"}}>🎁 限定コンテンツ</div>
          <div style={{fontSize:11,color:t.dark,fontFamily:"'Noto Sans JP'"}}>
            {t.name} — {t.contents.filter(c=>!c.locked).length}/{t.contents.length}件解放済み
          </div>
        </div>
      </div>
      <div style={{padding:"20px 16px"}}>
        {t.contents.map((c,i)=>(
          <div key={c.id} onClick={()=>!c.locked&&setPlaying(playing===c.id?null:c.id)}
            style={{background:c.locked?"rgba(255,255,255,.5)":"rgba(255,255,255,.92)",
              borderRadius:18,marginBottom:14,overflow:"hidden",
              boxShadow:c.locked?"none":`0 4px 20px ${t.color}20`,
              border:`1px solid ${c.locked?"rgba(0,0,0,.06)":t.color+"30"}`,
              cursor:c.locked?"default":"pointer",opacity:c.locked?.6:1,
              animation:`slide-up .4s ease ${i*.08}s both`}}>
            <div style={{display:"flex",alignItems:"center",padding:"14px 16px"}}>
              <div style={{width:44,height:44,borderRadius:12,overflow:"hidden",flexShrink:0,
                background:`${t.color}20`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                {c.locked
                  ? <span style={{fontSize:20}}>🔒</span>
                  : c.type==="image" && c.img
                    ? <img src={c.img} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}
                        onError={e=>{ e.target.style.display="none"; }}/>
                    : <span style={{fontSize:20}}>{c.type==="voice"?"🎵":"🖼"}</span>
                }
              </div>
              <div style={{flex:1,paddingLeft:12}}>
                <div style={{fontSize:14,fontFamily:"'Zen Maru Gothic'",fontWeight:700,color:c.locked?"#9CA3AF":"#1F2937"}}>{c.title}</div>
                {!c.locked&&c.desc&&<div style={{fontSize:11,color:"#6B7280",fontFamily:"'Noto Sans JP'",marginTop:2}}>{c.desc}</div>}
                <div style={{fontSize:10,color:c.locked?"#D1D5DB":t.color,fontFamily:"'Noto Sans JP'",marginTop:3}}>
                  {c.locked?"運気MAXで解放":`解放日：${c.date}`}
                </div>
              </div>
              {!c.locked && (
                <div style={{width:32,height:32,borderRadius:"50%",
                  background:`linear-gradient(135deg,${t.dark},${t.color})`,
                  display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:12}}>
                  {playing===c.id?"⏸":"▶"}
                </div>
              )}
            </div>
            {playing===c.id && (
              <div style={{padding:"0 16px 14px"}}>
                {c.type==="image"&&c.img
                  ? <img src={c.img} style={{width:"100%",borderRadius:12,objectFit:"cover",maxHeight:200,display:"block"}}
                      onError={e=>{ e.target.style.display="none"; }}/>
                  : <div style={{background:t.light,borderRadius:12,padding:"14px"}}>
                      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                        <div style={{flex:1,height:4,background:`${t.color}40`,borderRadius:2}}>
                          <div style={{width:"45%",height:"100%",background:t.color,borderRadius:2}}/>
                        </div>
                        <span style={{fontSize:11,color:t.dark,fontFamily:"'Noto Sans JP'"}}>0:15 / 0:32</span>
                      </div>
                      <div style={{fontSize:12,color:"#374151",fontFamily:"'Noto Sans JP'"}}>
                        🎵 <span style={{color:t.dark,fontWeight:700}}>{t.name}</span>からのボイスメッセージ
                      </div>
                    </div>
                }
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── TitlesScreen ──────────────────────────────────────────────
function TitlesScreen({ t, onBack }) {
  return (
    <div style={{minHeight:"100vh",background:t.grad,paddingBottom:40}}>
      <div style={{background:"rgba(255,255,255,.75)",backdropFilter:"blur(12px)",
        borderBottom:`1px solid ${t.color}30`,padding:"48px 20px 16px",
        display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:t.dark}}>←</button>
        <div>
          <div style={{fontSize:16,fontFamily:"'Zen Maru Gothic'",fontWeight:700,color:"#1F2937"}}>👑 ファン称号</div>
          <div style={{fontSize:11,color:t.dark,fontFamily:"'Noto Sans JP'"}}>{t.name}</div>
        </div>
      </div>
      <div style={{padding:"20px 16px"}}>
        <div style={{background:`linear-gradient(135deg,${t.color},${t.dark})`,borderRadius:20,overflow:"hidden",marginBottom:20,
          boxShadow:`0 8px 24px ${t.color}50`}}>
          <img src={t.photos[0]} alt={t.name}
            style={{width:"100%",height:100,objectFit:"cover",objectPosition:"center top",opacity:.4,display:"block"}}
            onError={e=>{ e.target.style.display="none"; }}/>
          <div style={{padding:"0 20px 20px",marginTop:-8}}>
            <div style={{fontSize:11,color:"rgba(255,255,255,.7)",fontFamily:"'Noto Sans JP'"}}>現在の称号</div>
            <div style={{fontSize:17,fontFamily:"'Zen Maru Gothic'",fontWeight:700,color:"white",marginTop:2}}>👑 {t.title}</div>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>
          {[
            {label:"総タップ数",val:t.taps.toLocaleString()+"回",icon:"👆"},
            {label:"フルパワー達成",val:t.fp+"回",icon:"⚡"},
            {label:"取得日",val:t.since,icon:"📅"},
            {label:"運気ポイント",val:t.luck+"pt",icon:"✨"}
          ].map((s,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,.85)",borderRadius:14,padding:"14px",
              boxShadow:`0 2px 12px ${t.color}10`,border:`1px solid ${t.color}20`}}>
              <div style={{fontSize:18,marginBottom:4}}>{s.icon}</div>
              <div style={{fontSize:16,fontWeight:700,fontFamily:"'Zen Maru Gothic'",color:t.dark}}>{s.val}</div>
              <div style={{fontSize:10,color:"#9CA3AF",fontFamily:"'Noto Sans JP'"}}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{fontSize:12,fontFamily:"'Noto Sans JP'",fontWeight:700,color:"#6B7280",marginBottom:10}}>📜 称号一覧</div>
        {t.titles.map((tt,i)=>(
          <div key={i} style={{background:tt.ok?"rgba(255,255,255,.9)":"rgba(255,255,255,.4)",
            borderRadius:14,padding:"12px 14px",marginBottom:10,
            display:"flex",alignItems:"center",gap:12,
            border:`1px solid ${tt.ok?t.color+"40":"rgba(0,0,0,.06)"}`,opacity:tt.ok?1:.5}}>
            <div style={{width:36,height:36,borderRadius:10,fontSize:16,flexShrink:0,
              background:tt.ok?`${t.color}30`:"#F3F4F6",
              display:"flex",alignItems:"center",justifyContent:"center"}}>
              {tt.ok?"👑":"🔒"}
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontFamily:"'Zen Maru Gothic'",fontWeight:700,color:tt.ok?"#1F2937":"#9CA3AF"}}>{tt.name}</div>
              <div style={{fontSize:10,color:"#9CA3AF",fontFamily:"'Noto Sans JP'",marginTop:2}}>
                {tt.pt===0?"初回取得で解放":`${tt.pt}pt達成で解放`}
              </div>
            </div>
            {tt.ok&&t.title===tt.name&&(
              <div style={{background:`${t.color}20`,color:t.dark,fontSize:10,fontFamily:"'Noto Sans JP'",fontWeight:700,padding:"3px 8px",borderRadius:20}}>現在</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── BottomNav ─────────────────────────────────────────────────
function BottomNav({ active, onChange, dark }) {
  const tabs = [{id:"home",label:"ホーム",icon:"⛩"},{id:"contents",label:"限定",icon:"🎁"},{id:"titles",label:"称号",icon:"👑"}];
  return (
    <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:100,
      background:"rgba(255,255,255,.92)",backdropFilter:"blur(16px)",
      borderTop:"1px solid rgba(244,114,182,.12)",display:"flex",padding:"8px 0 28px"}}>
      {tabs.map(tab=>(
        <button key={tab.id} onClick={()=>onChange(tab.id)}
          style={{flex:1,background:"none",border:"none",cursor:"pointer",
            display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"6px 0"}}>
          <div style={{fontSize:20,filter:active===tab.id?"none":"grayscale(100%) opacity(50%)"}}>{tab.icon}</div>
          <div style={{fontSize:10,fontFamily:"'Noto Sans JP'",
            color:active===tab.id?(dark||"#DB2777"):"#9CA3AF",
            fontWeight:active===tab.id?700:400}}>{tab.label}</div>
          {active===tab.id&&<div style={{width:4,height:4,borderRadius:"50%",background:dark||"#DB2777"}}/>}
        </button>
      ))}
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────
function App() {
  const [screen, setScreen] = useState("home");
  const [sub, setSub] = useState("home");
  const [sel, setSel] = useState(null);

  return (
    <div style={{minHeight:"100vh",background:"#1a0a0f",display:"flex",alignItems:"center",justifyContent:"center",padding:"40px 20px"}}>
      <div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",
        background:"rgba(255,255,255,.07)",borderRadius:20,padding:"5px 14px",
        fontSize:11,color:"rgba(255,255,255,.35)",fontFamily:"'Noto Sans JP'",zIndex:1000,whiteSpace:"nowrap"}}>
        📱 推し守り Webモック v0.3
      </div>
      <div style={{width:390,height:844,background:"white",borderRadius:44,position:"relative",
        boxShadow:"0 0 0 10px #111,0 0 0 12px #2a2a2a,0 40px 80px rgba(0,0,0,.8)",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",
          width:126,height:37,background:"#111",borderRadius:"0 0 18px 18px",zIndex:1000}}/>
        <div style={{height:"100%",overflowY:"auto",overflowX:"hidden"}}>
          {screen==="home" && (
            <HomeScreen list={TALENTS} onSelect={t=>{ setSel(t); setSub("home"); setScreen("detail"); }}/>
          )}
          {screen==="detail" && sel && (
            <div>
              {sub==="home" && <DetailScreen talent={sel} onBack={()=>{ setScreen("home"); setSel(null); }} onContent={t=>{ setSel(t); setSub("contents"); }}/>}
              {sub==="contents" && <ContentsScreen t={sel} onBack={()=>setSub("home")}/>}
              {sub==="titles" && <TitlesScreen t={sel} onBack={()=>setSub("home")}/>}
              {sub!=="home" && <BottomNav active={sub} onChange={setSub} dark={sel.dark}/>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
