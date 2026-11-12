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

// ===== 聯絡表單（Formspree） =====
const form = document.querySelector('.contact-form');
if (form) {
  const status = form.querySelector('.form-status');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (form.action.includes('YOUR_FORM_ID')) {
      status.textContent = 'The form isn’t connected yet. Add your Formspree form ID in contact/index.html.';
      return;
    }
    status.textContent = 'Sending…';
    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (res.ok) { form.reset(); status.textContent = 'Thanks!'; }
      else status.textContent = 'Your message wasn’t sent. Please try again, or email me directly.';
    } catch {
      status.textContent = 'Couldn’t connect. Check your internet connection and submit again.';
    }
  });
}
