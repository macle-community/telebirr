# Day 1 — The Macle Mini App and course project

**Estimated time:** 5–10 minute reading, then a short repository tour  
**Goal:** You can explain what you will build and distinguish a
course demo from a production financial service.

## Key concepts

Over the next 30 days, you will learn how a Macle Mini App is configured,
compiled, rendered, and connected to host capabilities. The course starter
uses React and Taro as its source and build tools; the learning target is the
Macle runtime. You will finish with an EthioShop catalog, a cart, and a
backend-created demo order.

A Mini App runs inside a host application and uses the host platform's
runtime and capabilities. That makes the host's supported APIs, component
catalog, permissions, and release process important. One rule is:
measure and verify the exact environment instead of assuming it behaves like
a browser or another Mini App platform.

The course project is an EthioShop catalog and checkout demonstration. Its
frontend shows products and sends a cart to a sample backend. The backend
creates a simulated order so you can practice client/server data flow without
starting a payment. This narrow scope makes the course useful even when live
merchant access is unavailable.

You will also be precise about money. EthioShop's checkout is deliberately a
mock. It helps you learn the shape of an order request and response; it does
not charge a wallet, contact a payment provider, or prove that money moved.
A real payment needs approved merchant access, a trusted backend, current
provider documentation, and server-side verification. The app must never ask
for or store a payment PIN.

By graduation, you should be able to build a useful interface, diagnose a
runtime issue, and explain what remains before a production release.

## Example: recognize a demo result

The capstone marks its response explicitly:

```json
{
  "id": "sample-order-id",
  "totalCents": 18500,
  "status": "DEMO_PAID",
  "simulated": true
}
```

`totalCents` is a sample amount, and `simulated: true` means the backend did
not contact a payment provider. The ID and amount are illustrative; the
running demo generates its own order ID and calculates the amount from its
catalog. Never describe this response as proof that funds moved.

## Step-by-step tutorial

1. Open the course root README and review the 30-day sequence.
2. Open the starter README and note that it is intentionally small.
3. Open EthioShop in the simulator, add a coffee, and place a demo order.
4. Inspect the response's `simulated` marker and the backend test. Remember
   that this is not a real payment.

## Practice

Clone or open the course repository and locate `starter-template/`,
`final-project/`, and `course-materials/`. Then write down one question about
Macle that you can answer by running an experiment and one that requires
official documentation.

## Review questions

**Question:** If the app displays “success” after a button tap, does that
prove the backend received money? No. Client UI is not a settlement
authority. Where can you find the server-verified order status?

## Apply it

Read both project READMEs. Draw a one-page map of the starter, the shop
frontend, and the demo backend. Mark which part owns product pricing and
which part owns the mock order status.

## Macle project tour: step by step

Use this order to explore the repository and locate where
future work belongs:

1. **Course root:** find the syllabus and the two project entry points.
2. **Starter:** note that this is a small practice app used for isolated
   exercises, not a second production project.
3. **Capstone frontend:** identify the catalog page, its state, and the
   request to the backend.
4. **Capstone backend:** identify the server-owned catalog/pricing and mock
   order response.
5. **Course materials:** find where the manuscripts and daily code examples
   are indexed.

Write one claim you can verify by running code and one claim that needs
official Macle or Telebirr documentation. The simulator demonstrates
observed behavior; account eligibility, live payment support, and publishing
requirements need authoritative platform evidence.

## Completion evidence

You can locate the starter, capstone, backend, and lesson source index;
explain why checkout is mock-only; and identify which part owns price
calculation and order state.
