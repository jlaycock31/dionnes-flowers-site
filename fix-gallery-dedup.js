const fs   = require('fs');
const path = require('path');

// ── 1. Deduplicate gallery-data.json ─────────────────────────────────────────

const dataPath = path.join(__dirname, 'gallery-data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

var seen     = {};   // filename → first folder id
var removed  = 0;
var removedByFolder = {};

data.folders.forEach(function(folder) {
  var before = (folder.photos || []).length;
  folder.photos = (folder.photos || []).filter(function(photo) {
    if (seen[photo.filename]) {
      removedByFolder[folder.id] = (removedByFolder[folder.id] || 0) + 1;
      removed++;
      console.log('  REMOVED dup: ' + photo.filename + ' (first seen in "' + seen[photo.filename] + '", also in "' + folder.id + '")');
      return false;
    }
    seen[photo.filename] = folder.id;
    return true;
  });
});

if (removed === 0) {
  console.log('gallery-data.json: no duplicates found — all ' + Object.keys(seen).length + ' filenames are unique.');
} else {
  console.log('\ngallery-data.json: removed ' + removed + ' duplicate(s):');
  Object.keys(removedByFolder).forEach(function(fid) {
    console.log('  ' + fid + ': ' + removedByFolder[fid] + ' removed');
  });
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
  console.log('gallery-data.json written.');
}

// ── 2. Convert gallery_full.html to fetch from gallery-data.json ──────────────

const fullPath = path.join(__dirname, 'gallery_full.html');
let fullHtml = fs.readFileSync(fullPath, 'utf8');

const SCRIPT_START = '<script>\nconst ITEMS = [';
const SCRIPT_END   = "build('all');\n</script>";

const startIdx = fullHtml.indexOf(SCRIPT_START);
const endIdx   = fullHtml.indexOf(SCRIPT_END);

if (startIdx === -1 || endIdx === -1) {
  // Check if it already uses gallery-data.json
  if (fullHtml.includes('gallery-data.json')) {
    console.log('\ngallery_full.html: already using gallery-data.json fetch — no change needed.');
  } else {
    console.error('\ngallery_full.html: could not locate ITEMS script block — skipping.');
  }
} else {
  var oldLen = endIdx + SCRIPT_END.length - startIdx;

  var NEW_SCRIPT = `<script>
// gallery_full.html — reads from gallery-data.json (managed via admin panel)
var galleryData = null;
var currentFilter = 'all';

function getPhotos(filter) {
  if (!galleryData) return [];
  var folders = galleryData.folders || [];
  var out = [];
  folders.forEach(function(folder) {
    if (filter === 'all' || folder.id === filter) {
      (folder.photos || []).forEach(function(photo) {
        out.push({ photo: photo, folder: folder });
      });
    }
  });
  return out;
}

function updateCounts() {
  ['all', 'fresh', 'arrangements', 'weddings', 'seasonal'].forEach(function(cat) {
    var elem = document.getElementById('cnt-' + cat);
    if (!elem) return;
    elem.textContent = '(' + getPhotos(cat).length + ')';
  });
}

function build(filter) {
  currentFilter = filter;
  var masonry = document.getElementById('masonry');
  if (!masonry) return;
  var items = getPhotos(filter);
  if (!items.length) {
    masonry.innerHTML = '<div class="no-results">No photos in this category yet.</div>';
    return;
  }
  masonry.innerHTML = items.map(function(item) {
    var photo  = item.photo;
    var folder = item.folder;
    var label  = photo.description || '';
    var tag    = folder.name;
    return '<div class="m-item">'
      + '<img src="' + photo.filename.replace(/"/g, '') + '" alt="' + label.replace(/"/g, '') + '" loading="lazy">'
      + '<div class="overlay">'
      + '<div class="ol-name">' + label + '</div>'
      + '<div class="ol-tag">' + tag + '</div>'
      + '</div></div>';
  }).join('');
}

function setFilter(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  build(cat);
}

fetch('gallery-data.json?_=' + Date.now())
  .then(function(r) {
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.json();
  })
  .then(function(d) {
    galleryData = d;
    updateCounts();
    build('all');
  })
  .catch(function() {
    var masonry = document.getElementById('masonry');
    if (masonry) masonry.innerHTML = '<div class="no-results">Gallery coming soon — follow us on Instagram and Facebook!</div>';
  });`;

  fullHtml = fullHtml.slice(0, startIdx) + NEW_SCRIPT + '\n</script>' + fullHtml.slice(endIdx + SCRIPT_END.length);
  fs.writeFileSync(fullPath, fullHtml, 'utf8');
  console.log('\ngallery_full.html: replaced hardcoded ITEMS (' + oldLen + ' chars) with gallery-data.json fetch (' + (NEW_SCRIPT.length + 10) + ' chars).');
}

console.log('\nDone.');
