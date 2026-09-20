const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasGSAP = typeof gsap !== 'undefined';
if (hasGSAP) gsap.registerPlugin(ScrollTrigger);

const app = document.getElementById('app');

/* ---------------- Torn-paper dividers ---------------- */
const DIVIDER_PATHS = [
  "M0,70 C90,20 180,110 320,55 C460,10 560,125 700,60 C850,15 950,115 1100,50 C1250,10 1350,90 1440,45 L1440,140 L0,140 Z",
  "M0,50 C130,110 220,15 360,80 C500,130 600,30 760,75 C900,110 1000,20 1160,65 C1300,100 1380,40 1440,70 L1440,140 L0,140 Z",
  "M0,90 C100,30 200,120 340,50 C480,10 580,110 720,40 C860,100 960,20 1120,70 C1260,110 1360,30 1440,60 L1440,140 L0,140 Z"
];

const DIVIDER_DECOR = [
  [{i:'fa-star',l:8,t:15,c:'yellow'},{i:'fa-circle',l:28,t:55,c:'coral dot'},{i:'fa-plus',l:52,t:20,c:'sky'},{i:'fa-star',l:74,t:50,c:'coral'},{i:'fa-circle',l:90,t:18,c:'yellow dot'}],
  [{i:'fa-plus',l:12,t:50,c:'yellow'},{i:'fa-circle',l:34,t:20,c:'sky dot'},{i:'fa-star',l:58,t:55,c:'yellow'},{i:'fa-circle',l:80,t:22,c:'coral dot'},{i:'fa-plus',l:95,t:45,c:'sky'}],
  [{i:'fa-star',l:10,t:45,c:'sky'},{i:'fa-plus',l:30,t:18,c:'yellow'},{i:'fa-circle',l:50,t:50,c:'coral dot'},{i:'fa-star',l:70,t:20,c:'coral'},{i:'fa-circle',l:92,t:52,c:'yellow dot'}]
];

function divider(index, prevBg) {
  const decor = DIVIDER_DECOR[index].map(d =>
    `<i class="fa-solid ${d.i} divider-decor ${d.c}" style="left:${d.l}%; top:${d.t}%;"></i>`
  ).join('');
  return `<div class="divider divider--${index}" style="background:${prevBg};" data-divider="${index}">
    <svg viewBox="0 0 1440 140" preserveAspectRatio="none"><path d="${DIVIDER_PATHS[index]}"></path></svg>
    ${decor}
  </div>`;
}

/* ---------------- Card ---------------- */
function card(work) {
  const title = localize(work.title);
  const catLabel = categoryLabel(work.category);
  return `<a href="#/works/${work.slug}" class="card" data-route data-category="${work.category}">
    <span class="tape"></span>
    <div class="card-thumb">${t('works.thumbPlaceholder', { title })}</div>
    <span class="stamp-badge">${catLabel}</span>
    <h3>${title}</h3>
    <p class="card-meta">${catLabel} · ${work.year}</p>
  </a>`;
}

/* ---------------- Page templates ---------------- */
function homeTemplate() {
  const featured = WORKS.slice(0, 3);
  const name = siteName();
  return `
  <section class="hero">
    <p class="hero-eyebrow"><i class="fa-solid fa-star"></i> ${t('hero.eyebrow')}</p>
    <h1 class="hero-title">
      <span class="line">${name}</span>
      <span class="line">${t('hero.line2')}</span>
    </h1>
    <p class="hero-sub">${t('hero.sub')}</p>
    <a href="#/works" class="hero-cta" data-route><i class="fa-solid fa-arrow-right"></i> ${t('hero.cta')}</a>
  </section>

  ${divider(0, 'var(--cream)')}

  <section class="preview preview--works">
    <div class="preview-inner">
      <div class="preview-head">
        <h2 class="reveal"><i class="fa-solid fa-star"></i> ${t('home.worksHeading')}</h2>
        <a href="#/works" class="preview-cta reveal" data-route>${t('home.worksCta')} <i class="fa-solid fa-arrow-right"></i></a>
      </div>
      <div class="mini-grid">
        ${featured.map(w => `<div class="reveal">${card(w)}</div>`).join('')}
      </div>
    </div>
  </section>

  ${divider(1, 'var(--coral)')}

  <section class="preview preview--about">
    <div class="preview-inner preview-head" style="align-items:center;">
      <div>
        <h2 class="reveal">${t('home.aboutHeading')}</h2>
        <p class="reveal" style="max-width:48ch; margin-top:0.75rem;">${t('home.aboutText')}</p>
      </div>
      <a href="#/about" class="preview-cta reveal" data-route>${t('home.aboutCta')} <i class="fa-solid fa-arrow-right"></i></a>
    </div>
  </section>

  ${divider(2, 'var(--sky)')}

  <section class="preview preview--contact">
    <div class="preview-inner preview-head" style="align-items:center;">
      <div>
        <h2 class="reveal">${t('home.contactHeading')}</h2>
        <p class="reveal" style="max-width:48ch; margin-top:0.75rem; color:rgba(255,248,238,0.8);">${t('home.contactText')}</p>
      </div>
      <a href="#/contact" class="preview-cta reveal" data-route style="background:var(--coral);">${t('home.contactCta')} <i class="fa-solid fa-envelope"></i></a>
    </div>
    <p class="site-footer">${t('footer.copyright', { name })}</p>
  </section>
  `;
}

