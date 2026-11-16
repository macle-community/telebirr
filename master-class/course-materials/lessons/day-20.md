# Day 20 — Macle network failure and recovery

**Estimated time:** 5–10 minute reading, 30 minute failure-injection lab  
**Goal:** You handle request failure without losing user context or
claiming unsupported success.
**Source:** [checkout request and UI states](../../final-project/frontend/src/pages/index/index.tsx) ·
[backend order behavior](../../final-project/backend/server.mjs)

## Key concepts

Failures are normal behavior, not exceptional surprises. A user can lose
connectivity, a request can time out, a server can return an error, and the
response can be malformed. For each action, decide what the user sees, what
state is preserved, and whether retrying can duplicate an operation.

For reads, a retry is usually straightforward. For order creation, a lost
response is ambiguous: the server may have acted. A production backend should
use an idempotency strategy and a status lookup before a retry can create a
second order. Study that design separately; this demo order flow remains
non-production.

Model the screen states explicitly:

```ts
type CheckoutState =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'error'; message: string }
  | { kind: 'demo-success'; orderId: string }
```

Each state has a clear UI meaning. In particular, a caught network error
should not be converted into `demo-success`; the cart remains visible and the
status of a production order may need to be checked with the backend.

## Step-by-step tutorial

Place an order while the backend is stopped. Confirm that the cart remains
available and the error appears. Restart the backend and retry. Then return a controlled
server error and confirm it is not shown as success.

## Macle recovery tutorial: step by step

Use the capstone's checkout state and deliberately stop the backend before
submitting an order:

1. Confirm the button enters a submitting/disabled state on the first tap.
2. Observe the request failure and verify the cart is preserved.
3. Restart the backend and retry. Confirm the UI returns to an enabled state.
4. Use invalid cart data or a controlled server error to confirm that an
   error is not rendered as success.
5. Review the generic error fallback for thrown non-`Error` values so the
   user gets a safe message without stack details.

Then draw the production sequence separately: client submits an idempotency
key, backend stores the operation, client queries backend status after an
ambiguous timeout, and the backend reconciles with the provider. The
capstone does not implement these pieces; the diagram must not imply it does.

## Practice

Add a retry action that is disabled while submitting. Ensure thrown
non-`Error` values still produce a helpful generic message. Make the
submission button recover after both success and failure. Draw an idempotency
key flow for a production checkout, but do not claim the demo implements it.

## Review questions

**Question:** A request timed out; can you conclude no order exists? No. Consider what the
client should do before repeating a potentially non-idempotent operation:
query status or use the backend's documented idempotency mechanism.

## Apply it

Create a small test table for timeout, 400, 500, malformed response, and
success. For each case, record UI state, preserved data, and whether retry is
safe.
