# 3D CG 美術作品集（Y2K 拼貼風 · SPA）

純前端單頁應用（Hash 路由，不需要伺服器設定），動畫用 GSAP + ScrollTrigger，圖示用 Font Awesome 免費版，字體用 Google Fonts（Fredoka + Noto Sans TC）。

網站支援 **中文 / English / 日本語** 三語切換，右上角有語言按鈕，使用者選過的語言會存在瀏覽器（`localStorage`），下次造訪自動記住；第一次造訪則依瀏覽器語言自動判斷。

## 檔案說明

- `index.html` — 外殼：導覽列（含語言切換按鈕）+ 路由容器 `#app`
- `style.css` — 全站樣式，配色變數在最上面 `:root`
- `i18n.js` — **多語系翻譯與語言邏輯**（介面固定文字、分類標籤、語言判斷與切換）
- `data.js` — 作品資料，**新增/修改作品只改這裡**（每個作品的標題／概念／技術說明都要填三種語言）
- `app.js` — 路由邏輯、各頁面模板、所有動畫（進場、捲動淡入、撕紙分隔浮動裝飾、篩選、頁面切換 crossfade）

## 路由

用 hash 路由（`#/works`、`#/about`…），好處是丟到 GitHub Pages 或 Netlify 都不需要額外設定重寫規則，重新整理也不會 404。

| 網址 | 內容 |
|---|---|
| `#/` | 首頁（Hero + Works/About/Contact 預覽） |
| `#/works` | 作品列表（分類篩選） |
| `#/works/廢棄前哨站的slug` | 單一作品細節頁 |
| `#/about` | 關於 |
| `#/contact` | 聯絡 |

## 新增一個作品

打開 `data.js`，在 `WORKS` 陣列裡複製一筆物件，改內容。`title`／`concept`／`technical` 都要填三種語言：

```js
{
  slug: "your-project-slug",   // 網址用，全英文小寫、用連字號
  category: "environment",      // 或 "animation"
  year: "2025",
  tools: ["Blender", "ZBrush"], // 軟體名稱是通用專有名詞，不用分語言
  title: {
    zh: "你的作品標題",
    en: "Your Project Title",
    ja: "作品タイトル",
  },
  concept: {
    zh: "創作概念文字",
    en: "Concept text",
    ja: "コンセプトの説明",
  },
  technical: {
    zh: "技術細節文字",
    en: "Technical breakdown text",
    ja: "技術的な詳細の説明",
  },
}
```

存檔就會自動出現在作品列表、首頁精選（前三筆）、以及上一個／下一個作品的連續瀏覽裡，**不用手動加頁面**。分類標籤（環境建模／Environment／環境モデリング）會依 `category` 自動對應，不用重複打字。

如果某個語言暫時懶得翻，留空字串也不會壞掉——畫面會自動退回顯示中文版本。

## 多語系怎麼運作（`i18n.js`）

- 所有「介面固定文字」（導覽、按鈕、頁面標題、佔位說明文字等）都放在 `i18n.js` 的 `UI_STRINGS` 裡，依 `zh` / `en` / `ja` 分組。要改文案，直接改這裡的字串即可，不用動 `app.js`。
- `SITE.name`、`SITE.email` 是你的姓名（三語）跟信箱，在 `i18n.js` 最上面。
- 分類標籤翻譯在 `CATEGORIES`。
- 語言切換按鈕在 `index.html` 導覽列右側（中 / EN / 日），點擊會呼叫 `setLang()`：存進 `localStorage`、更新 `<html lang>`、網頁標題，並重新渲染當前頁面（不會跳轉回首頁）。
- 要新增第四種語言（例如韓文）：在 `i18n.js` 的 `SUPPORTED_LANGS`、`LANG_LABELS`、`HTML_LANG_MAP`、`CATEGORIES`、`SITE.name`、`UI_STRINGS` 都補上該語言，並在 `data.js` 每筆作品也補上對應欄位即可，`index.html` 加一顆對應的 `<button class="lang-btn" data-lang="ko">한</button>`。

## 你需要替換的地方

- 所有寫著「放置OO渲染圖」/ "Render for..." / 「〇〇のレンダー画像」的區塊，換成真正的圖片：
  ```html
  <div class="card-thumb" style="background-image:url('images/xxx.jpg'); background-size:cover;"></div>
  ```
- `i18n.js` 裡的 `SITE.email`，以及 `app.js` 的 ArtStation / LinkedIn / Vimeo 連結換成你自己的
- `i18n.js` 裡 `about.p1` / `about.p2` / `about.p3`（三語都要改）：首頁、關於頁的自介文字
- 素材圖片（渲染圖、細節圖、個人照）跟文字說明不一樣，圖片本身不用分語言版本，同一張圖三個語言共用即可

## 放到 GitHub Pages

1. GitHub 新增 repository
2. 把 `index.html`、`style.css`、`data.js`、`app.js`（與你的 `images/` 資料夾）上傳到根目錄
3. Settings → Pages → Source 選 **Deploy from a branch**，Branch 選 `main`、資料夾選 `/ (root)`
4. 約 1-2 分鐘後網站會出現在 `https://你的帳號.github.io/repo名稱/`

## 放到 Netlify

把整個資料夾拖進 Netlify 的部署頁面即可，不需要任何 build 指令（純靜態檔案）。

## 對照設計稿的重點實作

- 首頁 Hero：標題逐行由下往上浮現，一次性動畫
- 三段撕紙曲線分隔：每段振幅大、形狀不對稱，容器底色 = 上一區塊顏色，曲線色 = 下一區塊顏色，避免色塊斷層；曲線上的星星／圓點／＋號會緩慢上下浮動，並隨捲動做微幅 skew 形變
- WORKS 頁：分類篩選（環境建模／動畫短片）用 GSAP 交叉淡入淡出，卡片略微傾斜 1–3 度、95% 透明度 hover 到 100% 並上浮
- 作品細節頁：大圖 Hero、分類/年份標籤、兩段式說明文字、4 張細節圖庫、工具標籤、上一個／下一個作品連續瀏覽
- 頁面切換：`#app` 整體 crossfade（淡出上移 → 換內容 → 淡入下移），不是生硬跳轉
- 所有動畫都尊重 `prefers-reduced-motion`，開啟該系統設定時會直接顯示最終狀態、關閉持續性動畫
- 中 / 英 / 日三語切換：導覽列右上角按鈕即時切換（不重新整理頁面），記住使用者選擇，並依瀏覽器語言自動偵測首次造訪的預設語言