function worksListTemplate(filter = 'all') {
  return `
  <div class="page-head">
    <h1><i class="fa-solid fa-star"></i> ${t('works.heading')}</h1>
    <p style="margin-top:0.75rem; max-width:60ch; opacity:0.75;">${t('works.sub')}</p>
  </div>
  <div class="filters" role="group" aria-label="${t('works.filterAriaLabel')}">
    <button class="filter-btn ${filter==='all'?'is-active':''}" data-filter="all">${t('works.filterAll')}</button>
    <button class="filter-btn ${filter==='environment'?'is-active':''}" data-filter="environment">${categoryLabel('environment')}</button>
    <button class="filter-btn ${filter==='animation'?'is-active':''}" data-filter="animation">${categoryLabel('animation')}</button>
  </div>
  <div class="works-grid" id="works-grid">
    ${WORKS.map(w => `<div class="reveal work-card-wrap" data-category="${w.category}">${card(w)}</div>`).join('')}
  </div>
  `;
}

function workDetailTemplate(slug) {
  const idx = WORKS.findIndex(w => w.slug === slug);
  if (idx === -1) {
    return `<div class="page-head"><h1>${t('detail.notFound')}</h1><a href="#/works" class="back-link reveal" data-route><i class="fa-solid fa-arrow-left"></i> ${t('detail.backLink')}</a></div>`;
  }
  const w = WORKS[idx];
  const prev = WORKS[(idx - 1 + WORKS.length) % WORKS.length];
  const next = WORKS[(idx + 1) % WORKS.length];
  const title = localize(w.title);
  const catLabel = categoryLabel(w.category);

  return `
  <div class="detail-hero">
    <a href="#/works" class="back-link reveal" data-route><i class="fa-solid fa-arrow-left"></i> ${t('detail.backLink')}</a>
    <div class="detail-hero-img reveal">${t('detail.heroPlaceholder', { title })}</div>
    <div class="detail-meta-row">
      <h1>${title}</h1>
      <span class="pill">${catLabel}</span>
      <span class="pill year">${w.year}</span>
    </div>
  </div>

  <div class="detail-copy">
    <div class="reveal">
      <h3><i class="fa-solid fa-lightbulb"></i> ${t('detail.concept')}</h3>
      <p>${localize(w.concept)}</p>
    </div>
    <div class="reveal">
      <h3><i class="fa-solid fa-gear"></i> ${t('detail.technical')}</h3>
      <p>${localize(w.technical)}</p>
    </div>
  </div>

  <div class="detail-gallery">
    ${[1,2,3,4].map(n => `<div class="ph reveal">${t('detail.galleryPlaceholder', { n })}</div>`).join('')}
  </div>

  <div class="tool-tags">
    ${w.tools.map(tool => `<span>${tool}</span>`).join('')}
  </div>

  <div class="detail-nav">
    <a href="#/works/${prev.slug}" data-route><small><i class="fa-solid fa-arrow-left"></i> ${t('detail.prev')}</small>${localize(prev.title)}</a>
    <a href="#/works/${next.slug}" data-route><small>${t('detail.next')} <i class="fa-solid fa-arrow-right"></i></small>${localize(next.title)}</a>
  </div>
  `;
}

function aboutTemplate() {
  const skills = ['Blender','ZBrush','Substance Painter','Unreal Engine','Houdini','After Effects','Photoshop','Marmoset Toolbag'];
  return `
  <div class="about-page">
    <div class="page-head"><h1><i class="fa-solid fa-user"></i> ${t('about.heading')}</h1></div>
    <div class="about-grid">
      <div class="about-photo reveal">${t('about.photoPlaceholder')}</div>
      <div class="about-text reveal">
        <p>${t('about.p1')}</p>
        <p>${t('about.p2')}</p>
        <p>${t('about.p3')}</p>
        <ul class="tag-cloud">
          ${skills.map(s => `<li>${s}</li>`).join('')}
        </ul>
      </div>
    </div>
  </div>
  `;
}

