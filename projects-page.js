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

initReveal(document.querySelectorAll('.back-link, #all-projects .kicker, #all-projects .section-title, #all-projects .subsection-desc'));

const grid = document.getElementById('projectsGrid');
const pagination = document.getElementById('pagination');
const PROJECTS_PER_PAGE = 6;
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
  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  pagination.innerHTML = '';
  if(totalPages <= 1) return;

  const prevBtn = document.createElement('button');
  prevBtn.className = 'page-btn';
  prevBtn.setAttribute('aria-label', 'Halaman sebelumnya');
  prevBtn.disabled = currentPage === 1;
  prevBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>';
  prevBtn.addEventListener('click', () => renderProjectsPage(currentPage - 1));
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
      btn.addEventListener('click', () => renderProjectsPage(item));
      pagination.appendChild(btn);
    }
  });

  const nextBtn = document.createElement('button');
  nextBtn.className = 'page-btn';
  nextBtn.setAttribute('aria-label', 'Halaman berikutnya');
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>';
  nextBtn.addEventListener('click', () => renderProjectsPage(currentPage + 1));
  pagination.appendChild(nextBtn);
}

function renderProjectsPage(page){
  currentPage = page;
  const start = (page - 1) * PROJECTS_PER_PAGE;
  const pageProjects = projects.slice(start, start + PROJECTS_PER_PAGE);

  grid.innerHTML = '';
  pageProjects.forEach((p, idx) => {
    const absoluteIndex = start + idx;
    const card = document.createElement('div');
    card.className = 'project-card project-card-clickable';
    card.innerHTML = projectCardHTML(p);
    card.addEventListener('click', () => openModal(absoluteIndex));
    card.querySelector('.project-link-outline').addEventListener('click', (e) => e.stopPropagation());
    grid.appendChild(card);
  });

  initReveal(grid.querySelectorAll('.project-card'), 'reveal-left');
  renderPagination();
  window.scrollTo({ top: document.getElementById('all-projects').offsetTop - 90, behavior: 'smooth' });
}

renderProjectsPage(1);

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

const header = document.querySelector('header');
function handleNavScroll(){
  if(window.scrollY > 40){
    header.classList.add('nav-compact');
  }else{
    header.classList.remove('nav-compact');
  }
}
window.addEventListener('scroll', handleNavScroll, { passive: true });
