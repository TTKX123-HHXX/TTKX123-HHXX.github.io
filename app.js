const pages = [
  { title: "封面", chapter: "封面", file: "官宣！东莞城市学院2025年招生简章.webp" },
  { title: "办学特色", chapter: "办学特色", file: "官宣！东莞城市学院2025年招生简章 (2).png" },
  { title: "招生计划", chapter: "招生计划", file: "官宣！东莞城市学院2025年招生简章 (3).webp" },
  { title: "报考指南", chapter: "报考指南", file: "官宣！东莞城市学院2025年招生简章 (4).webp" },
  { title: "学院介绍", chapter: "学院介绍", file: "官宣！东莞城市学院2025年招生简章 (5).png" },
  { title: "专业介绍", chapter: "专业介绍", file: "官宣！东莞城市学院2025年招生简章 (6).webp" },
  { title: "校园环境", chapter: "校园生活", file: "官宣！东莞城市学院2025年招生简章 (7).webp" },
  { title: "校园生活", chapter: "校园生活", file: "官宣！东莞城市学院2025年招生简章 (8).png" },
  { title: "国际交流", chapter: "国际交流", file: "官宣！东莞城市学院2025年招生简章 (9).webp" },
  { title: "就业发展", chapter: "就业发展", file: "官宣！东莞城市学院2025年招生简章 (10).webp" },
  { title: "招生问答", chapter: "招生问答", file: "官宣！东莞城市学院2025年招生简章 (11).webp" },
  { title: "招生问答续页", chapter: "招生问答", file: "官宣！东莞城市学院2025年招生简章 (12).webp" },
  { title: "招生政策", chapter: "招生问答", file: "官宣！东莞城市学院2025年招生简章 (13).webp" },
  { title: "报到须知", chapter: "报考指南", file: "官宣！东莞城市学院2025年招生简章 (14).webp" },
  { title: "校园服务", chapter: "校园生活", file: "官宣！东莞城市学院2025年招生简章 (15).webp" },
  { title: "联系方式", chapter: "联系方式", file: "官宣！东莞城市学院2025年招生简章 (16).webp" },
];

const chapters = [
  { label: "01", title: "封面", page: 0 },
  { label: "02", title: "办学特色", page: 1 },
  { label: "03", title: "招生计划", page: 2 },
  { label: "04", title: "报考指南", page: 3 },
  { label: "05", title: "学院介绍", page: 4 },
  { label: "06", title: "专业介绍", page: 5 },
  { label: "07", title: "校园生活", page: 6 },
  { label: "08", title: "国际交流", page: 8 },
  { label: "09", title: "就业发展", page: 9 },
  { label: "10", title: "招生问答", page: 10 },
  { label: "11", title: "联系方式", page: 15 },
];

const pageList = document.querySelector("#pageList");
const chapterRail = document.querySelector("#chapterRail");
const inlineToc = document.querySelector("#inlineToc");
const drawerList = document.querySelector("#drawerList");
const stageNav = document.querySelector("#stageNav");
const tocDrawer = document.querySelector("#tocDrawer");
const viewer = document.querySelector("#viewer");
const viewerImage = document.querySelector("#viewerImage");
const viewerTitle = document.querySelector("#viewerTitle");
const currentTitle = document.querySelector("#currentTitle");
const currentCount = document.querySelector("#currentCount");
const bottomCount = document.querySelector("#bottomCount");
const progressBar = document.querySelector("#progressBar");
const miniProgress = document.querySelector("#miniProgress");
const previewKicker = document.querySelector("#previewKicker");
const previewTitle = document.querySelector("#previewTitle");
const previewCover = document.querySelector("#previewCover");
const featureImage = document.querySelector("#featureImage");
const thumbStrip = document.querySelector("#thumbStrip");
const toast = document.querySelector("#toast");

let activeIndex = 0;
let viewerIndex = 0;
let toastTimer;

function imagePath(file) {
  return `./${file}`;
}

function pageLabel(index) {
  return `第 ${String(index + 1).padStart(2, "0")} 页`;
}

function renderStageNav() {
  stageNav.innerHTML = chapters
    .slice(0, 5)
    .map(
      (chapter) => `
        <button type="button" data-action="jump-page" data-index="${chapter.page}">
          <span>${chapter.label} ${chapter.title}</span>
          <i></i>
        </button>
      `,
    )
    .join("");
}

function renderToc() {
  const list = chapters
    .map(
      (chapter) => `
        <button class="toc-row" type="button" data-action="jump-page" data-index="${chapter.page}">
          <b>${chapter.label}</b>
          <span>${chapter.title}</span>
          <small>${String(chapter.page + 1).padStart(2, "0")}</small>
          <i>›</i>
        </button>
      `,
    )
    .join("");

  inlineToc.innerHTML = list;
  drawerList.innerHTML = list;
}

function renderChapters() {
  chapterRail.innerHTML = chapters
    .slice(0, 8)
    .map((chapter) => {
      const page = pages[chapter.page];
      return `
        <button class="chapter-card" type="button" data-action="jump-page" data-index="${chapter.page}">
          <img src="${imagePath(page.file)}" alt="" loading="lazy" />
          <span>${chapter.label}</span>
          <strong>${chapter.title}</strong>
        </button>
      `;
    })
    .join("");
}

