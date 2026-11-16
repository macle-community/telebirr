# Days 6–9 — UI, state, and routes

These snippets are designed to be copied into the starter one day at a time.
Day 9 uses an additional page; register it in the app config as instructed.

## Day 6: responsive coffee card

Copy `day-06/index.tsx` and `day-06/index.css` into the starter page.

## Day 7: profile page

Copy `day-07/index.tsx` and `day-07/index.css` into the starter page.

## Day 8: stateful quantity

Copy `day-08/index.tsx` and `day-08/index.css` into the starter page. The total
is derived from quantity rather than kept as duplicate state.

## Day 9: product detail routing

1. Copy `day-09/catalog.tsx` into the starter index page.
2. Copy `day-09/product.tsx` to `src/pages/product/index.tsx`.
3. Copy `day-09/product.config.ts` beside the new product page.
4. Add `pages/product/index` to `src/app.config.ts`.
5. Build and verify both valid and invalid `id` route parameters.

Page parameter APIs can vary by Taro version; the example uses the standard
Taro page-instance API and should be checked against the installed types.
