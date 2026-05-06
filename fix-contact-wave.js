'use strict';
const fs   = require('fs');
const path = require('path');

const fp  = path.join(__dirname, 'contact.html');
let src = fs.readFileSync(fp, 'utf8').replace(/\r\n/g, '\n');
const orig = src;

// ── 1. .page-header: position/overflow + reduce bottom padding ────────────────
src = src.replace(
  '.page-header{background:#f0e8d8;padding:3rem 2.5rem 2.5rem;text-align:center;border-bottom:0.5px solid #ddd6c4}',
  '.page-header{background:#f0e8d8;padding:3rem 2.5rem 1rem;text-align:center;border-bottom:0.5px solid #ddd6c4;position:relative;overflow:hidden}'
);

// ── 2. Add z-index layering to page-tag, page-h1, page-divider ───────────────
src = src.replace(
  '.page-tag{font-size:11px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;color:#9a7a5a;margin-bottom:0.6rem}',
  '.page-tag{font-size:11px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;color:#9a7a5a;margin-bottom:0.6rem;position:relative;z-index:2}'
);
src = src.replace(
  '.page-h1{font-family:\'Playfair Display\',serif;font-size:36px;font-weight:400;color:#7a5a3a}',
  '.page-h1{font-family:\'Playfair Display\',serif;font-size:36px;font-weight:400;color:#7a5a3a;position:relative;z-index:2}'
);
src = src.replace(
  '.page-divider{width:48px;height:1.5px;background:#7a9a5a;margin:1.2rem auto 0}',
  '.page-divider{width:48px;height:1.5px;background:#7a9a5a;margin:1.2rem auto 0;position:relative;z-index:2}'
);

