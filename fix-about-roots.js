'use strict';
const fs   = require('fs');
const path = require('path');

const fp  = path.join(__dirname, 'about.html');
let src = fs.readFileSync(fp, 'utf8').replace(/\r\n/g, '\n');
const orig = src;

// ── 1. Update .page-header: add position/overflow, increase bottom padding ────
src = src.replace(
  '.page-header{background:#f0e8d8;padding:3rem 2.5rem 2.5rem;text-align:center;border-bottom:0.5px solid #ddd6c4}',
  '.page-header{background:#f0e8d8;padding:3rem 2.5rem 5.5rem;text-align:center;border-bottom:0.5px solid #ddd6c4;position:relative;overflow:hidden}'
);

// ── 2. Add position:relative;z-index:2 to page-tag, page-h1, page-divider ────
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

// ── 3. Insert root SVG as first child of .page-header ─────────────────────────
const ROOT_SVG = `  <svg class="page-header-roots" viewBox="0 0 680 280" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M340 198 L340 225" stroke="#7a5a3a" stroke-width="6.5" opacity="0.35" stroke-dasharray="27" style="--len:27; --dur:0.35s; --d:0.0s;"/>
    <path d="M340 225 Q334 232 326 238" stroke="#7a5a3a" stroke-width="5.5" opacity="0.33" stroke-dasharray="18" style="--len:18; --dur:0.25s; --d:0.32s;"/>
    <path d="M340 225 Q346 232 354 238" stroke="#7a5a3a" stroke-width="5.5" opacity="0.33" stroke-dasharray="18" style="--len:18; --dur:0.25s; --d:0.34s;"/>
    <path d="M326 238 Q308 244 288 248 Q268 252 242 248" stroke="#7a5a3a" stroke-width="4.5" opacity="0.32" stroke-dasharray="98" style="--len:98; --dur:0.85s; --d:0.52s;"/>
    <path d="M354 238 Q372 244 392 248 Q412 252 438 248" stroke="#7a5a3a" stroke-width="4.5" opacity="0.32" stroke-dasharray="98" style="--len:98; --dur:0.85s; --d:0.54s;"/>
    <path d="M242 248 Q218 252 194 248 Q168 243 142 249" stroke="#8a6a48" stroke-width="3.5" opacity="0.30" stroke-dasharray="108" style="--len:108; --dur:0.88s; --d:1.08s;"/>
    <path d="M438 248 Q462 252 486 248 Q512 243 538 249" stroke="#8a6a48" stroke-width="3.5" opacity="0.30" stroke-dasharray="108" style="--len:108; --dur:0.88s; --d:1.10s;"/>
    <path d="M242 248 Q228 258 214 264 Q198 270 180 266" stroke="#8a6a48" stroke-width="3.0" opacity="0.28" stroke-dasharray="76" style="--len:76; --dur:0.78s; --d:1.12s;"/>
    <path d="M438 248 Q452 258 466 264 Q482 270 500 266" stroke="#8a6a48" stroke-width="3.0" opacity="0.28" stroke-dasharray="76" style="--len:76; --dur:0.78s; --d:1.14s;"/>
    <path d="M288 248 Q278 258 268 265 Q256 272 244 268" stroke="#9a7a5a" stroke-width="2.0" opacity="0.22" stroke-dasharray="58" style="--len:58; --dur:0.62s; --d:1.3s;"/>
    <path d="M392 248 Q402 258 412 265 Q424 272 436 268" stroke="#9a7a5a" stroke-width="2.0" opacity="0.22" stroke-dasharray="58" style="--len:58; --dur:0.62s; --d:1.32s;"/>
    <path d="M142 249 Q116 245 92 250 Q66 256 40 251" stroke="#9a7a5a" stroke-width="2.5" opacity="0.26" stroke-dasharray="112" style="--len:112; --dur:0.9s; --d:1.65s;"/>
    <path d="M538 249 Q564 245 588 250 Q614 256 640 251" stroke="#9a7a5a" stroke-width="2.5" opacity="0.26" stroke-dasharray="112" style="--len:112; --dur:0.9s; --d:1.67s;"/>
    <path d="M142 249 Q128 260 115 267 Q100 274 84 270" stroke="#9a7a5a" stroke-width="2.2" opacity="0.24" stroke-dasharray="72" style="--len:72; --dur:0.73s; --d:1.68s;"/>
    <path d="M538 249 Q552 260 565 267 Q580 274 596 270" stroke="#9a7a5a" stroke-width="2.2" opacity="0.24" stroke-dasharray="72" style="--len:72; --dur:0.73s; --d:1.70s;"/>
    <path d="M180 266 Q156 271 132 267 Q106 262 80 268" stroke="#9a7a5a" stroke-width="2.0" opacity="0.23" stroke-dasharray="108" style="--len:108; --dur:0.85s; --d:1.65s;"/>
    <path d="M500 266 Q524 271 548 267 Q574 262 600 268" stroke="#9a7a5a" stroke-width="2.0" opacity="0.23" stroke-dasharray="108" style="--len:108; --dur:0.85s; --d:1.67s;"/>
    <path d="M180 266 Q166 276 153 282 Q138 288 122 284" stroke="#9a7a5a" stroke-width="1.8" opacity="0.21" stroke-dasharray="68" style="--len:68; --dur:0.68s; --d:1.70s;"/>
    <path d="M500 266 Q514 276 527 282 Q542 288 558 284" stroke="#9a7a5a" stroke-width="1.8" opacity="0.21" stroke-dasharray="68" style="--len:68; --dur:0.68s; --d:1.72s;"/>
    <path d="M244 268 Q230 274 216 270 Q200 265 184 272" stroke="#a08a6a" stroke-width="1.5" opacity="0.19" stroke-dasharray="68" style="--len:68; --dur:0.62s; --d:1.88s;"/>
    <path d="M436 268 Q450 274 464 270 Q480 265 496 272" stroke="#a08a6a" stroke-width="1.5" opacity="0.19" stroke-dasharray="68" style="--len:68; --dur:0.62s; --d:1.90s;"/>
    <path d="M40 251 Q18 247 4 253" stroke="#a08a6a" stroke-width="1.6" opacity="0.20" stroke-dasharray="42" style="--len:42; --dur:0.52s; --d:2.25s;"/>
    <path d="M640 251 Q662 247 676 253" stroke="#a08a6a" stroke-width="1.6" opacity="0.20" stroke-dasharray="42" style="--len:42; --dur:0.52s; --d:2.27s;"/>
    <path d="M40 251 Q28 261 16 267 Q6 272 2 268" stroke="#a08a6a" stroke-width="1.3" opacity="0.18" stroke-dasharray="50" style="--len:50; --dur:0.55s; --d:2.28s;"/>
    <path d="M640 251 Q652 261 664 267 Q674 272 678 268" stroke="#a08a6a" stroke-width="1.3" opacity="0.18" stroke-dasharray="50" style="--len:50; --dur:0.55s; --d:2.30s;"/>
    <path d="M84 270 Q64 276 46 272 Q28 267 12 274" stroke="#a08a6a" stroke-width="1.4" opacity="0.19" stroke-dasharray="80" style="--len:80; --dur:0.65s; --d:2.22s;"/>
    <path d="M596 270 Q616 276 634 272 Q652 267 668 274" stroke="#a08a6a" stroke-width="1.4" opacity="0.19" stroke-dasharray="80" style="--len:80; --dur:0.65s; --d:2.24s;"/>
    <path d="M84 270 Q72 280 60 286 Q46 292 32 288" stroke="#a08a6a" stroke-width="1.2" opacity="0.17" stroke-dasharray="62" style="--len:62; --dur:0.6s; --d:2.25s;"/>
    <path d="M596 270 Q608 280 620 286 Q634 292 648 288" stroke="#a08a6a" stroke-width="1.2" opacity="0.17" stroke-dasharray="62" style="--len:62; --dur:0.6s; --d:2.27s;"/>
    <path d="M80 268 Q60 273 40 269 Q22 265 6 271" stroke="#a08a6a" stroke-width="1.2" opacity="0.17" stroke-dasharray="82" style="--len:82; --dur:0.65s; --d:2.3s;"/>
    <path d="M600 268 Q620 273 640 269 Q658 265 674 271" stroke="#a08a6a" stroke-width="1.2" opacity="0.17" stroke-dasharray="82" style="--len:82; --dur:0.65s; --d:2.32s;"/>
    <path d="M122 284 Q104 289 86 285 Q68 280 50 287" stroke="#a08a6a" stroke-width="1.1" opacity="0.16" stroke-dasharray="80" style="--len:80; --dur:0.62s; --d:2.32s;"/>
    <path d="M558 284 Q576 289 594 285 Q612 280 630 287" stroke="#a08a6a" stroke-width="1.1" opacity="0.16" stroke-dasharray="80" style="--len:80; --dur:0.62s; --d:2.34s;"/>
    <path d="M340 225 Q340 242 340 258" stroke="#7a5a3a" stroke-width="3.5" opacity="0.28" stroke-dasharray="33" style="--len:33; --dur:0.45s; --d:0.55s;"/>
    <path d="M340 258 Q332 267 322 273 Q310 280 298 276" stroke="#8a6a48" stroke-width="2.4" opacity="0.25" stroke-dasharray="52" style="--len:52; --dur:0.55s; --d:0.92s;"/>
    <path d="M340 258 Q348 267 358 273 Q370 280 382 276" stroke="#8a6a48" stroke-width="2.4" opacity="0.25" stroke-dasharray="52" style="--len:52; --dur:0.55s; --d:0.94s;"/>
    <path d="M298 276 Q284 281 270 277 Q256 273 244 279" stroke="#9a7a5a" stroke-width="1.6" opacity="0.20" stroke-dasharray="62" style="--len:62; --dur:0.58s; --d:1.38s;"/>
    <path d="M382 276 Q396 281 410 277 Q424 273 436 279" stroke="#9a7a5a" stroke-width="1.6" opacity="0.20" stroke-dasharray="62" style="--len:62; --dur:0.58s; --d:1.40s;"/>
    <circle cx="4"   cy="253" r="2.0" fill="#a08a6a" style="--d:2.82s; transform-origin:4px 253px"/>
    <circle cx="676" cy="253" r="2.0" fill="#a08a6a" style="--d:2.82s; transform-origin:676px 253px"/>
    <circle cx="2"   cy="268" r="1.8" fill="#a08a6a" style="--d:2.88s; transform-origin:2px 268px"/>
    <circle cx="678" cy="268" r="1.8" fill="#a08a6a" style="--d:2.88s; transform-origin:678px 268px"/>
    <circle cx="12"  cy="274" r="1.7" fill="#a08a6a" style="--d:2.90s; transform-origin:12px 274px"/>
    <circle cx="668" cy="274" r="1.7" fill="#a08a6a" style="--d:2.90s; transform-origin:668px 274px"/>
    <circle cx="6"   cy="271" r="1.6" fill="#a08a6a" style="--d:2.96s; transform-origin:6px 271px"/>
    <circle cx="674" cy="271" r="1.6" fill="#a08a6a" style="--d:2.96s; transform-origin:674px 271px"/>
    <circle cx="32"  cy="288" r="1.6" fill="#a08a6a" style="--d:2.92s; transform-origin:32px 288px"/>
    <circle cx="648" cy="288" r="1.6" fill="#a08a6a" style="--d:2.92s; transform-origin:648px 288px"/>
    <circle cx="50"  cy="287" r="1.5" fill="#a08a6a" style="--d:2.97s; transform-origin:50px 287px"/>
    <circle cx="630" cy="287" r="1.5" fill="#a08a6a" style="--d:2.97s; transform-origin:630px 287px"/>
    <circle cx="184" cy="272" r="1.6" fill="#a08a6a" style="--d:2.55s; transform-origin:184px 272px"/>
    <circle cx="496" cy="272" r="1.6" fill="#a08a6a" style="--d:2.55s; transform-origin:496px 272px"/>
    <circle cx="244" cy="279" r="1.8" fill="#9a7a5a" style="--d:2.02s; transform-origin:244px 279px"/>
    <circle cx="436" cy="279" r="1.8" fill="#9a7a5a" style="--d:2.02s; transform-origin:436px 279px"/>
  </svg>`;

