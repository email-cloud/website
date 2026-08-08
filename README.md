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

543 of the 2,266 products (about 24%) show **real product photography**,
sourced from the supplier image feed you provided
(`Copy_of_products.xlsx`, a 14,230-row Salsify content export covering wine
and spirits). The remaining products — mostly beer, seltzers/RTD, mixers,
snacks, and tobacco, which that particular feed doesn't carry — fall back to
generated category-colored SVG bottle/can art (`src/components/BottleArt.tsx`)
rather than a broken image or a stock photo of the wrong product.

Matching pipeline (see chat history / `src/data/products.json`'s `image`
field for the result):

1. **Exact match** (210 products): the feed's `SupplierUniqueIdentifier`
   column is a UPC — matched directly against our barcode.
2. **Fuzzy match** (333 products): normalized product name + size, blocked
   by shared tokens, scored with `rapidfuzz`, gated so the first
   significant word (brand) must appear in the candidate and the size must
   be compatible. Threshold tuned high (≥90/100) to favor no image over a
   wrong one — a handful of specific known-bad brand collisions (e.g. Bogle
   vs. a different "Twenty Acres" label sharing the varietal name) were
   manually excluded after spot-checking.
3. Images are **hotlinked** from `images.salsify.com` (configured in
   `next.config.ts` under `images.remotePatterns`) rather than downloaded
   into the repo, since that's what the feed's CDN is meant for.

`src/components/ProductImage.tsx` renders the real photo via `next/image`
when `product.image` is set, and `BottleArt` otherwise.

**To add more real photos** (e.g. for beer/seltzers, or to improve fuzzy-match
coverage), get another supplier feed or your own product photos, add the
`image` URL to the relevant entries in `products.json`, and the site will
pick them up automatically — no code changes needed. If you self-host images
instead of hotlinking, add that hostname to `images.remotePatterns` too.

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
