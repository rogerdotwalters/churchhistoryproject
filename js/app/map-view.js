/* ==========================================================
   Church History Timeline — Map View — pan/zoom coordinate math, node rendering, era bands/axis, drag/wheel/pinch interaction
   Part of the split app logic (see js/app/ for the rest): core.js,
   map-view.js, filters.js, side-panel.js, article-view.js, search.js,
   mobile-list.js, init.js. These load as plain classic <script> tags
   (no bundler, no modules) in that exact order — like data.js's split
   files, they share one global scope by design, so a name defined in
   an earlier file (e.g. `$` or `state` from core.js) is a free
   variable here. Only core.js must load first; init.js must load
   last (it calls into every other file). Order between the others
   only matters for code that runs immediately at file-load time
   (rare — search.js's `searchIndex` build is the one case), not for
   code inside event-handler callbacks, which only ever runs after
   every file has finished loading.
   ========================================================== */

"use strict";

let minZoom = 0.08;
let maxZoom = 60;

/* ---------------- Coordinate math ---------------- */
function pixelsPerYear() { return BASE_PPY * state.zoom; }
function screenX(year) { return (year - DOMAIN_MIN) * pixelsPerYear() + state.panX; }
function yearAtScreenX(x) { return (x - state.panX) / pixelsPerYear() + DOMAIN_MIN; }

function clampPan() {
  const ppy = pixelsPerYear();
  const domainWidth = (DOMAIN_MAX - DOMAIN_MIN) * ppy;
  const pad = Math.max(state.viewportW * 0.6, 120);
  const minPanX = state.viewportW - domainWidth - pad;
  const maxPanX = pad;
  if (domainWidth + pad * 2 <= state.viewportW) {
    // whole domain fits comfortably: center it
    state.panX = (state.viewportW - domainWidth) / 2;
  } else {
    state.panX = clamp(state.panX, minPanX, maxPanX);
  }
  state.panY = clamp(state.panY, -(maxLanesEstimate() * ROW_HEIGHT), 40);
}

let lastLaneCount = 6;
function maxLanesEstimate() {
  return Math.max(lastLaneCount * ROW_HEIGHT, state.viewportH) / ROW_HEIGHT + 4;
}

function computeInitialView() {
  const area = $("#timeline-area").getBoundingClientRect();
  state.viewportW = area.width;
  state.viewportH = area.height;
  const domainWidth = DOMAIN_MAX - DOMAIN_MIN;
  const fitZoom = state.viewportW / (domainWidth * BASE_PPY) * 1.05;
  minZoom = Math.min(fitZoom * 0.9, 0.15);
  state.zoom = fitZoom;
  state.panX = state.viewportW * 0.02;
  state.panY = 0;
  clampPan();
  nodeScaleBaseZoom = state.zoom; // recalibrate the bubble zoom-scale baseline to the new fit (desktop + mobile)
}

/* ---------------- DOM: static one-time builds ---------------- */
const lanesLayer = $("#lanes-layer");
const eventNodeEls = new Map();

/* ---------------- Bubble base size (desktop: importance-based; mobile: uniform) ----------------
   These are the "resting" (zoom=baseline, slider=1x) dimensions. Actual
   on-screen size is computed fresh every renderLanes() call by
   nodeWidthPx()/nodeFontPx()/nodePaddingPx() below, which combine these
   bases with the zoom-linked scale factor (nodeZoomScaleFactor()), the
   mobile-only manual sliders, and a screen-relative cap so bubbles can
   never grow past a sane fraction of the viewport regardless of zoom. */
function importanceWidth(imp) {
  return clamp(120 + (imp || 5) * 18, 160, 320);
}
function importanceFontPx(imp) {
  if (imp >= 9) return 15;
  if (imp >= 7) return 13.5;
  if (imp >= 5) return 12;
  return 11;
}
function importancePadding(imp) {
  if (imp >= 9) return [9, 16];
  if (imp >= 7) return [7, 14];
  if (imp >= 5) return [5, 10];
  return [3, 8];
}

const MOBILE_NODE_BASE_WIDTH = 150;
const MOBILE_NODE_BASE_FONT = 12.5;
const MOBILE_NODE_BASE_PADDING = [6, 12];

