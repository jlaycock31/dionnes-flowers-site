# Helen's House — Project Documentation

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
