# Changelog

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
