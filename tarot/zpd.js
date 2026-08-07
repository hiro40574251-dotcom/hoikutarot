// - feature 空間 → contextVector（活動の性質）
// - polarity 空間 → presetKey（価値観の方向）
// - hue 空間 → currentCard.hue（生成段階）
// ============================================================
// ★ 統一15次元定義（Q入力・カード共通）
// 
// ※LLMへの指示の注意書き
// A1は「動作の質・安定性」のみを評価してください。運動量・意欲はA5で評価
// 例：転倒が多い→A1=-0.6（A5は別途評価）
//    高所から飛び降りる→A1=-0.4（着地不安定）、A5=+0.8（意欲旺盛）
//    スムーズに走れる→A1=+0.7
// 
// 領域A 身体・運動（5次元）
//   A1: 粗大運動の安定性   低=-1:転倒多い・ぎこちない動き     高=+1:動作が安定・着地が確実   ※運動量・意欲はA5で評価。ここは質のみ
//   A2: バランス感覚       低=-1:バランス崩れやすい 高=+1:体幹安定
//   A3: 感覚統合           低=-1:過敏/鈍麻あり      高=+1:感覚処理安定
//   A4: 協調運動（両手足） 低=-1:手足がバラバラ     高=+1:スムーズな協調
//   A5: 運動への意欲       低=-1:身体活動を避ける   高=+1:積極的に動く
//
// 領域B 認知・言語（4次元）
//   B1: 理解言語           低=-1:指示が入りにくい   高=+1:理解が早い
//   B2: 表出言語           低=-1:言葉で伝えにくい   高=+1:豊かに表現できる
//   B3: 見通し力（予測）   低=-1:次が読めない       高=+1:先を見越せる
//   B4: 模倣・学習スタイル 低=-1:真似が難しい       高=+1:見て素早く取り込む
//
// 領域C 社会・情緒（4次元）
//   C1: 感情調整           低=-1:感情爆発/フリーズ  高=+1:気持ちを落ち着けられる
//   C2: 他児との関係性     低=-1:孤立/トラブル多い  高=+1:協働・仲良く遊べる
//   C3: 大人への信頼       低=-1:援助を拒否/依存過多 高=+1:適度に頼り受け入れる
//   C4: 切り替えやすさ     低=-1:固執・こだわり強い 高=+1:柔軟に気持ちを変えられる
//
// 領域D 環境・文脈（2次元）
//   D1: 家庭との連携しやすさ 低=-1:家庭と連携困難   高=+1:家庭と連携しやすい
//   D2: クラス内の位置づけ   低=-1:孤立・浮いている 高=+1:クラスに溶け込んでいる
//
// 配列インデックス:
//   [0]=A1, [1]=A2, [2]=A3, [3]=A4, [4]=A5,
//   [5]=B1, [6]=B2, [7]=B3, [8]=B4,
//   [9]=C1, [10]=C2,[11]=C3,[12]=C4,
//   [13]=D1,[14]=D2
// ============================================================
// ====================== データ ======================
const DIM = {
  A1:0, A2:1, A3:2, A4:3, A5:4,
  B1:5, B2:6, B3:7, B4:8,
  C1:9, C2:10, C3:11, C4:12,
  D1:13, D2:14,
};
const DIM_DEFS = [
  { id:"A1", label:"粗大運動の質",   area:"身体・運動", lo:"不安定・転倒多", hi:"安定・力強い"	, color:"#5CBEAB" },
  { id:"A2", label:"バランス",   area:"身体・運動", lo:"崩れやすい",      hi:"体幹安定"	, color:"#5CBEAB" },
  { id:"A3", label:"感覚統合",   area:"身体・運動", lo:"過敏/鈍麻あり",  hi:"感覚処理安定"	, color:"#5CBEAB" },
  { id:"A4", label:"協調運動",   area:"身体・運動", lo:"手足バラバラ",    hi:"スムーズ協調"	, color:"#5CBEAB" },
  { id:"A5", label:"運動量・意欲",   area:"身体・運動", lo:"活動を避ける",    hi:"積極的に動く"	, color:"#5CBEAB" },
  { id:"B1", label:"理解言語",   area:"認知・言語", lo:"指示が入りにくい",hi:"理解が早い"	, color:"#5C8CBE" },
  { id:"B2", label:"表出言語",   area:"認知・言語", lo:"言葉で伝えにくい",hi:"豊かに表現"	, color:"#5C8CBE" },
  { id:"B3", label:"見通し力",   area:"認知・言語", lo:"次が読めない",     hi:"先を見越せる"	, color:"#5C8CBE" },
  { id:"B4", label:"模倣学習",   area:"認知・言語", lo:"真似が難しい",     hi:"素早く取り込む"	, color:"#5C8CBE" },
  { id:"C1", label:"感情調整",   area:"社会・情緒", lo:"爆発/フリーズ",   hi:"気持ち安定"	, color:"#BE5C8C" },
  { id:"C2", label:"他児関係",   area:"社会・情緒", lo:"孤立/トラブル",   hi:"協働・仲良く"	, color:"#BE5C8C" },
  { id:"C3", label:"大人信頼",   area:"社会・情緒", lo:"拒否/依存過多",   hi:"適度に頼れる"	, color:"#BE5C8C" },
  { id:"C4", label:"切り替え",   area:"社会・情緒", lo:"固執・こだわり",  hi:"柔軟に変えられる"	, color:"#BE5C8C" },
  { id:"D1", label:"家庭連携",   area:"環境・文脈", lo:"連携困難",        hi:"連携しやすい"	, color:"#BE9E5C" },
  { id:"D2", label:"クラス位置", area:"環境・文脈", lo:"孤立・浮いている",hi:"溶け込んでいる"	, color:"#BE9E5C" },
];
const ZDIM_LABELS = [ // 逆引きで使用
  "A1粗大運動","A2バランス","A3感覚統合","A4協調運動","A5運動意欲",
  "B1理解言語","B2表出言語","B3見通し力","B4模倣学習",
  "C1感情調整","C2他児関係","C3大人信頼","C4切り替え",
  "D1家庭連携","D2クラス位置",
];
const ZDIM_COLOR = [ // 逆引きで使用
  "#8EC4A0","#8EC4A0","#8EC4A0","#8EC4A0","#8EC4A0",
  "#7B9FBF","#7B9FBF","#7B9FBF","#7B9FBF",
  "#C87B9F","#C87B9F","#C87B9F","#C87B9F",
  "#C4A850","#C4A850",
];
const AREA_ORDER = ["身体・運動","認知・言語","社会・情緒","環境・文脈"];
const AREA_COLOR = {
  "身体・運動": "#5CBEAB",
  "認知・言語": "#5C8CBE",
  "社会・情緒": "#BE5C8C",
  "環境・文脈": "#BE9E5C",
};

// ============================================================
// ブリッジ行列 v2
// 活動15次元 → ZPD15次元 への影響係数
// 活動軸: [主体性,探索性,協同性,表現性,身体性,計画性,柔軟性,安全性,素材依存,時間,安定性,刺激性,葛藤性,達成感,繋がり性]
// ZPD軸:  [A1粗大,A2バランス,A3感覚,A4協調,A5意欲,B1理解,B2表出,B3見通,B4模倣,C1感情,C2他児,C3大人,C4切替,D1家庭,D2クラス]
// ============================================================
const BRIDGE = [
  [0,0,0,0,0.7,  0,0.2,0,0,  0.1,0,0,0.3,  0,0],    // 主体性
  [0,0,0.4,0,0.5, 0,0,0.2,0.3, 0,0,0,0,  0,0],        // 探索性
  [0,0,0,0,0,  0,0.3,0,0,  0,0.7,0.2,0,  0,0.5],      // 協同性
  [0,0,0,0.4,0,  0,0.7,0,0.3, 0.2,0,0,0,  0,0],       // 表現性
  [0.6,0.5,0,0.4,0.2, 0,0,0,0,  0,0,0,0,  0,0],       // 身体性
  [0,0,0,0,0,  0.3,0,0.7,0,  0,0,0,0.5,  0,0],        // 計画性
  [0,0,0,0,0,  0,0,0.3,0,  0.2,0,0,0.6,  0,0],        // 柔軟性
  [0,0,0.2,0,0,  0,0,0,0,  0.3,0,0.5,0,  0,0],        // 安全性
  [0,0,0.6,0.5,0, 0,0,0,0.3, 0,0,0,0,  0,0],          // 素材依存
  [0,0,0,0,0,  0,0,0.5,0,  0,0,0,0.3,  0,0],          // 時間
  [0,0,0.3,0,0,  0,0,0,0,  0.5,0,0.2,0,  0,0],        // 安定性
  [0.1,0,0.6,0,0.3, 0,0,0,0,  0,0,0,0,  0,0],         // 刺激性
  [0,0,0,0,0,  0,0.2,0,0,  0.6,0.4,0,0,  0,0],        // 葛藤性
  [0,0,0,0,0.4,  0,0.2,0,0,  0.2,0,0,0.2, 0,0],       // 達成感
  [0,0,0,0,0,  0,0,0,0,  0,0.6,0.3,0,  0,0.6],        // 繋がり性
];

function actToZPD(actVec) {
  const zpd = new Array(15).fill(0);
  for (let a=0; a<15; a++)
    for (let z=0; z<15; z++)
      zpd[z] += actVec[a] * BRIDGE[a][z];
  const max = Math.max(...zpd);
  return zpd.map(v => max>0 ? v/max : 0);
}