// ── 3. Insert SVG + dahlias after .page-divider closing tag ──────────────────
const CONTACT_SVG = `  <div style="position:relative; width:100%; z-index:1; display:block; margin-top:0.5rem;">
  <svg id="contact-svg" viewBox="0 0 680 155" xmlns="http://www.w3.org/2000/svg" width="100%" aria-hidden="true">
    <defs>
      <linearGradient id="fadeL" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stop-color="white" stop-opacity="0"/>
        <stop offset="12%"  stop-color="white" stop-opacity="0"/>
        <stop offset="22%"  stop-color="white" stop-opacity="1"/>
        <stop offset="78%"  stop-color="white" stop-opacity="1"/>
        <stop offset="88%"  stop-color="white" stop-opacity="0"/>
        <stop offset="100%" stop-color="white" stop-opacity="0"/>
      </linearGradient>
      <mask id="waveMask">
        <rect x="0" y="0" width="680" height="155" fill="url(#fadeL)"/>
      </mask>
    </defs>

    <g mask="url(#waveMask)">
      <path id="wave-path" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2"/>
    </g>

    <!-- LEFT DAHLIA -->
    <g class="contact-dahlia-l">
      <path d="M100 148 Q98 135 100 124" stroke="#7a8a5a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <ellipse cx="88"  cy="140" rx="12" ry="7" fill="#8a9a6a" transform="rotate(-30 88 140)" opacity="0.85"/>
      <ellipse cx="112" cy="134" rx="13" ry="7" fill="#9aaa7a" transform="rotate(25 112 134)" opacity="0.85"/>
      <ellipse cx="100" cy="90"  rx="10" ry="15" fill="#e09068"/>
      <ellipse cx="115" cy="95"  rx="10" ry="15" fill="#d88060" transform="rotate(30 115 95)"/>
      <ellipse cx="121" cy="110" rx="10" ry="15" fill="#e09068" transform="rotate(65 121 110)"/>
      <ellipse cx="114" cy="125" rx="10" ry="15" fill="#d88060" transform="rotate(100 114 125)"/>
      <ellipse cx="100" cy="130" rx="10" ry="15" fill="#e09068" transform="rotate(135 100 130)"/>
      <ellipse cx="86"  cy="125" rx="10" ry="15" fill="#d88060" transform="rotate(170 86 125)"/>
      <ellipse cx="80"  cy="110" rx="10" ry="15" fill="#e09068" transform="rotate(205 80 110)"/>
      <ellipse cx="86"  cy="95"  rx="10" ry="15" fill="#d88060" transform="rotate(240 86 95)"/>
      <ellipse cx="100" cy="96"  rx="7" ry="11" fill="#e8c060" opacity="0.9"/>
      <ellipse cx="111" cy="100" rx="7" ry="11" fill="#e0b855" transform="rotate(45 111 100)" opacity="0.9"/>
      <ellipse cx="114" cy="110" rx="7" ry="11" fill="#e8c060" transform="rotate(90 114 110)" opacity="0.9"/>
      <ellipse cx="111" cy="120" rx="7" ry="11" fill="#e0b855" transform="rotate(135 111 120)" opacity="0.9"/>
      <ellipse cx="100" cy="124" rx="7" ry="11" fill="#e8c060" transform="rotate(180 100 124)" opacity="0.9"/>
      <ellipse cx="89"  cy="120" rx="7" ry="11" fill="#e0b855" transform="rotate(225 89 120)" opacity="0.9"/>
      <ellipse cx="86"  cy="110" rx="7" ry="11" fill="#e8c060" transform="rotate(270 86 110)" opacity="0.9"/>
      <ellipse cx="89"  cy="100" rx="7" ry="11" fill="#e0b855" transform="rotate(315 89 100)" opacity="0.9"/>
      <circle cx="100" cy="110" r="13" fill="#c87050"/>
      <circle cx="100" cy="110" r="7"  fill="#b86040"/>
    </g>

    <!-- RIGHT DAHLIA -->
    <g class="contact-dahlia-r">
      <path d="M580 148 Q582 135 580 124" stroke="#7a8a5a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <ellipse cx="568" cy="134" rx="13" ry="7" fill="#8a9a6a" transform="rotate(-25 568 134)" opacity="0.85"/>
      <ellipse cx="592" cy="140" rx="12" ry="7" fill="#9aaa7a" transform="rotate(30 592 140)" opacity="0.85"/>
      <ellipse cx="580" cy="90"  rx="10" ry="15" fill="#e0a0be"/>
      <ellipse cx="595" cy="95"  rx="10" ry="15" fill="#d090ae" transform="rotate(30 595 95)"/>
      <ellipse cx="601" cy="110" rx="10" ry="15" fill="#e0a0be" transform="rotate(65 601 110)"/>
      <ellipse cx="594" cy="125" rx="10" ry="15" fill="#d090ae" transform="rotate(100 594 125)"/>
      <ellipse cx="580" cy="130" rx="10" ry="15" fill="#e0a0be" transform="rotate(135 580 130)"/>
      <ellipse cx="566" cy="125" rx="10" ry="15" fill="#d090ae" transform="rotate(170 566 125)"/>
      <ellipse cx="560" cy="110" rx="10" ry="15" fill="#e0a0be" transform="rotate(205 560 110)"/>
      <ellipse cx="566" cy="95"  rx="10" ry="15" fill="#d090ae" transform="rotate(240 566 95)"/>
      <ellipse cx="580" cy="96"  rx="7" ry="11" fill="#e8c060" opacity="0.9"/>
      <ellipse cx="591" cy="100" rx="7" ry="11" fill="#e0b855" transform="rotate(45 591 100)" opacity="0.9"/>
      <ellipse cx="594" cy="110" rx="7" ry="11" fill="#e8c060" transform="rotate(90 594 110)" opacity="0.9"/>
      <ellipse cx="591" cy="120" rx="7" ry="11" fill="#e0b855" transform="rotate(135 591 120)" opacity="0.9"/>
      <ellipse cx="580" cy="124" rx="7" ry="11" fill="#e8c060" transform="rotate(180 580 124)" opacity="0.9"/>
      <ellipse cx="569" cy="120" rx="7" ry="11" fill="#e0b855" transform="rotate(225 569 120)" opacity="0.9"/>
      <ellipse cx="566" cy="110" rx="7" ry="11" fill="#e8c060" transform="rotate(270 566 110)" opacity="0.9"/>
      <ellipse cx="569" cy="100" rx="7" ry="11" fill="#e0b855" transform="rotate(315 569 100)" opacity="0.9"/>
      <circle cx="580" cy="110" r="13" fill="#c07898"/>
      <circle cx="580" cy="110" r="7"  fill="#b06888"/>
    </g>
  </svg>
</div>`;

src = src.replace(
  '  <div class="page-divider"></div>\n  <button',
  '  <div class="page-divider"></div>\n' + CONTACT_SVG + '\n  <button'
);

// ── 4. Add dahlia bloom CSS to <head> ─────────────────────────────────────────
const DAHLIA_CSS = `<style>
@media(prefers-reduced-motion:no-preference){
  .contact-dahlia-l{
    animation:contactBloomIn 0.8s cubic-bezier(0.34,1.4,0.64,1) both;
    animation-delay:0.6s;
    transform-origin:100px 110px;
    transform-box:view-box;
  }
  .contact-dahlia-r{
    animation:contactBloomIn 0.8s cubic-bezier(0.34,1.4,0.64,1) both;
    animation-delay:0.75s;
    transform-origin:580px 110px;
    transform-box:view-box;
  }
  @keyframes contactBloomIn{
    from{transform:scale(0);opacity:0}
    to{transform:scale(1);opacity:1}
  }
}
@media(prefers-reduced-motion:reduce){
  .contact-dahlia-l,.contact-dahlia-r{transform:scale(1)!important;opacity:1!important}
}
</style>`;

