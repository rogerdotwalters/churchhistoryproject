/* ==========================================================
   Church History Timeline — Global Search — the search index across all five entity types and the search dropdown UI
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
   Global search
   ========================================================== */
const searchIndex = [
  ...EVENTS.map((e) => ({
    type: "event", id: e.id, label: e.name,
    meta: `${formatYear(e.startYear)} · ${e.category}`,
    color: (CATEGORIES[e.category] || {}).color || "#777",
    text: (e.name + " " + e.summary + " " + (e.tags || []).join(" ") + " " + e.category + " " + e.region).toLowerCase()
  })),
  ...PEOPLE.map((p) => ({
    type: "person", id: p.id, label: p.name,
    meta: `${formatYear(p.birthYear)} – ${p.deathYear ? formatYear(p.deathYear) : "present"}`,
    color: "#c99a1e",
    text: (p.name + " " + (p.publicDescription || "") + " " + (p.timelineRole || "")).toLowerCase()
  })),
  ...WORKS.map((w) => ({
    type: "work", id: w.id, label: w.title,
    meta: `${formatYear(w.year)} · ${w.type || "Work"}`,
    color: "#2E9E4F",
    text: (w.title + " " + (w.description || "") + " " + (w.type || "")).toLowerCase()
  })),
  ...MOVEMENTS.map((m) => ({
    type: "movement", id: m.id, label: m.name,
    meta: `From ${formatYear(m.startYear)}`,
    color: "#7C3AED",
    text: (m.name + " " + (m.description || "")).toLowerCase()
  })),
  ...BIBLE_BOOKS.map((b) => ({
    type: "bible", id: b.id, label: b.name,
    meta: `${formatYear(b.startYear)} · ${categoryLabel(b)}`,
    color: categoryColor(b),
    text: (b.name + " " + (b.fullTitle || "") + " " + (b.summary || "") + " " + (b.traditionalAuthor || "") + " " + (b.tags || []).join(" ")).toLowerCase()
  }))
];
const TYPE_LABELS = { event: "Events", person: "People", work: "Works", movement: "Movements", bible: "Bible Books" };

const searchInput = $("#search-input");
const searchResultsEl = $("#search-results");

function runSearch(query) {
  const q = query.trim().toLowerCase();
  if (!q) { searchResultsEl.classList.remove("open"); searchResultsEl.innerHTML = ""; return; }
  const matches = searchIndex.filter((item) => item.text.includes(q));
  matches.sort((a, b) => a.label.localeCompare(b.label));
  if (!matches.length) {
    searchResultsEl.innerHTML = `<div class="search-empty">No matches for “${escapeHtml(query)}”.</div>`;
    searchResultsEl.classList.add("open");
    return;
  }
  const groups = { event: [], person: [], work: [], movement: [], bible: [] };
  matches.forEach((m) => groups[m.type].push(m));
  let html = "";
  Object.keys(groups).forEach((type) => {
    const items = groups[type].slice(0, 12);
    if (!items.length) return;
    html += `<div class="search-group-label">${TYPE_LABELS[type]}</div>`;
    html += items.map((item) =>
      `<div class="search-result-item" data-type="${item.type}" data-id="${item.id}">
         <span class="search-result-swatch" style="background:${item.color}"></span>
         <span class="search-result-text">
           <div class="search-result-name">${escapeHtml(item.label)}</div>
           <div class="search-result-meta">${escapeHtml(item.meta)}</div>
         </span>
       </div>`
    ).join("");
  });
  searchResultsEl.innerHTML = html;
  searchResultsEl.classList.add("open");

  $all(".search-result-item", searchResultsEl).forEach((el) => {
    on(el, "click", () => {
      const type = el.dataset.type, id = el.dataset.id;
      searchResultsEl.classList.remove("open");
      searchInput.value = "";
      $("#search-wrap").classList.remove("mobile-search-open");
      if (type === "event") {
        if (state.dataSource === "bible") setDataSource("combined");
        const e = eventsById.get(id);
        if (!state.mobileMode) jumpToYearRange(e.startYear, e.endYear);
        openEventPanel(id);
      } else if (type === "person") {
        const p = peopleById.get(id);
        jumpToYearRange(p.birthYear, p.deathYear || p.birthYear + 60);
        openPersonPanel(id);
      } else if (type === "work") {
        const w = worksById.get(id);
        if (w.year) jumpToYearRange(w.year - 5, w.year + 5);
        openWorkPanel(id);
      } else if (type === "movement") {
        const m = movementsById.get(id);
        jumpToYearRange(m.startYear, m.endYear || m.startYear + 150);
        openMovementPanel(id);
      } else if (type === "bible") {
        if (state.dataSource === "church") setDataSource("combined");
        const b = bibleBooksById.get(id);
        if (!state.mobileMode) jumpToYearRange(b.startYear, b.endYear);
        openBibleBookPanel(id);
      }
    });
  });
}

on(searchInput, "input", (e) => runSearch(e.target.value));
on(searchInput, "focus", (e) => { if (e.target.value.trim()) runSearch(e.target.value); });
document.addEventListener("click", (e) => {
  if (!e.target.closest("#search-wrap")) searchResultsEl.classList.remove("open");
});