// ZPD→活動変換（転置行列・clamp付き）
// function zpdToAct(qVec) {
//   const act = new Array(15).fill(0);
//   for (let a=0; a<15; a++)
//     for (let z=0; z<15; z++)
//       act[a] += qVec[z] * BRIDGE[a][z];
//   const clamped = act.map(v=>Math.max(0,v));
//   const max = Math.max(...clamped);
//   if (max < 1e-9) return new Array(15).fill(1/15); // フォールバック
//   return clamped.map(v=>v/max);
// }
// ↓書き換え
function zpdToAct(qVec) {
  const act = new Array(15);
  // .fill(0) が動かない古いFirefoxのために、ループで0初期化
  for (let i = 0; i < 15; i++) {
    act[i] = 0;
  }

  for (let a = 0; a < 15; a++) {
    for (let z = 0; z < 15; z++) {
      act[a] += qVec[z] * BRIDGE[a][z];
    }
  }

  // 2. アロー関数 (v => ...) を通常の function に書き換え
  const clamped = act.map(function(v) {
    return Math.max(0, v);
  });

  // 3. スプレッド構文を apply に書き換え（これで完璧です！）
  const max = Math.max.apply(null, clamped);

  // 4. 元のフォールバック条件（max < 1e-9）を正しい位置に戻す
  if (max < 1e-9) {
    let fallback = new Array(15);
    for (let j = 0; j < 15; j++) {
      fallback[j] = 1 / 15;
    }
    return fallback;
  }

  // 5. 通常の計算結果を返す（アロー関数を解消）
  return clamped.map(function(v) {
    return v / max;
  });
}
// deficit版（マイナス次元のみを変換）
function zpdDeficitToAct(qVec) {
  return zpdToAct(qVec.map(v=>Math.max(0,-v)));
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ★ グラデーション罫線
// HTMLの途中の例
// <span id="grkeisen"></span>
// <script>
// document.getElementById("grkeisen").innerHTML = grkei
// </script>
const grk1 = '<hr style="background-color:#';
const grk2 = '; border:none; box-shadow:1px 0px 9px 5px #';
const grkei = grk1+'f56342'+grk2+'f56342;">'+grk1+'f5ad42'+grk2+'f5ad42;">'+grk1+'f5ce42'+grk2+'f5ce42;">'+grk1+'e9f542'+grk2+'e9f542;">'+grk1+'b3f542'+grk2+'b3f542;">'+grk1+'78f542'+grk2+'78f542;">'+grk1+'42f569'+grk2+'42f569;">';
// ============================================================
// 44象徴カードDB（統一15次元）
// vec: [A1,A2,A3,A4,A5, B1,B2,B3,B4, C1,C2,C3,C4, D1,D2]
//
// 設計方針:
//   身体領域: A1粗大・A2バランス・A4協調 が運動系カード核心
//             A3感覚統合 は養護・安らぎ系で高値
//             A5運動意欲 は探索・遊び系で高値
//   認知領域: B3見通し が構造・循環系で高値
//             B4模倣   が真似っこ・物語系で高値
//             B1/B2言語 が対話・声・物語系で高値
//   情緒領域: C1感情調整・C3大人信頼 が養護・安らぎ系で高値
//             C2他児関係 が遊び・祝祭・繋がり系で高値
//             C4切替     が構造・待つこと系で高値
//   環境領域: D1家庭連携 は保育者-家庭協働カードで高値
//             D2クラス位置 は祝祭・調和系で高値
// ============================================================
const CARDS = [
  // ──────────────────────────────────────────────────────
  // 0〜9: 基盤・プロセス群
  // ──────────────────────────────────────────────────────
  {
    id: 0, name: "探索", emoji: "🌀",
    desc: "未知へ踏み出す・好奇心の原点",
    //       A1   A2   A3   A4   A5   B1   B2   B3   B4   C1   C2   C3   C4   D1   D2
    vec: [ 0.5, 0.3,-0.2, 0.2, 0.9, 0.1, 0.2,-0.3, 0.4, 0.2, 0.3, 0.2, 0.3, 0.1, 0.3],
    vtokucho: "A5運動意欲MAX。B3見通しは低め（とにかく試みる）。C4切替はやや可能。"
  },
  {
    id: 1, name: "はじまり", emoji: "🌱",
    desc: "新しい活動・関係・場の出発点",
    vec: [ 0.3, 0.2,-0.3, 0.1, 0.6, 0.3, 0.2,-0.4, 0.3,-0.1, 0.2, 0.4,-0.2, 0.3, 0.1],
    vtokucho: "意欲あるが見通し低い。大人信頼がやや支え。"
  },
  {
    id: 2, name: "見守り", emoji: "👁️",
    desc: "距離をおいた温かい観察・待つ援助",
    vec: [ 0.1, 0.2, 0.5, 0.2, 0.2, 0.4, 0.3, 0.5, 0.2, 0.7, 0.3, 0.8, 0.5, 0.5, 0.4],
    vtokucho: "感情調整・大人信頼高。感覚統合も安定。援助が届く状態。"
  },
  {
    id: 3, name: "養護", emoji: "🤱",
    desc: "基本的なケア・安全基地としての関係",
    vec: [ 0.1, 0.1, 0.9, 0.1, 0.1, 0.3, 0.2, 0.2, 0.1, 0.9, 0.2, 0.9, 0.3, 0.6, 0.3],
    vtokucho: "感覚統合・感情調整・大人信頼 最高値群。"
  },
  {
    id: 4, name: "構造", emoji: "🏛️",
    desc: "ルール・見通し・枠組みの安定",
    vec: [ 0.3, 0.3, 0.5, 0.3, 0.2, 0.7, 0.3, 0.9, 0.3, 0.5, 0.3, 0.5, 0.8, 0.5, 0.5],
    vtokucho: "B3見通し・C4切替 最高値。感覚統合も安定。ルーティンの力。"
  },
  {
    id: 5, name: "対話", emoji: "💬",
    desc: "言葉のやりとり・共同注意・理解し合う",
    vec: [ 0.1, 0.1, 0.3, 0.2, 0.2, 0.8, 0.8, 0.5, 0.5, 0.4, 0.6, 0.7, 0.4, 0.5, 0.6],
    vtokucho: "B1理解・B2表出言語 高。C3大人信頼・C2他児関係も高。"
  },
  {
    id: 6, name: "選択", emoji: "⚖️",
    desc: "自分で決める・意思決定の経験",
    vec: [ 0.1, 0.1, 0.2, 0.1, 0.5, 0.5, 0.6, 0.6, 0.2, 0.4, 0.3, 0.3, 0.5, 0.2, 0.3],
    vtokucho: "A5意欲・B3見通・B2表出・C4切替が中〜高。主体性。"
  },
  {
    id: 7, name: "運動", emoji: "🏃",
    desc: "身体を動かす・全身を使う活動",
    vec: [ 0.9, 0.6, 0.3, 0.7, 0.9, 0.1, 0.1, 0.1, 0.7, 0.3, 0.4, 0.2, 0.2, 0.2, 0.4],
    vtokucho: "A1粗大・A5意欲 最高値。A4協調・B4模倣も高。スキップ等の核心。"
  },
  {
    id: 8, name: "バランス", emoji: "🎚️",
    desc: "調整・中庸・両方を受け入れる",
    vec: [ 0.6, 0.9, 0.7, 0.6, 0.4, 0.5, 0.4, 0.5, 0.4, 0.7, 0.5, 0.6, 0.7, 0.4, 0.5],
    vtokucho: "A2バランス 最高値。全次元が中〜高位の統合状態。"
  },
  {
    id: 9, name: "省察", emoji: "🔍",
    desc: "立ち止まって振り返る・内省",
    vec: [-0.1, 0.1, 0.4, 0.1, 0.1, 0.5, 0.5, 0.5, 0.1, 0.6, 0.2, 0.4, 0.5, 0.4, 0.3],
    vtokucho: "B3見通・感情調整・切替が中〜高。内的確認の作業。"
  },
  // ──────────────────────────────────────────────────────
  // 10〜21: 発達プロセス群
  // ──────────────────────────────────────────────────────
  {
    id: 10, name: "循環", emoji: "🔄",
    desc: "繰り返し・習慣・くり返しの中の成長",
    vec: [ 0.4, 0.4, 0.5, 0.5, 0.4, 0.5, 0.3, 0.7, 0.8, 0.5, 0.3, 0.4, 0.6, 0.4, 0.4],
    vtokucho: "B3見通・B4模倣・C4切替が高。ルーティン学習。"
  },
  {
    id: 11, name: "たくましさ", emoji: "💪",
    desc: "困難に向き合う力・レジリエンス",
    vec: [ 0.7, 0.5,-0.2, 0.5, 0.8, 0.3, 0.3, 0.3, 0.4, 0.3, 0.4, 0.3, 0.3, 0.3, 0.4],
    vtokucho: "A1粗大・A5意欲高。A3感覚はやや低め（感覚的難しさを押しのける）。"
  },
  {
    id: 12, name: "待つこと", emoji: "⏳",
    desc: "衝動を抑える・順番・タイミングを知る",
    vec: [ 0.1, 0.2, 0.3, 0.2, 0.1, 0.6, 0.3, 0.7, 0.3, 0.7, 0.5, 0.5, 0.9, 0.4, 0.5],
    vtokucho: "C4切替 最高値。C1感情調整・B3見通も高。衝動制御の象徴。"
  },
  {
    id: 13, name: "変容", emoji: "🦋",
    desc: "質的な変化・できなかったことができる瞬間",
    vec: [ 0.5, 0.4, 0.4, 0.5, 0.6, 0.5, 0.5, 0.5, 0.6, 0.5, 0.5, 0.5, 0.7, 0.4, 0.5],
    vtokucho: "全次元が中〜高位でバランス。C4切替が最高。ZPDを越えた瞬間。"
  },
  {
    id: 14, name: "調和", emoji: "🎵",
    desc: "個と集団・活動と休息のバランス",
    vec: [ 0.3, 0.4, 0.7, 0.3, 0.3, 0.5, 0.5, 0.5, 0.4, 0.8, 0.8, 0.6, 0.6, 0.5, 0.8],
    vtokucho: "C1感情調整・C2他児関係・D2クラス高。集団の中での調和。"
  },
  {
    id: 15, name: "素材", emoji: "🧱",
    desc: "物・道具・触れること・操作の喜び",
    vec: [ 0.2, 0.3, 0.7, 0.6, 0.5, 0.2, 0.2, 0.2, 0.5, 0.3, 0.2, 0.2, 0.3, 0.2, 0.3],
    vtokucho: "A3感覚統合・A4協調高。物的環境の有効性。"
  },
  {
    id: 16, name: "葛藤", emoji: "⚡",
    desc: "ぶつかり・矛盾・内なる対立",
    vec: [ 0.2, 0.1,-0.7, 0.1, 0.4,-0.3,-0.2,-0.4, 0.2,-0.8,-0.3,-0.2,-0.8,-0.2,-0.3],
    vtokucho: "C1感情調整・C4切替 最低値。A3感覚も不安定。壁の状態。"
  },
  {
    id: 17, name: "慰め", emoji: "🫂",
    desc: "悲しみに寄り添う・感情の受容",
    vec: [ 0.1, 0.1, 0.7, 0.1, 0.1, 0.3, 0.3, 0.2, 0.1, 0.9, 0.3, 0.9, 0.3, 0.6, 0.3],
    vtokucho: "C1感情調整・C3大人信頼 最高値。安全基地の再確立。"
  },
  {
    id: 18, name: "物語", emoji: "📖",
    desc: "語る・聞く・イメージの世界",
    vec: [ 0.1, 0.1, 0.3, 0.2, 0.2, 0.8, 0.8, 0.6, 0.7, 0.4, 0.5, 0.5, 0.4, 0.4, 0.5],
    vtokucho: "B1理解・B2表出・B4模倣高。言語的足場の象徴。"
  },
  {
    id: 19, name: "創造的自由", emoji: "🎨",
    desc: "決まりのない表現・自分だけの世界",
    vec: [ 0.3, 0.3, 0.3, 0.5, 0.8, 0.3, 0.7, 0.1, 0.2, 0.5, 0.4, 0.3, 0.5, 0.2, 0.4],
    vtokucho: "A5意欲・B2表出高。B3見通低め（自由に流れる）。"
  },
  {
    id: 20, name: "収集", emoji: "🪣",
    desc: "集める・並べる・分類する",
    vec: [ 0.1, 0.2, 0.5, 0.6, 0.4, 0.3, 0.2, 0.4, 0.3, 0.4, 0.2, 0.3, 0.4, 0.2, 0.3],
    vtokucho: "A4協調・A3感覚統合高。感覚探索・整理への没頭。"
  },
  {
    id: 21, name: "祝祭", emoji: "🎉",
    desc: "達成・喜び・みんなで分かち合う",
    vec: [ 0.5, 0.4, 0.5, 0.4, 0.7, 0.5, 0.6, 0.4, 0.4, 0.7, 0.9, 0.6, 0.5, 0.5, 0.9],
    vtokucho: "C2他児関係・D2クラス最高値。達成と共有の象徴。"
  },
  // ──────────────────────────────────────────────────────
  // 22〜31: 活動・関わり群
  // ──────────────────────────────────────────────────────
  {
    id: 22, name: "遊び", emoji: "🎮",
    desc: "自発的・全力・没入する時間",
    vec: [ 0.7, 0.5, 0.4, 0.6, 0.9, 0.3, 0.4, 0.2, 0.5, 0.5, 0.8, 0.4, 0.3, 0.3, 0.7],
    vtokucho: "A1粗大・A5意欲・C2他児高。発達の自然な文脈。"
  },
  {
    id: 23, name: "学び", emoji: "📚",
    desc: "知りたい・わかった・できた",
    vec: [ 0.2, 0.3, 0.3, 0.3, 0.6, 0.7, 0.5, 0.7, 0.8, 0.4, 0.4, 0.5, 0.5, 0.4, 0.5],
     vtokucho: "B1理解・B3見通・B4模倣・A5意欲が高バランス。"
  },
  {
    id: 24, name: "身体", emoji: "🤸",
    desc: "からだ全体・感じること・動くこと",
    vec: [ 0.9, 0.8, 0.9, 0.8, 0.7, 0.2, 0.1, 0.2, 0.5, 0.4, 0.3, 0.2, 0.3, 0.2, 0.3],
    vtokucho: "身体4次元が全て高極。A5意欲も高。身体発達の総体。"
  },
  {
    id: 25, name: "響き", emoji: "🔔",
    desc: "音・リズム・声に反応する・感じる",
    vec: [ 0.3, 0.3, 0.8, 0.3, 0.4, 0.5, 0.5, 0.4, 0.7, 0.5, 0.4, 0.5, 0.4, 0.4, 0.5],
    vtokucho: "A3感覚統合・B4模倣高。音的足場の有効性。"
  },
  {
    id: 26, name: "手", emoji: "🖐️",
    desc: "触れる・作る・渡す・つなぐ",
    vec: [ 0.2, 0.3, 0.6, 0.8, 0.4, 0.3, 0.4, 0.3, 0.6, 0.4, 0.4, 0.5, 0.3, 0.4, 0.4],
    vtokucho: "A4協調運動 最高値。A3感覚統合・B4模倣も高。"
  },
  {
    id: 27, name: "声", emoji: "🗣️",
    desc: "言葉・表現・伝えたい気持ち",
    vec: [ 0.1, 0.1, 0.2, 0.2, 0.2, 0.7, 0.9, 0.4, 0.4, 0.4, 0.5, 0.7, 0.3, 0.4, 0.5],
    vtokucho: "B2表出言語 最高値。B1理解・C3大人信頼も高。援助要請。"
  },
  {
    id: 28, name: "繋がり", emoji: "🔗",
    desc: "人と人・場と人・過去と今",
    vec: [ 0.2, 0.2, 0.4, 0.3, 0.3, 0.5, 0.5, 0.5, 0.4, 0.5, 0.8, 0.8, 0.5, 0.7, 0.8],
    vtokucho: "C2他児・C3大人・D1家庭・D2クラス高。関係性の網。"
  },
  {
    id: 29, name: "小さな勇気", emoji: "🌟",
    desc: "一歩踏み出す・怖いけどやってみる",
    vec: [ 0.4, 0.3,-0.3, 0.3, 0.8,-0.1, 0.2,-0.2, 0.3,-0.2, 0.3, 0.5, 0.2, 0.4, 0.3],
    vtokucho: "A5意欲最高値。感覚・感情は不安定でも踏み出す芽生え。"
  },
  {
    id: 30, name: "安らぎ", emoji: "😴",
    desc: "休む・ほっとする・充電する",
    vec: [ 0.1, 0.2, 0.9, 0.1, 0.1, 0.3, 0.2, 0.3, 0.1, 0.9, 0.2, 0.8, 0.4, 0.5, 0.3],
    vtokucho: "A3感覚統合・C1感情調整・C3大人信頼高。ZPD前の回復。"
  },
  {
    id: 31, name: "真似っこ", emoji: "🙈",
    desc: "モデルを見て・やってみる",
    vec: [ 0.6, 0.5, 0.4, 0.7, 0.7, 0.4, 0.3, 0.4, 0.9, 0.3, 0.7, 0.5, 0.4, 0.4, 0.6],
    vtokucho: "B4模倣 最高値。A4協調・A5意欲・A1粗大も高。足場かけの核心。"
  },
  // ──────────────────────────────────────────────────────
  // 32〜43: 情緒・成長・自然群
  // ──────────────────────────────────────────────────────
  {
    id: 32, name: "温かさ", emoji: "🔥",
    desc: "受け入れられる・愛される確信",
    vec: [ 0.1, 0.1, 0.6, 0.1, 0.1, 0.2, 0.3, 0.2, 0.1, 0.9, 0.5, 0.9, 0.4, 0.7, 0.5],
    vtokucho: "C1感情調整・C3大人信頼 最高値。養護的関係の基盤。"
  },
  {
    id: 33, name: "笑顔", emoji: "😊",
    desc: "喜び・関係の肯定・感情の表出",
    vec: [ 0.3, 0.2, 0.5, 0.2, 0.5, 0.4, 0.5, 0.3, 0.4, 0.8, 0.7, 0.7, 0.5, 0.5, 0.7],
    vtokucho: "C1感情・C2他児・C3大人・D2クラス高。関係性の好循環。"
  },
  {
    id: 34, name: "共鳴", emoji: "🎶",
    desc: "気持ちが通じ合う・一緒に感じる",
    vec: [ 0.2, 0.2, 0.6, 0.3, 0.3, 0.5, 0.5, 0.4, 0.6, 0.8, 0.7, 0.8, 0.5, 0.5, 0.7],
    vtokucho: "C1感情調整・C3大人信頼高。B4模倣・D2クラスも高。"
  },
  {
    id: 35, name: "思いやり", emoji: "💝",
    desc: "相手の気持ちを想像する・やさしくする",
    vec: [ 0.1, 0.1, 0.3, 0.2, 0.2, 0.5, 0.6, 0.4, 0.4, 0.5, 0.9, 0.6, 0.5, 0.4, 0.7],
    vtokucho: "C2他児関係 最高値。B2表出・C3大人・D2クラスも高。"
  },
  {
    id: 36, name: "思い", emoji: "💭",
    desc: "内なる気持ち・願い・こだわり",
    vec: [ 0.1, 0.1,-0.2, 0.1, 0.5, 0.2, 0.6, 0.2, 0.1, 0.2, 0.2, 0.3,-0.3, 0.2, 0.2],
    vtokucho: "B2表出・A5意欲が高。C4切替はやや低め（こだわりの純粋な状態）。"
  },
  {
    id: 37, name: "育ち", emoji: "🌿",
    desc: "ゆっくりと・確かに・変化していく",
    vec: [ 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
    vtokucho: "全次元が均等に+0.5。全方位的な発達の象徴。"
  },
  {
    id: 38, name: "種", emoji: "🌰",
    desc: "可能性・まだ見えない力・これから",
    vec: [-0.1,-0.1, 0.2,-0.1, 0.4,-0.2, 0.1,-0.3, 0.2, 0.1, 0.1, 0.2,-0.1, 0.2, 0.2],
    vtokucho: "全体的に低〜中値。A5意欲のみ中高。まだ顕在化していない。"
  },
  {
    id: 39, name: "意欲", emoji: "✨",
    desc: "やりたい・もっとやりたい・主体的に動く",
    vec: [ 0.5, 0.3, 0.2, 0.4, 0.9, 0.4, 0.6, 0.4, 0.5, 0.3, 0.4, 0.4, 0.4, 0.3, 0.4],
    vtokucho: "A5運動意欲 最高値。B2表出・A1粗大も高。内発的動機。"
  },
  {
    id: 40, name: "風", emoji: "💨",
    desc: "変化・流れ・刺激・切り替えのきっかけ",
    vec: [ 0.4, 0.3,-0.4, 0.3, 0.6,-0.3, 0.3,-0.4, 0.4,-0.3, 0.3, 0.2,-0.5, 0.2, 0.3],
    vtokucho: "A5意欲・B4模倣が高。B3見通・C4切替・C1感情が不安定。変化の両義性。"
  },
  {
    id: 41, name: "根", emoji: "🌳",
    desc: "安定した基盤・揺るぎない土台",
    vec: [ 0.5, 0.6, 0.9, 0.5, 0.3, 0.6, 0.4, 0.7, 0.4, 0.9, 0.5, 0.9, 0.7, 0.7, 0.6],
    vtokucho: "A3感覚統合・C1感情・C3大人信頼 最高値。ZPDの土台。"
  },
  {
    id: 42, name: "雨", emoji: "🌧️",
    desc: "しみわたる・時間のかかる変化・涙も養分",
    vec: [ 0.2, 0.2, 0.5, 0.2, 0.2, 0.3, 0.3, 0.3, 0.2, 0.5, 0.3, 0.5, 0.3, 0.4, 0.3],
    vtokucho: "全体的に低〜中値。C1感情・C3大人・A3感覚が中程度。ゆっくりな浸透。"
  },
  {
    id: 43, name: "実り", emoji: "🍎",
    desc: "達成・結実・努力が形になる",
    vec: [ 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7],
    vtokucho: "全次元が高位。ZPDを越えた達成・次の発達段階への移行。"
  },
];

function makeReversedMeaning(name) {
  const map = {
    "探索":"迷い・踏み出せない", "はじまり":"出発の躊躇",
    "見守り":"過干渉・放置", "養護":"依存・拒絶",
    "構造":"混乱・見通しのなさ", "対話":"すれ違い・孤独",
    "選択":"決められない・流される", "運動":"身体の困難",
    "バランス":"不安定・偏り", "省察":"気づけない",
    "循環":"繰り返しの苦しさ", "たくましさ":"くじけそう",
    "待つこと":"衝動・我慢できない", "変容":"変われない・固執",
    "調和":"不和・浮いている", "素材":"感覚の困難",
    "葛藤":"（逆）抑圧・麻痺", "慰め":"拒絶・孤立",
    "物語":"語れない・伝わらない", "創造的自由":"萎縮・枠への囚われ",
    "収集":"執着・散漫", "祝祭":"疎外感・参加できない",
    "遊び":"遊べない・孤独な遊び", "学び":"意欲のなさ・諦め",
    "身体":"身体感覚の混乱", "響き":"音への過敏・遮断",
    "手":"不器用・手が出せない", "声":"声が出ない・届かない",
    "繋がり":"断絶・孤立", "小さな勇気":"怖くて動けない",
    "安らぎ":"休めない・落ち着けない", "真似っこ":"真似できない・模倣の困難",
    "温かさ":"冷え・受け取れない", "笑顔":"笑えない・感情の遮断",
    "共鳴":"共鳴できない・ひとり", "思いやり":"自己中心・傷つき",
    "思い":"思いが言えない・こだわり", "育ち":"育ちの滞り",
    "種":"芽が出ない・眠り続ける可能性", "意欲":"無気力・やる気の消耗",
    "風":"嵐・方向を失う", "根":"根なし・不安定な基盤",
    "雨":"乾き・滞り", "実り":"空回り・実らない努力",
  };
  const value = map[name];
  // null または undefined の場合のみ、右辺の文字列を返します
  return (value !== null && value !== undefined) ? value : (name + "の困難");
}

// ★15次元ベクトル色分け関数　v＝コンマ区切り数値配列(15)
function vec5x5(v){
const vecugjugo = '<ul><li>領域A 身体・運動<br>('+jgnc(v[0],1)+', '+jgnc(v[1],2)+', '+jgnc(v[2],3)+', '+jgnc(v[3],4)+', '+jgnc(v[4],5)+')<br> [ <span style="font-size:25px;">' + vctg(v[0].toFixed(2)) + ' ,'+ vctg(v[1].toFixed(2)) + ' ,'+ vctg(v[2].toFixed(2)) + ' ,'+ vctg(v[3].toFixed(2)) + ' ,' + vctg(v[4].toFixed(2)) + ' </span>]</li><li>領域B 認知・言語<br>('+jgnc(v[5],6)+', '+jgnc(v[6],7)+', '+jgnc(v[7],8)+', '+jgnc(v[8],9)+')<br> [ <span style="font-size:25px;">' + vctg(v[5].toFixed(2)) + ' ,'+ vctg(v[6].toFixed(2)) + ' ,'+ vctg(v[7].toFixed(2)) + ' ,'+ vctg(v[8].toFixed(2)) + '</span> ]</li><li>領域C 社会・情緒<br>('+jgnc(v[9],10)+', '+jgnc(v[10],11)+', '+jgnc(v[11],12)+', '+jgnc(v[12],13)+')<br> [ <span style="font-size:25px;">' + vctg(v[9].toFixed(2)) + ' ,'+ vctg(v[10].toFixed(2)) + ' ,'+ vctg(v[11].toFixed(2)) + ' ,'+ vctg(v[12].toFixed(2)) + '</span> ]</li><li>領域D 環境・文脈<br>('+jgnc(v[13],14)+', '+jgnc(v[14],15)+')<br> [ <span style="font-size:25px;">' + vctg(v[13].toFixed(2)) + ' ,' + vctg(v[14].toFixed(2)) + '</span> ]</li></ul>';
return vecugjugo;
}

function vec5x5sm(v){
const vecugjugo = '<ul style="font-size:11px;"><li>領域A 身体・運動<br>('+jgnc(v[0],1)+', '+jgnc(v[1],2)+', '+jgnc(v[2],3)+', '+jgnc(v[3],4)+', '+jgnc(v[4],5)+')<br> [ <span style="font-size:25px;">' + vctg(v[0].toFixed(2)) + ' ,'+ vctg(v[1].toFixed(2)) + ' ,'+ vctg(v[2].toFixed(2)) + ' ,'+ vctg(v[3].toFixed(2)) + ' ,' + vctg(v[4].toFixed(2)) + ' </span>]</li><li>領域B 認知・言語<br>('+jgnc(v[5],6)+', '+jgnc(v[6],7)+', '+jgnc(v[7],8)+', '+jgnc(v[8],9)+')<br> [ <span style="font-size:25px;">' + vctg(v[5].toFixed(2)) + ' ,'+ vctg(v[6].toFixed(2)) + ' ,'+ vctg(v[7].toFixed(2)) + ' ,'+ vctg(v[8].toFixed(2)) + '</span> ]</li><li>領域C 社会・情緒<br>('+jgnc(v[9],10)+', '+jgnc(v[10],11)+', '+jgnc(v[11],12)+', '+jgnc(v[12],13)+')<br> [ <span style="font-size:25px;">' + vctg(v[9].toFixed(2)) + ' ,'+ vctg(v[10].toFixed(2)) + ' ,'+ vctg(v[11].toFixed(2)) + ' ,'+ vctg(v[12].toFixed(2)) + '</span> ]</li><li>領域D 環境・文脈<br>('+jgnc(v[13],14)+', '+jgnc(v[14],15)+')<br> [ <span style="font-size:25px;">' + vctg(v[13].toFixed(2)) + ' ,' + vctg(v[14].toFixed(2)) + '</span> ]</li></ul>';
return vecugjugo;
}

function jgnc(v,d){  // 数値で色分け次元名関数
const cor2="#fa1ba8"; // -1
const cor3="#fa1bd5"; // -0.9
const cor4="#fa1beb"; // -0.8
const cor5="#eb1bfa"; // -0.7
const cor6="#d11bfa"; // -0.6
const cor7="#b31bfa"; // -0.5
const cor8="#a51bfa"; // -0.4
const cor9="#961bfa"; // -0.3
const cor10="#7c1bfa"; // -0.2
const cor11="#661bfa"; // -0.1
const cor12="#271bfa"; // 0
const cor13="#1b5efa"; // 0.1
const cor14="#1b78fa"; // 0.2
const cor15="#1b9afa"; // 0.3
const cor16="#1bb0fa"; // 0.4
const cor17="#1bbffa"; // 0.5
const cor18="#1bcdfa"; // 0.6
const cor19="#1bdcfa"; // 0.7
const cor20="#1be7fa"; // 0.8
const cor21="#1beffa"; // 0.9
const cor22="#1bfafa"; // 1
const sps1='<span style="font-weight:bold;color:'; const sps2='">'; const sps3='</span>';
v=Number(v);
let tg="";let dd="";
if(v<=-1){tg=sps1+cor2+sps2}
else if(v<=-0.9){tg=sps1+cor3+sps2}
else if(v<=-0.8){tg=sps1+cor4+sps2}
else if(v<=-0.7){tg=sps1+cor5+sps2}
else if(v<=-0.6){tg=sps1+cor6+sps2}
else if(v<=-0.5){tg=sps1+cor7+sps2}
else if(v<=-0.4){tg=sps1+cor8+sps2}
else if(v<=-0.3){tg=sps1+cor9+sps2}
else if(v<=-0.2){tg=sps1+cor10+sps2}
else if(v<=-0.1){tg=sps1+cor11+sps2}
else if(v<=0){tg=sps1+cor12+sps2}
else if(v<=0.1){tg=sps1+cor13+sps2}
else if(v<=0.2){tg=sps1+cor14+sps2}
else if(v<=0.3){tg=sps1+cor15+sps2}
else if(v<=0.4){tg=sps1+cor16+sps2}
else if(v<=0.5){tg=sps1+cor17+sps2}
else if(v<=0.6){tg=sps1+cor18+sps2}
else if(v<=0.7){tg=sps1+cor19+sps2}
else if(v<=0.8){tg=sps1+cor20+sps2}
else if(v<=0.9){tg=sps1+cor21+sps2}
else if(v<=1){tg=sps1+cor22+sps2}
else {tg=sps1+'#ffffff'+sps2}
if(d===1){dd="粗大運動"}
else if(d===2){dd="バランス"}
else if(d===3){dd="感覚統合"}
else if(d===4){dd="協調運動"}
else if(d===5){dd="運動意欲"}
else if(d===6){dd="理解言語"}
else if(d===7){dd="表出言語"}
else if(d===8){dd="見通し力"}
else if(d===9){dd="模倣学習"}
else if(d===10){dd="感情調整"}
else if(d===11){dd="他児関係"}
else if(d===12){dd="大人信頼"}
else if(d===13){dd="切り替え"}
else if(d===14){dd="家庭連携"}
else if(d===15){dd="クラス位置"}
return tg+dd+sps3;
}

function vctg(v){  // 数値で色分け関数
const cr2="#fa1ba8"; // -1
const cr3="#fa1bd5"; // -0.9
const cr4="#fa1beb"; // -0.8
const cr5="#eb1bfa"; // -0.7
const cr6="#d11bfa"; // -0.6
const cr7="#b31bfa"; // -0.5
const cr8="#a51bfa"; // -0.4
const cr9="#961bfa"; // -0.3
const cr10="#7c1bfa"; // -0.2
const cr11="#661bfa"; // -0.1
const cr12="#271bfa"; // 0
const cr13="#1b5efa"; // 0.1
const cr14="#1b78fa"; // 0.2
const cr15="#1b9afa"; // 0.3
const cr16="#1bb0fa"; // 0.4
const cr17="#1bbffa"; // 0.5
const cr18="#1bcdfa"; // 0.6
const cr19="#1bdcfa"; // 0.7
const cr20="#1be7fa"; // 0.8
const cr21="#1beffa"; // 0.9
const cr22="#1bfafa"; // 1

const sps1='<span style="font-weight:bold;color:'; const sps2='">'; const sps3='</span>';
v=Number(v);
let tg="";
if(v<=-1){tg=sps1+cr2+sps2}
else if(v<=-0.9){tg=sps1+cr3+sps2}
else if(v<=-0.8){tg=sps1+cr4+sps2}
else if(v<=-0.7){tg=sps1+cr5+sps2}
else if(v<=-0.6){tg=sps1+cr6+sps2}
else if(v<=-0.5){tg=sps1+cr7+sps2}
else if(v<=-0.4){tg=sps1+cr8+sps2}
else if(v<=-0.3){tg=sps1+cr9+sps2}
else if(v<=-0.2){tg=sps1+cr10+sps2}
else if(v<=-0.1){tg=sps1+cr11+sps2}
else if(v<=0){tg=sps1+cr12+sps2}
else if(v<=0.1){tg=sps1+cr13+sps2}
else if(v<=0.2){tg=sps1+cr14+sps2}
else if(v<=0.3){tg=sps1+cr15+sps2}
else if(v<=0.4){tg=sps1+cr16+sps2}
else if(v<=0.5){tg=sps1+cr17+sps2}
else if(v<=0.6){tg=sps1+cr18+sps2}
else if(v<=0.7){tg=sps1+cr19+sps2}
else if(v<=0.8){tg=sps1+cr20+sps2}
else if(v<=0.9){tg=sps1+cr21+sps2}
else if(v<=1){tg=sps1+cr22+sps2}
else {tg=sps1+'#ffffff'+sps2}
return tg+v+sps3;
}

// ★15次元ベクトルテーブル　v＝コンマ区切り数値配列(15)
function vectable(v){
const vw = v.map(v => Math.abs(v * 150));
let vtbl = '<table border=0 style="background:black; border-collapse: collapse;border: solid 2px orange;">';
if(v[0]!==0 || v[1]!==0 || v[2]!==0 || v[3]!==0 || v[4]!==0){
vtbl += '<tr><td colspan="5" style="background:#5CBEAB">身体・運動</td></tr>';
  if(v[0]!==0){
vtbl += '<tr><td style="width:20px;background:#5CBEAB"></td><td>'+jgnc(v[0],1)+'</td>';if(v[0]<0){vtbl += '<td style="text-align:right;width:150px;"><img src="../img/graa.gif" height="10" width="'+vw[0]+'"></td><td style="width:150px;">'+ vctg(v[0].toFixed(2)) +'</td>'} else {vtbl += '<td style="width:150px;text-align:right;">'+ vctg(v[0].toFixed(2)) +'</td><td style="width:150px;"><img src="../img/graa.gif" height="10" width="'+vw[0]+'"></td>'}; vtbl += '<td style="width:10px;background:#5CBEAB"></td></tr>';
  }
  if(v[1]!==0){
vtbl += '<tr><td style="width:20px;background:#5CBEAB"></td><td>'+jgnc(v[1],2)+'</td>';if(v[1]<0){vtbl += '<td style="text-align:right;width:150px;"><img src="../img/graa.gif" height="10" width="'+vw[1]+'"></td><td style="width:150px;">'+ vctg(v[1].toFixed(2)) +'</td>'} else {vtbl += '<td style="width:150px;text-align:right;">'+ vctg(v[1].toFixed(2)) +'</td><td style="width:150px;"><img src="../img/graa.gif" height="10" width="'+vw[1]+'"></td>'}; vtbl += '<td style="width:10px;background:#5CBEAB"></td></tr>';
  }
  if(v[2]!==0){
vtbl += '<tr><td style="width:20px;background:#5CBEAB"></td><td>'+jgnc(v[2],3)+'</td>';if(v[2]<0){vtbl += '<td style="text-align:right;width:150px;"><img src="../img/graa.gif" height="10" width="'+vw[2]+'"></td><td style="width:150px;">'+ vctg(v[2].toFixed(2)) +'</td>'} else {vtbl += '<td style="width:150px;text-align:right;">'+ vctg(v[2].toFixed(2)) +'</td><td style="width:150px;"><img src="../img/graa.gif" height="10" width="'+vw[2]+'"></td>'}; vtbl += '<td style="width:10px;background:#5CBEAB"></td></tr>';
  }
  if(v[3]!==0){
vtbl += '<tr><td style="width:20px;background:#5CBEAB"></td><td>'+jgnc(v[3],4)+'</td>';if(v[3]<0){vtbl += '<td style="text-align:right;width:150px;"><img src="../img/graa.gif" height="10" width="'+vw[3]+'"></td><td style="width:150px;">'+ vctg(v[3].toFixed(2)) +'</td>'} else {vtbl += '<td style="width:150px;text-align:right;">'+ vctg(v[3].toFixed(2)) +'</td><td style="width:150px;"><img src="../img/graa.gif" height="10" width="'+vw[3]+'"></td>'}; vtbl += '<td style="width:10px;background:#5CBEAB"></td></tr>';
  }
  if(v[4]!==0){
vtbl += '<tr><td style="width:20px;background:#5CBEAB"></td><td>'+jgnc(v[4],5)+'</td>';if(v[4]<0){vtbl += '<td style="text-align:right;width:150px;"><img src="../img/graa.gif" height="10" width="'+vw[4]+'"></td><td style="width:150px;">'+ vctg(v[4].toFixed(2)) +'</td>'} else {vtbl += '<td style="width:150px;text-align:right;">'+ vctg(v[4].toFixed(2)) +'</td><td style="width:150px;"><img src="../img/graa.gif" height="10" width="'+vw[4]+'"></td>'}; vtbl += '<td style="width:10px;background:#5CBEAB"></td></tr>';
  }
vtbl += '<tr><td colspan="5" style="background:#5CBEAB;height:5px;"></td></tr>';
}

if(v[5]!==0 || v[6]!==0 || v[7]!==0 || v[8]!==0){
vtbl += '<tr><td colspan="5" style="background:#5C8CBE">認知・言語</td></tr>';
  if(v[5]!==0){
vtbl += '<tr><td style="width:20px;background:#5C8CBE"></td><td>'+jgnc(v[5],6)+'</td>';if(v[5]<0){vtbl += '<td style="text-align:right;width:150px;"><img src="../img/graa.gif" height="10" width="'+vw[5]+'"></td><td style="width:150px;">'+ vctg(v[5].toFixed(2)) +'</td>'} else {vtbl += '<td style="width:150px;text-align:right;">'+ vctg(v[5].toFixed(2)) +'</td><td style="width:150px;"><img src="../img/graa.gif" height="10" width="'+vw[5]+'"></td>'}; vtbl += '<td style="width:10px;background:#5C8CBE"></td></tr>';
  }
  if(v[6]!==0){
vtbl += '<tr><td style="width:20px;background:#5C8CBE"></td><td>'+jgnc(v[6],7)+'</td>';if(v[6]<0){vtbl += '<td style="text-align:right;width:150px;"><img src="../img/graa.gif" height="10" width="'+vw[6]+'"></td><td style="width:150px;">'+ vctg(v[6].toFixed(2)) +'</td>'} else {vtbl += '<td style="width:150px;text-align:right;">'+ vctg(v[6].toFixed(2)) +'</td><td style="width:150px;"><img src="../img/graa.gif" height="10" width="'+vw[6]+'"></td>'}; vtbl += '<td style="width:10px;background:#5C8CBE"></td></tr>';
  }
  if(v[7]!==0){
vtbl += '<tr><td style="width:20px;background:#5C8CBE"></td><td>'+jgnc(v[7],8)+'</td>';if(v[7]<0){vtbl += '<td style="text-align:right;width:150px;"><img src="../img/graa.gif" height="10" width="'+vw[7]+'"></td><td style="width:150px;">'+ vctg(v[7].toFixed(2)) +'</td>'} else {vtbl += '<td style="width:150px;text-align:right;">'+ vctg(v[7].toFixed(2)) +'</td><td style="width:150px;"><img src="../img/graa.gif" height="10" width="'+vw[7]+'"></td>'}; vtbl += '<td style="width:10px;background:#5C8CBE"></td></tr>';
  }
  if(v[8]!==0){
vtbl += '<tr><td style="width:20px;background:#5C8CBE"></td><td>'+jgnc(v[8],9)+'</td>';if(v[8]<0){vtbl += '<td style="text-align:right;width:150px;"><img src="../img/graa.gif" height="10" width="'+vw[8]+'"></td><td style="width:150px;">'+ vctg(v[8].toFixed(2)) +'</td>'} else {vtbl += '<td style="width:150px;text-align:right;">'+ vctg(v[8].toFixed(2)) +'</td><td style="width:150px;"><img src="../img/graa.gif" height="10" width="'+vw[8]+'"></td>'}; vtbl += '<td style="width:10px;background:#5C8CBE"></td></tr>';
  }
vtbl += '<tr><td colspan="5" style="background:#5C8CBE;height:5px;"></td></tr>';
}

if(v[9]!==0 || v[10]!==0 || v[11]!==0 || v[12]!==0){
vtbl += '<tr><td colspan="5" style="background:#BE5C8C">社会・情緒</td></tr>';
  if(v[9]!==0){
vtbl += '<tr><td style="width:20px;background:#BE5C8C"></td><td>'+jgnc(v[9],10)+'</td>';if(v[9]<0){vtbl += '<td style="text-align:right;width:150px;"><img src="../img/graa.gif" height="10" width="'+vw[9]+'"></td><td style="width:150px;">'+ vctg(v[9].toFixed(2)) +'</td>'} else {vtbl += '<td style="width:150px;text-align:right;">'+ vctg(v[9].toFixed(2)) +'</td><td style="width:150px;"><img src="../img/graa.gif" height="10" width="'+vw[9]+'"></td>'}; vtbl += '<td style="width:10px;background:#BE5C8C"></td></tr>';
  }
  if(v[10]!==0){
vtbl += '<tr><td style="width:20px;background:#BE5C8C"></td><td>'+jgnc(v[10],11)+'</td>';if(v[10]<0){vtbl += '<td style="text-align:right;width:150px;"><img src="../img/graa.gif" height="10" width="'+vw[10]+'"></td><td style="width:150px;">'+ vctg(v[10].toFixed(2)) +'</td>'} else {vtbl += '<td style="width:150px;text-align:right;">'+ vctg(v[10].toFixed(2)) +'</td><td style="width:150px;"><img src="../img/graa.gif" height="10" width="'+vw[10]+'"></td>'}; vtbl += '<td style="width:10px;background:#BE5C8C"></td></tr>';
  }
  if(v[11]!==0){
vtbl += '<tr><td style="width:20px;background:#BE5C8C"></td><td>'+jgnc(v[11],12)+'</td>';if(v[11]<0){vtbl += '<td style="text-align:right;width:150px;"><img src="../img/graa.gif" height="10" width="'+vw[11]+'"></td><td style="width:150px;">'+ vctg(v[11].toFixed(2)) +'</td>'} else {vtbl += '<td style="width:150px;text-align:right;">'+ vctg(v[11].toFixed(2)) +'</td><td style="width:150px;"><img src="../img/graa.gif" height="10" width="'+vw[11]+'"></td>'}; vtbl += '<td style="width:10px;background:#BE5C8C"></td></tr>';
  }
  if(v[12]!==0){
vtbl += '<tr><td style="width:20px;background:#BE5C8C"></td><td>'+jgnc(v[12],13)+'</td>';if(v[12]<0){vtbl += '<td style="text-align:right;width:150px;"><img src="../img/graa.gif" height="10" width="'+vw[12]+'"></td><td style="width:150px;">'+ vctg(v[12].toFixed(2)) +'</td>'} else {vtbl += '<td style="width:150px;text-align:right;">'+ vctg(v[12].toFixed(2)) +'</td><td style="width:150px;"><img src="../img/graa.gif" height="10" width="'+vw[12]+'"></td>'}; vtbl += '<td style="width:10px;background:#BE5C8C"></td></tr>';
  }
vtbl += '<tr><td colspan="5" style="background:#BE5C8C;height:5px;"></td></tr>';
}

if(v[13]!==0 || v[14]!==0){
vtbl += '<tr><td colspan="5" style="background:#BE9E5C">環境・文脈</td></tr>';
  if(v[13]!==0){
vtbl += '<tr><td style="width:20px;background:#BE9E5C"></td><td>'+jgnc(v[13],14)+'</td>';if(v[13]<0){vtbl += '<td style="text-align:right;width:150px;"><img src="../img/graa.gif" height="10" width="'+vw[13]+'"></td><td style="width:150px;">'+ vctg(v[13].toFixed(2)) +'</td>'} else {vtbl += '<td style="text-align:right;">'+ vctg(v[13].toFixed(2)) +'</td><td><img src="../img/graa.gif" height="10" width="'+vw[13]+'"></td>'}; vtbl += '<td style="width:10px;background:#BE9E5C"></td></tr>';
  }
  if(v[14]!==0){
vtbl += '<tr><td style="width:20px;background:#BE9E5C"></td><td>'+jgnc(v[14],15)+'</td>';if(v[14]<0){vtbl += '<td style="text-align:right;width:150px;"><img src="../img/graa.gif" height="10" width="'+vw[14]+'"></td><td style="width:150px;">'+ vctg(v[14].toFixed(2)) +'</td>'} else {vtbl += '<td style="text-align:right;">'+ vctg(v[14].toFixed(2)) +'</td><td><img src="../img/graa.gif" height="10" width="'+vw[14]+'"></td>'}; vtbl += '<td style="width:10px;background:#BE9E5C"></td></tr>';
  }
vtbl += '<tr><td colspan="5" style="background:#BE9E5C;height:5px;"></td></tr>';
}

vtbl += '<table>';

return vtbl;
}
// ■数値貼り付け欄とボタンを強制有効化にする■
function yuukoo() {
    document.getElementById('vectorInput').disabled = false; // txtbox有効
    document.getElementById('vectorInput').style.opacity = "1.0";
    document.getElementById('vectorload').disabled = false; // ボタン有効
    document.getElementById('vectorload').style.opacity = "1.0";
}

// ■■プリセット■■■■■■■■■■■■■■■■■■■■■■■■■■■┓

const PRESETS = {
'0': {cat:'運動・身体',sc:'スキップ',name:'スキップのリズム感',age:'5',des:'スキップをしようとすると、走り出してしまう。スキップのリズムを体で覚えられるよう促したい。',vec:[-0.3,-0.2,0,-0.5,0.5,0,0,0,-0.2,0,0,0,0,0,0]},
'1': {cat:'運動・身体',sc:'スキップ',name:'スキップも興味もって',age:'4',des:'スキップをすること自体に興味がなく、他の運動遊びを好む。様々な運動に挑戦する機会を増やしたい。',vec:[0,0,0,0,0.5,0,0,0,0,0,0,0,0,0,0]},
'2': {cat:'運動・身体',sc:'スキップ',name:'ケンケン不安定意欲あり',age:'4',des:'スキップをやりたがるが、ケンケンが不安定で転ぶのを少し怖がっている',vec:[-0.5,-0.4,0,-0.3,0.3,0,0,0,0,-0.2,0,0,0,0,0]},
'3': {cat:'運動・身体',sc:'スキップ',name:'協調運動苦手',age:'3',des:'手と足の動きがバラバラで、ぎこちないスキップになる。リズムに合わせて体を動かす楽しさを伝えたい。',vec:[0,0,-0.3,-0.6,0.3,0,0,0,0,0,0,0,0,0,0]},
'4': {cat:'運動・身体',sc:'スキップ',name:'スキップをやりたがる',age:'3',des:'友だちがスキップしているのを見て、自分もやりたがるが、なかなかできない。見本を見せながら一緒に練習したい。',vec:[-0.2,-0.3,0,-0.4,-0.6,0,0.2,0,0.5,0.2,0.3,0.3,0.2,0,0.2]},
'5': {cat:'運動・身体',sc:'バランス',name:'ジャンプできない',age:'3',des:'ジャンプができない。両足を一緒に上げることが難しそうで上に飛ぶことがままならない様子。そのため、ジャンプで前や後ろに進むことも難しい。手先が器用では無かったり運動能力も月齢と合っていなかったりするため、十分に見守って援助していく必要がある。',vec:[0,-0.6,0,-0.5,0,0,0,0,0,0,0,0,0,0,0]},
'6': {cat:'運動・身体',sc:'バランス',name:'スキップギャロップバランス',age:'5',des:'スキップやギャロップなどの複雑な動きでバランスを崩しやすい。着地を意識させたい。',vec:[-0.5,-0.6,0,-0.3,0,0,0,0,0,0,0,0,0,0,0]},
'7': {cat:'運動・身体',sc:'バランス',name:'バランスふらつき',age:'3',des:'一本橋や平均台を渡る際にふらつきが多く、手をつなぐことを求める。体幹の安定を促したい。',vec:[0,-0.6,0,0,0,0,0,0,0,0,0,0.3,0,0,0]},
'8': {cat:'運動・身体',sc:'バランス',name:'着地が不安定',age:'2',des:'高いところから飛び降りるのを怖がり、着地が不安定。安全な着地方法を伝えたい。',vec:[-0.5,-0.3,0,0,0,0,0,-0.3,0,0,0,0,0,0,0]},
'9': {cat:'運動・身体',sc:'バランス',name:'転倒多い',age:'2',des:'身体を動かす遊びを好むが、バランス感覚が未熟で転倒が多い。危険予測が難しい。',vec:[-0.6,-0.6,0,0,0.7,0,0,-0.6,0,0,0,0,0,0,0]},
'10': {cat:'運動・身体',sc:'バランス',name:'ケンケン不安定意欲低',age:'4',des:'片足ジャンプが不安定で、転ぶのを怖がる。両足ジャンプから段階的に練習したい。',vec:[-0.5,-0.6,0,-0.3,-0.4,0,0,-0.3,0,-0.2,0,0,0,0,0]},
'11': {cat:'運動・身体',sc:'バランス',name:'片足立ち苦手',age:'4',des:'片足立ちが苦手で、すぐに地面に足をつけてしまう。バランス遊びを通して体幹を鍛えたい。',vec:[0,-0.6,0,0,0,0,0,0,0,0,0,0,0,0,0]},
'12': {cat:'運動・身体',sc:'運動への意欲',name:'運動消極的',age:'5',des:'運動会などの行事でも、積極的に参加しようとしない。自信を持って体を動かせるよう支援したい。',vec:[0,0,0,0,-0.6,0,0,0,0,-0.3,0,0,-0.3,0,-0.2]},
'13': {cat:'運動・身体',sc:'運動への意欲',name:'運動すぐやめる',age:'3',des:'少し難しい運動に直面すると、すぐに「疲れた」と訴え、やめてしまう。粘り強さを育みたい。',vec:[-0.2,0,0,0,-0.6,0,0,0,0,-0.4,0,0,-0.5,0,0]},
'14': {cat:'運動・身体',sc:'運動への意欲',name:'運動諦め',age:'3',des:'新しい運動遊びに誘っても、「できない」とすぐに諦めてしまう。小さな成功体験を積み重ねさせたい。',vec:[0,0,0,0,-0.6,0,0,-0.3,-0.4,-0.3,0,0,-0.4,0,0]},
'15': {cat:'運動・身体',sc:'運動への意欲',name:'運動より室内好む',age:'2',des:'身体を動かす遊びよりも、室内での静かな遊びを好む。外遊びへの興味を引き出したい。',vec:[0,0,0,0,-0.5,0,0,0,0,0,0,0,0,0,0]},
'16': {cat:'運動・身体',sc:'運動への意欲',name:'運動意欲低',age:'4',des:'友だちが活発に遊んでいる中で、一人だけ隅で座っていることが多い。運動の楽しさを伝えたい。',vec:[-0.2,-0.2,0,0,-0.7,0,0,0,0,-0.3,-0.5,0,-0.3,0,-0.5]},
'17': {cat:'運動・身体',sc:'協調運動',name:'雲梯ブランコ苦戦',age:'5',des:'うんていやブランコなど、連続した動きが必要な遊具で苦戦する。手と足の連動を意識させたい。',vec:[-0.3,-0.2,0,-0.6,0.3,0,0,0,0,0,0,0,0,0,0]},
'18': {cat:'運動・身体',sc:'協調運動',name:'ボール扱いぎこちない',age:'3',des:'ボールを投げたり蹴ったりする際に、手足の動きがバラバラでぎこちない。全身を使った動きを促したい。',vec:[-0.4,0,0,-0.6,0,0,0,0,0,0,0,0,0,0,0]},
'19': {cat:'運動・身体',sc:'協調運動',name:'指先不器用',age:'2',des:'積み木を積む際に、両手の使い方が不器用で崩してしまう。指先の協調性を高めたい。',vec:[0,0,0,-0.6,0,0,0,0,0,0,0,0,0,0,0]},
'20': {cat:'運動・身体',sc:'協調運動',name:'両手足使う運動苦手',age:'4',des:'縄跳びや鉄棒など、両手足を使う運動が苦手。リズムに合わせて体を動かす楽しさを伝えたい。',vec:[-0.2,-0.2,0,-0.6,0,0,0,0,-0.3,0,0,0,0,0,0]},
'21': {cat:'運動・身体',sc:'姿勢・体幹',name:'運動時不安定な動き',age:'5',des:'運動中に体がブレやすく、安定した動きができない。体幹を意識した運動を取り入れたい。',vec:[0,-0.7,0,-0.3,0,0,0,0,0,0,0,0,0,0,0]},
'22': {cat:'運動・身体',sc:'姿勢・体幹',name:'座り姿勢崩れる',age:'2',des:'座っているときに背中が丸まりやすく、すぐに姿勢が崩れる。体幹を意識した遊びを取り入れたい。',vec:[0,-0.6,0,0,0,0,0,0,0,0,0,0,0,0,0]},
'23': {cat:'運動・身体',sc:'姿勢・体幹',name:'椅子の座り方',age:'3',des:'食事中に椅子に深く座れず、体がずり落ちてしまう。正しい座り方を伝えたい。',vec:[0,-0.6,0,0,0,0,0,0,0,0,0,0,0,0,0]},
'24': {cat:'運動・身体',sc:'姿勢・体幹',name:'座る姿勢持続しない',age:'4',des:'長時間座って活動することが苦手で、すぐにゴロゴロしてしまう。体幹を鍛える運動を促したい。',vec:[-0.2,-0.6,0,0,0,0,0,0,0,-0.3,0,0,-0.3,0,0]},
'25': {cat:'運動・身体',sc:'姿勢・体幹',name:'立つ姿勢傾く',age:'3',des:'立っているときに体が傾きやすく、不安定な印象。正しい姿勢を意識させたい。',vec:[-0.2,-0.6,0,0,0,0,0,0,0,0,0,0,0,0,0]},
'26': {cat:'運動・身体',sc:'指先',name:'スプーンフォーク苦手',age:'2',des:'スプーンでうまくすくえず、こぼしてしまうことが多い。フォークも苦手で手づかみが多い。',vec:[-0.2,-0.1,0,-0.6,0,0,0,0,-0.2,0,0,0,0,0,0]},
'27': {cat:'運動・身体',sc:'指先',name:'のりをつけ過ぎる',age:'3',des:'のりをつけすぎてしまい、紙がしわくちゃになる。適量を意識させたい。',vec:[-0.2,0,0,-0.3,0,0,0,-0.4,-0.2,0,0,0,0,0,0]},
'28': {cat:'運動・身体',sc:'指先',name:'のりを塗る範囲広すぎ',age:'4',des:'のりを塗る範囲が広すぎて、周りを汚してしまう。塗る場所を意識させたい。',vec:[-0.1,0,0,-0.4,0,0,0,-0.3,-0.3,0,0,0,0,0,0]},
'29': {cat:'運動・身体',sc:'指先',name:'手指不器用',age:'4',des:'手指が不器用でハサミの使い方が苦手。工作活動を嫌がり「できない」とすぐ諦めてしまう。',vec:[0,0,0,-0.5,-0.6,0,0,0,0,0,0,0,0,0,0]},
'30': {cat:'運動・身体',sc:'指先',name:'手先不器用',age:'5',des:'手先が不器用で、細かい作業を嫌がる。ハサミやクレヨンをうまく使えず、すぐに諦めてしまう。',vec:[0,0,0,-0.6,-0.7,0,0,0,0,0,0,0,0,0,0]},
'31': {cat:'運動・身体',sc:'歩く・走る',name:'足元不安定で階段に慣れない',age:'3',des:'階段の上り下りで手すりを使いたがり、足元が不安定。段差への慣れを促したい。',vec:[-0.5,-0.6,0,-0.2,0,0,0,-0.3,0,0,0,0,0,0,0]},
'32': {cat:'運動・身体',sc:'歩く・走る',name:'方向転換苦手で衝突',age:'4',des:'鬼ごっこなどで友だちを追いかける際に、方向転換が苦手でぶつかることがある。素早い動きを促したい。',vec:[-0.4,-0.3,0,-0.3,0.6,0,0,0,0,0,0.3,0,0,0,0.3]},
'33': {cat:'運動・身体',sc:'歩く・走る',name:'足もつれ転びやすい',age:'2',des:'走る際に足がもつれることが多く、転倒しやすい。足の運びを意識させたい。',vec:[-0.6,-0.3,0,-0.2,0.4,0,0,0,0,0,0,0,0,0,0]},
'34': {cat:'運動・身体',sc:'歩く・走る',name:'長距離歩けない',age:'5',des:'長距離を歩くことを嫌がり、すぐに疲れたと訴える。体力向上を目指したい。',vec:[0,0,0,0,-0.6,0,0,0,0,0,0,0,0,0,0]},
'35': {cat:'運動・身体',sc:'歩く・走る',name:'歩く意欲不足',age:'3',des:'疲れるとすぐに抱っこをせがむ。自分の足で歩くことの楽しさを伝えたい。',vec:[0,0,0,0,-0.4,0,0,0,0,0,0,0.3,0,0,0]},
'36': {cat:'情緒・行動',sc:'こだわり',name:'勝敗こだわり',age:'5',des:'リーダーシップを発揮するが、勝ち負けにこだわりすぎて負けると不機嫌になる。悔しさを切り替える力を付けたい',vec:[0,0,0,0,0,0,0,0,0,-0.5,0.3,0.3,-0.6,0,0.4]},
'37': {cat:'情緒・行動',sc:'こだわり',name:'こだわりあり友だちと協調難',age:'4',des:'自分のやり方や順番に固執し、友だちとの協調が難しい。柔軟な思考を促したい。',vec:[0,0,0,0,0,0,0,0,0,0,-0.5,0,-0.7,0,-0.4]},
'38': {cat:'情緒・行動',sc:'こだわり',name:'新規食べ物や場所慣れず',age:'2',des:'新しい食べ物や初めての場所を極端に嫌がる。無理強いせず、少しずつ慣れさせたい。',vec:[0,0,-0.6,0,0,0,0,-0.5,0,-0.3,0,0,-0.5,0,0]},
'39': {cat:'情緒・行動',sc:'こだわり',name:'玩具遊び固定興味狭い',age:'3',des:'特定の玩具や遊びにこだわりが強く、他の遊びに誘っても応じない。興味の幅を広げる工夫が必要。',vec:[0,0,0,0,0,0,0,0,0,0,-0.3,0,-0.6,0,-0.3]},
'40': {cat:'情緒・行動',sc:'こだわり',name:'遊びこだわり切替難',age:'4',des:'特定の遊びにこだわりが強く、他の遊びに誘っても応じない。遊びの切り替えが難しい。',vec:[0,0,0,0,0,0,0,0,0,0,0,0,-0.8,0,0]},
'41': {cat:'情緒・行動',sc:'こだわり',name:'ルーティン崩れパニック',age:'4',des:'日課やルーティンが崩れると強い不安を感じ、パニックになる。見通しを伝え、変化への適応を支援したい。',vec:[0,0,0,0,0,0,0,-0.8,0,-0.7,0,0,-0.8,0,0]},
'42': {cat:'情緒・行動',sc:'こだわり',name:'模倣なしこだわり',age:'3',des:'友だちの遊び方を真似しようとせず、自分だけのやり方に固執する。一緒に遊びながら模倣を促したい。',vec:[0,0,0,0,0,0,0,0,-0.6,0,-0.3,0,-0.6,0,0]},
'43': {cat:'情緒・行動',sc:'こだわり',name:'こだわり衝動制御困難',age:'3',des:'いつも同じ手順にこだわり、変更があると強くパニックになる。気持ちの切り替えが難しい。',vec:[0,0,-0.3,0,0,0,0,0,0,-0.7,0,0,-0.9,0,0]},
'44': {cat:'情緒・行動',sc:'パニック・癇癪',name:'三輪車トラブル',age:'2',des:'お友達が乗っていた三輪車に乗りたいと、押しのけ泣かす。本児も大声で泣き、保育者の話に耳を傾けられない。落ち着いてから話をしようとしたが頑として受け入れない。',vec:[0,0,0,0,0,-0.3,0,-0.5,0,-0.7,-0.5,0,-0.8,0,-0.3]},
'45': {cat:'情緒・行動',sc:'パニック・癇癪',name:'癇癪自傷',age:'2',des:'かんしゃくをおこすと自分の顔をテーブルや床にぶつける。何かでスイッチが入ると嫌がって泣き、落ち着くまで時間がかかる。言葉は発しないが仕草や指差しで訴える。保育者の話すことは理解できる。',vec:[0,0,-0.5,0,0,0.6,-0.6,-0.3,0,-0.8,0,0.3,-0.7,0,0]},
'46': {cat:'情緒・行動',sc:'パニック・癇癪',name:'癇癪、家庭様子見えず',age:'3',des:'気分のムラが激しくパニックや癇癪を起こし、切替えに時間がかかる。また、連絡帳の記入がほとんどなく、園からの連絡事項への返答も遅い。家庭での子どもの様子が把握しにくい。',vec:[0,0,0,0,0,0,0,0,0,-0.7,0,0,-0.7,-0.6,0]},
'47': {cat:'情緒・行動',sc:'パニック・癇癪',name:'失敗恐れ挑戦避け',age:'3',des:'ブロックを積むとすぐに崩して大声で泣く。失敗を恐れて挑戦を避ける傾向がある。',vec:[0,0,0,0,-0.6,0,0,0,0,-0.7,0,0,-0.6,0,0]},
'48': {cat:'情緒・行動',sc:'パニック・癇癪',name:'活動切替パニック',age:'4',des:'活動の切り替え時にパニックを起こし、次の活動への移行を強く拒否する。事前に見通しを伝える必要がある。',vec:[0,0,0,0,0,0,0,-0.7,0,-0.6,0,0,-0.8,0,0]},
'49': {cat:'情緒・行動',sc:'パニック・癇癪',name:'感情コントロール難',age:'2',des:'感情の起伏が激しく、些細なことで怒り出したり、泣き出したりする。気持ちのコントロールが難しい。',vec:[0,0,0,0,0,0,0,0,0,-0.7,0,0,-0.3,0,0]},
'50': {cat:'情緒・行動',sc:'パニック・癇癪',name:'負けを受け入れられない',age:'4',des:'鬼ごっこで捕まると大泣きし、遊びを中断する。負けを受け入れる経験を増やしたい。',vec:[0,0,0,0,0.5,0,0,0,0,-0.5,0,0,-0.6,0,0]},
'51': {cat:'情緒・行動',sc:'パニック・癇癪',name:'言葉少ないかんしゃく',age:'2',des:'言葉が少なく、欲求が通じないと床に寝転んで大泣き。保育者の抱っこでようやく落ち着く。',vec:[0,0,0,0,0,-0.5,-0.7,-0.5,0,-0.7,0,0.3,-0.5,0,0]},
'52': {cat:'情緒・行動',sc:'パニック・癇癪',name:'些細なことで大暴れ',age:'3',des:'些細なことで激しく泣き叫んだり、物を投げたりする。気持ちが爆発すると20〜30分は落ち着けず、声かけも全く届かない。',vec:[0,0,0,0,0,0,0,0,0,-0.8,0,0,-0.7,0,0]},
'53': {cat:'情緒・行動',sc:'パニック・癇癪',name:'床にひっくり返って癇癪',age:'2',des:'思い通りにならないと床にひっくり返り、手足をバタつかせて大声で泣く。落ち着くまで時間がかかる。',vec:[0,0,0,0,0.3,0,0,0,0,-0.7,0,0,-0.6,0,0]},
'54': {cat:'情緒・行動',sc:'パニック・癇癪',name:'思い通りにならないとパニック',age:'2',des:'自分の思いが届かないとパニックを起こす。自分で気持ちを切り替えて動けるように、待ってあげている。',vec:[0,0,0,0,0,0,0,0,0,-0.7,0,0,-0.6,0,0]},
'55': {cat:'情緒・行動',sc:'パニック・癇癪',name:'集中力低、泣き叫ぶ、呼びかけ応じず',age:'3',des:'他児にちょっかいを掛けることが多く、集中力に欠ける。名前を呼ばれても振り向かず無視・聞こえないふりも。涙が多い。ちょっとの事でつまずきやる気をなくし、大声で泣き叫ぶ。',vec:[0,0,0,0,0,-0.6,0,-0.4,0,-0.7,-0.6,0,-0.5,0,-0.4]},
'56': {cat:'情緒・行動',sc:'パニック・癇癪',name:'音や予期せぬ出来事に不安',age:'3',des:'大きな音や予期せぬ出来事に驚き、泣き出して止まらなくなる。安心できる環境作りが重要。',vec:[0,0,-0.7,0,0,0,0,-0.4,0,-0.6,-0.3,0.4,-0.5,0,-0.3]},
'57': {cat:'情緒・行動',sc:'パニック・癇癪',name:'部屋に入れず切替困難',age:'3',des:'発達障害があり、保育室に入るのを強く嫌がる。気持ちを切り替えて入室したい',vec:[0,0,-0.3,0,0,0,0,-0.5,0,-0.6,-0.3,0,-0.7,0,-0.5]},
'58': {cat:'情緒・行動',sc:'パニック・癇癪',name:'保育者手伝い拒否癇癪',age:'2',des:'保育者が手伝おうとすると、強く拒否して癇癪を起こす。自分でやりたい気持ちを尊重しつつ、見守る姿勢が大切。',vec:[0,0,0,0,0,0,0,0,0,-0.4,0,-0.5,-0.6,0,0]},
'59': {cat:'情緒・行動',sc:'パニック・癇癪',name:'友だちトラブル癇癪',age:'4',des:'友だちとの些細なトラブルで癇癪を起こし、周りの子に手を出してしまう。感情のコントロールが難しい。',vec:[-0.1,0,0,0,0,0,0,0,0,-0.8,-0.6,0,-0.7,0,-0.5]},
'60': {cat:'情緒・行動',sc:'パニック・癇癪',name:'意思が通らないことに怒る',age:'3',des:'1日を通して、自分の意思が通らないことに怒っている。内容は、帰りたいから朝のお支度をしない。職員がするのも嫌。朝の会や帰りの会は、参加できていない。少しずつでもクラスで楽しく過ごしてほしいため、無理はさせずに見守っている。寄り添うと、何かを察してあっち行って！と怒ることが多い。',vec:[0,0,0,0,0,-0.4,0,0,0,-0.8,0,-0.7,-0.7,0,-0.4]},
'61': {cat:'情緒・行動',sc:'パニック・癇癪',name:'激しい癇癪',age:'4',des:'自分の世界にひたり、周りを気にせず大きな声で歌う時がある。自分の要求が通らない時など癇癪が出てしまい、気持ちがおさまるまで身体を震わせて大声で叫ぶながら泣く。気持ちを言葉にして伝えてほしいとお願いすると、少しずつ話してくれる。寝つきが悪く、午睡の時間に音をたてたり喋ったりする。目を隠し、トントンしてあげると寝つきやすくなる。',vec:[0,0,-0.4,0,0,0,0.1,0,0,-0.6,-0.2,0.3,-0.5,0,0]},
'62': {cat:'情緒・行動',sc:'フリーズ・萎縮',name:'感情表現乏しい',age:'5',des:'感情表現が乏しく、喜びや悲しみを表に出さない。感情を安心して表現できる場を提供したい。',vec:[0,0,0,0,0,0,-0.5,0,0,-0.6,0,0,0,0,0]},
'63': {cat:'情緒・行動',sc:'フリーズ・萎縮',name:'主張弱い',age:'5',des:'自分の意見を主張するのが苦手で、友だちの意見に流されやすい。自己表現を促したい。',vec:[0,0,0,0,0,0.3,-0.5,0,0,-0.2,0.2,0.3,-0.4,0,0.3]},
'64': {cat:'情緒・行動',sc:'フリーズ・萎縮',name:'場面緘黙友だちとは話す',age:'4',des:'場面緘黙児。家では普通におしゃべりをするが、保育園ではいっさい話さない。子ども同士の時には小声で話すが大人の視線に気付くと黙る。保育者のそばには来る。',vec:[0,0,-0.3,0,0,0.3,-0.8,-0.2,0.2,-0.4,0.1,0,-0.5,0,0.2]},
'65': {cat:'情緒・行動',sc:'フリーズ・萎縮',name:'大勢の前でフリーズ',age:'5',des:'新しい場面や緊張する状況で急に固まってしまい、声をかけても返事ができない。特に大勢の前では表情が消えてしまう。',vec:[0,0,-0.3,0,0,-0.2,-0.5,-0.4,0,-0.6,-0.3,-0.4,-0.6,0,-0.4]},
'66': {cat:'情緒・行動',sc:'フリーズ・萎縮',name:'人前苦手',age:'4',des:'発表の機会や人前で話すことを極端に嫌がる。指名されると体が硬直し、言葉が出なくなる。',vec:[0,0,0,0,0,0,-0.6,0,0,-0.7,-0.3,-0.2,-0.5,0,-0.3]},
'67': {cat:'情緒・行動',sc:'フリーズ・萎縮',name:'保育者の声に無反応',age:'2',des:'保育者の指示や質問に対して、うつむいてしまい反応がない。安心できる関係性を築くことが先決。',vec:[0,0,0,0,0,-0.5,-0.6,0,0,-0.3,-0.4,-0.7,-0.3,0,-0.5]},
'68': {cat:'情緒・行動',sc:'フリーズ・萎縮',name:'友だち一歩踏み出せず',age:'3',des:'友だちの輪に入りたい気持ちはあるようだが、一歩踏み出せず遠くから見ている。誘っても首を振る。',vec:[-0.1,0,0,0,-0.2,0,-0.3,0,0,-0.3,-0.5,0,-0.4,0,-0.5]},
'69': {cat:'情緒・行動',sc:'愛着形成',name:'特定保育者依存',age:'3',des:'特定の保育者への依存が強く、他の保育者との関わりを拒否する。安心できる関係性の広がりを支援したい。',vec:[0,0,0,0,0,0,0,0,0,0,0,-0.7,0,0,0]},
'70': {cat:'情緒・行動',sc:'愛着形成',name:'保護者に無反応',age:'2',des:'保護者との再会時に、目を合わせなかったり、抱きしめられても無反応だったりする。安定した愛着形成を促したい。',vec:[0,0,0,0,0,0,0,0,0,-0.6,0,-0.7,0,-0.5,0]},
'71': {cat:'情緒・行動',sc:'愛着形成',name:'相手を試す行動',age:'4',des:'友だちとの関わりで、すぐに相手を試すような行動が見られる。信頼関係の築き方を伝えたい。',vec:[0,0,0,0,0,0,0,0,0,-0.3,-0.4,-0.3,-0.4,0,-0.3]},
'72': {cat:'情緒・行動',sc:'意欲・集中力',name:'遊び集中散漫',age:'4',des:'一つの遊びに集中できず、次々と遊びを変えてしまう。興味を持続させる支援が必要。',vec:[0,0,0,0,0.3,0,0,-0.5,0,-0.4,-0.2,0,-0.5,0,-0.2]},
'73': {cat:'情緒・行動',sc:'意欲・集中力',name:'何でも保育者依存',age:'5',des:'些細なことでも「やって」と保育者に頼りきりで、自分でやろうとしない。自分でできる喜びを体験させたい。',vec:[-0.2,-0.1,0,-0.1,-0.3,0.2,0.1,-0.2,0,-0.3,0,0.8,-0.3,0,-0.1]},
'74': {cat:'情緒・行動',sc:'意欲・集中力',name:'意欲ない',age:'2',des:'全てに意欲が全く見られず、靴下を履くまでに30分かかる。指しゃぶりが止められず、何をするにも片手でしている。保護者と話をするが、家では指しゃぶりを全くしないとのこと。給食も手づかみで食べるが、家ではフォークでしっかり食べているとのこと。クラスでも試行錯誤しながら、本児の意欲をかりたててはいるが、思案中。',vec:[0,0,-0.3,-0.5,-0.8,0,0,0,0,-0.3,0,0,-0.4,0.3,0]},
'75': {cat:'情緒・行動',sc:'意欲・集中力',name:'集中すると声が届かず',age:'2',des:'遊びに夢中になると、声かけが届きにくい。集中力を妨げないよう、タイミングを見計らった声かけが必要。',vec:[0,0,0,0,0.4,-0.3,0,0,0,0,0,0,-0.3,0,0]},
'76': {cat:'情緒・行動',sc:'感覚過敏',name:'のり興味なし',age:'5',des:'のりを使う活動に興味を示さない。のりを使った楽しい製作活動を提案したい。',vec:[0,0,-0.3,0,-0.3,0,0,0,0,0,0,0,0,0,0]},
'77': {cat:'情緒・行動',sc:'感覚過敏',name:'のり感触嫌う',age:'2',des:'のりを指で触ることを嫌がる。のりの感触に慣れるよう、遊びの中で取り入れたい。',vec:[0,0,-0.5,0,0,0,0,0,0,0,0,0,0,0,0]},
'78': {cat:'情緒・行動',sc:'感覚過敏',name:'衣服感触過敏',age:'5',des:'衣服の素材や肌触りに敏感で、特定の服しか着ようとしない。感覚への配慮が必要。',vec:[0,0,-0.7,0,0,0,0,0,0,-0.3,0,0,-0.4,-0.3,0]},
'79': {cat:'情緒・行動',sc:'感覚過敏',name:'給食匂い見た目に過敏',age:'3',des:'給食の匂いや見た目に過敏に反応し、食事が進まない。安心できる環境で食事を促したい。',vec:[0,0,-0.8,0,0,0,0,0,0,-0.4,0,0,-0.3,0,0]},
'80': {cat:'情緒・行動',sc:'感覚過敏',name:'光に過敏',age:'4',des:'光の刺激に敏感で、強い日差しや蛍光灯の光を眩しがる。落ち着ける場所を提供したい。',vec:[0,0,-0.7,0,0,0,0,0,0,-0.2,0,0,-0.2,0,0]},
'81': {cat:'情緒・行動',sc:'感覚過敏',name:'周囲に集中乱される',age:'4',des:'集団での活動中、周囲のざわつきや動きに集中を乱されやすい。個別での声かけや配慮が必要。',vec:[0,0,-0.6,0,0,-0.4,0,-0.3,0,-0.4,0,-0.3,-0.4,0,-0.4]},
'82': {cat:'情緒・行動',sc:'感覚過敏',name:'聴覚過敏触覚嗅覚過敏',age:'3',des:'大きな音や複数の声が重なると耳を塞いで動けなくなる。衣服のタグが気になって着替えを拒否する。給食の匂いで食堂に入れない。',vec:[0,0,-0.9,0,0,0,0,0,0,-0.6,0,0,-0.5,0,0]},
'83': {cat:'情緒・行動',sc:'感覚過敏',name:'聴覚過敏',age:'3',des:'特定の音に過敏に反応し、耳を塞ぐことが多い。集団活動への参加に抵抗がある。',vec:[0,0,-0.7,0,-0.3,0,0,0,0,-0.3,-0.4,0,-0.3,0,-0.4]},
'84': {cat:'情緒・行動',sc:'感覚過敏',name:'感触極端に嫌う',age:'3',des:'特定の感触の素材（砂、絵の具など）を触ることを極端に嫌がる。無理強いせず、少しずつ慣れさせたい。',vec:[0,0,-0.8,0,0,0,0,0,0,-0.3,0,0,-0.3,0,0]},
'85': {cat:'情緒・行動',sc:'孤立・人見知り',name:'困っても助け求めず',age:'4',des:'困ったことがあっても自分から助けを求めず、一人で抱え込んでしまう。安心して頼れる関係性を築きたい。',vec:[-0.1,0,0,0,0,0,0,0,0,-0.2,-0.6,-0.7,0,0,-0.3]},
'86': {cat:'情緒・行動',sc:'孤立・人見知り',name:'輪に入らず・緘黙・観察力高',age:'4',des:'自由遊びの時間に一人でいることが多く、友だちの輪に入ろうとしない。誘っても首を振り、遠くからみんなを眺めている。園ではいっさいしゃべらないので友だちとの関わりがほとんど無い。しかし、観察力が鋭く、友だちのすることを細かく覚えていて絵に描く。何かきっかけをつかんで友だちとの橋渡しができたらと思う。',vec:[0,0,0,0.2,0,0.4,-0.7,0,0.4,0,-0.7,0.1,-0.5,0,-0.5]},
'87': {cat:'情緒・行動',sc:'孤立・人見知り',name:'集団活動興味なし',age:'3',des:'集団での活動に興味を示さず、一人で遊ぼうとする。保育者にはよく話をするが、友だちとは関わろうとせず興味がない。集団での楽しさを伝えたい。',vec:[0,0,0,0,0,0.2,-0.4,0,0,0,-0.5,0.3,-0.4,0,-0.4]},
'88': {cat:'情緒・行動',sc:'孤立・人見知り',name:'集団不参加・体幹弱・外遊び好き',age:'3',des:'集団活動に参加せず、部屋の隅で一人で過ごすことが多い。体幹が弱く運動は苦手であるものの、1人で外でボールを投げたり三輪車に乗ったりすることは好きである。興味のある活動から少しずつ誘いかけたい。',vec:[-0.4,-0.3,0,0,0.3,0,0,0,0,0,-0.6,0.1,-0.4,0,-0.5]},
'89': {cat:'情緒・行動',sc:'孤立・人見知り',name:'新環境や人に心開かず',age:'4',des:'新しい環境や人に対して強い警戒心があり、なかなか心を開かない。時間をかけて信頼関係を構築したい。',vec:[0,0,0,0,0,0,0,0,0,-0.3,-0.5,-0.6,-0.4,0,-0.5]},
'90': {cat:'情緒・行動',sc:'孤立・人見知り',name:'目を合わせない',age:'2',des:'保育者との関わりも少なく、目を合わせようとしない。安心できる関係性を丁寧に築きたい。',vec:[0,0,0,0,0,0,0,0,0,0,0,-0.7,0,0,0]},
'91': {cat:'情緒・行動',sc:'孤立・人見知り',name:'友だちと関わらない',age:'5',des:'友だちからの誘いを断ることが多く、自分から関わろうとしない。小さな関わりから支援したい。',vec:[-0.2,0,0,0,0,0,0,0,0,0,-0.6,0.3,0,0,-0.5]},
'92': {cat:'情緒・行動',sc:'孤立・人見知り',name:'一人遊び・手先が器用',age:'4',des:'友だちとの関わりが少なく、一人遊びを好む。集中力があり手先が器用で、折り紙や製作、粘土などの作品は秀でている。良い面を認めながらも、当番活動やごっこ遊びなど、集団の中での自分の役割を見つけられるようにしたい。',vec:[0,0,0,0.4,0,0.3,0,0,0.3,0,-0.5,0.2,-0.3,0,-0.4]},
'93': {cat:'情緒・行動',sc:'孤立・人見知り',name:'分離不安・孤立',age:'3',des:'保護者から離れるのが難しい。友だちの輪に入れず一人でいることが多い。新しい場面で固まる。',vec:[-0.1,0,-0.3,0,-0.4,0,-0.2,-0.6,-0.1,-0.4,-0.6,0.3,-0.5,0,-0.7]},
'94': {cat:'情緒・行動',sc:'攻撃・衝動',name:'トラブル多＆家庭連携難',age:'4',des:'保育者や友だちを試す姿や、一日中怒ったり泣いたり、友だちとのトラブルが起きたり、脱走したりする。園での様子を伝えても、保護者からは「家ではそんなことない」と返答があり、情報共有が難しい。具体的な状況を写真などで伝える工夫が必要。',vec:[-0.1,-0.1,-0.2,-0.1,0.4,0,-0.2,-0.4,0,-0.7,-0.6,-0.3,-0.8,-0.6,-0.5]},
'95': {cat:'情緒・行動',sc:'攻撃・衝動',name:'玩具取り合い手が出る',age:'3',des:'玩具の取り合いで、すぐに手が出てしまう。言葉で気持ちを伝える練習が必要。',vec:[0,0,0,0,0,0,-0.5,0,0,-0.6,-0.4,0,-0.5,0,-0.3]},
'96': {cat:'情緒・行動',sc:'攻撃・衝動',name:'癇癪で物投げ、蹴る',age:'2',des:'気に入らないことがあると、物を投げたり、蹴ったりする。感情の適切な表現方法を教えたい。',vec:[0,0,0,0,0,0,0,0,0,-0.7,0,0,0,0,0]},
'97': {cat:'情緒・行動',sc:'攻撃・衝動',name:'言葉未熟＆状況理解が困難',age:'3',des:'言葉で伝えられず他児に手が出ることが増えた。叱られても意味が分からず腹を立てているので個別の関わりが必要。',vec:[0,0,0,0,0,-0.6,-0.7,-0.4,0,-0.6,-0.7,0,-0.3,0,-0.5]},
'98': {cat:'情緒・行動',sc:'攻撃・衝動',name:'衝動的に友だち叩く噛む',age:'4',des:'思い通りにならないと友だちを叩いたり噛んだりする。本人も後から後悔しているようだが、衝動をコントロールできない。',vec:[0,0,0,0,0,0,0,0,0,-0.8,-0.6,0,-0.7,0,-0.5]},
'99': {cat:'情緒・行動',sc:'攻撃・衝動',name:'大暴れトラブル多',age:'2',des:'自分勝手な行動が多く、よく他児をつかんだり、追いかけたり、大声を出したり、と、とにかくトラブルが多い。保育者と１対１であれば穏やかな時間を持てるが、集団の中ではスイッチが入り大暴れ状態。',vec:[0,0,-0.3,0,0.8,0,0,0,0,-0.7,-0.6,0.5,-0.6,0,-0.6]},
'100': {cat:'情緒・行動',sc:'攻撃・衝動',name:'大暴れふざけ',age:'5',des:'積極的にふざけ、周りの子を誘う。窓など高いところから物を落とす、磁石や人の帽子を投げる、友達の嫌がる姿を見て喜ぶ、友だちの上に馬乗りになり叩く等。おとなしい子のところへ手を出しに行くことが多いが、クラス全体的にちょっかいをかけてまわる。保育者が声をかけると、逆に怒り始める。「どうしたの？」ときいても「みんながいじわる！」「みんなが叩く！」と主に答え、「嫌だったね」と言うと「みんなが悪い！！」とまた叩きに行く。',vec:[0.3,0.2,-0.2,0.1,0.9,0,-0.3,-0.7,0.1,-0.5,-0.8,-0.3,-0.9,0,-0.7]},
'101': {cat:'情緒・行動',sc:'攻撃・衝動',name:'乱暴な言動と他人事親',age:'3',des:'大人が見ていないところで他児に上から指示。気に食わないと手が出る。玩具のひとり占め、乱暴な言動で周囲が告げ口してくる事が多い。保護者に伝えるが「Youtubeの影響ですよ」と他人事のように話す。',vec:[0,0,0,0,0.3,0.2,0.4,0.2,0.1,-0.7,-0.6,0.1,-0.7,-0.7,-0.5]},
'102': {cat:'情緒・行動',sc:'攻撃・衝動',name:'玩具独占',age:'3',des:'特定の玩具を独占し、他の子が近づくと叩く。交代で使うルールを少しずつ理解させている。',vec:[0,0,0,0,0,-0.3,0,-0.4,0,-0.6,-0.6,0,-0.5,0,-0.4]},
'103': {cat:'情緒・行動',sc:'攻撃・衝動',name:'友だちの玩具奪い取る',age:'4',des:'友だちが持っているものを欲しがり、無理やり奪い取ろうとする。貸し借りのルールを伝えたい。',vec:[-0.1,0,0,0,0.3,0.2,-0.2,-0.4,0,-0.5,-0.6,0.1,-0.5,0,-0.4]},
'104': {cat:'情緒・行動',sc:'自己肯定感',name:'運動意欲低あきらめ',age:'4',des:'「どうせできない」とすぐに諦めてしまい、新しいことに挑戦しようとしない。小さな成功体験を積み重ねさせたい。',vec:[0,0,0,0,-0.6,0,0,0,0,-0.5,0,0,-0.6,0,0]},
'105': {cat:'情緒・行動',sc:'自己肯定感',name:'失敗恐れ挑戦避け諦め',age:'5',des:'失敗を極端に恐れ、挑戦したがらない。「できない」と事前に諦める姿勢が見られる。小さな成功体験を積み重ね、自己肯定感を育む関わりが求められる。',vec:[0,0,0,0,-0.7,0,0,0,0,-0.5,0,0,-0.6,0,0]},
'106': {cat:'情緒・行動',sc:'自己肯定感',name:'褒められても否定',age:'3',des:'褒められても素直に受け取れず、照れたり否定したりする。自己肯定感を育む関わりが必要。',vec:[0,0,0,0,0,0,0,0,0,-0.3,0.2,0.4,0,0,0]},
'107': {cat:'情緒・行動',sc:'自己肯定感',name:'友だち比較で自分を卑下',age:'5',des:'友だちと比較して自分を卑下する発言が多い。一人ひとりの良いところを認め、言葉で伝えたい。',vec:[0,0,0,0,0,0,0.3,0,0,-0.4,0.2,0.3,-0.3,0,0.2]},
'108': {cat:'情緒・行動',sc:'人間関係',name:'コミュ消極的',age:'4',des:'挨拶や返事が小さく、目を見て話すことが苦手。積極的にコミュニケーションが取れるように支援したい。',vec:[0,0,0,0,0,0,-0.5,0,0,0,-0.3,-0.3,0,0,-0.2]},
'109': {cat:'情緒・行動',sc:'人間関係',name:'集団の目を気にしすぎ',age:'5',des:'集団の中で自分がどう見られているかを気にしすぎ、行動が制限される。安心できる環境を提供したい。',vec:[0,0,0,0,0,0,0,0,0,-0.5,-0.4,-0.3,-0.4,0,-0.4]},
'110': {cat:'情緒・行動',sc:'人間関係',name:'ルール守れない',age:'4',des:'集団遊びでルールを守れず、自分勝手な行動が目立つ。友だちの気持ちを理解し、協調性を持って遊べるよう、具体的な声かけで支援したい。',vec:[0,0,0,0,0,0,0,-0.3,0,-0.4,-0.5,0,-0.5,0,-0.3]},
'111': {cat:'情緒・行動',sc:'人間関係',name:'友だち固定',age:'3',des:'新しい友だちとの交流に抵抗があり、いつも同じ友だちとばかり遊ぶ。交友関係を広げたい。',vec:[0,0,0,0,0,0,0,0,0,0,-0.3,0,-0.2,0,-0.2]},
'112': {cat:'情緒・行動',sc:'人間関係',name:'他人の表情や声で不安',age:'2',des:'保育者や友だちの表情や声のトーンに敏感に反応し、不安になることがある。安心感を与える関わりが必要。',vec:[0,0,-0.5,0,0,0,0,0,0,-0.4,-0.3,-0.3,-0.4,0,-0.3]},
'113': {cat:'情緒・行動',sc:'人間関係',name:'友だち距離感つかめず',age:'3',des:'友だちとの距離感がつかめず、近づきすぎたり、逆に避けすぎたりする。適切な距離感を伝えたい。',vec:[0,0,-0.3,0,0,0,0,0,0,0,-0.5,0,0,0,-0.3]},
'114': {cat:'情緒・行動',sc:'人間関係',name:'感情コントロールと言葉',age:'4',des:'友だちと小競り合いが多く、すぐに「嫌い！」と言う。感情のコントロールとことばでの表現を育てたい。',vec:[0,0,0,0,0,0,-0.4,0,0,-0.6,-0.5,0,-0.3,0,-0.4]},
'115': {cat:'情緒・行動',sc:'人間関係',name:'些細なことで泣く怒る',age:'3',des:'友だちの些細な言動に傷つきやすく、すぐに泣いたり怒ったりする。気持ちの切り替えを支援したい。',vec:[0,0,0,0,0,0,0,0,0,-0.6,-0.3,0,-0.6,0,0]},
'116': {cat:'情緒・行動',sc:'人間関係',name:'友だち誘い断られ耐性',age:'4',des:'友だちへの誘いを断られると、ひどく落ち込んでしまう。自己肯定感を育む関わりが必要。',vec:[0,0,0,0,0,0,0,0,0,-0.6,0.3,0.4,-0.5,0,-0.3]},
'117': {cat:'情緒・行動',sc:'人間関係',name:'入れてと言えない',age:'3',des:'友達の遊びに入りたがるが、声が小さく無視されやすい。自分から「入れて」と言う練習をしたい。',vec:[0,0,0,0,0.5,0,0,0,0,0,-0.3,0.3,0,0,-0.2]},
'118': {cat:'情緒・行動',sc:'多動・不注意',name:'危険意識低い',age:'5',des:'外遊びで危ない遊び（高い所から飛び降りるなど）を繰り返す。危険への意識を高めたい。',vec:[-0.3,-0.2,0,0,0.8,0,0,-0.6,0,-0.3,0,0,-0.4,0,0]},
'119': {cat:'情緒・行動',sc:'多動・不注意',name:'散歩気がそれ立ち止まる',age:'5',des:'散歩中に気になるものがあると立ち止まってしまう。集団のペースを意識させたい。',vec:[0,0,0,0,0,0,0,-0.4,0,0,0,0,-0.5,0,-0.3]},
'120': {cat:'情緒・行動',sc:'多動・不注意',name:'散歩で走り出す',age:'3',des:'散歩中に列を離れて走り出してしまう。安全に歩くことの大切さを伝えたい。',vec:[-0.2,0,0,0,0.8,0,0,-0.6,0,-0.3,0,0,-0.5,0,0]},
'121': {cat:'情緒・行動',sc:'多動・不注意',name:'集団活動低集中',age:'4',des:'集団活動中に席を離れて歩き回ったり、他の子にちょっかいを出したりする。集中力を高める工夫が必要。',vec:[0,0,0,0,0.3,0,0,0.5,0,-0.5,-0.4,0,-0.6,0,-0.4]},
'122': {cat:'情緒・行動',sc:'多動・不注意',name:'衝動的危険予測薄い',age:'2',des:'衝動的に行動してしまい、危険な場面に遭遇することがある。行動の予測と抑制を促したい。',vec:[0,0,0,0,0.3,0,0,-0.6,0,-0.6,0,0,-0.5,0,0]},
'123': {cat:'情緒・行動',sc:'多動・不注意',name:'落ち着きがない',age:'4',des:'大声でおしゃべりが多く、落ち着きがない。給食の時、常にしゃべり、姿勢も悪いのでその都度声かけしている状態。好き嫌いが多く、食べ終わるのに時間がかかる。家でも偏りがあり、お菓子ばかり食べているとのこと。',vec:[0,0,-0.3,0,0.3,0,0.5,-0.3,0,-0.4,-0.2,0,-0.5,-0.3,0]},
'124': {cat:'情緒・行動',sc:'多動・不注意',name:'交通ルール危険予測薄い',age:'4',des:'道の端を歩かず、真ん中を歩こうとする。交通ルールや危険予測を教えたい。',vec:[-0.2,0,0,0,0.3,0,0,-0.6,0,0,0,0,0,0,0]},
'125': {cat:'情緒・行動',sc:'分離不安',name:'保護者いない行事に不安',age:'4',des:'遠足や発表会など、保護者が参加しない行事に対して強い不安を感じ、参加を渋る。',vec:[0,0,0,0,0,0,0,-0.5,0,-0.4,0,-0.3,-0.5,0,-0.3]},
'126': {cat:'情緒・行動',sc:'分離不安',name:'午睡不安',age:'3',des:'午睡の時間に一人で眠ることを嫌がり、保育者の近くでしか眠れない。安心感を与える工夫が必要。',vec:[0,0,0,0,0,0,0,0,0,-0.3,0,0.6,-0.2,0,0]},
'127': {cat:'情緒・行動',sc:'分離不安',name:'変化不安',age:'3',des:'新しい環境や変化に強い不安を感じ、登園時に母親から離れられない。慣れるまで時間がかかる。',vec:[0,0,0,0,0,0,0,-0.6,0,-0.5,0,-0.6,-0.7,0,-0.5]},
'128': {cat:'情緒・行動',sc:'分離不安',name:'朝、母と離れられない',age:'3',des:'朝の登園時、保護者と離れるのを極端に嫌がり、10分以上泣き続ける。徐々に安心できる環境作りが必要。',vec:[0,0,0,0,0,0,0,0,0,-0.6,0,-0.5,0,0,0]},
'129': {cat:'情緒・行動',sc:'分離不安',name:'毎朝母と離れず、保育者と離れず',age:'3',des:'朝の登園時に保護者と離れられず、毎日大泣きして30分以上引きずる。保育室でも常に保育者のそばを離れず、活動に参加できない。',vec:[0,0,0,0,0,0,0,0,0,-0.7,-0.5,-0.8,-0.6,0,-0.6]},
'130': {cat:'情緒・行動',sc:'分離不安',name:'保育者から離れられず',age:'3',des:'保育者が少し離れると不安になり、泣き出して追いかけてくる。安心感を与え、自立心を育みたい。',vec:[0,0,0,0,0,0,0,-0.3,0,-0.3,0,-0.7,-0.5,0,-0.3]},
'131': {cat:'情緒・行動',sc:'分離不安',name:'保護者と離れられず',age:'2',des:'保護者が少しでも視界からいなくなると不安になり、泣き出す。特定の保育者との安定した関係が必要。',vec:[0,0,0,0,0,0,0,0,0,-0.3,0,-0.5,-0.3,0,-0.3]},
'132': {cat:'情緒・行動',sc:'分離不安',name:'迎え遅れ不安',age:'4',des:'保護者のお迎えが遅れると、ひどく不安になり泣き出す。見通しを伝え、安心させることが大切。',vec:[0,0,0,0,0,0,0,-0.6,0,-0.5,0,0.5,-0.6,0,0]},
'133': {cat:'情緒・行動',sc:'分離不安',name:'毎朝お母さんと離れられず',age:'3',des:'登園時に、ほぼ毎日お母さんから離れられない。一度、登園できずに帰ったことも。保育園に入るとクラスに行くまでに泣き止み、切り替えることができる。',vec:[0,0,0,0,0,0,0,0,0,-0.4,0,-0.6,0.2,0,0]},
'134': {cat:'生活スキル',sc:'ハサミ',name:'ハサミ理解',age:'2',des:'ハサミで紙以外のものを切ろうとする。ハサミを使う場所や対象を明確にしたい。',vec:[-0.2,0,0,0.3,0.6,-0.3,0,-0.5,0.2,0,0,0,-0.6,0,0]},
'135': {cat:'生活スキル',sc:'ハサミ',name:'ハサミ微細運動',age:'4',des:'ハサミで直線は切れるが、曲線や細かい形を切るのが苦手。指の動きを意識させたい。',vec:[-0.2,0,0,-0.5,0,0,0,0,0,0,0,0,0,0,0]},
'136': {cat:'生活スキル',sc:'ハサミ',name:'ハサミ不安定',age:'3',des:'ハサミの持ち方が安定せず、力加減が難しい。紙を切ることに抵抗がある。',vec:[0,0,-0.3,-0.6,0,0,0,0,0,-0.3,0,0,0,0,0]},
'137': {cat:'生活スキル',sc:'ハサミ',name:'ハサミ集中力',age:'4',des:'ハサミを使うことに集中できず、すぐに飽きてしまう。興味を持てるような活動を取り入れたい。',vec:[-0.2,0,0,-0.3,0,0,0,-0.3,0,-0.4,0,0,-0.3,0,0]},
'138': {cat:'生活スキル',sc:'ハサミ',name:'ハサミ危険意識',age:'3',des:'ハサミを使う際に、周りの友だちとの距離が近い。安全な使い方を繰り返し伝えたい。',vec:[0,0,0,0,0,-0.3,0,-0.4,0,0,0,0,0,0,0]},
'139': {cat:'生活スキル',sc:'休息',name:'午睡と生活リズム',age:'3',des:'午睡の時間が短く、午後に集中力が続かない。十分な睡眠が取れるよう、家庭と協力したい。',vec:[0,0,0,0,0,0,0,0,0,-0.3,0,0,-0.2,-0.3,0]},
'140': {cat:'生活スキル',sc:'休息',name:'午睡しない',age:'3',des:'午睡の時間になってもなかなか眠れず、周囲の子どもにちょっかいを出す。休息の必要性を理解させたい。',vec:[0,0,0,0,0,-0.3,0,-0.4,0,-0.3,-0.3,0,-0.4,0,0]},
'141': {cat:'生活スキル',sc:'休息',name:'昼寝嫌がる',age:'5',des:'午睡を嫌がり、一人で静かに過ごすことが難しい。休息の取り方を一緒に考えたい。',vec:[0,0,0,0,0.3,0,0,-0.3,0,-0.3,0,0,-0.5,0,0]},
'142': {cat:'生活スキル',sc:'休息',name:'昼寝眠れない',age:'4',des:'午睡中に何度も目を覚まし、ぐっすり眠れていない様子。安心して眠れる環境を整えたい。',vec:[0,0,-0.3,0,0,0,0,0,0,-0.3,0,-0.2,-0.3,0,0]},
'143': {cat:'生活スキル',sc:'休息',name:'眠そう、生活リズムに課題',age:'2',des:'午前中から眠そうにしていることが多く、活動中に座っていられない。家庭との生活リズムの調整が必要。',vec:[0,0,0,0,-0.3,0,0,-0.4,0,-0.3,0,0,-0.5,-0.6,0]},
'144': {cat:'生活スキル',sc:'休息',name:'疲れで機嫌悪トラブル増',age:'3',des:'疲れが溜まると機嫌が悪くなり、友だちとのトラブルが増える。十分な休息が取れるよう配慮が必要。',vec:[0,0,0,0,0,0,0,0,0,-0.4,-0.3,0,-0.5,0,0]},
'145': {cat:'生活スキル',sc:'靴',name:'靴の着脱',age:'4',des:'マジックテープの靴の着脱に時間がかかる。自分でスムーズにできるよう支援したい。',vec:[-0.2,0,0,-0.4,0,0,0,0,0,0,0,0,0,0,0]},
'146': {cat:'生活スキル',sc:'靴',name:'靴が逆',age:'2',des:'靴を左右逆に履いてしまうことが多い。自分で確認する習慣をつけさせたい。',vec:[-0.2,0,0,-0.3,0,0,0,-0.4,-0.3,0,0,0,0,0,0]},
'147': {cat:'生活スキル',sc:'靴',name:'慣れない靴拒否',age:'3',des:'新しい靴に履き替えるのを嫌がる。靴の着脱に慣れるよう、遊びの中で取り入れたい。',vec:[-0.1,0,-0.4,0,0,0,0,0,0,-0.3,0,0,-0.4,0,0]},
'148': {cat:'生活スキル',sc:'言葉',name:'言葉遅れ',age:'2',des:'言葉の遅れが見られ、自分の要求をうまく伝えられない。指差しやジェスチャーが多い。',vec:[0,0,0,0,0,-0.3,-0.6,-0.3,0,0,0,0,0,0,0]},
'149': {cat:'生活スキル',sc:'言葉',name:'オウム返し',age:'5',des:'質問に対してオウム返しが多い。質問の意図を理解し、自分の言葉で答えられるよう促したい。',vec:[0,0,0,0,0,-0.5,-0.6,-0.3,-0.2,0,0,0,0,0,0]},
'150': {cat:'生活スキル',sc:'言葉',name:'二語三語文出ない',age:'3',des:'保育者の指示が通りづらい。単語は話せるが、二語文や三語文がなかなか出てこない。言葉を引き出すような関わりが必要。',vec:[0,0,0,0,0,-0.4,-0.6,0,0,-0.1,0,0,0,0,0]},
'151': {cat:'生活スキル',sc:'言葉',name:'発音不明瞭',age:'3',des:'保育者の話すことはよく理解しているが、発音が不明瞭で、何を言っているのか聞き取りにくいことがある。ゆっくりと話すことを意識させたい。',vec:[0,0,0,0,0,0.3,-0.5,0,0,0,0,0,0,0,0]},
'152': {cat:'生活スキル',sc:'言葉',name:'感情を言葉で表現苦手',age:'4',des:'友だちとの会話で、自分の気持ちを言葉で表現するのが苦手。感情語彙を増やす支援をしたい。',vec:[0,0,0,0,0,0,-0.6,0,0,-0.3,-0.2,0,0,0,0]},
'153': {cat:'生活スキル',sc:'歯磨き',name:'仕上げ磨き嫌がる',age:'5',des:'仕上げ磨きを嫌がる。自分で磨くことと、仕上げ磨きの役割を伝えたい。',vec:[0,0,-0.3,0,0,0,0,-0.4,0,-0.5,0,-0.3,-0.4,0,0]},
'154': {cat:'生活スキル',sc:'歯磨き',name:'歯ブラシを噛む',age:'3',des:'歯ブラシを噛んでしまい、うまく磨けない。正しい歯ブラシの使い方を教えたい。',vec:[0,0,0,-0.3,0,0,0,0,-0.2,0,0,0,0,0,0]},
'155': {cat:'生活スキル',sc:'歯磨き',name:'歯磨き短時間',age:'4',des:'歯磨きが短時間で終わってしまう。丁寧に磨くことの大切さを伝えたい。',vec:[-0.1,0,0,0,0,-0.2,0,-0.3,0,-0.2,0,0,-0.3,0,0]},
'156': {cat:'生活スキル',sc:'歯磨き',name:'歯磨き嫌がる',age:'2',des:'歯磨きを嫌がり、口を開けようとしない。歯磨きの必要性を伝え、楽しい雰囲気を作りたい。',vec:[0,0,-0.3,0,0,-0.2,0,0,0,-0.3,0,0,-0.4,0,0]},
'157': {cat:'生活スキル',sc:'手洗い',name:'タオルで拭く習慣',age:'3',des:'タオルで手を拭かずに服で拭いてしまう。清潔なタオルを使う習慣をつけたい。',vec:[-0.2,0,-0.3,0,0,-0.3,0,-0.4,-0.3,0,0,0,-0.2,0,0]},
'158': {cat:'生活スキル',sc:'手洗い',name:'手洗い手順意識',age:'3',des:'手を洗う手順が飛んでしまい、さっと済ませてしまう。泡立てや指の間を洗うことを意識させたい。',vec:[-0.2,0,0,-0.3,0,-0.2,0,-0.4,-0.3,0,0,0,0,0,0]},
'159': {cat:'生活スキル',sc:'手洗い',name:'手洗い習慣意識',age:'5',des:'手洗いの声かけをしないと自分から行かない。食前・外遊び後の手洗いを習慣づけたい。',vec:[0,0,0,0,0,0,0,-0.4,0,0,0,0,-0.3,0,0]},
'160': {cat:'生活スキル',sc:'手洗い',name:'手洗い目的意識',age:'2',des:'水遊びの延長で、手洗いを遊びにしてしまう。清潔にする目的を伝えたい。',vec:[0,0,0.3,0,0.6,-0.3,0,-0.4,0,0,0,0,-0.3,0,0]},
'161': {cat:'生活スキル',sc:'手洗い',name:'石鹸使用促し',age:'4',des:'手洗いで石鹸を使わずに水だけで済ませてしまう。泡の感触を楽しみながら洗えるよう促したい。',vec:[-0.2,0,-0.3,0,0,0,0,0,0,0,0,0,0,0,0]},
'162': {cat:'生活スキル',sc:'順番待ち',name:'順番意識',age:'3',des:'割り込んでしまうことが多く、待てずにトラブルになる。友だちとの交代を意識させたい。',vec:[0,0,0,0,0,0,0,-0.5,0,-0.5,-0.3,0,-0.6,0,-0.3]},
'163': {cat:'生活スキル',sc:'順番待ち',name:'順番見通し',age:'2',des:'順番が来ないことに不満を感じ、泣いたり怒ったりする。気持ちを言葉で表現できるよう促したい。',vec:[0,0,0,0,0,0,-0.3,-0.5,0,-0.6,0,0,-0.7,0,0]},
'164': {cat:'生活スキル',sc:'順番待ち',name:'玩具無理矢理とる',age:'4',des:'友だちが遊んでいる玩具を無理やり取ろうとする。貸し借りのルールを伝えたい。',vec:[-0.1,0,0,0,0.3,0.2,-0.3,-0.4,0,-0.5,-0.6,-0.3,-0.6,0,-0.4]},
'165': {cat:'生活スキル',sc:'順番待ち',name:'順番待てずトラブル多',age:'4',des:'友だちとのトラブルが多く、順番が待てない。衝動をコントロールしたい',vec:[0,0,0,0,0,0,0,0,0,-0.7,-0.6,0,-0.8,0,-0.5]},
'166': {cat:'生活スキル',sc:'順番待ち',name:'一人で行動',age:'5',des:'列に並ぶことを嫌がり、一人で行動しようとする。集団行動の楽しさを伝えたい。',vec:[-0.1,0,0,0,0.3,0.2,0.2,0,0,-0.2,-0.4,0.2,-0.5,0,-0.4]},
'167': {cat:'生活スキル',sc:'順番待ち',name:'順番守らない',age:'3',des:'列に並んでいる時に、前の友だちを押したり、割り込んだりする。順番を守る大切さを伝えたい。',vec:[-0.2,0,0,0,0.3,-0.3,0,-0.6,0,-0.4,-0.3,0,-0.5,0,-0.2]},
'168': {cat:'生活スキル',sc:'順番待ち',name:'トラブル多＆衝動的',age:'5',des:'友だちとのトラブルが多く、順番が待てない。また、目につくものは興味を持ったら何でも触ろうとする。座って保育者の話をきくことが難しい。衝動をコントロールできない。担任の保育者とは別に、補助の先生を一人つけないと活動がスムーズにできない。',vec:[0,0,0,0,0,-0.4,0,-0.5,0,-0.7,-0.7,0,-0.8,0,-0.5]},
'169': {cat:'生活スキル',sc:'食事',name:'野菜偏食',age:'4',des:'給食で野菜を残すことが多く「苦手」と言う。家でも偏食が激しいとのこと。少量から挑戦する声かけ中。',vec:[0,0,-0.3,0,0,0,0.3,0,0,-0.2,0,0,-0.2,-0.2,0]},
'170': {cat:'生活スキル',sc:'食事',name:'噛む習慣',age:'3',des:'口の中に食べ物を溜め込んでしまう。よく噛んで飲み込むよう、ゆっくり声かけしている。',vec:[-0.2,0,-0.3,-0.2,0,-0.2,-0.2,0,0,0,0,0,0,0,0]},
'171': {cat:'生活スキル',sc:'食事',name:'好き嫌い',age:'4',des:'好き嫌いが多く、苦手なものが出ると食べようとしない。少しずつでも口にできるよう促したい。',vec:[0,0,-0.3,0,0,0,0,0,0,-0.2,0,0,-0.3,0,0]},
'172': {cat:'生活スキル',sc:'食事',name:'食事ペース',age:'5',des:'食べるのが遅く、食事が終わるまでに時間がかかる。友だちとのペースを意識させたい。',vec:[-0.2,0,0,0,0,0,0,-0.3,0,0,0.2,0.3,-0.2,0,-0.1]},
'173': {cat:'生活スキル',sc:'食事',name:'食に集中できない',age:'2',des:'食事中に席を立ち歩き、遊び始めてしまう。食事に集中できるよう声かけが必要。',vec:[0,0,0,0,0,-0.3,0,-0.5,0,0,0,0,0,0,0]},
'174': {cat:'生活スキル',sc:'食事',name:'食事集中力低',age:'3',des:'食事中に席を立って遊び始めてしまう。食事に集中できるよう声かけが必要。',vec:[-0.2,0,0,0,0.3,-0.3,0,-0.4,0,-0.5,0,0,-0.5,0,0]},
'175': {cat:'生活スキル',sc:'生活リズム',name:'生活リズム不規則',age:'5',des:'家庭での生活リズムが不規則で、園での活動に影響が出ているが、改善が見られない。家庭の状況に配慮しつつ、園での対応を検討する必要がある。',vec:[-0.2,-0.1,-0.2,-0.1,-0.2,0,-0.2,-0.2,-0.1,-0.3,-0.1,-0.1,-0.3,-0.4,-0.3]},
'176': {cat:'生活スキル',sc:'生活リズム',name:'生活リズム崩れ',age:'2',des:'家庭と園の生活リズムが合わず、午前中眠くなることが続いている。眠いままだと機嫌が悪く椅子に座れず、崩れ落ちる。１人、テーブルを別にすると、比較的眠くならずに給食が食べられる。思い通りにならないと、物を投げたり、泣いたり、癇癪を起こす。先日嘔吐したままのお布団セットを週明けも持ってきていたり、園で貸し出した洋服を自分のお着替えセットの中に入れてきたりしている。家庭との連絡を密にし様子を見ていく。',vec:[0,-0.3,0,0,0,0,0,-0.3,0,-0.6,0,0.3,-0.5,-0.6,0]},
'177': {cat:'生活スキル',sc:'生活リズム',name:'食事時間不規則',age:'5',des:'食事の時間が不規則で、給食をなかなか食べきれない。家庭での食事時間を見直すよう促したい。',vec:[-0.1,0,0,0,0,0,0,0,0,-0.2,0,0,-0.3,-0.4,-0.1]},
'178': {cat:'生活スキル',sc:'生活リズム',name:'登園遅い',age:'3',des:'登園時間が遅く、朝の支度が間に合わないことが多い。規則正しい生活習慣を身につけさせたい。',vec:[0,0,0,0,0,0,0,0,0,0,0,0,0,-0.4,-0.3]},
'179': {cat:'生活スキル',sc:'生活リズム',name:'夜更かし',age:'4',des:'夜更かしが続いているようで、日中ぼーっとしていることがある。家庭との連携で改善を図りたい。',vec:[0,0,0,0,-0.3,-0.3,-0.3,-0.3,-0.3,-0.3,-0.3,0,-0.3,-0.3,0.5]},
'180': {cat:'生活スキル',sc:'着替え',name:'季節に合った服習慣',age:'5',des:'寒い日でも薄着をしたがる。季節に合った衣服を選ぶ習慣を身につけさせたい。',vec:[0,0,-0.5,0,0,0,0,-0.4,0,0,0,0,-0.3,0,0]},
'181': {cat:'生活スキル',sc:'着替え',name:'袖通し、ボタン困難',age:'3',des:'上着の袖がうまく通せず、ボタンも留められない。自分で着替える意欲はあるが、手伝いを求める。',vec:[-0.3,-0.2,0.1,-0.5,0.6,0.4,0.2,-0.2,0.3,0.3,0.2,0.6,0.2,0.4,0.3]},
'182': {cat:'生活スキル',sc:'着替え',name:'脱いだ服後始末',age:'4',des:'脱いだ服を丸めて放置してしまう。たたんでロッカーに入れる習慣をつけたい。',vec:[0,0,0,0,0,0,0,-0.3,0,0,0,0,-0.3,0,0]},
'183': {cat:'生活スキル',sc:'着替え',name:'ボタン留め不器用',age:'3',des:'着替えに時間がかかり、ボタン留めが苦手。自分でできるようになりたい意欲はあるが、不器用さから焦って泣いてしまう。丁寧な見守りが必要。',vec:[0,0,0,-0.4,0.6,0,0,0,0,-0.4,0,0.3,-0.2,0,0]},
'184': {cat:'生活スキル',sc:'着替え',name:'着替え集中力低',age:'3',des:'着替えに時間がかかり、遊びに夢中になると途中でやめてしまう。集中して取り組めるよう促したい。',vec:[0,0,0,0,0.3,0,0,-0.4,0,-0.3,0,0,-0.5,0,0]},
'185': {cat:'生活スキル',sc:'着替え',name:'ボタンファスナー苦手',age:'3',des:'着替えの際に、ボタンを留めたりファスナーを上げたりする動作が苦手。手先の協調性を養いたい。',vec:[-0.1,0,0,-0.6,0,0,0,0,-0.3,0,0,0,0,0,0]},
'186': {cat:'生活スキル',sc:'着替え',name:'身辺始末低意欲',age:'4',des:'着替えや身支度に時間がかかり、保育者の手助けが必要。自分でやろうとする意欲が低い。',vec:[0,0,0,-0.3,-0.6,0,0,0,0,-0.3,0,0,-0.4,0,0]},
'187': {cat:'生活スキル',sc:'着替え',name:'服前後認識困難',age:'4',des:'肌着と洋服の前後が分からず、裏返しに着てしまうことが多い。畳むことも苦手。',vec:[-0.2,-0.1,0.3,-0.5,0,0,0,-0.2,-0.4,0,0,0,0,0,0]},
'188': {cat:'生活スキル',sc:'排泄',name:'トイレ習慣習得',age:'2',des:'うんちが出ると教えてくれるが、トイレでの排泄を嫌がる。おむつを卒業できるよう支援したい。',vec:[0,0,0,0,0,0.3,0.4,0,0,0,0,0,-0.3,0,0]},
'189': {cat:'生活スキル',sc:'排泄',name:'トイレ我慢',age:'4',des:'トイレに行くのを我慢し、ギリギリまで行かないため間に合わないことがある。早めの声かけが必要。',vec:[0,0,0,0,0,0.3,0,-0.5,0,-0.3,0,0.3,-0.6,0,0]},
'190': {cat:'生活スキル',sc:'排泄',name:'トイレ手順習得',age:'3',des:'トイレの水を流し忘れることが多い。排泄後の一連の動作を習慣づけたい。',vec:[-0.1,0,0,-0.2,0,-0.1,0,-0.4,-0.2,0,0,0,-0.3,0,0]},
'191': {cat:'生活スキル',sc:'排泄',name:'排泄課題',age:'3',des:'以上児クラスだが排泄が間に合わない。自分で気づいてトイレに行けるようにしたい',vec:[0,0,-0.3,0,0,0,0,-0.5,0,-0.3,0,0,-0.4,0,-0.3]},
'192': {cat:'生活スキル',sc:'排泄',name:'排便困難',age:'4',des:'園での排便が難しく、排便しそうな時はおむつを履いてくるが、最近、3回排便に成功。本児は「うんち出るかも！」「でたよ！」など報告してくれる。保護者とも話を行い、園が安心して排便できる場所でいられるようサポートしていきたい。',vec:[0,0,0,0,0,0,0.5,0.4,0,0.3,0,0.4,0.2,0.6,0]},
'193': {cat:'生活スキル',sc:'排泄',name:'トイレ始末習得',age:'5',des:'排泄後に自分で拭くことを嫌がる。清潔を保つことの大切さを伝えたい。',vec:[0,0,-0.3,0,0,0,0,0,0,-0.3,0,0.3,-0.4,0,0]},
'194': {cat:'生活スキル',sc:'排泄',name:'お尻拭きうまくできない',age:'4',des:'排泄後のお尻拭きが自分で上手くできず、恥ずかしがって保育者に頼る。自信を持てるよう見守っている。',vec:[0,0,0,-0.3,0,0,0,0,0,-0.2,0,0,0,0,0]},
'195': {cat:'生活スキル',sc:'排泄',name:'尿意意識低',age:'3',des:'遊びに集中しすぎて間に合わず、尿意への気づきが薄い。定期的な声かけで促している。',vec:[-0.2,0,-0.3,0,0.3,0,0,-0.4,0,-0.2,0,0.5,-0.3,0,0]},
'196': {cat:'生活スキル',sc:'片付け・持ち物管理',name:'切替苦手',age:'4',des:'お片づけの時間に集中できず、遊びの続きをしたがる。次の活動への切り替えが苦手。',vec:[0,0,0,0,0,0,0,-0.5,0,0,0,0,-0.7,0,0]},
'197': {cat:'生活スキル',sc:'片付け・持ち物管理',name:'のり蓋閉め忘れ',age:'3',des:'のりの蓋を閉め忘れてしまう。使い終わったら片付ける習慣をつけさせたい。',vec:[0,0,0,0,0,0,0,-0.3,0,0,0,0,-0.2,0,0]},
'198': {cat:'生活スキル',sc:'片付け・持ち物管理',name:'物の管理が親も困難',age:'3',des:'持ち物の管理ができず、片付けや整理が苦手。また、園で貸し出した洋服や持ち物が返却されず、家庭での管理も難しい様子。連絡を密にし、協力を仰ぎたい。',vec:[0,0,0,0,0,0,0,-0.4,0,0,0,0,-0.5,-0.6,0]},
'199': {cat:'生活スキル',sc:'片付け・持ち物管理',name:'濡れた靴をそのまま',age:'5',des:'雨の日など、濡れた靴をそのままにしてしまう。靴の手入れの仕方を伝えたい。',vec:[0,0,0,0,0,0,0,-0.3,0,0,0,0,0,0,0]},
'200': {cat:'生活スキル',sc:'片付け・持ち物管理',name:'靴片付け',age:'3',des:'靴を脱ぎっぱなしにしてしまう。靴箱に入れることや揃えることを促したい。',vec:[0,0,0,0,0,-0.2,0,-0.3,0,-0.2,0,0,-0.3,0,0]},
'201': {cat:'生活スキル',sc:'片付け・持ち物管理',name:'片付け指示行動',age:'4',des:'片付けの指示をしても、なかなか行動に移せない。具体的な声かけや手伝いが必要。',vec:[0,0,0,0,0,-0.5,0,-0.4,0,-0.3,0,0,-0.4,0,0]},
'202': {cat:'生活スキル',sc:'片付け・持ち物管理',name:'片付け適当',age:'2',des:'片付けの場所が分からず、適当な場所に置いてしまう。物の定位置を覚えさせたい。',vec:[-0.2,0,0,0,0,-0.3,0,-0.5,-0.3,0,0,0,-0.2,0,0]},
'203': {cat:'生活スキル',sc:'片付け・持ち物管理',name:'片付け手伝い怒る',age:'3',des:'片付けを嫌がり、保育者が手伝おうとすると怒る。自分で片付ける達成感を味わわせたい。',vec:[0,0,0,0,0,0,0,0,0,-0.3,0,-0.4,-0.5,0,0]},
'204': {cat:'生活スキル',sc:'片付け・持ち物管理',name:'忘れ物多い親',age:'4',des:'忘れ物が多い。お迎えの際に母親に話すが、その時だけ持ってきて続かず、再度忘れる。母親への支援が必要に感じる。',vec:[0,0,0,0,0,0,0,-0.3,0,0,0,0,0,-0.6,0]},
'205': {cat:'生活スキル',sc:'片付け・持ち物管理',name:'忘れ物多く物の管理苦手',age:'5',des:'忘れ物が多く、持ち物の管理が苦手。自分で準備する習慣を身につけさせたい。',vec:[0,0,0,0,0,0,0,-0.4,0,0,0,0,-0.3,0,0]},
'206': {cat:'生活スキル',sc:'片付け・持ち物管理',name:'片付けしない',age:'5',des:'友だちが片付けているのに、自分だけ片付けようとしない。集団での片付けを促したい。',vec:[0,0,0,0,0,0,0,0,0,0,-0.3,0,-0.6,0,-0.3]},
'207': {cat:'生活スキル',sc:'片付け・持ち物管理',name:'持ち物整理苦手',age:'4',des:'友だちの持ち物を勝手に持ち去ったり、隠したりする行為が見られる。物の貸し借りや持ち物の整理が苦手。',vec:[0,0,0,0,0,-0.3,0,-0.4,0,-0.3,-0.5,0,-0.4,0,-0.3]},
'208': {cat:'生活スキル',sc:'片付け・持ち物管理',name:'片付け習慣',age:'3',des:'遊び終わったおもちゃを片付けず、次の遊びに移ってしまう。片付けの習慣を身につけさせたい。',vec:[0,0,0,0,0.5,0,0,-0.4,0,0,0,0,-0.5,0,0]},
'209': {cat:'生活スキル',sc:'理解力',name:'おゆうぎ模倣苦手',age:'2',des:'おゆうぎで、保育者の見本を見ても、同じように手を動かすことが難しい。簡単な動作から繰り返し見せて促したい。',vec:[-0.2,0,0,-0.3,0,0,0,0,-0.6,0,0,0,0,0,0]},
'210': {cat:'生活スキル',sc:'理解力',name:'指示通らず理解力低、親連携難',age:'4',des:'指示がまったく響かない。理解力に乏しい。園での子どもの気になる行動について相談しても、保護者が多忙を理由に面談を避ける。短い時間でも話せる機会を設けたい。',vec:[0,0,0,0,0,-0.7,0,-0.5,0,0,0,0,0,-0.7,0]},
'211': {cat:'生活スキル',sc:'理解力',name:'散歩手つながない',age:'3',des:'散歩の時、友だちと手をつなぐのを嫌がる。集団行動のルールを伝えたい。',vec:[-0.2,0,-0.3,0,0,0,0,0,0,-0.2,-0.3,0,-0.3,0,-0.2]},
'212': {cat:'生活スキル',sc:'理解力',name:'体操手遊びついていけない',age:'3',des:'集団での体操や手遊びで、周りの子の動きについていけない。マンツーマンで動きを分解して教える必要がある。',vec:[-0.2,-0.2,0,-0.6,0,-0.2,0,0,-0.5,0,0,0,0,0,-0.3]},
'213': {cat:'生活スキル',sc:'理解力',name:'歌お遊戯ダンス苦手',age:'5',des:'新しい歌やダンスを覚えるのに苦労し、友だちの動きを真似するのも苦手。視覚的な情報やゆっくりとしたペースでの提示を工夫したい。',vec:[0,0,0,-0.4,0,0,0,0,-0.7,0,0,0,0,0,0]},
'214': {cat:'生活スキル',sc:'理解力',name:'製作で見本理解難',age:'4',des:'製作活動で、保育者の説明や手順を理解するのに時間がかかり、見本通りに作ることが難しい。個別での丁寧な支援が必要。',vec:[0,0,0,-0.3,0,-0.5,-0.3,-0.4,-0.5,0,0,0,0,0,0]},
'215': {cat:'生活スキル',sc:'理解力',name:'相手気持ち理解困難',age:'3',des:'他児の気持ちを理解するのが難しく、共感的な態度が見られない。相手の気持ちを考える機会を増やしたい。',vec:[0,0,0,0,0,0,0,0,0,0,-0.6,0,0,0,-0.3]},
'216': {cat:'生活スキル',sc:'理解力',name:'集団行動理解不十分',age:'3',des:'保育者の指示が通りにくく、自分のやりたいことばかり優先する。集団行動への理解が不十分。',vec:[0,0,0,0,0,-0.6,0,-0.5,0,0,0,0,-0.5,0,-0.4]},
'217': {cat:'生活スキル',sc:'理解力',name:'理解力心配',age:'5',des:'理解力に心配あり。“お道具箱”を理解できず困る。“オレンジの箱”や、指をさして“これ”と教えるが、結局引き出しに製作物を片付けたりする。しかし、元々お道具箱に入れておく物はそのまま片付けられる。',vec:[0,0,0,0,0,-0.6,0,-0.5,-0.3,0,0,0,0,0,0]},
'218': {cat:'生活スキル',sc:'話を聞く・お集まり',name:'座っていられない',age:'2',des:'お集まりの時に座っていられず、立ち歩いてしまう。集中して座る時間を増やしたい。',vec:[-0.2,-0.2,0,0,0.5,-0.4,0,-0.5,0,-0.4,0,0,-0.5,0,-0.2]},
'219': {cat:'生活スキル',sc:'話を聞く・お集まり',name:'自分ルール',age:'4',des:'集団活動で他の子の意見を聞かず、自分のルールで進めようとする。順番を待つ練習を繰り返している。',vec:[0,0,0,0,0,0,0,0,0,0,-0.5,0,-0.7,0,-0.3]},
'220': {cat:'生活スキル',sc:'話を聞く・お集まり',name:'話最後まで聞かない',age:'3',des:'保育者の話を最後まで聞けず、すぐに次の行動に移ってしまう。指示は短く、具体的に伝える必要がある。',vec:[0,0,0,0,0.3,-0.6,0,-0.5,0,-0.3,0,0,-0.4,0,0]},
'221': {cat:'生活スキル',sc:'話を聞く・お集まり',name:'話きかない',age:'3',des:'保育者の話を聞かずに、他のことに集中してしまう。話を聞く姿勢を促したい。',vec:[-0.2,0,0.2,0,0.3,-0.6,0,-0.4,0,-0.3,0,0,-0.4,0,0]},
'222': {cat:'生活スキル',sc:'話を聞く・お集まり',name:'話聞かず割り込む',age:'4',des:'友だちが話している途中で割り込んでしまう。人の話を最後まで聞く大切さを伝えたい。',vec:[-0.1,0,0,0,0.3,0.3,-0.2,-0.4,0,-0.3,-0.2,0.3,-0.4,0,-0.1]},
'223': {cat:'環境デザイン',sc:'関係(人・社会性)',name:'輪に入れない',age:'4',des:'自由遊びで一人でいることが多く、友だちの輪に入れない。保育者が声をかければ関われるが、自分からは難しい。',vec:[0,0,0,0,0,0,0,0,0,0,-0.6,0.3,0,0,-0.5]},
'224': {cat:'環境デザイン',sc:'関係(人・社会性)',name:'保育者の気を引く',age:'2',des:'保育者が他の子どもと関わっていると、大声を出したり、わざと物を落としたりして気を引こうとする。一対一での関わりを強く求める。',vec:[-0.1,0,0.2,0,0.3,0,0.3,-0.5,0,-0.4,-0.3,-0.6,-0.3,0,-0.3]},
'225': {cat:'環境デザイン',sc:'関係(人・社会性)',name:'入れてと言えない',age:'3',des:'ごっこ遊びに興味はあるが、自分から「入れて」と言えず、遊んでいる輪の周りをウロウロしている。時折、無言でおもちゃを奪ってしまいトラブルになる。',vec:[-0.1,0,0,0,0.3,0,-0.6,-0.3,-0.2,-0.2,-0.5,0,-0.5,0,-0.4]},
'226': {cat:'環境デザイン',sc:'関係(人・社会性)',name:'集団ゲーム理解難',age:'4',des:'集団でのゲーム遊びの際、ルールが理解できず、自分の思い通りにならないと途中で抜け出してしまう。その後は一人で部屋の隅にいることが多い。',vec:[-0.1,0,0,0,0,-0.6,0,-0.7,-0.3,-0.6,-0.4,0.2,-0.5,0,-0.5]},
'227': {cat:'環境デザイン',sc:'関係(人・社会性)',name:'友だち固定化',age:'5',des:'特定の友だちとだけ強く結びつき、他の子どもが遊びに入ろうとすると「ダメ」と言って拒絶してしまう。グループが固定化し、遊びが広がらない。',vec:[-0.1,0,0,0,0.3,0,0.2,0,0,-0.2,-0.6,0.4,-0.5,0,0.2]},
'228': {cat:'環境デザイン',sc:'関係(人・社会性)',name:'言葉で伝える苦手',age:'3',des:'自分の思いを言葉で伝えるのが苦手で、友だちにおもちゃを取られそうになると、すぐに手や足が出てしまう。',vec:[-0.1,0,0,0,0,0,-0.6,0,0,-0.7,-0.5,0,-0.6,0,0]},
'229': {cat:'環境デザイン',sc:'関係(人・社会性)',name:'一人で抱え込む',age:'5',des:'困ったことがあっても保育者に助けを求めることができず、一人で抱え込んで泣いてしまうことが多い。',vec:[0,0,0,0,0,0,0,0,0,-0.6,0,-0.7,0,0,0]},
'230': {cat:'環境デザイン',sc:'時間(活動・見通し)',name:'活動終わり・場所移動',age:'4',des:'活動の終わりや場所の移動でこだわりが強く出る。見通しがもてないと不安になり、次の活動に移れない。',vec:[-0.1,0,-0.3,0,0,0,0,-0.8,0,-0.6,0,0,-0.7,0,0]},
'231': {cat:'環境デザイン',sc:'時間(活動・見通し)',name:'昼寝不安',age:'2',des:'お昼寝の時間が近づくと落ち着きがなくなり、布団に入るのを強く拒否する。部屋が暗くなることへの不安感が強い。',vec:[-0.1,0,-0.6,0,0.3,0,0,-0.5,0,-0.5,0,-0.3,-0.6,0,0]},
'232': {cat:'環境デザイン',sc:'時間(活動・見通し)',name:'外遊びから戻らない',age:'3',des:'外遊びから室内に戻る際、まだ遊びたい気持ちが強く、保育者が声をかけても逃げ回ってなかなか戻ろうとしない。',vec:[-0.2,0,0,0,0.7,-0.3,0,-0.6,0,-0.5,0,0.3,-0.7,0,0]},
'233': {cat:'環境デザイン',sc:'時間(活動・見通し)',name:'複数手順理解難',age:'4',des:'給食の準備など、複数の手順がある活動において、次に何をすればよいか分からず立ち止まってしまう。周りの子の動きを見てから遅れて行動する。',vec:[0,0,0,0,0,0,0,-0.7,0.4,0,0,0,0,0,0]},
'234': {cat:'環境デザイン',sc:'時間(活動・見通し)',name:'いつもと違うと落ち着かない',age:'5',des:'行事の練習など、いつもと違うスケジュールの日は朝から落ち着かず、些細なことで友だちと口論になりやすい。',vec:[-0.1,0,-0.3,0,0,0,0,-0.7,0,-0.5,-0.4,0,-0.6,0,-0.2]},
'235': {cat:'環境デザイン',sc:'時間(活動・見通し)',name:'1つの遊び集中できない',age:'4',des:'自由遊びの時間、一つの遊びに集中できず、次々と違うおもちゃを出してはすぐに飽きてしまう。遊び込める時間がないように見える。',vec:[-0.1,0,-0.3,0,0.3,0,0,-0.5,-0.2,-0.2,0,0,-0.4,0,0]},
'236': {cat:'環境デザイン',sc:'時間(活動・見通し)',name:'生活習慣で時間かかる',age:'3',des:'手洗いや着替えなど、生活習慣の場面で時間がかかり、次の活動に遅れてしまうことが多い。急かされるとパニックになる。',vec:[-0.1,0,-0.3,-0.2,0,-0.2,0,-0.6,-0.3,-0.7,0,0,-0.6,0,0]},
'237': {cat:'環境デザイン',sc:'場(空間・物)',name:'遊びが広がらない  ',age:'4',des:'いつも同じ車のおもちゃにだけ興味を示し、一人で遊ぶことを繰り返している。他のことに興味を持たず、遊びが深まらない。',vec:[-0.1,0,0.2,0,0.3,0,0,-0.3,-0.4,0,-0.6,0,-0.7,0,-0.5]},
'238': {cat:'環境デザイン',sc:'場(空間・物)',name:'密集トラブル',age:'3',des:'クラスの人気のコーナーでよく遊んでいるが、他の子達とよくトラブルが起きる。',vec:[0,0,0,0,0.3,0,0,0,0,-0.2,-0.5,0,-0.3,0,0.2]},
'239': {cat:'環境デザイン',sc:'場(空間・物)',name:'集中できない',age:'5',des:'室内での活動中、壁面の掲示物や窓の外にばかり興味を示し、集中が続かない。',vec:[-0.1,0,-0.6,0,0.3,-0.3,0,-0.4,0,-0.4,-0.2,0,-0.3,0,-0.3]},
'240': {cat:'環境デザイン',sc:'場(空間・物)',name:'片付けできない',age:'3',des:'片付けの場所をよく理解できず、見通しが持てず、片付けの声かけをしても動こうとしない。',vec:[0,0,0,0,-0.3,-0.4,0,-0.7,-0.3,-0.4,0,0,-0.5,0,0]},
'241': {cat:'環境デザイン',sc:'場(空間・物)',name:'転倒しやすい',age:'2',des:'探索意欲はあるが、転倒しやすいため保育者が制止することが多い。',vec:[-0.6,-0.3,0,0,0.7,0,0,0,0,0,0,0,0,0,0]},
'242': {cat:'環境デザイン',sc:'場(空間・物)',name:'散らかす',age:'2',des:' 室内遊びの際、特定のおもちゃ箱の中身をすべて床に出すことを繰り返す。出したおもちゃで遊ぶわけではなく、散乱した状態のまま別の場所へ移動してしまう。',vec:[-0.1,0,0.3,0,0.6,-0.3,0,-0.6,-0.3,0,-0.3,0,-0.5,0,-0.2]},
'243': {cat:'環境デザイン',sc:'場(空間・物)',name:'ハサミのり',age:'3',des:'製作コーナーでハサミやのりを使いたがるが、道具の置き場所が定まっておらず、使いたい時に見つからないと癇癪を起こす。',vec:[-0.1,0,-0.3,-0.2,0.6,0,-0.3,-0.5,0,-0.6,0,0.2,-0.7,0,0]},
'244': {cat:'環境デザイン',sc:'場(空間・物)',name:'ブロック壊したくない',age:'4',des:'ブロック遊びが好きだが、片付けの時間になると作った作品を「壊したくない」と強く泣いて抵抗する。',vec:[0.2,0.1,0,0.1,0.4,0.1,-0.3,-0.6,0.1,-0.7,0,0.2,-0.7,0,0.3]},
'245': {cat:'環境デザイン',sc:'場(空間・物)',name:'絵本落ち着かない',age:'5',des:'絵本コーナーで本を読もうとするが、他の子どもたちが走り回る動線と近いためか、落ち着いて読めずイライラしていることが多い。',vec:[-0.1,0,-0.6,0,0,0,0,0,0,-0.5,0,0,-0.3,0,-0.4]},
'246': {cat:'環境デザイン',sc:'場(空間・物)',name:'食事席わからず',age:'3',des:'食事の際、自分の席がどこか分からずウロウロしてしまう。席に着いても、隣の子との距離が近すぎると手が出てしまうことがある。',vec:[-0.1,0,-0.3,0,0,-0.2,0,-0.6,0,-0.4,-0.5,0,-0.2,0,-0.4]},
'247': {cat:'環境デザイン',sc:'場(空間・物)',name:'トイレ嫌がる',age:'4',des:'トイレに行くのを嫌がる。特に薄暗い天気や時間帯の時や、床が濡れていると中に入ろうとせず、排泄を我慢してしまうことがある。',vec:[-0.1,0,-0.7,0,0,0,0,0,0,-0.3,0,0,-0.2,0,0]},
'248': {cat:'環境デザイン',sc:'場(空間・物)',name:'走り回り座れない',age:'2',des:'どこでも走り回り、朝の会や帰りの会でも中々座れない様子が目立つ。',vec:[0.2,0.1,0,0,0.8,-0.3,0,-0.6,0,-0.4,0,0,-0.5,0,0]},
'249': {cat:'環境デザイン',sc:'環境・複合的要因',name:'保育室に入らない',age:'4',des:'（場・時間）保育室への入室を拒否することが多い。特に朝の時間帯と活動の切り替え時に強く抵抗する。音や光への敏感さがある。',vec:[-0.1,0,-0.7,0,0,0,0,-0.6,0,-0.5,0,0,-0.7,0,-0.5]},
'250': {cat:'環境デザイン',sc:'環境・複合的要因',name:'多動で落ち着かない',age:'4',des:'（場・関係）室内でも常に動き回り、活動に集中できない。コーナーに落ち着く場所がなく、友だちとのトラブルが多い。',vec:[-0.2,0,-0.5,0,0.8,-0.3,0,-0.6,0,-0.6,-0.7,0,-0.4,0,-0.5]},
'251': {cat:'環境デザイン',sc:'環境・複合的要因',name:'朝泣く・荷物置き場',age:'2',des:'（場・時間）朝の登園時、保護者と離れる際に激しく泣く。保育室に入っても、自分の荷物をどこに置けばよいか分からず、しばらく入り口付近で立ち尽くしている。',vec:[-0.1,0,-0.3,0,0,-0.2,-0.3,-0.6,-0.2,-0.2,0,-0.5,-0.3,0,-0.4]},
'252': {cat:'環境デザイン',sc:'環境・複合的要因',name:'ままごと道具をとる',age:'4',des:'（場・関係）ままごとコーナーで遊ぶ際、必要な道具が揃っていないと、他の場所から勝手に持ってきてしまい、そこで遊んでいた子とトラブルになる。',vec:[-0.1,0,0,0,0.3,0,0,-0.4,0,-0.3,-0.5,0.2,-0.5,0,0]},
'253': {cat:'環境デザイン',sc:'環境・複合的要因',name:'説明をきかずに話す',age:'5',des:'（関係・時間）一斉活動の際、保育者の説明を最後まで聞けず、自分の話したいことを一方的に話し始めてしまう。活動の進行が妨げられることが多い。',vec:[0,0,0,0,0.3,-0.3,0.4,-0.6,0,-0.5,-0.4,0.2,-0.6,0,-0.3]},
'254': {cat:'環境デザイン',sc:'環境・複合的要因',name:'片付け隠れる',age:'3',des:'（場・関係・時間）片付けの時間になると、いつも特定の棚の裏に隠れてしまう。保育者が声をかけても出てこず、友だちが手伝おうとすると怒って手が出る。',vec:[-0.1,0,-0.3,0,0.2,-0.2,-0.3,-0.7,0,-0.6,-0.5,0.3,-0.7,0,-0.4]},
'255': {cat:'環境デザイン',sc:'環境・複合的要因',name:'先を急ぐ',age:'5',des:'（場・時間）落ち着きがない・先を急ぐ・一番になりたい気持ちが強い。活動が終わっていないのに次へ進もうとすることがある。１つ１つ丁寧にやり遂げる経験をさせてあげたい。',vec:[0.1,0.2,-0.2,0.1,0.6,0.2,0.3,-0.5,0.3,-0.3,-0.4,0.2,-0.5,0,0]},
'256': {cat:'保育者協働',sc:'家庭連携が困難',name:'家庭との温度差大  ',age:'3',des:'園では不安定で泣くことが多く、活動の大半は参加できていないが、保護者は「家では大丈夫」と言い、支援の必要性が伝わりにくい。チームでどう共有し、誰がどのように伝えるか悩んでいる。',vec:[-0.2,-0.2,-0.3,-0.1,-0.3,-0.2,-0.2,-0.4,-0.2,-0.7,-0.4,-0.3,-0.6,-0.7,-0.4]},
'257': {cat:'保育者協働',sc:'家庭連携が困難',name:'手が出る・物にあたる',age:'3',des:'感情を抑えきれず手が出たり、物にあたったりする。保護者が子どもの課題を認識していないようで、保育園での困りごとを伝えても「家では問題ない」と返ってくることが多い。保護者との信頼関係を築き、子どもの状況を共有するためのチームでのアプローチを検討したい。',vec:[0,0,0,0,0,0,0,0,0,-0.7,-0.3,0,-0.5,-0.8,0]},
'258': {cat:'保育者協働',sc:'家庭連携が困難',name:'トラブル頻繁と保護者不安',age:'2',des:'衝動を抑えきれず、友だちとのトラブルが頻繁でケガをさせること、ケガをすることが多い。保護者に相談したいが、保護者の不安が強く、些細な怪我や行動にも敏感に反応し、毎日長時間の説明が必要になる。チームでの役割分担ができず、担任が抱え込んでしまう。',vec:[0,0,0,0,0.3,0,0,-0.4,0,-0.7,-0.6,-0.4,-0.6,-0.5,-0.3]},
'259': {cat:'保育者協働',sc:'家庭連携が困難',name:'保護者の過度な要求',age:'2',des:'特定の保護者から、子どもの食事や活動内容について過度な要求やクレームが頻繁に寄せられる。担任一人で対応しきれないため、チームとしてどのように対応し、保護者との良好な関係を維持していくか。子どもは欠席が多く、感情的に不安定であり、保育者との信頼関係も育ちにくい。',vec:[0,0,0,0,0,0,0,0,0,-0.5,0,-0.4,0,-0.6,0]},
'260': {cat:'保育者協働',sc:'家庭連携が困難',name:'保護者非協力と子の衝動性',age:'3',des:'衝動を抑えきれず、友だちを押したり、物を投げたりする。危険な場面が増え、園として保護者に相談したい状況。しかし保護者には仕事の多忙を理由に話し合いを断られ続けている。子どもの行動改善に向けた協働が進まない。',vec:[0.1,0,-0.3,0,0.6,-0.2,-0.2,-0.4,-0.2,-0.8,-0.6,0,-0.5,-0.8,-0.4]},
'261': {cat:'保育者協働',sc:'個別支援',name:'大人の配置が合わず',age:'2',des:'衝動的な子や情緒不安の子、動きの激しい子が多い時間帯に保育者が少なく、見守りが追いつかない。逆に落ち着いた時間帯に大人が多く偏る。',vec:[0,0,0,0,0.3,0,0,0,0,-0.4,-0.2,0,-0.3,0,0]},
'262': {cat:'保育者協働',sc:'個別支援',name:'関わりが偏る',age:'3',des:'情緒が不安定でこだわりや切替困難が見られる特定の子どもへの対応に時間が取られ、他の子どもへの声かけが少なくなる。結果として、遊びが単調になりがち。',vec:[0,0,-0.5,0,0,0,0,0,0,-0.6,-0.4,-0.5,-0.5,0,-0.5]},
'263': {cat:'保育者協働',sc:'個別支援',name:'支援の一貫性が保てず',age:'5',des:'こだわりが強く、対応の仕方によって落ち着きが大きく変わる。保育者によって声かけが違い、子どもが混乱してしまう。',vec:[-0.1,0,-0.3,0,0,0,0,-0.4,0,-0.5,-0.2,0,-0.6,-0.3,-0.2]},
'264': {cat:'保育者協働',sc:'個別支援',name:'支援必要な複数の子',age:'3',des:'衝動性の高い子が数名おり、活動中に離席が多い。担任が一人で見ようとしてしまい、補助者の動きが活かしきれていない。',vec:[0,0,0,0,0.5,0,0,-0.5,0,-0.6,-0.3,-0.2,-0.6,0,-0.3]},
'265': {cat:'保育者協働',sc:'個別支援',name:'専門機関と連携が必要か',age:'5',des:'指示が通らなかったり、感覚過敏や集団不適応が見られるが、保護者が相談に消極的。担任だけで抱え込んでしまい、チームとしての役割分担が曖昧になっている。',vec:[-0.2,-0.1,-0.6,-0.1,0,-0.6,-0.2,-0.4,-0.2,-0.5,-0.5,-0.3,-0.6,-0.7,-0.5]},
'266': {cat:'保育者協働',sc:'個別支援',name:'特定の活動への参加拒否',age:'4',des:'戸外活動や特定の製作活動など、集団での活動に頑なに加わろうとしない。無理強いするとパニックになることもあるため、個別の支援計画とチームでの連携が必要。',vec:[-0.1,0,-0.5,0,-0.6,0,0,-0.4,0,-0.6,-0.5,0,-0.5,0,-0.5]},
'267': {cat:'保育者協働',sc:'個別支援',name:'発達の偏りへの対応',age:'3',des:'言葉の発達が遅い、または特定の感覚に過敏な様子が見られる。専門機関との連携も視野に入れつつ、日々の保育の中でチームとしてどのようにサポートしていくべきか悩んでいる。',vec:[-0.1,0,-0.5,0,0,-0.4,-0.5,0,0,-0.2,-0.5,0,-0.1,0,-0.5]},
'268': {cat:'保育者協働',sc:'集団での課題',name:'遊び広がり支える配置難',age:'5',des:'ごっこ遊びが盛り上がるが、複数のグループに分かれるため、どの大人がどこを見るか曖昧になる。大人がいないグループでは役割分担がうまくいかず、ケンカや中断が増える。大人側では、誰がどの遊びを見守るかの合意がなく、場当たり的な配置になっている。',vec:[0.3,0.2,0.1,0.2,0.7,0.3,0.4,0.2,0.3,-0.4,-0.3,0.1,-0.5,0,0.1]},
'269': {cat:'保育者協働',sc:'集団での課題',name:'同じ子達のトラブル多',age:'4',des:'特定の３人が遊びの中でぶつかりやすく、担任が仲裁に追われる。副担任との役割分担がうまくいかず、対応が属人的になっている。',vec:[-0.1,0,0,0,0.3,0,0,-0.3,0,-0.5,-0.4,0,-0.3,0,-0.2]},
'270': {cat:'保育者協働',sc:'集団での課題',name:'活動意欲低下',age:'2',des:'新しい活動を提案しても、子どもたちの反応が薄く、なかなか意欲が引き出せない。クラス全体の興味関心を引き出すための工夫や、チームでのアイデア出しが必要。',vec:[0,0,0,0,-0.5,0,0,-0.4,0,-0.3,0,-0.1,-0.4,-0.3,0]},
'271': {cat:'保育者協働',sc:'集団での課題',name:'活動への集中困難',age:'3',des:'数人の子どもたちが、お話の時間や製作活動中に席を離れたり、他の子にちょっかいを出したりして、活動が中断されがち。集中力を高めるための環境設定や、チームでの声かけの統一が必要。',vec:[0,0,0,0,0.3,-0.3,0,-0.6,0,-0.5,-0.4,0,-0.5,-0.3,-0.3]},
'272': {cat:'保育者協働',sc:'集団での課題',name:'集団トラブル多発',age:'4',des:'集団活動で他児とのトラブルが絶えず、担任一人での対応に限界を感じる。担任と補助の先生との連携不足で、見守り体制や共通の働きかけが曖昧。',vec:[0,0,0,0,0,0,0,-0.6,0,-0.7,-0.7,-0.6,-0.5,0,-0.5]},
'273': {cat:'保育者協働',sc:'集団での課題',name:'小集団担当固定と依存',age:'4',des:'多動や衝動的な子が数名おり、いつも同じ保育者がその子達を含めた同じグループを見るため、グループが特定の保育者に依存し、他のグループとの交流が少なくなりがち。これにより、子どもたちは特定の大人への信頼が偏り、他児との関係が育ちにくく、活動の切り替えも困難な様子。',vec:[0,0,0,0,0,0,0,0,0,-0.5,-0.4,-0.5,-0.5,0,-0.4]},
'274': {cat:'保育者協働',sc:'集団での課題',name:'特定グループトラブル',age:'5',des:'いつも同じ数人の子どもたちが集まり、他の子どもたちを仲間外れにしたり、おもちゃの取り合いで喧嘩が頻繁に起こる。このグループへの介入方法や声かけ方針が統一されていないので、活動の見通しや保育者との信頼関係も育っていないように感じる。他の子どもたちへの影響などを含めて、チームで話し合いたい。',vec:[0,0,0,0,0,0,0,-0.6,0,-0.6,-0.7,-0.5,-0.5,0,-0.5]},
'275': {cat:'保育者協働',sc:'大人不信・拒否',name:'大人不信',age:'5',des:'保育者の声かけを無視したり、手助けを拒否することが多い。特定の保育者にだけは少し心を開くが、他の大人には強く拒否する。チーム内で一貫した関わり方を共有し、信頼関係を築くためのアプローチを検討したい。',vec:[-0.1,0,0,0,0,0,0,-0.3,0,-0.3,0,-0.7,-0.3,0,0]},
'276': {cat:'保育者協働',sc:'大人不信・拒否',name:'特定の大人しか心を開かず  ',age:'4',des:'担任には甘えるが、副担任には距離を置く。副担任が声をかけると固まり、活動に入れないことがある。チームで関係構築の役割をどう分担するか悩んでいる。',vec:[0,0,0,0,0,0,0,0,0,0,0,-0.3,-0.4,0,0]},
'277': {cat:'保育者協働',sc:'大人不信・拒否',name:'特定の大人しか心を開かず  ',age:'4',des:'特定の保育者にだけ強く甘え、他の保育者には距離を置く。担任が主に対応しているため、副担任が関わろうとすると固まったり、活動に入れなかったりする。大人側では、役割分担が曖昧で、誰がどの場面で関わるか決まっていない。  その結果、子どもは安心できる大人がいない場面で不安が強まり、泣いたり活動に参加しなかったりすることが増えている。',vec:[0,0,0,0,0,0,0,-0.4,0,-0.5,-0.2,-0.6,-0.3,-0.4,-0.3]},
'278': {cat:'保育者協働',sc:'担任交代・クラス替え',name:'前担任関係引継ぎ難',age:'3',des:'クラス替えで新しい担任になり、前の担任との関係を引き継ぐのが難しい。信頼関係を一から築きなおす必要がある中で、チームとしてどのように子どもたちをサポートし、スムーズな移行を促すか。',vec:[0,0,0,0,0,0,0,-0.6,0,-0.6,0,-0.5,-0.5,0,0]},
'279': {cat:'保育者協働',sc:'担任交代・クラス替え',name:'クラス替え後の役割分担が曖昧  ',age:'3',des:'新しい担任・保育者チームになり、前年度の関係が引き継がれておらず、誰がどの場面を担当するか決まっていない。結果、場面ごとの動きがちぐはぐになっている。子どもたちは新しい大人の声かけに慣れず、朝の不安や活動の中断、保護者の不安が増えている。大人側では、前担任との情報共有が不十分で、子どもの特性や安心ポイントが伝わっていない。',vec:[0,0,0,0,0,0,0,-0.4,0,-0.5,-0.3,-0.5,-0.6,-0.6,-0.3]},
'280': {cat:'保育者協働',sc:'担任交代・クラス替え',name:'個のこだわり対応ズレ',age:'3',des:'進級に伴い担任や補助の先生が全員交代した。新しい環境に馴染めず、特定のおもちゃを独占したり、自分のこだわりが通らないと激しく泣き叫んだりする子が数名いる。新担任の間で「今は気持ちを受け止めて寄り添う時期」とする意見と、「集団のルールを教えるべき」とする意見で対応が分かれてしまい、一貫性のない関わりに子どもたちがさらに混乱して、クラス全体の落ち着きがなくなっている。',vec:[0,0,0,0,0,0,0,-0.6,0,-0.7,-0.5,-0.6,-0.7,0,-0.4]},
'281': {cat:'保育者協働',sc:'担任交代・クラス替え',name:'クラス統合による集団対立',age:'4',des:'2クラスが1クラスに統合される形でのクラス替えがあった。旧クラスごとのグループに分かれてしまい、互いに排他的な雰囲気が生まれている。新担任チームは、それぞれの旧クラスから持ち上がった保育者で構成されているが、お互いに「自分の知っている子」ばかりを目で追ってしまい、クラス全体を俯瞰した環境設定や、グループ間の橋渡しとなる声かけができていない。',vec:[0,0,0,0,0,0,0,-0.6,0,-0.5,-0.7,-0.3,-0.6,0,-0.7]},
'282': {cat:'保育者協働',sc:'担任交代・クラス替え',name:'強い執着と役割分担崩れ',age:'5',des:'環境の変化に敏感な子が、進級後、園庭や廊下で前担任の姿を見つけると、今の活動を放り出して走り寄ってしまい、離れようとしない。新担任チームは、その子を連れ戻す対応に1人の保育者が付きっきりになってしまい、残されたクラス集団の保育をもう1人がワンオペで回す状態が常態化している。チーム内での明確な役割分担や、前担任を巻き込んだ引き継ぎの作戦が立てられていない。',vec:[0.2,0.1,-0.5,0.1,0.6,0.1,0.2,-0.6,0.1,-0.6,0,-0.5,-0.7,0,-0.2]},
'283': {cat:'保育者協働',sc:'担任交代・クラス替え',name:'声トーン変化で子フリーズ',age:'2',des:'1歳児クラスから2歳児クラスへ進級し、保育者集団の顔ぶれが変わった。前年度の担任は穏やかで静かな声かけを徹底していたが、新担任は元気でハキハキとした声かけを好むタイプ。子どもたちは大人の声の大きさやトーンの変化に圧倒され、指示を聞くどころか、大人が声を出すたびに動きを止めて顔色を伺うようになってしまった。保育者間で「前年度どんな雰囲気で過ごしていたか」のすり合わせができていない。',vec:[0,0,-0.5,0,-0.4,-0.5,-0.3,-0.6,-0.3,-0.6,-0.3,-0.5,-0.6,-0.4,-0.3]},
'284': {cat:'保育者協働',sc:'保育者側問題',name:'活動の進行役が偏る  ',age:'5',des:'担任が全体の進行を担い、副担任は補助に回りすぎている。子どもたちは担任の指示がないと動けず、主体的に動く場面が少ない。大人側では、役割分担が固定化し、柔軟な協働ができていない。 そのため、活動が滞ると子どもたちの集中が切れ、中断やトラブルが増える。',vec:[0,0,0,0,-0.3,-0.4,-0.2,-0.5,-0.3,-0.4,-0.2,-0.4,-0.5,0,0]},
'285': {cat:'保育者協働',sc:'保育者側問題',name:'クラスの雰囲気が安定しない  ',age:'3',des:'活動の切り替えで混乱が多く、保育者同士の声かけがバラバラ。チームとしての共通理解が不足している。',vec:[0,0,0,0,0,0,0,-0.6,0,-0.5,-0.3,0,-0.7,0,-0.4]},
'286': {cat:'保育者協働',sc:'保育者側問題',name:'担任・副担の伝達食い違い',age:'2',des:'担任と副担任で保護者に伝える内容が微妙に異なり、保護者が混乱する。「誰が何を伝えるか」の線引きが曖昧。子ども達は朝の登園時に不安定になることが増えた',vec:[0,0,0,0,0,0,0,0,0,-0.5,0,-0.3,-0.4,-0.6,0]},
'287': {cat:'保育者協働',sc:'保育者側問題',name:'保育観違いが子に影響',age:'4',des:'遊びの見守り方や介入のタイミングが保育者によって異なり、子どもが混乱している。 ある保育者はすぐに仲裁し、別の保育者は見守るため、子どもは「どこまで自分でやっていいのか」が分からない。大人側では、保育観のすり合わせが不十分で、共通の方針が持てていない。その結果、子どもたちは活動中に迷いや不安が生じ、落ち着かない様子が増えている。',vec:[0,0,0,0,0,0,0,-0.5,0,-0.4,0,-0.3,-0.5,0,0]},
'288': {cat:'保育者協働',sc:'保育者側問題',name:'保育者間の意見相違',age:'3',des:'クラス担任と補助の先生の間で、特定の情緒が不安定で切り替え困難な子どもへの関わり方やクラス運営の方針について意見が食い違うことがある。チームとして共通認識を持ち、一貫した保育を提供するための話し合いの場やルールの設定が必要。',vec:[0,0,0,0,0,0,0,-0.5,0,-0.5,0,-0.3,-0.6,-0.6,-0.2]},
'289': {cat:'育ちの時系列',sc:'環境の変化',name:'環境が変わった',age:'2',des:'進級・クラス替えで担任が変わり、元気がなくなった。以前はできていたことが難しくなっている。',vec:[0,0,0,0,-0.4,0,-0.3,-0.4,0,-0.5,-0.2,-0.4,-0.4,0,-0.3]},
'290': {cat:'育ちの時系列',sc:'環境の変化',name:'初めての集団生活',age:'2',des:'保育園に入園して2ヶ月。登園時は母親から離れられず泣くことが多いが、好きな電車のおもちゃを見つけると落ち着いて遊び始める。他の子が近づくとおもちゃを抱え込んでしまうが、保育者が仲立ちすると少しずつ共有しようとする姿も見られる。',vec:[0,0,0,0,0.3,0,0,-0.3,0,-0.3,-0.3,0,-0.3,0,-0.2]},
'291': {cat:'育ちの時系列',sc:'環境の変化',name:'就学への期待と不安',age:'5',des:'小学校への進学を意識し、ひらがなの読み書きや数の概念に興味を持つようになった。小学校ごっこでは、先生役になって友だちに教えることを楽しむ。一方で、「小学校に行ったら友だちできるかな」「勉強難しいかな」と、期待とともに不安な気持ちを口にすることもある。',vec:[0.2,0.2,0.1,0.1,0.5,0.6,0.6,0.6,0.5,0,0.5,0.5,0.3,0,0.5]},
'292': {cat:'育ちの時系列',sc:'環境の変化',name:'安心できる相手限られ',age:'3',des:'特定の保育者にはよく甘えるが、他の大人が関わると固まってしまう。家庭でも同じ傾向があり、環境の変化に敏感な様子がある。',vec:[-0.1,0,-0.3,0,0,0,0,-0.4,0,0.2,-0.3,-0.5,-0.5,0.2,-0.3]},
'293': {cat:'育ちの時系列',sc:'環境の変化',name:'不安が行動に出やすい',age:'2',des:'朝の別れ際に泣くことが増え、活動に入るまで時間がかかる。慣れた遊びには安心して取り組めるが、新しい場面では固まることが多い。',vec:[-0.1,0,-0.3,0,-0.2,0,-0.3,-0.5,0,-0.4,0,-0.2,-0.5,0,0]},
'294': {cat:'育ちの時系列',sc:'環境の変化',name:'環境変化に揺れ',age:'2',des:' 進級後、部屋や大人が変わったことで落ち着かない様子が続いている。以前は楽しんでいた遊びにも入りにくくなっている。',vec:[-0.1,0,-0.3,0,-0.5,0,-0.3,-0.5,0,-0.5,-0.3,-0.4,-0.5,0,-0.4]},
'295': {cat:'育ちの時系列',sc:'社会性',name:'変容の途中にある',age:'5',des:'1年前は集団に全く入れなかったが、最近は少し近づけるように。まだ輪の中には入れないが確かな変化がある。',vec:[-0.1,0,0,0,0.2,0,0,0,0,0.1,-0.5,0.1,0.1,0,-0.5]},
'296': {cat:'育ちの時系列',sc:'社会性',name:'模倣と想像の世界',age:'3',des:'保育者が絵本を読んだ後、すぐにその登場人物になりきって遊び始める。友だちと一緒に「お母さんごっこ」や「ヒーローごっこ」を楽しむが、役割分担やストーリー展開で意見がぶつかることもある。想像の世界が広がり、遊びが複雑になってきた。',vec:[0,0,0,0,0.3,0,0.4,0.5,0.7,0,0.4,0.3,0,0,0.4]},
'297': {cat:'育ちの時系列',sc:'社会性',name:'友だちとの協同遊び',age:'4',des:'特定の友だちと深く関わるようになり、一緒に秘密基地を作ったり、ルールのある鬼ごっこを楽しんだりする。友だちの気持ちを察する場面も増え、「〇〇ちゃん、悲しそうだからやめよう」と声をかける姿も見られる。しかし、自分の意見が通らないと不満を露わにすることもある。',vec:[0.3,0.2,0.2,0.3,0.6,0.4,0.5,0.5,0.4,-0.2,0.6,0.5,-0.3,0,0.6]},
'298': {cat:'育ちの時系列',sc:'社会性',name:'役割意識とリーダーシップ',age:'5',des:'クラスの係活動や当番活動に意欲的に取り組み、「私がやる！」「みんなで協力しよう」と友だちに声をかける場面が増えた。年下の子の面倒を見たり、困っている友だちを助けたりと、集団の中で自分の役割を意識し、リーダーシップを発揮する姿が見られる。',vec:[0.3,0.3,0.2,0.3,0.7,0.5,0.8,0.7,0.6,0.6,0.8,0.7,0.6,0,0.8]},
'299': {cat:'育ちの時系列',sc:'社会性',name:'孤立しがち',age:'3',des:'友だちの輪の中に入ろうとせず、一人で遊ぶことが多い。他の子が近づいてきても目を合わせようとせず、声をかけられても反応が薄い。友だちとの関わり方が分からず、どのように遊びに参加すれば良いか戸惑っているように見える。',vec:[0,0,0,0,0,0,0,-0.3,0,0,-0.6,0,-0.3,0,-0.5]},
'300': {cat:'育ちの時系列',sc:'社会性',name:'ルールの理解と遵守の困難',age:'5',des:'集団のルールや約束事を理解し、守ることが難しい。自分のしたいことを優先してしまい、友だちとのトラブルが絶えない。友だちの気持ちを想像することが苦手で、相手が嫌がっていることに気づかないことがある。集団の中で孤立したり、逆にトラブルメーカーになったりすることがある。',vec:[0,0,0,0,0.3,0,0,-0.4,0,-0.6,-0.7,0,-0.5,0,-0.5]},
'301': {cat:'育ちの時系列',sc:'社会性',name:'関わりたい気持ちはある',age:'5',des:' 友だちの遊びをじっと見ているが、自分から入るのは難しい。声をかけられると嬉しそうに近づくが、長く続かず離れてしまう。',vec:[-0.1,0,0,0,-0.3,0,-0.4,0,0,0,-0.5,0.2,0,0,-0.4]},
'302': {cat:'育ちの時系列',sc:'社会性',name:'自分の世界が強い',age:'5',des:'一人遊びが中心で、集中すると長時間同じ遊びを続ける。こだわりの強さもあるが、遊びの中で豊かな発想が見られる。',vec:[-0.1,0,0,0,0.3,0,0.2,0,0,0,-0.4,0,-0.4,0,-0.3]},
'303': {cat:'育ちの時系列',sc:'社会性',name:'友だち距離感つかめず',age:'3',des:'3歳児。 遊びたい気持ちが強く、急に近づきすぎて相手を驚かせてしまうことがある。悪気はなく、嬉しい気持ちがそのまま行動に出ている。',vec:[-0.1,0,-0.3,0,0.7,0,0,-0.4,0,-0.3,-0.3,0,-0.4,0,-0.2]},
'304': {cat:'育ちの時系列',sc:'社会性',name:'仲間意識芽生え',age:'4',des:' 友だちの名前をよく呼び、一緒に遊びたい気持ちが強くなってきた。ただし、思いが強すぎて意見がぶつかる場面も増えている。',vec:[-0.1,0,0,0,0.5,0,0.3,0,0,-0.3,0.3,0.2,-0.3,0,0.3]},
'305': {cat:'育ちの時系列',sc:'社会性',name:'探究心と試行錯誤',age:'4',des:'園庭でダンゴムシを見つけると、図鑑で調べたり、飼育ケースに入れて観察したりと、興味が尽きない。どうすればダンゴムシが快適に過ごせるか、友だちと話し合いながら土や葉っぱを集めるなど、試行錯誤を繰り返す。失敗しても諦めずに何度も挑戦する粘り強さが出てきた。',vec:[0.1,0.1,0.2,0.2,0.6,0.5,0.5,0.7,0.6,0.6,0.7,0.5,0.6,0,0.6]},
'306': {cat:'育ちの時系列',sc:'情緒',name:'感情の波が大きい',age:'4',des:'楽しい時は全力で遊ぶが、思い通りにならないとすぐに泣き崩れる。気持ちの回復には時間がかかる。',vec:[0.3,0.2,0,0,0.7,0,0,-0.3,0,-0.6,-0.2,0.2,-0.5,0,0]},
'307': {cat:'育ちの時系列',sc:'情緒',name:'自己主張と葛藤',age:'3',des:'何でも「自分で！」と主張し、着替えや食事も自分でやりたがる。しかし、うまくいかないとすぐに「できない！」と投げ出し、保育者に手伝ってもらおうとしない。友だちとの玩具の取り合いでは、言葉よりも手が出てしまうことが多い。',vec:[0.3,0.2,0,0,0.7,0.1,-0.3,-0.2,0.1,-0.5,-0.4,0.2,-0.4,0,0]},
'308': {cat:'育ちの時系列',sc:'情緒',name:'感情コントロール難',age:'3',des:'些細なことで感情が爆発し、一度泣き出すと長時間泣き止まない。自分の思い通りにならないと、物を投げたり、友だちを叩いたりすることがある。気持ちの切り替えが難しく、落ち着くまでに時間がかかるため、集団活動への参加が難しい場面が見られる。',vec:[0,0,0,0,0,0,0,0,0,-0.8,-0.6,0,-0.8,0,-0.5]},
'309': {cat:'育ちの時系列',sc:'情緒',name:'自己肯定感の低さ',age:'5',des:'失敗を極度に恐れ、新しいことへの挑戦を避ける傾向がある。「どうせできない」「僕なんか」といった否定的な言葉を口にすることが多い。友だちと自分を比較して落ち込んだり、褒められても素直に受け入れられなかったりする。自信のなさから、消極的な態度が見られる。',vec:[0,0,0,0,-0.7,0,-0.3,-0.4,-0.3,-0.6,-0.3,0,-0.5,0,-0.3]},
'310': {cat:'育ちの時系列',sc:'情緒',name:'こだわりが強',age:'2',des:'気に入った順番ややり方が崩れると泣き崩れることが増えた。以前は大人の声かけで切り替えられたが、最近は時間がかかるようになっている。',vec:[0,0,0,0,0,0,0,0,0,-0.5,0,0,-0.7,0,0]},
'311': {cat:'育ちの時系列',sc:'情緒',name:'切り替え速くなった',age:'4',des:' 以前は怒ると長く引きずっていたが、最近は大人の声かけで落ち着くまでの時間が短くなってきた。自分で気持ちを言葉にする姿も少しずつ見られる。',vec:[0,0,0,0,0,0,0.3,0,0,0.4,0,0.3,0.3,0,0]},
'312': {cat:'育ちの時系列',sc:'情緒',name:'できること増えたがムラ有',age:'5',des:'身支度や片付けが自分でできるようになってきたが、疲れがある日は大人に頼りがち。気持ちの波に行動が左右されやすい。',vec:[-0.1,0,0,0,0,0,0,0,0,-0.3,0,-0.2,-0.3,0,0]},
'313': {cat:'育ちの時系列',sc:'情緒',name:'役割を持つと頑張れる',age:'5',des:'自分が任された掃除やお当番などの役割には責任感を持って取り組む。反面、予想外の変更があると混乱しやすく、気持ちが崩れやすい。',vec:[0.3,0.2,0,0,0.3,0.2,0.2,-0.4,0.1,-0.4,0.1,0.3,-0.5,0,0.1]},
'314': {cat:'育ちの時系列',sc:'情緒',name:'身体の成長に心追いつかず',age:'3',des:'動きが活発で走る・登るが大好きだが、興奮すると周りが見えなくなる。気持ちのコントロールがまだ難しい。',vec:[0.6,0.3,-0.2,0.3,0.8,0,0,-0.3,0,-0.5,-0.3,0,-0.4,0,0]},
'315': {cat:'育ちの時系列',sc:'情緒',name:'変化の兆し',age:'4',des:'これまで大人のそばを離れられなかったが、最近は短時間なら友だちの遊びに参加できるように。まだ不安はあるが、確かな前進がある。',vec:[0,0,0,0,0.3,0,0,0,0,-0.2,0.2,-0.3,0,0,0.2]},
'316': {cat:'育ちの時系列',sc:'身体・運動',name:'不安定な動き',age:'2',des:'歩行がまだ不安定で、よく転倒する。階段の上り下りも手すりを使ってもぎこちなく、友だちの活発な動きについていけないことが多い。手先を使う遊び（積み木を積む、シールを貼るなど）にもあまり興味を示さず、すぐに飽きてしまう。',vec:[-0.7,-0.5,0,-0.5,-0.3,0,0,0,0,0,0,0,0,0,0]},
'317': {cat:'育ちの時系列',sc:'身体・運動',name:'不器用さと集中力の欠如',age:'4',des:'走る、跳ぶといった粗大運動はできるものの、縄跳びやボール投げなど、手足の協応が必要な動きが苦手。ハサミやクレヨンなどの微細運動も不器用で、製作活動に集中して取り組むことが難しい。すぐに他のことに気が散ってしまい、最後までやり遂げることが少ない。',vec:[0.3,0.1,0,-0.6,0.4,0,0,0,0,0,0,0,0,0,0]},
'318': {cat:'育ちの時系列',sc:'身体・運動',name:'挑戦したい気持ちの芽生え',age:'4',des:'これまで避けていた運動遊びに少しずつ挑戦するようになった。まだ怖さが勝つ場面もあるが、友だちの姿に刺激を受けている。',vec:[0.3,0.2,0,0,0.2,0,0,0,0,0.3,0.3,0,0,0,0.3]},
'319': {cat:'育ちの時系列',sc:'身体・運動',name:'身体コントロール',age:'3',des:'走るとスピードを緩められず、壁や友だちにぶつかって止まることが多い。集団ゲームでも勢いが余って転倒してしまう。手先の操作では、粘土をちぎる、ハサミを使うなどの細かい作業で力が入りすぎてしまい、道具をうまく扱えず途中で投げ出してしまうことがある。',vec:[-0.6,-0.5,-0.4,-0.5,0.6,0,0,0,0,-0.3,0,0,-0.3,0,0]},
'320': {cat:'育ちの時系列',sc:'身体・運動',name:'微細運動と失敗拒絶',age:'5',des:'折り紙や紐通しなど、指先を使う遊びが苦手で避ける傾向がある。周囲の友だちが複雑な作品を作っているのを見て「やりたい」と言うものの、いざ自分でやってみて1度でも思い通りにいかないと、「もうやらない」「できない」と泣いたり、紙を破いたりして活動をやめてしまう。',vec:[0,0,0,-0.6,-0.3,0,0,0,0,-0.7,0,0,-0.6,0,0]},
'321': {cat:'育ちの時系列',sc:'身体・運動',name:'体幹弱さと運動に消極的',age:'2',des:'座る姿勢を保つのが苦手で、床に座るとすぐに背中が丸くなったり、ゴロゴロと横になったりする。園庭の大型遊具や築山には近づこうとせず、砂場の一角で座り込んでじっと砂をいじる遊びを好む。保育者が手を引いて歩こうとしても、すぐにしゃがみ込んで抱っこを求める。',vec:[0.1,-0.6,-0.4,0,-0.7,0,0,0,0,0,0,0,0,0,0]},
'322': {cat:'育ちの時系列',sc:'認知・言葉',name:'指示の入りにくさ',age:'3',des:'保育者の簡単な指示（「おもちゃを片付けよう」「椅子に座って」など）がなかなか入らず、何度も繰り返して伝えたり、個別で働きかけたりする必要がある。集団での活動の切り替えが苦手で、次の活動への見通しが持てず、混乱してしまうことがある。',vec:[0,0,0,0,0,-0.6,0,-0.7,0,-0.3,0,0,-0.6,0,0]},
'323': {cat:'育ちの時系列',sc:'認知・言葉',name:'抽象的な概念の困難',age:'5',des:'具体的な事柄の理解はできるが、「もし〜だったら」「なぜ〜なの？」といった抽象的な問いかけや、見えないもの（時間、気持ちなど）の理解が難しい。ルールのあるゲームでも、ルールの意味を理解するのに時間がかかり、応用が利かないことがある。新しい状況への適応に時間がかかる。',vec:[0,0,0,0,0,-0.5,-0.4,-0.6,-0.3,0,0,0,-0.5,0,0]},
'324': {cat:'育ちの時系列',sc:'認知・言葉',name:'ゆっくり育つ',age:'3',des:'言葉の発達がゆっくりで、3歳になっても単語が中心。人懐っこく笑顔が多いが、集団活動への参加が難しい。',vec:[-0.1,0,0,0,0.3,-0.4,-0.6,-0.4,-0.2,0.2,-0.3,0.5,-0.3,0,-0.2]},
'325': {cat:'育ちの時系列',sc:'認知・言葉',name:'言葉の爆発期',age:'2',des:'以前は指差しや「ブーブー」などの単語が中心だったが、最近は「ママ、これなあに？」「ワンワン、いた！」など二語文、三語文が増えてきた。自分の要求を言葉で伝えようとするが、まだうまく伝わらないと癇癪を起こすこともある。',vec:[0,0,0,0,0,0.3,0.4,0,0,-0.3,0,0,0,0,0]},
'326': {cat:'育ちの時系列',sc:'認知・言葉',name:'言葉にならない訴え',age:'2',des:'発語が少なく、要求は指差しや「あー」「うー」といった声で示すことが多い。保育者が言葉で問いかけても、オウム返しをしたり、全く反応しなかったりする。自分の気持ちをうまく伝えられないため、かんしゃくを起こして泣き叫ぶことがある。',vec:[0,0,0,0,0,-0.6,-0.7,-0.4,-0.3,-0.6,0,0,-0.3,0,0]},
'327': {cat:'育ちの時系列',sc:'認知・言葉',name:'一方的な会話',age:'4',des:'自分の好きなことについては一方的に話し続けるが、相手の話を聞くことが苦手。質問されても的を射ない返答をしたり、会話のキャッチボールが続かなかったりする。友だちとの言葉でのやり取りがスムーズにいかず、トラブルになることもある。',vec:[0,0,0,0,0,0.3,-0.5,-0.4,0,-0.2,-0.4,0,-0.2,0,-0.2]},
'328': {cat:'育ちの時系列',sc:'認知・言葉',name:'ゆっくり理解深まる',age:'3',des:'言葉の理解に時間がかかるが、繰り返しの経験で少しずつできることが増えている。表情は豊かで、大人とのやりとりを楽しむ姿がある。',vec:[-0.1,0,0,0,0,-0.5,0.3,-0.3,0.4,0.2,0,0.5,0,0,0]},
'329': {cat:'育ちの時系列',sc:'家庭の困難',name:'不安定な生活リズム',age:'2',des:'登園時間が日によって大きく異なり、朝食を摂らずに登園することも多い。疲れている様子が見られ、午前中から眠そうにしていることがある。保護者との連絡帳のやり取りも少なく、家庭での様子が把握しにくい。',vec:[-0.1,0,0,0,-0.3,0,0,-0.3,0,-0.2,0,0,0,-0.6,-0.2]},
'330': {cat:'育ちの時系列',sc:'家庭の困難',name:'保護者の過干渉',age:'4',des:'保護者が子どもの行動を先回りして手伝いすぎることが多く、自分でやろうとする意欲が育ちにくい。園での活動についても、保護者が細かく指示を出したり、過度に心配したりするため、子どもが自主的に行動する機会が少ない。園と家庭での関わり方に一貫性がないため、子どもが混乱している様子が見られる。',vec:[0,0,0,0,-0.4,-0.3,0,0,-0.3,-0.5,0,0,0,0,0]},
'331': {cat:'育ちの時系列',sc:'家庭の困難',name:'ネグレクト傾向',age:'4',des:'衣服が汚れていたり、サイズが合っていなかったりすることが目立つ。排泄の失敗が多く、便意を保育者に伝えられない。園内では特定の保育者に強く依存し、他の子がその保育者と話していると間に割り込んで叩くなど、過剰に大人の気を引こうとする姿が見られる。',vec:[0,0,0,0,0,0,-0.6,0,0,-0.6,-0.5,-0.7,0,-0.6,0]},
'332': {cat:'育ちの時系列',sc:'家庭の困難',name:'家庭環境急変による情緒不安定',age:'3',des:'家庭環境の変化(下の子の誕生と離婚)以降、園での行き渋りが激しくなった。これまでは自分でできていた着替えや食事を「やって」と激しく泣いて要求する（赤ちゃん返り）。友だちとの玩具の貸し借りでも、以前より我慢ができず、すぐに手が出てしまう場面が増えた。',vec:[0,0,0,0,0,0,0,-0.3,0,-0.7,-0.4,0,-0.6,0,-0.2]},
'333': {cat:'育ちの時系列',sc:'家庭の困難',name:'メディア漬けコミュ希薄',age:'5',des:'夜遅くまで動画サイトを視聴しているようで、朝の機嫌が非常に悪い。言葉の遅れが指摘されており、友だちとの関わりの中で自分の思いを言葉で伝えられず、突然大声を出す、または無言で玩具を奪い取る。一方で、動画のセリフや効果音の真似だけは非常に流暢に繰り返す。園での、友だちとの関わりでつまづく様子や困っている様子、生活リズムの大切さを保護者に話すが、楽観的に捉えており、園と家庭とで温度差がある。',vec:[0,0,0,0,0,-0.4,-0.6,-0.3,0.5,-0.6,-0.5,0.2,-0.4,-0.5,-0.3]},
'334': {cat:'育ちの時系列',sc:'社会性',name:'1人遊びが多い',age:'4',des:'お友だちとの関わりが少なく、1人遊びが多いが、4～5名の小集団だと一緒に遊ぶ姿が見られる。同じことを繰り返し言い部屋の中をくるくる回る時がある。恐竜に興味があり、名前を繰り返し言っている。',vec:[0,0,-0.2,0,0.3,0,0.1,0,-0.2,-0.1,-0.4,0,-0.3,0,-0.2]},
'335': {cat:'育ちの時系列',sc:'社会性',name:'1人遊び多・こだわり',age:'4',des:'友だちと関わらず、1人遊びが多い。同じことを繰り返し言ってみたり、部屋の中をくるくる回っている時もある。今は、海の中の生き物に興味があり、名前を自慢気に繰り返し言っている。登園児が6名しかいなかった日の室内遊びでは、一緒に遊ぶ姿が見られた。',vec:[0,0,-0.4,0,0.5,0,0.3,0,-0.2,-0.1,-0.5,0,-0.4,0,-0.5]},
'336': {cat:'感覚・身体',sc:'運動意欲がない',name:'運動遊び苦手',age:'4',des:'身体を動かす遊びや活動に積極的に参加しようとせず、座って遊ぶことや、静かな活動を好む。新しい運動に挑戦することは抵抗が見られる。',vec:[-0.2,-0.1,-0.1,0,-0.7,0,0,0,0,0,0,0,-0.2,0,0]},
'337': {cat:'感覚・身体',sc:'運動意欲がない',name:'運動苦手意識',age:'4',des:'園庭に出ても、友だちが走り回ったり、遊具で遊んだりする中で、一人だけ砂場で座って遊んでいたり、ベンチに座って友だちの様子を眺めていることが多い。体操遊びの時間も、鬼ごっこやボール遊びには参加せず、見学したり、隅で静かに過ごしている。新しい運動遊びを提案しても「できない」「やりたくない」と拒否し、体を動かすこと自体に苦手意識を持っている様子。成功体験を積み重ねられるような簡単な運動から始め、少しずつ運動の楽しさを感じられるような働きかけが必要。',vec:[-0.4,-0.3,-0.5,-0.3,-0.8,0,0,0,0,-0.4,-0.5,0.2,-0.2,0,-0.4]},
'338': {cat:'感覚・身体',sc:'こだわり・切替',name:'順番場所こだわり',age:'4',des:'いつもと同じ順番・道順・場所にこだわりが強く、変更があると激しくパニックになる。活動の終わりや場所の移動で強い抵抗を示す。',vec:[-0.1,-0.1,-0.3,0,0,0,0,-0.7,0,-0.7,-0.3,0,-0.9,0,-0.2]},
'339': {cat:'感覚・身体',sc:'こだわり・切替',name:'運動意欲向上中',age:'3',des:'以前は園庭の遊具に対し強い怖さを感じ、身体を動かす遊びに消極的だったが、最近では、保育者や友だちが楽しそうに遊ぶ姿を見て、少しずつ興味を示すようになってきた。特に、低いスロープや段差のある場所では、手すりをしっかり掴みながらも、自分の力で上り下りに挑戦する姿が見られるようになった。まだ、高い場所や不安定な足場には怖さが勝ってしまうが、友だちの「がんばれ！」という声援に励まされ、一歩踏み出そうとする意欲が芽生え始めている。',vec:[-0.1,-0.3,-0.4,0,-0.1,0,0,0,0,0.1,0.2,0.2,0,0,0.1]},
'340': {cat:'感覚・身体',sc:'バランス・体幹',name:'バランス体幹不安定',age:'3',des:'片足立ちや平均台などのバランスを要する活動が苦手で、すぐに体勢を崩してしまう。体幹が不安定なため、座っていても姿勢が崩れやすい。',vec:[-0.3,-0.7,-0.4,-0.2,0,0,0,0,0,0,0,0,0,0,0]},
'341': {cat:'感覚・身体',sc:'バランス・体幹',name:'体幹やバランスが弱い',age:'3',des:'園庭の平均台を渡ろうとすると、数歩でバランスを崩して降りる。片足立ちで靴下を履くことも難しく、壁に手をついたり座り込んだりする。ブランコも漕ぐ動作がぎこちなく、体が左右に大きく揺れる。椅子に座って食事をしている際も、体が傾いたり、肘をついたりすることが多く、姿勢を保つことが難しい様子。体幹を鍛える遊びや、バランス感覚を養う運動を取り入れていきたい。',vec:[-0.7,-0.8,-0.6,-0.3,0,0,0,0,0,0,0,0,0,0,0]},
'342': {cat:'感覚・身体',sc:'感覚過敏',name:'音触覚嗅覚過敏',age:'5',des:'大きな音や複数の声が重なると耳を塞いで動けなくなる。衣服のタグや素材が気になり特定の服しか着られない。給食の匂いで食堂に入れないことがある。',vec:[-0.1,-0.1,-0.9,0,0,0,0,0,0,-0.6,-0.3,0,-0.4,0,-0.3]},
'343': {cat:'感覚・身体',sc:'感覚過敏',name:'感覚統合の困難',age:'3',des:'特定の感覚刺激に対して非常に敏感な一面あり。例えば、砂遊びや粘土遊びでは、手に付く感触を嫌がり、なかなか活動に参加できない。また、大きな音や予期せぬ物音に驚きやすく、集団での賑やかな活動中に耳を塞いでしまうことがある。新しい環境や活動への移行にも時間がかかり、戸惑いや不安からか、動きにぎこちなさが見受けられる。身体を動かすこと自体にも消極的で、友だちが誘ってもなかなか輪に入ろうとしない。',vec:[-0.4,-0.3,-0.8,-0.3,-0.6,0,0,-0.5,-0.3,-0.6,-0.3,0,-0.6,0,-0.4]},
'344': {cat:'感覚・身体',sc:'感覚過敏',name:'感覚処理の安定化',age:'4',des:'以前は砂や絵の具などの感触を極端に嫌がり、汚れることへの抵抗が強く、造形活動への参加が難しい状況だった。しかし、最近では、保育者が隣で一緒に触れたり、少しずつ指先で感触を確かめる機会を設けることで、徐々に抵抗感が薄れてきている。今では、砂場で山を作ったり、絵の具でダイナミックな色を塗ったりと、遊びの幅が大きく広った。まだ、大量の砂が手についたり、どろんこ遊びには苦手意識から戸惑うこともあるが、以前に比べて感覚処理が安定し、様々な素材に触れる楽しさを感じられるようになってきている。',vec:[-0.1,0,0.3,0,0.4,0,0,0,0,0.2,0,0,0.1,0,0.1]},
'345': {cat:'感覚・身体',sc:'感覚過敏',name:'音触覚視覚でパニック',age:'4',des:'特定の感覚刺激（音、触覚、視覚など）に対して過敏に反応し、不快感や混乱を示すことがあり、スイッチが入ってしまうと拒否・パニック・泣き叫ぶなど、集団活動への参加が難しい。',vec:[-0.3,-0.2,-0.8,-0.2,0,0,0,0,0,-0.7,-0.2,0,-0.4,0,-0.4]},
'346': {cat:'感覚・身体',sc:'感覚過敏',name:'感覚刺激に過敏',age:'4',des:'粘土遊びの際、手に粘土がつくことを極端に嫌がり、すぐに手を拭きたがる。絵の具や砂遊びなど、手が汚れる活動にはほとんど参加しない。また、大きな音や予期せぬ音（掃除機の音、友だちの大きな声など）に過剰に驚き、耳を塞いだり、その場から離れようとしたりする。新しい服の素材や、肌に触れるものにもこだわりがあり、着心地が悪いとすぐに脱ぎたがる。安心できる環境で、少しずつ様々な感覚刺激に慣れる機会を提供したい。',vec:[0.2,0.1,-0.9,0,0.3,0.1,0.1,0,0,-0.5,-0.3,0.2,-0.6,0,-0.3]},
'347': {cat:'感覚・身体',sc:'感覚過敏',name:'感覚過敏切り替え困難',age:'3',des:'大きな音で耳を塞ぐ。衣服の素材が気になり特定の服しか着ない。活動の切り替えで激しく抵抗する。',vec:[0,0,-0.8,0,0,0,0,0,0,-0.5,0,0,-0.8,0,0]},
'348': {cat:'感覚・身体',sc:'感覚鈍麻・多動',name:'多動鈍感',age:'3',des:'常に動き回り、高いところから飛び降りたり危険な遊びを繰り返す。痛みに鈍感で怪我をしても泣かない。友だちへの力加減が分からず叩いてしまう。',vec:[-0.3,-0.2,-0.8,-0.6,0.9,0,0,0,0,-0.6,-0.7,0,-0.3,0,-0.5]},
'349': {cat:'感覚・身体',sc:'感覚鈍麻・多動',name:'感覚鈍麻と力加減',age:'5',des:'身体を動かすことが大好きで、園庭では常に高い場所に登ったり、勢いよく走り回ったりしている。しかし、痛みに鈍く、小さい頃から転んだりぶつかったりしてもほぼ泣くことがない。そのため、危険な遊びを繰り返すことがある。また、友だちとの関わりの中で、力加減が分からず、強く叩いてしまったり、押し倒してしまったりして友だちを困らせる場面も見られる。自分の身体の動きや力のコントロールが難しい様子。',vec:[0.3,0.2,-0.8,-0.6,0.8,0,0,0,0,-0.1,-0.5,0,0,0,-0.3]},
'350': {cat:'感覚・身体',sc:'感覚鈍麻・多動',name:'痛みに鈍い',age:'3',des:'痛みや温度などの感覚刺激への反応が薄く、怪我に気づきにくい。また、強い刺激を求める行動が見られることもある。',vec:[-0.1,-0.2,-0.8,-0.2,0.6,0,0,0,0,-0.3,0,0,-0.2,0,0]},
'351': {cat:'感覚・身体',sc:'感覚鈍麻・多動',name:'感覚鈍麻刺激求める',age:'3',des:'転んで膝を擦りむいても、泣いたり痛がったりする様子があまり見られず、保育者が気づくまでそのまま遊び続けている。友だちとぶつかっても、衝撃に気づきにくいのか、そのまま遊びを続ける。また、壁や友だちに体を強く押し付けたり、高いところから飛び降りたりと、体を激しく動かす遊びを好む。ブランコや滑り台などの遊具を繰り返し、より強く、より速く求める姿も見られる。安全に配慮しつつ、適切な感覚刺激を提供し、自分の体の状態に気づけるような働きかけが必要。',vec:[0.3,0.2,-0.8,0.1,0.9,0,0,0,0,-0.2,0.1,0,-0.3,0,0]},
'352': {cat:'感覚・身体',sc:'協調運動困難',name:'不器用さ',age:'4',des:'手先が不器用でハサミやクレヨンの扱いが難しい。靴紐やボタンが留められない。ボール投げや縄跳びなど手足を協調させる動きが苦手。',vec:[-0.2,-0.1,-0.3,-0.8,0.3,0,0,0,0,0,0,0,0,0,0]},
'353': {cat:'感覚・身体',sc:'協調運動困難',name:'協調難',age:'4',des:'手先を使った細かな作業にやや不器用さが見られる。ハサミで線を切る動作や、クレヨンで細かい絵を描く際に、両手の協調が難しく、思うようにいかない。',vec:[-0.1,0,0,-0.5,0,0,0,0,0,0,0,0,0,0,0]},
'354': {cat:'感覚・身体',sc:'協調運動困難',name:'粗大協調難',age:'5',des:'運動会に向けての練習など、全身を使ったダイナミックな動きを伴う活動では、ややぎこちなさが目立つ。特に、ボール投げや縄跳びのような、手足の協調を必要とする動きでは、タイミングが合わずに苦戦する。',vec:[-0.5,-0.3,-0.2,-0.7,0.3,0,0,0,0,0,0,0,0,0,0]},
'355': {cat:'感覚・身体',sc:'協調運動困難',name:'手足の協調未熟',age:'2',des:'食事の際のスプーンを持つ手が左右定まらなかったり、着替えの際の動作で、手足の協調がまだ未熟な様子が見られる。スムーズな動作ができず時間がかかってしまう。特に、ボタンを留める、ファスナーを上げるなどの細かい作業では難しさを感じている。しかし、自分でやろうとする意欲は高く、保育者が少し手伝うと、最後まで頑張ってやり遂げようとする。',vec:[0,0,0,-0.6,0.7,0,0,0,0,0,0,0,0,0,0]},
'356': {cat:'感覚・身体',sc:'協調運動困難',name:'協調協応苦手',age:'5',des:'両手足の協調的な動きが苦手で、ボール遊びや縄跳び、ハサミを使うなどの動作がぎこちなく、スムーズにできない。左右の体の使い分けや、目と手の協応が難しい傾向がある。',vec:[-0.5,-0.3,-0.4,-0.8,0,0,0,0,0,0,0,0,0,0,0]},
'357': {cat:'感覚・身体',sc:'協調運動困難',name:'ボールハサミ協調苦手',age:'5',des:'ボールを投げようとすると、手と足の動きが連動せず、ボールを狙った方向に投げられない。縄跳びも、縄を回す動きと跳ぶ動きが結びつかず、連続して跳ぶことは難しい。ハサミで紙を切る際も、紙を持つ手とハサミを動かす手の協調が難しく危なっかしい。箸の使い方もぎこちなく、細かい作業には時間がかかる。手と目の協応を促す遊びや、リズム運動などを通して、協調的な動きを育みたい。',vec:[-0.5,-0.3,-0.2,-0.8,0,0,0,0,0,0,0,0,0,0,0]},
'358': {cat:'感覚・身体',sc:'粗大運動の遅れ',name:'歩行階段不安定',age:'4',des:'歩行がまだ不安定でよく転倒する。階段の上り下りがぎこちなく、友だちの活発な動きについていけない。走るときに腕の振りが少なく体幹が弱い。',vec:[-0.8,-0.7,-0.3,-0.4,-0.5,0,0,0,0,0,0,0,0,0,0]},
'359': {cat:'感覚・身体',sc:'粗大運動の遅れ',name:'粗大運動とバランス',age:'2',des:'好奇心旺盛で、新しい遊びや友だちとの関わりに積極的に飛び込むが、まだ歩行が不安定なため、急な方向転換や駆け出す際にバランスを崩して転倒することが多い。特に、段差の上り下りや少し高くなった場所からの降りる動作では、足元が定まらず、ぎこちない動きになることがある。友だちが活発に動き回るスピードについていけない場面もあり、時折悔しそうな表情を見せる。',vec:[-0.6,-0.5,0,0,0.8,0,0,0,0,-0.2,0.5,0,0,0,0.4]},
'360': {cat:'感覚・身体',sc:'粗大運動の遅れ',name:'足もつれ転倒',age:'2',des:'歩いたり走ったりする時に足がもつれたり、バランスを崩して転倒することが頻繁に見られる。動き全体がぎこちなく、スムーズな体重移動が難しい。',vec:[-0.8,-0.7,-0.3,-0.3,0,0,0,0,0,0,0,0,0,0,0]},
'361': {cat:'感覚・身体',sc:'粗大運動の遅れ',name:'運動苦手',age:'2',des:'園庭で友だちと追いかけっこをしていると、すぐに足が絡まって転んでしまう。階段の上り下りも手すりなしでは不安定で、一段ずつゆっくりと足を揃えて降りる。滑り台を滑り降りた後の着地も不安定で、すぐに尻もちをついてしまう。体を大きく使う遊びに苦手意識があり、友だちの活発な動きについていけない様子。安全に配慮しつつ、様々な運動遊びを経験できる機会を増やしたい。',vec:[-0.7,-0.6,-0.3,-0.2,-0.4,0,0,0,0,-0.2,-0.3,0,0,0,-0.3]},
'362': {cat:'感覚・身体',sc:'感覚/身体・複合型',name:'転倒バランス体幹',age:'3',des:'(粗大運動・バランス)運動遊び全般が不安定で、転倒が多く、特にバランスを要する場面で困難が見られる。体幹の弱さも影響し、全身の動きがぎこちない。',vec:[-0.7,-0.7,-0.3,-0.4,0,0,0,0,0,-0.2,0,0,0,0,0]},
'363': {cat:'感覚・身体',sc:'感覚/身体・複合型',name:'体幹バランス弱い',age:'3',des:'(粗大運動・バランス)園庭の芝生の上を走っていても、少しの段差でつまずいて転ぶ。ジャンプして着地する際も、体が大きく揺れてしまい、すぐに尻もちをつく。平均台や一本橋のような細い場所を渡ることは非常に苦手で、手をつないでもらうか、ハイハイで進もうとする。椅子に座っていても体が安定せず、食事中に体を揺らしたり、机に寄りかかったりする。全身を使った遊びを通して、体幹の強化とバランス感覚の向上を促す支援が必要。',vec:[-0.8,-0.8,-0.6,0,0.3,0,0,0,0,0,0,0,0,0,0]},
'364': {cat:'感覚・身体',sc:'感覚/身体・複合型',name:'協調苦手運動自信なし',age:'5',des:'(協調・意欲)両手足の協調運動が苦手なため、ボール遊びや縄跳びなどの運動に苦手意識を持ち、身体活動全般を避ける傾向がある。運動への自信のなさから、新しい運動に挑戦することにも消極的。',vec:[-0.2,-0.1,0,-0.8,-0.7,0,0,0,0,-0.3,0,0,-0.2,0,0]},
'365': {cat:'感覚・身体',sc:'感覚/身体・複合型',name:'協調と運動苦手意識',age:'5',des:'(協調・意欲)ドッジボールやサッカーなどのボールを使った集団遊びには、自分から参加しようとせず、ボールが近づいてくると避ける。縄跳びの練習も、友だちが楽しそうに跳んでいるのを見ても「僕には無理」と言って、なかなか挑戦しようとしない。運動会のかけっこでも、スタートの合図で出遅れたり、途中で走るのをやめてしまったりすることがある。運動が苦手な自分を意識しており、失敗を恐れるあまり、身体を動かす機会を自ら減らしている様子。成功体験を積み重ねられるような個別支援や、スモールステップでの挑戦を促したい。',vec:[-0.6,-0.4,-0.3,-0.5,-0.7,0,0,0,0,-0.5,-0.3,0,-0.2,0,-0.3]},
'366': {cat:'感覚・身体',sc:'感覚/身体・複合型',name:'感覚過敏消極的',age:'4',des:'(感覚過敏・意欲)特定の感覚刺激に過敏に反応するため、園庭の砂や泥、遊具の感触などを嫌がり、結果として身体を動かす遊び全般に消極的。感覚的な不快感が運動への意欲を阻害している傾向がある。',vec:[-0.3,-0.2,-0.8,-0.2,-0.7,0,0,0,0,-0.4,-0.3,0,-0.3,0,-0.3]},
'367': {cat:'感覚・身体',sc:'感覚/身体・複合型',name:'感覚過敏運動意欲低',age:'4',des:'(感覚過敏・意欲)園庭の砂場では、砂が手につくのを嫌がり、スコップを使ってもすぐに手を払う。泥遊びや水遊びも参加せず、友だちが楽しそうに遊んでいるのを遠巻きに見ている。鉄棒やうんていなどの遊具も、冷たい感触やざらざらした感触を嫌がり、触ろうとしない。そのため、身体を大きく使う機会が少なく、運動能力の発達が遅れがち。感覚刺激への慣れを促す活動と、本人が安心して取り組める運動遊びを組み合わせ、徐々に身体活動への意欲を高める支援が必要。',vec:[-0.5,-0.4,-0.8,-0.3,-0.7,0,0,0,0,-0.4,0,0,-0.3,0,-0.3]},
'368': {cat:'言語・コミュ',sc:'一方的に話す',name:'一方的に話す',age:'4',des:'自分の好きなことについては一方的に話し続けるが、相手の話を聞くことが苦手。質問されても的を射ない返答をしたり、会話のキャッチボールが続かない。友だちとのトラブルになることもある。',vec:[-0.1,0,0,0,0.3,-0.3,0.5,-0.2,-0.1,-0.4,-0.5,0,-0.5,0,-0.3]},
'369': {cat:'言語・コミュ',sc:'一方的に話す',name:'テーマに合った応答困難',age:'4',des:'自分の興味のあることや好きなことについては、一方的に話し続けることができるが、相手の話を聞くことや、会話のテーマに合わせて応答することが苦手。質問に対して的を射ない返答をしたり、会話が途切れてしまったりすることがよくある。',vec:[0.1,0.1,0,0,0.3,0.1,0.6,-0.2,0.1,-0.2,-0.3,0.2,-0.4,0,0.1]},
'370': {cat:'言語・コミュ',sc:'一方的に話す',name:'相手の話をきかない',age:'4',des:'自由遊びの時間に、自分が作ったブロック作品を見せて「これね、すごいんだよ！こうやってね、ブーンって飛ぶの！」と興奮して話し続ける。保育者が「へえ、かっこいいね。どこまで飛ぶの？」と尋ねても、「あとね、これ、赤と青のブロックを使ったんだ！」と、自分の話したいことに戻ってしまう。友だちとの会話でも、相手の言葉に耳を傾けず、自分の話したいことを割り込んで話してしまうため、トラブルになる。相手の言葉に意識を向け、応答する力を育む支援が必要。',vec:[0.3,0.2,0.1,0.2,0.6,-0.4,0.5,-0.2,-0.3,-0.3,-0.4,0.1,-0.3,0.2,-0.2]},
'371': {cat:'言語・コミュ',sc:'一方的に話す',name:'会話がちぐはぐ',age:'5',des:'興味のある恐竜の話を延々と続けるが、相手の反応には気づきにくい。質問されても話題がずれたり、聞かれたことと違うことを答えてしまう。友だちとの会話では、相手の話を遮ってしまいトラブルになることがある。',vec:[-0.1,0,-0.2,0,0.3,-0.3,0.6,-0.3,0.1,-0.3,-0.2,0,-0.4,0,-0.3]},
'372': {cat:'言語・コミュ',sc:'一方的に話す',name:'自分の世界に没頭',age:'4',des:'好きな電車の名前を何度も繰り返し言い、遊びの途中でも突然その話題に戻る。活動の切り替えが難しく、同じ遊びを続けたい気持ちが強い。友だちの遊びに入るより、自分の世界に没頭する時間が長い。',vec:[0.3,0.2,-0.4,0.1,0.4,0.2,0.1,-0.5,0.3,-0.2,-0.3,0.4,-0.6,0,-0.4]},
'373': {cat:'言語・コミュ',sc:'一方的に話す',name:'聞けない・待てない',age:'5',des:'保育者の話を最後まで聞けず途中で動き出してしまう。友だちが話している途中で割り込んだり、自分の順番を待てない。集団でのルールのある活動への参加が難しい。',vec:[-0.1,0,0,0,0.3,-0.3,0.2,-0.5,0,-0.4,-0.3,0,-0.6,0,-0.3]},
'374': {cat:'言語・コミュ',sc:'聞けない・待てない',name:'興味が移る',age:'5',des:'集中力が持続しにくく、保育者の話を最後まで聞くことが難しい。自分の興味が移りやすく、友だちの会話に割り込んだり、順番を待つことが苦手なため、集団でのルールのある活動への参加に困難が見られる。',vec:[-0.1,0,-0.1,0,0.3,-0.4,0.2,-0.5,0.1,-0.4,-0.3,0,-0.5,0,-0.3]},
'375': {cat:'言語・コミュ',sc:'聞けない・待てない',name:'衝動的',age:'5',des:'朝の会で保育者が絵本を読み聞かせている途中でも、他の玩具に目が行き、席を立って動き出してしまう。友だちが発表している最中に「僕もそれ知ってる！」と大きな声で割り込んだり、ゲームの順番を待てずにフライングしてしまったりすることがよくある。集団でのルールを理解していても、その場の衝動を抑えることが難しく、結果として友だちとのトラブルによく発展する。活動の前にルールを再確認したり、短い時間で達成感を得られるような工夫を凝らすことで、集中力や待つ力を育む支援が必要。',vec:[-0.1,0,-0.2,0,0.6,0.5,0.6,-0.1,0.3,-0.6,-0.5,0.2,-0.7,0.3,-0.3]},
'376': {cat:'言語・コミュ',sc:'聞けない・待てない',name:'話を聞き続けられない',age:'5',des:'説明の途中で席を立ったり、思いついたことをすぐに口にしてしまう。友だちの話を最後まで聞けず、会話がかみ合わないことが多い。ルールのある遊びでは順番を待てず、活動が中断してしまうこともある。',vec:[0.3,0.2,0,0.2,0.6,-0.3,0.2,-0.4,0.1,-0.4,-0.3,0.2,-0.5,0,-0.2]},
'377': {cat:'言語・コミュ',sc:'言葉の遅れ',name:'言葉がゆっくり',age:'3',des:'3歳になっても単語中心で二語文がなかなか出ない。こちらの言葉は理解しているようで指示には従えるが、自分から話しかけることが少ない。友だちとのやり取りはジェスチャーや表情が多い。',vec:[-0.1,0,0,0,0,0.5,-0.7,0,0.3,0.1,0.2,0.1,0.1,0,0.2]},
'378': {cat:'言語・コミュ',sc:'言葉の遅れ',name:'言葉少ない',age:'3',des:'こちらの言葉や指示は理解しているものの、自分の気持ちや要求を言葉で表現することが苦手。ジェスチャーや表情で伝えようとすることが多く、言葉でのやり取りが少ない傾向がある。',vec:[-0.1,0,0,0,0,0.6,-0.6,0.1,0.3,-0.3,-0.2,0,0.1,0,0]},
'379': {cat:'言語・コミュ',sc:'言葉の遅れ',name:'言葉で伝えない',age:'3',des:'「お片付けしようね」と声をかけると、すぐに玩具を片付け始めるなど、簡単な指示は通る。しかし、「何がしたいの？」と尋ねても「うー」と唸ったり、指差しで要求を示したりすることがほとんど。友だちとの遊びでは、言葉ではなく、手で引っ張ったり、顔を覗き込んだりして誘う姿が見られる。言葉での表現を促すことで、よりスムーズなコミュニケーションを支援していく必要がある。',vec:[0.1,0.1,0,0,0.2,0.5,-0.6,0.1,0,-0.2,0.1,0.2,0.1,0,0.2]},
'380': {cat:'言語・コミュ',sc:'言葉の遅れ',name:'言葉が少ない',age:'4',des:'指示はよく理解して動けるが、自分から話しかけることは少ない。質問しても「うん」「ちがう」など短い返答が多く、会話が続きにくい。友だちとの関わりでは、言葉より行動で合わせようとする姿が見られる。',vec:[0.3,0.2,0.1,0.2,0.3,0.7,-0.6,0.2,0.3,0.1,0.3,0.4,0.3,0.1,0.3]},
'381': {cat:'言語・コミュ',sc:'言葉の遅れ',name:'集団場面での言語表出少',age:'4',des:'他児とのコミュニケーションが苦手で一人で部屋の中をよく動いている。お友だちがベッドを一緒に出そうと片側を持っても何の事？という感じでみている。身近な大人（両親、祖父母など）にはよく話すが、部屋ではほとんど話さず、黙々と自分のことを淡々とこなす。早お迎えは好きでその日は朝から何度も「ぼく早お迎え」と伝えに来る。某ローカルキャラが好きで家でもそのダンスをよく踊り、園でもこの曲には反応してとても楽しそうに踊りだす。ダンスの時間も好き。トイレが言えずに失敗することがある。トイレ行っておいでよと声掛けしても行かず・・・しばらくして泣いて訴える。声掛けの仕方や関わり方を工夫しているが、なかなかうまくいかない。保護者にも集団の中での困りごとを伝え、その後保健センターにつながり、療育の見学にも行かれている。よくお迎えに来て下さる祖母は、とっても心配されるので、いろいろなことは母に伝えるようにしている。',vec:[0,0,-0.3,0,0,0,-0.4,-0.3,-0.2,-0.4,-0.5,0.2,-0.4,0,-0.3]},
'382': {cat:'言語・コミュ',sc:'言葉の土台が弱い',name:'言葉の土台が弱い',age:'3',des:'言葉の理解も表出も全体的にゆっくり。名前を呼ばれても反応が薄く、簡単な指示が入りにくい。模倣遊びや歌・リズム遊びへの参加も少ない。言語発達の土台から丁寧に育てたい。',vec:[-0.1,0,-0.4,0,0,-0.7,-0.7,-0.5,-0.6,-0.3,0,0,-0.2,0,-0.2]},
'383': {cat:'言語・コミュ',sc:'言葉の土台が弱い',name:'言葉土台弱',age:'3',des:'言葉の理解と表出の両面において、全体的にゆっくりとした発達が見られる。簡単な指示の理解も難しく、模倣行動や集団活動への参加にも戸惑いが見られることがある。言語発達の土台を丁寧に育む支援が必要。',vec:[-0.6,-0.1,-0.3,-0.2,0,-0.7,-0.7,-0.4,-0.5,-0.3,-0.2,-0.2,-0.3,0,-0.3]},
'384': {cat:'言語・コミュ',sc:'言葉の土台が弱い',name:'言葉と模倣が弱い',age:'3',des:'名前を呼ばれてもすぐに反応せず、視線が合いにくい。「お椅子に座ってね」という簡単な指示も、何度か繰り返したり、ジェスチャーを加えたりしないと伝わりにくいことがある。友だちが楽しそうに歌を歌ったり、手遊びをしたりしていても、輪の中に入ろうとせず、一人で静かに過ごしていることが多い。新しい遊びや活動への参加にも抵抗があり、保育者が手本を見せても、模倣することが難しい。個別の関わりの中で、言葉への興味を引き出し、模倣の楽しさを体験できるよう、きめ細やかな支援が求められる。',vec:[-0.2,-0.1,-0.3,-0.2,-0.2,-0.6,-0.5,-0.3,-0.6,-0.1,-0.4,0.1,-0.3,0,-0.5]},
'385': {cat:'言語・コミュ',sc:'言葉の土台が弱い',name:'指示が入りにくい',age:'4',des:'名前を呼ばれても反応が遅く、活動の切り替えの声かけが届きにくい。「片付けてから外に行くよ」など二段階の指示は理解が追いつかず、周囲の様子を見て動くことが多い。集団活動では流れがつかめず、友だちより一歩遅れて動き出す姿が見られる。',vec:[0.1,0,-0.2,0,0.2,-0.6,-0.1,-0.5,-0.3,0,0,0,-0.4,0,-0.1]},
'386': {cat:'言語・コミュ',sc:'言葉の土台が弱い',name:'理解も表出も全体的にゆっくり',age:'2',des:'名前を呼ばれても反応が薄く、簡単な指示も入りにくい。発語は単語が少し出る程度で、ジェスチャー中心のコミュニケーション。模倣遊びやごっこ遊びへの参加が少なく、言語の土台づくりが必要な段階。',vec:[-0.1,0,-0.3,0,0,-0.6,-0.7,-0.4,-0.5,-0.1,-0.2,0,-0.3,0,-0.1]},
'387': {cat:'言語・コミュ',sc:'言葉の土台が弱い',name:'言語表出・模倣弱',age:'3',des:'言葉はゆっくりで単語中心。友だちの動きを真似ることが難しい。製作の見本を見ても取り組めない。',vec:[0,0,0,0,0,-0.6,-0.7,-0.5,-0.8,0,0,0,0,0,0]},
'388': {cat:'言語・コミュ',sc:'見通し・模倣',name:'次が読めない',age:'5',des:'活動の流れを理解するのが難しく、急な変化に強い不安を示す。「今日は特別に違う部屋で遊ぶよ」と伝えると固まって動けなくなり、予定外のことが起きると泣き出すこともある。先の見通しが持てないため、切り替えに時間がかかる。',vec:[0,0,-0.3,0,0,0.2,0,-0.8,0,-0.6,-0.1,0.3,-0.7,0,0]},
'389': {cat:'言語・コミュ',sc:'見通し・模倣',name:'真似が入りにくい',age:'2',des:'手遊びやリズム遊びで、周りの動きを見てもなかなか真似ができない。ブロック遊びでも、友だちが作っている形を模倣するより、自分のやり方を繰り返すことが多い。保育者が横で一緒にやっても、視線が合いにくく、模倣の入り口に立ちにくい。',vec:[0,0,-0.3,-0.2,0,-0.1,-0.2,-0.2,-0.7,0,-0.2,-0.1,-0.2,0,0]},
'390': {cat:'言語・コミュ',sc:'手が出てしまう',name:'手が出てしまう',age:'2',des:'思い通りにならないとすぐに友だちを叩いたり押したりする。「やめて」「貸して」など言葉で伝えることが難しく、感情が高ぶると声が出なくなる。気持ちを言葉にする力を育てたい。',vec:[-0.1,0,-0.3,0,0,-0.2,-0.6,-0.2,-0.7,-0.6,-0.3,-0.5,0,0,-0.4]},
'391': {cat:'言語・コミュ',sc:'手が出てしまう',name:'不満を行動で示す',age:'2',des:'自分の気持ちを言葉で表現することが非常に難しく、特に不満や怒りなどの感情が高まると、手が出てしまったり、物を投げたりといった行動で示してしまう。言葉での伝え方を学ぶ支援が重要。',vec:[-0.1,0,0,0,0,0,-0.7,0,0,-0.7,-0.3,0,-0.3,0,0]},
'392': {cat:'言語・コミュ',sc:'手が出てしまう',name:'玩具を奪う、癇癪',age:'2',des:'友だちが持っている玩具が欲しくなると、「貸して」と言葉で伝える代わりに、友だちの手から無理やり奪おうとする。思い通りにならないと「キーッ！」と叫びながら床に寝転がったり、近くにいる友だちを叩いてしまう。感情が高ぶると、言葉が出なくなり、表情もこわばってしまうため、周囲もどう対応して良いか戸惑う。気持ちを言葉で表現する経験を積み重ね、適切な伝え方を身につけられるよう、丁寧な関わりが求められる。',vec:[0.1,0.1,-0.2,0.1,0.3,0.2,-0.5,-0.1,0.1,-0.6,-0.4,0.2,-0.4,0,-0.3]},
'393': {cat:'言語・コミュ',sc:'手が出てしまう',name:'気持ちを言葉にできず行動化',age:'3',des:'思い通りにならないと泣き叫んだり、物を投げてしまうことがある。「いや」「やだ」以外の言葉が出ず、気持ちを言葉で整理することが難しい。保育者が代弁すると少し落ち着くが、自分で言葉にするのはまだ難しい。',vec:[0,0,0,0,0,0.3,-0.6,0,-0.1,-0.6,-0.1,0.3,-0.4,0,0]},
'394': {cat:'言語・コミュ',sc:'言語/コミュ・複合型',name:'理解と見通し',age:'4',des:'(理解言語・見通し力)言葉の理解に時間がかかり、特に抽象的な指示や複数の指示を同時に理解することが難しい。また、次に何が起こるかという見通しを持つことが苦手なため、活動の切り替えや予期せぬ変化に混乱しやすい。',vec:[-0.1,0,-0.3,0,0,-0.6,-0.2,-0.7,-0.2,-0.3,0,-0.1,-0.6,0,-0.2]},
'395': {cat:'言語・コミュ',sc:'言語/コミュ・複合型',name:'見通し弱い',age:'4',des:'(理解言語・見通し力)「お絵描きが終わったら、手を洗って、おやつにしようね」という二段階の指示を出すと、お絵描きは終えるものの、その後の行動が分からず立ち尽くしてしまう。新しい活動が始まる際や、予定が変更になった際には、不安そうな表情を見せたり、落ち着きがなくなったりする。友だちとの遊びでも、次に何をするか予測できないため、遊びの流れについていけず、一人で別の遊びを始めてしまう。絵カードや具体的な言葉で先の見通しを伝え、安心して活動に取り組めるような環境設定が重要。',vec:[0.3,0.2,-0.3,0.1,0.2,0.1,-0.2,-0.7,0,-0.4,-0.5,0.1,-0.6,0.3,-0.4]},
'396': {cat:'言語・コミュ',sc:'言語/コミュ・複合型',name:'発語少ない',age:'3',des:'(表出言語・模倣)自分の要求や気持ちを言葉で伝えることが難しく、発語が少ない傾向にある。また、周りの行動を模倣して学ぶことが苦手なため、集団での歌や手遊び、体操などの活動に参加することに困難が見られる。',vec:[0,0,0,0,0,0.2,-0.7,0,-0.6,-0.4,-0.2,0,0,0,-0.2]},
'397': {cat:'言語・コミュ',sc:'言語/コミュ・複合型',name:'言葉少、真似苦手',age:'3',des:'(表出言語・模倣)喉が渇いても「お茶」などの言葉が出ず、コップを指差したり、保育者の服を引っ張ったりして要求を示す。友だちが楽しそうに手遊びをしていても、見ているだけで自分から参加しようとせず、手本を見せても真似することが難しい。新しい遊びを導入する際も、保育者の説明を聞くだけでは理解が難しく、個別で手を取りながら繰り返し教える必要がある。言葉のモデルを多く提示し、模倣しやすい環境を整えながら、少しずつ言葉と行動を結びつける経験を積ませることが大切。',vec:[0.1,0.1,-0.2,0,-0.3,-0.4,-0.8,-0.5,-0.7,-0.2,-0.1,0.1,-0.3,0,-0.2]},
'398': {cat:'言語・コミュ',sc:'言語/コミュ・複合型',name:'見通し弱、衝動的',age:'5',des:'(見通し力・衝動性)次の活動や状況を予測することが苦手なため、活動の切り替えや予期せぬ出来事に混乱しやすく、その結果として衝動的な行動が出てしまう。自分の感情や行動をコントロールする力を育む支援が必要。',vec:[-0.1,0,0,0,0,0,0,-0.7,0,-0.5,0,0,-0.6,0,0]},
'399': {cat:'言語・コミュ',sc:'言語/コミュ・複合型',name:'切り替え、癇癪',age:'5',des:'(見通し力・衝動性)自由遊びから一斉活動への切り替えの際、「もうすぐお片付けの時間だよ」と事前に伝えても、遊びに夢中になりすぎて切り替えが難しく、急に片付けを促されると「いやだ！」と癇癪を起こしてしまう。友だちとのルールのあるゲームでは、負けそうになると途中で投げ出してしまったり、ルールを無視して自分の好きなように行動してしまったりする。見通しが立たない状況や、自分の思い通りにならない状況で、感情的に不安定になりやすい傾向が見られる。絵カードやタイマーを活用して活動の見通しを具体的に示し、自己コントロールの経験を積ませる支援が必要。',vec:[0.1,0.1,-0.1,0.1,0.3,0.3,0.2,-0.5,0.2,-0.5,-0.3,0.2,-0.6,0.1,0]},
'400': {cat:'言語・コミュ',sc:'言語/コミュ・複合型',name:'模倣が困難',age:'4',des:'(表出言語・模倣)日常的な会話や簡単な指示は理解できるものの、複雑な内容や抽象的な言葉の理解には時間がかかる。自分の意見や考えを言葉で表現することもできるが、語彙が限られていたり、説明が不十分だったりすることがある。特に、周りの行動を模倣して新しいことを覚えるのが苦手なため、集団での活動で遅れが見られる。',vec:[0,0,0,0,0,0.1,-0.3,0,-0.5,0,0,0,0,0,0]},
'401': {cat:'言語・コミュ',sc:'言語/コミュ・複合型',name:'語彙少ない、模倣難',age:'4',des:'(表出言語・模倣)「赤いブロックと青いブロックを、それぞれ箱に入れてね」という指示は理解できるが、「このお話の主人公はどんな気持ちだったと思う？」といった抽象的な質問には「わからない」と答えることが多い。自分の好きな遊びについては「これ、楽しい！」と表現できますが、なぜ楽しいのか、どうしてそう思うのかを詳しく説明することは難しい。新しい歌やおゆうぎを覚える際、友だちがすぐに真似して踊り始める中で、一人だけ戸惑って動けなかったり、見よう見まねでやってみてもぎこちなかったりする。言葉での説明だけでなく、視覚的な情報や具体的な体験を通して、理解と模倣を促す支援が必要。',vec:[0.3,0.1,0,-0.4,0.2,0.3,-0.5,-0.3,-0.6,-0.1,0.1,0.2,-0.1,0,0.1]},
'402': {cat:'遊びの拡張',sc:'運動好き',name:'体動かすの得意、座って集中苦手',age:'3',des:'走る・跳ぶなど体を動かす遊びが大好きで、外遊びでは誰よりも元気に走り回る。一方で椅子に座って集中する活動や、手先を使う製作活動はすぐに飽きてしまう。',vec:[0.6,0.4,0,-0.5,0.9,0,0,0,0,0,0,0.1,0,0,0]},
'403': {cat:'遊びの拡張',sc:'運動好き',name:'手先の不器用さ',age:'2',des:'積み木を積むことや、パズルをはめることが苦手。スプーンやフォークの使い方もぎこちなく、食事中にこぼすことが多い。一方で、体を大きく動かす遊びは好きで、ボールを追いかけたり、滑り台を何度も滑ったりする。室内では、体を動かせる広いスペースで走り回ったり、大きなブロックを運んだりして遊ぶことが多い。細かい手先を使う遊びにはあまり興味を示さず、すぐに諦めてしまう。',vec:[0.3,0.2,0,-0.6,0.7,0,0,0,0,0,0,0.1,0,0,0]},
'404': {cat:'遊びの拡張',sc:'運動好き',name:'活発・探索的',age:'4',des:'外遊びで誰よりも元気に走り回る。新しいことへの好奇心が旺盛で、友だちとも積極的に関わる。',vec:[0.3,0.2,0,0,0.9,0,0,0,0,0,0.7,0,0,0,0.6]},
'405': {cat:'遊びの拡張',sc:'感覚のこだわり',name:'特定の感触を嫌がる',age:'4',des:'砂や泥、絵の具など、手が汚れる感触を極端に嫌がる。水遊びや粘土遊びにも抵抗があり、清潔な状態を好む。一方で、ブロックやパズルなど、手を使っても汚れない遊びには集中して取り組む。 製作活動ではハサミやのりを使うことはできるが、絵の具や粘土、砂場遊びには参加しない。友だちが汚れて遊んでいるのを見ると、距離を取ることが多い。',vec:[0,0,-0.7,0.4,0,0,0,0,0.05,-0.2,-0.3,0.1,-0.3,0,0]},
'406': {cat:'遊びの拡張',sc:'感覚のこだわり',name:'偏食が強く食事が進まない',age:'2',des:'特定の食材や食感のものを嫌がり、食事の時間が進まない。新しい食べ物にはなかなか手を出さない。一方で、おままごとや料理の絵本には興味を示し、食べ物のおもちゃを並べたり、友だちにご飯を作ってあげたりして楽しそうに遊ぶ。',vec:[0,0,-0.5,0,0,0,0,0,0.1,0,0.5,0.05,-0.3,0,0.1]},
'407': {cat:'遊びの拡張',sc:'感覚のこだわり',name:'感覚過敏があり音に敏感',age:'3',des:'大きな音や予期せぬ音に驚きやすく、耳を塞いだり、その場から離れたりする。友だちの大きな声にも反応し、距離を取る。集団での賑やかな声や、楽器の音にも敏感に反応し、賑やかな活動や、大きな音が出る活動には参加したがらない。室内では、静かな場所でブロックやパズル、絵本などに集中し、一人遊びをしていることが多い。細かい作業は得意。',vec:[0.1,0,-0.7,0.6,-0.4,0,0,0.05,0,-0.3,-0.3,0.05,-0.4,0,-0.2]},
'408': {cat:'遊びの拡張',sc:'感情・衝動',name:'感情のコントロール難',age:'5',des:'自分の思い通りにならないと、すぐに癇癪を起こし、友だちとのトラブルが多く手が出てしまい、遊びが中断してしまう。気持ちの切り替えが苦手で、一度怒り出すと落ち着くまでに時間がかかる。一人遊びの時は比較的落ち着いているが、友だちとの関わりの中で感情が不安定になることが多い。一方で、動物や植物の世話をすることは好きで、優しく接することができ、生き物コーナーでは、静かに観察したり、水やりをしたりしている。',vec:[0,0,0,0,0.05,0,0.1,0,0.3,-0.7,-0.6,0.3,-0.7,0,0]},
'409': {cat:'遊びの拡張',sc:'感情・衝動',name:'多動傾向があり落ち着きない',age:'4',des:'室内でも外でも常に動き回っており、一つの活動に長く集中することが難しい。静かに座って行う活動は苦手。衝動的な行動が見られ、友だちの遊びに割り込んだり、順番を待てなかったりする。好奇心旺盛で新しいことへの挑戦意欲は高い。友だちの遊びに興味を持ってすぐに参加するが、すぐに飽きて次の遊びに移ってしまう。',vec:[0.3,0.1,0,0,0.8,0,0,-0.4,0.2,-0.2,-0.3,0.2,-0.6,0,0]},
'410': {cat:'遊びの拡張',sc:'感情・衝動',name:'集団活動苦手で離席多',age:'3',des:'集団での歌や手遊び、読み聞かせなどの活動中にすぐに飽きてしまい、席を離れて歩き回ったり、他のものに興味を示したりすることが多い。集中力が続かず、最後まで活動に参加できない。友だちが活動に参加している間も、一人で別の遊びを始める。好奇心旺盛で、新しいものや面白いものを見つけるのが得意で、新しい発見を楽しんでいる。',vec:[0.05,0,0,0,0.3,0,0,0,0.2,-0.2,-0.3,0.1,-0.4,0,0]},
'411': {cat:'遊びの拡張',sc:'感情・衝動',name:'友だちとの共有が苦手',age:'2',des:'自分の持っているおもちゃを友だちに貸さず、取り合いになると泣いてしまうことが多い。友だちが近くに来ると、おもちゃを隠したり、抱え込んだりする。また、友だちが使っているおもちゃを欲しがり、すぐに手を出してしまう。保育者との一対一の関わりでは「これちょうだい」などと要求を伝えられる。',vec:[0,0,0,0,0,0.1,0.3,0,0.05,-0.3,-0.4,0.3,-0.3,0,0]},
'412': {cat:'遊びの拡張',sc:'興味のこだわり',name:'特定の遊びに固執',age:'3',des:'特定のブロックやミニカー、滑り台など、決まったおもちゃや遊具でしか遊ぼうとせず、同じ遊び方を繰り返す。他の遊びには全く興味を示さない。保育者が新しい遊びを提示しても、見向きもしない。好きな遊びには長時間集中して取り組む。言葉はよく理解している。',vec:[0.1,0,0,0,0.1,0.2,0.05,0,0,0,0,0,-0.6,0,0]},
'413': {cat:'遊びの拡張',sc:'興味のこだわり',name:'1人で乗り物、図鑑に興味',age:'4',des:'電車や車のおもちゃに強い興味を示し、種類や名前を驚くほど覚えている。一人でじっくり眺めて遊ぶことが多く、友だちと一緒に遊ぶ場面は少ない。図鑑を見るのも好き。',vec:[0.05,0,0,0,0,0,0.3,0,0.7,0,-0.3,0.1,0,0,0]},
'414': {cat:'遊びの拡張',sc:'興味のこだわり',name:'こだわり強、切り替え苦手',age:'5',des:'遊びのルールや手順に強いこだわりがあり、変更されると混乱したり、拒否したりする。ブロック遊びでは、いつも同じパターンで構造物を作る、友だちが違う作り方を提案すると、受け入れない。一度始めた遊びは最後までやり通したい気持ちが強く、保育者の声かけに抵抗を示し、切り替えに時間がかかる。記憶力は良く、一度覚えたことは正確に再現できる。',vec:[0.05,0,0,0.3,0,0,0,0,0.6,0,-0.4,0.1,-0.7,0,0]},
'415': {cat:'遊びの拡張',sc:'コミュニケーション苦手',name:'歌リズム好き、言葉少',age:'3',des:'歌や音楽が流れると体を揺らして喜び、リズム遊びには積極的に参加する。一方で言葉でのやりとりは少なく、友だちとの会話を通した遊びにはあまり加わらない。',vec:[-0.1,0,0.3,0,0.6,0,-0.5,0,0,0.2,-0.3,0.1,0,0,0]},
'416': {cat:'遊びの拡張',sc:'コミュニケーション苦手',name:'言葉の遅れ',age:'3',des:'指示理解はできるものの、発語が少なく、自分の要求を指差しやジェスチャーで伝える。一方で、絵本や紙芝居を見るのは大好きで、集中して聞くことができる。絵本コーナーで一人で絵本を眺めたり、保育者の読み聞かせに熱心に耳を傾けたりする。友だちとの遊びでは、模倣遊びや並行遊びが多く、言葉のやりとりはほとんどない。',vec:[0,0,0,0,0,0.5,-0.6,0,0.4,0.5,0.1,0.4,0,0,0.3]},
'417': {cat:'遊びの拡張',sc:'コミュニケーション苦手',name:'発語少オウム返し多',age:'4',des:'発語はあるものの、質問に対してオウム返しで答えることが多く、自分の言葉で表現することが苦手。友だちとの会話も一方的になりがちで、やりとりが続かない。友だちが話しかけても、同じ言葉を繰り返したり、無言で頷いたりすることが多い。おままごとやごっこ遊びでは、友だちのセリフをそのまま真似て遊ぶ。友だちや保育者の行動をよく真似たり、絵本やテレビのセリフなどはよく覚えている。',vec:[0.05,0,0,0,0,0.1,-0.6,0,0.6,0,-0.3,0.1,0,0,0]},
'418': {cat:'遊びの拡張',sc:'コミュニケーション苦手',name:'言葉の表出少、表情乏',age:'4',des:'自分の気持ちや考えを言葉で表現することが苦手で、表情も乏しい。友だちとのコミュニケーションも少なく、感情のやりとりが見られにくい。保育者が話しかけても、短い返事や頷きで済ませる。一方で、絵を描くことや、粘土で形を作ることが得意で、集中して取り組む。製作活動では、黙々と自分の世界に入り込んで作品を作る。',vec:[0,0,0,0.6,0,0.05,-0.6,0,0,0.3,-0.3,0.1,-0.2,0,-0.2]},
'419': {cat:'遊びの拡張',sc:'コミュニケーション苦手',name:'嫌がることで気を引く悪循環',age:'5',des:'年長児男児。発達が遅れ、3歳児程度の幼さ。友だちとの関わりを求めるが発達の差からなじめずに、嫌がることをして気を引こうとする悪循環。手が出る、話を聞かず言いたいことを一方的に言う。以前は参加不可能だった習い事の時間は毎回参加できるようになり、最初の数分はやる気を持ち頑張る。傍につかないと別のことをしたり自由な発言が多い。大きな声で先生を繰り返し呼ぶので、挙手する合図を伝える。最近友だちに対して「ママ」と甘える姿が増えた(女子と遊ぶことが多い)。母のお迎えの時にもとても甘える。○○くんを慕っているが(ことあるごとに「○○くんと一緒にしたい」と言っている)○○くんには「嫌なことするからいや」と断られている。加減がわからないので気づいたらその場でどうすればよかったか?と一緒に考えるようにしている。発達支援の先生より「見通しを伝えると活動へ取り組みやすい。簡潔で具体的な指示や視覚情報を用いての説明があるとよい」とのこと。他児との兼ね合いなど一人担任でできることの限界を感じる。',vec:[-0.3,-0.1,-0.2,-0.2,0.4,-0.5,-0.3,-0.6,-0.2,-0.5,-0.6,0.3,-0.5,0.4,-0.5]},
'420': {cat:'遊びの拡張',sc:'自我・主体性',name:'友だちトラブル多',age:'4',des:'友だちとの遊びの中で自分の意見を強く主張し、自分の思い通りにならないとすぐに喧嘩になってしまう。遊びのルールを自分で決めたがり、友だちの意見を聞き入れられない。集団遊びでは、自分が中心になりたがる。リーダーシップを発揮したい気持ちが強く、友だちを引っ張っていく力は持っている。',vec:[0,0,0,0,0,0,0.3,0.2,0,-0.3,-0.4,0.2,-0.5,0,0.05]},
'421': {cat:'遊びの拡張',sc:'自我・主体性',name:'指示が通りにくい',age:'5',des:'保育者の指示がなかなか通らず、自分の興味のあることに没頭し、声かけに気づかない。集団での活動準備や片付けの際も、指示を無視して遊び続ける。他の友だちが動いても一人だけ違う行動を取る。一方で、自分で考えて行動することが得意で、独自のアイデアを持っているため遊びが盛り上がるので、友だちから遊びによく誘われ、友だちとの関係は良好。',vec:[0,0,0,0,0.3,-0.6,0.3,-0.4,0,0.2,0.6,0.3,-0.7,0,0.3]},
'422': {cat:'遊びの拡張',sc:'一人遊び集中',name:'製作・お絵描き没頭',age:'5',des:'クレヨンや粘土での製作活動に長時間集中できる。自分の世界に入り込んで黙々と作る一方、完成した作品を友だちに見せたり一緒に作ったりすることは少ない。',vec:[-0.1,0,0,0.8,0,0,0.3,0,0,0.5,-0.3,0,0.2,0,0]},
'423': {cat:'遊びの拡張',sc:'一人遊び集中',name:'自分ペースの遊びに安心感',age:'2',des:'決まったおもちゃで一人で遊ぶことに安心感を持っている。同じ遊びを繰り返すことが多く、新しい遊びや友だちとの関わりには少し慎重な様子を見せる。',vec:[0,0,0,0.05,0.05,0,0,0,0,0.3,-0.4,0.2,-0.5,0,-0.2]},
'424': {cat:'遊びの拡張',sc:'一人遊び集中',name:'人見知り強く集団入れず',age:'3',des:'初めての場所や人に慣れるのに時間がかかり、集団活動では保育者のそばを離れられないことが多い。友だちとの関わりも少なく、自分から声をかけることはほとんどない。自由遊びの時間も、保育者の近くで一人遊びをしたり、友だちの遊びを遠くから眺めたりしている。集団での歌や手遊びには参加できるが、友だちとのやりとりを伴う遊びには抵抗がある。一方で、静かに観察することが得意で、周りの状況をよく見ている。',vec:[0,0,0,0,0.05,0,0,0.2,0.3,0.1,-0.5,-0.3,-0.3,0,-0.2]},
'425': {cat:'遊びの拡張',sc:'一人遊び集中',name:'身体の使い方がぎこちない',age:'5',des:'走る、跳ぶ、ボールを投げるなどの全身運動が苦手で、バランスを崩しやすい。縄跳びや鉄棒など、複雑な動きを伴う運動にも抵抗がある。友だちとの外遊びでは、すぐに疲れてしまう。運動遊びにはあまり参加したがらず、友だちが遊んでいるのを眺めていることが多い。一方で、絵を描くことや、お話を考えることが得意で、想像力豊か。室内では、絵を描いたり、一人でお話を考えたりして遊ぶ。',vec:[-0.7,-0.6,0,0.4,-0.6,0,0.5,0,0,0.3,0,0.1,0,0,0]},
'426': {cat:'凹凸',sc:'運動＋・言葉－',name:'活発・運動得意、言語弱',age:'4',des:'外遊びが大好きで体を動かすことは得意。言葉が出にくく、友だちとのやり取りが少ない。',vec:[0.6,0.4,0,0.3,0.8,-0.3,-0.6,-0.2,0,0,-0.4,0.2,0,0,-0.3]},
'427': {cat:'凹凸',sc:'言葉＋・感覚－',name:'言語得意、身体・感覚困難',age:'4',des:'言葉は豊かで大人との会話が得意。しかし感覚過敏があり、体を動かす活動への参加が難しい。',vec:[0,0,-0.7,0,-0.6,0.5,0.8,0.3,0.2,-0.3,-0.3,0.6,-0.4,0,0]},
'428': {cat:'凹凸',sc:'意欲＋・社会－',name:'こだわり強、意欲あり',age:'3',des:'好きなことへの集中力は高いが、切り替えが難しく、他児との関わりやルールのある活動が苦手。',vec:[0,0,0,0,0.5,0,0,-0.3,0,-0.5,-0.5,0,-0.7,0,-0.4]},
'429': {cat:'凹凸',sc:'社交的＋・見通し－',name:'社交的、見通し弱',age:'5',des:'友だちと関わることが好きで積極的。しかし活動の順番や見通しを持つことが難しく、衝動的になりやすい。',vec:[0.3,0.2,0,0,0.6,-0.3,0.2,-0.7,0,-0.5,0.4,0.3,-0.6,0,0.5]}
     };

// ■■プリセット■■■■■■■■■■■■■■■■■■■■■■■■■■■┛
// 視覚効果 ゴーストカード━━━━━━━┓
function ghosto(){
const ghosts = [];
for (let i = 0; i < 50; i++) {
  const ghost = document.createElement('div');
  ghost.style.position = 'fixed';
  ghost.style.width = '40px';
  ghost.style.height = '60px';
  ghost.style.background = 'rgba(255,255,255,0.3)';
  ghost.style.borderRadius = '5px';
  ghost.style.left = Math.random()*100 + '%';
  ghost.style.top = Math.random()*100 + '%';
  ghost.vx = (Math.random()-0.5)*2; ghost.vy = (Math.random()-0.5)*2; // 速度
  document.body.appendChild(ghost);
  ghosts.push(ghost);
}


function swarm() {
  ghosts.forEach(g => {
    g.style.left = parseFloat(g.style.left) + g.vx + '%';
    g.style.top = parseFloat(g.style.top) + g.vy + '%';
    if (Math.random() < 0.01) g.remove(); // ランダム消滅
  });
  if (ghosts.length > 0) requestAnimationFrame(swarm);
  else {
   // オーブ形成とシャッフルへ
  }
}
swarm();
}

// 視覚効果 ゴーストカード━━━━━━━┛

function creativespark(){
// 視覚効果
// スタイルを追加（一度だけ、既に追加済みならスキップ）
if (!document.querySelector('#sparkStyle')) {
  const style = document.createElement('style');
  style.id = 'sparkStyle';
  style.textContent = `
    @keyframes sparkFly {
      0% {
        opacity: 1;
        transform: translate(0, 0) scale(1);
      }
      100% {
        opacity: 0;
        transform: translate(var(--dx), var(--dy)) scale(0.5) rotate(360deg);
      }
    }
    .spark {
      position: fixed;
      width: 50px; /* 大きく調整（4px → 12px） */
      height: 50px; /* 大きく調整（4px → 12px） */
      background: radial-gradient(circle, hsl(var(--hue), 100%, 50%) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      top: 50%;
      left: 50%;
      animation: sparkFly 1.5s ease-out forwards;
      box-shadow: 0 0 8px hsl(var(--hue), 100%, 50%); /* 光のハロー効果でさらに目立たせる */
    }
  `;
  document.head.appendChild(style);
}

// フェードなしでスパークのみ開始
const sparkInterval = setInterval(() => {
  const spark = document.createElement('div');
  spark.className = 'spark';
  spark.style.setProperty('--hue', Math.random() * 60); // 暖色系カラー
  const angle = Math.random() * Math.PI * 2;
  const distance = Math.random() * 200 + 100;
  spark.style.setProperty('--dx', `${Math.cos(angle) * distance}px`);
  spark.style.setProperty('--dy', `${Math.sin(angle) * distance}px`);
  document.body.appendChild(spark);
  setTimeout(() => spark.remove(), 1500);
}, 50); // 高速で複数生成してスパーク感
setTimeout(() => {
  clearInterval(sparkInterval);
  // シャッフルコードへ
}, 2000);

}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ★ファクトチェック効果: IIFEを通常関数に変更（即時実行をオフ）
function startEffect() {
  const canvas = document.getElementById('factCanvas');
  const siitiexus = canvas.getContext('2d', { alpha: true });
  resize();
// ━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿
  function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  }
// ━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿
  window.addEventListener('resize', resize);

  const start = performance.now();
  const duration = 3000; // 3秒
  const code = ['教育={H,R,ENV,W,X};', 'X={X₁:感覚素材体験⇒接触(水,砂,土,紙,粘土)', 'ENV₁:環境興味⇒探索∧区別(自他物)∧環境認知', '養護={LH,EM}', 'H₃:健康習慣⇒自立(食,排)', 'R₂:友達関心⇒模倣(友,保)∧ごっこ遊び', 'W₃:絵本・話⇒繰返し∧模倣遊び', '五領域=dict(H=健康,R=人間関係,ENV=環境,W=言葉,X=表現)', 'age=TargetAge(0-6)', '0.5*発達適合性+0.3*指針との一貫性+0.2*主体性', '教育LIST₄{H,R,ENV,W,X}', 'X₁:感覚素材体験⇒接触(水,砂,土,紙,粘土)', 'LH₄:健康増進⇒運動+休息∧援助(食事,排泄,着脱,清潔)', 'ENV₂:発見・思考⇒興味(玩具,絵本,遊具)∧性質(形,色,大小,量)', 'W₄:言語交流⇒ごっこ∧仲介(保)', 'EM₄:くつろぎ⇒活動バランス∧調和∧食事+休息', 'LIST₂{H,R,ENV,W,X}', 'LH=生命;EM=情緒;', 'LIST={ねらい,環境構成,予想される子どもの姿,配慮事項}', '[GUIDE]', 'TR≠Var(ENV₂等)⇒TR']; // 文字
  const lines = [];
// ━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿
  function spawnLine() {
    lines.push({
      text: code[Math.floor(Math.random() * code.length)],
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      life: 0,
      maxLife: 400 + Math.random() * 600,
    });
  }

  for (let i = 0; i < 50; i++) spawnLine();

  let last = performance.now();
  requestAnimationFrame(draw);
// ━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿
  function draw(now) {
    const dt = now - last;
    last = now;

    siitiexus.clearRect(0, 0, innerWidth, innerHeight);
    siitiexus.fillStyle = 'rgba(10,20,30,0.5)';
    siitiexus.fillRect(0, 0, innerWidth, innerHeight);

    siitiexus.font = '18px monospace';
    siitiexus.textBaseline = 'top';

    for (let i = lines.length - 1; i >= 0; i--) {
      const l = lines[i];
      l.life += dt;
      const alpha = 1 - l.life / l.maxLife;
      siitiexus.fillStyle = `rgba(255,150,224,${alpha * 0.8})`; //150,255,180
      siitiexus.fillText(l.text, l.x, l.y);
      if (l.life > l.maxLife) {
        lines.splice(i, 1);
        spawnLine();
      }
    }

    if (now - start < duration) {
      requestAnimationFrame(draw);
    } else {
      // 3秒後：Canvasをフェードアウト→非表示
      canvas.style.transition = 'opacity 0.6s ease';
      canvas.style.opacity = '0';
      setTimeout(() => (canvas.style.display = 'none'), 600);
    }
  }
}
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const ethics=`<div style="background:#faf7b6;color:black;font-size:14px;"><h3 style="color:red">※ これは<strong>参考情報</strong>です。</h3>…占いや適当な推測ではありません。…ですが、保育者が適当に文章を書くことはありませんが、保育者の主観・直感はややアバウトであり、事例の数値化は事例の文章に依存します。15次元を定義していますが、事例の文章が全ての次元に言及することは少ないです。なので、最終的なリーディング結果は<span style="color:red;font-weight:bold;">保育者の主観・直感ぐらいの精度</span>だと思ってください。その保育者の主観・直感を数値化して計算可能にし、数学的な根拠を持ったベクトル座標の分布、類似度などの計算で、<span style="color:red;font-weight:bold;">数学的に近い答えを推測する方法</span>です。計算結果をAIに与えて回答を導き出すため、<span style="color:red;font-weight:bold;">AIの気分やハルシネーションを防止</span>し、意図した回答を引き出せるよう<span style="color:red;font-weight:bold;">制御</span>しています。…が、もちろん機械的計算とAIで、データ元は保育者の直感・主観なので、間違うことはありますし、保育という極めて曖昧で多種多様な事象の状況を、正確に文章化・数値化はできませんので、<span style="color:red;font-weight:bold;">回答は参考程度にとどめてください</span>。</div>
`;

const txtxt = `<img src="../img/dn.png"><br>この事例を<br>別のスプレッドで<br>使う時は<br>スイッチを<br>ON<br>↓<br><div style="border:5px solid #aaa;border-radius:10px;margin:10px;padding:10px;"><label class="cche"><input type="checkbox" id="myCheckbox" class="sp" style="font-size:20px"><span class="checkmark"></span>&nbsp;<span class="status-label"></span></label></div>
`;
const lklkl = `下のリンクをクリック<br>即結果が出ます<br><ul style="border:5px solid #aaa;border-radius:10px;margin:10px;padding:10px;background:orange;"><img src="../img/zpd.png">
<li><a href="./developmental_dynamics4.htm">発達ダイナミクス4</a></li>
<li><a href="./emotion_spread.htm">情緒安定</a></li>
<li><a href="./sensory_spread.htm">感覚・身体</a></li>
<li><a href="./daily_living_skills.htm">生活スキル習得</a></li>
<li><a href="./childcare_environment.htm">保育環境デザイン</a></li>
<li><a href="./collab_spread.htm">保育者協働</a></li>
<li><a href="./timeline_spread.htm">育ちの時系列</a></li>
</ul>
`;

const zlink = `
<img src="../img/zpd.png" height="20"><strong>発達の最近接領域・共通ベクトル使用スプレッド</strong><br>
同じ15次元Qベクトルを持ちながら、場面に応じて「<span class="j0">どの次元空間を切り取るか</span>」「<span class="sp0">何を出発点にするか</span>」で、全く異なる問いに答えられる設計になっています。<br>
<table border="0" style="border-collapse: collapse;border: solid 1px;font-size:13px;">
<tr style="border: solid 1px;"><th style="border: solid 1px;">スプレッド名</th><th style="border: solid 1px;">問いの主体</th><th style="border: solid 1px;">出力</th><th style="border: solid 1px;">主軸次元</th><th style="border: solid 1px;">Qの使い方</th><th style="border: solid 1px;">その意味</th></tr>

<tr style="border: solid 1px;"><td style="border: solid 1px;">
<a href="./developmental_dynamics4.htm">発達ダイナミクス4</a></span>
</td><td style="border: solid 1px;">子どもの発達状態</td><td style="border: solid 1px;">ZPDと足場かけ</td><td style="border: solid 1px;"><span class="aj">A</span><span class="bj">B</span><span class="cj">C</span><span class="dj">D</span>全次元</td><td style="border: solid 1px;">そのまま・縮小・回転</td><td style="border: solid 1px;"><span class="sp1">子どもの状態</span>が出発点</td>
</tr>

<tr style="border: solid 1px;"><td style="border: solid 1px;">
<a href="./emotion_spread.htm">情緒安定</a></span>
</td><td style="border: solid 1px;">感情支援</td><td style="border: solid 1px;">保育者の援助法</td><td style="border: solid 1px;"><span class="cj">C次元(情緒)</span>主軸、感覚は補助</td><td style="border: solid 1px;">特定次元を反転・強調</td><td style="border: solid 1px;">特定の問いに絞り込む＝<span class="sp2">しんどさの反転</span>が出発点</td>

<tr style="border: solid 1px;"><td style="border: solid 1px;">
<a href="./sensory_spread.htm">感覚・身体</a></span>
</td><td style="border: solid 1px;">感覚統合・身体発達への特化支援</td><td style="border: solid 1px;">保育者の援助法</td><td style="border: solid 1px;"><span class="aj">A次元(身体・運動)</span>主軸、情緒は補助</td><td style="border: solid 1px;">特定次元を理想値へ誘引</td><td style="border: solid 1px;">特定の問いに絞り込む＝<span class="sp2">困難の理想方向</span>が出発点</td>

<tr style="border: solid 1px;"><td style="border: solid 1px;">
<a href="./lang_spread.htm">言語・コミュニケーション</a></span>
</td><td style="border: solid 1px;">言葉の育ち・伝えること・聞くことへの支援</td><td style="border: solid 1px;">保育者の援助法</td><td style="border: solid 1px;"><span class="bj">B次元(認知・言語)</span>主軸＋<span class="cj">C3大人信頼</span>補助</td><td style="border: solid 1px;">特定次元を強調・合成・差分分析</td><td style="border: solid 1px;">特定の問いに絞り込む＝<span class="sp2">困難の理想方向</span>が出発点</td>

</tr>
<tr style="border: solid 1px;"><td style="border: solid 1px;">
<a href="./daily_living_skills.htm">生活スキル習得</a></span>
</td><td style="border: solid 1px;">特定スキルの習得</td><td style="border: solid 1px;">動作目標と援助手順</td><td style="border: solid 1px;"><span class="aj">A4協調</span>×<span class="bj">B4模倣</span> 主軸</td><td style="border: solid 1px;">プラス次元だけを使う</td><td style="border: solid 1px;"><span class="sp3">今ある強み</span>が出発点</td>

</tr>
<tr style="border: solid 1px;"><td style="border: solid 1px;">
<a href="./play_expand_spread.htm">遊びの拡張</a></span>
</td><td style="border: solid 1px;">今の遊びパターンをどう広げるか</td><td style="border: solid 1px;">保育者が仕掛ける「遊びの足場」</td><td style="border: solid 1px;"><span class="aj">A5運動意欲</span>×<span class="cj">C2他児関係</span>×<span class="bj">B2表出言語</span> 主軸</td><td style="border: solid 1px;">相対的に高い次元のみ</td><td style="border: solid 1px;"><span class="sp3">強み</span>を起点にし、遊びの言語に変換</td>

</tr>
<tr style="border: solid 1px;"><td style="border: solid 1px;">
<a href="./childcare_environment.htm">保育環境デザイン</a></span>
</td><td style="border: solid 1px;">場・関係・時間の設計</td><td style="border: solid 1px;">環境構成の3軸提案</td><td style="border: solid 1px;"><span class="dj">D(環境)次元</span>主軸（3軸に分解）</td><td style="border: solid 1px;">理想ベクトルをベースにQで補正</td><td style="border: solid 1px;"><span class="sp4">あるべき姿</span>が出発点</td>

</tr>
<tr style="border: solid 1px;"><td style="border: solid 1px;">
<a href="./collab_spread.htm">保育者協働</a></span>
</td><td style="border: solid 1px;">保育チームの役割分担</td><td style="border: solid 1px;">チーム協働プラン</td><td style="border: solid 1px;"><span class="cj">C3大人信頼</span>・<span class="dj">D1家庭連携</span>を複数人格に分解</td><td style="border: solid 1px;">理想ベクトルをベースにQで補正</td><td style="border: solid 1px;"><span class="sp4">あるべき姿</span>が出発点</td>

</tr>
<tr style="border: solid 1px;"><td style="border: solid 1px;">
<a href="./timeline_spread.htm">育ちの時系列</a></span>
</td><td style="border: solid 1px;">長期的育ち</td><td style="border: solid 1px;">育ちの時系列分析</td><td style="border: solid 1px;"><span class="aj">A</span><span class="bj">B</span><span class="cj">C</span><span class="dj">D</span>全次元×時間スケール変形</td><td style="border: solid 1px;">そのまま・縮小・回転</td><td style="border: solid 1px;"><span class="sp1">子どもの状態</span>が出発点</td>

</tr>
</table>
`;

function ckls(si){
const cb = document.getElementById('myCheckbox');

document.addEventListener('DOMContentLoaded', () => {
    const saveState = localStorage.getItem('checkboxstatus');
       if(saveState === 'true'){
            console.log('saveStateオン',saveState);
            cb.checked = true;
       } else {
            console.log('saveStateオフ',saveState);
            cb.checked = false;
       }
    });
cb.addEventListener('change', () => {
    localStorage.setItem('checkboxstatus', cb.checked);
    localStorage.setItem('jn', si);
            console.log('cb.checked,選択idx',cb.checked,si);
    });
}
