// HTML側で var ksnum が定義されていればそれを使い、なければ0にする
if (typeof ksnum === 'undefined') {
    var ksnum = 0; 
}

let uks = '';
const mks = '../'; // tarotフォルダ内用
const oks = './';  // ルート(index)用

if (ksnum === 0) { uks = mks; }
if (ksnum === 1) { uks = oks; }

// パスが確定した後に文字列を組み立てる

const ktd = '<img src="'+uks+'img/feature.png" height="14">';
const zig = '<img src="'+uks+'img/zpd.png" height="14">';
const atz = '<img src="'+uks+'img/feature.png" height="14">→<img src="'+uks+'img/zpd.png" height="14">';
const zta = '<img src="'+uks+'img/zpd.png" height="14">→<img src="'+uks+'img/feature.png" height="14">';
const ihu = '<img src="'+uks+'img/isou.png" height="14">';
const vhu = '<img src="'+uks+'img/visou.png" height="14">';
const sty = '<img src="'+uks+'img/story.png" height="14">';
const spd = '<span style="font-size:10px;">スプレッド</span>';
const lct = '<li class="tarolin">';
const hlc = '<li style="list-style-type: none; margin:5px; font-weight:bold;display:flex;">';

const kkk = `
<img src="${uks}img/marseille/bnr.png" alt="AI連携タロット">
<span style="font:8px;"><br><a href="https://jdp.zouri.jp/tarot/tarotindex.htm">▲TAROT TOP</a>|<a href="https://ameblo.jp/hiro40574251/" target="_blank">▲BLOG</a>|<a href="https://www.youtube.com/@JDPianism" target="_blank">▲Youtube</a></span><h3>AI制御＆連携タロットシリーズ</h3>

<a href="./hoikutarotindex.htm"><img src="${uks}img/marseille/hobaybnr3.png" width="329" alt="保育タロット"><br>
▲保育TAROT TOP</a>
<ul>
<li style="list-style-type: none; margin:5px; font-weight:bold;">●保育タロット 44枚●</li><small>次元定義：${ktd}…feature空間（活動の性質・15次元）／<img src="${uks}img/taikyoku.png" height="14">…polarity空間（価値観の方向・5次元）／${ihu}…hue空間（生成段階・1次元の環）／${vhu}…ベクトル位相（発達の方向・Givens回転の連鎖・15次元球面）／${zig}…ZPD空間（発達の最近接領域・15次元）</small>

${hlc}保育タロット - <img src="${uks}img/feature.png" height="20">(保育の活動環境を分析する)</li>
  ${lct}活動案 ${ktd} / <a href="./hoikutarotceltic.htm">ケルト十字法</a></li>
  ${lct}活動案 ${ktd} / <a href="./hoikutarot5cards.htm">即興5枚引き${spd}</a></li>
  ${lct}6方向提示 ${ktd} <img src="${uks}img/taikyoku.png" height="14"> ${ihu} / <a href="./childcarephasespectrum.htm">保育位相スペクトラム ～6相診断～</a></li>
  ${lct}アイデア ${ktd} <img src="${uks}img/taikyoku.png" height="14"> ${ihu} / <a href="./crossoverspread.htm">クロスオーバー${spd}</a></li>
  ${lct}環境構成 - 改善 ${ktd} / <a href="./hoikutarotzure.htm">ズレ→環境構成${spd}</a></li>
  ${lct}関連リソース ${ktd} / <a href="./arcana-compatibility-matrix.htm">保育タロット象徴・ペア相性マトリックス</a></li>
  <!-- li class="tarolin">おまけ - 試作 / <a href="./arcana-celtic-mvp.htm">活動案ケルト十字法MVP版</a></li -->

${hlc}保育タロット - <img src="${uks}img/zpd.png" height="20">(子どもの発達を捉えて分析する)</li>

  ${lct}足場かけ - 発達全般 ${zig} / <a href="./developmental_dynamics4.htm">発達ダイナミクス4${spd}</a></li>
  ${lct}足場かけ - 遊び ${zig} ${vhu} / <a href="./play_expand_spread.htm">遊びの拡張${spd}</a></li>
  ${lct}支援 - 言葉の育ち ${zig} / <a href="./lang_spread.htm">言語・コミュニケーション${spd}</a></li>
  ${lct}支援 - 感情 ${zig} / <a href="./emotion_spread.htm">情緒安定${spd}</a></li>
  ${lct}支援 - 感覚統合・身体発達 ${zig} / <a href="./sensory_spread.htm">感覚・身体${spd}</a></li>
  ${lct}支援 - 特定スキル ${zig} ${vhu} / <a href="./daily_living_skills.htm">生活スキル習得${spd}</a></li>
  ${lct}長期育ち ${zig} / <a href="./timeline_spread.htm">育ちの時系列${spd}</a></li>
  ${lct}環境構成 - 「物・人・時間」設計 ${zig} / <a href="./childcare_environment.htm">保育環境デザイン${spd}</a></li>
  ${lct}保育チーム役割分担 ${zig} / <a href="./collab_spread.htm">保育者協働${spd}</a></li>
  <!-- li class="tarolin">おまけ - 試作 ${zig} / <a href="./zpd.htm">発達ダイナミクス4プロトタイプ</a><br>(要Claudeアカウント)</li -->

${hlc}保育タロット - <img src="${uks}img/zpd.png" height="20"> × <img src="${uks}img/feature.png" height="20">(個々の子どもの発達に合う活動を分析する)</li>
<small>変換の意味：活動→発達「この活動はこの子のZPDのどこを刺激するか」、発達→活動「この子の発達特性が活動のどの軸を求めているか」</small>
  ${lct}子ども理解 - 活動から発達を逆算 ${atz} / <a href="./reverse_spread.htm">「活動→子ども」逆引き${spd}</a></li>
  ${lct}翻訳 - この子は今、何を大切にしているか ${zta} / <a href="./act_lang_spread.htm">活動言語翻訳${spd}</a></li><!-- 子どもの今を言語化 子どもの内側 -->
  ${lct}翻訳 - この子は、どんな環境や関わり方なら自然に動き出せるか ${zta} / <a href="./resonance_axis.htm">共鳴軸${spd}</a></li><!-- 子どもがどの活動軸を呼んでいるか 子どもと環境の相互作用 -->
  ${lct}個別支援 - 活動調整 ${zta} / <a href="./zpd_asymmetry.htm">凹凸補正活動${spd}</a></li>
  ${lct}個別支援 - 活動調整 ${zta} / <a href="./seasonal_tuning.htm">季節の活動チューニング${spd}</a></li>

${hlc}保育タロット - <img src="${uks}img/story.png" height="20"> (ベクトルを物語のエンジンに変換)</li>
  ${lct}保育ネタ - 汎用おはなし骨格 ${ktd} ${ihu} → ${sty} / <a href="./story3actspread.htm">“3アクト”法フラクタル${spd}</a></li>
  ${lct}保育ネタ - 運動会種目 ${ktd} → ${sty} / <a href="./reverse_spread.htm">運動会用おはなし“3アクト法”</a></li>

<hr>
${hlc}●伝統的タロット 大アルカナ22枚 主にケルト十字法●</li>
<li style="list-style-type: none; margin:5px; font-weight:bold;">占い</li>
  ${lct}<a href="./tarot01celtic_cross_spread.htm">ケルト十字法からの助言・最適解占い</a></li>
  ${lct}<a href="./tarot03astrology_and_tarot_integration.htm">2人の生年月日で相性占い(占星術タロット統合)</a></li>
  ${lct}<a href="./tarot04yes_no_decision_oracle.htm">Yes/No決断占い</a></li>
<li style="list-style-type: none; margin:5px; font-weight:bold;">アイデア出し</li>
  ${lct}<a href="./tarot02brainstorm_ideas.htm">汎用ブレストツール</a></li>
  ${lct}<a href="./tarot07creative_inspiration_tarot.htm">創作支援インスピレーション</a></li>
  ${lct}<a href="./tarot08storytelling_tarot.htm">ストーリー作成ツール/続編対応</a></li>
<li style="list-style-type: none; margin:5px; font-weight:bold;">検証・計算</li>
  ${lct}<a href="./tarot05fact-checking_tarot.htm">タロットでファクトチェック</a></li>
  ${lct}<a href="./tarot06probability_tarot_reading.htm">確率を出すタロット</a></li>
  ${lct}<a href="./tarot02brainstorm_ideas.htm">汎用ブレストツール(検証・計算にも使えます)</a></li>
<li style="list-style-type: none; margin:5px; font-weight:bold;">自己洞察ツール</li>
  ${lct}<a href="./tarot10personal_growth.htm">自己成長プラン生成</a></li>
  ${lct}<a href="./tarot11jungian_psychology_of_self-analysis.htm">ユング心理学の視点から自己分析</a></li>
<li style="list-style-type: none; margin:5px; font-weight:bold;">ゲーム</li>
  ${lct}<a href="./tarot12memory_match.htm">大アルカナ神経衰弱(PC用)</a></li>
  ${lct}<a href="./tarot09tarot_roulette_adventure.htm">タロットルーレットアドベンチャー(注意：音がでます！・PC用)</a></li>
</ul>
<h4>update info</h4>
<ul>
<li>2026
<ul>
<li>6/03 保育タロット×ZPD／保育環境デザイン${spd} - 追加。</li>
<li>5/29 保育タロット×ZPD／情緒安定${spd} - 追加。</li>
<li>5/26 保育タロット×ZPD／生活スキル習得${spd} - 追加。</li>
<li>5/23 保育タロット×ZPD／発達ダイナミクス4 - 追加。<br>15次元ベクトルを既存の活動案用と別に、ZPD(発達の最近接領域)用を定義。</li>
<li>5/11 保育タロット／運動会種目生成おはなし“3アクト法” - 追加。</li>
<li>5/08 保育タロット／おはなし生成“3アクト法”フラクタル${spd}、クロスオーバー${spd} - 追加。</li>
<li>4/03 保育タロット／ズレ→環境構成${spd} - 追加。</li>
<li>3/23 保育タロット／保育位相スペクトラム ～6相診断～ - 追加。<br>保育専用推論エンジンを、(カード層: 44象徴×24文脈の環境カード)×(データ層: 15次元ベクトル×5対極軸×6位相)に拡張。</li>
<li>2/06 保育タロット／即興保育活動案5枚引き${spd} - 追加。</li>
<li>1/30 保育タロット／ケルト十字(完全版・ランダム選出) - 追加。</li>
</ul>
</li>
</ul>

<ul>
<li>2025
<ul>
<li>12/01 タロット神経衰弱 - スコアアタック新ルールに改編。</li>
<li>11/29 おまけゲーム・タロット神経衰弱追加。</li>
<li>11/19 保育タロット／カード相性マトリクス詳細画面にコサイン類似度ベクトルの角度表示と、保育活動例など250例追加(250/946)。</li>
<li>11/15 保育タロット／ケルト十字MVP(最小機能版・反則選出) - 追加。</li>
<li>10/31 自己成長プラン生成、ユング自己分析 - 追加。</li>
<!-- <li></li> -->
</ul>
</li>
</ul>
(構想中：保育専用タロットのバリエーション。)</span>
<!-- (構想中：ベイズ確率更新タロットシステム、エントロピー情報理論タロット、量子タロット、4コマ漫画プロットなど。) -->

<h3>Author: <strong>冗談ピアニズム</strong></h3>
<table border=0><tr><td width="100"><img src="${uks}img/jdpico.png" width="80" height="80" style="vertical-align: middle; display: inline-block;"></td><td>ピアノ編曲が趣味の保育士です。チャンネル登録お願いします。
<ul><li><a href="https://www.youtube.com/@JDPianism" target="_blank">Youtube チャンネル</a></li>
<li><a href="https://ameblo.jp/hiro40574251/" target="_blank">アメーバブログ</a></li>
</ul></td></tr></table>

<div class="lupd" align="right">Last Updated: 2026/06/03</div>
`;

// - バッククォート (```) を使うことで、複数行のHTMLをそのまま書けます
// ${lct}<a href="./.htm"></a>
