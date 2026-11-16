# Day 29 — Macle EthioShop end-to-end tutorial

**Estimated time:** 5–10 minute preparation, 45–60 minute implementation and review  
**Goal:** You deliver the end-to-end educational shop demo.
**Source:** [capstone frontend](../../final-project/frontend/src/pages/index/index.tsx) ·
[backend and tests](../../final-project/backend/)

## In simple words

Put together the product list, shopping cart, and sample order. The screen
shows the products; the server checks the cart and makes the pretend order.
Follow the numbered instructions and test one part at a time.

## Key concepts

This capstone combines the course's Macle app skills. EthioShop is a
Macle-targeted Mini App backed by a small Node service, with a product
catalog, cart state, and a server-calculated demo order. React/Taro are the
current frontend source/build tools, not the runtime contract. Its simplicity
is intentional: you can see the client, host, and server boundary clearly. It
is not a production commerce service and it does not process a Telebirr payment.

The final code should handle a missing backend, an invalid response, a
valid catalog, an empty cart, and a successful mock order. The order total
comes from server-owned prices. The interface must continue to call the
checkout simulated. Before any real provider integration, a merchant needs
approved access, documented APIs, a durable backend, authentication,
verification, monitoring, and security review.

The capstone contract separates the cart request from the demo response.
These are two messages, shown together for comparison:

```json
{
  "request": { "items": [{ "productId": "yirgacheffe", "quantity": 1 }] },
  "response": {
    "id": "generated-by-server",
    "totalCents": 18500,
    "status": "DEMO_PAID",
    "simulated": true
  }
}
```

The server resolves the ID and computes the total using its catalog. The
response fields explicitly identify a simulated order; they are not a
provider receipt or payment confirmation.

## Step-by-step tutorial

From `final-project/backend/`, run the tests and start the API. From
`final-project/frontend/`, install dependencies, typecheck, build, and open
the simulator. Load the catalog, add two products, place one demo order, and
inspect the backend response.

## Practice

Choose one extension: product details, cart removal, order history
in the demo process, or improved empty/error states. Keep the backend
authoritative for prices and label any simulated status. Write a focused test
for one edge case.

## Review questions

Point to the server's price lookup, the frontend's loading
and failure states, and the explicit marker that makes this a simulated
order. Consider what additional evidence would be required before calling a
production payment “verified.”

## Review checklist

- Both frontend and backend start from documented commands.
- Cart values are validated and prices are computed by the server.
- Network failure preserves enough state for recovery.
- The result is explicitly marked as a demo.
- No payment PIN, merchant secret, or real user data is used.

## Macle capstone tutorial: step by step

1. Start in `final-project/backend/`, install from its lockfile, run tests,
   then start the server using its README command.
2. Start in `final-project/frontend/`, install from its lockfile, run
   typecheck and Macle build, and launch the simulator.
3. Trace the catalog request from the page to the backend response. Confirm
   loading and error handling before adding products to the cart.
4. Change quantity and verify the cart display, then submit an order. Inspect
   the request and confirm the backend calculates prices from its own
   catalog.
5. Stop the backend and test recovery. Restore it and show the explicitly
   simulated success.
6. Add one small extension and a focused test without broadening the payment
   claim.

You are ready when reproducibility, one failure path, a test result, and a
clear explanation of what is mock-only.

## Apply it

Prepare a short demo or live walkthrough. Include architecture,
one failure case, one test result, and a frank list of production gaps.
