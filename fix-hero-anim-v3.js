'use strict';
const fs   = require('fs');
const path = require('path');

const fp  = path.join(__dirname, 'index.html');
let src = fs.readFileSync(fp, 'utf8').replace(/\r\n/g, '\n');
const orig = src;

// ── STEP 1: Remove old animation <style> block (exact string match) ───────────
// This MUST happen before inserting the new one so regexes don't misfire.
const OLD_ANIM_BLOCK =
`<style>
@media(prefers-reduced-motion:no-preference){
  @keyframes stem-grow{from{transform:scaleY(0)}to{transform:scaleY(1)}}
  @keyframes bloom-open{from{transform:scale(0)}to{transform:scale(1)}}
  #hero-svg .f1-stem,#hero-svg .f1-bloom,
  #hero-svg .f2-stem,#hero-svg .f2-bloom,
  #hero-svg .f3-stem,#hero-svg .f3-bloom,
  #hero-svg .f4-stem,#hero-svg .f4-bloom{animation-fill-mode:both;animation-play-state:paused;transform-box:view-box}
  #hero-svg .f1-stem{animation:stem-grow 0.9s ease-out 0s;transform-origin:140px 340px}
  #hero-svg .f2-stem{animation:stem-grow 0.9s ease-out 0.08s;transform-origin:200px 340px}
  #hero-svg .f3-stem{animation:stem-grow 0.9s ease-out 0.16s;transform-origin:265px 340px}
  #hero-svg .f4-stem{animation:stem-grow 0.9s ease-out 0.05s;transform-origin:60px 340px}
  #hero-svg .f1-bloom{animation:bloom-open 0.6s cubic-bezier(0.34,1.56,0.64,1) 1.1s;transform-origin:140px 148px}
  #hero-svg .f2-bloom{animation:bloom-open 0.6s cubic-bezier(0.34,1.56,0.64,1) 1.3s;transform-origin:208px 155px}
  #hero-svg .f3-bloom{animation:bloom-open 0.6s cubic-bezier(0.34,1.56,0.64,1) 1.5s;transform-origin:265px 210px}
  #hero-svg .f4-bloom{animation:bloom-open 0.6s cubic-bezier(0.34,1.56,0.64,1) 1.7s;transform-origin:60px 213px}
  #hero-svg.svg-animated .f1-stem,#hero-svg.svg-animated .f1-bloom,
  #hero-svg.svg-animated .f2-stem,#hero-svg.svg-animated .f2-bloom,
  #hero-svg.svg-animated .f3-stem,#hero-svg.svg-animated .f3-bloom,
  #hero-svg.svg-animated .f4-stem,#hero-svg.svg-animated .f4-bloom{animation-play-state:running}
}
</style>`;

src = src.replace('\n' + OLD_ANIM_BLOCK + '\n', '\n');
if (src.includes(OLD_ANIM_BLOCK)) { console.error('ERROR: old anim block not removed'); process.exit(1); }

// ── STEP 2: Replace the SVG with new finer-grained groups + buds + bees ──────
const BEE_BODY = `          <ellipse class="wingFL" cx="-5" cy="-8" rx="6" ry="3.5" fill="#d4956a" opacity="0.6"/>
          <ellipse class="wingFR" cx="5" cy="-8" rx="6" ry="3.5" fill="#d4956a" opacity="0.6"/>
          <ellipse rx="5" ry="8" fill="#e8c060"/>
          <rect x="-5" y="-2" width="10" height="2" fill="#8a6010" opacity="0.65"/>
          <rect x="-5" y="2" width="10" height="2" fill="#8a6010" opacity="0.65"/>
          <circle cy="-10" r="4" fill="#c8a030"/>
          <line x1="-2" y1="-13" x2="-5" y2="-18" stroke="#8a6010" stroke-width="0.8"/>
          <circle cx="-5" cy="-18" r="1" fill="#8a6010"/>
          <line x1="2" y1="-13" x2="5" y2="-18" stroke="#8a6010" stroke-width="0.8"/>
          <circle cx="5" cy="-18" r="1" fill="#8a6010"/>
          <ellipse cy="9" rx="2" ry="2.5" fill="#c8a030"/>`;

