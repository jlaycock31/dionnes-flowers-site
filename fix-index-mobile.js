const fs   = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

const SEARCH = `.btn-light{background:#d4956a;color:#7a5a3a;border:none;padding:10px 26px;border-radius:2px;font-family:'Jost',sans-serif;font-size:13px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;cursor:pointer;display:inline-block;text-decoration:none}
</style>`;

const REPLACE = `.btn-light{background:#d4956a;color:#7a5a3a;border:none;padding:10px 26px;border-radius:2px;font-family:'Jost',sans-serif;font-size:13px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;cursor:pointer;display:inline-block;text-decoration:none}
@media(max-width:768px){
  html,body{overflow-x:hidden}
  .hero{grid-template-columns:1fr}
  .hero-img{display:none}
  .service-grid,.cards{grid-template-columns:1fr}
  .wedding-band{grid-template-columns:1fr;padding:2rem 1.25rem}
  .wedding-band>svg{display:none}
  .wedding-features{grid-template-columns:1fr 1fr}
  .gallery-strip{grid-template-columns:1fr 1fr}
  *{max-width:100%}
}
</style>`;

if (!html.includes(SEARCH)) {
  console.error('MISS — anchor not found, index.html NOT written.');
  process.exit(1);
}

html = html.replace(SEARCH, REPLACE);
fs.writeFileSync(filePath, html, 'utf8');
console.log('index.html: mobile media query added.');
