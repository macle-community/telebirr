# Day 8 — State and events

**Estimated time:** 5–10 minute reading, 25 minute lab  
**Goal:** You connect a user event to a predictable React state update.
**Source:** [Day 8 page TSX](./code/day-06-to-09/day-08/index.tsx) ·
[stylesheet](./code/day-06-to-09/day-08/index.css)

## Key concepts

React state is the source of truth for values that change while a page is
open. When the user taps an action, the handler describes the next state; React
then renders the interface from that state. Do not manually edit the text
node or assume a browser DOM exists. This model is why a quantity label and
the cart total should both be derived from the same cart state.

In a Mini App, Taro maps component events to the target event system. The
handler should be short, deterministic, and safe to tap more than once.
Avoid putting network requests or payment assumptions in a display-only
button. Separate the state transition from effects such as saving or sending
a request.

The quantity example keeps one source of truth and enforces a range:

```tsx
function changeQuantity(delta: number) {
  setQuantity((current) => Math.max(0, Math.min(10, current + delta)))
}
```

The functional updater receives the latest state, even when updates are
queued. `Math.max` and `Math.min` keep the quantity between zero and ten.
The displayed total should be calculated from that quantity, not maintained
as a second state value that could become inconsistent.

## Walkthrough

In the starter, use this sequence:

```tsx
const [count, setCount] = useState(0)

<Button onClick={() => setCount((current) => current + 1)}>
  Taps: {count}
</Button>
```

Explain why the functional update is robust when updates are queued. Tap it
several times, then rebuild and check it in the target simulator.

## Practice

Add a quantity control to an EthioShop product card. Store quantity in React
state, keep it between 0 and 10, and derive the visible count from state. Add
and remove controls, but do not update a second “total” state variable; derive
the total from cart items and the product catalog.

## Review questions

Consider what should happen when quantity is already 10 and the add action is
tapped. The answer should be an explicit policy, such as keeping it at 10 and
showing a short explanation, not silently overflowing or creating a negative
quantity.

## Apply it

Add a remove-from-cart transition. Write down the state shape and one
invariant (for example: no item has quantity less than 1). Confirm the cart
count and total remain correct after adding, removing, and changing quantity.

## Detailed walkthrough

Open the [quantity example](./code/day-06-to-09/day-08/). Trace these values:

1. `quantity` is the state that changes after a tap.
2. `changeQuantity` receives a delta and uses the functional updater, so it
   calculates from the latest state.
3. `Math.max` and `Math.min` enforce the invariant `0 <= quantity <= 10`.
4. `totalCents` is derived from the constant unit price and quantity. It is
   not an independent state value that can drift out of sync.
5. The total is divided by 100 only for display. In this example it remains a
   local estimate; the backend must calculate an actual order total.

Predict what happens at 0 and 10 before tapping the disabled controls. Then deliberately remove a bound in a local experiment and observe
the bug. Restore it and test sequences: add/add/remove, remove at zero, add
past ten, and rerender after each action.

## Troubleshooting

If a tap does not update the count, confirm the `onClick` handler is on the
button and the page is rebuilt. If the total differs, inspect the cents
calculation before changing formatting. If the app starts showing a negative
quantity, put the invariant in the state transition function rather than
trying to repair the text after rendering.
