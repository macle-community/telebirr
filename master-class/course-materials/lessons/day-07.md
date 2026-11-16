# Day 7 — Macle mini-project: Telebirr profile

**Estimated time:** 5–10 minute review, 30–45 minute build and review  
**Goal:** You deliver a small, static Macle screen and verify the full
source-to-simulator path.
**Source:** [Day 7 page TSX](./code/day-06-to-09/day-07/index.tsx) ·
[stylesheet](./code/day-06-to-09/day-07/index.css)

## In simple words

Build one profile screen using made-up information. “Static” means its
content does not change when someone taps it. The goal is to make the screen
clear and confirm it opens in the simulator.

## Key concepts

The earlier lessons separated the important layers: source, configuration,
compiler output, simulator, and rendering. You used core components and
responsive styles, and confirmed each change with a target build.

Today's profile mini-project combines those skills without adding a network
or native API. Keep the scope small. A strong first mini app is not one with
the most widgets; it is one that builds repeatably, communicates clearly,
and behaves well in the target runtime.

Before adding behavior, establish a baseline that you know renders.
If you see a blank screen, first verify route registration and current build
output, then inspect runtime errors. Do not mask a rendering failure with a
different background color.

The example keeps fictional profile data in one object and passes a detail
row's content through props:

```tsx
const profile = { name: 'Demo User', location: 'Addis Ababa' }

function ProfileDetail({ label, value }: { label: string; value: string }) {
  return (
    <View>
      <Text>{label}</Text>
      <Text>{value}</Text>
    </View>
  )
}
```

`ProfileDetail` can render different labeled values without duplicating the
row markup. The sample values are course data, not a signed-in user's
identity or account information.

## Step-by-step tutorial

Review a simple profile made from the previous exercises: a title, short
description, two labeled details, and one action. Notice its spacing and
contrast choices. Rebuild from source and open the simulator.

## Practice

Build a static “Telebirr Profile” page. Required content: display name,
account type or role (use fictional data), two profile details, and one
clearly labeled action. The action may show a local placeholder toast only
if that API is documented for the installed environment; otherwise render it
as a disabled or explanatory control.

## Review questions

Find the file that declares the route and the file that contains the page
UI. Explain one style decision and how you verified the page after a clean
build.

## Review checklist

- The route is registered.
- The page builds from a clean source state.
- Text fits at two viewport sizes.
- The action does not imply a real account or financial operation.
- You can identify the source file and the matching simulator page.

## Apply it

Submit the project and a brief retrospective: one build issue, one design
decision, and one platform question to verify before using a native API.

## Macle profile tutorial: step by step

Use the [profile example](./code/day-06-to-09/day-07/). It intentionally uses
fictional data and a disabled action so you can focus on UI and avoid
implying a real account operation.

1. Read the `profile` object and find every place its fields are displayed.
   Explain that keeping example content in one object makes a future data
   source replacement easier.
2. Inspect `ProfileDetail`. It receives a label and value and renders a
   repeated row. Consider what should happen if a value is long; test it and adjust
   the row layout without adding a fixed width.
3. Notice the disabled button. Disabled controls should communicate why an
   action is unavailable. You can replace it with a clearly labeled local-only
   action if the behavior is supported.
4. Change the fictional name and location, run typecheck and build, then
   compare the rendered page with the source.

## Acceptance criteria

The page has one clear identity, two details, consistent row alignment, and
no user secrets. It builds from source and remains readable at two viewport
sizes. A screenshot is useful evidence, but you should also identify
the route and source file that produced it.
