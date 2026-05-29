const pages = [
  {
    title: "封面",
    file: "官宣！东莞城市学院2025年招生简章.webp",
  },
  {
    title: "办学愿景",
    file: "官宣！东莞城市学院2025年招生简章 (2).png",
  },
  {
    title: "简章第 3 页",
    file: "官宣！东莞城市学院2025年招生简章 (3).webp",
  },
  {
    title: "简章第 4 页",
    file: "官宣！东莞城市学院2025年招生简章 (4).webp",
  },
  {
    title: "简章第 5 页",
    file: "官宣！东莞城市学院2025年招生简章 (5).png",
  },
  {
    title: "简章第 6 页",
    file: "官宣！东莞城市学院2025年招生简章 (6).webp",
  },
  {
    title: "简章第 7 页",
    file: "官宣！东莞城市学院2025年招生简章 (7).webp",
  },
  {
    title: "简章第 8 页",
    file: "官宣！东莞城市学院2025年招生简章 (8).png",
  },
  {
    title: "简章第 9 页",
    file: "官宣！东莞城市学院2025年招生简章 (9).webp",
  },
  {
    title: "简章第 10 页",
    file: "官宣！东莞城市学院2025年招生简章 (10).webp",
  },
  {
    title: "简章第 11 页",
    file: "官宣！东莞城市学院2025年招生简章 (11).webp",
  },
  {
    title: "简章第 12 页",
    file: "官宣！东莞城市学院2025年招生简章 (12).webp",
  },
  {
    title: "简章第 13 页",
    file: "官宣！东莞城市学院2025年招生简章 (13).webp",
  },
  {
    title: "简章第 14 页",
    file: "官宣！东莞城市学院2025年招生简章 (14).webp",
  },
  {
    title: "简章第 15 页",
    file: "官宣！东莞城市学院2025年招生简章 (15).webp",
  },
  {
    title: "联系方式",
    file: "官宣！东莞城市学院2025年招生简章 (16).webp",
  },
];

const pageList = document.querySelector("#pageList");
const tocGrid = document.querySelector("#tocGrid");
const tocDrawer = document.querySelector("#tocDrawer");
const viewer = document.querySelector("#viewer");
const viewerImage = document.querySelector("#viewerImage");
const viewerTitle = document.querySelector("#viewerTitle");
const currentTitle = document.querySelector("#currentTitle");
const currentCount = document.querySelector("#currentCount");
const progressBar = document.querySelector("#progressBar");
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

function renderPages() {
  const pageMarkup = pages
    .map(
      (page, index) => `
        <article class="brochure-page" id="page-${index + 1}" data-index="${index}">
          <div class="page-head">
            <strong>${page.title}</strong>
            <span>${pageLabel(index)} / ${pages.length}</span>
          </div>
          <button class="image-button" type="button" data-action="open-viewer" data-index="${index}" aria-label="放大查看${page.title}">
            <img src="${imagePath(page.file)}" alt="${page.title}" loading="${index < 2 ? "eager" : "lazy"}" />
          </button>
          <p class="page-tip">点击图片可放大查看，适合手机逐页阅读。</p>
        </article>
      `,
    )
    .join("");

  const tocMarkup = pages
    .map(
      (page, index) => `
        <button class="toc-item" type="button" data-action="jump-page" data-index="${index}">
          <img src="${imagePath(page.file)}" alt="" loading="lazy" />
          <span>${pageLabel(index)}<br />${page.title}</span>
        </button>
      `,
    )
    .join("");

  pageList.innerHTML = pageMarkup;
  tocGrid.innerHTML = tocMarkup;
}

function setActivePage(index) {
  const nextIndex = Math.max(0, Math.min(index, pages.length - 1));
  activeIndex = nextIndex;
  currentTitle.textContent = pages[nextIndex].title;
  currentCount.textContent = `第 ${nextIndex + 1} / ${pages.length} 页`;
  progressBar.style.width = `${((nextIndex + 1) / pages.length) * 100}%`;
}

function scrollToPage(index) {
  const page = document.querySelector(`#page-${index + 1}`);
  if (!page) return;
  page.scrollIntoView({ behavior: "smooth", block: "start" });
  setActivePage(index);
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
    text: "东莞城市学院 2025 招生简章手机 H5",
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
    showToast("链接已复制，可以发给别人查看。");
  } catch {
    showToast("当前浏览器不支持自动复制，可手动复制地址栏链接。");
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
  if (action === "prev-page") scrollToPage(activeIndex - 1);
  if (action === "next-page") scrollToPage(activeIndex + 1);
  if (action === "jump-page") {
    closeMenu();
    window.setTimeout(() => scrollToPage(index), 120);
  }
  if (action === "open-viewer") openViewer(index);
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
    {
      root: null,
      threshold: [0.35, 0.55, 0.75],
    },
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

renderPages();
setupObserver();
setActivePage(0);
