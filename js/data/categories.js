/* ==========================================================
   Church History Timeline — Data Layer / Categories, Eras, Regions
   Part of the split data layer (see js/data/ for the rest):
   categories.js, people.js, works.js, movements.js, events.js,
   bible-categories.js, bible-books.js. Loaded as plain browser
   globals (no bundler) — order matters only in index.html, not
   between these files, since entities cross-reference each other
   by id string, not by direct object reference.
   ========================================================== */

/* ---------- Configuration: categories, eras, regions ---------- */

const CATEGORIES = {
  "Council":          { label: "Council",              color: "#2E6FE0" }, // Blue
  "Persecution":       { label: "Persecution",           color: "#D6392F" }, // Red
  "Movement":          { label: "Movement",              color: "#7C3AED" }, // Purple
  "Doctrine":          { label: "Doctrinal Development",  color: "#C99A1E" }, // Gold
  "Publication":       { label: "Publication",            color: "#2E9E4F" }, // Green
  "Schism":            { label: "Schism",                 color: "#E08A2E" }, // Orange
  "Reformation":       { label: "Reformation",             color: "#1E9E9E" }, // Teal
  "Historical Event":  { label: "Historical Event",        color: "#64748B" }, // Slate
  "Political":         { label: "Political",               color: "#8A5A2B" }  // Brown
};

const ERAS = [
  { id: "apostolic",     label: "Apostolic",     startYear: 30,   endYear: 100 },
  { id: "ante-nicene",   label: "Ante-Nicene",   startYear: 100,  endYear: 325 },
  { id: "nicene",        label: "Nicene",        startYear: 325,  endYear: 451 },
  { id: "medieval",      label: "Medieval",      startYear: 451,  endYear: 1500 },
  { id: "reformation",   label: "Reformation",   startYear: 1500, endYear: 1650 },
  { id: "enlightenment", label: "Enlightenment", startYear: 1650, endYear: 1800 },
  { id: "modern",        label: "Modern",        startYear: 1800, endYear: 2026 }
];

const REGIONS = [
  "Judea", "Roman Empire", "North Africa", "Byzantine Empire",
  "Western Europe", "Central Europe", "British Isles",
  "Switzerland", "Northern Europe", "Low Countries", "North America", "Global"
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { CATEGORIES, ERAS, REGIONS };
}
