// ===== 進場浮出動畫：元素進入畫面時播放一次 =====
(() => {
  const els = document.querySelectorAll('[data-anim]');
  const reveal = el => el.classList.add('in');
  if (!('IntersectionObserver' in window)) { els.forEach(reveal); return; }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  els.forEach(el => io.observe(el));
})();

// ===== 換頁淡入淡出（瀏覽器不支援 View Transitions 時的替代做法） =====
if (!('onpagereveal' in window)) {
  document.documentElement.classList.add('no-vt');
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.href === location.href) return;
    e.preventDefault();
    document.body.classList.add('leaving');
    setTimeout(() => { location.href = url.href; }, 350);
  });
  // 從上一頁返回時，避免畫面停在淡出狀態
  window.addEventListener('pageshow', () => document.body.classList.remove('leaving'));
}

// ===== 展開圖：滑到盒面時顯示作品圖 =====
document.querySelectorAll('.dieline .face').forEach(face => {
  const href = face.getAttribute('href');
  const label = face.nextElementSibling;
  const preview = label.nextElementSibling;
  const group = [face, preview];
  const on = () => {
    document.querySelectorAll('.is-on').forEach(el => el.classList.remove('is-on'));
    label.classList.add('is-on'); preview.classList.add('is-on');
  };
  const off = e => {
    if (e && group.includes(e.relatedTarget)) return;
    label.classList.remove('is-on'); preview.classList.remove('is-on');
  };
  face.addEventListener('mouseenter', on);
  face.addEventListener('focus', on);
  face.addEventListener('mouseleave', off);
  face.addEventListener('blur', () => off());
  preview.addEventListener('mouseleave', off);
});

// ===== 手機版選單 =====
const toggle = document.querySelector('.menu-toggle');
if (toggle) {
  const root = document.documentElement;
  const setOpen = open => {
    root.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  toggle.addEventListener('click', () => setOpen(!root.classList.contains('menu-open')));
  document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  window.addEventListener('pageshow', () => setOpen(false));
}

// ===== 影片：聲音開關、缺檔提示 =====
document.querySelectorAll('.shot-video').forEach(fig => {
  const v = fig.querySelector('video');
  fig.dataset.missing = v.dataset.file;
  const btn = fig.querySelector('.sound');
  if (btn) btn.addEventListener('click', () => {
    v.muted = !v.muted;
    btn.setAttribute('aria-pressed', !v.muted);
    btn.setAttribute('aria-label', v.muted ? 'Turn sound on' : 'Turn sound off');
  });
});

// ===== 放大檢視 =====
const lb = document.querySelector('.lightbox');
const lbImg = lb.querySelector('img');
let lbList = [], lbIndex = 0;
function lbShow(i) {
  lbIndex = (i + lbList.length) % lbList.length;
  lbImg.src = lbList[lbIndex].currentSrc || lbList[lbIndex].src;
  lbImg.alt = lbList[lbIndex].alt;
  lb.querySelector('.lb-prev').hidden = lb.querySelector('.lb-next').hidden = lbList.length < 2;
}
function lbOpen(list, i) { lbList = list; lbShow(i); lb.showModal(); }
lb.querySelector('.lb-close').addEventListener('click', () => lb.close());
lb.querySelector('.lb-prev').addEventListener('click', () => lbShow(lbIndex - 1));
lb.querySelector('.lb-next').addEventListener('click', () => lbShow(lbIndex + 1));
lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });

// ===== 輪播 =====
document.querySelectorAll('.slideshow').forEach(ss => {
  const slides = [...ss.querySelectorAll('.slide')];
  const imgs = slides.map(s => s.querySelector('img'));
  const count = ss.querySelector('.ss-count span');
  let i = 0;
  const go = n => {
    slides[i].classList.remove('is-active');
    i = (n + slides.length) % slides.length;
    slides[i].classList.add('is-active');
    count.textContent = i + 1;
    const nxt = imgs[(i + 1) % imgs.length]; if (nxt.loading === 'lazy') nxt.loading = 'eager';
  };
  slides[0].classList.add('is-active');
  ss.querySelector('.ss-prev').addEventListener('click', () => go(i - 1));
  ss.querySelector('.ss-next').addEventListener('click', () => go(i + 1));
  imgs.forEach((img, k) => img.addEventListener('click', () => lbOpen(imgs, k)));
  let x0 = null;
  ss.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  ss.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) go(dx < 0 ? i + 1 : i - 1);
    x0 = null;
  });
});

// 單張作品圖也可以點開放大
const shots = [...document.querySelectorAll('.shot img')];
shots.forEach((img, k) => { img.style.cursor = 'zoom-in'; img.addEventListener('click', () => lbOpen(shots, k)); });

document.addEventListener('keydown', e => {
  if (lb.open) {
    if (e.key === 'ArrowLeft') lbShow(lbIndex - 1);
    if (e.key === 'ArrowRight') lbShow(lbIndex + 1);
  }
});
