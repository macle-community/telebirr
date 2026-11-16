# Day 26 — UI polish

**Estimated time:** 5–10 minute reading, 30 minute UX lab  
**Goal:** You add complete feedback states without hiding failures.
**Source:** [request state component](./code/day-22-to-28/day-26/request-state.tsx) ·
[capstone request handling](../../final-project/frontend/src/pages/index/index.tsx)

## Key concepts

A polished screen is not just a successful screenshot. It explains what is
happening while data loads, what the user can do when nothing is available,
how to recover after failure, and whether an action completed. Buttons should
have visible disabled and submitting states. Error messages should be
actionable without exposing internal stack traces or credentials.

Animation can add feedback, but it should not be the only feedback. It may
also vary across runtime versions or devices. First make the state change
clear with text, layout, and touch affordance; add motion only when supported
and tested.

An explicit state model prevents an error from looking like an empty result:

```ts
type ScreenState =
  | { kind: 'loading' }
  | { kind: 'empty' }
  | { kind: 'error'; message: string }
  | { kind: 'ready'; message: string }
```

Render a different message and available action for each `kind`. For example,
an error can offer a retry, while an empty result should explain that there
is currently no content. Neither state should display a success message.

## Walkthrough

Walk EthioShop through loading, product list, empty list, backend error,
empty cart, submitting checkout, and demo order success. Notice that the
mock payment label remains visible.

## Practice

Choose one flow and improve every state. Use a clear heading, concise
message, recovery action, and a disabled state for invalid actions. Test
keyboard navigation/touch targets and a long error string.

## Review questions

Trigger all states without reading the source code. If you cannot tell
whether the app is loading, failed, or succeeded, improve the interface. If
you are working with a partner, ask them to use it without your help. Confirm that no error is converted into a success-shaped fallback.

## Apply it

Submit before/after screenshots and a state table. Include one accessibility
or readability improvement and one behavior verified on the target.

## Detailed walkthrough

Use the [request state component](./code/day-22-to-28/day-26/request-state.tsx)
to exercise four visible states: loading, empty, error, and success. The
buttons are a state simulator, not a network request.

1. Trigger each state without reading the source.
2. Check whether loading, no data, and failure can be distinguished from
   one another.
3. Add a retry affordance to the error state and explain when it is safe.
4. Disable actions while a request is pending and make the disabled state
   obvious through text or appearance, not color alone.
5. Compare the exercise with the actual capstone request flow and identify
   any state it lacks.

Finish by testing long content, a narrow viewport, and repeated taps. Do not
replace a thrown error with a fake success result to make the screen look
complete.
