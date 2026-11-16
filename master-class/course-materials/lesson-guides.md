# 30-day lesson guides

Use these guides as step-by-step lessons. Start with the small starter app;
you do not need to know Macle, React, or Taro first. Each day adds a small
idea and a way to check that it worked. The starter uses React and Taro
behind the scenes to make an app for Macle. Save a working version after
each checkpoint so you can return to it if something goes wrong.

Some features depend on the version of Macle and the simulator you have.
When a lesson asks you to check a feature, use the official documentation
for your environment. Do not assume a feature works just because an example
uses it.

## Phase 1 — Foundations

### Day 1 — Your first look at a Macle Mini App

- **Learn:** What this course will build and why the shop order is pretend.
- **Explore:** Read the EthioShop README and find the word `simulated` in
  the sample backend. Do not enter real payment details.
- **Try:** Open the course folder and find the starter and shop example.
- **Check your progress:** You can find the starter and explain that its
  shop order is pretend.

### Day 2 — Open the starter in the Macle simulator

- **Learn:** What each setup command does and how to open the first screen.
- **Explore:** Install the starter dependencies, run its typecheck and build, and
  launch its simulator.
- **Try:** Write down which commands worked and save the first error if one
  did not.
- **Check your progress:** A successful starter build and a screenshot or brief note
  of the running page.

### Day 3 — How a Macle screen gets from code to simulator

- **Learn:** Your edits do not appear in the simulator until you rebuild.
- **Explore:** Change a label and look for it in the simulator.
- **Try:** Click the starter button and watch the tap count change.
- **Check your progress:** You can name the file you changed and command
  you ran.

### Day 4 — Find the Macle app's first screen

- **Learn:** How the app finds the screen it opens first.
- **Explore:** Find the list of pages and the file for the first screen.
- **Try:** Add a practice page and add its name to the page list.
- **Check your progress:** The build finishes without a missing-page error.

### Day 5 — Make your first Macle screen

- **Learn:** How to change text and see it in the Macle simulator.
- **Explore:** Change the welcome text in the starter.
- **Try:** Replace the welcome screen with a sample product name,
  description, and price.
- **Check your progress:** Your new text appears in the simulator.

### Day 6 — Layout and styling in the Macle view

- **Learn:** View layout, responsive units, flexbox, and why compiled style
  output is evidence of a build rather than a file to edit.
- **Explore:** Style a product card and test it at two simulator viewport sizes.
- **Try:** Improve the profile page hierarchy, spacing, and button
  affordance.
- **Check your progress:** The page remains legible at both tested viewport sizes.

### Day 7 — Macle mini-project: Telebirr profile

- **Learn:** Reusable UI, visual hierarchy, and an accessible touch target.
- **Explore:** Review the profile exercise against a simple design checklist.
- **Try:** Finish a static profile page with identity, two details, and
  one clearly labeled action.
- **Check your progress:** A working static page and a short self-review of layout
  decisions.

## Phase 2 — Core mechanics

### Day 8 — Macle view events and state updates

- **Learn:** How an event in the Macle-targeted view produces a state update
  and visible result; React is the starter's implementation mechanism.
- **Explore:** Use the starter counter; explain the difference between state
  updates and direct DOM mutation.
- **Try:** Add quantity controls to an EthioShop product card with a
  sensible upper bound.
- **Check your progress:** Repeated taps update the displayed quantity consistently.

### Day 9 — Macle page routes and navigation

- **Learn:** Registered routes, navigation methods, query parameters, and
  navigation failure handling.
- **Explore:** Navigate from a product card to a detail route with a product ID.
- **Try:** Add a simple detail view that reads a selected product ID and
  handles an unknown ID.
- **Check your progress:** Valid IDs show the expected product; invalid IDs show a
  useful fallback.

### Day 10 — Macle network requests and host APIs

- **Learn:** The Macle host/API boundary, request lifecycle, and server trust.
  Verify whether the installed plugin supports each API wrapper.
- **Explore:** Load the capstone product catalog from its local backend.
- **Try:** Add loading, empty, non-success response, and network error
  states to a small data view.
- **Check your progress:** Disconnect the backend and confirm the screen reports a
  recoverable error rather than hanging.

### Day 11 — Macle-compatible components

