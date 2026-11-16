# Day 24 — Macle build and rendering performance

**Estimated time:** 5–10 minute reading, 30 minute measurement lab  
**Goal:** You measure before optimizing.
**Source:** [derived filter example](./code/day-22-to-28/day-24/derived-filter.tsx)

## In simple words

Make the screen work first. Then measure what feels slow or makes the app
too large. Change one thing and measure again to see if it helped.

## Key concepts

Performance work begins with a measurement and a user-visible symptom.
Bundle size, startup time, request latency, list rendering, and repeated
updates are different problems. A change that makes source code shorter may
not make the compiled app faster.

Mini App runtimes can have stricter update and memory costs than a desktop
browser. Keep list keys stable, avoid duplicating derived state, limit
unnecessary assets, and load only what the app needs when the target
supports it. Do not introduce lazy loading or caching based on a guess about
plugin support.

The example derives the visible products from the query:

```tsx
const visibleProducts = useMemo(() => {
  const term = query.trim().toLocaleLowerCase()
  return products.filter((product) =>
    product.name.toLocaleLowerCase().includes(term),
  )
}, [query])
```

This avoids storing a second list that could get out of sync with
`products`. For three static records, memoization is unnecessary; the
example is for learning the pattern, not a performance claim. Measure a real
bottleneck before keeping an optimization.

## Step-by-step tutorial

Build the starter and capstone once. Record the generated bundle and asset
sizes with a simple file-size listing. In the simulator, observe a known
screen and note obvious delay or redundant requests. Explain that this is a
baseline, not a statistically rigorous benchmark.

## Practice

Pick one measurable improvement: remove an unused image/import, reduce
duplicate derived state, or avoid rendering a large off-screen list. Rebuild
and compare output size or request/render behavior. Keep the change only if
the result improves without breaking the user flow.

## Review questions

Consider what metric changed and how it was measured. If no metric was collected,
you should not claim a performance improvement. Consider what regression
test protects the behavior.

## Apply it

Write a before/after note with the exact command, measured artifact, result,
and trade-off. Identify one performance question that requires a real
device rather than the simulator.

## Macle performance tutorial: step by step

Open the [filter example](./code/day-22-to-28/day-24/derived-filter.tsx).
The visible products are derived from the query and source array; they are
not stored as a second state variable.

1. Build and record the baseline artifact size using the project's build
   command.
2. Type a partial name, clear it, and verify all three records return.
3. Explain that `useMemo` is included to teach the concept, not because a
   three-item filter needs optimization.
4. Remove `useMemo` in a temporary comparison and observe whether behavior
   changes. It should not.
5. Choose a real bottleneck, collect before/after evidence, and retain
   memoization only if measurement and target behavior justify it.

Avoid claiming the simulator proves device performance. Record the tool,
artifact, conditions, and any device-only metric that remains untested.
