# Macle Telebirr Mini App Masterclass

A practical, 30-day course for building Telebirr Mini Apps with React, Taro, and the Macle runtime. The course moves from a first page to a shop capstone, while keeping payment credentials and transaction authority on the backend.

> **Before publishing:** verify current platform audience figures, SDK names, API signatures, simulator requirements, and developer-portal steps against current official sources. This repository avoids promising unverified user counts or production payment access.

## Start here

- [Course website](https://macle-community.github.io/telebirr/)
- [30-day syllabus](#30-day-syllabus)
- [Full lesson manuscripts](./course-materials/lessons/README.md)
- [Lesson source code (Day 6 onward)](./course-materials/lessons/code/README.md)
- [Daily lesson guide overview](./course-materials/lesson-guides.md)
- [Starter template](./starter-template/README.md)
- [EthioShop capstone](./final-project/README.md)
- [Course materials](./course-materials/README.md)

## Prerequisites

- Node.js 18 or later
- npm
- Familiarity with JavaScript and basic React
- A supported Macle development/simulator environment; see the starter guide

## Quick start

```sh
cd starter-template
npm install
npm run build:macle
npm run sim:macle
```

The simulator command serves the compiled output on port `30005`. Open `http://localhost:30005`.

## 30-day syllabus

Each lesson is designed for a short lecture followed by a hands-on exercise. Days 1–28 build toward the capstone; Days 29–30 complete and present it.

### Phase 1 — Foundations (Days 1–7)

| Day | Lesson | Practice |
| --- | --- | --- |
| 1 | Telebirr Mini Apps and the course capstone | Explore the finished EthioShop demo |
| 2 | Node.js, Taro, the Macle plugin, and simulator setup | Build and open the starter |
| 3 | Macle logic, view, MAML, and data updates | Trace one rendered page through the runtime |
| 4 | Taro project structure and app configuration | Find the entry, page, and build configuration |
| 5 | First React page with `View` and `Text` | Customize the starter greeting |
| 6 | Layout, responsive units, and generated styles | Build a product card layout |
| 7 | Mini-project: Telebirr profile page | Create a static profile with reusable sections |

### Phase 2 — Core mechanics (Days 8–14)

| Day | Lesson | Practice |
| --- | --- | --- |
| 8 | React state and Mini App events | Add an interactive quantity control |
| 9 | Page routes and query parameters | Navigate to a product detail page |
| 10 | Native API bridge and network requests | Load data from a local API |
| 11 | Component libraries and custom components | Add a documented component and configure it as required |
| 12 | Lists, keys, and empty states | Render and filter a product list |
| 13 | Forms, validation, and keyboard behavior | Build a validated contact form |
| 14 | Mini-project: persistent to-do list | Save and restore tasks with documented storage APIs |

### Phase 3 — Fintech fundamentals (Days 15–21)

| Day | Lesson | Practice |
| --- | --- | --- |
| 15 | Payment architecture and trusted handoff | Diagram client, backend, and provider responsibilities |
| 16 | Backend order creation | Create a server-side demo order |
| 17 | Payment integration boundaries | Connect a mock checkout adapter; identify provider-specific steps |
| 18 | User authorization and consent | Implement an authorization flow only with approved platform docs |
| 19 | Security: secrets, tokens, and least privilege | Keep credentials server-side and redact sensitive logs |
| 20 | Network failures, cancellation, and idempotency | Exercise retry and error states |
| 21 | Mini-project: premium unlock | Unlock a demo feature only after a verified mock order status |

### Phase 4 — Production readiness (Days 22–28)

| Day | Lesson | Practice |
| --- | --- | --- |
| 22 | Device APIs and permission handling | Add a documented device capability with a fallback |
| 23 | Maps and location privacy | Build a map screen only where the target runtime supports it |
| 24 | Bundle size, rendering, and data updates | Measure the build and reduce unnecessary updates |
| 25 | Debugging service and view layers | Diagnose a lifecycle or rendering issue |
| 26 | Loading, empty, and error states | Polish the shop experience |
| 27 | Packaging and submission preparation | Produce a release build and check its contents |
| 28 | Device testing and compatibility | Run a device test matrix and record results |

### Phase 5 — Capstone and presentation (Days 29–30)

| Day | Lesson | Practice |
| --- | --- | --- |
| 29 | EthioShop end-to-end capstone | Build catalog, cart, backend order, and demo checkout |
| 30 | Demo, feedback, and next steps | Present the app, architecture, limitations, and roadmap |

## Repository layout

```text
course-materials/    Architecture notes and reference sheets
final-project/       EthioShop frontend and demo backend
starter-template/    Minimal Taro + Macle getting-started app
```

## Scope and safety

The EthioShop checkout is a **mock demonstration**, not a production Telebirr integration. Production payment requires current provider documentation, merchant onboarding, server-side signing/verification, and approved credentials. Never collect or store a payment PIN in the Mini App. Do not put merchant secrets in frontend code.

Platform APIs, component catalogs, simulator support, and submission requirements can change. Confirm each against the current official Macle/Telebirr documentation before teaching it as a guaranteed capability.

## License

Course-specific content and starter code are released under the MIT License. See [LICENSE](../LICENSE).