// Absolute pixel floors/ceilings so a bubble is always "relevant to the
// screen": it can shrink or grow with zoom/sliders, but never past these.
// The fraction leaves headroom above the resting (1x) base sizes above —
// on a ~390px-wide phone that's a ~195px ceiling, comfortably above the
// 150px mobile base so the zoom-scale and Bubble Size slider both have
// visible room to work before a bubble gets capped down to "relevant to
// the screen" size.
const NODE_MIN_WIDTH = 60;
const NODE_MAX_WIDTH_FRACTION = 0.5; // of the current viewport width
const NODE_MIN_FONT = 9;
const NODE_MAX_FONT = 22;

function nodeWidthPx(item, mobile, zoomScale) {
  const base = mobile ? MOBILE_NODE_BASE_WIDTH : importanceWidth(item.importance);
  const sizeMult = mobile ? state.mobileSizeMultiplier : 1;
  const maxW = Math.max(NODE_MIN_WIDTH, state.viewportW * NODE_MAX_WIDTH_FRACTION);
  return clamp(base * zoomScale * sizeMult, NODE_MIN_WIDTH, maxW);
}
function nodeFontPx(item, mobile, zoomScale) {
  const base = mobile ? MOBILE_NODE_BASE_FONT : importanceFontPx(item.importance);
  const textMult = mobile ? state.mobileTextMultiplier : 1;
  return clamp(base * zoomScale * textMult, NODE_MIN_FONT, NODE_MAX_FONT);
}
function nodePaddingPx(item, mobile, zoomScale) {
  const [baseV, baseH] = mobile ? MOBILE_NODE_BASE_PADDING : importancePadding(item.importance);
  // Padding follows a gentler curve than width/font (sqrt of the zoom
  // scale) so bubbles don't turn into mostly-whitespace pills at high zoom.
  const factor = Math.sqrt(zoomScale);
  return [clamp(baseV * factor, 2, 16), clamp(baseH * factor, 6, 26)];
}

/* Neutralizes the desktop hover "pop out and expand" affordance on mobile,
   where bubbles are display-only (see handleMobileNodeTap below) — a
   touch's synthetic hover state would otherwise still trigger it even
   though tapping no longer opens anything. Also swaps the clickable
   pointer cursor for the map's own grab/grabbing cursor. Sizing itself is
   handled entirely by nodeWidthPx/nodeFontPx/nodePaddingPx above, not by
   this class. */
function applyNodeInteractionClass(el, mobile) {
  el.classList.toggle("mobile-noninteractive", mobile);
}

function createEventNodeEls() {
  ALL_ITEMS.forEach((item) => {
    const el = document.createElement("div");
    el.className = "event-node";
    el.style.background = categoryColor(item);
    el.dataset.id = item.id;
    el.innerHTML =
      `<span class="dot-year">${formatYear(item.startYear)}</span><span class="node-name">${escapeHtml(item.name)}</span>`;
    el.title = item.name;
    on(el, "click", (ev) => {
      ev.stopPropagation();
      if (isMobileViewport()) return; // mobile Map View: tap/double-tap handled by the area pointerup listener below, not this click listener (see the note there on pointer-capture retargeting)
      if (state.dragMoved) return; // ignore click that ends a drag
      openTimelineItem(item.id);
    });
    lanesLayer.appendChild(el);
    eventNodeEls.set(item.id, el);
  });
}

/* ---------------- Mobile map view: tap handling ----------------
   On narrow/touch viewports the timeline's bubbles become display-only:
   a single tap does nothing, so a finger can land anywhere — including
   right on top of a bubble — and still pan or pinch-zoom the map (see
   the pointerdown handler below, which no longer treats a node as a
   no-drag zone on mobile). The one interaction left is a double-tap on
   a bubble, which jumps to that same item's row in Mobile List View
   (mobile-list.js) instead of opening the side panel in place — List
   View remains the one place mobile users interact with item details;
   Map View on mobile is a pure pan/zoom atlas. */
let lastMobileTapId = null;
let lastMobileTapTime = 0;
const MOBILE_DOUBLE_TAP_MS = 450;

function handleMobileNodeTap(id) {
  const now = Date.now();
  if (lastMobileTapId === id && now - lastMobileTapTime < MOBILE_DOUBLE_TAP_MS) {
    lastMobileTapId = null;
    lastMobileTapTime = 0;
    goToListViewForItem(id);
  } else {
    lastMobileTapId = id;
    lastMobileTapTime = now;
  }
}

