// 消します style="display: none;"
// console.log('何をウケとッとんのや',arguments);  
// ────────────────────────────────────────
// ■slice
// 製作活動3.name.slice(-1) = 3
// 製作活動3.name.slice(1) = 作活動3
// 給食・食育3.slice(0, -1)  = 給食・食育  // 語尾を削除
// 園周辺散歩1.slice(0, 1)=園
// `${card.name.slice(2)}(${card.orientation.slice(1)})`
// ────────────────────────────────────────
// ■配列検索
// const PSDindex = PSD.findIndex(item => item.namae === q2);
// const ZIGENindex = ZIGEN.findIndex(item => item.name === gaps[0].dimension);
// ────────────────────────────────────────
// ■丸める
// .toFixed() 。数値として扱いたい場合は、最後に Number() で囲
// (0.692 * 100) -> 69.2 -> 四捨五入して 69 -> 100で割って 0.69
// health: Math.round(((vector[4] + vector[7]) / 2) * 100) / 100,
// 15次元を丸める。const card1vmrm = cardCurrent.vector.map(v => Math.round(v * 100) / 100);
// ────────────────────────────────────────
// ■配列を文字列へ
// const konkaipuri = Q.join(', '); // Qは配列
// ■文字列を配列へ
function parseCSV(str){
  return str.split(",").map(v => parseFloat(v.trim()));
}

function normalizez(arr){ // 数値の合計を1にする。 // モンテ2でも使う
  const s = arr.reduce((a,b)=>a+b,0);
  return arr.map(v => v / s);
}

function parseCSVJSON(str){
  return JSON.parse(str);
}
// ・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・
// --- 入力ベクトルの整形（[ ]つき、スペースOK） ---
function parseVec(str) {
    return str
      .replace(/\[/g, "")
      .replace(/\]/g, "")
      .split(/[, ]+/)
      .map(Number);
}
// ────────────────────────────────────────
    // Qの改行を;に
//     let textArray = text.split('\n');
//     let newText = textArray.join(';');

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// <H2>AI依頼リンク集</H2>代表的なものを集めました。どの会話型AIでも、このプロンプトを理解してリーディング解釈を生成してくれます。<ul><li><a href="https://chatgpt.com/" target="_blank">ChatGPT</a></li><li><a href="https://claude.ai/" target="_blank">Claude(クロード)</a></li><li><a href="https://gemini.google.com/app" target="_blank">Google Gemini</a></li><li><a href="https://www.manus.im/" target="_blank">Manus</a></li><li><a href="https://www.perplexity.ai/" target="_blank">perplexity</a></li><li><a href="https://chat.qwen.ai/" target="_blank">Qwen Chat</a></li></ul>他に、リンクは貼れませんが、X(旧ツイッター)のGrok、Microsoft Copilot(コパイロット) 、でも動作します。<br>※Google検索のAIモードでは動作しませんでした。

// HTML
// <span id="kekkahyouji"></span>
// JS
// const targetElement = document.getElementById("kekkahyouji");
// let outppp = '';
// outppp += `        <h3>いろいろ…</h3>`;
// targetElement.innerHTML = outppp;

// HTML
// <span class="kekkahyouji">
// JS
// const targetElement = document.querySelector(".kekkahyouji");
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// const CARDS {id,name:"2桁番号+名前",img,
//              vector:[15次元],polarity:{n_e, i_g, c_a, s_f, s_c},hue:0～360°,
//              // shocho,hoikubunmyaku,kodomo,hoikusha,
// g_i,g_k,g_h,k_i,k_k,k_h,z_i,z_k,z_h,z_e,
// b_i,b_k,b_h,a_i,a_k,a_h,i_i,i_k,i_h,
// polst対極性説明:{ne:,ig,ca,sf,sc},tokucho}
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 卒園式012削除。
// const PSD
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// const ZIGEN
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ■15次元
//        const DIMENSIONS = [
//            '主体性', '探索性', '協同性', '表現性', '身体性',
//            '計画性', '柔軟性', '安全性', '素材依存', '時間スケール',
//            '安定性', '刺激性', '葛藤性', '達成感', '繋がり性'
//        ];

// ■対極軸
//        const POLARITIES = ['養護←→教育', '個別←→集団', '静的←→動的', '構造←→自由', '安定←→挑戦'];
//     n_e: 0.0,        // nurture_education 
//     i_g: 0.0,         // individual_group 
//     c_a: 0.0,              // calm_active 
//     s_f: 0.0,        // structure_freedom 
//     s_c: 0.0,      // stability_challenge 

// ■位相　定義（説明用）
// const PHASE_HUE = {
//  trigger: { angle: 0, name: "きっかけ" },
//  imitation: { angle: 60, name: "模倣" },
//  structure: { angle: 120, name: "構造化" },
//  collaboration: { angle: 180, name: "協働" },
//  creation: { angle: 240, name: "創造" },
//  reflection: { angle: 300, name: "省察" },
// };
// 注：近傍区分での境界
// 330°～ 30°未満 → きっかけ（中心0°）
//  30°～ 90°未満 → 模倣　 （中心60°）
//  90°～150°未満 → 構造化 （中心120°）
// 150°～210°未満 → 協働　 （中心180°）
// 210°～270°未満 → 創造　 （中心240°）
// 270°～330°未満 → 省察　 （中心300°）
// ────────────────────────────────────────
// 対極相性計算
function calculatePolarityCompatibility(poA, poB) {
//  const axes = ['nurture_education', 'individual_group', 'calm_active', 
//              'structure_freedom', 'stability_challenge'];
let polarityA = [];let polarityB = []; let poklog = '<span class="keno">上位3軸を重視 → </span>';
polarityA.n_e = poA[0]; polarityA.i_g = poA[1]; polarityA.c_a = poA[2]; polarityA.s_f = poA[3];
polarityA.s_c = poA[4]; polarityB.n_e = poB[0]; polarityB.i_g = poB[1]; polarityB.c_a = poB[2];
polarityB.s_f = poB[3]; polarityB.s_c = poB[4];

const axes = ['n_e', 'i_g', 'c_a', 's_f', 's_c'];  
// const axes = ['養護←→教育', '個別←→集団', '静的←→動的', '構造←→自由', '安定←→挑戦'];  
  const distances = [];
  for (const axis of axes) {
    const valueA = polarityA[axis];
    const valueB = polarityB[axis];
    const distance = Math.abs(valueA - valueB);
    distances.push({ axis, distance });
  }
// console.log('distances',distances);
 
  distances.sort((a, b) => b.distance - a.distance);

  let score = 
    0.5 * distances[0].distance +   // 最大
    0.3 * distances[1].distance +   // 2位
    0.2 * distances[2].distance;    // 3位
  
   poklog += '( 0.6 × <u><span class="keno">対極最大軸「';
if(distances[0].axis==='n_e'){poklog += '養護←→教育';}
if(distances[0].axis==='i_g'){poklog += '個別←→集団';}
if(distances[0].axis==='c_a'){poklog += '静的←→動的';}
if(distances[0].axis==='s_f'){poklog += '構造←→自由';}
if(distances[0].axis==='s_c'){poklog += '安定←→挑戦';}
   poklog += '」距離 </span> '+distances[0].distance.toFixed(2)+'</u> ) ＋ ( 0.25 × <u><span class="keno">2位「';
if(distances[1].axis==='n_e'){poklog += '養護←→教育';}
if(distances[1].axis==='i_g'){poklog += '個別←→集団';}
if(distances[1].axis==='c_a'){poklog += '静的←→動的';}
if(distances[1].axis==='s_f'){poklog += '構造←→自由';}
if(distances[1].axis==='s_c'){poklog += '安定←→挑戦';}
   poklog += '」距離</span> '+distances[1].distance.toFixed(2)+'</u> ) ＋ ( 0.15 × <u><span class="keno">3位「';
if(distances[2].axis==='n_e'){poklog += '養護←→教育';}
if(distances[2].axis==='i_g'){poklog += '個別←→集団';}
if(distances[2].axis==='c_a'){poklog += '静的←→動的';}
if(distances[2].axis==='s_f'){poklog += '構造←→自由';}
if(distances[2].axis==='s_c'){poklog += '安定←→挑戦';}
   poklog += '」距離</span> '+distances[2].distance.toFixed(2)+'</u> ) ＝ ';
   poklog += (0.6 * distances[0].distance).toFixed(2) +' ＋ '+ (0.25 * distances[1].distance).toFixed(2) +' ＋ '+ (0.15 * distances[2].distance).toFixed(2) +' ＝ ';
   poklog += score.toFixed(2);
   poklog += '\n<br><span class="keno">0～1に大まかな正規化 → </span> '+ score.toFixed(2);
   score = score / 1.5  // 0〜1に正規化　元1.3
// console.log('対極score',score);
   poklog += ' ÷ 1.5 ＝ <span class="keb">'+ score.toFixed(2) + '</span>';
    poklog += '<span class="kes">…';

if (score>0.45){
    poklog += '「';
    if(distances[0].axis==='n_e'){poklog += '養護←→教育';}
    if(distances[0].axis==='i_g'){poklog += '個別←→集団';}
    if(distances[0].axis==='c_a'){poklog += '静的←→動的';}
    if(distances[0].axis==='s_f'){poklog += '構造←→自由';}
    if(distances[0].axis==='s_c'){poklog += '安定←→挑戦';}
    poklog += '」 の軸で強い補完関係。</span>';
    } else if (score>0.3){
    poklog += '中程度の補完関係。</span>';
    } else {
    poklog += '似た性質。補完関係は弱いため、重複の可能性。</span>';
    }

  return { score, poklog };
}
// ────────────────────────────────────────
// 位相相性計算
function calculatePhaseCompatibility(angleA, angleB) {
const hihe = '<span class="kes">…高(0.8～1.0): 「次の段階」として自然・発達の流れに沿っている〔ex: 時間的な流れで配置〕。</span>';
const mdhe = '<span class="kes">…中程度(0.4～0.7): 飛躍があるが可能〔ex: 意図的な段階飛ばし・急いで型を教える〕。</span>';
const lohe = '<span class="kes">…低(0.4未満): 発達段階的に流れが不自然の可能性。</span>';
let isoklog = '<span class="keno">';
let sc = 0;
  const diff = Math.abs(angleA - angleB);
    isoklog += ' 文脈とカードの位相の差分Δ</span> ＝ | <u>'+angleA+'°</u> － <u>'+angleB+'°</u> | ＝ '+diff+'°<br>\n';
  const distance = Math.min(diff, 360 - diff);
if (diff>=180){isoklog += '<span class="keno">360°の環なので、環状距離の短い方 </span>360 - '+diff.toFixed(0)+' ＝ '+distance.toFixed(0)+'° \n';}
  
  if (distance <= 60) {
     isoklog += '→<span class="keno">位相差0～60(連続・非常に高い相性) → ';
     isoklog += '<u>連続相性の式</span> 1.0 - ( <span class="keno">位相差</span> '+diff.toFixed(0)+' ÷ 60 ) ×  0.2</u>';
     isoklog += ' ＝  1.0 - '+ Number((distance / 60) * 0.2).toFixed(3);
     isoklog += ' ＝ <span class="keno">位相差相性スコア</span> <span class="keb">'+Number(1.0 - (distance / 60) * 0.2).toFixed(2) + '</span>';
     sc = 1.0 - (distance / 60) * 0.2;
     if (sc>=0.8){
         isoklog += hihe;
       } else if (sc>=0.4){
         isoklog += mdhe;
       }

  } else if (distance <= 120) {
     isoklog += '→<span class="keno">位相差60～120(1段階飛ばし・高い相性) → ';
     isoklog += '<u>1段階飛ばし相性の式</span> 0.8 - { ( <span class="keno">位相差</span> '+diff.toFixed(0)+' - 60 ) ÷ 60 } × 0.3</u>';
     isoklog += ' ＝  0.8 - '+ Number(((distance - 60 ) / 60) * 0.3).toFixed(3);
     isoklog += ' ＝ <span class="keno">位相差相性スコア</span> <span class="keb">'+Number(0.8 - ((distance - 60) / 60) * 0.3).toFixed(2) + '</span>';
     sc = 0.8 - ((distance - 60) / 60) * 0.3;
     if (sc>=0.8){
         isoklog += hihe;
       } else if (sc>=0.4){
        isoklog += mdhe;
      } else if (sc>0){
        isoklog += lohe;
      }

  } else {
     isoklog += '<span class="keno">位相差120～180(流れに少し無理があるかも・低い相性) → ';
     isoklog += '<u>低い相性の式</span> 0.5 - { ( <span class="keno">位相差</span> '+diff.toFixed(0)+' - 120 ) ÷ 60 } × 0.5</u>';
     isoklog += ' ＝  0.5 - '+ Number(((distance - 120 ) / 60) * 0.5).toFixed(3);
     isoklog += ' ＝ <span class="keno">位相差相性スコア</span> <span class="keb">'+Number(0.5 - ((distance - 120) / 60) * 0.5).toFixed(2) + '</span>';
     sc = 0.5 - ((distance - 120) / 60) * 0.5;
     if (sc>=0.4){
        isoklog += mdhe;
      } else if (sc>0){
        isoklog += lohe;
      }
  }
// console.log('？isoklog',isoklog);
    return { sc, isoklog };
}
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * 2つの角度を混合（線形補間）する関数
 * @param {number} angle1 - 1つ目の角度 (0-360)
 * @param {number} angle2 - 2つ目の角度 (0-360)
 * @param {number} alpha - 混合率 (0.0でangle1寄り、1.0でangle2寄り)
 * @returns {number} - 混合された角度 (0-360)
 */
function mixAngles(angle1, angle2, alpha) {
  // 1. 2点間の単純な差を計算
  let diff = angle2 - angle1;

  // 2. 差を -180° ～ 180° の範囲に収める (最短距離の判定)
  // これにより、360°を跨いだほうが近い場合に自動的に補正されます
  if (diff > 180) {
    diff -= 360;
  } else if (diff < -180) {
    diff += 360;
  }

  // 3. angle1 を基準に、最短距離 diff に対して混合率 alpha を掛けて加算
  let result = angle1 + diff * alpha;

  // 4. 結果を 0 ～ 360 の範囲に正規化
  result %= 360;
  if (result < 0) result += 360;

  return result;
}
// テスト実行: 10° と 220° の 0.5 (50%) 混合
// const example = mixAngles(10, 220, 0.5);
// console.log(`結果: ${example}°`); // 結果: 295°
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ★ グラデーション罫線
// HTMLの途中の例
// <span id="grkeisen"></span>
// <script>
// document.getElementById("grkeisen").innerHTML = grkei
// </script>
const grkei = `<hr style=" background-color:#f56342; border:none; box-shadow:1px 0px 9px 5px #f56342;">
<hr style=" background-color:#f5ad42; border:none; box-shadow:1px 0px 9px 5px #f5ad42;">
<hr style=" background-color:#f5ce42; border:none; box-shadow:1px 0px 9px 5px #f5ce42;">
<hr style=" background-color:#e9f542; border:none; box-shadow:1px 0px 9px 5px #e9f542;">
<hr style=" background-color:#b3f542; border:none; box-shadow:1px 0px 9px 5px #b3f542;">
<hr style=" background-color:#78f542; border:none; box-shadow:1px 0px 9px 5px #78f542;">
<hr style=" background-color:#42f569; border:none; box-shadow:1px 0px 9px 5px #42f569;">`;
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ★ 15次元値の解釈ガイド
const jigenkaishaku = `<h3>15次元値の解釈ガイド</h3><small>プリセット同士の比較や文脈の把握などに。重み付けで1.00を超える場合もあり。</small><table border=1><tr><td>値の範囲</td><td>解釈</td><td>補足</td></tr>
<tr><td><span style="color:#00BD89;background:white;">0.30</span><span style="color:#00BDB9;background:white;">～</span><span style="color:#00AEE1;background:white;">0.45</span></td>
<td>非常に低い — この特性はほぼ不在</td><td>その次元は場面の本質でない</td>
</tr>
<tr><td><span style="color:#098AFF; background:#FFFEC1;">0.45</span><span style="color:#094DFF; background:#FFFEC1;">～</span><span style="color:#090FFF; background:#FFFEC1;">0.60</span></td>
<td>低い — 背景的に存在する程度</td><td>意識的な働きかけは不要</td>
</tr>
<tr><td><span style="color:#4009FF; background:#C1FFF4;">0.60</span><span style="color:#7D09FF; background:#C1FFF4;">～</span><span style="color:#BB09FF; background:#C1FFF4;">0.75</span></td>
<td>中程度 — 場面に適度に含まれる</td><td>状況に応じた対応で十分</td>
</tr>
<tr><td><span style="color:#F909FF; background:#FFD8AC;">0.75～</span><span style="color:#FF098A; background:#FFD8AC;">0.85</span></td>
<td>高い — 場面を特徴づける主要因</td><td>保育者の意図的な設計が必要</td>
</tr>
<tr><td><span style="color:#FF098A; background:yellow;">0.85</span><span style="color:#FF094D; background:yellow;">～</span><span style="color:#FF090F; background:yellow;">1.00</span></td>
<td>非常に高い — 場面の中核をなす</td><td>環境・教材・言葉かけの最優先事項</td>
</tr>
<tr><td colspan="3" style="font-size:15px;">注: 葛藤性・刺激性・素材依存など一部の次元は、高い＝良い／低い＝悪いではなく、<br>
　場面の性質を示す記述的な指標です。</td>
</tr>
</table>
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ★プリセットカード表示
// outppp += precadi(mainPreset.name, 'right'); ＠クロスオーバー
//
// HTMLの途中の例
// <span id="purs"></span><H2>基本的な使い方</H2>
// <script>
// const pupu=precadi("園周辺散歩", "right")
// document.getElementById("purs").innerHTML = pupu
// </script>

function precadi(name, align){ // ex=('日常保育3', 'right')
const pricrdisp = `<table border=0 align="rignt" style="background-image:url('../img/a_infantia/preset.png');background-repeat:no-repeat;width:158px;height:260px;float:${align};margin:10px;"><tr><td style="width:158px;height:210px;">&nbsp;</td></tr><tr><td style="width:158px;height:50px;font-weight:bold;text-align:center;">${name}</td></tr></table>`;
return pricrdisp;
};
// ★次元カード表示
// outppp += Dcadi(gaps[0].dimension, 'right'); ＠クロスオーバー
function Dcadi(name, align){ // ex=('主体性', 'right')
let jgnimg = '';
     if (name==='主体性' || name==='探索性' || name==='協同性' || name==='表現性' || name==='身体性'){
             jgnimg = 'vec1-5.png';
     } else if (name==='計画性' || name==='柔軟性' || name==='安全性' || name==='素材依存' || name==='時間スケール'){
             jgnimg = 'vec6-10.png';
     } else if (name==='安定性' || name==='刺激性' || name==='葛藤性' || name==='達成感' || name==='繋がり性'){
             jgnimg = 'vec11-15.png';
     }
const Dcrdisp = `<table border=0 align="rignt" style="background-image:url('../img/a_infantia/${jgnimg}');background-repeat:no-repeat;width:158px;height:260px;float:${align};margin:10px;"><tr><td style="width:158px;height:210px;">&nbsp;</td></tr><tr><td style="width:158px;height:50px;font-weight:bold;text-align:center;">${name}</td></tr></table>`;
return Dcrdisp;
};


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ★15次元ベクトル色分け関数　v＝コンマ区切り数値配列(15)
function vec5x5(v){
const vecugjugo = '<ul><li>発達支援('+jgnc(v[0],1)+', '+jgnc(v[1],2)+', '+jgnc(v[2],3)+', '+jgnc(v[3],4)+', '+jgnc(v[4],5)+') [ ' + vctg(v[0]) + ' ,'+ vctg(v[1]) + ' ,'+ vctg(v[2]) + ' ,'+ vctg(v[3]) + ' ,' + vctg(v[4]) + ' ]</li><li>保育実践('+jgnc(v[5],6)+', '+jgnc(v[6],7)+', '+jgnc(v[7],8)+', '+jgnc(v[8],9)+', '+jgnc(v[9],10)+') [ ' + vctg(v[5]) + ' ,'+ vctg(v[6]) + ' ,'+ vctg(v[7]) + ' ,'+ vctg(v[8]) + ' ,' + vctg(v[9]) + ' ]</li><li>情緒・関係('+jgnc(v[10],11)+', '+jgnc(v[11],12)+', '+jgnc(v[12],13)+', '+jgnc(v[13],14)+', '+jgnc(v[14],15)+') [ ' + vctg(v[10]) + ' ,'+ vctg(v[11]) + ' ,'+ vctg(v[12]) + ' ,'+ vctg(v[13]) + ' ,' + vctg(v[14]) + ' ]</li></ul>';
return vecugjugo;
}

function jgnc(v,d){  // 数値で色分け次元名関数
const cor7='#00BD89; background:white;'; // 30-35
const cor8='#00BDB9; background:white;'; // 35-40
const cor9='#00AEE1; background:white;'; // 40-45
const cor10='#098AFF; background:#FFFEC1;'; // 45-50
const cor11='#094DFF; background:#FFFEC1;'; // 50-55
const cor12='#090FFF; background:#FFFEC1;'; // 55-60
const cor13='#4009FF; background:#C1FFF4;'; // 60-65
const cor14='#7D09FF; background:#C1FFF4;'; // 65-70
const cor15='#BB09FF; background:#C1FFF4;'; // 70-75
const cor16='#F909FF; background:#FFD8AC;'; // 75-80
const cor17='#FF098A; background:#FFD8AC;'; // 80-85
const cor18='#FF098A; background:yellow;'; // 85-90
const cor19='#FF094D; background:yellow;'; // 90-95
const cor20='#FF090F; background:yellow;'; // 95-100
const sps1='<span style="font-weight:bold;color:'; const sps2='">'; const sps3='</span>';
v=Number(v);
let tg="";let dd="";
if(v<=0.30){tg=sps1+cor7+sps2}
else if(v<=0.35){tg=sps1+cor7+sps2}
else if(v<=0.40){tg=sps1+cor8+sps2}
else if(v<=0.45){tg=sps1+cor9+sps2}
else if(v<=0.50){tg=sps1+cor10+sps2}
else if(v<=0.55){tg=sps1+cor11+sps2}
else if(v<=0.60){tg=sps1+cor12+sps2}
else if(v<=0.65){tg=sps1+cor13+sps2}
else if(v<=0.70){tg=sps1+cor14+sps2}
else if(v<=0.75){tg=sps1+cor15+sps2}
else if(v<=0.80){tg=sps1+cor16+sps2}
else if(v<=0.85){tg=sps1+cor17+sps2}
else if(v<=0.90){tg=sps1+cor18+sps2}
else if(v<=0.95){tg=sps1+cor19+sps2}
else if(v<=1.00){tg=sps1+cor20+sps2}
if(d===1){dd="主体"}
else if(d===2){dd="探索"}
else if(d===3){dd="協同"}
else if(d===4){dd="表現"}
else if(d===5){dd="身体"}
else if(d===6){dd="計画"}
else if(d===7){dd="柔軟"}
else if(d===8){dd="安全"}
else if(d===9){dd="素材依存"}
else if(d===10){dd="時間"}
else if(d===11){dd="安定"}
else if(d===12){dd="刺激"}
else if(d===13){dd="葛藤"}
else if(d===14){dd="達成感"}
else if(d===15){dd="繋がり"}
return tg+dd+sps3;
}

function vctg(v){  // 数値で色分け関数
const cr1="#93BD00"; // 0-5
const cr2="#63BD00"; // 5-10
const cr3="#34BD00"; // 10-15
const cr4="#04BD00"; // 15-20
const cr5="#00BD2B"; // 20-25
const cr6="#00BD5A"; // 25-30
const cr7='#00BD89; background:white;'; // 30-35
const cr8='#00BDB9; background:white;'; // 35-40
const cr9='#00AEE1; background:white;'; // 40-45
const cr10='#098AFF; background:#FFFEC1;'; // 45-50
const cr11='#094DFF; background:#FFFEC1;'; // 50-55
const cr12='#090FFF; background:#FFFEC1;'; // 55-60
const cr13='#4009FF; background:#C1FFF4;'; // 60-65
const cr14='#7D09FF; background:#C1FFF4;'; // 65-70
const cr15='#BB09FF; background:#C1FFF4;'; // 70-75
const cr16='#F909FF; background:#FFD8AC;'; // 75-80
const cr17='#FF098A; background:#FFD8AC;'; // 80-85
const cr18='#FF098A; background:yellow;'; // 85-90
const cr19='#FF094D; background:yellow;'; // 90-95
const cr20='#FF090F; background:yellow;'; // 95-100
const cr21="#BF0000"; // 100-105
const cr22="#AA0000"; // 105-110
const cr23="#AA2B00"; // 110-115
const cr24="#952500"; // 115-120
const cr25="#954A00"; // 120-125
const cr26="#804000"; // 125-130
const cr27="#806000"; // 130-135
const cr28="#6A5000"; // 135-140
const cr29="#6A5000"; // 140-145
const cr30="#555500"; // 145-150
const cr31="#405500"; // 150-155
const cr32="#304000"; // 155-160
const cr33="#204000"; // 160-165
const cr34="#152B00"; // 165-170

const sps1='<span style="font-weight:bold;color:'; const sps2='">'; const sps3='</span>';
v=Number(v);
let tg="";
if(v<=0.05){tg=sps1+cr1+sps2}
else if(v<=0.10){tg=sps1+cr2+sps2}
else if(v<=0.15){tg=sps1+cr3+sps2}
else if(v<=0.20){tg=sps1+cr4+sps2}
else if(v<=0.25){tg=sps1+cr5+sps2}
else if(v<=0.30){tg=sps1+cr6+sps2}
else if(v<=0.35){tg=sps1+cr7+sps2}
else if(v<=0.40){tg=sps1+cr8+sps2}
else if(v<=0.45){tg=sps1+cr9+sps2}
else if(v<=0.50){tg=sps1+cr10+sps2}
else if(v<=0.55){tg=sps1+cr11+sps2}
else if(v<=0.60){tg=sps1+cr12+sps2}
else if(v<=0.65){tg=sps1+cr13+sps2}
else if(v<=0.70){tg=sps1+cr14+sps2}
else if(v<=0.75){tg=sps1+cr15+sps2}
else if(v<=0.80){tg=sps1+cr16+sps2}
else if(v<=0.85){tg=sps1+cr17+sps2}
else if(v<=0.90){tg=sps1+cr18+sps2}
else if(v<=0.95){tg=sps1+cr19+sps2}
else if(v<=1.00){tg=sps1+cr20+sps2}
else if(v<=1.05){tg=sps1+cr21+sps2}
else if(v<=1.10){tg=sps1+cr22+sps2}
else if(v<=1.15){tg=sps1+cr23+sps2}
else if(v<=1.20){tg=sps1+cr24+sps2}
else if(v<=1.25){tg=sps1+cr25+sps2}
else if(v<=1.30){tg=sps1+cr26+sps2}
else if(v<=1.35){tg=sps1+cr27+sps2}
else if(v<=1.40){tg=sps1+cr28+sps2}
else if(v<=1.45){tg=sps1+cr29+sps2}
else if(v<=1.50){tg=sps1+cr30+sps2}
else if(v<=1.55){tg=sps1+cr31+sps2}
else if(v<=1.60){tg=sps1+cr32+sps2}
else if(v<=1.65){tg=sps1+cr33+sps2}
else if(v<=1.70){tg=sps1+cr34+sps2}
return tg+v+sps3;
}
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ★位相メーター
// 呼び出し例：保育位相スペクトラム
//       吐き出しHTML  
//       output += `<li>位相: ${s.hue}° (${huhue})<span id="my-placeholder${i}"></span></li>`;
// あとで関数呼び出し
// createPhaseMeter('my-placeholder0', selecds[0].hue, 'right', 0)
// createPhaseMeter('my-placeholder1', selecds[1].hue, 'right', 1)
// createPhaseMeter('my-placeholder2', selecds[2].hue, 'right', 2)
// createPhaseMeter('my-placeholder3', selecds[3].hue, 'right', 3)
// createPhaseMeter('my-placeholder4', selecds[4].hue, 'right', 4)
// createPhaseMeter('my-placeholder5', selecds[5].hue, 'right', 5)


/**
 * 指定したIDの要素内にメーターを生成し、描画する
 * @param {string} targetId - 挿入先の要素ID
 * @param {number} angle - 表示したい角度
 */
function createPhaseMeter(targetId, angle, align, num) {
  const container = document.getElementById(targetId);
  if (!container) return;

  // 1. HTMLを流し込む (背景画像用のコンテナとCanvas)
  // ※スタイルの width/height は 150px で固定
const mid=' <small>(中心'; const kok = ' <small>(後期・→';
const zek = ' <small>(前期・←'; const yrs = '寄り)</small>';
const ltg='°)</small>';
let huhue='';
    if (angle>=0 && angle < 15){huhue = "trigger きっかけ"+mid+"0"+ltg;}  // 15
       else if (angle>=15 && angle < 30){huhue = "trigger きっかけ"+kok+"模倣"+yrs;}
       else if (angle>=30 && angle < 45){huhue = "imitation 模倣"+zek+"きっかけ"+yrs;}
       else if (angle>=45 && angle < 75){huhue = "imitation 模倣"+mid+"60"+ltg;} // 30
       else if (angle>=75 && angle < 90){huhue = "imitation 模倣"+kok+"構造化"+yrs;}
       else if (angle>=90 && angle < 105){huhue = "structure 構造化"+zek+"模倣"+yrs;}
       else if (angle>=105 && angle < 135){huhue = "structure 構造化"+mid+"120"+ltg;} // 30
       else if (angle>=135 && angle < 150){huhue = "structure 構造化"+kok+"協働"+yrs;}
       else if (angle>=150 && angle < 165){huhue = "collaboration 協働"+zek+"構造化"+yrs;}
       else if (angle>=165 && angle < 195){huhue = "collaboration 協働"+mid+"180"+ltg;} // 30
       else if (angle>=195 && angle < 210){huhue = "collaboration 協働"+kok+"創造"+yrs;}
       else if (angle>=210 && angle < 225){huhue = "creation 創造"+zek+"協働"+yrs;}
       else if (angle>=225 && angle < 255){huhue = "creation 創造"+mid+"240"+ltg;} // 30
       else if (angle>=255 && angle < 270){huhue = "creation 創造"+kok+"省察"+yrs;}
       else if (angle>=270 && angle < 285){huhue = "reflection 省察"+zek+"創造"+yrs;}
       else if (angle>=285 && angle < 315){huhue = "reflection 省察"+mid+"300"+ltg;} // 30
       else if (angle>=315 && angle < 330){huhue = "reflection 省察"+kok+"きっかけ"+yrs;}
       else if (angle>=330 && angle < 345){huhue = "trigger きっかけ"+zek+"省察"+yrs;}
       else if (angle>=345 && angle < 360){huhue = "trigger きっかけ"+mid+"0"+ltg;}  // 15

  container.innerHTML = `
   <table border=0 style="float:${align};margin:10px;"><tr><td><strong>位相:</strong> ${angle}°(${huhue})<div class="meter-wrapper" style="position: relative; width: 150px; height: 150px; background: url('../img/iso.png') no-repeat center/cover; border-radius: 50%;">
      <canvas id="dynamicCanvas${num}" width="150" height="150" style="position: absolute; top: 0; left: 0;"></canvas>
    </div></td></tr></table>
  `;

  // 2. HTMLが書き込まれた「直後」にCanvasを取得
  const canvas = document.getElementById('dynamicCanvas'+num);
  const ctx = canvas.getContext('2d');

  // 3. 描画処理を実行
  drawMeter(ctx, angle);
}
// ────────────────────────────────────────
/**
 * Canvasに描画する実処理
 */
function drawMeter(ctx, angle) {
  const cx = 75, cy = 75, radius = 70; // デフォ radius =65
  const color = hueToHex(angle);
  const rad = (angle - 90) * Math.PI / 180;

  ctx.clearRect(0, 0, 150, 150);

  // 円の枠
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.strokeStyle = color;
  ctx.lineWidth = 10; // デフォ6
  ctx.stroke();

  // 針
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + Math.cos(rad) * (radius - 5), cy + Math.sin(rad) * (radius - 5));
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.stroke();

  // 中心点
  ctx.beginPath();
  ctx.arc(cx, cy, 5, 0, Math.PI * 2);
  ctx.fillStyle = '#000000';
  ctx.fill();
}
// ────────────────────────────────────────
/**
 * 色相角(hue)を純色の16進数カラーコードに変換する
 * @param {number} h - 0から360の色相角度
 * @returns {string} - #RRGGBB 形式の文字列
 */
function hueToHex(h) {
  h = h % 360;

  const f = (n) => {
    const k = (n + h / 30) % 12;
    // 彩度(a)100%、明度(l)50% の場合の簡略化した計算式
    const color = 0.5 - 0.5 * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    
    // 確実に 0-255 の範囲に収める
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };

  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ★対極性スケール　値書き込み関数　識別番号で区別
// taikyoku(PSD[PSDindex].pol[0],PSD[PSDindex].pol[1],PSD[PSDindex].pol[2],PSD[PSDindex].pol[3],PSD[PSDindex].pol[4],PSD[PSDindex].polst[0],PSD[PSDindex].polst[1],PSD[PSDindex].polst[2],PSD[PSDindex].polst[3],PSD[PSDindex].polst[4]); // 主プリ対極性スケール描写　＠クロスオーバースプレッド
// ↑関数呼び出し例
// t1～5＝対極性スコア　cis1～5＝対極性スコア説明文
// num＝識別番号

function taikyoku(t1,t2,t3,t4,t5,cis1,cis2,cis3,cis4,cis5,num){
// id pci1～5 数値  ←pt1～5
//    pmg1～5 ▼    ←pee1～5
const cs1 = document.getElementById("pcis1"+num);
const cs2 = document.getElementById("pcis2"+num);
const cs3 = document.getElementById("pcis3"+num);
const cs4 = document.getElementById("pcis4"+num);
const cs5 = document.getElementById("pcis5"+num);

// 対極性スコアメモリタグ
const pee1 = document.getElementById("pmg1"+num);
const pee2 = document.getElementById("pmg2"+num);
const pee3 = document.getElementById("pmg3"+num);
const pee4 = document.getElementById("pmg4"+num);
const pee5 = document.getElementById("pmg5"+num);
const pt1 = document.getElementById("pci1"+num);
const pt2 = document.getElementById("pci2"+num);
const pt3 = document.getElementById("pci3"+num);
const pt4 = document.getElementById("pci4"+num);
const pt5 = document.getElementById("pci5"+num);
if (pt1) {pt1.innerHTML = t1 ;}
if (pt2) {pt2.innerHTML = t2 ;}
if (pt3) {pt3.innerHTML = t3 ;}
if (pt4) {pt4.innerHTML = t4 ;}
if (pt5) {pt5.innerHTML = t5 ;}

const tgb = `<table border=0><tr><td style="width:`;
const tga = `px"></td><td><img src="../img/hari2.png" width="15" height="16"></td></tr></table>`;
const ms1 = tgb + 6 + tga; // -1.0
const ms09 = tgb + 12 + tga; // -0.9
const ms08 = tgb + 17 + tga; // -0.8
const ms07 = tgb + 22 + tga; // -0.7
const ms06 = tgb + 27 + tga; // -0.6
const ms05 = tgb + 32 + tga; // -0.5
const ms04 = tgb + 37 + tga; // -0.4
const ms03 = tgb + 42 + tga; // -0.3
const ms02 = tgb + 47 + tga; // -0.2
const ms01 = tgb + 52 + tga; // -0.1
const zero = tgb + 57 + tga; // 0
const pls01 = tgb + 62 + tga; // 0.1
const pls02 = tgb + 67 + tga; // 0.2
const pls03 = tgb + 72 + tga; // 0.3
const pls04 = tgb + 77 + tga; // 0.4
const pls05 = tgb + 82 + tga; // 0.5
const pls06 = tgb + 87 + tga; // 0.6
const pls07 = tgb + 92 + tga; // 0.7
const pls08 = tgb + 97 + tga; // 0.8
const pls09 = tgb + 102 + tga; // 0.9
const pls1 = tgb + 107 + tga; // 1

