/* ✏️ 作品清單：新增作品就複製一組 { ... }，圖片放在 images 資料夾
   category 是分類，會自動變成上方的篩選按鈕 */
const works = [
  { src: "images/work-1.svg", title: "作品名稱一", year: "2025", category: "攝影" },
  { src: "images/work-2.svg", title: "作品名稱二", year: "2025", category: "設計" },
  { src: "images/work-3.svg", title: "作品名稱三", year: "2024", category: "藝術" },
  { src: "images/work-4.svg", title: "作品名稱四", year: "2024", category: "攝影" },
  { src: "images/work-5.svg", title: "作品名稱五", year: "2023", category: "設計" },
  { src: "images/work-6.svg", title: "作品名稱六", year: "2023", category: "藝術" },
];

const gallery = document.getElementById("gallery");
const filters = document.querySelector(".filters");
let visible = works;

function renderGallery(list) {
  visible = list;
  gallery.innerHTML = "";
  list.forEach((w, i) => {
    const btn = document.createElement("button");
    btn.className = "work";
    btn.type = "button";
    btn.innerHTML = `<img src="${w.src}" alt="${w.title}" loading="lazy">
      <span class="title">${w.title}</span>
      <span class="meta">${w.category}，${w.year}</span>`;
    btn.addEventListener("click", () => openLightbox(i));
    gallery.appendChild(btn);
  });
}

function renderFilters() {
  const cats = ["全部", ...new Set(works.map(w => w.category))];
  if (cats.length <= 2) return; // 只有一種分類就不顯示篩選
  cats.forEach(cat => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = cat;
    b.setAttribute("aria-pressed", cat === "全部");
    b.addEventListener("click", () => {
      filters.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b));
      renderGallery(cat === "全部" ? works : works.filter(w => w.category === cat));
    });
    filters.appendChild(b);
  });
}

/* 放大檢視 */
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lb-img");
const lbCap = document.getElementById("lb-caption");
let current = 0;

function showWork(i) {
  current = (i + visible.length) % visible.length;
  const w = visible[current];
  lbImg.src = w.src;
  lbImg.alt = w.title;
  lbCap.textContent = `${w.title}，${w.year}`;
}
function openLightbox(i) { showWork(i); lb.showModal(); }

lb.querySelector(".lb-close").addEventListener("click", () => lb.close());
lb.querySelector(".lb-prev").addEventListener("click", () => showWork(current - 1));
lb.querySelector(".lb-next").addEventListener("click", () => showWork(current + 1));
lb.addEventListener("click", e => { if (e.target === lb) lb.close(); });
document.addEventListener("keydown", e => {
  if (!lb.open) return;
  if (e.key === "ArrowLeft") showWork(current - 1);
  if (e.key === "ArrowRight") showWork(current + 1);
});

/* 手機選單 */
const toggle = document.querySelector(".menu-toggle");
const nav = document.getElementById("nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
}));

/* 聯絡表單（透過 Formspree 寄送） */
const form = document.getElementById("contact-form");
const status = form.querySelector(".form-status");
form.addEventListener("submit", async e => {
  e.preventDefault();
  if (form.action.includes("YOUR_FORM_ID")) {
    status.textContent = "表單尚未設定：請在 index.html 填入 Formspree 表單代碼。";
    return;
  }
  status.textContent = "傳送中…";
  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      form.reset();
      status.textContent = "訊息已送出，謝謝你的來信！";
    } else {
      status.textContent = "訊息沒有送出，請稍後再試，或直接寄 Email 給我。";
    }
  } catch {
    status.textContent = "網路連線失敗，請檢查網路後再送出一次。";
  }
});

document.getElementById("year").textContent = new Date().getFullYear();
renderFilters();
renderGallery(works);