const NEW_SVG =
`<svg id="hero-svg" viewBox="0 0 340 380" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" style="position:absolute;top:0;left:0">
  <rect width="340" height="380" fill="#f0e8d8"/>
  <ellipse cx="170" cy="360" rx="140" ry="28" fill="#d4c4a0" opacity="0.5"/>
  <g class="f1-mainstem">
  <path d="M140 340 Q138 280 135 220 Q132 180 140 160" stroke="#7a8a5a" stroke-width="3" fill="none" stroke-linecap="round"/>
  </g>
  <g class="f1-side1">
  <path d="M135 240 Q110 225 98 210" stroke="#7a8a5a" stroke-width="2" fill="none" stroke-linecap="round"/>
  <ellipse cx="94" cy="206" rx="18" ry="11" fill="#8a9a6a" transform="rotate(-30 94 206)" opacity="0.85"/>
  </g>
  <g class="f1-side2">
  <path d="M137 200 Q160 188 168 175" stroke="#7a8a5a" stroke-width="2" fill="none" stroke-linecap="round"/>
  <ellipse cx="171" cy="171" rx="20" ry="12" fill="#9aaa7a" transform="rotate(20 171 171)" opacity="0.85"/>
  </g>
  <g class="f1-bud">
  <g class="f1-budcore"><ellipse cx="140" cy="148" rx="8" ry="14" fill="#d08050"/></g>
  </g>
  <g class="f1-bloom">
  <ellipse cx="140" cy="112" rx="14" ry="20" fill="#e09068"/>
  <ellipse cx="162" cy="122" rx="14" ry="20" fill="#d88060" transform="rotate(30 162 122)"/>
  <ellipse cx="170" cy="148" rx="14" ry="20" fill="#e09068" transform="rotate(70 170 148)"/>
  <ellipse cx="158" cy="172" rx="14" ry="20" fill="#d88060" transform="rotate(110 158 172)"/>
  <ellipse cx="135" cy="178" rx="14" ry="20" fill="#e09068" transform="rotate(150 135 178)"/>
  <ellipse cx="114" cy="165" rx="14" ry="20" fill="#d88060" transform="rotate(190 114 165)"/>
  <ellipse cx="110" cy="140" rx="14" ry="20" fill="#e09068" transform="rotate(230 110 140)"/>
  <ellipse cx="122" cy="118" rx="14" ry="20" fill="#d88060" transform="rotate(270 122 118)"/>
  <circle cx="140" cy="148" r="18" fill="#c87050"/>
  <circle cx="140" cy="148" r="10" fill="#b86040"/>
  </g>
  <g class="f2-mainstem">
  <path d="M200 340 Q205 270 210 230 Q215 195 208 170" stroke="#8a9a6a" stroke-width="3" fill="none" stroke-linecap="round"/>
  </g>
  <g class="f2-side1">
  <path d="M209 210 Q230 198 240 188" stroke="#8a9a6a" stroke-width="2" fill="none" stroke-linecap="round"/>
  <ellipse cx="244" cy="184" rx="16" ry="10" fill="#9aaa7a" transform="rotate(25 244 184)" opacity="0.85"/>
  </g>
  <g class="f2-bud">
  <g class="f2-budcore"><ellipse cx="208" cy="155" rx="6" ry="11" fill="#c8a040"/></g>
  </g>
  <g class="f2-bloom">
  <ellipse cx="208" cy="128" rx="11" ry="16" fill="#e8c060"/>
  <ellipse cx="225" cy="137" rx="11" ry="16" fill="#d8b050" transform="rotate(30 225 137)"/>
  <ellipse cx="230" cy="155" rx="11" ry="16" fill="#e8c060" transform="rotate(65 230 155)"/>
  <ellipse cx="220" cy="172" rx="11" ry="16" fill="#d8b050" transform="rotate(100 220 172)"/>
  <ellipse cx="204" cy="178" rx="11" ry="16" fill="#e8c060" transform="rotate(135 204 178)"/>
  <ellipse cx="188" cy="170" rx="11" ry="16" fill="#d8b050" transform="rotate(170 188 170)"/>
  <ellipse cx="184" cy="153" rx="11" ry="16" fill="#e8c060" transform="rotate(205 184 153)"/>
  <ellipse cx="194" cy="136" rx="11" ry="16" fill="#d8b050" transform="rotate(240 194 136)"/>
  <circle cx="208" cy="155" r="14" fill="#c8a040"/>
  <circle cx="208" cy="155" r="7" fill="#b89030"/>
  </g>
  <g class="f3-mainstem">
  <path d="M265 340 Q268 300 264 270 Q260 245 265 225" stroke="#6a8a5a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  </g>
  <g class="f3-side1">
  <ellipse cx="250" cy="330" rx="22" ry="12" fill="#8aaa6a" transform="rotate(-15 250 330)" opacity="0.75"/>
  <ellipse cx="282" cy="315" rx="20" ry="11" fill="#9aba7a" transform="rotate(10 282 315)" opacity="0.75"/>
  </g>
  <g class="f3-bud">
  <g class="f3-budcore"><ellipse cx="265" cy="210" rx="5" ry="9" fill="#b07890"/></g>
  </g>
  <g class="f3-bloom">
  <ellipse cx="265" cy="188" rx="9" ry="13" fill="#e0a0be"/>
  <ellipse cx="278" cy="195" rx="9" ry="13" fill="#d090ae" transform="rotate(30 278 195)"/>
  <ellipse cx="282" cy="210" rx="9" ry="13" fill="#e0a0be" transform="rotate(65 282 210)"/>
  <ellipse cx="274" cy="223" rx="9" ry="13" fill="#d090ae" transform="rotate(100 274 223)"/>
  <ellipse cx="260" cy="227" rx="9" ry="13" fill="#e0a0be" transform="rotate(135 260 227)"/>
  <ellipse cx="248" cy="220" rx="9" ry="13" fill="#d090ae" transform="rotate(170 248 220)"/>
  <ellipse cx="246" cy="207" rx="9" ry="13" fill="#e0a0be" transform="rotate(205 246 207)"/>
  <ellipse cx="254" cy="194" rx="9" ry="13" fill="#d090ae" transform="rotate(240 254 194)"/>
  <circle cx="265" cy="210" r="11" fill="#c07898"/>
  <circle cx="265" cy="210" r="5" fill="#b06888"/>
  </g>
  <g class="f4-mainstem">
  <path d="M60 340 Q58 300 62 270 Q66 248 60 228" stroke="#7a9a6a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  </g>
  <g class="f4-side1">
  <path d="M61 258 Q40 245 32 235" stroke="#7a9a6a" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <ellipse cx="28" cy="231" rx="15" ry="9" fill="#8aaa6a" transform="rotate(-20 28 231)" opacity="0.8"/>
  </g>
  <g class="f4-bud">
  <g class="f4-budcore"><ellipse cx="60" cy="213" rx="4" ry="8" fill="#78a050"/></g>
  </g>
  <g class="f4-bloom">
  <ellipse cx="60" cy="195" rx="8" ry="12" fill="#a0c878"/>
  <ellipse cx="72" cy="202" rx="8" ry="12" fill="#90b868" transform="rotate(30 72 202)"/>
  <ellipse cx="74" cy="215" rx="8" ry="12" fill="#a0c878" transform="rotate(65 74 215)"/>
  <ellipse cx="67" cy="227" rx="8" ry="12" fill="#90b868" transform="rotate(100 67 227)"/>
  <ellipse cx="54" cy="230" rx="8" ry="12" fill="#a0c878" transform="rotate(135 54 230)"/>
  <ellipse cx="44" cy="222" rx="8" ry="12" fill="#90b868" transform="rotate(170 44 222)"/>
  <ellipse cx="44" cy="210" rx="8" ry="12" fill="#a0c878" transform="rotate(205 44 210)"/>
  <ellipse cx="51" cy="199" rx="8" ry="12" fill="#90b868" transform="rotate(240 51 199)"/>
  <circle cx="60" cy="213" r="9" fill="#78a850"/>
  <circle cx="60" cy="213" r="4" fill="#689040"/>
  </g>
  <g class="ground">
  <path d="M30 345 Q80 310 130 345" stroke="#8a9a6a" stroke-width="2" fill="none"/>
  <path d="M190 350 Q240 318 290 348" stroke="#8a9a6a" stroke-width="2" fill="none"/>
  <ellipse cx="55" cy="348" rx="22" ry="11" fill="#9aaa7a" opacity="0.7"/>
  <ellipse cx="100" cy="354" rx="18" ry="9" fill="#8a9a6a" opacity="0.7"/>
  <ellipse cx="215" cy="352" rx="19" ry="10" fill="#9aaa7a" opacity="0.7"/>
  <ellipse cx="260" cy="356" rx="21" ry="10" fill="#8a9a6a" opacity="0.7"/>
  </g>
  <g class="bee1-wrap"><g class="bee1-pos"><g class="bee1-draw"><g class="beebody">
${BEE_BODY}
  </g></g></g></g>
  <g class="bee2-wrap"><g class="bee2-pos"><g class="bee2-draw"><g class="beebody">
${BEE_BODY}
  </g></g></g></g>
</svg>`;

