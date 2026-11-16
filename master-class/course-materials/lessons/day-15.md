# Day 15 — Macle payment handoff and trust boundaries

**Estimated time:** 5–10 minute reading, 20 minute architecture exercise  
**Goal:** You can explain why a client callback is not payment proof.
**Source:** [payment boundary diagram](../diagrams/payment-flow.md) ·
[mock order backend](../../final-project/backend/server.mjs)

## Key concepts

A payment flow crosses three trust domains: the Mini App, the merchant
backend, and an approved payment provider. The frontend is responsible for a
clear user experience, but it is controlled by the user's device. A user can
modify requests and local UI state. Therefore the backend must own the order
amount, authenticate provider notifications, and decide whether an order is
paid.

Our capstone does not connect to a provider. The backend returns
`DEMO_PAID` and `simulated: true` to make the training boundary unmistakable.
That response is a fake state for a local exercise, not a payment result.
Never ask for or store the user's PIN. Never put signing keys in JavaScript,
the app config, or a compiled bundle.

Before implementing any live flow, obtain merchant approval and follow the
provider's current integration and verification guide. You will learn the
architecture today without initiating a transaction.

## Example: separate a cart request from a payment result

The capstone request contains product IDs and quantities:

```json
{
  "items": [
    { "productId": "yirgacheffe", "quantity": 1 }
  ]
}
```

The backend looks up the product and calculates the amount itself. Its
response includes `status: "DEMO_PAID"` and `simulated: true`, which are
labels for the local exercise only. A production provider result would need
to be verified by the backend using the provider's approved mechanism before
the app could display a backend-confirmed order state.

## Step-by-step tutorial

Open the [payment trust-boundary diagram](../diagrams/payment-flow.md) and
trace the actors. In EthioShop, inspect the order endpoint and the visible
“Demo only — no payment is processed” label. Run the test that confirms the
server calculates the amount.

## Practice

With a partner, draw a sequence for an approved provider flow. Mark which values
come from the server, which response is untrusted until verified, how the
server learns final status, and what the app displays while status is
pending. Do not send requests to a real payment API.

## Review questions

**Question:** The Mini App received a success callback. Can it set the order to
settled? No; it should show a pending/confirmation experience and retrieve
the backend-verified status. Consider where a signing key belongs: the backend's
protected secret store.

## Apply it

Annotate the diagram with one threat at each boundary and one mitigation.
Include a sentence explaining why the capstone's demo status is not proof of
real settlement.

## Macle trust-boundary tutorial: step by step

Open the diagram and read it from left to right. At each arrow, identify
who controls the data and what evidence is trustworthy:

1. The Mini App sends product IDs and quantities. It may show an estimated
   total, but it does not decide the payable amount.
2. The merchant backend validates the request and calculates the amount from
   its own catalog.
3. An approved provider flow, if implemented, is initiated only after
   merchant onboarding and against the provider's current documentation.
4. The backend verifies final status through the documented trusted
   mechanism. A callback displayed in the Mini App is not independent
   settlement evidence.
5. The frontend displays the backend-owned state and gives the user a
   pending/retry/status experience.

In the current capstone, step 3 is absent. `DEMO_PAID` and
`simulated: true` are explicit labels, not placeholders to remove casually.
Mark these labels on both response and screen. The finished
exercise is an architecture review, not a transaction test.
