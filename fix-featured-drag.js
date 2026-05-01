const fs   = require('fs');
const path = require('path');

// ── Patch admin.html ──────────────────────────────────────────────────────────
const adminPath = path.join(__dirname, 'admin.html');
let html = fs.readFileSync(adminPath, 'utf8');
let allOk = true;

function patch(label, search, replace) {
  if (!html.includes(search)) { console.error('MISS [' + label + ']'); allOk = false; return; }
  html = html.replace(search, replace);
  console.log('OK   [' + label + ']');
}

// ── 1. Featured photos CSS ────────────────────────────────────────────────────
patch('featured CSS',
  `.gal-upload-zone:hover{border-color:#b05a3a}
.photo-prompt-sub{font-size:11px;color:#b8b2a0;margin-top:2px}`,
  `.gal-upload-zone:hover{border-color:#b05a3a}
.photo-prompt-sub{font-size:11px;color:#b8b2a0;margin-top:2px}
/* ── Featured photos section ── */
.feat-section{padding:1.25rem 1.5rem 1rem;border-bottom:1px solid #e8ddd0;background:#fdf6ee}
.feat-section-title{font-size:11px;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;color:#9a7a5a;margin-bottom:0.85rem}
.feat-slots{display:grid;grid-template-columns:repeat(4,1fr);gap:0.75rem;margin-bottom:0.85rem}
.feat-slot{display:flex;flex-direction:column;align-items:center;gap:0.4rem}
.feat-slot-label{font-size:10px;letter-spacing:0.08em;text-transform:uppercase;color:#9a7a5a;font-weight:500}
.feat-thumb{width:100%;aspect-ratio:1;object-fit:cover;border-radius:2px;border:1px solid #e8ddd0;background:#f0e8d8;display:block}
.feat-thumb-empty{width:100%;aspect-ratio:1;border-radius:2px;border:1.5px dashed #e8ddd0;background:#f5ede0;display:flex;align-items:center;justify-content:center}
.feat-save-row{display:flex;align-items:center;gap:0.75rem}
.feat-saved-msg{font-size:12px;color:#5a7a4a}
.feat-picker-overlay{display:none;position:fixed;inset:0;z-index:3000;background:rgba(0,0,0,0.55);overflow-y:auto}
.feat-picker-box{background:#fff;margin:2rem auto;max-width:680px;border-radius:4px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.22)}
.feat-picker-header{display:flex;align-items:center;justify-content:space-between;padding:1rem 1.25rem;border-bottom:1px solid #e8ddd0;background:#f5ede0}
.feat-picker-title{font-family:'Jost',sans-serif;font-size:13px;font-weight:500;letter-spacing:0.06em;text-transform:uppercase;color:#7a5a3a;flex:1}
.feat-picker-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;padding:0.75rem}
.feat-picker-item{position:relative;aspect-ratio:1;cursor:pointer;overflow:hidden;border-radius:2px;border:2.5px solid transparent;transition:border-color 0.15s}
.feat-picker-item:hover,.feat-picker-item.selected{border-color:#b05a3a}
.feat-picker-item img{width:100%;height:100%;object-fit:cover;display:block}
@media(max-width:580px){.feat-slots{grid-template-columns:repeat(2,1fr)}.feat-picker-grid{grid-template-columns:repeat(3,1fr)}}`
);

// ── 2. Featured section HTML + picker overlay (before gal-toolbar) ─────────────
patch('featured HTML',
  `    <div class="gal-toolbar">`,
  `    <!-- Home Page Featured Photos -->
    <div class="feat-section">
      <div class="feat-section-title">Home Page Featured Photos</div>
      <div class="feat-slots" id="feat-slots"></div>
      <div class="feat-save-row">
        <button class="btn-primary" style="font-size:12px;padding:9px 16px" onclick="saveFeaturedPhotos()">Save Featured Photos</button>
        <span class="feat-saved-msg" id="feat-saved-msg" style="display:none">&#x2713; Saved to GitHub!</span>
      </div>
    </div>
    <!-- Featured photo picker overlay -->
    <div class="feat-picker-overlay" id="feat-picker-overlay" onclick="if(event.target===this)closeFeaturedPicker()">
      <div class="feat-picker-box">
        <div class="feat-picker-header">
          <span class="feat-picker-title" id="feat-picker-title">Choose a photo</span>
          <button class="overlay-close" onclick="closeFeaturedPicker()">&#x2715;</button>
        </div>
        <div class="feat-picker-grid" id="feat-picker-grid"></div>
      </div>
    </div>

    <div class="gal-toolbar">`
);

