'use strict';
const fs   = require('fs');
const path = require('path');

const ROOT = __dirname;
const DOCS = path.join(ROOT, 'docs');
if (!fs.existsSync(DOCS)) fs.mkdirSync(DOCS);

// ─── helpers ────────────────────────────────────────────────────────────────
function write(filename, content) {
  const fp = path.join(DOCS, filename);
  fs.writeFileSync(fp, content, 'utf8');
  const kb = (fs.statSync(fp).size / 1024).toFixed(1);
  console.log(`  ✓  ${filename}  (${kb} KB)`);
}

function readSrc(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

// ═══════════════════════════════════════════════════════════════════════════
// TASK 1 — README.md
// ═══════════════════════════════════════════════════════════════════════════
write('README.md', `# Helen's House — Project Documentation

**A flower business website and admin CMS for Helen Laycock in Augusta, Kentucky.**

| | |
|---|---|
| **Live site** | https://helenshouse.netlify.app |
| **Admin panel** | https://helenshouse.netlify.app/admin.html |
| **GitHub repo** | https://github.com/jlaycock31/dionnes-flowers-site |
| **Owner** | Dionne (Helen) Laycock — dclaycock@yahoo.com |
| **Built by** | Jack Laycock |

## What this is

Helen's House is a 6-page static website for Helen Laycock's small flower business in Augusta, Kentucky. Helen grows dahlias, zinnias, peonies, and seasonal garden flowers and sells them locally as cut bouquets and arrangements, and provides floral work for weddings and events.

The site includes a full admin CMS (admin.html) that lets Helen manage her shop listings, gallery photos, and home page featured images — entirely through the browser, with no server or technical knowledge required. Changes push directly to GitHub via the GitHub Contents API and go live on Netlify within 60 seconds.

## Tech stack

- **Pages:** Pure HTML/CSS/JS — no frameworks, no build step
- **Data:** JSON files (shop-data.json, gallery-data.json) stored in the GitHub repo
- **Admin CMS:** Single-file admin.html — reads/writes JSON via GitHub Contents API
- **Images:** Compressed JPEG, stored in GitHub (photos/ folder)
- **Hosting:** Netlify — auto-deploys on every GitHub push
- **Fonts:** Google Fonts (Playfair Display + Jost)

## Documentation index

| File | What it covers |
|---|---|
| [SITE-STRUCTURE.md](SITE-STRUCTURE.md) | Every file in the project with descriptions and how pages link together |
| [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) | Colors, typography, button styles, breakpoints, SVG illustration details |
| [ADMIN-GUIDE.md](ADMIN-GUIDE.md) | Plain-English guide for Helen — how to use every feature of the admin |
| [DEVELOPER-GUIDE.md](DEVELOPER-GUIDE.md) | Technical reference — data formats, API flow, known issues, git workflow |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Netlify setup, auto-deploy, custom domains, bandwidth |
| [CONTENT-GUIDE.md](CONTENT-GUIDE.md) | All 25 gallery photos, photo tips, bouquet description writing guide |
| [CHANGELOG.md](CHANGELOG.md) | Chronological log of everything built |
| [CHAT-HANDOFF.md](CHAT-HANDOFF.md) | **Upload this to a new Claude chat to instantly resume the project** |
| [CODE-SNAPSHOT.md](CODE-SNAPSHOT.md) | Full source of admin.html, shop-data.json, gallery-data.json, shared CSS and JS |
`);

// ═══════════════════════════════════════════════════════════════════════════
// TASK 2 — SITE-STRUCTURE.md
// ═══════════════════════════════════════════════════════════════════════════
write('SITE-STRUCTURE.md', `# Site Structure

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

\`\`\`
Helen's House  [Home]  [About]  [Gallery]  [Weddings]  [Shop]  [Contact]
\`\`\`

- Logo text links to index.html
- Mobile: hamburger button (≡) toggles the links into a vertical dropdown
- Active page link is highlighted (set by js/nav.js based on current URL)
- admin.html is intentionally excluded from the nav — access by direct URL only

## How pages connect to data

\`\`\`
index.html        ──reads──▶  gallery-data.json (.featured[])  → 4-photo strip
shop.html         ──reads──▶  shop-data.json (.available, .coming_soon)
gallery.html      ──reads──▶  gallery-data.json (.folders[])
gallery_full.html ──reads──▶  gallery-data.json (.folders[])

admin.html        ──reads/writes──▶  shop-data.json       (GitHub Contents API)
admin.html        ──reads/writes──▶  gallery-data.json    (GitHub Contents API)
admin.html        ──writes──▶        photos/              (GitHub Contents API)
admin.html        ──writes──▶        photos/gallery/      (GitHub Contents API)
\`\`\`

## Shared assets loaded by all pages

- Google Fonts: Playfair Display (400, 400i, 500) + Jost (300, 400, 500)
- css/shared.css — mobile nav toggle styles
- js/nav.js — hamburger behaviour and active link logic
`);

// ═══════════════════════════════════════════════════════════════════════════
// TASK 3 — DESIGN-SYSTEM.md
// ═══════════════════════════════════════════════════════════════════════════
write('DESIGN-SYSTEM.md', `# Design System

## Color palette

| Token | Hex | Usage |
|---|---|---|
| Background cream | \`#fdf6ee\` | Page background, body background |
| Hero / card bg | \`#f0e8d8\` | Hero sections, card backgrounds, photo placeholders |
| Primary / terracotta | \`#b05a3a\` | Primary buttons, active states, border accents, admin CTAs |
| Primary dark | \`#9a4a2a\` | Primary button hover |
| Espresso / dark | \`#2c1e14\` | Site header background, body text headings |
| Copper accent | \`#d4956a\` | Logo italic text, decorative accents |
| Body text | \`#7a5a3a\` | Paragraph text, form labels |
| Muted text | \`#9a7a5a\` | Secondary text, captions, sub-labels |
| Border | \`#e8ddd0\` | Card borders, input borders, dividers |
| Light border | \`#d4c4b0\` | Photo zone dashed borders |
| Green accent | \`#5a7a4a\` | Success states, coming-soon badge, italic logo text |
| Light green | \`#eef3e8\` | Success backgrounds |
| Error red | \`#c04030\` | Delete buttons, error states |
| SVG petal peach | \`#e09068\` | Botanical dahlia SVG petals (primary) |
| SVG petal gold | \`#e8c060\` | Botanical SVG petals (secondary) |
| SVG petal blush | \`#e0a0be\` | Botanical SVG petals (tertiary) |
| SVG leaf green | \`#a0c878\` | Botanical SVG leaves |

## Typography

### Headings — Playfair Display
- **Font:** Playfair Display, serif
- **Weights used:** 400 (regular), 500 (medium)
- **Italic:** used for brand name emphasis (e.g. Helen's *House*)
- **Usage:** Page titles, section headings, overlay titles, card names, logo

### Body — Jost
- **Font:** Jost, sans-serif
- **Weights used:** 300 (light body text), 400 (default), 500 (labels, buttons)
- **Usage:** Body text, descriptions, buttons, nav links, form inputs

### Section labels
\`\`\`css
font-size: 11px;
font-weight: 500;
letter-spacing: 0.14em;
text-transform: uppercase;
color: #9a7a5a;
\`\`\`

### Price display
\`\`\`css
font-size: 15px;
font-weight: 500;
color: #b05a3a;
\`\`\`

## Mobile breakpoints

| Breakpoint | Width | What changes |
|---|---|---|
| Nav hamburger | 680px | Nav links collapse into hamburger toggle |
| Mobile layout | 768px | Grids collapse to single column, buttons go full width |
| Tablet / large mobile | 1024px | Hero grid adjusts for medium screens (iPhone Pro Max etc.) |

> **Note:** 1024px is the critical breakpoint for iPhone layout — not 768px. This was a known fix applied during development.

## Button styles

| Class | Background | Text | Usage |
|---|---|---|---|
| \`.btn-primary\` | \`#b05a3a\` | \`#e8f0e0\` | Main CTAs — "Add to Cart", "Publish", etc. |
| \`.btn-outline\` | transparent | \`#b05a3a\` | Secondary actions — Cancel, secondary nav |
| \`.btn-ghost\` | transparent | \`#9a7a5a\` | Tertiary — Sign Out, cancel-style links |
| \`.btn-warm\` | \`#f0e8d8\` | \`#7a5a3a\` | Soft action buttons |
| \`.btn-danger\` / \`.btn-delete\` | \`#c04030\` | \`#fff\` | Destructive actions |
| \`.btn-edit\` | \`#f0e8d8\` | \`#7a5a3a\` | Edit card action |
| \`.btn-archive\` | \`#f0ebe3\` | \`#7a6a58\` | Archive action |
| \`.btn-restore\` / \`.btn-mark-active\` | \`#eef3e8\` | \`#3a6a2a\` | Restore / activate green |
| \`.btn-soon\` | \`#e8f0da\` | \`#5a7a3a\` | "Move to Coming Soon" |
| \`.btn-activate\` | \`#3a6a2a\` | \`#e8f4e0\` | "Make It Live" green |

All buttons use:
- Font: Jost, 500 weight
- Letter spacing: 0.08em
- Text transform: uppercase
- Border radius: 3px (standard) or 4px (large CTA)

## Card styles

### Admin listing card (\`.admin-card\`)
- White background, 0.5px \`#e8ddd0\` border, border-radius 4px
- 4px left border in terracotta (\`#b05a3a\`) — turns muted brown (\`#c8b8a0\`) when sold out
- 100px wide thumbnail on left, text body on right
- Opacity 0.75 when sold out (\`.sold-out\` class)

### Gallery card (\`.gal-card\`)
- White background, 0.5px \`#e8ddd0\` border, border-radius 3px
- Square aspect-ratio photo on top
- Drag handle (⠇) in top-left corner
- Folder selector and delete button below photo

### Shop listing card (shop.html)
- White background with subtle shadow
- Badge for sold-out / coming-soon state
- Price in terracotta

## Form styles

\`\`\`css
.form-input {
  padding: 0.75rem 0.9rem;
  border: 1.5px solid #e8ddd0;
  border-radius: 3px;
  font-family: Jost;
  font-size: 15px;
  color: #2c1e14;
}
.form-input:focus { border-color: #b05a3a; outline: none; }
\`\`\`

Price inputs use a \`.price-wrap\` with a \`.price-sym\` (\`$\`) prefix on a \`#f5ede0\` background.

## Overlay / modal style

\`\`\`css
.overlay { background: rgba(44,30,20,0.55); }  /* dim backdrop */
.overlay-box { background: #fff; border-radius: 6px; max-width: 480px; }
.overlay-header { border-bottom: 0.5px solid #e8ddd0; }
.overlay-footer { background: #faf6f0; border-top: 0.5px solid #e8ddd0; }
\`\`\`

## SVG botanical illustrations

The site uses hand-coded inline SVG dahlia illustrations as decorative elements in the hero section of the home page and in listing cards.

**Petal shapes:** Elongated ellipses arranged radially around a center point, with slight rotation variation for a natural look.

**Color layers:**
1. Outer petals — \`#e09068\` (peach)
2. Mid petals — \`#e8c060\` (gold) at 0.85 opacity
3. Inner petals — \`#e0a0be\` (blush) at 0.75 opacity
4. Leaves — \`#a0c878\` (green)
5. Center — \`#b05a3a\` (terracotta) circle

**Implementation:** Inline \`<svg>\` elements inside the HTML, sized responsively with CSS (typically 280–400px on desktop, scaling down on mobile).
`);

// ═══════════════════════════════════════════════════════════════════════════
// TASK 4 — ADMIN-GUIDE.md
// ═══════════════════════════════════════════════════════════════════════════
write('ADMIN-GUIDE.md', `# Admin Guide for Helen

This is your plain-English guide to managing your website. You don't need any technical knowledge — just follow the steps below.

---

## How to get to the admin page

1. Open any web browser (Chrome, Safari, Edge — anything works)
2. Go to: **https://helenshouse.netlify.app/admin.html**
3. Type the password: **coco@202west**
4. Tap **Sign In**

That's it — you're in!

> **Tip:** Bookmark this page on your phone so you can get to it quickly.

---

## The Shop tab — managing your bouquets

When you sign in, you'll land on the **Shop** tab. You'll see four sub-tabs across the top:
- **Current Listings** — bouquets available to buy right now
- **Coming Soon** — things you're growing that aren't ready yet
- **Archive** — old listings you've saved for reference
- **+ Add New** — add a brand new bouquet

### Adding a new bouquet

1. Tap **+ Add New** at the top
2. Tap the big photo box to pick a photo:
   - **📷 Upload New Photo** — choose a photo from your phone's camera roll
   - **🌸 Choose from Gallery** — pick a photo you've already uploaded to your gallery
3. Type a **Bouquet Name** (e.g. "Summer Dahlia Mix")
4. Choose whether it's **Available Now** or **Coming Soon**
   - Available Now: enter the **price** and **how many you have**
   - Coming Soon: enter an **estimated ready date** (e.g. "Ready around July 4")
5. Write a **Description** — a sentence or two about what's in the bouquet
6. Tap **🌸 Publish to Website**
7. Wait about 10 seconds — you'll see a green "Website updated!" message

Your bouquet is now live on the website!

### Editing a bouquet

1. Find the bouquet on the **Current Listings** or **Coming Soon** tab
2. Tap the **Edit** button
3. Change whatever you need — name, price, quantity, description, or photo
4. Tap **Save Changes**

### Marking something as Sold Out

When you've sold all of a bouquet:

1. Find it on **Current Listings**
2. Tap **Mark Sold Out**
3. It will still show on the website but with a "Sold Out" badge

### Restoring stock when you have more flowers

1. Find the sold-out bouquet on **Current Listings**
2. Tap **Restore Stock**
3. Enter how many you have now
4. Tap **Mark Available ✓**

### Moving a bouquet to Coming Soon

If something isn't ready yet:

1. Find it on **Current Listings**
2. Tap **Move to Coming Soon**
3. Enter the ready date (e.g. "Ready around June 15")
4. Tap **Move It**

### Moving Coming Soon to Available Now

When your flowers are ready:

1. Find the bouquet on **Coming Soon**
2. Tap **Mark as Available Now**
3. Enter the price and quantity
4. Tap **Make It Live ✓**

### Archiving old listings

Archiving hides a bouquet from your shop without deleting it. Good for seasonal items you'll bring back later.

1. Tap the **Archive** button on any listing
2. Confirm by tapping **Yes, Archive It**
3. It moves to your **Archive** tab

### Restoring from Archive

1. Go to the **Archive** tab
2. Tap **Make Available Now** to put it back in your shop, or **Move to Coming Soon** if it's not quite ready

### Removing a listing completely

If you want to delete a listing for good:

1. Tap the **Remove** button
2. Confirm by tapping **Yes, Remove It**

> This permanently removes it from the website. You can always add it again later with + Add New.

---

## The Gallery tab — managing your photo gallery

Tap **Gallery** in the top bar to manage your photo collection.

### Adding a photo to the gallery

1. Tap **+ Add Photo** (top right)
2. Choose your photo (it will be automatically resized — no need to resize it yourself!)
3. Pick which **Folder** it belongs in:
   - **Arrangements** — finished bouquets and table pieces
   - **Fresh Cuts** — hand-tied bunches and fresh cut flowers
   - **Weddings** — wedding and event work
   - **Seasonal** — seasonal and holiday arrangements
4. Add a short **Description** (e.g. "Pink dahlias in bud vases")
5. Tap **Add to Gallery ✓**

### Reordering photos

You can drag photos into any order within a folder:

1. Select a folder from the pills at the top (e.g. "Arrangements")
2. Press and hold a photo card — you'll see it lift slightly
3. Drag it to where you want it
4. A **Save Order** button will appear at the top — tap it to make the new order permanent

### Moving a photo to a different folder

1. Find the photo
2. Use the small dropdown below the photo to pick a new folder
3. It moves automatically

### Deleting a photo from the gallery

1. Find the photo
2. Tap the **Del** button below it
3. Confirm by tapping **Yes, Remove It**

> The photo file itself stays on GitHub — only the listing in the gallery is removed.

### Setting the 4 featured photos on your home page

Your home page shows 4 featured photos in a strip near the top. You can choose which ones appear:

1. You'll see **4 slots** labeled Slot 1 through Slot 4 at the top of the Gallery tab
2. Tap **Change** under any slot
3. A picker will appear showing all your gallery photos
4. Tap the photo you want
5. After setting all 4, tap **Save Featured Photos**

---

## The Settings tab

> **Please don't change anything in Settings.** This tab connects the admin to GitHub and Netlify. If the settings get changed, the admin will stop working. Only Jack should touch this.

If anything ever seems broken, contact Jack before making changes in Settings.

---

## Troubleshooting

### "Something went wrong connecting to GitHub"
- Check your internet connection
- Wait a minute and try again
- If it keeps happening, contact Jack

### Changes aren't showing on the website
- Wait about 60 seconds — Netlify takes up to a minute to publish changes
- Try refreshing the page (pull down to refresh on phone)
- If it's been more than 5 minutes, contact Jack

### The photo I uploaded looks different / smaller
- This is normal! The admin automatically resizes and compresses photos to keep your site loading fast. The quality should still look great.

### I accidentally archived or removed something
- If you archived it: go to the **Archive** tab and restore it
- If you removed it: it's gone for good, but you can add it again with **+ Add New**

### I forgot the password
- The password is: **coco@202west**
- Contact Jack if you'd like to change it
`);

// ═══════════════════════════════════════════════════════════════════════════
// TASK 5 — DEVELOPER-GUIDE.md
// ═══════════════════════════════════════════════════════════════════════════
write('DEVELOPER-GUIDE.md', `# Developer Guide

Technical reference for working on the Helen's House project.

---

## Running locally

\`\`\`bash
cd moms-flower-site
npx serve .
\`\`\`

Then open http://localhost:3000. No build step, no install needed beyond \`npx\`.

The admin (admin.html) requires live GitHub credentials to work — it won't be able to read or write data when running locally unless you enter a valid token in Settings.

---

## Working with Claude Code

\`\`\`bash
cd "C:/Users/jack.laycock/OneDrive - Nucor/Documents/Mom/moms-flower-site"
claude
\`\`\`

**Critical rules:**
- Always use **Node.js** (write .js scripts and run with \`node script.js\`) for any file editing
- Never use PowerShell's \`Set-Content\` — it truncates files at 893 bytes
- Always run \`node create-docs.js\` style scripts from Bash, not PowerShell
- After edits, \`git add\`, \`git commit\`, \`git push origin main\`

---

## Git workflow

\`\`\`bash
git add <file>                    # stage specific file
git commit -m "Description"       # commit
git pull --rebase origin main     # if push is rejected (remote has new commits)
git push origin main              # push to GitHub → triggers Netlify deploy
\`\`\`

Netlify auto-deploys within ~60 seconds of a push to main.

---

## How GitHub connects to Netlify

Netlify is linked to the GitHub repo \`jlaycock31/dionnes-flowers-site\`. Every push to the \`main\` branch triggers an automatic build. Since this is a static site with no build command, Netlify just publishes the root folder as-is.

Netlify settings (in Netlify dashboard):
- **Build command:** (none)
- **Publish directory:** . (root)
- **Branch:** main

---

## How the admin GitHub API works

### Authentication

The admin stores a GitHub Personal Access Token in \`localStorage\` under the key \`df_cfg\`. It is never hard-coded in the source. The token is sent as a Bearer token in every API request header:

\`\`\`javascript
headers: { 'Authorization': 'token ' + S.cfg.token }
\`\`\`

### Reading a file (GET)

\`\`\`javascript
async function ghGet(path) {
  const url = 'https://api.github.com/repos/{user}/{repo}/contents/' + path
            + '?ref=main&cache_bust=' + Date.now();
  const r = await fetch(url, { headers: ghHead(), cache: 'no-store' });
  return r.json(); // returns { content: base64, sha: "abc123...", ... }
}
\`\`\`

The response \`.content\` field is base64-encoded. Decode it:
\`\`\`javascript
const json = decodeURIComponent(escape(atob(raw)));
\`\`\`

### Writing a file (PUT)

Every write requires the current file's **SHA**. Without it, GitHub returns 409 Conflict.

\`\`\`javascript
async function ghPut(path, textContent, sha, commitMessage) {
  const encoded = btoa(unescape(encodeURIComponent(textContent)));
  const body = { message: commitMessage, content: encoded, branch: 'main', sha: sha };
  await fetch(ghBase() + path, { method: 'PUT', headers: ghHead(), body: JSON.stringify(body) });
}
\`\`\`

### Push flow for shop-data.json

1. \`ghGet('shop-data.json')\` — fetches fresh SHA (always fresh — \`cache: 'no-store'\`)
2. Modify \`S.data\` in memory
3. \`ghPut('shop-data.json', JSON.stringify(S.data), sha, 'message')\`

### Push flow for binary photo files

\`\`\`javascript
async function ghPutBin(path, base64, sha, msg) {
  // base64 is already the raw base64 string (no data: prefix)
  const body = { message: msg, content: base64, branch: 'main' };
  if (sha) body.sha = sha; // only needed if file already exists
  await fetch(ghBase() + path, { method: 'PUT', headers: ghHead(), body: JSON.stringify(body) });
}
\`\`\`

---

## isPublishing flag

A global \`var isPublishing = false\` prevents double-submits. Every async operation that touches GitHub sets it to \`true\` at the start and \`false\` in the \`finally\` block. If already publishing, the function returns early.

---

## compressImage() — how it works

\`\`\`javascript
function compressImage(file, maxPx = 1200, quality = 0.65) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        // Scale down to fit within maxPx on longest side
        let w = img.width, h = img.height;
        if (w > maxPx || h > maxPx) {
          if (w >= h) { h = Math.round(h * maxPx / w); w = maxPx; }
          else        { w = Math.round(w * maxPx / h); h = maxPx; }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        let dataUrl = canvas.toDataURL('image/jpeg', quality);
        let bytes = (dataUrl.length - 'data:image/jpeg;base64,'.length) * 3 / 4;
        // Second pass at lower quality if still over 300 KB
        if (bytes > 300 * 1024) {
          dataUrl = canvas.toDataURL('image/jpeg', 0.5);
          bytes = (dataUrl.length - 22) * 3 / 4;
        }
        resolve({ base64: dataUrl.split(',')[1], dataUrl, filename, bytes });
      };
    };
    reader.readAsDataURL(file);
  });
}
\`\`\`

**Summary:** Max 1200px on longest side, JPEG at 0.65 quality. If result is still over 300 KB, re-encodes at 0.5 quality. Filename is sanitized (spaces → hyphens, special chars stripped, extension changed to .jpg).

---

## Photo picker architecture

The photo picker modal (added May 2025) replaces direct file-input clicks in edit and add-new forms. It offers:
1. **Upload New Photo** — triggers the hidden \`<input type="file">\`, runs through compressImage, uploads to \`photos/\` on save
2. **Choose from Gallery** — fetches gallery-data.json fresh, renders a 4-column thumbnail grid with folder filter pills, sets the existing photo path directly (no re-upload)

State tracking:
- \`S.editCtx.newPhoto\` — compressed upload object (for edit forms)
- \`S.editCtx.galleryPhoto\` — gallery filename path string (for edit forms)
- \`S.newPhoto\` / \`S.newGalleryPhoto\` — equivalent for the Add New form

If both are set, \`newPhoto\` takes precedence (but this shouldn't happen — picking one clears the other).

---

## shop-data.json format

\`\`\`json
{
  "available": [
    {
      "name": "Summer Dahlia Bouquet",
      "price": "$45",
      "quantity": 3,
      "description": "Fresh dahlias in warm summer colors...",
      "image": "photos/dahlia-bouquet.jpg",
      "sold_out": false
    }
  ],
  "coming_soon": [
    {
      "name": "Café au Lait Dahlias",
      "ready_date": "Ready around July 4",
      "description": "Our most-requested dahlia...",
      "image": "photos/cafe-au-lait-dahlias.jpg"
    }
  ],
  "archived": [
    {
      "name": "Spring Tulip Bundle",
      "price": "$32",
      "quantity": 0,
      "description": "...",
      "image": "photos/tulips.jpg",
      "sold_out": true
    }
  ]
}
\`\`\`

**Rules:**
- \`available[].quantity === 0\` → auto-set \`sold_out: true\` on load (normalizeData)
- \`price\` is always stored with \`$\` prefix (e.g. \`"$45"\`)
- \`image\` is the relative path from repo root (e.g. \`"photos/dahlia-bouquet.jpg"\`)
- \`archived\` array preserves all fields from when the item was active

---

## gallery-data.json format

\`\`\`json
{
  "folders": [
    {
      "id": "arrangements",
      "name": "Arrangements",
      "photos": [
        {
          "id": "photo_001",
          "filename": "photos/gallery/spring-garden-arrangement.jpg",
          "description": "Spring garden arrangement",
          "order": 1
        }
      ]
    }
  ],
  "featured": [
    "photos/gallery/spring-garden-arrangement.jpg",
    "photos/gallery/mixed-dahlia-bouquet.jpg",
    "photos/gallery/caramel-dahlia-close-up.jpg",
    "photos/gallery/autumn-dahlias-maple.jpg"
  ]
}
\`\`\`

**Rules:**
- \`folders[].id\` is the stable slug used for filtering (never change after creation)
- \`photos[].id\` format: \`"photo_"\` + Unix timestamp (e.g. \`"photo_1714512345678"\`)
- \`photos[].order\` is 1-based, re-indexed on drag-reorder
- \`featured\` is always exactly 4 filenames (home page strip, left to right)
- \`filename\` paths are relative to repo root

---

## Known issues and fixes

### PowerShell 893-byte file truncation
PowerShell's \`Set-Content\` truncates file output at 893 bytes when writing large strings in certain modes. **Fix:** Always write files using Node.js \`fs.writeFileSync()\`. Never use PowerShell for file content.

### SHA 409 Conflict on push
If you GET a file's SHA, then someone else pushes between your GET and PUT, you get a 409. **Fix:** Always \`ghGet()\` immediately before every \`ghPut()\` to get the freshest SHA. All fetch calls use \`cache: 'no-store'\` to prevent browser caching stale SHAs.

### Netlify bandwidth — base64 images
Early versions embedded photos as base64 data URIs directly in HTML files. These count against Netlify bandwidth on every page load and bloat the HTML file size. **Fix:** All photos are stored as files in \`photos/\` and \`photos/gallery/\` on GitHub, referenced by path. Raw URLs via \`https://raw.githubusercontent.com/...\` serve the actual files.

### Duplicate script tags
At one point during refactoring, admin.html had duplicate \`<script>\` blocks causing JS errors. **Fix:** Only one \`<script>\` block at the bottom of the body.

### Mobile breakpoint — iPhone Pro Max
The 768px breakpoint wasn't catching iPhone Pro Max (430px wide, but 896px in landscape). **Fix:** Added a 1024px breakpoint for the hero grid and other layout-switching elements.

### Mobile nav hamburger
The nav links were collapsing behind other elements on mobile. **Fix:** shared.css and nav.js handle toggle; nav wrapper uses \`position: relative\` with high enough z-index.

---

## Generating a new GitHub token

1. Go to github.com → Profile photo → Settings
2. Scroll to Developer Settings → Personal Access Tokens → Tokens (classic)
3. Click "Generate new token (classic)"
4. Name: "Helen's House Admin"
5. Check only the **repo** scope
6. Click Generate — copy the token immediately (shown only once)
7. In the admin, go to Settings tab and paste the new token, then Save Settings

---

## Updating the admin password

The password is stored as a plain string near the top of the JS in admin.html:

\`\`\`javascript
var PASSWORD = 'coco@202west';
\`\`\`

To change it: open admin.html, search for \`coco@202west\`, replace with the new password, save, commit and push.
`);

// ═══════════════════════════════════════════════════════════════════════════
// TASK 6 — DEPLOYMENT.md
// ═══════════════════════════════════════════════════════════════════════════
write('DEPLOYMENT.md', `# Deployment

## Current URLs

| | URL |
|---|---|
| Live site | https://helenshouse.netlify.app |
| Admin panel | https://helenshouse.netlify.app/admin.html |
| GitHub repo | https://github.com/jlaycock31/dionnes-flowers-site |

---

## How Netlify connects to GitHub

The Netlify site is linked directly to the \`jlaycock31/dionnes-flowers-site\` GitHub repository on the \`main\` branch. No build command or framework configuration is needed — Netlify publishes the root folder as a static site.

Netlify site settings:
- **Build command:** (empty — no build step)
- **Publish directory:** \`.\` (root of the repo)
- **Branch:** \`main\`

---

## How auto-deploy works

Every \`git push origin main\` triggers the following sequence automatically:

1. GitHub receives the push and notifies Netlify via webhook
2. Netlify pulls the latest commit
3. Netlify publishes the static files (no build needed)
4. Changes are live within **~60 seconds**

The admin uses the same GitHub push mechanism — when Helen saves changes in the admin, the admin.html JavaScript PUTs directly to the GitHub API, which triggers a Netlify redeploy automatically.

---

## Manually triggering a redeploy

If you need to force Netlify to redeploy without any code changes:

**Option 1 — from the Netlify dashboard:**
1. Go to app.netlify.com → Sites → helenshouse
2. Click "Deploys" → "Trigger deploy" → "Deploy site"

**Option 2 — make an empty commit:**
\`\`\`bash
git commit --allow-empty -m "Trigger redeploy"
git push origin main
\`\`\`

---

## Bandwidth limits and image optimization

Netlify's free plan includes **100 GB bandwidth per month**. The Helen's House site is small and unlikely to come close to this limit, but some practices help keep bandwidth usage low:

- **No base64 images in HTML** — all photos are stored as files in \`photos/\` and served via raw.githubusercontent.com
- **Image compression** — the admin compresses every uploaded photo to ≤1200px at 0.65 JPEG quality (≈50–200 KB per image)
- **Lazy loading** — gallery images use \`loading="lazy"\` so they only download when scrolled into view

If bandwidth becomes an issue in future, consider:
- Moving images to Cloudflare R2 or similar free object storage
- Serving images through a CDN with automatic resizing (e.g. Cloudflare Images)

---

## Renaming the site

To change the Netlify subdomain (e.g. from helenshouse to helensflowers):

1. Go to app.netlify.com → Sites → helenshouse
2. Click "Domain settings" → "Options" → "Edit site name"
3. Type the new name and save
4. The old URL will redirect to the new one automatically

---

## Adding a custom domain

To use a domain like helenshouse.com:

1. Purchase the domain from any registrar (Namecheap, GoDaddy, Google Domains, etc.)
2. In Netlify: Site settings → Domain management → Add custom domain
3. Enter the domain name
4. In your domain registrar's DNS settings, add the CNAME or A records that Netlify shows you
5. Netlify automatically provisions an SSL certificate (HTTPS) via Let's Encrypt — usually ready within 24 hours

---

## Environment and secrets

There are no server-side environment variables — this is a purely static site. The only secret is the GitHub Personal Access Token, which is:
- Entered by the admin user in the Settings tab
- Stored in browser \`localStorage\` only
- Never committed to the repo or visible in the source code
`);

// ═══════════════════════════════════════════════════════════════════════════
// TASK 7 — CONTENT-GUIDE.md
// ═══════════════════════════════════════════════════════════════════════════
write('CONTENT-GUIDE.md', `# Content Guide

## All 25 gallery photos

### Arrangements (10 photos)

| Filename | Description | Folder |
|---|---|---|
| spring-garden-arrangement.jpg | Spring garden arrangement | Arrangements |
| mixed-dahlia-bouquet.jpg | Mixed dahlia bouquet | Arrangements |
| copper-dahlia-urn.jpg | Copper dahlia urn | Arrangements |
| terracotta-dahlia-bowl.jpg | Terracotta dahlia bowl | Arrangements |
| blush-dahlia-cluster.jpg | Blush dahlia cluster | Arrangements |
| caramel-dahlia-close-up.jpg | Caramel dahlias | Arrangements |
| dahlia-cosmos-hand-bouquet.jpg | Dahlia and cosmos hand bouquet | Arrangements |
| pink-dahlia-bud-vases.jpg | Pink dahlias in bud vases | Arrangements |
| spring-wildflower-pot.jpg | Spring wildflower pot | Arrangements |
| white-dahlia-vase.jpg | White dahlias in vase | Arrangements |

### Fresh Cuts (8 photos)

| Filename | Description | Folder |
|---|---|---|
| daffodils-hellebores.jpg | Daffodils and hellebores | Fresh Cuts |
| lavender-dahlia-hand-tie.jpg | Lavender dahlia hand tie | Fresh Cuts |
| peach-dahlia-sweet-pea.jpg | Peach dahlia and sweet pea | Fresh Cuts |
| dahlia-cosmos-hand-tie.jpg | Dahlia and cosmos hand tie | Fresh Cuts |
| garden-rose-delphinium.jpg | Garden rose and delphinium | Fresh Cuts |
| garden-snapdragon-mix.jpg | Garden snapdragon mix | Fresh Cuts |
| pink-snapdragons.jpg | Pink snapdragons | Fresh Cuts |
| wildflower-meadow-mix.jpg | Wildflower meadow mix | Fresh Cuts |

### Weddings (4 photos)

| Filename | Description | Folder |
|---|---|---|
| soft-white-wedding-florals.jpg | Soft white wedding florals | Weddings |
| autumn-ceremony-arch.jpg | Autumn ceremony arch | Weddings |
| wedding-pew-arrangement.jpg | Wedding pew arrangement | Weddings |
| mantel-installation.jpg | Mantel floral installation | Weddings |

### Seasonal (3 photos)

| Filename | Description | Folder |
|---|---|---|
| autumn-dahlias-maple.jpg | Autumn dahlias with maple | Seasonal |
| autumn-harvest-bouquet.jpg | Autumn harvest bouquet | Seasonal |
| summer-zinnia-dahlia.jpg | Summer zinnia and dahlia | Seasonal |

All photos live in: \`photos/gallery/\` in the GitHub repo.

---

## shop-data.json structure explained

The shop data file has three sections:

**available[]** — bouquets you have right now, ready to sell
- \`name\` — the bouquet name shown on the website
- \`price\` — always include the $ sign (e.g. "$45")
- \`quantity\` — how many you have. When this reaches 0, the listing auto-shows as "Sold Out"
- \`description\` — 1–3 sentences about the bouquet
- \`image\` — the photo file path (set automatically when you upload or pick from gallery)
- \`sold_out\` — true/false (set automatically — you don't need to edit this directly)

**coming_soon[]** — things you're growing but not ready yet
- \`name\`, \`description\`, \`image\` — same as above
- \`ready_date\` — a friendly sentence like "Ready around July 4"

**archived[]** — old listings saved for reference (same structure as available)

---

## Tips for writing good bouquet descriptions

Good descriptions help customers understand what they're buying and feel excited about it. Keep them short — 1 to 3 sentences.

**What to include:**
- What flowers are in it (be specific — "café au lait dahlias" is better than "dahlias")
- Colors (warm, soft, bright, muted, etc.)
- What it feels like or smells like
- What occasion it's great for, if relevant

**Examples of good descriptions:**

> Soft blush and white peonies paired with eucalyptus and fresh garden greenery. Fragrant and full — a timeless combination.

> A cheerful hand-tied bunch of coral, orange, and yellow zinnias. Long-lasting, bright, and grown right here on the property.

> Our most-requested dahlia — creamy tan petals with blush and copper edges. Absolutely stunning in arrangements and completely unique.

**Tips:**
- Use sensory words: fragrant, soft, bold, bright, airy, lush
- Mention what makes it special (grown on the property, seasonal, limited)
- Keep it conversational — write like you're describing it to a friend
- Don't start every listing with "A beautiful..." — vary your openings

---

## Photo guidelines

### What makes a great flower photo

- **Natural light** — photograph near a window or outside in open shade. Avoid direct harsh sunlight, which washes out colors.
- **Clean background** — a white wall, light wood surface, or simple fabric works great. Avoid busy or cluttered backgrounds.
- **Get close** — fill most of the frame with the flowers. You can always crop later.
- **Multiple angles** — try straight-on, slightly above, and side-on. Pick the most flattering.
- **Good focus** — tap the flowers on your phone screen to make sure they're sharp.

### Recommended settings

- **Upload from:** your phone camera (any modern smartphone is excellent)
- **Orientation:** portrait (vertical) or square both work well
- **The admin will automatically:** resize to max 1200px on the longest side, compress to JPEG at 65% quality

### What to avoid

- Blurry or out-of-focus photos
- Dark or indoor artificial lighting (orange/yellow tint from bulbs)
- Shadows falling directly on the flowers
- Too many props or distractions around the bouquet
- Very small thumbnails — always photograph the full bouquet
`);

// ═══════════════════════════════════════════════════════════════════════════
// TASK 8 — CHANGELOG.md
// ═══════════════════════════════════════════════════════════════════════════
write('CHANGELOG.md', `# Changelog

Chronological record of everything built for the Helen's House project.

---

## 2025-04-30

### Initial 5-page site design
- Created index.html, about.html, gallery.html, weddings.html, contact.html with placeholder content
- Established base HTML structure and navigation shared across all pages
- Added Google Fonts (Playfair Display + Jost)

### Real flower photos added
- Replaced all placeholder images with 25 real photos from Dionne's collection
- Photos organized into 4 gallery folders: Arrangements, Fresh Cuts, Weddings, Seasonal
- Photos compressed and stored in photos/gallery/

### Botanical SVG dahlia illustrations
- Added hand-coded inline SVG dahlia illustrations to the home page hero section
- Petals in peach (#e09068), gold (#e8c060), blush (#e0a0be) layers with green leaves (#a0c878)
- Used as decorative background element alongside hero photography

### Warm terracotta color scheme
- Applied full color palette across all pages
- Terracotta (#b05a3a) for primary actions and accents
- Espresso (#2c1e14) for dark sections and header
- Cream (#fdf6ee) background, copper (#d4956a) accent for logo italic

### Mobile responsive fixes
- Added hamburger navigation toggle (shared.css + js/nav.js)
- Applied 768px and 1024px breakpoints for grid layouts
- Fixed iPhone Pro Max layout with 1024px hero breakpoint

### Shop page created
- Built shop.html reading from shop-data.json
- Available Now section with price, quantity, sold-out badge
- Coming Soon section with ready date display

### Admin CMS built
- Created admin.html — single-file, password-protected admin application
- Tab-based UI: Current Listings / Coming Soon / + Add New
- Inline edit overlay for each listing
- File upload with image preview

### GitHub API integration
- Connected admin.html to GitHub Contents API
- GET/PUT for shop-data.json and gallery-data.json
- Binary PUT for photo uploads to photos/ folder
- SHA-based write conflict prevention

### GitHub/Netlify deployment configured
- Linked GitHub repo jlaycock31/dionnes-flowers-site to Netlify
- Auto-deploy on every push to main branch
- Site published at helenshouse.netlify.app

### Gallery management system
- Built Gallery tab in admin with full photo management
- Drag-to-reorder with touch support (mobile drag and drop)
- Folder assignment via dropdown
- Photo description editing inline

### Archive system
- Added Archive tab with full CRUD on archived listings
- Archive / Restore to Available / Move to Coming Soon / Delete Permanently
- Archived listings preserve all original fields

### Two-level admin navigation
- Added top-level tab bar: Shop / Gallery / ⚙ Settings
- Shop sub-tabs: Current Listings / Coming Soon / Archive / + Add New
- Gallery and Settings accessible from top bar

### Contact method picker
- Built contact.html with three contact method cards
- Instagram deep link (instagram.com/laycockdi)
- Facebook Messenger link (facebook.com/dionne.laycock)
- Email link (dclaycock@yahoo.com)

### Auto sold-out when quantity reaches 0
- normalizeData() runs on admin load
- Any available item with quantity === 0 is auto-marked sold_out: true
- Pushed to GitHub silently

### Restore Stock with quantity input
- Restore Stock overlay for sold-out available items
- Quantity input, validation, pushes to GitHub

### Featured photos control for home page gallery strip
- 4-slot featured photo picker in Gallery tab
- Saves to gallery-data.json featured[] array
- index.html reads featured[] to render home page photo strip

### Image compression system
- compressImage() function: max 1200px, 0.65 JPEG quality
- Second pass at 0.5 quality if result over 300 KB
- File size feedback shown to admin user (Great / Good / Large)

### gallery-data.json as single source of truth
- Migrated gallery management fully to gallery-data.json
- gallery.html, gallery_full.html, and index.html all read from gallery-data.json

### About page two-photo hero
- Replaced single hero with two side-by-side photos
- Left: caramel-dahlia-close-up.jpg, Right: garden-snapdragon-mix.jpg

### Duplicate gallery photo cleanup
- Deduplicated gallery from 33 photos to 25
- Removed duplicates that appeared in multiple folders

### Business rename
- Renamed from Dionne's Flowers → Hele's House → Helen's House
- Updated across all HTML pages, admin.html, and all nav bars

## 2025-05-05

### Photo picker in edit forms and Add New
- Replaced direct file-input triggers with a two-option photo picker modal
- Option 1: Choose from Gallery — shows all gallery photos in 4-column grid with folder filter
- Option 2: Upload from Device — same compression flow as before
- Applied to: Current Listings edit, Coming Soon edit, Archive edit (new Edit button on archive cards), Add New form
- Gallery-sourced photos use existing path directly (no re-upload)

### Comprehensive docs/ folder
- Created 9 documentation files covering all aspects of the project
- CHAT-HANDOFF.md designed for uploading to a new Claude session to resume the project instantly
`);

// ═══════════════════════════════════════════════════════════════════════════
// TASK 9 — CHAT-HANDOFF.md
// ═══════════════════════════════════════════════════════════════════════════
write('CHAT-HANDOFF.md', `# Helen's House — Claude Chat Handoff

> **How to use this file:**
> - In **Claude Code (CLI/desktop):** \`cd\` to the project folder, run \`claude\`, then say "Read docs/CHAT-HANDOFF.md and pick up where we left off"
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

\`\`\`
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
\`\`\`

---

## Complete design system

### Colors

| Token | Hex | Usage |
|---|---|---|
| Background | \`#fdf6ee\` | Page/body background |
| Hero bg | \`#f0e8d8\` | Hero sections, card bg, photo placeholders |
| Terracotta (primary) | \`#b05a3a\` | Primary buttons, active states, accents |
| Terracotta dark | \`#9a4a2a\` | Primary button hover |
| Espresso | \`#2c1e14\` | Site header bg, heading text |
| Copper | \`#d4956a\` | Logo italic, decorative accents |
| Body text | \`#7a5a3a\` | Paragraph text, labels |
| Muted text | \`#9a7a5a\` | Secondary text, captions |
| Border | \`#e8ddd0\` | Card/input borders, dividers |
| Green | \`#5a7a4a\` | Success states, logo italic, coming-soon |
| Error red | \`#c04030\` | Delete buttons, errors |
| SVG peach | \`#e09068\` | Dahlia SVG petals (primary) |
| SVG gold | \`#e8c060\` | Dahlia SVG petals (secondary) |
| SVG blush | \`#e0a0be\` | Dahlia SVG petals (tertiary) |
| SVG green | \`#a0c878\` | Dahlia SVG leaves |

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
\`\`\`javascript
var PASSWORD = 'coco@202west';
\`\`\`

### State object

\`\`\`javascript
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
\`\`\`

### GitHub settings (stored in localStorage as 'df_cfg')

\`\`\`json
{ "token": "ghp_...", "username": "jlaycock31", "repo": "dionnes-flowers-site", "branch": "main" }
\`\`\`

### isPublishing flag

\`var isPublishing = false;\` — set to true before any GitHub operation, false in finally block. Prevents double-submits.

### SHA handling

Every write to GitHub requires the current file SHA:
1. \`ghGet(path)\` returns \`{ content, sha }\`
2. Always GET immediately before PUT — use \`cache: 'no-store'\` to avoid stale SHAs
3. Pass \`sha\` in the PUT body

### compressImage() summary

Max 1200px on longest side, JPEG at 0.65 quality. If still over 300 KB, second pass at 0.5 quality. Returns \`{ base64, dataUrl, filename, bytes }\`.

### Photo picker (added May 2025)

When clicking the photo area in any edit form or the Add New form, a modal appears with two options:
1. **📷 Upload New Photo** — triggers \`<input type="file">\`, compresses, uploads to photos/ on save
2. **🌸 Choose from Gallery** — fetches gallery-data.json fresh, shows 4-column thumbnail grid with folder filter pills. Selecting a photo sets the existing path directly (no re-upload).

Context tracked via \`pickerCtx\` ('edit' | 'add').

### Featured photos

\`featSelected\` array of 4 filenames, saved to \`gallery-data.json .featured\`. Rendered on index.html as a 4-photo strip.

---

## Data file formats

### shop-data.json

\`\`\`json
{
  "available": [{ "name": "...", "price": "$45", "quantity": 3, "description": "...", "image": "photos/x.jpg", "sold_out": false }],
  "coming_soon": [{ "name": "...", "ready_date": "Ready around July 4", "description": "...", "image": "photos/x.jpg" }],
  "archived": []
}
\`\`\`

### gallery-data.json

\`\`\`json
{
  "folders": [{ "id": "arrangements", "name": "Arrangements", "photos": [{ "id": "photo_001", "filename": "photos/gallery/x.jpg", "description": "...", "order": 1 }] }],
  "featured": ["photos/gallery/a.jpg", "photos/gallery/b.jpg", "photos/gallery/c.jpg", "photos/gallery/d.jpg"]
}
\`\`\`

---

## All known issues and solutions

| Issue | Cause | Fix |
|---|---|---|
| PowerShell truncates files at 893 bytes | Set-Content behavior | Always use Node.js fs.writeFileSync |
| SHA 409 Conflict on push | Stale SHA from browser cache | GET immediately before PUT, use cache: 'no-store' |
| Netlify bandwidth from base64 images | Early dev embedded photos as data URIs | All photos stored as files, served via raw.githubusercontent.com |
| Duplicate \`<script>\` tags cause JS errors | Copy-paste error during refactoring | Only one \`<script>\` block at bottom of body |
| iPhone Pro Max layout broken | 768px breakpoint not wide enough | Added 1024px breakpoint for hero grid |
| Gallery count off after move/delete | State not refreshed after operation | Always call renderGalleryFolderBar() + renderGalleryGrid() after changes |

---

## Deployment workflow

\`\`\`
edit files locally
  → git add + git commit + git push origin main
    → GitHub receives push
      → Netlify webhook fires
        → Netlify publishes root folder as static site
          → live in ~60 seconds at helenshouse.netlify.app
\`\`\`

Admin changes flow:
\`\`\`
Helen edits in admin.html
  → admin.html PUT to GitHub API
    → GitHub stores new JSON / photo file
      → Netlify redeploys automatically
        → site updated in ~60 seconds
\`\`\`

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

\`\`\`bash
cd "C:/Users/jack.laycock/OneDrive - Nucor/Documents/Mom/moms-flower-site"
claude
\`\`\`

Then say: "Read docs/CHAT-HANDOFF.md and pick up where we left off."

**Rules for this project:**
- Always use **Node.js** for file edits — never PowerShell Set-Content (truncates at 893 bytes)
- After any change: \`git add <file> && git commit -m "..." && git push origin main\`
- If push is rejected: \`git pull --rebase origin main\` first, then push again
- Verify push succeeded by looking for \`main -> main\` in the output

## How to continue in Claude Chat (web)

1. Upload **this file** (CHAT-HANDOFF.md)
2. Also upload the specific file you're working on (e.g. admin.html, index.html)
3. Describe what you want to change

For large changes to admin.html: the file is 112 KB — upload it directly. Claude can read and edit it.
`);

// ═══════════════════════════════════════════════════════════════════════════
// TASK 10 — CODE-SNAPSHOT.md  (reads files from disk)
// ═══════════════════════════════════════════════════════════════════════════
console.log('\nReading source files for CODE-SNAPSHOT.md...');
const adminHtml    = readSrc('admin.html');
const shopData     = readSrc('shop-data.json');
const galleryData  = readSrc('gallery-data.json');
const sharedCss    = readSrc('css/shared.css');
const navJs        = readSrc('js/nav.js');

write('CODE-SNAPSHOT.md', `# Code Snapshot

> Full source of the core project files as of the last documentation update.
> These are the files most likely to be needed when resuming work in a new chat.
> For very recent changes, always re-read from the actual files on disk.

---

## admin.html

\`\`\`html
${adminHtml}
\`\`\`

---

## shop-data.json

\`\`\`json
${shopData}
\`\`\`

---

## gallery-data.json

\`\`\`json
${galleryData}
\`\`\`

---

## css/shared.css

\`\`\`css
${sharedCss}
\`\`\`

---

## js/nav.js

\`\`\`javascript
${navJs}
\`\`\`
`);

// ═══════════════════════════════════════════════════════════════════════════
// TASK 11 — Final verification
// ═══════════════════════════════════════════════════════════════════════════
console.log('\n── Verification ──────────────────────────────────────────');
let totalBytes = 0;
const files = fs.readdirSync(DOCS).filter(f => f.endsWith('.md')).sort();
files.forEach(f => {
  const fp   = path.join(DOCS, f);
  const size = fs.statSync(fp).size;
  totalBytes += size;
  const kb = (size / 1024).toFixed(1);
  const valid = fs.readFileSync(fp, 'utf8').length > 0 ? '✓ valid' : '✗ EMPTY';
  console.log(`  ${valid}  ${f.padEnd(24)} ${kb.padStart(8)} KB`);
});
console.log(`\n  Total docs/ size: ${(totalBytes / 1024).toFixed(1)} KB  (${files.length} files)`);
console.log('\nDone.');