/* ---------------- Zoom-responsive bubble scale (desktop + mobile) ----------------
   Every bubble grows/shrinks together as the user zooms/pinches, on both
   desktop and mobile, so zooming in is a real way to read dense clusters
   instead of a no-op for bubble size. `nodeScaleBaseZoom` captures the
   zoom level at the initial fit-to-domain view (and again on "Reset
   View"), and the scale factor is relative to that baseline — a sqrt
   curve keeps the growth gentle. The factor itself is loosely clamped;
   what actually keeps a bubble "relevant to the screen" no matter how far
   zoomed in is the absolute/viewport-relative clamp applied per-node in
   nodeWidthPx()/nodeFontPx() above. */
let nodeScaleBaseZoom = null;
function nodeZoomScaleFactor() {
  if (!nodeScaleBaseZoom) nodeScaleBaseZoom = state.zoom || 1;
  const rel = state.zoom / nodeScaleBaseZoom;
  return clamp(Math.sqrt(rel), 0.5, 3.5);
}

/* ---------------- Color-key legend — also a category filter ----------------
   Each legend swatch is clickable: it toggles that category in/out of the
   same filter state the Filter drawer's chips use (state.filters.categories
   for Church categories, state.filters.genres for Bible genres), so the
   two stay in sync no matter which one the user touches. An empty filter
   set means "show everything" (matching passesFilters()'s existing
   semantics), so no legend item looks dimmed until at least one is picked. */
function renderLegend() {
  const wrap = $("#legend-bar-items");
  wrap.innerHTML = "";
  let cats;
  if (state.dataSource === "church") {
    cats = Object.entries(CATEGORIES).map(([key, c]) => ({ key, label: c.label, color: c.color, bible: false }));
  } else if (state.dataSource === "bible") {
    cats = Object.entries(BIBLE_CATEGORIES).map(([key, c]) => ({ key, label: c.label, color: c.color, bible: true }));
  } else {
    cats = Object.entries(CATEGORIES).map(([key, c]) => ({ key, label: c.label, color: c.color, bible: false }))
      .concat(Object.entries(BIBLE_CATEGORIES).map(([key, c]) => ({ key, label: c.label, color: c.color, bible: true })));
  }
  cats.forEach((cat) => {
    const activeSet = cat.bible ? state.filters.genres : state.filters.categories;
    const selected = activeSet.has(cat.key);
    const dimmed = activeSet.size > 0 && !selected;
    const el = document.createElement("div");
    el.className = "legend-bar-item" + (selected ? " selected" : "") + (dimmed ? " dimmed" : "");
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");
    el.title = `Filter by ${cat.label}`;
    el.innerHTML = `<span class="dot" style="background:${cat.color}"></span>${escapeHtml(cat.label)}`;
    on(el, "click", () => toggleLegendCategory(cat.key, cat.bible));
    on(el, "keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleLegendCategory(cat.key, cat.bible); }
    });
    wrap.appendChild(el);
  });
}

function toggleLegendCategory(key, isBible) {
  const activeSet = isBible ? state.filters.genres : state.filters.categories;
  if (activeSet.has(key)) activeSet.delete(key); else activeSet.add(key);
  renderLegend();
  renderFilterChips();
  renderLanes();
  if (state.mobileMode) renderMobileList();
}

/* ---------------- Rendering: era bands / axis / lanes ---------------- */
function renderEraBands() {
  const layer = $("#era-band-layer");
  layer.innerHTML = "";
  ERAS.forEach((era) => {
    const x1 = screenX(Math.max(era.startYear, DOMAIN_MIN));
    const x2 = screenX(Math.min(era.endYear, DOMAIN_MAX));
    if (x2 < -40 || x1 > state.viewportW + 40) return;
    const band = document.createElement("div");
    band.className = "era-band";
    band.style.left = x1 + "px";
    band.style.width = Math.max(2, x2 - x1) + "px";
    if (x2 - x1 > 60) band.textContent = era.label;
    layer.appendChild(band);
  });
}

function renderCenterLine() {
  const layer = $("#center-line");
  const todayX = screenX(2026);
  if (todayX >= -20 && todayX <= state.viewportW + 20) {
    layer.innerHTML = `<div style="position:absolute;left:${todayX}px;top:0;bottom:0;width:1px;background:rgba(232,194,87,0.35);"></div>
      <div style="position:absolute;left:${todayX + 4}px;top:2px;font-size:10px;color:#e8c257;opacity:0.7;">Today</div>`;
  } else {
    layer.innerHTML = "";
  }
}

