const revealObserver = ('IntersectionObserver' in window)
  ? new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
        }else{
          entry.target.classList.remove('in-view');
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' })
  : null;

function initReveal(elements, className){
  className = className || 'reveal';
  Array.from(elements).forEach((el, i) => {
    el.classList.add(className);
    el.style.transitionDelay = (i % 4) * 90 + 'ms';
    if(revealObserver){
      revealObserver.observe(el);
    }else{
      el.classList.add('in-view');
    }
  });
}

initReveal(document.querySelectorAll('.back-link, #documents .kicker, #documents .section-title, .cv-card, #certTitle, #documents .subsection-desc'));

/* === DATA SERTIFIKAT — ganti dengan sertifikatmu ===
   image: file gambar di folder assets (disarankan landscape, rasio A4 ~ 297:210) */
const certificates = [
  { title: "Nama Sertifikat 1", issuer: "Penyelenggara", year: "2026", image: "assets/cert-1.svg" }
];

const certGrid = document.getElementById('certGrid');
certificates.forEach((c, i) => {
  const card = document.createElement('div');
  card.className = 'cert-card';
  card.innerHTML = `
    <div class="cert-thumb"><img src="${c.image}" alt="${c.title}" loading="lazy"></div>
    <div class="cert-meta"><p class="cert-title">${c.title}</p><p class="cert-sub">${c.issuer} · ${c.year}</p></div>`;
  card.addEventListener('click', () => openLightbox(i));
  certGrid.appendChild(card);
});
initReveal(certGrid.querySelectorAll('.cert-card'));

const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxContent = document.getElementById('lightboxContent');
function openLightbox(i){
  const c = certificates[i];
  lightboxContent.innerHTML = `
    <button class="modal-close" id="lightboxCloseBtn" aria-label="Tutup pratinjau">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <img src="${c.image}" alt="${c.title}">
    <h3>${c.title}</h3>
    <p class="modal-role">${c.issuer} · ${c.year}</p>`;
  lightboxOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('lightboxCloseBtn').addEventListener('click', closeLightbox);
}
function closeLightbox(){
  lightboxOverlay.classList.remove('open');
  document.body.style.overflow = '';
}
lightboxOverlay.addEventListener('click', (e) => { if(e.target === lightboxOverlay) closeLightbox(); });
document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeLightbox(); });

const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobilePanel = document.getElementById('mobilePanel');
function positionMobilePanel(){
  const headerEl = document.querySelector('header');
  if(headerEl) mobilePanel.style.top = headerEl.getBoundingClientRect().bottom + 'px';
}
hamburgerBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  positionMobilePanel();
  mobilePanel.classList.toggle('open');
});
document.addEventListener('click', (e) => {
  if(!mobilePanel.classList.contains('open')) return;
  const card = mobilePanel.querySelector('.mobile-panel-card');
  if(card && !card.contains(e.target)){
    mobilePanel.classList.remove('open');
  }
});
document.addEventListener('keydown', (e) => { if(e.key === 'Escape') mobilePanel.classList.remove('open'); });
mobilePanel.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobilePanel.classList.remove('open'));
});

const themeToggleBtn = document.getElementById('themeToggleBtn');
themeToggleBtn.addEventListener('click', () => {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  if(isLight){
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('site_theme', 'dark');
  }else{
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('site_theme', 'light');
  }
});

const header = document.querySelector('header');
function handleNavScroll(){
  if(window.scrollY > 40){
    header.classList.add('nav-compact');
  }else{
    header.classList.remove('nav-compact');
  }
  if(mobilePanel.classList.contains('open')) positionMobilePanel();
}
window.addEventListener('scroll', handleNavScroll, { passive: true });

(function(){
  const p=document.getElementById('mobilePanel');
  const syncActive=()=>{
    const desk=[...document.querySelectorAll('.nav-links a')];
    const mob=[...p.querySelectorAll('.mp-links a')];
    const i=desk.findIndex(a=>a.classList.contains('active'));
    mob.forEach((a,k)=>a.classList.toggle('active',k===i));
  };
  document.getElementById('hamburgerBtn').addEventListener('click',syncActive);
  document.getElementById('mpCloseBtn').addEventListener('click',()=>p.classList.remove('open'));
  document.getElementById('mpThemeBtn').addEventListener('click',()=>document.getElementById('themeToggleBtn').click());
})();