t1=Math.round(t1 * 10) / 10;
t2=Math.round(t2 * 10) / 10;
t3=Math.round(t3 * 10) / 10;
t4=Math.round(t4 * 10) / 10;
t5=Math.round(t5 * 10) / 10;

let tv1 = 0;let tv2 =0;let tv3 =0;let tv4 =0;let tv5 = 0;
if (t1===-1){tv1=ms1}
if (t1===-0.9){tv1=ms09}
if (t1===-0.8){tv1=ms08}
if (t1===-0.7){tv1=ms07}
if (t1===-0.6){tv1=ms06}
if (t1===-0.5){tv1=ms05}
if (t1===-0.4){tv1=ms04}
if (t1===-0.3){tv1=ms03}
if (t1===-0.2){tv1=ms02}
if (t1===-0.1){tv1=ms01}
if (t1===0){tv1=zero}
if (t1===0.1){tv1=pls01}
if (t1===0.2){tv1=pls02}
if (t1===0.3){tv1=pls03}
if (t1===0.4){tv1=pls04}
if (t1===0.5){tv1=pls05}
if (t1===0.6){tv1=pls06}
if (t1===0.7){tv1=pls07}
if (t1===0.8){tv1=pls08}
if (t1===0.9){tv1=pls09}
if (t1===1){tv1=pls1}
if (t2===-1){tv2=ms1}
if (t2===-0.9){tv2=ms09}
if (t2===-0.8){tv2=ms08}
if (t2===-0.7){tv2=ms07}
if (t2===-0.6){tv2=ms06}
if (t2===-0.5){tv2=ms05}
if (t2===-0.4){tv2=ms04}
if (t2===-0.3){tv2=ms03}
if (t2===-0.2){tv2=ms02}
if (t2===-0.1){tv2=ms01}
if (t2===0){tv2=zero}
if (t2===0.1){tv2=pls01}
if (t2===0.2){tv2=pls02}
if (t2===0.3){tv2=pls03}
if (t2===0.4){tv2=pls04}
if (t2===0.5){tv2=pls05}
if (t2===0.6){tv2=pls06}
if (t2===0.7){tv2=pls07}
if (t2===0.8){tv2=pls08}
if (t2===0.9){tv2=pls09}
if (t2===1){tv2=pls1}
if (t3===-1){tv3=ms1}
if (t3===-0.9){tv3=ms09}
if (t3===-0.8){tv3=ms08}
if (t3===-0.7){tv3=ms07}
if (t3===-0.6){tv3=ms06}
if (t3===-0.5){tv3=ms05}
if (t3===-0.4){tv3=ms04}
if (t3===-0.3){tv3=ms03}
if (t3===-0.2){tv3=ms02}
if (t3===-0.1){tv3=ms01}
if (t3===0){tv3=zero}
if (t3===0.1){tv3=pls01}
if (t3===0.2){tv3=pls02}
if (t3===0.3){tv3=pls03}
if (t3===0.4){tv3=pls04}
if (t3===0.5){tv3=pls05}
if (t3===0.6){tv3=pls06}
if (t3===0.7){tv3=pls07}
if (t3===0.8){tv3=pls08}
if (t3===0.9){tv3=pls09}
if (t3===1){tv3=pls1}
if (t4===-1){tv4=ms1}
if (t4===-0.9){tv4=ms09}
if (t4===-0.8){tv4=ms08}
if (t4===-0.7){tv4=ms07}
if (t4===-0.6){tv4=ms06}
if (t4===-0.5){tv4=ms05}
if (t4===-0.4){tv4=ms04}
if (t4===-0.3){tv4=ms03}
if (t4===-0.2){tv4=ms02}
if (t4===-0.1){tv4=ms01}
if (t4===0){tv4=zero}
if (t4===0.1){tv4=pls01}
if (t4===0.2){tv4=pls02}
if (t4===0.3){tv4=pls03}
if (t4===0.4){tv4=pls04}
if (t4===0.5){tv4=pls05}
if (t4===0.6){tv4=pls06}
if (t4===0.7){tv4=pls07}
if (t4===0.8){tv4=pls08}
if (t4===0.9){tv4=pls09}
if (t4===1){tv4=pls1}
if (t5===-1){tv5=ms1}
if (t5===-0.9){tv5=ms09}
if (t5===-0.8){tv5=ms08}
if (t5===-0.7){tv5=ms07}
if (t5===-0.6){tv5=ms06}
if (t5===-0.5){tv5=ms05}
if (t5===-0.4){tv5=ms04}
if (t5===-0.3){tv5=ms03}
if (t5===-0.2){tv5=ms02}
if (t5===-0.1){tv5=ms01}
if (t5===0){tv5=zero}
if (t5===0.1){tv5=pls01}
if (t5===0.2){tv5=pls02}
if (t5===0.3){tv5=pls03}
if (t5===0.4){tv5=pls04}
if (t5===0.5){tv5=pls05}
if (t5===0.6){tv5=pls06}
if (t5===0.7){tv5=pls07}
if (t5===0.8){tv5=pls08}
if (t5===0.9){tv5=pls09}
if (t5===1){tv5=pls1}

if (pee1) {pee1.innerHTML = tv1;}
if (pee2) {pee2.innerHTML = tv2;}
if (pee3) {pee3.innerHTML = tv3;}
if (pee4) {pee4.innerHTML = tv4;}
if (pee5) {pee5.innerHTML = tv5;}

if (cs1) {cs1.innerHTML = cis1;}
if (cs2) {cs2.innerHTML = cis2;}
if (cs3) {cs3.innerHTML = cis3;}
if (cs4) {cs4.innerHTML = cis4;}
if (cs5) {cs5.innerHTML = cis5;}
}

// ────────────────────────────────────────

// ★対極性スケール　土台描写　識別番号で区別
let taikyokuseisukoa = "";

