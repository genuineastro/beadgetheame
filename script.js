/* ======================================================================
   CONFIG — edit everything here.
   ====================================================================== */
const CONFIG = {
  whatsapp: {
    number: "13068073839", // digits only, no +
    defaultMessage: "Hello Acharya Ji, I'd like to book a coaching session"
  },
  instagramUrl: "https://www.instagram.com/solutionbreakup",

  marqueeItems: [
    "Private One-to-One Coaching",
    "Communication & Conflict",
    "Rebuilding Trust",
    "UK & Canada Clients",
    "15+ Years Experience",
    "Fees Confirmed Before Booking"
  ],

  // Only genuine clients who agreed to be shown. Keep labels neutral.
  videoReviews: [
    { youtubeId: "rEKe_hckR-s", name: "Client, UK", role: "Client experience" },
    { youtubeId: "md5ZiP_q3IY", name: "Client, Canada", role: "Client experience" },
    { youtubeId: "y4YiHWbG-04", name: "Client Story", role: "Client experience" },
    { youtubeId: "laCedqqXQ_E", name: "Client Story", role: "Client experience" }
  ],

  // WhatsApp screenshots. Check none mention readings, remedies or outcome promises.
  chatReviews: [
    { img: "./assets/Whatsapp%20reviews/Review1.png", alt: "Client message 1" },
    { img: "./assets/Whatsapp%20reviews/Review2.png", alt: "Client message 2" },
    { img: "./assets/Whatsapp%20reviews/Review3.png", alt: "Client message 3" },
    { img: "./assets/Whatsapp%20reviews/Review4.png", alt: "Client message 4" }
  ],

  // Genuine reviews only, about the session experience (not results). Empty = hidden.
  // Format: { stars: 5, quote: "...", name: "First name", location: "City, Country", avatar: "" }
  quoteReviews: [],

  stickyCta: {
    enabled: true,
    heading: "Want to Talk It Through?",
    subtext: "Start a private conversation",
    buttonText: "Chat Now",
    showAfterScrollPx: 500,
    reopenEverySession: true
  }
};

/* Gallery images — hosted on your own site in ./assets/gallery/ */
const GALLERY_TRAVEL = [
  { label: "London Bridge, United Kingdom", img: "./assets/gallery/img-c-1.jpg" },
  { label: "London Eye, United Kingdom", img: "./assets/gallery/img-c-2.jpg" },
  { label: "Paris, France", img: "./assets/gallery/img-c-3.jpg" },
  { label: "Baku, Azerbaijan", img: "./assets/gallery/img-c-4.jpg" },
  { label: "Milan, Italy", img: "./assets/gallery/g1.jpg" },
  { label: "Canada", img: "./assets/gallery/g3.jpg" },
  { label: "Barcelona, Spain", img: "./assets/gallery/g4.jpg" }
];

const GALLERY_RECOGNITION = [
  { label: "Event", img: "./assets/award4.jpg" },
  { label: "With Clients in Paris, France", img: "./assets/award2.jpg" },
  { label: "With a Client from Spain", img: "./assets/award1.jpg" },
  { label: "London", img: "./assets/award3.jpg" }
];

/* ====================================================================== */

function waLink(message) {
  const text = encodeURIComponent(message || CONFIG.whatsapp.defaultMessage);
  return `https://wa.me/${CONFIG.whatsapp.number}?text=${text}`;
}

function starString(n) {
  return "★★★★★".slice(0, n) || "★★★★★";
}

/* ---------- header scroll state ---------- */
function initHeaderScroll() {
  const header = document.getElementById("siteHeader");
  if (!header) return;
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  });
}

/* ---------- wire WhatsApp / Instagram links ---------- */
function wireStaticLinks() {
  document.querySelectorAll("[data-wa]").forEach((el) => {
    const kind = el.getAttribute("data-wa");
    el.href = kind === "bare"
      ? `https://wa.me/${CONFIG.whatsapp.number}`
      : waLink(CONFIG.whatsapp.defaultMessage);
  });
  document.querySelectorAll("[data-ig]").forEach((el) => {
    el.href = CONFIG.instagramUrl;
  });
}

/* ---------- marquee ---------- */
function buildMarquee() {
  const marqueeEl = document.getElementById("marquee");
  if (!marqueeEl) return;
  let html = "";
  for (let r = 0; r < 2; r++) {
    CONFIG.marqueeItems.forEach((t) => {
      html += `<span><i class="fa-solid fa-circle"></i>${t}</span>`;
    });
  }
  marqueeEl.innerHTML = html;
}