// ── 3. Featured JS functions (before renderGallery) ───────────────────────────
patch('featured JS',
  `function renderGallery() {`,
  `var featSlot = null;
var featSelected = ['', '', '', ''];

function renderFeaturedSlots() {
  var slotsEl = el('feat-slots');
  if (!slotsEl || !S.gallery) return;
  var featured = (S.gallery.featured || []).slice();
  while (featured.length < 4) featured.push('');
  featSelected = featured.slice(0, 4);
  slotsEl.innerHTML = featSelected.map(function(fn, i) {
    var src = fn ? rawUrl(fn) : '';
    var thumb = src
      ? '<img class="feat-thumb" src="' + x(src) + '" alt="Slot ' + (i + 1) + '">'
      : '<div class="feat-thumb-empty"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c8b8a0" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>';
    return '<div class="feat-slot">'
      + '<div class="feat-slot-label">Slot ' + (i + 1) + '</div>'
      + '<div id="feat-slot-' + i + '-thumb">' + thumb + '</div>'
      + '<button class="btn-outline" style="font-size:11px;padding:5px 10px" onclick="openFeaturedPicker(' + i + ')">Change</button>'
      + '</div>';
  }).join('');
}

function openFeaturedPicker(slotIndex) {
  if (!S.gallery) return;
  featSlot = slotIndex;
  el('feat-picker-title').textContent = 'Choose a photo — Slot ' + (slotIndex + 1);
  var allPhotos = [];
  (S.gallery.folders || []).forEach(function(folder) {
    (folder.photos || []).forEach(function(p) { allPhotos.push(p); });
  });
  var currentFn = featSelected[slotIndex] || '';
  el('feat-picker-grid').innerHTML = allPhotos.map(function(p) {
    var src = rawUrl(p.filename);
    var sel = p.filename === currentFn ? ' selected' : '';
    var fnEsc = (p.filename || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
    var descEsc = x(p.description || '');
    return '<div class="feat-picker-item' + sel + '" onclick="pickFeatured(this.dataset.fn)" data-fn="' + fnEsc + '" title="' + descEsc + '">'
      + '<img src="' + x(src) + '" loading="lazy" alt="' + descEsc + '">'
      + '</div>';
  }).join('');
  el('feat-picker-overlay').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeFeaturedPicker() {
  el('feat-picker-overlay').style.display = 'none';
  document.body.style.overflow = '';
  featSlot = null;
}

function pickFeatured(filename) {
  if (featSlot === null || !filename) return;
  featSelected[featSlot] = filename;
  var thumbEl = el('feat-slot-' + featSlot + '-thumb');
  if (thumbEl) {
    var src = rawUrl(filename);
    thumbEl.innerHTML = '<img class="feat-thumb" src="' + x(src) + '" alt="Slot ' + (featSlot + 1) + '">';
  }
  closeFeaturedPicker();
}

async function saveFeaturedPhotos() {
  if (isPublishing || !S.gallery) return;
  isPublishing = true;
  S.gallery.featured = featSelected.slice();
  spinning('Saving featured photos...');
  try {
    await pushGalleryData('Gallery: update home featured photos');
    bumpUpdated();
    var msg = el('feat-saved-msg');
    if (msg) { msg.style.display = 'inline'; setTimeout(function() { msg.style.display = 'none'; }, 3000); }
    closePub();
  } catch(e) { pubErr(); } finally { isPublishing = false; }
}

function renderGallery() {`
);

// ── 4. Call renderFeaturedSlots in renderGallery .then() path ─────────────────
patch('renderFeaturedSlots in then()',
  `    loadGalleryRemote().then(function() {
      renderGalleryFolderBar();
      renderGalleryGrid();`,
  `    loadGalleryRemote().then(function() {
      renderFeaturedSlots();
      renderGalleryFolderBar();
      renderGalleryGrid();`
);

// ── 5. Call renderFeaturedSlots at end of renderGallery (already-loaded path) ──
patch('renderFeaturedSlots at end of renderGallery',
  `  renderGalleryFolderBar();
  renderGalleryGrid();
}

function renderGalleryFolderBar(`,
  `  renderFeaturedSlots();
  renderGalleryFolderBar();
  renderGalleryGrid();
}

function renderGalleryFolderBar(`
);

// ── 6. Fix All Photos drag-drop: desktop drop ─────────────────────────────────
patch('drag-drop all-photos desktop fix',
  `      card.classList.remove('drag-over');
      if (!dragging || card === dragging || S.galleryFolder === 'all') return;
      var fromId = dragging.dataset.pid;
      var toId   = card.dataset.pid;
      var folder = S.gallery.folders.find(function(f) { return f.id === S.galleryFolder; });`,
  `      card.classList.remove('drag-over');
      if (!dragging || card === dragging) return;
      var fromFid = dragging.dataset.fid;
      var toFid   = card.dataset.fid;
      if (fromFid !== toFid) return;
      var fromId = dragging.dataset.pid;
      var toId   = card.dataset.pid;
      var folder = S.gallery.folders.find(function(f) { return f.id === fromFid; });`
);

