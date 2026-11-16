# Day 12 — Data-driven lists in the Macle view

**Estimated time:** 5–10 minute reading, 25 minute list lab  
**Goal:** You render, filter, and empty a list predictably.
**Source:** [Day 12 list example](./code/day-10-to-14/day-12/filterable-list.tsx) ·
[capstone catalog](../../final-project/frontend/src/pages/index/index.tsx)

## In simple words

You will show several products in a list and let someone narrow the list.
If nothing matches, show a friendly “no items found” message instead of a
blank area.

## Key concepts

A catalog is a collection of records, not a row of copy-pasted cards. In
React, map the data into components and give each item a stable key. The key
helps React preserve identity when items are inserted, removed, or reordered.
Do not use the current array index when the record already has a stable ID.

A list needs more than the populated state. It should distinguish loading,
an empty catalog, an empty filtered result, and a failed request. Those are
different situations and should have different messaging. You will keep the
data source separate from the filter so a search does not destroy the
original catalog.

This filter is derived from the source array and current query:

```tsx
const visibleProducts = products.filter((product) =>
  product.name.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()),
)
```

It does not modify `products`; clearing the query returns the full list.
Render each result with `key={product.id}` so React can preserve item
identity when the list changes.

## Step-by-step tutorial

Use the capstone catalog shape:

```tsx
products.map((product) => (
  <ProductCard key={product.id} product={product} />
))
```

Add a case-insensitive name filter derived from `products` and `query`.

## Practice

Render the backend products as cards. Add a search input or a simple category
filter. Display “No products available” when the API returns an empty list and
“No matches” when the filter excludes all loaded products. Keep the loading
and request-error states separate.

## Review questions

Filter the list, add or remove a record, and confirm the remaining cards
retain the correct identity and button state. Consider why an array index is a
poor key when a list can change.

## Apply it

Add a “clear filter” action and write a test matrix for: loading, API error,
empty catalog, no filter matches, and populated list.

## Macle list-rendering tutorial: step by step

The [filterable-list example](./code/day-10-to-14/day-12/filterable-list.tsx) separates its
source records from the rendered result:

1. `products` is the canonical list for this small local exercise.
2. `query` contains only the user's current search input.
3. `visibleProducts` is derived from both; filtering does not mutate or
   replace `products`.
4. Each card uses `product.id` as a stable React key.
5. The empty UI distinguishes a truly empty source list from a non-empty list
   whose current filter has no matches.

In this exercise, add one record while a filter is active. Explain whether it
should appear based on its name. Then change the list order and observe why a
stable ID is preferable to the array index as a key. Keep network loading and
error states outside the filter logic so a failed load is not presented as an
empty catalog.
