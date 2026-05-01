const fs   = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'about.html');
let html = fs.readFileSync(filePath, 'utf8');
let allOk = true;

function patch(label, search, replace) {
  if (!html.includes(search)) { console.error('MISS [' + label + ']'); allOk = false; return; }
  html = html.replace(search, replace);
  console.log('OK   [' + label + ']');
}

// 1. Add .about-portrait grid CSS before the existing img rule
patch('portrait grid CSS',
  `.about-portrait img{width:100%;height:100%;object-fit:cover;display:block;min-height:360px}`,
  `.about-portrait{display:grid;grid-template-columns:1fr 1fr;gap:0}
.about-portrait img{width:100%;height:100%;object-fit:cover;display:block;min-height:360px}`
);

// 2. Replace single hero img with two side-by-side images
patch('portrait two images',
  `<div class="about-portrait"><img src="photos/about-hero.jpg" alt="Wildflower bouquet from the garden"></div>`,
  `<div class="about-portrait"><img src="photos/gallery/caramel-dahlia-close-up.jpg" alt="Caramel dahlias from the garden"><img src="photos/gallery/garden-snapdragon-mix.jpg" alt="Garden snapdragon mix"></div>`
);

// 3. Add mobile overrides to the existing @media block
patch('portrait mobile CSS',
  `@media (max-width: 768px) {
  .season-grid {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
  }
}`,
  `@media (max-width: 768px) {
  .season-grid {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
  }
  .about-portrait {
    grid-template-columns: 1fr;
  }
  .about-portrait img {
    min-height: 250px;
  }
}`
);

if (allOk) {
  fs.writeFileSync(filePath, html, 'utf8');
  console.log('\nabout.html patched successfully.');
} else {
  console.error('\nOne or more patches missed — about.html NOT written.');
  process.exit(1);
}
