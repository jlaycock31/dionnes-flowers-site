'use strict';
const fs   = require('fs');
const path = require('path');

const ROOT = __dirname;

// CSS rule to add after every .logo em rule so the <a> inherits color cleanly
const LOGO_A_CSS = '.logo a{color:inherit;text-decoration:none}';

// Pages where .logo and .logo em are on SEPARATE lines
const SEPARATE_LINE_PAGES = ['index.html', 'about.html', 'contact.html', 'shop.html'];

// Pages where .logo and .logo em are on the SAME line
const SAME_LINE_PAGES = ['gallery.html', 'weddings.html'];

function patch(filename, fn) {
  const fp  = path.join(ROOT, filename);
  const src = fs.readFileSync(fp, 'utf8');
  const out = fn(src);
  if (out === src) {
    console.log(`  (unchanged)  ${filename}`);
  } else {
    fs.writeFileSync(fp, out, 'utf8');
    console.log(`  ✓  ${filename}`);
  }
}

// ── Pages with .logo em on its own line ────────────────────────────────────
SEPARATE_LINE_PAGES.forEach(function(file) {
  patch(file, function(src) {
    // 1. Insert .logo a rule after .logo em line
    src = src.replace(
      /(.logo em\{[^\n]+\n)/,
      '$1' + LOGO_A_CSS + '\n'
    );
    // 2. Wrap logo text in <a>
    src = src.replace(
      /<div class="logo">Helen's House<\/div>/,
      '<div class="logo"><a href="index.html">Helen\'s House</a></div>'
    );
    return src;
  });
});

// ── Pages with .logo and .logo em on the same line ─────────────────────────
SAME_LINE_PAGES.forEach(function(file) {
  patch(file, function(src) {
    // 1. Insert .logo a rule after the combined .logo{}.logo em{} block
    src = src.replace(
      /(.logo\{[^}]+\}\.logo em\{[^}]+\})/,
      '$1' + LOGO_A_CSS
    );
    // 2. Wrap logo text in <a>
    src = src.replace(
      /<div class="logo">Helen's House<\/div>/,
      '<div class="logo"><a href="index.html">Helen\'s House</a></div>'
    );
    return src;
  });
});

// ── gallery_full.html — stale brand name + same-line CSS ───────────────────
patch('gallery_full.html', function(src) {
  // 1. Insert .logo a rule after combined .logo{}.logo em{} block
  src = src.replace(
    /(.logo\{[^}]+\}\.logo em\{[^}]+\})/,
    '$1' + LOGO_A_CSS
  );
  // 2. Fix stale brand name AND wrap in <a>
  src = src.replace(
    /<div class="logo">Petal &amp; <em>Ground<\/em><\/div>/,
    '<div class="logo"><a href="index.html">Helen\'s House</a></div>'
  );
  return src;
});

console.log('\nAll done.');
