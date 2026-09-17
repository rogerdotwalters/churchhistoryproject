/* ==========================================================
   Church History Timeline — Core — helpers, constants, state, lookups & predicates
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

/* ---------------- Shorthand helpers ---------------- */
const $ = (sel, root) => (root || document).querySelector(sel);
const $all = (sel, root) => Array.from((root || document).querySelectorAll(sel));
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const on = (el, ev, fn, opts) => el.addEventListener(ev, fn, opts);

function formatYear(y) {
  if (y === null || y === undefined) return "?";
  return y < 0 ? `${Math.abs(y)} BC` : `${y} AD`;
}
function escapeHtml(str) {
  return String(str == null ? "" : str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

/* ---------------- "Search on Google" buttons (panels + articles) ---------------- */
function googleSearchUrl(query) {
  return "https://www.google.com/search?q=" + encodeURIComponent(query);
}
function googleSearchButton(query, opts) {
  opts = opts || {};
  const cls = "jump-btn google-search-btn" + (opts.extraClass ? " " + opts.extraClass : "");
  return `<a class="${cls}" href="${googleSearchUrl(query)}" target="_blank" rel="noopener noreferrer">&#128269; Search on Google &#8599;</a>`;
}

/* ---------------- Domain / view constants ---------------- */
const DOMAIN_MIN = 1;
const DOMAIN_MAX = 2036;
const BASE_PPY = 5;              // pixels-per-year at zoom = 1
const MIN_MARKER_SPACING = 74;   // px
const ROW_HEIGHT = 44;           // px per lane
const NODE_GAP = 14;             // px gap required between nodes in same lane

const MARKER_STEPS = [1000, 500, 200, 100, 50, 25, 10, 5, 2, 1];

/* ---------------- Lookups built from data.js ---------------- */
const peopleById = new Map(PEOPLE.map((p) => [p.id, p]));
const worksById = new Map(WORKS.map((w) => [w.id, w]));
const movementsById = new Map(MOVEMENTS.map((m) => [m.id, m]));
const eventsById = new Map(EVENTS.map((e) => [e.id, e]));

/* ---------------- Bible Books dataset (bible-data.js) ----------------
   Normalized alongside EVENTS so both datasets can share one rendering
   pipeline (map nodes, mobile list, search, filters). Each item is
   tagged with a `.source` ("church" | "bible") so shared code can tell
   them apart; field names (name/startYear/endYear/category/importance/
   summary/description/tags/sources) already line up between the two
   data files. ---------------------------------------------------- */
EVENTS.forEach((e) => { e.source = "church"; });
BIBLE_BOOKS.forEach((b) => { b.source = "bible"; });
const bibleBooksById = new Map(BIBLE_BOOKS.map((b) => [b.id, b]));
const ALL_ITEMS = EVENTS.concat(BIBLE_BOOKS);

function categoryColor(item) {
  if (item.source === "bible") return (BIBLE_CATEGORIES[item.category] || {}).color || "#777";
  return (CATEGORIES[item.category] || {}).color || "#777";
}
function categoryLabel(item) {
  if (item.source === "bible") return (BIBLE_CATEGORIES[item.category] || {}).label || item.category;
  return (CATEGORIES[item.category] || {}).label || item.category;
}
function slug(str) { return String(str == null ? "" : str).replace(/\s+/g, "-"); }

function openTimelineItem(id) {
  if (eventsById.has(id)) openEventPanel(id);
  else if (bibleBooksById.has(id)) openBibleBookPanel(id);
}

function activeItems() {
  if (state.dataSource === "bible") return BIBLE_BOOKS;
  if (state.dataSource === "combined") return ALL_ITEMS;
  return EVENTS;
}
function itemActiveForDataSource(item) {
  return state.dataSource === "combined" || item.source === state.dataSource;
}

// Reverse-map: which movements is an event associated with?
// (direct membership in a movement's relatedEvents, OR the event
// features a person who belongs to that movement)
const eventMovementMap = new Map();
EVENTS.forEach((e) => eventMovementMap.set(e.id, new Set()));
MOVEMENTS.forEach((m) => {
  (m.relatedEvents || []).forEach((eid) => {
    if (eventMovementMap.has(eid)) eventMovementMap.get(eid).add(m.id);
  });
  (m.notablePeople || []).forEach((pid) => {
    const person = peopleById.get(pid);
    if (!person) return;
    (person.relatedEvents || []).forEach((eid) => {
      if (eventMovementMap.has(eid)) eventMovementMap.get(eid).add(m.id);
    });
  });
});

function getEraForYear(year) {
  for (const era of ERAS) {
    if (year >= era.startYear && year < era.endYear) return era;
  }
  return year < ERAS[0].startYear ? ERAS[0] : ERAS[ERAS.length - 1];
}

/* ---------------- Application state ---------------- */
const state = {
  zoom: 1,
  panX: 0,
  panY: 0,
  viewportW: 0,
  viewportH: 0,
  dragging: false,
  dragMoved: false,
  lastX: 0,
  lastY: 0,
  selectedEventId: null,
  lifespanPerson: null,
  mobileMode: false,
  dataSource: "church", // "church" | "bible" | "combined"
  filters: {
    eras: new Set(),
    categories: new Set(),
    regions: new Set(),
    movements: new Set(),
    genres: new Set(),
    consensus: new Set()
  }
};

/* ---------------- Filtering ---------------- */
function passesFilters(item) {
  const f = state.filters;
  if (f.eras.size) {
    const era = getEraForYear(item.startYear);
    if (!f.eras.has(era.id)) return false;
  }
  if (item.source === "bible") {
    if (f.genres.size && !f.genres.has(item.category)) return false;
    if (f.consensus.size && !f.consensus.has(item.authorshipConsensus)) return false;
    return true;
  }
  if (f.categories.size && !f.categories.has(item.category)) return false;
  if (f.regions.size && !f.regions.has(item.region)) return false;
  if (f.movements.size) {
    const movs = eventMovementMap.get(item.id) || new Set();
    let match = false;
    for (const m of f.movements) if (movs.has(m)) { match = true; break; }
    if (!match) return false;
  }
  return true;
}

function anyFilterActive() {
  const f = state.filters;
  return f.eras.size || f.categories.size || f.regions.size || f.movements.size || f.genres.size || f.consensus.size;
}