- **Learn:** Version compatibility, package installation, component
  registration, and fallbacks.
- **Explore:** Inspect the installed plugin documentation and MAUI component
  assets; do not assume the library ships with every starter.
- **Try:** Select one documented component, configure its assets only
  when available, and build it in the target simulator.
- **Check your progress:** Record the package/runtime versions and prove the selected
  component renders; otherwise document the missing prerequisite and build a
  plain Taro fallback.

### Day 12 — Data-driven lists in the Macle view

- **Learn:** Rendering collections, stable keys, filtering, and empty states.
- **Explore:** Render EthioShop's catalog from the backend response.
- **Try:** Add a category filter or search query and an empty result
  message.
- **Check your progress:** Filtering preserves item identity and handles no matches.

### Day 13 — Macle input and form states

- **Learn:** Controlled inputs, validation timing, keyboard behavior, and
  safe handling of user-provided data.
- **Explore:** Build a contact form with required-field validation.
- **Try:** Add inline validation, a submitting state, and a clear
  success/error result.
- **Check your progress:** Invalid input is rejected before submit and valid input has
  a visible result.

### Day 14 — Macle app persistence: to-do list mini-project

- **Learn:** Storage APIs, serialization, versioning, and failure handling.
- **Explore:** Read the exact storage API signature from the installed platform
  docs.
- **Try:** Build add, complete, and remove actions; persist and restore
  the list using the supported API.
- **Check your progress:** Tasks survive a restart where supported; storage errors do
  not silently lose the current in-memory list.

## Phase 3 — Fintech fundamentals

### Day 15 — Macle payment handoff and trust boundaries

- **Learn:** Client/backend/provider responsibilities, user confirmation, and
  why a client callback is not proof of settlement.
- **Explore:** Walk the capstone's mock order flow and the
  [trusted-boundary diagram](./diagrams/payment-flow.md).
- **Try:** Draw the sequence for a hypothetical provider-approved
  payment without entering credentials or contacting a payment endpoint.
- **Check your progress:** The diagram labels order creation, provider confirmation,
  server verification, and the UI's status query.

### Day 16 — Macle client and backend order boundary

- **Learn:** Server-owned pricing, input validation, HTTP status codes, and
  keeping secrets server-side.
- **Explore:** Run the EthioShop API tests and inspect its demo order endpoint.
- **Try:** Submit valid and invalid quantities; try changing the
  client-supplied total and observe that the server calculates its own total.
- **Check your progress:** The server rejects malformed items and derives totals from
  its own product catalog.

### Day 17 — Macle checkout request states

- **Learn:** Checkout adapter boundaries, async states, and mock versus real
  payment.
- **Explore:** Place an EthioShop demo order and read its explicit
  `DEMO_PAID`/`simulated` response.
- **Try:** Add a pending state and an order confirmation display; never
  label the mock response as a real payment.
- **Check your progress:** The frontend handles success and failure from the demo API
  and clearly identifies the flow as simulated.

### Day 18 — Macle identity, authorization, and consent

- **Learn:** Authentication versus authorization, data minimization, user
  consent, and platform-controlled identity flows.
- **Explore:** Review the official auth docs for the target runtime without
  requesting real user data during the lesson.
- **Try:** Design an interface around a mock user profile and list the
  minimum data the feature needs.
- **Check your progress:** A written data-flow sketch includes consent, purpose, and
  retention; any live auth exercise waits for approved access and docs.

### Day 19 — Securing Macle app integrations

- **Learn:** Public client bundles, secret management, token scope, logging,
  and least privilege.
- **Explore:** Search the built frontend for a fake marker secret and explain
  why obfuscation does not protect a client secret.
- **Try:** Move a mock privileged operation behind the backend and
  redact sensitive values from errors.
- **Check your progress:** No merchant secret or PIN is present in app code, build
  output, or logs.

### Day 20 — Macle network failure and recovery

- **Learn:** Timeouts, lost responses, duplicate submissions, cancellation,
  and idempotent order transitions.
- **Explore:** Simulate an API outage and an ambiguous order response.
- **Try:** Prevent duplicate button submissions and sketch a
  backend-side idempotency strategy for a real provider integration.