/* ---------- review tabs ---------- */
function initReviewTabs() {
  document.querySelectorAll(".rev-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".rev-tab").forEach((t) => t.classList.remove("active"));
      document.querySelectorAll(".rev-panel").forEach((p) => p.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById("panel-" + tab.dataset.tab).classList.add("active");
    });
  });
}

/* ---------- video reviews ---------- */
function buildVideoReviews() {
  const scroller = document.getElementById("videoScroller");
  if (!scroller) return;

  scroller.innerHTML = CONFIG.videoReviews.map((v) => {
    const media = v.youtubeId
      ? `<iframe src="https://www.youtube.com/embed/${v.youtubeId}" title="Client video" allow="encrypted-media" allowfullscreen loading="lazy"></iframe>`
      : `<div class="v-thumb"><div class="play"><i class="fa-solid fa-play"></i></div><div class="placeholder-text">Video coming soon</div></div>`;
    return `
      <div class="v-item">
        <div class="v-card">${media}</div>
        <div class="v-name">${v.name}</div>
        <div class="v-role">${v.role}</div>
        <div class="v-underline"></div>
      </div>`;
  }).join("");
}

function initVideoScrollerNav() {
  const scroller = document.getElementById("videoScroller");
  const left = document.getElementById("videoLeft");
  const right = document.getElementById("videoRight");
  if (!scroller || !left || !right) return;
  left.addEventListener("click", () => scroller.scrollBy({ left: -250, behavior: "smooth" }));
  right.addEventListener("click", () => scroller.scrollBy({ left: 250, behavior: "smooth" }));
}

/* ---------- chat screenshots ---------- */
function buildChatReviews() {
  const scroller = document.getElementById("chatScroller");
  if (!scroller) return;
  scroller.innerHTML = CONFIG.chatReviews.map((c) => `
    <div class="chat-card"><img src="${c.img}" alt="${c.alt}" loading="lazy"></div>
  `).join("");
}

/* ---------- written reviews (hidden when empty) ---------- */
function buildQuoteReviews() {
  const scroller = document.getElementById("quoteScroller");
  const nav = document.getElementById("quoteNav");
  if (!scroller) return;

  if (!CONFIG.quoteReviews.length) {
    scroller.style.display = "none";
    if (nav) nav.style.display = "none";
    return;
  }

  scroller.innerHTML = CONFIG.quoteReviews.map((q) => `
    <div class="quote-card">
      <div class="stars">${starString(q.stars)}</div>
      <p class="q">"${q.quote}"</p>
      <div class="who">
        ${q.avatar ? `<img src="${q.avatar}" alt="${q.name}" loading="lazy">` : ""}
        <div><b>${q.name}</b><span>${q.location}</span></div>
      </div>
    </div>
  `).join("");
}

function initQuoteScrollerNav() {
  const qScroller = document.getElementById("quoteScroller");
  const leftBtn = document.getElementById("quoteLeft");
  const rightBtn = document.getElementById("quoteRight");
  if (!qScroller || !leftBtn || !rightBtn) return;
  leftBtn.addEventListener("click", () => qScroller.scrollBy({ left: -340, behavior: "smooth" }));
  rightBtn.addEventListener("click", () => qScroller.scrollBy({ left: 340, behavior: "smooth" }));
}

/* ---------- FAQ accordion ---------- */
function initFaqAccordion() {
  document.querySelectorAll(".faq-item").forEach((item) => {
    const a = item.querySelector(".faq-a");
    if (item.classList.contains("open")) a.style.maxHeight = a.scrollHeight + "px";
    item.querySelector(".faq-q").addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach((i) => {
        i.classList.remove("open");
        i.querySelector(".faq-a").style.maxHeight = 0;
      });
      if (!isOpen) {
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
      }
    });
  });
}

