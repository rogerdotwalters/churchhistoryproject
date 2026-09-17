/* ==========================================================
   Church History Timeline — Side Panel — the slide-in quick-view panel for events, people, works, movements & Bible books
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
   Side panel: events, people, works, movements
   ========================================================== */
const sidePanel = $("#side-panel");
const sidePanelBody = $("#side-panel-body");

function openSidePanel(html) {
  sidePanelBody.innerHTML = html;
  sidePanel.classList.add("open");
  bindPanelLinks();
}
function closeSidePanel() {
  sidePanel.classList.remove("open");
  state.selectedEventId = null;
  state.lifespanPerson = null;
  renderLanes();
}
$("#side-panel-close").addEventListener("click", closeSidePanel);

function bindPanelLinks() {
  $all("[data-nav]", sidePanelBody).forEach((el) => {
    on(el, "click", () => {
      const [type, id] = el.dataset.nav.split(":");
      if (type === "event") openEventPanel(id);
      else if (type === "person") openPersonPanel(id);
      else if (type === "work") openWorkPanel(id);
      else if (type === "movement") openMovementPanel(id);
      else if (type === "bible") openBibleBookPanel(id);
    });
  });
  $all("[data-jump]", sidePanelBody).forEach((jumpBtn) => {
    on(jumpBtn, "click", () => {
      const [sy, ey] = jumpBtn.dataset.jump.split(":").map(Number);
      if (state.mobileMode) setMobileMode(false);
      jumpToYearRange(sy, ey);
    });
  });
  $all("[data-article]", sidePanelBody).forEach((el) => {
    on(el, "click", () => {
      const [type, id] = el.dataset.article.split(":");
      closeSidePanel();
      navigateToArticle(type, id);
    });
  });
}

function personChip(id) {
  const p = peopleById.get(id);
  if (!p) return "";
  const initials = p.name.split(" ").map((w) => w[0]).slice(0, 2).join("");
  return `<span class="person-chip" data-nav="person:${id}"><span class="avatar">${escapeHtml(initials)}</span>${escapeHtml(p.name)}</span>`;
}
function eventChip(id) {
  const e = eventsById.get(id);
  if (!e) return "";
  return `<span class="link-chip" data-nav="event:${id}">${escapeHtml(e.name)} · ${formatYear(e.startYear)}</span>`;
}
function workChip(id) {
  const w = worksById.get(id);
  if (!w) return "";
  return `<span class="link-chip" data-nav="work:${id}">${escapeHtml(w.title)}</span>`;
}
function movementChip(id) {
  const m = movementsById.get(id);
  if (!m) return "";
  return `<span class="link-chip" data-nav="movement:${id}">${escapeHtml(m.name)}</span>`;
}
function bibleBookChip(id) {
  const b = bibleBooksById.get(id);
  if (!b) return "";
  return `<span class="link-chip" data-nav="bible:${id}">${escapeHtml(b.name)}</span>`;
}

function section(title, innerHtml) {
  if (!innerHtml) return "";
  return `<div class="panel-section"><h4>${escapeHtml(title)}</h4>${innerHtml}</div>`;
}
function tagRow(tags) {
  if (!tags || !tags.length) return "";
  return `<div class="tag-row">${tags.map((t) => `<span class="tag-pill">#${escapeHtml(t)}</span>`).join("")}</div>`;
}
function listPlain(items) {
  if (!items || !items.length) return "";
  return `<ul class="list-plain">${items.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul>`;
}
function sourceList(sources) {
  if (!sources || !sources.length) return "";
  return sources.map((s) => `<div class="source-item">${escapeHtml(s)}</div>`).join("");
}

