/* ============================================================
   i18n.js — 多語系設定與工具函式
   ------------------------------------------------------------
   這個檔案負責：
   1. 存放所有「介面固定文字」的三語翻譯（UI_STRINGS）
   2. 存放分類標籤翻譯（CATEGORIES）與網站基本資訊（SITE）
   3. 提供 t()、localize() 等工具函式給 app.js 使用
   4. 記住使用者選擇的語言（localStorage），並在沒選過時
      依瀏覽器語言自動判斷

   新增語言的方法：
   - 在 SUPPORTED_LANGS 加上語言代碼
   - 在 LANG_LABELS 加上切換按鈕要顯示的文字
   - 在 UI_STRINGS / CATEGORIES / SITE.name 都補上對應語言的翻譯
   - 在 data.js 每筆作品的 title / concept / technical 補上對應語言
   ============================================================ */

const SUPPORTED_LANGS = ['zh', 'en', 'ja'];

// 切換按鈕上顯示的文字（用該語言本身書寫，跟目前介面語言無關）
const LANG_LABELS = { zh: '中', en: 'EN', ja: '日' };

// <html lang="..."> 要用的標準語系代碼
const HTML_LANG_MAP = { zh: 'zh-Hant', en: 'en', ja: 'ja' };

/* ---------------- 網站基本資訊（跟語言相關的部分） ---------------- */
const SITE = {
  name: { zh: '你的名字', en: 'Your Name', ja: 'あなたの名前' },
  email: 'you@example.com', // 信箱本身不需要翻譯，直接改成你的
};

/* ---------------- 作品分類標籤 ---------------- */
const CATEGORIES = {
  environment: { zh: '環境建模', en: 'Environment', ja: '環境モデリング' },
  animation:   { zh: '動畫短片', en: 'Short Animation', ja: 'アニメーション' },
};

/* ---------------- 介面固定文字 ---------------- */
const UI_STRINGS = {
  zh: {
    meta: {
      title: '{name} — 3D CG 美術作品集',
      description: '3D CG 環境建模與動畫短片作品集',
    },
    hero: {
      eyebrow: '3D CG ARTIST',
      line2: '場景建模與動畫短片',
      sub: '用光影、材質與鏡頭語言，把想像中的世界做成看得見的畫面。',
      cta: '查看作品',
    },
    home: {
      worksHeading: '精選作品',
      worksCta: '看全部作品',
      aboutHeading: '關於我',
      aboutText: '我是一名專注於場景建模與動畫短片的 3D 美術，喜歡把日常光影轉化成有情緒的畫面。',
      aboutCta: '認識我',
      contactHeading: '一起合作？',
      contactText: '正在尋找 3D CG 場景建模與動畫短片相關的工作機會。',
      contactCta: '邀約我',
    },
    works: {
      heading: '作品',
      sub: '點選任一作品進入細節頁，看完整的創作概念與製作過程。',
      filterAll: '全部',
      filterAriaLabel: '作品分類篩選',
      thumbPlaceholder: '放置「{title}」渲染圖',
    },
    detail: {
      backLink: '回到作品列表',
      heroPlaceholder: '放置「{title}」主視覺大圖',
      concept: '創作概念',
      technical: '技術細節',
      galleryPlaceholder: '細節圖 {n}',
      prev: '上一個作品',
      next: '下一個作品',
      notFound: '找不到這個作品',
    },
    about: {
      heading: '關於我',
      photoPlaceholder: '放置個人照 / 工作照',
      p1: '在這裡完整介紹你是誰、擅長什麼類型的場景與動畫風格（寫實 / 風格化 / 遊戲用 / 影視用），以及你走上這條路的原因。',
      p2: '可以多寫一兩段：你的創作習慣、最有成就感的專案，或是你在團隊合作中扮演的角色。',
      p3: '目前在找 3D CG 場景建模／動畫短片相關的工作機會，歡迎透過 CONTACT 頁跟我聯絡。',
    },
    contact: {
      heading: '一起合作吧',
      text: '正在尋找 3D CG 場景建模與動畫短片相關的工作機會，不管是全職、接案還是聊聊都歡迎。',
    },
    footer: {
      copyright: '© 2026 {name}',
    },
  },

  en: {
    meta: {
      title: '{name} — 3D CG Art Portfolio',
      description: 'Portfolio of 3D CG environment art and short animation work',
    },
    hero: {
      eyebrow: '3D CG ARTIST',
      line2: 'Environment Art & Short Animation',
      sub: 'Turning light, material and camera language into images from imagined worlds.',
      cta: 'View Works',
    },
    home: {
      worksHeading: 'Featured Work',
      worksCta: 'View All Work',
      aboutHeading: 'About Me',
      aboutText: "I'm a 3D artist focused on environment art and short animation — turning everyday light into images with feeling.",
      aboutCta: 'About Me',
      contactHeading: "Let's Work Together?",
      contactText: 'Currently looking for opportunities in 3D CG environment art and short animation.',
      contactCta: 'Get In Touch',
    },
    works: {
      heading: 'Work',
      sub: 'Click any piece to see the full concept and process behind it.',
      filterAll: 'All',
      filterAriaLabel: 'Filter work by category',
      thumbPlaceholder: 'Render for “{title}”',
    },
    detail: {
      backLink: 'Back to Works',
      heroPlaceholder: 'Hero image for “{title}”',
      concept: 'Concept',
      technical: 'Technical Breakdown',
      galleryPlaceholder: 'Detail Shot {n}',
      prev: 'Previous',
      next: 'Next',
      notFound: 'Project not found',
    },
    about: {
      heading: 'About Me',
      photoPlaceholder: 'Portrait / work photo',
      p1: 'Introduce who you are, the kind of scenes and animation style you specialize in (realistic / stylized / games / film), and why you got into this work.',
      p2: 'Add a paragraph or two about your creative habits, your proudest project, or the role you tend to play on a team.',
      p3: "Currently looking for opportunities in 3D CG environment art / short animation — feel free to reach out through the Contact page.",
    },
    contact: {
      heading: "Let's Collaborate",
      text: 'Currently looking for opportunities in 3D CG environment art and short animation — full-time, freelance, or just a chat, all welcome.',
    },
    footer: {
      copyright: '© 2026 {name}',
    },
  },

  ja: {
    meta: {
      title: '{name} — 3D CG ポートフォリオ',
      description: '3D CG 環境モデリング・アニメーション作品集',
    },
    hero: {
      eyebrow: '3D CG ARTIST',
      line2: '環境モデリング & ショートアニメーション',
      sub: '光、質感、カメラワークで、想像の世界を目に見える映像にする。',
      cta: '作品を見る',
    },
    home: {
      worksHeading: '注目の作品',
      worksCta: '作品一覧を見る',
      aboutHeading: '自己紹介',
      aboutText: '環境モデリングとショートアニメーションを専門とする3Dアーティストです。日常の光を感情のある映像に変えることが好きです。',
      aboutCta: '詳しく見る',
      contactHeading: '一緒に仕事しませんか？',
      contactText: '3D CG 環境モデリング・アニメーション分野でのお仕事を探しています。',
      contactCta: 'お問い合わせ',
    },
    works: {
      heading: '作品',
      sub: '作品をクリックすると、制作コンセプトと制作過程の詳細をご覧いただけます。',
      filterAll: 'すべて',
      filterAriaLabel: '作品カテゴリで絞り込み',
      thumbPlaceholder: '「{title}」のレンダー画像',
    },
    detail: {
      backLink: '作品一覧に戻る',
      heroPlaceholder: '「{title}」のメインビジュアル',
      concept: '制作コンセプト',
      technical: '技術的な詳細',
      galleryPlaceholder: '詳細画像 {n}',
      prev: '前の作品',
      next: '次の作品',
      notFound: '作品が見つかりません',
    },
    about: {
      heading: '自己紹介',
      photoPlaceholder: 'プロフィール写真 / 制作風景',
      p1: 'あなたがどんな人物か、得意なシーンやアニメーションのスタイル（リアル調／スタイライズ／ゲーム向け／映像向け）、そしてこの道に進んだ理由をここで紹介してください。',
      p2: '制作のこだわりや、一番達成感のあったプロジェクト、チームでの役割など、もう一段落書き足しても良いでしょう。',
      p3: '現在、3D CG 環境モデリング／アニメーション関連のお仕事を探しています。お気軽に Contact ページよりご連絡ください。',
    },
    contact: {
      heading: '一緒に制作しましょう',
      text: '3D CG 環境モデリング・アニメーション分野でのお仕事を探しています。正社員・フリーランス・雑談だけでも歓迎です。',
    },
    footer: {
      copyright: '© 2026 {name}',
    },
  },
};

