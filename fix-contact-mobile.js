'use strict';
const fs   = require('fs');
const path = require('path');

const fp  = path.join(__dirname, 'contact.html');
let src = fs.readFileSync(fp, 'utf8').replace(/\r\n/g, '\n');

// ── 1. Remove static viewBox from SVG tag ────────────────────────────────────
src = src.replace(
  '<svg id="contact-svg" viewBox="0 0 680 155" xmlns="http://www.w3.org/2000/svg" width="100%" aria-hidden="true">',
  '<svg id="contact-svg" xmlns="http://www.w3.org/2000/svg" width="100%" aria-hidden="true">'
);

// ── 2. Expand dahlia CSS to include mobile variants + hide/show rules ────────
src = src.replace(
`<style>
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
</style>`,
`<style>
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
  .contact-dahlia-l-mobile{
    animation:contactBloomIn 0.8s cubic-bezier(0.34,1.4,0.64,1) both;
    animation-delay:0.6s;
    transform-origin:50px 110px;
    transform-box:view-box;
  }
  .contact-dahlia-r-mobile{
    animation:contactBloomIn 0.8s cubic-bezier(0.34,1.4,0.64,1) both;
    animation-delay:0.75s;
    transform-origin:290px 110px;
    transform-box:view-box;
  }
  @keyframes contactBloomIn{
    from{transform:scale(0);opacity:0}
    to{transform:scale(1);opacity:1}
  }
}
@media(prefers-reduced-motion:reduce){
  .contact-dahlia-l,.contact-dahlia-r,.contact-dahlia-l-mobile,.contact-dahlia-r-mobile{transform:scale(1)!important;opacity:1!important}
}
.contact-dahlia-l-mobile,
.contact-dahlia-r-mobile{display:none}
@media(max-width:680px){
  .contact-dahlia-l,.contact-dahlia-r{display:none}
  .contact-dahlia-l-mobile,.contact-dahlia-r-mobile{display:block}
}
</style>`
);

