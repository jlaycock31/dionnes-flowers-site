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

// ── 1. Add .btn-soon CSS after .btn-restore ───────────────────────────────────
patch('btn-soon CSS',
  '.btn-restore{background:#eef3e8;color:#3a6a2a;border:1px solid #b8d8a8}.btn-restore:hover{background:#e0ecda}',
  '.btn-restore{background:#eef3e8;color:#3a6a2a;border:1px solid #b8d8a8}.btn-restore:hover{background:#e0ecda}'
  + '\n.btn-soon{background:#e8f0da;color:#5a7a3a;border:1px solid #a8c888}.btn-soon:hover{background:#d8e8ca}'
);

// ── 2. Update archivedCard buttons ─────────────────────────────────────────────
patch('archivedCard two restore buttons',
  '+ \'<button class="btn-sm btn-restore" onclick="restoreFromArchive(\' + i + \')">Restore to Active</button>\'\n'
  + '    + \'<button class="btn-sm btn-delete" onclick="confirmDeleteArchived(\' + i + \')">Delete Permanently</button>\'',
  '+ \'<button class="btn-sm btn-restore" onclick="openRestoreAvailable(\' + i + \')">Make Available Now</button>\'\n'
  + '    + \'<button class="btn-sm btn-soon" onclick="openRestoreSoon(\' + i + \')">Move to Coming Soon</button>\'\n'
  + '    + \'<button class="btn-sm btn-delete" onclick="confirmDeleteArchived(\' + i + \')">Delete Permanently</button>\''
);

// ── 3. Add two new restore overlays after restore-stock-overlay ───────────────
patch('restore-available and restore-soon overlays',
  `      <button class="btn-outline" onclick="closeRestoreStock()">Cancel</button>
      <button class="btn-primary" onclick="confirmRestoreStock()">Mark Available ✓</button>
    </div>
  </div>
</div>



<script>`,
  `      <button class="btn-outline" onclick="closeRestoreStock()">Cancel</button>
      <button class="btn-primary" onclick="confirmRestoreStock()">Mark Available ✓</button>
    </div>
  </div>
</div>

<!-- ════════════════════════════════════════════════
  RESTORE TO AVAILABLE
════════════════════════════════════════════════ -->
<div id="restore-available-overlay" class="overlay" style="display:none" onclick="if(event.target===this)closeRestoreAvailable()">
  <div class="overlay-box">
    <div class="overlay-header">
      <h2 class="overlay-title">Make Available Now</h2>
      <button class="btn-close" onclick="closeRestoreAvailable()">✕</button>
    </div>
    <div class="overlay-body">
      <p style="font-size:13px;color:#7a5a3a;font-weight:300;margin-bottom:1.25rem;line-height:1.65">
        Adding <strong id="restore-avail-name"></strong> back to your current listings.
      </p>
      <div class="form-group">
        <label class="form-label">Price</label>
        <input type="text" id="restore-avail-price" class="form-input" placeholder="e.g. $35">
      </div>
      <div class="form-group">
        <label class="form-label">Quantity available</label>
        <input type="number" id="restore-avail-qty" class="form-input" min="1" placeholder="5" inputmode="numeric">
      </div>
    </div>
    <div class="overlay-footer">
      <button class="btn-outline" onclick="closeRestoreAvailable()">Cancel</button>
      <button class="btn-primary" onclick="confirmRestoreAvailable()">Make Available ✓</button>
    </div>
  </div>
</div>

<!-- ════════════════════════════════════════════════
  RESTORE TO COMING SOON
════════════════════════════════════════════════ -->
<div id="restore-soon-overlay" class="overlay" style="display:none" onclick="if(event.target===this)closeRestoreSoon()">
  <div class="overlay-box">
    <div class="overlay-header">
      <h2 class="overlay-title">Move to Coming Soon</h2>
      <button class="btn-close" onclick="closeRestoreSoon()">✕</button>
    </div>
    <div class="overlay-body">
      <p style="font-size:13px;color:#7a5a3a;font-weight:300;margin-bottom:1.25rem;line-height:1.65">
        Moving <strong id="restore-soon-name"></strong> to your Coming Soon tab.
      </p>
      <div class="form-group">
        <label class="form-label">Estimated ready date <span style="font-weight:300;color:#b8b2a0">(optional)</span></label>
        <input type="text" id="restore-soon-date" class="form-input" placeholder="e.g. Early June">
      </div>
    </div>
    <div class="overlay-footer">
      <button class="btn-outline" onclick="closeRestoreSoon()">Cancel</button>
      <button class="btn-primary" onclick="confirmRestoreSoon()">Move to Coming Soon ✓</button>
    </div>
  </div>
</div>



<script>`
);

