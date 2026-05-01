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

// ── 1. Replace old tab CSS with two-level tab CSS ─────────────────────────────
patch('two-level tab CSS',
  `/* ── Tab bar ── */
.tab-bar{display:flex;background:#fff;border-bottom:1px solid #e8ddd0;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none}
.tab-bar::-webkit-scrollbar{display:none}
.tab-btn{flex:1;min-width:max-content;padding:0.85rem 1rem;font-family:'Jost',sans-serif;font-size:12px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;color:#9a7a5a;background:none;border:none;border-bottom:2.5px solid transparent;cursor:pointer;white-space:nowrap}
.tab-btn.active{color:#b05a3a;border-bottom-color:#b05a3a}
.tab-btn:hover:not(.active){color:#7a5a3a}
.tab-gear{flex:0 0 auto;min-width:48px;font-size:17px;letter-spacing:0}`,
  `/* ── Main top-level tab bar ── */
.main-tab-bar{display:flex;align-items:center;background:#f5ede0;border-bottom:1px solid #ddd6c4;padding:0.55rem 1rem;gap:0.4rem}
.main-tab-group{display:flex;gap:0.4rem;flex:1;flex-wrap:wrap}
.main-tab-btn{padding:0.55rem 1.25rem;border-radius:3px;font-family:'Jost',sans-serif;font-size:12px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;color:#7a5a3a;background:transparent;border:1px solid transparent;cursor:pointer;white-space:nowrap;transition:background 0.15s,color 0.15s}
.main-tab-btn:hover:not(.active){background:#eddbc8}
.main-tab-btn.active{background:#b05a3a;color:#fff;border-color:#b05a3a}
.main-tab-gear{font-size:18px;letter-spacing:0;padding:0.45rem 0.65rem;flex-shrink:0}
/* ── Sub-tab bar (Shop only) ── */
.sub-tab-bar{display:flex;background:#fff;border-bottom:1px solid #e8ddd0;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none;padding-left:0.25rem}
.sub-tab-bar::-webkit-scrollbar{display:none}
.tab-btn{flex:0 0 auto;padding:0.75rem 1rem;font-family:'Jost',sans-serif;font-size:11px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;color:#9a7a5a;background:none;border:none;border-bottom:2.5px solid transparent;cursor:pointer;white-space:nowrap}
.tab-btn.active{color:#b05a3a;border-bottom-color:#b05a3a}
.tab-btn:hover:not(.active){color:#7a5a3a}`
);

// ── 2. Replace the single tab-bar HTML with two-level bars ────────────────────
patch('two-level tab bar HTML',
  `  <div class="tab-bar">
    <button class="tab-btn active" data-tab="available" onclick="switchTab('available')">Current Listings</button>
    <button class="tab-btn" data-tab="coming_soon" onclick="switchTab('coming_soon')">Coming Soon</button>
    <button class="tab-btn" data-tab="archive" onclick="switchTab('archive')">📦 Archive</button>
    <button class="tab-btn" data-tab="gallery" onclick="switchTab('gallery')">🖼 Gallery</button>
    <button class="tab-btn" data-tab="add" onclick="switchTab('add')">+ Add New</button>
    <button class="tab-btn tab-gear" data-tab="settings" onclick="switchTab('settings')" title="Settings">⚙</button>
  </div>`,
  `  <!-- Main top-level tabs -->
  <div class="main-tab-bar">
    <div class="main-tab-group">
      <button class="main-tab-btn active" data-main="shop" onclick="switchMainTab('shop')">Shop</button>
      <button class="main-tab-btn" data-main="gallery" onclick="switchMainTab('gallery')">Gallery</button>
    </div>
    <button class="main-tab-btn main-tab-gear" data-main="settings" onclick="switchMainTab('settings')" title="Settings">⚙</button>
  </div>

  <!-- Sub-tabs (visible only when Shop is active) -->
  <div class="sub-tab-bar" id="sub-tab-bar">
    <button class="tab-btn active" data-tab="available" onclick="switchTab('available')">Current Listings</button>
    <button class="tab-btn" data-tab="coming_soon" onclick="switchTab('coming_soon')">Coming Soon</button>
    <button class="tab-btn" data-tab="archive" onclick="switchTab('archive')">📦 Archive</button>
    <button class="tab-btn" data-tab="add" onclick="switchTab('add')">+ Add New</button>
  </div>`
);

