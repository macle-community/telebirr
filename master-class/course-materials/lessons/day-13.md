# Day 13 — Macle input and form states

**Estimated time:** 5–10 minute reading, 30 minute form lab  
**Goal:** You verify the Macle target's input behavior and make validation
and submission states clear.
**Source:** [Day 13 form example](./code/day-10-to-14/day-13/contact-form.tsx)

## Key concepts

A form is a contract with the user. Label each field, explain required
values, validate before sending, and show errors where they can be corrected.
Do not assume keyboard behavior is identical across simulator and device.
Test focus, input type, scrolling, and submit behavior on the target.

Client validation improves usability; it does not secure the backend. The
server must validate every value again. Never ask a user to enter a payment
PIN into a custom form. For identity or payment, use an approved host flow
when the platform and account support it.

## Step-by-step tutorial

Build a form with a name and contact message using components verified for
the Macle target. Keep current values in the starter's view state and gate
submission on a non-empty trimmed name. Display an error rather than silently
ignoring an empty submit.

```tsx
const [name, setName] = useState('')
const valid = name.trim().length > 0
```

Before using the example, verify that the Macle plugin supports this input
component and event shape. The installed source types help author the
adapter; a target build and simulator test verify its Macle behavior.

In the full form example, input is controlled by React state:

```tsx
<Input
  value={name}
  onInput={(event) => setName(event.detail.value)}
/>
```

`value` displays the current state and `onInput` copies the latest text back
into it. The form's submit rule can then trim and validate that same value.
Check the event shape against the installed component declarations, then
confirm focus, keyboard, and submit behavior in the Macle simulator or device.

## Practice

Build a contact form with a labeled input, a textarea, a submit
button, and a confirmation panel. Test a blank name, whitespace-only name,
long message, and successful submission. Use fictional test data.

## Review questions

Consider what happens if a malicious client skips the validation. The server must
still reject invalid content. Consider why a payment PIN field is out of scope:
the app must not collect or store the PIN.

## Apply it

Add one inline validation message and a submitting state. Test keyboard
visibility and page scrolling in the simulator; if a device test is
available, record the differences rather than assuming parity.

## Macle form tutorial: step by step

Use the [validated form](./code/day-10-to-14/day-13/contact-form.tsx). Identify the form's
state variables first: field values, validation message, and submission
status. Then trace the submit handler:

1. Trim the name so spaces alone are not considered a valid value.
2. If invalid, set a message beside the field and return without submitting.
3. If valid, clear prior validation and enter the submitting state.
4. For this lesson, display a local confirmation using fictional data; do not
   send contact information to an undocumented service.
5. Prevent duplicate submission while the status is submitting, then return
   to an explicit done or recoverable error state.

Test blank, whitespace-only, ordinary, and long input. Check labels, keyboard
opening, scroll behavior, and whether the error is visible without relying
only on color. The backend must repeat validation because the client can be
modified or bypassed.
