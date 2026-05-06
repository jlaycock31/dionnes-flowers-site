# Design System

## Color palette

| Token | Hex | Usage |
|---|---|---|
| Background cream | `#fdf6ee` | Page background, body background |
| Hero / card bg | `#f0e8d8` | Hero sections, card backgrounds, photo placeholders |
| Primary / terracotta | `#b05a3a` | Primary buttons, active states, border accents, admin CTAs |
| Primary dark | `#9a4a2a` | Primary button hover |
| Espresso / dark | `#2c1e14` | Site header background, body text headings |
| Copper accent | `#d4956a` | Logo italic text, decorative accents |
| Body text | `#7a5a3a` | Paragraph text, form labels |
| Muted text | `#9a7a5a` | Secondary text, captions, sub-labels |
| Border | `#e8ddd0` | Card borders, input borders, dividers |
| Light border | `#d4c4b0` | Photo zone dashed borders |
| Green accent | `#5a7a4a` | Success states, coming-soon badge, italic logo text |
| Light green | `#eef3e8` | Success backgrounds |
| Error red | `#c04030` | Delete buttons, error states |
| SVG petal peach | `#e09068` | Botanical dahlia SVG petals (primary) |
| SVG petal gold | `#e8c060` | Botanical SVG petals (secondary) |
| SVG petal blush | `#e0a0be` | Botanical SVG petals (tertiary) |
| SVG leaf green | `#a0c878` | Botanical SVG leaves |

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
```css
font-size: 11px;
font-weight: 500;
letter-spacing: 0.14em;
text-transform: uppercase;
color: #9a7a5a;
```

### Price display
```css
font-size: 15px;
font-weight: 500;
color: #b05a3a;
```

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
| `.btn-primary` | `#b05a3a` | `#e8f0e0` | Main CTAs — "Add to Cart", "Publish", etc. |
| `.btn-outline` | transparent | `#b05a3a` | Secondary actions — Cancel, secondary nav |
| `.btn-ghost` | transparent | `#9a7a5a` | Tertiary — Sign Out, cancel-style links |
| `.btn-warm` | `#f0e8d8` | `#7a5a3a` | Soft action buttons |
| `.btn-danger` / `.btn-delete` | `#c04030` | `#fff` | Destructive actions |
| `.btn-edit` | `#f0e8d8` | `#7a5a3a` | Edit card action |
| `.btn-archive` | `#f0ebe3` | `#7a6a58` | Archive action |
| `.btn-restore` / `.btn-mark-active` | `#eef3e8` | `#3a6a2a` | Restore / activate green |
| `.btn-soon` | `#e8f0da` | `#5a7a3a` | "Move to Coming Soon" |
| `.btn-activate` | `#3a6a2a` | `#e8f4e0` | "Make It Live" green |

All buttons use:
- Font: Jost, 500 weight
- Letter spacing: 0.08em
- Text transform: uppercase
- Border radius: 3px (standard) or 4px (large CTA)

## Card styles

### Admin listing card (`.admin-card`)
- White background, 0.5px `#e8ddd0` border, border-radius 4px
- 4px left border in terracotta (`#b05a3a`) — turns muted brown (`#c8b8a0`) when sold out
- 100px wide thumbnail on left, text body on right
- Opacity 0.75 when sold out (`.sold-out` class)

### Gallery card (`.gal-card`)
- White background, 0.5px `#e8ddd0` border, border-radius 3px
- Square aspect-ratio photo on top
- Drag handle (⠇) in top-left corner
- Folder selector and delete button below photo

### Shop listing card (shop.html)
- White background with subtle shadow
- Badge for sold-out / coming-soon state
- Price in terracotta

## Form styles

```css
.form-input {
  padding: 0.75rem 0.9rem;
  border: 1.5px solid #e8ddd0;
  border-radius: 3px;
  font-family: Jost;
  font-size: 15px;
  color: #2c1e14;
}
.form-input:focus { border-color: #b05a3a; outline: none; }
```

Price inputs use a `.price-wrap` with a `.price-sym` (`$`) prefix on a `#f5ede0` background.

## Overlay / modal style

```css
.overlay { background: rgba(44,30,20,0.55); }  /* dim backdrop */
.overlay-box { background: #fff; border-radius: 6px; max-width: 480px; }
.overlay-header { border-bottom: 0.5px solid #e8ddd0; }
.overlay-footer { background: #faf6f0; border-top: 0.5px solid #e8ddd0; }
```

## SVG botanical illustrations

The site uses hand-coded inline SVG dahlia illustrations as decorative elements in the hero section of the home page and in listing cards.

**Petal shapes:** Elongated ellipses arranged radially around a center point, with slight rotation variation for a natural look.

**Color layers:**
1. Outer petals — `#e09068` (peach)
2. Mid petals — `#e8c060` (gold) at 0.85 opacity
3. Inner petals — `#e0a0be` (blush) at 0.75 opacity
4. Leaves — `#a0c878` (green)
5. Center — `#b05a3a` (terracotta) circle

**Implementation:** Inline `<svg>` elements inside the HTML, sized responsively with CSS (typically 280–400px on desktop, scaling down on mobile).