function renderAxis() {
  const layer = $("#axis-layer");
  const ppy = pixelsPerYear();
  let step = MARKER_STEPS[0];
  for (const s of MARKER_STEPS) {
    if (s * ppy >= MIN_MARKER_SPACING) step = s; else break;
  }
  const startYear = Math.floor(yearAtScreenX(0) / step) * step;
  const endYear = Math.ceil(yearAtScreenX(state.viewportW) / step) * step;
  const frag = document.createDocumentFragment();
  for (let y = startYear; y <= endYear; y += step) {
    if (y < DOMAIN_MIN - step || y > DOMAIN_MAX + step) continue;
    const x = screenX(y);
    const marker = document.createElement("div");
    marker.className = "axis-marker" + (y % (step * 5) === 0 ? " major" : "");
    marker.style.left = x + "px";
    marker.textContent = formatYear(y);
    frag.appendChild(marker);
  }
  layer.innerHTML = "";
  layer.appendChild(frag);
}

function renderLifespanLayer() {
  const layer = $("#lifespan-layer");
  if (!state.lifespanPerson) { layer.innerHTML = ""; return; }
  const p = state.lifespanPerson;
  const birth = p.birthYear;
  const death = p.deathYear || Math.min(DOMAIN_MAX, birth + 90);
  const x1 = screenX(birth);
  const x2 = screenX(death);
  layer.innerHTML = `<div class="lifespan-track" style="left:${x1}px;width:${Math.max(3, x2 - x1)}px;"></div>
    <div style="position:absolute;left:${x1}px;top:14px;font-size:10px;color:#e8c257;white-space:nowrap;">${escapeHtml(p.name)} (${formatYear(birth)}–${p.deathYear ? formatYear(death) : "?"})</div>`;
}

function renderLanes() {
  clampPan();
  renderEraBands();
  renderCenterLine();
  renderAxis();
  renderLifespanLayer();
  updateZoomReadout();

  const ppy = pixelsPerYear();
  const filterActive = anyFilterActive();
  const visible = [];
  const mobile = isMobileViewport();
  const zoomScale = nodeZoomScaleFactor();

  ALL_ITEMS.forEach((item) => {
    const pass = itemActiveForDataSource(item) && passesFilters(item);
    const el = eventNodeEls.get(item.id);
    if (!pass) {
      el.style.display = "none";
      return;
    }
    el.style.display = "flex";
    const width = nodeWidthPx(item, mobile, zoomScale);
    const cx = screenX(item.startYear);
    visible.push({ evt: item, el, width, cx, left: cx - width / 2, right: cx + width / 2 });
  });

  // Lane assignment: greedy interval packing sorted by left edge, biased by importance (bigger/more important first within ties)
  visible.sort((a, b) => a.left - b.left || b.evt.importance - a.evt.importance);
  const laneRightEdge = [];
  visible.forEach((item) => {
    let lane = 0;
    while (lane < laneRightEdge.length && laneRightEdge[lane] + NODE_GAP > item.left) lane++;
    laneRightEdge[lane] = item.right;
    item.lane = lane;
  });
  lastLaneCount = Math.max(1, laneRightEdge.length);

  let onScreenCount = 0;
  visible.forEach((item) => {
    const top = 10 + item.lane * ROW_HEIGHT;
    const [padV, padH] = nodePaddingPx(item.evt, mobile, zoomScale);
    item.el.style.left = item.cx + "px";
    item.el.style.top = top + "px";
    // min-width pinned to the same value as max-width: without it, a
    // node whose text is shorter than its assigned width would just
    // shrink-to-fit at a bigger font-size, coupling the Text Size slider
    // to visible bubble width even though bubble width is only supposed
    // to change with the Bubble Size slider / zoom. Pinning both means
    // the box always renders at exactly item.width regardless of font
    // size — except on desktop hover, where the un-`!important` min-width
    // stays put while the hover rule's `max-width: 640px !important`
    // raises the ceiling, so a node with genuinely truncated text can
    // still pop open to show it in full.
    item.el.style.minWidth = item.width + "px";
    if (mobile) {
      // Inline !important is the only thing that can beat the base
      // .event-node:hover rule's own "640px !important" — a touch's
      // synthetic hover state must not pop a mobile bubble back open to
      // full width (see the .mobile-noninteractive:hover comment in
      // css/map-view.css for why this can't just be a CSS override).
      item.el.style.setProperty("max-width", item.width + "px", "important");
    } else {
      item.el.style.maxWidth = item.width + "px";
    }
    item.el.style.fontSize = nodeFontPx(item.evt, mobile, zoomScale) + "px";
    item.el.style.padding = padV + "px " + padH + "px";
    item.el.style.zIndex = 10 + (item.evt.importance || 5);
    item.el.classList.toggle("selected", item.evt.id === state.selectedEventId);
    applyNodeInteractionClass(item.el, mobile);
    const offscreen = item.cx < -160 || item.cx > state.viewportW + 160;
    item.el.classList.toggle("dimmed", false);
    if (offscreen) onScreenCount++; // not used further, kept for potential future virtualization
  });

  lanesLayer.style.transform = `translateY(${state.panY}px)`;
  $("#empty-state").style.display = (filterActive && visible.length === 0) ? "block" : "none";
}

