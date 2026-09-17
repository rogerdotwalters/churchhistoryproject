/* ==========================================================
   Church History Timeline — Data Validation Script
   Checks referential integrity (no dangling ids) across the
   split data files under js/data/. Run after any manual edit
   to those files:  node validate-data.js
   ========================================================== */

const { PEOPLE } = require('./js/data/people.js');
const { WORKS } = require('./js/data/works.js');
const { MOVEMENTS } = require('./js/data/movements.js');
const { EVENTS } = require('./js/data/events.js');
const { BIBLE_CATEGORIES, AUTHORSHIP_CONSENSUS_LABELS } = require('./js/data/bible-categories.js');
const { BIBLE_BOOKS } = require('./js/data/bible-books.js');

let errors = [];

// ---- Church History: PEOPLE / WORKS / MOVEMENTS / EVENTS ----
const personIds = new Set(PEOPLE.map((p) => p.id));
const workIds = new Set(WORKS.map((w) => w.id));
const movIds = new Set(MOVEMENTS.map((m) => m.id));
const eventIds = new Set(EVENTS.map((e) => e.id));

EVENTS.forEach((e) => {
  (e.notablePersons || []).forEach((id) => { if (!personIds.has(id)) errors.push('event ' + e.id + ' missing person ' + id); });
  (e.relatedEvents || []).forEach((id) => { if (!eventIds.has(id)) errors.push('event ' + e.id + ' missing relatedEvent ' + id); });
  (e.relatedWorks || []).forEach((id) => { if (!workIds.has(id)) errors.push('event ' + e.id + ' missing relatedWork ' + id); });
});
PEOPLE.forEach((p) => {
  (p.notableWorks || []).forEach((id) => { if (!workIds.has(id)) errors.push('person ' + p.id + ' missing work ' + id); });
  (p.associatedMovements || []).forEach((id) => { if (!movIds.has(id)) errors.push('person ' + p.id + ' missing movement ' + id); });
});
WORKS.forEach((w) => { if (w.authorId && !personIds.has(w.authorId)) errors.push('work ' + w.id + ' missing author ' + w.authorId); });
MOVEMENTS.forEach((m) => { (m.notablePeople || []).forEach((id) => { if (!personIds.has(id)) errors.push('movement ' + m.id + ' missing person ' + id); }); });

// ---- Bible Books: BIBLE_BOOKS / BIBLE_CATEGORIES / AUTHORSHIP_CONSENSUS_LABELS ----
const bibleBookIds = new Set(BIBLE_BOOKS.map((b) => b.id));
const bibleCategoryKeys = new Set(Object.keys(BIBLE_CATEGORIES));
const consensusKeys = new Set(Object.keys(AUTHORSHIP_CONSENSUS_LABELS));

const sortedOrders = BIBLE_BOOKS.map((b) => b.canonicalOrder).slice().sort((a, b) => a - b);
BIBLE_BOOKS.forEach((b, i) => {
  if (!bibleCategoryKeys.has(b.category)) errors.push('bible book ' + b.id + ' unknown category ' + b.category);
  if (!consensusKeys.has(b.authorshipConsensus)) errors.push('bible book ' + b.id + ' unknown authorshipConsensus ' + b.authorshipConsensus);
  (b.relatedBooks || []).forEach((id) => { if (!bibleBookIds.has(id)) errors.push('bible book ' + b.id + ' missing relatedBook ' + id); });
});
if (sortedOrders.some((v, i) => v !== i + 1)) errors.push('BIBLE_BOOKS canonicalOrder values are not sequential 1..27');

console.log('Errors:', errors.length);
errors.forEach((e) => console.log(e));
process.exit(errors.length ? 1 : 0);