src = src.replace(
  '<div class="page-header">\n  <div class="page-tag">',
  '<div class="page-header">\n' + ROOT_SVG + '\n  <div class="page-tag">'
);

// ── 4. Add animation CSS to <head> (before </head>) ───────────────────────────
const ANIM_CSS = `<style>
.page-header-roots{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1}
@media(prefers-reduced-motion:no-preference){
  .page-tag{animation:rootFadeUp 0.6s ease both;animation-delay:1.0s;opacity:0;animation-play-state:paused}
  .page-h1{animation:rootFadeUp 0.7s ease both;animation-delay:1.3s;opacity:0;animation-play-state:paused}
  .page-divider{animation:rootGrowRule 0.5s ease both;animation-delay:2.1s;opacity:0;transform-origin:center;animation-play-state:paused}
  .page-header-roots path{fill:none;stroke-linecap:round;stroke-linejoin:round;animation:rootDraw var(--dur,1.8s) cubic-bezier(0.3,0,0.4,1) both;animation-delay:var(--d,0s);animation-play-state:paused}
  .page-header-roots circle{animation:rootTipPop 0.3s cubic-bezier(0.34,1.6,0.64,1) both;animation-delay:var(--d,2.2s);opacity:0;animation-play-state:paused}
  .roots-ready .page-tag,
  .roots-ready .page-h1,
  .roots-ready .page-divider,
  .roots-ready .page-header-roots path,
  .roots-ready .page-header-roots circle{animation-play-state:running}
  @keyframes rootDraw{from{stroke-dashoffset:var(--len);opacity:0}4%{opacity:1}to{stroke-dashoffset:0;opacity:1}}
  @keyframes rootTipPop{from{opacity:0;transform:scale(0)}to{opacity:0.8;transform:scale(1)}}
  @keyframes rootFadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  @keyframes rootGrowRule{from{opacity:0;transform:scaleX(0)}to{opacity:1;transform:scaleX(1)}}
}
</style>`;