// ── 4. Replace restoreFromArchive with the two new overlay functions ───────────
patch('replace restoreFromArchive with two overlay handlers',
  `async function restoreFromArchive(i) {
  if (isPublishing) return;
  isPublishing = true;
  var item = S.data.archived.splice(i, 1)[0];
  item.sold_out = false;
  if (!item.quantity) item.quantity = 0;
  S.data.available.push(item);
  spinning('Restoring to active...');
  try {
    await pushData(S.data, 'Restore listing: ' + item.name);
    bumpUpdated();
    renderArchive();
    closePub();
  } catch(e) { pubErr(); } finally { isPublishing = false; }
}`,
  `var restoreCtx = null;

function openRestoreAvailable(i) {
  restoreCtx = i;
  var item = S.data.archived[i] || {};
  el('restore-avail-name').textContent = item.name || '';
  setVal('restore-avail-price', item.price || '');
  setVal('restore-avail-qty', '');
  show('restore-available-overlay');
  document.body.style.overflow = 'hidden';
  setTimeout(function() { var f = el('restore-avail-price'); if (f) f.focus(); }, 50);
}

function closeRestoreAvailable() {
  hide('restore-available-overlay');
  document.body.style.overflow = '';
  restoreCtx = null;
}

async function confirmRestoreAvailable() {
  if (restoreCtx === null) return;
  if (isPublishing) return;
  var price = getVal('restore-avail-price').trim();
  var qty   = parseInt(getVal('restore-avail-qty'));
  if (!price) { alert('Please enter a price.'); return; }
  if (isNaN(qty) || qty < 1) { alert('Please enter a quantity of 1 or more.'); return; }
  isPublishing = true;
  var item = S.data.archived.splice(restoreCtx, 1)[0];
  item.price    = price;
  item.quantity = qty;
  item.sold_out = false;
  S.data.available.push(item);
  closeRestoreAvailable();
  spinning('Making available...');
  try {
    await pushData(S.data, 'Restore to available: ' + item.name);
    bumpUpdated();
    renderArchive();
    closePub();
  } catch(e) { pubErr(); } finally { isPublishing = false; }
}

function openRestoreSoon(i) {
  restoreCtx = i;
  var item = S.data.archived[i] || {};
  el('restore-soon-name').textContent = item.name || '';
  setVal('restore-soon-date', item.ready_date || '');
  show('restore-soon-overlay');
  document.body.style.overflow = 'hidden';
  setTimeout(function() { var f = el('restore-soon-date'); if (f) f.focus(); }, 50);
}

function closeRestoreSoon() {
  hide('restore-soon-overlay');
  document.body.style.overflow = '';
  restoreCtx = null;
}

async function confirmRestoreSoon() {
  if (restoreCtx === null) return;
  if (isPublishing) return;
  isPublishing = true;
  var item = S.data.archived.splice(restoreCtx, 1)[0];
  item.ready_date = getVal('restore-soon-date').trim();
  item.sold_out   = false;
  S.data.coming_soon.push(item);
  closeRestoreSoon();
  spinning('Moving to Coming Soon...');
  try {
    await pushData(S.data, 'Restore to coming soon: ' + item.name);
    bumpUpdated();
    renderArchive();
    switchTab('coming_soon');
    closePub();
  } catch(e) { pubErr(); } finally { isPublishing = false; }
}`
);

// ── Write ─────────────────────────────────────────────────────────────────────
if (allOk) {
  fs.writeFileSync(filePath, html, 'utf8');
  console.log('\nadmin.html patched successfully.');
} else {
  console.error('\nOne or more patches missed — admin.html NOT written.');
  process.exit(1);
}
