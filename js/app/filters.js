/* ==========================================================
   Church History Timeline — Filters & Data-Source Toggle — filter chip UI and the Church/Bible/Combined segmented control
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

/* ---------------- Filter chip UI ---------------- */
function buildChipGroup(container, items, activeSet, opts) {
  opts = opts || {};
  container.innerHTML = "";
  items.forEach((item) => {
    const chip = document.createElement("div");
    chip.className = "chip" + (activeSet.has(item.id) ? " active" : "");
    chip.innerHTML = (opts.dot ? `<span class="dot" style="background:${opts.dot(item)}"></span>` : "") + escapeHtml(item.label);
    on(chip, "click", () => {
      if (activeSet.has(item.id)) activeSet.delete(item.id); else activeSet.add(item.id);
      chip.classList.toggle("active");
      renderLanes();
      renderMobileList();
    });
    container.appendChild(chip);
  });
}

function renderFilterChips() {
  buildChipGroup($("#filter-era .filter-chip-row"),
    ERAS.map((e) => ({ id: e.id, label: e.label })), state.filters.eras);

  buildChipGroup($("#filter-category .filter-chip-row"),
    Object.entries(CATEGORIES).map(([key, c]) => ({ id: key, label: c.label })),
    state.filters.categories, { dot: (item) => CATEGORIES[item.id].color });

  buildChipGroup($("#filter-region .filter-chip-row"),
    REGIONS.map((r) => ({ id: r, label: r })), state.filters.regions);

  buildChipGroup($("#filter-movement .filter-chip-row"),
    MOVEMENTS.map((m) => ({ id: m.id, label: m.name })), state.filters.movements);

  buildChipGroup($("#filter-genre .filter-chip-row"),
    Object.entries(BIBLE_CATEGORIES).map(([key, c]) => ({ id: key, label: c.label })),
    state.filters.genres, { dot: (item) => BIBLE_CATEGORIES[item.id].color });

  buildChipGroup($("#filter-consensus .filter-chip-row"),
    Object.keys(AUTHORSHIP_CONSENSUS_LABELS).map((key) => ({ id: key, label: key })),
    state.filters.consensus);

  updateFilterGroupVisibility();
}

function updateFilterGroupVisibility() {
  const showChurch = state.dataSource !== "bible";
  const showBible = state.dataSource !== "church";
  $("#filter-category").style.display = showChurch ? "" : "none";
  $("#filter-region").style.display = showChurch ? "" : "none";
  $("#filter-movement").style.display = showChurch ? "" : "none";
  $("#filter-genre").style.display = showBible ? "" : "none";
  $("#filter-consensus").style.display = showBible ? "" : "none";
}

/* ---------------- Data source toggle (Church / Bible / Combined) ---------------- */
function setDataSource(source) {
  if (!["church", "bible", "combined"].includes(source)) return;
  state.dataSource = source;
  $all("#datasource-toggle .seg-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.source === source);
  });
  renderLegend();
  updateFilterGroupVisibility();
  renderLanes();
  if (state.mobileMode) renderMobileList();
}
$all("#datasource-toggle .seg-btn").forEach((btn) => {
  on(btn, "click", () => setDataSource(btn.dataset.source));
});

/* ---------------- Filter drawer toggle ---------------- */
$("#filter-toggle-btn").addEventListener("click", () => {
  $("#filter-drawer").classList.toggle("open");
  $("#filter-toggle-btn").classList.toggle("active");
});
$("#filter-clear-btn").addEventListener("click", () => {
  state.filters.eras.clear();
  state.filters.categories.clear();
  state.filters.regions.clear();
  state.filters.movements.clear();
  renderFilterChips();
  renderLanes();
  renderMobileList();
});