function contactTemplate() {
  const name = siteName();
  return `
  <section class="contact-page">
    <div class="contact-inner">
      <h1 class="reveal"><i class="fa-solid fa-envelope-open-text"></i> ${t('contact.heading')}</h1>
      <p class="reveal">${t('contact.text')}</p>
      <a href="mailto:${SITE.email}" class="contact-email-btn reveal">${SITE.email} <i class="fa-solid fa-paper-plane"></i></a>
      <div class="social-row reveal">
        <a href="https://www.artstation.com/" target="_blank" rel="noopener" aria-label="ArtStation"><i class="fa-brands fa-artstation"></i></a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
        <a href="https://vimeo.com/" target="_blank" rel="noopener" aria-label="Vimeo"><i class="fa-brands fa-vimeo-v"></i></a>
      </div>
    </div>
  </section>
  <p class="site-footer" style="background:var(--deep); color:rgba(255,248,238,0.55); margin:0; padding-bottom:2.5rem;">${t('footer.copyright', { name })}</p>
  `;
}

/* ---------------- Animations applied after each render ---------------- */
function playHeroIntro() {
  const title = document.querySelector('.hero-title');
  if (!title) return;
  if (prefersReducedMotion || !hasGSAP) {
    document.querySelectorAll('.hero-title .line, .hero-sub, .hero-cta').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
    return;
  }
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.to('.hero-title .line', { y: '0%', duration: 0.9, stagger: 0.12 })
    .to('.hero-sub', { opacity: 1, duration: 0.6 }, '-=0.4')
    .to('.hero-cta', { opacity: 1, duration: 0.5 }, '-=0.3');
}

function setupScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  if (prefersReducedMotion || !hasGSAP) {
    items.forEach(el => el.style.opacity = 1);
    return;
  }
  items.forEach(el => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power1.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    });
  });
}

function setupDividerMotion() {
  if (prefersReducedMotion || !hasGSAP) return;
  document.querySelectorAll('.divider').forEach((div, i) => {
    const decorEls = div.querySelectorAll('.divider-decor');
    decorEls.forEach(el => {
      gsap.to(el, {
        y: (i % 2 === 0 ? '+=10' : '-=10'),
        duration: 1.8 + Math.random() * 1.4,
        repeat: -1, yoyo: true, ease: 'sine.inOut',
        delay: Math.random() * 1.5
      });
    });
    gsap.fromTo(div, { skewY: i % 2 === 0 ? -1.4 : 1.4 }, {
      skewY: i % 2 === 0 ? 1.4 : -1.4,
      ease: 'none',
      scrollTrigger: { trigger: div, start: 'top bottom', end: 'bottom top', scrub: 0.6 }
    });
  });
}

function setupFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  if (!buttons.length) return;
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.work-card-wrap').forEach(wrap => {
        const match = filter === 'all' || wrap.dataset.category === filter;
        if (prefersReducedMotion || !hasGSAP) {
          wrap.classList.toggle('is-hidden', !match);
          return;
        }
        if (match) {
          wrap.classList.remove('is-hidden');
          gsap.fromTo(wrap, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
        } else {
          gsap.to(wrap, { opacity: 0, y: 8, duration: 0.22, ease: 'power2.in', onComplete: () => wrap.classList.add('is-hidden') });
        }
      });
    });
  });
}

function updateActiveNav(route) {
  const top = route.split('/')[1] || '';
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('is-active', a.dataset.nav === top);
  });
}

/* ---------------- Language switcher (buttons live outside #app, in the static nav) ---------------- */
function setupLangSwitch() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
  updateLangSwitchUI();
}

/* ---------------- Router ---------------- */
function currentRoute() {
  return location.hash.replace(/^#/, '') || '/';
}

function render() {
  const route = currentRoute();
  let html = '';

  if (route === '/' ) html = homeTemplate();
  else if (route === '/works') html = worksListTemplate();
  else if (route.startsWith('/works/')) html = workDetailTemplate(route.split('/works/')[1]);
  else if (route === '/about') html = aboutTemplate();
  else if (route === '/contact') html = contactTemplate();
  else html = homeTemplate();

  const doSwap = () => {
    app.innerHTML = html;
    updateActiveNav(route);
    playHeroIntro();
    setupScrollReveal();
    setupDividerMotion();
    setupFilters();
    window.scrollTo({ top: 0, behavior: 'auto' });
    if (!prefersReducedMotion && hasGSAP) {
      gsap.fromTo(app, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' });
    }
  };

  if (!prefersReducedMotion && hasGSAP && app.childNodes.length) {
    gsap.to(app, { opacity: 0, y: -12, duration: 0.25, ease: 'power2.in', onComplete: doSwap });
  } else {
    doSwap();
  }
}

window.addEventListener('hashchange', render);
document.addEventListener('DOMContentLoaded', () => {
  setupLangSwitch();
  render();
});
