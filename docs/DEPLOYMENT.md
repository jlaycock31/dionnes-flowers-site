# Deployment

## Current URLs

| | URL |
|---|---|
| Live site | https://helenshouse.netlify.app |
| Admin panel | https://helenshouse.netlify.app/admin.html |
| GitHub repo | https://github.com/jlaycock31/dionnes-flowers-site |

---

## How Netlify connects to GitHub

The Netlify site is linked directly to the `jlaycock31/dionnes-flowers-site` GitHub repository on the `main` branch. No build command or framework configuration is needed — Netlify publishes the root folder as a static site.

Netlify site settings:
- **Build command:** (empty — no build step)
- **Publish directory:** `.` (root of the repo)
- **Branch:** `main`

---

## How auto-deploy works

Every `git push origin main` triggers the following sequence automatically:

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
```bash
git commit --allow-empty -m "Trigger redeploy"
git push origin main
```

---

## Bandwidth limits and image optimization

Netlify's free plan includes **100 GB bandwidth per month**. The Helen's House site is small and unlikely to come close to this limit, but some practices help keep bandwidth usage low:

- **No base64 images in HTML** — all photos are stored as files in `photos/` and served via raw.githubusercontent.com
- **Image compression** — the admin compresses every uploaded photo to ≤1200px at 0.65 JPEG quality (≈50–200 KB per image)
- **Lazy loading** — gallery images use `loading="lazy"` so they only download when scrolled into view

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
- Stored in browser `localStorage` only
- Never committed to the repo or visible in the source code
