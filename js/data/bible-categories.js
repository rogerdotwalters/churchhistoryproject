/* ==========================================================
   Church History Timeline — Data Layer / Bible Genre Categories & Authorship-Consensus Labels
   Part of the split data layer (see js/data/ for the rest):
   categories.js, people.js, works.js, movements.js, events.js,
   bible-categories.js, bible-books.js. Loaded as plain browser
   globals (no bundler) — order matters only in index.html, not
   between these files, since entities cross-reference each other
   by id string, not by direct object reference.
   ========================================================== */

/* ---------- Configuration: genre categories ---------- */

const BIBLE_CATEGORIES = {
  "Gospel":            { label: "Gospel",                         color: "#3B82F6" }, // Blue
  "History":           { label: "History (Acts)",                 color: "#06B6D4" }, // Cyan
  "Pauline-Undisputed":{ label: "Pauline Epistle (Undisputed)",    color: "#059669" }, // Emerald
  "Pauline-Disputed":  { label: "Pauline Epistle (Disputed)",      color: "#65A30D" }, // Olive
  "Pastoral":          { label: "Pastoral Epistle",                color: "#D97706" }, // Amber
  "General":           { label: "General Epistle",                color: "#DB2777" }, // Rose
  "Apocalyptic":        { label: "Apocalyptic",                    color: "#DC2626" }  // Red
};

// Simplified authorship-consensus tags used for filtering & the legend.
// The real nuance always lives in each book's authorshipReasoning —
// these five buckets are a rough visual/filterable summary, not the
// full picture.
const AUTHORSHIP_CONSENSUS_LABELS = {
  "Undisputed": "Undisputed — traditional and critical scholarship agree",
  "Majority Traditional": "Majority Traditional — most scholars retain the traditional attribution",
  "Debated": "Debated — scholarship is genuinely split",
  "Majority Critical": "Majority Critical — most critical scholars doubt the traditional attribution",
  "Anonymous": "Anonymous — the text itself names no author"
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { BIBLE_CATEGORIES, AUTHORSHIP_CONSENSUS_LABELS };
}