/* ---------------- 語言判斷與狀態 ---------------- */
function detectInitialLang() {
  const saved = localStorage.getItem('lang');
  if (saved && SUPPORTED_LANGS.includes(saved)) return saved;
  const nav = (navigator.language || navigator.userLanguage || 'zh').toLowerCase();
  if (nav.startsWith('ja')) return 'ja';
  if (nav.startsWith('zh')) return 'zh';
  if (nav.startsWith('en')) return 'en';
  return 'zh';
}

let currentLang = detectInitialLang();

function getLang() {
  return currentLang;
}

/* ---------------- 工具函式 ---------------- */
// 依 path（例如 'hero.sub'）取翻譯字串，並代入 {變數}
function t(path, vars) {
  const dig = (obj) => path.split('.').reduce((o, k) => (o ? o[k] : undefined), obj);
  let val = dig(UI_STRINGS[currentLang]);
  if (val === undefined) val = dig(UI_STRINGS.zh); // 保底：找不到就退回中文
  if (typeof val === 'string' && vars) {
    return val.replace(/\{(\w+)\}/g, (_, key) => (vars[key] ?? ''));
  }
  return val ?? '';
}

// 依目前語言取分類標籤
function categoryLabel(categoryKey) {
  const entry = CATEGORIES[categoryKey];
  return (entry && (entry[currentLang] || entry.zh)) || categoryKey;
}

// 取網站名稱（依目前語言）
function siteName() {
  return SITE.name[currentLang] || SITE.name.zh;
}

// 取 data.js 裡「多語系欄位」（例如 work.title = {zh:'', en:'', ja:''}）的目前語言版本
// 如果傳進來的不是多語系物件（例如舊格式的純字串），就直接原樣回傳，避免壞掉
function localize(field) {
  if (field && typeof field === 'object') {
    return field[currentLang] || field.zh || Object.values(field)[0] || '';
  }
  return field;
}

// 切換頁面語言：存起來、更新 <html lang>、標題、meta description，並重新渲染畫面
function setLang(lang) {
  if (!SUPPORTED_LANGS.includes(lang) || lang === currentLang) return;
  currentLang = lang;
  localStorage.setItem('lang', lang);
  applyLangToDocument();
  updateLangSwitchUI();
  if (typeof render === 'function') render();
}

function applyLangToDocument() {
  document.documentElement.lang = HTML_LANG_MAP[currentLang] || 'zh-Hant';
  document.title = t('meta.title', { name: siteName() });
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', t('meta.description'));
}

function updateLangSwitchUI() {
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.lang === currentLang);
  });
}

// 頁面一載入就先套用一次（在 app.js 的 render() 執行之前）
applyLangToDocument();
