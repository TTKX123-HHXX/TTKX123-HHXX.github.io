(function () {
  const imageBase = "./";

  const topStages = [
    { id: "home", label: "第1页", short: "首页", title: "首页" },
    { id: "admission", label: "第2页", short: "报考", title: "招生速览" },
    { id: "why", label: "第3页", short: "择校", title: "选择城院" },
    { id: "faq", label: "第4页", short: "问答", title: "家长问答" },
    { id: "contact", label: "第5页", short: "咨询", title: "招生咨询" },
  ];

  const stageById = Object.fromEntries(topStages.map((stage) => [stage.id, stage]));

  const pages = {
    home: {
      title: "首页",
      image: "publicimagessections01-cover.webp.png",
      stage: "home",
      layer: "第一层 · 第1页",
      hotspots: [
        { label: "了解学校", x: 19.5, y: 84.3, w: 31, h: 7.6, action: "go", target: "why" },
        { label: "查看专业", x: 49.5, y: 84.3, w: 31, h: 7.6, action: "go", target: "admission" },
      ],
    },
    admission: {
      title: "招生速览",
      image: "publicimagessections02-admission-overview.webp.png",
      stage: "admission",
      layer: "第一层 · 第2页",
      hotspots: [
        { label: "查看报考指南", x: 13, y: 86.1, w: 74, h: 8.2, action: "go", target: "guideChoice" },
      ],
    },
    why: {
      title: "选择城院",
      image: "publicimagessections03-why-dgcu.webp.png",
      stage: "why",
      layer: "第一层 · 第3页",
      hotspots: [
        { label: "继续了解学校", x: 13, y: 86.1, w: 74, h: 8.2, action: "go", target: "schoolIntro" },
      ],
    },
    faq: {
      title: "家长问答",
      image: "publicimagessections10-parent-faq.webp.png",
      stage: "faq",
      layer: "第一层 · 第4页",
      hotspots: [
        { label: "招生计划怎么看", x: 7, y: 45.6, w: 86, h: 4.8, action: "go", target: "plan" },
        { label: "宿舍环境怎么样", x: 7, y: 58.4, w: 86, h: 4.8, action: "go", target: "campus" },
        { label: "有哪些热门专业", x: 7, y: 71.2, w: 86, h: 4.8, action: "go", target: "hotMajors" },
        { label: "如何联系招生老师", x: 7, y: 84, w: 86, h: 4.8, action: "go", target: "contact" },
        { label: "联系招生老师", x: 26, y: 86.2, w: 48, h: 6.4, action: "go", target: "contact" },
      ],
    },
    contact: {
      title: "招生咨询",
      image: "publicimagessections11-contact.webp.png",
      stage: "contact",
      layer: "第一层 · 第5页",
      hotspots: [
        { label: "招生咨询电话", x: 6.5, y: 27, w: 40, h: 13, action: "toast", message: "请按页面电话拨打招生咨询，或长按识别二维码咨询。" },
        { label: "咨询二维码", x: 50.5, y: 27, w: 41.5, h: 18, action: "toast", message: "请在手机上长按二维码识别咨询。" },
      ],
    },
    guideChoice: {
      title: "报考指南选择页",
      type: "choice",
      stage: "admission",
      layer: "第二层 · 报考指南选择",
      heading: "查看报考指南",
      subheading: "先选择你最关心的内容，再进入对应页面。",
      eyebrow: "来自第2页 · 招生速览",
      actions: [
        { title: "选择学院 / 专业 / 省份", desc: "查看招生计划，适合已经有目标地区或专业的同学。", target: "plan", tone: "blue" },
        { title: "测一测适合哪个方向", desc: "从兴趣和优势出发，快速找到更合适的专业方向。", target: "quiz", tone: "green" },
        { title: "专业方向总览", desc: "48 个本科专业，先按四大方向快速理解。", target: "directions", tone: "purple" },
      ],
    },
    schoolIntro: {
      title: "认识东莞城市学院",
      image: "publicimagesmoremore-school-profile.webp.png",
      stage: "why",
      layer: "第二层 · 学校认识页",
      hotspots: [
        { label: "了解学校概况", x: 13, y: 86.1, w: 74, h: 8.2, action: "go", target: "schoolChoice" },
      ],
    },
    schoolChoice: {
      title: "学校概况选择页",
      type: "choice",
      stage: "why",
      layer: "第二层 · 学校概况选择",
      heading: "了解学校概况",
      subheading: "认识东莞城市学院，遇见更合适的大学生活。",
      eyebrow: "来自第3页 · 继续了解学校",
      variant: "school",
      actions: [
        { title: "教学设施", desc: "教学空间、实训平台与学习环境。", target: "campus", tone: "blue", image: "publicimagessections09-campus-learning.webp.png" },
        { title: "师资队伍", desc: "教师队伍、教学支持与育人力量。", target: "faculty", tone: "green", image: "publicimagesmoremore-faculty.webp.png" },
        { title: "科研能力", desc: "科研平台、实践项目与社会服务。", target: "research", tone: "purple", image: "publicimagesmoremore-research.webp.png" },
        { title: "培养体系", desc: "学生成长、就业发展与培养成果。", target: "trainingResults", tone: "orange", image: "publicimagesmoremore-training-results.webp.png" },
        { title: "校园文化", desc: "社团活动、竞赛舞台与青春氛围。", target: "campusCulture", tone: "green", image: "publicimagesmoremore-campus-culture.webp.png" },
        { title: "国际视野", desc: "国际交流、合作办学与海外资源。", target: "international", tone: "blue", image: "publicimagesmoremore-international.webp.png" },
        { title: "印象城院", desc: "校园风光、湖畔场景与城院记忆。", target: "campusScenery", tone: "purple", image: "publicimagesmoremore-campus-scenery.webp.png" },
      ],
    },
    directions: {
      title: "专业方向总览",
      image: "publicimagessections04-major-directions.webp.png",
      stage: "admission",
      layer: "第三层 · 专业方向总览",
      hotspots: [
        { label: "查看热门专业", x: 13, y: 86.1, w: 74, h: 8.2, action: "go", target: "hotMajors" },
      ],
    },
    quiz: {
      title: "专业测评",
      image: "publicimagessections05-major-quiz.webp.png",
      stage: "admission",
      layer: "第三层 · 专业测评",
      hotspots: [
        { label: "查看热门专业", x: 13, y: 86.1, w: 74, h: 8.2, action: "go", target: "hotMajors" },
      ],
    },
    hotMajors: {
      title: "2026热门专业方向推荐",
      image: "publicimagessections06-hot-majors.webp.png",
      stage: "admission",
      layer: "第三层 · 热门专业",
      hotspots: [
        { label: "返回报考指南选择", x: 13, y: 86.1, w: 74, h: 8.2, action: "go", target: "guideChoice" },
      ],
    },
    score: {
      title: "分数参考",
      image: "publicimagessections07-score-reference.webp.png",
      stage: "admission",
      layer: "第三层 · 分数参考",
      hotspots: [
        { label: "查看招生计划", x: 13, y: 86.1, w: 74, h: 8.2, action: "go", target: "plan" },
      ],
    },
    plan: {
      title: "招生计划",
      image: "publicimagessections08-admission-plan.webp.png",
      stage: "admission",
      layer: "第三层 · 招生计划",
      hotspots: [
        { label: "返回报考指南选择", x: 13, y: 86.1, w: 74, h: 8.2, action: "go", target: "guideChoice" },
      ],
    },
    campus: {
      title: "校园学习",
      image: "publicimagessections09-campus-learning.webp.png",
      stage: "why",
      layer: "第三层 · 校园学习",
      hotspots: [
        { label: "返回学校概况选择", x: 13, y: 86.1, w: 74, h: 8.2, action: "go", target: "schoolChoice" },
      ],
    },
    campusScenery: {
      title: "校园风光",
      image: "publicimagesmoremore-campus-scenery.webp.png",
      stage: "why",
      layer: "第三层 · 校园风光",
      hotspots: [
        { label: "返回学校概况选择", x: 13, y: 86.1, w: 74, h: 8.2, action: "go", target: "schoolChoice" },
      ],
    },
    faculty: {
      title: "师资力量",
      image: "publicimagesmoremore-faculty.webp.png",
      stage: "why",
      layer: "第三层 · 师资力量",
      hotspots: [
        { label: "返回学校概况选择", x: 13, y: 86.1, w: 74, h: 8.2, action: "go", target: "schoolChoice" },
      ],
    },
    research: {
      title: "科研实力",
      image: "publicimagesmoremore-research.webp.png",
      stage: "why",
      layer: "第三层 · 科研实力",
      hotspots: [
        { label: "返回学校概况选择", x: 13, y: 86.1, w: 74, h: 8.2, action: "go", target: "schoolChoice" },
      ],
    },
    trainingResults: {
      title: "培养成果",
      image: "publicimagesmoremore-training-results.webp.png",
      stage: "why",
      layer: "第三层 · 培养成果",
      hotspots: [
        { label: "查看培养成果", x: 13, y: 86.1, w: 74, h: 8.2, action: "back" },
      ],
    },
    campusCulture: {
      title: "校园文化",
      image: "publicimagesmoremore-campus-culture.webp.png",
      stage: "why",
      layer: "第三层 · 校园文化",
      hotspots: [
        { label: "返回学校概况选择", x: 13, y: 86.1, w: 74, h: 8.2, action: "go", target: "schoolChoice" },
      ],
    },
    international: {
      title: "国际交流",
      image: "publicimagesmoremore-international.webp.png",
      stage: "why",
      layer: "第三层 · 国际交流",
      hotspots: [
        { label: "了解国际交流", x: 13, y: 86.1, w: 74, h: 8.2, action: "back" },
      ],
    },
  };

  const pageImage = document.getElementById("pageImage");
  const choicePage = document.getElementById("choicePage");
  const hotspotsEl = document.getElementById("hotspots");
  const backBtn = document.getElementById("backBtn");
  const homeBtn = document.getElementById("homeBtn");
  const contactBtn = document.getElementById("contactBtn");
  const stageNav = document.getElementById("stageNav");
  const stageStatus = document.getElementById("stageStatus");
  const toast = document.getElementById("toast");
  const bgMusic = document.getElementById("bgMusic");
  let musicBtn;

  const historyStack = [];
  let currentPage = "home";
  let toastTimer = 0;
  let musicEnabled = true;

  if (new URLSearchParams(window.location.search).has("debug")) {
    document.body.classList.add("debug-hotspots");
  }

  function renderPage(pageId, shouldPush = true) {
    const nextPage = pages[pageId] ? pageId : "home";

    if (shouldPush && currentPage !== nextPage) {
      historyStack.push(currentPage);
    }

    currentPage = nextPage;
    const page = pages[currentPage];

    document.title = `${page.title} - 东莞城市学院招生 H5`;
    renderStage();

    if (page.type === "choice") {
      pageImage.removeAttribute("src");
      pageImage.alt = page.title;
      pageImage.classList.remove("is-changing");
      renderHotspots([]);
      renderChoice(page);
    } else {
      choicePage.hidden = true;
      pageImage.classList.add("is-changing");

      window.setTimeout(() => {
        pageImage.src = imageBase + page.image;
        pageImage.alt = page.title;
        renderHotspots(page.hotspots || []);
        pageImage.classList.remove("is-changing");
      }, 120);
    }

    backBtn.disabled = historyStack.length === 0;
    homeBtn.disabled = currentPage === "home";
  }

  function renderChoice(page) {
    choicePage.innerHTML = "";
    choicePage.className = `choice-page choice-page-${page.variant || "menu"}`;
    choicePage.hidden = false;

    const wrap = document.createElement("div");
    wrap.className = "choice-wrap";

    const logo = document.createElement("img");
    logo.className = "choice-logo";
    logo.src = `${imageBase}publicimagescommonlogo-dgcu.png.png`;
    logo.alt = "东莞城市学院";

    const eyebrow = document.createElement("p");
    eyebrow.className = "choice-eyebrow";
    eyebrow.textContent = page.eyebrow;

    const heading = document.createElement("h1");
    heading.textContent = page.heading;

    const subheading = document.createElement("p");
    subheading.className = "choice-subheading";
    subheading.textContent = page.subheading;

    const cards = document.createElement("div");
    cards.className = "choice-cards";

    page.actions.forEach((item, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `choice-card choice-card-${item.tone || "blue"}`;
      button.addEventListener("click", () => renderPage(item.target));

      const number = document.createElement("span");
      number.className = "choice-number";
      number.textContent = String(index + 1).padStart(2, "0");

      const text = document.createElement("span");
      text.className = "choice-text";

      const title = document.createElement("strong");
      title.textContent = item.title;

      const desc = document.createElement("span");
      desc.textContent = item.desc;

      text.append(title, desc);
      button.append(number, text);
      if (item.image) {
        const image = document.createElement("img");
        image.className = "choice-card-image";
        image.src = imageBase + item.image;
        image.alt = "";
        button.appendChild(image);
      }
      cards.appendChild(button);
    });

    wrap.append(logo, eyebrow, heading, subheading, cards);
    choicePage.appendChild(wrap);
  }

  function renderHotspots(hotspots) {
    hotspotsEl.innerHTML = "";
    hotspots.forEach((spot) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "hotspot";
      button.setAttribute("aria-label", spot.label);
      button.style.left = `${spot.x}%`;
      button.style.top = `${spot.y}%`;
      button.style.width = `${spot.w}%`;
      button.style.height = `${spot.h}%`;
      button.addEventListener("click", () => runAction(spot));
      hotspotsEl.appendChild(button);
    });
  }

  function renderStage() {
    const page = pages[currentPage];
    const activeStage = page.stage || "home";
    const stage = stageById[activeStage];

    stageNav.innerHTML = "";

    musicBtn = document.createElement("button");
    musicBtn.type = "button";
    musicBtn.className = "stage-tab stage-tab-music";
    musicBtn.setAttribute("aria-label", "播放或暂停背景音乐");
    musicBtn.innerHTML = `
      <span class="music-icon" aria-hidden="true">
        <svg viewBox="0 0 36 36" role="img">
          <path class="music-note" d="M22 7v17.2a4.7 4.7 0 1 1-2.8-4.3V10.2l10.2-2.4v4.7L22 14.2" />
          <path class="music-wave music-wave-one" d="M27.5 18.5c1.6 1.5 1.6 4.4 0 5.9" />
          <path class="music-wave music-wave-two" d="M31 15.2c3.1 3 3.1 9.5 0 12.5" />
        </svg>
      </span>`;
    musicBtn.addEventListener("click", toggleMusic);
    stageNav.appendChild(musicBtn);

    topStages.forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "stage-tab";
      button.dataset.active = item.id === activeStage ? "true" : "false";
      button.setAttribute("aria-current", item.id === activeStage ? "page" : "false");

      const shortLabel = document.createElement("strong");
      shortLabel.textContent = item.short;

      button.append(shortLabel);
      button.addEventListener("click", () => renderPage(item.id));
      stageNav.appendChild(button);
    });

    const back = document.createElement("button");
    back.type = "button";
    back.className = "stage-tab stage-tab-back";
    back.disabled = historyStack.length === 0;
    back.textContent = "返回";
    back.addEventListener("click", goBack);
    stageNav.appendChild(back);

    stageStatus.textContent = "";
    updateMusicState(!bgMusic.paused);
  }

  function runAction(action) {
    if (action.action === "go") {
      renderPage(action.target);
      return;
    }

    if (action.action === "back") {
      goBack();
      return;
    }

    if (action.action === "toast") {
      showToast(action.message);
    }
  }

  function goBack() {
    const previous = historyStack.pop();
    renderPage(previous || "home", false);
  }

  function showToast(message) {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 3200);
  }

  backBtn.addEventListener("click", goBack);
  homeBtn.addEventListener("click", () => renderPage("home"));
  contactBtn.addEventListener("click", () => renderPage("contact"));
  document.addEventListener("pointerdown", () => {
    if (musicEnabled) playMusic();
  }, { once: true });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && musicEnabled) playMusic();
  });

  Object.values(pages).forEach((page) => {
    if (!page.image) return;
    const img = new Image();
    img.src = imageBase + page.image;
  });

  renderPage("home", false);
  updateMusicState(false);
  playMusic();
  window.setTimeout(playMusic, 600);

  function toggleMusic() {
    musicEnabled = !musicEnabled;
    if (musicEnabled) {
      playMusic();
    } else {
      bgMusic.pause();
      updateMusicState(false);
    }
  }

  function playMusic() {
    if (!musicEnabled) return;

    bgMusic.volume = 0.42;
    bgMusic.play()
      .then(() => updateMusicState(true))
      .catch(() => updateMusicState(false));
  }

  function updateMusicState(isPlaying) {
    if (!musicBtn) return;
    musicBtn.dataset.playing = isPlaying ? "true" : "false";
    musicBtn.setAttribute("aria-pressed", isPlaying ? "true" : "false");
  }
})();
