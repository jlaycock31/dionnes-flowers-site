# Developer Guide

Technical reference for working on the Helen's House project.

---

## Running locally

```bash
cd moms-flower-site
npx serve .
```

Then open http://localhost:3000. No build step, no install needed beyond `npx`.

The admin (admin.html) requires live GitHub credentials to work — it won't be able to read or write data when running locally unless you enter a valid token in Settings.

---

## Working with Claude Code

```bash
cd "C:/Users/jack.laycock/OneDrive - Nucor/Documents/Mom/moms-flower-site"
claude
```

**Critical rules:**
- Always use **Node.js** (write .js scripts and run with `node script.js`) for any file editing
- Never use PowerShell's `Set-Content` — it truncates files at 893 bytes
- Always run `node create-docs.js` style scripts from Bash, not PowerShell
- After edits, `git add`, `git commit`, `git push origin main`

---

## Git workflow

```bash
git add <file>                    # stage specific file
git commit -m "Description"       # commit
git pull --rebase origin main     # if push is rejected (remote has new commits)
git push origin main              # push to GitHub → triggers Netlify deploy
```

Netlify auto-deploys within ~60 seconds of a push to main.

---

## How GitHub connects to Netlify

Netlify is linked to the GitHub repo `jlaycock31/dionnes-flowers-site`. Every push to the `main` branch triggers an automatic build. Since this is a static site with no build command, Netlify just publishes the root folder as-is.

Netlify settings (in Netlify dashboard):
- **Build command:** (none)
- **Publish directory:** . (root)
- **Branch:** main

---

## How the admin GitHub API works

### Authentication

The admin stores a GitHub Personal Access Token in `localStorage` under the key `df_cfg`. It is never hard-coded in the source. The token is sent as a Bearer token in every API request header:

```javascript
headers: { 'Authorization': 'token ' + S.cfg.token }
```

### Reading a file (GET)

```javascript
async function ghGet(path) {
  const url = 'https://api.github.com/repos/{user}/{repo}/contents/' + path
            + '?ref=main&cache_bust=' + Date.now();
  const r = await fetch(url, { headers: ghHead(), cache: 'no-store' });
  return r.json(); // returns { content: base64, sha: "abc123...", ... }
}
```

The response `.content` field is base64-encoded. Decode it:
```javascript
const json = decodeURIComponent(escape(atob(raw)));
```

### Writing a file (PUT)

Every write requires the current file's **SHA**. Without it, GitHub returns 409 Conflict.

```javascript
async function ghPut(path, textContent, sha, commitMessage) {
  const encoded = btoa(unescape(encodeURIComponent(textContent)));
  const body = { message: commitMessage, content: encoded, branch: 'main', sha: sha };
  await fetch(ghBase() + path, { method: 'PUT', headers: ghHead(), body: JSON.stringify(body) });
}
```

### Push flow for shop-data.json

1. `ghGet('shop-data.json')` — fetches fresh SHA (always fresh — `cache: 'no-store'`)
2. Modify `S.data` in memory
3. `ghPut('shop-data.json', JSON.stringify(S.data), sha, 'message')`

### Push flow for binary photo files

```javascript
async function ghPutBin(path, base64, sha, msg) {
  // base64 is already the raw base64 string (no data: prefix)
  const body = { message: msg, content: base64, branch: 'main' };
  if (sha) body.sha = sha; // only needed if file already exists
  await fetch(ghBase() + path, { method: 'PUT', headers: ghHead(), body: JSON.stringify(body) });
}
```

---

## isPublishing flag

A global `var isPublishing = false` prevents double-submits. Every async operation that touches GitHub sets it to `true` at the start and `false` in the `finally` block. If already publishing, the function returns early.

---

## compressImage() — how it works

```javascript
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
```

**Summary:** Max 1200px on longest side, JPEG at 0.65 quality. If result is still over 300 KB, re-encodes at 0.5 quality. Filename is sanitized (spaces → hyphens, special chars stripped, extension changed to .jpg).

---

## Photo picker architecture

The photo picker modal (added May 2025) replaces direct file-input clicks in edit and add-new forms. It offers:
1. **Upload New Photo** — triggers the hidden `<input type="file">`, runs through compressImage, uploads to `photos/` on save
2. **Choose from Gallery** — fetches gallery-data.json fresh, renders a 4-column thumbnail grid with folder filter pills, sets the existing photo path directly (no re-upload)

State tracking:
- `S.editCtx.newPhoto` — compressed upload object (for edit forms)
- `S.editCtx.galleryPhoto` — gallery filename path string (for edit forms)
- `S.newPhoto` / `S.newGalleryPhoto` — equivalent for the Add New form

If both are set, `newPhoto` takes precedence (but this shouldn't happen — picking one clears the other).

---

## shop-data.json format

```json
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
```

**Rules:**
- `available[].quantity === 0` → auto-set `sold_out: true` on load (normalizeData)
- `price` is always stored with `$` prefix (e.g. `"$45"`)
- `image` is the relative path from repo root (e.g. `"photos/dahlia-bouquet.jpg"`)
- `archived` array preserves all fields from when the item was active

---

## gallery-data.json format

```json
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
```

**Rules:**
- `folders[].id` is the stable slug used for filtering (never change after creation)
- `photos[].id` format: `"photo_"` + Unix timestamp (e.g. `"photo_1714512345678"`)
- `photos[].order` is 1-based, re-indexed on drag-reorder
- `featured` is always exactly 4 filenames (home page strip, left to right)
- `filename` paths are relative to repo root

---

## Known issues and fixes

### PowerShell 893-byte file truncation
PowerShell's `Set-Content` truncates file output at 893 bytes when writing large strings in certain modes. **Fix:** Always write files using Node.js `fs.writeFileSync()`. Never use PowerShell for file content.

### SHA 409 Conflict on push
If you GET a file's SHA, then someone else pushes between your GET and PUT, you get a 409. **Fix:** Always `ghGet()` immediately before every `ghPut()` to get the freshest SHA. All fetch calls use `cache: 'no-store'` to prevent browser caching stale SHAs.

### Netlify bandwidth — base64 images
Early versions embedded photos as base64 data URIs directly in HTML files. These count against Netlify bandwidth on every page load and bloat the HTML file size. **Fix:** All photos are stored as files in `photos/` and `photos/gallery/` on GitHub, referenced by path. Raw URLs via `https://raw.githubusercontent.com/...` serve the actual files.

### Duplicate script tags
At one point during refactoring, admin.html had duplicate `<script>` blocks causing JS errors. **Fix:** Only one `<script>` block at the bottom of the body.

### Mobile breakpoint — iPhone Pro Max
The 768px breakpoint wasn't catching iPhone Pro Max (430px wide, but 896px in landscape). **Fix:** Added a 1024px breakpoint for the hero grid and other layout-switching elements.

### Mobile nav hamburger
The nav links were collapsing behind other elements on mobile. **Fix:** shared.css and nav.js handle toggle; nav wrapper uses `position: relative` with high enough z-index.

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

```javascript
var PASSWORD = 'coco@202west';
```

To change it: open admin.html, search for `coco@202west`, replace with the new password, save, commit and push.
