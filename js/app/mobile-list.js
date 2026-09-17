/* ==========================================================
   Church History Timeline — Mobile List View — the touch-first row-by-row list, scrub rail, and its view-mode toggle
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

/* ==========================================================
   Mobile List View — an alternate, touch-first presentation
   of the timeline: a scrollable row-by-row event list with a
   drag-to-scrub rail on the right that jumps the list, plus a
   collapsible search dropdown (reuses the search bar/index
   above). Toggled via #view-toggle-btn; defaults on for
   narrow/touch viewports.
   ========================================================== */
const ERA_BAND_COLORS = {
  apostolic: "#4a3f2a", "ante-nicene": "#5c4d30", nicene: "#6e5934",
  medieval: "#836a3c", reformation: "#c99a1e", enlightenment: "#8f7040", modern: "#a4802a"
};

const mobileView = $("#mobile-view");
const mobileListWrap = $("#mobile-list-wrap");
const mobileList = $("#mobile-event-list");
const mobileEmptyState = $("#mobile-empty-state");
const mobileScrubber = $("#mobile-scrubber");
const mobileScrubberBands = $("#mobile-scrubber-bands");
const mobileScrubberThumb = $("#mobile-scrubber-thumb");
const mobileScrubBubble = $("#mobile-scrub-bubble");

let mobileRows = [];        // flat list mixing group-header + event rows, in display order
let mobileEraSegments = []; // [{groupId, label, color, startIdx, endIdx}]

function buildMobileRows() {
  // Grouped by era for Church-only and Combined views; grouped by genre
  // (Bible category) for Bible-only, since era buckets are meaningless
  // when every book falls in the same one or two eras.
  const groupByGenre = state.dataSource === "bible";
  const filtered = activeItems().filter(passesFilters).slice().sort((a, b) => a.startYear - b.startYear);
  const rows = [];
  const segments = [];
  let lastGroupId = null, seg = null;
  filtered.forEach((item) => {
    let groupId, groupLabel, groupColor, suffix;
    if (groupByGenre) {
      const cat = BIBLE_CATEGORIES[item.category] || {};
      groupId = item.category; groupLabel = cat.label || item.category; groupColor = cat.color || "#6e5934"; suffix = "";
    } else {
      const era = getEraForYear(item.startYear);
      groupId = era.id; groupLabel = era.label; groupColor = ERA_BAND_COLORS[era.id] || "#6e5934"; suffix = " Era";
    }
    if (groupId !== lastGroupId) {
      rows.push({ type: "group", label: groupLabel, suffix });
      seg = { groupId, label: groupLabel, color: groupColor, startIdx: rows.length - 1, endIdx: rows.length - 1 };
      segments.push(seg);
      lastGroupId = groupId;
    }
    rows.push({ type: "event", evt: item });
    seg.endIdx = rows.length - 1;
  });
  mobileRows = rows;
  mobileEraSegments = segments;
}

function renderMobileList() {
  buildMobileRows();
  if (!mobileRows.length) {
    mobileList.innerHTML = "";
    mobileEmptyState.style.display = "block";
    mobileScrubberBands.innerHTML = "";
    return;
  }
  mobileEmptyState.style.display = "none";

  const html = mobileRows.map((row, i) => {
    if (row.type === "group") {
      return `<div class="mobile-era-header" data-row-index="${i}">${escapeHtml(row.label)}${row.suffix}</div>`;
    }
    const evt = row.evt;
    const color = categoryColor(evt);
    return `<div class="mobile-event-row" data-row-index="${i}" data-id="${evt.id}">
      <span class="mobile-event-dot" style="background:${color}"></span>
      <span class="mobile-event-year">${formatYear(evt.startYear)}</span>
      <span class="mobile-event-main">
        <span class="mobile-event-title">${escapeHtml(evt.name)}</span>
        <span class="mobile-event-summary">${escapeHtml(evt.summary || "")}</span>
      </span>
    </div>`;
  }).join("");
  mobileList.innerHTML = html;

  mobileScrubberBands.innerHTML = mobileEraSegments.map((seg) => {
    const top = (seg.startIdx / mobileRows.length) * 100;
    const height = ((seg.endIdx - seg.startIdx + 1) / mobileRows.length) * 100;
    return `<div class="mobile-scrubber-band" style="top:${top}%;height:${height}%;background:${seg.color}"></div>`;
  }).join("");
}