/* ---------- sticky mini CTA ---------- */
function initStickyCta() {
  const cfg = CONFIG.stickyCta;
  const card = document.getElementById("stickyCta");
  if (!cfg.enabled || !card) return;

  card.querySelector(".sticky-cta-heading").textContent = cfg.heading;
  card.querySelector(".sticky-cta-subtext").textContent = cfg.subtext;
  const btn = card.querySelector(".sticky-cta-btn");
  btn.innerHTML = `<i class="fa-brands fa-whatsapp"></i> ${cfg.buttonText}`;
  btn.href = waLink(CONFIG.whatsapp.defaultMessage);

  const closedKey = "stickyCtaClosed";
  let dismissed = sessionStorage.getItem(closedKey) === "1";

  card.querySelector(".sticky-cta-close").addEventListener("click", () => {
    card.classList.remove("visible");
    dismissed = true;
    if (!cfg.reopenEverySession) sessionStorage.setItem(closedKey, "1");
  });

  window.addEventListener("scroll", () => {
    if (!dismissed && window.scrollY > cfg.showAfterScrollPx) card.classList.add("visible");
  });
}

/* =========================================================
   GALLERY SLIDER
   (set up once; switching tabs swaps the images instead of
   adding duplicate click handlers and timers)
========================================================= */
const Gallery = (() => {
  let items = [];
  let currentIndex = 0;
  let autoplay = null;
  let touchStartX = 0;
  let track, dotsContainer, viewport;

  function cards() { return [...track.querySelectorAll(".gallery-card")]; }
  function dots() { return [...dotsContainer.querySelectorAll(".gallery-dot")]; }

  function render() {
    track.innerHTML = "";
    dotsContainer.innerHTML = "";

    items.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "gallery-card";
      card.innerHTML = `
        <img src="${item.img}" alt="${item.label}" loading="lazy">
        <div class="gallery-caption">${item.label}</div>`;
      track.appendChild(card);

      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "gallery-dot";
      dot.setAttribute("aria-label", `Show gallery image ${index + 1}`);
      dot.addEventListener("click", () => { goTo(index); startAutoplay(); });
      dotsContainer.appendChild(dot);
    });
  }

  function offsetFor(index) {
    const card = cards()[index];
    if (!card) return 0;
    return viewport.clientWidth / 2 - (card.offsetLeft + card.offsetWidth / 2);
  }

  function goTo(index) {
    const all = cards();
    if (!all.length) return;
    currentIndex = (index + all.length) % all.length;
    track.style.transform = `translate3d(${offsetFor(currentIndex)}px, 0, 0)`;
    all.forEach((c, i) => c.classList.toggle("active", i === currentIndex));
    dots().forEach((d, i) => d.classList.toggle("active", i === currentIndex));
  }

  function stopAutoplay() {
    if (autoplay) { clearInterval(autoplay); autoplay = null; }
  }

  function startAutoplay() {
    stopAutoplay();
    if (items.length > 1) autoplay = setInterval(() => goTo(currentIndex + 1), 3500);
  }

  function init() {
    track = document.getElementById("galleryTrack");
    dotsContainer = document.getElementById("galleryDots");
    viewport = document.querySelector(".gallery-viewport");
    if (!track || !dotsContainer || !viewport) return false;

    document.getElementById("galleryNext")?.addEventListener("click", () => { goTo(currentIndex + 1); startAutoplay(); });
    document.getElementById("galleryPrev")?.addEventListener("click", () => { goTo(currentIndex - 1); startAutoplay(); });

    viewport.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoplay();
    }, { passive: true });

    viewport.addEventListener("touchend", (e) => {
      const distance = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(distance) > 45) goTo(currentIndex + (distance > 0 ? 1 : -1));
      startAutoplay();
    }, { passive: true });

    window.addEventListener("resize", () => goTo(currentIndex));
    return true;
  }

  function setItems(newItems) {
    if (!track) return;
    items = newItems;
    currentIndex = 0;
    render();
    goTo(0);
    startAutoplay();
  }

  return { init, setItems };
})();

/* ---------- gallery tab selector ---------- */
function initGallerySelector() {
  document.querySelectorAll(".selector-card").forEach((card, i) => {
    card.addEventListener("click", () => {
      Gallery.setItems(i === 0 ? GALLERY_RECOGNITION : GALLERY_TRAVEL);
      document.querySelectorAll(".selector-card").forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
    });
  });
}

/* ---------- boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  wireStaticLinks();
  initHeaderScroll();
  buildMarquee();
  initReviewTabs();
  buildVideoReviews();
  initVideoScrollerNav();
  buildChatReviews();
  buildQuoteReviews();
  initQuoteScrollerNav();
  initFaqAccordion();
  initStickyCta();

  if (Gallery.init()) {
    Gallery.setItems(GALLERY_RECOGNITION);
    initGallerySelector();
  }
});