// ── 7. Fix All Photos drag-drop: touch touchend ───────────────────────────────
patch('drag-drop all-photos touch fix',
  `      if (over && over !== dragging && S.galleryFolder !== 'all') {
        var fromId = dragging.dataset.pid;
        var toId   = over.dataset.pid;
        var folder = S.gallery.folders.find(function(f) { return f.id === S.galleryFolder; });
        if (folder) {
          var fromIdx = folder.photos.findIndex(function(p) { return p.id === fromId; });
          var toIdx   = folder.photos.findIndex(function(p) { return p.id === toId; });
          if (fromIdx !== -1 && toIdx !== -1) {
            var item = folder.photos.splice(fromIdx, 1)[0];
            folder.photos.splice(toIdx, 0, item);
            folder.photos.forEach(function(p, i) { p.order = i + 1; });
            S.galleryDirty = true;
            renderGalleryGrid();
            el('gal-order-bar').style.display = 'flex';
          }
        }
      }
      dragging = null;`,
  `      if (over && over !== dragging) {
        var fromFid = dragging.dataset.fid;
        var toFid   = over.dataset.fid;
        if (fromFid === toFid) {
          var fromId = dragging.dataset.pid;
          var toId   = over.dataset.pid;
          var folder = S.gallery.folders.find(function(f) { return f.id === fromFid; });
          if (folder) {
            var fromIdx = folder.photos.findIndex(function(p) { return p.id === fromId; });
            var toIdx   = folder.photos.findIndex(function(p) { return p.id === toId; });
            if (fromIdx !== -1 && toIdx !== -1) {
              var item = folder.photos.splice(fromIdx, 1)[0];
              folder.photos.splice(toIdx, 0, item);
              folder.photos.forEach(function(p, i) { p.order = i + 1; });
              S.galleryDirty = true;
              renderGalleryGrid();
              el('gal-order-bar').style.display = 'flex';
            }
          }
        }
      }
      dragging = null;`
);

// ── Write admin.html ──────────────────────────────────────────────────────────
if (allOk) {
  fs.writeFileSync(adminPath, html, 'utf8');
  console.log('\nadmin.html patched successfully.');
} else {
  console.error('\nOne or more patches missed — admin.html NOT written.');
  process.exit(1);
}

// ── Patch index.html ──────────────────────────────────────────────────────────
const indexPath = path.join(__dirname, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');
let indexOk = true;

function patchIndex(label, search, replace) {
  if (!indexHtml.includes(search)) { console.error('MISS index [' + label + ']'); indexOk = false; return; }
  indexHtml = indexHtml.replace(search, replace);
  console.log('OK   index [' + label + ']');
}

patchIndex('gallery strip',
  `<div class="gallery-strip">
  <a href="gallery.html"><img src="photos/gallery-preview-1.jpg" alt="Garden flowers" loading="lazy"></a>
  <a href="gallery.html"><img src="photos/gallery-preview-2.jpg" alt="Flower arrangement" loading="lazy"></a>
  <a href="gallery.html"><img src="photos/gallery-preview-3.jpg" alt="Fresh cut flowers" loading="lazy"></a>
  <a href="gallery.html"><img src="photos/gallery-preview-4.jpg" alt="Dahlia bouquet" loading="lazy"></a>
</div>`,
  `<div class="gallery-strip" id="gallery-strip">
  <a href="gallery.html"><img id="feat-img-0" src="photos/gallery/spring-garden-arrangement.jpg" alt="Garden flowers" loading="lazy"></a>
  <a href="gallery.html"><img id="feat-img-1" src="photos/gallery/mixed-dahlia-bouquet.jpg" alt="Flower arrangement" loading="lazy"></a>
  <a href="gallery.html"><img id="feat-img-2" src="photos/gallery/caramel-dahlia-close-up.jpg" alt="Fresh cut flowers" loading="lazy"></a>
  <a href="gallery.html"><img id="feat-img-3" src="photos/gallery/autumn-dahlias-maple.jpg" alt="Dahlia bouquet" loading="lazy"></a>
</div>
<script>
(function(){
  fetch('gallery-data.json?_='+Date.now())
    .then(function(r){return r.ok?r.json():Promise.reject();})
    .then(function(d){
      var f=d.featured;
      if(f&&f.length===4)f.forEach(function(src,i){var img=document.getElementById('feat-img-'+i);if(img&&src)img.src=src;});
    })
    .catch(function(){});
})();
</script>`
);

if (indexOk) {
  fs.writeFileSync(indexPath, indexHtml, 'utf8');
  console.log('index.html patched successfully.');
} else {
  console.error('index.html patch missed — NOT written.');
  process.exit(1);
}

// ── Update gallery-data.json ──────────────────────────────────────────────────
const dataPath = path.join(__dirname, 'gallery-data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
if (!data.featured) {
  data.featured = [
    'photos/gallery/spring-garden-arrangement.jpg',
    'photos/gallery/mixed-dahlia-bouquet.jpg',
    'photos/gallery/caramel-dahlia-close-up.jpg',
    'photos/gallery/autumn-dahlias-maple.jpg'
  ];
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
  console.log('gallery-data.json: added featured array.');
} else {
  console.log('gallery-data.json: featured already present — skipped.');
}

console.log('\nDone.');
