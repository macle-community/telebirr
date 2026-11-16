# Day 17 — Frontend checkout

**Estimated time:** 5–10 minute reading, 30 minute integration lab  
**Goal:** You submit a cart to the mock backend and show its explicit
demo result.
**Source:** [EthioShop frontend checkout](../../final-project/frontend/src/pages/index/index.tsx) ·
[backend order endpoint](../../final-project/backend/server.mjs)

## Key concepts

The frontend sends product IDs and quantities, not an authoritative total.
The backend validates the cart and returns a demo order. The screen should
disable duplicate taps while the request is in flight, show an error when
the request fails, and make the result legible. We must not call this a
Telebirr payment.

A network timeout can be ambiguous: the backend may have created an order
even though the response did not reach the device. In production, the client
would query a backend order status using an idempotent order flow. Our local
demo is intentionally simpler, but you will still avoid showing success when
the response is malformed or has the wrong status.

## Walkthrough

Run the backend, build the EthioShop frontend, add two coffees, then choose
“Place demo order.” Inspect the request payload and response. Point out that
the frontend uses the returned total and status but labels it as simulated.

## Practice

Add a visible error state and prevent a second checkout while one is
submitting. Try the button repeatedly, stop the backend, and restore it.
Keep the cart contents when checkout fails so the user can retry. On valid
demo success, clear the cart and show the short order ID.

## Review questions

Should the frontend send the price and trust its own sum? It can display a
convenience estimate, but the backend calculates the order. Should a
`DEMO_PAID` response be described as a real payment? No; the response is
explicitly simulated.

## Example: submit a demo cart

The capstone submits only the cart data:

```tsx
const response = await Taro.request({
  url: `${API_BASE_URL}/api/demo-checkout`,
  method: 'POST',
  header: { 'content-type': 'application/json' },
  data: { items: cart },
})
```

After the request, the page checks for the expected HTTP status and validates
that the response has an order ID, integer total, `DEMO_PAID` status, and
`simulated: true`. It keeps the cart on an error and clears it only after a
valid mock response. The result is not a Telebirr transaction.

## Apply it

Test empty cart, successful mock order, HTTP error, and network error. Write
the observed result for each. Do not add a real provider SDK or payment
credential.

## Detailed walkthrough

Start the backend and frontend using the project READMEs. In `ShopPage`,
locate the checkout handler and trace the full state transition:

1. The disabled/empty-cart guard prevents invalid local actions.
2. The submitting flag is set before awaiting the request. This prevents
   duplicate taps and gives the user feedback.
3. The request sends product identifiers and quantities, not a trusted
   amount.
4. A non-success HTTP response or malformed response follows the error path.
   The cart remains available so you can recover.
5. A valid mock response is rendered with its explicit demo marker and short
   order ID. Only then does the UI clear the cart.

Run four cases rather than only the happy path: empty cart, successful mock
order, stopped backend, and backend validation error. For each, record
whether the button is enabled, what message appears, and whether the cart
remains. If a timeout occurs after submission, explain why a production app
must ask the backend for order status instead of assuming it failed.