src = src.replace(/<svg id="hero-svg"[\s\S]*?<\/svg>/, NEW_SVG);

// ── STEP 3: hero-img → hero-illustration ──────────────────────────────────────
src = src.replace(
  '<div class="hero-img" style="background:#f0e8d8;position:relative;overflow:hidden;min-height:380px">',
  '<div class="hero-illustration" style="background:#f0e8d8;position:relative;overflow:hidden;min-height:380px">'
);

// ── STEP 4: Mobile: add hero-illustration top-spacing fix ─────────────────────
src = src.replace(
  '  .hero-text{padding-bottom:0.5rem!important}\n}',
  '  .hero-text{padding-bottom:0.5rem!important}\n  .hero-illustration{margin-top:0!important;padding-top:0!important}\n}'
);

// ── STEP 5: Replace observer script ───────────────────────────────────────────
src = src.replace(
`<script>
(function(){
  var svg=document.getElementById('hero-svg');
  if(!svg||!window.IntersectionObserver)return;
  var obs=new IntersectionObserver(function(entries){
    if(entries[0].isIntersecting){svg.classList.add('svg-animated');obs.disconnect();}
  },{threshold:0.3});
  obs.observe(svg);
})();
</script>`,
`<script>
const heroSvg = document.querySelector('.hero-illustration svg');
if (heroSvg && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        heroSvg.classList.add('svg-ready');
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });
  observer.observe(heroSvg);
} else if (heroSvg) {
  heroSvg.classList.add('svg-ready');
}
</script>`
);

