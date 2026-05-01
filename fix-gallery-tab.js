const fs   = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'admin.html');
let html = fs.readFileSync(filePath, 'utf8');
let allOk = true;

function patch(label, search, replace) {
  if (!html.includes(search)) {
    console.error('MISS [' + label + ']');
    allOk = false;
    return;
  }
  html = html.replace(search, replace);
  console.log('OK   [' + label + ']');
}

// ── 1. CSS ────────────────────────────────────────────────────────────────────
patch('gallery CSS',
  '.archived-card .card-meta{color:#b8a88a}',
  '.archived-card .card-meta{color:#b8a88a}'
  + '\n/* ── Gallery tab ── */'
  + '\n.gal-toolbar{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;margin-bottom:1.25rem;flex-wrap:wrap}'
  + '\n.gal-folder-bar{display:flex;flex-wrap:wrap;gap:0.5rem;flex:1}'
  + '\n.gal-pill{padding:6px 14px;border-radius:20px;border:1px solid #c8b8a0;background:transparent;font-family:\'Jost\',sans-serif;font-size:11px;font-weight:500;letter-spacing:0.07em;text-transform:uppercase;color:#7a5a3a;cursor:pointer;white-space:nowrap;transition:all 0.15s}'
  + '\n.gal-pill.active{background:#b05a3a;color:#fff;border-color:#b05a3a}'
  + '\n.gal-pill:hover:not(.active){background:#f0e8d8}'
  + '\n.gal-order-bar{display:none;align-items:center;gap:0.75rem;padding:0.6rem 0.9rem;margin-bottom:1rem;background:#f5ede0;border-radius:3px;border-left:3px solid #b05a3a}'
  + '\n.gal-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:0.9rem}'
  + '\n.gal-card{background:#fff;border:0.5px solid #e8ddd0;border-radius:3px;overflow:hidden;position:relative;transition:box-shadow 0.15s;cursor:default}'
  + '\n.gal-card.dragging{opacity:0.45;box-shadow:0 4px 20px rgba(0,0,0,0.18)}'
  + '\n.gal-card.drag-over{box-shadow:0 0 0 2.5px #b05a3a}'
  + '\n.gal-drag-handle{position:absolute;top:5px;left:5px;background:rgba(255,255,255,0.9);border-radius:2px;padding:1px 5px;font-size:13px;cursor:grab;color:#7a5a3a;line-height:1.4;z-index:2;user-select:none}'
  + '\n.gal-drag-handle:active{cursor:grabbing}'
  + '\n.gal-img-wrap{width:100%;aspect-ratio:1;overflow:hidden;background:#f0e8d8;position:relative}'
  + '\n.gal-img-wrap img{width:100%;height:100%;object-fit:cover;display:block}'
  + '\n.gal-img-none{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:11px;color:#b8a88a;font-family:\'Jost\',sans-serif}'
  + '\n.gal-card-body{padding:0.55rem}'
  + '\n.gal-card-desc{font-size:11px;color:#5a3a1a;font-weight:300;line-height:1.4;min-height:1.4em;border-radius:2px;padding:2px 4px;margin-bottom:0.45rem;outline:none;word-break:break-word}'
  + '\n.gal-card-desc:focus{background:#fdf6ee;box-shadow:0 0 0 1.5px #b05a3a;border-radius:2px}'
  + '\n.gal-card-actions{display:flex;gap:0.35rem;align-items:center}'
  + '\n.gal-folder-sel{font-size:10px;font-family:\'Jost\',sans-serif;border:0.5px solid #c8b8a0;border-radius:2px;padding:3px 4px;background:#fff;color:#7a5a3a;cursor:pointer;flex:1;min-width:0;max-width:100px}'
  + '\n.gal-upload-zone{border:1.5px dashed #c8b8a0;border-radius:3px;min-height:150px;display:flex;align-items:center;justify-content:center;cursor:pointer;background:#fdf6ee;transition:border-color 0.15s;flex-direction:column;gap:0.5rem;overflow:hidden}'
  + '\n.gal-upload-zone:hover{border-color:#b05a3a}'
  + '\n.photo-prompt-sub{font-size:11px;color:#b8b2a0;margin-top:2px}'
);

