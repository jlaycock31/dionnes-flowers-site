const fs   = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'gallery.html');
let html = fs.readFileSync(filePath, 'utf8');

// Find the script tag that contains "const ITEMS = [" and replace the entire
// block (from <script> through build('all');) with the new gallery-data fetch script.
const SCRIPT_START = '<script>\nconst ITEMS = [';
const SCRIPT_END   = "build('all');\n</script>";

const startIdx = html.indexOf(SCRIPT_START);
const endIdx   = html.indexOf(SCRIPT_END);

if (startIdx === -1 || endIdx === -1) {
  console.error('MISS: Could not locate the ITEMS script block in gallery.html');
  process.exit(1);
}
console.log('OK   Found ITEMS script block at chars', startIdx, '–', endIdx + SCRIPT_END.length);

const NEW_SCRIPT = `<script>
// Gallery page — reads from gallery-data.json (managed via admin panel)
var galleryData = null;
var currentFilter = 'all';

// folder id → filter category mapping (matches gallery-data.json folder ids)
var FOLDER_IDS = ['arrangements', 'fresh', 'weddings', 'seasonal'];

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
    var src    = photo.filename;
    var label  = photo.description || '';
    var tag    = folder.name;
    return '<div class="m-item">'
      + '<img src="' + src.replace(/"/g, '') + '" alt="' + label.replace(/"/g, '') + '" loading="lazy">'
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

// Fetch gallery-data.json from the same origin
fetch('gallery-data.json?_=' + Date.now())
  .then(function(r) {
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.json();
  })
  .then(function(data) {
    galleryData = data;
    updateCounts();
    build('all');
  })
  .catch(function() {
    var masonry = document.getElementById('masonry');
    if (masonry) masonry.innerHTML = '<div class="no-results">Gallery coming soon — follow us on Instagram and Facebook for the latest!</div>';
  });`;

html = html.slice(0, startIdx) + NEW_SCRIPT + '\n</script>' + html.slice(endIdx + SCRIPT_END.length);

fs.writeFileSync(filePath, html, 'utf8');
console.log('OK   gallery.html rewritten with gallery-data.json fetch.');
console.log('     Old script was ' + (endIdx + SCRIPT_END.length - startIdx) + ' bytes, new is ' + (NEW_SCRIPT.length + 10) + ' bytes.');
