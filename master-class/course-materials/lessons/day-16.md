# Day 16 — Backend order creation

**Estimated time:** 5–10 minute reading, 30 minute API lab  
**Goal:** You validate cart input and compute price on the server.
**Source:** [backend implementation](../../final-project/backend/server.mjs) ·
[backend tests](../../final-project/backend/server.test.mjs)

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

## Walkthrough

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

## Detailed walkthrough

Run the backend tests before changing code. In `server.mjs`, trace the
request boundary to `createDemoOrder`:

1. The route reads JSON input and passes only the cart data to the order
   function; the client-supplied total is not an authority.
2. Each line is checked for a known product and a valid quantity.
3. The server looks up its own price, multiplies in integer cents, and
   accumulates the total.
4. The response visibly identifies the mock order. The in-memory map exists
   only to support this teaching demo.
5. The tests assert both expected calculations and rejected input.

Add your test first: choose a boundary quantity, assert the HTTP status, and
assert that no successful order is created. Then implement the smallest
validation change. Run the tests again, and also send one manual request to
confirm the API response shape. For duplicate lines, decide whether to reject or combine them, then test
that policy rather than leaving it accidental.