// ── STEP 6: Insert new animation CSS into <head> (safe now — old block gone) ──
const NEW_ANIM_STYLE = `<style>
@media(prefers-reduced-motion:no-preference){
  @keyframes riseUp{0%{transform:scaleY(0);opacity:0}6%{opacity:1}100%{transform:scaleY(1);opacity:1}}
  @keyframes branchOut{0%{transform:scale(0);opacity:0}10%{opacity:1}100%{transform:scale(1);opacity:1}}
  @keyframes bloomOpen{0%{transform:scale(0);opacity:0}8%{opacity:1}100%{transform:scale(1);opacity:1}}
  @keyframes budFade{0%{opacity:1}50%{opacity:1}100%{opacity:0}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes beeAppear{to{opacity:1}}
  @keyframes wingFlap{from{transform:scaleY(1)}to{transform:scaleY(0.2)}}
  @keyframes beeBob{from{transform:translateY(0px)}to{transform:translateY(-2px)}}
  @keyframes bee1path{
    0%{transform:translate(42px,204px)}22%{transform:translate(42px,204px)}
    38%{transform:translate(122px,139px)}55%{transform:translate(122px,139px)}
    72%{transform:translate(192px,146px)}88%{transform:translate(192px,146px)}
    100%{transform:translate(42px,204px)}}
  @keyframes bee2path{
    0%{transform:translate(192px,146px)}22%{transform:translate(192px,146px)}
    38%{transform:translate(248px,200px)}55%{transform:translate(248px,200px)}
    72%{transform:translate(122px,139px)}88%{transform:translate(122px,139px)}
    100%{transform:translate(192px,146px)}}
  @keyframes bee1flip{
    0%{transform:rotate(90deg) scaleX(1)}72%{transform:rotate(90deg) scaleX(1)}
    72.1%{transform:rotate(90deg) scaleX(-1)}100%{transform:rotate(90deg) scaleX(-1)}}
  @keyframes bee2flip{
    0%{transform:rotate(90deg) scaleX(1)}22%{transform:rotate(90deg) scaleX(1)}
    22.1%{transform:rotate(90deg) scaleX(-1)}72%{transform:rotate(90deg) scaleX(-1)}
    72.1%{transform:rotate(90deg) scaleX(1)}100%{transform:rotate(90deg) scaleX(1)}}
  /* phase 1 — stems + buds rise */
  .f1-mainstem,.f1-bud{transform-origin:140px 340px;transform-box:view-box;animation:riseUp 1.2s cubic-bezier(0.25,0.46,0.45,0.94) both;animation-delay:0.0s;animation-play-state:paused}
  .f2-mainstem,.f2-bud{transform-origin:200px 340px;transform-box:view-box;animation:riseUp 1.2s cubic-bezier(0.25,0.46,0.45,0.94) both;animation-delay:0.15s;animation-play-state:paused}
  .f3-mainstem,.f3-bud{transform-origin:265px 340px;transform-box:view-box;animation:riseUp 1.2s cubic-bezier(0.25,0.46,0.45,0.94) both;animation-delay:0.08s;animation-play-state:paused}
  .f4-mainstem,.f4-bud{transform-origin:60px 340px;transform-box:view-box;animation:riseUp 1.2s cubic-bezier(0.25,0.46,0.45,0.94) both;animation-delay:0.05s;animation-play-state:paused}
  /* phase 2 — side branches sprout */
  .f1-side1{transform-origin:135px 240px;transform-box:view-box;animation:branchOut 0.5s cubic-bezier(0.34,1.3,0.64,1) both;animation-delay:1.3s;animation-play-state:paused}
  .f1-side2{transform-origin:137px 200px;transform-box:view-box;animation:branchOut 0.5s cubic-bezier(0.34,1.3,0.64,1) both;animation-delay:1.55s;animation-play-state:paused}
  .f2-side1{transform-origin:209px 210px;transform-box:view-box;animation:branchOut 0.5s cubic-bezier(0.34,1.3,0.64,1) both;animation-delay:1.4s;animation-play-state:paused}
  .f3-side1{transform-origin:265px 330px;transform-box:view-box;animation:branchOut 0.5s cubic-bezier(0.34,1.3,0.64,1) both;animation-delay:1.35s;animation-play-state:paused}
  .f4-side1{transform-origin:61px 258px;transform-box:view-box;animation:branchOut 0.5s cubic-bezier(0.34,1.3,0.64,1) both;animation-delay:1.3s;animation-play-state:paused}
  /* phase 3 — blooms open, buds fade */
  .f1-bloom{transform-origin:140px 148px;transform-box:view-box;animation:bloomOpen 0.9s cubic-bezier(0.34,1.5,0.64,1) both;animation-delay:2.15s;animation-play-state:paused}
  .f2-bloom{transform-origin:208px 155px;transform-box:view-box;animation:bloomOpen 0.9s cubic-bezier(0.34,1.5,0.64,1) both;animation-delay:2.45s;animation-play-state:paused}
  .f3-bloom{transform-origin:265px 210px;transform-box:view-box;animation:bloomOpen 0.9s cubic-bezier(0.34,1.5,0.64,1) both;animation-delay:2.7s;animation-play-state:paused}
  .f4-bloom{transform-origin:60px 213px;transform-box:view-box;animation:bloomOpen 0.9s cubic-bezier(0.34,1.5,0.64,1) both;animation-delay:2.95s;animation-play-state:paused}
  .f1-budcore{animation:budFade 0.9s ease both;animation-delay:2.15s;animation-play-state:paused}
  .f2-budcore{animation:budFade 0.9s ease both;animation-delay:2.45s;animation-play-state:paused}
  .f3-budcore{animation:budFade 0.9s ease both;animation-delay:2.7s;animation-play-state:paused}
  .f4-budcore{animation:budFade 0.9s ease both;animation-delay:2.95s;animation-play-state:paused}
  /* ground fades in */
  .ground{animation:fadeIn 0.5s ease both;animation-delay:0s;animation-play-state:paused}
  /* bees */
  .bee1-wrap{opacity:0;animation:beeAppear 0.6s ease forwards;animation-delay:3.8s;animation-play-state:paused}
  .bee2-wrap{opacity:0;animation:beeAppear 0.6s ease forwards;animation-delay:4.6s;animation-play-state:paused}
  .bee1-pos{animation:bee1path 10s ease-in-out infinite;animation-delay:3.8s;animation-play-state:paused}
  .bee2-pos{animation:bee2path 11s ease-in-out infinite;animation-delay:4.6s;animation-play-state:paused}
  .bee1-draw{animation:bee1flip 10s steps(1) infinite;animation-delay:3.8s;animation-play-state:paused}
  .bee2-draw{animation:bee2flip 11s steps(1) infinite;animation-delay:4.6s;animation-play-state:paused}
  .wingFL{transform-origin:0px 0px;animation:wingFlap 0.15s ease-in-out infinite alternate;animation-play-state:paused}
  .wingFR{transform-origin:0px 0px;animation:wingFlap 0.15s ease-in-out infinite alternate-reverse;animation-play-state:paused}
  .beebody{animation:beeBob 0.55s ease-in-out infinite alternate;animation-play-state:paused}
  /* svg-ready releases all animations */
  .svg-ready .f1-mainstem,.svg-ready .f1-bud,
  .svg-ready .f2-mainstem,.svg-ready .f2-bud,
  .svg-ready .f3-mainstem,.svg-ready .f3-bud,
  .svg-ready .f4-mainstem,.svg-ready .f4-bud,
  .svg-ready .f1-side1,.svg-ready .f1-side2,
  .svg-ready .f2-side1,.svg-ready .f3-side1,.svg-ready .f4-side1,
  .svg-ready .f1-bloom,.svg-ready .f2-bloom,.svg-ready .f3-bloom,.svg-ready .f4-bloom,
  .svg-ready .f1-budcore,.svg-ready .f2-budcore,.svg-ready .f3-budcore,.svg-ready .f4-budcore,
  .svg-ready .ground,
  .svg-ready .bee1-wrap,.svg-ready .bee2-wrap,
  .svg-ready .bee1-pos,.svg-ready .bee2-pos,
  .svg-ready .bee1-draw,.svg-ready .bee2-draw,
  .svg-ready .wingFL,.svg-ready .wingFR,
  .svg-ready .beebody{animation-play-state:running}
}
</style>`;

src = src.replace(
  '<link rel="stylesheet" href="css/shared.css" />\n</head>',
  '<link rel="stylesheet" href="css/shared.css" />\n' + NEW_ANIM_STYLE + '\n</head>'
);

// ── Final integrity checks ─────────────────────────────────────────────────────
const checks = [
  ['</head>',         '</head> present'],
  ['<body>',          '<body> present'],
  ['svg-ready',       'svg-ready class in CSS'],
  ['bee1-wrap',       'bee1-wrap in CSS'],
  ['f1-mainstem',     'f1-mainstem in SVG'],
  ['f1-budcore',      'f1-budcore in SVG'],
  ['hero-illustration','hero-illustration class'],
  ['beeAppear',       'beeAppear keyframe'],
];
let ok = true;
checks.forEach(([token, label]) => {
  if (!src.includes(token)) { console.error('FAIL: missing ' + label); ok = false; }
});
if (!ok) process.exit(1);

fs.writeFileSync(fp, src, 'utf8');
console.log('Done — index.html updated cleanly.');
