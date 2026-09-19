# Clyde Kebab & Grill — website concepts

Three self-contained website concepts for **Clyde Kebab & Grill** (Clyde, VIC 3978, south-east Melbourne). The restaurant is **takeaway & delivery only** (no dine-in); all copy and CTAs reflect that.
Each folder is a complete static site: plain HTML / CSS / JS, no build step, no dependencies.

| Folder | Concept | Feel | Stand-out interactions |
|---|---|---|---|
| `01-street-bold/` | **Street Bold** | Bright cream + flame orange + charcoal. Chunky poster type, sticker badges, polaroid gallery. Fun, casual, takeaway energy. | Tabbed menu with stagger-in cards, spinning sticker, count-up stats, deals grid, floating call button |
| `02-fresh-modern/` | **Fresh Modern** | Light, airy, rounded. Sage green + terracotta. Clean, order-focused, "fresh food" positioning. | Full menu with sticky category rail + scrollspy + **live search**, **"Build your box"** price calculator, bento "why us" grid, swipeable reviews, mobile sticky order bar |
| `03-ember-reactive/` | **Ember Reactive** | Midnight navy + ember gradient. Cinematic, premium, motion-heavy. | **Mouse-reactive ember particle canvas**, custom cursor + magnetic buttons, letter-by-letter hero reveal, **scroll-pinned "how we cook" story**, scroll-velocity text band, **3D tilt cards** with shine, **horizontal scroll gallery**, **click-to-add order tray** with bouncing total, scroll progress bar |

All three are fully responsive, respect `prefers-reduced-motion`, and share the same menu data.

## Deploy to Netlify (drag & drop)

1. Go to <https://app.netlify.com/drop>
2. Drag **one folder** (e.g. `03-ember-reactive`) onto the page.
3. Done, Netlify gives you a live URL in a few seconds.

Each folder has `index.html` at its root, which is all Netlify Drop needs.

## Deploy to Cloudflare (Workers static assets)

Each folder also has a `wrangler.jsonc` (Worker name + custom domain). With `wrangler` logged in:

```bash
cd 03-ember-reactive && npx wrangler deploy
```

| Folder | Worker | Live URL |
|---|---|---|
| `01-street-bold/` | `res01-clyde-kebab` | https://res01.corvale.com.au |
| `02-fresh-modern/` | `res02-clyde-kebab` | https://res02.corvale.com.au |
| `03-ember-reactive/` | `res03-clyde-kebab` | https://res03.corvale.com.au |

`.assetsignore` keeps `wrangler.jsonc` and Netlify state out of the published files.

## Editing content

- **Menu:** every site reads from `menu-data.js` in its folder. Change names, prices, descriptions and tags there; the page re-renders automatically. Tags: `v` vegetarian, `gf` gluten free, `hot` spicy, `fav` popular.
- **Address, phone, hours:** search `index.html` for `Berwick-Cranbourne`, `5990 0000` and the hours table.
- **Photos:** currently hot-linked placeholder photos from Unsplash. Replace the `<img src="...">` URLs with the restaurant's own photos (drop them in an `images/` folder inside the site folder and reference them relatively).

## Placeholder content to confirm with the client

- Street address, phone number and opening hours are placeholders.
- Menu items and prices are a realistic starting point, not the real menu.
- Reviews are marked as placeholder copy.
- The "Halal" badge (site 1) and the "4.8 ★" rating (site 2) are placeholders, confirm before going live.
- Social links point to `#`.
- Delivery partner buttons (Uber Eats / DoorDash / Menulog) point to `#`, replace with the restaurant's real store links, or remove the ones they don't use.

## Local preview

Any static server works, e.g.

```bash
python3 -m http.server 8765
```

then open `http://localhost:8765/01-street-bold/` (or `02-…`, `03-…`).
