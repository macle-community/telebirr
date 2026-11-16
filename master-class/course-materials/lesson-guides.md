# 30-day lesson guides

Use these guides to navigate the self-paced readings and practice exercises.
Start with the starter app, then carry the EthioShop capstone forward as the
course project. Save a working version after each checkpoint so you can
compare your progress.

Platform features change across compiler, plugin, simulator, and runtime
versions. Verify API signatures, UI components, device permissions, payment
eligibility, and submission procedures with the official documentation for
your exact development environment.

## Phase 1 — Foundations

### Day 1 — The Mini App opportunity

- **Learn:** What a Mini App is, the course outcome, and the difference
  between a demo and a production service.
- **Explore:** EthioShop's product list and mock checkout; note that it
  processes no real payment.
- **Try:** Clone the course repo and identify the starter,
  capstone, and lesson materials.
- **Check your progress:** You have a local checkout of the repository and a
  written list of questions to validate with platform documentation.

### Day 2 — Toolchain and simulator

- **Learn:** Node.js, npm, Taro, the Macle platform plugin, build output, and
  simulator as separate parts of the toolchain.
- **Explore:** Install the starter dependencies, run its typecheck and build, and
  launch its simulator.
- **Try:** Open the starter and record compiler,
  simulator, and operating-system versions.
- **Check your progress:** A successful starter build and a screenshot or brief note
  of the running page.

### Day 3 — How Macle renders a page

- **Learn:** The source-to-artifact path and the logic/view/native boundaries.
- **Explore:** Change a label, rebuild, and inspect the generated page artifacts.
- **Try:** Trace a button event from React handler to visible state
  change; distinguish observed behavior from assumptions about internals.
- **Check your progress:** A small diagram of the render/update path for the installed
  runtime version.

### Day 4 — Taro project setup

- **Learn:** `config/`, `src/`, page registration, project metadata, and build
  scripts.
- **Explore:** Locate the Taro config and the starter page configuration.
- **Try:** Change the app title and add a second route, then confirm the
  route appears in the compiled configuration.
- **Check your progress:** The app opens on the configured initial route.

### Day 5 — First React page

- **Learn:** Taro `View` and `Text`, component composition, and the
  relationship between JSX and the platform build.
- **Explore:** Add a welcome panel to the starter.
- **Try:** Create a profile summary with a name, short
  description, and reusable information row.
- **Check your progress:** The profile page compiles and renders in the simulator.

### Day 6 — Styling and responsive layout

- **Learn:** Taro styles, responsive units, flexbox, spacing, and why generated
  style files are a build artifact.
- **Explore:** Style a product card and test it at two simulator viewport sizes.
- **Try:** Improve the profile page hierarchy, spacing, and button
  affordance.
- **Check your progress:** The page remains legible at both tested viewport sizes.

### Day 7 — Mini-project: Telebirr profile

- **Learn:** Reusable UI, visual hierarchy, and an accessible touch target.
- **Explore:** Review the profile exercise against a simple design checklist.
- **Try:** Finish a static profile page with identity, two details, and
  one clearly labeled action.
- **Check your progress:** A working static page and a short self-review of layout
  decisions.

## Phase 2 — Core mechanics

### Day 8 — State and events

- **Learn:** React state, event handlers, and keeping rendered UI derived
  from state.
- **Explore:** Use the starter counter; explain the difference between state
  updates and direct DOM mutation.
- **Try:** Add quantity controls to an EthioShop product card with a
  sensible upper bound.
- **Check your progress:** Repeated taps update the displayed quantity consistently.

### Day 9 — Routing and parameters

- **Learn:** Registered routes, navigation methods, query parameters, and
  navigation failure handling.
- **Explore:** Navigate from a product card to a detail route with a product ID.
- **Try:** Add a simple detail view that reads a selected product ID and
  handles an unknown ID.
- **Check your progress:** Valid IDs show the expected product; invalid IDs show a
  useful fallback.

### Day 10 — Native APIs and network requests

- **Learn:** Taro API wrappers, native API boundaries, request lifecycle, and
  server trust.