// ── 3. Insert mobile dahlia groups before </svg> ──────────────────────────────
const MOBILE_DAHLIAS = `
    <!-- LEFT DAHLIA MOBILE (cx=50, cy=110 in 340-wide viewBox) -->
    <g class="contact-dahlia-l-mobile">
      <path d="M50 148 Q48 135 50 124" stroke="#7a8a5a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <ellipse cx="38"  cy="140" rx="12" ry="7" fill="#8a9a6a" transform="rotate(-30 38 140)" opacity="0.85"/>
      <ellipse cx="62"  cy="134" rx="13" ry="7" fill="#9aaa7a" transform="rotate(25 62 134)" opacity="0.85"/>
      <ellipse cx="50"  cy="90"  rx="10" ry="15" fill="#e09068"/>
      <ellipse cx="65"  cy="95"  rx="10" ry="15" fill="#d88060" transform="rotate(30 65 95)"/>
      <ellipse cx="71"  cy="110" rx="10" ry="15" fill="#e09068" transform="rotate(65 71 110)"/>
      <ellipse cx="64"  cy="125" rx="10" ry="15" fill="#d88060" transform="rotate(100 64 125)"/>
      <ellipse cx="50"  cy="130" rx="10" ry="15" fill="#e09068" transform="rotate(135 50 130)"/>
      <ellipse cx="36"  cy="125" rx="10" ry="15" fill="#d88060" transform="rotate(170 36 125)"/>
      <ellipse cx="30"  cy="110" rx="10" ry="15" fill="#e09068" transform="rotate(205 30 110)"/>
      <ellipse cx="36"  cy="95"  rx="10" ry="15" fill="#d88060" transform="rotate(240 36 95)"/>
      <ellipse cx="50"  cy="96"  rx="7" ry="11" fill="#e8c060" opacity="0.9"/>
      <ellipse cx="61"  cy="100" rx="7" ry="11" fill="#e0b855" transform="rotate(45 61 100)" opacity="0.9"/>
      <ellipse cx="64"  cy="110" rx="7" ry="11" fill="#e8c060" transform="rotate(90 64 110)" opacity="0.9"/>
      <ellipse cx="61"  cy="120" rx="7" ry="11" fill="#e0b855" transform="rotate(135 61 120)" opacity="0.9"/>
      <ellipse cx="50"  cy="124" rx="7" ry="11" fill="#e8c060" transform="rotate(180 50 124)" opacity="0.9"/>
      <ellipse cx="39"  cy="120" rx="7" ry="11" fill="#e0b855" transform="rotate(225 39 120)" opacity="0.9"/>
      <ellipse cx="36"  cy="110" rx="7" ry="11" fill="#e8c060" transform="rotate(270 36 110)" opacity="0.9"/>
      <ellipse cx="39"  cy="100" rx="7" ry="11" fill="#e0b855" transform="rotate(315 39 100)" opacity="0.9"/>
      <circle cx="50"  cy="110" r="13" fill="#c87050"/>
      <circle cx="50"  cy="110" r="7"  fill="#b86040"/>
    </g>

    <!-- RIGHT DAHLIA MOBILE (cx=290, cy=110 in 340-wide viewBox) -->
    <g class="contact-dahlia-r-mobile">
      <path d="M290 148 Q292 135 290 124" stroke="#7a8a5a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <ellipse cx="278" cy="134" rx="13" ry="7" fill="#8a9a6a" transform="rotate(-25 278 134)" opacity="0.85"/>
      <ellipse cx="302" cy="140" rx="12" ry="7" fill="#9aaa7a" transform="rotate(30 302 140)" opacity="0.85"/>
      <ellipse cx="290" cy="90"  rx="10" ry="15" fill="#e0a0be"/>
      <ellipse cx="305" cy="95"  rx="10" ry="15" fill="#d090ae" transform="rotate(30 305 95)"/>
      <ellipse cx="311" cy="110" rx="10" ry="15" fill="#e0a0be" transform="rotate(65 311 110)"/>
      <ellipse cx="304" cy="125" rx="10" ry="15" fill="#d090ae" transform="rotate(100 304 125)"/>
      <ellipse cx="290" cy="130" rx="10" ry="15" fill="#e0a0be" transform="rotate(135 290 130)"/>
      <ellipse cx="276" cy="125" rx="10" ry="15" fill="#d090ae" transform="rotate(170 276 125)"/>
      <ellipse cx="270" cy="110" rx="10" ry="15" fill="#e0a0be" transform="rotate(205 270 110)"/>
      <ellipse cx="276" cy="95"  rx="10" ry="15" fill="#d090ae" transform="rotate(240 276 95)"/>
      <ellipse cx="290" cy="96"  rx="7" ry="11" fill="#e8c060" opacity="0.9"/>
      <ellipse cx="301" cy="100" rx="7" ry="11" fill="#e0b855" transform="rotate(45 301 100)" opacity="0.9"/>
      <ellipse cx="304" cy="110" rx="7" ry="11" fill="#e8c060" transform="rotate(90 304 110)" opacity="0.9"/>
      <ellipse cx="301" cy="120" rx="7" ry="11" fill="#e0b855" transform="rotate(135 301 120)" opacity="0.9"/>
      <ellipse cx="290" cy="124" rx="7" ry="11" fill="#e8c060" transform="rotate(180 290 124)" opacity="0.9"/>
      <ellipse cx="279" cy="120" rx="7" ry="11" fill="#e0b855" transform="rotate(225 279 120)" opacity="0.9"/>
      <ellipse cx="276" cy="110" rx="7" ry="11" fill="#e8c060" transform="rotate(270 276 110)" opacity="0.9"/>
      <ellipse cx="279" cy="100" rx="7" ry="11" fill="#e0b855" transform="rotate(315 279 100)" opacity="0.9"/>
      <circle cx="290" cy="110" r="13" fill="#c07898"/>
      <circle cx="290" cy="110" r="7"  fill="#b06888"/>
    </g>`;

src = src.replace(
  '    </g>\n  </svg>',
  '    </g>\n' + MOBILE_DAHLIAS + '\n  </svg>'
);

// ── 4. Replace the wave rAF script with responsive version ───────────────────
const OLD_SCRIPT = `<script>
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

const NEW_SCRIPT = `<script>
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

src = src.replace(OLD_SCRIPT, NEW_SCRIPT);

// ── Sanity checks ─────────────────────────────────────────────────────────────
const checks = [
  ['contact-dahlia-l-mobile',      'mobile left dahlia SVG group'],
  ['contact-dahlia-r-mobile',      'mobile right dahlia SVG group'],
  ['transform-origin:50px 110px',  'mobile left dahlia CSS origin'],
  ['transform-origin:290px 110px', 'mobile right dahlia CSS origin'],
  ['setViewBox',                   'setViewBox function'],
  ['getConfig',                    'getConfig function'],
  ['0 0 340 200',                  'mobile viewBox value'],
  ['0 0 680 155',                  'desktop viewBox value in script'],
  ['display:none}',                'hide mobile dahlias by default'],
  ['max-width:680px',              '680px breakpoint'],
];
let ok = true;
checks.forEach(([t, l]) => {
  if (!src.includes(t)) { console.error('FAIL: ' + l + ' [' + t + ']'); ok = false; }
});

if (src.includes('viewBox="0 0 680 155" xmlns')) {
  console.error('FAIL: static viewBox still present on SVG tag');
  ok = false;
}

if (!ok) process.exit(1);

fs.writeFileSync(fp, src, 'utf8');
console.log('Done — contact.html updated with mobile responsive dahlias and wave.');
