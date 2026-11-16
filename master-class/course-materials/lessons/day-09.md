# Day 9 — Macle page routes and navigation

**Estimated time:** 5–10 minute reading, 25 minute lab  
**Goal:** You register a detail route and pass a safe identifier.
**Source:** [catalog route example](./code/day-06-to-09/day-09/catalog.tsx) ·
[detail page](./code/day-06-to-09/day-09/product.tsx) ·
[page config](./code/day-06-to-09/day-09/product.config.ts)

## In simple words

You will add a second screen for a product. The app needs the screen's name
in its page list before it can open it. You will pass the product's short ID
so the second screen knows which product to show.

## Key concepts

A multi-page app has two separate jobs: declare which pages exist and
navigate between them. The app configuration is the route registry. A button
cannot navigate to a page that is not registered, and a route string must
match the target's expected path format.

Pass a stable identifier such as a product ID rather than serializing an
entire product object into a URL. The detail page can load the canonical
record. Treat route parameters as untrusted input: users, stale links, or
runtime behavior may produce an empty or unknown value.

Navigation APIs and their callback/promise behavior are version-specific.
Use only a navigation API verified for the installed Macle plugin/runtime,
and provide a clear fallback for an invalid product rather than leaving an
empty page.

The destination reads the ID, looks it up, and shows a not-found state if
there is no matching product. Encoding makes the query value safe to place in
the URL; it does not make that value trusted.

## Step-by-step tutorial

Register `pages/product/index` in the app config. From a card, navigate using
the route API documented for the Macle target:

```tsx
Taro.navigateTo({
  url: `/pages/product/index?id=${encodeURIComponent(product.id)}`,
})
```

The route sends a stable product ID instead of the full record. URL encoding
is appropriate even when IDs currently look simple.

## Practice

Create a product detail page. Read the route parameter using the current
Taro page-instance API, then look up that ID in the loaded catalog. Render
the product name and price when found; otherwise render “Product not found”
and a way back to the catalog.

## Review questions

Try a valid ID, an unknown ID, and a parameter with punctuation. Verify all
three outcomes in the simulator. Consider what would happen if the detail route
were omitted from the page registry.

## Apply it

Add a “View details” action to each product card. Record the route format and
test it after a clean build. Do not rely on an undocumented route API inferred
from a different platform.

## Macle route tutorial: step by step

1. Add `pages/product/index` to the app's `pages` array. The source folder
   alone does not register a route.
2. Copy the detail component to `src/pages/product/index.tsx` and its page
   config beside it. Check the `useRouter` import against the installed Taro
   types.
3. The catalog passes only `product.id`. `encodeURIComponent` makes the
   query safe as a URL value; the destination still treats it as untrusted.
4. The detail page looks up the ID in its catalog and provides a not-found
   state. In a real app, a data service would own the canonical catalog rather
   than duplicating arrays across pages.
5. Test a valid ID, unknown ID, missing ID, and ID with punctuation. Verify
   back navigation and page title in the target runtime.

## Troubleshooting

If navigation reports a missing page, compare route registration, filesystem
path, and URL exactly. If `useRouter` has a type mismatch, inspect the
installed version's declaration and official docs; do not cast to `any` to
silence the error. If the destination is empty, check both page configuration
and runtime logs.
