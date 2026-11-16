# Day 23 — Maps and location

**Estimated time:** 5–10 minute reading, 25 minute privacy and UI lab  
**Goal:** You explain location use and build a safe fallback.
**Source:** [fictional pickup points](./code/day-22-to-28/day-23/pickup-points.tsx)

## Key concepts

Location is sensitive. Ask for it only when the feature needs it, explain
the purpose in plain language, and request access in context. A map widget
and a location permission are separate capabilities; a simulator may render
one while being unable to provide the other.

Map providers may require keys, domains, licenses, and network access. Never
put a restricted server credential in the client. Before presenting a live
map, confirm the official Macle component support, provider terms, permission
requirements, and simulator/device behavior. You can build the screen
with fictional coordinates without requesting anyone's location.

The example uses labeled fictional records rather than device coordinates:

```ts
const pickupPoints = [
  { id: 'demo-1', name: 'Demo Coffee Counter', area: 'Addis Ababa - fictional' },
  { id: 'demo-2', name: 'Sample Roastery', area: 'Hawassa - fictional' },
]
```

The UI may present these as sample pickup choices, but it must not claim
that either is nearby. A live map, location reading, and permission request
are separate features with separate compatibility and privacy requirements.

## Walkthrough

Review a map screen wireframe with three states: permission explanation,
location unavailable, and a location result. Use a static mock pin or
placeholder rather than calling an unverified API. Identify any external map
service dependency and why it must be approved.

## Practice

Build a “Find a pickup point” page using fictional coordinates and a
text-based pickup location card. Add a button that explains the permission
would be requested only after you confirm; keep the actual API
disabled until verified.

## Review questions

**Question:** Can a map API key be protected by embedding it in a minified bundle?
No. Identify which states must exist when location is denied or unavailable:
manual selection, a clear explanation, and no fabricated location result.

## Apply it

Submit a privacy note: purpose, requested data, retention, access control,
fallback, and map provider requirements. Clearly separate mocked coordinates
from real device data.

## Detailed walkthrough

Use the [pickup point page](./code/day-22-to-28/day-23/pickup-points.tsx).
The list contains only fictional labels and explicitly says device location
is not requested.

1. Identify the point where a real app would explain why location is useful.
2. Design a user-initiated permission action, a denied-permission state, and
   a manual selection fallback.
3. Keep map rendering, permission, and location lookup as separate
   capabilities in the compatibility notes.
4. Before implementing a real map, verify component support, provider key
   restrictions, map licensing, network/domain requirements, and actual
   device behavior.

Review the page for claims such as “near you” that would be false with
fictional/static data. The example must remain explicit that it is sample
content.
