# Content Guide

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

All photos live in: `photos/gallery/` in the GitHub repo.

---

## shop-data.json structure explained

The shop data file has three sections:

**available[]** — bouquets you have right now, ready to sell
- `name` — the bouquet name shown on the website
- `price` — always include the $ sign (e.g. "$45")
- `quantity` — how many you have. When this reaches 0, the listing auto-shows as "Sold Out"
- `description` — 1–3 sentences about the bouquet
- `image` — the photo file path (set automatically when you upload or pick from gallery)
- `sold_out` — true/false (set automatically — you don't need to edit this directly)

**coming_soon[]** — things you're growing but not ready yet
- `name`, `description`, `image` — same as above
- `ready_date` — a friendly sentence like "Ready around July 4"

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
