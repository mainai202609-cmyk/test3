/* ============================================================
   data.js — 作品資料（新增／修改作品只改這裡）
   ------------------------------------------------------------
   title / concept / technical 現在是「多語系物件」：
     title: { zh: '中文標題', en: 'English Title', ja: '日本語タイトル' }

   category 保持單一字串（"environment" 或 "animation"），
   對應的顯示標籤（環境建模／Environment／環境モデリング）
   統一由 i18n.js 的 CATEGORIES 依目前語言算出，
   不用在每筆作品裡重複填寫。

   tools（使用軟體）維持一般陣列，不分語言，因為軟體名稱本來
   就是通用的專有名詞。

   新增一筆作品時，三個語言都要填，任何一個語言留空，
   畫面上會自動退回顯示中文版本，不會壞掉。
   ============================================================ */

const WORKS = [
  {
    slug: "abandoned-outpost",
    category: "environment",
    year: "2024",
    tools: ["Blender", "Substance Painter", "World Machine"],
    title: {
      zh: "廢棄前哨站",
      en: "Abandoned Outpost",
      ja: "廃棄された前哨基地",
    },
    concept: {
      zh: "在這裡描述這個場景的靈感來源、想傳達的氛圍，或它背後的世界觀故事。兩三句話，讓人快速進入你想像的世界。",
      en: "Describe where this scene's inspiration came from, the mood you wanted to convey, or the world-building behind it. A couple of sentences to pull viewers straight into your imagined world.",
      ja: "このシーンのインスピレーションの源や伝えたい雰囲気、あるいはその背景にある世界観をここで説明します。数行で、見る人をすぐに想像の世界へ引き込みましょう。",
    },
    technical: {
      zh: "在這裡描述技術上怎麼做到的：地形怎麼生成、材質怎麼分層、燈光怎麼配置，以及過程中遇到的具體挑戰跟解法。",
      en: "Describe how it was made technically: how the terrain was generated, how materials were layered, how lighting was set up, and the specific challenges you ran into and how you solved them.",
      ja: "技術的な制作過程をここで説明します：地形の生成方法、マテリアルのレイヤー構成、ライティングの設定、そして制作中に直面した具体的な課題とその解決方法について。",
    },
  },
  {
    slug: "mech-gate",
    category: "environment",
    year: "2024",
    tools: ["Blender", "ZBrush", "Marmoset Toolbag"],
    title: {
      zh: "機械閘門結構",
      en: "Mechanical Gate Structure",
      ja: "機械式ゲート構造",
    },
    concept: {
      zh: "描述這個硬表面結構的設計概念：它的功能、比例參考，以及想讓觀者感受到的規模感。",
      en: "Describe the design concept behind this hard-surface structure: its function, scale references, and the sense of scale you wanted viewers to feel.",
      ja: "このハードサーフェス構造のデザインコンセプトを説明します：その機能、スケール感の参考にしたもの、そして観る人に感じてほしいスケール感について。",
    },
    technical: {
      zh: "描述建模流程：從 blockout、細節雕刻到最終的材質與算圖設定，特別提一下最花時間或最有成就感的部分。",
      en: "Describe the modeling pipeline: from blockout, detail sculpting, to final materials and render setup — and call out the part that took the longest or felt most rewarding.",
      ja: "モデリングの流れを説明します：ブロックアウトからディテールのスカルプト、最終的なマテリアルとレンダー設定まで。特に時間がかかった部分や、やりがいを感じた部分について触れましょう。",
    },
  },
  {
    slug: "desert-ruins",
    category: "environment",
    year: "2023",
    tools: ["Blender", "Substance Painter"],
    title: {
      zh: "沙漠遺跡",
      en: "Desert Ruins",
      ja: "砂漠の遺跡",
    },
    concept: {
      zh: "描述這個場景的敘事線索：這裡曾經發生過什麼，觀者可以從場景細節裡讀出哪些線索。",
      en: "Describe the narrative thread of this scene: what happened here, and what clues viewers can read from the details in the scene.",
      ja: "このシーンのストーリーの手がかりを説明します：ここでかつて何が起きたのか、シーンのディテールから観る人が読み取れる手がかりについて。",
    },
    technical: {
      zh: "描述侵蝕、風化材質怎麼製作，以及大場景的效能優化怎麼處理。",
      en: "Describe how the erosion and weathering materials were created, and how performance was optimized for a large-scale scene.",
      ja: "侵食や風化のマテリアルの制作方法、そして大規模シーンのパフォーマンス最適化についてどう対応したかを説明します。",
    },
  },
  {
    slug: "night-signal",
    category: "animation",
    year: "2024",
    tools: ["Blender", "After Effects", "DaVinci Resolve"],
    title: {
      zh: "夜訊",
      en: "Night Signal",
      ja: "夜のシグナル",
    },
    concept: {
      zh: "描述這支短片想說的故事、鏡頭語言的選擇，以及整體的情緒基調。",
      en: "Describe the story this short film tells, the choices behind the cinematography, and the overall emotional tone.",
      ja: "このショートフィルムが伝えたいストーリー、カメラワークの選択、そして全体の感情的なトーンについて説明します。",
    },
    technical: {
      zh: "描述分鏡到動畫、燈光、合成的完整流程，以及片長、幀率等技術規格。",
      en: "Describe the full pipeline from storyboard to animation, lighting, and compositing, along with technical specs like runtime and frame rate.",
      ja: "絵コンテからアニメーション、ライティング、コンポジットまでの一連の流れ、そして尺やフレームレートなどの技術仕様について説明します。",
    },
  },
  {
    slug: "tidefall",
    category: "animation",
    year: "2023",
    tools: ["Blender", "Houdini", "Premiere Pro"],
    title: {
      zh: "潮落",
      en: "Tidefall",
      ja: "潮落（タイドフォール）",
    },
    concept: {
      zh: "描述這支短片的視覺主題與敘事結構。",
      en: "Describe the visual theme and narrative structure of this short film.",
      ja: "このショートフィルムのビジュアルテーマと構成について説明します。",
    },
    technical: {
      zh: "描述特效模擬（水、粒子等）與算圖優化的技術細節。",
      en: "Describe the technical details of the effects simulation (water, particles, etc.) and render optimization.",
      ja: "エフェクトシミュレーション（水、パーティクルなど）とレンダー最適化の技術的な詳細について説明します。",
    },
  },
  {
    slug: "paper-city",
    category: "animation",
    year: "2023",
    tools: ["Blender", "After Effects"],
    title: {
      zh: "紙城",
      en: "Paper City",
      ja: "紙の街",
    },
    concept: {
      zh: "描述這支短片的風格化美術方向與靈感來源。",
      en: "Describe the stylized art direction of this short film and where the inspiration came from.",
      ja: "このショートフィルムのスタイライズされたアートディレクションとインスピレーションの源について説明します。",
    },
    technical: {
      zh: "描述紙感材質、鏡頭運動與剪輯節奏的處理方式。",
      en: "Describe how the paper-like materials, camera movement, and edit pacing were handled.",
      ja: "紙の質感マテリアル、カメラワーク、編集のリズムについてどのように処理したかを説明します。",
    },
  },
];
