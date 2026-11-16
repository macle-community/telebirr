# Day 22 — Device APIs

**Estimated time:** 5–10 minute reading, 25 minute capability lab  
**Goal:** You design around permissions and missing capabilities.
**Source:** [mock capability states](./code/day-22-to-28/day-22/capability-demo.tsx)

## Key concepts

Device APIs are powerful because they connect an app to a camera, location
sensor, scanner, or other host capability. That power comes with a user
permission and a platform-version dependency. The app should explain why a
capability is needed before requesting it, handle cancellation, and remain
useful when access is denied.

Do not assume that a WeChat API name or a Taro method is available in every
Macle runtime. Check the current official Macle API list, required permission
declarations, minimum runtime, and simulator support. An API that compiles
can still fail at runtime or require an approved account.

The mock adapter uses a small state type:

```ts
type CapabilityState =
  | 'not-checked'
  | 'available'
  | 'denied'
  | 'unavailable'
```

These are different outcomes: permission denial is not the same as a runtime
that lacks a verified implementation. Showing the distinction lets the
screen provide a fallback without claiming that the sample called a real
camera, scanner, or location API.

## Walkthrough

Select one documented, non-sensitive capability for your environment.
If none is available, demonstrate a mock adapter returning a fixed result and
label it as a mock. Review the states before permission, after approval, after
denial, and when the capability is unavailable.

## Practice

Build a “Scan a sample code” action around a small interface boundary. The
mock implementation can return a fictional value; the real implementation
should be enabled only after API availability and permission setup are
verified. Do not collect real personal data for the exercise.

## Review questions

If the user denies permission, respect the choice, explain the consequence,
provide a fallback, and do not repeatedly prompt without a new user action.

## Apply it

Create a capability matrix with API, runtime version, permission, simulator
result, device result, and fallback. Keep unverified entries explicitly
marked “not tested.”

## Detailed walkthrough

Open the [capability-state example](./code/day-22-to-28/day-22/capability-demo.tsx).
It has buttons for simulated available, denied, and unavailable outcomes.
None invokes camera, location, or other native functionality.

1. Start in `not-checked` and explain why the app has not requested access.
2. Simulate `available` and discuss how a real result would be presented.
3. Simulate `denied`; the feature should remain usable through a fallback
   rather than repeatedly prompting.
4. Simulate `unavailable`; distinguish runtime support from user permission.
5. For a selected real capability, fill in the official API, permission,
   minimum runtime, simulator result, and device result in the matrix before
   writing the adapter.

Your practice is complete when each state has an understandable message and no action
implies that an unverified API was actually called.
