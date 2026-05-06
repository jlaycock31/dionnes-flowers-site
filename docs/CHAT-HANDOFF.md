# Helen's House — Claude Chat Handoff

> **How to use this file:**
> - In **Claude Code (CLI/desktop):** `cd` to the project folder, run `claude`, then say "Read docs/CHAT-HANDOFF.md and pick up where we left off"
> - In **Claude Chat (web):** Upload this file + the specific HTML file you're working on, then describe what you want to change

---

## Project identity

| Field | Value |
|---|---|
| Business name | Helen's House |
| Owner | Dionne (Helen) Laycock |
| Built by | Jack Laycock (jack.laycock@nucor.com) |
| Live URL | https://helenshouse.netlify.app |
| Admin URL | https://helenshouse.netlify.app/admin.html |
| Admin password | coco@202west |
| GitHub repo | https://github.com/jlaycock31/dionnes-flowers-site |
| Owner email | dclaycock@yahoo.com |
| Facebook | https://facebook.com/dionne.laycock |
| Instagram | https://www.instagram.com/laycockdi |
| Location | Augusta, Kentucky |

---

## What this project is

Helen's House is a **6-page static flower business website** with a **full browser-based admin CMS** for Helen Laycock's small flower business in Augusta, Kentucky. Helen grows dahlias, zinnias, peonies, and seasonal garden flowers and sells them locally as cut bouquets, and does floral work for weddings and events.

Helen is non-technical — she manages everything through admin.html on her phone. The admin reads and writes JSON data files on GitHub via the GitHub Contents API, which triggers Netlify to auto-deploy changes within 60 seconds.

---

## Complete tech stack

- **All pages:** Pure HTML + CSS + vanilla JavaScript — no frameworks, no build step
- **Data persistence:** JSON files in the GitHub repo (shop-data.json, gallery-data.json)
- **Admin CMS:** Single-file admin.html — reads/writes JSON via GitHub Contents API
- **Photos:** JPEG files stored in GitHub, served via raw.githubusercontent.com
- **Hosting:** Netlify — auto-deploys on push to main
- **Fonts:** Google Fonts — Playfair Display (headings) + Jost (body)
- **Dev tooling:** Node.js scripts for file edits, npx serve for local preview

---

## Complete file structure

```
moms-flower-site/
├── index.html          Home page — hero SVG + 4-photo strip + services
├── about.html          About — two side-by-side hero photos + Helen's story
├── gallery.html        Gallery — 4-folder tab bar, reads gallery-data.json
├── gallery_full.html   Full-width lightbox gallery
├── weddings.html       Weddings & events — services, process, inquiry CTA
├── contact.html        Contact — Instagram / Facebook / Email method picker
├── shop.html           Shop — reads shop-data.json, Available + Coming Soon
├── admin.html          Admin CMS — 112 KB, password-protected, NOT in nav
├── shop-data.json      Shop listings (available[], coming_soon[], archived[])
├── gallery-data.json   Gallery photos (folders[], featured[4])
├── photos/             Product/listing photos (referenced in shop-data.json)
├── photos/gallery/     Gallery photos (25 photos, referenced in gallery-data.json)
├── photos/weddings/    Wedding photos
├── css/shared.css      Mobile nav toggle CSS (hamburger + breakpoints)
├── css/styles.css      Additional shared styles
├── js/nav.js           Mobile hamburger JS + active link highlight
├── docs/               This documentation folder
└── [many fix-*.js]     One-off Node.js edit scripts from development (safe to ignore)
```

---

## Complete design system

### Colors

| Token | Hex | Usage |
|---|---|---|
| Background | `#fdf6ee` | Page/body background |
| Hero bg | `#f0e8d8` | Hero sections, card bg, photo placeholders |
| Terracotta (primary) | `#b05a3a` | Primary buttons, active states, accents |
| Terracotta dark | `#9a4a2a` | Primary button hover |
| Espresso | `#2c1e14` | Site header bg, heading text |
| Copper | `#d4956a` | Logo italic, decorative accents |
| Body text | `#7a5a3a` | Paragraph text, labels |
| Muted text | `#9a7a5a` | Secondary text, captions |
| Border | `#e8ddd0` | Card/input borders, dividers |
| Green | `#5a7a4a` | Success states, logo italic, coming-soon |
| Error red | `#c04030` | Delete buttons, errors |
| SVG peach | `#e09068` | Dahlia SVG petals (primary) |
| SVG gold | `#e8c060` | Dahlia SVG petals (secondary) |
| SVG blush | `#e0a0be` | Dahlia SVG petals (tertiary) |
| SVG green | `#a0c878` | Dahlia SVG leaves |

### Typography