src = src.replace(
  '<link rel="stylesheet" href="css/shared.css" />\n</head>',
  '<link rel="stylesheet" href="css/shared.css" />\n' + DAHLIA_CSS + '\n</head>'
);

// ── 5. Add wave animation script before </body> ────────────────────────────────
const WAVE_SCRIPT = `<script>
(function() {
  const wavePath = document.getElementById('wave-path');
  if (!wavePath) return;

  const CY = 110;
  const L_MOUTH = 100;
  const R_MOUTH = 580;
  const CORRIDOR = R_MOUTH - L_MOUTH;

  const script = [
    { dir:'lr', cycles:5,  amp:26, dur:2200, pause:420 },
    { dir:'rl', cycles:3,  amp:18, dur:1600, pause:520 },
    { dir:'lr', cycles:8,  amp:30, dur:2800, pause:320 },
    { dir:'rl', cycles:4,  amp:22, dur:1900, pause:580 },
  ];

  function waveWidth(u) { return u.cycles * 46 + 24; }

  function buildPath(u, offsetX, timeOffset) {
    const ww = waveWidth(u);
    const steps = 220;
    const pts = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const env = Math.pow(0.5 * (1 - Math.cos(Math.PI * t)), 0.65);
      const breathe = 1 + 0.18 * Math.sin(timeOffset * 3.5 + t * Math.PI * 2);
      const angle = t * u.cycles * 2 * Math.PI + timeOffset * 2.5;
      const y = CY + env * u.amp * breathe * Math.sin(angle);
      const x = u.dir === 'lr' ? offsetX + t * ww : offsetX - t * ww;
      pts.push(i === 0 ? \`M\${x.toFixed(1)},\${y.toFixed(1)}\` : \`L\${x.toFixed(1)},\${y.toFixed(1)}\`);
    }
    return pts.join(' ');
  }

  let startTime = null;
  let utterIdx = 0;
  let utterStart = null;
  let pauseStart = null;
  let inPause = false;
  const INITIAL_DELAY = 1500;

  function tick(ts) {
    if (!startTime) startTime = ts;
    if (ts - startTime < INITIAL_DELAY) { wavePath.setAttribute('d',''); requestAnimationFrame(tick); return; }

    if (inPause) {
      const prevU = script[(utterIdx - 1 + script.length) % script.length];
      if (ts - pauseStart >= prevU.pause) { inPause = false; utterStart = ts; }
      else { wavePath.setAttribute('d',''); requestAnimationFrame(tick); return; }
    }

    if (!utterStart) utterStart = ts;

    const u = script[utterIdx % script.length];
    const ww = waveWidth(u);
    wavePath.setAttribute('stroke', u.dir === 'lr' ? '#b05a3a' : '#5a7a4a');

    const progress = Math.min(1, (ts - utterStart) / u.dur);
    const traveled = progress * (CORRIDOR + ww);
    const offsetX = u.dir === 'lr' ? L_MOUTH + traveled - ww : R_MOUTH - traveled + ww;
    const timeOffset = (ts - utterStart) / 600;

    wavePath.setAttribute('d', buildPath(u, offsetX, timeOffset));
    wavePath.setAttribute('opacity', '1');

    if (progress >= 1) {
      wavePath.setAttribute('d','');
      utterIdx++;
      inPause = true;
      pauseStart = ts;
    }
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();
</script>`;

src = src.replace('\n</body>', '\n' + WAVE_SCRIPT + '\n</body>');

// ── Sanity checks ─────────────────────────────────────────────────────────────
const checks = [
  ['position:relative;overflow:hidden',  '.page-header position+overflow'],
  ['padding:3rem 2.5rem 1rem',           '.page-header bottom padding 1rem'],
  ['contact-dahlia-l',                   'left dahlia SVG group'],
  ['contact-dahlia-r',                   'right dahlia SVG group'],
  ['wave-path',                          'wave path element'],
  ['contactBloomIn',                     'contactBloomIn keyframe'],
  ['requestAnimationFrame',              'wave animation script'],
  ['</head>',                            '</head> present'],
  ['<body>',                             '<body> present'],
];
let ok = true;
checks.forEach(([t, l]) => { if (!src.includes(t)) { console.error('FAIL: ' + l); ok = false; } });
if (!ok) process.exit(1);

fs.writeFileSync(fp, src, 'utf8');
console.log('Done — contact.html updated.');