function openEventPanel(id) {
  const evt = eventsById.get(id);
  if (!evt) return;
  state.selectedEventId = id;
  state.lifespanPerson = null;
  const color = (CATEGORIES[evt.category] || {}).color || "#777";
  const dateStr = evt.startYear === evt.endYear
    ? formatYear(evt.startYear)
    : `${formatYear(evt.startYear)} – ${formatYear(evt.endYear)}`;
  const movs = Array.from(eventMovementMap.get(evt.id) || []);

  const html = `
    <span class="panel-category-badge" style="background:${color}">${escapeHtml(evt.category)}</span>
    <div class="panel-title">${escapeHtml(evt.name)}</div>
    <div class="panel-dates">${dateStr} &nbsp;•&nbsp; ${escapeHtml(evt.region || "")}</div>
    <div class="panel-summary">${escapeHtml(evt.summary)}</div>
    <div class="panel-action-row">
      <button class="jump-btn read-article-btn" data-article="event:${id}">Read Full Article &rarr;</button>
      ${googleSearchButton(evt.name + " church history")}
    </div>
    ${section("Description", `<p>${escapeHtml(evt.description || "")}</p>`)}
    ${section("People Involved", (evt.notablePersons || []).map(personChip).join(""))}
    ${section("Related Works", (evt.relatedWorks || []).map(workChip).join(""))}
    ${section("Related Movements", movs.map(movementChip).join(""))}
    ${section("Related Events", (evt.relatedEvents || []).map(eventChip).join(""))}
    ${section("Tags", tagRow(evt.tags))}
    ${section("Sources", sourceList(evt.sources))}
  `;
  openSidePanel(html);
  renderLanes();
  if (state.mobileMode) scrollMobileListToEvent(id);
}

function openPersonPanel(id) {
  const p = peopleById.get(id);
  if (!p) return;
  state.selectedEventId = null;
  state.lifespanPerson = p;
  const lifespanStr = `${formatYear(p.birthYear)} – ${p.deathYear ? formatYear(p.deathYear) : "present"}`;
  const html = `
    <span class="panel-category-badge" style="background:#c99a1e">Person</span>
    <div class="panel-title">${escapeHtml(p.name)}</div>
    <div class="panel-dates">${lifespanStr}</div>
    <div class="lifespan-badge">${escapeHtml(p.timelineRole || "")}</div>
    <div class="panel-action-row">
      <button class="jump-btn" data-jump="${p.birthYear}:${p.deathYear || p.birthYear + 60}">Show lifespan on timeline</button>
      <button class="jump-btn read-article-btn" data-article="person:${id}">Read Full Article &rarr;</button>
      ${googleSearchButton(p.name + " church history")}
    </div>
    ${section("Biography", `<p>${escapeHtml(p.publicDescription || "")}</p>`)}
    ${section("Contributions", listPlain(p.contributions))}
    ${section("Theological Positions", listPlain(p.theologicalPositions))}
    ${section("Notable Works", (p.notableWorks || []).map(workChip).join(""))}
    ${section("Associated Movements", (p.associatedMovements || []).map(movementChip).join(""))}
    ${section("Related Events", (p.relatedEvents || []).map(eventChip).join(""))}
    ${section("Sources", sourceList(p.sources))}
  `;
  openSidePanel(html);
  renderLanes();
}

