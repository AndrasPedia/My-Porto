/* Efek tambahan: typing, hitung naik, kursor halus, tilt kartu */
(function(){
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* 1. Efek mengetik di hero (ubah daftar kata di sini) */
  const role = document.querySelector('.hero-role');
  if(role && !reduce){
    const words = ['UI/UX Designer', 'Web Designer', 'Graphic Designer'];
    role.innerHTML = '<span class="typed"></span><span class="caret" aria-hidden="true"></span>';
    const out = role.querySelector('.typed');
    role.setAttribute('aria-label', words.join(', '));
    let w = 0, i = 0, deleting = false;
    (function tick(){
      const word = words[w];
      out.textContent = word.slice(0, i);
      let delay = deleting ? 45 : 90;
      if(!deleting && i === word.length){ deleting = true; delay = 1600; }
      else if(deleting && i === 0){ deleting = false; w = (w + 1) % words.length; delay = 350; }
      else { i += deleting ? -1 : 1; }
      setTimeout(tick, delay);
    })();
  }

  /* 2. Angka statistik naik dari 0 saat terlihat */
  const nums = document.querySelectorAll('.stat-num');
  if(nums.length){
    const run = (el) => {
      const m = el.dataset.final.match(/^(\d+)(.*)$/);
      if(!m) return;
      const target = parseInt(m[1], 10), suffix = m[2], dur = 1400, t0 = performance.now();
      (function step(now){
        const p = Math.min((now - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if(p < 1) requestAnimationFrame(step);
      })(t0);
    };
    if(!reduce && ('IntersectionObserver' in window)){
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if(e.isIntersecting){ run(e.target); io.unobserve(e.target); } });
      }, { threshold: 0.6 });
      nums.forEach(n => { const t = n.textContent.trim(); const m = t.match(/^(\d+)(.*)$/); if(m){ n.dataset.final = t; n.textContent = '0' + m[2]; io.observe(n); } });
    }
  }

  /* 9. Marquee logo tools: baris logo bergerak pelan, berhenti saat disorot */
  document.querySelectorAll('.marquee').forEach(m => {
    const track = m.querySelector('.marquee-track');
    if(!track) return;
    if(reduce) return; /* tanpa animasi: tampil sebagai baris biasa */
    const items = Array.from(track.children);
    const build = () => {
      track.querySelectorAll('[data-clone]').forEach(n => n.remove());
      m.classList.add('is-running'); /* ukur dalam mode satu baris panjang */
      let guard = 0;
      /* isi satu "setengah" sampai lebih lebar dari area tampil */
      while(track.scrollWidth < m.clientWidth + 40 && guard++ < 10){
        items.forEach(it => { const c = it.cloneNode(true); c.dataset.clone = '1'; c.setAttribute('aria-hidden','true'); track.appendChild(c); });
      }
      const unit = Array.from(track.children);
      unit.forEach(it => { const c = it.cloneNode(true); c.dataset.clone = '1'; c.setAttribute('aria-hidden','true'); track.appendChild(c); });
      const w = track.scrollWidth / 2;
      track.style.setProperty('--marquee-dur', Math.max(w / 45, 12).toFixed(1) + 's');
    };
    build();
    let rt; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(build, 250); });
  });

  /* Keterangan singkat: klik chip tools untuk melihat penjelasannya */
  document.querySelectorAll('.tool-chip').forEach(ch => {
    if(ch.title){ ch.dataset.desc = ch.title; ch.removeAttribute('title'); }
    ch.setAttribute('tabindex', '0');
    ch.setAttribute('role', 'button');
  });
  let pop = null, popFor = null;
  const closePop = () => {
    if(!pop) return;
    pop.remove(); pop = null;
    if(popFor){ const mq = popFor.closest('.marquee'); if(mq) mq.classList.remove('is-paused'); popFor = null; }
  };
  const openPop = (chip) => {
    closePop();
    const name = (chip.querySelector('.tool-chip-name') || {}).textContent || '';
    const desc = chip.dataset.desc || '';
    if(!desc) return;
    pop = document.createElement('div');
    pop.className = 'tool-pop';
    pop.setAttribute('role', 'tooltip');
    pop.innerHTML = '<strong></strong><p></p>';
    pop.querySelector('strong').textContent = name;
    pop.querySelector('p').textContent = desc;
    document.body.appendChild(pop);
    const mq = chip.closest('.marquee'); if(mq) mq.classList.add('is-paused');
    popFor = chip;
    const r = chip.getBoundingClientRect();
    const pw = pop.offsetWidth, ph = pop.offsetHeight;
    let left = r.left + r.width / 2 - pw / 2;
    left = Math.max(12, Math.min(left, window.innerWidth - pw - 12));
    let top = r.top - ph - 12, below = false;
    if(top < 12){ top = r.bottom + 12; below = true; }
    pop.style.left = left + 'px';
    pop.style.top = top + 'px';
    pop.classList.toggle('below', below);
    requestAnimationFrame(() => pop && pop.classList.add('show'));
  };
  /* Mouse: keterangan muncul saat kursor diarahkan. Sentuh (HP/tablet): ketuk logo untuk membuka,
     sentuh di mana saja untuk menutup. Jenis input dibaca dari event (bukan dari ukuran layar),
     jadi tetap benar di HP, tablet, dan laptop layar sentuh. */
  let lastType = 'mouse', openedAt = 0, openScroll = 0, openWidth = window.innerWidth;
  const tapOpen = (chip) => {
    openPop(chip);
    openedAt = Date.now(); openScroll = window.scrollY; openWidth = window.innerWidth;
  };
  document.addEventListener('pointerdown', (e) => {
    lastType = e.pointerType || 'mouse';
    if(!pop) return;
    if(e.target.closest && e.target.closest('.tool-chip')) return;
    closePop(); /* sentuh/klik di mana saja menutup keterangan */
  }, { passive: true });
  document.addEventListener('pointerover', (e) => {
    if(e.pointerType !== 'mouse') return;
    const chip = e.target.closest && e.target.closest('.tool-chip');
    if(chip && chip !== popFor) openPop(chip);
  });
  document.addEventListener('pointerout', (e) => {
    if(e.pointerType !== 'mouse') return;
    const chip = e.target.closest && e.target.closest('.tool-chip');
    if(chip && !(e.relatedTarget && chip.contains(e.relatedTarget))) closePop();
  });
  document.addEventListener('click', (e) => {
    const chip = e.target.closest && e.target.closest('.tool-chip');
    if(!chip || lastType === 'mouse') return;
    if(chip === popFor && Date.now() - openedAt > 350) closePop(); else if(chip !== popFor) tapOpen(chip);
  });
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closePop();
    const chip = e.target.closest && e.target.closest('.tool-chip');
    if(chip && (e.key === 'Enter' || e.key === ' ')){ e.preventDefault(); chip === popFor ? closePop() : tapOpen(chip); }
  });
  /* Tutup saat di-scroll cukup jauh. Perubahan kecil (mis. bar alamat HP naik-turun) diabaikan. */
  window.addEventListener('scroll', () => {
    if(pop && Math.abs(window.scrollY - openScroll) > 30 && Date.now() - openedAt > 350) closePop();
  }, { passive: true });
  window.addEventListener('resize', () => {
    if(pop && Math.abs(window.innerWidth - openWidth) > 40) closePop();
  });

  /* 6. Transisi halus antarhalaman (fade) */
  if(!reduce){
    document.addEventListener('click', (e) => {
      const a = e.target.closest && e.target.closest('a[href]');
      if(!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if(a.target === '_blank' || a.hasAttribute('download')) return;
      let url;
      try{ url = new URL(a.href, location.href); }catch(_){ return; }
      if(url.origin !== location.origin && url.protocol !== 'file:') return;
      if(url.protocol !== location.protocol) return;
      if(url.pathname === location.pathname) return; /* link ke bagian di halaman yang sama */
      e.preventDefault();
      document.body.classList.add('page-leave');
      setTimeout(() => { location.href = a.href; }, 220);
    });
    window.addEventListener('pageshow', () => document.body.classList.remove('page-leave'));
  }

  /* 7. Easter egg: tombol D, kata rahasia, pesan di Console */
  const toast = (msg) => {
    const t = document.createElement('div');
    t.className = 'egg-toast';
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 2600);
  };
  const confetti = () => {
    if(reduce) return;
    const cv = document.createElement('canvas');
    cv.className = 'confetti-canvas';
    cv.width = window.innerWidth; cv.height = window.innerHeight;
    document.body.appendChild(cv);
    const ctx = cv.getContext('2d');
    const colors = ['#3B9EFF', '#2277CC', '#7CC0FF', '#FFFFFF', '#1565C0'];
    const parts = Array.from({ length: 140 }, () => ({
      x: Math.random() * cv.width, y: -20 - Math.random() * cv.height * 0.4,
      w: 6 + Math.random() * 6, h: 8 + Math.random() * 8,
      vx: -1.5 + Math.random() * 3, vy: 2 + Math.random() * 4,
      r: Math.random() * Math.PI, vr: -0.2 + Math.random() * 0.4,
      c: colors[Math.floor(Math.random() * colors.length)]
    }));
    const t0 = performance.now();
    (function frame(now){
      const life = (now - t0) / 3500;
      ctx.clearRect(0, 0, cv.width, cv.height);
      parts.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.r += p.vr;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
        ctx.globalAlpha = Math.max(0, 1 - Math.max(0, life - 0.6) / 0.4);
        ctx.fillStyle = p.c; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      if(life < 1) requestAnimationFrame(frame); else cv.remove();
    })(t0);
  };
  const secrets = {
    figma: () => { confetti(); toast('Pixel perfect! 🎨'); },
    halo: () => toast('Halo juga! Terima kasih sudah mampir 👋'),
    biru: () => toast('Biru itu warna favorit saya 💙')
  };
  let typed = '';
  document.addEventListener('keydown', (e) => {
    if(e.ctrlKey || e.metaKey || e.altKey) return;
    const tag = (e.target.tagName || '').toLowerCase();
    if(tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;
    if(e.key.length !== 1) return;
    const k = e.key.toLowerCase();
    if(k === 'd' && !e.repeat){
      const btn = document.getElementById('themeToggleBtn');
      if(btn) btn.click();
    }
    typed = (typed + k).slice(-12);
    Object.keys(secrets).forEach(word => {
      if(typed.endsWith(word)){ typed = ''; secrets[word](); }
    });
  });
  try{
    console.log('%cHalo, kamu suka mengintip kode ya? 👀', 'font-size:15px;font-weight:700;color:#3B9EFF;');
    console.log('%cSaya Radhitya, UI/UX Designer. Kalau tertarik bekerja sama, hubungi saya lewat bagian Kontak.', 'font-size:12px;color:#8B93A7;');
    console.log('%cTips: tekan D untuk ganti tema, atau coba ketik "figma" 😉', 'font-size:12px;color:#8B93A7;');
  }catch(_){}

  /* 5. Bar progres scroll di bawah navbar */
  const headerEl = document.querySelector('header');
  if(headerEl){
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    headerEl.appendChild(bar);
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      bar.style.transform = `scaleX(${p})`;
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    window.addEventListener('load', update);
    update();
  }

  if(!finePointer || reduce) return;

  /* 3. Kursor halus (lingkaran mengikuti kursor, membesar di atas elemen interaktif) */
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  ring.setAttribute('aria-hidden', 'true');
  document.body.appendChild(ring);
  let mx = -100, my = -100, rx = -100, ry = -100, shown = false;
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    if(!shown){ shown = true; rx = mx; ry = my; ring.classList.add('show'); }
    const hot = e.target.closest && e.target.closest('a, button, .project-card, .mobile-card, .cert-card, .theme-toggle');
    ring.classList.toggle('hot', !!hot);
  }, { passive: true });
  document.addEventListener('mouseleave', () => { ring.classList.remove('show'); shown = false; });
  document.addEventListener('mousedown', () => ring.classList.add('down'));
  document.addEventListener('mouseup', () => ring.classList.remove('down'));
  (function loop(){
    rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  })();

  /* 4. Efek miring 3D pada kartu (berlaku juga untuk kartu yang dibuat lewat JS) */
  const TILT_SEL = '.project-card, .mobile-card, .cert-card';
  let active = null, saved = null;
  document.addEventListener('mousemove', (e) => {
    const card = e.target.closest && e.target.closest(TILT_SEL);
    if(active && active !== card) resetTilt();
    if(!card) return;
    if(active !== card){
      active = card;
      saved = { transition: card.style.transition, delay: card.style.transitionDelay, transform: card.style.transform };
      card.style.transition = 'transform .12s ease-out, border-color .18s ease, box-shadow .3s ease';
      card.style.transitionDelay = '0ms';
    }
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg) translateY(-3px)`;
  }, { passive: true });
  function resetTilt(){
    if(!active) return;
    const c = active; active = null;
    c.style.transition = saved.transition;
    c.style.transitionDelay = saved.delay;
    c.style.transform = saved.transform;
  }
  document.addEventListener('mouseleave', resetTilt);
  /* 8. Efek pencahayaan: cahaya lembut mengikuti kursor + kartu menyala saat disorot */
  const light = document.createElement('div');
  light.className = 'cursor-light';
  const bg = document.querySelector('.bg-anim');
  (bg || document.body).appendChild(light);
  let lx = window.innerWidth / 2, ly = window.innerHeight / 3, tx = lx, ty = ly;
  document.addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; light.classList.add('on'); }, { passive: true });
  document.addEventListener('mouseleave', () => light.classList.remove('on'));
  (function lightLoop(){
    lx += (tx - lx) * 0.1; ly += (ty - ly) * 0.1;
    light.style.setProperty('--lx', lx.toFixed(1) + 'px');
    light.style.setProperty('--ly', ly.toFixed(1) + 'px');
    requestAnimationFrame(lightLoop);
  })();
  const GLOW_SEL = '.project-card, .mobile-card, .cert-card, .tool-card, .stat-card, .cv-card';
  document.addEventListener('mousemove', (e) => {
    const card = e.target.closest && e.target.closest(GLOW_SEL);
    if(!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - r.left).toFixed(0) + 'px');
    card.style.setProperty('--my', (e.clientY - r.top).toFixed(0) + 'px');
  }, { passive: true });
})();