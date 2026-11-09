# Foilhouse

Concept storefront for **Foilhouse**, a fictional collector-run card house selling Pokémon, One Piece, Dragon Ball and sports cards: sealed product, singles, graded slabs, preorders, live breaks, grading and buylist. Built with React + Vite and deployed on Netlify as a static site. It's a demo: there are no payments, accounts, or real contact details.

## Tech Stack

- **Frontend:** React 19, React Router 7, Vite 8, plain CSS (design tokens in `src/styles.css`)
- **Deployment:** Netlify (static build, no serverless functions)

## Features

- Editorial home page: photo hero with an interactive holographic "House Card", next-drop countdown, new-release rail, photo franchise tiles, release calendar, graded vault, services, "Inside the house" photo gallery, store info
- Mega menu (desktop) and full-screen menu (mobile), header search
- Shop with URL-driven filters (`?f=`, `type=`, `status=`, `lang=`, `q=`, `sort=`)
- Product pages with photo galleries (or pointer-tilt artwork), specs and related items
- Cart drawer with free-shipping meter, preorder/in-stock mixing warning, persisted to localStorage
- Sell-to-us quote form, drop-alert signup (demo, nothing is sent)
- Real photography throughout (see below), with CSS-rendered artwork (boxes, cards, slabs) as the fallback for products without a photo

## Images

Photos are free-license stock photography from [Unsplash](https://unsplash.com/license) and [Pexels](https://www.pexels.com/license/), self-hosted in `public/images/`. Per-file sources are listed in [`public/images/CREDITS.md`](public/images/CREDITS.md).

- **Product photos:** a product with an `image` (and optional `gallery`) in `src/data/catalog.js` shows that photo. The photo-backed products were chosen to match what each photo actually shows, e.g. the Base Set Charizard and Blastoise holos, the Evolving Skies pack and the 1965 Topps Joe Morgan rookie.
- **Everything else:** sealed boxes, One Piece and Dragon Ball have no matching free photos, so they use the CSS-rendered artwork in `ProductArt`. Swap in licensed product shots by adding `image: '<file-name>'` to the product.
- **Lifestyle photos:** the hero, franchise tiles, services, gallery, shop/sell headers and footer pull from `src/data/photos.js`.

Card artwork shown in photos is the property of its respective owners. Foilhouse is fictional and not affiliated with any brand.

## Demo only

Everything runs in the browser with no backend:

- The catalog lives in `src/data/catalog.js`.
- Checkout clears the bag and shows a confirmation page. No payment is taken.
- The drop-alert signup and sell-to-us form show a confirmation but send nothing.
- Social icons are placeholders, and there are no real emails, phone numbers or accounts.

## Local Development

**Prerequisites:** Node 18+

```bash
git clone git@github.com:19awburris88/foilhouse.git
cd foilhouse
npm install
npm run dev        # http://localhost:5173
```

## Deployment

Pushes to `main` trigger an automatic Netlify build (`npm run build`, publish `dist`). No environment variables are needed.

## Project Structure

```
src/
  App.jsx              # Router + layout
  styles.css           # Design tokens and all styles
  CartContext.jsx      # Bag state (persisted)
  data/catalog.js      # Demo catalog, franchises, formatters
  data/photos.js       # Lifestyle photo registry
  components/          # Header, Footer, CartDrawer, ProductArt, ProductCard, ProductRail, Tilt, Reveal
  pages/               # Home, Shop, Product, Sell, OrderSuccess, NotFound
  hooks/               # useScrollAnimation, useCountdown
public/
  images/              # Self-hosted photos + CREDITS.md
```