- **Check your progress:** The UI recovers from retryable failure and does not claim
  success before it has a verified order state.

### Day 21 — Backend-verified demo feature in Macle

- **Learn:** Gating UI on an order status and keeping the status authority on
  the server.
- **Explore:** Add a mock premium flag to a demo order response.
- **Try:** Unlock one clearly labeled demo feature only after the API
  returns the expected mock status.
- **Check your progress:** Editing local UI state alone does not create a server-owned
  premium entitlement.

## Phase 4 — Production readiness

### Day 22 — Macle device capabilities and permissions

- **Learn:** Capability detection, permission prompts, fallbacks, and privacy.
- **Explore:** Select one device API documented for the target runtime; if the
  environment lacks it, use a stub and explain the limitation.
- **Try:** Add a permission-aware action with a cancel and unavailable
  state.
- **Check your progress:** The app remains usable when permission is denied or the
  device capability is missing.

### Day 23 — Macle location capabilities and privacy

- **Learn:** Location consent, purpose limitation, map-provider requirements,
  and simulator/device differences.
- **Explore:** Review a map example only after confirming current API and
  provider requirements.
- **Try:** Create a location-permission explanation and a no-location
  fallback; use mock coordinates for UI-only work.
- **Check your progress:** No location request happens without a user action and
  clear purpose.

### Day 24 — Macle build and rendering performance

- **Learn:** Bundle size, route splitting support, list cost, and avoiding
  unnecessary state updates.
- **Explore:** Measure the existing build before changing it.
- **Try:** Reduce avoidable re-renders or trim an unused dependency, then
  compare output sizes.
- **Check your progress:** Record before/after measurements and explain the trade-off.

### Day 25 — Debugging the Macle app pipeline

- **Learn:** Build errors, service/view logs, simulator inspection, and
  separating environment failures from app failures.
- **Explore:** Reproduce a small UI bug and trace it from page registration to
  rendered output.
- **Try:** Diagnose a deliberately broken route or missing request
  backend.
- **Check your progress:** A concise issue report includes reproduction steps, logs,
  environment versions, and the observed-versus-expected result.

### Day 26 — Macle view feedback and polish

- **Learn:** Loading, empty, error, disabled, and success states; visual
  feedback and touch affordance.
- **Explore:** Review EthioShop across all request states.
- **Try:** Improve one screen without hiding errors or relying on
  animation support that has not been verified.
- **Check your progress:** Each async action has visible pending and failure feedback.

### Day 27 — Building a Macle-targeted package

- **Learn:** Build artifacts, app metadata, versioning, and submission
  checklists.
- **Explore:** Inspect the compiled output and compare it with current
  submission requirements from the official portal.
- **Try:** Produce a clean build and a checklist of assets, routes,
  permissions, and backend configuration.
- **Check your progress:** A reproducible release artifact and a list of portal steps
  verified for the current account.

### Day 28 — Testing across Macle runtimes and devices

- **Learn:** Simulator versus real-device gaps, compatibility matrix, and
  privacy-safe test data.
- **Explore:** Compare a simulator run with an approved test device when
  available.
- **Try:** Test layout, navigation, request failure, permissions, and
  app restart behavior on the target device.
- **Check your progress:** A test record lists device/runtime versions, results, and
  unresolved issues. Do not promise ADB or remote-debug support until it is
  confirmed for that device.

## Phase 5 — Capstone and presentation

### Day 29 — Macle EthioShop end-to-end tutorial

- **Learn:** Frontend/backend contracts, server-owned order totals, and the
  difference between a demo checkout and merchant payment processing.
- **Explore:** Run backend tests, build the frontend, and complete one mock
  order.
- **Try:** Add one small improvement such as product
  details, cart removal, or order history.
- **Check your progress:** The complete local demo works with a clear simulated
  checkout label and no payment secrets in the client.

### Day 30 — Presenting and validating your Macle app

- **Learn:** Clear technical demos, honest limitations, and what production
  readiness would require.
- **Explore:** Present the app, architecture diagram, test results, and known
  compatibility limitations.
- **Try:** Give a short demo and answer one question about a
  failure path and one about a security boundary.
- **Check your progress:** A tagged course project, setup instructions, a short
  demonstration, and a prioritized follow-up list.
