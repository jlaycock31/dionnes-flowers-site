const fs   = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'gallery-data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Photos to remove entirely
const REMOVE = new Set([
  'photos/weddings/wedding-hero.jpg',
  'photos/weddings/wedding-1.jpg',
  'photos/weddings/wedding-2.jpg',
  'photos/weddings/wedding-3.jpg',
  'photos/weddings/wedding-4.jpg',
  'photos/weddings/wedding-5.jpg',
  'photos/weddings/wedding-6.jpg',
  'photos/weddings/wedding-7.jpg',
]);

// Remove from Arrangements only (keep in Weddings)
const REMOVE_FROM_ARRANGEMENTS = new Set([
  'photos/gallery/mantel-installation.jpg',
]);

var totalRemoved = 0;

data.folders.forEach(function(folder) {
  var before = folder.photos.length;
  folder.photos = folder.photos.filter(function(p) {
    if (REMOVE.has(p.filename)) {
      console.log('  REMOVE  [' + folder.id + '] ' + p.filename);
      totalRemoved++;
      return false;
    }
    if (folder.id === 'arrangements' && REMOVE_FROM_ARRANGEMENTS.has(p.filename)) {
      console.log('  MOVE    [arrangements→weddings] ' + p.filename);
      totalRemoved++;
      return false;
    }
    return true;
  });
  // Re-number order fields
  folder.photos.forEach(function(p, i) { p.order = i + 1; });
  var after = folder.photos.length;
  if (before !== after) console.log('  ' + folder.name + ': ' + before + ' → ' + after);
});

// ── Verify ────────────────────────────────────────────────────────────────────
console.log('\n── Results ──────────────────────────────────────────────');
var grandTotal = 0;
data.folders.forEach(function(f) {
  var n = f.photos.length;
  grandTotal += n;
  console.log('  ' + f.name.padEnd(14) + n + ' photos');
});
console.log('  ' + 'Total'.padEnd(14) + grandTotal);
console.log(grandTotal === 25 ? '\n✓ Total is exactly 25.' : '\n✗ Total is ' + grandTotal + ' — expected 25.');

// Check for remaining duplicates
var seen = {}, dups = [];
data.folders.forEach(function(f) {
  f.photos.forEach(function(p) {
    if (seen[p.filename]) dups.push(p.filename + ' (' + seen[p.filename] + ' + ' + f.id + ')');
    else seen[p.filename] = f.id;
  });
});
if (dups.length) { console.log('\n✗ Remaining duplicates:'); dups.forEach(function(d){console.log('  ' + d);}); }
else             { console.log('✓ No remaining duplicates.'); }

// ── Write ─────────────────────────────────────────────────────────────────────
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
console.log('\ngallery-data.json written (' + totalRemoved + ' entries removed).');