function updateZoomReadout() {
  $("#zoom-readout").textContent = "Zoom: " + Math.round((pixelsPerYear() / BASE_PPY) * 100) + "%";
}

/* ---------------- Smooth "jump to" animation ---------------- */
let animFrame = null;
function animateViewTo(targetZoom, targetPanX, targetPanY, duration) {
  if (animFrame) cancelAnimationFrame(animFrame);
  const startZoom = state.zoom, startPanX = state.panX, startPanY = state.panY;
  const t0 = performance.now();
  duration = duration || 650;
  function step(now) {
    const t = clamp((now - t0) / duration, 0, 1);
    const e = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // easeInOutQuad
    state.zoom = startZoom + (targetZoom - startZoom) * e;
    state.panX = startPanX + (targetPanX - startPanX) * e;
    state.panY = startPanY + (targetPanY - startPanY) * e;
    renderLanes();
    if (t < 1) animFrame = requestAnimationFrame(step);
  }
  animFrame = requestAnimationFrame(step);
}

function jumpToYearRange(startYear, endYear) {
  const span = Math.max(6, (endYear || startYear) - startYear);
  const targetZoom = clamp((state.viewportW * 0.5) / (span * BASE_PPY), minZoom, maxZoom * 0.4);
  const midYear = startYear + (span / 2);
  const targetPanX = state.viewportW / 2 - (midYear - DOMAIN_MIN) * BASE_PPY * targetZoom;
  animateViewTo(targetZoom, targetPanX, 0, 700);
}

/* ---------------- Pan / zoom interaction ---------------- */
const area = $("#timeline-area");

// On mobile, a gesture that starts on a bubble and ends there without
// moving is a "tap" on that bubble's id — handled below via
// handleMobileNodeTap() instead of the node's own "click" listener.
// (Once `area.setPointerCapture()` below has been called for a gesture
// that started on a node, the browser retargets the resulting "click"
// event to `area` itself rather than the node — so on mobile, where a
// pan/pinch must be able to start right on top of a bubble, the node's
// own click listener can no longer be relied on to see mobile taps at
// all. Tracking the pointerdown target here and checking it on
// pointerup, alongside the existing dragMoved flag, sidesteps that
// retargeting entirely.)
let mobileTapCandidateId = null;

on(area, "pointerdown", (e) => {
  if (e.target.closest(".no-drag")) return; // let control clicks (buttons etc.) handle themselves
  const nodeEl = e.target.closest(".event-node");
  if (nodeEl && !isMobileViewport()) return; // desktop: let node clicks handle themselves
  // Mobile: a bubble is no longer a no-drag zone, so a drag/pan gesture can
  // start right on top of one — bubbles are display-only there (see
  // handleMobileNodeTap above), and this is exactly what fixes "hard to
  // scroll" when bubbles cover most of the screen.
  mobileTapCandidateId = (nodeEl && isMobileViewport()) ? nodeEl.dataset.id : null;
  state.dragging = true;
  state.dragMoved = false;
  state.lastX = e.clientX;
  state.lastY = e.clientY;
  area.classList.add("dragging");
  area.setPointerCapture(e.pointerId);
});
on(area, "pointermove", (e) => {
  if (!state.dragging) return;
  const dx = e.clientX - state.lastX;
  const dy = e.clientY - state.lastY;
  if (Math.abs(dx) > 2 || Math.abs(dy) > 2) state.dragMoved = true;
  state.panX += dx;
  state.panY += dy;
  state.lastX = e.clientX;
  state.lastY = e.clientY;
  renderLanes();
});
function endDrag(e) {
  if (!state.dragging) return;
  state.dragging = false;
  area.classList.remove("dragging");
  try { area.releasePointerCapture(e.pointerId); } catch (err) {}
  // Defer clearing dragMoved so the click event that immediately follows
  // this pointerup (which ends a real drag) still gets suppressed, while
  // future independent clicks on event nodes work normally again.
  setTimeout(() => { state.dragMoved = false; }, 0);
}
on(area, "pointerup", (e) => {
  const tapId = (isMobileViewport() && mobileTapCandidateId && !state.dragMoved) ? mobileTapCandidateId : null;
  endDrag(e);
  mobileTapCandidateId = null;
  if (tapId) handleMobileNodeTap(tapId);
});
on(area, "pointercancel", (e) => { mobileTapCandidateId = null; endDrag(e); });
on(area, "pointerleave", (e) => { mobileTapCandidateId = null; if (state.dragging) endDrag(e); });