- **Explore:** Load the capstone product catalog from its local backend.
- **Try:** Add loading, empty, non-success response, and network error
  states to a small data view.
- **Check your progress:** Disconnect the backend and confirm the screen reports a
  recoverable error rather than hanging.

### Day 11 — Component libraries

- **Learn:** Version compatibility, package installation, component
  registration, and fallbacks.
- **Explore:** Inspect the installed plugin documentation and MAUI component
  assets; do not assume the library ships with every starter.
- **Try:** Select one documented component, configure its assets only
  when available, and build it in the target simulator.
- **Check your progress:** Record the package/runtime versions and prove the selected
  component renders; otherwise document the missing prerequisite and build a
  plain Taro fallback.

### Day 12 — Lists and keys

- **Learn:** Rendering collections, stable keys, filtering, and empty states.
- **Explore:** Render EthioShop's catalog from the backend response.
- **Try:** Add a category filter or search query and an empty result
  message.
- **Check your progress:** Filtering preserves item identity and handles no matches.

### Day 13 — Forms and validation

- **Learn:** Controlled inputs, validation timing, keyboard behavior, and
  safe handling of user-provided data.
- **Explore:** Build a contact form with required-field validation.
- **Try:** Add inline validation, a submitting state, and a clear
  success/error result.
- **Check your progress:** Invalid input is rejected before submit and valid input has
  a visible result.

### Day 14 — Mini-project: persistent to-do list

- **Learn:** Storage APIs, serialization, versioning, and failure handling.
- **Explore:** Read the exact storage API signature from the installed platform
  docs.
- **Try:** Build add, complete, and remove actions; persist and restore
  the list using the supported API.
- **Check your progress:** Tasks survive a restart where supported; storage errors do
  not silently lose the current in-memory list.

## Phase 3 — Fintech fundamentals

### Day 15 — Payment architecture

- **Learn:** Client/backend/provider responsibilities, user confirmation, and
  why a client callback is not proof of settlement.
- **Explore:** Walk the capstone's mock order flow and the
  [trusted-boundary diagram](./diagrams/payment-flow.md).
- **Try:** Draw the sequence for a hypothetical provider-approved
  payment without entering credentials or contacting a payment endpoint.
- **Check your progress:** The diagram labels order creation, provider confirmation,
  server verification, and the UI's status query.

### Day 16 — Backend order creation

- **Learn:** Server-owned pricing, input validation, HTTP status codes, and
  keeping secrets server-side.
- **Explore:** Run the EthioShop API tests and inspect its demo order endpoint.
- **Try:** Submit valid and invalid quantities; try changing the
  client-supplied total and observe that the server calculates its own total.
- **Check your progress:** The server rejects malformed items and derives totals from
  its own product catalog.

### Day 17 — Frontend checkout boundary

- **Learn:** Checkout adapter boundaries, async states, and mock versus real
  payment.
- **Explore:** Place an EthioShop demo order and read its explicit
  `DEMO_PAID`/`simulated` response.
- **Try:** Add a pending state and an order confirmation display; never
  label the mock response as a real payment.
- **Check your progress:** The frontend handles success and failure from the demo API
  and clearly identifies the flow as simulated.

### Day 18 — Authorization and consent

- **Learn:** Authentication versus authorization, data minimization, user
  consent, and platform-controlled identity flows.
- **Explore:** Review the official auth docs for the target runtime without
  requesting real user data during the lesson.
- **Try:** Design an interface around a mock user profile and list the
  minimum data the feature needs.
- **Check your progress:** A written data-flow sketch includes consent, purpose, and
  retention; any live auth exercise waits for approved access and docs.

### Day 19 — Security basics

- **Learn:** Public client bundles, secret management, token scope, logging,
  and least privilege.
- **Explore:** Search the built frontend for a fake marker secret and explain
  why obfuscation does not protect a client secret.
- **Try:** Move a mock privileged operation behind the backend and
  redact sensitive values from errors.
