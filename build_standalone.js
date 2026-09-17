/* ==========================================================
   Church History Timeline — Standalone Build
   Inlines every split CSS/JS file into a single self-contained
   HTML file (church-history-timeline-standalone.html), in the
   exact order index.html loads them in. Run after any source
   edit: `node build_standalone.js`. If you add, remove, or
   rename a file under css/ or js/, update the CSS_FILES /
   JS_FILES lists below AND the matching <link>/<script> tags
   in index.html — the two must stay in sync.
   ========================================================== */

const fs = require('fs');
const path = require('path');

const dir = __dirname;

const CSS_FILES = [
  'css/base.css',
  'css/top-bar.css',
  'css/datasource-filters.css',
  'css/map-view.css',
  'css/side-panel.css',
  'css/article-view.css',
  'css/mobile-view.css',
];

const JS_FILES = [
  'js/data/categories.js',
  'js/data/people.js',
  'js/data/works.js',
  'js/data/movements.js',
  'js/data/events.js',
  'js/data/bible-categories.js',
  'js/data/bible-books.js',
  'js/app/core.js',
  'js/app/map-view.js',
  'js/app/filters.js',
  'js/app/side-panel.js',
  'js/app/article-view.js',
  'js/app/search.js',
  'js/app/mobile-list.js',
  'js/app/init.js',
];

const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

const linkTags = CSS_FILES.map((f) => `<link rel="stylesheet" href="${f}">`).join('\n');
const scriptTagsInSource = JS_FILES.map((f) => `<script src="${f}"></script>`).join('\n');

const inlineStyle = CSS_FILES
  .map((f) => `<style>\n${fs.readFileSync(path.join(dir, f), 'utf8')}\n</style>`)
  .join('\n');
const inlineScript = JS_FILES
  .map((f) => `<script>\n${fs.readFileSync(path.join(dir, f), 'utf8')}\n</script>`)
  .join('\n');

// NOTE: replacement is passed as a FUNCTION, not a string — a string
// replacement would let JS treat "$&", "$`", "$'" sequences specially,
// and our inlined app.js source is full of ${...} template literals
// that can coincidentally collide with that (this bit us once: it
// silently duplicated large chunks of content into the output).
let out = html.replace(linkTags, () => inlineStyle);
if (out === html) {
  throw new Error('CSS <link> block in index.html did not match CSS_FILES — update build_standalone.js or index.html so they agree.');
}
const afterCss = out;
out = out.replace(scriptTagsInSource, () => inlineScript);
if (out === afterCss) {
  throw new Error('<script> block in index.html did not match JS_FILES — update build_standalone.js or index.html so they agree.');
}

const outPath = path.join(dir, 'church-history-timeline-standalone.html');
fs.writeFileSync(outPath, out);
console.log('Wrote', outPath, fs.statSync(outPath).size, 'bytes');
