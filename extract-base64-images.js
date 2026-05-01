/**
 * extract-base64-images.js
 *
 * Extracts every base64-embedded JPEG from index.html, about.html,
 * and weddings.html, saves them as real JPEG files (compressed with
 * sharp), then rewrites each HTML file with file-path src attributes.
 *
 * gallery_full.html was already processed in a previous run —
 * images live in photos/gallery/ and the file has no embedded base64.
 *
 * Output layout:
 *   photos/gallery-preview-1..4.jpg   ← from index.html
 *   photos/about-hero.jpg             ← from about.html
 *   photos/weddings/wedding-hero.jpg  ← from weddings.html (hero img)
 *   photos/weddings/wedding-1..7.jpg  ← from weddings.html (gallery)
 */

let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('sharp not found — run:  npm install sharp');
  process.exit(1);
}

const fs   = require('fs');
const path = require('path');

// ── Helpers ───────────────────────────────────────────────────────────────────

function ensureDir(dir) {
  if (!fs.existsSync(dir)) { fs.mkdirSync(dir, { recursive: true }); console.log('Created:', dir); }
}

function stripLineBreaks(b64) { return b64.replace(/[\r\n\s]/g, ''); }

/** Decode base64, compress with sharp, save. Returns bytes written. */
async function saveImage(b64, outPath, maxPx, quality) {
  const buf = Buffer.from(stripLineBreaks(b64), 'base64');
  await sharp(buf)
    .resize({ width: maxPx, height: maxPx, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: quality, progressive: true })
    .toFile(outPath);
  return fs.statSync(outPath).size;
}

/** Replace the first `count` occurrences of a src="data:..." pattern in html. */
function replaceHtmlSrc(html, filePaths) {
  // Matches: src="data:image/jpeg;base64,..."
  const RE = /src="data:image\/jpeg;base64,[A-Za-z0-9+/=\r\n\s]+"/g;
  let idx = 0;
  return html.replace(RE, () => {
    if (idx >= filePaths.length) return arguments[0]; // shouldn't happen
    return 'src="' + filePaths[idx++] + '"';
  });
}

/** Replace src:"data:..." property values inside JavaScript objects. */
function replaceJsSrc(html, filePaths) {
  // Matches: src:"data:image/jpeg;base64,..."
  const RE = /src:"data:image\/jpeg;base64,[A-Za-z0-9+/=\r\n\s]+"/g;
  let idx = 0;
  return html.replace(RE, () => {
    if (idx >= filePaths.length) return arguments[0];
    return 'src:"' + filePaths[idx++] + '"';
  });
}

// ── Main ──────────────────────────────────────────────────────────────────────

(async () => {
  const root = __dirname;

  // ── 1. index.html — 4 gallery preview images ────────────────────────────────
  {
    console.log('\n=== index.html ===');
    const htmlPath = path.join(root, 'index.html');
    let html = fs.readFileSync(htmlPath, 'utf8');

    const RE = /src="data:image\/jpeg;base64,([A-Za-z0-9+/=\r\n\s]+)"/g;
    const matches = [...html.matchAll(RE)];
    console.log('Found', matches.length, 'base64 images');

    const outPaths = [];
    for (let i = 0; i < matches.length; i++) {
      const fname   = 'gallery-preview-' + (i + 1) + '.jpg';
      const outPath = path.join(root, 'photos', fname);
      const bytes   = await saveImage(matches[i][1], outPath, 800, 75);
      outPaths.push('photos/' + fname);
      console.log('OK   [' + (i + 1) + '/' + matches.length + '] ' + fname + ' — ' + Math.round(bytes / 1024) + ' KB');
    }

    html = replaceHtmlSrc(html, outPaths);
    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log('index.html rewritten.');
  }

  // ── 2. about.html — 1 portrait image ─────────────────────────────────────
  {
    console.log('\n=== about.html ===');
    const htmlPath = path.join(root, 'about.html');
    let html = fs.readFileSync(htmlPath, 'utf8');

    const RE = /src="data:image\/jpeg;base64,([A-Za-z0-9+/=\r\n\s]+)"/g;
    const matches = [...html.matchAll(RE)];
    console.log('Found', matches.length, 'base64 image(s)');

    const outPaths = [];
    for (let i = 0; i < matches.length; i++) {
      const fname   = 'about-hero.jpg';
      const outPath = path.join(root, 'photos', fname);
      const bytes   = await saveImage(matches[i][1], outPath, 1200, 72);
      outPaths.push('photos/' + fname);
      console.log('OK   ' + fname + ' — ' + Math.round(bytes / 1024) + ' KB');
    }

    html = replaceHtmlSrc(html, outPaths);
    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log('about.html rewritten.');
  }

  // ── 3. weddings.html — 1 HTML hero + 7 JS PHOTOS array images ────────────
  {
    console.log('\n=== weddings.html ===');
    const htmlPath  = path.join(root, 'weddings.html');
    const weddDir   = path.join(root, 'photos', 'weddings');
    ensureDir(weddDir);
    let html = fs.readFileSync(htmlPath, 'utf8');

    // Hero image: HTML src="data:..."
    const HTML_RE = /src="data:image\/jpeg;base64,([A-Za-z0-9+/=\r\n\s]+)"/g;
    const htmlMatches = [...html.matchAll(HTML_RE)];
    console.log('Found', htmlMatches.length, 'HTML src base64 image(s)');

    const heroOutPaths = [];
    for (let i = 0; i < htmlMatches.length; i++) {
      const fname   = 'wedding-hero.jpg';
      const outPath = path.join(weddDir, fname);
      const bytes   = await saveImage(htmlMatches[i][1], outPath, 1200, 72);
      heroOutPaths.push('photos/weddings/' + fname);
      console.log('OK   [hero] ' + fname + ' — ' + Math.round(bytes / 1024) + ' KB');
    }
    html = replaceHtmlSrc(html, heroOutPaths);

    // Gallery images: JS src:"data:..."
    const JS_RE = /src:"data:image\/jpeg;base64,([A-Za-z0-9+/=\r\n\s]+)"/g;
    const jsMatches = [...html.matchAll(JS_RE)];  // re-match on already-updated html
    console.log('Found', jsMatches.length, 'JS src base64 image(s)');

    const galleryOutPaths = [];
    for (let i = 0; i < jsMatches.length; i++) {
      const fname   = 'wedding-' + (i + 1) + '.jpg';
      const outPath = path.join(weddDir, fname);
      const bytes   = await saveImage(jsMatches[i][1], outPath, 1200, 72);
      galleryOutPaths.push('photos/weddings/' + fname);
      console.log('OK   [' + (i + 1) + '/' + jsMatches.length + '] ' + fname + ' — ' + Math.round(bytes / 1024) + ' KB');
    }
    html = replaceJsSrc(html, galleryOutPaths);

    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log('weddings.html rewritten.');
  }

  // ── 4. gallery_full.html — already processed ──────────────────────────────
  {
    console.log('\n=== gallery_full.html ===');
    const html = fs.readFileSync(path.join(root, 'gallery_full.html'), 'utf8');
    const count = (html.match(/data:image\/jpeg;base64,/g) || []).length;
    if (count === 0) {
      console.log('Already clean — 0 base64 images remaining.');
      console.log('Images live in photos/gallery/ from previous extraction run.');
    } else {
      console.log('WARNING:', count, 'base64 images still present — re-run compress-gallery.js');
    }
  }

  console.log('\nAll done. Commit photos/ changes and updated HTML files to GitHub.');
})();
