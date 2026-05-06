# Site Structure

## Pages

| File | URL | Description |
|---|---|---|
| index.html | / | Home page — hero with botanical dahlia SVG, 4-photo gallery strip (from gallery-data.json featured array), services overview, shop CTA |
| about.html | /about.html | About page — two side-by-side hero photos (caramel dahlias + garden snapdragon mix), Helen's story, values |
| gallery.html | /gallery.html | Gallery page — 4-folder tab bar (Arrangements / Fresh Cuts / Weddings / Seasonal), reads gallery-data.json, links to gallery_full.html |
| gallery_full.html | /gallery_full.html | Full-width lightbox gallery — shows all photos in a grid, opens each in an overlay |
| weddings.html | /weddings.html | Weddings & events page — services, process steps, varieties grid, inquiry CTA |
| contact.html | /contact.html | Contact page — method picker (Instagram DM / Facebook Messenger / Email), phone number |
| shop.html | /shop.html | Shop page — reads shop-data.json, renders Available Now + Coming Soon sections |
| admin.html | /admin.html | Admin CMS — password-protected, never linked from site navigation, access by URL only |

## Data files

| File | Description |
|---|---|
| shop-data.json | All shop listings — available[], coming_soon[], archived[] arrays. Read by shop.html and managed by admin.html |
| gallery-data.json | All gallery photos — folders[] array (each with id, name, photos[]) and featured[] array (4 filenames for home page strip). Read by gallery.html, gallery_full.html, index.html, and admin.html |

## Folders

| Folder | Description |
|---|---|
| photos/ | Product/listing photos referenced in shop-data.json (e.g. photos/dahlia-bouquet.jpg) |
| photos/gallery/ | Gallery photos referenced in gallery-data.json (e.g. photos/gallery/spring-garden-arrangement.jpg) |
| photos/weddings/ | Wedding photos embedded directly in weddings.html as base64 or referenced by path |
| css/ | Shared stylesheet (shared.css for mobile nav) and page styles (styles.css) |
| js/ | Shared JavaScript (nav.js — mobile hamburger toggle and active link highlight) |
| docs/ | This documentation folder |

## Navigation structure

Every public page shares the same nav bar:

```
Helen's House  [Home]  [About]  [Gallery]  [Weddings]  [Shop]  [Contact]
```

- Logo text links to index.html
- Mobile: hamburger button (≡) toggles the links into a vertical dropdown
- Active page link is highlighted (set by js/nav.js based on current URL)
- admin.html is intentionally excluded from the nav — access by direct URL only

## How pages connect to data

```
index.html        ──reads──▶  gallery-data.json (.featured[])  → 4-photo strip
shop.html         ──reads──▶  shop-data.json (.available, .coming_soon)
gallery.html      ──reads──▶  gallery-data.json (.folders[])
gallery_full.html ──reads──▶  gallery-data.json (.folders[])

admin.html        ──reads/writes──▶  shop-data.json       (GitHub Contents API)
admin.html        ──reads/writes──▶  gallery-data.json    (GitHub Contents API)
admin.html        ──writes──▶        photos/              (GitHub Contents API)
admin.html        ──writes──▶        photos/gallery/      (GitHub Contents API)
```

## Shared assets loaded by all pages

- Google Fonts: Playfair Display (400, 400i, 500) + Jost (300, 400, 500)
- css/shared.css — mobile nav toggle styles
- js/nav.js — hamburger behaviour and active link logic