on(area, "wheel", (e) => {
  e.preventDefault();
  const rect = area.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const yearAtMouse = yearAtScreenX(mouseX);
  const factor = Math.exp(-e.deltaY * 0.0016);
  const newZoom = clamp(state.zoom * factor, minZoom, maxZoom);
  state.zoom = newZoom;
  state.panX = mouseX - (yearAtMouse - DOMAIN_MIN) * pixelsPerYear();
  renderLanes();
}, { passive: false });

// Touch pinch-to-zoom
let pinchStartDist = null, pinchStartZoom = 1;
on(area, "touchstart", (e) => {
  if (e.touches.length === 2) {
    pinchStartDist = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
    pinchStartZoom = state.zoom;
  }
}, { passive: true });
on(area, "touchmove", (e) => {
  if (e.touches.length === 2 && pinchStartDist) {
    const dist = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
    const rect = area.getBoundingClientRect();
    const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left;
    const yearAtMid = yearAtScreenX(midX);
    state.zoom = clamp(pinchStartZoom * (dist / pinchStartDist), minZoom, maxZoom);
    state.panX = midX - (yearAtMid - DOMAIN_MIN) * pixelsPerYear();
    renderLanes();
  }
}, { passive: true });
on(area, "touchend", (e) => { if (e.touches.length < 2) pinchStartDist = null; });

$("#zoom-in-btn").addEventListener("click", () => zoomStep(1.35));
$("#zoom-out-btn").addEventListener("click", () => zoomStep(1 / 1.35));
function zoomStep(factor) {
  const cx = state.viewportW / 2;
  const yearAtMid = yearAtScreenX(cx);
  state.zoom = clamp(state.zoom * factor, minZoom, maxZoom);
  state.panX = cx - (yearAtMid - DOMAIN_MIN) * pixelsPerYear();
  renderLanes();
}

$("#reset-view-btn").addEventListener("click", () => {
  computeInitialView();
  state.selectedEventId = null;
  state.lifespanPerson = null;
  state.mobileSizeMultiplier = 1;
  state.mobileTextMultiplier = 1;
  if (bubbleSizeSlider) bubbleSizeSlider.value = "1";
  if (textSizeSlider) textSizeSlider.value = "1";
  closeSidePanel();
  renderLanes();
});

$("#works-library-btn").addEventListener("click", () => {
  location.hash = "#works";
});

/* ---------------- Manual Bubble Size / Text Size sliders (mobile Map View only) ----------------
   Layered on top of the automatic zoom-linked scaling above — see
   state.mobileSizeMultiplier/mobileTextMultiplier (core.js) and
   nodeWidthPx()/nodeFontPx() above. Only visible in mobile Map View
   (css/mobile-view.css), but harmless to wire up unconditionally. */
const bubbleSizeSlider = $("#bubble-size-slider");
const textSizeSlider = $("#text-size-slider");
on(bubbleSizeSlider, "input", (e) => {
  state.mobileSizeMultiplier = parseFloat(e.target.value);
  renderLanes();
});
on(textSizeSlider, "input", (e) => {
  state.mobileTextMultiplier = parseFloat(e.target.value);
  renderLanes();
});

window.addEventListener("resize", () => {
  const rect = area.getBoundingClientRect();
  state.viewportW = rect.width;
  state.viewportH = rect.height;
  renderLanes();
});