// ── 2. Gallery tab button (between Archive and Add New) ────────────────────────
patch('gallery tab button',
  '<button class="tab-btn" data-tab="archive" onclick="switchTab(\'archive\')">📦 Archive</button>\n    <button class="tab-btn" data-tab="add" onclick="switchTab(\'add\')">+ Add New</button>',
  '<button class="tab-btn" data-tab="archive" onclick="switchTab(\'archive\')">📦 Archive</button>\n    <button class="tab-btn" data-tab="gallery" onclick="switchTab(\'gallery\')">🖼 Gallery</button>\n    <button class="tab-btn" data-tab="add" onclick="switchTab(\'add\')">+ Add New</button>'
);

// ── 3. Gallery tab panel HTML (before <!-- Tab 4: Add New -->) ─────────────────
patch('gallery tab panel HTML',
  `  <!-- Tab 4: Add New -->`,
  `  <!-- Tab: Gallery -->
  <div class="tab-panel" id="tab-gallery">
    <div class="gal-toolbar">
      <div class="gal-folder-bar" id="gal-folder-bar"></div>
      <button class="btn-primary" onclick="openGalAddPhoto()" style="flex-shrink:0;white-space:nowrap;font-size:12px;padding:9px 16px">+ Add Photo</button>
    </div>
    <div class="gal-order-bar" id="gal-order-bar">
      <span style="font-size:12px;color:#7a5a3a;font-weight:300;flex:1">Order changed — save to publish</span>
      <button class="btn-sm btn-primary" onclick="saveGalleryOrder()">Save Order</button>
      <button class="btn-sm btn-outline" onclick="discardGalleryOrder()">Discard</button>
    </div>
    <div class="gal-grid" id="gal-grid"></div>
  </div>

  <!-- Tab 4: Add New -->`
);

// ── 4. Gallery add-photo overlay (after restore-soon-overlay, before <script>) ─
patch('gallery add-photo overlay',
  `</div>



<script>`,
  `</div>

<!-- ════════════════════════════════════════════════
  GALLERY ADD PHOTO
════════════════════════════════════════════════ -->
<div id="gal-add-overlay" class="overlay" style="display:none" onclick="if(event.target===this)closeGalAddPhoto()">
  <div class="overlay-box">
    <div class="overlay-header">
      <h2 class="overlay-title">Add Photo to Gallery</h2>
      <button class="btn-close" onclick="closeGalAddPhoto()">✕</button>
    </div>
    <div class="overlay-body">
      <div class="gal-upload-zone" id="gal-upload-zone" onclick="el('gal-photo-file').click()">
        <img id="gal-photo-preview" style="display:none;max-width:100%;max-height:180px;object-fit:contain">
        <div id="gal-upload-prompt">
          <div class="photo-prompt-icon" style="text-align:center;font-size:2rem">🖼</div>
          <div class="photo-prompt-text" style="text-align:center;font-size:12px;color:#7a5a3a;font-weight:300">Tap to choose a photo</div>
          <div class="photo-prompt-sub" style="text-align:center">Max 1200px &middot; JPEG compressed</div>
        </div>
      </div>
      <div id="gal-photo-size" class="photo-size-hint" style="display:none;margin-top:0.4rem"></div>
      <input type="file" id="gal-photo-file" accept="image/*" style="display:none" onchange="handleGalPhoto(this)">
      <div class="form-group" style="margin-top:1rem">
        <label class="form-label">Folder</label>
        <select id="gal-folder-pick" class="form-input"></select>
      </div>
      <div class="form-group">
        <label class="form-label">Description</label>
        <input type="text" id="gal-desc" class="form-input" placeholder="e.g. Summer dahlia arrangement">
      </div>
    </div>
    <div class="overlay-footer">
      <button class="btn-outline" onclick="closeGalAddPhoto()">Cancel</button>
      <button class="btn-primary" onclick="publishGalPhoto()">Add to Gallery ✓</button>
    </div>
  </div>
</div>



<script>`
);