// ── 3. Add mainTab to S state object ──────────────────────────────────────────
patch('mainTab in S state',
  `  gallery: null,`,
  `  mainTab: 'shop',
  gallery: null,`
);

// ── 4. Update switchTab to keep main tab in sync and only target sub-tabs ──────
patch('updated switchTab',
  `function switchTab(tab) {
  S.tab = tab;
  document.querySelectorAll('.tab-btn').forEach(function(b) {
    b.classList.toggle('active', b.dataset.tab === tab);
  });
  document.querySelectorAll('.tab-panel').forEach(function(p) {
    p.classList.toggle('active', p.id === 'tab-' + tab);
  });
  renderTab();
}`,
  `function switchMainTab(main) {
  S.mainTab = main;
  document.querySelectorAll('.main-tab-btn').forEach(function(b) {
    b.classList.toggle('active', b.dataset.main === main);
  });
  var subBar = el('sub-tab-bar');
  if (main === 'shop') {
    if (subBar) subBar.style.display = '';
    // Restore last shop sub-tab (or default to available)
    var sub = (['available','coming_soon','archive','add'].indexOf(S.tab) !== -1) ? S.tab : 'available';
    switchTab(sub);
  } else {
    if (subBar) subBar.style.display = 'none';
    // Map main tab to its panel
    var panelId = (main === 'gallery') ? 'tab-gallery' : 'tab-settings';
    document.querySelectorAll('.tab-panel').forEach(function(p) {
      p.classList.toggle('active', p.id === panelId);
    });
    if (main === 'gallery') renderGallery();
  }
}

function switchTab(tab) {
  S.tab = tab;
  // If this is a shop sub-tab, ensure main tab shows shop
  var shopTabs = ['available', 'coming_soon', 'archive', 'add'];
  if (shopTabs.indexOf(tab) !== -1 && S.mainTab !== 'shop') {
    S.mainTab = 'shop';
    document.querySelectorAll('.main-tab-btn').forEach(function(b) {
      b.classList.toggle('active', b.dataset.main === 'shop');
    });
    var subBar = el('sub-tab-bar');
    if (subBar) subBar.style.display = '';
  }
  document.querySelectorAll('.tab-btn').forEach(function(b) {
    b.classList.toggle('active', b.dataset.tab === tab);
  });
  document.querySelectorAll('.tab-panel').forEach(function(p) {
    p.classList.toggle('active', p.id === 'tab-' + tab);
  });
  renderTab();
}`
);

// ── 5. Update initApp: switchTab('settings') → switchMainTab('settings') ──────
patch('initApp switchTab→switchMainTab for settings',
  `  if (!hasCfg()) {
    console.log('[Admin] initApp: no config — redirecting to Settings');
    switchTab('settings');
    return;
  }`,
  `  if (!hasCfg()) {
    console.log('[Admin] initApp: no config — redirecting to Settings');
    switchMainTab('settings');
    return;
  }`
);

// ── 6. Update mobile CSS (remove old .tab-btn mobile override) ────────────────
patch('mobile CSS cleanup',
  `@media(max-width:580px){
  .tab-panel{padding:1rem}
  .card-thumb{width:80px;min-width:80px}
  .card-body{padding:0.7rem 0.8rem}
  .form-row{grid-template-columns:1fr}
  .last-updated{display:none}
  .tab-btn{font-size:11px;padding:0.75rem 0.65rem}
  .overlay-box{max-height:96vh}
  .overlay-body,.overlay-header,.overlay-footer{padding-left:1rem;padding-right:1rem}
}`,
  `@media(max-width:580px){
  .tab-panel{padding:1rem}
  .card-thumb{width:80px;min-width:80px}
  .card-body{padding:0.7rem 0.8rem}
  .form-row{grid-template-columns:1fr}
  .last-updated{display:none}
  .main-tab-bar{padding:0.45rem 0.75rem;gap:0.3rem}
  .main-tab-btn{font-size:11px;padding:0.5rem 1rem}
  .tab-btn{font-size:11px;padding:0.7rem 0.6rem}
  .overlay-box{max-height:96vh}
  .overlay-body,.overlay-header,.overlay-footer{padding-left:1rem;padding-right:1rem}
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