function renderPreviewThumbs() {
  thumbStrip.innerHTML = pages
    .slice(0, 6)
    .map(
      (page, index) => `
        <button class="thumb" type="button" data-action="select-preview" data-index="${index}">
          <img src="${imagePath(page.file)}" alt="${page.title}" loading="lazy" />
          <span>${index + 1}</span>
        </button>
      `,
    )
    .join("");
}

function renderPages() {
  pageList.innerHTML = pages
    .map(
      (page, index) => `
        <article class="brochure-page" id="page-${index + 1}" data-index="${index}">
          <div class="page-head">
            <div>
              <span>${pageLabel(index)}</span>
              <strong>${page.title}</strong>
            </div>
            <button type="button" data-action="open-viewer" data-index="${index}">放大</button>
          </div>
          <button class="image-button" type="button" data-action="open-viewer" data-index="${index}" aria-label="放大查看${page.title}">
            <img src="${imagePath(page.file)}" alt="${page.title}" loading="${index < 2 ? "eager" : "lazy"}" />
          </button>
        </article>
      `,
    )
    .join("");
}

function updatePreview(index) {
  const nextIndex = Math.max(0, Math.min(index, pages.length - 1));
  const page = pages[nextIndex];
  previewKicker.textContent = `${String(nextIndex + 1).padStart(2, "0")} ${page.chapter}`;
  previewTitle.textContent = page.title;
  previewCover.src = imagePath(page.file);
  previewCover.alt = page.title;
  featureImage.src = imagePath(page.file);
  featureImage.alt = page.title;

  document.querySelectorAll(".thumb").forEach((thumb, thumbIndex) => {
    thumb.classList.toggle("is-active", thumbIndex === nextIndex);
  });

  document.querySelectorAll("[data-action='open-viewer']").forEach((button) => {
    if (button.closest(".gallery-card") || button.classList.contains("pager-pill")) {
      button.dataset.index = String(nextIndex);
    }
  });
}

function setActivePage(index) {
  const nextIndex = Math.max(0, Math.min(index, pages.length - 1));
  activeIndex = nextIndex;
  const page = pages[nextIndex];
  const percent = ((nextIndex + 1) / pages.length) * 100;

  currentTitle.textContent = page.title;
  currentCount.textContent = `第 ${nextIndex + 1} / ${pages.length} 页`;
  bottomCount.textContent = `${nextIndex + 1} / ${pages.length}`;
  progressBar.style.width = `${percent}%`;
  miniProgress.style.width = `${percent}%`;
  updatePreview(nextIndex);
}

function scrollToPage(index) {
  const nextIndex = Math.max(0, Math.min(index, pages.length - 1));
  const page = document.querySelector(`#page-${nextIndex + 1}`);
  if (!page) return;
  page.scrollIntoView({ behavior: "smooth", block: "start" });
  setActivePage(nextIndex);
}

function openMenu() {
  tocDrawer.classList.add("is-open");
  tocDrawer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  tocDrawer.classList.remove("is-open");
  tocDrawer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function openViewer(index) {
  viewerIndex = Math.max(0, Math.min(index, pages.length - 1));
  const page = pages[viewerIndex];
  viewerImage.src = imagePath(page.file);
  viewerImage.alt = page.title;
  viewerTitle.textContent = `${pageLabel(viewerIndex)} ${page.title}`;
  viewer.classList.add("is-open");
  viewer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeViewer() {
  viewer.classList.remove("is-open");
  viewer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function moveViewer(step) {
  openViewer(viewerIndex + step);
}

async function sharePage() {
  const shareData = {
    title: "东莞城市学院 2025 招生简章",
    text: "东莞城市学院 2025 年本科招生简章手机 H5",
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }

  try {
    await navigator.clipboard.writeText(window.location.href);
    showToast("链接已复制，可以发到微信。");
  } catch {
    showToast("请手动复制浏览器地址栏链接。");
  }
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2200);
}

function handleAction(event) {
  const target = event.target.closest("[data-action]");
  if (!target) return;

  const action = target.dataset.action;
  const index = Number(target.dataset.index);

  if (action === "toggle-menu") openMenu();
  if (action === "close-menu") closeMenu();
  if (action === "first-page") scrollToPage(0);
  if (action === "contact-page") scrollToPage(pages.length - 1);
  if (action === "jump-page") {
    closeMenu();
    window.setTimeout(() => scrollToPage(index), 120);
  }
  if (action === "select-preview") setActivePage(index);
  if (action === "open-viewer") openViewer(Number.isNaN(index) ? activeIndex : index);
  if (action === "close-viewer") closeViewer();
  if (action === "viewer-prev") moveViewer(-1);
  if (action === "viewer-next") moveViewer(1);
  if (action === "share") sharePage();
}

function setupObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      setActivePage(Number(visible.target.dataset.index));
    },
    { threshold: [0.35, 0.55, 0.75] },
  );

  document.querySelectorAll(".brochure-page").forEach((page) => observer.observe(page));
}

document.addEventListener("click", handleAction);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    closeViewer();
  }
  if (viewer.classList.contains("is-open") && event.key === "ArrowLeft") moveViewer(-1);
  if (viewer.classList.contains("is-open") && event.key === "ArrowRight") moveViewer(1);
});

renderStageNav();
renderToc();
renderChapters();
renderPreviewThumbs();
renderPages();
setupObserver();
setActivePage(0);
