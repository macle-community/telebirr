# Day 16 — Macle client and backend order boundary

**Estimated time:** 5–10 minute reading, 30 minute API lab  
**Goal:** You validate cart input and compute price on the server.
**Source:** [backend implementation](../../final-project/backend/server.mjs) ·
[backend tests](../../final-project/backend/server.test.mjs)

## In simple words

The server—not the app screen—checks the products and adds up the price.
This keeps a changed number on the phone from changing the real price.
Today’s server creates only sample orders.

## Key concepts

A browser or Mini App can send any amount it wants. The server must not
trust a client-supplied total. It should accept product identifiers and
quantities, validate them, look up prices in its own catalog, and calculate
the total using integer minor currency units. Integer cents avoid common
floating-point rounding errors.

The EthioShop API is intentionally small and in-memory. It is suitable for
learning request validation, not for deployment: restarting it loses orders,
there is no authentication or durable database, and its checkout is a mock.
Name those limitations rather than disguising them.

For example, the server derives the price from its own catalog:

```js
const product = products.find(({ id }) => id === item.productId)
if (!product) {
  const error = new Error(`Unknown product: ${item.productId}`)
  error.statusCode = 400
  throw error
}
totalCents += product.priceCents * item.quantity
```

The client supplies the product ID and quantity, not a trusted price or
total. The real implementation also validates each quantity before adding
the line; keep validation at the HTTP boundary and return a client error for
invalid cart data.

## Step-by-step tutorial

From `final-project/backend/`, run `npm test`. Inspect
`createDemoOrder` in `server.mjs`. Send a request containing a deliberately
incorrect `totalCents`; observe that the server ignores it and calculates
from product IDs and quantities. Send an unknown product and observe the
400 response.

## Practice

Add a test for a quantity over the allowed maximum and a duplicate product
line. If extending the endpoint, keep validation near the request boundary,
return a client error for invalid input, and keep internal exception details
out of the response.

## Review questions

Consider why the backend stores prices as integer cents rather than `185.00`
floating-point numbers. Consider what state is lost when the process restarts.
Identify the in-memory `Map` and the need for durable storage
before real use.

## Apply it

Add one boundary test (for example, the maximum permitted quantity). Write a
short production gap list: authentication, persistence, monitoring, rate
limits, and a real provider integration are not implemented.

## Macle client/server order boundary: step by step

Start from the Macle app's checkout request and follow it into the backend.
Run the backend tests before changing code. In `server.mjs`, trace the
request boundary to `createDemoOrder`:

1. Inspect the Macle checkout request and identify exactly which cart fields
   cross the client/server boundary.
2. The route reads JSON input and passes only cart data to the order
   function; a client-supplied total is not authoritative.
3. Each line is checked for a known product and a valid quantity.
4. The server looks up its own price, multiplies in integer cents, and
   accumulates the total.
5. The response visibly identifies the mock order. The in-memory map exists
   only to support this teaching demo.
6. The tests assert both expected calculations and rejected input.

Add your test first: choose a boundary quantity, assert the HTTP status, and
assert that no successful order is created. Then implement the smallest
validation change. Run the tests again, and also send one manual request to
confirm the API response shape. For duplicate lines, decide whether to reject or combine them, then test
that policy rather than leaving it accidental.
