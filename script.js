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

const grid = document.getElementById('projectsGrid');
const HOME_PREVIEW_COUNT = 2;

grid.innerHTML = '';
projects.slice(0, HOME_PREVIEW_COUNT).forEach((p, i) => {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.innerHTML = projectCardHTML(p);
  card.querySelector('[data-action="detail"]').addEventListener('click', () => openModal(i));
  grid.appendChild(card);
});
initReveal(grid.querySelectorAll('.project-card'));

const designGrid = document.getElementById('designGrid');
const DESIGN_PREVIEW_COUNT = 3;
designWorks.slice(0, DESIGN_PREVIEW_COUNT).forEach((d, i) => {
  const card = document.createElement('div');
  card.className = 'design-card';
  card.innerHTML = designCardHTML(d);
  card.addEventListener('click', () => openLightbox(i));
  designGrid.appendChild(card);
});
initReveal(designGrid.querySelectorAll('.design-card'));

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

const overlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');

function openModal(i){
  const p = projects[i];
  modalContent.innerHTML = `
    <button class="modal-close" id="modalCloseBtn" aria-label="Tutup detail project">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <div class="modal-thumb"><img src="${p.image}" alt="Tampilan ${p.name}"></div>
    <h3>${p.name}</h3>
    <p class="modal-role">${p.role}</p>
    <div class="modal-block"><h4>Overview</h4><p>${p.overview}</p></div>
    <div class="modal-block"><h4>Problem</h4><p>${p.problem}</p></div>
    <div class="modal-block"><h4>Solution</h4><p>${p.solution}</p></div>
    <div class="modal-block"><h4>Fitur Utama</h4><ul class="modal-features">${p.features.map(f => `<li>${f}</li>`).join('')}</ul></div>
    <div class="modal-block"><h4>Teknologi</h4><div class="modal-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div></div>
    <a class="btn btn-primary" href="${p.figma}" target="_blank" rel="noopener">Lihat Desain di Figma</a>
  `;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
}
function closeModal(){
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}
overlay.addEventListener('click', (e) => { if(e.target === overlay) closeModal(); });
document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeModal(); });

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

const revealSelectors = [
  '.hero-eyebrow','.hero-name','.hero-role','.hero-desc','.hero-actions','.hero-visual',
  '#about .kicker','#about .section-title','#about .about-text p','#about .stat-card',
  '#tools .kicker','#tools .section-title','#tools .tool-card',
  '#projects .kicker','#projects .section-title','#projects .subsection-desc',
  '.contact-inner .kicker','.contact-inner h2','.contact-inner p','.contact-inner .contact-links'
];
initReveal(document.querySelectorAll(revealSelectors.join(',')));

const header = document.querySelector('header');
const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
const navIndicator = document.querySelector('.nav-indicator');
const navSections = navLinks
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

function moveIndicatorTo(link){
  if(!link || !navIndicator) return;
  const containerRect = link.parentElement.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();
  navIndicator.style.width = linkRect.width + 'px';
  navIndicator.style.transform = `translateX(${linkRect.left - containerRect.left}px)`;
}

function updateActiveNav(){
  const scrollPos = window.scrollY + 140;
  let current = navSections[0];
  navSections.forEach(sec => {
    if(sec.offsetTop <= scrollPos) current = sec;
  });
  const activeLink = navLinks.find(a => a.getAttribute('href') === '#' + current.id);
  navLinks.forEach(a => a.classList.remove('active'));
  if(activeLink){
    activeLink.classList.add('active');
    moveIndicatorTo(activeLink);
  }
}

function handleNavScroll(){
  if(window.scrollY > 40){
    header.classList.add('nav-compact');
  }else{
    header.classList.remove('nav-compact');
  }
  updateActiveNav();
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
window.addEventListener('resize', updateActiveNav);
window.addEventListener('load', updateActiveNav);
updateActiveNav();