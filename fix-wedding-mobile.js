const fs   = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(filePath, 'utf8');
let allOk = true;

function patch(label, search, replace) {
  if (!html.includes(search)) { console.error('MISS [' + label + ']'); allOk = false; return; }
  html = html.replace(search, replace);
  console.log('OK   [' + label + ']');
}

// 1. Add overflow-x:hidden to base .wedding-band rule
patch('wedding-band base overflow',
  `.wedding-band{background:#2c1e14;padding:3rem 2.5rem;display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center}`,
  `.wedding-band{background:#2c1e14;padding:3rem 2.5rem;display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center;overflow-x:hidden}`
);

// 2. Replace the full mobile media query with updated wedding-band rules
patch('mobile media query',
  `@media(max-width:768px){
  html,body{overflow-x:hidden}
  .hero{grid-template-columns:1fr}
  .hero-img{display:none}
  .service-grid,.cards{grid-template-columns:1fr}
  .wedding-band{grid-template-columns:1fr;padding:2rem 1.25rem}
  .wedding-band>svg{display:none}
  .wedding-features{grid-template-columns:1fr 1fr}
  .gallery-strip{grid-template-columns:1fr 1fr}
  *{max-width:100%}
}`,
  `@media(max-width:768px){
  html,body{overflow-x:hidden}
  .hero{grid-template-columns:1fr}
  .hero-img{display:none}
  .service-grid,.cards{grid-template-columns:1fr}
  .wedding-band{display:flex!important;flex-direction:column!important;overflow:hidden!important;padding:2rem 1.25rem!important}
  .wedding-band>svg{display:none}
  .wedding-features{display:grid!important;grid-template-columns:1fr 1fr!important;gap:0.75rem!important;width:100%!important;margin-top:1.5rem!important}
  .wf{width:100%!important;box-sizing:border-box!important}
  .dark-band{display:flex!important;flex-direction:column!important;overflow:hidden!important;padding:2rem 1.25rem!important}
  .gallery-strip{grid-template-columns:1fr 1fr}
  *{max-width:100%}
}`
);

if (allOk) {
  fs.writeFileSync(filePath, html, 'utf8');
  console.log('\nindex.html patched successfully.');
} else {
  console.error('\nOne or more patches missed — index.html NOT written.');
  process.exit(1);
}