// ── 5. Add gallery state to S object ──────────────────────────────────────────
patch('gallery state in S',
  `  data: { available: [], coming_soon: [], archived: [] },`,
  `  data: { available: [], coming_soon: [], archived: [] },
  gallery: null,
  gallerySha: null,
  galleryFolder: 'all',
  galleryDirty: false,
  galNewPhoto: null,`
);

// ── 6. Add gallery to renderTab ───────────────────────────────────────────────
patch('renderTab gallery case',
  `  if (S.tab === 'available')   renderAvailable();
  if (S.tab === 'coming_soon') renderComingSoon();
  if (S.tab === 'archive')     renderArchive();`,
  `  if (S.tab === 'available')   renderAvailable();
  if (S.tab === 'coming_soon') renderComingSoon();
  if (S.tab === 'archive')     renderArchive();
  if (S.tab === 'gallery')     renderGallery();`
);

// ── 7. Add all gallery JS functions (before LISTING CARDS section) ────────────
patch('gallery JS functions',
  `/* ─────────────────────────────────────────────────────────
   LISTING CARDS
───────────────────────────────────────────────────────── */`,
  `/* ─────────────────────────────────────────────────────────
   GALLERY
───────────────────────────────────────────────────────── */
async function loadGalleryRemote() {
  var f = await ghGet('gallery-data.json');
  var raw = f.content.replace(/[\\n\\r]/g, '');
  var json = decodeURIComponent(escape(atob(raw)));
  S.gallery = JSON.parse(json);
  S.gallerySha = f.sha;
}

async function pushGalleryData(msg) {
  var f = await ghGet('gallery-data.json');
  await ghPut('gallery-data.json', JSON.stringify(S.gallery, null, 2), f.sha, msg || 'Update gallery');
}

function renderGallery() {
  if (!hasCfg()) { el('gal-grid').innerHTML = noSettingsBanner(); return; }
  if (!S.gallery) {
    el('gal-grid').innerHTML = '<p class="empty-msg" style="text-align:center;padding:2rem">Loading gallery…</p>';
    el('gal-folder-bar').innerHTML = '';
    loadGalleryRemote().then(function() {
      renderGalleryFolderBar();
      renderGalleryGrid();
    }).catch(function(e) {
      el('gal-grid').innerHTML = '<p class="empty-msg" style="color:#b05a3a">Could not load gallery-data.json: ' + x(e.message) + '</p>';
    });
    return;
  }
  renderGalleryFolderBar();
  renderGalleryGrid();
}

function renderGalleryFolderBar() {
  var bar = el('gal-folder-bar');
  if (!bar || !S.gallery) return;
  var folders = S.gallery.folders || [];
  var total = folders.reduce(function(n, f) { return n + (f.photos || []).length; }, 0);
  var html = '<button class="gal-pill' + (S.galleryFolder === 'all' ? ' active' : '') + '" onclick="switchGalleryFolder(\'all\')">All Photos (' + total + ')</button>';
  folders.forEach(function(f) {
    html += '<button class="gal-pill' + (S.galleryFolder === f.id ? ' active' : '') + '" onclick="switchGalleryFolder(\'' + f.id + '\')">' + x(f.name) + ' (' + (f.photos || []).length + ')</button>';
  });
  bar.innerHTML = html;
}

function switchGalleryFolder(folderId) {
  S.galleryFolder = folderId;
  S.galleryDirty  = false;
  hide('gal-order-bar');
  renderGalleryFolderBar();
  renderGalleryGrid();
}

function renderGalleryGrid() {
  var grid = el('gal-grid');
  if (!grid || !S.gallery) return;
  var folders = S.gallery.folders || [];
  var items = [];

  if (S.galleryFolder === 'all') {
    folders.forEach(function(f) {
      (f.photos || []).forEach(function(p) { items.push({ photo: p, folderId: f.id }); });
    });
  } else {
    var folder = folders.find(function(f) { return f.id === S.galleryFolder; });
    if (folder) {
      (folder.photos || []).forEach(function(p) { items.push({ photo: p, folderId: folder.id }); });
    }
  }

  if (!items.length) {
    grid.innerHTML = '<p class="empty-msg">No photos in this folder yet.<br>Click <b>+ Add Photo</b> to get started.</p>';
    return;
  }

  var folderOptions = folders.map(function(f) {
    return '<option value="' + x(f.id) + '">' + x(f.name) + '</option>';
  }).join('');

  grid.innerHTML = items.map(function(item) {
    var p   = item.photo;
    var fid = item.folderId;
    var src = rawUrl(p.filename);
    var opts = folders.map(function(f) {
      return '<option value="' + x(f.id) + '"' + (f.id === fid ? ' selected' : '') + '>' + x(f.name) + '</option>';
    }).join('');
    return '<div class="gal-card" draggable="true" data-pid="' + x(p.id) + '" data-fid="' + x(fid) + '">'
      + '<div class="gal-drag-handle" title="Drag to reorder">⠇</div>'
      + '<div class="gal-img-wrap">'
      + (src ? '<img src="' + x(src) + '" loading="lazy" alt="' + x(p.description || '') + '">' : '<div class="gal-img-none">No image</div>')
      + '</div>'
      + '<div class="gal-card-body">'
      + '<div class="gal-card-desc" contenteditable="true" data-pid="' + x(p.id) + '" data-fid="' + x(fid) + '"'
      + ' onblur="saveGalleryDesc(this)" onkeydown="if(event.key===\'Enter\'){event.preventDefault();this.blur()}">'
      + x(p.description || '') + '</div>'
      + '<div class="gal-card-actions">'
      + '<select class="gal-folder-sel" onchange="moveGalleryPhoto(\'' + x(p.id) + '\',\'' + x(fid) + '\',this.value)">' + opts + '</select>'
      + '<button class="btn-sm btn-delete" onclick="confirmDeleteGalleryPhoto(\'' + x(p.id) + '\',\'' + x(fid) + '\')">Del</button>'
      + '</div></div></div>';
  }).join('');

  initGalleryDragDrop();
}

function initGalleryDragDrop() {
  var cards = document.querySelectorAll('.gal-card');
  var dragging = null;

  cards.forEach(function(card) {
    card.addEventListener('dragstart', function(e) {
      dragging = card;
      setTimeout(function() { card.classList.add('dragging'); }, 0);
      e.dataTransfer.effectAllowed = 'move';
    });
    card.addEventListener('dragend', function() {
      card.classList.remove('dragging');
      document.querySelectorAll('.gal-card').forEach(function(c) { c.classList.remove('drag-over'); });
      dragging = null;
    });
    card.addEventListener('dragover', function(e) {
      e.preventDefault();
      if (card !== dragging) {
        document.querySelectorAll('.gal-card').forEach(function(c) { c.classList.remove('drag-over'); });
        card.classList.add('drag-over');
      }
    });
    card.addEventListener('drop', function(e) {
      e.preventDefault();
      card.classList.remove('drag-over');
      if (!dragging || card === dragging || S.galleryFolder === 'all') return;
      var fromId = dragging.dataset.pid;
      var toId   = card.dataset.pid;
      var folder = S.gallery.folders.find(function(f) { return f.id === S.galleryFolder; });
      if (!folder) return;
      var fromIdx = folder.photos.findIndex(function(p) { return p.id === fromId; });
      var toIdx   = folder.photos.findIndex(function(p) { return p.id === toId; });
      if (fromIdx === -1 || toIdx === -1) return;
      var item = folder.photos.splice(fromIdx, 1)[0];
      folder.photos.splice(toIdx, 0, item);
      folder.photos.forEach(function(p, i) { p.order = i + 1; });
      S.galleryDirty = true;
      renderGalleryGrid();
      el('gal-order-bar').style.display = 'flex';
    });

    // Touch drag-and-drop
    var touchStartX, touchStartY, touchClone;
    card.addEventListener('touchstart', function(e) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      dragging = card;
      touchClone = card.cloneNode(true);
      touchClone.style.cssText = 'position:fixed;opacity:0.7;pointer-events:none;z-index:9999;width:' + card.offsetWidth + 'px;box-shadow:0 4px 16px rgba(0,0,0,0.2)';
      touchClone.style.left = touchStartX + 'px';
      touchClone.style.top  = touchStartY + 'px';
      document.body.appendChild(touchClone);
      card.classList.add('dragging');
    }, { passive: true });

    card.addEventListener('touchmove', function(e) {
      if (!dragging) return;
      e.preventDefault();
      var t = e.touches[0];
      if (touchClone) { touchClone.style.left = (t.clientX - card.offsetWidth / 2) + 'px'; touchClone.style.top = (t.clientY - card.offsetHeight / 2) + 'px'; }
      var target = document.elementFromPoint(t.clientX, t.clientY);
      var over = target ? target.closest('.gal-card') : null;
      document.querySelectorAll('.gal-card').forEach(function(c) { c.classList.remove('drag-over'); });
      if (over && over !== dragging) over.classList.add('drag-over');
    }, { passive: false });

    card.addEventListener('touchend', function(e) {
      if (!dragging) return;
      if (touchClone) { touchClone.remove(); touchClone = null; }
      card.classList.remove('dragging');
      var t = e.changedTouches[0];
      var target = document.elementFromPoint(t.clientX, t.clientY);
      var over = target ? target.closest('.gal-card') : null;
      document.querySelectorAll('.gal-card').forEach(function(c) { c.classList.remove('drag-over'); });
      if (over && over !== dragging && S.galleryFolder !== 'all') {
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
      dragging = null;
    });
  });
}

function saveGalleryDesc(elem) {
  var photoId  = elem.dataset.pid;
  var folderId = elem.dataset.fid;
  var newDesc  = elem.textContent.trim();
  var folder   = (S.gallery.folders || []).find(function(f) { return f.id === folderId; });
  if (!folder) return;
  var photo = folder.photos.find(function(p) { return p.id === photoId; });
  if (!photo || photo.description === newDesc) return;
  photo.description = newDesc;
  pushGalleryData('Gallery: update description').catch(function(e) { console.error('desc save failed:', e); });
}

function confirmDeleteGalleryPhoto(photoId, folderId) {
  showActionConfirm(
    'Remove this photo?',
    'Removes it from the gallery — the image file stays on GitHub.',
    'Yes, Remove It', 'btn-danger',
    function() { deleteGalleryPhoto(photoId, folderId); }
  );
}

async function deleteGalleryPhoto(photoId, folderId) {
  if (isPublishing) return;
  isPublishing = true;
  var folder = (S.gallery.folders || []).find(function(f) { return f.id === folderId; });
  if (!folder) { isPublishing = false; return; }
  var idx = folder.photos.findIndex(function(p) { return p.id === photoId; });
  if (idx === -1) { isPublishing = false; return; }
  folder.photos.splice(idx, 1);
  spinning('Removing from gallery…');
  try {
    await pushGalleryData('Gallery: remove photo');
    bumpUpdated();
    renderGalleryFolderBar();
    renderGalleryGrid();
    closePub();
  } catch(e) { pubErr(); } finally { isPublishing = false; }
}

async function moveGalleryPhoto(photoId, fromFolderId, toFolderId) {
  if (fromFolderId === toFolderId || isPublishing) return;
  isPublishing = true;
  var fromFolder = (S.gallery.folders || []).find(function(f) { return f.id === fromFolderId; });
  var toFolder   = (S.gallery.folders || []).find(function(f) { return f.id === toFolderId; });
  if (!fromFolder || !toFolder) { isPublishing = false; return; }
  var idx = fromFolder.photos.findIndex(function(p) { return p.id === photoId; });
  if (idx === -1) { isPublishing = false; return; }
  var photo = fromFolder.photos.splice(idx, 1)[0];
  photo.order = (toFolder.photos || []).length + 1;
  toFolder.photos.push(photo);
  spinning('Moving photo…');
  try {
    await pushGalleryData('Gallery: move to ' + toFolder.name);
    bumpUpdated();
    S.galleryFolder = toFolderId;
    renderGalleryFolderBar();
    renderGalleryGrid();
    closePub();
  } catch(e) {
    toFolder.photos.pop();
    fromFolder.photos.splice(idx, 0, photo);
    pubErr();
  } finally { isPublishing = false; }
}

async function saveGalleryOrder() {
  if (isPublishing) return;
  isPublishing = true;
  spinning('Saving new order…');
  try {
    await pushGalleryData('Gallery: reorder photos');
    bumpUpdated();
    S.galleryDirty = false;
    hide('gal-order-bar');
    closePub();
  } catch(e) { pubErr(); } finally { isPublishing = false; }
}

function discardGalleryOrder() {
  S.galleryDirty = false;
  hide('gal-order-bar');
  S.gallery = null;
  renderGallery();
}

function openGalAddPhoto() {
  if (!S.gallery) return;
  S.galNewPhoto = null;
  el('gal-photo-preview').src = '';
  el('gal-photo-preview').style.display = 'none';
  el('gal-upload-prompt').style.display = '';
  hide('gal-photo-size');
  setVal('gal-desc', '');
  el('gal-photo-file').value = '';
  var folders = S.gallery.folders || [];
  el('gal-folder-pick').innerHTML = folders.map(function(f) {
    return '<option value="' + x(f.id) + '"' + (f.id === S.galleryFolder && S.galleryFolder !== 'all' ? ' selected' : '') + '>' + x(f.name) + '</option>';
  }).join('');
  show('gal-add-overlay');
  document.body.style.overflow = 'hidden';
}

function closeGalAddPhoto() {
  hide('gal-add-overlay');
  document.body.style.overflow = '';
}

async function handleGalPhoto(input) {
  if (!input.files[0]) return;
  var photo = await compressImage(input.files[0], 1200, 0.65);
  S.galNewPhoto = photo;
  el('gal-photo-preview').src = photo.dataUrl;
  el('gal-photo-preview').style.display = 'block';
  el('gal-upload-prompt').style.display = 'none';
  showPhotoSize('gal-photo-size', photo.bytes);
}

async function publishGalPhoto() {
  if (!hasCfg()) { alert('Please connect to GitHub in Settings first.'); return; }
  if (!S.galNewPhoto) { alert('Please choose a photo first.'); return; }
  if (isPublishing) return;
  var folderId = el('gal-folder-pick') ? el('gal-folder-pick').value : '';
  var desc     = getVal('gal-desc');
  var folder   = (S.gallery.folders || []).find(function(f) { return f.id === folderId; });
  if (!folder) { alert('Please select a folder.'); return; }
  isPublishing = true;
  closeGalAddPhoto();
  spinning('Uploading photo…');
  try {
    var ts       = Date.now();
    var filename = 'photos/gallery/' + ts + '_' + S.galNewPhoto.filename;
    var existSha = null;
    try { existSha = (await ghGet(filename)).sha; } catch(e) {}
    await ghPutBin(filename, S.galNewPhoto.base64, existSha, 'Gallery: add ' + S.galNewPhoto.filename);
    var photoId = 'photo_' + ts;
    folder.photos.push({ id: photoId, filename: filename, description: desc, order: folder.photos.length + 1 });
    await pushGalleryData('Gallery: add ' + (desc || S.galNewPhoto.filename));
    bumpUpdated();
    S.galNewPhoto = null;
    S.galleryFolder = folderId;
    renderGalleryFolderBar();
    renderGalleryGrid();
    closePub();
  } catch(e) { pubErr(); } finally { isPublishing = false; }
}

/* ─────────────────────────────────────────────────────────
   LISTING CARDS
───────────────────────────────────────────────────────── */`
);

// ── Write ─────────────────────────────────────────────────────────────────────
if (allOk) {
  fs.writeFileSync(filePath, html, 'utf8');
  console.log('\nadmin.html patched successfully.');
} else {
  console.error('\nOne or more patches missed — admin.html NOT written.');
  process.exit(1);
}
