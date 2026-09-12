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

function initReveal(elements){
  Array.from(elements).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i % 4) * 90 + 'ms';
    if(revealObserver){
      revealObserver.observe(el);
    }else{
      el.classList.add('in-view');
    }
  });
}

initReveal(document.querySelectorAll('.back-link, #all-designs .kicker, #all-designs .section-title, #all-designs .subsection-desc'));

const grid = document.getElementById('designGrid');
const pagination = document.getElementById('pagination');
const DESIGNS_PER_PAGE = 8;
let currentPage = 1;

function buildPageList(current, total){
  const delta = 1;
  const range = [];
  for(let i = 1; i <= total; i++){
    if(i === 1 || i === total || (i >= current - delta && i <= current + delta)){
      range.push(i);
    }
  }
  const withDots = [];
  let last = 0;
  range.forEach(i => {
    if(last){
      if(i - last === 2) withDots.push(last + 1);
      else if(i - last > 2) withDots.push('...');
    }
    withDots.push(i);
    last = i;
  });
  return withDots;
}

function renderPagination(){
  const totalPages = Math.ceil(designWorks.length / DESIGNS_PER_PAGE);
  pagination.innerHTML = '';
  if(totalPages <= 1) return;

  const prevBtn = document.createElement('button');
  prevBtn.className = 'page-btn';
  prevBtn.setAttribute('aria-label', 'Halaman sebelumnya');
  prevBtn.disabled = currentPage === 1;
  prevBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>';
  prevBtn.addEventListener('click', () => renderDesignsPage(currentPage - 1));
  pagination.appendChild(prevBtn);

  buildPageList(currentPage, totalPages).forEach(item => {
    if(item === '...'){
      const dots = document.createElement('span');
      dots.className = 'page-dots';
      dots.textContent = '...';
      pagination.appendChild(dots);
    }else{
      const btn = document.createElement('button');
      btn.className = 'page-btn' + (item === currentPage ? ' active' : '');
      btn.textContent = item;
      btn.addEventListener('click', () => renderDesignsPage(item));
      pagination.appendChild(btn);
    }
  });

  const nextBtn = document.createElement('button');
  nextBtn.className = 'page-btn';
  nextBtn.setAttribute('aria-label', 'Halaman berikutnya');
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>';
  nextBtn.addEventListener('click', () => renderDesignsPage(currentPage + 1));
  pagination.appendChild(nextBtn);
}

function renderDesignsPage(page){
  currentPage = page;
  const start = (page - 1) * DESIGNS_PER_PAGE;
  const pageItems = designWorks.slice(start, start + DESIGNS_PER_PAGE);

  grid.innerHTML = '';
  pageItems.forEach((d, idx) => {
    const absoluteIndex = start + idx;
    const card = document.createElement('div');
    card.className = designCardClass(d);
    card.innerHTML = designCardHTML(d);
    card.addEventListener('click', () => openLightbox(absoluteIndex));
    grid.appendChild(card);
  });

  initReveal(grid.querySelectorAll('.design-card'));
  renderPagination();
  window.scrollTo({ top: document.getElementById('all-designs').offsetTop - 90, behavior: 'smooth' });
}

renderDesignsPage(1);

const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxContent = document.getElementById('lightboxContent');

function openLightbox(i){
  const d = designWorks[i];
  lightboxContent.innerHTML = `
    <button class="modal-close" id="lightboxCloseBtn" aria-label="Tutup pratinjau">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <img src="${d.image}" alt="${d.title}">
    <h3>${d.title}</h3>
    <p class="modal-role">${d.category}</p>
  `;
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
hamburgerBtn.addEventListener('click', () => {
  mobilePanel.classList.toggle('open');
});
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
}
window.addEventListener('scroll', handleNavScroll, { passive: true });