- **Check your progress:** No merchant secret or PIN is present in app code, build
  output, or logs.

### Day 20 — Failures, retries, and idempotency

- **Learn:** Timeouts, lost responses, duplicate submissions, cancellation,
  and idempotent order transitions.
- **Explore:** Simulate an API outage and an ambiguous order response.
- **Try:** Prevent duplicate button submissions and sketch a
  backend-side idempotency strategy for a real provider integration.
- **Check your progress:** The UI recovers from retryable failure and does not claim
  success before it has a verified order state.

### Day 21 — Mini-project: premium demo feature

- **Learn:** Gating UI on an order status and keeping the status authority on
  the server.
- **Explore:** Add a mock premium flag to a demo order response.
- **Try:** Unlock one clearly labeled demo feature only after the API
  returns the expected mock status.
- **Check your progress:** Editing local UI state alone does not create a server-owned
  premium entitlement.

## Phase 4 — Production readiness

### Day 22 — Device APIs and permissions

- **Learn:** Capability detection, permission prompts, fallbacks, and privacy.
- **Explore:** Select one device API documented for the target runtime; if the
  environment lacks it, use a stub and explain the limitation.
- **Try:** Add a permission-aware action with a cancel and unavailable
  state.
- **Check your progress:** The app remains usable when permission is denied or the
  device capability is missing.

### Day 23 — Maps and location

- **Learn:** Location consent, purpose limitation, map-provider requirements,
  and simulator/device differences.
- **Explore:** Review a map example only after confirming current API and
  provider requirements.
- **Try:** Create a location-permission explanation and a no-location
  fallback; use mock coordinates for UI-only work.
- **Check your progress:** No location request happens without a user action and
  clear purpose.

### Day 24 — Performance

- **Learn:** Bundle size, route splitting support, list cost, and avoiding
  unnecessary state updates.
- **Explore:** Measure the existing build before changing it.
- **Try:** Reduce avoidable re-renders or trim an unused dependency, then
  compare output sizes.
- **Check your progress:** Record before/after measurements and explain the trade-off.

### Day 25 — Debugging

- **Learn:** Build errors, service/view logs, simulator inspection, and
  separating environment failures from app failures.
- **Explore:** Reproduce a small UI bug and trace it from page registration to
  rendered output.
- **Try:** Diagnose a deliberately broken route or missing request
  backend.
- **Check your progress:** A concise issue report includes reproduction steps, logs,
  environment versions, and the observed-versus-expected result.

### Day 26 — UI polish

- **Learn:** Loading, empty, error, disabled, and success states; visual
  feedback and touch affordance.
- **Explore:** Review EthioShop across all request states.
- **Try:** Improve one screen without hiding errors or relying on
  animation support that has not been verified.
- **Check your progress:** Each async action has visible pending and failure feedback.

### Day 27 — Packaging

- **Learn:** Build artifacts, app metadata, versioning, and submission
  checklists.
- **Explore:** Inspect the compiled output and compare it with current
  submission requirements from the official portal.
- **Try:** Produce a clean build and a checklist of assets, routes,
  permissions, and backend configuration.
- **Check your progress:** A reproducible release artifact and a list of portal steps
  verified for the current account.

### Day 28 — Device testing

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

### Day 29 — EthioShop capstone

- **Learn:** Frontend/backend contracts, server-owned order totals, and the
  difference between a demo checkout and merchant payment processing.
- **Explore:** Run backend tests, build the frontend, and complete one mock
  order.
- **Try:** Add one small improvement such as product
  details, cart removal, or order history.
- **Check your progress:** The complete local demo works with a clear simulated
  checkout label and no payment secrets in the client.

### Day 30 — Demo and next steps

- **Learn:** Clear technical demos, honest limitations, and what production
  readiness would require.
- **Explore:** Present the app, architecture diagram, test results, and known
  compatibility limitations.
- **Try:** Give a short demo and answer one question about a
  failure path and one about a security boundary.
- **Check your progress:** A tagged course project, setup instructions, a short
  demonstration, and a prioritized follow-up list.
