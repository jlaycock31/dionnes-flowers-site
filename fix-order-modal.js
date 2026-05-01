const fs   = require('fs');
const path = require('path');

// ── Shared modal HTML + JS (injected as one block before </body>) ─────────────

const MODAL_BLOCK = `
<!-- ════════════════════════════════════════════════
  ORDER / CONTACT METHOD PICKER
════════════════════════════════════════════════ -->
<div id="order-modal" style="display:none;position:fixed;inset:0;z-index:500;background:rgba(80,55,35,0.45);align-items:center;justify-content:center;padding:1.5rem" onclick="if(event.target===this)closeOrderModal()">
  <div style="background:#fdf6ee;border-radius:4px;max-width:420px;width:100%;box-shadow:0 8px 40px rgba(80,55,35,0.22);font-family:'Jost',sans-serif">
    <div style="padding:1.75rem 1.75rem 0">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:1.25rem">
        <h2 style="font-family:'Playfair Display',serif;font-size:1.35rem;font-weight:700;color:#3a2a1a;line-height:1.3;margin:0">How would you like<br>to reach us?</h2>
        <button onclick="closeOrderModal()" style="background:none;border:none;cursor:pointer;color:#b8a88a;font-size:18px;line-height:1;padding:2px 4px;margin-left:1rem;flex-shrink:0" aria-label="Close">&#x2715;</button>
      </div>
    </div>
    <div style="padding:0 1.25rem 1.25rem;display:flex;flex-direction:column;gap:0.65rem">
      <a href="https://ig.me/m/laycockdi" target="_blank" rel="noopener noreferrer" onclick="closeOrderModal()" style="display:flex;align-items:center;gap:1rem;padding:1rem 1.1rem;border-radius:3px;text-decoration:none;background:linear-gradient(135deg,#f9ce34,#ee2a7b,#6228d7);color:#fff;cursor:pointer">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="#fff" stroke="none"/></svg>
        <div>
          <div style="font-size:13px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:2px">Message on Instagram</div>
          <div style="font-size:11px;font-weight:300;opacity:0.88;line-height:1.4">Tap to open Instagram and message us directly</div>
        </div>
      </a>
      <a href="https://m.me/dionne.laycock" target="_blank" rel="noopener noreferrer" onclick="closeOrderModal()" style="display:flex;align-items:center;gap:1rem;padding:1rem 1.1rem;border-radius:3px;text-decoration:none;background:#6a9a5a;color:#fff;cursor:pointer">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" style="flex-shrink:0"><path d="M12 2C6.477 2 2 6.145 2 11.259c0 2.88 1.378 5.452 3.538 7.17V22l3.226-1.79C9.74 20.38 10.85 20.52 12 20.52c5.523 0 10-4.145 10-9.261S17.523 2 12 2zm1.07 12.45l-2.55-2.72-4.98 2.72 5.48-5.82 2.61 2.72 4.92-2.72-5.48 5.82z"/></svg>
        <div>
          <div style="font-size:13px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:2px">Message on Facebook</div>
          <div style="font-size:11px;font-weight:300;opacity:0.88;line-height:1.4">Tap to open Facebook Messenger</div>
        </div>
      </a>
      <a href="mailto:dclaycock@yahoo.com?subject=Flower%20Arrangement%20Inquiry" onclick="closeOrderModal()" style="display:flex;align-items:center;gap:1rem;padding:1rem 1.1rem;border-radius:3px;text-decoration:none;background:#b05a3a;color:#fff;cursor:pointer">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        <div>
          <div style="font-size:13px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:2px">Send us an Email</div>
          <div style="font-size:11px;font-weight:300;opacity:0.88;line-height:1.4">Opens your email app with our address ready</div>
        </div>
      </a>
    </div>
    <div style="padding:0 1.25rem 1.5rem">
      <button onclick="closeOrderModal()" style="width:100%;padding:11px;background:transparent;border:1px solid #c8b8a0;border-radius:3px;font-family:'Jost',sans-serif;font-size:12px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;color:#b8a88a;cursor:pointer">Maybe later</button>
    </div>
  </div>
</div>
<script>
function openOrderModal() {
  var m = document.getElementById('order-modal');
  if (!m) return;
  m.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
function closeOrderModal() {
  var m = document.getElementById('order-modal');
  if (!m) return;
  m.style.display = 'none';
  document.body.style.overflow = '';
}
</script>`;

function patchFile(filePath, patches) {
  let html = fs.readFileSync(filePath, 'utf8');
  let ok = true;
  for (var p of patches) {
    if (!html.includes(p[0])) {
      console.error('  MISS [' + p[2] + ']');
      ok = false;
    } else {
      html = html.replace(p[0], p[1]);
      console.log('  OK   [' + p[2] + ']');
    }
  }
  if (ok) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log('  Written.');
  } else {
    console.error('  NOT written.');
  }
  return ok;
}

// ── gallery.html ──────────────────────────────────────────────────────────────
console.log('\n=== gallery.html ===');
const galleryOk = patchFile(path.join(__dirname, 'gallery.html'), [
  [
    '<button class="btn-outline">Order an Arrangement</button>',
    '<button class="btn-outline" onclick="openOrderModal()">Order an Arrangement</button>',
    'Order button → openOrderModal'
  ],
  [
    '</body>\n</html>',
    MODAL_BLOCK + '\n</body>\n</html>',
    'modal block before </body>'
  ]
]);

// ── shop.html ─────────────────────────────────────────────────────────────────
console.log('\n=== shop.html ===');
const shopOk = patchFile(path.join(__dirname, 'shop.html'), [
  [
    ': \'<a class="btn-primary" href="https://facebook.com/dionne.laycock" target="_blank" rel="noopener noreferrer">Order on Facebook</a>\';',
    ': \'<button class="btn-primary" onclick="openOrderModal()" style="width:100%;display:block;cursor:pointer">Order an Arrangement</button>\';',
    'Order on Facebook → openOrderModal'
  ],
  [
    '</body>\n</html>\n',
    MODAL_BLOCK + '\n</body>\n</html>\n',
    'modal block before </body>'
  ]
]);

// ── contact.html ──────────────────────────────────────────────────────────────
console.log('\n=== contact.html ===');
const contactOk = patchFile(path.join(__dirname, 'contact.html'), [
  [
    '<div class="page-divider"></div>\n</div>',
    '<div class="page-divider"></div>\n  <button class="btn-primary" onclick="openOrderModal()" style="margin-top:1.25rem;cursor:pointer">Order an Arrangement</button>\n</div>',
    'Order button in page header'
  ],
  [
    '</body>\n</html>',
    MODAL_BLOCK + '\n</body>\n</html>',
    'modal block before </body>'
  ]
]);

if (galleryOk && shopOk && contactOk) {
  console.log('\nAll files patched successfully.');
} else {
  process.exit(1);
}
