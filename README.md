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

**629 of the 2,266 products (about 28%) show real product photography**,
combined from two supplier sources. Products without a confident match fall
back to generated category-colored SVG bottle/can art
(`src/components/BottleArt.tsx`) rather than a broken image or a photo of
the wrong product:

| Category | With photo | Total |
|---|---|---|
| Wine | 235 | 841 |
| Whiskey & Bourbon | 97 | 204 |
| Tequila & Mezcal | 58 | 111 |
| Vodka | 77 | 204 |
| Beer | 51 | 284 |
| Seltzers & Ready-to-Drink | 48 | 314 |
| Rum | 33 | 54 |
| Liqueurs & Cordials | 13 | 61 |
| Gin | 9 | 26 |
| Brandy & Cognac | 4 | 28 |
| Mixers & Non-Alcoholic | 3 | 78 |
| Party & Bar Supplies | 1 | 7 |
| Snacks, Tobacco | 0 | 54 |

**Source 1 — wine & spirits** (`Copy_of_products.xlsx`, a 14,230-row
Salsify content export): 210 exact UPC matches + 333 gated fuzzy
name/size matches, hotlinked from `images.salsify.com`.

**Source 2 — beer, seltzers & RTD** (two Brandfolder asset export CSVs,
2,036 rows): 86 gated fuzzy matches against the asset name + tags, hotlinked
from `cdn.bfldr.com`. This filled the biggest gap left by source 1, which
carries no beer at all. While reviewing these matches we also caught and
fixed a pre-existing categorization bug: 4 "Smirnoff Smash" SKUs were filed
under Vodka (an artifact of the original price-list keyword classifier)
instead of Seltzers & Ready-to-Drink, where the rest of the Smirnoff Ice
family lives.

Both matching passes use the same approach: normalize text, block candidates
by shared tokens, score with `rapidfuzz` (token-set + token-sort blend),
hard-require the brand word to appear in the candidate, and bonus/penalize
by parsed size compatibility. Threshold tuned high (≥88–90/100) to favor no
image over a wrong one. A handful of specific bad pairs surfaced by spot
-checking (wrong-brand collisions, an oversized generic "hero shot" being
reused across mismatched pack sizes, two suspiciously generic "Bottle-Shot
-{color}-lg" filenames) were manually excluded rather than tuning the scorer
to a single anecdote.

`src/components/ProductImage.tsx` renders the real photo via `next/image`
when `product.image` is set, and `BottleArt` otherwise.

**To add more real photos** (e.g. for the remaining beer/seltzer gap, mixers,
snacks, or to push fuzzy-match coverage higher), get another supplier feed or
your own product photos, add the `image` URL to the relevant entries in
`products.json`, and the site will pick them up automatically — no code
changes needed. If you self-host images or use a new CDN, add that hostname
to `images.remotePatterns` in `next.config.ts` too.

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
