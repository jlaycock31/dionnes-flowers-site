'use strict';
const fs   = require('fs');
const path = require('path');

const fp  = path.join(__dirname, 'contact.html');
let src = fs.readFileSync(fp, 'utf8').replace(/\r\n/g, '\n');

// ── 1. Replace <defs> block ───────────────────────────────────────────────────
src = src.replace(
`    <defs>
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
    </defs>`,
`    <defs>
      <clipPath id="wave-clip">
        <rect id="wave-clip-rect" x="0" y="0" width="680" height="155"/>
      </clipPath>
    </defs>`
);

// ── 2. Replace wave <g> wrapper ───────────────────────────────────────────────
src = src.replace(
`    <g mask="url(#waveMask)">
      <path id="wave-path" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2"/>
    </g>`,
`    <g clip-path="url(#wave-clip)">
      <path id="wave-path" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2"/>
    </g>`
);

// ── 3. Replace the wave rAF script ────────────────────────────────────────────
const OLD_SCRIPT = `<script>
(function() {
  const wavePath = document.getElementById('wave-path');
  if (!wavePath) return;

  function setViewBox() {
    const svg = document.getElementById('contact-svg');
    if (!svg) return;
    if (window.innerWidth <= 680) {
      svg.setAttribute('viewBox', '0 0 340 200');
    } else {
      svg.setAttribute('viewBox', '0 0 680 155');
    }
  }
  setViewBox();
  window.addEventListener('resize', setViewBox);

  function getConfig() {
    const mobile = window.innerWidth <= 680;
    return {
      CY:      mobile ? 130 : 110,
      L_MOUTH: mobile ? 50  : 100,
      R_MOUTH: mobile ? 290 : 580,
    };
  }

  const script = [
    { dir:'lr', cycles:5,  amp:26, dur:2200, pause:420 },
    { dir:'rl', cycles:3,  amp:18, dur:1600, pause:520 },
    { dir:'lr', cycles:8,  amp:30, dur:2800, pause:320 },
    { dir:'rl', cycles:4,  amp:22, dur:1900, pause:580 },
  ];

  function waveWidth(u) { return u.cycles * 46 + 24; }

  function buildPath(u, offsetX, timeOffset) {
    const cfg = getConfig();
    const ww = waveWidth(u);
    const steps = 220;
    const pts = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const env = Math.pow(0.5 * (1 - Math.cos(Math.PI * t)), 0.65);
      const breathe = 1 + 0.18 * Math.sin(timeOffset * 3.5 + t * Math.PI * 2);
      const angle = t * u.cycles * 2 * Math.PI + timeOffset * 2.5;
      const y = cfg.CY + env * u.amp * breathe * Math.sin(angle);
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
    const cfg = getConfig();
    const CORRIDOR = cfg.R_MOUTH - cfg.L_MOUTH;
    const ww = waveWidth(u);
    wavePath.setAttribute('stroke', u.dir === 'lr' ? '#b05a3a' : '#5a7a4a');

    const progress = Math.min(1, (ts - utterStart) / u.dur);
    const traveled = progress * (CORRIDOR + ww);
    const offsetX = u.dir === 'lr' ? cfg.L_MOUTH + traveled - ww : cfg.R_MOUTH - traveled + ww;
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

const NEW_SCRIPT = `<script>
(function() {
  var wavePath = document.getElementById('wave-path');
  var clipRect = document.getElementById('wave-clip-rect');
  if (!wavePath || !clipRect) return;

  var CY_DESKTOP  = 110;
  var CY_MOBILE   = 110;
  var L_DESKTOP   = 100;
  var R_DESKTOP   = 580;
  var L_MOBILE    = 50;
  var R_MOBILE    = 290;

  var script = [
    { dir:'lr', cycles:5,  amp:26, dur:2200, pause:420 },
    { dir:'rl', cycles:3,  amp:18, dur:1600, pause:520 },
    { dir:'lr', cycles:8,  amp:30, dur:2800, pause:320 },
    { dir:'rl', cycles:4,  amp:22, dur:1900, pause:580 },
  ];

  function isMobile() { return window.innerWidth <= 680; }

  function getParams() {
    var mob = isMobile();
    return {
      CY:      mob ? CY_MOBILE  : CY_DESKTOP,
      L_MOUTH: mob ? L_MOBILE   : L_DESKTOP,
      R_MOUTH: mob ? R_MOBILE   : R_DESKTOP,
    };
  }

  function setViewBox() {
    var svg = document.getElementById('contact-svg');
    if (!svg) return;
    svg.setAttribute('viewBox', isMobile() ? '0 0 340 155' : '0 0 680 155');
    if (clipRect) {
      clipRect.setAttribute('width', isMobile() ? '340' : '680');
    }
  }
  setViewBox();
  window.addEventListener('resize', setViewBox);

  function waveWidth(u) { return u.cycles * 46 + 24; }

  function buildPath(u, offsetX, timeOffset, CY) {
    var ww = waveWidth(u);
    var steps = 220;
    var pts = [];
    for (var i = 0; i <= steps; i++) {
      var t = i / steps;
      var env = Math.pow(0.5 * (1 - Math.cos(Math.PI * t)), 0.65);
      var breathe = 1 + 0.18 * Math.sin(timeOffset * 3.5 + t * Math.PI * 2);
      var angle = t * u.cycles * 2 * Math.PI + timeOffset * 2.5;
      var y = CY + env * u.amp * breathe * Math.sin(angle);
      var x = u.dir === 'lr' ? offsetX + t * ww : offsetX - t * ww;
      pts.push(i === 0
        ? ('M' + x.toFixed(1) + ',' + y.toFixed(1))
        : ('L' + x.toFixed(1) + ',' + y.toFixed(1)));
    }
    return pts.join(' ');
  }

  function updateClip(u, leadingEdge, p) {
    var totalW = isMobile() ? 340 : 680;
    if (u.dir === 'lr') {
      var leftEdge = Math.max(0, leadingEdge - waveWidth(u) - 10);
      clipRect.setAttribute('x', leftEdge.toFixed(1));
      clipRect.setAttribute('width', (p.R_MOUTH - leftEdge).toFixed(1));
    } else {
      var rightEdge = Math.min(totalW, leadingEdge + waveWidth(u) + 10);
      clipRect.setAttribute('x', p.L_MOUTH.toFixed(1));
      clipRect.setAttribute('width', (rightEdge - p.L_MOUTH).toFixed(1));
    }
  }

  var startTime   = null;
  var utterIdx    = 0;
  var utterStart  = null;
  var pauseStart  = null;
  var inPause     = false;
  var INITIAL_DELAY = 1500;

  function tick(ts) {
    if (!startTime) startTime = ts;
    if (ts - startTime < INITIAL_DELAY) {
      wavePath.setAttribute('d', '');
      requestAnimationFrame(tick);
      return;
    }

    if (inPause) {
      var prevU = script[(utterIdx - 1 + script.length) % script.length];
      if (ts - pauseStart >= prevU.pause) {
        inPause = false;
        utterStart = ts;
      } else {
        wavePath.setAttribute('d', '');
        requestAnimationFrame(tick);
        return;
      }
    }

    if (!utterStart) utterStart = ts;

    var u = script[utterIdx % script.length];
    var p = getParams();
    var ww = waveWidth(u);
    var CORRIDOR = p.R_MOUTH - p.L_MOUTH;

    wavePath.setAttribute('stroke', u.dir === 'lr' ? '#b05a3a' : '#5a7a4a');

    var progress   = Math.min(1, (ts - utterStart) / u.dur);
    var traveled   = progress * (CORRIDOR + ww);
    var timeOffset = (ts - utterStart) / 600;

    var offsetX = u.dir === 'lr'
      ? p.L_MOUTH + traveled - ww
      : p.R_MOUTH - traveled + ww;

    var leadingEdge = u.dir === 'lr'
      ? offsetX + ww
      : offsetX - ww;

    updateClip(u, leadingEdge, p);
    wavePath.setAttribute('d', buildPath(u, offsetX, timeOffset, p.CY));
    wavePath.setAttribute('opacity', '1');

    if (progress >= 1) {
      wavePath.setAttribute('d', '');
      utterIdx++;
      inPause = true;
      pauseStart = ts;
    }

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();
</script>`;

src = src.replace(OLD_SCRIPT, NEW_SCRIPT);

// ── Sanity checks ─────────────────────────────────────────────────────────────
const checks = [
  ['wave-clip-rect',        'clipPath rect id'],
  ['clip-path="url(#wave-clip)"', 'wave group uses clipPath'],
  ['updateClip',            'updateClip function'],
  ['leadingEdge',           'leadingEdge variable'],
  ['isMobile',              'isMobile function'],
  ['getParams',             'getParams function'],
  ['setViewBox',            'setViewBox function'],
  ['0 0 340 155',           'mobile viewBox'],
  ['0 0 680 155',           'desktop viewBox'],
  ['wave-path',             'wave-path element'],
];
let ok = true;
checks.forEach(([t, l]) => {
  if (!src.includes(t)) { console.error('FAIL: ' + l + ' [' + t + ']'); ok = false; }
});

if (src.includes('waveMask')) {
  console.error('FAIL: old waveMask still present');
  ok = false;
}
if (src.includes('fadeL')) {
  console.error('FAIL: old fadeL gradient still present');
  ok = false;
}

if (!ok) process.exit(1);

fs.writeFileSync(fp, src, 'utf8');
console.log('Done — soundwave animation updated with clipPath and dynamic clip rect.');
