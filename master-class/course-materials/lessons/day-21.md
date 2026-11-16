# Day 21 — Backend-verified demo feature in Macle

**Estimated time:** 5–10 minute reading, 35 minute integration lab  
**Goal:** You gate a demo feature on backend state without mistaking
local UI state for a real entitlement.
**Source:** [demo entitlement toggle](./code/day-15-to-21/day-21/demo-entitlement.tsx) ·
[mock order backend](../../final-project/backend/server.mjs)

## Key concepts

A premium badge or locked screen is an interface, not an access-control
system. If the client alone decides that a user is premium, a user can modify
the client. In a real product, the backend authorizes access based on a
verified account and order state. This exercise uses only a mock status, so
the label must say ‘demo.’

Add a small gated section to EthioShop. The frontend requests a
demo order and the backend returns a simulated status. This teaches the
contract and state handling. It does not create a paid subscription, and the
server's in-memory state disappears when it restarts.

The source example makes the limitation visible:

```tsx
const [demoUnlocked, setDemoUnlocked] = useState(false)

{demoUnlocked
  ? <Text>Mock premium content. This is not a paid entitlement.</Text>
  : <Text>Locked in this local demo.</Text>}
```

Because this value is held on the user's device, it is easy to change and
must never authorize protected backend data. A real entitlement check must
be performed by the backend for each protected operation.

## Step-by-step tutorial

Inspect the current checkout result, then add a small “Premium roast notes”
section that appears only after the backend's expected demo status. Keep the
status and simulated nature visible in the code and UI.

## Practice

Add one gated demo feature. Verify the order response before
unlocking. Refresh or restart the app and decide how this prototype behaves;
explain that durable entitlements need authenticated server-side storage.
Do not unlock based only on a locally editable boolean.

## Review questions

Change the frontend state manually. Does that authorize
backend access? No. Consider what a production feature needs: verified identity,
server-owned entitlement, persistence, and provider-approved payment
verification where applicable.

## Apply it

Write a production migration note separating demo state from real
entitlement state. List the backend changes, verification requirements, and
user-facing states that must be designed before launch.

## Macle entitlement tutorial: step by step

1. Run the [demo entitlement example](./code/day-15-to-21/day-21/demo-entitlement.tsx)
   and toggle its local state in the Macle simulator.
2. Notice that client state can be changed locally; this is intentional and
   proves that the component cannot grant access to protected backend data.
3. Find the capstone order response and show its demo label beside the gated
   content. Treat a missing or unexpected status as locked/error.
4. Restart the backend and observe its in-memory limitation.

5. Draw a production model: authenticated user, server-owned
entitlement record, verified payment event, expiration/revocation policy,
and an authorization check on every protected backend operation. Keep this
model conceptual; no live payment or entitlement system is implemented here.
