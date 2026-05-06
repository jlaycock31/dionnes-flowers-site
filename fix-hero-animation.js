'use strict';
const fs   = require('fs');
const path = require('path');

const fp  = path.join(__dirname, 'index.html');
let src = fs.readFileSync(fp, 'utf8');
const orig = src;

// ── 1. Mobile spacing: add .hero-text rule inside 1024px media query ──────────
src = src.replace(
  '  *{max-width:100%}\n}',
  '  *{max-width:100%}\n  .hero-text{padding-bottom:0.5rem!important}\n}'
);

// ── 2. Replace flat SVG with grouped SVG (add id + <g> wrappers) ─────────────
src = src.replace(
`<svg viewBox="0 0 340 380" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" style="position:absolute;top:0;left:0">
  <rect width="340" height="380" fill="#f0e8d8"/>
  <ellipse cx="170" cy="360" rx="140" ry="28" fill="#d4c4a0" opacity="0.5"/>
  <path d="M140 340 Q138 280 135 220 Q132 180 140 160" stroke="#7a8a5a" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M135 240 Q110 225 98 210" stroke="#7a8a5a" stroke-width="2" fill="none" stroke-linecap="round"/>
  <ellipse cx="94" cy="206" rx="18" ry="11" fill="#8a9a6a" transform="rotate(-30 94 206)" opacity="0.85"/>
  <path d="M137 200 Q160 188 168 175" stroke="#7a8a5a" stroke-width="2" fill="none" stroke-linecap="round"/>
  <ellipse cx="171" cy="171" rx="20" ry="12" fill="#9aaa7a" transform="rotate(20 171 171)" opacity="0.85"/>
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
  <path d="M200 340 Q205 270 210 230 Q215 195 208 170" stroke="#8a9a6a" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M209 210 Q230 198 240 188" stroke="#8a9a6a" stroke-width="2" fill="none" stroke-linecap="round"/>
  <ellipse cx="244" cy="184" rx="16" ry="10" fill="#9aaa7a" transform="rotate(25 244 184)" opacity="0.85"/>
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
  <path d="M265 340 Q268 300 264 270 Q260 245 265 225" stroke="#6a8a5a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <ellipse cx="250" cy="330" rx="22" ry="12" fill="#8aaa6a" transform="rotate(-15 250 330)" opacity="0.75"/>
  <ellipse cx="282" cy="315" rx="20" ry="11" fill="#9aba7a" transform="rotate(10 282 315)" opacity="0.75"/>
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
  <path d="M60 340 Q58 300 62 270 Q66 248 60 228" stroke="#7a9a6a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M61 258 Q40 245 32 235" stroke="#7a9a6a" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <ellipse cx="28" cy="231" rx="15" ry="9" fill="#8aaa6a" transform="rotate(-20 28 231)" opacity="0.8"/>
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
  <path d="M30 345 Q80 310 130 345" stroke="#8a9a6a" stroke-width="2" fill="none"/>
  <path d="M190 350 Q240 318 290 348" stroke="#8a9a6a" stroke-width="2" fill="none"/>
  <ellipse cx="55" cy="348" rx="22" ry="11" fill="#9aaa7a" opacity="0.7"/>
  <ellipse cx="100" cy="354" rx="18" ry="9" fill="#8a9a6a" opacity="0.7"/>
  <ellipse cx="215" cy="352" rx="19" ry="10" fill="#9aaa7a" opacity="0.7"/>
  <ellipse cx="260" cy="356" rx="21" ry="10" fill="#8a9a6a" opacity="0.7"/>
</svg>`,
`<svg id="hero-svg" viewBox="0 0 340 380" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" style="position:absolute;top:0;left:0">
  <rect width="340" height="380" fill="#f0e8d8"/>
  <ellipse cx="170" cy="360" rx="140" ry="28" fill="#d4c4a0" opacity="0.5"/>
  <g class="f1-stem">
  <path d="M140 340 Q138 280 135 220 Q132 180 140 160" stroke="#7a8a5a" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M135 240 Q110 225 98 210" stroke="#7a8a5a" stroke-width="2" fill="none" stroke-linecap="round"/>
  <ellipse cx="94" cy="206" rx="18" ry="11" fill="#8a9a6a" transform="rotate(-30 94 206)" opacity="0.85"/>
  <path d="M137 200 Q160 188 168 175" stroke="#7a8a5a" stroke-width="2" fill="none" stroke-linecap="round"/>
  <ellipse cx="171" cy="171" rx="20" ry="12" fill="#9aaa7a" transform="rotate(20 171 171)" opacity="0.85"/>
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
  <g class="f2-stem">
  <path d="M200 340 Q205 270 210 230 Q215 195 208 170" stroke="#8a9a6a" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M209 210 Q230 198 240 188" stroke="#8a9a6a" stroke-width="2" fill="none" stroke-linecap="round"/>
  <ellipse cx="244" cy="184" rx="16" ry="10" fill="#9aaa7a" transform="rotate(25 244 184)" opacity="0.85"/>
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
  <g class="f3-stem">
  <path d="M265 340 Q268 300 264 270 Q260 245 265 225" stroke="#6a8a5a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <ellipse cx="250" cy="330" rx="22" ry="12" fill="#8aaa6a" transform="rotate(-15 250 330)" opacity="0.75"/>
  <ellipse cx="282" cy="315" rx="20" ry="11" fill="#9aba7a" transform="rotate(10 282 315)" opacity="0.75"/>
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
  <g class="f4-stem">
  <path d="M60 340 Q58 300 62 270 Q66 248 60 228" stroke="#7a9a6a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M61 258 Q40 245 32 235" stroke="#7a9a6a" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <ellipse cx="28" cy="231" rx="15" ry="9" fill="#8aaa6a" transform="rotate(-20 28 231)" opacity="0.8"/>
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
  <path d="M30 345 Q80 310 130 345" stroke="#8a9a6a" stroke-width="2" fill="none"/>
  <path d="M190 350 Q240 318 290 348" stroke="#8a9a6a" stroke-width="2" fill="none"/>
  <ellipse cx="55" cy="348" rx="22" ry="11" fill="#9aaa7a" opacity="0.7"/>
  <ellipse cx="100" cy="354" rx="18" ry="9" fill="#8a9a6a" opacity="0.7"/>
  <ellipse cx="215" cy="352" rx="19" ry="10" fill="#9aaa7a" opacity="0.7"/>
  <ellipse cx="260" cy="356" rx="21" ry="10" fill="#8a9a6a" opacity="0.7"/>
</svg>`
);

// ── 3. Add animation CSS block after the hero/page style block ────────────────
const ANIM_CSS = `<style>
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

src = src.replace(
  '</style>\n\n<div class="hero">',
  '</style>\n' + ANIM_CSS + '\n<div class="hero">'
);

// ── 4. Add IntersectionObserver before </body> ────────────────────────────────
const OBSERVER = `<script>
(function(){
  var svg=document.getElementById('hero-svg');
  if(!svg||!window.IntersectionObserver)return;
  var obs=new IntersectionObserver(function(entries){
    if(entries[0].isIntersecting){svg.classList.add('svg-animated');obs.disconnect();}
  },{threshold:0.3});
  obs.observe(svg);
})();
</script>`;

src = src.replace(
  '<script src="js/nav.js"></script>\n</body>',
  '<script src="js/nav.js"></script>\n' + OBSERVER + '\n</body>'
);

if (src === orig) {
  console.error('ERROR: no changes made — check that search strings match exactly');
  process.exit(1);
}

fs.writeFileSync(fp, src, 'utf8');
console.log('Done — index.html updated with SVG animation + mobile spacing fix.');
