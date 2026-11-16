# Day 14 — Macle app persistence: to-do list mini-project

**Estimated time:** 5–10 minute reading, 35–45 minute build  
**Goal:** You persist a small local list using a documented storage API.
**Source:** [Day 14 to-do example](./code/day-10-to-14/day-14/todo-page.tsx)

## In simple words

You will save a to-do list on the device so it may still be there after the
app closes. Saving can fail, so show a message if the list was not saved.
Never use this practice storage for passwords or payment details.

## Key concepts

Local storage is useful for preferences and small pieces of state, but it
is not a secure vault and should not be used for merchant secrets, payment
PINs, or authoritative balances. Storage can be cleared, fail, or differ by
runtime. Read the current API docs for the target before choosing a method.

You will keep the in-memory React state responsive and save it after changes.
On launch, parse the stored value defensively: older versions or malformed
data should not crash the page. A stored list is still user-controlled
input, so validate its shape before rendering it.

The sample uses a namespaced key and treats the stored value as untrusted:

```tsx
const storageKey = 'course.todo.v1'
const stored: unknown = Taro.getStorageSync(storageKey)
const tasks = isTaskList(stored) ? stored : []
```

`isTaskList` checks that the value is an array of records with the expected
field types before the page uses it. Verify the synchronous storage API and
its failure behavior against the installed runtime before relying on it; this
local list is not a secure store.

## Step-by-step tutorial

Follow this sequence: read a key on page initialization, validate the
parsed array, render tasks, update state on add/complete/remove, and persist
the serialized list. Use the actual storage API supported by the installed
Macle/Taro plugin. If its signature is uncertain, consult the official docs
instead of pasting a guessed API.

## Practice

Build a to-do screen with add, complete, and remove. Assign each task a
stable ID. Persist only the list. If reading or writing storage fails, preserve the
current session's state and show a useful message.

## Review questions

Restart the app and confirm tasks restore. Then clear the saved value or
simulate malformed JSON and confirm the app recovers to an empty list without
claiming the data was safely persisted.

## Apply it

Add a “clear completed” action. Write down what happens when storage is
unavailable and which user data must never be placed there.

## Macle storage tutorial: step by step

Open the [to-do example](./code/day-10-to-14/day-14/todo-page.tsx). Begin by inspecting
the installed plugin's storage documentation, since this lesson's
`Taro.setStorageSync` and `Taro.getStorageSync` calls must be verified for the
exact runtime before device use.

1. Read the stored value once when the page initializes.
2. Parse and validate it inside a narrow error boundary. Confirm the value is
   an array and each record has the expected fields and types.
3. Keep the React state as the source for the currently visible list.
4. Assign new tasks stable IDs. Complete and remove by ID rather than array
   position.
5. Persist after a state change. If storage throws, keep the current in-memory
   list and show that it was not saved.
6. Restart and test a valid list, absent key, malformed data, and storage
   failure.

Do not silently treat an unexpected storage error as a successful save. For
this small exercise a visible message is adequate; a real app may also offer
retry or export. Storage is user-controlled and is not an authoritative
record of payment, identity, or entitlement.
