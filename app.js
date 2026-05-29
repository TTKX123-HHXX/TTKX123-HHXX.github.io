const pages = [
  { title: "封面", chapter: "封面", file: "page-01.webp" },
  { title: "办学特色", chapter: "办学特色", file: "page-02.png" },
  { title: "招生计划", chapter: "招生计划", file: "page-03.webp" },
  { title: "报考指南", chapter: "报考指南", file: "page-04.webp" },
  { title: "学院介绍", chapter: "学院介绍", file: "page-05.png" },
  { title: "专业介绍", chapter: "专业介绍", file: "page-06.webp" },
  { title: "校园环境", chapter: "校园生活", file: "page-07.webp" },
  { title: "校园生活", chapter: "校园生活", file: "page-08.png" },
  { title: "国际交流", chapter: "国际交流", file: "page-09.webp" },
  { title: "就业发展", chapter: "就业发展", file: "page-10.webp" },
  { title: "招生问答", chapter: "招生问答", file: "page-11.webp" },
  { title: "招生问答续页", chapter: "招生问答", file: "page-12.webp" },
  { title: "招生政策", chapter: "招生问答", file: "page-13.webp" },
  { title: "报到须知", chapter: "报考指南", file: "page-14.webp" },
  { title: "校园服务", chapter: "校园生活", file: "page-15.webp" },
  { title: "联系方式", chapter: "联系方式", file: "page-16.webp" },
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

const chapterGrid = document.querySelector("#chapterGrid");
const drawerList = document.querySelector("#drawerList");
const tocDrawer = document.querySelector("#tocDrawer");
const morePanel = document.querySelector("#morePanel");
const reader = document.querySelector("#reader");
const chaptersSection = document.querySelector("#chapters");
const pageStage = document.querySelector("#pageStage");
const readerImage = document.querySelector("#readerImage");
const readerTitle = document.querySelector("#readerTitle");
const readerCount = document.querySelector("#readerCount");
const bottomCount = document.querySelector("#bottomCount");
const progressBar = document.querySelector("#progressBar");
const viewer = document.querySelector("#viewer");
const viewerImage = document.querySelector("#viewerImage");
const viewerTitle = document.querySelector("#viewerTitle");
const toast = document.querySelector("#toast");

let activeIndex = 0;
let viewerIndex = 0;
let toastTimer;

function imagePath(file) {
  return `./${file}`;
}

function pageLabel(index) {
  return `第 ${index + 1} / ${pages.length} 页`;
}

function renderChapters() {
  const markup = chapters
    .map((chapter, index) => {
      const page = pages[chapter.page];
      return `
        <button class="chapter-card reveal" style="--delay:${index * 60}ms" type="button" data-action="jump-page" data-index="${chapter.page}">
          <img src="${imagePath(page.file)}" alt="" loading="lazy" />
          <span>${chapter.label}</span>
          <strong>${chapter.title}</strong>
        </button>
      `;
    })
    .join("");

  chapterGrid.innerHTML = markup;
}

function renderDrawer() {
  drawerList.innerHTML = chapters
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
}

function updateReader(index, direction = "next") {
  const nextIndex = Math.max(0, Math.min(index, pages.length - 1));
  const page = pages[nextIndex];
  activeIndex = nextIndex;

  pageStage.classList.remove("slide-next", "slide-prev");
  void pageStage.offsetWidth;
  pageStage.classList.add(direction === "prev" ? "slide-prev" : "slide-next");

  readerImage.src = imagePath(page.file);
  readerImage.alt = page.title;
  readerTitle.textContent = page.title;
  readerCount.textContent = pageLabel(nextIndex);
  bottomCount.textContent = `${nextIndex + 1} / ${pages.length}`;
  progressBar.style.width = `${((nextIndex + 1) / pages.length) * 100}%`;
}

function goToReader(index) {
  updateReader(index, index < activeIndex ? "prev" : "next");
  closeMenu();
  closeMore();
  document.body.classList.add("reading-mode");
  reader.classList.add("is-active");
  reader.setAttribute("aria-hidden", "false");
}

function showChapters() {
  closeMore();
  closeMenu();
  document.body.classList.remove("reading-mode");
  reader.classList.remove("is-active");
  reader.setAttribute("aria-hidden", "true");
  chaptersSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function backHome() {
  closeMore();
  closeMenu();
  document.body.classList.remove("reading-mode");
  reader.classList.remove("is-active");
  reader.setAttribute("aria-hidden", "true");
  document.querySelector("#top").scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeReader() {
  document.body.classList.remove("reading-mode");
  reader.classList.remove("is-active");
  reader.setAttribute("aria-hidden", "true");
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

function openMore() {
  morePanel.classList.add("is-open");
  morePanel.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeMore() {
  morePanel.classList.remove("is-open");
  morePanel.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function openViewer(index = activeIndex) {
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

function movePage(step) {
  const next = Math.max(0, Math.min(activeIndex + step, pages.length - 1));
  if (next === activeIndex) {
    showToast(step < 0 ? "已经是第一页" : "已经是最后一页");
    return;
  }
  updateReader(next, step < 0 ? "prev" : "next");
}

function moveViewer(step) {
  const next = Math.max(0, Math.min(viewerIndex + step, pages.length - 1));
  if (next === viewerIndex) return;
  viewerIndex = next;
  const page = pages[viewerIndex];
  viewerImage.src = imagePath(page.file);
  viewerImage.alt = page.title;
  viewerTitle.textContent = `${pageLabel(viewerIndex)} ${page.title}`;
}

async function sharePage() {
  closeMore();
  const shareData = {
    title: "东莞城市学院 2025 招生简章",
    text: "点击查看东莞城市学院 2025 年本科招生简章 H5",
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

  if (action === "show-chapters") showChapters();
  if (action === "back-home") backHome();
  if (action === "close-reader") closeReader();
  if (action === "toggle-menu") openMenu();
  if (action === "close-menu") closeMenu();
  if (action === "more") openMore();
  if (action === "close-more") closeMore();
  if (action === "jump-page") goToReader(Number.isNaN(index) ? 0 : index);
  if (action === "contact-page") goToReader(pages.length - 1);
  if (action === "prev-page") movePage(-1);
  if (action === "next-page") movePage(1);
  if (action === "open-viewer") openViewer(activeIndex);
  if (action === "close-viewer") closeViewer();
  if (action === "viewer-prev") moveViewer(-1);
  if (action === "viewer-next") moveViewer(1);
  if (action === "share") sharePage();
}

document.addEventListener("click", handleAction);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    closeMore();
    closeViewer();
  }
  if (event.key === "ArrowLeft") movePage(-1);
  if (event.key === "ArrowRight") movePage(1);
});

renderChapters();
renderDrawer();
updateReader(0);