// Event delegation: one listener handles every row, survives re-renders
on(mobileList, "click", (e) => {
  const row = e.target.closest(".mobile-event-row");
  if (!row) return;
  openTimelineItem(row.dataset.id);
});

function rowElByIndex(idx) {
  return mobileList.querySelector(`[data-row-index="${idx}"]`);
}

function scrollMobileListToEvent(id) {
  const idx = mobileRows.findIndex((r) => r.type === "event" && r.evt.id === id);
  if (idx < 0) return;
  const el = rowElByIndex(idx);
  if (el) mobileListWrap.scrollTop = Math.max(0, el.offsetTop - 60);
  updateThumb(mobileRows.length > 1 ? idx / (mobileRows.length - 1) : 0);
}

/* ---- Scrubber drag-to-jump ---- */
let scrubbing = false;

function updateThumb(frac) {
  mobileScrubberThumb.style.top = clamp(frac, 0, 1) * 100 + "%";
}

function scrubBubbleTextForIndex(idx) {
  const row = mobileRows[idx];
  if (!row) return "";
  if (row.type === "group") return row.label + row.suffix;
  if (state.dataSource === "bible") {
    return `${formatYear(row.evt.startYear)} · ${categoryLabel(row.evt)}`;
  }
  const era = getEraForYear(row.evt.startYear);
  return `${formatYear(row.evt.startYear)} · ${era.label}`;
}

function positionBubble(frac) {
  const rect = mobileScrubber.getBoundingClientRect();
  const parentRect = mobileView.getBoundingClientRect();
  const y = rect.top - parentRect.top + clamp(frac, 0, 1) * rect.height;
  mobileScrubBubble.style.top = clamp(y, 20, parentRect.height - 20) + "px";
}

function scrubToFraction(frac) {
  frac = clamp(frac, 0, 1);
  if (!mobileRows.length) return;
  const idx = Math.round(frac * (mobileRows.length - 1));
  const el = rowElByIndex(idx);
  if (el) mobileListWrap.scrollTop = Math.max(0, el.offsetTop - 4);
  updateThumb(frac);
  positionBubble(frac);
  mobileScrubBubble.textContent = scrubBubbleTextForIndex(idx);
}

function handleScrubPointer(e) {
  const rect = mobileScrubber.getBoundingClientRect();
  const frac = (e.clientY - rect.top) / rect.height;
  scrubToFraction(frac);
}

on(mobileScrubber, "pointerdown", (e) => {
  scrubbing = true;
  mobileScrubber.classList.add("active");
  mobileScrubBubble.classList.add("visible");
  try { mobileScrubber.setPointerCapture(e.pointerId); } catch (err) {}
  handleScrubPointer(e);
});
on(mobileScrubber, "pointermove", (e) => { if (scrubbing) handleScrubPointer(e); });
function endScrub(e) {
  if (!scrubbing) return;
  scrubbing = false;
  mobileScrubber.classList.remove("active");
  mobileScrubBubble.classList.remove("visible");
  try { mobileScrubber.releasePointerCapture(e.pointerId); } catch (err) {}
}
on(mobileScrubber, "pointerup", endScrub);
on(mobileScrubber, "pointercancel", endScrub);
on(mobileScrubber, "pointerleave", (e) => { if (scrubbing) endScrub(e); });

// Keep the thumb in sync when the list is scrolled directly (not via the rail)
let mobileScrollRaf = null;
on(mobileListWrap, "scroll", () => {
  if (scrubbing || mobileScrollRaf) return;
  mobileScrollRaf = requestAnimationFrame(() => {
    mobileScrollRaf = null;
    const max = mobileListWrap.scrollHeight - mobileListWrap.clientHeight;
    updateThumb(max > 0 ? mobileListWrap.scrollTop / max : 0);
  });
});

/* ---- View mode toggle ---- */
function setMobileMode(on) {
  state.mobileMode = on;
  $("#app").classList.toggle("mode-mobile", on);
  $("#view-toggle-btn").textContent = on ? "Map View" : "List View";
  $("#search-wrap").classList.remove("mobile-search-open");
  if (on) {
    renderMobileList();
    requestAnimationFrame(() => updateThumb(0));
  }
}

$("#view-toggle-btn").addEventListener("click", () => setMobileMode(!state.mobileMode));
$("#mobile-search-toggle-btn").addEventListener("click", () => {
  const open = $("#search-wrap").classList.toggle("mobile-search-open");
  if (open) searchInput.focus();
});