function taikyokudodai(num){
taikyokuseisukoa = `<canvas id="polMeter${num}" width="650" height="150" style="position:absolute;"><div id="ppp${num}" class="pol${num}">
<img id="hari1" src="../img/hari.png" width="9" height="13"><img id="hari2" src="../img/hari.png" width="9" height="13"><img id="hari3" src="../img/hari.png" width="9" height="13"><img id="hari4" src="../img/hari.png" width="9" height="13"><img id="hari5" src="../img/hari.png" width="9" height="13"></div></canvas>
<table border=0 style="text-align:center; background:white; padding:2px; border-radius:22px;">
<tr><td colspan="5">●　●　●　対極性スコア　●　●　●</td></tr>
<tr><td>養護↔教育</td><td>個別↔集団</td><td>静↔動</td><td>構造↔自由</td><td>安定↔挑戦</td></tr>
<tr><td style="background:#ffefcf;font-size:20px;"><span id="pci1${num}">0</span></td><td style="background:#ffefcf;font-size:20px;"><span id="pci2${num}">0</span></td><td style="background:#ffefcf;font-size:20px;"><span id="pci3${num}">0</span></td><td style="background:#ffefcf;font-size:20px;"><span id="pci4${num}">0</span></td><td style="background:#ffefcf;font-size:20px;"><span id="pci5${num}">0</span></td></tr>
<tr><td style="width:127px;height:53px;background:url(../img/pol.png);background-repeat: no-repeat;"><span id="pmg1${num}"></span></td><td style="width:127px;height:53px;background:url(../img/pol.png);background-repeat: no-repeat;"><span id="pmg2${num}"></span></td><td style="width:127px;height:53px;background:url(../img/pol.png);background-repeat: no-repeat;"><span id="pmg3${num}"></span></td><td style="width:127px;height:53px;background:url(../img/pol.png);background-repeat: no-repeat;"><span id="pmg4${num}"></span></td><td style="width:127px;height:53px;background:url(../img/pol.png);background-repeat: no-repeat;"><span id="pmg5${num}"></span></td></tr>
<tr><td style="font-size:14px;"><span id="pcis1${num}">0</span></td><td style="font-size:14px;"><span id="pcis2${num}">0</span></td><td style="font-size:14px;"><span id="pcis3${num}">0</span></td><td style="font-size:14px;"><span id="pcis4${num}">0</span></td><td style="font-size:14px;"><span id="pcis5${num}">0</span></td></tr>
<tr><td colspan="5" style="height:10px;"></td></tr>
</table>`;
return taikyokuseisukoa;
}
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ◆KL距離
function klDistance(P, Q){
  let kl = 0;
  for(let i=0;i<P.length;i++){
    if(P[i] > 0 && Q[i] > 0){
      kl += P[i] * Math.log(P[i] / Q[i]);
    }
  }
  return kl;
}
function calcAllDistances(P, Q, eps = 1e-12) {
  // 1. KL Divergence
  let KLd = 0;
  for(let i=0;i<P.length;i++){
    if(P[i] > 0 && Q[i] > 0){
      KLd += P[i] * Math.log(P[i] / Q[i]);
    }
  }

  // 2. JS Divergence
  function KL(A, B) {
    return A.reduce((s, a, i) => {
      if (a < eps) return s;
      return s + a * Math.log(a / (B[i] + eps));
    }, 0);
  }
  const M = P.map((p, i) => 0.5 * (p + Q[i]));
  const JS = 0.5 * KL(P, M) + 0.5 * KL(Q, M);

  // 3. Hellinger
  let Hs = 0;
  for (let i = 0; i < P.length; i++) {
    const diff = Math.sqrt(P[i]) - Math.sqrt(Q[i]);
    Hs += diff * diff;
  }
  const Hellin = (1 / Math.sqrt(2)) * Math.sqrt(Hs);

  // 4. Wasserstein
  let cdfP = 0, cdfQ = 0, Wasser = 0;
  for (let i = 0; i < P.length; i++) {
    cdfP += P[i];
    cdfQ += Q[i];
    Wasser += Math.abs(cdfP - cdfQ);
  }

  return { KLd, JS, Hellin, Wasser };
}
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const CARDS = [
      {id:0,name:"00探索",img:"../img/a_infantia/00u.png",vector:[0.95,0.98,0.40,0.60,0.70,0.30,0.95,0.50,0.80,0.60,0.60,0.85,0.30,0.70,0.50], polarity: { n_e: 0.6, i_g: -0.5, c_a: 0.3, s_f: 0.8, s_c: 0.7 }, hue: 10,shocho:"未知への一歩",hoikubunmyaku:"環境に触れ、確かめ、世界を広げようとする動き",kodomo:"触る・覗く・試す・移動する",hoikusha:"安全を確保しつつ、探索の連続性を支える",g_i:"未知に触れたい、確かめたいという探索欲が中心。",g_k:"触る・覗く・試す・移動する。",g_h:"探索できる環境構成が鍵。",k_i:"①現在の状態と、探索とは逆方向の「安定」「見通し」への力がぶつかっている。",k_k:"探索したいが、実は安心も求めている。",k_h:"探索と安定の両立が必要。",z_i:"探索の不足／過剰。",z_k:"動きすぎる／動けない。",z_h:"探索の“質”を整える。",z_e:"探索の“場”の調整（動線・選択肢・密度）。",b_i:"探索を深める中間ステップ。",b_k:"興味の持続が少し伸びる。",b_h:"素材・空間・発見の共有。",a_i:"“探索の中に安全を確保するための最小限の枠”を置く。",a_k:"不安時は大人のそばへ戻る。",a_h:"動線・危険予測・逃げ場。",i_i:"探索→模倣・収集・創造への移行。",i_k:"探索が別の形に変化する兆し。",i_h:"次の相への自然な移行を支える。", polst: { ne: "やや教育（発見を促す）", ig: "やや個別（自分のペースで試す）", ca: "やや動（動きながら試す）", sf: "強く自由（試行錯誤の自由）", sc: "強く挑戦（未知への探求）" }, tokucho: "探索性・主体性・柔軟性が最大級。計画不要で自由な発見重視。"}, 
      {id:1,name:"01はじまり",img:"../img/a_infantia/01u.png",vector:[0.60,0.70,0.65,0.55,0.50,0.80,0.70,0.85,0.40,0.40,0.88,0.60,0.40,0.60,0.75], polarity: { n_e: -0.3, i_g: 0, c_a: -0.2, s_f: 0, s_c: 0.5 }, hue: 5,shocho:"新しい流れの誕生",hoikubunmyaku:"活動や関係のスタートライン",kodomo:"新しい遊び・新しい関係への入り口",hoikusha:"入りやすい環境づくり・導入の工夫",g_i:"新しい流れ・活動・関係のスタート。",g_k:"新しい遊びに向かう。",g_h:"入りやすい導入が重要。",k_i:"①現在の状態と、「続きたい」「変わりたくない」という力がぶつかっている。",k_k:"慣れた遊びを続けたい。",k_h:"移行のサポートが必要。",z_i:"始まりへの不安／過剰な興奮。",z_k:"慎重すぎる／飛び込みすぎる。",z_h:"ペース調整。",z_e:"切り替えの見通し・段階化。",b_i:"始まりを自然に促す橋渡し。",b_k:"小さな成功体験。",b_h:"導入の工夫。",a_i:"“新しい活動の安心確保のための最小限の枠”を置く。",a_k:"大人のそばで始めたい。",a_h:"見通しの提示。",i_i:"始まり→継続・深化への移行。",i_k:"新しい活動が定着する。",i_h:"継続の仕掛け。", polst: { ne: "やや養護（不安への配慮）", ig: "中立（個別にも集団にも）", ca: "やや静（慎重なスタート）", sf: "中立", sc: "やや挑戦（新しい一歩）" }, tokucho: "安全性・安定性・計画性が高い。新しい環境への慎重な導入。"}, 
      {id:2,name:"02見守り",img:"../img/a_infantia/02u.png",vector:[0.50,0.40,0.70,0.40,0.40,0.85,0.75,0.95,0.30,0.85,0.95,0.35,0.20,0.60,0.85], polarity: { n_e: -0.9, i_g: -0.4, c_a: -0.7, s_f: -0.3, s_c: -0.8 }, hue: 330,shocho:"干渉しない支え",hoikubunmyaku:"子どもの主体性を尊重する距離感",kodomo:"自分のペースで進む",hoikusha:"必要な時だけそっと寄り添う",g_i:"子どもの主体性を尊重する時期。",g_k:"自分のペースで進む。",g_h:"介入を減らす。",k_i:"①現在の状態と、「もっと関わってほしい」という力がぶつかっている。",k_k:"もっと注目されたい。",k_h:"距離感の調整。",z_i:"見守りすぎ／介入しすぎ。",z_k:"放置感／依存。",z_h:"適切な関わりの見極め。",z_e:"距離感を調整する配置（位置・声かけの頻度）。",b_i:"見守りと関わりの中間。",b_k:"時々振り返る。",b_h:"応答的な関わり。",a_i:"見守りの最低限の安全ラインを示す位置。",a_k:"危険時は助けを求める。",a_h:"距離を保ちつつ監督。",i_i:"見守り→対話・模倣への移行。",i_k:"関わりを求め始める。",i_h:"関係の深まりを支える。", polst: { ne: "強く養護（安全基地）", ig: "やや個別（それぞれを見る）", ca: "強く静（静かな観察）", sf: "やや構造（枠の中で見守る）", sc: "強く安定（安心の提供）" }, tokucho: "安全性・安定性が最高値。長期的視点で子どもを観察。"}, 
      {id:3,name:"03養護",img:"../img/a_infantia/03u.png",vector:[0.40,0.20,0.60,0.30,0.70,0.85,0.40,0.95,0.50,0.90,0.98,0.20,0.10,0.60,0.70], polarity: { n_e: -1, i_g: -0.3, c_a: -0.5, s_f: -0.6, s_c: -1 }, hue: 355,shocho:"守られる場",hoikubunmyaku:"安心・安全・生活リズム",kodomo:"甘える・寄りかかる",hoikusha:"抱える・整える・受け止める",g_i:"安心・生活・情緒のケアが中心。",g_k:"甘える・寄りかかる。",g_h:"受容的な関わり。",k_i:"①現在の状態と、「自分でやりたい（自立）」という力がぶつかっている。",k_k:"自分でやりたい気持ち。",k_h:"自立支援とのバランス。",z_i:"ケアの不足／過剰。",z_k:"不安定／依存。",z_h:"ケアの質の調整。",z_e:"生活リズム・情緒安定のチェック。",b_i:"養護→自立への橋渡し。",b_k:"自分でやってみる兆し。",b_h:"見守りと手助けの切り替え。",a_i:"“生活・情緒の安定の最低限の安全確保のための枠”を置く。",a_k:"安心の基地を求める。",a_h:"生活リズムの整え。",i_i:"養護→探索・対話への移行。",i_k:"安心から行動が広がる。",i_h:"次のステップを支える。", polst: { ne: "最強養護（生命の基盤）", ig: "やや個別（個々のニーズ）", ca: "やや静（落ち着いた対応）", sf: "やや構造（生活リズム）", sc: "最強安定（安心の土台）" }, tokucho: "安定性・安全性・計画性・時間軸が突出。生命維持の基盤。"}, 
      {id:4,name:"04構造",img:"../img/a_infantia/04u.png",vector:[0.50,0.40,0.70,0.40,0.40,0.90,0.40,0.80,0.60,0.70,0.75,0.40,0.30,0.65,0.70], polarity: { n_e: 0, i_g: 0.4, c_a: -0.3, s_f: -0.9, s_c: -0.5 }, hue: 120,shocho:"枠組み・秩序",hoikubunmyaku:"ルール・手順・見通し",kodomo:"やり方を理解しようとする",hoikusha:"分かりやすい提示・環境構成",g_i:"ルール・手順・見通しが中心。",g_k:"やり方を理解しようとする。",g_h:"分かりやすい提示。",k_i:"①現在の状態と、「自由」「柔軟」に向かう力がぶつかっている。",k_k:"自由にやりたい。",k_h:"枠と自由の調整。",z_i:"構造の不足／過剰。見通しの不足／情報過多。",z_k:"混乱／窮屈。迷う／落ち着かない。",z_h:"枠の適正化。",z_e:"環境の枠組み（ルール・動線・配置）の適正化。視界・配置・情報量の調整。",b_i:"構造を柔らかく伝える。",b_k:"見通しが持てる。",b_h:"視覚化・段階化。",a_i:"“構造による最低限の安全確保のための最小限の枠”を置く。",a_k:"ルールで安心する。",a_h:"手順の明確化。",i_i:"構造→自由・創造への移行。",i_k:"枠の中での自由が育つ。",i_h:"柔軟性の付与。", polst: { ne: "中立（どちらにも必要）", ig: "やや集団（ルールは共有）", ca: "やや静（秩序ある環境）", sf: "強く構造（枠組み重視）", sc: "やや安定（予測可能性）" }, tokucho: "計画性が最も高い。ルール・枠組みを提供。柔軟性は低め。"}, 
      {id:5,name:"05対話",img:"../img/a_infantia/05u.png",vector:[0.75,0.50,0.85,0.85,0.30,0.60,0.80,0.70,0.30,0.50,0.80,0.55,0.35,0.70,0.90], polarity: { n_e: 0.4, i_g: -0.2, c_a: -0.4, s_f: 0.2, s_c: 0 }, hue: 190,shocho:"やりとり・交換",hoikubunmyaku:"言葉・視線・ジェスチャーの相互作用",kodomo:"伝えたい・応えたい",hoikusha:"応答的な関わり",g_i:"やりとり・応答が中心。",g_k:"伝えたい・応えたい。",g_h:"応答的な関わり。",k_i:"①現在の状態と、「一人でいたい」という力がぶつかっている。",k_k:"静かに過ごしたい。",k_h:"距離感の調整。",z_i:"対話の不足／過剰。",z_k:"伝わらない／話しすぎる。",z_h:"応答の質の調整。",z_e:"視覚的手がかり・音環境・距離の調整。",b_i:"対話を自然に促す。",b_k:"簡単なやりとりが増える。",b_h:"視線・ジェスチャーの活用。",a_i:"“対話の安心確保のための最小限の枠”を置く。",a_k:"否定されない場が必要。",a_h:"受容的な応答。",i_i:"対話→協働・共鳴への移行。",i_k:"関係が深まる。",i_h:"共同活動の準備。", polst: { ne: "やや教育（言葉の発達）", ig: "やや個別（1対1のやりとり）", ca: "やや静（じっくり聴く）", sf: "やや自由（自由な対話）", sc: "中立" }, tokucho: "協同性・表現性・繋がり性が高い。言葉による相互理解。"}, 
      {id:6,name:"06選択",img:"../img/a_infantia/06u.png",vector:[0.98,0.85,0.60,0.70,0.50,0.50,0.95,0.65,0.70,0.55,0.70,0.70,0.40,0.80,0.65], polarity: { n_e: 0.5, i_g: -0.7, c_a: -0.2, s_f: 0.7, s_c: 0.3 }, hue: 20,shocho:"意思決定",hoikubunmyaku:"選ぶ・決める・試す",kodomo:"自分で選びたい",hoikusha:"選択肢を提示し、尊重する",g_i:"選ぶ・決めるが中心。",g_k:"自分で選びたい。",g_h:"選択肢の提示。",k_i:"①現在の状態と、「決めてほしい」という力がぶつかっている。",k_k:"迷う・依存。",k_h:"導きの必要。",z_i:"選択の不足／過剰。",z_k:"選べない／選びすぎる。",z_h:"選択の整理。",z_e:"選択肢の量・質・提示方法の整理。",b_i:"選びやすくする工夫。",b_k:"小さな選択ができる。",b_h:"選択肢の絞り込み。",a_i:"“選択の中に安全ラインを示す最小限の枠”を置く。",a_k:"安心して選べる。",a_h:"どれを選んでも安全な環境。",i_i:"選択→主体性・意欲への移行。",i_k:"選んだ後の行動が育つ。",i_h:"選択の結果を支える。", polst: { ne: "やや教育（主体性育成）", ig: "強く個別（自己決定）", ca: "やや静（考える時間）", sf: "強く自由（選ぶ自由）", sc: "やや挑戦（自分で決める）" }, tokucho: "主体性が最高値。柔軟性・探索性も高く、自己決定を重視。"}, 
      {id:7,name:"07運動",img:"../img/a_infantia/07u.png",vector:[0.75,0.60,0.70,0.60,0.95,0.60,0.70,0.60,0.40,0.60,0.65,0.85,0.40,0.80,0.70], polarity: { n_e: 0.2, i_g: 0, c_a: 0.9, s_f: 0.4, s_c: 0.4 }, hue: 75,shocho:"身体の躍動",hoikubunmyaku:"粗大運動・全身の解放",kodomo:"走る・跳ぶ・揺れる",hoikusha:"安全な動線・挑戦の見守り",g_i:"身体の躍動が中心。",g_k:"走る・跳ぶ・揺れる。",g_h:"動線と安全。",k_i:"①現在の状態と、「静」「集中」に向かう力がぶつかっている。",k_k:"座りたい・落ち着きたい。",k_h:"静と動の切り替え。",z_i:"運動の不足／過剰。",z_k:"動きすぎ／動けない。",z_h:"活動量の調整。",z_e:"活動量・スペース・動線の調整。",b_i:"運動を自然に促す。",b_k:"小さな動きから始める。",b_h:"環境の工夫。",a_i:"“運動の安全確保のための最小限の枠”を置く。",a_k:"危険に気づきにくい。",a_h:"見守り強化。",i_i:"運動→協働・挑戦への移行。",i_k:"友だちと動く。",i_h:"協働遊びの準備。", polst: { ne: "やや教育（身体発達）", ig: "中立", ca: "強く動（身体を動かす）", sf: "やや自由（自由な動き）", sc: "やや挑戦（身体への挑戦）" }, tokucho: "身体性・刺激性が突出。粗大運動と身体表現の核心。"}, 
      {id:8,name:"08バランス",img:"../img/a_infantia/08u.png",vector:[0.65,0.50,0.70,0.60,0.70,0.80,0.85,0.80,0.50,0.75,0.88,0.50,0.25,0.70,0.75], polarity: { n_e: 0, i_g: 0, c_a: 0, s_f: 0, s_c: 0 }, hue: 315,shocho:"調整・均衡",hoikubunmyaku:"静と動・個と集団の調整",kodomo:"揺れながら整える",hoikusha:"過不足を見極める",g_i:"調整・均衡が中心。",g_k:"揺れながら整える。",g_h:"過不足の見極め。",k_i:"①現在の状態と、「偏り」「極端」に向かう力がぶつかっている。",k_k:"どちらかに寄りたい。",k_h:"偏りの理解。",z_i:"バランスの崩れ。やりすぎ／やらなすぎ。",z_k:"不安定。偏る／浅い。",z_h:"調整の必要。",z_e:"刺激・密度・動線のバランス調整。量・時間・刺激の“適量”調整。",b_i:"バランスを取り戻す中間。",b_k:"少しずつ整う。",b_h:"環境の微調整。",a_i:"“安定の確保のための最小限の枠”を置く。",a_k:"安心できる場が必要。",a_h:"固定点の用意。",i_i:"バランス→安定・調和への移行。",i_k:"落ち着きが育つ。",i_h:"安定の支援。", polst: { ne: "中立（どちらも必要）", ig: "中立", ca: "中立（静と動の調和）", sf: "中立（構造と自由の調和）", sc: "中立（安定と挑戦の調和）" }, tokucho: "安定性・柔軟性・計画性が均衡。調和的な活動配分。"}, 
      {id:9,name:"09省察",img:"../img/a_infantia/09u.png",vector:[0.70,0.55,0.70,0.75,0.30,0.70,0.60,0.75,0.30,0.50,0.80,0.40,0.30,0.75,0.75], polarity: { n_e: 0.6, i_g: -0.3, c_a: -0.8, s_f: 0.2, s_c: 0 }, hue: 300,shocho:"内省・振り返り",hoikubunmyaku:"経験を意味づける",kodomo:"じっと考える・見つめる",hoikusha:"言葉で整理を助ける",g_i:"内省・振り返りが中心。",g_k:"じっと考える。",g_h:"言葉で整理を助ける。",k_i:"①現在の状態と、「行動」「発散」に向かう力がぶつかっている。",k_k:"動きたい。",k_h:"静と動の調整。",z_i:"考えすぎ／考えなさすぎ。",z_k:"固まる／浅い。",z_h:"振り返りの質の調整。",z_e:"見通し・手がかり・時間の余白。",b_i:"省察を自然に促す。",b_k:"簡単な振り返り。",b_h:"言葉の支援。",a_i:"“安心して振り返れる場のための最小限の枠”を置く。",a_k:"否定されない環境。",a_h:"受容的な姿勢。",i_i:"省察→理解・学びへの移行。",i_k:"気づきが深まる。",i_h:"学びの橋渡し。", polst: { ne: "やや教育（振り返りで学ぶ）", ig: "やや個別（自分の体験）", ca: "強く静（静かに振り返る）", sf: "やや自由（自由な語り）", sc: "中立" }, tokucho: "表現性・達成感が高い。振り返りを通じた意味づけ。"}, 
      {id:10,name:"10循環",img:"../img/a_infantia/10u.png",vector:[0.60,0.65,0.70,0.60,0.60,0.85,0.70,0.75,0.60,0.90,0.80,0.55,0.30,0.70,0.75], polarity: { n_e: 0, i_g: 0.2, c_a: 0, s_f: -0.6, s_c: -0.4 }, hue: 340,shocho:"繰り返し・リズム",hoikubunmyaku:"反復による学び",kodomo:"同じ遊びを繰り返す",hoikusha:"飽きではなく深化として捉える",g_i:"繰り返し・リズムがクラスの中心。",g_k:"同じ遊びを何度も行う。",g_h:"反復を“飽き”ではなく“深化”として捉える。",k_i:"①現在の状態と、「変化」「新しさ」への力がぶつかっている。",k_k:"新しい刺激を求める子もいる。",k_h:"反復と変化のバランス。",z_i:"時間・反復の不足／過剰。",z_k:"すぐ飽きる／同じことに固執。焦る／だらける。",z_h:"反復の質を整える。",z_e:"反復の質を整える（素材・量・段階）。時間の見通し・余白・段階化。",b_i:"反復を自然に深める橋渡し。",b_k:"少しずつ変化を取り入れる。",b_h:"同じ遊びに“変化の種”を入れる。",a_i:"“ルーティン・見通しの安全を確保するための最小限の枠”を置く。",a_k:"繰り返しで安心する。",a_h:"生活リズムの安定。",i_i:"反復→理解・創造への移行。",i_k:"反復が学びに変わる。",i_h:"次の段階への橋渡し。", polst: { ne: "中立", ig: "やや集団（季節を共有）", ca: "中立", sf: "やや構造（リズム・繰り返し）", sc: "やや安定（予測可能）" }, tokucho: "時間軸・計画性が高い。季節・行事の繰り返しを象徴。"}, 
      {id:11,name:"11たくましさ",img:"../img/a_infantia/11u.png",vector:[0.85,0.80,0.65,0.70,0.85,0.50,0.75,0.50,0.60,0.60,0.60,0.85,0.50,0.85,0.65], polarity: { n_e: 0.3, i_g: -0.2, c_a: 0.7, s_f: 0.5, s_c: 0.9 }, hue: 85,shocho:"強さ・耐性",hoikubunmyaku:"挑戦・粘り",kodomo:"やり切る・踏ん張る",hoikusha:"成功体験を支える",g_i:"粘り・挑戦・踏ん張りが中心。",g_k:"やり切ろうとする姿。",g_h:"成功体験の支援。",k_i:"①現在の状態と、「甘え」「弱さ」に向かう力がぶつかっている。",k_k:"助けてほしい気持ち。",k_h:"無理をさせない。",z_i:"頑張りすぎ／頑張れなさすぎ。",z_k:"無理をする／すぐ諦める。",z_h:"挑戦の適正化。",z_e:"素材のステップ配置。選べる挑戦レベル。結果が分かる環境。",b_i:"小さな挑戦を積む橋渡し。",b_k:"少し頑張れる。",b_h:"段階的な挑戦設定。",a_i:"無理のない挑戦ラインを示す位置。",a_k:"安心して挑戦できる。",a_h:"撤退の自由を保証。",i_i:"挑戦→自信・意欲への移行。",i_k:"挑戦が主体性に変わる。",i_h:"成功の言語化。", polst: { ne: "やや教育（挑戦を促す）", ig: "やや個別（自分の力で）", ca: "強く動（冒険遊び）", sf: "やや自由（自由な挑戦）", sc: "強く挑戦（冒険・リスク）" }, tokucho: "主体性・身体性・刺激性・達成感が高い。挑戦と冒険。"}, 
      {id:12,name:"12待つこと",img:"../img/a_infantia/12u.png",vector:[0.50,0.30,0.80,0.50,0.30,0.75,0.60,0.80,0.20,0.70,0.85,0.30,0.60,0.60,0.80], polarity: { n_e: -0.4, i_g: -0.5, c_a: -0.7, s_f: -0.3, s_c: -0.2 }, hue: 145,shocho:"時間の成熟",hoikubunmyaku:"急がせない・熟すのを待つ",kodomo:"ゆっくり進む",hoikusha:"焦らず見守る",g_i:"急がず、熟すのを待つ時期。",g_k:"ゆっくり進む。",g_h:"焦らない姿勢。",k_i:"①現在の状態と、「早くしたい」という力がぶつかっている。",k_k:"急ぎたい・すぐ結果がほしい。",k_h:"テンポの調整。",z_i:"待てない／待ちすぎ。",z_k:"焦る／停滞。",z_h:"ペースの見極め。",z_e:"待てる環境の調整（密度・順番・見通し・待つ場所）。",b_i:"待つことを自然に促す。",b_k:"見通しがあると待てる。",b_h:"順番・視覚化の工夫。",a_i:"“待つための安心の場を確保するための最小限の枠”を置く。。",a_k:"落ち着ける場所が必要。",a_h:"環境の安定。",i_i:"待つ→理解・調和への移行。",i_k:"ゆっくりが力になる。",i_h:"成熟の兆しを捉える。", polst: { ne: "やや養護（見守り重視）", ig: "やや個別（それぞれのタイミング）", ca: "強く静（じっと待つ）", sf: "やや構造（順番・ルール）", sc: "やや安定（焦らない）" }, tokucho: "協同性・安定性・繋がり性が高い。葛藤性も中程度（順番待ち）。"}, 
      {id:13,name:"13変容",img:"../img/a_infantia/13u.png",vector:[0.70,0.65,0.70,0.75,0.60,0.70,0.70,0.70,0.50,0.40,0.65,0.70,0.50,0.80,0.75], polarity: { n_e: 0.4, i_g: 0, c_a: 0, s_f: 0.3, s_c: 0.6 }, hue: 320,shocho:"変化・移行",hoikubunmyaku:"気持ち・関係・遊びの変化",kodomo:"昨日と違う姿",hoikusha:"変化の背景を読む",g_i:"変化・移行・揺れが中心。",g_k:"昨日と違う姿。",g_h:"変化の背景を読む。",k_i:"①現在の状態と、「安定」「固定」に向かう力がぶつかっている。",k_k:"変わりたくない気持ち。",k_h:"変化と安定の調整。",z_i:"変化が急すぎる／停滞。",z_k:"揺れが大きい／固まる。",z_h:"変化の質を見極める。",z_e:"変化の段階化・予告・視覚化。",b_i:"変化を自然に促す。",b_k:"小さな変化から始める。",b_h:"環境の微調整。",a_i:"“変化の中の安心確保のための最小限の枠”を置く。",a_k:"戻れる場所が必要。",a_h:"安定の基地。",i_i:"変容→成長・理解への移行。",i_k:"変化が育ちに変わる。",i_h:"変化の意味づけ。", polst: { ne: "やや教育（成長の節目）", ig: "中立", ca: "中立（変化の時）", sf: "やや自由（変化を受け入れる）", sc: "やや挑戦（新しい段階へ）" }, tokucho: "達成感・表現性が高い。成長の節目・卒園などの転換期。"}, 
      {id:14,name:"14調和",img:"../img/a_infantia/14u.png",vector:[0.65,0.50,0.95,0.70,0.60,0.75,0.80,0.80,0.50,0.65,0.85,0.55,0.30,0.75,0.95], polarity: { n_e: 0.2, i_g: 0.8, c_a: 0, s_f: 0, s_c: 0 }, hue: 180,shocho:"まとまり・協調",hoikubunmyaku:"集団の安定・協力",kodomo:"合わせる・共有する",hoikusha:"関係の橋渡し",g_i:"まとまり・協調が中心。",g_k:"合わせる・共有する。",g_h:"関係の橋渡し。",k_i:"①現在の状態と調和の“静けさ・まとまり”がぶつかっている状態。",k_k:"個を出したい。集団に合わせることが負担になる。静けさを求める子もいる。",k_h:"個と集団のバランス調整。「合わせる」より「つながる」関係づくり。",z_i:"調和の不足／過剰。",z_k:"バラバラ／合わせすぎ。",z_h:"協調の質の調整。",z_e:"関係性の距離・人数・配置の調整。",b_i:"自然な協力を促す。",b_k:"簡単な協働。",b_h:"役割の工夫。",a_i:"“集団の安定確保のための最小限の枠”を置く。",a_k:"安心して参加できる。",a_h:"関係の見守り。",i_i:"調和→共鳴・深い関係への移行。",i_k:"気持ちの一致が育つ。",i_h:"関係の深化を支える。", polst: { ne: "やや教育（協同性育成）", ig: "強く集団（共に過ごす）", ca: "中立", sf: "中立", sc: "中立（調和そのもの）" }, tokucho: "協同性・繋がり性が最大級。集団の一体感と調和。"}, 
      {id:15,name:"15素材",img:"../img/a_infantia/15u.png",vector:[0.85,0.85,0.60,0.85,0.70,0.60,0.90,0.70,0.95,0.65,0.70,0.75,0.30,0.80,0.60], polarity: { n_e: 0.5, i_g: -0.3, c_a: -0.1, s_f: 0.6, s_c: 0.3 }, hue: 30,shocho:"触覚・物質性",hoikubunmyaku:"素材との出会い・感触遊び",kodomo:"触る・こねる・試す",hoikusha:"素材の選定・安全配慮",g_i:"素材との出会い・感触が中心。",g_k:"触る・こねる・試す。",g_h:"素材の選定。",k_i:"①現在の状態と、「関係」「言語」への力がぶつかっている。",k_k:"人との関わりを求める。",k_h:"素材と関係のバランス。",z_i:"素材への関わりの不足／過剰。",z_k:"触れない／こだわりすぎ。",z_h:"素材の調整。",z_e:"素材の量・質・配置・手に取りやすさ。",b_i:"素材を通した活動の橋渡し。",b_k:"素材で遊びが広がる。",b_h:"素材の組み合わせ。",a_i:"“素材の安全性確保のための最小限の枠”を置く。",a_k:"誤飲・怪我のリスク。",a_h:"安全な素材選び。",i_i:"素材→創造・表現への移行。",i_k:"素材が作品に変わる。",i_h:"表現の支援。", polst: { ne: "やや教育（素材との対話）", ig: "やや個別（自分で選ぶ）", ca: "やや静（じっくり作る）", sf: "やや自由（自由な創作）", sc: "やや挑戦（新しい素材）" }, tokucho: "素材依存が最高値。探索性・表現性・柔軟性も高い。"}, 
      {id:16,name:"16葛藤",img:"../img/a_infantia/16u.png",vector:[0.70,0.50,0.85,0.75,0.40,0.60,0.70,0.70,0.20,0.40,0.30,0.80,0.95,0.50,0.75], polarity: { n_e: 0.3, i_g: 0.3, c_a: 0.4, s_f: 0.2, s_c: 0.5 }, hue: 200,shocho:"ぶつかり・揺れ",hoikubunmyaku:"気持ちの衝突・選択の迷い",kodomo:"泣く・怒る・迷う",hoikusha:"気持ちの代弁・調整",g_i:"気持ちの衝突・揺れが中心。",g_k:"泣く・怒る・迷う。",g_h:"気持ちの代弁。",k_i:"①現在の状態と、「安定」「調和」に向かう力がぶつかっている。",k_k:"落ち着きたい。",k_h:"安心の提供。",z_i:"葛藤の不足／過剰。",z_k:"抑え込み／爆発。",z_h:"感情の調整。",z_e:"道具の複数化・動線分離・関わりの緩衝材・切り替えの見通し・終わりの合図・置き場。",b_i:"葛藤を整理する橋渡し。",b_k:"気持ちを言葉にする。",b_h:"共感的な対話。",a_i:"“感情の安全確保のための最小限の枠”を置く。",a_k:"安心して泣ける場。",a_h:"受容的な姿勢。",i_i:"葛藤→理解・成長への移行。",i_k:"気持ちの整理が進む。",i_h:"感情の意味づけ。", polst: { ne: "やや教育（社会性の学び）", ig: "やや集団（関係の中で）", ca: "やや動（感情の高まり）", sf: "やや自由（予測不能）", sc: "やや挑戦（乗り越える）" }, tokucho: "葛藤性が最高値。協同性・刺激性も高く、成長の契機。"}, 
      {id:17,name:"17慰め",img:"../img/a_infantia/17u.png",vector:[0.40,0.30,0.75,0.60,0.40,0.70,0.75,0.85,0.30,0.50,0.95,0.30,0.50,0.60,0.85], polarity: { n_e: -0.8, i_g: -0.6, c_a: -0.6, s_f: 0, s_c: -0.7 }, hue: 210,shocho:"癒し・回復",hoikubunmyaku:"安心の再構築",kodomo:"落ち着きを取り戻す",hoikusha:"寄り添い・共感",g_i:"情緒の回復・癒しが中心。",g_k:"甘える・寄り添う。",g_h:"共感的なケア。",k_i:"①現在の状態と、「挑戦」「自立」に向かう力がぶつかっている。",k_k:"自分でやりたい。",k_h:"自立支援とのバランス。",z_i:"情緒の回復(慰め)が不足／過剰になっている状態。ケアの質・量の偏りがズレの中心。",z_k:"不安定／依存。甘えたい／甘えられない。揺れが大きい。",z_h:"不安の回復。情緒の再調整。ケアの質の見直し。「慰めすぎ／足りなすぎ」の調整。",z_e:"安心できる場所・距離感・静かな空間。",b_i:"慰め→挑戦への橋渡し。",b_k:"落ち着いて動き出す。",b_h:"安心の再構築。",a_i:"“情緒の安全確保のための最小限の枠”を置く。",a_k:"安心できる大人が必要。",a_h:"寄り添いの継続。",i_i:"慰め→安定・意欲への移行。",i_k:"情緒が整う。",i_h:"次の活動への橋渡し。", polst: { ne: "強く養護（心の安全）", ig: "やや個別（個人に寄り添う）", ca: "やや静（落ち着かせる）", sf: "中立", sc: "強く安定（安心を取り戻す）" }, tokucho: "安定性が最高級。安全性・繋がり性も高い。情緒的支援。"}, 
      {id:18,name:"18物語",img:"../img/a_infantia/18u.png",vector:[0.70,0.60,0.80,0.90,0.50,0.65,0.85,0.75,0.60,0.60,0.75,0.70,0.35,0.80,0.80], polarity: { n_e: 0.4, i_g: 0.2, c_a: -0.5, s_f: 0.3, s_c: 0.2 }, hue: 305,shocho:"意味づけ・想像",hoikubunmyaku:"ごっこ遊び・ストーリー",kodomo:"役になりきる",hoikusha:"世界観を支える",g_i:"ごっこ遊び・意味づけが中心。",g_k:"役になりきる。",g_h:"世界観を支える。",k_i:"①現在の状態と、「現実」「構造」に向かう力がぶつかっている。",k_k:"現実的な遊びを求める子も。",k_h:"空想と現実の調整。",z_i:"物語の不足／過剰。設定やテーマが曖昧。世界観が情報過多。",z_k:"想像が広がらない／飛びすぎる。",z_h:"世界観の調整。",z_e:"想像の方向づけ。物語への入口の手がかり配置。",b_i:"物語を自然に促す。",b_k:"簡単な役割遊び。",b_h:"小道具の工夫。",a_i:"“物語遊びの安全確保のための最小限の枠”を置く。",a_k:"役になりすぎて混乱することも。",a_h:"現実への戻り道を用意。",i_i:"物語→理解・創造への移行。",i_k:"物語が学びに変わる。",i_h:"意味づけの支援。", polst: { ne: "やや教育（言葉・想像力）", ig: "やや集団（共に聴く）", ca: "やや静（聴き入る）", sf: "やや自由（想像の自由）", sc: "やや挑戦（物語の世界へ）" }, tokucho: "表現性が突出。協同性・柔軟性も高い。劇遊び・ごっこの核。"}, 
      {id:19,name:"19創造的自由",img:"../img/a_infantia/19u.png",vector:[0.98,0.90,0.60,0.95,0.70,0.40,0.98,0.60,0.85,0.65,0.70,0.85,0.35,0.90,0.65], polarity: { n_e: 0.7, i_g: -0.4, c_a: 0.2, s_f: 1, s_c: 0.5 }, hue: 240,shocho:"自由な発想",hoikubunmyaku:"制限のない表現",kodomo:"思いつくままに遊ぶ",hoikusha:"環境を開く・禁止を減らす",g_i:"自由な発想・表現が中心。",g_k:"思いつくままに遊ぶ。",g_h:"禁止を減らし、環境を開く。",k_i:"①現在の状態と、「構造」「秩序」に向かう力がぶつかっている。",k_k:"枠がほしい子もいる。",k_h:"自由と枠の調整。",z_i:"自由の不足／過剰。",z_k:"固まる／混乱。",z_h:"自由の質の調整。",z_e:"自由度の調整（素材・範囲・ルール）。",b_i:"自由を自然に促す。",b_k:"小さな選択から始める。",b_h:"環境の開放。",a_i:"自由を最大化するのではなく、“自由の中に安全を確保するための最小限の枠” を置く。",a_k:"自由すぎると不安。最小限の枠があると安心して創造性を発揮できる。",a_h:"自由を奪わずに、安全ラインだけを設定。「禁止」ではなく「安全のための境界」。自由と安全のバランスを取る。",i_i:"自由→創造・協働への移行。",i_k:"自由が作品や関係に変わる。",i_h:"創造の支援。", polst: { ne: "強く教育（創造性育成）", ig: "やや個別（自分の表現）", ca: "やや動（自由に動く）", sf: "最強自由（自由の極致）", sc: "やや挑戦（新しい表現）" }, tokucho: "主体性・柔軟性・表現性が最大級。創造活動の理想状態。"}, 
      {id:20,name:"20収集",img:"../img/a_infantia/20u.png",vector:[0.80,0.85,0.50,0.60,0.60,0.60,0.80,0.70,0.75,0.65,0.70,0.65,0.25,0.75,0.55], polarity: { n_e: 0.3, i_g: -0.5, c_a: -0.3, s_f: 0, s_c: 0.2 }, hue: 40,shocho:"集める・分類",hoikubunmyaku:"秩序化・コレクション",kodomo:"石・葉っぱ・玩具を集める",hoikusha:"集める行為の意味を尊重",g_i:"集める・分類する行為が中心。",g_k:"石・葉っぱ・玩具などを集める。",g_h:"収集行為の意味を尊重する。",k_i:"①現在の状態と、「散らす」「自由」「混沌」という力がぶつかっている。",k_k:"集めずに広げたい子もいる。",k_h:"秩序と自由の調整。",z_i:"収集の不足／過剰。",z_k:"集められない／こだわりすぎる。",z_h:"収集の質の調整。",z_e:"量の調整・収納場所・分類の手がかり。",b_i:"収集を自然に促す橋渡し。",b_k:"分類・並べる遊びが広がる。",b_h:"素材の提供。",a_i:"“収集物の安全管理のための最小限の枠” を置く。",a_k:"誤飲・持ち帰りトラブル。",a_h:"ルールの明確化。",i_i:"収集→理解・構造化への移行。",i_k:"集めたものに意味が生まれる。",i_h:"学びへの橋渡し。", polst: { ne: "やや教育（分類・認知）", ig: "やや個別（自分の宝物）", ca: "やや静（じっくり集める）", sf: "中立", sc: "やや挑戦（探し求める）" }, tokucho: "探索性・主体性が高い。集める・分類する認知活動。"}, 
      {id:21,name:"21祝祭",img:"../img/a_infantia/21u.png",vector:[0.65,0.50,0.85,0.90,0.70,0.80,0.65,0.75,0.70,0.50,0.75,0.85,0.30,0.95,0.88], polarity: { n_e: 0.5, i_g: 0.7, c_a: 0.6, s_f: -0.2, s_c: 0.4 }, hue: 350,shocho:"喜び・高揚",hoikubunmyaku:"イベント・特別感",kodomo:"盛り上がる・期待する",hoikusha:"雰囲気づくり",g_i:"高揚・期待・特別感が中心。",g_k:"盛り上がる・張り切る。",g_h:"雰囲気づくり。",k_i:"①現在の状態と、「静けさ」「落ち着き」に向かう力がぶつかっている。",k_k:"静かに過ごしたい子もいる。",k_h:"テンション差の調整。",z_i:"盛り上がりすぎ／ついていけない。",z_k:"興奮／不安。",z_h:"高揚のコントロール。",z_e:"刺激量・音・密度・役割の調整。",b_i:"祝祭のエネルギーを活動に橋渡し。",b_k:"達成感を感じる。",b_h:"成功体験の共有。",a_i:"“興奮の中の安全確保のための最小限の枠”を置く。",a_k:"事故リスクが上がる。",a_h:"動線・見守り強化。",i_i:"祝祭→落ち着き・浄化への移行。",i_k:"余韻・疲れが出る。",i_h:"クールダウンの計画。", polst: { ne: "やや教育（達成の共有）", ig: "強く集団（みんなで祝う）", ca: "やや動（盛り上がる）", sf: "やや構造（行事の形式）", sc: "やや挑戦（発表・披露）" }, tokucho: "達成感・表現性・繋がり性が最大級。発表会・行事の頂点。"}, 
      {id:22,name:"22遊び",img:"../img/a_infantia/22u.png",vector:[0.98,0.90,0.85,0.90,0.85,0.50,0.98,0.60,0.70,0.70,0.80,0.85,0.40,0.85,0.88], polarity: { n_e: 0, i_g: 0, c_a: 0.3, s_f: 0.6, s_c: 0.2 }, hue: 15,shocho:"純粋な楽しさ",hoikubunmyaku:"遊びそのものが目的",kodomo:"没頭・笑顔",hoikusha:"自由度の高い環境",g_i:"遊びそのものが中心。",g_k:"没頭・笑顔。",g_h:"自由度の高い環境。",k_i:"①現在の状態と、「構造」「課題」への力がぶつかっている。",k_k:"遊びより生活や学びを求める子も。",k_h:"遊びと課題の調整。",z_i:"遊びの不足／過剰。",z_k:"遊べない／遊びすぎる。",z_h:"遊びの質の調整。",z_e:"遊びの入口・選択肢・空間の分節化。",b_i:"遊びを自然に促す。",b_k:"簡単な遊びから始める。",b_h:"環境の工夫。",a_i:"自由を広げるのではなく、“遊びの安全確保のための最小限の枠”を置く。",a_k:"夢中で危険に気づかない。",a_h:"見守りとルール。",i_i:"遊び→学び・協働への移行。",i_k:"遊びが関係や理解に変わる。",i_h:"遊びの意味づけ。", polst: { ne: "中立（遊びは全ての基盤）", ig: "中立（どちらでも）", ca: "やや動（動的な遊び多め）", sf: "やや自由（自由遊び）", sc: "やや挑戦（遊びで挑戦）" }, tokucho: "ほぼ全次元で高スコア。保育の理想的状態・中心概念。"}, 
      {id:23,name:"23学び",img:"../img/a_infantia/23u.png",vector:[0.75,0.85,0.70,0.70,0.55,0.70,0.75,0.75,0.65,0.65,0.75,0.65,0.35,0.80,0.70], polarity: { n_e: 0.8, i_g: -0.2, c_a: -0.2, s_f: 0.2, s_c: 0.4 }, hue: 130,shocho:"理解・獲得",hoikubunmyaku:"経験の積み重ね",kodomo:"できた・分かった",hoikusha:"成功体験を言語化",g_i:"理解・獲得・気づきが中心。",g_k:"できた・わかった。",g_h:"成功体験の言語化。",k_i:"①現在の状態と、「遊び」「自由」への力がぶつかっている。",k_k:"学びより遊びたい。",k_h:"遊びと学びの調整。",z_i:"学びの不足／過剰。",z_k:"理解が浅い／詰め込み。",z_h:"学びの質の調整。",z_e:"「試す→気づく→確かめる」の循環が自然に起こる配置。比べられる距離、観察しやすい高さ、選べる難易度段階。子どもが自分で発見できる余白。",b_i:"学びを自然に促す。",b_k:"遊びの中で学ぶ。",b_h:"経験の積み重ね。",a_i:"“無理のない学びのための最小限の枠”を置く。",a_k:"できないと不安。",a_h:"成功体験の保証。",i_i:"学び→理解の深化・応用。",i_k:"学びが広がる。",i_h:"応用の支援。", polst: { ne: "強く教育（認知発達）", ig: "やや個別（自分で発見）", ca: "やや静（観察・思考）", sf: "やや自由（探究的学び）", sc: "やや挑戦（新しい発見）" }, tokucho: "探索性・達成感が高い。発見と思考を通じた認知発達。"}, 
      {id:24,name:"24身体",img:"../img/a_infantia/24u.png",vector:[0.70,0.60,0.65,0.55,0.95,0.65,0.70,0.80,0.40,0.70,0.75,0.80,0.35,0.75,0.65], polarity: { n_e: -0.2, i_g: 0, c_a: 0.6, s_f: 0.3, s_c: 0 }, hue: 70,shocho:"身体感覚",hoikubunmyaku:"体の使い方・姿勢・感覚統合",kodomo:"動きの洗練",hoikusha:"身体の発達段階を読む",g_i:"身体感覚・姿勢・動きが中心。",g_k:"体の使い方が発達。",g_h:"身体の発達段階を読む。",k_i:"①現在の状態と、「思考」「静」に向かう力がぶつかっている。",k_k:"座っていたい子もいる。",k_h:"動と静の調整。",z_i:"身体の使い方の不足／過剰。身体感覚の不足／過敏。",z_k:"不器用／動きすぎ。動けない／過剰反応。",z_h:"身体活動の調整。",z_e:"身体負荷・動線・素材の感触の調整。",b_i:"身体を自然に使う活動。",b_k:"簡単な運動。",b_h:"動線の工夫。",a_i:"“身体活動の安全確保のための最小限の枠”を置く。",a_k:"怪我のリスク。",a_h:"環境の整備。",i_i:"身体→協働・挑戦への移行。",i_k:"友だちと動く。",i_h:"協働運動の準備。", polst: { ne: "やや養護（健康の基盤）", ig: "中立", ca: "やや動（身体を使う）", sf: "やや自由（自由な動き）", sc: "中立" }, tokucho: "身体性が最高値。安全性・刺激性も高い。健康の基盤。"}, 
      {id:25,name:"25響き",img:"../img/a_infantia/25u.png",vector:[0.70,0.60,0.75,0.85,0.60,0.60,0.80,0.75,0.60,0.55,0.75,0.75,0.30,0.75,0.75], polarity: { n_e: 0.4, i_g: 0.3, c_a: 0, s_f: 0.2, s_c: 0.1 }, hue: 90,shocho:"共鳴・感情の共有",hoikubunmyaku:"気持ちのつながり",kodomo:"笑い合う・同調する",hoikusha:"共感的な関わり",g_i:"感情の共鳴・共有が中心。",g_k:"笑い合う・同調する。",g_h:"共感的な関わり。",k_i:"①現在の状態と、「個」「孤立」への力がぶつかっている。",k_k:"一人でいたい子もいる。",k_h:"距離感の調整。",z_i:"共鳴・刺激の不足／過剰。",z_k:"共感できない／巻き込まれすぎ。ぼんやり／興奮。",z_h:"関係の調整。",z_e:"光・音・色の刺激量の調整。",b_i:"共鳴を自然に促す。",b_k:"簡単な共有体験。",b_h:"共感の言語化。",a_i:"“情緒の安全確保のための最小限の枠”を置く。",a_k:"安心して気持ちを出せる。",a_h:"受容的な姿勢。",i_i:"共鳴→思いやり・協働への移行。",i_k:"他者理解が深まる。",i_h:"関係の深化。", polst: { ne: "やや教育（音楽的感性）", ig: "やや集団（共に楽しむ）", ca: "中立（静かな音も賑やかな音も）", sf: "やや自由（自由な表現）", sc: "やや挑戦（新しい音）" }, tokucho: "表現性が高い。音楽活動・リズム遊びの核心。"}, 
      {id:26,name:"26手",img:"../img/a_infantia/26u.png",vector:[0.75,0.70,0.65,0.80,0.85,0.65,0.80,0.75,0.85,0.60,0.70,0.70,0.30,0.80,0.65], polarity: { n_e: 0.3, i_g: -0.6, c_a: -0.4, s_f: 0.4, s_c: 0.3 }, hue: 80,shocho:"操作・巧緻性",hoikubunmyaku:"手先の活動",kodomo:"つまむ・切る・貼る",hoikusha:"発達に合った素材提供",g_i:"手先の操作・巧緻性が中心。",g_k:"つまむ・切る・貼る。",g_h:"発達に合った素材提供。",k_i:"①現在の状態と、「粗大運動」「身体」への力がぶつかっている。",k_k:"体を動かしたい子もいる。",k_h:"活動の切り替え。",z_i:"指先の活動不足／過剰な細かさ。",z_k:"不器用／細かすぎるこだわり。",z_h:"活動の調整。",z_e:"道具の大きさ・量・段階化。",b_i:"手先を自然に使う活動。",b_k:"簡単な操作遊び。",b_h:"素材の段階化。",a_i:"“道具の安全管理のための最小限の枠”を置く。",a_k:"ハサミ・小物のリスク。",a_h:"見守り強化。",i_i:"手先→創造・表現への移行。",i_k:"作品づくりが広がる。",i_h:"表現の支援。", polst: { ne: "やや教育（微細運動発達）", ig: "やや個別（自分の手で）", ca: "やや静（集中して作る）", sf: "やや自由（自由な創作）", sc: "やや挑戦（技能の習得）" }, tokucho: "身体性・素材依存・表現性が高い。微細運動と創作活動。"}, 
      {id:27,name:"27声",img:"../img/a_infantia/27u.png",vector:[0.70,0.55,0.75,0.85,0.40,0.60,0.80,0.75,0.30,0.50,0.80,0.65,0.35,0.70,0.85], polarity: { n_e: 0.5, i_g: -0.3, c_a: 0.2, s_f: 0.5, s_c: 0.2 }, hue: 95,shocho:"表現・主張",hoikubunmyaku:"言葉・音・呼びかけ",kodomo:"伝えたい気持ち",hoikusha:"言葉のキャッチボール",g_i:"声・言葉・表現が中心。",g_k:"伝えたい気持ちが強い。",g_h:"言葉のキャッチボール。",k_i:"①現在の状態と、「静」「内省」に向かう力がぶつかっている。",k_k:"静かに過ごしたい子も。",k_h:"声量の調整。",z_i:"声の不足／過剰。",z_k:"話せない・伝わらない／大声すぎる。",z_h:"表現の調整。",z_e:"音環境・距離・視覚的手がかり。",b_i:"声を自然に促す。",b_k:"簡単な発声・歌。",b_h:"言葉の支援。",a_i:"“表現の安心確保のための最小限の枠”を置く。",a_k:"否定されると萎縮。",a_h:"受容的な姿勢。",i_i:"声→対話・共鳴への移行。",i_k:"やりとりが深まる。",i_h:"対話の支援。", polst: { ne: "やや教育（言語発達）", ig: "やや個別（自分の声）", ca: "やや動（声を出す）", sf: "やや自由（自由な発声）", sc: "やや挑戦（表現する勇気）" }, tokucho: "表現性・繋がり性が高い。発語と言葉の萌芽。"}, 
      {id:28,name:"28繋がり",img:"../img/a_infantia/28u.png",vector:[0.65,0.55,0.90,0.75,0.50,0.65,0.80,0.75,0.40,0.60,0.85,0.60,0.35,0.75,0.90], polarity: { n_e: 0.1, i_g: 0.9, c_a: 0, s_f: 0, s_c: 0 }, hue: 185,shocho:"関係性",hoikubunmyaku:"友だち・大人とのつながり",kodomo:"寄り添う・一緒に遊ぶ",hoikusha:"関係の土台づくり",g_i:"関係性・寄り添いが中心。",g_k:"友だちや大人と一緒にいたい。",g_h:"関係の土台づくり。",k_i:"①現在の状態と、「個」「孤立」への力がぶつかっている。",k_k:"一人でいたい子もいる。",k_h:"距離感の調整。",z_i:"繋がりの不足／過剰。",z_k:"孤立／依存。",z_h:"関係の質の調整。",z_e:"人数・距離・関わりの場の調整。",b_i:"自然な関係づくり。",b_k:"簡単な協働。",b_h:"関係の橋渡し。",a_i:"“関係の安心確保のための最小限の枠”を置く。",a_k:"安心できる大人が必要。",a_h:"安定した関係の維持。",i_i:"繋がり→共鳴・思いやりへの移行。",i_k:"関係が深まる。",i_h:"関係の深化を支える。", polst: { ne: "やや教育（関係性育成）", ig: "強く集団（関係の中で）", ca: "中立", sf: "中立", sc: "中立（繋がりの安定）" }, tokucho: "協同性・安定性・繋がり性が高い。協力関係・情緒的安定の基盤。関係性そのもの。"}, 
      {id:29,name:"29小さな勇気",img:"../img/a_infantia/29u.png",vector:[0.80,0.70,0.65,0.70,0.70,0.60,0.75,0.70,0.50,0.50,0.70,0.70,0.45,0.85,0.70], polarity: { n_e: 0.2, i_g: -0.4, c_a: 0, s_f: 0.3, s_c: 0.7 }, hue: 100,shocho:"挑戦の芽",hoikubunmyaku:"少しの背伸び",kodomo:"やってみる",hoikusha:"背中をそっと押す",g_i:"少しの背伸び・挑戦の芽が中心。",g_k:"やってみる姿。",g_h:"背中をそっと押す。",k_i:"①現在の状態と、「安全」「慎重」への力がぶつかっている。",k_k:"挑戦したくない気持ち。",k_h:"無理をさせない。",z_i:"勇気の不足／過剰。",z_k:"怖がる／無謀。",z_h:"挑戦の適正化。",z_e:"小さな成功ポイント配置。安全と挑戦の境界ライン掲示。成功の見通しが自然に生まれる環境。",b_i:"小さな挑戦を自然に促す。",b_k:"少し頑張れる。",b_h:"段階的な挑戦設定。",a_i:"“挑戦の安全確保のための最小限の枠”を置く。",a_k:"安心して挑戦できる。",a_h:"撤退の自由。",i_i:"勇気→自信・意欲への移行。",i_k:"挑戦が自信に変わる。",i_h:"成功の言語化。", polst: { ne: "やや教育（挑戦を促す）", ig: "やや個別（自分の一歩）", ca: "中立", sf: "やや自由（自分で踏み出す）", sc: "強く挑戦（日常の挑戦）" }, tokucho: "主体性・達成感が高い。たくましさより穏やかな挑戦。"}, 
      {id:30,name:"30安らぎ",img:"../img/a_infantia/30u.png",vector:[0.50,0.30,0.70,0.50,0.40,0.75,0.70,0.85,0.40,0.75,0.95,0.25,0.15,0.65,0.80], polarity: { n_e: -0.9, i_g: -0.2, c_a: -0.9, s_f: 0, s_c: -0.9 }, hue: 335,shocho:"落ち着き・安心",hoikubunmyaku:"情緒の安定",kodomo:"穏やかに過ごす",hoikusha:"安心の環境づくり",g_i:"落ち着き・安心・情緒の安定が中心。",g_k:"穏やかに過ごす・ゆったり遊ぶ。",g_h:"安心の環境づくり。",k_i:"①現在の状態と、「刺激」「変化」に向かう力がぶつかっている。",k_k:"もっと動きたい・刺激がほしい。",k_h:"静と動の調整。",z_i:"安らぎの不足／過剰。",z_k:"落ち着かない／動けない。不安／こだわり。",z_h:"情緒の調整。",z_e:"静かな場所・隠れ家・密度・刺激量の調整。",b_i:"安らぎを自然に促す。",b_k:"ゆっくりした活動に移行。",b_h:"環境の静穏化。",a_i:"“安心の確保のための最小限の枠”を置く。",a_k:"安心できる大人・場所が必要。",a_h:"情緒の受容。",i_i:"安らぎ→意欲・挑戦への移行。",i_k:"落ち着きが力に変わる。",i_h:"次の動きへの橋渡し。", polst: { ne: "強く養護（休息）", ig: "やや個別（自分のペース）", ca: "強く静（くつろぎ）", sf: "中立", sc: "強く安定（安心感）" }, tokucho: "安定性が最高級。刺激性・葛藤性が最低。休息と落ち着き。"}, 
      {id:31,name:"31真似っこ",img:"../img/a_infantia/31u.png",vector:[0.70,0.60,0.90,0.80,0.70,0.40,0.85,0.75,0.50,0.50,0.75,0.65,0.30,0.70,0.88], polarity: { n_e: 0.5, i_g: 0.2, c_a: 0.1, s_f: -0.3, s_c: 0.2 }, hue: 60,shocho:"模倣・学習",hoikubunmyaku:"他者の行動を取り入れる",kodomo:"真似る・繰り返す",hoikusha:"モデルを示す",g_i:"模倣・学習が中心。",g_k:"大人や友だちを真似る。",g_h:"モデルを示す。",k_i:"①現在の状態と、「独自性」「自由」に向かう力がぶつかっている。",k_k:"自分のやり方でやりたい。",k_h:"模倣と創造の調整。",z_i:"模倣の不足／過剰。",z_k:"真似できない／真似しすぎる。",z_h:"模倣の質の調整。",z_e:"見本の提示・距離感・役割の調整。",b_i:"模倣を自然に促す。",b_k:"簡単な真似から始める。",b_h:"見本の提示。",a_i:"“模倣の安心確保のための最小限の枠”を置く。",a_k:"否定されると萎縮。",a_h:"肯定的な応答。",i_i:"模倣→創造・主体性への移行。",i_k:"真似から自分の形へ。",i_h:"自分らしさの支援。", polst: { ne: "やや教育（模倣学習）", ig: "やや集団（他者を見る）", ca: "やや動（動きを真似る）", sf: "やや構造（手本がある）", sc: "やや挑戦（新しいことに挑戦）" }, tokucho: "協同性・繋がり性が極めて高い。模倣学習の本質。"}, 
      {id:32,name:"32温かさ",img:"../img/a_infantia/32u.png",vector:[0.50,0.40,0.80,0.60,0.45,0.70,0.75,0.85,0.35,0.70,0.95,0.50,0.25,0.65,0.90], polarity: { n_e: -0.7, i_g: -0.2, c_a: -0.5, s_f: 0, s_c: -0.6 }, hue: 195,shocho:"情緒的なつながり",hoikubunmyaku:"優しさ・受容",kodomo:"甘える・寄り添う",hoikusha:"温かいまなざし",g_i:"情緒的なつながり・優しさが中心。",g_k:"甘える・寄り添う。",g_h:"温かいまなざし。",k_i:"①現在の状態と、「自立」「距離」に向かう力がぶつかっている。",k_k:"一人でやりたい。",k_h:"距離感の調整。",z_i:"温かさの不足／過剰。",z_k:"不安定／依存。",z_h:"情緒ケアの調整。",z_e:"関わりの距離・声のトーン・場の雰囲気。",b_i:"温かさを自然に届ける。",b_k:"安心して動き出す。",b_h:"共感的な関わり。",a_i:"“情緒の安全確保のための最小限の枠”を置く。",a_k:"安心できる大人が必要。",a_h:"受容的な姿勢。",i_i:"温かさ→意欲・関係の深化。",i_k:"安心が挑戦につながる。",i_h:"次のステップを支える。", polst: { ne: "強く養護（情緒的支援）", ig: "やや個別（個に寄り添う）", ca: "やや静（穏やかな関わり）", sf: "中立", sc: "やや安定（安心の提供）" }, tokucho: "安定性・繋がり性が最高級。情緒的温もりと応答性。"}, 
      {id:33,name:"33笑顔",img:"../img/a_infantia/33u.png",vector:[0.60,0.50,0.85,0.70,0.50,0.55,0.80,0.75,0.30,0.50,0.90,0.70,0.25,0.80,0.88], polarity: { n_e: -0.3, i_g: 0, c_a: 0.1, s_f: 0, s_c: -0.4 }, hue: 205,shocho:"喜び・肯定",hoikubunmyaku:"ポジティブな関係",kodomo:"笑う・楽しむ",hoikusha:"共に楽しむ",g_i:"喜び・肯定・ポジティブな関係が中心。",g_k:"笑う・楽しむ。",g_h:"共に楽しむ姿勢。",k_i:"①現在の状態と、笑顔とは逆方向の「不安」「緊張」に向かう力がぶつかっている。",k_k:"笑えない子もいる。",k_h:"情緒差の理解。",z_i:"笑顔の不足／過剰。",z_k:"楽しめない／ふざけすぎる。",z_h:"雰囲気の調整。",z_e:"安心感・刺激量・関わりの柔らかさ。",b_i:"笑顔を自然に促す。",b_k:"簡単な成功体験。",b_h:"肯定的な関わり。",a_i:"“安心して楽しめる場を確保するための最小限の枠”を置く。",a_k:"否定されると萎縮。",a_h:"安心の保証。",i_i:"笑顔→共鳴・協働への移行。",i_k:"楽しさが関係に広がる。",i_h:"協働遊びの支援。", polst: { ne: "やや養護（情緒の安定）", ig: "中立", ca: "やや動（楽しさの表現）", sf: "中立", sc: "やや安定（安心の指標）" }, tokucho: "安定性・繋がり性が最高級。情緒の可視的指標。"}, 
      {id:34,name:"34共鳴",img:"../img/a_infantia/34u.png",vector:[0.60,0.50,0.92,0.78,0.48,0.68,0.82,0.78,0.38,0.62,0.88,0.58,0.32,0.78,0.92], polarity: { n_e: 0.2, i_g: 0.6, c_a: 0, s_f: 0, s_c: 0 }, hue: 215,shocho:"深い共感",hoikubunmyaku:"気持ちの一致",kodomo:"同じ気持ちを共有",hoikusha:"心の動きを受け取る",g_i:"深い共感・気持ちの一致が中心。",g_k:"気持ちを共有する。",g_h:"心の動きを受け取る。",k_i:"①現在の状態と、「個」「距離」に向かう力がぶつかっている。",k_k:"一人でいたい。",k_h:"距離感の調整。",z_i:"共鳴の不足／過剰。",z_k:"共感できない／巻き込まれすぎ。",z_h:"関係の調整。",z_e:"人数・距離・共感の手がかり。",b_i:"共鳴を自然に促す。",b_k:"簡単な共有体験。",b_h:"共感の言語化。",a_i:"“情緒の安全確保のための最小限の枠”を置く。",a_k:"安心して気持ちを出せる。",a_h:"受容的な姿勢。",i_i:"共鳴→思いやり・協働への移行。",i_k:"他者理解が深まる。",i_h:"関係の深化。", polst: { ne: "やや教育（共感性育成）", ig: "やや集団（相互理解）", ca: "中立", sf: "中立", sc: "中立" }, tokucho: "協同性・繋がり性が最大級。相互理解と共感。"}, 
      {id:35,name:"35思いやり",img:"../img/a_infantia/35u.png",vector:[0.65,0.50,0.90,0.70,0.40,0.70,0.75,0.80,0.30,0.65,0.85,0.50,0.45,0.70,0.90], polarity: { n_e: 0.6, i_g: 0.7, c_a: -0.2, s_f: 0, s_c: 0.3 }, hue: 220,shocho:"他者への配慮",hoikubunmyaku:"優しさ・助け合い",kodomo:"譲る・助ける",hoikusha:"関係の育ちを支える",g_i:"他者への配慮・優しさが中心。",g_k:"譲る・助ける。",g_h:"関係の育ちを支える。",k_i:"①現在の状態と、「自己主張」に向かう力がぶつかっている。",k_k:"自分を優先したい。",k_h:"個と他者の調整。",z_i:"思いやりの不足／過剰。",z_k:"配慮できない／我慢しすぎ。",z_h:"関係の調整。",z_e:"関係性の距離・役割の調整。",b_i:"思いやりを自然に促す。",b_k:"簡単な助け合い。",b_h:"共感の言語化。",a_i:"“関係の安全確保のための最小限の枠”を置く。",a_k:"安心して関われる。",a_h:"無理な協力をさせない。",i_i:"思いやり→協働・共鳴への移行。",i_k:"関係が深まる。",i_h:"協働遊びの支援。", polst: { ne: "やや教育（道徳性育成）", ig: "強く集団（他者への配慮）", ca: "やや静（優しい関わり）", sf: "中立", sc: "やや挑戦（他者視点の獲得）" }, tokucho: "協同性・繋がり性が最大級。他者配慮・道徳性の芽生え。"}, 
      {id:36,name:"36思い",img:"../img/a_infantia/36u.png",vector:[0.65,0.50,0.75,0.80,0.30,0.65,0.70,0.75,0.30,0.50,0.80,0.50,0.40,0.70,0.80], polarity: { n_e: 0.4, i_g: -0.5, c_a: -0.6, s_f: 0.4, s_c: 0 }, hue: 310,shocho:"内面の深まり",hoikubunmyaku:"気持ちの背景",kodomo:"言葉にしにくい感情",hoikusha:"気持ちの代弁",g_i:"内面の深まり・気持ちの背景が中心。",g_k:"言葉にしにくい感情。",g_h:"気持ちの代弁。",k_i:"①現在の状態と、「行動」「発散」に向かう力がぶつかっている。",k_k:"動きたい・外に出したい。",k_h:"静と動の調整。",z_i:"思いの不足／過剰。",z_k:"浅い／抱え込みすぎ。",z_h:"気持ちの整理支援。",z_e:"気持ちの見通し・切り替えの手がかり。",b_i:"思いを自然に表現する。",b_k:"簡単な言語化。",b_h:"気持ちの代弁。",a_i:"“感情の安全確保のための最小限の枠”を置く。",a_k:"安心して気持ちを出せる。",a_h:"受容的な姿勢。",i_i:"思い→理解・調和への移行。",i_k:"気持ちが整理される。",i_h:"意味づけの支援。", polst: { ne: "やや教育（内面理解）", ig: "やや個別（自分の気持ち）", ca: "やや静（内省的）", sf: "やや自由（自由な表出）", sc: "中立" }, tokucho: "表現性・安定性・繋がり性が高い。内面の言語化。"}, 
      {id:37,name:"37育ち",img:"../img/a_infantia/37u.png",vector:[0.70,0.75,0.75,0.75,0.70,0.75,0.75,0.80,0.55,0.85,0.80,0.60,0.35,0.80,0.80], polarity: { n_e: 0.7, i_g: 0, c_a: 0, s_f: 0, s_c: 0.4 }, hue: 325,shocho:"発達の流れ",hoikubunmyaku:"成長のプロセス",kodomo:"できることが増える",hoikusha:"発達段階に応じた支援",g_i:"発達の流れ・成長のプロセスが中心。",g_k:"できることが増える。",g_h:"発達段階に応じた支援。",k_i:"①現在の状態と、「停滞」「安定」に向かう力がぶつかっている。",k_k:"変わりたくない。",k_h:"変化と安定の調整。",z_i:"育ちの不足／過剰。",z_k:"伸び悩み／急成長の揺れ。",z_h:"発達の見極め。",z_e:"発達段階に合うものを用意。活動の調整。刺激量・時間・距離の段階化。",b_i:"①現在と③ズレ核をつなぐために、発達段階に合った“小さな育ち”を積み重ねる橋渡し。",b_k:"小さな成功体験の積み重ね。無理なく次の段階へ進める。",b_h:"スモールステップの設定。発達段階に合った環境と関わり。「今の力でできる一歩」を作る。",a_i:"“発達の安全ラインを示す最小限の枠”を置く。",a_k:"無理な挑戦は危険。",a_h:"発達に合った環境。",i_i:"育ち→統合・成熟への移行。",i_k:"発達が安定する。",i_h:"次の段階への橋渡し。", polst: { ne: "強く教育（成長過程）", ig: "中立", ca: "中立", sf: "中立", sc: "やや挑戦（次の段階へ）" }, tokucho: "全次元でバランス良く高い。時間軸が長い。成長プロセス。"}, 
      {id:38,name:"38種",img:"../img/a_infantia/38u.png",vector:[0.65,0.70,0.65,0.65,0.55,0.75,0.75,0.75,0.60,0.40,0.75,0.60,0.30,0.70,0.75], polarity: { n_e: 0.3, i_g: -0.3, c_a: -0.4, s_f: 0.2, s_c: 0.5 }, hue: 25,shocho:"可能性・芽",hoikubunmyaku:"これから伸びる力",kodomo:"小さな兆し",hoikusha:"芽をつぶさない関わり",g_i:"可能性・芽・兆しが中心。",g_k:"小さな芽が見える。",g_h:"芽をつぶさない関わり。",k_i:"①現在の状態と、「完成」「固定」に向かう力がぶつかっている。",k_k:"今の形を変えたくない。",k_h:"変化の許容。",z_i:"芽の不足／過剰。成長の停滞／急ぎすぎ。",z_k:"兆しが見えない／散漫。焦る／諦める。",z_h:"成長の芽の見極め。",z_e:"小さな成功体験・段階化・待つ余白。",b_i:"芽を自然に育てる。",b_k:"小さな挑戦。",b_h:"環境の工夫。",a_i:"“芽を守るための最小限の枠”を置く。",a_k:"否定されると萎む。",a_h:"肯定的な関わり。",i_i:"種→育ち・創造への移行。",i_k:"芽が伸び始める。",i_h:"成長の支援。", polst: { ne: "やや教育（可能性）", ig: "やや個別（個の可能性）", ca: "やや静（静かに育つ）", sf: "やや自由（自然な成長）", sc: "やや挑戦（未来への希望）" }, tokucho: "可能性を秘めた状態。時間軸は短期。未来への希望。"}, 
      {id:39,name:"39意欲",img:"../img/a_infantia/39u.png",vector:[0.90,0.85,0.70,0.80,0.75,0.60,0.85,0.70,0.65,0.55,0.75,0.85,0.40,0.85,0.75], polarity: { n_e: 0.6, i_g: -0.2, c_a: 0.5, s_f: 0.6, s_c: 0.6 }, hue: 250,shocho:"やる気・主体性",hoikubunmyaku:"自発的な行動",kodomo:"やりたい気持ち",hoikusha:"意欲を引き出す環境",g_i:"やる気・主体性が中心。",g_k:"やりたい気持ちが強い。",g_h:"意欲を引き出す環境。",k_i:"①現在と同じ力が強すぎる。前のめりの力が過剰になっている。",k_k:"“頑張りすぎる”方向への偏り。その反動で「休みたい・甘えたい」。前へ進む力と休息の欲求が交互に出る。",k_h:"意欲を引き出すより、意欲の“調整” が必要。「頑張りすぎていないか」を見極める。休息と挑戦のバランスを整える。",z_i:"意欲の不足／過剰。",z_k:"やる気が出ない／暴走。",z_h:"意欲の調整。",z_e:"挑戦の段階化・成功体験・見通し。",b_i:"意欲を自然に促す。",b_k:"小さな成功体験。",b_h:"環境の工夫。",a_i:"“意欲の安全ラインを示す最小限の枠”を置く。",a_k:"無理な挑戦は危険。",a_h:"段階的な設定。",i_i:"意欲→挑戦・創造への移行。",i_k:"意欲が行動に変わる。",i_h:"挑戦の支援。", polst: { ne: "やや教育（動機づけ）", ig: "やや個別（自分からやる）", ca: "やや動（積極的に動く）", sf: "やや自由（自発性）", sc: "やや挑戦（挑戦への姿勢）" }, tokucho: "主体性・探索性・刺激性・達成感が高い。やる気と動機づけ。"}, 
      {id:40,name:"40風",img:"../img/a_infantia/40u.png",vector:[0.70,0.75,0.50,0.65,0.70,0.40,0.90,0.65,0.60,0.50,0.65,0.75,0.30,0.65,0.50], polarity: { n_e: 0.2, i_g: 0, c_a: 0.3, s_f: 0.7, s_c: 0.2 }, hue: 35,shocho:"変化・刺激",hoikubunmyaku:"新しい風・環境の変化",kodomo:"刺激を受けて動く",hoikusha:"環境を入れ替える",g_i:"変化・刺激・新しい風がクラスの中心。",g_k:"環境の変化に反応し、動きが活発。",g_h:"環境の入れ替え・新しい刺激の提供。",k_i:"①現在の状態と、「安定」「固定」に向かう力がぶつかっている。",k_k:"変わりたくない・落ち着きたい。",k_h:"変化と安定のバランス。",z_i:"刺激の不足／過剰。",z_k:"退屈／興奮しすぎ。",z_h:"刺激量の調整。",z_e:"変化の予告・刺激量・動線の調整。",b_i:"変化を自然に促す橋渡し。",b_k:"小さな変化から始める。",b_h:"環境の微調整。",a_i:"“変化の中の安心確保のための最小限の枠”を置く。",a_k:"戻れる場所が必要。",a_h:"安定の基地を用意。",i_i:"風→育ち・挑戦への移行。",i_k:"刺激が成長につながる。",i_h:"変化の意味づけ。", polst: { ne: "やや教育（感覚体験）", ig: "中立", ca: "やや動（風を感じる）", sf: "強く自由（予測不能）", sc: "やや挑戦（変化）" }, tokucho: "柔軟性・探索性が高い。自然現象の体感・予測不可能性。"}, 
      {id:41,name:"41根",img:"../img/a_infantia/41u.png",vector:[0.50,0.40,0.70,0.45,0.50,0.80,0.60,0.90,0.40,0.85,0.90,0.35,0.20,0.65,0.80], polarity: { n_e: -0.6, i_g: -0.2, c_a: -0.5, s_f: -0.5, s_c: -0.8 }, hue: 0,shocho:"基盤・安定",hoikubunmyaku:"生活リズム・基本的信頼",kodomo:"安定した行動",hoikusha:"生活の土台づくり",g_i:"基盤・生活リズム・基本的信頼が中心。",g_k:"安定した行動・生活が整う。",g_h:"生活の土台づくり。",k_i:"①現在の状態と、「変化」「刺激」に向かう力がぶつかっている。",k_k:"新しいことをしたい。",k_h:"安定と変化の調整。",z_i:"基盤の不足／過剰。",z_k:"不安定／固さ。",z_h:"生活リズムの見直し。",z_e:"安心の場・繰り返し・安定した動線。",b_i:"基盤を整える中間ステップ。",b_k:"生活の見通しが持てる。",b_h:"ルーティンの調整。",a_i:"“生活・情緒の安定確保のための最小限の枠”を置く。",a_k:"安心できる大人・場所が必要。",a_h:"安定の保証。",i_i:"根→意欲・挑戦への移行。",i_k:"安定が挑戦の土台になる。",i_h:"次のステップを支える。", polst: { ne: "やや養護（信頼の基盤）", ig: "やや個別（個の土台）", ca: "やや静（静かな土台）", sf: "やや構造（安定した基盤）", sc: "強く安定（安定の土台）" }, tokucho: "安全性・安定性・時間軸が高い。信頼関係の基盤・土台。"}, 
      {id:42,name:"42雨",img:"../img/a_infantia/42u.png",vector:[0.60,0.70,0.60,0.70,0.60,0.50,0.85,0.70,0.65,0.50,0.70,0.65,0.30,0.65,0.60], polarity: { n_e: 0.1, i_g: 0, c_a: -0.2, s_f: 0.3, s_c: 0 }, hue: 45,shocho:"浄化・揺らぎ",hoikubunmyaku:"情緒の波・気持ちの解放",kodomo:"泣く・揺れる",hoikusha:"受け止め、整える",g_i:"情緒の揺れ・浄化・解放が中心。",g_k:"泣く・甘える・揺れる。",g_h:"受け止め、整える。",k_i:"①現在の状態と、「安定」「晴れ」に向かう力がぶつかっている。",k_k:"落ち着きたい子もいる。",k_h:"揺れと安定の調整。",z_i:"揺れの不足／過剰。",z_k:"感情を出せない／出しすぎる。",z_h:"情緒の調整。",z_e:"情緒の受け皿・静かな空間・刺激の調整。",b_i:"揺れを自然に整える。",b_k:"安心して気持ちを出す。",b_h:"共感的な関わり。",a_i:"“情緒の安全確保のための最小限の枠”を置く。",a_k:"安心して泣ける場が必要。",a_h:"受容的な姿勢。",i_i:"情緒の揺れ（雨）が、次の段階（安らぎ・成長）へ移行するための“浄化プロセス”。",i_k:"揺れが落ち着きに変わる。泣く・甘える・揺れる → 整う。感情のデトックス。",i_h:"揺れの意味づけ。揺れを“問題”ではなく“移行のサイン”として扱う。揺れを受け止め、次の段階へ橋渡し。", polst: { ne: "やや教育（季節感）", ig: "中立", ca: "やや静（しっとり落ち着く）", sf: "やや自由（自然現象）", sc: "中立" }, tokucho: "柔軟性・探索性が高い。季節感・感覚体験・室内活動誘導。"}, 
      {id:43,name:"43実り",img:"../img/a_infantia/43u.png",vector:[0.65,0.60,0.75,0.70,0.60,0.70,0.70,0.75,0.70,0.60,0.75,0.65,0.25,0.90,0.80], polarity: { n_e: 0.5, i_g: 0.2, c_a: 0, s_f: 0, s_c: 0.5 }, hue: 345,shocho:"成果・成熟",hoikubunmyaku:"成長の現れ",kodomo:"自信が芽生える",hoikusha:"次の挑戦につなげる",g_i:"成果・結実・成熟が中心。",g_k:"できることが形になる。",g_h:"プロセスの価値づけ。",k_i:"①現在の状態と、「芽」「未熟」に向かう力がぶつかっている。",k_k:"まだ準備ができていない子もいる。",k_h:"成熟と未成熟の調整。",z_i:"成果の不足／過剰。成果への焦り／満足しすぎ。",z_k:"達成感がない／完璧主義。焦燥／停滞。",z_h:"成果の扱い方の調整。",z_e:"達成の見通し・段階化・振り返りの場。",b_i:"実りを自然に促す。",b_k:"小さな成功体験。",b_h:"プロセスの言語化。",a_i:"“成果へのプレッシャーを避けるための最小限の枠”を置く。",a_k:"無理な期待は負担。",a_h:"結果より過程を重視。",i_i:"実り→次のサイクル（種・育ち）への移行。",i_k:"成果が次の挑戦につながる。",i_h:"循環の再スタートを支える。", polst: { ne: "やや教育（達成・成果）", ig: "やや集団（共に喜ぶ）", ca: "中立", sf: "中立", sc: "やや挑戦（努力の結晶）" }, tokucho: "達成感が最高級。収穫体験・成果の可視化。"}
    ];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const PSD = [
      {id:44, name:'recital_prep0', namae:'発表会準備0', vector:[0.5,0.55,0.45,0.6,0.7,0.55,0.8,0.88,0.75,0.6,0.88,0.58,0.48,0.5,0.68], pol:[0.6,0.7,0.2,-0.2,0.7], polst:['やや教育（表現力・協力）生活の中で','強く集団（みんなで作る）','やや動（表現活動）','やや構造（台本・振り付け）','強く挑戦（発表へ向けて）慣れ親しむ'], iso:85 }, 
      {id:45, name:'recital_prep1', namae:'発表会準備1', vector:[0.6,0.65,0.55,0.65,0.75,0.6,0.78,0.83,0.8,0.62,0.83,0.62,0.53,0.58,0.73], pol:[0.66,0.7,0.2,-0.2,0.78], polst:['やや教育（表現力・協力）生活の中で','強く集団（みんなで作る）','やや動（表現活動）','やや構造（台本・振り付け）','強く挑戦（発表へ向けて）慣れ親しむ'], iso:90 }, 
      {id:46, name:'recital_prep2', namae:'発表会準備2', vector:[0.65,0.7,0.65,0.72,0.78,0.65,0.75,0.78,0.82,0.65,0.78,0.65,0.6,0.68,0.78], pol:[0.72,0.7,0.2,-0.2,0.86], polst:['やや教育（表現力・協力）劇あそび等','強く集団（みんなで作る）','やや動（表現活動）','やや構造（台本・振り付け）','強く挑戦（発表へ向けて）大きな舞台'], iso:130 }, 
      {id:47, name:'recital_prep3', namae:'発表会準備3', vector:[0.75,0.65,0.8,0.85,0.65,0.7,0.75,0.72,0.82,0.68,0.75,0.65,0.55,0.8,0.83], pol:[0.78,0.7,0.2,-0.2,0.94], polst:['やや教育（表現力・協力）劇あそび等','強く集団（みんなで作る）','やや動（表現活動）','やや構造（台本・振り付け）','強く挑戦（発表へ向けて）大きな舞台'], iso:135 }, 
      {id:48, name:'recital_prep4', namae:'発表会準備4', vector:[0.8,0.6,0.85,0.9,0.55,0.75,0.78,0.73,0.85,0.7,0.78,0.62,0.48,0.85,0.86], pol:[0.84,0.7,0.2,-0.2,1.02], polst:['やや教育（表現力・協力）本格的な劇等','強く集団（みんなで作る）','やや動（表現活動）','やや構造（台本・振り付け）','強く挑戦（発表へ向けて）大きな舞台'], iso:250 }, 
      {id:49, name:'recital_prep5', namae:'発表会準備5', vector:[0.85,0.5,0.9,0.95,0.4,0.8,0.8,0.75,0.85,0.75,0.8,0.6,0.4,0.9,0.88], pol:[0.9,0.7,0.2,-0.2,1.1], polst:['やや教育（表現力・協力）本格的な劇等','強く集団（みんなで作る）','やや動（表現活動）','やや構造（台本・振り付け）','強く挑戦（発表へ向けて）大きな舞台'], iso:255 }, 
      {id:50, name:'nature0', namae:'自然体験0', vector:[0.55,0.75,0.45,0.6,0.85,0.48,0.85,0.85,0.5,0.7,0.83,0.7,0.45,0.55,0.63], pol:[0.5,-0.1,0.6,0.7,0.5], polst:['やや教育（自然との対話）','やや個別（自分のペースで）','やや動（歩く・登る）','強く自由（自然の中で自由に）','やや挑戦（未知の自然）慎重に'], iso:15 }, 
      {id:51, name:'nature1', namae:'自然体験1', vector:[0.65,0.85,0.55,0.65,0.88,0.52,0.88,0.8,0.52,0.72,0.8,0.73,0.5,0.62,0.68], pol:[0.5,-0.1,0.6,0.7,0.58], polst:['やや教育（自然との対話）','やや個別（自分のペースで）','やや動（歩く・登る）','強く自由（自然の中で自由に）','やや挑戦（未知の自然）慎重に'], iso:18 }, 
      {id:52, name:'nature2', namae:'自然体験2', vector:[0.75,0.9,0.62,0.68,0.9,0.55,0.88,0.75,0.48,0.75,0.75,0.78,0.55,0.7,0.72], pol:[0.5,-0.1,0.6,0.7,0.66], polst:['やや教育（自然との対話）','やや個別（自分のペースで）','やや動（歩く・登る）','強く自由（自然の中で自由に）','やや挑戦（未知の自然）慎重に'], iso:20 }, 
      {id:53, name:'nature3', namae:'自然体験3', vector:[0.82,0.88,0.68,0.75,0.85,0.58,0.88,0.7,0.45,0.78,0.72,0.8,0.48,0.78,0.7], pol:[0.5,-0.1,0.6,0.7,0.74], polst:['やや教育（自然との対話）','やや個別（自分のペースで）','やや動（歩く・登る）','強く自由（自然の中で自由に）','やや挑戦（未知の自然）冒険的に'], iso:22 }, 
      {id:54, name:'nature4', namae:'自然体験4', vector:[0.88,0.92,0.65,0.75,0.82,0.55,0.9,0.68,0.42,0.78,0.7,0.82,0.42,0.8,0.68], pol:[0.5,-0.1,0.6,0.7,0.82], polst:['やや教育（自然との対話）','やや個別（自分のペースで）','やや動（歩く・登る）','強く自由（自然の中で自由に）','やや挑戦（未知の自然）冒険的に'], iso:25 }, 
      {id:55, name:'nature5', namae:'自然体験5', vector:[0.9,0.95,0.6,0.7,0.85,0.5,0.9,0.7,0.4,0.8,0.75,0.8,0.35,0.75,0.65], pol:[0.5,-0.1,0.6,0.7,0.9], polst:['やや教育（自然との対話）','やや個別（自分のペースで）','やや動（歩く・登る）','強く自由（自然の中で自由に）','やや挑戦（未知の自然）冒険的に'], iso:28 }, 
      {id:56, name:'conflict_resolution0', namae:'トラブル対応0', vector:[0.48,0.55,0.5,0.55,0.45,0.65,0.78,0.88,0.35,0.52,0.9,0.52,0.7,0.48,0.85], pol:[0.2,0.2,-0.3,0,0.4], polst:['やや教育（社会性の学び）養護的対応','やや集団（関係の中で）','やや静（落ち着かせる）','中立（状況による）','やや挑戦（乗り越える）'], iso:200 }, 
      {id:57, name:'conflict_resolution1', namae:'トラブル対応1', vector:[0.55,0.6,0.6,0.6,0.5,0.68,0.78,0.85,0.35,0.55,0.88,0.53,0.75,0.52,0.88], pol:[0.28,0.2,-0.3,0,0.4], polst:['やや教育（社会性の学び）養護的対応','やや集団（関係の中で）','やや静（落ち着かせる）','中立（状況による）','やや挑戦（乗り越える）'], iso:202 }, 
      {id:58, name:'conflict_resolution2', namae:'トラブル対応2', vector:[0.6,0.65,0.7,0.65,0.5,0.7,0.78,0.82,0.32,0.55,0.85,0.52,0.78,0.58,0.88], pol:[0.36,0.2,-0.3,0,0.4], polst:['やや教育（社会性の学び）養護的対応','やや集団（関係の中で）','やや静（落ち着かせる）','中立（状況による）','やや挑戦（乗り越える）'], iso:205 }, 
      {id:59, name:'conflict_resolution3', namae:'トラブル対応3', vector:[0.65,0.6,0.78,0.72,0.48,0.72,0.75,0.78,0.3,0.52,0.83,0.5,0.8,0.65,0.9], pol:[0.44,0.2,-0.3,0,0.4], polst:['やや教育（社会性の学び）話し合い','やや集団（関係の中で）','やや静（落ち着かせる）','中立（状況による）','やや挑戦（乗り越える）'], iso:208 }, 
      {id:60, name:'conflict_resolution4', namae:'トラブル対応4', vector:[0.65,0.55,0.82,0.75,0.45,0.72,0.75,0.78,0.3,0.5,0.83,0.48,0.82,0.68,0.9], pol:[0.52,0.2,-0.3,0,0.4], polst:['やや教育（社会性の学び）話し合い','やや集団（関係の中で）','やや静（落ち着かせる）','中立（状況による）','やや挑戦（乗り越える）'], iso:210 }, 
      {id:61, name:'conflict_resolution5', namae:'トラブル対応5', vector:[0.65,0.5,0.85,0.7,0.4,0.7,0.75,0.8,0.3,0.5,0.85,0.5,0.8,0.65,0.9], pol:[0.6,0.2,-0.3,0,0.4], polst:['やや教育（社会性の学び）話し合い','やや集団（関係の中で）','やや静（落ち着かせる）','中立（状況による）','やや挑戦（乗り越える）'], iso:212 }, 
      {id:62, name:'transition_support0', namae:'移行期支援0', vector:[0.42,0.6,0.42,0.52,0.55,0.75,0.75,0.92,0.45,0.52,0.95,0.52,0.5,0.5,0.78], pol:[-0.4,-0.2,-0.4,-0.3,0.3], polst:['やや養護（不安への配慮）','やや個別（個々のペース）','やや静（落ち着いた環境）','やや構造（予測可能性）','やや挑戦（新しい環境）慎重に'], iso:5 }, 
      {id:63, name:'transition_support1', namae:'移行期支援1', vector:[0.5,0.65,0.52,0.58,0.6,0.78,0.75,0.88,0.45,0.53,0.92,0.53,0.55,0.55,0.8], pol:[-0.4,-0.2,-0.4,-0.3,0.36], polst:['やや養護（不安への配慮）','やや個別（個々のペース）','やや静（落ち着いた環境）','やや構造（予測可能性）','やや挑戦（新しい環境）慎重に'], iso:5 }, 
      {id:64, name:'transition_support2', namae:'移行期支援2', vector:[0.55,0.68,0.62,0.6,0.6,0.78,0.72,0.85,0.42,0.55,0.88,0.55,0.58,0.62,0.82], pol:[-0.4,-0.2,-0.4,-0.3,0.42], polst:['やや養護（不安への配慮）','やや個別（個々のペース）','やや静（落ち着いた環境）','やや構造（予測可能性）','やや挑戦（新しい環境）慎重に'], iso:5 }, 
      {id:65, name:'transition_support3', namae:'移行期支援3', vector:[0.6,0.68,0.7,0.62,0.58,0.78,0.7,0.83,0.4,0.52,0.88,0.55,0.55,0.68,0.82], pol:[-0.4,-0.2,-0.4,-0.3,0.48], polst:['やや養護（不安への配慮）','やや個別（個々のペース）','やや静（落ち着いた環境）','やや構造（予測可能性）','やや挑戦（新しい環境）期待も'], iso:5 }, 
      {id:66, name:'transition_support4', namae:'移行期支援4', vector:[0.62,0.68,0.72,0.6,0.55,0.78,0.7,0.82,0.4,0.5,0.88,0.55,0.52,0.7,0.82], pol:[-0.4,-0.2,-0.4,-0.3,0.54], polst:['やや養護（不安への配慮）','やや個別（個々のペース）','やや静（落ち着いた環境）','やや構造（予測可能性）','やや挑戦（新しい環境）期待も'], iso:5 }, 
      {id:67, name:'transition_support5', namae:'移行期支援5', vector:[0.6,0.65,0.7,0.55,0.5,0.8,0.7,0.85,0.4,0.5,0.9,0.55,0.45,0.65,0.8], pol:[-0.4,-0.2,-0.4,-0.3,0.6], polst:['やや養護（不安への配慮）','やや個別（個々のペース）','やや静（落ち着いた環境）','やや構造（予測可能性）','やや挑戦（新しい環境）期待も'], iso:5 }, 
      {id:68, name:'daily0', namae:'日常保育0', vector:[0.45,0.6,0.4,0.5,0.75,0.5,0.8,0.9,0.7,0.55,0.9,0.55,0.5,0.45,0.65], pol:[0,0,0,0,0], polst:['中立（養護と教育の両方）','中立（個別と集団の両方）','中立（静と動のバランス）','中立（構造と自由のバランス）','中立（安定が基盤だが挑戦も）'], iso:300 }, 
      {id:69, name:'daily1', namae:'日常保育1', vector:[0.55,0.7,0.5,0.55,0.8,0.55,0.8,0.85,0.75,0.6,0.85,0.6,0.55,0.5,0.7], pol:[0.06,0.04,0,0,0], polst:['中立から少しずつ教育へ↑','個別から少しずつ集団へ↑','中立（静と動のバランス）','中立（構造と自由のバランス）','中立（安定が基盤だが挑戦も）'], iso:300 }, 
      {id:70, name:'daily2', namae:'日常保育2', vector:[0.6,0.8,0.6,0.6,0.85,0.6,0.8,0.8,0.75,0.65,0.8,0.65,0.65,0.6,0.75], pol:[0.12,0.08,0,0,0], polst:['中立から少しずつ教育へ↑','個別から少しずつ集団へ↑','中立（静と動のバランス）','中立（構造と自由のバランス）','中立（安定が基盤だが挑戦も）'], iso:300 }, 
      {id:71, name:'daily3', namae:'日常保育3', vector:[0.7,0.75,0.7,0.7,0.75,0.65,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7], pol:[0.18,0.12,0,0,0], polst:['中立から少しずつ教育へ↑','個別から少しずつ集団へ↑','中立（静と動のバランス）','中立（構造と自由のバランス）','中立（安定が基盤だが挑戦も）'], iso:300 }, 
      {id:72, name:'daily4', namae:'日常保育4', vector:[0.75,0.7,0.75,0.75,0.7,0.7,0.65,0.65,0.7,0.75,0.65,0.7,0.75,0.75,0.7], pol:[0.24,0.16,0,0,0], polst:['中立から少しずつ教育へ↑','個別から少しずつ集団へ↑','中立（静と動のバランス）','中立（構造と自由のバランス）','中立（安定が基盤だが挑戦も）'], iso:300 }, 
      {id:73, name:'daily5', namae:'日常保育5', vector:[0.85,0.7,0.8,0.8,0.65,0.8,0.65,0.65,0.7,0.8,0.6,0.65,0.8,0.8,0.8], pol:[0.3,0.2,0,0,0], polst:['中立から少しずつ教育へ↑','個別から少しずつ集団へ↑','中立（静と動のバランス）','中立（構造と自由のバランス）','中立（安定が基盤だが挑戦も）'], iso:300 }, 
      {id:74, name:'indoor_free_play0', namae:'自由遊び（室内）0', vector:[0.6,0.75,0.4,0.6,0.7,0.4,0.88,0.88,0.75,0.7,0.88,0.65,0.45,0.55,0.6], pol:[0.3,-0.4,0,0.8,0.2], polst:['やや教育（探索・創造）','やや個別（それぞれの遊び）','中立（静かな遊びも動的な遊びも）','強く自由（自由遊びの本質）','やや挑戦（新しい遊びへ）'], iso:15 }, 
      {id:75, name:'indoor_free_play1', namae:'自由遊び（室内）1', vector:[0.7,0.82,0.48,0.65,0.75,0.42,0.88,0.83,0.78,0.73,0.83,0.68,0.52,0.6,0.65], pol:[0.3,-0.34,0,0.8,0.2], polst:['やや教育（探索・創造）','やや個別（それぞれの遊び）から集団方向へ↑','中立（静かな遊びも動的な遊びも）','強く自由（自由遊びの本質）','やや挑戦（新しい遊びへ）'], iso:20 }, 
      {id:76, name:'indoor_free_play2', namae:'自由遊び（室内）2', vector:[0.75,0.88,0.58,0.7,0.8,0.45,0.88,0.78,0.8,0.75,0.78,0.72,0.6,0.68,0.72], pol:[0.3,-0.28,0,0.8,0.2], polst:['やや教育（探索・創造）','やや個別（それぞれの遊び）から集団方向へ↑','中立（静かな遊びも動的な遊びも）','強く自由（自由遊びの本質）','やや挑戦（新しい遊びへ）'], iso:245 }, 
      {id:77, name:'indoor_free_play3', namae:'自由遊び（室内）3', vector:[0.82,0.85,0.68,0.78,0.72,0.48,0.85,0.68,0.75,0.78,0.7,0.75,0.68,0.75,0.75], pol:[0.3,-0.22,0,0.8,0.2], polst:['やや教育（探索・創造）','やや個別（それぞれの遊び）から集団方向へ↑','中立（静かな遊びも動的な遊びも）','強く自由（自由遊びの本質）','やや挑戦（新しい遊びへ）'], iso:250 }, 
      {id:78, name:'indoor_free_play4', namae:'自由遊び（室内）4', vector:[0.88,0.8,0.72,0.82,0.68,0.5,0.82,0.62,0.72,0.8,0.65,0.75,0.72,0.78,0.75], pol:[0.3,-0.16,0,0.8,0.2], polst:['やや教育（探索・創造）','やや個別（それぞれの遊び）から集団方向へ↑','中立（静かな遊びも動的な遊びも）','強く自由（自由遊びの本質）','やや挑戦（新しい遊びへ）'], iso:255 }, 
      {id:79, name:'indoor_free_play5', namae:'自由遊び（室内）5', vector:[0.92,0.78,0.7,0.85,0.6,0.52,0.85,0.6,0.7,0.82,0.62,0.7,0.75,0.8,0.78], pol:[0.3,-0.1,0,0.8,0.2], polst:['やや教育（探索・創造）','やや個別（それぞれの遊び）から集団方向へ↑','中立（静かな遊びも動的な遊びも）','強く自由（自由遊びの本質）','やや挑戦（新しい遊びへ）'], iso:260 }, 
      {id:80, name:'outdoor_free_play0', namae:'自由遊び（戸外）0', vector:[0.58,0.72,0.42,0.58,0.9,0.42,0.9,0.88,0.55,0.72,0.85,0.75,0.42,0.58,0.62], pol:[0.2,-0.3,0.7,0.8,0.4], polst:['やや教育（自然体験）','やや個別','強く動（走る・登る）','強く自由','やや挑戦（冒険遊び）'], iso:10 }, 
      {id:81, name:'outdoor_free_play1', namae:'自由遊び（戸外）1', vector:[0.68,0.8,0.5,0.62,0.92,0.45,0.9,0.83,0.58,0.75,0.82,0.78,0.48,0.63,0.68], pol:[0.2,-0.3,0.72,0.8,0.46], polst:['やや教育（自然体験）','やや個別','強く動（走る・登る）より活発に↑','強く自由','やや挑戦（冒険遊び）より挑戦的に↑'], iso:15 }, 
      {id:82, name:'outdoor_free_play2', namae:'自由遊び（戸外）2', vector:[0.75,0.88,0.58,0.65,0.95,0.48,0.9,0.78,0.52,0.78,0.78,0.82,0.58,0.7,0.73], pol:[0.2,-0.3,0.74,0.8,0.52], polst:['やや教育（自然体験）','やや個別','強く動（走る・登る）より活発に↑','強く自由','やや挑戦（冒険遊び）より挑戦的に↑'], iso:20 }, 
      {id:83, name:'outdoor_free_play3', namae:'自由遊び（戸外）3', vector:[0.82,0.88,0.65,0.7,0.88,0.5,0.88,0.7,0.48,0.8,0.72,0.85,0.62,0.78,0.72], pol:[0.2,-0.3,0.76,0.8,0.58], polst:['やや教育（自然体験）','やや個別','強く動（走る・登る）より活発に↑','強く自由','やや挑戦（冒険遊び）より挑戦的に↑'], iso:25 }, 
      {id:84, name:'outdoor_free_play4', namae:'自由遊び（戸外）4', vector:[0.88,0.85,0.68,0.72,0.85,0.52,0.88,0.65,0.45,0.82,0.68,0.85,0.65,0.8,0.7], pol:[0.2,-0.3,0.78,0.8,0.64], polst:['やや教育（自然体験）','やや個別','強く動（走る・登る）より活発に↑','強く自由','やや挑戦（冒険遊び）より挑戦的に↑'], iso:30 }, 
      {id:85, name:'outdoor_free_play5', namae:'自由遊び（戸外）5', vector:[0.92,0.85,0.65,0.7,0.88,0.5,0.9,0.68,0.42,0.85,0.7,0.82,0.58,0.78,0.68], pol:[0.2,-0.3,0.8,0.8,0.7], polst:['やや教育（自然体験）','やや個別','強く動（走る・登る）より活発に↑','強く自由','やや挑戦（冒険遊び）より挑戦的に↑'], iso:35 }, 
      {id:86, name:'exploration0', namae:'探索遊び0', vector:[0.5,0.88,0.38,0.58,0.75,0.4,0.92,0.88,0.72,0.7,0.88,0.68,0.4,0.52,0.58], pol:[0.6,-0.6,0.2,0.7,0.6], polst:['やや教育（発見・学び）感覚探索','やや個別（自分で試す）','やや動（動いて試す）','強く自由（試行錯誤の自由）','やや挑戦（未知への探求）'], iso:5 }, 
      {id:87, name:'exploration1', namae:'探索遊び1', vector:[0.6,0.92,0.45,0.62,0.8,0.42,0.92,0.83,0.75,0.72,0.85,0.7,0.48,0.58,0.62], pol:[0.64,-0.6,0.2,0.7,0.6], polst:['やや教育（発見・学び）感覚探索','やや個別（自分で試す）','やや動（動いて試す）','強く自由（試行錯誤の自由）','やや挑戦（未知への探求）'], iso:8 }, 
      {id:88, name:'exploration2', namae:'探索遊び2', vector:[0.68,0.95,0.52,0.65,0.82,0.45,0.9,0.78,0.78,0.75,0.8,0.72,0.55,0.65,0.68], pol:[0.68,-0.6,0.2,0.7,0.6], polst:['やや教育（発見・学び）感覚探索','やや個別（自分で試す）','やや動（動いて試す）','強く自由（試行錯誤の自由）','やや挑戦（未知への探求）'], iso:10 }, 
      {id:89, name:'exploration3', namae:'探索遊び3', vector:[0.75,0.92,0.6,0.72,0.78,0.48,0.88,0.7,0.75,0.78,0.72,0.75,0.58,0.72,0.68], pol:[0.72,-0.6,0.2,0.7,0.6], polst:['やや教育（発見・学び）感覚→科学的探索','やや個別（自分で試す）','やや動（動いて試す）','強く自由（試行錯誤の自由）','やや挑戦（未知への探求）'], iso:12 }, 
      {id:90, name:'exploration4', namae:'探索遊び4', vector:[0.8,0.9,0.62,0.75,0.75,0.5,0.85,0.65,0.72,0.8,0.68,0.75,0.6,0.75,0.65], pol:[0.76,-0.6,0.2,0.7,0.6], polst:['やや教育（発見・学び）科学的探索','やや個別（自分で試す）','やや動（動いて試す）','強く自由（試行錯誤の自由）','やや挑戦（未知への探求）'], iso:15 }, 
      {id:91, name:'exploration5', namae:'探索遊び5', vector:[0.85,0.92,0.58,0.72,0.7,0.52,0.88,0.65,0.7,0.82,0.7,0.72,0.55,0.72,0.62], pol:[0.8,-0.6,0.2,0.7,0.6], polst:['やや教育（発見・学び）科学的探索','やや個別（自分で試す）','やや動（動いて試す）','強く自由（試行錯誤の自由）','やや挑戦（未知への探求）'], iso:18 }, 
      {id:92, name:'neighborhood_walk0', namae:'園周辺散歩0', vector:[0.48,0.7,0.38,0.55,0.85,0.55,0.8,0.92,0.35,0.65,0.88,0.68,0.4,0.52,0.65], pol:[0.3,0.2,0.4,0.2,0.2], polst:['やや教育（観察・発見）','やや集団（みんなで歩く）','やや動（歩く）','やや自由（興味に応じて）保育者主導','やや挑戦（外の世界へ）安全確認'], iso:20 }, 
      {id:93, name:'neighborhood_walk1', namae:'園周辺散歩1', vector:[0.58,0.78,0.45,0.6,0.88,0.58,0.82,0.88,0.38,0.68,0.85,0.7,0.45,0.58,0.68], pol:[0.3,0.2,0.4,0.28,0.26], polst:['やや教育（観察・発見）','やや集団（みんなで歩く）','やや動（歩く）','やや自由（興味に応じて）保育者主導','やや挑戦（外の世界へ）安全確認'], iso:22 }, 
      {id:94, name:'neighborhood_walk2', namae:'園周辺散歩2', vector:[0.65,0.85,0.55,0.62,0.9,0.6,0.82,0.82,0.4,0.7,0.8,0.72,0.52,0.65,0.72], pol:[0.3,0.2,0.4,0.36,0.32], polst:['やや教育（観察・発見）','やや集団（みんなで歩く）','やや動（歩く）','やや自由（興味に応じて）保育者主導','やや挑戦（外の世界へ）安全確認'], iso:25 }, 
      {id:95, name:'neighborhood_walk3', namae:'園周辺散歩3', vector:[0.72,0.85,0.65,0.68,0.85,0.62,0.8,0.75,0.4,0.72,0.75,0.75,0.55,0.72,0.75], pol:[0.3,0.2,0.4,0.44,0.38], polst:['やや教育（観察・発見）','やや集団（みんなで歩く）','やや動（歩く）','やや自由（興味に応じて）保育者→子ども主導へ↑','やや挑戦（外の世界へ）探検気分'], iso:28 }, 
      {id:96, name:'neighborhood_walk4', namae:'園周辺散歩4', vector:[0.78,0.88,0.7,0.7,0.82,0.62,0.82,0.7,0.38,0.75,0.7,0.75,0.55,0.75,0.75], pol:[0.3,0.2,0.4,0.52,0.44], polst:['やや教育（観察・発見）','やや集団（みんなで歩く）','やや動（歩く）','やや自由（興味に応じて）保育者→子ども主導へ↑','やや挑戦（外の世界へ）探検気分'], iso:30 }, 
      {id:97, name:'neighborhood_walk5', namae:'園周辺散歩5', vector:[0.82,0.9,0.72,0.68,0.8,0.6,0.85,0.72,0.35,0.78,0.72,0.72,0.5,0.72,0.75], pol:[0.3,0.2,0.4,0.6,0.5], polst:['やや教育（観察・発見）','やや集団（みんなで歩く）','やや動（歩く）','やや自由（興味に応じて）子ども主導','やや挑戦（外の世界へ）探検気分'], iso:32 }, 
      {id:98, name:'water_play0', namae:'水遊び0', vector:[0.52,0.8,0.38,0.65,0.88,0.5,0.88,0.92,0.6,0.68,0.85,0.8,0.4,0.6,0.6], pol:[0.2,-0.2,0.5,0.7,0.3], polst:['やや教育（感覚体験）','やや個別（それぞれのペース）個別配慮','やや動（水をかける・流す）','強く自由（自由な水遊び）','やや挑戦（新しい感覚）慎重に'], iso:30 }, 
      {id:99, name:'water_play1', namae:'水遊び1', vector:[0.62,0.85,0.45,0.68,0.9,0.52,0.88,0.88,0.62,0.7,0.82,0.82,0.48,0.65,0.65], pol:[0.2,-0.14,0.5,0.7,0.34], polst:['やや教育（感覚体験）','やや個別（それぞれのペース）個別配慮','やや動（水をかける・流す）','強く自由（自由な水遊び）','やや挑戦（新しい感覚）慎重に'], iso:32 }, 
      {id:100, name:'water_play2', namae:'水遊び2', vector:[0.7,0.88,0.55,0.72,0.92,0.55,0.88,0.82,0.58,0.72,0.78,0.85,0.55,0.72,0.7], pol:[0.2,-0.08,0.5,0.7,0.38], polst:['やや教育（感覚体験）','やや個別（それぞれのペース）個別配慮','やや動（水をかける・流す）','強く自由（自由な水遊び）','やや挑戦（新しい感覚）慎重に'], iso:35 }, 
      {id:101, name:'water_play3', namae:'水遊び3', vector:[0.78,0.88,0.65,0.78,0.88,0.58,0.88,0.75,0.52,0.75,0.72,0.88,0.6,0.78,0.72], pol:[0.2,-0.02,0.5,0.7,0.42], polst:['やや教育（感覚体験）','やや個別（それぞれのペース）個別配慮','やや動（水をかける・流す）','強く自由（自由な水遊び）','やや挑戦（新しい感覚）ダイナミックに'], iso:38 }, 
      {id:102, name:'water_play4', namae:'水遊び4', vector:[0.82,0.88,0.7,0.8,0.85,0.58,0.88,0.7,0.48,0.75,0.7,0.88,0.62,0.8,0.72], pol:[0.2,0.04,0.5,0.7,0.46], polst:['やや教育（感覚体験）','やや個別（それぞれのペース）水鉄砲合戦','やや動（水をかける・流す）','強く自由（自由な水遊び）','やや挑戦（新しい感覚）ダイナミックに'], iso:40 }, 
      {id:103, name:'water_play5', namae:'水遊び5', vector:[0.85,0.9,0.68,0.78,0.85,0.58,0.9,0.72,0.45,0.78,0.72,0.85,0.58,0.78,0.7], pol:[0.2,0.1,0.5,0.7,0.5], polst:['やや教育（感覚体験）','やや個別（それぞれのペース）水鉄砲合戦','やや動（水をかける・流す）','強く自由（自由な水遊び）','やや挑戦（新しい感覚）ダイナミックに'], iso:42 }, 
      {id:104, name:'sandbox0', namae:'砂場遊び0', vector:[0.55,0.82,0.4,0.62,0.8,0.42,0.92,0.9,0.7,0.75,0.88,0.7,0.42,0.58,0.6], pol:[0.3,-0.1,0.1,0.8,0.2], polst:['やや教育（創造・探索）','やや個別（並行遊び多め）一人で','やや動（掘る・運ぶ）','強く自由（自由な造形）','やや挑戦（新しい形を作る）触る・感じる'], iso:35 }, 
      {id:105, name:'sandbox1', namae:'砂場遊び1', vector:[0.65,0.88,0.48,0.65,0.85,0.45,0.92,0.85,0.72,0.78,0.85,0.72,0.5,0.63,0.65], pol:[0.3,-0.02,0.1,0.8,0.26], polst:['やや教育（創造・探索）','やや個別（並行遊び多め）一人で','やや動（掘る・運ぶ）','強く自由（自由な造形）','やや挑戦（新しい形を作る）触る・感じる'], iso:37 }, 
      {id:106, name:'sandbox2', namae:'砂場遊び2', vector:[0.72,0.92,0.58,0.7,0.88,0.48,0.92,0.78,0.75,0.8,0.8,0.75,0.58,0.7,0.7], pol:[0.3,0.06,0.1,0.8,0.32], polst:['やや教育（創造・探索）','やや個別（並行遊び多め）一人から協同へ↑','やや動（掘る・運ぶ）','強く自由（自由な造形）','やや挑戦（新しい形を作る）触る・感じる'], iso:40 }, 
      {id:107, name:'sandbox3', namae:'砂場遊び3', vector:[0.78,0.9,0.68,0.75,0.82,0.5,0.9,0.7,0.7,0.82,0.72,0.78,0.62,0.75,0.72], pol:[0.3,0.14,0.1,0.8,0.38], polst:['やや教育（創造・探索）','やや個別（並行遊び多め）協同制作','やや動（掘る・運ぶ）','強く自由（自由な造形）','やや挑戦（新しい形を作る）感覚から造形へ↑'], iso:65 }, 
      {id:108, name:'sandbox4', namae:'砂場遊び4', vector:[0.82,0.88,0.72,0.78,0.78,0.52,0.9,0.65,0.68,0.85,0.7,0.78,0.65,0.78,0.72], pol:[0.3,0.22,0.1,0.8,0.44], polst:['やや教育（創造・探索）','やや個別（並行遊び多め）協同制作','やや動（掘る・運ぶ）','強く自由（自由な造形）','やや挑戦（新しい形を作る）複雑な構造物'], iso:185 }, 
      {id:109, name:'sandbox5', namae:'砂場遊び5', vector:[0.85,0.9,0.7,0.75,0.75,0.52,0.92,0.68,0.65,0.88,0.72,0.75,0.62,0.75,0.7], pol:[0.3,0.3,0.1,0.8,0.5], polst:['やや教育（創造・探索）','やや個別（並行遊び多め）協同制作','やや動（掘る・運ぶ）','強く自由（自由な造形）','やや挑戦（新しい形を作る）複雑な構造物'], iso:190 }, 
      {id:110, name:'mud_play0', namae:'どろんこ遊び0', vector:[0.52,0.78,0.38,0.6,0.85,0.45,0.9,0.9,0.65,0.7,0.85,0.78,0.4,0.58,0.58], pol:[0.2,0,0.7,0.9,0.6], polst:['やや教育（感覚体験）','中立（一緒に泥んこになる）','強く動（全身で遊ぶ）座って触る','強く自由（自由でダイナミック）','やや挑戦（汚れる・大胆に）初体験'], iso:40 }, 
      {id:111, name:'mud_play1', namae:'どろんこ遊び1', vector:[0.62,0.85,0.45,0.65,0.88,0.48,0.92,0.85,0.68,0.72,0.82,0.8,0.48,0.63,0.62], pol:[0.2,0,0.72,0.9,0.66], polst:['やや教育（感覚体験）','中立（一緒に泥んこになる）','強く動（全身で遊ぶ）座って触る','強く自由（自由でダイナミック）','やや挑戦（汚れる・大胆に）初体験'], iso:42 }, 
      {id:112, name:'mud_play2', namae:'どろんこ遊び2', vector:[0.7,0.9,0.55,0.7,0.92,0.5,0.92,0.78,0.7,0.75,0.78,0.85,0.58,0.7,0.68], pol:[0.2,0,0.74,0.9,0.72], polst:['やや教育（感覚体験）','中立（一緒に泥んこになる）','強く動（全身で遊ぶ）全身で','強く自由（自由でダイナミック）','やや挑戦（汚れる・大胆に）開放的に'], iso:45 }, 
      {id:113, name:'mud_play3', namae:'どろんこ遊び3', vector:[0.78,0.92,0.65,0.78,0.88,0.52,0.92,0.72,0.65,0.78,0.72,0.88,0.62,0.78,0.7], pol:[0.2,0,0.76,0.9,0.78], polst:['やや教育（感覚体験）','中立（一緒に泥んこになる）','強く動（全身で遊ぶ）全身で','強く自由（自由でダイナミック）','やや挑戦（汚れる・大胆に）開放的に'], iso:48 }, 
      {id:114, name:'mud_play4', namae:'どろんこ遊び4', vector:[0.82,0.92,0.68,0.8,0.85,0.52,0.92,0.68,0.6,0.78,0.7,0.88,0.65,0.8,0.7], pol:[0.2,0,0.78,0.9,0.84], polst:['やや教育（感覚体験）','中立（一緒に泥んこになる）','強く動（全身で遊ぶ）全身で','強く自由（自由でダイナミック）','やや挑戦（汚れる・大胆に）開放的に'], iso:50 }, 
      {id:115, name:'mud_play5', namae:'どろんこ遊び5', vector:[0.85,0.95,0.65,0.78,0.85,0.5,0.95,0.7,0.58,0.8,0.72,0.85,0.6,0.78,0.68], pol:[0.2,0,0.8,0.9,0.9], polst:['やや教育（感覚体験）','中立（一緒に泥んこになる）','強く動（全身で遊ぶ）全身で','強く自由（自由でダイナミック）','やや挑戦（汚れる・大胆に）開放的に'], iso:52 }, 
      {id:116, name:'craft0', namae:'製作活動0', vector:[0.48,0.7,0.38,0.68,0.55,0.65,0.78,0.85,0.85,0.65,0.85,0.6,0.42,0.62,0.58], pol:[0.5,-0.4,-0.3,0.3,0.3], polst:['やや教育（創造性・技能）','やや個別（自分の作品）','やや静（集中して作る）','やや自由（自由な表現）手本通り','やや挑戦（技能の習得）'], iso:80 }, 
      {id:117, name:'craft1', namae:'製作活動1', vector:[0.58,0.75,0.45,0.72,0.65,0.68,0.78,0.82,0.88,0.68,0.82,0.62,0.48,0.68,0.62], pol:[0.5,-0.4,-0.3,0.38,0.36], polst:['やや教育（創造性・技能）','やや個別（自分の作品）','やや静（集中して作る）','やや自由（自由な表現）手本から自由へ↑','やや挑戦（技能の習得）'], iso:85 }, 
      {id:118, name:'craft2', namae:'製作活動2', vector:[0.65,0.82,0.55,0.78,0.7,0.7,0.75,0.78,0.88,0.7,0.78,0.65,0.55,0.75,0.68], pol:[0.5,-0.4,-0.3,0.46,0.42], polst:['やや教育（創造性・技能）','やや個別（自分の作品）','やや静（集中して作る）','やや自由（自由な表現）手本から自由へ↑','やや挑戦（技能の習得）'], iso:125 }, 
      {id:119, name:'craft3', namae:'製作活動3', vector:[0.72,0.8,0.65,0.85,0.68,0.72,0.72,0.72,0.85,0.72,0.72,0.65,0.58,0.82,0.72], pol:[0.5,-0.4,-0.3,0.54,0.48], polst:['やや教育（創造性・技能）','やや個別（自分の作品）','やや静（集中して作る）','やや自由（自由な表現）手本から自由へ↑','やや挑戦（技能の習得）より複雑な技法↑'], iso:135 }, 
      {id:120, name:'craft4', namae:'製作活動4', vector:[0.78,0.78,0.7,0.88,0.65,0.75,0.7,0.68,0.85,0.75,0.7,0.62,0.58,0.85,0.72], pol:[0.5,-0.4,-0.3,0.62,0.54], polst:['やや教育（創造性・技能）','やや個別（自分の作品）','やや静（集中して作る）','やや自由（自由な表現）手本から自由へ↑','やや挑戦（技能の習得）より複雑な技法↑'], iso:245 }, 
      {id:121, name:'craft5', namae:'製作活動5', vector:[0.82,0.75,0.72,0.9,0.58,0.78,0.72,0.68,0.85,0.78,0.72,0.6,0.55,0.88,0.75], pol:[0.5,-0.4,-0.3,0.7,0.6], polst:['やや教育（創造性・技能）','やや個別（自分の作品）','やや静（集中して作る）','やや自由（自由な表現）自由創作','やや挑戦（技能の習得）より複雑な技法'], iso:250 }, 
      {id:122, name:'rhythm0', namae:'リズム遊び・リトミック0', vector:[0.5,0.58,0.42,0.68,0.85,0.6,0.82,0.85,0.7,0.58,0.88,0.75,0.4,0.58,0.65], pol:[0.4,0.4,0.5,-0.2,0.2], polst:['やや教育（音楽的感性）','やや集団（みんなで動く）','やや動（身体を動かす）','やや構造（リズムに合わせる）単純なリズム','やや挑戦（新しい動き）慣れ親しむ'], iso:70 }, 
      {id:123, name:'rhythm1', namae:'リズム遊び・リトミック1', vector:[0.6,0.65,0.52,0.72,0.88,0.62,0.82,0.82,0.72,0.6,0.85,0.78,0.48,0.63,0.7], pol:[0.4,0.4,0.5,-0.14,0.26], polst:['やや教育（音楽的感性）','やや集団（みんなで動く）','やや動（身体を動かす）','やや構造（リズムに合わせる）単純なリズム','やや挑戦（新しい動き）慣れ親しむ'], iso:75 }, 
      {id:124, name:'rhythm2', namae:'リズム遊び・リトミック2', vector:[0.68,0.7,0.62,0.78,0.9,0.65,0.8,0.78,0.72,0.62,0.8,0.8,0.55,0.7,0.75], pol:[0.4,0.4,0.5,-0.08,0.32], polst:['やや教育（音楽的感性）','やや集団（みんなで動く）','やや動（身体を動かす）','やや構造（リズムに合わせる）単純なリズム','やや挑戦（新しい動き）慣れ親しむ'], iso:80 }, 
      {id:125, name:'rhythm3', namae:'リズム遊び・リトミック3', vector:[0.75,0.72,0.72,0.82,0.88,0.68,0.78,0.72,0.7,0.65,0.75,0.82,0.58,0.78,0.78], pol:[0.4,0.4,0.5,-0.02,0.38], polst:['やや教育（音楽的感性）','やや集団（みんなで動く）','やや動（身体を動かす）','やや構造（リズムに合わせる）即興表現','やや挑戦（新しい動き）複雑な動き'], iso:85 }, 
      {id:126, name:'rhythm4', namae:'リズム遊び・リトミック4', vector:[0.78,0.7,0.78,0.85,0.85,0.7,0.75,0.68,0.68,0.68,0.72,0.82,0.6,0.82,0.8], pol:[0.4,0.4,0.5,0.04,0.44], polst:['やや教育（音楽的感性）','やや集団（みんなで動く）','やや動（身体を動かす）','やや構造（リズムに合わせる）即興表現','やや挑戦（新しい動き）複雑な動き'], iso:90 }, 
      {id:127, name:'rhythm5', namae:'リズム遊び・リトミック5', vector:[0.82,0.68,0.82,0.88,0.82,0.72,0.75,0.68,0.68,0.7,0.75,0.8,0.58,0.85,0.82], pol:[0.4,0.4,0.5,0.1,0.5], polst:['やや教育（音楽的感性）','やや集団（みんなで動く）','やや動（身体を動かす）','やや構造（リズムに合わせる）即興表現','やや挑戦（新しい動き）複雑な動き'], iso:95 }, 
      {id:128, name:'group_play0', namae:'集団遊び0', vector:[0.42,0.55,0.45,0.52,0.7,0.55,0.75,0.88,0.55,0.58,0.88,0.65,0.48,0.5,0.68], pol:[0.3,0.8,0.3,-0.4,0.3], polst:['やや教育（社会性・ルール）','強く集団（みんなで一緒に）','やや動（動的な遊び多め）','やや構造（ルールがある）簡単なルール','やや挑戦（ルールの理解・協力）ただ一緒にいる'], iso:140 }, 
      {id:129, name:'group_play1', namae:'集団遊び1', vector:[0.52,0.62,0.55,0.58,0.75,0.58,0.78,0.85,0.58,0.6,0.85,0.68,0.55,0.58,0.72], pol:[0.3,0.8,0.3,-0.3,0.38], polst:['やや教育（社会性・ルール）','強く集団（みんなで一緒に）','やや動（動的な遊び多め）','やや構造（ルールがある）簡単なルール','やや挑戦（ルールの理解・協力）ただ一緒にいる'], iso:145 }, 
      {id:130, name:'group_play2', namae:'集団遊び2', vector:[0.6,0.7,0.68,0.62,0.8,0.62,0.78,0.78,0.6,0.62,0.8,0.7,0.65,0.65,0.78], pol:[0.3,0.8,0.3,-0.2,0.46], polst:['やや教育（社会性・ルール）','強く集団（みんなで一緒に）','やや動（動的な遊び多め）','やや構造（ルールがある）簡単なルール','やや挑戦（ルールの理解・協力）ただ一緒にいる'], iso:150 }, 
      {id:131, name:'group_play3', namae:'集団遊び3', vector:[0.68,0.72,0.8,0.7,0.78,0.65,0.75,0.72,0.58,0.65,0.72,0.75,0.72,0.75,0.82], pol:[0.3,0.8,0.3,-0.1,0.54], polst:['やや教育（社会性・ルール）','強く集団（みんなで一緒に）','やや動（動的な遊び多め）','やや構造（ルールがある）簡単から複雑なルール↑','やや挑戦（ルールの理解・協力）一緒の場→友だちを意識'], iso:185 }, 
      {id:132, name:'group_play4', namae:'集団遊び4', vector:[0.72,0.7,0.85,0.75,0.75,0.68,0.72,0.68,0.55,0.68,0.7,0.78,0.78,0.8,0.85], pol:[0.3,0.8,0.3,0,0.62], polst:['やや教育（社会性・ルール）','強く集団（みんなで一緒に）','やや動（動的な遊び多め）','やや構造（ルールがある）簡単から複雑なルール↑','やや挑戦（ルールの理解・協力）協力して達成'], iso:190 }, 
      {id:133, name:'group_play5', namae:'集団遊び5', vector:[0.75,0.68,0.88,0.75,0.72,0.7,0.72,0.68,0.52,0.7,0.72,0.75,0.8,0.82,0.88], pol:[0.3,0.8,0.3,0.1,0.7], polst:['やや教育（社会性・ルール）','強く集団（みんなで一緒に）','やや動（動的な遊び多め）','やや構造（ルールがある）複雑なルール','やや挑戦（ルールの理解・協力）協力して達成'], iso:195 }, 
      {id:134, name:'sports_day_before0', namae:'運動会前0', vector:[0.48,0.58,0.45,0.58,0.8,0.6,0.8,0.88,0.68,0.62,0.88,0.65,0.48,0.55,0.68], pol:[0.4,0.7,0.7,-0.4,0.6], polst:['やや教育（協力・達成）','強く集団（チームで）','強く動（練習）','やや構造（練習の流れ）','やや挑戦（本番へ向けて）環境変化'], iso:75 }, 
      {id:135, name:'sports_day_before1', namae:'運動会前1', vector:[0.58,0.65,0.55,0.62,0.85,0.62,0.8,0.85,0.7,0.65,0.85,0.68,0.52,0.62,0.72], pol:[0.4,0.7,0.7,-0.4,0.68], polst:['やや教育（協力・達成）','強く集団（チームで）','強く動（練習）','やや構造（練習の流れ）','やや挑戦（本番へ向けて）環境変化'], iso:80 }, 
      {id:136, name:'sports_day_before2', namae:'運動会前2', vector:[0.65,0.7,0.65,0.68,0.88,0.65,0.78,0.8,0.72,0.68,0.8,0.72,0.6,0.7,0.78], pol:[0.4,0.7,0.7,-0.4,0.76], polst:['やや教育（協力・達成）','強く集団（チームで）','強く動（練習）','やや構造（練習の流れ）','やや挑戦（本番へ向けて）環境変化→目標'], iso:85 }, 
      {id:137, name:'sports_day_before3', namae:'運動会前3', vector:[0.72,0.72,0.78,0.75,0.85,0.7,0.75,0.72,0.7,0.7,0.75,0.78,0.65,0.8,0.82], pol:[0.4,0.7,0.7,-0.4,0.84], polst:['やや教育（協力・達成）','強く集団（チームで）','強く動（練習）','やや構造（練習の流れ）','やや挑戦（本番へ向けて）高い目標'], iso:185 }, 
      {id:138, name:'sports_day_before4', namae:'運動会前4', vector:[0.78,0.7,0.85,0.8,0.82,0.75,0.75,0.7,0.72,0.72,0.75,0.8,0.68,0.85,0.85], pol:[0.4,0.7,0.7,-0.4,0.92], polst:['やや教育（協力・達成）','強く集団（チームで）','強く動（練習）','やや構造（練習の流れ）','やや挑戦（本番へ向けて）高い目標'], iso:188 }, 
      {id:139, name:'sports_day_before5', namae:'運動会前5', vector:[0.82,0.68,0.88,0.82,0.8,0.78,0.78,0.72,0.72,0.75,0.78,0.78,0.65,0.88,0.88], pol:[0.4,0.7,0.7,-0.4,1], polst:['やや教育（協力・達成）','強く集団（チームで）','強く動（練習）','やや構造（練習の流れ）','やや挑戦（本番へ向けて）高い目標'], iso:190 }, 
      {id:140, name:'sports_day_after0', namae:'運動会後0', vector:[0.45,0.6,0.4,0.52,0.7,0.48,0.82,0.88,0.65,0.58,0.9,0.58,0.48,0.6,0.72], pol:[0.2,0.4,-0.2,0.3,-0.2], polst:['やや教育（振り返り）日常に戻る','やや集団（共に喜ぶ）','やや静（ほっと一息）','やや自由（のんびり）','やや安定（ゆっくり過ごす）'], iso:345 }, 
      {id:141, name:'sports_day_after1', namae:'運動会後1', vector:[0.55,0.68,0.5,0.58,0.75,0.52,0.82,0.85,0.68,0.62,0.88,0.62,0.52,0.65,0.75], pol:[0.26,0.4,-0.2,0.3,-0.2], polst:['やや教育（振り返り）日常に戻る','やや集団（共に喜ぶ）','やや静（ほっと一息）','やや自由（のんびり）','やや安定（ゆっくり過ごす）'], iso:345 }, 
      {id:142, name:'sports_day_after2', namae:'運動会後2', vector:[0.62,0.75,0.6,0.62,0.8,0.58,0.82,0.8,0.7,0.65,0.85,0.65,0.58,0.72,0.78], pol:[0.32,0.4,-0.2,0.3,-0.2], polst:['やや教育（振り返り）日常に戻る','やや集団（共に喜ぶ）','やや静（ほっと一息）','やや自由（のんびり）','やや安定（ゆっくり過ごす）'], iso:345 }, 
      {id:143, name:'sports_day_after3', namae:'運動会後3', vector:[0.7,0.78,0.7,0.7,0.75,0.62,0.78,0.72,0.68,0.68,0.78,0.68,0.62,0.8,0.8], pol:[0.38,0.4,-0.2,0.3,-0.2], polst:['やや教育（振り返り）達成の実感','やや集団（共に喜ぶ）','やや静（ほっと一息）','やや自由（のんびり）','やや安定（ゆっくり過ごす）'], iso:345 }, 
      {id:144, name:'sports_day_after4', namae:'運動会後4', vector:[0.75,0.75,0.75,0.75,0.72,0.65,0.75,0.68,0.68,0.7,0.75,0.68,0.65,0.85,0.82], pol:[0.44,0.4,-0.2,0.3,-0.2], polst:['やや教育（振り返り）達成の実感','やや集団（共に喜ぶ）','やや静（ほっと一息）','やや自由（のんびり）','やや安定（ゆっくり過ごす）'], iso:345 }, 
      {id:145, name:'sports_day_after5', namae:'運動会後5', vector:[0.82,0.72,0.78,0.78,0.68,0.68,0.78,0.68,0.68,0.72,0.78,0.65,0.62,0.88,0.85], pol:[0.5,0.4,-0.2,0.3,-0.2], polst:['やや教育（振り返り）達成の実感','やや集団（共に喜ぶ）','やや静（ほっと一息）','やや自由（のんびり）','やや安定（ゆっくり過ごす）'], iso:345 }, 
      {id:146, name:'excursion0', namae:'遠足・園外保育0', vector:[0.5,0.68,0.42,0.58,0.82,0.7,0.75,0.92,0.55,0.75,0.85,0.75,0.45,0.6,0.7], pol:[0.4,0.5,0.6,0.3,0.7], polst:['やや教育（新しい体験）','やや集団（みんなで出かける）','やや動（歩く・探検）','やや自由（興味に応じて）','強く挑戦（特別な場所へ）慎重に'], iso:25 }, 
      {id:147, name:'excursion1', namae:'遠足・園外保育1', vector:[0.6,0.75,0.5,0.62,0.85,0.72,0.78,0.88,0.58,0.78,0.82,0.78,0.5,0.65,0.73], pol:[0.4,0.5,0.6,0.3,0.76], polst:['やや教育（新しい体験）','やや集団（みんなで出かける）','やや動（歩く・探検）','やや自由（興味に応じて）','強く挑戦（特別な場所へ）慎重に'], iso:28 }, 
      {id:148, name:'excursion2', namae:'遠足・園外保育2', vector:[0.68,0.82,0.6,0.65,0.88,0.75,0.8,0.82,0.52,0.8,0.78,0.8,0.58,0.72,0.78], pol:[0.4,0.5,0.6,0.3,0.82], polst:['やや教育（新しい体験）','やや集団（みんなで出かける）','やや動（歩く・探検）','やや自由（興味に応じて）','強く挑戦（特別な場所へ）慎重に→冒険'], iso:30 }, 
      {id:149, name:'excursion3', namae:'遠足・園外保育3', vector:[0.75,0.85,0.7,0.72,0.85,0.78,0.8,0.75,0.48,0.82,0.75,0.82,0.6,0.8,0.8], pol:[0.4,0.5,0.6,0.3,0.88], polst:['やや教育（新しい体験）','やや集団（みんなで出かける）','やや動（歩く・探検）','やや自由（興味に応じて）','強く挑戦（特別な場所へ）冒険'], iso:185 }, 
      {id:150, name:'excursion4', namae:'遠足・園外保育4', vector:[0.8,0.88,0.75,0.75,0.82,0.78,0.82,0.72,0.45,0.85,0.72,0.82,0.62,0.85,0.82], pol:[0.4,0.5,0.6,0.3,0.94], polst:['やや教育（新しい体験）','やや集団（みんなで出かける）','やや動（歩く・探検）','やや自由（興味に応じて）','強く挑戦（特別な場所へ）冒険'], iso:188 }, 
      {id:151, name:'excursion5', namae:'遠足・園外保育5', vector:[0.85,0.9,0.78,0.72,0.8,0.78,0.85,0.75,0.42,0.88,0.75,0.8,0.58,0.85,0.85], pol:[0.4,0.5,0.6,0.3,1], polst:['やや教育（新しい体験）','やや集団（みんなで出かける）','やや動（歩く・探検）','やや自由（興味に応じて）','強く挑戦（特別な場所へ）冒険'], iso:190 }, 
      {id:152, name:'harvest0', namae:'収穫体験0', vector:[0.48,0.72,0.4,0.6,0.8,0.55,0.82,0.88,0.65,0.75,0.85,0.7,0.42,0.68,0.65], pol:[0.5,0.2,0.3,0.2,0.3], polst:['やや教育（命の循環・感謝）感覚体験','やや集団（一緒に収穫）','やや動（畑で動く）','やや自由（どれを採るか選ぶ）','やや挑戦（初めての体験）'], iso:35 }, 
      {id:153, name:'harvest1', namae:'収穫体験1', vector:[0.58,0.8,0.48,0.62,0.82,0.58,0.82,0.85,0.68,0.78,0.82,0.72,0.48,0.72,0.68], pol:[0.56,0.2,0.3,0.2,0.3], polst:['やや教育（命の循環・感謝）感覚体験','やや集団（一緒に収穫）','やや動（畑で動く）','やや自由（どれを採るか選ぶ）','やや挑戦（初めての体験）'], iso:38 }, 
      {id:154, name:'harvest2', namae:'収穫体験2', vector:[0.68,0.85,0.58,0.68,0.85,0.6,0.82,0.78,0.62,0.8,0.78,0.75,0.55,0.78,0.72], pol:[0.62,0.2,0.3,0.2,0.3], polst:['やや教育（命の循環・感謝）感覚体験→食育','やや集団（一緒に収穫）','やや動（畑で動く）','やや自由（どれを採るか選ぶ）','やや挑戦（初めての体験）'], iso:40 }, 
      {id:155, name:'harvest3', namae:'収穫体験3', vector:[0.75,0.88,0.68,0.75,0.82,0.62,0.82,0.72,0.58,0.82,0.75,0.78,0.58,0.85,0.75], pol:[0.68,0.2,0.3,0.2,0.3], polst:['やや教育（命の循環・感謝）食育・命の学び','やや集団（一緒に収穫）','やや動（畑で動く）','やや自由（どれを採るか選ぶ）','やや挑戦（初めての体験）'], iso:345 }, 
      {id:156, name:'harvest4', namae:'収穫体験4', vector:[0.8,0.88,0.72,0.78,0.78,0.62,0.82,0.7,0.55,0.85,0.72,0.78,0.58,0.88,0.78], pol:[0.74,0.2,0.3,0.2,0.3], polst:['やや教育（命の循環・感謝）食育・命の学び','やや集団（一緒に収穫）','やや動（畑で動く）','やや自由（どれを採るか選ぶ）','やや挑戦（初めての体験）'], iso:347 }, 
      {id:157, name:'harvest5', namae:'収穫体験5', vector:[0.82,0.9,0.7,0.75,0.78,0.62,0.85,0.72,0.52,0.88,0.75,0.75,0.55,0.9,0.8], pol:[0.8,0.2,0.3,0.2,0.3], polst:['やや教育（命の循環・感謝）食育・命の学び','やや集団（一緒に収穫）','やや動（畑で動く）','やや自由（どれを採るか選ぶ）','やや挑戦（初めての体験）'], iso:350 }, 
      {id:158, name:'graduation_prep3', namae:'卒園式前3', vector:[0.68,0.75,0.7,0.7,0.72,0.68,0.75,0.72,0.72,0.7,0.78,0.62,0.62,0.75,0.78], pol:[0.5,0.6,-0.2,-0.3,0.5], polst:['やや教育（成長の実感）','やや集団（年長児への親しみ）','やや静（しみじみと）','やや構造（式の練習）','やや挑戦（年長児との別れ）'], iso:320 }, 
      {id:159, name:'graduation_prep4', namae:'卒園式前4', vector:[0.72,0.72,0.78,0.78,0.68,0.75,0.72,0.7,0.75,0.75,0.75,0.6,0.65,0.82,0.82], pol:[0.5,0.6,-0.2,-0.3,0.5], polst:['やや教育（成長の実感）','やや集団（年長児への親しみ）','やや静（しみじみと）','やや構造（式の練習）','やや挑戦（年長児との別れ）'], iso:320 }, 
      {id:160, name:'graduation_prep5', namae:'卒園式前5', vector:[0.8,0.68,0.85,0.88,0.55,0.82,0.75,0.72,0.8,0.8,0.78,0.58,0.58,0.92,0.92], pol:[0.5,0.6,-0.2,-0.3,0.5], polst:['やや教育（成長の実感）','やや集団（クラスの絆）','やや静（しみじみと）','やや構造（式の練習）','やや挑戦（別れと旅立ち）'], iso:320 }, 
      {id:161, name:'meal0', namae:'給食・食育0', vector:[0.4,0.6,0.38,0.48,0.5,0.65,0.75,0.92,0.75,0.7,0.92,0.55,0.45,0.55,0.68], pol:[-0.2,0.3,-0.5,-0.5,0], polst:['やや養護（食事は生命の基盤）養護中心','やや集団（みんなで食べる）','やや静（落ち着いて食べる）','やや構造（食事のマナー）','中立（安定だが新しい食材にも挑戦）慣れた味'], iso:130 }, 
      {id:162, name:'meal1', namae:'給食・食育1', vector:[0.5,0.68,0.45,0.52,0.58,0.68,0.78,0.88,0.78,0.72,0.88,0.58,0.52,0.6,0.72], pol:[-0.14,0.3,-0.5,-0.5,0.06], polst:['やや養護（食事は生命の基盤）養護中心','やや集団（みんなで食べる）','やや静（落ち着いて食べる）','やや構造（食事のマナー）','中立（安定だが新しい食材にも挑戦）慣れた味'], iso:132 }, 
      {id:163, name:'meal2', namae:'給食・食育2', vector:[0.58,0.75,0.58,0.58,0.65,0.7,0.78,0.82,0.78,0.75,0.82,0.62,0.6,0.68,0.78], pol:[-0.08,0.3,-0.5,-0.5,0.12], polst:['やや養護（食事は生命の基盤）養護中心','やや集団（みんなで食べる）','やや静（落ち着いて食べる）','やや構造（食事のマナー）','中立（安定だが新しい食材にも挑戦）慣れた味'], iso:135 }, 
      {id:164, name:'meal3', namae:'給食・食育3', vector:[0.65,0.78,0.7,0.65,0.68,0.7,0.75,0.75,0.75,0.78,0.78,0.65,0.65,0.75,0.8], pol:[-0.02,0.3,-0.5,-0.5,0.18], polst:['やや養護（食事は生命の基盤）食育・マナー','やや集団（みんなで食べる）','やや静（落ち着いて食べる）','やや構造（食事のマナー）','中立（安定だが新しい食材にも挑戦）新しい食材'], iso:138 }, 
      {id:165, name:'meal4', namae:'給食・食育4', vector:[0.7,0.8,0.78,0.7,0.68,0.72,0.72,0.72,0.72,0.78,0.75,0.65,0.68,0.8,0.82], pol:[0.04,0.3,-0.5,-0.5,0.24], polst:['やや養護（食事は生命の基盤）食育・マナー','やや集団（みんなで食べる）','やや静（落ち着いて食べる）','やや構造（食事のマナー）','中立（安定だが新しい食材にも挑戦）新しい食材'], iso:140 }, 
      {id:166, name:'meal5', namae:'給食・食育5', vector:[0.75,0.82,0.82,0.72,0.65,0.75,0.72,0.72,0.72,0.8,0.78,0.62,0.65,0.82,0.85], pol:[0.1,0.3,-0.5,-0.5,0.3], polst:['やや養護（食事は生命の基盤）食育・マナー','やや集団（みんなで食べる）','やや静（落ち着いて食べる）','やや構造（食事のマナー）','中立（安定だが新しい食材にも挑戦）新しい食材'], iso:142 }, 
      {id:167, name:'nap0', namae:'お昼寝・午睡0', vector:[0.35,0.45,0.3,0.4,0.35,0.65,0.7,0.95,0.6,0.8,0.98,0.4,0.35,0.4,0.7], pol:[-0.9,-0.3,-1,-0.4,-0.9], polst:['強く養護（休息）','やや個別（それぞれのペース）','最強静（眠る）よく眠る','やや構造（決まった時間）','強く安定（安心して眠る）'], iso:335 }, 
      {id:168, name:'nap1', namae:'お昼寝・午睡1', vector:[0.4,0.5,0.35,0.42,0.4,0.68,0.72,0.92,0.62,0.82,0.95,0.42,0.4,0.42,0.72], pol:[-0.9,-0.3,-0.98,-0.4,-0.88], polst:['強く養護（休息）','やや個別（それぞれのペース）','最強静（眠る）よく眠る','やや構造（決まった時間）','強く安定（安心して眠る）'], iso:335 }, 
      {id:169, name:'nap2', namae:'お昼寝・午睡2', vector:[0.45,0.55,0.4,0.45,0.42,0.7,0.72,0.88,0.62,0.82,0.92,0.45,0.45,0.45,0.75], pol:[-0.9,-0.3,-0.96,-0.4,-0.86], polst:['強く養護（休息）','やや個別（それぞれのペース）','最強静（眠る）よく眠る','やや構造（決まった時間）','強く安定（安心して眠る）'], iso:335 }, 
      {id:170, name:'nap3', namae:'お昼寝・午睡3', vector:[0.5,0.58,0.45,0.48,0.45,0.7,0.7,0.85,0.6,0.8,0.88,0.48,0.48,0.5,0.75], pol:[-0.9,-0.3,-0.94,-0.4,-0.84], polst:['強く養護（休息）','やや個別（それぞれのペース）','最強静（眠る）よく眠る→短時間','やや構造（決まった時間）','強く安定（安心して眠る）'], iso:335 }, 
      {id:171, name:'nap4', namae:'お昼寝・午睡4', vector:[0.55,0.6,0.48,0.5,0.45,0.7,0.7,0.82,0.58,0.78,0.85,0.48,0.48,0.52,0.75], pol:[-0.9,-0.3,-0.92,-0.4,-0.82], polst:['強く養護（休息）','やや個別（それぞれのペース）','最強静（眠る）よく眠る→短時間','やや構造（決まった時間）','強く安定（安心して眠る）'], iso:335 }, 
      {id:172, name:'nap5', namae:'お昼寝・午睡5', vector:[0.58,0.62,0.5,0.52,0.45,0.7,0.7,0.82,0.58,0.75,0.85,0.48,0.48,0.52,0.75], pol:[-0.9,-0.3,-0.9,-0.4,-0.8], polst:['強く養護（休息）','やや個別（それぞれのペース）','最強静（眠る）短時間','やや構造（決まった時間）','強く安定（安心して眠る）午睡なしの子も'], iso:335 }, 
      {id:173, name:'birthday0', namae:'誕生会0', vector:[0.48,0.55,0.45,0.62,0.55,0.7,0.78,0.88,0.75,0.6,0.88,0.72,0.42,0.68,0.75], pol:[0.2,0.6,0.2,-0.3,0.3], polst:['やや教育（成長の実感）','やや集団（みんなで祝う）','やや動（楽しく盛り上がる）','やや構造（行事の流れ）','やや挑戦（注目される）環境の変化'], iso:350 }, 
      {id:174, name:'birthday1', namae:'誕生会1', vector:[0.58,0.62,0.55,0.68,0.62,0.72,0.78,0.85,0.78,0.62,0.85,0.75,0.48,0.72,0.78], pol:[0.2,0.6,0.2,-0.3,0.34], polst:['やや教育（成長の実感）','やや集団（みんなで祝う）','やや動（楽しく盛り上がる）','やや構造（行事の流れ）','やや挑戦（注目される）環境の変化'], iso:350 }, 
      {id:175, name:'birthday2', namae:'誕生会2', vector:[0.65,0.68,0.65,0.75,0.65,0.72,0.78,0.8,0.78,0.65,0.8,0.78,0.55,0.78,0.82], pol:[0.2,0.6,0.2,-0.3,0.38], polst:['やや教育（成長の実感）','やや集団（みんなで祝う）','やや動（楽しく盛り上がる）','やや構造（行事の流れ）','やや挑戦（注目される）環境の変化'], iso:350 }, 
      {id:176, name:'birthday3', namae:'誕生会3', vector:[0.72,0.7,0.78,0.82,0.68,0.75,0.75,0.75,0.78,0.68,0.78,0.8,0.58,0.85,0.85], pol:[0.2,0.6,0.2,-0.3,0.42], polst:['やや教育（成長の実感）','やや集団（みんなで祝う）','やや動（楽しく盛り上がる）','やや構造（行事の流れ）','やや挑戦（注目される）前に出る'], iso:350 }, 
      {id:177, name:'birthday4', namae:'誕生会4', vector:[0.75,0.68,0.82,0.85,0.65,0.75,0.75,0.72,0.78,0.68,0.78,0.82,0.58,0.88,0.88], pol:[0.2,0.6,0.2,-0.3,0.46], polst:['やや教育（成長の実感）','やや集団（みんなで祝う）','やや動（楽しく盛り上がる）','やや構造（行事の流れ）','やや挑戦（注目される）前に出る'], iso:350 }, 
      {id:178, name:'birthday5', namae:'誕生会5', vector:[0.78,0.65,0.85,0.88,0.62,0.78,0.78,0.75,0.8,0.7,0.8,0.8,0.55,0.9,0.9], pol:[0.2,0.6,0.2,-0.3,0.5], polst:['やや教育（成長の実感）','やや集団（みんなで祝う）','やや動（楽しく盛り上がる）','やや構造（行事の流れ）','やや挑戦（注目される）前に出る'], iso:350 }, 
      {id:179, name:'evacuation_drill0', namae:'避難訓練0', vector:[0.35,0.48,0.4,0.42,0.6,0.85,0.65,0.98,0.55,0.45,0.85,0.55,0.52,0.48,0.75], pol:[-0.3,0.6,0.2,-0.8,0.4], polst:['やや養護（安全確保）','やや集団（みんなで避難）','やや動（迅速に動く）','強く構造（手順通り）','やや挑戦（緊張感）不安に配慮'], iso:145 }, 
      {id:180, name:'evacuation_drill1', namae:'避難訓練1', vector:[0.42,0.52,0.48,0.45,0.68,0.88,0.68,0.95,0.58,0.48,0.82,0.58,0.58,0.52,0.78], pol:[-0.3,0.6,0.2,-0.8,0.46], polst:['やや養護（安全確保）','やや集団（みんなで避難）','やや動（迅速に動く）','強く構造（手順通り）','やや挑戦（緊張感）不安に配慮'], iso:145 }, 
      {id:181, name:'evacuation_drill2', namae:'避難訓練2', vector:[0.5,0.58,0.58,0.5,0.72,0.88,0.7,0.92,0.6,0.5,0.8,0.6,0.62,0.58,0.8], pol:[-0.3,0.6,0.2,-0.8,0.52], polst:['やや養護（安全確保）','やや集団（みんなで避難）','やや動（迅速に動く）','強く構造（手順通り）','やや挑戦（緊張感）不安に配慮'], iso:145 }, 
      {id:182, name:'evacuation_drill3', namae:'避難訓練3', vector:[0.58,0.62,0.68,0.55,0.75,0.88,0.7,0.88,0.6,0.52,0.78,0.62,0.65,0.65,0.82], pol:[-0.3,0.6,0.2,-0.8,0.58], polst:['やや養護（安全確保）','やや集団（みんなで避難）','やや動（迅速に動く）','強く構造（手順通り）','やや挑戦（緊張感）真剣に取り組む'], iso:145 }, 
      {id:183, name:'evacuation_drill4', namae:'避難訓練4', vector:[0.65,0.65,0.75,0.58,0.78,0.88,0.7,0.85,0.58,0.52,0.75,0.62,0.68,0.7,0.85], pol:[-0.3,0.6,0.2,-0.8,0.64], polst:['やや養護（安全確保）','やや集団（みんなで避難）','やや動（迅速に動く）','強く構造（手順通り）','やや挑戦（緊張感）真剣に取り組む'], iso:145 }, 
      {id:184, name:'evacuation_drill5', namae:'避難訓練5', vector:[0.72,0.68,0.8,0.6,0.8,0.88,0.72,0.85,0.58,0.52,0.78,0.6,0.68,0.75,0.85], pol:[-0.3,0.6,0.2,-0.8,0.7], polst:['やや養護（安全確保）','やや集団（みんなで避難）','やや動（迅速に動く）','強く構造（手順通り）','やや挑戦（緊張感）真剣に取り組む'], iso:145 }, 
      {id:185, name:'stamp_play0', namae:'スタンプ遊び0', vector:[0.48,0.75,0.35,0.68,0.55,0.6,0.85,0.88,0.85,0.55,0.85,0.7,0.38,0.55,0.5], pol:[0.3,-0.6,-0.2,0.7,0.2], polst:['やや教育(感覚的探索）','強く個別（1人で集中)','やや静(座って作業が多い)','強く自由(自由な模様作り)','やや挑戦（新しい模様への挑戦）'], iso:35 }, 
      {id:186, name:'stamp_play1', namae:'スタンプ遊び1', vector:[0.58,0.8,0.42,0.75,0.6,0.62,0.85,0.85,0.88,0.58,0.82,0.72,0.45,0.65,0.52], pol:[0.35,-0.54,-0.15,0.74,0.26], polst:['やや教育(感覚的探索）','強く個別（1人で集中)','やや静(座って作業が多い)','強く自由(自由な模様作り)','やや挑戦（新しい模様への挑戦）'], iso:38 }, 
      {id:187, name:'stamp_play2', namae:'スタンプ遊び2', vector:[0.7,0.85,0.5,0.85,0.65,0.65,0.85,0.8,0.9,0.6,0.75,0.75,0.5,0.8,0.55], pol:[0.4,-0.48,-0.1,0.78,0.32], polst:['やや教育(感覚的探索から表現へ）','強く個別（1人で集中)','やや静(座って作業が多い)','強く自由(自由な模様作り)','やや挑戦（新しい模様への挑戦）'], iso:75 }, 
      {id:188, name:'stamp_play3', namae:'スタンプ遊び3', vector:[0.75,0.88,0.58,0.88,0.68,0.68,0.82,0.75,0.88,0.65,0.72,0.75,0.55,0.85,0.62], pol:[0.45,-0.42,-0.05,0.82,0.38], polst:['やや教育(表現性の教育的側面）','強く個別（1人で集中→友だちとの関わり増)','やや静(座って活動→やや動きが増える)','強く自由(自由な模様作り)','やや挑戦（新しい模様への挑戦）'], iso:80 }, 
      {id:189, name:'stamp_play4', namae:'スタンプ遊び4', vector:[0.8,0.88,0.62,0.9,0.65,0.7,0.82,0.72,0.88,0.68,0.7,0.73,0.55,0.88,0.65], pol:[0.5,-0.36,0,0.86,0.44], polst:['やや教育(表現性の教育的側面）','強く個別（1人で集中→友だちとの関わり増)','やや静(座って活動→やや動きが増える)','強く自由(自由な模様作り)','やや挑戦（新しい模様への挑戦）'], iso:245 }, 
      {id:190, name:'stamp_play5', namae:'スタンプ遊び5', vector:[0.85,0.9,0.6,0.92,0.6,0.72,0.85,0.72,0.85,0.7,0.72,0.7,0.52,0.9,0.68], pol:[0.55,-0.3,0,0.9,0.5], polst:['やや教育(表現性の教育的側面）','強く個別（1人で集中→友だちとの関わり増)','やや静(座って活動→やや動きが増える)','強く自由(自由な模様作り)','やや挑戦（新しい模様への挑戦）'], iso:248 }, 
      {id:191, name:'chopsticks_practice2', namae:'お箸の練習2', vector:[0.65,0.65,0.4,0.5,0.85,0.75,0.7,0.88,0.92,0.65,0.85,0.55,0.65,0.85,0.55], pol:[0.4,-0.3,-0.4,-0.5,0.5], polst:['やや教育(生活技能の習得)','やや個別(自分のペースで)','やや静(座って練習)','やや構造(正しい持ち方がある)','やや挑戦(難しい技能)'], iso:125 }, 
      {id:192, name:'chopsticks_practice3', namae:'お箸の練習3', vector:[0.7,0.68,0.48,0.58,0.88,0.78,0.72,0.85,0.9,0.7,0.82,0.58,0.68,0.88,0.6], pol:[0.45,-0.18,-0.35,-0.4,0.54], polst:['やや教育(生活技能の習得)','やや個別(自分のペースで)','やや静(座って練習)','やや構造(正しい持ち方がある)','やや挑戦(難しい技能)'], iso:130 }, 
      {id:193, name:'chopsticks_practice4', namae:'お箸の練習4', vector:[0.75,0.7,0.55,0.62,0.9,0.8,0.75,0.82,0.88,0.75,0.8,0.6,0.7,0.9,0.65], pol:[0.5,-0.06,-0.3,-0.3,0.58], polst:['やや教育(生活技能の習得)','やや個別(みんなで練習)','やや静(座って練習)','やや構造(正しい持ち方～自分なりの工夫も)','やや挑戦(難しい技能)'], iso:135 }, 
      {id:194, name:'chopsticks_practice5', namae:'お箸の練習5', vector:[0.8,0.7,0.6,0.65,0.88,0.82,0.78,0.8,0.85,0.8,0.78,0.6,0.68,0.92,0.68], pol:[0.55,0.06,-0.25,-0.2,0.62], polst:['やや教育(生活技能の習得)','やや個別(みんなで練習)','やや静(座って練習)','やや構造(正しい持ち方～自分なりの工夫も)','やや挑戦(難しい技能)'], iso:138 }, 
      {id:195, name:'handplay0', namae:'指先遊び0', vector:[0.52,0.7,0.38,0.72,0.7,0.5,0.78,0.82,0.82,0.55,0.82,0.72,0.48,0.62,0.55], pol:[0.1,-0.45,-0.25,0.55,0.2], polst:['やや教育(集中力・脳の活性化)','やや個別（個別活動主体）','やや静（集中して遊ぶ）','やや自由（自由な遊び）','やや挑戦(巧緻性)'], iso:75 }, 
      {id:196, name:'handplay1', namae:'指先遊び1', vector:[0.58,0.75,0.42,0.76,0.74,0.55,0.78,0.82,0.84,0.58,0.8,0.74,0.5,0.68,0.58], pol:[0.2,-0.4,-0.22,0.6,0.28], polst:['やや教育(集中力・脳の活性化)↑','やや個別（個別活動主体）','やや静（集中して遊ぶ）','やや自由（自由な遊び）','やや挑戦(巧緻性)↑'], iso:80 }, 
      {id:197, name:'handplay2', namae:'指先遊び2', vector:[0.64,0.8,0.5,0.8,0.78,0.6,0.78,0.82,0.86,0.62,0.78,0.75,0.54,0.74,0.62], pol:[0.3,-0.35,-0.18,0.65,0.36], polst:['やや教育(集中力・脳の活性化)↑','やや個別（個別活動主体）','やや静（集中して遊ぶ）','やや自由（自由な遊び）','やや挑戦(巧緻性)↑'], iso:90 }, 
      {id:198, name:'handplay3', namae:'指先遊び3', vector:[0.72,0.79,0.57,0.77,0.75,0.73,0.75,0.77,0.88,0.69,0.75,0.66,0.6,0.85,0.65], pol:[0.47,-0.33,-0.23,0.59,0.47], polst:['やや教育(集中力・脳の活性化)↑','やや個別（個別活動主体）','やや静（集中して遊ぶ）','やや自由（自由な遊び）','やや挑戦(巧緻性)↑'], iso:105 }, 
      {id:199, name:'handplay4', namae:'指先遊び4', vector:[0.76,0.78,0.62,0.78,0.74,0.76,0.74,0.76,0.88,0.72,0.74,0.66,0.62,0.87,0.68], pol:[0.52,-0.22,-0.22,0.62,0.52], polst:['やや教育(集中力・脳の活性化)↑','やや個別（個別活動主体）','やや静（集中して遊ぶ）','やや自由（自由な遊び）','やや挑戦(巧緻性)↑'], iso:120 }, 
      {id:200, name:'handplay5', namae:'指先遊び5', vector:[0.8,0.76,0.68,0.8,0.72,0.8,0.72,0.75,0.87,0.75,0.72,0.65,0.64,0.89,0.72], pol:[0.58,-0.1,-0.2,0.65,0.58], polst:['やや教育(集中力・脳の活性化)↑','やや個別（個別活動主体）','やや静（集中して遊ぶ）','やや自由（自由な遊び）','やや挑戦(巧緻性)↑'], iso:132 }, 
      {id:201, name:'pretend_play0', namae:'ごっこ遊び（日常）0', vector:[0.45,0.52,0.38,0.58,0.52,0.38,0.72,0.82,0.55,0.48,0.85,0.62,0.35,0.45,0.55], pol:[0.05,-0.3,-0.1,0.2,0.1], polst:['やや教育（社会性の学び）','やや個別','中程度の動き','やや自由（自由な遊び）','やや挑戦'], iso:60 }, 
      {id:202, name:'pretend_play1', namae:'ごっこ遊び（日常）1', vector:[0.52,0.6,0.5,0.65,0.6,0.42,0.74,0.8,0.58,0.52,0.82,0.66,0.42,0.55,0.65], pol:[0.15,-0.15,0,0.22,0.2], polst:['やや教育（社会性の学び）↑','やや個別（年齢とともに集団化↑）','中立','やや自由（自由な遊び）','やや挑戦'], iso:68 }, 
      {id:203, name:'pretend_play2', namae:'ごっこ遊び（日常）2', vector:[0.62,0.68,0.65,0.74,0.66,0.48,0.76,0.75,0.6,0.55,0.78,0.7,0.52,0.66,0.75], pol:[0.28,0.1,0.1,0.25,0.32], polst:['やや教育（社会性の学び）↑','やや個別（年齢とともに集団化↑）','中程度の動き','やや自由（自由な遊び）','やや挑戦'], iso:78 }, 
      {id:204, name:'pretend_play3', namae:'ごっこ遊び（日常）3', vector:[0.75,0.74,0.8,0.82,0.68,0.52,0.8,0.7,0.62,0.58,0.74,0.74,0.64,0.76,0.82], pol:[0.45,0.35,0.2,0.18,0.45], polst:['やや教育（社会性の学び）↑','やや集団（年齢とともに集団化↑）','中程度の動き','やや自由（自由な遊び）','やや挑戦（社会性）'], iso:88 }, 
      {id:205, name:'pretend_play4', namae:'ごっこ遊び（日常）4', vector:[0.82,0.76,0.86,0.85,0.66,0.56,0.82,0.68,0.6,0.6,0.72,0.72,0.7,0.8,0.86], pol:[0.55,0.48,0.22,0.15,0.52], polst:['やや教育（社会性の学び）↑','やや集団（年齢とともに集団化↑）','中程度の動き','やや自由（自由な遊び）','やや挑戦（社会性）'], iso:95 }, 
      {id:206, name:'pretend_play5', namae:'ごっこ遊び（日常）5', vector:[0.87,0.78,0.88,0.88,0.64,0.6,0.84,0.68,0.58,0.62,0.72,0.7,0.74,0.84,0.88], pol:[0.62,0.55,0.22,0.12,0.58], polst:['やや教育（社会性の学び）↑','集団（年齢とともに集団化↑）','中程度の動き','やや自由（自由な遊び）','やや挑戦（社会性）'], iso:100 }, 
      {id:207, name:'play_store0', namae:'ごっこ遊び（行事）0', vector:[0.42,0.5,0.35,0.55,0.5,0.35,0.68,0.82,0.6,0.5,0.84,0.62,0.32,0.48,0.55], pol:[0.1,-0.25,-0.05,-0.3,0.15], polst:['やや教育（社会性の学び）','やや個別','中程度の動き','やや構造','やや挑戦'], iso:65 }, 
      {id:208, name:'play_store1', namae:'ごっこ遊び（行事）1', vector:[0.5,0.58,0.48,0.62,0.58,0.42,0.7,0.8,0.65,0.55,0.82,0.66,0.4,0.58,0.65], pol:[0.2,-0.1,0.05,-0.38,0.28], polst:['やや教育（社会性の学び）↑','やや個別（年齢とともに集団化↑）','中程度の動き','やや構造（年齢とともに構造↑）','やや挑戦（年齢とともに挑戦↑）'], iso:72 }, 
      {id:209, name:'play_store2', namae:'ごっこ遊び（行事）2', vector:[0.6,0.66,0.62,0.72,0.64,0.52,0.72,0.76,0.7,0.62,0.78,0.7,0.5,0.68,0.75], pol:[0.35,0.15,0.15,-0.45,0.42], polst:['やや教育（社会性の学び）↑','やや個別（年齢とともに集団化↑）','中程度の動き','やや構造（年齢とともに構造↑）','やや挑戦（年齢とともに挑戦↑）'], iso:82 }, 
      {id:210, name:'play_store3', namae:'ごっこ遊び（行事）3', vector:[0.74,0.74,0.8,0.84,0.68,0.65,0.74,0.7,0.76,0.68,0.72,0.76,0.64,0.8,0.84], pol:[0.55,0.45,0.28,-0.52,0.6], polst:['やや教育（社会性の学び）↑','やや集団（年齢とともに集団化↑）','中程度の動き','やや構造（年齢とともに構造↑）','やや挑戦（年齢とともに挑戦↑）'], iso:100 }, 
      {id:211, name:'play_store4', namae:'ごっこ遊び（行事）4', vector:[0.82,0.78,0.88,0.88,0.68,0.76,0.74,0.68,0.8,0.74,0.7,0.8,0.72,0.86,0.88], pol:[0.68,0.6,0.35,-0.58,0.72], polst:['やや教育（社会性の学び）↑','集団（年齢とともに集団化↑）','中程度の動き','構造（年齢とともに構造↑）','挑戦（年齢とともに挑戦↑）'], iso:115 }, 
      {id:212, name:'play_store5', namae:'ごっこ遊び（行事）5', vector:[0.88,0.8,0.9,0.9,0.66,0.84,0.72,0.68,0.82,0.8,0.7,0.78,0.76,0.9,0.9], pol:[0.78,0.68,0.38,-0.62,0.82], polst:['やや教育（社会性の学び）↑','集団（年齢とともに集団化↑）','中程度の動き','構造（年齢とともに構造↑）','挑戦（年齢とともに挑戦↑）'], iso:128 }, 
      {id:213, name:'storytelling0', namae:'読み聞かせ0', vector:[0.4,0.45,0.5,0.65,0.35,0.5,0.75,0.9,0.78,0.45,0.92,0.55,0.3,0.5,0.72], pol:[-0.55,-0.2,-0.52,-0.35,-0.55], polst:['養護寄り（安心・温もり）','やや個別','強く静（最も静的な活動）','保育者が本・進行を決める＝構造寄り','強く安定（心の安定）'], iso:285 }, 
      {id:214, name:'storytelling1', namae:'読み聞かせ1', vector:[0.5,0.52,0.58,0.7,0.4,0.52,0.75,0.88,0.82,0.48,0.9,0.58,0.35,0.58,0.75], pol:[-0.4,-0.15,-0.55,-0.3,-0.4], polst:['養護寄り（安心・温もり）','やや個別','強く静（最も静的な活動）','保育者が本・進行を決める＝構造寄り','強く安定（心の安定）'], iso:290 }, 
      {id:215, name:'storytelling2', namae:'読み聞かせ2', vector:[0.6,0.6,0.65,0.75,0.45,0.57,0.75,0.85,0.88,0.5,0.88,0.62,0.4,0.65,0.78], pol:[-0.2,-0.1,-0.6,-0.25,-0.2], polst:['養護寄り（安心・温もり）','やや個別','強く静（最も静的な活動）','保育者が本・進行を決める＝構造寄り','やや安定（心の安定）'], iso:295 }, 
      {id:216, name:'storytelling3', namae:'読み聞かせ3', vector:[0.7,0.68,0.72,0.8,0.5,0.6,0.75,0.82,0.88,0.52,0.85,0.65,0.45,0.72,0.8], pol:[0.1,-0.05,-0.65,-0.2,0.1], polst:['教育寄り','やや個別','強く静（最も静的な活動）','保育者が本・進行を決める＝構造寄り','やや安定（心の安定）'], iso:300 }, 
      {id:217, name:'storytelling4', namae:'読み聞かせ4', vector:[0.78,0.75,0.78,0.85,0.55,0.63,0.75,0.8,0.88,0.55,0.82,0.68,0.5,0.78,0.82], pol:[0.28,0.05,-0.7,-0.18,0.3], polst:['教育寄り','やや個別','強く静（最も静的な活動）','保育者が本・進行を決める＝構造寄り','強く安定（心の安定）'], iso:305 }, 
      {id:218, name:'storytelling5', namae:'読み聞かせ5', vector:[0.85,0.82,0.82,0.88,0.6,0.66,0.78,0.8,0.88,0.58,0.82,0.7,0.52,0.82,0.85], pol:[0.42,0.1,-0.75,-0.15,0.48], polst:['教育寄り','やや個別','強く静（最も静的な活動）','保育者が本・進行を決める＝構造寄り','強く安定（心の安定）'], iso:310 }, 
      {id:219, name:'clay_play0', namae:'粘土遊び0', vector:[0.45,0.68,0.35,0.65,0.6,0.5,0.82,0.8,0.9,0.6,0.82,0.65,0.38,0.58,0.5], pol:[0.05,-0.48,-0.15,0.62,0.15], polst:['やや教育','個人活動が主体','わずかに静（手は動くが移動しない）','素材による自由な表現','やや挑戦'], iso:78 }, 
      {id:220, name:'clay_play1', namae:'粘土遊び1', vector:[0.55,0.75,0.42,0.7,0.68,0.55,0.82,0.78,0.92,0.62,0.8,0.68,0.45,0.65,0.58], pol:[0.15,-0.45,-0.1,0.65,0.22], polst:['やや教育','個人活動が主体','わずかに静（手は動くが移動しない）','素材による自由な表現','やや挑戦（年齢とともに挑戦↑）'], iso:80 }, 
      {id:221, name:'clay_play2', namae:'粘土遊び2', vector:[0.68,0.82,0.54,0.78,0.75,0.6,0.82,0.75,0.92,0.65,0.78,0.72,0.52,0.75,0.68], pol:[0.28,-0.38,-0.05,0.65,0.32], polst:['やや教育','個人活動が主体','わずかに静（手は動くが移動しない）','素材による自由な表現','やや挑戦（年齢とともに挑戦↑）'], iso:85 }, 
      {id:222, name:'clay_play3', namae:'粘土遊び3', vector:[0.75,0.85,0.59,0.85,0.78,0.65,0.8,0.72,0.9,0.68,0.75,0.75,0.58,0.82,0.75], pol:[0.42,-0.28,0,0.6,0.45], polst:['教育寄り','個人活動が主体','中立（手は動くが移動しない）','素材による自由な表現','やや挑戦（年齢とともに挑戦↑）'], iso:92 }, 
      {id:223, name:'clay_play4', namae:'粘土遊び4', vector:[0.82,0.85,0.65,0.88,0.75,0.7,0.78,0.7,0.88,0.7,0.72,0.75,0.62,0.85,0.78], pol:[0.52,-0.22,0.05,0.55,0.55], polst:['教育寄り','個人活動が主体','わずかに動（手は動くが移動しない）','素材による自由な表現','やや挑戦（年齢とともに挑戦↑）'], iso:98 }, 
      {id:224, name:'clay_play5', namae:'粘土遊び5', vector:[0.88,0.82,0.7,0.9,0.72,0.75,0.78,0.7,0.88,0.72,0.72,0.72,0.65,0.88,0.8], pol:[0.6,-0.18,0.08,0.5,0.62], polst:['教育寄り','個人活動が主体','わずかに動（手は動くが移動しない）','素材による自由な表現','やや挑戦（年齢とともに挑戦↑）'], iso:105 }, 
      {id:225, name:'play_ball0', namae:'ボール遊び0', vector:[0.45,0.6,0.4,0.5,0.88,0.45,0.8,0.75,0.7,0.55,0.75,0.78,0.42,0.55,0.58], pol:[0.2,-0.4,0.6,0.5,0.3], polst:['やや教育','やや個別','強く動','やや自由','やや挑戦'], iso:10 }, 
      {id:226, name:'play_ball1', namae:'ボール遊び1', vector:[0.58,0.68,0.52,0.58,0.9,0.5,0.8,0.72,0.75,0.58,0.72,0.8,0.5,0.65,0.65], pol:[0.22,-0.25,0.64,0.4,0.38], polst:['やや教育','やや個別','強く動','やや自由','やや挑戦（年齢とともに挑戦↑）'], iso:50 }, 
      {id:227, name:'play_ball2', namae:'ボール遊び2', vector:[0.7,0.75,0.65,0.65,0.92,0.55,0.8,0.7,0.75,0.6,0.7,0.82,0.58,0.75,0.72], pol:[0.24,-0.1,0.68,0.3,0.46], polst:['やや教育','やや個別','強く動','やや自由','やや挑戦（年齢とともに挑戦↑）'], iso:110 }, 
      {id:228, name:'play_ball3', namae:'ボール遊び3', vector:[0.78,0.78,0.75,0.7,0.88,0.6,0.78,0.68,0.72,0.62,0.68,0.82,0.65,0.8,0.78], pol:[0.26,0.05,0.72,-0.1,0.54], polst:['やや教育','やや集団（年齢とともに集団化↑）','強く動','やや構造（年齢とともにルール化の流れ）','やや挑戦（年齢とともに挑戦↑）'], iso:170 }, 
      {id:229, name:'play_ball4', namae:'ボール遊び4', vector:[0.82,0.8,0.82,0.75,0.88,0.65,0.75,0.65,0.7,0.65,0.65,0.82,0.72,0.82,0.82], pol:[0.28,0.2,0.76,-0.15,0.62], polst:['やや教育','やや集団（年齢とともに集団化↑）','強く動','やや構造（年齢とともにルール化の流れ）','やや挑戦（年齢とともに挑戦↑）'], iso:230 }, 
      {id:230, name:'play_ball5', namae:'ボール遊び5', vector:[0.85,0.82,0.85,0.78,0.88,0.7,0.75,0.65,0.68,0.68,0.65,0.8,0.78,0.85,0.85], pol:[0.3,0.35,0.8,-0.2,0.7], polst:['やや教育','やや集団（年齢とともに集団化↑）','強く動','やや構造（年齢とともにルール化の流れ）','やや挑戦（年齢とともに挑戦↑）'], iso:250 }, 
      {id:231, name:'circle_time0', namae:'お集まり0', vector:[0.35,0.47,0.45,0.5,0.4,0.8,0.6,0.92,0.5,0.4,0.88,0.45,0.25,0.45,0.82], pol:[0.1,0.5,-0.49,-0.7,-0.2], polst:['やや教育','やや集団（年齢とともに集団化↑）','静（基本的に静的な活動）','強く構造（未満児さんにとっては強いルール）','やや安定（心の安定）'], iso:310 }, 
      {id:232, name:'circle_time1', namae:'お集まり1', vector:[0.45,0.5,0.55,0.58,0.45,0.82,0.62,0.9,0.52,0.42,0.88,0.5,0.32,0.55,0.85], pol:[0.15,0.56,-0.52,-0.6,-0.1], polst:['やや教育','やや集団（年齢とともに集団化↑）','静（基本的に静的な活動）','強く構造（未満児さんにとっては強いルール）','やや安定（心の安定）'], iso:340 }, 
      {id:233, name:'circle_time2', namae:'お集まり2', vector:[0.55,0.53,0.65,0.65,0.5,0.85,0.65,0.88,0.55,0.45,0.88,0.55,0.38,0.65,0.88], pol:[0.2,0.62,-0.57,-0.5,0], polst:['やや教育','やや集団（年齢とともに集団化↑）','静（基本的に静的な活動）','強く構造（未満児さんにとっては強いルール）','中立（安定と挑戦）'], iso:80 }, 
      {id:234, name:'circle_time3', namae:'お集まり3', vector:[0.65,0.56,0.75,0.72,0.55,0.88,0.68,0.85,0.58,0.48,0.88,0.58,0.42,0.72,0.9], pol:[0.25,0.68,-0.6,-0.4,0.1], polst:['やや教育','やや集団（年齢とともに集団化↑）','静（基本的に静的な活動）','構造（基本はクラスのルール時間）','やや挑戦'], iso:130 }, 
      {id:235, name:'circle_time4', namae:'お集まり4', vector:[0.72,0.59,0.82,0.78,0.6,0.9,0.7,0.82,0.6,0.5,0.85,0.6,0.45,0.78,0.92], pol:[0.3,0.74,-0.63,-0.3,0.2], polst:['やや教育','やや集団（年齢とともに集団化↑）','静（基本的に静的な活動）','構造（基本はクラスのルール時間）','やや挑戦'], iso:170 }, 
      {id:236, name:'circle_time5', namae:'お集まり5', vector:[0.78,0.62,0.88,0.82,0.65,0.92,0.72,0.82,0.62,0.52,0.85,0.62,0.48,0.82,0.93], pol:[0.35,0.8,-0.68,-0.2,0.3], polst:['やや教育','やや集団（年齢とともに集団化↑）','静（基本的に静的な活動）','構造（基本はクラスのルール時間）','やや挑戦'], iso:190 }, 
      {id:237, name:'bug_hunting0', namae:'虫さがし0', vector:[0.4,0.7,0.35,0.5,0.75,0.35,0.8,0.75,0.45,0.65,0.75,0.72,0.4,0.48,0.55], pol:[0.5,-0.4,0.4,0.8,0.5], polst:['教育寄り','やや集団（年齢とともに集団的要素↑）','動（戸外での活動、移動）','強く自由','挑戦'], iso:10 }, 
      {id:238, name:'bug_hunting1', namae:'虫さがし1', vector:[0.55,0.8,0.45,0.58,0.82,0.4,0.82,0.72,0.48,0.68,0.72,0.75,0.45,0.58,0.62], pol:[0.52,-0.36,0.44,0.75,0.58], polst:['教育寄り','やや集団（年齢とともに集団的要素↑）','動（戸外での活動、移動）','強く自由','挑戦（年齢とともに挑戦↑）'], iso:20 }, 
      {id:239, name:'bug_hunting2', namae:'虫さがし2', vector:[0.7,0.88,0.58,0.65,0.85,0.45,0.85,0.7,0.5,0.7,0.69,0.78,0.5,0.68,0.7], pol:[0.54,-0.32,0.48,0.7,0.66], polst:['教育寄り','やや集団（年齢とともに集団的要素↑）','動（戸外での活動、移動）','強く自由','挑戦（年齢とともに挑戦↑）'], iso:40 }, 
      {id:240, name:'bug_hunting3', namae:'虫さがし3', vector:[0.82,0.9,0.68,0.72,0.82,0.5,0.85,0.68,0.48,0.72,0.67,0.8,0.52,0.78,0.75], pol:[0.56,-0.28,0.52,0.65,0.74], polst:['教育寄り','やや集団（年齢とともに集団的要素↑）','動（戸外での活動、移動）','強く自由','挑戦（年齢とともに挑戦↑）'], iso:100 }, 
      {id:241, name:'bug_hunting4', namae:'虫さがし4', vector:[0.88,0.92,0.72,0.78,0.8,0.55,0.88,0.68,0.45,0.75,0.65,0.82,0.55,0.82,0.78], pol:[0.58,-0.24,0.56,0.6,0.82], polst:['教育寄り','やや集団（年齢とともに集団的要素↑）','動（戸外での活動、移動）','強く自由','挑戦（年齢とともに挑戦↑）'], iso:230 }, 
      {id:242, name:'bug_hunting5', namae:'虫さがし5', vector:[0.92,0.95,0.75,0.82,0.78,0.6,0.88,0.7,0.42,0.78,0.7,0.82,0.58,0.85,0.8], pol:[0.6,-0.2,0.6,0.55,0.9], polst:['教育寄り','やや集団（年齢とともに集団的要素↑）','動（戸外での活動、移動）','強く自由','挑戦（年齢とともに挑戦↑）'], iso:250 }, 
      {id:243, name:'rhythm_activities0', namae:'楽器遊び0', vector:[0.48,0.62,0.45,0.72,0.82,0.55,0.8,0.82,0.8,0.5,0.85,0.8,0.38,0.6,0.65], pol:[0.4,0.2,0.3,-0.2,0.2], polst:['教育寄り','やや集団（集団での表現…アンサンブル）','やや動（楽器を叩く、揺する動き）','やや構造','やや挑戦'], iso:5 }, 
      {id:244, name:'rhythm_activities1', namae:'楽器遊び1', vector:[0.58,0.68,0.55,0.78,0.85,0.58,0.82,0.8,0.82,0.52,0.82,0.82,0.45,0.68,0.7], pol:[0.44,0.3,0.32,-0.15,0.3], polst:['教育寄り','やや集団（集団での表現…アンサンブル）','やや動（楽器を叩く、揺する動き）','やや構造','やや挑戦（年齢とともに挑戦↑）'], iso:55 }, 
      {id:245, name:'rhythm_activities2', namae:'楽器遊び2', vector:[0.68,0.72,0.65,0.82,0.88,0.62,0.82,0.78,0.82,0.55,0.8,0.82,0.52,0.75,0.75], pol:[0.48,0.4,0.34,-0.1,0.4], polst:['教育寄り','やや集団（集団での表現…アンサンブル）','やや動（楽器を叩く、揺する動き）','やや構造','やや挑戦（年齢とともに挑戦↑）'], iso:115 }, 
      {id:246, name:'rhythm_activities3', namae:'楽器遊び3', vector:[0.75,0.75,0.75,0.85,0.88,0.65,0.8,0.75,0.8,0.58,0.78,0.82,0.58,0.8,0.8], pol:[0.52,0.5,0.36,-0.05,0.5], polst:['教育寄り','やや集団（集団での表現…アンサンブル）','やや動（楽器を叩く、揺する動き）','やや構造','挑戦（年齢とともに挑戦↑）'], iso:145 }, 
      {id:247, name:'rhythm_activities4', namae:'楽器遊び4', vector:[0.8,0.78,0.82,0.88,0.85,0.68,0.78,0.72,0.78,0.6,0.75,0.82,0.62,0.82,0.82], pol:[0.56,0.6,0.38,0,0.6], polst:['教育寄り','やや集団（集団での表現…アンサンブル）','やや動（楽器を叩く、揺する動き）','中立（構造と自由のバランス）','挑戦（年齢とともに挑戦↑）'], iso:185 }, 
      {id:248, name:'rhythm_activities5', namae:'楽器遊び5', vector:[0.85,0.8,0.85,0.9,0.82,0.7,0.78,0.72,0.78,0.62,0.75,0.8,0.65,0.85,0.85], pol:[0.6,0.7,0.4,0.05,0.7], polst:['教育寄り','やや集団（集団での表現…アンサンブル）','やや動（楽器を叩く、揺する動き）','やや自由','挑戦（年齢とともに挑戦↑）'], iso:245 } 
    ];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const ZIGEN = [       // z_i：ズレの意味（次元の不足／過剰）, z_k：子どもの姿（行動化）, z_env：環境構成のズレ（動線・道具・刺激・密度・見通し・配置）
      {id:0,name:"主体性",n_e:"Autonomy",img:"../img/a_infantia/vec1-5.png",cate:"発達支援",setsu:"子どもの自己決定度",z_i:"自己決定の不足／過剰, 指示待ち／こだわりすぎ",z_k:"動けない／譲れない, 選べない／選びすぎる",z_e:"選択肢の量・質の調整, 自分でできる動線・高さ, 選択の見通し（2択・3択）"},
      {id:1,name:"探索性",n_e:"Exploration",img:"../img/a_infantia/vec1-5.png",cate:"発達支援",setsu:"試行錯誤・発見の度合い",z_i:"探索の不足／過剰, 慎重すぎる／動きすぎる",z_k:"固まる／走り回る, 試せない／試しすぎる",z_e:"探索の“場”の調整（密度・動線）, 素材の提示方法（少量・段階化）, 探索の入口（誘い・見本）"},
      {id:2,name:"協同性",n_e:"Cooperation",img:"../img/a_infantia/vec1-5.png",cate:"発達支援",setsu:"他者との関わり度",z_i:"関わりの不足／過剰, 孤立／巻き込みすぎ",z_k:"入れない／強引, 距離が近すぎる／遠すぎる",z_e:"人数・距離の調整, 協働しやすい道具配置, 関わりの“接点”をつくる"},
      {id:3,name:"表現性",n_e:"Expression",img:"../img/a_infantia/vec1-5.png",cate:"発達支援",setsu:"感情・思考の外化度",z_i:"表現の不足／過剰, 出ない／出すぎる",z_k:"固まる／騒がしい, 言葉が出ない／止まらない",z_e:"視覚的手がかり, 静と動の分節化, 表現できる素材・空間"},
      {id:4,name:"身体性",n_e:"Physicality",img:"../img/a_infantia/vec1-5.png",cate:"発達支援",setsu:"身体活動の関与度",z_i:"身体活動の不足／過剰, 動けない／動きすぎ",z_k:"もたつく／落ち着かない, 転びやすい／衝動的",z_e:"動線の分解, 身体負荷の調整（段差・広さ）, 安全な動きの“導線”"},
      {id:5,name:"計画性",n_e:"Planning",img:"../img/a_infantia/vec6-10.png",cate:"保育実践",setsu:"事前準備の必要度",z_i:"準備不足／過剰な構造化",z_k:"混乱／窮屈, 何をすればいいか分からない",z_e:"見通しの提示（3コマ）, 活動の段階化, 必要物の整理・配置"},
      {id:6,name:"柔軟性",n_e:"Flexibility",img:"../img/a_infantia/vec6-10.png",cate:"保育実践",setsu:"即興・変更の許容度",z_i:"変更できない／変わりすぎる",z_k:"固まる／混乱, 予定外に弱い／流されすぎる",z_e:"選択肢の余白, 変更の予告, 柔軟に動ける動線"},
      {id:7,name:"安全性",n_e:"Safety",img:"../img/a_infantia/vec6-10.png",cate:"保育実践",setsu:"リスク管理の重要度",z_i:"リスク管理の不足／過剰",z_k:"不安／挑戦できない, 過敏／無謀",z_e:"危険の可視化, 安全な挑戦の場, 見通しのある配置"},
      {id:8,name:"素材依存",n_e:"Material",img:"../img/a_infantia/vec6-10.png",cate:"保育実践",setsu:"物的環境への依存度",z_i:"モノへの依存／刺激過多",z_k:"集める・囲う／散乱, モノに固着／扱えない",z_e:"素材の量・質・配置, 分類棚・発見ボックス, 素材の段階化"},
      {id:9,name:"時間スケール",n_e:"Duration",img:"../img/a_infantia/vec6-10.png",cate:"保育実践",setsu:"短期/長期活動の適性",z_i:"時間の不足／過剰, 焦り／だらけ",z_k:"切り替えが難しい／集中が続かない",z_e:"時間の見通し（タイマー・絵カード）, 余白の設定, 短いステップへの分解"},
      {id:10,name:"安定性",n_e:"Stability",img:"../img/a_infantia/vec11-15.png",cate:"情緒・関係",setsu:"情緒的安心感の提供度",z_i:"安心の不足／過剰な依存",z_k:"不安定／離れられない, 泣きやすい／固まる",z_e:"安心できる場所, 繰り返し・ルーティン, 見通しの視覚化"},
      {id:11,name:"刺激性",n_e:"Stimulation",img:"../img/a_infantia/vec11-15.png",cate:"情緒・関係",setsu:"興奮・活性化の度合い",z_i:"刺激の不足／過剰",z_k:"ぼんやり／興奮, 過敏／無反応",z_e:"光・音・色の刺激量調整, 静と動の空間分節, 密度の調整"},
      {id:12,name:"葛藤性",n_e:"Conflict",img:"../img/a_infantia/vec11-15.png",cate:"情緒・関係",setsu:"トラブル発生の可能性",z_i:"葛藤の不足／過剰",z_k:"ぶつかる／引きすぎる, 取り合い／孤立",z_e:"道具の複数化, 動線分離, 関わりの緩衝材（大人の位置）"},
      {id:13,name:"達成感",n_e:"Achievement",img:"../img/a_infantia/vec11-15.png",cate:"情緒・関係",setsu:"成功体験の明確さ",z_i:"成功体験の不足／過剰な達成要求",z_k:"諦める／焦る, 自信がない／完璧主義",z_e:"小さな成功の段階化, 振り返りの場, 達成の見える化"},
      {id:14,name:"繋がり性",n_e:"Connection",img:"../img/a_infantia/vec11-15.png",cate:"情緒・関係",setsu:"関係性深化の度合い",z_i:"関係性の不足／過剰な密着",z_k:"孤立／依存, 距離が遠い／近すぎる",z_e:"関わりの“接点”の配置, 人数・距離の調整, 共有できる素材・場"}
    ];


    const meanings = { // カード意味のマップ
        '探索(正)': ' 好奇心と自発性：子どもが自ら世界に関心を持ち、積極的に関わろうとする姿勢。/ 安全な冒険：未知への一歩を踏み出すが、見守りや環境が整っているため安心して探索できる。/ 発達の兆し：新しいスキルや関心が芽生え、成長のステージが切り替わるタイミング。/ 保育者の役割：子どもの「なぜ？」に寄り添い、探索を促す環境づくりが求められる。 ', 
        '探索(逆)': '過剰な不安や抑制：子どもが探索したい気持ちを持ちながらも、環境や関係性がそれを妨げている。/ 迷子になる探索：目的や方向性が曖昧で、子どもが混乱したり不安を感じている可能性。/ 過干渉または放任：保育者が過度に介入するか、逆に放置してしまうことで探索が不健全になる。/ 内向的な退避：外界への関心が薄れ、内面に閉じこもる傾向が見られることも。 ', 
        'はじまり(正)': '新しい環境への前向きな適応: 子どもが新しい園や活動に対して好奇心を持ち、積極的に関わろうとする姿勢。/ 成長のスタートライン: これまでの段階から一歩進み、発達や社会性の新しいフェーズに入る兆し。/ 保育者の導きと見守り: 子どもが安心して新しい環境に踏み出せるよう、保育者が適切にサポートしている状態。/ 儀式性と節目の意識: 入園式や新学期など、子どもにとって「特別な始まり」として記憶される瞬間。 ', 
        'はじまり(逆)': '不安や抵抗感: 新しい環境に対して子どもが不安を感じたり、拒否反応を示している可能性。/ 準備不足または急な切り替え: 子どもや保育者が新しい活動への準備が整っておらず、混乱やストレスが生じている。/ 過去への執着: 前の環境や関係性に強い愛着があり、新しい一歩を踏み出すことに躊躇している。/ 導入の失敗: 活動や環境の切り替えがうまく機能せず、子どもが孤立感や疎外感を抱いている可能性。 ', 
        '見守り(正)': '安心の場の提供: 子どもが安心して眠り、遊び、学べる環境が整っている。保育者の存在が穏やかで信頼できる。/ 適切な距離感: 子どもの自立を尊重しつつ、必要なときにはすぐに手を差し伸べられる見守りの姿勢。/ 非干渉的な保護: 過度に介入せず、子どものペースを尊重することで、内的な成長を支えている。/ 夜の静けさ・回復の時間: 睡眠や休息、情緒の安定を象徴する時間帯。保育者の「見えない働き」が子どもを支えている。 ', 
        '見守り(逆)': '過干渉または放任: 保育者が子どもに過度に介入してしまう、または逆に放置してしまうことで、安心感が損なわれている。/ 不安定な環境: 子どもが安心して過ごせる場が整っておらず、情緒的な不安や緊張が生じている。/ 信頼関係の揺らぎ: 保育者と子どもの間に距離や誤解が生じ、見守りが機能していない状態。/ 見えないストレス: 子どもが表面上は落ち着いていても、内面に不安や緊張を抱えている可能性。 ', 
        '養護(正)': '生活習慣の安定と定着: 食事・睡眠・排泄・清潔など、基本的な生活リズムが整い、子どもが安心して日々を過ごしている。/ 身体的・情緒的な安心感: 子どもが保育者との関係性の中で、身体的にも心的にも満たされている状態。/ 丁寧なケアと関わり: 保育者が一人ひとりの子どもに対して、丁寧に関わり、生活の場面を通して信頼関係を築いている。/ 育ちの土壌の充実: 「遊び」や「学び」が芽吹くための、身体的・情緒的な基盤がしっかりと整っている。 ', 
        '養護(逆)': '生活リズムの乱れ: 食事の偏り、睡眠不足、清潔習慣の未定着など、基本的な生活習慣に不安定さが見られる。/ ケアの質の低下: 保育者の関わりが機械的・一律的になり、子どもが十分に安心感を得られていない。/ 身体的な不快や不調: 子どもが身体的な不快（空腹、疲労、汚れなど）を抱えており、情緒にも影響が出ている可能性。/ 育ちの停滞: 基盤が整っていないために、遊びや学びへの意欲が湧かず、発達の流れが滞っている。 ', 
        '構造(正)': '秩序と安心: 子どもが安心して活動できるよう、環境やルールが適切に整えられている。/ 段階的な成長: 積み木のように、一歩ずつ積み重ねる発達のプロセスが順調に進んでいる。/ 自由と枠組みの調和: ルールや枠組みがあるからこそ、子どもが自由に遊び、創造性を発揮できる。/ 協働と社会性: 子ども同士が協力して遊びや活動を進めることで、社会性や協調性が育まれる。 ', 
        '構造(逆)': '過剰な制約: ルールや枠組みが厳しすぎて、子どもの自由や創造性が抑え込まれている。/ 秩序の欠如: 環境が整っておらず、子どもが混乱したり安心できない状態。/ 発達の停滞: 段階的な積み重ねが途切れ、学びや生活習慣が不安定になっている。/ 協力の不和: 子ども同士の関わりがうまくいかず、衝突や孤立が生じている。 ', 
        '対話(正)': '相互理解の芽生え: 子ども同士、あるいは子どもと保育者の間で、言葉や仕草を通じて心が通い合う。/ 傾聴と共感: 相手の言葉を受け止め、共感的に応答することで信頼関係が深まる。/ 関係性の発展: 対話を通じて協力や友情が育まれ、社会性が豊かに育つ。/ 安心の場でのやりとり: 見守られた環境の中で、安心して自分の気持ちを表現できる。 ', 
        '対話(逆)': 'すれ違い・誤解: 言葉や仕草がうまく伝わらず、誤解や衝突が生じる。/ 傾聴の欠如: 相手の話を聞かず、一方的なやりとりになってしまう。/ 孤立や閉ざされた心: 子どもが自分の気持ちを表現できず、関係性が停滞する。/ 環境の不備: 安心して対話できる場が整っていないため、子どもが萎縮してしまう。 ', 
        '選択(正)': '主体性の発揮: 子どもが自分で選び取る経験を通じて、自立心や責任感を育んでいる。/ 多様な可能性: 選択肢が豊かに用意され、子どもが自分に合った道を見つけられる。/ 意思決定の練習: 小さな選択（遊び・活動・友だちとの関わり）を通じて、将来の大きな決断につながる力を養っている。/ 自由と方向性の調和: 保育者が環境を整え、子どもが安心して「自分で決める」ことを楽しめる状態。 ', 
        '選択(逆)': '迷いや優柔不断: 選択肢が多すぎたり不明確で、子どもが決められずに不安や混乱を抱えている。/ 強制された選択: 子どもの意思ではなく、大人の都合や圧力によって選ばされている状態。/ 選択肢の欠如: 環境が整っておらず、子どもが「自分で選ぶ」経験を持てない。/ 後悔や不満: 選んだ結果に納得できず、自己肯定感や信頼関係が揺らぐ可能性。 ', 
        '運動(正)': '生命力と活力: 子どもが身体をのびのびと動かし、エネルギーを発散している状態。/ 調和とリズム: 運動を通じて自然のリズムや仲間との呼吸を感じ、調和を体験している。/ 成長と発達の促進: 遊びや身体活動が、心身の発達を健やかに支えている。/ 喜びと解放感: 動くことそのものが楽しみであり、自由な表現としての運動が肯定されている。 ', 
        '運動(逆)': 'エネルギーの停滞: 身体を動かす機会が不足し、子どもが不満や不安定さを抱えている。/ 過剰な活動: 落ち着きがなく、制御できないほどの多動や衝動性が表れている。/ リズムの乱れ: 生活リズムや活動のバランスが崩れ、疲労や不調につながっている。/ 制約や抑圧: 環境や大人の都合によって、子どもの自然な動きが制限されている。 ', 
        'バランス(正)': '静と動の調和: 活発な遊びと落ち着いた活動の両方がうまく循環している。/ 個と集団の安定: 一人で集中する時間と、仲間と関わる時間のバランスが取れている。/ 活動の配分: 遊び・学び・休息のリズムが整い、心身が健やかに育つ。/ 安定した心: 感情の揺れがあっても、安心できる場や人に支えられて落ち着きを取り戻せる。 ', 
        'バランス(逆)': '偏り: 遊びや学びが一方に偏り、心身のリズムが乱れる。/ 不安定さ: 感情の揺れが強く、落ち着きを取り戻しにくい。/ 孤立または過剰な集団依存: 個の時間が奪われたり、逆に集団に入れず孤立したりする。/ 調整の難しさ: 保育の場で活動の切り替えがうまくいかず、混乱や疲れが生じる。 ', 
        '省察(正)': '自己理解の深化: 子どもが自分の気持ちや行動を振り返り、内面を理解する力が育っている。/ 気づきと学び: 経験を振り返ることで、新しい発見や学びが生まれる。/ 心の静けさ: 落ち着いた時間の中で、自分自身と向き合う余裕がある。/ 成長の循環: 波紋のように気づきが広がり、次の行動や発達につながっていく。 ', 
        '省察(逆)': '自己否定や迷い: 振り返りが過剰になり、自分を責めたり迷いに陥る。/ 気づきの停滞: 経験を振り返る機会がなく、学びが深まらない。/ 落ち着きの欠如: 忙しさや環境の不安定さで、内面を見つめる余裕がない。/ 孤立感: 自分の思いを共有できず、内省が閉じこもりにつながる。 ', 
        '循環(正)': '成長のリズム: 子どもの発達が自然な流れに沿って進み、安心して次の段階へ移行できている。/ 季節と調和: 遊び・学び・休息が季節のリズムや生活のサイクルと調和している。/ 経験の積み重ね: 過去の経験が次の学びへとつながり、循環的に成長が深まっている。/ 変化の受容: 成長や環境の変化を自然なものとして受け入れ、柔軟に適応できている。 ', 
        '循環(逆)': '停滞や繰り返し: 同じ課題にとどまり、前進できずに堂々巡りしている。/ リズムの乱れ: 生活リズムや発達の流れが崩れ、子どもが不安定になっている。/ 変化への抵抗: 新しい段階や環境への移行を拒み、成長が滞る。/ 不均衡なサイクル: 遊び・学び・休息のバランスが崩れ、疲労や不満が蓄積している。 ', 
        'たくましさ(正)': '内なる力の発揮: 子どもが自分の感情や欲求をコントロールし、落ち着いて行動できる。/ 勇気と自信: 困難や挑戦に立ち向かう勇気を持ち、自己肯定感が育まれている。/ 優しさと強さの調和: 力を「支配」ではなく「共生」に使い、他者と調和しながら強さを発揮する。/ 安心の中での成長: 保育者や環境に守られながら、子どもが自分の力を試し、伸ばしていける。 ', 
        'たくましさ(逆)': '力の乱用や衝動: 感情を抑えられず、攻撃的・衝動的な行動に出てしまう。/ 自信の欠如: 自分に力がないと感じ、挑戦を避けたり、自己否定に陥る。/ 依存や過保護: 周囲に頼りすぎて、自分の力を発揮する機会を失っている。/ 不安定な強さ: 外見的には強そうに見えても、内面は不安定でバランスを欠いている。 ', 
        '待つこと(正)': '順番を守る力: 子どもが自分の欲求を抑え、他者を尊重しながら順番を待てる。/ 時間の受容: 砂時計のように「時間が流れるのを受け入れる」姿勢。焦らずに待つことで安心感が育まれる。/ 葛藤の見守り: 待つ中で生じる小さな葛藤を、保育者や仲間に見守られながら乗り越える経験。/ 成長の準備期間: 待つことが停滞ではなく、次の行動や学びへの「助走」となる。 ', 
        '待つこと(逆)': '焦りや不満: 順番を待てずに不安や苛立ちが強く出る。/ 時間の停滞感: 待つことが「意味のある準備」ではなく「退屈や停滞」として感じられる。/ 葛藤の孤立: 見守りが不足し、子どもが一人で葛藤を抱え込んでしまう。/ 秩序の乱れ: 順番を守れず、集団の中で不均衡や混乱が生じる。 ', 
        '変容(正)': '成長の節目: 子どもが新しい環境や段階に進む準備が整い、自然に移行できている。/ 変化の受容: 不安よりも期待をもって、新しい世界に一歩を踏み出す姿勢。/ 自己更新: 蛇の脱皮のように、古い習慣や殻を手放し、新しい自分を受け入れる。/ 未来への光: 太陽や蝶の象徴が示すように、変化が成長と希望につながる。 ', 
        '変容(逆)': '変化への抵抗: 慣れ親しんだ環境に固執し、新しい段階に進むことを恐れる。/ 不安と停滞: 変化を「喪失」として捉え、前に進めずに足踏みしてしまう。/ 未熟な移行: 変化に向かう準備が整っていないまま、無理に進もうとして混乱する。/ 循環の滞り: 季節の移ろいのような自然な流れを受け入れられず、成長のリズムが乱れる。 ', 
        '調和(正)': '協力と共鳴: 子ども同士が互いを尊重し、協力しながら活動できている。/ 心のつながり: 感情や思いが共鳴し合い、安心感と信頼関係が育まれている。/ バランスの取れた成長: 遊び・学び・休息のリズムが調和し、心身が健やかに育っている。/ 美しい循環: 音楽のように、個々の違いが合わさって一つの調和を生み出す。 ', 
        '調和(逆)': '不協和音: 子ども同士の関係に摩擦や対立が生じ、協力が難しくなる。/ 孤立や断絶: 調和が崩れ、誰かが仲間から外れてしまう。/ アンバランスな成長: 遊びや学びの偏りが強く、心身のバランスが乱れる。/ 強制された調和: 表面的にはまとまって見えても、内面では無理や我慢が積み重なっている。 ', 
        '素材(正)': '探究心の芽生え: 子どもが素材に触れ、試行錯誤しながら新しい発見をしている。/ 創造の源泉: 石・木・水・粘土など、素材そのものが遊びや学びの出発点となる。/ 五感を通じた学び: 触る・見る・匂う・音を聞くといった感覚を通じて、世界を理解する力が育つ。/ 自然とのつながり: 素材を通じて自然の循環や恵みを感じ取り、生命への敬意を育む。 ', 
        '素材(逆)': '表面的な関わり: 素材をただ消費するだけで、探究や創造につながらない。/ 過剰な制限: 素材に触れる機会が制限され、子どもの自由な探究が妨げられる。/ 混乱や危険: 素材の扱い方が未熟で、散らかしや危険につながる。/ 自然からの断絶: 人工的なものに偏り、自然素材との出会いが乏しくなる。 ', 
        '葛藤(正)': '成長の契機: 子ども同士の衝突が、互いを理解し合うきっかけとなる。/ 対話と調整: 意見の違いを通じて、譲り合いや交渉の力を学ぶ。/ 感情の表現: 怒りや不満を安全な場で表現し、受け止めてもらう経験。/ 社会性の芽生え: 「自分」と「他者」の違いを知り、関係性を築く力が育つ。 ', 
        '葛藤(逆)': '対立の激化: 意見の違いが解決されず、仲間外れや疎外感につながる。/ 感情の抑圧: 不満を表に出せず、内にため込んでしまう。/ 解決の停滞: 対話や仲裁が機能せず、行き詰まりを感じる。/ 孤立感: 見守りや支えが不足し、葛藤が「孤独な体験」となってしまう。 ', 
        '慰め(正)': '共感と寄り添い: 子どもの悲しみや不安を受け止め、安心感を与える。/ 感情の回復: 涙や不安が落ち着き、心が少しずつ和らいでいく。/ 支え合いの関係: 仲間や大人の存在が「一人ではない」という安心を育む。/ 安心の場の形成: 保育の場が「感情を表現しても受け止めてもらえる場所」であることを示す。 ', 
        '慰め(逆)': '孤立感: 悲しみや不安を抱えても、十分に受け止めてもらえず孤独を感じる。/ 表面的な慰め: 形だけの声かけで、子どもの心に届かない。/ 感情の抑圧: 泣くことや弱さを表すことが否定され、感情を内に閉じ込めてしまう。/ 依存の危うさ: 慰めが過剰になり、自分で感情を整理する力が育ちにくくなる。 ', 
        '物語(正)': '想像力の翼: 絵本やごっこ遊びを通じて、子どもが自由に物語を紡ぎ、世界を広げる。/ 共感と役割理解: 劇遊びやごっこ遊びで他者の立場を演じることで、共感や社会性が育まれる。/ 言葉と表現の豊かさ: 物語を語り、聞き、演じることで、言葉や表現力が自然に育つ。/ 共同の楽しみ: 仲間と一緒に物語を作り上げることで、協力や一体感が生まれる。 ', 
        '物語(逆)': '想像の停滞: 物語や遊びに入り込めず、想像力が閉じてしまう。/ 役割の固定化: ごっこ遊びで特定の役割ばかりを押し付けられ、自由さが失われる。/ 孤立感: 仲間の物語に入り込めず、一人だけ外れてしまう。/ 表現の抑圧: 自分の物語や表現を否定され、言葉や想像を出しにくくなる。 ', 
        '創造的自由(正)': '自由な表現の喜び: 子どもが自分のペースで、好きな方法で創造を楽しんでいる状態。/ 想像力の羽ばたき: 絵、音、動きなどを通じて、内なる世界を広げている。/ 遊びの中の探究: 手を使い、素材と向き合いながら、世界の仕組みを自分なりに理解している。/ 心の解放と安心感: 評価や制約から離れ、のびのびと自分を表現できている。 ', 
        '創造的自由(逆)': '表現の抑圧: 自由に描いたり遊んだりすることが否定され、自己表現が萎縮している。/ 想像力の停滞: 遊びが型にはまり、創造の喜びが失われている。/ 過剰な干渉や管理: 大人の期待や枠組みによって、子どもの自由な創作が妨げられている。/ 自己否定の芽生え: 自分の表現が受け入れられないことで、自信を失っている。 ', 
        '収集(正)': '好奇心の芽生え: 子どもが身の回りの世界に興味を持ち、小さな発見を大切にしている。/ 秩序づけの力: 集めたものを分類・整理することで、世界の構造を自分なりに理解しようとしている。/ 記憶と意味づけ: 収集したものに名前をつけたり、物語を与えたりすることで、記憶と感情が結びついていく。/ 安心と愛着の形成: お気に入りのものを集めることで、自己の世界が育まれ、安心感が得られる。 ', 
        '収集(逆)': '混乱と過剰: 集めすぎて整理できず、秩序よりも混乱が生まれている。/ 執着と手放せなさ: 物へのこだわりが強くなり、手放すことに不安を感じている。/ 外的価値への依存: 自分の興味よりも「評価されるもの」を集めようとしてしまう。/ 孤立感: 収集が他者との共有ではなく、閉じた世界になってしまっている。 ', 
        '祝祭(正)': '努力の成果を仲間と分かち合う喜び。/ 自分の存在が認められ、誇りを感じる瞬間。/ 仲間の達成を祝うことで、共感と絆が深まる。/ 保育の中での節目や成長を祝う大切な場面。 ', 
        '祝祭(逆)': '達成が認められず、孤独や不満を感じる。/ 祝うことが形式的になり、心が置き去りになる。/ 他者との比較によって自己否定が生まれる。/ 過剰な期待や注目がプレッシャーになる。 ', 
        '遊び(正)': '自発性と創造性の発揮: 子どもが自ら遊びを生み出し、自由に展開している状態。/ 発達の統合的促進: 感覚・運動・言語・社会性・情緒が遊びの中で自然に育まれている。/ 安心と関係性の中での遊び: 信頼できる場で、他者との関わりを通じて遊びが深まっている。/ 遊びを通じた世界理解: 模倣・構築・ごっこ遊びなどを通じて、子どもが世界を探索している。 ', 
        '遊び(逆)': '遊びの停滞や形式化: 自由な遊びが減り、活動が指示や課題に偏っている。/ 遊びへの意欲の低下: 子どもが遊びに興味を示さず、受動的になっている。/ 関係性の不安定さ: 他者との関わりがうまくいかず、遊びが孤立的・衝突的になっている。/ 遊びの評価化: 「うまくできる」「成果を出す」ことが目的化し、遊びの本質が失われている。 ', 
        '学び(正)': '探究心が芽生えている：子どもが「なぜ？」「どうして？」と問いを持ち始める。/ 思考の芽生え：観察・比較・推論など、認知的な働きが自然に育まれる。/ 試行錯誤を楽しむ：失敗を恐れず、繰り返し挑戦する姿勢。/ 理解の深まり：経験が意味づけられ、知識として定着し始める。/ 他者との学びの共有：友だちや保育者との対話を通じて学びが広がる。 ', 
        '学び(逆)': '表面的な理解：活動が「やらされ感」になり、深い思考につながらない。/ 探究心の停滞：好奇心が十分に引き出されず、学びが受動的になる。興味が持てず、活動に参加しない。/ 混乱や誤解：情報が多すぎたり整理されず、子どもが混乱する。/ 成果への過度な期待：結果を求めすぎて、過程を楽しむ余裕が失われる。/ 理解の断片化：経験がつながらず、意味づけが不十分。/ 過度な不安や失敗回避：挑戦を避け、学びの機会を逃す。/ 模倣に偏る：自発性が乏しく、他者の真似に終始する。/ 環境との断絶：物や空間に働きかける意欲が低下している。 ', 
        '身体(正)': '身体への気づきと尊重: 子どもが自分の身体に意識を向け、動きや感覚を楽しんでいる。/ 健康と安定の基盤: 呼吸・循環・姿勢などが安定し、身体が安心の場にある。/ 自然との調和: 裸足で地面に立つ、風を感じるなど、身体を通じて自然とつながっている。/ 発達の準備状態: 身体が整っていることで、遊び・学び・関係性への準備ができている。 ', 
        '身体(逆)': '身体への無関心または過敏: 自分の身体に気づけず、動きがぎこちない／逆に過剰に反応してしまう。/ 健康の不安定さ: 疲れや不調、姿勢の崩れなどが、活動や情緒に影響している。/ 自然との断絶: 室内中心の生活で、身体が自然のリズムから切り離されている。/ 発達の停滞: 身体の準備が整っておらず、遊びや学びに入りづらい状態。 ', 
        '響き(正)': '音への感受性：子どもが音を聴き、感じ、楽しむ姿。自然音や楽器の響きに心を開く。/ 身体と音の調和：太鼓を叩く、歌う、踊るなど、身体表現と音が結びつく。/ 共同のリズム：仲間と一緒に音を鳴らすことで、協調性や一体感が育まれる。/ 感情の解放：音を通じて喜びや安心を表現し、情緒の安定につながる。 ', 
        '響き(逆)': '音への拒否や過敏：大きな音や不規則な響きに不安を感じる。/ 調和の乱れ：リズムが合わず、集団活動での一体感が得られにくい。/ 表現の停滞：音を楽しむ余裕がなく、活動が受動的になる。/ 環境の不整合：騒音や不快な音が多く、安定した感覚体験が難しい。 ', 
        '手(正)': '器用さと集中力の発揮: 手先を使った活動に没頭し、細かな操作ができる状態。/ 創造の実践: 折る・切る・貼る・描くなど、手を通じてアイデアが形になる。/ 素材との対話: 手で触れることで、素材の性質を理解し、工夫が生まれる。/ 達成感と自己効力感: 「自分の手でできた」という実感が、自己肯定感につながる。 ', 
        '手(逆)': '不器用さや焦り: 細かな作業がうまくいかず、苛立ちや自信の低下が起きている。/ 手の使い方への不安: 道具の扱いに戸惑い、活動への意欲が下がっている。/ 過度な干渉や指示: 大人の手が先に動いてしまい、子どもの手の自由が奪われている。/ 完成へのこだわり: 「うまく作ること」が目的化し、創造の楽しさが失われている。 ', 
        '声(正)': '発語の芽生え：言葉になり始める音、意味のある発声が見られる。/ 自己表現の始まり：自分の思いや欲求を声で伝えようとする意志。/ 関係への働きかけ：他者に向かって声を発することで関係が始まる。/ 環境との応答：音や言葉を通じて周囲とやりとりする姿勢。/ 情緒の表出：喜びや不満などが声に乗って現れる。 ', 
        '声(逆)': '発語の停滞：言葉が出にくく、発声が乏しい。/ 自己表現の抑制：思いや欲求を声に乗せることが難しい。/ 関係の閉じ：他者とのやりとりが声を通じて始まらない。/ 環境への反応の希薄化：音や言葉への応答が少ない。/ 情緒の沈黙：感情が声に乗らず、内面が閉じている。 ', 
        '繋がり(正)': '信頼が育まれている：子ども同士、あるいは保育者との間に安心感がある。/ 共感的なやりとり：言葉・表情・行動を通じて互いに気持ちを受け止め合う。/ 協力や共有が生まれている：遊びや活動の中で、役割分担や助け合いが見られる。/ 関係の継続性：一時的な関わりではなく、継続的な絆が育っている。/ 環境との調和：人との関係だけでなく、場や物との関係も安定している。 ', 
        '繋がり(逆)': '孤立感がある：他者との関わりが希薄で、ひとりで過ごす時間が多い。/ 共感の不足：気持ちが伝わらず、すれ違いや衝突が起きやすい。/ 関係の断絶：一度築いた関係が途切れてしまう、または築けない。/ 環境との不一致：場や物との関係が不安定で、落ち着かない様子が見られる。/ 関係への不安や拒否：関わりを避けたり、拒否的な態度が見られる。 ', 
        '小さな勇気(正)': '段階的な挑戦への意欲: 子どもが自分のペースで新しいことに挑戦しようとしている。/ 不安と希望の共存: 少し怖いけれど「やってみたい」という気持ちが前に出ている。/ 自律性の芽生え: 大人の手を借りず、自分で一歩を踏み出そうとする姿勢。/ 日常の中の達成感: 靴を履く、階段を登る、初めての道具を使うなど、小さな成功が積み重なっている。 ', 
        '小さな勇気(逆)': '挑戦への不安や回避: 新しいことに対して強い不安があり、避けようとしている。/ 自信の揺らぎ: 「できないかも」「失敗したらどうしよう」という気持ちが前に出ている。/ 過度な保護や介入: 大人が先回りしてしまい、子どもの挑戦の機会が奪われている。/ 挑戦の強制化: 「やらなきゃ」「できて当然」といったプレッシャーが、勇気を萎縮させている。 ', 
        '安らぎ(正)': '安心できる場：子どもが心身を休め、安心して身を委ねられる環境。/ 情緒の安定：活動と活動の間にくつろぎの時間があることで、気持ちが落ち着く。/ 信頼関係の基盤：保育者や仲間との関わりの中で「守られている」という感覚が育つ。/ 回復と充電：休息を通じて次の活動へのエネルギーを蓄える。 ', 
        '安らぎ(逆)': '落ち着けない環境：騒がしさや不安要素が多く、子どもが安心できない。/ 情緒の不安定：休息の機会が不足し、気持ちが揺れやすくなる。/ 信頼の揺らぎ：安心の場が確保されず、保育者や仲間との関係に不安が生じる。/ 疲労や緊張の蓄積：休むことができず、次の活動への意欲が低下する。 ', 
        '真似っこ(正)': '模倣による学びの活性化: 子どもが保育者や仲間の動きを自然に模倣し、理解と習得が進んでいる。/ 関係性の中で育まれる模倣: 信頼や安心の場で、模倣が共感やつながりの手段として機能している。/ 身体的・言語的発達の促進: 手遊び、言葉の繰り返し、表情の模倣などを通じて、発達が支えられている。/ 遊びの中での自然な模倣: 模倣が強制ではなく、遊びの流れの中で自発的に行われている。 ', 
        '真似っこ(逆)': '模倣の停滞や拒否: 他者の動きに興味を示さず、模倣が起きにくい状態。/ 関係性の不安定さ: 信頼関係が築かれていないため、模倣がぎこちなく、表面的になっている。/ 模倣の強制や形式化: 「こうしなさい」「真似しなさい」といった指示が先行し、模倣が学びではなく義務になっている。/ 模倣の誤解や混乱: 子どもが模倣した内容が誤って受け取られたり、否定されたりすることで、混乱や萎縮が生じている。 ', 
        '温かさ(正)': '信頼が育まれている：子ども同士、あるいは保育者との間に安心感がある。/ 共感的なやりとり：言葉・表情・行動を通じて互いに気持ちを受け止め合う。/ 協力や共有が生まれている：遊びや活動の中で、役割分担や助け合いが見られる。/ 関係の継続性：一時的な関わりではなく、継続的な絆が育っている。/ 環境との調和：人との関係だけでなく、場や物との関係も安定している。 ', 
        '温かさ(逆)': '孤立感がある：他者との関わりが希薄で、ひとりで過ごす時間が多い。/ 共感の不足：気持ちが伝わらず、すれ違いや衝突が起きやすい。/ 関係の断絶：一度築いた関係が途切れてしまう、または築けない。/ 環境との不一致：場や物との関係が不安定で、落ち着かない様子が見られる。/ 関係への不安や拒否：関わりを避けたり、拒否的な態度が見られる。 ', 
        '笑顔(正)': '情緒の安定：子どもが安心し、穏やかな気持ちで過ごしている状態。/ 関係性の成熟：仲間との関係が安定し、協調的な関わりが生まれている。/ 信頼の可視化：保育者との信頼関係が笑顔として表出されている。/ 場の温かさ：保育環境が情緒的に満たされており、安心して活動できる。/ 共感と調和：他者の気持ちに寄り添い、自然な笑顔が生まれる関係性。 ', 
        '笑顔(逆)': '情緒の揺らぎ：不安や緊張があり、笑顔が減っている。/ 関係の不安定さ：仲間との関係に摩擦や距離が生じている。/ 信頼の欠如：保育者との関係に不安があり、安心感が得られていない。/ 場の冷たさ：環境が情緒的に満たされておらず、孤立感が生まれやすい。/ 表面的な笑顔：本来の安心感が欠けており、笑顔が「演技」になっている可能性。 ', 
        '共鳴(正)': '感性が響き合っている：言葉・音・表情・動作などが互いに呼応している。/ 関係が調和している：相手の存在に応じて、自分の表現が自然に変化する。/ 表現が連動している：音楽・遊び・対話などで、互いの表現がつながっている。/ 共感的な交流がある：気持ちや意図が伝わり、受け止め合う関係が育っている。/ 環境との一体感：場や物との関係も含めて、全体が調和している。 ', 
        '共鳴(逆)': '感性の断絶：互いの表現がすれ違い、響き合わない。/ 関係の不調和：相手の存在に応じた変化が起きず、固定的なやりとりになる。/ 表現の孤立：自分の表現が周囲とつながらず、独立している。/ 共感の不足：気持ちや意図が伝わらず、誤解や衝突が起きやすい。/ 環境との違和感：場や物との関係が不安定で、落ち着かない。 ', 
        '思いやり(正)': '他者への気づきと配慮: 子どもが相手の気持ちを察し、優しく接することができている。/ 道徳性の芽生え: 「してあげたい」「助けたい」という気持ちが自然に行動に表れている。/ 関係性の成熟: 相手との違いを受け入れ、共感や協力が生まれている。/ 安心の場で育まれる優しさ: 思いやりが強制ではなく、信頼の中で育っている。 ', 
        '思いやり(逆)': '気づきの欠如: 他者の気持ちに気づけず、無意識に傷つけてしまうことがある。/ 道徳性の混乱: 「やらなきゃ」「褒められたい」という動機が先行し、本質的な思いやりが薄れている。/ 関係性の不安定さ: 相手との距離感がつかめず、関係がぎこちなくなっている。/ 優しさの押しつけ: 「良い子でいなきゃ」というプレッシャーが、自由な感情表現を妨げている。 ', 
        '思い(正)': '感情の言語化：喜び・不安・期待などを言葉や表情で伝えられる/ 自己理解の進展：自分の気持ちを整理し、内面を意識できる/ 関係への働きかけ：思いを言葉にすることで、他者との理解が深まる/ 内面の可視化：心の中の感情が外に出て、共有される/ 発達の橋渡し：感情から言葉へ、言葉から思考へとつながるプロセス ', 
        '思い(逆)': '感情の抑制：気持ちを言葉にできず、内面に閉じ込めてしまう/ 自己理解の停滞：心の整理が難しく、混乱や不安が続く/ 関係のすれ違い：思いが伝わらず、誤解や孤立が生じやすい/ 内面の不可視化：感情が表に出ず、周囲に理解されにくい/ 発達の停滞：感情から言葉への橋渡しが難しく、思考の展開が阻害される ', 
        '育ち(正)': '発達の歩み・成長の連続性・変化の受容・成熟へのプロセス / 発達の自然な進展：身体・情緒・認知・社会性がバランスよく育っている / 小さな変化の積み重ね：日々の経験が次の段階へとつながっている/ 挑戦と達成の循環：新しい課題に挑み、達成感を得ることで次の成長へ進む/ 環境との調和：場や人との関わりが育ちを支えている/ 未来への希望：育ちが次の可能性を開いていく ', 
        '育ち(逆)': '発達の停滞：次の段階へ進みにくく、同じ課題に留まっている/ 変化への不安：新しい挑戦を避け、安心できる範囲に閉じこもる/ バランスの乱れ：身体・情緒・認知のいずれかが偏って育っている/ 環境との不一致：場や人との関わりが育ちを阻害している/ 未来への不安：成長の見通しが立ちにくく、停滞感がある ', 
        '種(正)': '可能性の萌芽：子どもの中に新しい力や関心が芽生えている/ 希望の始まり：未来に向けた期待や喜びが感じられる/ 育てる意志：保育者や環境が子どもの成長を支えようとする姿勢/ 環境との調和：土壌（場）や水（関わり）が整い、芽吹きが促される/ 小さな始まりの価値：まだ小さくても、未来につながる重要な一歩 ', 
        '種(逆)': '可能性の停滞：新しい力や関心が育ちにくい/ 希望の欠如：未来への期待が見えず、不安や停滞感が強い/ 育てる意志の不足：保育者や環境が支えきれず、子どもの芽が伸びない/ 環境の不一致：土壌が硬く、水が不足するように、場や関わりが整わない/ 始まりの見失い：小さな芽吹きを見逃し、成長の機会を逸する ', 
        '意欲(正)': '挑戦への前向きさ：新しい活動や課題に積極的に取り組む/ 内発的動機づけ：自分の興味や関心から行動が生まれる/ 持続する集中：やりたい気持ちが行動を支え、継続力につながる/ 自己表現の推進力：意欲が表情や行動に現れ、周囲に伝わる/ 環境との相互作用：場や人との関わりが意欲をさらに高める ', 
        '意欲(逆)': '挑戦の回避：新しい活動や課題に消極的で、取り組みを避ける/ 外発的動機づけに依存：自分の興味よりも他者の指示や報酬に左右される/ 集中の途切れ：やる気が続かず、途中で投げ出す傾向/ 自己表現の停滞：意欲が表情や行動に現れず、周囲に伝わらない/ 環境との不一致：場や人との関わりが意欲を阻害している ', 
        '風(正)': '自然とのつながり: 子どもが風に触れ、自然の動きやリズムを身体で感じている状態。/ 感覚の開放: 頬に風を受け、髪が揺れ、葉が舞うことで、触覚や視覚が刺激されている。/ 変化への気づき: 風の強弱や方向の違いを感じ取り、環境の変化に敏感になっている。/ 遊びのきっかけ: 風車や布、葉っぱなどを使って、風と遊ぶ創造的な活動が生まれる。 ', 
        '風(逆)': '感覚の過敏または鈍化: 風の刺激が強すぎて不快になったり、逆に風に気づかないほど感覚が閉じている。/ 自然との断絶: 室内に閉じこもりすぎて、風や空気の流れを感じる機会が減っている。/ 変化への不安: 風の動きが「予測できないもの」として不安を呼び起こしている。/ 遊びの停滞: 外遊びや風との関わりが減り、感覚的な刺激が乏しくなっている。 ', 
        '根(正)': '安心の基盤：子どもが安心して身を委ねられる「安全基地」が確立されている。/ 信頼関係の育成：保育者や仲間との関わりの中で、信頼が深まり安定感が育まれる。/ 持続する安定：生活リズムや環境が安定し、子どもの情緒が落ち着いている。/ 成長を支える土台：根がしっかり張ることで、発達や挑戦への準備が整う。 ', 
        '根(逆)': '基盤の揺らぎ：安心できる場が不十分で、子どもが不安定になりやすい。/ 信頼の欠如：保育者や仲間との関係に不安があり、安心感が得られない。/ 生活の不安定さ：リズムや環境が乱れ、情緒の安定が難しい。/ 成長の停滞：土台が弱いために、挑戦や発達が進みにくい。 ', 
        '雨(正)': '自然との感覚的なつながり: 雨の音、冷たさ、匂いなどを通じて、子どもが自然を全身で感じている。/ 季節の移ろいへの気づき: 雨が春・梅雨・秋などの季節を知らせ、生活リズムに彩りを与えている。/ 感覚統合の促進: 雨に触れることで、触覚・聴覚・視覚が統合され、身体と心が調和している。/ 環境への好奇心と安心: 雨の日でも外に出てみたい、濡れてみたいという意欲が育まれている。 ', 
        '雨(逆)': '感覚過敏や不快感: 雨の刺激が強すぎて、子どもが不安や拒否を示している。/ 季節感の断絶: 室内中心の生活で、雨や天候の変化に気づきにくくなっている。/ 環境との距離感: 雨の日は「避けるべきもの」として扱われ、自然との関係が希薄になっている。/ 生活リズムの乱れ: 雨によって予定が崩れたり、活動が制限されることで、リズムが不安定になっている。 ', 
        '実り(正)': '達成感の獲得：活動や挑戦の結果が形となり、子どもが満足感を得ている/ 成果の可視化：作品・行動・関係などが目に見える形で残る/ 努力の結晶：積み重ねた挑戦が成果につながり、次の成長を支える/ 自己肯定感の高まり：自分の力を認め、誇りを持つことができる/ 次の挑戦への意欲：成果が次のステップへの動機づけになる ', 
        '実り(逆)': '達成感の欠如：活動の結果が見えず、満足感が得られない/ 成果の不可視化：努力が形にならず、子ども自身や周囲に伝わらない/ 停滞感：挑戦が成果につながらず、意欲が低下する/ 自己肯定感の不足：自分の力を認められず、不安や自信の欠如につながる/ 次の挑戦への躊躇：成果が見えないために、次のステップに進みにくい '
    };

// ────────────────────────────────────────
// ‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐
// ・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・
// ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
// ────────────────────────────────────────
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿━＿
// ○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●
// ■□■□■□■□■□■□■□■□■□■□START┓
// ■□■□■□■□■□■□■□■□■□■□END┛

