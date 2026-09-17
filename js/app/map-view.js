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
}

/* ---------------- DOM: static one-time builds ---------------- */
const lanesLayer = $("#lanes-layer");
const eventNodeEls = new Map();

function importanceClass(imp) {
  if (imp >= 9) return "node-xl";
  if (imp >= 7) return "node-lg";
  if (imp >= 5) return "";
  return "node-sm";
}
function importanceWidth(imp) {
  return clamp(64 + (imp || 5) * 11, 90, 210);
}

function createEventNodeEls() {
  ALL_ITEMS.forEach((item) => {
    const el = document.createElement("div");
    el.className = "event-node " + importanceClass(item.importance);
    el.style.background = categoryColor(item);
    el.dataset.id = item.id;
    el.innerHTML =
      `<span class="dot-year">${formatYear(item.startYear)}</span><span class="node-name">${escapeHtml(item.name)}</span>`;
    el.title = item.name;
    on(el, "click", (ev) => {
      ev.stopPropagation();
      if (state.dragMoved) return; // ignore click that ends a drag
      openTimelineItem(item.id);
    });
    lanesLayer.appendChild(el);
    eventNodeEls.set(item.id, el);
  });
}

function renderLegend() {
  const wrap = $("#legend-bar-items");
  let cats;
  if (state.dataSource === "church") cats = Object.entries(CATEGORIES);
  else if (state.dataSource === "bible") cats = Object.entries(BIBLE_CATEGORIES);
  else cats = Object.entries(CATEGORIES).concat(Object.entries(BIBLE_CATEGORIES));
  wrap.innerHTML = cats.map(([key, c]) =>
    `<div class="legend-bar-item"><span class="dot" style="background:${c.color}"></span>${escapeHtml(c.label)}</div>`
  ).join("");
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

  ALL_ITEMS.forEach((item) => {
    const pass = itemActiveForDataSource(item) && passesFilters(item);
    const el = eventNodeEls.get(item.id);
    if (!pass) {
      el.style.display = "none";
      return;
    }
    el.style.display = "flex";
    const width = importanceWidth(item.importance);
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
    item.el.style.left = item.cx + "px";
    item.el.style.top = top + "px";
    item.el.style.maxWidth = item.width + "px";
    item.el.style.zIndex = 10 + (item.evt.importance || 5);
    item.el.classList.toggle("selected", item.evt.id === state.selectedEventId);
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

on(area, "pointerdown", (e) => {
  if (e.target.closest(".event-node, .no-drag")) return; // let node/control clicks handle themselves
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
on(area, "pointerup", endDrag);
on(area, "pointercancel", endDrag);
on(area, "pointerleave", (e) => { if (state.dragging) endDrag(e); });

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
  closeSidePanel();
  renderLanes();
});

$("#works-library-btn").addEventListener("click", () => {
  location.hash = "#works";
});

window.addEventListener("resize", () => {
  const rect = area.getBoundingClientRect();
  state.viewportW = rect.width;
  state.viewportH = rect.height;
  renderLanes();
});
