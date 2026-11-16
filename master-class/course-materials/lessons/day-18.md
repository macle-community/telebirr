# Day 18 — Macle identity, authorization, and consent

**Estimated time:** 5–10 minute reading, 20 minute data-flow exercise  
**Goal:** You distinguish login, authorization, consent, and
permission.
**Source:** [mock consent card](./code/day-15-to-21/day-18/consent-card.tsx)

## Key concepts

Authentication answers ‘who is signed in?’ Authorization answers ‘what may
this identity do?’ Consent explains what data is requested and why. A device
permission is another boundary and is not the same as merchant authorization.
Before asking for a phone number, profile, or sensitive capability, identify
the feature that needs it and collect the minimum data required.

Platform identity APIs vary by runtime version, app review status, and
account configuration. Do not copy an API name from a blog and assume it is
available. Use the current official docs and approved application
credentials. This lesson uses fictional data only; do not enter your real phone number.

The lesson's consent button changes only local demonstration state:

```tsx
const [consented, setConsented] = useState(false)

<Button onClick={() => setConsented(true)}>Continue with mock data</Button>
<Button onClick={() => setConsented(false)}>Cancel</Button>
```

The `consented` value records a choice in this screen; it does not identify a
person, request profile details, or grant access to a backend. A real flow
must separately document the requested data, purpose, platform authorization,
and server-side checks.

## Step-by-step tutorial

Draw a simple flow: user sees purpose → chooses to continue → host-approved
authorization → backend receives a scoped, short-lived credential or
authorization result → app displays only the needed profile fields. Mark
which part must be confirmed from official docs before implementation.

## Practice

Use a mock user object such as `{ displayName: 'Demo User' }` in a local
component. Add a consent explanation and a cancel path. Do not call a live
identity service. You can list which fields the feature truly needs
and which should be discarded.

## Review questions

Check whether a successful client login permits every backend action. No;
each operation still needs server-side authorization. Check whether consent
should be bundled into a vague “Continue” button. No; purpose and requested
data should be clear.

## Apply it

Produce a one-page data-flow note: data collected, purpose, destination,
retention, deletion path, and official API documentation needed. Use only
mock values in the repository.

## Macle consent tutorial: step by step

Open the [consent card](./code/day-15-to-21/day-18/consent-card.tsx). It
changes only local UI state; it deliberately does not pretend to sign a user
in or call a native API.

1. Read the explanatory copy and identify the specific mock data purpose.
2. Tap **Continue with mock data** and observe the state label.
3. Tap **Cancel** and confirm the screen returns to the no-consent state.
4. Notice that the component does not persist consent, verify identity, or
   grant backend authorization.
5. For a real flow, write down the official API, scopes, account review,
   backend verification, token lifetime, and revocation/deletion behavior
   that must be confirmed before implementation.

Complete a data-flow diagram and purpose statement. Do not enter your
phone number or real identity data for this lesson.