- **Headings:** Playfair Display, 400/500 weight. Italic for logo emphasis (Helen's *House*)
- **Body:** Jost, 300/400/500 weight
- **Section labels:** 11px, weight 500, letter-spacing 0.14em, uppercase, color #9a7a5a

### Breakpoints

- **680px** — nav hamburger collapses
- **768px** — grids go to 1 column, buttons go full width
- **1024px** — critical for iPhone Pro Max — hero grid adjusts here

---

## Admin app architecture

### Password

Stored as plain string near top of JS in admin.html:
```javascript
var PASSWORD = 'coco@202west';
```

### State object

```javascript
var S = {
  data: { available: [], coming_soon: [], archived: [] },
  mainTab: 'shop',
  gallery: null,
  gallerySha: null,
  galleryFolder: 'all',
  galleryDirty: false,
  galNewPhoto: null,
  cfg: { token: '', username: '', repo: '', branch: 'main' },
  tab: 'available',
  editCtx: null,         // { kind, index, newPhoto, galleryPhoto }
  newPhoto: null,        // { base64, dataUrl, filename, bytes }
  newGalleryPhoto: null, // gallery filename path (no re-upload needed)
  listType: 'available'
};
```

### GitHub settings (stored in localStorage as 'df_cfg')

```json
{ "token": "ghp_...", "username": "jlaycock31", "repo": "dionnes-flowers-site", "branch": "main" }
```

### isPublishing flag

`var isPublishing = false;` — set to true before any GitHub operation, false in finally block. Prevents double-submits.

### SHA handling

Every write to GitHub requires the current file SHA:
1. `ghGet(path)` returns `{ content, sha }`
2. Always GET immediately before PUT — use `cache: 'no-store'` to avoid stale SHAs
3. Pass `sha` in the PUT body

### compressImage() summary

Max 1200px on longest side, JPEG at 0.65 quality. If still over 300 KB, second pass at 0.5 quality. Returns `{ base64, dataUrl, filename, bytes }`.

### Photo picker (added May 2025)

When clicking the photo area in any edit form or the Add New form, a modal appears with two options:
1. **📷 Upload New Photo** — triggers `<input type="file">`, compresses, uploads to photos/ on save
2. **🌸 Choose from Gallery** — fetches gallery-data.json fresh, shows 4-column thumbnail grid with folder filter pills. Selecting a photo sets the existing path directly (no re-upload).

Context tracked via `pickerCtx` ('edit' | 'add').

### Featured photos

`featSelected` array of 4 filenames, saved to `gallery-data.json .featured`. Rendered on index.html as a 4-photo strip.

---

## Data file formats

### shop-data.json

```json
{
  "available": [{ "name": "...", "price": "$45", "quantity": 3, "description": "...", "image": "photos/x.jpg", "sold_out": false }],
  "coming_soon": [{ "name": "...", "ready_date": "Ready around July 4", "description": "...", "image": "photos/x.jpg" }],
  "archived": []
}
```

### gallery-data.json

```json
{
  "folders": [{ "id": "arrangements", "name": "Arrangements", "photos": [{ "id": "photo_001", "filename": "photos/gallery/x.jpg", "description": "...", "order": 1 }] }],
  "featured": ["photos/gallery/a.jpg", "photos/gallery/b.jpg", "photos/gallery/c.jpg", "photos/gallery/d.jpg"]
}
```

---

## All known issues and solutions

| Issue | Cause | Fix |
|---|---|---|
| PowerShell truncates files at 893 bytes | Set-Content behavior | Always use Node.js fs.writeFileSync |
| SHA 409 Conflict on push | Stale SHA from browser cache | GET immediately before PUT, use cache: 'no-store' |
| Netlify bandwidth from base64 images | Early dev embedded photos as data URIs | All photos stored as files, served via raw.githubusercontent.com |
| Duplicate `<script>` tags cause JS errors | Copy-paste error during refactoring | Only one `<script>` block at bottom of body |
| iPhone Pro Max layout broken | 768px breakpoint not wide enough | Added 1024px breakpoint for hero grid |
| Gallery count off after move/delete | State not refreshed after operation | Always call renderGalleryFolderBar() + renderGalleryGrid() after changes |

---

## Deployment workflow

```
edit files locally
  → git add + git commit + git push origin main
    → GitHub receives push
      → Netlify webhook fires
        → Netlify publishes root folder as static site
          → live in ~60 seconds at helenshouse.netlify.app
```

Admin changes flow:
```
Helen edits in admin.html
  → admin.html PUT to GitHub API
    → GitHub stores new JSON / photo file
      → Netlify redeploys automatically
        → site updated in ~60 seconds
```

---

## Changelog summary

| Date | What was built |
|---|---|
| 2025-04-30 | Initial 5-page site, real photos, botanical SVG illustrations, terracotta colors |
| 2025-04-30 | Mobile responsive fixes, shop page, admin CMS, GitHub API integration |
| 2025-04-30 | Gallery management, archive system, two-level nav, contact picker |
| 2025-04-30 | Auto sold-out, restore stock, featured photos, image compression |
| 2025-04-30 | gallery-data.json as source of truth, about hero redesign, dedup cleanup |
| 2025-04-30 | Business rename to Helen's House |
| 2025-05-05 | Photo picker modal (gallery + upload) in all edit/add forms |
| 2025-05-05 | Comprehensive docs/ folder created |

---

## How to continue in Claude Code

```bash
cd "C:/Users/jack.laycock/OneDrive - Nucor/Documents/Mom/moms-flower-site"
claude
```

Then say: "Read docs/CHAT-HANDOFF.md and pick up where we left off."

**Rules for this project:**
- Always use **Node.js** for file edits — never PowerShell Set-Content (truncates at 893 bytes)
- After any change: `git add <file> && git commit -m "..." && git push origin main`
- If push is rejected: `git pull --rebase origin main` first, then push again
- Verify push succeeded by looking for `main -> main` in the output

## How to continue in Claude Chat (web)

1. Upload **this file** (CHAT-HANDOFF.md)
2. Also upload the specific file you're working on (e.g. admin.html, index.html)
3. Describe what you want to change

For large changes to admin.html: the file is 112 KB — upload it directly. Claude can read and edit it.