src = src.replace(
  '<link rel="stylesheet" href="css/shared.css" />\n</head>',
  '<link rel="stylesheet" href="css/shared.css" />\n' + ANIM_CSS + '\n</head>'
);

// ── 5. Add IntersectionObserver before </body> ────────────────────────────────
const OBSERVER = `<script>
(function(){
  var header = document.querySelector('.page-header');
  if (!header) return;
  if (!window.IntersectionObserver) { header.classList.add('roots-ready'); return; }
  var obs = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting) { header.classList.add('roots-ready'); obs.disconnect(); }
  }, { threshold: 0.3 });
  obs.observe(header);
})();
</script>`;

src = src.replace('\n</body>', '\n' + OBSERVER + '\n</body>');

// ── Sanity checks ─────────────────────────────────────────────────────────────
const checks = [
  ['position:relative;overflow:hidden',  '.page-header gets position+overflow'],
  ['padding:3rem 2.5rem 5.5rem',         '.page-header bottom padding 5.5rem'],
  ['page-header-roots',                  'SVG class inserted'],
  ['rootDraw',                           'rootDraw keyframe'],
  ['roots-ready',                        'roots-ready selector'],
  ['</head>',                            '</head> still present'],
  ['<body>',                             '<body> still present'],
];
let ok = true;
checks.forEach(([token, label]) => {
  if (!src.includes(token)) { console.error('FAIL: missing ' + label); ok = false; }
});
if (!ok) process.exit(1);

fs.writeFileSync(fp, src, 'utf8');
console.log('Done — about.html updated with root SVG animation.');
