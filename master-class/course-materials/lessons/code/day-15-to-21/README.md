# Days 15–21 — Fintech boundaries and safe demo code

- **Day 15:** Start with the
  [payment boundary diagram](../../../diagrams/payment-flow.md). No live
  provider call belongs in this lesson.
- **Day 16:** The backend source and tests are the runnable lesson code:
  [`server.mjs`](../../../../final-project/backend/server.mjs) and
  [`server.test.mjs`](../../../../final-project/backend/server.test.mjs).
- **Day 17:** Walk through the capstone's
  [`ShopPage`](../../../../final-project/frontend/src/pages/index/index.tsx).
  Checkout is a local mock.
- **Day 18:** [`consent-card.tsx`](./day-18/consent-card.tsx) demonstrates a
  user-controlled mock consent state; it does not authenticate anyone.
- **Day 19:** [`server-config.example.mjs`](./day-19/server-config.example.mjs)
  shows server-side configuration validation, not a payment secret.
- **Day 20:** The capstone checkout handles a pending state and keeps the cart
  on failure. Review the checkout function in the Day 17 source.
- **Day 21:** [`demo-entitlement.tsx`](./day-21/demo-entitlement.tsx) is
  deliberately labeled as client-side demo state, not authorization.

Do not put real payment credentials, identity tokens, PINs, or user data in
these examples. Real payment integration requires approved access and current
provider documentation.