function openWorkPanel(id) {
  const w = worksById.get(id);
  if (!w) return;
  state.selectedEventId = null;
  state.lifespanPerson = null;
  const html = `
    <span class="panel-category-badge" style="background:#2E9E4F">${escapeHtml(w.type || "Work")}</span>
    <div class="panel-title">${escapeHtml(w.title)}</div>
    <div class="panel-dates">${formatYear(w.year)}${w.authorId ? " &nbsp;•&nbsp; by " : ""}</div>
    ${w.authorId ? `<div>${personChip(w.authorId)}</div>` : ""}
    <div class="panel-summary">${escapeHtml(w.description || "")}</div>
    <div class="panel-action-row">
      <button class="jump-btn read-article-btn" data-article="work:${id}">Read Full Article &rarr;</button>
      ${w.fullTextUrl ? `<a class="jump-btn external-text-btn" href="${w.fullTextUrl}" target="_blank" rel="noopener noreferrer">Read Free Full Text &#8599;</a>` : ""}
      ${googleSearchButton(w.title + (w.authorId ? " " + ((peopleById.get(w.authorId) || {}).name || "") : ""))}
    </div>
    ${section("Historical Impact", `<p>${escapeHtml(w.historicalImpact || "")}</p>`)}
    ${section("Related Events", (w.relatedEvents || []).map(eventChip).join(""))}
  `;
  openSidePanel(html);
  renderLanes();
}

function openMovementPanel(id) {
  const m = movementsById.get(id);
  if (!m) return;
  state.selectedEventId = null;
  state.lifespanPerson = null;
  const html = `
    <span class="panel-category-badge" style="background:#7C3AED">Movement</span>
    <div class="panel-title">${escapeHtml(m.name)}</div>
    <div class="panel-dates">Began ${formatYear(m.startYear)}${m.endYear ? " – " + formatYear(m.endYear) : " – present"}</div>
    <div class="panel-action-row">
      <button class="jump-btn" data-jump="${m.startYear}:${m.endYear || m.startYear + 150}">Show era on timeline</button>
      <button class="jump-btn read-article-btn" data-article="movement:${id}">Read Full Article &rarr;</button>
      ${googleSearchButton(m.name + " church history movement")}
    </div>
    <div class="panel-summary">${escapeHtml(m.description || "")}</div>
    ${section("Notable People", (m.notablePeople || []).map(personChip).join(""))}
    ${section("Related Events", (m.relatedEvents || []).map(eventChip).join(""))}
  `;
  openSidePanel(html);
  renderLanes();
}

function openBibleBookPanel(id) {
  const b = bibleBooksById.get(id);
  if (!b) return;
  state.selectedEventId = id;
  state.lifespanPerson = null;
  const color = categoryColor(b);
  const dateStr = b.startYear === b.endYear
    ? formatYear(b.startYear)
    : `${formatYear(b.startYear)} – ${formatYear(b.endYear)}`;
  const consensusDesc = AUTHORSHIP_CONSENSUS_LABELS[b.authorshipConsensus] || "";

  const html = `
    <span class="panel-category-badge" style="background:${color}">${escapeHtml(categoryLabel(b))}</span>
    <div class="panel-title">${escapeHtml(b.name)}</div>
    <div class="panel-dates">${dateStr} &nbsp;•&nbsp; ${escapeHtml(b.placeOfWriting || "")}</div>
    <div class="panel-summary">${escapeHtml(b.summary || "")}</div>
    <div class="panel-action-row">
      <button class="jump-btn read-article-btn" data-article="bible:${id}">Read Full Article &rarr;</button>
      ${googleSearchButton("Book of " + (b.fullTitle || b.name) + " authorship dating")}
    </div>
    <div class="consensus-badge consensus-${slug(b.authorshipConsensus)}">${escapeHtml(consensusDesc || b.authorshipConsensus || "")}</div>
    ${section("Traditional Author", `<p>${escapeHtml(b.traditionalAuthor || "")}</p>`)}
    ${section("Why This Author?", `<p>${escapeHtml(b.authorshipSummary || "")}</p>`)}
    ${section("Why This Date?", `<p>${escapeHtml(b.datingSummary || "")}</p>`)}
    ${section("Audience", `<p>${escapeHtml(b.audience || "")}</p>`)}
    ${section("Key Themes", listPlain(b.keyThemes))}
    ${section("Related Books", (b.relatedBooks || []).map(bibleBookChip).join(""))}
    ${section("Tags", tagRow(b.tags))}
    ${section("Sources", sourceList(b.sources))}
  `;
  openSidePanel(html);
  renderLanes();
  if (state.mobileMode) scrollMobileListToEvent(id);
}
