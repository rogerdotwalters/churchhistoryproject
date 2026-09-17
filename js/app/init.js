/* ==========================================================
   Church History Timeline — Init — starts the app once the DOM is ready
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
   Loads LAST — every other file must already be loaded.
   ========================================================== */

"use strict";

/* ---------------- Hint banner auto-fade ---------------- */
setTimeout(() => {
  const hint = $("#hint-banner");
  if (hint) hint.style.opacity = "0";
}, 6000);

/* ---------------- Init ---------------- */
function init() {
  createEventNodeEls();
  renderLegend();
  renderFilterChips();
  computeInitialView();
  renderLanes();
  routeArticle();
  setMobileMode(isMobileViewport());
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
