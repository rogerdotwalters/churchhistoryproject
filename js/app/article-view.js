/* ==========================================================
   Church History Timeline — Article View — full-page hash-routed articles (#event/id, #person/id, ...) and the Works Library index
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
   Full-page article view (hash-routed: #event/id, #person/id,
   #work/id, #movement/id, #bible/id) — a genuinely separate
   "page" that opens from a link inside the side panel and carries
   a much more thorough, detailed write-up than the quick-view panel.
   ========================================================== */
const articleView = $("#article-view");
const articleContent = $("#article-content");
const articleBreadcrumb = $("#article-breadcrumb");

function navigateToArticle(type, id) {
  location.hash = `#${type}/${encodeURIComponent(id)}`;
}

function parseArticleRoute() {
  if (location.hash === "#works") return { type: "works-index", id: null };
  const m = location.hash.match(/^#(event|person|work|movement|bible)\/(.+)$/);
  return m ? { type: m[1], id: decodeURIComponent(m[2]) } : null;
}

function articleCard(type, id) {
  if (type === "person") {
    const p = peopleById.get(id);
    if (!p) return "";
    return `<div class="article-card" data-nav="person:${id}">
      <div class="article-card-kicker">Person &nbsp;•&nbsp; ${formatYear(p.birthYear)}–${p.deathYear ? formatYear(p.deathYear) : "present"}</div>
      <div class="article-card-title">${escapeHtml(p.name)}</div>
      <div class="article-card-desc">${escapeHtml(p.timelineRole || p.publicDescription || "")}</div>
    </div>`;
  }
  if (type === "work") {
    const w = worksById.get(id);
    if (!w) return "";
    return `<div class="article-card" data-nav="work:${id}">
      <div class="article-card-kicker">${escapeHtml(w.type || "Work")} &nbsp;•&nbsp; ${formatYear(w.year)}${w.fullTextUrl ? ' <span class="free-text-badge">Free Full Text</span>' : ""}</div>
      <div class="article-card-title">${escapeHtml(w.title)}</div>
      <div class="article-card-desc">${escapeHtml(w.description || "")}</div>
    </div>`;
  }
  if (type === "movement") {
    const m = movementsById.get(id);
    if (!m) return "";
    return `<div class="article-card" data-nav="movement:${id}">
      <div class="article-card-kicker">Movement &nbsp;•&nbsp; from ${formatYear(m.startYear)}</div>
      <div class="article-card-title">${escapeHtml(m.name)}</div>
      <div class="article-card-desc">${escapeHtml(m.description || "")}</div>
    </div>`;
  }
  if (type === "event") {
    const e = eventsById.get(id);
    if (!e) return "";
    const color = (CATEGORIES[e.category] || {}).color || "#777";
    return `<div class="article-card" data-nav="event:${id}">
      <div class="article-card-kicker"><span class="dot" style="background:${color}"></span>${escapeHtml(e.category)} &nbsp;•&nbsp; ${formatYear(e.startYear)}</div>
      <div class="article-card-title">${escapeHtml(e.name)}</div>
      <div class="article-card-desc">${escapeHtml(e.summary || "")}</div>
    </div>`;
  }
  if (type === "bible") {
    const b = bibleBooksById.get(id);
    if (!b) return "";
    const color = categoryColor(b);
    return `<div class="article-card" data-nav="bible:${id}">
      <div class="article-card-kicker"><span class="dot" style="background:${color}"></span>${escapeHtml(categoryLabel(b))} &nbsp;•&nbsp; ${formatYear(b.startYear)}</div>
      <div class="article-card-title">${escapeHtml(b.name)}</div>
      <div class="article-card-desc">${escapeHtml(b.summary || "")}</div>
    </div>`;
  }
  return "";
}
function cardGrid(title, cards) {
  const filtered = cards.filter(Boolean);
  if (!filtered.length) return "";
  return `<div class="article-section"><h3>${escapeHtml(title)}</h3><div class="article-card-grid">${filtered.join("")}</div></div>`;
}
function proseSection(title, paragraphs) {
  const list = (paragraphs || []).filter(Boolean);
  if (!list.length) return "";
  return `<div class="article-section"><h3>${escapeHtml(title)}</h3>${list.map((p) => `<p>${escapeHtml(p)}</p>`).join("")}</div>`;
}
function articleListSection(title, items) {
  if (!items || !items.length) return "";
  return `<div class="article-section"><h3>${escapeHtml(title)}</h3><ul class="list-plain">${items.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul></div>`;
}
function articleSourcesSection(sources) {
  if (!sources || !sources.length) return "";
  return `<div class="article-section"><h3>Sources</h3>${sources.map((s) => `<div class="source-item">${escapeHtml(s)}</div>`).join("")}</div>`;
}
function articleTagsSection(tags) {
  if (!tags || !tags.length) return "";
  return `<div class="article-section">${tagRow(tags)}</div>`;
}

function renderEventArticleHtml(evt) {
  const color = (CATEGORIES[evt.category] || {}).color || "#777";
  const dateStr = evt.startYear === evt.endYear
    ? formatYear(evt.startYear)
    : `${formatYear(evt.startYear)} – ${formatYear(evt.endYear)}`;
  const movs = Array.from(eventMovementMap.get(evt.id) || []);
  const bodyParas = (evt.fullArticle && evt.fullArticle.length) ? evt.fullArticle : [evt.description || evt.summary || ""];

  return `
    <div class="article-hero" style="--hero-color:${color}">
      <span class="article-badge" style="background:${color}">${escapeHtml(evt.category)}</span>
      <h1>${escapeHtml(evt.name)}</h1>
      <div class="article-meta">${dateStr} &nbsp;•&nbsp; ${escapeHtml(evt.region || "")} &nbsp;•&nbsp; Importance ${evt.importance}/10</div>
    </div>
    <div class="article-action-row">${googleSearchButton(evt.name + " church history")}</div>
    <div class="article-lede">${escapeHtml(evt.summary || "")}</div>
    <div class="article-body">${bodyParas.map((p) => `<p>${escapeHtml(p)}</p>`).join("")}</div>
    ${cardGrid("People Involved", (evt.notablePersons || []).map((id) => articleCard("person", id)))}
    ${cardGrid("Related Works", (evt.relatedWorks || []).map((id) => articleCard("work", id)))}
    ${cardGrid("Related Movements", movs.map((id) => articleCard("movement", id)))}
    ${cardGrid("Related Events", (evt.relatedEvents || []).map((id) => articleCard("event", id)))}
    ${articleTagsSection(evt.tags)}
    ${articleSourcesSection(evt.sources)}
  `;
}

function renderPersonArticleHtml(p) {
  const lifespanStr = `${formatYear(p.birthYear)} – ${p.deathYear ? formatYear(p.deathYear) : "present"}`;
  const bioParas = (p.fullBiography && p.fullBiography.length) ? p.fullBiography : [p.publicDescription || ""];
  return `
    <div class="article-hero" style="--hero-color:#c99a1e">
      <span class="article-badge" style="background:#c99a1e">Person</span>
      <h1>${escapeHtml(p.name)}</h1>
      <div class="article-meta">${lifespanStr} &nbsp;•&nbsp; ${escapeHtml(p.timelineRole || "")}</div>
    </div>
    <div class="article-action-row">
      <button class="jump-btn read-article-btn" data-timeline-jump="${p.birthYear}:${p.deathYear || p.birthYear + 60}">Show lifespan on timeline</button>
      ${googleSearchButton(p.name + " church history")}
    </div>
    <div class="article-body">${bioParas.map((para) => `<p>${escapeHtml(para)}</p>`).join("")}</div>
    ${articleListSection("Contributions", p.contributions)}
    ${articleListSection("Theological Positions", p.theologicalPositions)}
    ${cardGrid("Notable Works", (p.notableWorks || []).map((id) => articleCard("work", id)))}
    ${cardGrid("Associated Movements", (p.associatedMovements || []).map((id) => articleCard("movement", id)))}
    ${cardGrid("Related Events", (p.relatedEvents || []).map((id) => articleCard("event", id)))}
    ${articleSourcesSection(p.sources)}
  `;
}

function renderWorkArticleHtml(w) {
  return `
    <div class="article-hero" style="--hero-color:#2E9E4F">
      <span class="article-badge" style="background:#2E9E4F">${escapeHtml(w.type || "Work")}</span>
      <h1>${escapeHtml(w.title)}</h1>
      <div class="article-meta">${formatYear(w.year)}${w.authorId ? " &nbsp;•&nbsp; by " + escapeHtml((peopleById.get(w.authorId) || {}).name || "") : ""}</div>
    </div>
    ${w.fullTextUrl ? `<div class="full-text-callout">
        <div class="full-text-callout-label">Read the complete, freely available text</div>
        <a class="full-text-callout-btn" href="${w.fullTextUrl}" target="_blank" rel="noopener noreferrer">Read Free Full Text at ${escapeHtml(w.fullTextSource || "source")} &#8599;</a>
      </div>` : ""}
    <div class="article-action-row">${googleSearchButton(w.title + (w.authorId ? " " + ((peopleById.get(w.authorId) || {}).name || "") : ""))}</div>
    ${w.authorId ? `<div>${articleCard("person", w.authorId)}</div>` : ""}
    <div class="article-lede">${escapeHtml(w.description || "")}</div>
    ${proseSection("Historical Impact", [w.historicalImpact])}
    ${cardGrid("Related Events", (w.relatedEvents || []).map((id) => articleCard("event", id)))}
  `;
}

function renderMovementArticleHtml(m) {
  return `
    <div class="article-hero" style="--hero-color:#7C3AED">
      <span class="article-badge" style="background:#7C3AED">Movement</span>
      <h1>${escapeHtml(m.name)}</h1>
      <div class="article-meta">Began ${formatYear(m.startYear)}${m.endYear ? " – " + formatYear(m.endYear) : " – present"}</div>
    </div>
    <div class="article-action-row">
      <button class="jump-btn read-article-btn" data-timeline-jump="${m.startYear}:${m.endYear || m.startYear + 150}">Show era on timeline</button>
      ${googleSearchButton(m.name + " church history movement")}
    </div>
    <div class="article-lede">${escapeHtml(m.description || "")}</div>
    ${cardGrid("Notable People", (m.notablePeople || []).map((id) => articleCard("person", id)))}
    ${cardGrid("Related Events", (m.relatedEvents || []).map((id) => articleCard("event", id)))}
  `;
}

function renderBibleBookArticleHtml(b) {
  const color = categoryColor(b);
  const dateStr = b.startYear === b.endYear
    ? formatYear(b.startYear)
    : `${formatYear(b.startYear)} – ${formatYear(b.endYear)}`;
  const consensusDesc = AUTHORSHIP_CONSENSUS_LABELS[b.authorshipConsensus] || "";
  return `
    <div class="article-hero" style="--hero-color:${color}">
      <span class="article-badge" style="background:${color}">${escapeHtml(categoryLabel(b))}</span>
      <h1>${escapeHtml(b.fullTitle || b.name)}</h1>
      <div class="article-meta">${dateStr} &nbsp;•&nbsp; ${escapeHtml(b.placeOfWriting || "")} &nbsp;•&nbsp; Traditional author: ${escapeHtml(b.traditionalAuthor || "Unknown")}</div>
    </div>
    <div class="article-action-row">${googleSearchButton("Book of " + (b.fullTitle || b.name) + " authorship dating")}</div>
    <div class="article-lede">${escapeHtml(b.summary || "")}</div>
    <div class="article-section">
      <h3>Authorship</h3>
      <div class="consensus-badge consensus-${slug(b.authorshipConsensus)}">${escapeHtml(consensusDesc || b.authorshipConsensus || "")}</div>
      <p><strong>${escapeHtml(b.authorshipSummary || "")}</strong></p>
      ${(b.authorshipReasoning || []).map((p) => `<p>${escapeHtml(p)}</p>`).join("")}
    </div>
    <div class="article-section">
      <h3>Dating</h3>
      <p><strong>${escapeHtml(b.datingSummary || "")}</strong></p>
      ${(b.datingReasoning || []).map((p) => `<p>${escapeHtml(p)}</p>`).join("")}
    </div>
    <div class="article-body"><p>${escapeHtml(b.description || "")}</p></div>
    ${articleListSection("Key Themes", b.keyThemes)}
    <div class="article-section"><h3>Details</h3><p>Audience: ${escapeHtml(b.audience || "")}</p></div>
    ${cardGrid("Related Books", (b.relatedBooks || []).map((id) => articleCard("bible", id)))}
    ${articleTagsSection(b.tags)}
    ${articleSourcesSection(b.sources)}
  `;
}

function workIndexCard(w) {
  const authorName = w.authorId ? (peopleById.get(w.authorId) || {}).name : null;
  return `<div class="article-card work-index-card" data-nav="work:${w.id}">
    <div class="article-card-kicker">${escapeHtml(w.type || "Work")} &nbsp;•&nbsp; ${formatYear(w.year)}${w.fullTextUrl ? ' <span class="free-text-badge">Free Full Text</span>' : ""}</div>
    <div class="article-card-title">${escapeHtml(w.title)}</div>
    ${authorName ? `<div class="work-index-author">${escapeHtml(authorName)}</div>` : ""}
    <div class="article-card-desc">${escapeHtml(w.description || "")}</div>
  </div>`;
}

function worksIndexSection(title, works, note) {
  if (!works.length) return "";
  const sorted = works.slice().sort((a, b) => a.year - b.year);
  return `<div class="works-index-section">
    <h2 class="works-index-heading">${escapeHtml(title)} <span class="works-index-count">${sorted.length}</span></h2>
    ${note ? `<p class="works-index-note">${escapeHtml(note)}</p>` : ""}
    <div class="article-card-grid">${sorted.map(workIndexCard).join("")}</div>
  </div>`;
}

function renderWorksIndexHtml() {
  const byAuthor = (id) => WORKS.filter((w) => w.authorId === id);
  const augustineWorks = byAuthor("augustine");
  const lutherWorks = byAuthor("luther");
  const calvinWorks = byAuthor("calvin");
  const councilWorks = WORKS.filter((w) => !w.authorId);
  const claimedIds = new Set([...augustineWorks, ...lutherWorks, ...calvinWorks, ...councilWorks].map((w) => w.id));
  const otherWorks = WORKS.filter((w) => !claimedIds.has(w.id));
  const withFullText = WORKS.filter((w) => w.fullTextUrl).length;

  return `
    <div class="article-hero" style="--hero-color:#2E9E4F">
      <span class="article-badge" style="background:#2E9E4F">Library</span>
      <h1>Works Library</h1>
      <div class="article-meta">${WORKS.length} works &nbsp;•&nbsp; ${withFullText} with free full text online</div>
    </div>
    <div class="article-lede">Primary sources referenced throughout the timeline, with links to complete, freely and legally available texts wherever an authoritative public edition exists — drawn from sources such as the Christian Classics Ethereal Library, New Advent, the Book of Concord, and denominational archives. No pirated, private, or paywalled editions are linked.</div>
    ${worksIndexSection("Augustine of Hippo", augustineWorks)}
    ${worksIndexSection("Martin Luther", lutherWorks)}
    ${worksIndexSection("John Calvin", calvinWorks)}
    ${worksIndexSection("Councils & Confessions", councilWorks, "Creeds, conciliar definitions, and corporate confessions of faith, listed by council or synod rather than individual author.")}
    ${worksIndexSection("Other Authors", otherWorks)}
  `;
}

function bindArticleLinks() {
  $all("[data-nav]", articleContent).forEach((el) => {
    on(el, "click", () => {
      const [type, id] = el.dataset.nav.split(":");
      navigateToArticle(type, id);
    });
  });
  $all("[data-timeline-jump]", articleContent).forEach((el) => {
    on(el, "click", () => {
      const [sy, ey] = el.dataset.timelineJump.split(":").map(Number);
      location.hash = "";
      setTimeout(() => jumpToYearRange(sy, ey), 50);
    });
  });
}

function openArticleView(type, id) {
  let html = "", label = "";
  if (type === "event") {
    const e = eventsById.get(id);
    if (!e) return renderArticleNotFound();
    html = renderEventArticleHtml(e); label = "Event";
  } else if (type === "person") {
    const p = peopleById.get(id);
    if (!p) return renderArticleNotFound();
    html = renderPersonArticleHtml(p); label = "Person";
  } else if (type === "work") {
    const w = worksById.get(id);
    if (!w) return renderArticleNotFound();
    html = renderWorkArticleHtml(w); label = "Work";
  } else if (type === "movement") {
    const m = movementsById.get(id);
    if (!m) return renderArticleNotFound();
    html = renderMovementArticleHtml(m); label = "Movement";
  } else if (type === "bible") {
    const b = bibleBooksById.get(id);
    if (!b) return renderArticleNotFound();
    html = renderBibleBookArticleHtml(b); label = "Bible Book";
  } else if (type === "works-index") {
    html = renderWorksIndexHtml(); label = "Works Library";
  } else {
    return renderArticleNotFound();
  }
  articleContent.innerHTML = html;
  articleBreadcrumb.textContent = `Timeline / ${label}`;
  articleView.classList.add("open");
  $("#article-scroll").scrollTop = 0;
  bindArticleLinks();
}

function renderArticleNotFound() {
  articleContent.innerHTML = `<div class="article-hero" style="--hero-color:#777"><h1>Not Found</h1></div><p>That page could not be found.</p>`;
  articleBreadcrumb.textContent = "Timeline";
  articleView.classList.add("open");
}

function closeArticleView() {
  articleView.classList.remove("open");
}

$("#article-back-btn").addEventListener("click", () => { location.hash = ""; });

function routeArticle() {
  const r = parseArticleRoute();
  if (r) openArticleView(r.type, r.id);
  else closeArticleView();
}
window.addEventListener("hashchange", routeArticle);
