# Convenience Liquors

A full e-commerce website for Convenience Liquors — built with Next.js 16
(App Router), TypeScript, and Tailwind CSS. Includes a 2,266-item product
catalog (wine, spirits, beer, seltzers, mixers, snacks, tobacco, and bar
supplies), a hard 21+ age gate, category browsing, search, a cart, and
Stripe-powered checkout.

## Getting Started

```bash
npm install
cp .env.example .env.local   # then fill in your Stripe keys, see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You'll be redirected to
the age-verification gate first — that's expected on every fresh session
until the `cl_age_verified` cookie is set.

## Enabling Checkout (Stripe)

Checkout is fully built but requires **your own** Stripe account — we can't
create one for you. Until keys are added, the checkout page shows a clear
"payment processing is not yet configured" message instead of crashing.

1. Create a free account at [stripe.com](https://dashboard.stripe.com/register).
2. Grab your API keys from **Developers → API keys**.
3. Add them to `.env.local`:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```
4. Restart the dev server. Checkout will now create a real Stripe Checkout
   Session and redirect there.
5. When you're ready to accept real payments, switch to your live keys and
   complete Stripe's account activation (business details, bank account).

Prices are always re-read from `src/data/products.json` on the server when
building the Stripe session — the client never controls what gets charged.

## Product Catalog

The catalog was generated from the price list you provided
(`Price_List_1.xlsx`, 2,274 rows). The pipeline:

1. Parsed every row (barcode, description, pack size, price).
2. Filtered out non-merchandise rows (bus tickets, casino trips).
3. Classified each item into a category/subcategory using brand and
   varietal keyword matching (e.g. "TITOS" → Vodka, "CABERNET" → Red Wine).
4. Applied a flat **10% discount** to every price.
5. Normalized messy pack-size text (`"1 75 LTR"` → `"1.75L"`) and fixed a
   handful of obvious data-entry typos (e.g. "Pepermint" → "Peppermint").
6. Wrote the result to `src/data/products.json` and
   `src/data/categories.json`.

**To update prices or add/remove items**, edit `src/data/products.json`
directly (it's a plain JSON array — see `src/lib/types.ts` for the shape),
or re-run a similar pipeline against a new price list. There's no database;
the site reads this file at build/request time via `src/lib/products.ts`.

### Tobacco items are excluded from online checkout

Cigarettes, cigars, and vape items are shown with an "In-Store Only" badge
and can't be added to the cart. This is intentional: the federal PACT Act
imposes strict requirements on mailing/shipping tobacco that this project
doesn't attempt to satisfy. If you don't sell tobacco in-store either, just
delete those rows from `products.json`.

## Product Images

Every product currently uses **generated placeholder art** — a
category-colored SVG bottle/can illustration (see
`src/components/BottleArt.tsx`) rather than real product photography.

This was a deliberate choice, not a shortcut: scraping or hotlinking
thousands of copyrighted brand photos from random websites is a real
copyright-infringement risk and wouldn't have been reliable at 2,266-SKU
scale anyway. To add real photos:

1. Get images you're licensed to use — most distributors (Southern
   Glazer's, RNDC, your local wholesaler) provide free marketing images to
   licensed retailers, or use photos you take yourself in-store.
2. Add an `image` field (URL or local path under `/public`) to the relevant
   product(s) in `products.json`.
3. Swap `BottleArt` for `next/image` in `ProductCard.tsx` and the product
   detail page, falling back to `BottleArt` when no image is set.

## Legal & Compliance Pages

`src/app/(shop)/legal/*` contains starter Terms of Use, Privacy Policy,
Delivery & Pickup, Returns, and Responsible Drinking pages. **These are
templates, not legal advice.** Before launch, have them reviewed by an
attorney familiar with your state's alcohol beverage control (ABC)
regulations, and replace the `[bracketed placeholders]` with your real
business details.

The site currently assumes **local pickup and local delivery only** — most
states don't allow shipping alcohol to consumers across state lines without
a special license, so that's the safe default. If you have a shipping
license, you'll need to add shipping-address collection and tax/compliance
logic accordingly.

## Age Verification

Enforced at the routing layer (`src/proxy.ts`), not just in the UI: every
request without a `cl_age_verified` cookie is redirected server-side to
`/verify-age` before any page (including API routes are exempted only for
Stripe callbacks) can render. Visitors enter a full date of birth; anyone
under 21 is redirected to a hard-stop page with no bypass. The cookie lasts
30 days.

## Project Structure

```
src/
  app/
    (shop)/            # main storefront, wrapped in header/footer/cart
      page.tsx          # homepage
      category/[slug]/  # category listing with filters, sort, pagination
      product/[slug]/   # product detail
      cart/, checkout/  # cart page, checkout, success/cancel
      search/           # search results
      legal/            # terms, privacy, shipping, returns, responsible
    verify-age/         # age gate (outside the shop layout, no header/nav)
    api/checkout/       # Stripe Checkout Session creation
  components/           # Header, Footer, ProductCard, CartDrawer, etc.
  data/                 # products.json, categories.json
  lib/                  # product queries, cart types, Stripe client
  proxy.ts              # server-side age-gate enforcement (all routes)
```

## Deployment

This is a standard Next.js app — deploy it anywhere Next.js runs (Vercel,
Netlify, your own Node server, etc.). Remember to set the environment
variables from `.env.example` in your hosting provider's dashboard.
